import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:youtube_player_flutter/youtube_player_flutter.dart';
import '../core/supabase.dart';
import '../core/theme.dart';
import '../models/course.dart';

class LessonScreen extends StatefulWidget {
  final String lessonId;
  final String courseId;

  const LessonScreen({super.key, required this.lessonId, required this.courseId});

  @override
  State<LessonScreen> createState() => _LessonScreenState();
}

class _LessonScreenState extends State<LessonScreen>
    with TickerProviderStateMixin {
  YoutubePlayerController? _ytCtrl;
  late final YoutubePlayerController _dummyCtrl;

  List<Lesson> _allLessons = [];
  Set<String> _completedIds = {};
  int _idx = 0;
  bool _isCompleted = false;
  bool _markingDone = false;
  bool _loading = true;
  bool _playerError = false;
  Module? _currentModule;

  // Animated complete button
  late final AnimationController _btnCtrl;
  late final Animation<double> _btnScale;

  @override
  void initState() {
    super.initState();
    _dummyCtrl = YoutubePlayerController(initialVideoId: '');
    _btnCtrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 420),
    );
    _btnScale = TweenSequence<double>([
      TweenSequenceItem(tween: Tween(begin: 1.0, end: 0.92), weight: 25),
      TweenSequenceItem(tween: Tween(begin: 0.92, end: 1.06), weight: 45),
      TweenSequenceItem(tween: Tween(begin: 1.06, end: 1.0), weight: 30),
    ]).animate(CurvedAnimation(parent: _btnCtrl, curve: Curves.easeInOut));
    _load();
  }

  Future<void> _load() async {
    final uid = supabase.auth.currentUser?.id;
    if (uid == null) return;

    final results = await Future.wait<dynamic>([
      supabase
          .from('courses')
          .select('*,modules(*,lessons(*))')
          .eq('id', widget.courseId)
          .single(),
      supabase.from('progress').select('lesson_id').eq('user_id', uid),
    ]);

    final course = Course.fromJson(results[0] as Map<String, dynamic>);
    final doneIds =
        ((results[1] as List)).map((e) => e['lesson_id'] as String).toSet();

    final allLessons = course.allLessons;
    final idx = allLessons.indexWhere((l) => l.id == widget.lessonId);
    final effectiveIdx = idx >= 0 ? idx : 0;
    final lesson = allLessons[effectiveIdx];

    Module? mod;
    for (final m in course.modules) {
      if (m.lessons.any((l) => l.id == lesson.id)) {
        mod = m;
        break;
      }
    }

    setState(() {
      _allLessons = allLessons;
      _completedIds = doneIds;
      _idx = effectiveIdx;
      _isCompleted = doneIds.contains(lesson.id);
      _currentModule = mod;
      _loading = false;
    });

    _initPlayer(lesson);
  }

  void _initPlayer(Lesson lesson) {
    _ytCtrl?.removeListener(_onControllerUpdate);
    _ytCtrl?.dispose();
    final ytId = lesson.youtubeId;
    if (ytId != null) {
      final ctrl = YoutubePlayerController(
        initialVideoId: ytId,
        flags: const YoutubePlayerFlags(autoPlay: false, enableCaption: true),
      );
      ctrl.addListener(_onControllerUpdate);
      setState(() {
        _ytCtrl = ctrl;
        _playerError = false;
      });
    } else {
      setState(() {
        _ytCtrl = null;
        _playerError = false;
      });
    }
  }

  void _onControllerUpdate() {
    if (_ytCtrl == null || !mounted) return;
    final errorCode = _ytCtrl!.value.errorCode;
    if (errorCode != 0 && !_playerError) {
      _ytCtrl!.removeListener(_onControllerUpdate);
      _ytCtrl!.dispose();
      setState(() {
        _ytCtrl = null;
        _playerError = true;
      });
    }
  }

  Future<void> _markDone() async {
    if (_isCompleted || _markingDone) return;
    setState(() => _markingDone = true);
    _btnCtrl.forward(from: 0);

    final uid = supabase.auth.currentUser!.id;
    final lesson = _allLessons[_idx];

    await supabase.from('progress').upsert(
      {'user_id': uid, 'lesson_id': lesson.id},
      onConflict: 'user_id,lesson_id',
    );

    final prog =
        await supabase.from('progress').select('lesson_id').eq('user_id', uid);
    final doneIds =
        (prog as List).map((e) => e['lesson_id'] as String).toSet();

    if (_allLessons.every((l) => doneIds.contains(l.id))) {
      await supabase.from('certificates').upsert(
        {'user_id': uid, 'course_id': widget.courseId},
        onConflict: 'user_id,course_id',
      );
      _showSnack('🏅 Course complete! Certificate issued.');
      await Future.delayed(const Duration(seconds: 2));
      if (mounted) context.go('/certificates');
      return;
    }

    setState(() {
      _isCompleted = true;
      _markingDone = false;
      _completedIds = doneIds;
    });
    _showSnack('Lesson marked as complete ✅');

    if (_idx < _allLessons.length - 1) {
      await Future.delayed(const Duration(milliseconds: 900));
      if (mounted) _navigateTo(_idx + 1);
    }
  }

  void _navigateTo(int idx) {
    final next = _allLessons[idx];
    context.go('/lesson/${next.id}?course=${widget.courseId}');
  }

  void _showSnack(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content:
          Text(msg, style: GoogleFonts.inter(color: AppTheme.cream, fontSize: 13)),
      backgroundColor: AppTheme.surface,
      behavior: SnackBarBehavior.floating,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
        side: const BorderSide(color: AppTheme.border),
      ),
    ));
  }

  @override
  void dispose() {
    _ytCtrl?.dispose();
    _dummyCtrl.dispose();
    _btnCtrl.dispose();
    SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return const Scaffold(
        backgroundColor: AppTheme.bg,
        body: Center(
            child: CircularProgressIndicator(
                color: AppTheme.gold, strokeWidth: 2)),
      );
    }

    final lesson = _allLessons[_idx];
    final lessonNum = _idx + 1;
    final lessonTotal = _allLessons.length;

    return YoutubePlayerBuilder(
      onExitFullScreen: () {
        SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
      },
      player: _ytCtrl != null
          ? YoutubePlayer(
              controller: _ytCtrl!,
              showVideoProgressIndicator: true,
              progressIndicatorColor: AppTheme.gold,
              progressColors: const ProgressBarColors(
                playedColor: AppTheme.gold,
                handleColor: AppTheme.gold,
                bufferedColor: Color(0xFF3A3020),
                backgroundColor: Color(0xFF1E2128),
              ),
            )
          : YoutubePlayer(controller: _dummyCtrl),
      builder: (ctx, ytWidget) {
        return Scaffold(
          backgroundColor: AppTheme.bg,
          appBar: AppBar(
            backgroundColor: AppTheme.bg,
            leading: IconButton(
              icon: const Icon(Icons.arrow_back_ios_new_rounded,
                  color: AppTheme.cream, size: 20),
              onPressed: () => context.pop(),
            ),
            title: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  _currentModule?.title ?? '',
                  style: GoogleFonts.inter(color: AppTheme.fog, fontSize: 12),
                  overflow: TextOverflow.ellipsis,
                ),
                Text(
                  'Lesson $lessonNum of $lessonTotal',
                  style: GoogleFonts.inter(
                    color: AppTheme.fog2,
                    fontSize: 10,
                  ),
                ),
              ],
            ),
            elevation: 0,
          ),
          body: Column(
            children: [
              // ── Progress dot strip ─────────────────────────────────
              _ProgressDots(
                lessons: _allLessons,
                currentIndex: _idx,
                completedIds: _completedIds,
              ),

              // ── Video / error / placeholder ────────────────────────
              if (_ytCtrl != null)
                ytWidget
              else if (_playerError)
                Container(
                  height: 210,
                  color: AppTheme.surface,
                  child: Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.play_circle_outline_rounded,
                            color: AppTheme.fog, size: 44),
                        const SizedBox(height: 10),
                        Text(
                          'Video unavailable for in-app playback.',
                          style:
                              GoogleFonts.inter(color: AppTheme.fog, fontSize: 13),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'The video owner has disabled embedding.',
                          style: GoogleFonts.inter(
                              color: AppTheme.fog2, fontSize: 11),
                        ),
                      ],
                    ),
                  ),
                )
              else
                Container(
                  height: 210,
                  color: AppTheme.surface,
                  child: Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(_typeIcon(lesson.type),
                            style: const TextStyle(fontSize: 36)),
                        const SizedBox(height: 10),
                        Text(
                          lesson.type == 'quiz'
                              ? 'Quiz lesson — see content below'
                              : 'No video for this lesson.',
                          style:
                              GoogleFonts.inter(color: AppTheme.fog, fontSize: 13),
                        ),
                      ],
                    ),
                  ),
                ),

              // ── Lesson info + actions ──────────────────────────────
              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        lesson.title,
                        style: GoogleFonts.cormorantGaramond(
                          color: AppTheme.cream,
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      if (lesson.durationMins != null) ...[
                        const SizedBox(height: 4),
                        Row(
                          children: [
                            Icon(Icons.schedule_rounded,
                                size: 13, color: AppTheme.fog2),
                            const SizedBox(width: 5),
                            Text(
                              '${lesson.durationMins} min',
                              style: GoogleFonts.inter(
                                  color: AppTheme.fog2, fontSize: 12),
                            ),
                          ],
                        ),
                      ],

                      const SizedBox(height: 24),

                      // ── Mark complete button (animated) ────────────
                      AnimatedBuilder(
                        animation: _btnScale,
                        builder: (_, child) => Transform.scale(
                          scale: _btnScale.value,
                          child: child,
                        ),
                        child: SizedBox(
                          width: double.infinity,
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 300),
                            curve: Curves.easeInOut,
                            child: ElevatedButton(
                              onPressed:
                                  _isCompleted || _markingDone ? null : _markDone,
                              style: ElevatedButton.styleFrom(
                                backgroundColor:
                                    _isCompleted ? AppTheme.surface : AppTheme.gold,
                                foregroundColor:
                                    _isCompleted ? AppTheme.teal : AppTheme.bg,
                                side: BorderSide(
                                  color: _isCompleted
                                      ? AppTheme.teal.withOpacity(0.4)
                                      : Colors.transparent,
                                ),
                                disabledBackgroundColor: _isCompleted
                                    ? AppTheme.surface
                                    : AppTheme.surface,
                                disabledForegroundColor: _isCompleted
                                    ? AppTheme.teal
                                    : AppTheme.fog,
                              ),
                              child: _markingDone
                                  ? const SizedBox(
                                      width: 18,
                                      height: 18,
                                      child: CircularProgressIndicator(
                                          strokeWidth: 2,
                                          color: AppTheme.bg),
                                    )
                                  : Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Icon(
                                          _isCompleted
                                              ? Icons.check_circle_rounded
                                              : Icons.check_circle_outline_rounded,
                                          size: 18,
                                          color: _isCompleted
                                              ? AppTheme.teal
                                              : AppTheme.bg,
                                        ),
                                        const SizedBox(width: 8),
                                        Text(
                                          _isCompleted
                                              ? 'Completed'
                                              : 'Mark as Complete',
                                          style: GoogleFonts.inter(
                                            fontWeight: FontWeight.w600,
                                            fontSize: 15,
                                          ),
                                        ),
                                      ],
                                    ),
                            ),
                          ),
                        ),
                      ),

                      const SizedBox(height: 14),

                      // ── Prev / Next ────────────────────────────────
                      Row(
                        children: [
                          Expanded(
                            child: _NavBtn(
                              icon: Icons.chevron_left_rounded,
                              label: _idx > 0
                                  ? _allLessons[_idx - 1].title
                                  : 'Previous',
                              leading: true,
                              enabled: _idx > 0,
                              onTap: () => _navigateTo(_idx - 1),
                            ),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: _NavBtn(
                              icon: Icons.chevron_right_rounded,
                              label: _idx < _allLessons.length - 1
                                  ? _allLessons[_idx + 1].title
                                  : 'Next',
                              leading: false,
                              enabled: _idx < _allLessons.length - 1,
                              onTap: () => _navigateTo(_idx + 1),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  String _typeIcon(String type) => switch (type) {
        'quiz' => '📝',
        'pdf' => '📄',
        'live' => '🔴',
        _ => '🎬',
      };
}

// ── Progress dot strip ───────────────────────────────────────────────────────
class _ProgressDots extends StatelessWidget {
  final List<Lesson> lessons;
  final int currentIndex;
  final Set<String> completedIds;

  const _ProgressDots({
    required this.lessons,
    required this.currentIndex,
    required this.completedIds,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 28,
      color: AppTheme.bg,
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Row(
          children: List.generate(lessons.length, (i) {
            final isDone = completedIds.contains(lessons[i].id);
            final isCurrent = i == currentIndex;
            return AnimatedContainer(
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeInOut,
              margin: const EdgeInsets.symmetric(horizontal: 2.5),
              width: isCurrent ? 22 : 7,
              height: 7,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(4),
                color: isCurrent
                    ? AppTheme.gold
                    : isDone
                        ? AppTheme.teal.withOpacity(0.7)
                        : AppTheme.border,
              ),
            );
          }),
        ),
      ),
    );
  }
}

// ── Navigation button ────────────────────────────────────────────────────────
class _NavBtn extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool leading;
  final bool enabled;
  final VoidCallback onTap;

  const _NavBtn({
    required this.icon,
    required this.label,
    required this.leading,
    required this.enabled,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final textColor = enabled ? AppTheme.cream : AppTheme.fog2.withOpacity(0.35);
    final iconColor = enabled ? AppTheme.fog : AppTheme.fog2.withOpacity(0.35);
    final borderColor = enabled ? AppTheme.border : AppTheme.border.withOpacity(0.3);

    return GestureDetector(
      onTap: enabled ? onTap : null,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 11, horizontal: 10),
        decoration: BoxDecoration(
          color: AppTheme.surface,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: borderColor),
        ),
        child: Row(
          mainAxisAlignment:
              leading ? MainAxisAlignment.start : MainAxisAlignment.end,
          children: leading
              ? [
                  Icon(icon, color: iconColor, size: 18),
                  const SizedBox(width: 4),
                  Expanded(
                    child: Text(
                      label,
                      style: GoogleFonts.inter(
                          color: textColor,
                          fontSize: 12,
                          fontWeight: FontWeight.w500),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ]
              : [
                  Expanded(
                    child: Text(
                      label,
                      style: GoogleFonts.inter(
                          color: textColor,
                          fontSize: 12,
                          fontWeight: FontWeight.w500),
                      overflow: TextOverflow.ellipsis,
                      textAlign: TextAlign.end,
                    ),
                  ),
                  const SizedBox(width: 4),
                  Icon(icon, color: iconColor, size: 18),
                ],
        ),
      ),
    );
  }
}

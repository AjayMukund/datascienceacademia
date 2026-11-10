import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import '../core/supabase.dart';
import '../core/theme.dart';
import '../models/course.dart';
import '../providers/courses_provider.dart';

const _categories = [
  'All',
  'Foundation',
  'Core ML',
  'Advanced AI',
  'Analytics',
  'Cloud & BI',
];

class ExploreScreen extends ConsumerStatefulWidget {
  const ExploreScreen({super.key});

  @override
  ConsumerState<ExploreScreen> createState() => _ExploreScreenState();
}

class _ExploreScreenState extends ConsumerState<ExploreScreen>
    with SingleTickerProviderStateMixin {
  String _selectedCategory = 'All';
  final _enrolling = <String>{};

  late final AnimationController _headerCtrl;
  late final Animation<double> _headerFade;

  @override
  void initState() {
    super.initState();
    _headerCtrl = AnimationController(
        vsync: this, duration: const Duration(milliseconds: 500));
    _headerFade =
        CurvedAnimation(parent: _headerCtrl, curve: Curves.easeOut);
    _headerCtrl.forward();
  }

  @override
  void dispose() {
    _headerCtrl.dispose();
    super.dispose();
  }

  Future<void> _enroll(String courseId) async {
    if (_enrolling.contains(courseId)) return;
    setState(() => _enrolling.add(courseId));
    try {
      final uid = supabase.auth.currentUser?.id;
      if (uid == null) return;
      await supabase.from('enrollments').upsert(
        {'user_id': uid, 'course_id': courseId},
        onConflict: 'user_id,course_id',
      );
      ref.invalidate(enrolledCourseIdsProvider);
      ref.invalidate(enrolledCoursesProvider);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Enrolled! Check your dashboard.',
              style: GoogleFonts.inter(color: AppTheme.cream, fontSize: 13)),
          backgroundColor: AppTheme.surface,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
            side: const BorderSide(color: AppTheme.border),
          ),
        ));
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Could not enroll. Try again.',
              style: GoogleFonts.inter(color: AppTheme.cream, fontSize: 13)),
          backgroundColor: AppTheme.surface,
          behavior: SnackBarBehavior.floating,
        ));
      }
    } finally {
      if (mounted) setState(() => _enrolling.remove(courseId));
    }
  }

  @override
  Widget build(BuildContext context) {
    final allAsync = ref.watch(allCoursesProvider);
    final enrolledIdsAsync = ref.watch(enrolledCourseIdsProvider);

    return Scaffold(
      backgroundColor: AppTheme.bg,
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            // ── Header ──────────────────────────────────────────────
            SliverToBoxAdapter(
              child: FadeTransition(
                opacity: _headerFade,
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(22, 24, 22, 0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Text(
                            'Explore Courses',
                            style: GoogleFonts.cormorantGaramond(
                              color: AppTheme.cream,
                              fontSize: 26,
                              fontWeight: FontWeight.w600,
                              letterSpacing: -0.3,
                            ),
                          ),
                          const SizedBox(width: 10),
                          allAsync.when(
                            data: (list) => Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(
                                color: AppTheme.gold.withOpacity(0.12),
                                borderRadius: BorderRadius.circular(20),
                                border: Border.all(
                                    color: AppTheme.gold.withOpacity(0.3)),
                              ),
                              child: Text(
                                '${list.length}',
                                style: GoogleFonts.inter(
                                  color: AppTheme.gold,
                                  fontSize: 11,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                            ),
                            loading: () => const SizedBox.shrink(),
                            error: (_, __) => const SizedBox.shrink(),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Browse and enroll in our programmes',
                        style: GoogleFonts.inter(
                            color: AppTheme.fog2, fontSize: 13),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // ── Filter tabs ──────────────────────────────────────────
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.only(top: 18, bottom: 4),
                child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 22),
                  child: Row(
                    children: _categories.map((cat) {
                      final selected = _selectedCategory == cat;
                      return GestureDetector(
                        onTap: () =>
                            setState(() => _selectedCategory = cat),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          margin: const EdgeInsets.only(right: 8),
                          padding: const EdgeInsets.symmetric(
                              horizontal: 14, vertical: 8),
                          decoration: BoxDecoration(
                            color: selected
                                ? AppTheme.gold.withOpacity(0.14)
                                : AppTheme.surface,
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(
                              color: selected
                                  ? AppTheme.gold.withOpacity(0.5)
                                  : AppTheme.border,
                            ),
                          ),
                          child: Text(
                            cat,
                            style: GoogleFonts.inter(
                              color: selected
                                  ? AppTheme.gold
                                  : AppTheme.fog,
                              fontSize: 12,
                              fontWeight: selected
                                  ? FontWeight.w600
                                  : FontWeight.w400,
                            ),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ),
              ),
            ),

            // ── Course list ──────────────────────────────────────────
            allAsync.when(
              loading: () => const SliverFillRemaining(
                child: Center(
                  child: CircularProgressIndicator(
                      color: AppTheme.gold, strokeWidth: 2),
                ),
              ),
              error: (e, _) => SliverFillRemaining(
                child: Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.wifi_off_rounded,
                          color: AppTheme.fog2, size: 36),
                      const SizedBox(height: 12),
                      Text('Could not load courses.',
                          style: GoogleFonts.inter(
                              color: AppTheme.fog, fontSize: 14)),
                    ],
                  ),
                ),
              ),
              data: (all) {
                final enrolledIds =
                    enrolledIdsAsync.value ?? {};
                final filtered = _selectedCategory == 'All'
                    ? all
                    : all
                        .where((c) => c.category == _selectedCategory)
                        .toList();

                if (filtered.isEmpty) {
                  return SliverFillRemaining(
                    child: Center(
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Text('🔍',
                              style: TextStyle(fontSize: 36)),
                          const SizedBox(height: 12),
                          Text(
                            'No courses in this category.',
                            style: GoogleFonts.inter(
                                color: AppTheme.fog, fontSize: 14),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'Try running the Supabase SQL to set categories.',
                            style: GoogleFonts.inter(
                                color: AppTheme.fog2, fontSize: 12),
                            textAlign: TextAlign.center,
                          ),
                        ],
                      ),
                    ),
                  );
                }

                return SliverPadding(
                  padding: const EdgeInsets.fromLTRB(22, 12, 22, 32),
                  sliver: SliverList.separated(
                    itemCount: filtered.length,
                    separatorBuilder: (_, __) =>
                        const SizedBox(height: 12),
                    itemBuilder: (ctx, i) => _FadeSlideIn(
                      delayMs: i * 40,
                      child: _CourseTile(
                        course: filtered[i],
                        isEnrolled: enrolledIds
                            .contains(filtered[i].id),
                        isEnrolling:
                            _enrolling.contains(filtered[i].id),
                        onEnroll: () => _enroll(filtered[i].id),
                        onTap: () => context.push('/course/${filtered[i].id}'),
                      ),
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

// ── Course tile ──────────────────────────────────────────────────────────────
class _CourseTile extends StatelessWidget {
  final Course course;
  final bool isEnrolled;
  final bool isEnrolling;
  final VoidCallback onEnroll;
  final VoidCallback? onTap;

  const _CourseTile({
    required this.course,
    required this.isEnrolled,
    required this.isEnrolling,
    required this.onEnroll,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final levelColor = _levelColor(course.level);

    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppTheme.surface,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: isEnrolled
                ? AppTheme.teal.withOpacity(0.25)
                : AppTheme.border,
          ),
          gradient: isEnrolled
              ? LinearGradient(
                  colors: [
                    AppTheme.teal.withOpacity(0.04),
                    AppTheme.surface,
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                )
              : null,
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Emoji icon or thumbnail
            Container(
              width: 52,
              height: 52,
              decoration: BoxDecoration(
                color: levelColor.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
                border:
                    Border.all(color: levelColor.withOpacity(0.25)),
              ),
              child: course.thumbnailUrl != null
                  ? ClipRRect(
                      borderRadius: BorderRadius.circular(11),
                      child: CachedNetworkImage(
                        imageUrl: course.thumbnailUrl!,
                        fit: BoxFit.cover,
                        errorWidget: (_, __, ___) => Center(
                          child: Text(
                            _courseEmoji(course.title),
                            style: const TextStyle(fontSize: 22),
                          ),
                        ),
                      ),
                    )
                  : Center(
                      child: Text(
                        _courseEmoji(course.title),
                        style: const TextStyle(fontSize: 22),
                      ),
                    ),
            ),
            const SizedBox(width: 14),

            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Category + level
                  Row(
                    children: [
                      if (course.category != null)
                        Text(
                          course.category!.toUpperCase(),
                          style: GoogleFonts.inter(
                            color: AppTheme.fog2,
                            fontSize: 9,
                            fontWeight: FontWeight.w600,
                            letterSpacing: 0.8,
                          ),
                        ),
                      if (course.category != null &&
                          course.level != null)
                        Padding(
                          padding:
                              const EdgeInsets.symmetric(horizontal: 5),
                          child: Text('·',
                              style: GoogleFonts.inter(
                                  color: AppTheme.fog2, fontSize: 9)),
                        ),
                      if (course.level != null)
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: levelColor.withOpacity(0.12),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            course.level!,
                            style: GoogleFonts.inter(
                              color: levelColor,
                              fontSize: 9,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: 4),

                  // Title
                  Text(
                    course.title,
                    style: GoogleFonts.cormorantGaramond(
                      color: AppTheme.cream,
                      fontSize: 15,
                      fontWeight: FontWeight.w600,
                    ),
                  ),

                  // Description
                  if (course.description != null) ...[
                    const SizedBox(height: 3),
                    Text(
                      course.description!,
                      style: GoogleFonts.inter(
                        color: AppTheme.fog2,
                        fontSize: 11,
                        height: 1.5,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],

                  const SizedBox(height: 10),

                  // Footer: duration + action button
                  Row(
                    children: [
                      if (course.durationWeeks != null) ...[
                        Icon(Icons.schedule_rounded,
                            size: 12, color: AppTheme.fog2),
                        const SizedBox(width: 4),
                        Text(
                          '${course.durationWeeks} weeks',
                          style: GoogleFonts.inter(
                              color: AppTheme.fog2, fontSize: 11),
                        ),
                      ],
                      const Spacer(),
                      // Action button
                      if (isEnrolled)
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 10, vertical: 5),
                          decoration: BoxDecoration(
                            color: AppTheme.teal.withOpacity(0.12),
                            borderRadius: BorderRadius.circular(6),
                            border: Border.all(
                                color: AppTheme.teal.withOpacity(0.35)),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const Icon(Icons.check_circle_rounded,
                                  size: 11, color: AppTheme.teal),
                              const SizedBox(width: 4),
                              Text(
                                'Enrolled',
                                style: GoogleFonts.inter(
                                  color: AppTheme.teal,
                                  fontSize: 11,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          ),
                        )
                      else
                        GestureDetector(
                          onTap: isEnrolling ? null : onEnroll,
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 200),
                            padding: const EdgeInsets.symmetric(
                                horizontal: 12, vertical: 5),
                            decoration: BoxDecoration(
                              color: isEnrolling
                                  ? AppTheme.surface
                                  : AppTheme.gold.withOpacity(0.14),
                              borderRadius: BorderRadius.circular(6),
                              border: Border.all(
                                color: isEnrolling
                                    ? AppTheme.border
                                    : AppTheme.gold.withOpacity(0.4),
                              ),
                            ),
                            child: isEnrolling
                                ? const SizedBox(
                                    width: 11,
                                    height: 11,
                                    child: CircularProgressIndicator(
                                      strokeWidth: 1.5,
                                      color: AppTheme.gold,
                                    ),
                                  )
                                : Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Text(
                                        'Enroll',
                                        style: GoogleFonts.inter(
                                          color: AppTheme.gold,
                                          fontSize: 11,
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                      const SizedBox(width: 4),
                                      const Icon(
                                          Icons.arrow_forward_rounded,
                                          size: 11,
                                          color: AppTheme.gold),
                                    ],
                                  ),
                          ),
                        ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Color _levelColor(String? level) {
    return switch (level?.toLowerCase()) {
      'beginner' => AppTheme.teal,
      'intermediate' => AppTheme.gold,
      'advanced' => const Color(0xFFE07B6A),
      _ => AppTheme.fog,
    };
  }

  String _courseEmoji(String title) {
    final t = title.toLowerCase();
    if (t.contains('python')) return '🐍';
    if (t.contains('sql')) return '🗄️';
    if (t.contains('r programming') || t == 'r') return '📐';
    if (t.contains('machine learning')) return '🧠';
    if (t.contains('natural language') || t.contains('nlp')) return '💬';
    if (t.contains('feature')) return '⚙️';
    if (t.contains('deep learning')) return '⚡';
    if (t.contains('computer vision')) return '👁️';
    if (t.contains('large language')) return '🔤';
    if (t.contains('generative')) return '✨';
    if (t.contains('reinforcement')) return '🎮';
    if (t.contains('mlops') || t.contains('deployment')) return '🚀';
    if (t.contains('visuali')) return '📊';
    if (t.contains('excel')) return '📋';
    if (t.contains('tableau')) return '🔷';
    if (t.contains('power bi')) return '📈';
    if (t.contains('azure')) return '☁️';
    if (t.contains('aws')) return '🟠';
    return '📚';
  }
}

// ── Staggered entrance ───────────────────────────────────────────────────────
class _FadeSlideIn extends StatefulWidget {
  final int delayMs;
  final Widget child;
  const _FadeSlideIn({required this.delayMs, required this.child});

  @override
  State<_FadeSlideIn> createState() => _FadeSlideInState();
}

class _FadeSlideInState extends State<_FadeSlideIn>
    with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl;
  late final Animation<double> _fade;
  late final Animation<Offset> _slide;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
        vsync: this, duration: const Duration(milliseconds: 400));
    _fade = CurvedAnimation(parent: _ctrl, curve: Curves.easeOut);
    _slide = Tween<Offset>(begin: const Offset(0, 0.08), end: Offset.zero)
        .animate(
            CurvedAnimation(parent: _ctrl, curve: Curves.easeOutCubic));
    Future.delayed(Duration(milliseconds: widget.delayMs),
        () { if (mounted) _ctrl.forward(); });
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => FadeTransition(
        opacity: _fade,
        child: SlideTransition(position: _slide, child: widget.child),
      );
}

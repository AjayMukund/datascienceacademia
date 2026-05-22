import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:percent_indicator/linear_percent_indicator.dart';
import '../core/supabase.dart';
import '../core/theme.dart';
import '../models/course.dart';
import '../providers/courses_provider.dart';

class CourseScreen extends ConsumerStatefulWidget {
  final String courseId;
  const CourseScreen({super.key, required this.courseId});

  @override
  ConsumerState<CourseScreen> createState() => _CourseScreenState();
}

class _CourseScreenState extends ConsumerState<CourseScreen> {
  bool _enrolling = false;

  Future<void> _enroll() async {
    final uid = supabase.auth.currentUser?.id;
    if (uid == null || _enrolling) return;
    setState(() => _enrolling = true);
    try {
      await supabase.from('enrollments').upsert(
        {'user_id': uid, 'course_id': widget.courseId},
        onConflict: 'user_id,course_id',
      );
      ref.invalidate(enrolledCourseIdsProvider);
      ref.invalidate(enrolledCoursesProvider);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Enrolled! You can now start learning.',
              style: GoogleFonts.inter(color: AppTheme.cream, fontSize: 13)),
          backgroundColor: AppTheme.surface,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
            side: const BorderSide(color: AppTheme.border),
          ),
        ));
      }
    } catch (_) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Could not enroll. Try again.',
              style: GoogleFonts.inter(color: AppTheme.cream, fontSize: 13)),
          backgroundColor: AppTheme.surface,
          behavior: SnackBarBehavior.floating,
        ));
      }
    } finally {
      if (mounted) setState(() => _enrolling = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final courseAsync = ref.watch(courseDetailProvider(widget.courseId));
    final progressAsync = ref.watch(progressProvider);
    final enrolledIdsAsync = ref.watch(enrolledCourseIdsProvider);

    final isEnrolled = enrolledIdsAsync.value?.contains(widget.courseId) ?? false;

    return Scaffold(
      backgroundColor: AppTheme.bg,
      bottomNavigationBar: !isEnrolled
          ? _EnrollBar(enrolling: _enrolling, onEnroll: _enroll)
          : null,
      body: courseAsync.when(
        loading: () => const Center(
            child: CircularProgressIndicator(color: AppTheme.gold, strokeWidth: 2)),
        error: (e, _) => Center(
          child: Text('Error: $e', style: GoogleFonts.inter(color: AppTheme.fog)),
        ),
        data: (course) {
          final doneIds = progressAsync.value ?? {};
          final total = course.totalLessons;
          final done = course.allLessons.where((l) => doneIds.contains(l.id)).length;
          final pct = total > 0 ? done / total : 0.0;

          return CustomScrollView(
            slivers: [
              // Hero thumbnail + back button
              SliverAppBar(
                backgroundColor: AppTheme.bg,
                expandedHeight: course.thumbnailUrl != null ? 200 : 0,
                pinned: true,
                leading: IconButton(
                  icon: Container(
                    padding: const EdgeInsets.all(6),
                    decoration: BoxDecoration(
                      color: AppTheme.bg.withOpacity(0.7),
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(Icons.arrow_back_ios_new_rounded,
                        color: AppTheme.cream, size: 16),
                  ),
                  onPressed: () => context.pop(),
                ),
                flexibleSpace: course.thumbnailUrl != null
                    ? FlexibleSpaceBar(
                        background: CachedNetworkImage(
                          imageUrl: course.thumbnailUrl!,
                          fit: BoxFit.cover,
                          errorWidget: (_, __, ___) =>
                              Container(color: AppTheme.surface),
                        ),
                      )
                    : null,
              ),

              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(20, 20, 20, 8),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Level badge + preview pill
                      Row(
                        children: [
                          if (course.level != null)
                            Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(
                                color: AppTheme.gold.withOpacity(0.10),
                                borderRadius: BorderRadius.circular(5),
                                border: Border.all(
                                    color: AppTheme.gold.withOpacity(0.28)),
                              ),
                              child: Text(
                                course.level!.toUpperCase(),
                                style: GoogleFonts.inter(
                                  color: AppTheme.gold,
                                  fontSize: 10,
                                  fontWeight: FontWeight.w600,
                                  letterSpacing: 0.6,
                                ),
                              ),
                            ),
                          if (!isEnrolled) ...[
                            const SizedBox(width: 8),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(
                                color: AppTheme.surface,
                                borderRadius: BorderRadius.circular(5),
                                border:
                                    Border.all(color: AppTheme.border),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  const Icon(Icons.visibility_outlined,
                                      size: 10, color: AppTheme.fog2),
                                  const SizedBox(width: 4),
                                  Text(
                                    'Preview',
                                    style: GoogleFonts.inter(
                                      color: AppTheme.fog2,
                                      fontSize: 10,
                                      fontWeight: FontWeight.w500,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ],
                      ),
                      const SizedBox(height: 10),

                      Text(course.title,
                          style: Theme.of(context).textTheme.headlineMedium),

                      if (course.description != null) ...[
                        const SizedBox(height: 8),
                        Text(
                          course.description!,
                          style: GoogleFonts.inter(
                              color: AppTheme.fog, fontSize: 13, height: 1.6),
                        ),
                      ],

                      const SizedBox(height: 16),

                      // Stats row
                      Row(
                        children: [
                          _StatChip(
                            icon: Icons.menu_book_rounded,
                            label: '$total lessons',
                          ),
                          const SizedBox(width: 8),
                          _StatChip(
                            icon: Icons.view_module_rounded,
                            label: '${course.modules.length} modules',
                          ),
                          if (course.durationWeeks != null) ...[
                            const SizedBox(width: 8),
                            _StatChip(
                              icon: Icons.schedule_rounded,
                              label: '${course.durationWeeks}w',
                            ),
                          ],
                        ],
                      ),

                      const SizedBox(height: 18),

                      // Progress (enrolled only)
                      if (isEnrolled) ...[
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('$done / $total lessons',
                                style: GoogleFonts.inter(
                                    color: AppTheme.fog2, fontSize: 12)),
                            Text(
                              pct >= 1.0
                                  ? '✓ Complete'
                                  : '${(pct * 100).round()}%',
                              style: GoogleFonts.inter(
                                color: pct >= 1.0
                                    ? AppTheme.teal
                                    : AppTheme.gold,
                                fontSize: 12,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 6),
                        LinearPercentIndicator(
                          percent: pct.clamp(0.0, 1.0),
                          lineHeight: 5,
                          backgroundColor: AppTheme.border,
                          progressColor:
                              pct >= 1.0 ? AppTheme.teal : AppTheme.gold,
                          padding: EdgeInsets.zero,
                          barRadius: const Radius.circular(4),
                        ),
                        const SizedBox(height: 24),
                      ] else ...[
                        const SizedBox(height: 6),
                      ],

                      Text(
                        'Course Content',
                        style: GoogleFonts.cormorantGaramond(
                          color: AppTheme.cream,
                          fontSize: 18,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              // Modules
              SliverList.builder(
                itemCount: course.modules.length,
                itemBuilder: (ctx, mi) {
                  final mod = course.modules[mi];
                  final modDone = mod.lessons
                      .where((l) => doneIds.contains(l.id))
                      .length;
                  return _ModuleTile(
                    module: mod,
                    doneCount: modDone,
                    doneIds: doneIds,
                    courseId: widget.courseId,
                    initiallyExpanded: mi == 0,
                    isEnrolled: isEnrolled,
                  );
                },
              ),

              SliverToBoxAdapter(
                  child: SizedBox(height: isEnrolled ? 32 : 100)),
            ],
          );
        },
      ),
    );
  }
}

// ── Enroll bar ────────────────────────────────────────────────────────────────
class _EnrollBar extends StatelessWidget {
  final bool enrolling;
  final VoidCallback onEnroll;
  const _EnrollBar({required this.enrolling, required this.onEnroll});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.fromLTRB(
          20, 14, 20, 14 + MediaQuery.of(context).padding.bottom),
      decoration: const BoxDecoration(
        color: AppTheme.surface,
        border: Border(top: BorderSide(color: AppTheme.border)),
      ),
      child: GestureDetector(
        onTap: enrolling ? null : onEnroll,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          height: 50,
          decoration: BoxDecoration(
            gradient: enrolling
                ? null
                : const LinearGradient(
                    colors: [Color(0xFFB8963E), AppTheme.gold],
                    begin: Alignment.centerLeft,
                    end: Alignment.centerRight,
                  ),
            color: enrolling ? AppTheme.border : null,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Center(
            child: enrolling
                ? const SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(
                        strokeWidth: 2, color: AppTheme.gold),
                  )
                : Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        'Enroll in this Course',
                        style: GoogleFonts.inter(
                          color: AppTheme.bg,
                          fontSize: 15,
                          fontWeight: FontWeight.w700,
                          letterSpacing: 0.2,
                        ),
                      ),
                      const SizedBox(width: 8),
                      const Icon(Icons.arrow_forward_rounded,
                          color: AppTheme.bg, size: 18),
                    ],
                  ),
          ),
        ),
      ),
    );
  }
}

// ── Stat chip ────────────────────────────────────────────────────────────────
class _StatChip extends StatelessWidget {
  final IconData icon;
  final String label;
  const _StatChip({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: AppTheme.border),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 12, color: AppTheme.fog2),
          const SizedBox(width: 5),
          Text(label,
              style: GoogleFonts.inter(color: AppTheme.fog, fontSize: 11)),
        ],
      ),
    );
  }
}

// ── Module tile ───────────────────────────────────────────────────────────────
class _ModuleTile extends StatelessWidget {
  final Module module;
  final int doneCount;
  final Set<String> doneIds;
  final String courseId;
  final bool initiallyExpanded;
  final bool isEnrolled;

  const _ModuleTile({
    required this.module,
    required this.doneCount,
    required this.doneIds,
    required this.courseId,
    required this.initiallyExpanded,
    required this.isEnrolled,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.fromLTRB(20, 0, 20, 10),
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.border),
      ),
      clipBehavior: Clip.hardEdge,
      child: Theme(
        data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
        child: ExpansionTile(
          initiallyExpanded: initiallyExpanded,
          tilePadding:
              const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
          childrenPadding: EdgeInsets.zero,
          title: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                module.title,
                style: GoogleFonts.inter(
                  color: AppTheme.cream,
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                isEnrolled
                    ? '$doneCount / ${module.lessons.length} completed'
                    : '${module.lessons.length} lessons',
                style: GoogleFonts.inter(
                    color: AppTheme.fog2, fontSize: 11),
              ),
            ],
          ),
          iconColor: AppTheme.fog,
          collapsedIconColor: AppTheme.fog2,
          children: module.lessons.map((lesson) {
            final isDone = doneIds.contains(lesson.id);
            return InkWell(
              onTap: isEnrolled
                  ? () => context
                      .push('/lesson/${lesson.id}?course=$courseId')
                  : null,
              child: Container(
                padding: const EdgeInsets.symmetric(
                    horizontal: 16, vertical: 12),
                decoration: const BoxDecoration(
                  border:
                      Border(top: BorderSide(color: AppTheme.border)),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 30,
                      height: 30,
                      decoration: BoxDecoration(
                        color: !isEnrolled
                            ? AppTheme.bg.withOpacity(0.5)
                            : isDone
                                ? AppTheme.teal.withOpacity(0.12)
                                : AppTheme.bg,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(
                          color: !isEnrolled
                              ? AppTheme.border.withOpacity(0.5)
                              : isDone
                                  ? AppTheme.teal.withOpacity(0.4)
                                  : AppTheme.border,
                        ),
                      ),
                      child: Center(
                        child: isEnrolled
                            ? Text(
                                isDone ? '✓' : _typeIcon(lesson.type),
                                style: TextStyle(
                                  fontSize: isDone ? 13 : 12,
                                  color: isDone
                                      ? AppTheme.teal
                                      : AppTheme.fog,
                                ),
                              )
                            : const Icon(Icons.lock_outline_rounded,
                                size: 13, color: AppTheme.fog2),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        lesson.title,
                        style: GoogleFonts.inter(
                          color: isEnrolled
                              ? (isDone ? AppTheme.fog : AppTheme.cream)
                              : AppTheme.fog2,
                          fontSize: 13,
                          fontWeight: FontWeight.w400,
                          decoration: (isEnrolled && isDone)
                              ? TextDecoration.lineThrough
                              : null,
                          decorationColor: AppTheme.fog,
                        ),
                      ),
                    ),
                    if (lesson.durationMins != null) ...[
                      const SizedBox(width: 8),
                      Text(
                        '${lesson.durationMins}m',
                        style: GoogleFonts.inter(
                            color: AppTheme.fog2, fontSize: 11),
                      ),
                    ],
                  ],
                ),
              ),
            );
          }).toList(),
        ),
      ),
    );
  }

  String _typeIcon(String type) {
    return switch (type) {
      'quiz' => '📝',
      'pdf' => '📄',
      'live' => '🔴',
      _ => '▶',
    };
  }
}

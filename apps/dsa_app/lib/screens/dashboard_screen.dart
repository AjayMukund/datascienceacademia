import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:percent_indicator/percent_indicator.dart';
import '../core/theme.dart';
import '../providers/auth_provider.dart';
import '../providers/courses_provider.dart';
import '../widgets/course_card.dart';

class DashboardScreen extends ConsumerStatefulWidget {
  const DashboardScreen({super.key});

  @override
  ConsumerState<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends ConsumerState<DashboardScreen>
    with SingleTickerProviderStateMixin {
  late final AnimationController _headerCtrl;
  late final Animation<double> _headerFade;
  late final Animation<Offset> _headerSlide;

  @override
  void initState() {
    super.initState();
    _headerCtrl = AnimationController(
        vsync: this, duration: const Duration(milliseconds: 550));
    _headerFade =
        CurvedAnimation(parent: _headerCtrl, curve: Curves.easeOut);
    _headerSlide = Tween<Offset>(
            begin: const Offset(0, -0.06), end: Offset.zero)
        .animate(
            CurvedAnimation(parent: _headerCtrl, curve: Curves.easeOutCubic));
    _headerCtrl.forward();
  }

  @override
  void dispose() {
    _headerCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final profile = ref.watch(profileProvider);
    final courses = ref.watch(enrolledCoursesProvider);
    final progress = ref.watch(progressProvider);

    final hour = DateTime.now().hour;
    final greeting = hour < 12
        ? 'Good morning'
        : hour < 17
            ? 'Good afternoon'
            : 'Good evening';

    return Scaffold(
      backgroundColor: AppTheme.bg,
      body: SafeArea(
        child: RefreshIndicator(
          color: AppTheme.gold,
          backgroundColor: AppTheme.surface,
          onRefresh: () async {
            ref.invalidate(enrolledCoursesProvider);
            ref.invalidate(progressProvider);
            ref.invalidate(profileProvider);
          },
          child: CustomScrollView(
            slivers: [
              // ── Header ──────────────────────────────────────────────
              SliverToBoxAdapter(
                child: FadeTransition(
                  opacity: _headerFade,
                  child: SlideTransition(
                    position: _headerSlide,
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(22, 24, 22, 8),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                profile.when(
                                  data: (p) => Text(
                                    '$greeting,',
                                    style: GoogleFonts.inter(
                                        color: AppTheme.fog, fontSize: 13),
                                  ),
                                  loading: () => const SizedBox.shrink(),
                                  error: (_, __) => const SizedBox.shrink(),
                                ),
                                profile.when(
                                  data: (p) => Text(
                                    (p?['name'] as String? ?? 'Student')
                                        .split(' ')
                                        .first,
                                    style: GoogleFonts.cormorantGaramond(
                                      color: AppTheme.cream,
                                      fontSize: 28,
                                      fontWeight: FontWeight.w600,
                                      letterSpacing: -0.5,
                                    ),
                                  ),
                                  loading: () => Container(
                                    width: 120,
                                    height: 30,
                                    decoration: BoxDecoration(
                                      color: AppTheme.surface,
                                      borderRadius:
                                          BorderRadius.circular(6),
                                    ),
                                  ),
                                  error: (_, __) => const Text('Student'),
                                ),
                              ],
                            ),
                          ),
                          // Avatar — tapping goes to profile
                          profile.when(
                            data: (p) {
                              final name =
                                  p?['name'] as String? ?? '?';
                              final avatarUrl =
                                  p?['avatar_url'] as String?;
                              return GestureDetector(
                                onTap: () => context.go('/profile'),
                                child: Container(
                                  width: 46,
                                  height: 46,
                                  decoration: BoxDecoration(
                                    shape: BoxShape.circle,
                                    gradient: avatarUrl == null
                                        ? const LinearGradient(
                                            colors: [
                                              Color(0xFFD4B47A),
                                              Color(0xFF8A6A3A),
                                            ],
                                            begin: Alignment.topLeft,
                                            end: Alignment.bottomRight,
                                          )
                                        : null,
                                    border: Border.all(
                                      color: AppTheme.gold.withOpacity(0.4),
                                      width: 1.5,
                                    ),
                                  ),
                                  child: ClipOval(
                                    child: avatarUrl != null
                                        ? CachedNetworkImage(
                                            imageUrl: avatarUrl,
                                            fit: BoxFit.cover,
                                            width: 46,
                                            height: 46,
                                            errorWidget: (_, __, ___) =>
                                                _Initial(name),
                                          )
                                        : _Initial(name),
                                  ),
                                ),
                              );
                            },
                            loading: () =>
                                const SizedBox(width: 46, height: 46),
                            error: (_, __) =>
                                const SizedBox(width: 46, height: 46),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),

              // ── Progress hero card ───────────────────────────────────
              progress.when(
                data: (doneIds) => courses.when(
                  data: (list) {
                    final totalLessons = list.fold<int>(
                        0, (s, c) => s + c.totalLessons);
                    final completedLessons = list
                        .expand((c) => c.allLessons)
                        .where((l) => doneIds.contains(l.id))
                        .length;
                    final overallPct = totalLessons > 0
                        ? completedLessons / totalLessons
                        : 0.0;

                    return SliverToBoxAdapter(
                      child: Padding(
                        padding: const EdgeInsets.fromLTRB(22, 18, 22, 0),
                        child: Container(
                          padding:
                              const EdgeInsets.fromLTRB(18, 16, 18, 16),
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              colors: [
                                AppTheme.gold.withOpacity(0.09),
                                AppTheme.surface,
                              ],
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ),
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(
                                color: AppTheme.gold.withOpacity(0.2)),
                          ),
                          child: Row(
                            children: [
                              Expanded(
                                child: Column(
                                  crossAxisAlignment:
                                      CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'YOUR PROGRESS',
                                      style: GoogleFonts.inter(
                                        color: AppTheme.fog2,
                                        fontSize: 10,
                                        letterSpacing: 1.0,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                    const SizedBox(height: 10),
                                    _ProgressRow(
                                      icon: Icons.school_rounded,
                                      color: AppTheme.gold,
                                      label:
                                          '${list.length} course${list.length == 1 ? '' : 's'} enrolled',
                                    ),
                                    const SizedBox(height: 5),
                                    _ProgressRow(
                                      icon: Icons
                                          .check_circle_outline_rounded,
                                      color: AppTheme.teal,
                                      label:
                                          '$completedLessons / $totalLessons lessons done',
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(width: 16),
                              CircularPercentIndicator(
                                radius: 40,
                                lineWidth: 6,
                                percent: overallPct.clamp(0.0, 1.0),
                                center: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Text(
                                      '${(overallPct * 100).round()}%',
                                      style: GoogleFonts.inter(
                                        color: AppTheme.gold,
                                        fontSize: 14,
                                        fontWeight: FontWeight.w700,
                                      ),
                                    ),
                                    Text(
                                      'done',
                                      style: GoogleFonts.inter(
                                        color: AppTheme.fog2,
                                        fontSize: 9,
                                      ),
                                    ),
                                  ],
                                ),
                                progressColor: AppTheme.gold,
                                backgroundColor: AppTheme.border,
                                circularStrokeCap:
                                    CircularStrokeCap.round,
                                animation: true,
                                animationDuration: 1400,
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                  loading: () =>
                      const SliverToBoxAdapter(child: SizedBox()),
                  error: (_, __) =>
                      const SliverToBoxAdapter(child: SizedBox()),
                ),
                loading: () =>
                    const SliverToBoxAdapter(child: SizedBox()),
                error: (_, __) =>
                    const SliverToBoxAdapter(child: SizedBox()),
              ),

              // ── Section header ───────────────────────────────────────
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(22, 28, 22, 14),
                  child: Row(
                    children: [
                      Text(
                        'Continue Learning',
                        style: GoogleFonts.cormorantGaramond(
                          color: AppTheme.cream,
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Container(
                          height: 1,
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              colors: [
                                AppTheme.gold.withOpacity(0.4),
                                Colors.transparent,
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              // ── Course list ──────────────────────────────────────────
              courses.when(
                loading: () => _skeletonSliver(),
                error: (e, _) => SliverFillRemaining(
                  child: Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.wifi_off_rounded,
                            color: AppTheme.fog2, size: 36),
                        const SizedBox(height: 12),
                        Text(
                          'Could not load courses.',
                          style: GoogleFonts.inter(
                              color: AppTheme.fog, fontSize: 14),
                        ),
                      ],
                    ),
                  ),
                ),
                data: (list) {
                  if (list.isEmpty) {
                    return SliverFillRemaining(
                      child: Center(
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Container(
                              width: 72,
                              height: 72,
                              decoration: BoxDecoration(
                                color: AppTheme.surface,
                                shape: BoxShape.circle,
                                border: Border.all(color: AppTheme.border),
                              ),
                              child: const Center(
                                child: Text('📚',
                                    style: TextStyle(fontSize: 32)),
                              ),
                            ),
                            const SizedBox(height: 16),
                            Text(
                              'No courses enrolled yet.',
                              style: GoogleFonts.cormorantGaramond(
                                color: AppTheme.cream,
                                fontSize: 20,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            const SizedBox(height: 6),
                            Text(
                              'Contact your instructor to get started.',
                              style: GoogleFonts.inter(
                                  color: AppTheme.fog2, fontSize: 13),
                            ),
                          ],
                        ),
                      ),
                    );
                  }
                  return progress.when(
                    data: (doneIds) => SliverPadding(
                      padding: const EdgeInsets.fromLTRB(22, 0, 22, 32),
                      sliver: SliverList.separated(
                        itemCount: list.length,
                        separatorBuilder: (_, __) =>
                            const SizedBox(height: 14),
                        itemBuilder: (ctx, i) => _FadeSlideIn(
                          delayMs: i * 80,
                          child: CourseCard(
                            course: list[i],
                            completedIds: doneIds,
                            onTap: () =>
                                context.push('/course/${list[i].id}'),
                          ),
                        ),
                      ),
                    ),
                    loading: () => _skeletonSliver(),
                    error: (_, __) =>
                        const SliverToBoxAdapter(child: SizedBox()),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _skeletonSliver() => SliverPadding(
        padding: const EdgeInsets.fromLTRB(22, 0, 22, 32),
        sliver: SliverList.separated(
          itemCount: 3,
          separatorBuilder: (_, __) => const SizedBox(height: 14),
          itemBuilder: (_, __) => const _SkeletonCard(),
        ),
      );
}

// ── Progress row helper ──────────────────────────────────────────────────────
class _ProgressRow extends StatelessWidget {
  final IconData icon;
  final Color color;
  final String label;
  const _ProgressRow(
      {required this.icon, required this.color, required this.label});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, color: color.withOpacity(0.75), size: 14),
        const SizedBox(width: 7),
        Text(
          label,
          style: GoogleFonts.inter(color: AppTheme.fog, fontSize: 13),
        ),
      ],
    );
  }
}

// ── Avatar initial ───────────────────────────────────────────────────────────
class _Initial extends StatelessWidget {
  final String name;
  const _Initial(this.name);
  @override
  Widget build(BuildContext context) => Center(
        child: Text(
          name.isNotEmpty ? name[0].toUpperCase() : '?',
          style: GoogleFonts.inter(
            color: Colors.white,
            fontWeight: FontWeight.w700,
            fontSize: 17,
          ),
        ),
      );
}

// ── Staggered fade + slide entrance ─────────────────────────────────────────
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
        vsync: this, duration: const Duration(milliseconds: 480));
    _fade = CurvedAnimation(parent: _ctrl, curve: Curves.easeOut);
    _slide = Tween<Offset>(
            begin: const Offset(0, 0.10), end: Offset.zero)
        .animate(
            CurvedAnimation(parent: _ctrl, curve: Curves.easeOutCubic));
    Future.delayed(
        Duration(milliseconds: widget.delayMs),
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

// ── Shimmer skeleton card ────────────────────────────────────────────────────
class _SkeletonCard extends StatefulWidget {
  const _SkeletonCard();

  @override
  State<_SkeletonCard> createState() => _SkeletonCardState();
}

class _SkeletonCardState extends State<_SkeletonCard>
    with SingleTickerProviderStateMixin {
  late final AnimationController _shimmer;

  @override
  void initState() {
    super.initState();
    _shimmer = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1000),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _shimmer.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _shimmer,
      builder: (_, __) {
        final c = Color.lerp(
          AppTheme.surface,
          AppTheme.border,
          _shimmer.value * 0.7,
        )!;
        return Container(
          decoration: BoxDecoration(
            color: AppTheme.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: AppTheme.border),
          ),
          clipBehavior: Clip.hardEdge,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(height: 136, color: c),
              Padding(
                padding: const EdgeInsets.all(14),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: double.infinity,
                      height: 15,
                      decoration: BoxDecoration(
                          color: c, borderRadius: BorderRadius.circular(4)),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      width: 160,
                      height: 11,
                      decoration: BoxDecoration(
                          color: c, borderRadius: BorderRadius.circular(4)),
                    ),
                    const SizedBox(height: 12),
                    Container(
                      width: double.infinity,
                      height: 5,
                      decoration: BoxDecoration(
                          color: c, borderRadius: BorderRadius.circular(4)),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

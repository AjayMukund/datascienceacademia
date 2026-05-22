import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:percent_indicator/percent_indicator.dart';
import '../core/theme.dart';
import '../models/course.dart';

class CourseCard extends StatefulWidget {
  final Course course;
  final Set<String> completedIds;
  final VoidCallback onTap;

  const CourseCard({
    super.key,
    required this.course,
    required this.completedIds,
    required this.onTap,
  });

  @override
  State<CourseCard> createState() => _CourseCardState();
}

class _CourseCardState extends State<CourseCard>
    with SingleTickerProviderStateMixin {
  late final AnimationController _pressCtrl;
  late final Animation<double> _scaleAnim;

  @override
  void initState() {
    super.initState();
    _pressCtrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 80),
      reverseDuration: const Duration(milliseconds: 200),
    );
    _scaleAnim = Tween<double>(begin: 1.0, end: 0.965).animate(
      CurvedAnimation(parent: _pressCtrl, curve: Curves.easeIn),
    );
  }

  @override
  void dispose() {
    _pressCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final total = widget.course.totalLessons;
    final done = widget.course.allLessons
        .where((l) => widget.completedIds.contains(l.id))
        .length;
    final pct = total > 0 ? done / total : 0.0;
    final isComplete = pct >= 1.0;
    final accentColor = isComplete ? AppTheme.teal : AppTheme.gold;

    return AnimatedBuilder(
      animation: _scaleAnim,
      builder: (_, child) =>
          Transform.scale(scale: _scaleAnim.value, child: child),
      child: GestureDetector(
        onTapDown: (_) => _pressCtrl.forward(),
        onTapUp: (_) {
          _pressCtrl.reverse();
          widget.onTap();
        },
        onTapCancel: () => _pressCtrl.reverse(),
        child: Container(
          decoration: BoxDecoration(
            color: AppTheme.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: accentColor.withOpacity(0.22)),
            boxShadow: [
              BoxShadow(
                color: accentColor.withOpacity(0.07),
                blurRadius: 22,
                offset: const Offset(0, 5),
              ),
            ],
          ),
          clipBehavior: Clip.hardEdge,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Thumbnail with overlays
              Stack(
                children: [
                  SizedBox(
                    height: 136,
                    width: double.infinity,
                    child: widget.course.thumbnailUrl != null
                        ? CachedNetworkImage(
                            imageUrl: widget.course.thumbnailUrl!,
                            fit: BoxFit.cover,
                            placeholder: (_, __) =>
                                Container(color: const Color(0xFF1A1D22)),
                            errorWidget: (_, __, ___) =>
                                _ThumbnailFallback(widget.course.title),
                          )
                        : _ThumbnailFallback(widget.course.title),
                  ),
                  // Bottom gradient fade into card body
                  Positioned(
                    bottom: 0,
                    left: 0,
                    right: 0,
                    child: Container(
                      height: 64,
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                          colors: [
                            Colors.transparent,
                            AppTheme.surface.withOpacity(0.92),
                          ],
                        ),
                      ),
                    ),
                  ),
                  // Level badge (top-left, on image)
                  if (widget.course.level != null)
                    Positioned(
                      top: 10,
                      left: 12,
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: AppTheme.bg.withOpacity(0.82),
                          borderRadius: BorderRadius.circular(5),
                          border: Border.all(
                              color: AppTheme.gold.withOpacity(0.4)),
                        ),
                        child: Text(
                          widget.course.level!.toUpperCase(),
                          style: GoogleFonts.inter(
                            color: AppTheme.gold,
                            fontSize: 9,
                            fontWeight: FontWeight.w700,
                            letterSpacing: 0.8,
                          ),
                        ),
                      ),
                    ),
                  // Complete badge (top-right, on image)
                  if (isComplete)
                    Positioned(
                      top: 10,
                      right: 12,
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppTheme.teal.withOpacity(0.18),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                              color: AppTheme.teal.withOpacity(0.45)),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.check_circle_rounded,
                                color: AppTheme.teal, size: 11),
                            const SizedBox(width: 4),
                            Text(
                              'Complete',
                              style: GoogleFonts.inter(
                                color: AppTheme.teal,
                                fontSize: 10,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                ],
              ),

              Padding(
                padding: const EdgeInsets.fromLTRB(14, 12, 14, 14),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Title + arrow
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(
                          child: Text(
                            widget.course.title,
                            style: GoogleFonts.cormorantGaramond(
                              color: AppTheme.cream,
                              fontSize: 17,
                              fontWeight: FontWeight.w600,
                            ),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Container(
                          width: 28,
                          height: 28,
                          decoration: BoxDecoration(
                            color: accentColor.withOpacity(0.12),
                            shape: BoxShape.circle,
                            border: Border.all(
                                color: accentColor.withOpacity(0.3)),
                          ),
                          child: Icon(
                            Icons.arrow_forward_ios_rounded,
                            color: accentColor,
                            size: 11,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),

                    // Gradient progress bar
                    LinearPercentIndicator(
                      percent: pct.clamp(0.0, 1.0),
                      lineHeight: 5,
                      backgroundColor: AppTheme.border,
                      linearGradient: LinearGradient(
                        colors: isComplete
                            ? [AppTheme.teal, AppTheme.teal.withOpacity(0.7)]
                            : [AppTheme.gold, const Color(0xFFE8C97E)],
                      ),
                      padding: EdgeInsets.zero,
                      barRadius: const Radius.circular(4),
                    ),
                    const SizedBox(height: 7),

                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          '$done / $total lessons',
                          style: GoogleFonts.inter(
                              color: AppTheme.fog2, fontSize: 11),
                        ),
                        Text(
                          isComplete
                              ? '✓ Complete'
                              : '${(pct * 100).round()}%',
                          style: GoogleFonts.inter(
                            color: accentColor,
                            fontSize: 11,
                            fontWeight: FontWeight.w700,
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
      ),
    );
  }
}

class _ThumbnailFallback extends StatelessWidget {
  final String title;
  const _ThumbnailFallback(this.title);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFF161A20), Color(0xFF0F1215)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Center(
        child: Text(
          title.isNotEmpty ? title[0].toUpperCase() : '?',
          style: GoogleFonts.cormorantGaramond(
            color: AppTheme.gold.withOpacity(0.35),
            fontSize: 52,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }
}

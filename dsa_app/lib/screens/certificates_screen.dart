import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:url_launcher/url_launcher.dart';
import '../core/supabase.dart';
import '../core/theme.dart';
import '../providers/courses_provider.dart';

const _baseUrl = 'https://ajaymukund.github.io/datascienceacademia';

class CertificatesScreen extends ConsumerWidget {
  const CertificatesScreen({super.key});

  Future<void> _open(BuildContext context, String url) async {
    final uri = Uri.parse(url);
    if (!await launchUrl(uri, mode: LaunchMode.externalApplication)) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Could not open browser.',
              style: GoogleFonts.inter(color: AppTheme.cream, fontSize: 13)),
          backgroundColor: AppTheme.surface,
          behavior: SnackBarBehavior.floating,
        ));
      }
    }
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final certsAsync = ref.watch(certificatesProvider);

    return Scaffold(
      backgroundColor: AppTheme.bg,
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(22, 24, 22, 20),
                child: Row(
                  children: [
                    Text(
                      'My Certificates',
                      style: GoogleFonts.cormorantGaramond(
                        color: AppTheme.cream,
                        fontSize: 26,
                        fontWeight: FontWeight.w600,
                        letterSpacing: -0.3,
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
            certsAsync.when(
              loading: () => const SliverFillRemaining(
                child: Center(
                    child: CircularProgressIndicator(
                        color: AppTheme.gold, strokeWidth: 2)),
              ),
              error: (e, _) => SliverFillRemaining(
                child: Center(
                    child: Text('Error: $e',
                        style: GoogleFonts.inter(color: AppTheme.fog))),
              ),
              data: (certs) {
                if (certs.isEmpty) {
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
                              border: Border.all(
                                  color: AppTheme.gold.withOpacity(0.25)),
                            ),
                            child: const Center(
                              child:
                                  Text('🏅', style: TextStyle(fontSize: 32)),
                            ),
                          ),
                          const SizedBox(height: 16),
                          Text(
                            'No certificates yet.',
                            style: GoogleFonts.cormorantGaramond(
                              color: AppTheme.cream,
                              fontSize: 20,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          const SizedBox(height: 6),
                          Text(
                            'Complete a course to earn your certificate.',
                            style: GoogleFonts.inter(
                                color: AppTheme.fog2, fontSize: 13),
                          ),
                        ],
                      ),
                    ),
                  );
                }
                return SliverPadding(
                  padding: const EdgeInsets.fromLTRB(22, 0, 22, 32),
                  sliver: SliverList.separated(
                    itemCount: certs.length,
                    separatorBuilder: (_, __) =>
                        const SizedBox(height: 14),
                    itemBuilder: (ctx, i) => _FadeSlideIn(
                      delayMs: i * 90,
                      child: _CertCard(
                        cert: certs[i],
                        onView: () {
                          final session = supabase.auth.currentSession;
                          final base =
                              '$_baseUrl/student/certificates.html';
                          if (session == null) {
                            _open(ctx, base);
                            return;
                          }
                          final now = DateTime.now()
                                  .millisecondsSinceEpoch ~/
                              1000;
                          final expiresAt = session.expiresAt ??
                              (now + (session.expiresIn ?? 3600));
                          final expiresIn =
                              (expiresAt - now).clamp(1, 7200);
                          _open(
                            ctx,
                            '$base#access_token=${session.accessToken}'
                            '&refresh_token=${session.refreshToken ?? ''}'
                            '&token_type=bearer'
                            '&expires_in=$expiresIn'
                            '&type=magiclink',
                          );
                        },
                        onVerify: () => _open(
                          ctx,
                          '$_baseUrl/verify.html?id=${certs[i].id}',
                        ),
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

// ── Certificate card ─────────────────────────────────────────────────────────
class _CertCard extends StatelessWidget {
  final dynamic cert;
  final VoidCallback onView;
  final VoidCallback onVerify;

  const _CertCard(
      {required this.cert, required this.onView, required this.onVerify});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppTheme.gold.withOpacity(0.22)),
        gradient: LinearGradient(
          colors: [AppTheme.gold.withOpacity(0.05), AppTheme.surface],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: [
          BoxShadow(
            color: AppTheme.gold.withOpacity(0.06),
            blurRadius: 18,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 42,
                height: 42,
                decoration: BoxDecoration(
                  color: AppTheme.gold.withOpacity(0.12),
                  shape: BoxShape.circle,
                  border: Border.all(color: AppTheme.gold.withOpacity(0.35)),
                ),
                child: const Center(
                    child: Text('🏅', style: TextStyle(fontSize: 18))),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      cert.courseTitle,
                      style: GoogleFonts.cormorantGaramond(
                        color: AppTheme.cream,
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    Text(
                      'Issued ${DateFormat('d MMM yyyy').format(cert.issuedAt)}',
                      style: GoogleFonts.inter(
                          color: AppTheme.fog2, fontSize: 11),
                    ),
                  ],
                ),
              ),
            ],
          ),

          const SizedBox(height: 14),
          const Divider(color: AppTheme.border, height: 1),
          const SizedBox(height: 12),

          Text(
            'CERTIFICATE ID',
            style: GoogleFonts.inter(
                color: AppTheme.fog2, fontSize: 10, letterSpacing: 0.8),
          ),
          const SizedBox(height: 3),
          GestureDetector(
            onTap: () {
              Clipboard.setData(ClipboardData(text: cert.id));
              ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                content: Text('ID copied',
                    style: GoogleFonts.inter(
                        color: AppTheme.cream, fontSize: 13)),
                backgroundColor: AppTheme.surface,
                behavior: SnackBarBehavior.floating,
                duration: const Duration(seconds: 2),
              ));
            },
            child: Row(
              children: [
                Text(
                  cert.shortId,
                  style: GoogleFonts.inter(
                    color: AppTheme.gold,
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 1.2,
                  ),
                ),
                const SizedBox(width: 6),
                Icon(Icons.copy_rounded,
                    size: 13, color: AppTheme.gold.withOpacity(0.6)),
              ],
            ),
          ),

          const SizedBox(height: 14),

          Row(
            children: [
              Expanded(
                child: _CertButton(
                  icon: Icons.workspace_premium_rounded,
                  label: 'View Certificate',
                  primary: true,
                  onTap: onView,
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: _CertButton(
                  icon: Icons.verified_outlined,
                  label: 'Verify',
                  primary: false,
                  onTap: onVerify,
                ),
              ),
            ],
          ),
        ],
      ),
    );
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
        vsync: this, duration: const Duration(milliseconds: 500));
    _fade = CurvedAnimation(parent: _ctrl, curve: Curves.easeOut);
    _slide = Tween<Offset>(begin: const Offset(0, 0.10), end: Offset.zero)
        .animate(CurvedAnimation(parent: _ctrl, curve: Curves.easeOutCubic));
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

// ── Action button ────────────────────────────────────────────────────────────
class _CertButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final bool primary;

  const _CertButton({
    required this.icon,
    required this.label,
    required this.onTap,
    required this.primary,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(
          color: primary ? AppTheme.gold.withOpacity(0.12) : AppTheme.surface,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(
            color: primary
                ? AppTheme.gold.withOpacity(0.4)
                : AppTheme.border,
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon,
                size: 15,
                color: primary ? AppTheme.gold : AppTheme.fog),
            const SizedBox(width: 6),
            Text(
              label,
              style: GoogleFonts.inter(
                color: primary ? AppTheme.gold : AppTheme.fog,
                fontSize: 12,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

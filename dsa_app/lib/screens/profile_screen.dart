import 'dart:io';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:image_picker/image_picker.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../core/supabase.dart';
import '../core/theme.dart';
import '../providers/auth_provider.dart';
import '../providers/courses_provider.dart';

class ProfileScreen extends ConsumerStatefulWidget {
  const ProfileScreen({super.key});

  @override
  ConsumerState<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends ConsumerState<ProfileScreen> {
  final _nameCtrl = TextEditingController();
  bool _isEditing = false;
  bool _isSaving = false;
  bool _uploadingAvatar = false;

  @override
  void dispose() {
    _nameCtrl.dispose();
    super.dispose();
  }

  Future<void> _pickAndUploadAvatar() async {
    final picker = ImagePicker();
    final picked = await picker.pickImage(
      source: ImageSource.gallery,
      maxWidth: 512,
      maxHeight: 512,
      imageQuality: 85,
    );
    if (picked == null || !mounted) return;

    setState(() => _uploadingAvatar = true);
    try {
      final uid = supabase.auth.currentUser!.id;
      final bytes = await File(picked.path).readAsBytes();
      final path = '$uid/profile.jpg';

      await supabase.storage.from('avatars').uploadBinary(
        path,
        bytes,
        fileOptions: FileOptions(contentType: 'image/jpeg', upsert: true),
      );

      final publicUrl = supabase.storage.from('avatars').getPublicUrl(path);
      // Bust cache by appending a timestamp
      final urlWithBust = '$publicUrl?t=${DateTime.now().millisecondsSinceEpoch}';

      await supabase.from('profiles').update({'avatar_url': urlWithBust}).eq('id', uid);
      ref.invalidate(profileProvider);
    } catch (e) {
      if (mounted) _showSnack('Failed to upload photo: $e');
    } finally {
      if (mounted) setState(() => _uploadingAvatar = false);
    }
  }

  Future<void> _saveName() async {
    final newName = _nameCtrl.text.trim();
    if (newName.isEmpty) return;
    setState(() => _isSaving = true);
    try {
      final uid = supabase.auth.currentUser!.id;
      await supabase.from('profiles').update({'name': newName}).eq('id', uid);
      ref.invalidate(profileProvider);
      setState(() => _isEditing = false);
    } catch (e) {
      if (mounted) _showSnack('Failed to save: $e');
    } finally {
      if (mounted) setState(() => _isSaving = false);
    }
  }

  void _showSnack(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content: Text(msg, style: GoogleFonts.inter(color: AppTheme.cream, fontSize: 13)),
      backgroundColor: AppTheme.surface,
      behavior: SnackBarBehavior.floating,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
        side: const BorderSide(color: AppTheme.border),
      ),
    ));
  }

  @override
  Widget build(BuildContext context) {
    final profile = ref.watch(profileProvider);
    final certs   = ref.watch(certificatesProvider);
    final courses = ref.watch(enrolledCoursesProvider);

    return Scaffold(
      backgroundColor: AppTheme.bg,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(22),
          child: profile.when(
            loading: () => const Center(
              child: CircularProgressIndicator(color: AppTheme.gold, strokeWidth: 2),
            ),
            error: (e, _) => Center(child: Text('$e', style: GoogleFonts.inter(color: AppTheme.fog))),
            data: (p) {
              final name      = p?['name'] as String? ?? 'Student';
              final email     = supabase.auth.currentUser?.email ?? '';
              final avatarUrl = p?['avatar_url'] as String?;

              if (!_isEditing) _nameCtrl.text = name;

              return Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const SizedBox(height: 16),

                  // Avatar with edit overlay
                  GestureDetector(
                    onTap: _uploadingAvatar ? null : _pickAndUploadAvatar,
                    child: Stack(
                      alignment: Alignment.bottomRight,
                      children: [
                        Container(
                          width: 88,
                          height: 88,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            gradient: avatarUrl == null
                                ? const LinearGradient(
                                    colors: [Color(0xFFD4B47A), Color(0xFF8A6A3A)],
                                    begin: Alignment.topLeft,
                                    end: Alignment.bottomRight,
                                  )
                                : null,
                            boxShadow: [
                              BoxShadow(
                                color: AppTheme.gold.withOpacity(0.2),
                                blurRadius: 20,
                                offset: const Offset(0, 6),
                              ),
                            ],
                          ),
                          child: ClipOval(
                            child: _uploadingAvatar
                                ? const Center(
                                    child: CircularProgressIndicator(
                                      color: AppTheme.gold, strokeWidth: 2,
                                    ),
                                  )
                                : avatarUrl != null
                                    ? CachedNetworkImage(
                                        imageUrl: avatarUrl,
                                        fit: BoxFit.cover,
                                        placeholder: (_, __) => const Center(
                                          child: CircularProgressIndicator(
                                            color: AppTheme.gold, strokeWidth: 2,
                                          ),
                                        ),
                                        errorWidget: (_, __, ___) => Center(
                                          child: Text(
                                            name.isNotEmpty ? name[0].toUpperCase() : '?',
                                            style: GoogleFonts.cormorantGaramond(
                                              color: Colors.white, fontSize: 32, fontWeight: FontWeight.w600,
                                            ),
                                          ),
                                        ),
                                      )
                                    : Center(
                                        child: Text(
                                          name.isNotEmpty ? name[0].toUpperCase() : '?',
                                          style: GoogleFonts.cormorantGaramond(
                                            color: Colors.white, fontSize: 32, fontWeight: FontWeight.w600,
                                          ),
                                        ),
                                      ),
                          ),
                        ),
                        Container(
                          width: 26,
                          height: 26,
                          decoration: BoxDecoration(
                            color: AppTheme.gold,
                            shape: BoxShape.circle,
                            border: Border.all(color: AppTheme.bg, width: 2),
                          ),
                          child: const Icon(Icons.camera_alt_rounded, size: 13, color: AppTheme.bg),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 14),

                  // Name (editable)
                  if (_isEditing)
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        SizedBox(
                          width: 200,
                          child: TextField(
                            controller: _nameCtrl,
                            autofocus: true,
                            textAlign: TextAlign.center,
                            style: GoogleFonts.cormorantGaramond(
                              color: AppTheme.cream, fontSize: 22, fontWeight: FontWeight.w600,
                            ),
                            decoration: InputDecoration(
                              isDense: true,
                              contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
                              enabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(8),
                                borderSide: const BorderSide(color: AppTheme.border),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(8),
                                borderSide: const BorderSide(color: AppTheme.gold),
                              ),
                              filled: true,
                              fillColor: AppTheme.surface,
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        _isSaving
                            ? const SizedBox(
                                width: 20, height: 20,
                                child: CircularProgressIndicator(strokeWidth: 2, color: AppTheme.gold),
                              )
                            : GestureDetector(
                                onTap: _saveName,
                                child: const Icon(Icons.check_circle_rounded, color: AppTheme.gold, size: 28),
                              ),
                        const SizedBox(width: 4),
                        GestureDetector(
                          onTap: () => setState(() => _isEditing = false),
                          child: const Icon(Icons.cancel_rounded, color: AppTheme.fog, size: 26),
                        ),
                      ],
                    )
                  else
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          name,
                          style: GoogleFonts.cormorantGaramond(
                            color: AppTheme.cream, fontSize: 22, fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(width: 8),
                        GestureDetector(
                          onTap: () => setState(() => _isEditing = true),
                          child: const Icon(Icons.edit_rounded, color: AppTheme.fog, size: 16),
                        ),
                      ],
                    ),

                  const SizedBox(height: 4),
                  Text(
                    email,
                    style: GoogleFonts.inter(color: AppTheme.fog, fontSize: 13),
                  ),
                  const SizedBox(height: 4),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                    decoration: BoxDecoration(
                      color: AppTheme.teal.withOpacity(0.10),
                      borderRadius: BorderRadius.circular(5),
                      border: Border.all(color: AppTheme.teal.withOpacity(0.25)),
                    ),
                    child: Text(
                      'Student',
                      style: GoogleFonts.inter(
                        color: AppTheme.teal, fontSize: 11, fontWeight: FontWeight.w600, letterSpacing: 0.5,
                      ),
                    ),
                  ),

                  const SizedBox(height: 32),

                  // Stats
                  Row(
                    children: [
                      _ProfileStat(
                        icon: '📚',
                        value: courses.value?.length.toString() ?? '—',
                        label: 'Enrolled',
                      ),
                      const SizedBox(width: 12),
                      _ProfileStat(
                        icon: '🏅',
                        value: certs.value?.length.toString() ?? '—',
                        label: 'Certificates',
                      ),
                    ],
                  ),

                  const SizedBox(height: 32),

                  // Info rows
                  _InfoRow(icon: Icons.person_outline_rounded, label: 'Full Name', value: name),
                  _InfoRow(icon: Icons.email_outlined, label: 'Email', value: email),
                  _InfoRow(icon: Icons.school_outlined, label: 'Institution', value: 'Data Science Academia Pvt. Ltd.'),

                  const SizedBox(height: 32),

                  // Sign out
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () async {
                        await supabase.auth.signOut();
                        if (context.mounted) context.go('/login');
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.surface,
                        foregroundColor: Colors.redAccent,
                        side: const BorderSide(color: AppTheme.border),
                        elevation: 0,
                      ),
                      child: Text(
                        'Sign Out',
                        style: GoogleFonts.inter(fontWeight: FontWeight.w600, fontSize: 15),
                      ),
                    ),
                  ),

                  const SizedBox(height: 16),
                  Text(
                    'Data Science Academia Pvt. Ltd. · Chennai',
                    style: GoogleFonts.inter(color: AppTheme.fog2, fontSize: 11),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'v1.0.0',
                    style: GoogleFonts.inter(color: AppTheme.fog2.withOpacity(0.5), fontSize: 10),
                  ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}

class _ProfileStat extends StatelessWidget {
  final String icon;
  final String value;
  final String label;
  const _ProfileStat({required this.icon, required this.value, required this.label});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 16),
        decoration: BoxDecoration(
          color: AppTheme.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: AppTheme.border),
        ),
        child: Column(
          children: [
            Text(icon, style: const TextStyle(fontSize: 22)),
            const SizedBox(height: 6),
            Text(value, style: GoogleFonts.inter(color: AppTheme.cream, fontSize: 18, fontWeight: FontWeight.w700)),
            const SizedBox(height: 2),
            Text(label, style: GoogleFonts.inter(color: AppTheme.fog2, fontSize: 11)),
          ],
        ),
      ),
    );
  }
}

class _InfoRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  const _InfoRow({required this.icon, required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: AppTheme.border),
      ),
      child: Row(
        children: [
          Icon(icon, color: AppTheme.fog2, size: 18),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(label, style: GoogleFonts.inter(color: AppTheme.fog2, fontSize: 10, letterSpacing: 0.4)),
                const SizedBox(height: 2),
                Text(value, style: GoogleFonts.inter(color: AppTheme.cream, fontSize: 13)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

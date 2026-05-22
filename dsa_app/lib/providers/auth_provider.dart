import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../core/supabase.dart';

final authStateProvider = StreamProvider<AuthState>((ref) {
  return supabase.auth.onAuthStateChange;
});

final profileProvider = FutureProvider<Map<String, dynamic>?>((ref) async {
  final uid = supabase.auth.currentUser?.id;
  if (uid == null) return null;
  return await supabase
      .from('profiles')
      .select('id,name,role,avatar_url')
      .eq('id', uid)
      .maybeSingle();
});

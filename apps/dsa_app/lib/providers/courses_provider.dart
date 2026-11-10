import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../core/supabase.dart';
import '../models/course.dart';
import '../models/certificate.dart';

final enrolledCoursesProvider = FutureProvider<List<Course>>((ref) async {
  final uid = supabase.auth.currentUser?.id;
  if (uid == null) return [];
  final data = await supabase
      .from('enrollments')
      .select('courses(*,modules(*,lessons(*)))')
      .eq('user_id', uid);
  return (data as List)
      .map((e) => Course.fromJson(e['courses'] as Map<String, dynamic>))
      .toList();
});

final progressProvider = FutureProvider<Set<String>>((ref) async {
  final uid = supabase.auth.currentUser?.id;
  if (uid == null) return {};
  final data = await supabase
      .from('progress')
      .select('lesson_id')
      .eq('user_id', uid);
  return (data as List).map((e) => e['lesson_id'] as String).toSet();
});

final courseDetailProvider = FutureProvider.family<Course, String>((ref, courseId) async {
  final data = await supabase
      .from('courses')
      .select('*,modules(*,lessons(*))')
      .eq('id', courseId)
      .single();
  return Course.fromJson(data);
});

// All courses in the catalog (no enrollment filter, no modules)
final allCoursesProvider = FutureProvider<List<Course>>((ref) async {
  final data = await supabase
      .from('courses')
      .select('*')
      .order('title');
  return (data as List)
      .map((e) => Course.fromJson(e as Map<String, dynamic>))
      .toList();
});

// Course IDs the current user is enrolled in
final enrolledCourseIdsProvider = FutureProvider<Set<String>>((ref) async {
  final uid = supabase.auth.currentUser?.id;
  if (uid == null) return {};
  final data = await supabase
      .from('enrollments')
      .select('course_id')
      .eq('user_id', uid);
  return (data as List).map((e) => e['course_id'] as String).toSet();
});

final certificatesProvider = FutureProvider<List<Certificate>>((ref) async {
  final uid = supabase.auth.currentUser?.id;
  if (uid == null) return [];
  final data = await supabase
      .from('certificates')
      .select('*,courses(title)')
      .eq('user_id', uid)
      .order('issued_at', ascending: false);
  return (data as List).map((e) => Certificate.fromJson(e)).toList();
});

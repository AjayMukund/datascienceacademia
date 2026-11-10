import 'package:supabase_flutter/supabase_flutter.dart';

class SupabaseConfig {
  static const url = 'https://isoepiysqmqffwhroseh.supabase.co';
  static const anonKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlzb2VwaXlzcW1xZmZ3aHJvc2VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMTcyNDQsImV4cCI6MjA5MjU5MzI0NH0.lv4IquTcYPY90TRSy1IZoLktt-yY-GDAPb4gF95Cn7k';
}

SupabaseClient get supabase => Supabase.instance.client;

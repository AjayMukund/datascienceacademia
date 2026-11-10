import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'core/supabase.dart';
import 'core/theme.dart';
import 'screens/splash_screen.dart';
import 'screens/login_screen.dart';
import 'screens/dashboard_screen.dart';
import 'screens/explore_screen.dart';
import 'screens/course_screen.dart';
import 'screens/lesson_screen.dart';
import 'screens/certificates_screen.dart';
import 'screens/profile_screen.dart';
import 'widgets/app_shell.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    statusBarIconBrightness: Brightness.light,
  ));
  await Supabase.initialize(
    url: SupabaseConfig.url,
    anonKey: SupabaseConfig.anonKey,
  );
  runApp(const ProviderScope(child: DSAApp()));
}

CustomTransitionPage<void> _slidePage(GoRouterState state, Widget child) {
  return CustomTransitionPage<void>(
    key: state.pageKey,
    child: child,
    transitionDuration: const Duration(milliseconds: 320),
    reverseTransitionDuration: const Duration(milliseconds: 280),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      final slide = Tween<Offset>(
        begin: const Offset(1.0, 0.0),
        end: Offset.zero,
      ).animate(
          CurvedAnimation(parent: animation, curve: Curves.easeOutCubic));
      final fadeOut = Tween<double>(begin: 1.0, end: 0.0).animate(
          CurvedAnimation(parent: secondaryAnimation, curve: Curves.easeIn));
      return FadeTransition(
        opacity: fadeOut,
        child: SlideTransition(position: slide, child: child),
      );
    },
  );
}

final _router = GoRouter(
  initialLocation: '/splash',
  routes: [
    GoRoute(path: '/splash', builder: (_, __) => const SplashScreen()),
    GoRoute(path: '/login', builder: (_, __) => const LoginScreen()),

    // Main shell — 4 tabs
    StatefulShellRoute.indexedStack(
      builder: (ctx, state, shell) => AppShell(navigationShell: shell),
      branches: [
        StatefulShellBranch(routes: [
          GoRoute(
              path: '/dashboard',
              builder: (_, __) => const DashboardScreen()),
        ]),
        StatefulShellBranch(routes: [
          GoRoute(
              path: '/explore',
              builder: (_, __) => const ExploreScreen()),
        ]),
        StatefulShellBranch(routes: [
          GoRoute(
              path: '/certificates',
              builder: (_, __) => const CertificatesScreen()),
        ]),
        StatefulShellBranch(routes: [
          GoRoute(
              path: '/profile',
              builder: (_, __) => const ProfileScreen()),
        ]),
      ],
    ),

    // Full-screen routes with slide transition
    GoRoute(
      path: '/course/:id',
      pageBuilder: (_, state) => _slidePage(
        state,
        CourseScreen(courseId: state.pathParameters['id']!),
      ),
    ),
    GoRoute(
      path: '/lesson/:id',
      pageBuilder: (_, state) => _slidePage(
        state,
        LessonScreen(
          lessonId: state.pathParameters['id']!,
          courseId: state.uri.queryParameters['course'] ?? '',
        ),
      ),
    ),
  ],
);

class DSAApp extends StatelessWidget {
  const DSAApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'DSA Student',
      theme: AppTheme.dark,
      routerConfig: _router,
      debugShowCheckedModeBanner: false,
    );
  }
}

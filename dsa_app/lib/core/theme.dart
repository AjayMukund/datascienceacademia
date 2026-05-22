import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  static const bg      = Color(0xFF0B0C0E);
  static const surface = Color(0xFF13161A);
  static const border  = Color(0xFF1E2128);
  static const gold    = Color(0xFFC8A96E);
  static const teal    = Color(0xFF3ECFB2);
  static const cream   = Color(0xFFF5F0E8);
  static const fog     = Color(0xFF8C8A86);
  static const fog2    = Color(0xFF5A5856);

  static ThemeData get dark => ThemeData(
    brightness: Brightness.dark,
    scaffoldBackgroundColor: bg,
    colorScheme: const ColorScheme.dark(
      primary: gold,
      secondary: teal,
      surface: surface,
      onPrimary: bg,
      onSecondary: bg,
      onSurface: cream,
    ),
    textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme).copyWith(
      displaySmall: GoogleFonts.cormorantGaramond(
        color: cream, fontSize: 28, fontWeight: FontWeight.w600, letterSpacing: -0.5,
      ),
      headlineMedium: GoogleFonts.cormorantGaramond(
        color: cream, fontSize: 22, fontWeight: FontWeight.w600,
      ),
      headlineSmall: GoogleFonts.cormorantGaramond(
        color: cream, fontSize: 18, fontWeight: FontWeight.w600,
      ),
      titleLarge: GoogleFonts.inter(
        color: cream, fontSize: 16, fontWeight: FontWeight.w600,
      ),
      titleMedium: GoogleFonts.inter(
        color: cream, fontSize: 14, fontWeight: FontWeight.w500,
      ),
      bodyLarge: GoogleFonts.inter(color: fog, fontSize: 15),
      bodyMedium: GoogleFonts.inter(color: fog, fontSize: 13),
      labelSmall: GoogleFonts.inter(
        color: fog2, fontSize: 11, letterSpacing: 0.5,
      ),
    ),
    appBarTheme: AppBarTheme(
      backgroundColor: bg,
      elevation: 0,
      iconTheme: const IconThemeData(color: cream),
      titleTextStyle: GoogleFonts.cormorantGaramond(
        color: cream, fontSize: 20, fontWeight: FontWeight.w600,
      ),
      surfaceTintColor: Colors.transparent,
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: surface,
      hintStyle: const TextStyle(color: Color(0xFF3A3F4A)),
      labelStyle: const TextStyle(color: fog),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: border),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: border),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: gold, width: 1.5),
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: gold,
        foregroundColor: bg,
        minimumSize: const Size(double.infinity, 50),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        textStyle: GoogleFonts.inter(fontWeight: FontWeight.w600, fontSize: 15),
        elevation: 0,
      ),
    ),
    cardTheme: CardThemeData(
      color: surface,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(14),
        side: const BorderSide(color: border),
      ),
      margin: EdgeInsets.zero,
    ),
    dividerTheme: const DividerThemeData(color: border, space: 1),
    bottomNavigationBarTheme: const BottomNavigationBarThemeData(
      backgroundColor: surface,
      selectedItemColor: gold,
      unselectedItemColor: fog2,
      elevation: 0,
      type: BottomNavigationBarType.fixed,
    ),
  );
}

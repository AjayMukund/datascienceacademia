class Certificate {
  final String id;
  final String courseId;
  final String courseTitle;
  final DateTime issuedAt;

  const Certificate({
    required this.id,
    required this.courseId,
    required this.courseTitle,
    required this.issuedAt,
  });

  factory Certificate.fromJson(Map<String, dynamic> j) => Certificate(
    id: j['id'] as String,
    courseId: j['course_id'] as String,
    courseTitle: (j['courses'] as Map<String, dynamic>?)?['title'] as String? ?? '',
    issuedAt: DateTime.parse(j['issued_at'] as String),
  );

  String get shortId => id.substring(0, 8).toUpperCase();
}

class Lesson {
  final String id;
  final String title;
  final String type;
  final String? contentUrl;
  final int orderIndex;
  final int? durationMins;

  const Lesson({
    required this.id,
    required this.title,
    required this.type,
    this.contentUrl,
    required this.orderIndex,
    this.durationMins,
  });

  factory Lesson.fromJson(Map<String, dynamic> j) => Lesson(
    id: j['id'] as String,
    title: j['title'] as String,
    type: j['type'] as String? ?? 'video',
    contentUrl: j['content_url'] as String?,
    orderIndex: j['order_index'] as int,
    durationMins: j['duration_mins'] as int?,
  );

  String? get youtubeId {
    if (contentUrl == null) return null;
    final m = RegExp(r'(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})').firstMatch(contentUrl!);
    return m?.group(1);
  }
}

class Module {
  final String id;
  final String title;
  final int orderIndex;
  final List<Lesson> lessons;

  const Module({
    required this.id,
    required this.title,
    required this.orderIndex,
    this.lessons = const [],
  });

  factory Module.fromJson(Map<String, dynamic> j) => Module(
    id: j['id'] as String,
    title: j['title'] as String,
    orderIndex: j['order_index'] as int,
    lessons: (j['lessons'] as List<dynamic>? ?? [])
        .map((l) => Lesson.fromJson(l as Map<String, dynamic>))
        .toList()
      ..sort((a, b) => a.orderIndex.compareTo(b.orderIndex)),
  );
}

class Course {
  final String id;
  final String title;
  final String? description;
  final String? thumbnailUrl;
  final String? level;      // maps from DB column: category
  final int? durationWeeks;
  final String? category;   // maps from DB column: domain
  final List<Module> modules;

  const Course({
    required this.id,
    required this.title,
    this.description,
    this.thumbnailUrl,
    this.level,
    this.durationWeeks,
    this.category,
    this.modules = const [],
  });

  factory Course.fromJson(Map<String, dynamic> j) => Course(
    id: j['id'] as String,
    title: j['title'] as String,
    description: j['description'] as String?,
    thumbnailUrl: j['thumbnail_url'] as String?,
    level: j['category'] as String?,       // DB column is named "category"
    durationWeeks: j['duration_weeks'] as int?,
    category: j['domain'] as String?,      // DB column to be named "domain"
    modules: (j['modules'] as List<dynamic>? ?? [])
        .map((m) => Module.fromJson(m as Map<String, dynamic>))
        .toList()
      ..sort((a, b) => a.orderIndex.compareTo(b.orderIndex)),
  );

  List<Lesson> get allLessons => modules.expand((m) => m.lessons).toList();
  int get totalLessons => allLessons.length;
}

/* ─────────────────────────────────────────────────────────────
   DSA_PROGRAMMES  —  Data Science Academia Programme Catalogue
   ───────────────────────────────────────────────────────────── */
const DSA_PROGRAMMES = {

  /* ── 1. Internship ─────────────────────────────────────── */
  'internship': {
    id: 'internship',
    title: 'Internships',
    subtitle: 'NEP & AICTE Aligned',
    tag: 'NEP & AICTE Aligned',
    tagClass: 'pta',
    icon: '🎓',
    iconClass: 'pi-intern',
    glowColor: 'var(--teal)',
    audience: ['Undergraduate & Postgraduate Students', 'Fresh Graduates', 'Research Scholars'],
    delivery: ['Online — Live & Recorded', 'Hybrid — Online + Offline Workshops'],
    duration: '1–2 Months',
    certificate: 'DSA Internship Certificate + Offer Letter',
    overview: 'A structured internship programme designed in alignment with the National Education Policy 2020 and AICTE internship guidelines. Interns work on real, impactful data science and AI projects under the mentorship of PhD-qualified faculty — gaining hands-on experience that goes far beyond classroom learning. Each intern receives a formal offer letter, project completion certificate, and domain-specific project portfolio.',
    outcomes: [
      'Hands-on experience with real industry datasets and AI projects',
      'Formal DSA Internship Certificate + Offer Letter',
      'Domain-specific project portfolio for job/PhD applications',
      'Mentorship from PhD-qualified faculty and AI engineers',
      'AICTE-recognised credential (where applicable)',
      'Professional exposure to end-to-end ML and data pipelines'
    ],
    sections: [
      {
        title: 'Programme Structure',
        points: [
          '1-month and 2-month internship tracks available',
          'Work-integrated modules with hands-on, impactful outcomes',
          'Weekly mentorship sessions and progress reviews',
          'Mid-internship milestone presentation',
          'Final project demonstration and evaluation',
          'Online or Hybrid (online + offline workshop) delivery'
        ]
      },
      {
        title: 'Domains Offered',
        points: [
          'Machine Learning Projects — supervised, unsupervised, ensemble models',
          'Research Assistance — literature review, data collection, analysis',
          'Data Analytics — EDA, dashboards, business intelligence',
          'Software Tools — Python scripting, SQL, API integration',
          'Computer Vision — image datasets, object detection projects',
          'NLP & Generative AI — text processing, LLM-based applications'
        ]
      },
      {
        title: 'Certification & Recognition',
        points: [
          'AICTE Approved internship (where institution is accredited)',
          'DSA Internship Certificate with project title and mentor name',
          'Formal Offer Letter issued at programme start',
          'Internship completion letter for university credit submission',
          'LinkedIn-shareable digital credential',
          'Annexure-1 application form available for affiliated colleges'
        ]
      },
      {
        title: 'Application Process',
        points: [
          'Step 1 — Submit the online application form with your area of interest',
          'Step 2 — Screening call with a DSA faculty mentor (30 min)',
          'Step 3 — Domain and project allocation based on your background',
          'Step 4 — Onboarding session and access to learning materials',
          'Step 5 — Internship begins with Week 1 orientation and goal setting',
          'Rolling admissions — apply anytime, cohorts start monthly'
        ]
      }
    ],
    stats: [
      {n:'2', label:'Duration Tracks'},
      {n:'6', label:'Project Domains'},
      {n:'Monthly', label:'Cohort Starts'},
      {n:'AICTE', label:'Aligned'}
    ],
    cards: {
      sectionTitle: 'Project Domains',
      glowColor: 'rgba(62,207,178,.18)',
      items: [
        {icon:'🧠', name:'Machine Learning', desc:'Build supervised, unsupervised & ensemble model projects on real datasets'},
        {icon:'🔬', name:'Research Assistance', desc:'Literature reviews, data collection, statistical analysis for scholarly work'},
        {icon:'📊', name:'Data Analytics', desc:'EDA, dashboards, and business intelligence reports from raw data'},
        {icon:'🐍', name:'Software Tools', desc:'Python scripting, SQL pipelines, REST API integration projects'},
        {icon:'👁️', name:'Computer Vision', desc:'Image classification, object detection and segmentation projects'},
        {icon:'💬', name:'NLP & Generative AI', desc:'Text processing, sentiment analysis, and LLM-based applications'}
      ]
    },
    steps: {
      sectionTitle: 'Application Process',
      items: [
        {icon:'📝', title:'Apply Online', desc:'Submit the enquiry form with your area of interest and preferred duration'},
        {icon:'📞', title:'Screening Call', desc:'30-minute discussion with a DSA faculty mentor to assess fit and goals'},
        {icon:'🗂️', title:'Domain Allocation', desc:'Project and domain assigned based on your background and interests'},
        {icon:'🚀', title:'Onboarding', desc:'Access materials, meet your mentor, and set Week 1 goals'},
        {icon:'🏁', title:'Internship Begins', desc:'Start working on your project with weekly check-ins and reviews'}
      ]
    },
    prereqs: 'Basic programming knowledge (Python preferred). Students from any engineering or science discipline are eligible. No prior AI/ML experience required for the beginner track.',
    cta: 'Apply for Internship',
    ctaParam: 'Student Internship Programme'
  },

  /* ── 2. Microsoft Certification ────────────────────────── */
  'microsoft-certification': {
    id: 'microsoft-certification',
    title: 'Microsoft Certification Program',
    subtitle: 'Azure · Power BI · MCT Collaboration',
    tag: 'Microsoft Certified',
    tagClass: 'ptc',
    icon: '🏅',
    iconClass: 'pi-ms',
    glowColor: '#7a9fff',
    audience: ['Students (IT / CS / Data Science)', 'Working Professionals', 'Career Changers', 'IT Administrators'],
    delivery: ['Online — Live + Recorded', 'Offline Bootcamps (Chennai)'],
    duration: '4–8 Weeks per Certification',
    certificate: 'Microsoft Certification (AI-900 / DP-900) + DSA Completion Certificate',
    overview: 'A focused preparation programme for Microsoft Azure and Power BI certifications, designed to bridge the gap between theoretical learning and industry-recognised credentials. Delivered in collaboration with Microsoft Certified Trainers (MCTs), this programme combines exam-specific preparation with practical, hands-on labs — ensuring you understand both the concepts and the cloud platform deeply enough to excel in the certification exam and on the job.',
    outcomes: [
      'Clear Microsoft Azure AI Fundamentals (AI-900) with confidence',
      'Clear Microsoft Azure Data Fundamentals (DP-900)',
      'Build proficiency in Power BI for certification and real-world use',
      'Gain practical Azure cloud experience through guided labs',
      'Receive structured exam preparation with mock tests and strategy',
      'Access MCT-led sessions for authoritative exam guidance'
    ],
    sections: [
      {
        title: 'Certifications Covered',
        points: [
          'AI-900 — Microsoft Azure AI Fundamentals',
          'DP-900 — Microsoft Azure Data Fundamentals',
          'Power BI Data Analyst Associate (PL-300) Prep',
          'Azure Fundamentals (AZ-900) — optional add-on module',
          'Structured roadmaps from fundamentals to associate level',
          'Guidance on certification vouchers and exam booking'
        ]
      },
      {
        title: 'Programme Highlights',
        points: [
          'Taught in collaboration with Microsoft Certified Trainers (MCTs)',
          'Hands-on Azure portal labs and real cloud exercises',
          'Domain-specific practice question banks per certification',
          'Timed mock exams simulating actual Microsoft test conditions',
          'Exam strategy sessions — what to focus on, what to skip',
          'Post-certification career guidance and LinkedIn optimisation'
        ]
      },
      {
        title: 'Topics Covered — AI-900',
        points: [
          'AI workloads and considerations on Azure',
          'Machine Learning fundamentals on Azure ML Studio',
          'Computer Vision services — Azure Vision, Face, Form Recognizer',
          'Natural Language Processing — Azure Language, Speech Services',
          'Conversational AI — Azure Bot Service and QnA Maker',
          'Responsible AI principles and Microsoft AI guidelines'
        ]
      },
      {
        title: 'Topics Covered — DP-900',
        points: [
          'Core data concepts — relational and non-relational data',
          'Azure relational data services — SQL Database, PostgreSQL',
          'Azure non-relational data — Cosmos DB, Table Storage, Blob Storage',
          'Data analytics workloads — Azure Synapse, HDInsight, Databricks',
          'Data visualisation with Power BI — reports and dashboards',
          'Data engineering fundamentals and pipeline concepts'
        ]
      }
    ],
    stats: [
      {n:'3', label:'Certifications'},
      {n:'MCT', label:'Collaboration'},
      {n:'Hands-on', label:'Azure Labs'},
      {n:'Mock', label:'Exam Series'}
    ],
    cards: {
      sectionTitle: 'Certifications Covered',
      glowColor: 'rgba(122,159,255,.18)',
      items: [
        {icon:'🤖', name:'AI-900 — AI Fundamentals', desc:'Azure AI services, ML Studio, Vision, NLP, and Responsible AI principles'},
        {icon:'🗄️', name:'DP-900 — Data Fundamentals', desc:'Relational & non-relational data, Azure Synapse, Power BI basics'},
        {icon:'📈', name:'PL-300 — Power BI Analyst', desc:'DAX, data modelling, enterprise dashboards and report publishing'},
        {icon:'☁️', name:'AZ-900 — Azure Fundamentals', desc:'Cloud concepts, core Azure services, pricing and SLAs (add-on)'}
      ]
    },
    steps: {
      sectionTitle: 'Your Certification Path',
      items: [
        {icon:'📚', title:'Foundation Sessions', desc:'Core concepts covered by MCT-led live classes with Azure portal access'},
        {icon:'🧪', title:'Hands-on Labs', desc:'Real Azure exercises — build, configure, and test cloud resources'},
        {icon:'📋', title:'Practice Questions', desc:'Domain-specific question banks with explanations for every answer'},
        {icon:'⏱️', title:'Mock Exams', desc:'Timed full-length simulations under actual Microsoft exam conditions'},
        {icon:'🏅', title:'Certification Day', desc:'Exam strategy session, then you sit the official Microsoft exam'}
      ]
    },
    prereqs: 'No cloud experience required for AI-900 and DP-900. Basic computer literacy and familiarity with data concepts is helpful. A Microsoft account is required for Azure free tier labs.',
    cta: 'Register for Certification Prep',
    ctaParam: 'Microsoft Certification Program'
  },

  /* ── 3. Corporate & FDP ────────────────────────────────── */
  'fdp': {
    id: 'fdp',
    title: 'Corporate & Faculty Development Program',
    subtitle: 'FDP / MDP — AICTE Aligned',
    tag: 'FDP / MDP',
    tagClass: 'ptb',
    icon: '🏛️',
    iconClass: 'pi-fdp',
    glowColor: 'var(--champ)',
    audience: ['College Faculty & Research Guides', 'Corporate Teams & L&D Managers', 'HR Professionals', 'Industry 4.0 Practitioners'],
    delivery: ['Online — Live Sessions', 'Offline — Campus & Corporate Visits', 'Hybrid Workshops'],
    duration: '2 Days to 4 Weeks (customisable)',
    certificate: 'DSA FDP Certificate of Participation + AICTE-aligned credential',
    overview: 'A comprehensive Faculty Development and Management Development Programme designed to upskill educators and corporate professionals with the latest tools and technologies in AI, Data Science, and Industry 4.0. Fully AICTE-aligned and expert-led, these programmes are tailored to the specific needs of each institution or organisation — from a 2-day intensive workshop to a month-long structured learning journey.',
    outcomes: [
      'Practical proficiency in AI, ML, and data science tools',
      'AICTE-aligned FDP certificate recognised by affiliated institutions',
      'Hands-on experience with Power BI, Generative AI, and research tools',
      'Ready-to-teach curriculum frameworks for CS/IT faculty',
      'Train-the-Trainer competency for internal corporate upskilling',
      'Industry 4.0 awareness and digital transformation readiness'
    ],
    sections: [
      {
        title: 'Faculty Development Programme (FDP)',
        points: [
          'AI, ML, Deep Learning — foundations and teaching strategies',
          'Data Science with Python — hands-on for educators',
          'Research Tools — LaTeX, R, SPSS, citation managers',
          'UGC / AICTE curriculum-aligned content and module planning',
          'Certificate of participation issued to all attendees',
          'Batch scheduling and calendar coordination for institutions'
        ]
      },
      {
        title: 'Corporate Training (MDP)',
        points: [
          'Power BI — enterprise dashboards, DAX, data modelling',
          'Generative AI for business — ChatGPT, Copilot, prompt engineering',
          'Machine Learning for non-technical managers (AI literacy)',
          'Python for data-driven decision making',
          'Azure and AWS cloud essentials for IT teams',
          'Post-training assessment and competency reports'
        ]
      },
      {
        title: 'Train-the-Trainer & Industry 4.0',
        points: [
          'Train-the-Trainer methodology for internal L&D champions',
          'Industry 4.0 — IoT, AI in manufacturing, smart automation',
          'Digital transformation strategy workshops',
          'AI ethics, bias, and responsible deployment',
          'Case studies from Indian and global enterprises',
          'Bespoke curriculum built around your team\'s tech stack'
        ]
      },
      {
        title: 'Collaboration & Customisation',
        points: [
          'Institution visit and needs-assessment call before programme design',
          'Fully customisable duration, depth, and topic selection',
          'MOU-based long-term partnerships available',
          'Online, offline, and hybrid delivery across Chennai and beyond',
          'Multiple faculty trainers available for large-group sessions',
          'Post-programme support — resources, Q&A sessions, recordings'
        ]
      }
    ],
    stats: [
      {n:'3', label:'Programme Types'},
      {n:'Custom', label:'Duration'},
      {n:'AICTE', label:'Aligned FDP'},
      {n:'MOU', label:'Partnerships'}
    ],
    cards: {
      sectionTitle: 'Programme Tracks',
      glowColor: 'rgba(200,169,110,.18)',
      items: [
        {icon:'🎓', name:'Faculty Development (FDP)', desc:'AI, ML, Data Science tools and UGC/AICTE curriculum-aligned teaching strategies'},
        {icon:'🏢', name:'Corporate Training (MDP)', desc:'Power BI, Generative AI, Python for data-driven decision making in enterprise teams'},
        {icon:'🧑‍🏫', name:'Train-the-Trainer', desc:'Methodology and content for internal L&D champions to upskill their own teams'},
        {icon:'⚙️', name:'Industry 4.0 Workshops', desc:'IoT, smart automation, AI in manufacturing, and digital transformation strategy'}
      ]
    },
    steps: {
      sectionTitle: 'How It Works',
      items: [
        {icon:'📞', title:'Needs Assessment', desc:'A call with your institution or L&D head to understand goals and knowledge levels'},
        {icon:'📐', title:'Curriculum Design', desc:'DSA builds a bespoke programme aligned to your team\'s tools and timelines'},
        {icon:'🎯', title:'Programme Delivery', desc:'Expert-led sessions — online, offline, or hybrid — at your preferred schedule'},
        {icon:'📊', title:'Assessment & Reports', desc:'Post-training evaluations and competency reports for all participants'},
        {icon:'📜', title:'Certification', desc:'AICTE-aligned certificates of participation issued to all attendees'}
      ]
    },
    prereqs: 'No specific prerequisites — programmes are calibrated to the participants\' existing knowledge level. A pre-programme needs-assessment is conducted for all institutional and corporate engagements.',
    cta: 'Request a Programme',
    ctaParam: 'Faculty Development Programme'
  },

  /* ── 4. Competitive Exam Training ──────────────────────── */
  'exam-coaching': {
    id: 'exam-coaching',
    title: 'Competitive Examination Training',
    subtitle: 'UGC NET · GATE · TNSET · PG-TRB',
    tag: 'Exam Coaching',
    tagClass: 'ptf',
    icon: '🏆',
    iconClass: 'pi-exam',
    glowColor: '#5af078',
    audience: ['Postgraduate Students (CS / IT / Data Science)', 'Aspiring Lecturers & Research Scholars', 'GATE Aspirants', 'State-Level Exam Candidates'],
    delivery: ['Online — Live Batches & Recorded Sessions', 'Crash Courses (Intensive Offline)'],
    duration: 'Crash Course: 4–6 Weeks · Regular Batch: 3–6 Months',
    certificate: 'DSA Coaching Completion Certificate',
    overview: 'Expert-led preparation for the most competitive national and state-level examinations in Computer Science and Data Science. Taught by domain experts with a personal track record of clearing multiple competitive exams, this programme covers theory, problem-solving strategy, mock testing, and performance analysis — giving you the edge to crack UGC NET, GATE CS, TNSET, and PG-TRB with confidence.',
    outcomes: [
      'Deep conceptual clarity in all UGC NET / GATE CS core subjects',
      'Exam-specific strategy — what to study, how to attempt, time management',
      'Timed practice tests with detailed performance analysis',
      'Exposure to 5+ years of previous question papers with solutions',
      'Mock series simulating actual exam conditions',
      'Mentorship from faculty who have personally cleared these exams'
    ],
    sections: [
      {
        title: 'Exams Covered',
        points: [
          'UGC NET — Computer Science & Applications (Paper I + Paper II)',
          'NET JRF — Junior Research Fellowship qualifying preparation',
          'GATE — CS (CSE), IT, Data Science & AI paper streams',
          'TNSET — Tamil Nadu State Eligibility Test (Computer Science)',
          'PG-TRB — Tamil Nadu Postgraduate Teacher Recruitment Board',
          'Other state-level computer science eligibility examinations'
        ]
      },
      {
        title: 'Subjects & Topics',
        points: [
          'Data Structures and Algorithms — complexity, trees, graphs, sorting',
          'Database Management Systems — SQL, normalisation, transactions',
          'Operating Systems — process scheduling, memory, file systems',
          'Computer Networks — OSI model, TCP/IP, routing protocols',
          'Theory of Computation — automata, grammars, Turing machines',
          'Discrete Mathematics, Linear Algebra, Probability & Statistics'
        ]
      },
      {
        title: 'Modes of Preparation',
        points: [
          'Regular Batch — systematic subject-by-subject coverage over 3–6 months',
          'Crash Course — intensive revision and mock series over 4–6 weeks',
          'Practice Test Series — weekly timed tests with percentile analysis',
          'Mock Exam Series — full-length simulations under exam conditions',
          'Doubt-clearing sessions — dedicated weekly live Q&A',
          'Personalised performance reports and weak-area targeting'
        ]
      },
      {
        title: 'Our Unique Edge',
        points: [
          'Taught by domain experts who have personally cleared UGC NET, GATE, and TNSET',
          'Topic weightage analysis from previous 5+ years of question papers',
          'Short-form notes and formula sheets for rapid revision',
          'Dedicated online community for peer discussion and resources',
          'Flexible scheduling — morning, evening, and weekend batches',
          'Individual mentorship calls for high-potential students'
        ]
      }
    ],
    stats: [
      {n:'5+', label:'Exams Covered'},
      {n:'5+', label:'Years of Papers'},
      {n:'Weekly', label:'Mock Tests'},
      {n:'Expert', label:'Mentors'}
    ],
    cards: {
      sectionTitle: 'Exams We Cover',
      glowColor: 'rgba(90,240,120,.18)',
      items: [
        {icon:'📘', name:'UGC NET', desc:'Computer Science & Applications — Paper I (General) + Paper II (Subject)'},
        {icon:'🎓', name:'NET JRF', desc:'Junior Research Fellowship qualifying prep with advanced problem solving'},
        {icon:'⚙️', name:'GATE CS / IT', desc:'CS, IT, Data Science & AI streams — algorithms, OS, DBMS, networks and more'},
        {icon:'📋', name:'TNSET', desc:'Tamil Nadu State Eligibility Test — Computer Science paper preparation'},
        {icon:'🏫', name:'PG-TRB', desc:'Tamil Nadu Postgraduate Teacher Recruitment Board — CS subject coaching'},
        {icon:'🗂️', name:'Other State Exams', desc:'State-level computer science eligibility examinations across India'}
      ]
    },
    steps: {
      sectionTitle: 'Your Preparation Journey',
      items: [
        {icon:'📝', title:'Enrol & Assess', desc:'Join a batch; baseline test maps your strong and weak subject areas'},
        {icon:'📚', title:'Systematic Coverage', desc:'Subject-by-subject theory sessions with short notes and formula sheets'},
        {icon:'🧪', title:'Practice Tests', desc:'Weekly timed tests with percentile ranking and answer explanations'},
        {icon:'⏱️', title:'Mock Exam Series', desc:'Full-length mock exams under real exam conditions with performance reports'},
        {icon:'🏆', title:'Crack the Exam', desc:'Final revision, strategy session, and you walk into the exam hall ready'}
      ]
    },
    prereqs: 'Completed or currently pursuing a Bachelor\'s or Master\'s degree in Computer Science, IT, or a related discipline. For NET JRF, a postgraduate degree is mandatory as per UGC norms.',
    cta: 'Register for Coaching',
    ctaParam: 'Competitive Examination Training'
  },

  /* ── 5. Research Assistance ────────────────────────────── */
  'research-assistance': {
    id: 'research-assistance',
    title: 'Research Assistance & Interdisciplinary Guidance',
    subtitle: 'Powered by AID VIRTUAL',
    tag: 'Research Support',
    tagClass: 'ptd',
    icon: '🔬',
    iconClass: 'pi-res',
    glowColor: '#e8956e',
    audience: ['PhD Scholars & Research Students', 'Faculty & Research Guides', 'Humanities & Social Science Researchers needing Technical Aid', 'Independent Researchers'],
    delivery: ['Online (Zoom / Teams)', 'Asynchronous — Submission & Feedback Cycles'],
    duration: 'Project-based (1 week to 6 months)',
    certificate: 'Research Guidance Acknowledgement Letter',
    overview: 'End-to-end research support for scholars, faculty, and independent researchers — from the very first idea to final journal submission. Powered by AID VIRTUAL\'s proofreading arm, this programme offers a unique interdisciplinary edge: technical researchers get statistical and AI-driven analysis, while Humanities, Education, and Social Sciences scholars get expert technical support to strengthen their research with data science methodologies they could not otherwise access.',
    outcomes: [
      'Clear, structured research proposal or topic finalization',
      'Well-drafted research paper ready for targeted journal submission',
      'Statistical analysis (SPSS, R, Python) with interpretation',
      'Professionally proofread and publication-ready manuscript',
      'Expert journal targeting — right journal, right impact factor',
      'Interdisciplinary technical support for non-CS research scholars'
    ],
    sections: [
      {
        title: 'Research Guidance Services',
        points: [
          'Domain Mapping — identifying the right research area and gap',
          'Topic Finalization — scoping a feasible, publishable research question',
          'Literature Review — systematic search, citation management, synthesis',
          'Research Proposal Writing — structure, objectives, methodology',
          'Paper Drafting — introduction, methodology, results, discussion, conclusion',
          'Revision cycles and response to reviewer comments'
        ]
      },
      {
        title: 'Statistical & Data Analysis',
        points: [
          'Descriptive and inferential statistics (mean, SD, t-test, ANOVA)',
          'Regression analysis — linear, logistic, multiple regression',
          'SPSS analysis with interpreted output and report writing',
          'Python and R for advanced data science research',
          'Survey data analysis — factor analysis, reliability (Cronbach\'s α)',
          'Visualisation of research findings — charts, heatmaps, plots'
        ]
      },
      {
        title: 'Publication Support',
        points: [
          'Journal targeting — Scopus, Web of Science, UGC Care, Q1–Q4',
          'Manuscript formatting per journal guidelines (IEEE, APA, Vancouver)',
          'Plagiarism check and reduction strategies',
          'AID VIRTUAL proofreading — grammar, clarity, academic tone',
          'Cover letter and author statement drafting',
          'Submission support and post-submission revision assistance'
        ]
      },
      {
        title: 'Interdisciplinary Support',
        points: [
          'Humanities — digital humanities, text mining, discourse analysis',
          'Education Research — learning analytics, survey tools, EdTech studies',
          'Social Sciences — sentiment analysis, social network analysis',
          'Management — business intelligence, predictive modelling for theses',
          'Medical / Health Sciences — clinical data analysis and ML models',
          'Any discipline needing technical depth in data science or AI methods'
        ]
      }
    ],
    stats: [
      {n:'4', label:'Service Areas'},
      {n:'6+', label:'Disciplines'},
      {n:'Scopus', label:'Journal Targeting'},
      {n:'AID', label:'VIRTUAL Powered'}
    ],
    cards: {
      sectionTitle: 'Services Offered',
      glowColor: 'rgba(232,149,110,.18)',
      items: [
        {icon:'🗺️', name:'Domain Mapping', desc:'Identify the right research gap, topic scope, and feasible methodology'},
        {icon:'✍️', name:'Proposal & Paper Drafting', desc:'Structured writing for proposals, journal papers, and conference submissions'},
        {icon:'📊', name:'Statistical Analysis', desc:'SPSS, R, and Python — analysis, interpretation, and visualisation of findings'},
        {icon:'📖', name:'Publication Support', desc:'Journal targeting, formatting, plagiarism check, and submission assistance'},
        {icon:'🔍', name:'Literature Review', desc:'Systematic search, synthesis, and citation management with Mendeley / Zotero'},
        {icon:'🌐', name:'Interdisciplinary Aid', desc:'Technical support for Humanities, Education, and Social Sciences researchers'}
      ]
    },
    steps: {
      sectionTitle: 'Research Support Process',
      items: [
        {icon:'💡', title:'Share Your Idea', desc:'Send a brief — your topic, field, stage of research, and deadline'},
        {icon:'🗺️', title:'Planning Session', desc:'A 1-on-1 call to map your research goals and agree on a work plan'},
        {icon:'⚗️', title:'Execution', desc:'Analysis, writing, or statistical work is completed by the DSA team'},
        {icon:'🔄', title:'Review Cycles', desc:'You review the work, provide feedback, and we refine until it is perfect'},
        {icon:'📤', title:'Submit & Publish', desc:'Final manuscript, cover letter drafted, and submission supported end-to-end'}
      ]
    },
    prereqs: 'Open to all research scholars, faculty, and independent researchers regardless of discipline or technical background. A brief research brief or topic idea is sufficient to begin.',
    cta: 'Get Research Support',
    ctaParam: 'Research Assistance & Interdisciplinary Guidance'
  },

  /* ── 6. DSA Code Champs ────────────────────────────────── */
  'code-champs': {
    id: 'code-champs',
    title: 'DSA Code Champs',
    subtitle: 'School Outreach Programme — Grade 6 to 9',
    tag: 'School Outreach',
    tagClass: 'pte',
    icon: '🤖',
    iconClass: 'pi-code',
    glowColor: '#c792ea',
    audience: ['School Students — Grade 6 to Grade 9', 'School Coordinators & STEM Clubs', 'Parents of Young Learners'],
    delivery: ['Offline — School Visits (Chennai)', 'Online — Interactive Live Sessions'],
    duration: '4 Weeks (1 session per week) · Weekend Bootcamps available',
    certificate: 'DSA Code Champs Participation Certificate',
    overview: 'DSA Code Champs is a school outreach initiative designed to nurture early interest in STEM and AI among students in Grades 6 to 9. Through fun, activity-based, and project-driven learning — using age-appropriate tools like Scratch and introductory Python — we plant the seeds for tomorrow\'s AI engineers, researchers, and innovators. Every session is designed to be engaging, visual, and hands-on, making technology accessible and exciting for young minds.',
    outcomes: [
      'First steps in programming using Scratch (visual) and Python (text)',
      'Core computational thinking and mathematical logic skills',
      'Introduction to Artificial Intelligence concepts in simple terms',
      'Awareness of Robotics and IoT through demonstrations and activities',
      'Confidence to explore coding beyond the school curriculum',
      'DSA Code Champs participation certificate for portfolio'
    ],
    sections: [
      {
        title: 'What Students Learn',
        points: [
          'Basics of Programming — variables, loops, conditions using Scratch',
          'Introductory Python — simple programs, turtle graphics, mini-games',
          'Computational Thinking — problem decomposition, pattern recognition',
          'Mathematical Logic — puzzles, number patterns, algorithm thinking',
          'Introduction to Artificial Intelligence — what is AI and how it works',
          'Robotics & IoT — live demos and hands-on kits (where available)'
        ]
      },
      {
        title: 'Session Format',
        points: [
          'Weekly 90-minute interactive sessions (or weekend bootcamp format)',
          'Activity-first approach — students do before they are taught theory',
          'Team challenges and mini-hackathons to build collaboration skills',
          'Show-and-tell: students present their mini-projects each session',
          'Q&A time with DSA faculty — demystifying AI and technology',
          'Fun quizzes and leaderboard — gamified learning experience'
        ]
      },
      {
        title: 'School Partnership',
        points: [
          'DSA visits your school or college campus (Chennai and nearby)',
          'Fully managed programme — no teacher preparation required',
          'Custom scheduling to fit the school calendar and timetable',
          'All materials, activity sheets, and kits provided by DSA',
          'Post-programme student performance report for the school',
          'Parents invited to a closing showcase of student projects'
        ]
      },
      {
        title: 'Our STEM Mission',
        points: [
          'Goal: make every child in India curious about technology',
          'Aligned with NEP 2020 computational thinking competencies',
          'Special focus on encouraging girls in STEM and AI',
          'Bridges the gap between school curriculum and future careers',
          'Inspiring the next generation of Data Scientists and AI researchers',
          'Supported by DSA\'s team of PhD-qualified faculty and AI engineers'
        ]
      }
    ],
    stats: [
      {n:'Gr 6–9', label:'Target Age Group'},
      {n:'4', label:'Weeks'},
      {n:'NEP', label:'2020 Aligned'},
      {n:'STEM', label:'Mission'}
    ],
    cards: {
      sectionTitle: 'What Students Explore',
      glowColor: 'rgba(199,146,234,.18)',
      items: [
        {icon:'🐱', name:'Scratch Programming', desc:'Visual drag-and-drop coding to build games, stories, and animations'},
        {icon:'🐍', name:'Introductory Python', desc:'Simple programs, turtle graphics, and mini-games — first real code'},
        {icon:'🧩', name:'Computational Thinking', desc:'Problem decomposition, pattern recognition, and algorithm design'},
        {icon:'🔢', name:'Mathematical Logic', desc:'Number puzzles, logic challenges, and the maths behind programming'},
        {icon:'🤖', name:'Introduction to AI', desc:'What is AI, how it learns, and how it affects everyday life'},
        {icon:'⚡', name:'Robotics & IoT', desc:'Live demonstrations and hands-on kits exploring real-world automation'}
      ]
    },
    steps: {
      sectionTitle: 'School Partnership Process',
      items: [
        {icon:'🤝', title:'Partner with DSA', desc:'School coordinator reaches out; DSA schedules a planning meeting'},
        {icon:'📅', title:'Schedule Sessions', desc:'4-week calendar built around school timetable and academic calendar'},
        {icon:'🎒', title:'DSA Visits', desc:'Trainers arrive with all materials, kits, and activity sheets — no prep needed'},
        {icon:'🎮', title:'Interactive Sessions', desc:'90-minute fun, project-based sessions each week with team challenges'},
        {icon:'🏆', title:'Closing Showcase', desc:'Students present projects to parents and teachers; certificates awarded'}
      ]
    },
    prereqs: 'No prior technology experience needed. Designed for complete beginners aged 11–15. All a student needs is curiosity and enthusiasm.',
    cta: 'Bring DSA Code Champs to Your School',
    ctaParam: 'DSA Code Champs (School Outreach)'
  },

  /* ── 7. Language & Communication ───────────────────────── */
  'language-communication': {
    id: 'language-communication',
    title: 'Language & Communication for Tech Professionals',
    subtitle: 'Academic · Interview · Research Communication',
    tag: 'Communication Skills',
    tagClass: 'ptg',
    icon: '💬',
    iconClass: 'pi-lang',
    glowColor: '#ff79c6',
    audience: ['Engineering & Science Students', 'Research Scholars & PhD Candidates', 'Software Developers & Data Scientists', 'Job Seekers & Interview Candidates'],
    delivery: ['Online — Live + Recorded', 'Feedback-driven asynchronous sessions'],
    duration: '4–8 Weeks',
    certificate: 'DSA Communication Programme Certificate',
    overview: 'A tech-focused, practical communication programme that helps students, researchers, developers, and job seekers express themselves with clarity, confidence, and impact. Unlike generic English courses, every lesson is anchored in real-world tech scenarios — from writing a research paper abstract to cracking a data science interview or delivering a compelling project presentation. The emphasis is always on practical, feedback-driven improvement rather than theory.',
    outcomes: [
      'Write clear, publication-ready academic papers and research abstracts',
      'Communicate fluently in technical interviews and group discussions',
      'Draft professional emails, proposals, and project reports',
      'Deliver confident presentations to technical and non-technical audiences',
      'Build a strong professional brand on LinkedIn and in written communication',
      'Reduce hesitation and communicate complex ideas simply'
    ],
    sections: [
      {
        title: 'Academic Writing & Research Communication',
        points: [
          'Research paper structure — abstract, introduction, methodology, conclusion',
          'Academic tone — formal writing, hedging language, citation style',
          'Paragraph cohesion — topic sentences, linking ideas, transitions',
          'Writing a strong research proposal or project synopsis',
          'Poster and conference presentation preparation',
          'Email communication with professors, supervisors, and journals'
        ]
      },
      {
        title: 'Technical Interview Preparation',
        points: [
          'Spoken English for interviews — fluency, pronunciation, clarity',
          'Structuring answers using STAR method for behavioural questions',
          'Explaining technical projects to non-technical interviewers',
          'Common data science and software engineer interview Q&A practice',
          'Group discussion strategies and leadership communication',
          'Mock interviews with detailed feedback from trainers'
        ]
      },
      {
        title: 'Professional Writing Skills',
        points: [
          'Email writing — subject lines, tone, brevity, and professional courtesy',
          'Proposal writing — structure, persuasion, executive summaries',
          'Technical report writing for projects, internships, and placements',
          'Slide design principles for impactful technical presentations',
          'LinkedIn profile optimisation — headline, about section, posts',
          'Cover letter and statement of purpose (SOP) writing'
        ]
      },
      {
        title: 'Practical Delivery & Feedback',
        points: [
          'Every session includes a real writing or speaking exercise',
          'Trainer feedback on grammar, clarity, confidence, and structure',
          'Recording and self-review of speaking practice sessions',
          'Peer review circles — give and receive structured feedback',
          'Weekly mini-challenges aligned to real tech communication needs',
          'Resource library — templates, checklists, and style guides'
        ]
      }
    ],
    stats: [
      {n:'4–8', label:'Weeks'},
      {n:'4', label:'Skill Areas'},
      {n:'Mock', label:'Interviews'},
      {n:'100%', label:'Practical'}
    ],
    cards: {
      sectionTitle: 'Skill Areas',
      glowColor: 'rgba(255,121,198,.18)',
      items: [
        {icon:'📝', name:'Academic Writing', desc:'Research papers, abstracts, proposals — structured, toned, and publication-ready'},
        {icon:'🎤', name:'Technical Interviews', desc:'Spoken fluency, STAR method, mock interviews with detailed feedback'},
        {icon:'📧', name:'Professional Writing', desc:'Emails, reports, proposals, presentations, and LinkedIn communication'},
        {icon:'🖥️', name:'Presentation Skills', desc:'Slide design, delivery confidence, and storytelling for tech audiences'}
      ]
    },
    steps: {
      sectionTitle: 'How the Programme Works',
      items: [
        {icon:'📋', title:'Baseline Assessment', desc:'Short writing and speaking task to identify your starting point'},
        {icon:'📚', title:'Skill Sessions', desc:'Live classes covering each of the 4 skill areas with real exercises'},
        {icon:'✏️', title:'Practice & Submit', desc:'Weekly assignments submitted for trainer feedback and improvement'},
        {icon:'🎙️', title:'Mock Interviews', desc:'1-on-1 recorded mock sessions with structured feedback on fluency and content'},
        {icon:'🌟', title:'Certify & Apply', desc:'Certificate issued; apply your skills to jobs, research, or publications'}
      ]
    },
    prereqs: 'Basic proficiency in English (reading and writing). No advanced grammar knowledge required. Suitable for any technical or research background.',
    cta: 'Enroll in Communication Programme',
    ctaParam: 'Language & Communication for Tech Professionals'
  },

  /* ── 8. AI Mastery Track ────────────────────────────────── */
  'ai-mastery': {
    id: 'ai-mastery',
    title: 'The Complete AI & Data Science Mastery Track',
    subtitle: '12-Month Structured Learning Roadmap · Q1 → Q4',
    tag: 'AI Mastery · 12 Months',
    tagClass: 'pth',
    icon: '🚀',
    iconClass: 'pi-mastery',
    glowColor: '#f0c040',
    audience: ['Fresh Graduates & Career Changers', 'Students targeting AI/ML roles', 'Professionals pivoting to Data Science', 'Anyone wanting a complete, guided learning path'],
    delivery: ['Online — Live + Recorded', 'Quarterly Offline Bootcamps (Chennai)', 'Hybrid — Self-paced + Mentor-led'],
    duration: '12 Months (4 Quarters)',
    certificate: 'DSA AI Mastery Certificate + Project Portfolio + Internship Certificate',
    overview: 'The most comprehensive learning journey offered by Data Science Academia — a structured, mentor-guided 12-month programme that takes you from complete beginner to a job-ready AI and Data Science professional. Mapped across four quarters, each quarter builds on the last — from Python and SQL foundations through business analytics, data engineering, machine learning, deep learning, NLP, and cloud computing. Every quarter concludes with a capstone project, and graduates receive a full portfolio, internship certificate, and placement assistance.',
    outcomes: [
      'Complete command of Python, SQL, R, and Excel for data roles',
      'Professional-grade skills in ML, Deep Learning, NLP, and Cloud',
      'Industry portfolio with 4 capstone projects (one per quarter)',
      'DSA AI Mastery Certificate — recognised by hiring partners',
      'Internship certificate upon successful programme completion',
      'Placement assistance — resume review, mock interviews, LinkedIn'
    ],
    sections: [
      {
        title: 'Programme Structure & Delivery',
        points: [
          '12 months divided into 4 focused quarters — each with a clear learning theme',
          '3 live sessions per week (recorded for replay) + self-paced practice assignments',
          'Quarterly offline bootcamps in Chennai for immersive, hands-on project work',
          'Dedicated mentor — weekly 1-on-1 check-in to track progress and address doubts',
          'Peer cohort model — learn alongside a batch of motivated professionals',
          'Flexible pacing: catch-up sessions and recordings available for working professionals'
        ]
      },
      {
        title: 'Capstone Projects & Portfolio',
        points: [
          'Q1 Capstone: End-to-end exploratory data analysis on a real business dataset',
          'Q2 Capstone: Build and present a full analytics dashboard from raw, unstructured data',
          'Q3 Capstone: Train, evaluate, and deploy a machine learning model on a live dataset',
          'Q4 Capstone: Full-stack AI system — data ingestion → model → deployed cloud API',
          'All 4 projects compiled into a professional GitHub portfolio with documentation',
          'Portfolio reviewed and endorsed by DSA faculty before placement assistance begins'
        ]
      },
      {
        title: 'Certification & Career Outcomes',
        points: [
          'DSA AI Mastery Certificate issued on successful completion — recognised by hiring partners',
          'DSA Internship Certificate bundled with the track (no separate application needed)',
          'Placement assistance: resume writing, LinkedIn optimisation, and referral network',
          'Mock interview sessions (technical + HR) in the final quarter with feedback',
          'Alumni network access — job alerts, peer mentoring, and industry events',
          'Guidance for Microsoft Azure (AI-900 / DP-900) certification as an add-on'
        ]
      },
      {
        title: 'Who Should Enrol & Why',
        points: [
          'Fresh graduates in engineering, science, or any discipline with an interest in AI',
          'Working professionals looking to pivot into data science or AI roles',
          'Students who want one structured path rather than stitching courses together',
          'Ideal if you want a portfolio, a certificate, mentorship, and placement support — all in one',
          'Not recommended if you are only looking for a single short course or a specific tool',
          'All backgrounds welcome — the programme starts from absolute basics in Q1'
        ]
      }
    ],
    prereqs: 'No prior programming or data science experience required. Basic computer literacy and a commitment to 10–12 hours of study per week is sufficient to succeed in this programme.',
    cta: 'Apply for AI Mastery Track',
    ctaParam: 'AI Mastery Track (12-Month Programme)'
  }

};

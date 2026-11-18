/* ════════════════════════════════════════════════════════════════════════════
   DSA_COURSE_GUIDES — "Is this course for you?" + "Where it leads" for each course page
   ────────────────────────────────────────────────────────────────────────────
   Keyed by the course id in courses-data.js. Read by tools/build.py only (not served).
     forWho  — 3–4 short descriptions of the learner this course suits
     roles   — typical job titles the skills feed into (career-guidance, not a placement promise)
     before  — course ids that prepare for this one (shown as "Start with" when the learner is new)
     next    — course ids that naturally follow (shown as "Next on your path")
     faqs    — optional extra { q, a } pairs appended to the page's generated FAQ (a may hold HTML;
               write links as {rel}courses/x.html)
   ════════════════════════════════════════════════════════════════════════════ */
const DSA_COURSE_GUIDES = {

  /* ── Foundation ── */
  'python': {
    forWho: [
      'Complete beginners — school leavers, graduates or professionals — who have never written code',
      'Engineers and analysts who want to automate repetitive work with Python',
      'Anyone planning a path into data analysis, machine learning or AI'
    ],
    roles: ['Data Analyst', 'Python Developer (junior)', 'Automation / Scripting Engineer', 'ML Engineer (with further study)'],
    before: [],
    next: ['sql', 'data-visualization', 'machine-learning']
  },
  'sql': {
    forWho: [
      'Beginners who work with spreadsheets or reports and want to query data directly',
      'Aspiring data and business analysts — SQL is asked in almost every analyst interview',
      'Developers and testers who need confident database querying'
    ],
    roles: ['Data Analyst', 'Business Analyst', 'MIS / Reporting Analyst', 'SQL Developer'],
    before: [],
    next: ['power-bi', 'tableau', 'python']
  },
  'r-programming': {
    forWho: [
      'Students and researchers in statistics, economics, biostatistics or the social sciences',
      'Ph.D. scholars who need to analyse and visualise thesis data reproducibly',
      'Analysts who prefer a statistics-first workflow'
    ],
    roles: ['Statistical Analyst', 'Research Analyst', 'Data Analyst', 'Biostatistician (with domain training)'],
    before: [],
    next: ['tableau', 'python']
  },

  /* ── Core ML ── */
  'machine-learning': {
    forWho: [
      'Learners with Python basics who are ready to build predictive models',
      'Data analysts moving into data science',
      'Engineering and science students preparing final-year or research projects'
    ],
    roles: ['Data Scientist', 'Machine Learning Engineer (junior)', 'Data Analyst — advanced analytics'],
    before: ['python'],
    next: ['feature-engineering', 'deep-learning', 'mlops']
  },
  'nlp': {
    forWho: [
      'Machine-learning learners who want to work with text, documents and language',
      'Developers building chatbots, search, classification or sentiment tools',
      'Researchers analysing text corpora — reviews, social media, legal or clinical notes'
    ],
    roles: ['NLP Engineer', 'Machine Learning Engineer', 'Data Scientist — text analytics'],
    before: ['machine-learning'],
    next: ['llm', 'generative-ai']
  },
  'feature-engineering': {
    forWho: [
      'Machine-learning learners whose models have stopped improving',
      'Data scientists who want a rigorous, repeatable way to choose and tune models',
      'Kaggle and hackathon participants'
    ],
    roles: ['Data Scientist', 'Machine Learning Engineer'],
    before: ['machine-learning'],
    next: ['mlops', 'deep-learning']
  },

  /* ── Advanced AI ── */
  'deep-learning': {
    forWho: [
      'Machine-learning learners ready to move to neural networks',
      'Engineers targeting computer vision, NLP or generative-AI roles',
      'Postgraduate students and researchers using deep learning in their work'
    ],
    roles: ['Deep Learning Engineer', 'Machine Learning Engineer', 'AI Research Assistant'],
    before: ['machine-learning'],
    next: ['computer-vision', 'llm', 'generative-ai']
  },
  'computer-vision': {
    forWho: [
      'Deep-learning learners interested in images and video',
      'Engineers in manufacturing, healthcare imaging, retail or surveillance',
      'Students building robotics, drone or smart-camera projects'
    ],
    roles: ['Computer Vision Engineer', 'Machine Learning Engineer', 'Applied AI Engineer'],
    before: ['deep-learning'],
    next: ['generative-ai', 'mlops']
  },
  'llm': {
    forWho: [
      'Developers building LLM applications — retrieval (RAG), agents and assistants',
      'Deep-learning and NLP learners who want to understand Transformers end to end',
      'Technical teams evaluating which LLM approach suits their product'
    ],
    roles: ['LLM / Generative AI Engineer', 'AI Application Developer', 'Machine Learning Engineer'],
    before: ['deep-learning', 'nlp'],
    next: ['generative-ai', 'mlops']
  },
  'generative-ai': {
    forWho: [
      'Deep-learning learners curious about image, text and audio generation',
      'Engineers building generative-AI features into products',
      'Researchers and creative technologists experimenting with diffusion and GAN models'
    ],
    roles: ['Generative AI Engineer', 'Machine Learning Engineer', 'AI Research Assistant'],
    before: ['deep-learning'],
    next: ['llm', 'mlops']
  },
  'reinforcement-learning': {
    forWho: [
      'Deep-learning learners interested in agents that learn by trial and error',
      'Students and engineers in robotics, gaming, control systems or operations research',
      'Postgraduate researchers working on decision-making problems'
    ],
    roles: ['Reinforcement Learning / Research Engineer', 'Machine Learning Engineer', 'Robotics Software Engineer (with domain training)'],
    before: ['deep-learning'],
    next: ['mlops', 'llm']
  },
  'mlops': {
    forWho: [
      'ML practitioners who want their models running reliably in production',
      'Software and DevOps engineers moving into machine learning',
      'Data scientists who want to own deployment, monitoring and retraining'
    ],
    roles: ['MLOps Engineer', 'Machine Learning Engineer', 'ML Platform / Data Engineer'],
    before: ['machine-learning'],
    next: ['azure', 'aws']
  },

  /* ── Analytics ── */
  'data-visualization': {
    forWho: [
      'Python learners who want to present findings clearly and convincingly',
      'Analysts moving from spreadsheet charts to Python visualisation',
      'Students and researchers preparing reports, theses and project presentations'
    ],
    roles: ['Data Analyst', 'BI / Reporting Analyst', 'Data Scientist'],
    before: ['python'],
    next: ['tableau', 'power-bi', 'machine-learning']
  },
  'excel': {
    forWho: [
      'Complete beginners and office professionals who work with data every day',
      'Students preparing for analyst, MIS or operations roles',
      'Business owners and finance, HR or operations staff who report on numbers'
    ],
    roles: ['MIS Executive', 'Data / Business Analyst (entry level)', 'Reporting Analyst'],
    before: [],
    next: ['power-bi', 'sql', 'tableau']
  },
  'tableau': {
    forWho: [
      'Analysts who want interactive dashboards without programming',
      'Managers and team leads who present data to stakeholders',
      'Excel users ready to move to a dedicated BI tool'
    ],
    roles: ['Tableau Developer', 'BI Analyst', 'Data Analyst'],
    before: ['excel'],
    next: ['sql', 'power-bi']
  },

  /* ── Cloud & BI ── */
  'power-bi': {
    forWho: [
      'Excel users who want automated, shareable dashboards',
      'Business and data analysts working in Microsoft-based organisations',
      'Learners preparing for Microsoft Power BI certification (PL-300)'
    ],
    roles: ['Power BI Developer', 'BI Analyst', 'Data Analyst'],
    before: ['excel'],
    next: ['sql', 'azure'],
    faqs: [
      { q: 'Does this course help with Microsoft PL-300 certification?', a: 'The course covers the Power BI skills the exam tests. For structured exam preparation — practice tests and exam strategy — see our <a href="{rel}programmes/microsoft-certification.html">Microsoft Certification Program</a>.' }
    ]
  },
  'azure': {
    forWho: [
      'Data and ML practitioners moving their work to the cloud',
      'IT professionals adding Azure data and AI services to their skills',
      'Learners preparing for Microsoft AZ-900, AI-900 or DP-900'
    ],
    roles: ['Azure Data Engineer (junior)', 'Cloud / AI Engineer', 'Data Engineer'],
    before: ['python', 'sql'],
    next: ['mlops'],
    faqs: [
      { q: 'Does this course prepare me for Microsoft Azure certifications?', a: 'It builds the hands-on Azure skills behind AZ-900, AI-900 and DP-900. For focused exam preparation see our <a href="{rel}programmes/microsoft-certification.html">Microsoft Certification Program</a>.' }
    ]
  },
  'aws': {
    forWho: [
      'Data and ML practitioners who want to build and deploy on AWS',
      'Developers and IT professionals adding cloud data services to their skills',
      'Learners whose employers or clients run on AWS'
    ],
    roles: ['Cloud Data Engineer', 'Machine Learning Engineer (AWS)', 'Data Engineer'],
    before: ['python', 'sql'],
    next: ['mlops']
  }
};

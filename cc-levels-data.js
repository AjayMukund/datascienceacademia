const CC_LEVELS = {
  explorers: {
    id:'explorers', level:1, levelPad:'01', badge:'Level 1',
    name:'Code Explorers',
    tagline:'Where Every Young Mind Becomes a Creator',
    grade:'Grade 3 – 5', age:'Ages 8 – 10',
    color:'#3ecfb2', rgb:'62,207,178', icon:'🧱',
    duration:'3 Months', sessions:'24 Sessions', format:'Online & Offline',
    cert:'Code Explorers Certificate',
    hero:'Children at this age are naturally imaginative and curious. Code Explorers channels that energy into creating — real animations, games, and stories — using Scratch, the world\'s most popular visual coding platform. No prior experience needed. Just curiosity.',
    journey:[
      { phase:'Phase 1', title:'Think Like a Computer', weeks:'Weeks 1 – 3', icon:'💡',
        topics:['What is coding and how computers think','Sequences and logical order','Finding patterns in everyday life','Debugging — the superpower of problem-solvers'] },
      { phase:'Phase 2', title:'Your First Game in Scratch', weeks:'Weeks 4 – 7', icon:'🎮',
        topics:['Scratch environment, sprites, and stage','Loops, events, and motion blocks','Animations and sound effects','Build a complete catching game'] },
      { phase:'Phase 3', title:'Stories & Creative Art', weeks:'Weeks 8 – 10', icon:'🎨',
        topics:['Interactive animated stories with characters','Custom backdrops and costumes','Branching narratives with conditionals','Express creativity through code'] },
      { phase:'Phase 4', title:'My Big Project & Demo Day', weeks:'Weeks 11 – 12', icon:'🏆',
        topics:['Plan and design your own project','Build independently with guidance','Test, debug, and polish','Present to parents and peers on Demo Day'] }
    ],
    projects:[
      { icon:'🎮', title:'Catch the Stars', tag:'Scratch Game',
        desc:'A fully working catching game with score counter, increasing difficulty, and a game-over screen — built end-to-end in Scratch.' },
      { icon:'📖', title:'My Animated Story', tag:'Storytelling',
        desc:'An interactive animated story with original characters, dialogue, scene transitions, and a surprise twist the student invents themselves.' },
      { icon:'🎨', title:'Code Art Gallery', tag:'Creative Coding',
        desc:'A Scratch project showcasing original digital art pieces with animations — each triggered by user clicks or keyboard events.' }
    ],
    skills:['Scratch','Block Coding','Sequences','Loops','Events','Conditionals','Animations','Debugging','Computational Thinking','Creative Storytelling'],
    forList:['Aged 8 to 10 years — Grade 3, 4, or 5','Has never written a line of code before','Loves games, stories, drawing, or making things','Curious about how apps and games are created','Wants to build something they can proudly show'],
    outcomes:['Build 3+ complete Scratch projects','Understand sequences, loops, events, and conditionals','Develop a structured approach to problem-solving','Earn the Code Explorers Certificate','Graduate confident and ready for the next level'],
    next:'builders', nextName:'Code Builders', nextGrade:'Grade 6 – 7'
  },

  builders: {
    id:'builders', level:2, levelPad:'02', badge:'Level 2',
    name:'Code Builders',
    tagline:'From Block Coding to Real Python — The Big Leap',
    grade:'Grade 6 – 7', age:'Ages 11 – 12',
    color:'#7a9fff', rgb:'122,159,255', icon:'🐍',
    duration:'3 Months', sessions:'24 Sessions', format:'Online & Offline',
    cert:'Code Builders Certificate',
    hero:'This is where real programming begins. Code Builders makes the exciting leap from visual blocks to text-based Python — the same language used by Google, Netflix, and NASA. Students write actual code, build working apps, and get their first taste of Artificial Intelligence.',
    journey:[
      { phase:'Phase 1', title:'Welcome to Python', weeks:'Weeks 1 – 3', icon:'🐍',
        topics:['Python syntax, variables, and data types','Print, input, and user interaction','Conditions and decision-making (if/else)','Your first real programs — from idea to code'] },
      { phase:'Phase 2', title:'Loops, Functions & Graphics', weeks:'Weeks 4 – 6', icon:'🔁',
        topics:['For and while loops — repeating smartly','Functions — writing reusable code','Turtle graphics — drawing with code','Building a working calculator'] },
      { phase:'Phase 3', title:'Games & Chatbots', weeks:'Weeks 7 – 10', icon:'💬',
        topics:['Random module and game logic','Quiz game with score tracker','Your first Python chatbot','Introduction to AI concepts'] },
      { phase:'Phase 4', title:'Capstone Build & Demo Day', weeks:'Weeks 11 – 12', icon:'🏆',
        topics:['Choose: chatbot, quiz game, or app','Plan, code, test, and refine','Present at Code Champs Demo Day','Earn your certificate and portfolio entry'] }
    ],
    projects:[
      { icon:'💬', title:'Smart Chatbot', tag:'AI Intro',
        desc:'A Python chatbot that converses on a chosen topic — detecting keywords and responding intelligently using conditional logic.' },
      { icon:'🎮', title:'Python Quiz Game', tag:'Game Dev',
        desc:'A multi-round quiz game with score tracking, hints, a countdown timer, and a high-score leaderboard — entirely in Python.' },
      { icon:'🐢', title:'Turtle Art Machine', tag:'Creative Coding',
        desc:'A generative art program using Python\'s Turtle module — creating colourful geometric patterns and spirals through code.' }
    ],
    skills:['Python','Variables & Data Types','Loops','Functions','Conditionals','Turtle Graphics','Chatbot Logic','Random Module','Debugging','Intro to AI'],
    forList:['Aged 11 to 12 years — Grade 6 or 7','Has completed Code Explorers or has basic coding exposure','Ready to write real text-based code','Interested in games, chatbots, or apps','Wants to understand how AI actually works'],
    outcomes:['Write and run Python programs independently','Build 3+ working Python projects','Create their first AI-powered chatbot','Understand the foundations of Artificial Intelligence','Earn the Code Builders Certificate'],
    next:'innovators', nextName:'Code Innovators', nextGrade:'Grade 8 – 9'
  },

  innovators: {
    id:'innovators', level:3, levelPad:'03', badge:'Level 3',
    name:'Code Innovators',
    tagline:'From Programming to Engineering Intelligent Solutions',
    grade:'Grade 8 – 9', age:'Ages 13 – 14',
    color:'#c792ea', rgb:'199,146,234', icon:'🤖',
    duration:'4 Months', sessions:'32 Sessions', format:'Online & Offline',
    cert:'Code Innovators Certificate',
    hero:'Code Innovators is where students stop just programming and start engineering intelligent solutions. With Python at an intermediate level, students explore Data Science, Machine Learning, Computer Vision, and IoT — applying real AI techniques to problems that matter in the real world.',
    journey:[
      { phase:'Phase 1', title:'Python Levelled Up', weeks:'Weeks 1 – 3', icon:'⬆️',
        topics:['Object-Oriented Programming — classes and objects','File handling and data storage','NumPy and Pandas — working with data','Mini data manipulation projects'] },
      { phase:'Phase 2', title:'Data Science Dive', weeks:'Weeks 4 – 7', icon:'📊',
        topics:['Reading and cleaning real-world datasets','Data visualisation with Matplotlib and Seaborn','Identifying patterns and statistical insights','End-to-end mini data science project'] },
      { phase:'Phase 3', title:'Machine Learning Begins', weeks:'Weeks 8 – 11', icon:'🧠',
        topics:['What is ML? How machines learn from data','Scikit-learn pipeline — from data to model','Classification and prediction problems','Train, test, and evaluate your first ML model'] },
      { phase:'Phase 4', title:'Computer Vision & IoT', weeks:'Weeks 12 – 14', icon:'👁️',
        topics:['OpenCV basics and image processing','Real-time face detection project','Introduction to IoT and Raspberry Pi','Build an automation or smart-device project'] },
      { phase:'Phase 5', title:'Capstone AI Project', weeks:'Weeks 15 – 16', icon:'🏆',
        topics:['Problem selection and dataset gathering','End-to-end AI solution build','Demo Day presentation and showcase','Certificate and digital project portfolio'] }
    ],
    projects:[
      { icon:'🧠', title:'Image Classifier', tag:'Machine Learning',
        desc:'Train a machine learning model to classify images into categories using a real-world dataset and a Scikit-learn pipeline — from raw data to predictions.' },
      { icon:'👁️', title:'Face Detection App', tag:'Computer Vision',
        desc:'A real-time face detection program using OpenCV that identifies and highlights faces live through a webcam feed.' },
      { icon:'📊', title:'Data Story Dashboard', tag:'Data Science',
        desc:'A Python data analysis project that takes a real-world dataset and tells a visual story with charts, trends, and key insights.' }
    ],
    skills:['Python Intermediate','OOP','NumPy','Pandas','Matplotlib','Seaborn','Scikit-learn','Machine Learning','OpenCV','Computer Vision','IoT Basics','Data Analysis'],
    forList:['Aged 13 to 14 years — Grade 8 or 9','Has completed Code Builders or has solid Python fundamentals','Interested in AI, data science, or robotics','Ready for a more rigorous, project-heavy curriculum','Wants to build AI tools that solve real-world problems'],
    outcomes:['Analyse and visualise real-world datasets with Python','Train and evaluate a machine learning model','Build a computer vision application using OpenCV','Develop an IoT or real-world automation project','Earn the Code Innovators Certificate with a project portfolio'],
    next:'pioneers', nextName:'Code Pioneers', nextGrade:'Grade 10 – 12'
  },

  pioneers: {
    id:'pioneers', level:4, levelPad:'04', badge:'Level 4',
    name:'Code Pioneers',
    tagline:'Build, Train & Deploy Real-World AI Applications',
    grade:'Grade 10 – 12', age:'Ages 15 – 17',
    color:'#f0c040', rgb:'240,192,64', icon:'🚀',
    duration:'6 Months', sessions:'48 Sessions', format:'Online & Offline',
    cert:'Code Pioneers Certificate',
    hero:'Code Pioneers is the flagship track — the most advanced school-level AI programme in Chennai. Students master Python deeply, build production-quality ML models, explore Deep Learning and NLP, and deploy real AI applications. A direct launchpad for IIT/NIT admissions, AI research, and tech entrepreneurship.',
    journey:[
      { phase:'Phase 1', title:'Advanced Python Mastery', weeks:'Weeks 1 – 4', icon:'🐍',
        topics:['Advanced OOP — design patterns and architecture','APIs, JSON handling, and web scraping','Decorators, generators, and context managers','Building professional command-line tools'] },
      { phase:'Phase 2', title:'ML Engineering', weeks:'Weeks 5 – 10', icon:'⚙️',
        topics:['Full ML pipeline: data → features → model → deploy','Ensemble methods: XGBoost, Random Forest, Gradient Boosting','Hyperparameter tuning and cross-validation','Model evaluation metrics and interpretation'] },
      { phase:'Phase 3', title:'Deep Learning & NLP', weeks:'Weeks 11 – 16', icon:'🧠',
        topics:['Neural networks with TensorFlow and Keras','Convolutional Neural Networks for image recognition','RNNs and LSTMs for sequences and time-series','NLP: sentiment analysis and text classification'] },
      { phase:'Phase 4', title:'Advanced Computer Vision', weeks:'Weeks 17 – 20', icon:'👁️',
        topics:['Advanced OpenCV techniques and image processing','Object detection with YOLO in real time','Real-time video analysis pipelines','Build a custom computer vision application'] },
      { phase:'Phase 5', title:'Deployment & Cloud', weeks:'Weeks 21 – 22', icon:'☁️',
        topics:['Building Flask APIs to serve ML models','Deploying applications on cloud platforms','Creating a web front-end for AI applications','GitHub portfolio and professional documentation'] },
      { phase:'Phase 6', title:'Capstone AI Product', weeks:'Weeks 23 – 24', icon:'🏆',
        topics:['Identify a real-world problem and gather data','Build a complete AI solution from end to end','Write a mini research summary of findings','Present at DSA Code Champs Demo Day'] }
    ],
    projects:[
      { icon:'🗣️', title:'AI Sentiment Analyser', tag:'NLP',
        desc:'A full NLP pipeline classifying social media posts or product reviews as positive, negative, or neutral — deployed as a live web app with a clean dashboard.' },
      { icon:'🖼️', title:'Object Detection System', tag:'Computer Vision',
        desc:'A YOLO-powered real-time object detection system that identifies and labels objects in a live webcam or uploaded video stream.' },
      { icon:'📈', title:'Stock Price Predictor', tag:'Deep Learning',
        desc:'An LSTM-based deep learning model predicting stock price trends from historical financial data — with an interactive chart dashboard.' }
    ],
    skills:['Advanced Python','TensorFlow','Keras','Deep Learning','CNNs','RNNs & LSTMs','NLP','NLTK','OpenCV','YOLO','Flask','Cloud Deployment','GitHub','XGBoost','Feature Engineering','REST APIs'],
    forList:['Aged 15 to 17 years — Grade 10, 11, or 12','Has completed Code Innovators or has solid ML fundamentals','Aspiring to study Computer Science, AI, or Data Science in college','Interested in hackathons, research, or starting a tech venture','Serious about building a portfolio before college admissions'],
    outcomes:['Build and deploy 3+ complete AI applications end-to-end','Master Deep Learning, NLP, and Computer Vision at a working level','Set up a professional GitHub portfolio with documented projects','Write a mini research paper on a capstone AI project','Earn the Code Pioneers Certificate — the highest DSA school-level credential'],
    next:null, nextName:null, nextGrade:null
  }
};

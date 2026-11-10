/* ─────────────────────────────────────────────────────────
   DSA Student Projects — Data
   Edit here; then run  python tools/build.py  to regenerate projects.html
───────────────────────────────────────────────────────── */

const CAT = {
  cv:          { color:'#7a9fff', border:'rgba(122,159,255,.28)', bg:'rgba(122,159,255,.07)', label:'Computer Vision' },
  nlp:         { color:'#3ecfb2', border:'rgba(62,207,178,.28)',  bg:'rgba(62,207,178,.07)',  label:'NLP & Text' },
  health:      { color:'#e8a080', border:'rgba(232,160,128,.28)', bg:'rgba(232,160,128,.07)', label:'Healthcare' },
  analytics:   { color:'#c8a96e', border:'rgba(200,169,110,.28)', bg:'rgba(200,169,110,.07)', label:'Analytics' },
  recommender: { color:'#c792ea', border:'rgba(199,146,234,.28)', bg:'rgba(199,146,234,.07)', label:'Recommender Systems' },
  creative:    { color:'#ff79c6', border:'rgba(255,121,198,.28)', bg:'rgba(255,121,198,.07)', label:'Creative AI' },
};

const PROJECTS = [
  /* ── OCT – DEC 2023 ── */
  {
    title: 'Autonomous Driving Aid with Multilabel Image Classification',
    img: 'Website Images/Projects/Autonomous Driving Aid with Multilabel Image Classification.jpeg',
    period: 'Oct 2023 – Dec 2023', cohort: 'oct23', cat: 'cv',
    desc: 'Develops a machine learning-based Autonomous Driving Aid system using the CARLA open-source simulator. Employs advanced ML algorithms to interpret real-world scenarios and assist drivers in making critical decisions based on real-time data. The system augments driving capabilities using a versatile training and evaluation environment for autonomous vehicles.',
    guide: 'Ajay Mukund S', leader: 'Vishal V',
    members: ['Y Sai Akshitha', 'Anselm Barretto', 'Vinayak Ranjanagi']
  },
  {
    title: 'Movie Recommendation System',
    img: 'Website Images/Projects/Movie Recommendation System.jpeg',
    period: 'Oct 2023 – Dec 2023', cohort: 'oct23', cat: 'recommender',
    desc: 'An advanced recommendation engine using primarily content-based filtering, analysing viewing history, ratings, and genre choices. Dissects movie characteristics including genre, director, and actors to tailor recommendations. Fuelled by ML and AI, the system continuously evolves with real-time data and user interactions to remain relevant and responsive.',
    guide: 'Ajay Mukund S', leader: 'Patan Mohammed Aasif Khan',
    members: ['Pawan Sai Sunkara', 'Sanasam Birjit Singh']
  },
  /* ── SEP – NOV 2023 ── */
  {
    title: 'AI Virtual Mouse Using MediaPipe',
    img: 'Website Images/Projects/AI Virtual Mouse Using MediaPipe.jpeg',
    period: 'Sep 2023 – Nov 2023', cohort: 'sep23', cat: 'cv',
    desc: 'An AI-based virtual mouse system using a built-in camera to capture fingertip motions through computer vision. Hand gestures enable left/right clicks, scrolling, and cursor tasks — eliminating the need for a physical mouse. Beyond convenience, this method mitigates virus spread by minimising physical interaction with shared devices.',
    guide: 'Ajay Mukund S', leader: 'P V Monika',
    members: []
  },
  {
    title: 'Content Based Movie Recommender System',
    img: 'Website Images/Projects/Content Based Movie Recommender System.jpeg',
    period: 'Sep 2023 – Nov 2023', cohort: 'sep23', cat: 'recommender',
    desc: 'An evolution of collaborative filtering, focusing on content analysis rather than user evaluations. Constructs user and product profiles based on item interactions for direct user-product comparisons. Introduces an innovative approach to setting weights for features, enhancing the representativeness of movies in the recommendation process.',
    guide: 'Ajay Mukund S', leader: 'Aayushi Jayant Asole',
    members: []
  },
  {
    title: 'Drowsiness Detection Using Facial Landmarks',
    img: 'Website Images/Projects/Drowsiness Detection Using Facial Landmarks.jpeg',
    period: 'Sep 2023 – Nov 2023', cohort: 'sep23', cat: 'cv',
    desc: 'Detects drowsiness using neural networks trained on approximately 53,000 facial landmarks, categorised as alert, yawning, or mild sleep — then converted to binary non-drowsy/drowsy classification. Targets safety in critical activities like driving, with future plans for multi-face frames and real-time webcam tracking.',
    guide: 'Ajay Mukund S', leader: 'Aashik H',
    members: ['Arvind S']
  },
  {
    title: 'Iris Flower Species Identification',
    img: 'Website Images/Projects/Iris Flower Species Identification.jpeg',
    period: 'Sep 2023 – Nov 2023', cohort: 'sep23', cat: 'analytics',
    desc: 'Employs scikit-learn for semi-automated knowledge extraction to classify Iris flower species from petal and sepal measurements. Explores linear regression and k-nearest neighbours, examining their applications and drawing insights from recent developments in the field.',
    guide: 'Ajay Mukund S', leader: 'Subodh Yadav',
    members: []
  },
  {
    title: 'Wine Quality Prediction',
    img: 'Website Images/Projects/Wine Quality Prediction.jpeg',
    period: 'Sep 2023 – Nov 2023', cohort: 'sep23', cat: 'analytics',
    desc: 'Predicts wine quality from 12 parameters using Random Forest, Logistic Regression, and Decision Tree classifiers. Random Forest emerges with the highest accuracy rate among the tested algorithms, showcasing the potential of ML in wine quality assessment.',
    guide: 'Ajay Mukund S', leader: 'Diju Sharon',
    members: []
  },
  {
    title: 'Winning Price Prediction',
    img: 'Website Images/Projects/Winning Price Prediction (Book Pricing).jpeg',
    period: 'Sep 2023 – Nov 2023', cohort: 'sep23', cat: 'analytics',
    desc: 'Analyses book pricing and user ratings using TF-IDF, SVD, Linear Regression meta-features, and Random Forest Regressors with Min-Max scaling. Considers temporal and cultural dimensions — changing sentiments and regional preferences — for understanding the relationships between diverse features and literary success.',
    guide: 'Ajay Mukund S', leader: 'Shanmug Bhanu Prakash',
    members: ['H S Yashas']
  },
  /* ── JUL – SEP 2023 ── */
  {
    title: 'Clothing Sales Forecasting',
    img: 'Website Images/Projects/Clothing Sales Forecasting.jpeg',
    period: 'Jul 2023 – Sep 2023', cohort: 'jul23', cat: 'analytics',
    desc: 'A time series forecasting model for the fashion industry that decodes multifaceted fashion data and forecasts sales trends across successive years. Recognises the limitations of human analysis in this complex, seasonality-driven landscape and provides data-driven insights for informed business decisions.',
    guide: 'Ajay Mukund S', leader: 'Harshavardhini K',
    members: []
  },
  {
    title: 'Crop Protection — Animal Image Classification',
    img: 'Website Images/Projects/Crop Protection - Animal Image Classification.jpeg',
    period: 'Jul 2023 – Sep 2023', cohort: 'jul23', cat: 'cv',
    desc: 'Uses CNNs for precise animal classification in crop lands, then employs predator sounds to deter identified intruders. Dual-objective approach: safeguard farmers\' livelihoods and yields while ensuring wildlife protection — integrating state-of-the-art ML to harmonise agriculture and wildlife conservation.',
    guide: 'Ajay Mukund S', leader: 'Lokesh S',
    members: ['Thonda Abhishek']
  },
  {
    title: 'Crop Protection — Identification and Recommendation',
    img: 'Website Images/Projects/Crop Protection - Identification and Recommendation.jpeg',
    period: 'Jul 2023 – Sep 2023', cohort: 'jul23', cat: 'analytics',
    desc: 'Integrates ML algorithms (decision trees, random forests, gradient boosting) for personalised crop recommendations using historical agricultural data, soil type, climate, and economic viability. Adds real-time crop identification through image analysis using the ResNet-50 model in TensorFlow.',
    guide: 'Ajay Mukund S', leader: 'Deepak Kumar',
    members: ['Dhanaraj Panabaka']
  },
  {
    title: 'Emotion Recognition Using Images',
    img: 'Website Images/Projects/Emotion Recognition Using Images.jpeg',
    period: 'Jul 2023 – Sep 2023', cohort: 'jul23', cat: 'cv',
    desc: 'Develops a CNN and Deep Learning system to predict and classify facial emotions from images. Explores facial expression recognition (FER) systems with applications spanning healthcare to security — contributing to psychology, decision-making, and interpersonal communication technology.',
    guide: 'Ajay Mukund S', leader: 'Puranasree M S',
    members: ['Bharath S']
  },
  {
    title: 'Gait Analysis',
    img: 'Website Images/Projects/Gait Analysis (Parkinson\'s FOG Detection).jpeg',
    period: 'Jul 2023 – Sep 2023', cohort: 'jul23', cat: 'health',
    desc: 'Targets early detection of Parkinson\'s disease by identifying Freezing of Gait (FOG) symptoms. A comprehensive pipeline covering data preprocessing, feature extraction, model implementation, and hyperparameter optimisation compares Naive Bayes, CNN, Random Forest, GRU, XGBoost, and LightGBM classifiers.',
    guide: 'Ajay Mukund S', leader: 'Rohini Sangeetha',
    members: ['Dasari Anji', 'Vinay Bajaj']
  },
  {
    title: 'Image Captioning',
    img: 'Website Images/Projects/Image Captioning.jpeg',
    period: 'Jul 2023 – Sep 2023', cohort: 'jul23', cat: 'cv',
    desc: 'Combines VGG16 for image feature extraction with Transformer attention mechanisms for contextual NLP. Produces precise, contextually relevant textual descriptions across a diverse spectrum of images — a pioneering integration of CNN-based feature extraction and Transformer-based contextual comprehension.',
    guide: 'Ajay Mukund S', leader: 'Chaarulatha M',
    members: ['Dharani P', 'Palak Pathak']
  },
  {
    title: 'Neural Style Transfer',
    img: 'Website Images/Projects/Neural Style Transfer.jpeg',
    period: 'Jul 2023 – Sep 2023', cohort: 'jul23', cat: 'creative',
    desc: 'Compares five deep learning models — VGG-16, VGG-19, ResNet50, Image Arbitrary Stylization, and Inception — for Neural Style Transfer, merging image content with artistic styles. Extensive experimentation uncovers the unique strengths of each model in transforming images into visually striking artworks.',
    guide: 'Ajay Mukund S', leader: 'Samyuktha J',
    members: ['Nandhini M', 'Vicky Kumar Singh']
  },
  {
    title: 'Speaker Accent Recognition',
    img: 'Website Images/Projects/Speaker Accent Recognition.jpeg',
    period: 'Jul 2023 – Sep 2023', cohort: 'jul23', cat: 'nlp',
    desc: 'Employs feature engineering and ML algorithms to automatically detect speaker accents across three distinct classes on a publicly available dataset. Uses RandomizedSearchCV and GridSearchCV for hyperparameter tuning; Logistic Regression and SVM achieve competitive accuracies. Serves as a baseline study for speaker accent detection.',
    guide: 'Ajay Mukund S', leader: 'Basishali Paul',
    members: ['Savitha J', 'Subha Prasad Chandra']
  },
  {
    title: 'Visualizing Cricketing Data',
    img: 'Website Images/Projects/Visualizing Cricketing Data.jpeg',
    period: 'Jul 2023 – Sep 2023', cohort: 'jul23', cat: 'analytics',
    desc: 'A comprehensive visualisation platform for cricketing data — player performance, match results, and team rankings. Demonstrates how diverse visualisation techniques including graphs unlock insights from complex sports datasets, enabling enhanced analysis of the intricacies of cricket.',
    guide: 'Ajay Mukund S', leader: 'Shreya Prashant Jadhao',
    members: ['M Mounika', 'Ashish Bahuguna']
  },
  {
    title: 'Vocal Aura',
    img: 'Website Images/Projects/Vocal Aura.jpeg',
    period: 'Jul 2023 – Sep 2023', cohort: 'jul23', cat: 'creative',
    desc: 'Pioneers voice-singing fusion at the crossroads of vocal expression and AI, using deep learning inspired by the Sovits architecture. Integrates unique human voices with musical compositions, enabling authentic voices to become dynamic instruments in music creation — a new dimension of artistic expression.',
    guide: 'Ajay Mukund S', leader: 'Minu Sree K',
    members: ['Mohammad Hadi Rahman']
  },
  /* ── JUN – AUG 2023 ── */
  {
    title: 'Advanced Sentiment Analysis and Sarcasm Detection',
    img: 'Website Images/Projects/Advanced Sentiment Analysis and Sarcasm Detection.jpeg',
    period: 'Jun 2023 – Aug 2023', cohort: 'jun23', cat: 'nlp',
    desc: 'Combines advanced sentiment analysis with sarcasm detection to improve accuracy in classifying online customer reviews. Identifies sarcasm markers and contextual patterns such as juxtaposing positive and negative statements — enabling deeper, more genuine customer sentiment extraction for businesses.',
    guide: 'Ajay Mukund S', leader: 'Mohammed Noushir & Akshaya R',
    members: ['Kothimera Gowtham Raju', 'Kanduri Himabindu']
  },
  {
    title: 'Breast Cancer Prediction',
    img: 'Website Images/Projects/Breast Cancer Prediction.jpeg',
    period: 'Jun 2023 – Aug 2023', cohort: 'jun23', cat: 'health',
    desc: 'Investigates SVM, Random Forests, Naive Bayes, Logistic Regression, KNN, and Decision Tree classifiers for breast cancer detection. Demonstrates supervised learning\'s ability to differentiate benign from malignant tumours by analysing diverse data sources, boosting diagnostic precision for early treatment outcomes.',
    guide: 'Ajay Mukund S', leader: 'Srujana Siripurapu',
    members: ['Shashank A', 'Kesarla Venkata Sai Mounish']
  },
  {
    title: 'Cyberbullying Tweet Detection',
    img: 'Website Images/Projects/Cyberbullying Tweet Detection.jpeg',
    period: 'Jun 2023 – Aug 2023', cohort: 'jun23', cat: 'nlp',
    desc: 'Builds a pipeline using TF-IDF features and classification models (Logistic Regression, SVM) to identify and classify cyberbullying tweets. Post-hyperparameter-tuning results highlight competitive accuracies, with ensemble methods and deep learning suggested as future enhancements for safer online spaces.',
    guide: 'Ajay Mukund S', leader: 'Santhosh Prabhu V',
    members: ['Satyam Pradhan', 'Pamidi Venkatesh']
  },
  {
    title: 'Data Cleaning in the Perspective of ML',
    img: 'Website Images/Projects/Data Cleaning in the Perspective of ML.jpeg',
    period: 'Jun 2023 – Aug 2023', cohort: 'jun23', cat: 'analytics',
    desc: 'An automated EDA framework combining ExtraTreesClassifier and RandomForestRegressor with tasks like missing value handling, categorical encoding, and feature selection. Visualises feature importance via bar plots and compares classification vs. regression outcomes to establish a solid foundation for robust modelling.',
    guide: 'Ajay Mukund S', leader: 'Roshan Kumar V U',
    members: []
  },
  {
    title: 'Electric Vehicle (EV) Power Predictor',
    img: 'Website Images/Projects/Electric Vehicle Power Predictor.jpeg',
    period: 'Jun 2023 – Aug 2023', cohort: 'jun23', cat: 'analytics',
    desc: 'A predictive framework to estimate energy consumption during EV charging sessions using historical charging data, vehicle attributes, infrastructure details, and environmental conditions. Proactively prevents grid congestion — addressing energy management and sustainable transportation challenges in the growing EV sector.',
    guide: 'Ajay Mukund S', leader: 'Abhinav Krishna B',
    members: ['Shaik Wahid', 'Abhishek Sharma']
  },
  {
    title: 'Fake News Detection',
    img: 'Website Images/Projects/Fake News Detection.jpeg',
    period: 'Jun 2023 – Aug 2023', cohort: 'jun23', cat: 'nlp',
    desc: 'Uses the LIAR dataset with a gradient boosting classifier to detect fake news. Combines training, testing, and validation sets, consolidating six news categories into binary true/false classification. Preprocessing covers context, subject, and statement columns for effective misinformation detection.',
    guide: 'Ajay Mukund S', leader: 'Jagadeesh Padam & M V S Saranya',
    members: ['Shaik Shaheer', 'Prabu T']
  },
  {
    title: 'Health Support Chatbot',
    img: 'Website Images/Projects/Health Support Chatbot.jpeg',
    period: 'Jun 2023 – Aug 2023', cohort: 'jun23', cat: 'health',
    desc: 'A medical chatbot using Decision Tree to diagnose diseases and offer basic health information before consulting a doctor. Leverages ML and AI to lower healthcare costs and enhance accessibility, providing immediate and accurate disease predictions based on user-supplied symptoms in real time.',
    guide: 'Ajay Mukund S', leader: 'S Bala Pavan Kumar',
    members: ['Sachidanandham', 'Hemavathi']
  },
  {
    title: 'SmartMCQ using Generative AI',
    img: 'Website Images/Projects/SmartMCQ using Generative AI.jpeg',
    period: 'Jun 2023 – Aug 2023', cohort: 'jun23', cat: 'creative',
    desc: 'An AI-powered MCQ generation system for NEET exam preparation using XLNet for paragraph summarisation, the PKE library for keyword extraction, NLTK tokenisation, and WordNet/ConceptNet for distractor generation. Targets focused self-evaluation aligned with the distinctive patterns of NEET-style questions.',
    guide: 'Ajay Mukund S', leader: 'Renuka S',
    members: ['Sindhe Sai Sunith', 'Samphel Bodh']
  },
  {
    title: 'Speech Emotion Recognition',
    img: 'Website Images/Projects/Speech Emotion Recognition.jpeg',
    period: 'Jun 2023 – Aug 2023', cohort: 'jun23', cat: 'creative',
    desc: 'Accurately interprets emotions from speech by integrating deep learning with advanced feature extraction techniques. Holds significance across mental health, HCI, and entertainment — addressing challenges and envisioning empathetic AI systems that understand emotional nuances in speech for a deeper human-computer connection.',
    guide: 'Ajay Mukund S', leader: 'Safia Shaik',
    members: ['M Anusha', 'Shreya S']
  },
  {
    title: 'Water Quality Prediction',
    img: 'Website Images/Projects/Water Quality Prediction.jpeg',
    period: 'Jun 2023 – Aug 2023', cohort: 'jun23', cat: 'health',
    desc: 'Develops ML models to predict water potability from parameters like pH, chlorides, and conductivity. Evaluates model performance using accuracy, precision, and F1 score with GridSearchCV-based hyperparameter tuning, demonstrating improved accuracy that can be integrated into real-time water management systems.',
    guide: 'Ajay Mukund S', leader: 'M V S Sowjanya',
    members: ['Emme Rohith', 'Vineet Kumar Tiwari']
  },
  /* ── MAY – JUL 2023 ── */
  {
    title: 'Credit Card Fraud Detection and Credit Scoring Prediction',
    img: 'Website Images/Projects/Credit Card Fraud Detection.jpeg',
    period: 'May 2023 – Jul 2023', cohort: 'may23', cat: 'analytics',
    desc: 'A comparative analysis of Random Forest, Decision Tree, and Logistic Regression for credit card fraud detection. Examines interpretability, scalability, and performance of each technique, alongside an overview of credit scoring and its significance in enabling informed creditworthiness decisions.',
    guide: 'Ajay Mukund S', leader: 'Karanam Vyshnavi',
    members: ['Gubiligari Sireesha', 'Sai Kiran Pulla']
  },
  {
    title: 'Customer Segmentation and Market Basket Analysis',
    img: 'Website Images/Projects/Customer Segmentation and Market Basket Analysis.jpeg',
    period: 'May 2023 – Jul 2023', cohort: 'may23', cat: 'analytics',
    desc: 'Uses clustering algorithms and association rule mining to group customers by purchasing patterns and identify product associations. Aims to personalise marketing efforts, enhance customer engagement, and improve loyalty — with regular monitoring and adaptation to stay competitive and meet evolving customer requirements.',
    guide: 'Ajay Mukund S', leader: 'Jonathan Nathaniel',
    members: ['Sanjana Boddu', 'Vardhini Valluru']
  },
  {
    title: 'Emotion Detection',
    img: 'Website Images/Projects/Emotion Detection (Twitter NLP).jpeg',
    period: 'May 2023 – Jul 2023', cohort: 'may23', cat: 'nlp',
    desc: 'Applies Logistic Regression and Naive Bayes classifiers with TF-IDF vectorisation to categorise Twitter data as positive, negative, or neutral. Evaluates model effectiveness using accuracy, precision, recall, and F1-score, showing both classifiers are effective for sentiment analysis on social media data.',
    guide: 'Ajay Mukund S', leader: '',
    members: ['Munireddygari Sai Soumya Reddy', 'Yajjavarapu Ramya', 'Vuttaradi Vyshnavi']
  },
  {
    title: 'Face Recognition Attendance System with Anti-Spoofing',
    img: 'Website Images/Projects/Face Recognition Attendance System with Anti-Spoofing.jpeg',
    period: 'May 2023 – Jul 2023', cohort: 'may23', cat: 'cv',
    desc: 'Automates attendance using OpenCV-based face identification (Haarcascade classifier) and recognition (LBPH algorithm), with an anti-spoofing model to detect photo or video call attempts. Attendance is automatically recorded in an Excel sheet, updated each time a student is recognised.',
    guide: 'Ajay Mukund S', leader: 'Priya R',
    members: ['Jalakuru Ruthik', 'K Suresh', 'Komaragunta Pooja Sree']
  },
  {
    title: 'Fingerprint Matching',
    img: 'Website Images/Projects/Fingerprint Matching.jpeg',
    period: 'May 2023 – Jul 2023', cohort: 'may23', cat: 'cv',
    desc: 'Creates an ML-based fingerprint matching system using minutiae point extraction. ML algorithms overcome limitations of traditional methods by learning patterns directly from data, enabling accurate fingerprint identification and verification even with challenging or noisy prints.',
    guide: 'Ajay Mukund S', leader: 'Praiselin P',
    members: ['Shaik Shahid']
  },
  {
    title: 'Hate Speech Detection',
    img: 'Website Images/Projects/Hate Speech Detection.jpeg',
    period: 'May 2023 – Jul 2023', cohort: 'may23', cat: 'nlp',
    desc: 'Employs feature engineering and ML algorithms for three-class hate speech detection on social media. Bigram features combined with the Decision Tree classifier achieve the highest accuracy of 89%, serving as a baseline study and reference for future automated text classification research.',
    guide: 'Ajay Mukund S', leader: 'A Akhila Reddy',
    members: []
  },
  {
    title: 'Healthcare Project — Disease Prediction',
    img: 'Website Images/Projects/Healthcare Project - Disease Prediction.jpeg',
    period: 'May 2023 – Jul 2023', cohort: 'may23', cat: 'health',
    desc: 'A Disease Prediction system using Logistic Regression, Naive Bayes, Decision Tree, KNN, and Random Forest to predict heart disease, kidney disease, and diabetes from symptoms, age, and gender. Acts as an early diagnostic tool, providing timely treatment recommendations and potentially saving lives.',
    guide: 'Ajay Mukund S', leader: 'Kartik Gupta',
    members: ['Bhogeswar Pathakamudi', 'T R Chandana']
  },
  {
    title: 'Mental Health Therapist Chatbot',
    img: 'Website Images/Projects/Mental Health Therapist Chatbot.jpeg',
    period: 'May 2023 – Jul 2023', cohort: 'may23', cat: 'health',
    desc: 'A chatbot mimicking human counsellor-patient conversations, enhanced by ML for contextual understanding and appropriate responses. Incorporates speech recognition and synthesis to support individuals with hearing impairments, improving mental health service accessibility for those facing financial difficulties.',
    guide: 'Ajay Mukund S', leader: 'Shikshesh Ankush Kulsange',
    members: ['Anipeddi Lokesh', 'Gaddam Sai Krishna', 'K Geethanjali', 'Kanakala Bhoomika']
  },
  {
    title: 'Music Recommender System',
    img: 'Website Images/Projects/Music Recommender System.jpeg',
    period: 'May 2023 – Jul 2023', cohort: 'may23', cat: 'recommender',
    desc: 'A systematic literature review of music recommendation systems that integrate emotions and contextual information. Analysed 64 publications and identified that considering user activity, feedback, cognitive load, and preference leads to improved satisfaction. Discusses challenges and limitations of emotion/context-based implementations.',
    guide: 'Ajay Mukund S', leader: 'J Harshith Sai',
    members: ['Abburi Venkata Sai Mahendra', 'Pulasa Sai Rakshith', 'Yagnesh Guduru']
  },
  {
    title: 'Rocks and Mines Prediction',
    img: 'Website Images/Projects/Rocks and Mines Prediction.jpeg',
    period: 'May 2023 – Jul 2023', cohort: 'may23', cat: 'analytics',
    desc: 'Uses sonar data with neural networks, SVMs, and random forests for rock and mine detection across various environments. High accuracies and reduced false detections improve safety and efficiency in defense, mining, and infrastructure development — evaluated using accuracy, precision, and recall.',
    guide: 'Ajay Mukund S', leader: 'Sara Rovena S',
    members: ['Eswar E', 'Douglas James', 'Saravana Pandian K']
  },
  {
    title: 'Weather Forecasting',
    img: 'Website Images/Projects/Weather Forecasting.jpeg',
    period: 'May 2023 – Jul 2023', cohort: 'may23', cat: 'analytics',
    desc: 'Compares Lasso and Ridge regression algorithms, then evaluates Random Forest, XGBoost, and LSTM for rainfall prediction from historical weather data. Hyperparameter tuning improves predictive accuracy and generalisation, contributing to advanced rainfall prediction for sectors relying on precise weather forecasts.',
    guide: 'Ajay Mukund S', leader: 'Divya Chougule',
    members: ['Garapati Supriya', 'Jekkineni Sai Sree', 'Shaik Shahul']
  }
];

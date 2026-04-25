const DSA_COURSES = {

  /* ══════════════ FOUNDATION ══════════════ */

  'python': {
    id: 'python',
    title: 'Python Programming',
    category: 'Foundation',
    level: 'Beginner',
    levelClass: 'lb',
    icon: '🐍',
    iconClass: 'ipy',
    duration: '8 weeks',
    hours: '40 contact hours',
    tools: ['Python 3.x', 'Jupyter Notebook', 'NumPy', 'Pandas', 'Matplotlib', 'VS Code'],
    prereqs: 'No prior programming experience required. Basic computer literacy is sufficient.',
    overview: 'A comprehensive introduction to Python programming designed for absolute beginners. You will build a strong foundation in Python syntax, data structures, and the scientific ecosystem — everything you need to move confidently into Data Science and Machine Learning.',
    outcomes: [
      'Write clean, readable Python programs from scratch',
      'Work with all core Python data structures confidently',
      'Apply Object-Oriented Programming principles',
      'Handle files, exceptions, and external libraries',
      'Manipulate data using NumPy and Pandas',
      'Create basic data visualisations with Matplotlib'
    ],
    modules: [
      { week: 1, title: 'Python Fundamentals', topics: ['Installing Python and setting up VS Code / Jupyter', 'Variables, data types (int, float, str, bool)', 'Arithmetic, comparison and logical operators', 'String methods and f-string formatting', 'User input and print formatting', 'Type casting and basic I/O programs'], resources: [{ title: 'Python Official Tutorial', url: 'https://docs.python.org/3/tutorial/index.html', type: 'docs' }, { title: 'Real Python: Getting Started', url: 'https://realpython.com/python-first-steps/', type: 'tutorial' }, { title: 'Kaggle: Python Course (Free)', url: 'https://www.kaggle.com/learn/python', type: 'course' }, { title: 'VS Code Python Setup', url: 'https://code.visualstudio.com/docs/python/python-tutorial', type: 'docs' }] },
      { week: 2, title: 'Control Flow', topics: ['if, elif and else statements', 'for loops and while loops', 'break, continue and pass keywords', 'Nested loops and loop patterns', 'List comprehensions and generator expressions', 'Practice: number patterns and simple games'], resources: [{ title: 'Python Docs: Control Flow', url: 'https://docs.python.org/3/tutorial/controlflow.html', type: 'docs' }, { title: 'Real Python: Conditional Statements', url: 'https://realpython.com/python-conditional-statements/', type: 'tutorial' }, { title: 'Real Python: For Loops', url: 'https://realpython.com/python-for-loop/', type: 'tutorial' }, { title: 'Real Python: List Comprehensions', url: 'https://realpython.com/list-comprehension-python/', type: 'tutorial' }] },
      { week: 3, title: 'Functions & Modules', topics: ['Defining and calling functions', 'Positional, keyword, *args and **kwargs', 'Default parameter values and return statements', 'Lambda functions and higher-order functions (map, filter)', 'Scope: local vs global variables', 'Importing and using built-in modules (math, random, datetime)'], resources: [{ title: 'Python Docs: Defining Functions', url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions', type: 'docs' }, { title: 'Real Python: Functions', url: 'https://realpython.com/defining-your-own-python-function/', type: 'tutorial' }, { title: 'Real Python: Lambda Functions', url: 'https://realpython.com/python-lambda/', type: 'tutorial' }, { title: 'Python Docs: Modules', url: 'https://docs.python.org/3/tutorial/modules.html', type: 'docs' }] },
      { week: 4, title: 'Data Structures', topics: ['Lists — indexing, slicing, methods', 'Tuples — immutability and packing/unpacking', 'Dictionaries — CRUD operations, nested dicts', 'Sets — union, intersection, difference', 'Choosing the right data structure', 'Mini-project: student grade tracker'], resources: [{ title: 'Python Docs: Data Structures', url: 'https://docs.python.org/3/tutorial/datastructures.html', type: 'docs' }, { title: 'Real Python: Lists & Tuples', url: 'https://realpython.com/python-lists-tuples/', type: 'tutorial' }, { title: 'Real Python: Dictionaries', url: 'https://realpython.com/python-dicts/', type: 'tutorial' }, { title: 'Real Python: Sets', url: 'https://realpython.com/python-sets/', type: 'tutorial' }] },
      { week: 5, title: 'Object-Oriented Programming', topics: ['Classes and objects — attributes and methods', 'The __init__ constructor and self', 'Inheritance and method overriding', 'Encapsulation and name mangling', 'Polymorphism and duck typing', 'Practice: building a library management system'], resources: [{ title: 'Python Docs: Classes', url: 'https://docs.python.org/3/tutorial/classes.html', type: 'docs' }, { title: 'Real Python: OOP in Python 3', url: 'https://realpython.com/python3-object-oriented-programming/', type: 'tutorial' }, { title: 'Real Python: Inheritance & Composition', url: 'https://realpython.com/inheritance-composition-python/', type: 'tutorial' }, { title: 'Real Python: Python Classes', url: 'https://realpython.com/python-classes/', type: 'tutorial' }] },
      { week: 6, title: 'File Handling & Exception Handling', topics: ['Reading and writing text files (open, read, write, append)', 'Working with CSV files using the csv module', 'Parsing JSON data with the json module', 'try, except, finally and raise', 'Custom exception classes', 'Context managers with the with statement'], resources: [{ title: 'Python Docs: Input & Output', url: 'https://docs.python.org/3/tutorial/inputoutput.html', type: 'docs' }, { title: 'Real Python: File I/O', url: 'https://realpython.com/read-write-files-python/', type: 'tutorial' }, { title: 'Real Python: Python Exceptions', url: 'https://realpython.com/python-exceptions/', type: 'tutorial' }, { title: 'Real Python: The with Statement', url: 'https://realpython.com/python-with-statement/', type: 'tutorial' }] },
      { week: 7, title: 'Scientific Python — NumPy & Pandas', topics: ['NumPy arrays — creation, indexing, slicing', 'Array operations, broadcasting and vectorisation', 'Pandas Series and DataFrames', 'Loading data from CSV and Excel', 'Data selection: loc, iloc, boolean indexing', 'Aggregation: groupby, pivot_table, describe'], resources: [{ title: 'NumPy Quickstart Tutorial', url: 'https://numpy.org/doc/stable/user/quickstart.html', type: 'docs' }, { title: 'Pandas Getting Started Tutorials', url: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html', type: 'docs' }, { title: 'CS231n: NumPy Tutorial', url: 'https://cs231n.github.io/python-numpy-tutorial/', type: 'tutorial' }, { title: 'Kaggle: Pandas (Free)', url: 'https://www.kaggle.com/learn/pandas', type: 'course' }] },
      { week: 8, title: 'Capstone Project & Matplotlib Basics', topics: ['Introduction to Matplotlib — line, bar and scatter plots', 'Plot customisation — labels, titles, legends, colour', 'Exploratory Data Analysis (EDA) workflow', 'Capstone: end-to-end data pipeline — load, clean, analyse and visualise a real-world dataset', 'Code review and best practices', 'Next steps: roadmap into Machine Learning'], resources: [{ title: 'Matplotlib Tutorials', url: 'https://matplotlib.org/stable/tutorials/index.html', type: 'docs' }, { title: 'Real Python: Matplotlib Guide', url: 'https://realpython.com/python-matplotlib-guide/', type: 'tutorial' }, { title: 'Seaborn Tutorial', url: 'https://seaborn.pydata.org/tutorial.html', type: 'docs' }, { title: 'Kaggle: Data Visualisation (Free)', url: 'https://www.kaggle.com/learn/data-visualization', type: 'course' }] }
    ]
  },

  'sql': {
    id: 'sql',
    title: 'SQL for Data Science',
    category: 'Foundation',
    level: 'Beginner',
    levelClass: 'lb',
    icon: '🗄️',
    iconClass: 'isql',
    duration: '5 weeks',
    hours: '25 contact hours',
    tools: ['PostgreSQL', 'MySQL', 'SQLite', 'DBeaver', 'Python (psycopg2)', 'Google BigQuery (intro)'],
    prereqs: 'No programming experience needed. Basic understanding of spreadsheets is helpful.',
    overview: 'SQL remains the most sought-after skill in data roles. This course takes you from zero to writing production-grade SQL — covering everything from basic SELECT statements to advanced window functions and query optimisation used by data engineers and analysts at top companies.',
    outcomes: [
      'Write complex multi-table queries with confidence',
      'Use aggregate functions and GROUP BY for business reporting',
      'Master all JOIN types and when to use each',
      'Write CTEs and subqueries for readable, maintainable SQL',
      'Apply window functions for advanced analytics',
      'Optimise slow queries using indexes and EXPLAIN plans'
    ],
    modules: [
      { week: 1, title: 'Database Fundamentals & Basic Queries', topics: ['What is a relational database? Tables, rows and columns', 'Installing PostgreSQL and connecting via DBeaver', 'SELECT, FROM and the query execution order', 'WHERE clause — filtering with comparison and logical operators', 'ORDER BY, LIMIT and OFFSET', 'Working with NULL values — IS NULL, COALESCE, NULLIF'], resources: [{ title: 'PostgreSQL Official Tutorial', url: 'https://www.postgresql.org/docs/current/tutorial.html', type: 'docs' }, { title: 'SQLZoo: Interactive SQL Tutorial', url: 'https://sqlzoo.net/wiki/SQL_Tutorial', type: 'tutorial' }, { title: 'Mode Analytics: SQL Tutorial', url: 'https://mode.com/sql-tutorial/', type: 'tutorial' }, { title: 'W3Schools: SQL', url: 'https://www.w3schools.com/sql/', type: 'tutorial' }] },
      { week: 2, title: 'Aggregations & Grouping', topics: ['Aggregate functions: COUNT, SUM, AVG, MIN, MAX', 'GROUP BY — grouping rows and computing summaries', 'HAVING clause — filtering aggregated results', 'DISTINCT — removing duplicates', 'Rounding, casting and data type conversions', 'Practice: business KPI reporting queries'], resources: [{ title: 'PostgreSQL: Aggregate Functions', url: 'https://www.postgresql.org/docs/current/functions-aggregate.html', type: 'docs' }, { title: 'Mode: Aggregate Functions', url: 'https://mode.com/sql-tutorial/sql-aggregate-functions/', type: 'tutorial' }, { title: 'SQLZoo: SUM and COUNT', url: 'https://sqlzoo.net/wiki/SUM_and_COUNT', type: 'tutorial' }, { title: 'Mode: GROUP BY', url: 'https://mode.com/sql-tutorial/sql-group-by/', type: 'tutorial' }] },
      { week: 3, title: 'Joins — Combining Tables', topics: ['Primary keys, foreign keys and referential integrity', 'INNER JOIN — matching rows in both tables', 'LEFT and RIGHT OUTER JOINs', 'FULL OUTER JOIN and CROSS JOIN', 'Self joins — joining a table to itself', 'Multi-table joins and joining on multiple conditions'], resources: [{ title: 'PostgreSQL: Table Expressions', url: 'https://www.postgresql.org/docs/current/queries-table-expressions.html', type: 'docs' }, { title: 'Mode: SQL JOINs', url: 'https://mode.com/sql-tutorial/sql-joins/', type: 'tutorial' }, { title: 'SQLZoo: The JOIN Operation', url: 'https://sqlzoo.net/wiki/The_JOIN_operation', type: 'tutorial' }, { title: 'Visual Representation of SQL Joins', url: 'https://www.codeproject.com/Articles/33052/Visual-Representation-of-SQL-Joins', type: 'tutorial' }] },
      { week: 4, title: 'Subqueries, CTEs & Window Functions', topics: ['Scalar, row and table subqueries', 'Correlated subqueries and when to use them', 'Common Table Expressions (CTEs) with WITH clause', 'Recursive CTEs for hierarchical data', 'Window functions: ROW_NUMBER, RANK, DENSE_RANK', 'LAG, LEAD, FIRST_VALUE, LAST_VALUE, running totals'], resources: [{ title: 'PostgreSQL: Window Functions Tutorial', url: 'https://www.postgresql.org/docs/current/tutorial-window.html', type: 'docs' }, { title: 'PostgreSQL: WITH Queries (CTEs)', url: 'https://www.postgresql.org/docs/current/queries-with.html', type: 'docs' }, { title: 'Mode: Window Functions', url: 'https://mode.com/sql-tutorial/sql-window-functions/', type: 'tutorial' }, { title: 'PostgreSQL: Window Function Calls', url: 'https://www.postgresql.org/docs/current/sql-expressions.html#SYNTAX-WINDOW-FUNCTIONS', type: 'docs' }] },
      { week: 5, title: 'Query Optimisation & Capstone', topics: ['Indexes — B-tree, hash; when and how to create them', 'EXPLAIN and EXPLAIN ANALYSE — reading query plans', 'Query rewriting techniques for performance', 'Views and materialised views', 'SQL from Python using psycopg2 and SQLAlchemy', 'Capstone: end-to-end analytics report on a real e-commerce dataset'], resources: [{ title: 'PostgreSQL: Using EXPLAIN', url: 'https://www.postgresql.org/docs/current/using-explain.html', type: 'docs' }, { title: 'Use The Index, Luke!', url: 'https://use-the-index-luke.com/', type: 'tutorial' }, { title: 'SQLAlchemy Documentation', url: 'https://docs.sqlalchemy.org/', type: 'docs' }, { title: 'Mode: Query Performance', url: 'https://mode.com/sql-tutorial/sql-performance-tuning/', type: 'tutorial' }] }
    ]
  },

  'r-programming': {
    id: 'r-programming',
    title: 'R Programming',
    category: 'Foundation',
    level: 'Beginner',
    levelClass: 'lb',
    icon: '📐',
    iconClass: 'ir',
    duration: '6 weeks',
    hours: '30 contact hours',
    tools: ['R 4.x', 'RStudio', 'tidyverse', 'ggplot2', 'dplyr', 'tidyr', 'R Markdown'],
    prereqs: 'No prior experience required. Familiarity with basic statistics (mean, median, standard deviation) is helpful but not mandatory.',
    overview: 'R is the language of statisticians, academic researchers and data analysts. This course covers the R ecosystem end to end — from data wrangling with the tidyverse to publication-ready visualisations with ggplot2 and reproducible research reports with R Markdown.',
    outcomes: [
      'Write fluent R code using the tidyverse paradigm',
      'Import, clean and reshape data with dplyr and tidyr',
      'Create publication-quality charts with ggplot2',
      'Perform statistical analyses and interpret results',
      'Build reproducible research reports with R Markdown',
      'Understand when to use R vs Python for data tasks'
    ],
    modules: [
      { week: 1, title: 'R Basics & RStudio', topics: ['Installing R and RStudio IDE tour', 'R as a calculator — arithmetic and logical operations', 'Vectors — creation, indexing and vectorised operations', 'Factors — ordered and unordered categorical data', 'Data types: numeric, integer, character, logical, complex', 'Getting help: ?, help() and reading documentation'], resources: [{ title: 'R for Data Science (2e) — Free Online', url: 'https://r4ds.hadley.nz/', type: 'book' }, { title: 'An Introduction to R (CRAN)', url: 'https://cran.r-project.org/doc/manuals/R-intro.html', type: 'docs' }, { title: 'Swirl: Learn R in R', url: 'https://swirlstats.com/', type: 'course' }, { title: 'RStudio IDE Cheat Sheet', url: 'https://rstudio.github.io/cheatsheets/html/rstudio-ide.html', type: 'docs' }] },
      { week: 2, title: 'R Data Structures', topics: ['Matrices — creation, row/column operations', 'Lists — heterogeneous containers, nested structures', 'Data frames — the core tabular structure in R', 'Tibbles — modern data frames from the tibble package', 'Importing data: read.csv, read_csv, readxl, readRDS', 'Inspecting data: str, summary, head, tail, dim'], resources: [{ title: 'Advanced R: Vectors (Free Online)', url: 'https://adv-r.hadley.nz/vectors-chap.html', type: 'book' }, { title: 'Tibble Package Docs', url: 'https://tibble.tidyverse.org/', type: 'docs' }, { title: 'R4DS: Data Import', url: 'https://r4ds.hadley.nz/data-import.html', type: 'tutorial' }, { title: 'readxl Package', url: 'https://readxl.tidyverse.org/', type: 'docs' }] },
      { week: 3, title: 'Data Wrangling with dplyr & tidyr', topics: ['The pipe operator — %>% and |>', 'filter() — selecting rows by condition', 'select(), rename() and relocate() — column management', 'mutate() — creating and transforming columns', 'group_by() and summarise() — aggregation workflows', 'pivot_longer() and pivot_wider() — reshaping data; join functions'], resources: [{ title: 'dplyr Documentation', url: 'https://dplyr.tidyverse.org/', type: 'docs' }, { title: 'tidyr Documentation', url: 'https://tidyr.tidyverse.org/', type: 'docs' }, { title: 'R4DS: Data Transformation', url: 'https://r4ds.hadley.nz/data-transform.html', type: 'tutorial' }, { title: 'dplyr Cheat Sheet', url: 'https://rstudio.github.io/cheatsheets/html/data-transformation.html', type: 'docs' }] },
      { week: 4, title: 'Data Visualisation with ggplot2', topics: ['The grammar of graphics — data, aesthetics, geoms', 'geom_point, geom_line, geom_bar, geom_histogram, geom_boxplot', 'Colour, size, shape and alpha aesthetics', 'Faceting — facet_wrap() and facet_grid()', 'Themes — theme_minimal, theme_classic and custom themes', 'Saving plots with ggsave; publication-ready charts'], resources: [{ title: 'ggplot2 Documentation', url: 'https://ggplot2.tidyverse.org/', type: 'docs' }, { title: 'R4DS: Data Visualisation', url: 'https://r4ds.hadley.nz/data-visualize.html', type: 'tutorial' }, { title: 'R Graphics Cookbook (Free Online)', url: 'https://r-graphics.org/', type: 'book' }, { title: 'ggplot2: Elegant Graphics (Free Online)', url: 'https://ggplot2-book.org/', type: 'book' }] },
      { week: 5, title: 'Statistical Analysis in R', topics: ['Descriptive statistics — mean, median, variance, IQR', 'Probability distributions — dnorm, pnorm, qnorm, rnorm', 'Hypothesis testing — t-test, chi-squared, ANOVA', 'Correlation — Pearson, Spearman, correlation matrices', 'Simple and multiple linear regression — lm(), summary()', 'Interpreting p-values, R-squared and residual diagnostics'], resources: [{ title: 'ISLR: Intro to Statistical Learning (Free PDF)', url: 'https://www.statlearning.com/', type: 'book' }, { title: 'Quick-R: Statistical Tests', url: 'https://www.statmethods.net/stats/index.html', type: 'tutorial' }, { title: 'R4DS: Model Basics', url: 'https://r4ds.hadley.nz/model-intro.html', type: 'tutorial' }, { title: 'CRAN Task View: Statistics', url: 'https://cran.r-project.org/web/views/Statistics.html', type: 'docs' }] },
      { week: 6, title: 'R Markdown & Capstone', topics: ['R Markdown syntax — chunks, inline code, YAML header', 'Rendering to HTML, PDF and Word', 'Creating parameterised reports', 'Introduction to Shiny — reactive UI and server logic', 'Capstone: EDA + statistical report on a real public dataset', 'Publishing to RPubs; next steps in R for ML with caret/tidymodels'], resources: [{ title: 'R Markdown Official Site', url: 'https://rmarkdown.rstudio.com/', type: 'docs' }, { title: 'R Markdown: The Definitive Guide (Free Online)', url: 'https://bookdown.org/yihui/rmarkdown/', type: 'book' }, { title: 'Mastering Shiny (Free Online)', url: 'https://mastering-shiny.org/', type: 'book' }, { title: 'Tidymodels', url: 'https://www.tidymodels.org/', type: 'docs' }] }
    ]
  },

  /* ══════════════ CORE ML ══════════════ */

  'machine-learning': {
    id: 'machine-learning',
    title: 'Machine Learning',
    category: 'Core ML',
    level: 'Intermediate',
    levelClass: 'li',
    icon: '🧠',
    iconClass: 'iml',
    duration: '10 weeks',
    hours: '50 contact hours',
    tools: ['Python', 'Scikit-learn', 'XGBoost', 'LightGBM', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    prereqs: 'Python Programming (or equivalent). Basic knowledge of statistics and linear algebra recommended.',
    overview: 'The cornerstone of modern AI. This course covers the full spectrum of Machine Learning — from classical algorithms to state-of-the-art ensemble methods — applied to real-world datasets with industry-standard tools. You will understand not just how algorithms work, but when and why to use each one.',
    outcomes: [
      'Implement and evaluate supervised and unsupervised ML models',
      'Apply ensemble methods (Random Forest, XGBoost) on real datasets',
      'Build end-to-end Scikit-learn ML pipelines',
      'Select the right algorithm for a given problem',
      'Diagnose overfitting and underfitting systematically',
      'Optimise hyperparameters using cross-validation strategies'
    ],
    modules: [
      { week: 1, title: 'ML Foundations', topics: ['What is Machine Learning? Types: supervised, unsupervised, semi-supervised, RL', 'The ML workflow: problem framing → data → model → evaluation → deployment', 'Train/validation/test split — why and how', 'Bias-variance tradeoff — the fundamental tension', 'Overfitting, underfitting and the generalisation gap', 'Introduction to Scikit-learn API: fit, predict, score'] },
      { week: 2, title: 'Linear Models', topics: ['Linear regression — OLS, assumptions, coefficients', 'Evaluating regression: MAE, MSE, RMSE, R²', 'Logistic regression — sigmoid function, decision boundary', 'Evaluating classification: accuracy, precision, recall, F1', 'L1 (Lasso) and L2 (Ridge) regularisation — intuition and effect', 'ElasticNet — combining L1 and L2'] },
      { week: 3, title: 'Decision Trees & Random Forests', topics: ['Decision tree construction — Gini impurity and information gain', 'Tree hyperparameters: max_depth, min_samples_split, min_samples_leaf', 'Overfitting in trees and pruning strategies', 'Bagging — bootstrap aggregating', 'Random Forest — how randomness improves performance', 'Feature importance from tree-based models'] },
      { week: 4, title: 'Boosting Algorithms', topics: ['AdaBoost — adaptive weighting of weak learners', 'Gradient Boosting Machines — stage-wise additive modelling', 'XGBoost — regularised gradient boosting, column subsampling', 'LightGBM — histogram-based, leaf-wise growth, GOSS', 'CatBoost — handling categorical features natively', 'Tuning boosting models: n_estimators, learning_rate, max_depth, subsample'] },
      { week: 5, title: 'Support Vector Machines & K-NN', topics: ['SVM intuition — maximum margin hyperplane', 'Support vectors, soft margin and the C parameter', 'Kernel trick — RBF, polynomial and sigmoid kernels', 'SVR — support vector regression', 'K-Nearest Neighbours — distance metrics, the curse of dimensionality', 'Choosing K: elbow method and cross-validation'] },
      { week: 6, title: 'Clustering — Unsupervised Learning', topics: ['K-Means — algorithm, inertia, elbow method, k-means++', 'Hierarchical clustering — linkage methods, dendrograms', 'DBSCAN — density-based, noise handling, epsilon and min_samples', 'Gaussian Mixture Models — soft assignments, EM algorithm', 'Cluster evaluation: silhouette score, Davies-Bouldin index', 'Real-world applications: customer segmentation, anomaly detection'] },
      { week: 7, title: 'Dimensionality Reduction', topics: ['Why dimensionality reduction? Curse of dimensionality revisited', 'Principal Component Analysis (PCA) — eigenvectors, explained variance', 'Kernel PCA for non-linear data', 't-SNE — intuition and visualisation', 'UMAP — faster, topology-preserving alternative to t-SNE', 'Feature selection: variance threshold, univariate tests, RFE'] },
      { week: 8, title: 'Model Evaluation & Selection', topics: ['Stratified K-Fold and Leave-One-Out cross-validation', 'ROC curve and AUC-ROC — threshold-independent evaluation', 'Precision-Recall curve — for imbalanced datasets', 'Confusion matrix — TP, TN, FP, FN deep dive', 'Handling class imbalance: SMOTE, class_weight, threshold tuning', 'Comparing models statistically — paired t-tests'] },
      { week: 9, title: 'Scikit-learn Pipelines & Preprocessing', topics: ['ColumnTransformer — applying different transforms to different columns', 'SimpleImputer and KNNImputer for missing values', 'StandardScaler, MinMaxScaler, RobustScaler', 'OneHotEncoder and OrdinalEncoder', 'Building a full Pipeline — preprocessing + model in one object', 'Saving and loading models with joblib/pickle'] },
      { week: 10, title: 'Capstone Project', topics: ['End-to-end ML project on a real-world dataset (Kaggle-style)', 'Problem framing and stakeholder requirements', 'EDA, feature engineering and pipeline construction', 'Model selection, tuning and final evaluation', 'Presenting results: model card and business impact summary', 'Code review, clean code standards and submission'] }
    ]
  },

  'nlp': {
    id: 'nlp',
    title: 'Natural Language Processing',
    category: 'Core ML',
    level: 'Intermediate',
    levelClass: 'li',
    icon: '💬',
    iconClass: 'inlp',
    duration: '8 weeks',
    hours: '40 contact hours',
    tools: ['Python', 'NLTK', 'spaCy', 'HuggingFace Transformers', 'Gensim', 'Scikit-learn', 'Pandas'],
    prereqs: 'Machine Learning course or equivalent. Python Programming is essential.',
    overview: 'Natural Language Processing bridges human communication and machine intelligence. This course covers the complete NLP pipeline — from raw text cleaning to deploying fine-tuned Transformer models — giving you the skills to build chatbots, sentiment analysers, search engines and document intelligence systems.',
    outcomes: [
      'Build a complete NLP preprocessing pipeline from scratch',
      'Implement and compare text vectorisation techniques',
      'Train word embedding models and use pre-trained embeddings',
      'Build text classifiers and sentiment analysis systems',
      'Fine-tune BERT for downstream NLP tasks',
      'Extract named entities and relationships from documents'
    ],
    modules: [
      { week: 1, title: 'Text Preprocessing', topics: ['What is NLP? Applications and industry use cases', 'Tokenisation — word, sentence and subword tokenisation', 'Lowercasing, punctuation removal and noise cleaning', 'Stop word removal — when to and when not to', 'Stemming (Porter, Snowball) vs Lemmatisation (WordNet)', 'Regular expressions for text pattern matching'] },
      { week: 2, title: 'Text Representation — Classical Methods', topics: ['Bag of Words (BoW) — CountVectorizer', 'TF-IDF — term frequency-inverse document frequency', 'N-grams — unigrams, bigrams, trigrams', 'Document similarity — cosine similarity, Jaccard', 'Vocabulary size and sparse matrix representation', 'Application: document retrieval and keyword extraction'] },
      { week: 3, title: 'Word Embeddings', topics: ['Limitations of BoW and TF-IDF', 'Word2Vec — CBOW and Skip-gram architectures', 'GloVe — global vector co-occurrence statistics', 'FastText — subword embeddings for OOV handling', 'Loading pre-trained embeddings with Gensim', 'Visualising word spaces with t-SNE; word analogies'] },
      { week: 4, title: 'Text Classification', topics: ['Naive Bayes for text — Multinomial and Bernoulli variants', 'Logistic Regression and SVM for text classification', 'Sentiment analysis — binary, ternary and aspect-based', 'Multi-label and multi-class text classification', 'Evaluation: precision, recall, F1 for text tasks', 'Building a product review sentiment classifier'] },
      { week: 5, title: 'Sequence Models', topics: ['Why sequence matters — limitations of bag-based models', 'Recurrent Neural Networks (RNNs) — hidden state, BPTT', 'Long Short-Term Memory (LSTM) — cell state and gates', 'GRU — simplified gating mechanism', 'Bidirectional LSTMs for text understanding', 'Text generation with character-level RNNs'] },
      { week: 6, title: 'Transformers & BERT', topics: ['Attention mechanism intuition — paying attention to context', 'Self-attention, multi-head attention and positional encoding', 'BERT — Bidirectional Encoder Representations from Transformers', 'HuggingFace Transformers library — pipelines and tokenizers', 'Fine-tuning BERT for text classification', 'DistilBERT, RoBERTa — lighter and stronger BERT variants'] },
      { week: 7, title: 'Named Entity Recognition & Information Extraction', topics: ['NER — identifying people, organisations, locations, dates', 'spaCy NER pipeline and custom entity training', 'Relation extraction — finding relationships between entities', 'Coreference resolution — "he", "she", "it" resolution', 'Dependency parsing — syntactic structure of sentences', 'Building a document intelligence pipeline'] },
      { week: 8, title: 'Capstone Project', topics: ['End-to-end NLP pipeline on a real-world text dataset', 'Designing the preprocessing → representation → model chain', 'Comparing classical (TF-IDF + SVM) vs deep (BERT) approaches', 'Model evaluation, error analysis and confusion analysis', 'Deploying NLP model as a REST API with FastAPI', 'Presentation: business framing and model card'] }
    ]
  },

  'feature-engineering': {
    id: 'feature-engineering',
    title: 'Feature Engineering & Model Selection',
    category: 'Core ML',
    level: 'Intermediate',
    levelClass: 'li',
    icon: '⚙️',
    iconClass: 'iml',
    duration: '6 weeks',
    hours: '30 contact hours',
    tools: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Optuna', 'SHAP', 'Feature-engine'],
    prereqs: 'Machine Learning course is highly recommended. Python and Pandas proficiency required.',
    overview: 'The difference between a mediocre model and a winning one is almost always in the features and tuning, not the algorithm. This course teaches the systematic craft of data preparation, feature creation, selection and model optimisation — the skills that separate competition winners from beginners.',
    outcomes: [
      'Diagnose and handle missing data with appropriate strategies',
      'Encode categorical variables correctly for any algorithm',
      'Apply mathematical transformations to improve model performance',
      'Create informative new features from existing data',
      'Select the most predictive features using multiple methods',
      'Tune model hyperparameters with Bayesian optimisation'
    ],
    modules: [
      { week: 1, title: 'Data Quality & Missing Values', topics: ['Types of missingness — MCAR, MAR, MNAR', 'Visualising missing data — missingno library', 'Mean, median, mode imputation — when each is appropriate', 'KNN imputation and iterative imputation (MICE)', 'Missing indicator variables — preserving missingness as a signal', 'Outlier detection: Z-score, IQR, Isolation Forest'] },
      { week: 2, title: 'Encoding Categorical Variables', topics: ['Label encoding — ordinal and nominal variables', 'One-Hot encoding — get_dummies vs OneHotEncoder, dummy trap', 'Target (mean) encoding — using the target to encode categories', 'Frequency encoding and count encoding', 'Hashing encoding for high-cardinality features', 'Rare label encoding — grouping infrequent categories'] },
      { week: 3, title: 'Numerical Transformations', topics: ['StandardScaler, MinMaxScaler, RobustScaler — when each applies', 'Log, square root and Box-Cox transformations for skewed data', 'Yeo-Johnson transformation for negative values', 'Discretisation — equal-width, equal-frequency, decision tree binning', 'Interaction terms — capturing non-linear relationships', 'Custom transformers in Scikit-learn Pipelines'] },
      { week: 4, title: 'Feature Creation', topics: ['Domain-specific feature engineering — business logic as features', 'Date and time decomposition — day, month, hour, is_weekend', 'Polynomial features — quadratic and cubic terms', 'Aggregated features — group statistics (min, max, mean, std)', 'Lag and rolling features for time-based data', 'Text-derived features — character count, word count, sentiment score'] },
      { week: 5, title: 'Feature Selection', topics: ['Filter methods — variance threshold, correlation matrix, mutual info', 'Wrapper methods — Recursive Feature Elimination (RFE)', 'Embedded methods — Lasso regularisation, tree feature importance', 'SHAP values — model-agnostic feature attribution', 'Permutation importance — measuring real predictive contribution', 'SelectFromModel and SequentialFeatureSelector in Scikit-learn'] },
      { week: 6, title: 'Model Selection & Hyperparameter Optimisation', topics: ['GridSearchCV — exhaustive search with cross-validation', 'RandomizedSearchCV — efficient sampling for large spaces', 'Introduction to Bayesian optimisation — surrogate models and acquisition functions', 'Optuna — define-by-run HPO framework with pruning', 'Multi-metric optimisation and refit strategy', 'Capstone: optimise an ML pipeline on a Kaggle dataset end to end'] }
    ]
  },

  /* ══════════════ ADVANCED AI ══════════════ */

  'deep-learning': {
    id: 'deep-learning',
    title: 'Deep Learning',
    category: 'Advanced AI',
    level: 'Advanced',
    levelClass: 'la',
    icon: '⚡',
    iconClass: 'idl',
    duration: '12 weeks',
    hours: '60 contact hours',
    tools: ['Python', 'TensorFlow 2.x', 'Keras', 'PyTorch', 'CUDA', 'Hugging Face', 'Weights & Biases'],
    prereqs: 'Machine Learning course or strong equivalent. Linear algebra (matrices, dot products) and calculus (derivatives, chain rule) fundamentals required.',
    overview: 'Deep Learning is the engine behind image recognition, language models, speech synthesis and self-driving cars. This 12-week intensive course takes you from the mathematics of a single neuron to building and deploying production-grade deep learning systems using both TensorFlow and PyTorch.',
    outcomes: [
      'Implement neural networks from scratch and in TensorFlow/PyTorch',
      'Apply CNNs to image classification and transfer learning tasks',
      'Build sequence models with LSTMs and Transformers',
      'Train and debug deep learning models systematically',
      'Implement object detection with YOLO and Faster R-CNN',
      'Deploy trained models as production-ready inference endpoints'
    ],
    modules: [
      { week: 1, title: 'Neural Network Fundamentals', topics: ['Biological inspiration — the McCulloch-Pitts neuron', 'The perceptron — linear threshold unit', 'Activation functions: sigmoid, tanh, ReLU, Leaky ReLU, GELU', 'Multi-layer perceptron (MLP) — forward pass computation', 'Universal approximation theorem — what neural nets can represent', 'Implementing a 2-layer network in pure NumPy'] },
      { week: 2, title: 'Backpropagation & Optimisers', topics: ['Loss functions — MSE, Cross-Entropy, Huber loss', 'Gradient descent — batch, mini-batch and stochastic', 'Backpropagation — chain rule applied layer by layer', 'Optimisers: SGD with momentum, RMSprop, Adam, AdamW', 'Learning rate scheduling: step, cosine annealing, warmup', 'Gradient clipping and exploding/vanishing gradients'] },
      { week: 3, title: 'TensorFlow 2 & Keras', topics: ['TensorFlow computational graph and eager execution', 'Keras Sequential and Functional API', 'Building, compiling and training a model — fit(), evaluate()', 'Callbacks: EarlyStopping, ModelCheckpoint, LearningRateScheduler', 'TensorBoard — visualising training curves and model graphs', 'Saving and loading models — SavedModel and HDF5 formats'] },
      { week: 4, title: 'PyTorch Fundamentals', topics: ['Tensors — creation, operations and GPU transfer', 'Autograd — automatic differentiation and computation graphs', 'nn.Module — building custom layers and models', 'DataLoaders and custom Datasets — efficient data pipelines', 'Training loop in PyTorch — forward, loss, backward, step', 'torch.save, torch.load and model checkpointing'] },
      { week: 5, title: 'Convolutional Neural Networks', topics: ['Convolution operation — filters, stride, padding, feature maps', 'Pooling layers — max pooling, average pooling, global pooling', 'CNN architecture patterns — conv → pool → flatten → dense', 'Famous architectures: AlexNet, VGG-16, ResNet (skip connections)', 'Data augmentation — flips, rotations, colour jitter, CutMix', 'Image classification on CIFAR-10 from scratch'] },
      { week: 6, title: 'Transfer Learning & Fine-Tuning', topics: ['What is transfer learning? Feature extraction vs fine-tuning', 'Using pretrained ImageNet models (ResNet50, EfficientNet, ViT)', 'Freezing and unfreezing layers — staged fine-tuning', 'Learning rate differential — lower rates for base, higher for head', 'Domain adaptation — bridging source and target distributions', 'Project: custom image classifier with 5 classes, 95%+ accuracy target'] },
      { week: 7, title: 'Recurrent Neural Networks & LSTMs', topics: ['Sequence modelling — why feed-forward networks fail', 'RNN — hidden state, unrolled computation, BPTT', 'Vanishing gradient in RNNs — the root cause', 'LSTM — cell state, input gate, forget gate, output gate', 'GRU — simplified gating, parameter efficiency', 'Time series forecasting and text generation with LSTMs'] },
      { week: 8, title: 'Attention Mechanism & Transformers', topics: ['The attention mechanism — query, key, value formulation', 'Scaled dot-product attention and softmax normalisation', 'Multi-head attention — attending to multiple positions', 'Positional encoding — sinusoidal and learned', 'The full Transformer block — attention + FFN + LayerNorm + residual', 'GPT vs BERT — decoder-only vs encoder architecture'] },
      { week: 9, title: 'Regularisation & Training Techniques', topics: ['Dropout — randomly zeroing activations at training time', 'Batch Normalisation — normalising layer inputs', 'Layer Normalisation — used in Transformers', 'Weight decay (L2 regularisation) in Adam — AdamW', 'Label smoothing and mixup augmentation', 'Systematic debugging: loss curves, gradient norms, dead ReLUs'] },
      { week: 10, title: 'Object Detection', topics: ['Object detection vs classification — bounding boxes and IoU', 'Anchor boxes — shapes, scales and ratios', 'YOLO architecture — grid cells, confidence, class probabilities', 'YOLOv8 — training on custom datasets with Ultralytics', 'Faster R-CNN — Region Proposal Networks', 'Evaluation: mAP, IoU thresholds, precision-recall curves'] },
      { week: 11, title: 'Generative Models', topics: ['Autoencoders — encoder, bottleneck and decoder', 'Variational Autoencoders (VAEs) — latent space and sampling', 'GAN framework — generator, discriminator, minimax game', 'DCGAN — convolutional GAN for image synthesis', 'Training instability: mode collapse and tips to stabilise', 'Introduction to Diffusion Models — noise prediction overview'] },
      { week: 12, title: 'Capstone Project & Deployment', topics: ['Choosing a project: CV, NLP or time-series track', 'Full pipeline: data collection → training → evaluation → deployment', 'Exporting models: ONNX, TorchScript and TF SavedModel', 'Serving models with FastAPI + Docker', 'Model optimisation: quantisation and pruning basics', 'Project presentation, peer review and model card'] }
    ]
  },

  'computer-vision': {
    id: 'computer-vision',
    title: 'Computer Vision',
    category: 'Advanced AI',
    level: 'Advanced',
    levelClass: 'la',
    icon: '👁️',
    iconClass: 'icv',
    duration: '10 weeks',
    hours: '50 contact hours',
    tools: ['Python', 'OpenCV', 'PyTorch', 'Ultralytics YOLOv8', 'Detectron2', 'MediaPipe', 'Albumentations'],
    prereqs: 'Deep Learning course or equivalent experience building CNNs. Python and PyTorch basics required.',
    overview: 'Computer Vision enables machines to see and understand the world. From self-driving cars to medical imaging to retail analytics — CV is everywhere. This course covers classical image processing through state-of-the-art detection, segmentation, face recognition and video analytics, with real deployments in every module.',
    outcomes: [
      'Process and augment images using OpenCV and Albumentations',
      'Build image classifiers using CNNs and transfer learning',
      'Train YOLOv8 on custom object detection datasets',
      'Implement semantic and instance segmentation pipelines',
      'Build face recognition and landmark detection systems',
      'Build video analytics pipelines for action recognition and tracking'
    ],
    modules: [
      { week: 1, title: 'Image Processing Fundamentals', topics: ['Digital images — pixels, channels, bit depth, colour spaces (RGB, BGR, HSV, LAB)', 'OpenCV basics — reading, writing and displaying images', 'Geometric transformations — resize, crop, rotate, flip, affine warp', 'Pixel-level operations — brightness, contrast, gamma correction', 'Blurring — Gaussian, median and bilateral filters', 'Thresholding — binary, Otsu, adaptive thresholding'] },
      { week: 2, title: 'Classical Computer Vision', topics: ['Edge detection — Sobel, Laplacian, Canny edge detector', 'Morphological operations — erosion, dilation, opening, closing', 'Contour detection and shape analysis', 'Histogram equalisation and CLAHE for contrast enhancement', 'Template matching and feature-based matching (ORB, SIFT overview)', 'Optical character recognition pipeline using Tesseract'] },
      { week: 3, title: 'Image Classification Deep Dive', topics: ['CNN recap — convolutional layers, receptive field, feature hierarchies', 'Data augmentation strategies — geometric and colour transforms with Albumentations', 'Training on small datasets — regularisation and augmentation best practices', 'Learning rate finder — finding the right LR without guessing', 'Mixed precision training — FP16 for faster training on GPU', 'Building an image classifier from scratch: Cats vs Dogs and beyond'] },
      { week: 4, title: 'Advanced CNN Architectures', topics: ['AlexNet, VGG — depth and the role of small filters', 'ResNet — skip connections, identity mappings, why they work', 'DenseNet — dense connections and feature reuse', 'EfficientNet — compound scaling (depth, width, resolution)', 'Vision Transformer (ViT) — patches as tokens, self-attention for images', 'Comparing architectures: accuracy vs parameters vs inference speed'] },
      { week: 5, title: 'Transfer Learning on Custom Datasets', topics: ['Building a custom image dataset — collection, labelling with LabelImg', 'Feature extraction with frozen backbone', 'Fine-tuning: gradual unfreezing and discriminative learning rates', 'Handling class imbalance in image datasets — weighted sampling, focal loss', 'Test-time augmentation (TTA) — boosting inference accuracy', 'Project: real-world custom classifier (defect detection, plant disease, etc.)'] },
      { week: 6, title: 'Object Detection with YOLO', topics: ['Object detection fundamentals — bounding boxes, IoU, NMS', 'YOLO architecture — grid, anchors, multi-scale prediction heads', 'YOLOv8 with Ultralytics — training on COCO and custom datasets', 'Data preparation — YOLO annotation format, Roboflow workflow', 'Evaluation metrics — mAP@0.5, mAP@0.5:0.95, precision-recall', 'Real-time inference with webcam; deployment with ONNX'] },
      { week: 7, title: 'Semantic & Instance Segmentation', topics: ['Segmentation vs detection — pixel-level understanding', 'Semantic segmentation — FCN, U-Net architecture and skip connections', 'DeepLab V3+ — atrous convolutions and ASPP', 'Instance segmentation — Mask R-CNN architecture and RoI Align', 'Panoptic segmentation — combining semantic and instance', 'Training a U-Net on a medical imaging dataset'] },
      { week: 8, title: 'Face Recognition & Landmark Detection', topics: ['Face detection — Haar cascades vs MTCNN vs RetinaFace', 'FaceNet — embedding-based recognition, triplet loss', 'ArcFace — angular margin loss for robust face recognition', 'Facial landmark detection — 68-point and 478-point meshes', 'MediaPipe Face Mesh — real-time landmark tracking', 'Building an attendance system with face recognition'] },
      { week: 9, title: 'Video Analytics', topics: ['Reading and writing video with OpenCV — frame-by-frame processing', 'Optical flow — Lucas-Kanade and Farneback methods', 'Object tracking — SORT, DeepSORT, ByteTrack', 'Multi-object tracking metrics — MOTA, IDF1', 'Action recognition — 3D CNNs and two-stream networks', 'Building a people-counting pipeline for surveillance footage'] },
      { week: 10, title: 'Capstone Project & Deployment', topics: ['Project tracks: retail analytics, medical imaging, or industrial inspection', 'End-to-end pipeline: data → label → train → evaluate → deploy', 'Optimising for edge deployment — TensorRT, OpenVINO, NCNN', 'Building a Gradio or Streamlit demo for the model', 'Documenting results — benchmark tables and visual examples', 'Presentation, code review and portfolio packaging'] }
    ]
  },

  'llm': {
    id: 'llm',
    title: 'Large Language Models',
    category: 'Advanced AI',
    level: 'Advanced',
    levelClass: 'la',
    icon: '🔤',
    iconClass: 'illm',
    duration: '10 weeks',
    hours: '50 contact hours',
    tools: ['Python', 'HuggingFace Transformers', 'LangChain', 'LlamaIndex', 'Pinecone', 'ChromaDB', 'FastAPI', 'Ollama'],
    prereqs: 'Deep Learning course or strong familiarity with Transformer architecture. Python proficiency essential.',
    overview: 'Large Language Models have fundamentally changed software. This course gives you a deep, engineering-level understanding of how LLMs work — from Transformer internals to fine-tuning open-source models, building RAG pipelines, and deploying LLM-powered applications in production.',
    outcomes: [
      'Explain the Transformer architecture at the implementation level',
      'Fine-tune open-source LLMs (LLaMA, Mistral) using LoRA and QLoRA',
      'Build production RAG pipelines with vector databases',
      'Orchestrate LLM agents with LangChain and LlamaIndex',
      'Evaluate LLMs systematically and mitigate hallucination',
      'Deploy cost-efficient LLM APIs with caching and rate control'
    ],
    modules: [
      { week: 1, title: 'Transformer Architecture Deep Dive', topics: ['Attention mechanism — query, key, value from first principles', 'Scaled dot-product attention and softmax temperature', 'Multi-head attention — parallel attention across subspaces', 'Positional encoding — sinusoidal and RoPE (Rotary Position Embedding)', 'Feed-forward sublayer, LayerNorm and residual connections', 'Encoder vs decoder vs encoder-decoder architectures'] },
      { week: 2, title: 'GPT Family — Autoregressive LLMs', topics: ['GPT-1 to GPT-4 — scaling laws and emergent abilities', 'Autoregressive language modelling — next-token prediction', 'Tokenisation — BPE, WordPiece and SentencePiece', 'Context window, KV-cache and attention complexity', 'GPT-4 and the OpenAI API — completions, chat, function calling', 'Sampling strategies — temperature, top-k, top-p, beam search'] },
      { week: 3, title: 'BERT & Encoder-Based Models', topics: ['BERT pre-training — Masked LM and Next Sentence Prediction', 'Fine-tuning BERT for classification, NER and QA', 'RoBERTa — removing NSP, dynamic masking', 'DistilBERT — knowledge distillation for 40% smaller model', 'Sentence-BERT — semantic embeddings for similarity tasks', 'DeBERTa, ELECTRA — modern BERT improvements'] },
      { week: 4, title: 'Open-Source LLMs', topics: ['LLaMA 2 & 3 — architecture differences from GPT, tokenizer', 'Mistral 7B — sliding window attention, grouped query attention', 'Falcon, Gemma and Phi — lightweight LLMs for constrained environments', 'Running LLMs locally with Ollama — quantised GGUF models', 'HuggingFace model hub — loading, running and inspecting models', 'Benchmarks — MMLU, HellaSwag, HumanEval, BIG-bench comparison'] },
      { week: 5, title: 'Prompt Engineering', topics: ['Zero-shot, one-shot and few-shot prompting', 'Chain-of-thought (CoT) prompting — reasoning step by step', 'Self-consistency — sampling multiple chains and voting', 'Tree of Thoughts (ToT) — branching and evaluating reasoning paths', 'ReAct — reasoning and acting with tool use', 'System prompts, role prompting and prompt injection risks'] },
      { week: 6, title: 'Fine-Tuning LLMs', topics: ['When to fine-tune vs prompt engineer vs RAG', 'Full fine-tuning — compute cost and dataset requirements', 'Parameter-Efficient Fine-Tuning (PEFT) — overview of strategies', 'LoRA — low-rank decomposition of weight updates', 'QLoRA — quantised LoRA for 4-bit fine-tuning on consumer GPUs', 'Building an instruction-tuning dataset and training with Unsloth'] },
      { week: 7, title: 'Retrieval-Augmented Generation (RAG)', topics: ['RAG architecture — indexing, retrieval and generation pipeline', 'Document chunking strategies — fixed size, recursive, semantic', 'Embedding models — OpenAI, Sentence-BERT, BGE, E5', 'Vector databases — Pinecone, ChromaDB, Weaviate, Qdrant', 'Similarity search — cosine similarity, HNSW, IVF indexing', 'Advanced RAG: HyDE, reranking with Cohere, self-RAG'] },
      { week: 8, title: 'LLM Orchestration — LangChain & LlamaIndex', topics: ['LangChain chains — PromptTemplate, LLMChain, SequentialChain', 'Memory — ConversationBufferMemory, summary memory, entity memory', 'Agents and tools — ReAct agents, web search, calculator, Python REPL', 'LlamaIndex — document indexing, query engines and chat engines', 'Custom retrieval pipelines with LlamaIndex routers', 'Building a multi-document Q&A chatbot end to end'] },
      { week: 9, title: 'LLM Evaluation & Safety', topics: ['Reference-based metrics — BLEU, ROUGE, BERTScore', 'LLM-as-a-judge — using GPT-4 to evaluate outputs', 'Hallucination benchmarks — TruthfulQA, FEVER, HaluEval', 'Bias and fairness evaluation — StereoSet, WinoBias', 'Prompt injection, jailbreaking and red-teaming basics', 'Constitutional AI and RLHF — aligning models with human preferences'] },
      { week: 10, title: 'Production LLM Systems', topics: ['API design for LLM services — streaming, SSE and WebSockets', 'Caching strategies — semantic caching with GPTCache', 'Rate limiting, cost tracking and token budgeting', 'Latency optimisation — quantisation, speculative decoding, batching', 'Monitoring LLM applications — logging, tracing with LangSmith', 'Capstone: deploy a domain-specific LLM assistant with RAG, memory and a Gradio interface'] }
    ]
  },

  'generative-ai': {
    id: 'generative-ai',
    title: 'Generative AI',
    category: 'Advanced AI',
    level: 'Advanced',
    levelClass: 'la',
    icon: '✨',
    iconClass: 'igenai',
    duration: '10 weeks',
    hours: '50 contact hours',
    tools: ['Python', 'PyTorch', 'Diffusers (HuggingFace)', 'Stable Diffusion', 'DALL-E API', 'Gradio', 'ComfyUI', 'OpenAI API'],
    prereqs: 'Deep Learning course. Comfortable with PyTorch and CNN/Transformer fundamentals.',
    overview: 'Generative AI is reshaping creative industries, drug discovery, game design and content creation. This course covers the full spectrum — from VAEs and GANs to Diffusion Models and Multimodal AI — giving you both the theoretical understanding and practical skills to build cutting-edge generative systems.',
    outcomes: [
      'Implement and train VAEs and GANs from scratch',
      'Fine-tune Stable Diffusion with custom styles and ControlNet',
      'Build multimodal applications using CLIP and GPT-4V',
      'Generate audio with TTS and music generation models',
      'Deploy a full generative AI application with a web interface',
      'Evaluate generative models using FID, CLIP score and human evaluation'
    ],
    modules: [
      { week: 1, title: 'Generative AI Foundations', topics: ['Discriminative vs generative models — the fundamental distinction', 'Probability density estimation — what generative models learn', 'Latent space — compressing and navigating data manifolds', 'Survey of generative model families: VAE, GAN, Flow, Diffusion, AR', 'Evaluation challenge — why evaluating generative models is hard', 'FID, IS, CLIP score and human preference evaluation'] },
      { week: 2, title: 'Autoencoders & Variational Autoencoders', topics: ['Autoencoders — encoder, bottleneck, decoder; reconstruction loss', 'Undercomplete and overcomplete autoencoders', 'Denoising autoencoders — learning robust representations', 'Variational Autoencoders — reparameterisation trick and ELBO loss', 'Sampling from the latent space — interpolation and generation', 'Conditional VAEs — conditioning generation on class labels'] },
      { week: 3, title: 'Generative Adversarial Networks', topics: ['GAN architecture — generator vs discriminator adversarial game', 'Minimax loss, non-saturating loss and the training equilibrium', 'Common GAN failure modes — mode collapse, training instability', 'DCGAN — deep convolutional GAN for stable image generation', 'Wasserstein GAN — Earth Mover distance for better gradients', 'Progressive GAN — generating high-resolution images stage by stage'] },
      { week: 4, title: 'Advanced GANs & Conditional Generation', topics: ['Conditional GAN (cGAN) — class-conditioned image synthesis', 'Pix2Pix — image-to-image translation with paired data', 'CycleGAN — unpaired domain translation (horse ↔ zebra)', 'StyleGAN 2/3 — style-based generator architecture', 'GAN inversion — encoding real images into GAN latent space', 'Applications: face editing, super-resolution (SRGAN, ESRGAN)'] },
      { week: 5, title: 'Diffusion Models', topics: ['Intuition — gradually adding and removing noise', 'Denoising Diffusion Probabilistic Models (DDPM) — forward and reverse process', 'Score matching and Langevin dynamics — the mathematical foundation', 'U-Net backbone with time embedding for denoising', 'DDIM — deterministic sampling with fewer steps', 'Classifier-free guidance — controlling generation without a classifier'] },
      { week: 6, title: 'Stable Diffusion & ControlNet', topics: ['Latent Diffusion Models — why diffusion in latent space?', 'Stable Diffusion architecture — VAE + CLIP + U-Net', 'Text conditioning with CLIP encoder — from text to image', 'Fine-tuning with DreamBooth — teaching SD your subject', 'Fine-tuning with LoRA — lightweight style adaptation', 'ControlNet — conditioning on edges, depth, pose and segmentation maps'] },
      { week: 7, title: 'Text-to-Image APIs & Tools', topics: ['OpenAI DALL-E 3 API — generation, editing and variation', 'Midjourney aesthetics — prompt syntax and style parameters', 'Stability AI API — SDXL, Stable Image Core', 'ComfyUI — node-based workflow for advanced SD pipelines', 'Prompt engineering for images — descriptors, style modifiers, negative prompts', 'Building an AI image generation app with Gradio'] },
      { week: 8, title: 'Multimodal AI', topics: ['CLIP — contrastive language-image pre-training, zero-shot classification', 'BLIP and BLIP-2 — image captioning and visual QA', 'GPT-4V / GPT-4o — vision capabilities and use cases', 'Gemini Vision and Claude Vision — comparing multimodal LLMs', 'Video generation — Sora overview, Runway Gen-2, AnimateDiff', 'Building a multimodal document understanding pipeline'] },
      { week: 9, title: 'Audio Generation', topics: ['Audio as a sequence — waveforms, spectrograms and mel-spectrograms', 'WaveNet and WaveGrad — autoregressive and diffusion audio synthesis', 'Text-to-Speech — Coqui TTS, Bark, XTTS for voice cloning', 'MusicGen — Meta\'s music generation model', 'AudioCraft — audio effect and sound event generation', 'Building a podcast generator: TTS + background music pipeline'] },
      { week: 10, title: 'Capstone — Full Generative AI Application', topics: ['Project definition — choose a domain: art, music, video, or multimodal', 'Designing a generative pipeline end to end', 'Building the backend — model inference, API layer', 'Building the frontend — Gradio, Streamlit or React UI', 'Responsible AI — watermarking, content filtering, usage policies', 'Demo day: live presentations and portfolio packaging'] }
    ]
  },

  'reinforcement-learning': {
    id: 'reinforcement-learning',
    title: 'Reinforcement Learning',
    category: 'Advanced AI',
    level: 'Advanced',
    levelClass: 'la',
    icon: '🎮',
    iconClass: 'icv',
    duration: '8 weeks',
    hours: '40 contact hours',
    tools: ['Python', 'OpenAI Gymnasium', 'Stable-Baselines3', 'PyTorch', 'TensorBoard', 'MuJoCo (intro)', 'RLlib'],
    prereqs: 'Deep Learning course. Solid understanding of probability, linear algebra and Python. Calculus helpful.',
    overview: 'Reinforcement Learning is the paradigm behind AlphaGo, ChatGPT\'s RLHF training and autonomous robotics. This course builds from the mathematical foundations of MDPs through deep Q-networks to state-of-the-art policy gradient methods — all applied through hands-on environments.',
    outcomes: [
      'Formulate real problems as Markov Decision Processes',
      'Implement and compare classical RL algorithms from scratch',
      'Train Deep Q-Network (DQN) agents on Atari-style environments',
      'Apply policy gradient methods — PPO, SAC and A3C',
      'Use Stable-Baselines3 to train agents on custom environments',
      'Understand how RLHF is used to align Large Language Models'
    ],
    modules: [
      { week: 1, title: 'RL Fundamentals & Environments', topics: ['What is RL? Agent, environment, state, action, reward, episode', 'The RL loop — observe, act, receive reward, update', 'Gymnasium (OpenAI Gym) — installing and running environments', 'Discrete vs continuous action spaces', 'Episodic vs continuing tasks', 'Exploration vs exploitation — the central dilemma of RL'] },
      { week: 2, title: 'Markov Decision Processes', topics: ['Markov property — why only the present matters', 'MDPs — states, actions, transition function, reward function, discount factor γ', 'Return — cumulative discounted reward', 'Value function V(s) — expected return from a state', 'Q-function Q(s,a) — expected return from a state-action pair', 'Bellman equations — the recursive definition of value'] },
      { week: 3, title: 'Dynamic Programming', topics: ['Model-based vs model-free RL — knowing the environment dynamics', 'Policy evaluation — computing V under a fixed policy', 'Policy improvement — greedy improvement theorem', 'Policy iteration — alternating evaluation and improvement', 'Value iteration — combining evaluation and improvement', 'Limitations of DP — curse of dimensionality'] },
      { week: 4, title: 'Model-Free Prediction & Control', topics: ['Monte Carlo methods — learning from complete episodes', 'Temporal Difference (TD) learning — learning from incomplete episodes', 'TD(0) — one-step bootstrapping', 'SARSA — on-policy TD control (S, A, R, S\', A\')', 'Q-learning — off-policy TD control, the Bellman optimality update', 'ε-greedy exploration and ε decay schedules'] },
      { week: 5, title: 'Deep Q-Networks', topics: ['The problem with tabular Q-learning on large state spaces', 'DQN — using a neural network to approximate Q(s,a)', 'Experience replay buffer — breaking temporal correlations', 'Target network — stabilising the training target', 'Double DQN — decoupling action selection and evaluation', 'Dueling DQN — separate value and advantage streams; Prioritised Experience Replay'] },
      { week: 6, title: 'Policy Gradient Methods', topics: ['Policy-based vs value-based RL — direct parameterisation of policy', 'REINFORCE — Monte Carlo policy gradient', 'High variance problem and baseline subtraction', 'Actor-Critic (A2C) — combining policy and value learning', 'Asynchronous Advantage Actor-Critic (A3C)', 'Advantage function — how much better is action a than average?'] },
      { week: 7, title: 'Modern RL Algorithms', topics: ['Proximal Policy Optimisation (PPO) — clipped surrogate objective', 'PPO in practice — parallel environments, entropy bonus, value loss', 'Soft Actor-Critic (SAC) — maximum entropy RL for continuous control', 'Twin Delayed DDPG (TD3) — addressing overestimation in DDPG', 'Multi-agent RL overview — cooperative, competitive and mixed settings', 'RLHF — Reinforcement Learning from Human Feedback for LLM alignment'] },
      { week: 8, title: 'Capstone — Train a Full RL Agent', topics: ['Choosing an environment: CartPole, LunarLander, MuJoCo HalfCheetah or custom', 'Implementing a training pipeline with Stable-Baselines3', 'Hyperparameter tuning — learning rate, γ, entropy coefficient', 'Monitoring training — TensorBoard reward curves and episode length', 'Evaluating and recording agent behaviour — video rollouts', 'Capstone presentation: problem setup, algorithm choice, results and lessons'] }
    ]
  },

  'mlops': {
    id: 'mlops',
    title: 'MLOps & Model Deployment',
    category: 'Advanced AI',
    level: 'Advanced',
    levelClass: 'la',
    icon: '🚀',
    iconClass: 'illm',
    duration: '8 weeks',
    hours: '40 contact hours',
    tools: ['Python', 'Docker', 'FastAPI', 'MLflow', 'DVC', 'GitHub Actions', 'Weights & Biases', 'Evidently AI', 'Prometheus'],
    prereqs: 'Machine Learning course. Basic familiarity with Git and command line. Cloud account (AWS/Azure) helpful.',
    overview: 'Building a model is just 20% of the work. MLOps covers the other 80% — versioning data and experiments, containerising models, building CI/CD pipelines, serving predictions at scale and monitoring for drift in production. This is the course that makes you a complete ML engineer.',
    outcomes: [
      'Version data and code systematically with DVC and Git',
      'Track and compare experiments with MLflow and W&B',
      'Containerise ML models and build REST APIs with FastAPI',
      'Build end-to-end CI/CD pipelines for ML with GitHub Actions',
      'Deploy models on cloud platforms (AWS SageMaker / Azure ML)',
      'Monitor models for data drift and concept drift in production'
    ],
    modules: [
      { week: 1, title: 'ML Project Lifecycle & Data Versioning', topics: ['The ML engineering lifecycle — from notebook to production', 'Git best practices for ML projects — branching strategy, .gitignore for data', 'DVC (Data Version Control) — tracking large files with Git', 'dvc run — creating reproducible pipeline stages', 'Remote storage — S3, GCS, Azure Blob as DVC remotes', 'DVC DAG — visualising the data pipeline'] },
      { week: 2, title: 'Experiment Tracking', topics: ['Why experiment tracking? The chaos of ad-hoc ML experiments', 'MLflow — tracking runs, parameters, metrics and artifacts', 'MLflow Model Registry — staging, production and archiving', 'Weights & Biases (W&B) — richer tracking, sweeps and reports', 'Comparing experiment runs — tables, charts and parallel coordinates', 'Logging custom charts, images and confusion matrices'] },
      { week: 3, title: 'Containerisation with Docker', topics: ['What is Docker? Images, containers, layers and registries', 'Writing a Dockerfile for a Python ML application', 'Building and running containers — docker build, run, exec', 'Docker Compose — multi-container applications (model + database)', 'Optimising image size — multi-stage builds, slim base images', 'Pushing to Docker Hub and GitHub Container Registry'] },
      { week: 4, title: 'REST APIs for ML with FastAPI', topics: ['Why FastAPI? Async, type hints and automatic OpenAPI docs', 'Building a prediction endpoint — POST /predict with Pydantic schemas', 'Loading and caching models at startup with lifespan events', 'Input validation, error handling and HTTP status codes', 'Background tasks — async processing for slow inference', 'Load testing with Locust — measuring throughput and latency'] },
      { week: 5, title: 'CI/CD for Machine Learning', topics: ['What is CI/CD? Continuous Integration and Continuous Delivery', 'GitHub Actions — workflows, jobs, steps and runners', 'Automated testing for ML — unit tests, data validation, model tests', 'Building a CI pipeline: lint → test → build Docker image → push', 'Automated model training and evaluation on schedule or PR', 'Secrets management — API keys and credentials in Actions'] },
      { week: 6, title: 'Cloud Deployment', topics: ['AWS SageMaker — training jobs, endpoints and real-time inference', 'Azure Machine Learning — workspace, environments and online endpoints', 'Serverless ML — AWS Lambda + ECR for lightweight inference', 'Infrastructure as Code — intro to Terraform for ML infra', 'Blue-green and canary deployments — zero-downtime model updates', 'Cost optimisation — spot instances, auto-scaling, cold start mitigation'] },
      { week: 7, title: 'Model Monitoring & Observability', topics: ['Why models degrade — data drift, concept drift and label shift', 'Evidently AI — data drift reports and model performance dashboards', 'Statistical drift tests — PSI, KL divergence, KS test, chi-squared', 'Prometheus and Grafana — metrics collection and dashboards', 'Logging predictions for retraining — building a feedback loop', 'Alerting — PagerDuty, Slack webhooks on drift or performance degradation'] },
      { week: 8, title: 'Capstone — End-to-End MLOps Pipeline', topics: ['Project: build a production ML system from scratch', 'Data versioning with DVC, experiment tracking with MLflow', 'Train, evaluate and register the best model', 'Build a FastAPI service and Dockerise it', 'Deploy via GitHub Actions CI/CD to a cloud endpoint', 'Monitor with Evidently; write a system design document and present'] }
    ]
  },

  /* ══════════════ ANALYTICS ══════════════ */

  'data-visualization': {
    id: 'data-visualization',
    title: 'Data Visualization',
    category: 'Analytics',
    level: 'Beginner',
    levelClass: 'lb',
    icon: '📊',
    iconClass: 'idv',
    duration: '6 weeks',
    hours: '30 contact hours',
    tools: ['Python', 'Matplotlib', 'Seaborn', 'Plotly', 'Plotly Dash', 'Pandas', 'Tableau Public (intro)'],
    prereqs: 'Python Programming. Basic knowledge of Pandas DataFrames is sufficient.',
    overview: 'Data without visualisation is just numbers. This course teaches you to translate complex datasets into clear, compelling and interactive visual narratives. From statistical plots to animated dashboards, you will build the visual communication skills every data professional needs.',
    outcomes: [
      'Choose the right chart type for any data and question',
      'Build statistical visualisations with Matplotlib and Seaborn',
      'Create interactive charts and dashboards with Plotly',
      'Build multi-page analytical dashboards with Plotly Dash',
      'Apply design principles — colour, typography and layout',
      'Tell a coherent data story from raw data to insight'
    ],
    modules: [
      { week: 1, title: 'Visualisation Principles & Chart Selection', topics: ['Why visualisation matters — the Anscombe\'s Quartet lesson', 'Data types and chart types — nominal, ordinal, interval, ratio', 'Pre-attentive attributes — what the eye processes instantly', 'Colour theory — hue, saturation, value; categorical vs sequential vs diverging palettes', 'Data-ink ratio — Edward Tufte\'s principle of minimalism', 'Common chart anti-patterns — 3D pie charts, truncated axes, dual axes'] },
      { week: 2, title: 'Matplotlib Deep Dive', topics: ['Figure and axes architecture — the object-oriented approach', 'Line charts, bar charts, scatter plots and histograms', 'Customising plots — titles, labels, ticks, grid, legends', 'Subplots — plt.subplots() and gridspec layouts', 'Styling — rcParams, style sheets and custom themes', 'Saving figures — resolution, format (PNG, SVG, PDF) for publication'] },
      { week: 3, title: 'Statistical Visualisation with Seaborn', topics: ['Seaborn\'s theme and palette system', 'Distribution plots — histplot, kdeplot, ecdfplot, rugplot', 'Categorical plots — boxplot, violinplot, stripplot, swarmplot, barplot', 'Relational plots — scatterplot, lineplot with confidence intervals', 'Heatmaps and cluster maps for correlation matrices', 'FacetGrid and PairGrid — multi-panel statistical exploration'] },
      { week: 4, title: 'Interactive Charts with Plotly', topics: ['Plotly Express — one-line interactive charts for exploration', 'Graph Objects API — full control over traces and layout', 'Hover tooltips, click events and zooming/panning', 'Animated charts — frame-by-frame animation with slider', 'Geographic visualisations — choropleth maps, scatter_mapbox', 'Exporting interactive charts to HTML for embedding in web pages'] },
      { week: 5, title: 'Dashboard Development with Plotly Dash', topics: ['Dash app structure — layout, components and callbacks', 'Core components: Dropdown, Slider, DatePicker, DataTable', 'Callbacks — linking inputs to outputs reactively', 'Multi-page Dash apps — routing and page registry', 'Styling Dash apps with Bootstrap (dash-bootstrap-components)', 'Deploying Dash on Render or Hugging Face Spaces'] },
      { week: 6, title: 'Capstone — Business Dashboard Project', topics: ['Choosing a real dataset: financial, healthcare, sports or retail', 'EDA — finding the 5 most important insights to communicate', 'Designing the dashboard layout — wireframing on paper first', 'Building the Dash app with at least 4 interactive charts', 'Storytelling — adding annotations, titles and narrative text', 'Peer presentation: stakeholder walkthrough and design critique'] }
    ]
  },

  'excel': {
    id: 'excel',
    title: 'Excel for Data Analysis',
    category: 'Analytics',
    level: 'Beginner',
    levelClass: 'lb',
    icon: '📋',
    iconClass: 'isql',
    duration: '4 weeks',
    hours: '20 contact hours',
    tools: ['Microsoft Excel 2019/365', 'Power Query', 'Power Pivot', 'VBA (intro)'],
    prereqs: 'No prior Excel knowledge required. Basic computer literacy (file management, typing) is sufficient.',
    overview: 'Excel remains the most widely used data analysis tool in business — and the gap between casual users and power users is enormous. This intensive course transforms you from a basic spreadsheet user into an Excel data analyst who can build dynamic reports, automate workflows and impress any employer.',
    outcomes: [
      'Write complex formulas — XLOOKUP, INDEX-MATCH, dynamic arrays',
      'Build PivotTables and PivotCharts for rapid data summarisation',
      'Clean and transform messy data with Power Query',
      'Design professional, interactive dashboards with slicers',
      'Automate repetitive tasks with basic VBA macros',
      'Handle large datasets efficiently using Excel best practices'
    ],
    modules: [
      { week: 1, title: 'Excel Power Formulas', topics: ['Excel interface, ribbon and data types review', 'Cell referencing — relative, absolute ($) and mixed', 'Lookup functions — VLOOKUP, HLOOKUP and their limitations', 'XLOOKUP — the modern replacement for VLOOKUP', 'INDEX and MATCH — the power combination', 'Logical functions — IF, IFS, AND, OR, IFERROR, SWITCH; dynamic arrays — UNIQUE, SORT, FILTER, SEQUENCE'] },
      { week: 2, title: 'PivotTables & PivotCharts', topics: ['PivotTable basics — rows, columns, values and filters', 'Grouping — dates by month/quarter, numbers into bins', 'Calculated fields and calculated items', 'Slicers and timeline filters for interactive filtering', 'PivotCharts — linked charts that update with the pivot', 'Multiple PivotTables from one source — connecting slicers'] },
      { week: 3, title: 'Power Query — Data Transformation', topics: ['Power Query Editor — the ETL tool inside Excel', 'Connecting to data sources — CSV, Excel, web, SQL', 'Data type detection and column transformations', 'Filtering rows, removing duplicates, splitting columns', 'Merging and appending queries — JOIN logic in Power Query', 'M language basics — custom steps and conditional columns'] },
      { week: 4, title: 'Dashboards, Charts & Automation', topics: ['Advanced charting — waterfall, funnel, sparklines, combo charts', 'Dynamic dashboard design — camera tool, form controls, scroll bars', 'Conditional formatting — data bars, colour scales, icon sets, custom rules', 'Named ranges and dynamic named ranges (OFFSET, INDIRECT)', 'Recording and editing macros — VBA basics (variables, loops, if statements)', 'Capstone: build a sales performance dashboard from raw transaction data'] }
    ]
  },

  'tableau': {
    id: 'tableau',
    title: 'Tableau',
    category: 'Analytics',
    level: 'Intermediate',
    levelClass: 'li',
    icon: '🔷',
    iconClass: 'ipbi',
    duration: '5 weeks',
    hours: '25 contact hours',
    tools: ['Tableau Desktop (Public)', 'Tableau Prep (intro)', 'Tableau Public (publishing)', 'Excel & CSV data sources'],
    prereqs: 'No programming required. Basic understanding of data analysis concepts (averages, totals, groups) is helpful.',
    overview: 'Tableau is the industry-leading BI and analytics platform used by data analysts worldwide. This course takes you from zero to building polished, publication-ready interactive dashboards — covering everything from connecting data to mastering Level of Detail (LOD) expressions and publishing to Tableau Public.',
    outcomes: [
      'Connect to and prepare data within Tableau Desktop',
      'Build all major chart types using Tableau\'s marks card',
      'Write calculated fields and LOD expressions',
      'Design multi-sheet interactive dashboards with actions',
      'Use parameters and sets for advanced user interactivity',
      'Publish and embed dashboards to Tableau Public'
    ],
    modules: [
      { week: 1, title: 'Tableau Interface & Data Connection', topics: ['Tableau Desktop interface — shelves, cards, canvas and show me', 'Connecting to data — Excel, CSV, SQL Server, Google Sheets', 'Data interpreter and basic data cleaning in Tableau', 'Dimensions vs measures — discrete (blue) vs continuous (green)', 'Creating your first chart — the Show Me panel', 'Data types, geographic roles and date hierarchies'] },
      { week: 2, title: 'Chart Types & Marks', topics: ['Bar and line charts — when each applies', 'Scatter plots — identifying correlations and outliers', 'Maps — filled maps, symbol maps, geographic aggregation', 'Treemaps and packed bubbles — part-to-whole visualisation', 'Gantt charts and bullet graphs — schedule and performance', 'Dual-axis charts — combining two measure types'] },
      { week: 3, title: 'Calculations & LOD Expressions', topics: ['Calculated fields — arithmetic, string and date calculations', 'Aggregate vs row-level calculations', 'Table calculations — RUNNING_SUM, WINDOW_AVG, RANK, PERCENT OF TOTAL', 'Level of Detail (LOD) expressions — FIXED, INCLUDE, EXCLUDE', 'Use cases for LOD — customer first purchase date, cohort analysis', 'Quick table calculations and editing table calculation addressing'] },
      { week: 4, title: 'Dashboards & Stories', topics: ['Dashboard layout — tiled vs floating, padding and borders', 'Filter actions — clicking a mark filters other sheets', 'Highlight actions and URL actions', 'Dashboard device designer — phone, tablet and desktop layouts', 'Tableau Stories — guided narrative across multiple dashboard pages', 'Best practices: dashboard performance, reducing marks and extract usage'] },
      { week: 5, title: 'Advanced Features & Publishing', topics: ['Sets — fixed sets, dynamic sets and set actions', 'Parameters — replacing filters with user-controlled inputs', 'Reference lines, bands and distributions on axes', 'Tableau Prep basics — cleaning, joining and pivoting data visually', 'Publishing to Tableau Public — embedding in websites', 'Capstone: build a 3-sheet interactive business dashboard and publish it'] }
    ]
  },

  /* ══════════════ CLOUD & BI ══════════════ */

  'power-bi': {
    id: 'power-bi',
    title: 'Power BI',
    category: 'Cloud & BI',
    level: 'Intermediate',
    levelClass: 'li',
    icon: '📈',
    iconClass: 'ipbi',
    duration: '6 weeks',
    hours: '30 contact hours',
    tools: ['Power BI Desktop', 'Power Query', 'DAX Studio', 'Power BI Service', 'Microsoft Excel'],
    prereqs: 'Excel familiarity recommended but not mandatory. No programming experience required.',
    overview: 'Power BI is Microsoft\'s market-leading business intelligence platform. This course takes you from importing raw data through to publishing enterprise-grade interactive dashboards — covering Power Query data transformation, DAX calculations, data modelling and PL-300 certification preparation.',
    outcomes: [
      'Import and transform data from multiple sources with Power Query',
      'Build star-schema data models with proper relationships',
      'Write DAX measures — from SUM to complex time intelligence',
      'Design professional reports with a variety of visualisations',
      'Publish, share and apply row-level security in Power BI Service',
      'Prepare for the Microsoft PL-300 certification exam'
    ],
    modules: [
      { week: 1, title: 'Power BI Desktop & Data Import', topics: ['Power BI Desktop interface — Report, Data and Model views', 'Connecting to data — Excel, CSV, SQL, SharePoint, Web, APIs', 'Data types and column quality — errors, empty and distinct counts', 'Appending and merging queries — vertical and horizontal combinations', 'Query folding — when transformations push down to the source', 'Organising queries — folders, renaming and disabling load'] },
      { week: 2, title: 'Power Query — Data Transformation', topics: ['Applied steps — each transformation as a reversible step', 'Column transformations — split, replace, extract, format', 'Row transformations — filter, remove duplicates, keep top N', 'Pivot and unpivot — reshaping wide and narrow tables', 'Conditional columns and custom columns with M', 'Combining data — fuzzy merge for approximate matching'] },
      { week: 3, title: 'Data Modelling', topics: ['Fact tables vs dimension tables — the star schema pattern', 'Relationships — one-to-many, many-to-many and one-to-one', 'Cross-filter direction — single vs bidirectional; when to use each', 'The role of a date table — marking as date table, contiguous dates', 'Cardinality and relationship best practices', 'Hiding columns from report view for cleaner user experience'] },
      { week: 4, title: 'DAX Fundamentals', topics: ['Calculated columns vs measures — row context vs filter context', 'Basic aggregations — SUM, COUNT, AVERAGE, MIN, MAX, DISTINCTCOUNT', 'CALCULATE — the most important DAX function; modifying filter context', 'FILTER and ALL — adding and removing filters in calculations', 'IF, SWITCH and DIVIDE — conditional logic in DAX', 'Variables (VAR … RETURN) — readable, efficient DAX'] },
      { week: 5, title: 'Advanced DAX & Visualisations', topics: ['Time intelligence — TOTALYTD, DATEADD, SAMEPERIODLASTYEAR, DATESYTD', 'Running totals, period-over-period growth and rolling averages', 'RANKX — ranking measures with dynamic context', 'KPI cards, gauges, decomposition trees and key influencers visuals', 'Custom visuals from AppSource — charticulator, deneb (Vega-Lite)', 'Report formatting — themes, bookmarks, buttons and drill-through pages'] },
      { week: 6, title: 'Power BI Service & Certification Prep', topics: ['Publishing reports to Power BI Service — workspaces and apps', 'Scheduled data refresh — gateway setup for on-premises sources', 'Row-Level Security (RLS) — static and dynamic rules in DAX', 'Sharing and permissions — workspace roles, report sharing, embed codes', 'Power BI Dataflows — reusable data preparation across multiple reports', 'PL-300 exam topics review, practice questions and capstone project'] }
    ]
  },

  'azure': {
    id: 'azure',
    title: 'Microsoft Azure',
    category: 'Cloud & BI',
    level: 'Intermediate',
    levelClass: 'li',
    icon: '☁️',
    iconClass: 'iaz',
    duration: '8 weeks',
    hours: '40 contact hours',
    tools: ['Azure Portal', 'Azure CLI', 'Azure ML Studio', 'Azure Databricks', 'Azure Data Factory', 'Python SDK', 'Azure DevOps'],
    prereqs: 'Basic Python and SQL knowledge. No prior cloud experience required — we start from absolute fundamentals.',
    overview: 'Microsoft Azure is the cloud platform of choice for enterprises worldwide. This course takes you from cloud fundamentals to building and deploying ML models on Azure — covering storage, databases, Azure Machine Learning, Cognitive Services, Databricks and Data Factory, with AZ-900 and DP-900 certification preparation.',
    outcomes: [
      'Navigate the Azure Portal and manage core services confidently',
      'Store and query data using Azure Blob, SQL and Cosmos DB',
      'Train and deploy ML models using Azure Machine Learning',
      'Use Azure Cognitive Services for AI without training models',
      'Build ETL pipelines with Azure Data Factory',
      'Pass the AZ-900 and DP-900 Microsoft certification exams'
    ],
    modules: [
      { week: 1, title: 'Cloud Fundamentals & Azure Core', topics: ['What is cloud computing? IaaS, PaaS and SaaS explained', 'Azure regions, availability zones and paired regions', 'Azure Portal, Azure CLI and Azure Cloud Shell', 'Resource groups, subscriptions and management groups', 'Azure pricing — pay-as-you-go, reserved instances, spot', 'AZ-900 exam domain: cloud concepts and core architectural components'] },
      { week: 2, title: 'Azure Storage & Databases', topics: ['Azure Blob Storage — containers, blobs, access tiers (hot/cool/archive)', 'Azure Data Lake Storage Gen2 — hierarchical namespace for big data', 'Azure SQL Database — managed relational database, elastic pools', 'Azure Cosmos DB — globally distributed, multi-API NoSQL', 'Azure Table Storage and Queue Storage — lightweight structured data', 'Connecting to storage from Python — azure-storage-blob SDK'] },
      { week: 3, title: 'Azure Machine Learning', topics: ['Azure ML workspace — components: compute, datasets, experiments, models', 'Compute targets — compute clusters, compute instances, AKS', 'Azure ML Studio — visual designer for no-code ML', 'AutoML — automated model selection and hyperparameter tuning', 'Running Python experiments with the Azure ML SDK v2', 'Registering datasets and models in the model registry'] },
      { week: 4, title: 'Azure AI Services (Cognitive Services)', topics: ['Computer Vision — image analysis, OCR, spatial analysis', 'Language Service — sentiment, key phrase extraction, NER, translation', 'Speech Service — speech-to-text, text-to-speech, speaker recognition', 'Form Recognizer — extracting structured data from documents and forms', 'Azure OpenAI Service — GPT-4, DALL-E and Whisper via Azure', 'Building a document intelligence solution with Cognitive Services'] },
      { week: 5, title: 'Azure Databricks', topics: ['What is Apache Spark? Why Databricks?', 'Azure Databricks workspace — clusters, notebooks, repos', 'PySpark fundamentals — DataFrames, transformations and actions', 'Delta Lake — ACID transactions, time travel, schema enforcement', 'Reading from and writing to Azure Data Lake Storage', 'MLflow on Databricks — native experiment tracking and model serving'] },
      { week: 6, title: 'Azure Data Factory', topics: ['ADF concepts — pipelines, activities, datasets, linked services, triggers', 'Copy activity — moving data between 90+ connectors', 'Data Flow — visual ETL with Spark under the hood', 'Parameterisation — building dynamic, reusable pipelines', 'Monitoring and debugging — activity runs, pipeline runs', 'Orchestrating ML pipelines — triggering Azure ML training from ADF'] },
      { week: 7, title: 'Azure DevOps for ML (MLOps on Azure)', topics: ['Azure Repos — Git hosting inside Azure DevOps', 'Azure Pipelines — YAML-based CI/CD for ML code', 'Build pipeline — lint, test, package and build Docker image', 'Release pipeline — deploy model endpoint with approvals', 'Azure Container Registry (ACR) for Docker image storage', 'Monitoring deployed models — Application Insights integration'] },
      { week: 8, title: 'Certification Prep & Capstone', topics: ['AZ-900 domain review — security, governance, identity (Entra ID)', 'DP-900 domain review — analytics workloads, storage, data processing', 'Practice exam walkthrough and question analysis', 'Capstone project: end-to-end data pipeline — ingest in ADF → process in Databricks → train in Azure ML → serve via managed endpoint', 'Portfolio packaging — architecture diagram and deployment documentation', 'Exam booking guidance and last-mile preparation tips'] }
    ]
  },

  'aws': {
    id: 'aws',
    title: 'AWS for Data Science',
    category: 'Cloud & BI',
    level: 'Intermediate',
    levelClass: 'li',
    icon: '🟠',
    iconClass: 'ir',
    duration: '8 weeks',
    hours: '40 contact hours',
    tools: ['AWS Management Console', 'AWS CLI', 'AWS SageMaker', 'S3', 'Lambda', 'Glue', 'Athena', 'Redshift', 'Python (boto3)'],
    prereqs: 'Basic Python and SQL. No prior cloud experience needed — core AWS concepts taught from scratch.',
    overview: 'AWS is the world\'s largest cloud platform with the most comprehensive set of AI and data services. This course equips you to architect, build and deploy data science solutions on AWS — covering storage, compute, data engineering services, SageMaker for ML, and CLF-C02 Cloud Practitioner certification preparation.',
    outcomes: [
      'Navigate the AWS Console and manage core services with the CLI',
      'Build a scalable data lake architecture on S3',
      'Run serverless data transformation with AWS Glue and Athena',
      'Train and deploy ML models with Amazon SageMaker',
      'Build event-driven ML pipelines with Lambda and Step Functions',
      'Pass the AWS Certified Cloud Practitioner (CLF-C02) exam'
    ],
    modules: [
      { week: 1, title: 'AWS Fundamentals & IAM', topics: ['AWS Global Infrastructure — regions, availability zones, edge locations', 'AWS Management Console and AWS CLI setup', 'IAM — users, groups, roles, policies and the principle of least privilege', 'AWS Free Tier — what is free and what costs money', 'Billing and Cost Management — budgets and alerts', 'CLF-C02 domain: cloud concepts, security, pricing and support'] },
      { week: 2, title: 'S3 & Data Lake Architecture', topics: ['S3 concepts — buckets, objects, keys, regions and storage classes', 'S3 storage classes — Standard, Intelligent-Tiering, IA, Glacier, Deep Archive', 'S3 lifecycle policies — automatic cost optimisation', 'S3 data lake architecture — raw, processed and curated zones', 'S3 access control — bucket policies, ACLs, pre-signed URLs', 'Versioning and cross-region replication for disaster recovery'] },
      { week: 3, title: 'Compute & Networking', topics: ['EC2 — instance types, AMIs, key pairs, security groups', 'EC2 purchasing options — on-demand, reserved, spot, savings plans', 'VPC — subnets, route tables, internet gateways, NAT gateways', 'AWS Lambda — serverless functions, triggers, layers and concurrency', 'ECS and Fargate — running Docker containers serverlessly', 'boto3 — the AWS Python SDK for programmatic access'] },
      { week: 4, title: 'AWS Data Services', topics: ['RDS — managed relational databases (PostgreSQL, MySQL, Aurora)', 'DynamoDB — serverless NoSQL, partition keys, GSIs, streams', 'Amazon Redshift — cloud data warehouse, columnar storage, COPY command', 'AWS Glue — serverless ETL, crawlers, Data Catalog, Glue Studio', 'Amazon Athena — serverless SQL queries directly on S3 with Presto', 'Kinesis — real-time streaming data ingestion and processing'] },
      { week: 5, title: 'SageMaker Fundamentals', topics: ['SageMaker overview — the end-to-end ML platform on AWS', 'SageMaker Studio — integrated IDE for ML development', 'SageMaker Notebooks — managed Jupyter instances with GPU', 'Built-in algorithms — XGBoost, Linear Learner, BlazingText, DeepAR', 'Bringing your own script — PyTorch and Scikit-learn estimators', 'Training jobs — instance types, hyperparameters, output artifacts'] },
      { week: 6, title: 'SageMaker Advanced', topics: ['SageMaker Pipelines — defining ML workflows as DAGs', 'SageMaker Feature Store — centralised feature management', 'SageMaker Model Monitor — detecting data drift and model degradation', 'Real-time endpoints — deploying and invoking SageMaker endpoints', 'Batch transform — cost-efficient asynchronous predictions', 'SageMaker Experiments and Model Registry — tracking and governance'] },
      { week: 7, title: 'Data Pipelines & Orchestration on AWS', topics: ['AWS Step Functions — visual workflow orchestration for ML pipelines', 'EventBridge — event-driven triggers (S3 upload → training job)', 'AWS Glue DataBrew — visual data preparation without code', 'Amazon EMR — managed Hadoop/Spark for large-scale data processing', 'AWS Data Pipeline (legacy) vs Step Functions vs MWAA (Airflow)', 'Building a complete automated retraining pipeline: S3 → Glue → SageMaker → endpoint update'] },
      { week: 8, title: 'Certification Prep & Capstone', topics: ['CLF-C02 exam domains — cloud concepts, security, technology, billing', 'Practice exam walkthrough — 50 questions with explanations', 'AWS Well-Architected Framework — operational excellence, security, reliability', 'Capstone: deploy a full ML pipeline — data ingestion (Kinesis) → processing (Glue) → training (SageMaker) → serving (Lambda + API Gateway)', 'Architecture diagram and cost estimation exercise', 'Exam booking guide and study plan for the last week'] }
    ]
  }

};

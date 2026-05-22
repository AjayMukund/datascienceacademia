(function(){
'use strict';
window.DSA_LESSON_CONTENT = window.DSA_LESSON_CONTENT || {};
const L = window.DSA_LESSON_CONTENT;

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 1 — ML FOUNDATIONS
══════════════════════════════════════════════════════════════════════════ */

L['ml-w1-l1'] = {
  duration_mins: 15,
  sections: [
    { type: 'text', body: `
<h2>What is Machine Learning?</h2>
<p>Machine learning is the field of study that gives computers the ability to learn from experience without being explicitly programmed for every situation. Instead of writing thousands of hand-crafted rules, you feed a model examples and it discovers the patterns itself.</p>
<p>Arthur Samuel coined the term in 1959. The core idea has been around for decades, but what changed in the 2010s was scale — enough data to train deep models, enough compute to run them in reasonable time, and open-source libraries that made the techniques accessible to any programmer.</p>

<h3>The three paradigms</h3>
<p><strong>Supervised learning</strong> — You provide labelled examples: input features and the correct output. The model learns to map inputs to outputs. At prediction time, you feed it new inputs and it predicts the output. Examples: predicting house prices (regression), classifying emails as spam or not (classification).</p>
<p><strong>Unsupervised learning</strong> — No labels. The model finds structure in the data on its own. Examples: grouping customers into segments (clustering), compressing high-dimensional data for visualisation (dimensionality reduction), detecting anomalies without knowing what an anomaly looks like.</p>
<p><strong>Reinforcement learning</strong> — An agent takes actions in an environment, receives rewards or penalties, and learns a policy that maximises cumulative reward. Used in game-playing AIs, robot control, and recommendation systems. Not covered in this course but you'll encounter it later in the programme.</p>

<h3>Supervised learning in depth</h3>
<p>Within supervised learning, there are two main flavours:</p>
<ul>
  <li><strong>Regression</strong> — The output is a continuous number. Predicting tomorrow's temperature, estimating a loan default probability score, forecasting next month's revenue.</li>
  <li><strong>Classification</strong> — The output is a category. Binary classification has two classes (fraud / not fraud); multiclass has more (which of 10 diseases does this patient have?).</li>
</ul>
<p>The boundary between regression and classification is not always sharp. A logistic regression model outputs a probability (continuous) that you threshold into a class (categorical).</p>

<h3>When should you use ML?</h3>
<p>ML is powerful but not always the right tool. Use it when:</p>
<ul>
  <li>The pattern is too complex for hand-written rules (image recognition, language understanding)</li>
  <li>The rules change over time (fraud patterns evolve; you can retrain a model)</li>
  <li>You have enough labelled data to learn from</li>
</ul>
<p>Don't use ML when a simple rule or lookup table works fine, when you have very little data, or when interpretability is legally required and you can't explain the model's decisions.</p>
` },
    { type: 'tip', body: `Before reaching for a neural network, always ask: "Would a 10-line if-statement solve this?" Many business problems that get framed as ML tasks are perfectly solvable with a simple threshold rule. Start simple; add complexity only when simpler approaches fail.` },
    { type: 'exercise', title: 'Classify the Problem Type', body: `<p>For each scenario, identify: (a) supervised or unsupervised? (b) if supervised — regression or classification?</p>
<ol>
  <li>Predict whether a credit card transaction is fraudulent.</li>
  <li>Estimate the resale price of a used car given its age, mileage, and brand.</li>
  <li>Group news articles into topics without predefined categories.</li>
  <li>Identify which of 50 plant species is shown in a photo.</li>
  <li>Detect unusual patterns in server logs without labelled anomalies.</li>
</ol>`,
    hint: `Do you have labels (correct answers) in your training data? If yes → supervised. Is the output a number or a category?`,
    solution: `1. Supervised — Binary classification (fraud / not fraud)\n2. Supervised — Regression (continuous price)\n3. Unsupervised — Clustering\n4. Supervised — Multiclass classification (50 classes)\n5. Unsupervised — Anomaly detection` }
  ]
};

L['ml-w1-l2'] = {
  duration_mins: 16,
  sections: [
    { type: 'text', body: `
<h2>The ML Workflow & Data Splits</h2>
<p>Every ML project follows a sequence of steps that mirrors the scientific method: form a hypothesis (choose a model family), design an experiment (split data, choose metrics), run it (train), and evaluate objectively (test). The mechanics of this process — particularly how you split your data — determine whether your results are trustworthy.</p>

<h3>Train / Validation / Test splits</h3>
<p>The fundamental rule of ML evaluation: <strong>never evaluate a model on data it was trained on</strong>. A model that memorises training data will score perfectly but fail completely on new data — this is overfitting.</p>
<ul>
  <li><strong>Training set</strong> (~60–70%) — The data the model learns from. Parameters are updated on this data.</li>
  <li><strong>Validation set</strong> (~15–20%) — Used to compare models and tune hyperparameters during development. The model doesn't train on this, but you implicitly optimise for it by selecting models based on it.</li>
  <li><strong>Test set</strong> (~15–20%) — Locked away until the very end. Used exactly once to report final performance. If you evaluate on the test set multiple times and pick the best result, you've leaked information and your reported metric is optimistic.</li>
</ul>

<h3>Cross-validation</h3>
<p>When data is limited, a single train/val split wastes data and produces high-variance estimates. <strong>K-fold cross-validation</strong> solves this by rotating which fold is used for validation: you train K times on K-1 folds and validate on the held-out fold, then average the K scores. 5-fold and 10-fold are standard choices.</p>
<p><strong>Stratified K-fold</strong> ensures each fold has the same class proportions as the full dataset — essential for imbalanced classification problems.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import pandas as pd
from sklearn.model_selection import (train_test_split, KFold,
                                      StratifiedKFold, cross_val_score)
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_breast_cancer

# Load a real classification dataset
data = load_breast_cancer()
X, y = data.data, data.target
print(f"Dataset: {X.shape[0]} samples, {X.shape[1]} features")
print(f"Class balance: {np.bincount(y)}")  # [malignant, benign]

# ── Simple train/test split ────────────────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y      # preserve class proportions
)
print(f"\nTrain: {X_train.shape[0]} | Test: {X_test.shape[0]}")

# ── Train/Val/Test split ───────────────────────────────────────────────
X_temp, X_test2, y_temp, y_test2 = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y)
X_train2, X_val, y_train2, y_val = train_test_split(
    X_temp, y_temp, test_size=0.25, random_state=42, stratify=y_temp)
# 0.25 of 0.8 = 0.2 of total → 60/20/20 split
print(f"Train/Val/Test: {X_train2.shape[0]}/{X_val.shape[0]}/{X_test2.shape[0]}")

# ── K-Fold cross-validation ────────────────────────────────────────────
model = LogisticRegression(max_iter=10000)
cv_scores = cross_val_score(model, X_train, y_train,
                             cv=StratifiedKFold(n_splits=5, shuffle=True, random_state=42),
                             scoring='accuracy')
print(f"\n5-Fold CV Accuracy: {cv_scores}")
print(f"Mean: {cv_scores.mean():.4f}  Std: {cv_scores.std():.4f}")
# Low std = stable model; high std = model sensitive to which data it sees` },
    { type: 'warn', body: `<strong>Data leakage</strong> is the silent killer of ML projects. It occurs when information from the test set influences training — through preprocessing fitted on all data, through target encoding without cross-validation, or through lookahead in time-series problems. Always fit your preprocessing (scalers, imputers, encoders) only on the training set.` },
    { type: 'exercise', title: 'Detect & Fix Data Leakage', body: `<p>The code below contains a data leakage bug — the scaler is fitted on the full dataset before splitting. Fix it, then compare the (inflated) leaked accuracy vs the correct accuracy. Finally, demonstrate that <code>cross_val_score</code> with a <code>Pipeline</code> is immune to this class of bug.</p>
<pre style="background:rgba(255,255,255,.05);padding:.75rem;border-radius:6px;font-size:.82rem;font-family:monospace">from sklearn.datasets import load_breast_cancer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

data = load_breast_cancer()
X, y = data.data, data.target

# ⚠ BUG: scaler fitted on full X before split
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)           # ← leakage here!
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)
print(f"Leaked accuracy: {model.score(X_test, y_test):.4f}")</pre>`,
    hint: `Fix by splitting FIRST, then fitting the scaler on X_train only. Use <code>scaler.fit_transform(X_train)</code> and <code>scaler.transform(X_test)</code>. For the Pipeline version: wrap scaler + model in <code>Pipeline([('scaler', StandardScaler()), ('model', LogisticRegression())])</code> and call <code>cross_val_score</code>.`,
    solution: `from sklearn.datasets import load_breast_cancer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.pipeline import Pipeline

data = load_breast_cancer()
X, y = data.data, data.target

# ✓ FIXED: split first, scale second
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)   # fit only on train
X_test_s  = scaler.transform(X_test)        # transform test with train stats
model = LogisticRegression(max_iter=1000)
model.fit(X_train_s, y_train)
print(f"Correct accuracy: {model.score(X_test_s, y_test):.4f}")

# ✓ Pipeline: leakage-immune by construction
pipe = Pipeline([('scaler', StandardScaler()), ('model', LogisticRegression(max_iter=1000))])
cv_scores = cross_val_score(pipe, X, y, cv=5, scoring='accuracy')
print(f"Pipeline 5-fold CV: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")` }
  ]
};

L['ml-w1-l3'] = {
  duration_mins: 16,
  sections: [
    { type: 'text', body: `
<h2>Data Preprocessing for ML</h2>
<p>Most ML algorithms are sensitive to the scale, encoding, and completeness of their input features. Raw data almost never goes straight into a model. This lesson covers the three essential preprocessing steps: <strong>scaling</strong>, <strong>encoding</strong>, and building a <strong>sklearn Pipeline</strong> to apply them correctly.</p>

<h3>Feature scaling</h3>
<p><strong>StandardScaler</strong> (z-score normalisation) — Subtracts the mean and divides by the standard deviation. Each feature has mean 0 and std 1 after scaling. Best default choice for algorithms that assume Gaussian inputs (logistic regression, SVM, PCA).</p>
<p><strong>MinMaxScaler</strong> — Scales each feature to [0, 1]. Preserves zero values. Good for neural networks and when you need bounded outputs.</p>
<p><strong>RobustScaler</strong> — Uses median and IQR instead of mean and std. Resistant to outliers. Use when your data has many extreme values.</p>
<p>Tree-based models (decision trees, random forests, gradient boosting) are invariant to monotonic scaling — you don't need to scale for them.</p>

<h3>Encoding categorical features</h3>
<p><strong>One-Hot Encoding</strong> — Creates a binary column for each category. Correct for nominal (unordered) features. Use <code>drop='first'</code> to avoid perfect multicollinearity with linear models.</p>
<p><strong>Ordinal Encoding</strong> — Maps categories to integers preserving their order. Correct for ordinal features (small / medium / large → 0 / 1 / 2).</p>
<p><strong>Target Encoding</strong> — Replaces each category with the mean target value for that category. Powerful for high-cardinality features but must be applied inside cross-validation folds to avoid leakage.</p>
` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder, OrdinalEncoder
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.datasets import fetch_openml

# ── Build a realistic mixed-type DataFrame ─────────────────────────────
np.random.seed(42)
n = 400
df = pd.DataFrame({
    'age':        np.random.normal(35, 10, n).clip(18, 70).round(0),
    'income':     np.random.lognormal(10.8, 0.6, n).round(-2),
    'experience': np.random.randint(0, 20, n),
    'city':       np.random.choice(['Mumbai','Delhi','Bangalore','Chennai'], n),
    'education':  np.random.choice(['High School','Bachelor','Master','PhD'], n,
                                    p=[0.3, 0.4, 0.2, 0.1]),
    'churn':      np.random.choice([0, 1], n, p=[0.75, 0.25])
})
# Inject some missing values
df.loc[np.random.choice(n, 20, replace=False), 'income'] = np.nan
df.loc[np.random.choice(n, 10, replace=False), 'city']   = np.nan

X = df.drop('churn', axis=1)
y = df['churn']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2,
                                                      random_state=42, stratify=y)

# ── Define column groups ───────────────────────────────────────────────
numeric_features     = ['age', 'income', 'experience']
nominal_features     = ['city']
ordinal_features     = ['education']
ordinal_categories   = [['High School', 'Bachelor', 'Master', 'PhD']]

# ── Build the ColumnTransformer ────────────────────────────────────────
numeric_transformer = Pipeline([
    ('impute', SimpleImputer(strategy='median')),
    ('scale',  StandardScaler()),
])
nominal_transformer = Pipeline([
    ('impute',  SimpleImputer(strategy='most_frequent')),
    ('onehot',  OneHotEncoder(drop='first', handle_unknown='ignore')),
])
ordinal_transformer = Pipeline([
    ('ordinal', OrdinalEncoder(categories=ordinal_categories)),
])

preprocessor = ColumnTransformer([
    ('num', numeric_transformer,  numeric_features),
    ('nom', nominal_transformer,  nominal_features),
    ('ord', ordinal_transformer,  ordinal_features),
])

# ── Assemble the full pipeline ─────────────────────────────────────────
pipeline = Pipeline([
    ('prep',  preprocessor),
    ('model', LogisticRegression(max_iter=1000, random_state=42)),
])

# ── Fit, evaluate ──────────────────────────────────────────────────────
pipeline.fit(X_train, y_train)
print(f"Test accuracy: {pipeline.score(X_test, y_test):.4f}")

cv = cross_val_score(pipeline, X, y, cv=5, scoring='roc_auc')
print(f"5-Fold ROC-AUC: {cv.mean():.4f} ± {cv.std():.4f}")
# Everything inside the pipeline — preprocessing is refitted each fold` },
    { type: 'tip', body: `Always use <code>sklearn.pipeline.Pipeline</code> in production code. It eliminates an entire category of bugs (preprocessing fitted on test data), makes cross-validation correct by default, and lets you save the entire preprocessing + model chain as a single serialised object.` },
    { type: 'exercise', title: 'Build a Mixed-Type Preprocessing Pipeline', body: `<p>Using the Titanic dataset (<code>sns.load_dataset('titanic')</code>), build a complete preprocessing + classification pipeline:</p>
<ol>
<li>Select these features: <code>pclass</code>, <code>sex</code>, <code>age</code>, <code>fare</code>, <code>embarked</code>, <code>sibsp</code>, <code>parch</code></li>
<li>Numeric features (<code>age</code>, <code>fare</code>, <code>sibsp</code>, <code>parch</code>): impute median, then StandardScale</li>
<li>Categorical features (<code>sex</code>, <code>embarked</code>): impute most_frequent, then OneHotEncode</li>
<li>Ordinal feature (<code>pclass</code>): leave as-is (tree handles it) or ordinal-encode</li>
<li>Classifier: <code>RandomForestClassifier(n_estimators=200, random_state=42)</code></li>
<li>Evaluate with 5-fold stratified CV, reporting accuracy and ROC-AUC</li>
</ol>`,
    hint: `<code>sns.load_dataset('titanic')</code> returns a DataFrame. Drop rows where 'survived' is null. Use <code>ColumnTransformer</code> with <code>remainder='drop'</code> to ignore any extra columns. Evaluate with <code>cross_val_score(pipe, X, y, cv=StratifiedKFold(5), scoring='roc_auc')</code>.`,
    solution: `import seaborn as sns
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score, StratifiedKFold

titanic = sns.load_dataset('titanic').dropna(subset=['survived'])
features = ['pclass','sex','age','fare','embarked','sibsp','parch']
X = titanic[features]; y = titanic['survived']

num_features = ['age','fare','sibsp','parch']
cat_features = ['sex','embarked','pclass']

preprocessor = ColumnTransformer([
    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),
                      ('sc',  StandardScaler())]), num_features),
    ('cat', Pipeline([('imp', SimpleImputer(strategy='most_frequent')),
                      ('ohe', OneHotEncoder(handle_unknown='ignore'))]), cat_features),
])

pipe = Pipeline([('prep', preprocessor),
                 ('clf',  RandomForestClassifier(n_estimators=200, random_state=42))])

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
acc = cross_val_score(pipe, X, y, cv=cv, scoring='accuracy')
auc = cross_val_score(pipe, X, y, cv=cv, scoring='roc_auc')
print(f"Accuracy: {acc.mean():.4f} ± {acc.std():.4f}")
print(f"ROC-AUC:  {auc.mean():.4f} ± {auc.std():.4f}")` }
  ]
};

L['ml-w1-l4'] = {
  duration_mins: 17,
  sections: [
    { type: 'text', body: `
<h2>Evaluation Metrics</h2>
<p>Choosing the wrong metric is one of the most common ways ML projects fail in practice. A model that maximises accuracy on a dataset where 99% of transactions are legitimate will learn to predict "not fraud" for everything and score 99% accuracy — while catching zero fraudsters. The metric must reflect the business objective.</p>

<h3>Regression metrics</h3>
<p><strong>MAE (Mean Absolute Error)</strong> — Average of |predicted − actual|. Intuitive (in the same units as the target). Treats all errors equally regardless of magnitude. Use when large errors are not disproportionately costly.</p>
<p><strong>RMSE (Root Mean Squared Error)</strong> — Square root of the average squared error. Penalises large errors more heavily than MAE. Use when big mistakes are especially costly (e.g., predicting drug dosages).</p>
<p><strong>R² (Coefficient of Determination)</strong> — Fraction of variance in the target explained by the model. R² = 1 is a perfect fit; R² = 0 means the model is no better than always predicting the mean; R² can be negative (model is worse than the mean). Useful for comparing models across different datasets.</p>

<h3>Classification metrics</h3>
<p>Start with the confusion matrix: TN (true negatives), FP (false positives), FN (false negatives), TP (true positives).</p>
<p><strong>Accuracy</strong> = (TP + TN) / all. Misleading on imbalanced datasets.</p>
<p><strong>Precision</strong> = TP / (TP + FP). "Of all the things I flagged as positive, how many actually were?" Optimise when false positives are costly (spam filter — you don't want to flag real emails).</p>
<p><strong>Recall (Sensitivity)</strong> = TP / (TP + FN). "Of all the actual positives, how many did I catch?" Optimise when false negatives are costly (cancer screening — you don't want to miss real cases).</p>
<p><strong>F1 Score</strong> = 2 × (Precision × Recall) / (Precision + Recall). Harmonic mean of precision and recall. Good single number when both matter.</p>
<p><strong>ROC-AUC</strong> — Area under the Receiver Operating Characteristic curve. Measures rank-ordering ability across all possible thresholds. 0.5 = random; 1.0 = perfect. Threshold-independent and robust to class imbalance.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (
    mean_absolute_error, mean_squared_error, r2_score,
    accuracy_score, precision_score, recall_score,
    f1_score, roc_auc_score, confusion_matrix,
    classification_report, ConfusionMatrixDisplay
)
import matplotlib.pyplot as plt

# ── Regression metrics demo ────────────────────────────────────────────
np.random.seed(42)
y_true_reg  = np.array([3.0, -0.5, 2.0, 7.0, 4.5])
y_pred_reg  = np.array([2.5, 0.0,  2.1, 7.8, 3.9])

print("=== REGRESSION METRICS ===")
print(f"MAE  : {mean_absolute_error(y_true_reg, y_pred_reg):.4f}")
print(f"RMSE : {mean_squared_error(y_true_reg, y_pred_reg, squared=False):.4f}")
print(f"R²   : {r2_score(y_true_reg, y_pred_reg):.4f}")

# ── Classification metrics demo ────────────────────────────────────────
data = load_breast_cancer()
X, y = data.data, data.target

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)

scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s  = scaler.transform(X_test)

model = LogisticRegression(max_iter=10000)
model.fit(X_train_s, y_train)
y_pred = model.predict(X_test_s)
y_prob = model.predict_proba(X_test_s)[:, 1]

print("\n=== CLASSIFICATION METRICS ===")
print(f"Accuracy  : {accuracy_score(y_test, y_pred):.4f}")
print(f"Precision : {precision_score(y_test, y_pred):.4f}")
print(f"Recall    : {recall_score(y_test, y_pred):.4f}")
print(f"F1 Score  : {f1_score(y_test, y_pred):.4f}")
print(f"ROC-AUC   : {roc_auc_score(y_test, y_prob):.4f}")

print("\nFull report:")
print(classification_report(y_test, y_pred,
                             target_names=data.target_names))

# Confusion matrix
fig, ax = plt.subplots(figsize=(5, 4))
ConfusionMatrixDisplay.from_predictions(
    y_test, y_pred,
    display_labels=data.target_names,
    cmap='Blues', ax=ax)
ax.set_title('Confusion Matrix')
plt.tight_layout(); plt.show()` },
    { type: 'warn', body: `Never pick your final evaluation metric after seeing the results. Decide on it during problem framing, before you train a single model. Changing the metric post-hoc to make results look better is p-hacking and leads to models that don't perform in production.` },
    { type: 'exercise', title: 'Metric Sensitivity Analysis', body: `<p>The metric you choose changes which model you select. Use the breast cancer dataset to demonstrate this:</p>
<ol>
<li>Train three models: Logistic Regression, Decision Tree (max_depth=5), and a dummy classifier that always predicts the majority class</li>
<li>For each model, compute: Accuracy, Precision, Recall, F1, ROC-AUC on the test set</li>
<li>Rank the three models by each metric — does the ranking change? Which metric would you choose for a cancer screening tool (and why)?</li>
<li>Find the probability threshold that maximises F1 for Logistic Regression (hint: iterate thresholds 0.1 to 0.9 in steps of 0.05)</li>
</ol>`,
    hint: `Use <code>model.predict_proba(X_test)[:, 1] >= threshold</code> to apply a custom threshold. For the dummy classifier: <code>from sklearn.dummy import DummyClassifier; DummyClassifier(strategy='most_frequent')</code>.`,
    solution: `from sklearn.datasets import load_breast_cancer
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.dummy import DummyClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
import numpy as np, pandas as pd

data = load_breast_cancer(); X, y = data.data, data.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
sc = StandardScaler(); X_tr_s = sc.fit_transform(X_train); X_te_s = sc.transform(X_test)

models = {'LogReg': LogisticRegression(max_iter=10000).fit(X_tr_s, y_train),
          'Tree':   DecisionTreeClassifier(max_depth=5, random_state=42).fit(X_train, y_train),
          'Dummy':  DummyClassifier(strategy='most_frequent').fit(X_train, y_train)}

results = {}
for name, m in models.items():
    Xt = X_te_s if name == 'LogReg' else X_test
    yp = m.predict(Xt)
    ypr = m.predict_proba(Xt)[:, 1] if hasattr(m, 'predict_proba') else yp
    results[name] = {'Accuracy': accuracy_score(y_test, yp),
                     'Precision': precision_score(y_test, yp),
                     'Recall': recall_score(y_test, yp),
                     'F1': f1_score(y_test, yp),
                     'ROC-AUC': roc_auc_score(y_test, ypr)}
print(pd.DataFrame(results).T.round(4))

# Threshold search for best F1
lr = models['LogReg']; probs = lr.predict_proba(X_te_s)[:, 1]
best_t, best_f1 = 0.5, 0.0
for t in np.arange(0.1, 0.95, 0.05):
    f1 = f1_score(y_test, (probs >= t).astype(int))
    if f1 > best_f1: best_t, best_f1 = t, f1
print(f"Best threshold: {best_t:.2f}  F1: {best_f1:.4f}")` }
  ]
};

L['ml-w1-l5'] = {
  duration_mins: 16,
  sections: [
    { type: 'text', body: `
<h2>Your First ML Model End-to-End</h2>
<p>Theory only sticks when you've written the code yourself. In this lesson we build a complete, end-to-end ML pipeline from raw data to a saved model — covering every step of the workflow in one place. The dataset is a real housing price regression problem.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib

# ── Step 1: Load data ──────────────────────────────────────────────────
housing = fetch_california_housing(as_frame=True)
df = housing.frame
print(f"Shape: {df.shape}")
print(df.describe().round(2))

# ── Step 2: EDA — quick look ───────────────────────────────────────────
print("\nCorrelation with target (MedHouseVal):")
print(df.corr()['MedHouseVal'].sort_values(ascending=False).round(3))

# ── Step 3: Feature engineering ───────────────────────────────────────
df['rooms_per_household']    = df['AveRooms']    / df['AveOccup'].clip(lower=1)
df['bedrooms_per_room']      = df['AveBedrms']   / df['AveRooms'].clip(lower=1)
df['population_per_household']= df['Population'] / df['AveOccup'].clip(lower=1)

feature_cols = ['MedInc','HouseAge','AveRooms','AveBedrms',
                'Population','AveOccup','Latitude','Longitude',
                'rooms_per_household','bedrooms_per_room','population_per_household']
X = df[feature_cols]
y = df['MedHouseVal']

# ── Step 4: Split ──────────────────────────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# ── Step 5: Preprocess ────────────────────────────────────────────────
scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s  = scaler.transform(X_test)

# ── Step 6: Train and evaluate ─────────────────────────────────────────
models = {
    'Linear Regression': LinearRegression(),
    'Ridge (α=1)':       Ridge(alpha=1.0),
    'Ridge (α=10)':      Ridge(alpha=10.0),
}

results = {}
for name, model in models.items():
    cv_r2 = cross_val_score(model, X_train_s, y_train, cv=5, scoring='r2')
    model.fit(X_train_s, y_train)
    y_pred = model.predict(X_test_s)
    results[name] = {
        'CV R² (mean)': cv_r2.mean().round(4),
        'CV R² (std)':  cv_r2.std().round(4),
        'Test MAE':     mean_absolute_error(y_test, y_pred).round(4),
        'Test RMSE':    mean_squared_error(y_test, y_pred, squared=False).round(4),
        'Test R²':      r2_score(y_test, y_pred).round(4),
    }

print(pd.DataFrame(results).T.to_string())

# ── Step 7: Analyse residuals ──────────────────────────────────────────
best_model = Ridge(alpha=1.0)
best_model.fit(X_train_s, y_train)
y_pred_final = best_model.predict(X_test_s)
residuals = y_test - y_pred_final

fig, axes = plt.subplots(1, 2, figsize=(12, 4))
axes[0].scatter(y_pred_final, residuals, alpha=0.3, s=10)
axes[0].axhline(0, color='red', linestyle='--')
axes[0].set_xlabel('Predicted Value')
axes[0].set_ylabel('Residual')
axes[0].set_title('Residuals vs Predicted — should be random around 0')

axes[1].hist(residuals, bins=50, edgecolor='white', linewidth=0.3, color='steelblue')
axes[1].set_xlabel('Residual')
axes[1].set_title('Residual Distribution — should be roughly normal')
plt.tight_layout(); plt.show()

# ── Step 8: Save the model ─────────────────────────────────────────────
import joblib
joblib.dump({'scaler': scaler, 'model': best_model,
             'features': feature_cols}, 'housing_model.pkl')
print("Model saved to housing_model.pkl")

# Load and use it later
artefact = joblib.load('housing_model.pkl')
sample = X_test.iloc[:3]
sample_scaled = artefact['scaler'].transform(sample)
print("Predictions on 3 samples:", artefact['model'].predict(sample_scaled).round(2))
print("Actual values:           ", y_test.iloc[:3].values.round(2))` },
    { type: 'exercise', title: 'Improve the Pipeline', body: `<p>The model above uses Ridge regression. Try replacing it with <code>sklearn.ensemble.RandomForestRegressor(n_estimators=100, random_state=42)</code>. Note: Random Forests don't require scaling. Does it improve RMSE and R²? What are the top 5 most important features?</p>`,
    hint: `<p>Use <code>model.feature_importances_</code> and pair with <code>feature_cols</code> to make a bar chart. Skip the StandardScaler step — pass raw <code>X_train</code> directly.</p>`,
    solution: `from sklearn.ensemble import RandomForestRegressor\nrf = RandomForestRegressor(n_estimators=100, random_state=42)\nrf.fit(X_train, y_train)\ny_pred_rf = rf.predict(X_test)\nprint(f"RF RMSE: {mean_squared_error(y_test,y_pred_rf,squared=False):.4f}")\nprint(f"RF R²  : {r2_score(y_test,y_pred_rf):.4f}")\nimportances = pd.Series(rf.feature_importances_, index=feature_cols).nlargest(5)\nprint(importances)` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 2 — LINEAR MODELS
══════════════════════════════════════════════════════════════════════════ */

L['ml-w2-l1'] = {
  duration_mins: 16,
  sections: [
    { type: 'text', body: `
<h2>Linear Regression — Theory & Intuition</h2>
<p>Linear regression is the bedrock of supervised learning. Despite its simplicity, it remains one of the most widely used models in production — in finance, economics, healthcare, and marketing. Understanding it deeply gives you the vocabulary and intuition for every more complex model you'll encounter.</p>
<h3>The model</h3>
<p>Linear regression assumes the target y is a linear combination of input features plus noise:</p>
<p style="font-family:monospace;background:rgba(200,169,110,.08);padding:.5rem 1rem;border-radius:4px;">ŷ = β₀ + β₁x₁ + β₂x₂ + … + βₙxₙ</p>
<p>β₀ is the intercept; β₁…βₙ are coefficients — the change in ŷ for a one-unit increase in xᵢ, all other features held constant.</p>
<h3>Ordinary Least Squares (OLS)</h3>
<p>OLS chooses coefficients that minimise the <strong>Residual Sum of Squares</strong>: RSS = Σ(yᵢ − ŷᵢ)². The closed-form solution β = (XᵀX)⁻¹Xᵀy is fast for small datasets; sklearn uses numerically stable decompositions for large ones.</p>
<h3>Gauss-Markov assumptions</h3>
<ol>
  <li><strong>Linearity</strong> — Relationship between features and target is linear.</li>
  <li><strong>Independence</strong> — Residuals are independent of each other.</li>
  <li><strong>Homoscedasticity</strong> — Residuals have constant variance (no "fanning out").</li>
  <li><strong>Normality of residuals</strong> — Matters mainly for confidence intervals, not point predictions.</li>
</ol>
<p>Moderate violations are acceptable in practice. Plot your residuals — they reveal most problems immediately.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

np.random.seed(42)
# True relationship: y = 3 + 2.5x + noise
x = np.random.uniform(0, 10, 80)
y = 3 + 2.5 * x + np.random.normal(0, 2, 80)

X = x.reshape(-1, 1)
model = LinearRegression().fit(X, y)
print(f"Intercept  (β₀): {model.intercept_:.3f}  true: 3.0")
print(f"Coefficient(β₁): {model.coef_[0]:.3f}  true: 2.5")
print(f"R²             : {model.score(X, y):.4f}")

x_line = np.linspace(0, 10, 100).reshape(-1, 1)
fig, axes = plt.subplots(1, 2, figsize=(12, 4))
axes[0].scatter(x, y, alpha=0.6, s=25, label='Data')
axes[0].plot(x_line, model.predict(x_line), 'r-', lw=2, label='OLS fit')
axes[0].set_title('Linear Regression Fit'); axes[0].legend()

residuals = y - model.predict(X)
axes[1].scatter(model.predict(X), residuals, alpha=0.6, s=25)
axes[1].axhline(0, color='red', ls='--')
axes[1].set_xlabel('Fitted values'); axes[1].set_ylabel('Residuals')
axes[1].set_title('Residual Plot (should look random)')
plt.tight_layout(); plt.show()` },
    { type: 'tip', body: `A funnel-shaped residual plot (scatter increases with fitted values) signals heteroscedasticity. The fix is usually a log transform on the target: <code>y_log = np.log1p(y)</code>. Train on log-transformed target, then exponentiate predictions back: <code>np.expm1(model.predict(X))</code>.` },
    { type: 'exercise', title: 'Gradient Descent from Scratch', body: `<p>Implement mini-batch gradient descent for linear regression without using sklearn's LinearRegression. Compare your result to sklearn's OLS on the California Housing dataset.</p>
<ol>
<li>Standardise features and add a bias column (column of 1s)</li>
<li>Initialise weights to zero; run <strong>200 epochs</strong> of mini-batch gradient descent (batch size 64, learning rate 0.01)</li>
<li>Compute training MSE after every 20 epochs and print it</li>
<li>After training, compare your weights to sklearn's coefficients and your test RMSE to sklearn's RMSE</li>
</ol>`,
    hint: `Gradient for MSE: <code>dW = (2/n) * X.T @ (X @ W - y)</code>. For mini-batch: shuffle indices each epoch, then iterate over batches of size 64. Use <code>np.linalg.norm(W_yours - W_sklearn)</code> to compare weights.`,
    solution: `import numpy as np
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

housing = fetch_california_housing(); X, y = housing.data, housing.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
sc = StandardScaler(); Xs_tr = sc.fit_transform(X_tr); Xs_te = sc.transform(X_te)

# Add bias
X_b = np.c_[np.ones(len(Xs_tr)), Xs_tr]
X_te_b = np.c_[np.ones(len(Xs_te)), Xs_te]
W = np.zeros(X_b.shape[1]); lr = 0.01; batch = 64

for epoch in range(200):
    idx = np.random.permutation(len(X_b))
    for start in range(0, len(X_b), batch):
        Xb = X_b[idx[start:start+batch]]; yb = y_tr[idx[start:start+batch]]
        W -= lr * (2/len(Xb)) * Xb.T @ (Xb @ W - yb)
    if (epoch+1) % 20 == 0:
        mse = mean_squared_error(y_tr, X_b @ W)
        print(f"Epoch {epoch+1:3d}: Train MSE = {mse:.4f}")

rmse_gd = mean_squared_error(y_te, X_te_b @ W, squared=False)
sk = LinearRegression().fit(Xs_tr, y_tr)
rmse_sk = mean_squared_error(y_te, sk.predict(Xs_te), squared=False)
print(f"GD RMSE: {rmse_gd:.4f}  sklearn RMSE: {rmse_sk:.4f}")` }
  ]
};

L['ml-w2-l2'] = {
  duration_mins: 15,
  sections: [
    { type: 'text', body: `
<h2>Multiple Linear Regression & Diagnostics</h2>
<p>With multiple features, linear regression becomes more powerful and the diagnostics more important. Each coefficient βᵢ is interpreted as the expected change in y for a one-unit increase in xᵢ, <em>all other features held constant</em> — but this interpretation breaks down when features are highly correlated.</p>
<h3>Multicollinearity</h3>
<p>When two features are highly correlated, the model can't separate their individual effects — small changes in data swing the coefficients wildly. The <strong>Variance Inflation Factor (VIF)</strong> quantifies this: VIF > 10 signals a problem. Fix: remove one of the correlated features, engineer a ratio, or use Ridge regression which handles multicollinearity gracefully.</p>
<h3>statsmodels for inference</h3>
<p>sklearn gives you predictions. statsmodels gives you statistical inference — p-values, confidence intervals, and model diagnostics. Use it when you need to understand <em>which</em> features matter and by how much, not just optimise predictions.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import pandas as pd
from sklearn.datasets import fetch_california_housing
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import statsmodels.api as sm
from statsmodels.stats.outliers_influence import variance_inflation_factor

housing = fetch_california_housing(as_frame=True)
X = housing.data[['MedInc','HouseAge','AveRooms','AveOccup','Latitude','Longitude']]
y = housing.target

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
Xs_train = scaler.fit_transform(X_train)
Xs_test  = scaler.transform(X_test)

# sklearn for predictive metrics
sk_model = LinearRegression().fit(Xs_train, y_train)
print("Coefficients:")
for name, coef in zip(X.columns, sk_model.coef_):
    print(f"  {name:15s}: {coef:+.4f}")
print(f"R² (test): {sk_model.score(Xs_test, y_test):.4f}")

# statsmodels for p-values and confidence intervals
sm_model = sm.OLS(y_train, sm.add_constant(Xs_train)).fit()
print("\nCoefficients with p-values:")
print(sm_model.summary().tables[1])

# VIF
vif_df = pd.DataFrame({
    'feature': X.columns,
    'VIF': [variance_inflation_factor(scaler.transform(X), i)
            for i in range(X.shape[1])]
})
print("\nVIF (>10 = multicollinearity concern):")
print(vif_df.sort_values('VIF', ascending=False))` },
    { type: 'exercise', title: 'Diagnose & Fix Multicollinearity', body: `<p>Create a dataset with deliberate multicollinearity, diagnose it, and compare OLS vs Ridge:</p>
<ol>
<li>Generate 500 samples: <code>x1 = randn(500)</code>, <code>x2 = x1 + 0.05*randn(500)</code> (nearly identical), <code>x3 = randn(500)</code>, and <code>y = 2*x1 + 3*x3 + noise</code></li>
<li>Fit OLS with features [x1, x2, x3]. Print the coefficients — does OLS correctly recover [2, 0, 3]? Look at the standard errors.</li>
<li>Compute the VIF for each feature using <code>variance_inflation_factor</code></li>
<li>Fit Ridge with α from 0.001 to 100 (log scale). Plot Ridge coefficients vs α. At what α do x1 and x2 coefficients stabilise?</li>
</ol>`,
    hint: `<code>from statsmodels.stats.outliers_influence import variance_inflation_factor</code>. For Ridge paths: use a loop over alphas and collect <code>ridge.coef_</code> for each α.`,
    solution: `import numpy as np, matplotlib.pyplot as plt, pandas as pd
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.preprocessing import StandardScaler
from statsmodels.stats.outliers_influence import variance_inflation_factor

np.random.seed(42)
x1 = np.random.randn(500); x2 = x1 + 0.05*np.random.randn(500); x3 = np.random.randn(500)
y = 2*x1 + 3*x3 + np.random.randn(500)*0.5
X = np.c_[x1, x2, x3]
sc = StandardScaler(); Xs = sc.fit_transform(X)

ols = LinearRegression().fit(Xs, y)
print("OLS coefs:", ols.coef_.round(3), " — expected ~[2, 0, 3] but multicollinearity distorts x1/x2")

vif = pd.DataFrame({'feature':['x1','x2','x3'],
                    'VIF': [variance_inflation_factor(Xs, i) for i in range(3)]})
print(vif)

alphas = np.logspace(-3, 2, 50)
coef_paths = np.array([Ridge(alpha=a).fit(Xs, y).coef_ for a in alphas])
plt.figure(figsize=(9,4))
for i, name in enumerate(['x1','x2','x3']):
    plt.semilogx(alphas, coef_paths[:,i], label=name)
plt.xlabel('alpha'); plt.ylabel('Coefficient'); plt.legend(); plt.title('Ridge Coefficient Paths')
plt.axhline(0, color='k', lw=0.5); plt.tight_layout(); plt.show()` }
  ]
};

L['ml-w2-l3'] = {
  duration_mins: 16,
  sections: [
    { type: 'text', body: `
<h2>Regularisation — Ridge, Lasso & ElasticNet</h2>
<p>Standard OLS minimises training error. With many features — especially correlated or irrelevant ones — the model overfits by assigning large coefficients to capture noise. Regularisation adds a penalty on coefficient size to prevent this.</p>
<h3>Ridge Regression (L2)</h3>
<p><strong>Loss = RSS + α × Σβᵢ²</strong>. Shrinks all coefficients toward zero smoothly but never to exactly zero. Excellent when you believe most features are genuinely useful but potentially correlated. Hyperparameter α: larger → more shrinkage.</p>
<h3>Lasso Regression (L1)</h3>
<p><strong>Loss = RSS + α × Σ|βᵢ|</strong>. The geometry of the L1 penalty drives many coefficients to <em>exactly</em> zero — automatic feature selection. Ideal when you suspect most features are irrelevant.</p>
<h3>ElasticNet</h3>
<p>Combines both: <strong>Loss = RSS + α(ρ·Σ|βᵢ| + (1−ρ)/2·Σβᵢ²)</strong>. The mixing ratio ρ balances sparsity (L1) and stability with correlated features (L2). A safe default when in doubt.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import Ridge, Lasso, ElasticNet, RidgeCV, LassoCV
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.datasets import fetch_california_housing

housing = fetch_california_housing(as_frame=True)
X = housing.data
y = housing.target

# Add 20 noise features to stress-test regularisation
np.random.seed(42)
X_noisy = np.hstack([X.values, np.random.randn(X.shape[0], 20)])
X_train, X_test, y_train, y_test = train_test_split(X_noisy, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
Xs_tr = scaler.fit_transform(X_train)
Xs_te = scaler.transform(X_test)

alphas = np.logspace(-3, 3, 30)
ridge_r2 = [Ridge(alpha=a).fit(Xs_tr, y_train).score(Xs_te, y_test) for a in alphas]
lasso_r2 = [Lasso(alpha=a, max_iter=5000).fit(Xs_tr, y_train).score(Xs_te, y_test) for a in alphas]
lasso_nz = [np.sum(Lasso(alpha=a, max_iter=5000).fit(Xs_tr, y_train).coef_ != 0) for a in alphas]

fig, axes = plt.subplots(1, 2, figsize=(13, 4))
axes[0].semilogx(alphas, ridge_r2, label='Ridge', marker='.', markersize=4)
axes[0].semilogx(alphas, lasso_r2, label='Lasso', color='coral', marker='.', markersize=4)
axes[0].set_xlabel('α'); axes[0].set_ylabel('Test R²')
axes[0].set_title('R² vs Regularisation Strength'); axes[0].legend()

axes[1].semilogx(alphas, lasso_nz, color='coral')
axes[1].set_xlabel('α'); axes[1].set_ylabel('Non-zero coefficients')
axes[1].set_title(f'Lasso Sparsity ({X_noisy.shape[1]} total features)')
plt.tight_layout(); plt.show()

# Auto-select α via cross-validation
ridge_cv = RidgeCV(alphas=np.logspace(-3,3,100), cv=5).fit(Xs_tr, y_train)
print(f"Ridge best α={ridge_cv.alpha_:.4f}  Test R²={ridge_cv.score(Xs_te, y_test):.4f}")

lasso_cv = LassoCV(cv=5, max_iter=5000, random_state=42).fit(Xs_tr, y_train)
print(f"Lasso best α={lasso_cv.alpha_:.4f}  Test R²={lasso_cv.score(Xs_te, y_test):.4f}")
print(f"Features kept: {np.sum(lasso_cv.coef_!=0)} / {X_noisy.shape[1]}")` },
    { type: 'exercise', title: 'Regularisation Comparison on Real Data', body: `<p>Use the diabetes dataset (<code>from sklearn.datasets import load_diabetes</code>) to compare regularisation strategies:</p>
<ol>
<li>Train OLS, Ridge (best α via RidgeCV), Lasso (best α via LassoCV), and ElasticNet (l1_ratio=0.5) on 80% of the data</li>
<li>Report test RMSE and test R² for each</li>
<li>For Lasso: list which features survived (non-zero coefficients) and which were eliminated</li>
<li>Plot a coefficient comparison bar chart — all 4 models' coefficients side by side for each feature</li>
</ol>`,
    hint: `<code>load_diabetes()</code> returns X with 10 features (all standardised) and y (a continuous health outcome). Use <code>pd.DataFrame({'OLS': ols.coef_, 'Ridge': ridge.coef_, ...}, index=feature_names).plot.bar()</code>.`,
    solution: `import numpy as np, pandas as pd, matplotlib.pyplot as plt
from sklearn.datasets import load_diabetes
from sklearn.linear_model import LinearRegression, RidgeCV, LassoCV, ElasticNet
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

data = load_diabetes(); X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
alphas = np.logspace(-3, 3, 100)

models = {
    'OLS':        LinearRegression().fit(X_tr, y_tr),
    'Ridge':      RidgeCV(alphas=alphas, cv=5).fit(X_tr, y_tr),
    'Lasso':      LassoCV(cv=5, max_iter=5000, random_state=42).fit(X_tr, y_tr),
    'ElasticNet': ElasticNet(l1_ratio=0.5, max_iter=5000).fit(X_tr, y_tr),
}
for name, m in models.items():
    yp = m.predict(X_te)
    print(f"{name:<12} RMSE={mean_squared_error(y_te,yp,squared=False):.2f}  R²={r2_score(y_te,yp):.4f}")

lasso = models['Lasso']
kept = [n for n, c in zip(data.feature_names, lasso.coef_) if c != 0]
print(f"Lasso kept {len(kept)}/{len(data.feature_names)} features:", kept)

coef_df = pd.DataFrame({n: m.coef_ for n, m in models.items()}, index=data.feature_names)
coef_df.plot.bar(figsize=(12,5)); plt.title('Coefficient Comparison')
plt.axhline(0, color='k', lw=0.5); plt.tight_layout(); plt.show()` }
  ]
};

L['ml-w2-l4'] = {
  duration_mins: 16,
  sections: [
    { type: 'text', body: `
<h2>Logistic Regression — Binary Classification</h2>
<p>Logistic regression models the probability that an observation belongs to the positive class, then thresholds that probability to produce a class prediction. Despite the word "regression" in its name, it is a classification algorithm.</p>
<h3>The sigmoid function</h3>
<p>A linear score z = β₀ + β₁x₁ + … + βₙxₙ is passed through the sigmoid: <strong>σ(z) = 1 / (1 + e⁻ᶻ)</strong>, producing a probability in (0, 1). The decision boundary z = 0 gives P = 0.5.</p>
<h3>Training: Binary Cross-Entropy</h3>
<p>Logistic regression minimises log loss: <strong>L = −[y·log(p) + (1−y)·log(1−p)]</strong>. No closed-form solution — solved iteratively. sklearn uses L2 regularisation by default (parameter C — higher = less regularisation, the inverse of α in Ridge).</p>
<h3>When to use logistic regression</h3>
<p>Use it as your first baseline for any binary classification problem. It trains in seconds, is highly interpretable (coefficients are log-odds), produces calibrated probabilities, and is competitive with complex models when features are well-engineered. If logistic regression fails badly, you know the relationship is genuinely non-linear.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (roc_auc_score, roc_curve,
                              classification_report, ConfusionMatrixDisplay)

data = load_breast_cancer()
X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
scaler = StandardScaler()
Xs_tr = scaler.fit_transform(X_tr)
Xs_te = scaler.transform(X_te)

model = LogisticRegression(C=1.0, max_iter=10000, random_state=42).fit(Xs_tr, y_tr)
y_prob = model.predict_proba(Xs_te)[:, 1]
y_pred = model.predict(Xs_te)

print(classification_report(y_te, y_pred, target_names=data.target_names))
print(f"ROC-AUC: {roc_auc_score(y_te, y_prob):.4f}")

fig, axes = plt.subplots(1, 2, figsize=(12, 4))

fpr, tpr, _ = roc_curve(y_te, y_prob)
axes[0].plot(fpr, tpr, lw=2, label=f'AUC={roc_auc_score(y_te,y_prob):.3f}')
axes[0].plot([0,1],[0,1],'k--'); axes[0].set_xlabel('FPR'); axes[0].set_ylabel('TPR')
axes[0].set_title('ROC Curve'); axes[0].legend()

ConfusionMatrixDisplay.from_predictions(
    y_te, y_pred, display_labels=data.target_names, cmap='Blues', ax=axes[1])
axes[1].set_title('Confusion Matrix')
plt.tight_layout(); plt.show()

# Threshold tuning — business-driven
print("\nThreshold sensitivity:")
for t in [0.3, 0.4, 0.5, 0.6, 0.7]:
    from sklearn.metrics import precision_score, recall_score
    p = (y_prob >= t).astype(int)
    print(f"  t={t:.1f}  precision={precision_score(y_te,p):.3f}  recall={recall_score(y_te,p):.3f}")` },
    { type: 'exercise', title: 'Threshold Tuning for Business Objectives', body: `<p>A credit risk model should catch at least 90% of defaulters (recall ≥ 0.90) while maintaining the highest possible precision. Using the breast cancer dataset as a proxy:</p>
<ol>
<li>Train a Logistic Regression and vary the decision threshold from 0.05 to 0.95 (step 0.05)</li>
<li>For each threshold, record precision, recall, and F1 on the test set</li>
<li>Plot the Precision-Recall curve and mark the point where recall first reaches 0.90</li>
<li>Report: what is the threshold, precision, and F1 at recall = 0.90? Also find the threshold that maximises F1.</li>
</ol>`,
    hint: `Use <code>from sklearn.metrics import precision_recall_curve</code> for the PR curve. For the threshold search: <code>thresholds = np.arange(0.05, 0.95, 0.05)</code>, apply each to <code>y_prob >= t</code>.`,
    solution: `import numpy as np, matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import precision_recall_curve, f1_score, precision_score, recall_score

data = load_breast_cancer(); X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
sc = StandardScaler(); Xs_tr = sc.fit_transform(X_tr); Xs_te = sc.transform(X_te)
model = LogisticRegression(max_iter=10000).fit(Xs_tr, y_tr)
y_prob = model.predict_proba(Xs_te)[:, 1]

rows = []
for t in np.arange(0.05, 0.95, 0.05):
    yp = (y_prob >= t).astype(int)
    rows.append({'t': round(t,2), 'prec': precision_score(y_te,yp,zero_division=0),
                 'rec': recall_score(y_te,yp), 'f1': f1_score(y_te,yp,zero_division=0)})

import pandas as pd; df = pd.DataFrame(rows)
at_90 = df[df['rec'] >= 0.90].iloc[-1]
best_f1 = df.loc[df['f1'].idxmax()]
print("At recall ≥ 0.90:", at_90.to_dict())
print("Best F1:         ", best_f1.to_dict())

prec, rec, thr = precision_recall_curve(y_te, y_prob)
plt.figure(figsize=(8,5))
plt.plot(rec, prec, lw=2); plt.axvline(at_90['rec'], color='red', ls='--', label=f'recall=0.90 @ t={at_90["t"]}')
plt.xlabel('Recall'); plt.ylabel('Precision'); plt.title('Precision-Recall Curve')
plt.legend(); plt.grid(alpha=.3); plt.tight_layout(); plt.show()` }
  ]
};

L['ml-w2-l5'] = {
  duration_mins: 14,
  sections: [
    { type: 'text', body: `
<h2>Logistic Regression — Multiclass & Practical Tips</h2>
<p>Logistic regression extends to more than two classes through two strategies:</p>
<p><strong>One-vs-Rest (OvR)</strong> — One binary classifier per class; the class with the highest probability wins. Fast, parallelisable, works well in practice.</p>
<p><strong>Multinomial (softmax)</strong> — Directly models all class probabilities simultaneously using the softmax function, which ensures they sum to 1. More theoretically principled; better calibrated probabilities. Use <code>multi_class='multinomial'</code> with solver <code>'lbfgs'</code> or <code>'saga'</code>.</p>
<h3>Practical tips</h3>
<ul>
  <li>Always scale features before logistic regression — the solver converges much faster.</li>
  <li>Increase <code>max_iter</code> if you see a <code>ConvergenceWarning</code>.</li>
  <li>For imbalanced datasets, set <code>class_weight='balanced'</code> to upweight the minority class.</li>
  <li>Interpret coefficients as log-odds: a coefficient of 0.5 means a one-unit increase in that feature multiplies the odds of the positive class by e⁰·⁵ ≈ 1.65.</li>
</ul>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report

data = load_iris()
X, y = data.data, data.target

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, stratify=y, random_state=42)
scaler = StandardScaler()
Xs_tr = scaler.fit_transform(X_tr)
Xs_te = scaler.transform(X_te)

for strategy in ['ovr', 'multinomial']:
    model = LogisticRegression(multi_class=strategy, solver='lbfgs', max_iter=1000)
    model.fit(Xs_tr, y_tr)
    print(f"\n--- {strategy.upper()} ---")
    print(classification_report(y_te, model.predict(Xs_te), target_names=data.target_names))

# Decision boundary visualisation (2 features)
model_2d = LogisticRegression(max_iter=1000).fit(Xs_tr[:, :2], y_tr)
xx, yy = np.meshgrid(np.linspace(-3,3,200), np.linspace(-3,3,200))
Z = model_2d.predict(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)

fig, ax = plt.subplots(figsize=(7,5))
ax.contourf(xx, yy, Z, alpha=0.25, cmap='RdYlBu')
colors = ['red','gold','blue']
for cls in range(3):
    m = y_te == cls
    ax.scatter(Xs_te[m,0], Xs_te[m,1], c=colors[cls], s=40,
               edgecolors='k', lw=0.5, label=data.target_names[cls])
ax.set_title('Logistic Regression — 2D Decision Boundaries')
ax.legend(); plt.tight_layout(); plt.show()` },
    { type: 'exercise', title: 'Logistic Regression on Imbalanced Data', body: `<p>Create an imbalanced dataset: 950 samples of class 0 and 50 of class 1 using <code>make_classification(n_samples=1000, weights=[0.95,0.05])</code>. Train two Logistic Regression models — one without <code>class_weight</code> and one with <code>class_weight='balanced'</code>. Compare their precision, recall, and F1 on class 1. Which model catches more of the rare class?</p>`,
    hint: `Use <code>from sklearn.datasets import make_classification</code>. Evaluate with <code>classification_report(y_te, y_pred)</code> and look at the row for class 1.`,
    solution: `from sklearn.datasets import make_classification\nX, y = make_classification(n_samples=1000, weights=[0.95,0.05], random_state=42)\nX_tr,X_te,y_tr,y_te = train_test_split(X,y,test_size=0.2,stratify=y,random_state=42)\nfor cw in [None,'balanced']:\n    m = LogisticRegression(class_weight=cw,max_iter=1000).fit(X_tr,y_tr)\n    print(f"class_weight={cw}")\n    print(classification_report(y_te,m.predict(X_te)))` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 3 — TREE-BASED MODELS
══════════════════════════════════════════════════════════════════════════ */

L['ml-w3-l1'] = {
  duration_mins: 16,
  sections: [
    { type: 'text', body: `
<h2>Decision Trees — How They Work</h2>
<p>A decision tree partitions the feature space by asking a sequence of binary questions: "Is income > ₹50,000? Is age < 35?" Each internal node is a split on one feature at one threshold; each leaf is a prediction. The result is a flowchart that a human can read and verify — which makes trees uniquely valuable in regulated industries.</p>
<h3>How splits are chosen</h3>
<p>At each node the algorithm searches all features and all possible split thresholds, picks the one that best separates the target. The measure of "best" depends on the task:</p>
<ul>
  <li><strong>Gini impurity</strong> (classification default) — Measures the probability of misclassifying a randomly chosen sample. Gini = 1 − Σpᵢ². A perfectly pure node (all one class) has Gini = 0.</li>
  <li><strong>Entropy / Information Gain</strong> — Similar in practice to Gini; slightly slower to compute. Entropy = −Σpᵢ·log₂(pᵢ).</li>
  <li><strong>Variance reduction</strong> (regression) — Choose the split that most reduces the variance of y in the resulting child nodes.</li>
</ul>
<h3>Strengths and weaknesses</h3>
<p><strong>Strengths</strong>: Handles both numerical and categorical features natively; requires zero preprocessing; captures non-linear relationships and feature interactions; highly interpretable.</p>
<p><strong>Weaknesses</strong>: Extremely prone to overfitting — a fully grown tree will memorise training data. High variance: small changes in data produce very different trees. Both weaknesses are addressed by ensemble methods (Random Forests, Gradient Boosting) built on top of trees.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier, plot_tree, export_text
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

data = load_iris()
X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, stratify=y, random_state=42)

# Fully grown tree (max depth = None → overfitting)
tree_full = DecisionTreeClassifier(random_state=42).fit(X_tr, y_tr)
print(f"Full tree  — train acc: {tree_full.score(X_tr,y_tr):.4f}  test acc: {tree_full.score(X_te,y_te):.4f}")
print(f"Tree depth: {tree_full.get_depth()} | Leaves: {tree_full.get_n_leaves()}")

# Pruned tree (max_depth = 3)
tree_pruned = DecisionTreeClassifier(max_depth=3, random_state=42).fit(X_tr, y_tr)
print(f"Pruned tree — train acc: {tree_pruned.score(X_tr,y_tr):.4f}  test acc: {tree_pruned.score(X_te,y_te):.4f}")

# Visualise the pruned tree
fig, ax = plt.subplots(figsize=(14, 6))
plot_tree(tree_pruned, feature_names=data.feature_names,
          class_names=data.target_names, filled=True,
          rounded=True, ax=ax, fontsize=9)
ax.set_title('Pruned Decision Tree (max_depth=3)')
plt.tight_layout(); plt.show()

# Text representation — readable in a terminal
print("\nText rules:")
print(export_text(tree_pruned, feature_names=list(data.feature_names)))

# Feature importances
importances = tree_pruned.feature_importances_
for name, imp in sorted(zip(data.feature_names, importances), key=lambda x: -x[1]):
    print(f"  {name:25s}: {imp:.4f}")` },
    { type: 'tip', body: `The decision tree is the building block of the two most powerful tabular ML algorithms — Random Forest and Gradient Boosting. Master the tree first, then the ensembles will make intuitive sense.` },
    { type: 'exercise', title: 'Decision Tree Depth vs Accuracy', body: `<p>Using the wine dataset (<code>from sklearn.datasets import load_wine</code>), explore how tree depth affects performance:</p>
<ol>
<li>Train Decision Trees for max_depth = 1, 2, 3, 4, 5, 6, 8, 10, None (unlimited)</li>
<li>For each depth, record train accuracy, 5-fold CV accuracy, and test accuracy</li>
<li>Plot all three curves on the same graph (x = max_depth, y = accuracy)</li>
<li>Identify the depth where the gap between train and CV accuracy becomes "too large" (more than 5%). What is the optimal depth?</li>
<li>Print the text rules of the optimal tree using <code>export_text</code></li>
</ol>`,
    hint: `For max_depth=None, use a string 'None' on the x-axis. The "overfit cliff" is where train accuracy → 1.0 but CV drops. Use <code>export_text(tree, feature_names=list(load_wine().feature_names))</code>.`,
    solution: `import numpy as np, matplotlib.pyplot as plt, pandas as pd
from sklearn.datasets import load_wine
from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.model_selection import train_test_split, cross_val_score

data = load_wine(); X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

depths = [1,2,3,4,5,6,8,10,None]; results = []
for d in depths:
    m = DecisionTreeClassifier(max_depth=d, random_state=42)
    cv = cross_val_score(m, X_tr, y_tr, cv=5, scoring='accuracy').mean()
    m.fit(X_tr, y_tr)
    results.append({'depth': str(d), 'train': m.score(X_tr,y_tr), 'cv': cv, 'test': m.score(X_te,y_te)})

df = pd.DataFrame(results)
df.plot(x='depth', y=['train','cv','test'], figsize=(10,5), marker='o')
plt.title('Decision Tree: Depth vs Accuracy'); plt.ylabel('Accuracy'); plt.tight_layout(); plt.show()

best_d = df.loc[df['cv'].idxmax(), 'depth']
print(f"Best CV depth: {best_d}")
best_tree = DecisionTreeClassifier(max_depth=int(best_d) if best_d != 'None' else None, random_state=42).fit(X_tr, y_tr)
print(export_text(best_tree, feature_names=list(data.feature_names)))` }
  ]
};

L['ml-w3-l2'] = {
  duration_mins: 15,
  sections: [
    { type: 'text', body: `
<h2>Decision Trees — Overfitting & Hyperparameters</h2>
<p>A decision tree with no depth limit will grow until every leaf contains a single training sample — achieving 100% training accuracy while being useless on new data. Understanding and controlling this is the central challenge of tree-based modelling.</p>
<h3>Bias-variance tradeoff in trees</h3>
<p>A deep tree has <strong>low bias</strong> (it fits any training pattern, however complex) but <strong>high variance</strong> (small changes in data grow completely different trees). A shallow tree has <strong>high bias</strong> (underfits, misses complex patterns) but <strong>low variance</strong> (stable predictions). The sweet spot is in between.</p>
<h3>Key hyperparameters to tune</h3>
<ul>
  <li><code>max_depth</code> — Maximum depth of the tree. Start with 3–10 and tune with CV.</li>
  <li><code>min_samples_split</code> — Minimum samples required to split an internal node. Higher = smoother boundaries.</li>
  <li><code>min_samples_leaf</code> — Minimum samples in each leaf. Often more effective than max_depth alone.</li>
  <li><code>max_features</code> — Number of features to consider per split. Introducing randomness here is what gives Random Forest its power.</li>
  <li><code>ccp_alpha</code> — Cost-Complexity Pruning parameter. Post-training pruning that removes subtrees that don't improve generalisation enough.</li>
</ul>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=10,
                            n_redundant=5, random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

# ── Depth sweep — see bias-variance tradeoff ───────────────────────────
depths = range(1, 20)
train_acc, val_acc = [], []
for d in depths:
    tree = DecisionTreeClassifier(max_depth=d, random_state=42)
    cv   = cross_val_score(tree, X_tr, y_tr, cv=5, scoring='accuracy')
    tree.fit(X_tr, y_tr)
    train_acc.append(tree.score(X_tr, y_tr))
    val_acc.append(cv.mean())

fig, ax = plt.subplots(figsize=(9, 4))
ax.plot(depths, train_acc, marker='o', markersize=4, label='Train accuracy')
ax.plot(depths, val_acc,   marker='s', markersize=4, label='CV accuracy (val)')
ax.axvline(depths[np.argmax(val_acc)], color='red', ls='--',
           label=f'Best depth = {depths[np.argmax(val_acc)]}')
ax.set_xlabel('max_depth'); ax.set_ylabel('Accuracy')
ax.set_title('Bias-Variance Tradeoff in Decision Trees')
ax.legend(); plt.tight_layout(); plt.show()

# ── Grid search over multiple hyperparameters ─────────────────────────
param_grid = {
    'max_depth':        [3, 5, 7, 10, None],
    'min_samples_leaf': [1, 5, 10, 20],
    'max_features':     ['sqrt', 'log2', None],
}
gs = GridSearchCV(DecisionTreeClassifier(random_state=42),
                  param_grid, cv=5, scoring='accuracy', n_jobs=-1)
gs.fit(X_tr, y_tr)
print(f"Best params : {gs.best_params_}")
print(f"CV accuracy : {gs.best_score_:.4f}")
print(f"Test accuracy: {gs.score(X_te, y_te):.4f}")

# ── Cost-Complexity Pruning ────────────────────────────────────────────
path = DecisionTreeClassifier(random_state=42).cost_complexity_pruning_path(X_tr, y_tr)
ccp_alphas = path.ccp_alphas
cv_scores  = [cross_val_score(DecisionTreeClassifier(ccp_alpha=a, random_state=42),
               X_tr, y_tr, cv=5).mean() for a in ccp_alphas[::5]]
best_alpha = ccp_alphas[::5][np.argmax(cv_scores)]
print(f"\nBest ccp_alpha (pruning): {best_alpha:.6f}")` },
    { type: 'exercise', title: 'Learning Curves for Bias-Variance Diagnosis', body: `<p>Plot learning curves for a Decision Tree (max_depth=1 and max_depth=10) on the breast cancer dataset to visually diagnose underfitting vs overfitting:</p>
<ol>
<li>Use <code>sklearn.model_selection.learning_curve</code> with train sizes from 10% to 100% (20 points)</li>
<li>For each model, plot mean training score and mean CV score (with shaded ±1 std band)</li>
<li>Interpret the plots: which depth underfits (high bias)? Which overfits (high variance)?</li>
<li>Find the depth at which train-CV gap is minimised at 100% training data</li>
</ol>`,
    hint: `<code>from sklearn.model_selection import learning_curve</code>. Call <code>learning_curve(model, X, y, cv=5, train_sizes=np.linspace(0.1,1,20), scoring='accuracy')</code>. Returns <code>(train_sizes_abs, train_scores, val_scores)</code> — each is shape (n_sizes, n_folds).`,
    solution: `import numpy as np, matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import learning_curve

data = load_breast_cancer(); X, y = data.data, data.target
fig, axes = plt.subplots(1,2,figsize=(13,5))

for ax, depth, title in zip(axes, [1,10], ['depth=1 (Underfitting)','depth=10 (Overfitting)']):
    model = DecisionTreeClassifier(max_depth=depth, random_state=42)
    train_sizes, tr_sc, cv_sc = learning_curve(
        model, X, y, cv=5, train_sizes=np.linspace(0.1,1,20), scoring='accuracy', n_jobs=-1)
    tr_mean, tr_std = tr_sc.mean(1), tr_sc.std(1)
    cv_mean, cv_std = cv_sc.mean(1), cv_sc.std(1)
    ax.plot(train_sizes, tr_mean, 'o-', label='Train', color='blue')
    ax.fill_between(train_sizes, tr_mean-tr_std, tr_mean+tr_std, alpha=.15, color='blue')
    ax.plot(train_sizes, cv_mean, 'o-', label='CV', color='red')
    ax.fill_between(train_sizes, cv_mean-cv_std, cv_mean+cv_std, alpha=.15, color='red')
    ax.set_title(title); ax.set_xlabel('Training examples'); ax.set_ylabel('Accuracy')
    ax.legend(); ax.set_ylim(0.7, 1.02)
plt.tight_layout(); plt.show()` }
  ]
};

L['ml-w3-l3'] = {
  duration_mins: 17,
  sections: [
    { type: 'text', body: `
<h2>Random Forests — Bagging & Feature Importance</h2>
<p>A Random Forest is an ensemble of many decision trees, each trained on a different bootstrap sample of the training data and making splits using a random subset of features. The final prediction averages (regression) or majority-votes (classification) across all trees. This ensemble turns the tree's biggest weakness — high variance — into a strength.</p>
<h3>Why it works: Bagging</h3>
<p><strong>Bootstrap Aggregating (Bagging)</strong> reduces variance without increasing bias. Each tree sees a different ~63% of the training data (drawn with replacement), so it learns slightly different patterns. When you average many high-variance, low-bias estimators, the variances cancel out while the signal compounds. The mathematics: if each tree has variance σ², and trees are independent, the average of N trees has variance σ²/N.</p>
<h3>The random feature trick</h3>
<p>At each split, the tree considers only a random subset of features (typically √p for classification, p/3 for regression, where p is the total number of features). This decorrelates the trees — without it, all trees would be dominated by the same strong features, and averaging them would give limited variance reduction.</p>
<h3>Feature importance</h3>
<p>Random Forest naturally produces feature importances: for each feature, average the reduction in impurity it causes across all splits in all trees. These are biased toward high-cardinality features but provide a fast, useful signal for feature selection.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import roc_auc_score, classification_report

data = load_breast_cancer()
X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# ── Fit a Random Forest ────────────────────────────────────────────────
rf = RandomForestClassifier(
    n_estimators=200,   # more trees = lower variance; diminishing returns after ~200
    max_features='sqrt',
    min_samples_leaf=2,
    n_jobs=-1,
    random_state=42,
    oob_score=True      # out-of-bag score: free validation estimate
)
rf.fit(X_tr, y_tr)

y_prob = rf.predict_proba(X_te)[:, 1]
print(f"OOB accuracy  : {rf.oob_score_:.4f}")
print(f"Test accuracy : {rf.score(X_te, y_te):.4f}")
print(f"Test ROC-AUC  : {roc_auc_score(y_te, y_prob):.4f}")
print(classification_report(y_te, rf.predict(X_te), target_names=data.target_names))

# ── Feature importances ────────────────────────────────────────────────
importances = pd.Series(rf.feature_importances_, index=data.feature_names)
top_features = importances.nlargest(10)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))
top_features.sort_values().plot(kind='barh', ax=axes[0], color='steelblue')
axes[0].set_title('Top 10 Feature Importances (mean impurity decrease)')
axes[0].set_xlabel('Importance')

# ── n_estimators vs OOB score — diminishing returns ───────────────────
n_trees = [1, 5, 10, 25, 50, 100, 200, 500]
oob_scores = []
for n in n_trees:
    m = RandomForestClassifier(n_estimators=n, oob_score=True,
                                random_state=42, n_jobs=-1).fit(X_tr, y_tr)
    oob_scores.append(m.oob_score_)

axes[1].semilogx(n_trees, oob_scores, marker='o')
axes[1].set_xlabel('n_estimators (log scale)'); axes[1].set_ylabel('OOB Accuracy')
axes[1].set_title('OOB Accuracy vs Number of Trees')
plt.tight_layout(); plt.show()` },
    { type: 'exercise', title: 'Permutation Importance vs Impurity Importance', body: `<p>Impurity-based importance (Random Forest default) is biased toward high-cardinality features. Permutation importance is model-agnostic and more reliable. Compare both on a dataset with a high-cardinality feature:</p>
<ol>
<li>Create a dataset: 500 samples, features = [<code>age</code> (int 18–60), <code>income</code> (random), <code>random_id</code> (unique integer 0–500, a nuisance feature), <code>is_customer</code> (bool)], target = 1 if income > 60000 else 0</li>
<li>Train a Random Forest. Print impurity importances — does <code>random_id</code> look important?</li>
<li>Compute permutation importance with <code>sklearn.inspection.permutation_importance</code></li>
<li>Plot both side by side. What does each say about <code>random_id</code>?</li>
</ol>`,
    hint: `<code>from sklearn.inspection import permutation_importance; result = permutation_importance(rf, X_te, y_te, n_repeats=30, random_state=42)</code>. The <code>importances_mean</code> and <code>importances_std</code> attributes give the results.`,
    solution: `import numpy as np, pandas as pd, matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier
from sklearn.inspection import permutation_importance
from sklearn.model_selection import train_test_split

np.random.seed(42); n=500
X = pd.DataFrame({'age': np.random.randint(18,60,n), 'income': np.random.randint(20000,200000,n),
                   'random_id': np.arange(n), 'is_customer': np.random.choice([0,1],n)})
y = (X['income'] > 60000).astype(int)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

rf = RandomForestClassifier(n_estimators=200, random_state=42).fit(X_tr, y_tr)
imp_imp = pd.Series(rf.feature_importances_, index=X.columns).sort_values(ascending=True)
pi = permutation_importance(rf, X_te, y_te, n_repeats=30, random_state=42)
perm_imp = pd.Series(pi.importances_mean, index=X.columns).sort_values(ascending=True)

fig, (ax1, ax2) = plt.subplots(1,2,figsize=(12,4))
imp_imp.plot.barh(ax=ax1, title='Impurity Importance (biased!)')
perm_imp.plot.barh(ax=ax2, title='Permutation Importance (reliable)')
plt.tight_layout(); plt.show()
print("Note: impurity importance inflates 'random_id' — permutation importance correctly shows it near 0")` }
  ]
};

L['ml-w3-l4'] = {
  duration_mins: 18,
  sections: [
    { type: 'text', body: `
<h2>Gradient Boosting — XGBoost & LightGBM</h2>
<p>Gradient Boosting builds an ensemble differently from Random Forest. Instead of training trees in parallel on bootstrap samples, it trains trees <em>sequentially</em>, where each new tree specifically targets the errors (residuals) of the previous ensemble. The result is a highly accurate model that consistently wins tabular data competitions.</p>
<h3>The boosting idea</h3>
<p>At step m, we have a current ensemble F(x). We compute the residuals rᵢ = yᵢ − F(xᵢ). We fit a new tree hₘ(x) to predict these residuals. We update: Fₘ(x) = Fₘ₋₁(x) + η·hₘ(x), where η is the learning rate. Repeat. The learning rate controls the contribution of each tree — smaller η means we need more trees but usually generalise better.</p>
<h3>XGBoost vs LightGBM vs sklearn GradientBoosting</h3>
<ul>
  <li><strong>sklearn GradientBoostingClassifier</strong> — The classic, pure Python implementation. Correct but slow for large datasets.</li>
  <li><strong>XGBoost</strong> — Highly optimised C++ implementation with regularisation terms (L1 and L2 on leaf weights). The algorithm that dominated Kaggle competitions 2014–2018. Excellent default choice.</li>
  <li><strong>LightGBM</strong> — Microsoft's implementation. Uses leaf-wise growth instead of level-wise, and histogram-based splits. Dramatically faster than XGBoost on large datasets with many features. Often better on high-cardinality categorical features.</li>
</ul>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import roc_auc_score
from sklearn.ensemble import GradientBoostingClassifier
# Install if needed: pip install xgboost lightgbm
try:
    import xgboost as xgb
    XGB_AVAILABLE = True
except ImportError:
    XGB_AVAILABLE = False

data = load_breast_cancer()
X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# ── sklearn GradientBoosting baseline ─────────────────────────────────
gb = GradientBoostingClassifier(n_estimators=200, learning_rate=0.1,
                                  max_depth=3, random_state=42)
gb.fit(X_tr, y_tr)
print(f"GradientBoosting AUC: {roc_auc_score(y_te, gb.predict_proba(X_te)[:,1]):.4f}")

# ── XGBoost ────────────────────────────────────────────────────────────
if XGB_AVAILABLE:
    xgb_model = xgb.XGBClassifier(
        n_estimators=300,
        learning_rate=0.05,
        max_depth=4,
        subsample=0.8,       # row subsampling (like bagging)
        colsample_bytree=0.8, # feature subsampling per tree
        reg_alpha=0.1,        # L1 regularisation on leaf weights
        reg_lambda=1.0,       # L2 regularisation on leaf weights
        use_label_encoder=False,
        eval_metric='logloss',
        random_state=42,
        n_jobs=-1
    )
    xgb_model.fit(X_tr, y_tr, eval_set=[(X_te, y_te)], verbose=False)
    print(f"XGBoost AUC         : {roc_auc_score(y_te, xgb_model.predict_proba(X_te)[:,1]):.4f}")

# ── Learning rate and n_estimators interaction ─────────────────────────
fig, ax = plt.subplots(figsize=(9, 4))
for lr, color in [(0.3,'red'),(0.1,'blue'),(0.01,'green')]:
    scores = []
    for n in [10, 25, 50, 100, 200, 300]:
        m = GradientBoostingClassifier(n_estimators=n, learning_rate=lr,
                                        max_depth=3, random_state=42)
        cv = cross_val_score(m, X_tr, y_tr, cv=3, scoring='roc_auc')
        scores.append(cv.mean())
    ax.plot([10,25,50,100,200,300], scores, marker='o', markersize=4,
            color=color, label=f'lr={lr}')
ax.set_xlabel('n_estimators'); ax.set_ylabel('CV ROC-AUC')
ax.set_title('Learning Rate vs n_estimators Tradeoff')
ax.legend(); plt.tight_layout(); plt.show()
# Small learning rate needs more trees but often finds a better optimum` },
    { type: 'exercise', title: 'XGBoost Early Stopping & Feature Importance', body: `<p>Train XGBoost on the breast cancer dataset with early stopping, then analyse feature importance three ways:</p>
<ol>
<li>Train XGBoost with <code>n_estimators=500</code> and <code>early_stopping_rounds=20</code> using the test set as eval_set. How many trees were actually used?</li>
<li>Plot the training log-loss vs iteration (XGBoost tracks this in <code>model.evals_result()</code>)</li>
<li>Plot feature importances three ways: <code>weight</code> (split count), <code>gain</code> (average gain), <code>cover</code>. Do the top features differ?</li>
</ol>`,
    hint: `<code>xgb_model.evals_result()['validation_0']['logloss']</code> gives the per-iteration loss. For importance types: <code>xgb_model.get_booster().get_score(importance_type='weight')</code>. Or use <code>plot_importance(model, importance_type='gain')</code>.`,
    solution: `try:
    import xgboost as xgb
    from xgboost import plot_importance
    import matplotlib.pyplot as plt
    from sklearn.datasets import load_breast_cancer
    from sklearn.model_selection import train_test_split

    data = load_breast_cancer(); X, y = data.data, data.target
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

    model = xgb.XGBClassifier(n_estimators=500, learning_rate=0.05, max_depth=4,
                               eval_metric='logloss', early_stopping_rounds=20, n_jobs=-1, random_state=42)
    model.fit(X_tr, y_tr, eval_set=[(X_te, y_te)], verbose=False)
    print(f"Trees used (early stopping): {model.best_iteration}")

    losses = model.evals_result()['validation_0']['logloss']
    plt.figure(figsize=(9,4))
    plt.plot(losses, lw=1.5)
    plt.axvline(model.best_iteration, color='red', ls='--', label=f'best={model.best_iteration}')
    plt.xlabel('Iteration'); plt.ylabel('Log Loss'); plt.title('XGBoost Early Stopping'); plt.legend(); plt.show()

    fig, axes = plt.subplots(1,3,figsize=(15,5))
    for ax, itype in zip(axes, ['weight','gain','cover']):
        plot_importance(model, importance_type=itype, max_num_features=10, ax=ax, title=itype)
    plt.tight_layout(); plt.show()
except ImportError:
    print("Install xgboost: pip install xgboost")` }
  ]
};

L['ml-w3-l5'] = {
  duration_mins: 15,
  sections: [
    { type: 'text', body: `
<h2>Tree Models in Practice — When to Use What</h2>
<p>Having three powerful tree-based options (Decision Tree, Random Forest, Gradient Boosting) raises the question of when to use each. The answer depends on dataset size, speed requirements, interpretability needs, and how much tuning effort you can invest.</p>
<h3>Decision Tree — use when:</h3>
<ul>
  <li>You need a model you can explain to a non-technical stakeholder verbally ("If income > ₹50K and age < 35, then..."). Credit scoring, medical diagnosis, compliance contexts.</li>
  <li>You're building a quick prototype to understand the data before applying more complex models.</li>
  <li>Dataset is tiny (&lt;500 samples) and an ensemble would overfit.</li>
</ul>
<h3>Random Forest — use when:</h3>
<ul>
  <li>You want a strong, robust model with minimal tuning. Random Forest is famously good "out of the box."</li>
  <li>Your dataset has noise or many irrelevant features — the random feature selection naturally handles this.</li>
  <li>You need feature importances as a fast signal for feature selection.</li>
  <li>Training time matters — Random Forest trees are independent and trivially parallelisable.</li>
</ul>
<h3>Gradient Boosting (XGBoost / LightGBM) — use when:</h3>
<ul>
  <li>You need maximum accuracy and are willing to tune hyperparameters.</li>
  <li>You're competing on a benchmark or Kaggle.</li>
  <li>Dataset is large and LightGBM's speed advantage is significant.</li>
  <li>You have many categorical features — LightGBM handles these natively.</li>
</ul>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import pandas as pd
import time
from sklearn.datasets import make_classification
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.metrics import roc_auc_score

np.random.seed(42)
X, y = make_classification(n_samples=5000, n_features=30, n_informative=15,
                            n_redundant=5, random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

models = {
    'Decision Tree (depth=5)': DecisionTreeClassifier(max_depth=5, random_state=42),
    'Random Forest (200 trees)': RandomForestClassifier(n_estimators=200, n_jobs=-1, random_state=42),
    'GradientBoosting (200 trees)': GradientBoostingClassifier(n_estimators=200, learning_rate=0.1,
                                                                  max_depth=3, random_state=42),
}

results = []
for name, model in models.items():
    t0 = time.time()
    model.fit(X_tr, y_tr)
    train_time = time.time() - t0
    auc = roc_auc_score(y_te, model.predict_proba(X_te)[:,1])
    cv  = cross_val_score(model, X_tr, y_tr, cv=3, scoring='roc_auc').mean()
    results.append({'Model': name, 'CV AUC': round(cv,4),
                    'Test AUC': round(auc,4), 'Train time(s)': round(train_time,2)})
    print(f"{name:40s}  CV={cv:.4f}  Test={auc:.4f}  Time={train_time:.2f}s")

print("\nKey takeaway: Gradient Boosting wins on accuracy; Random Forest is close with much less tuning.")` },
    { type: 'exercise', title: 'Tune a Random Forest End-to-End', body: `<p>Using the California Housing dataset (<code>fetch_california_housing</code>), tune a Random Forest regressor with <code>RandomizedSearchCV</code> over: <code>n_estimators=[100,200,500]</code>, <code>max_depth=[None,5,10,20]</code>, <code>min_samples_leaf=[1,3,5]</code>, <code>max_features=[0.3,0.5,'sqrt']</code>. Use 5-fold CV and RMSE as the metric. Report the best parameters and compare RMSE to a default RandomForest baseline.</p>`,
    hint: `Use <code>scoring='neg_root_mean_squared_error'</code> in RandomizedSearchCV. The score is negated — multiply by -1 to get positive RMSE.`,
    solution: `from sklearn.model_selection import RandomizedSearchCV\nfrom sklearn.datasets import fetch_california_housing\nhousing = fetch_california_housing()\nX, y = housing.data, housing.target\nX_tr,X_te,y_tr,y_te = train_test_split(X,y,test_size=0.2,random_state=42)\nparam_dist = {'n_estimators':[100,200,500],'max_depth':[None,5,10,20],\n              'min_samples_leaf':[1,3,5],'max_features':[0.3,0.5,'sqrt']}\nrs = RandomizedSearchCV(RandomForestRegressor(random_state=42),param_dist,\n                        n_iter=20,cv=5,scoring='neg_root_mean_squared_error',\n                        random_state=42,n_jobs=-1)\nrs.fit(X_tr,y_tr)\nprint(rs.best_params_)\nprint('Best CV RMSE:',-rs.best_score_)` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 4 — SVM & KNN
══════════════════════════════════════════════════════════════════════════ */

L['ml-w4-l1'] = {
  duration_mins: 16,
  sections: [
    { type: 'text', body: `
<h2>Support Vector Machines — The Maximal Margin Classifier</h2>
<p>A Support Vector Machine (SVM) finds the hyperplane that separates two classes with the <strong>maximum margin</strong> — the widest possible buffer zone between the boundary and the nearest points from each class. Those nearest points are the <em>support vectors</em>, and they are the only training samples that determine the boundary. All other samples could be removed without changing the model.</p>
<h3>Why maximum margin?</h3>
<p>Intuitively, a boundary that sits far from both classes is more confident — small perturbations in the data won't cross the boundary and flip a prediction. The maximum-margin solution provably gives the best worst-case generalisation guarantee among all linear classifiers.</p>
<h3>Soft-margin SVM</h3>
<p>Real data is rarely linearly separable. The soft-margin SVM introduces <strong>slack variables</strong> that allow some points to violate the margin (or even be on the wrong side). The hyperparameter C controls the trade-off: small C tolerates more violations for a wider margin (higher bias, lower variance); large C insists on fewer violations and a tighter margin (lower bias, higher variance).</p>
<h3>When to use SVM</h3>
<p>SVMs work well in high-dimensional spaces (text classification, genomics), work on small to medium datasets, and can be memory-efficient (only support vectors matter). They scale poorly to large datasets (O(n²) to O(n³) training time) and don't naturally produce calibrated probabilities.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.svm import SVC
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report

np.random.seed(42)
X, y = make_classification(n_samples=300, n_features=2, n_redundant=0,
                            n_informative=2, random_state=42, n_clusters_per_class=1)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=42)

scaler = StandardScaler()
Xs_tr = scaler.fit_transform(X_tr)
Xs_te = scaler.transform(X_te)

svm_linear = SVC(kernel='linear', C=1.0, probability=True, random_state=42)
svm_linear.fit(Xs_tr, y_tr)

print(f"Support vectors per class: {svm_linear.n_support_}")
print(f"Test accuracy: {svm_linear.score(Xs_te, y_te):.4f}")
print(classification_report(y_te, svm_linear.predict(Xs_te)))

# Visualise margin and support vectors
def plot_svm_boundary(model, X, y, ax, title):
    xx, yy = np.meshgrid(np.linspace(X[:,0].min()-0.5, X[:,0].max()+0.5, 200),
                         np.linspace(X[:,1].min()-0.5, X[:,1].max()+0.5, 200))
    Z = model.decision_function(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)
    ax.contourf(xx, yy, Z, levels=[-1,0,1], alpha=0.15, colors=['red','white','blue'])
    ax.contour(xx, yy, Z, levels=[-1,0,1], colors=['red','black','blue'],
               linestyles=['--','-','--'], linewidths=[1,2,1])
    ax.scatter(X[y==0,0], X[y==0,1], c='red',  s=30, edgecolors='k', lw=0.5)
    ax.scatter(X[y==1,0], X[y==1,1], c='blue', s=30, edgecolors='k', lw=0.5)
    # Highlight support vectors
    sv = model.support_vectors_
    ax.scatter(sv[:,0], sv[:,1], s=120, facecolors='none', edgecolors='gold', lw=2, label='Support vectors')
    ax.set_title(title); ax.legend(fontsize=8)

fig, axes = plt.subplots(1, 2, figsize=(12, 5))
for ax, C, title in zip(axes, [0.1, 10.0], ['SVM C=0.1 (wide margin)', 'SVM C=10 (narrow margin)']):
    m = SVC(kernel='linear', C=C).fit(Xs_tr, y_tr)
    plot_svm_boundary(m, Xs_tr, y_tr, ax, title)
plt.tight_layout(); plt.show()` },
    { type: 'exercise', title: 'SVM C Parameter & Support Vector Count', body: `<p>Explore how the regularisation parameter C affects SVM behaviour on the breast cancer dataset:</p>
<ol>
<li>Train linear SVM for C = [0.001, 0.01, 0.1, 1, 10, 100, 1000]</li>
<li>For each C, record: number of support vectors, train accuracy, 5-fold CV accuracy, test accuracy</li>
<li>Plot support vector count vs C (log scale x-axis). What happens as C → ∞?</li>
<li>Identify the C value with the best CV accuracy. Is it different from the C with fewest support vectors?</li>
</ol>`,
    hint: `<code>model.n_support_</code> gives support vector count per class; sum them. Use a Pipeline: <code>Pipeline([('scale', StandardScaler()), ('svm', SVC(kernel='linear', C=c))])</code>.`,
    solution: `import numpy as np, pandas as pd, matplotlib.pyplot as plt
from sklearn.svm import SVC
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

data = load_breast_cancer(); X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

results = []
for C in [0.001, 0.01, 0.1, 1, 10, 100, 1000]:
    pipe = Pipeline([('sc', StandardScaler()), ('svm', SVC(kernel='linear', C=C))])
    cv = cross_val_score(pipe, X_tr, y_tr, cv=5, scoring='accuracy').mean()
    pipe.fit(X_tr, y_tr)
    nsv = sum(pipe.named_steps['svm'].n_support_)
    results.append({'C': C, 'n_sv': nsv, 'train': pipe.score(X_tr,y_tr), 'cv': cv, 'test': pipe.score(X_te,y_te)})

df = pd.DataFrame(results); print(df.round(4).to_string(index=False))
fig, (ax1,ax2) = plt.subplots(1,2,figsize=(12,4))
ax1.semilogx(df['C'], df['n_sv'], 'o-'); ax1.set_xlabel('C'); ax1.set_ylabel('Support Vectors'); ax1.set_title('SVs vs C')
ax2.semilogx(df['C'], df['cv'], 'o-', label='CV'); ax2.semilogx(df['C'], df['test'], 's--', label='Test')
ax2.set_xlabel('C'); ax2.set_ylabel('Accuracy'); ax2.set_title('Accuracy vs C'); ax2.legend()
plt.tight_layout(); plt.show()` }
  ]
};

L['ml-w4-l2'] = {
  duration_mins: 16,
  sections: [
    { type: 'text', body: `
<h2>SVM — Kernels & Non-Linear Classification</h2>
<p>The <strong>kernel trick</strong> is the insight that makes SVMs powerful for non-linear problems. Instead of explicitly mapping features to a higher-dimensional space (which would be computationally expensive), the kernel function implicitly computes dot products in that space. The SVM algorithm only ever needs dot products — so you get the expressive power of high-dimensional feature spaces at low computational cost.</p>
<h3>Common kernels</h3>
<ul>
  <li><strong>Linear kernel</strong> — K(x, z) = xᵀz. The hyperplane is linear in the original feature space. Fast, interpretable, great for text data where the feature space is already very high-dimensional.</li>
  <li><strong>RBF (Radial Basis Function) kernel</strong> — K(x, z) = exp(−γ‖x−z‖²). Creates smooth, curved decision boundaries. The most popular kernel for non-linear problems. Two hyperparameters: C and γ. Higher γ = each training point has narrower influence = more complex boundary.</li>
  <li><strong>Polynomial kernel</strong> — K(x, z) = (γxᵀz + r)^d. Degree d controls the polynomial order. Useful for image classification and NLP.</li>
</ul>
<h3>The C-γ grid</h3>
<p>For RBF SVM, tuning C and γ together is essential. A common approach is a logarithmic grid search: C ∈ {0.001, 0.01, 0.1, 1, 10, 100} × γ ∈ {0.001, 0.01, 0.1, 1, 10, 100}.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.svm import SVC
from sklearn.datasets import make_moons, make_circles
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

np.random.seed(42)
X_moons, y_moons = make_moons(n_samples=300, noise=0.2, random_state=42)
X_circ,  y_circ  = make_circles(n_samples=300, noise=0.1, factor=0.4, random_state=42)

fig, axes = plt.subplots(2, 3, figsize=(15, 8))
for row, (X_data, y_data, name) in enumerate(
        [(X_moons, y_moons, 'Moons'), (X_circ, y_circ, 'Circles')]):

    scaler = StandardScaler()
    Xs = scaler.fit_transform(X_data)
    X_tr, X_te, y_tr, y_te = train_test_split(Xs, y_data, test_size=0.2, random_state=42)

    for col, (kernel, params) in enumerate([
        ('linear', {'C': 1.0}),
        ('rbf',    {'C': 1.0, 'gamma': 1.0}),
        ('poly',   {'C': 1.0, 'degree': 3}),
    ]):
        m = SVC(kernel=kernel, **params).fit(X_tr, y_tr)
        acc = m.score(X_te, y_te)

        xx, yy = np.meshgrid(np.linspace(-2.5,2.5,200), np.linspace(-2.5,2.5,200))
        Z = m.predict(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)
        axes[row, col].contourf(xx, yy, Z, alpha=0.2, cmap='RdBu')
        axes[row, col].scatter(Xs[y_data==0,0], Xs[y_data==0,1], c='red',  s=15, alpha=0.6)
        axes[row, col].scatter(Xs[y_data==1,0], Xs[y_data==1,1], c='blue', s=15, alpha=0.6)
        axes[row, col].set_title(f'{name}: {kernel.upper()} kernel (acc={acc:.2f})')
plt.tight_layout(); plt.show()

# ── C-γ grid search for RBF SVM ────────────────────────────────────────
pipeline = Pipeline([('scale', StandardScaler()), ('svm', SVC(kernel='rbf', probability=True))])
param_grid = {'svm__C': [0.1, 1, 10, 100], 'svm__gamma': [0.001, 0.01, 0.1, 1]}
gs = GridSearchCV(pipeline, param_grid, cv=5, scoring='accuracy', n_jobs=-1)
gs.fit(X_tr, y_tr)
print(f"Best C={gs.best_params_['svm__C']}, gamma={gs.best_params_['svm__gamma']}")
print(f"Best CV accuracy: {gs.best_score_:.4f}")` },
    { type: 'exercise', title: 'Kernel Comparison on Real Data', body: `<p>Compare three SVM kernels on the wine dataset. For each kernel, use a Pipeline with StandardScaler and tune the key hyperparameters with 5-fold CV:</p>
<ol>
<li><strong>Linear SVM</strong>: tune C ∈ [0.01, 0.1, 1, 10, 100]</li>
<li><strong>RBF SVM</strong>: tune C × gamma grid (3×3 log-spaced)</li>
<li><strong>Polynomial SVM</strong>: tune degree ∈ [2, 3, 4] with C=1</li>
<li>Report best CV accuracy, best params, and test accuracy for each. Which kernel wins?</li>
</ol>`,
    hint: `Use <code>GridSearchCV</code> with each pipeline separately. For RBF: <code>{'svm__C': [0.1,1,10], 'svm__gamma': [0.01,0.1,1]}</code>. Remember <code>wine</code> is 3-class — use <code>decision_function_shape='ovr'</code>.`,
    solution: `from sklearn.datasets import load_wine
from sklearn.svm import SVC
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import GridSearchCV, train_test_split

data = load_wine(); X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

configs = [
    ('Linear',  {'svm__C': [0.01,0.1,1,10,100]}, {}),
    ('RBF',     {'svm__C': [0.1,1,10], 'svm__gamma': [0.01,0.1,1]}, {}),
    ('Poly',    {'svm__C': [1]}, {'degree': 3}),
]

for name, grid, extra in configs:
    pipe = Pipeline([('sc', StandardScaler()), ('svm', SVC(kernel=name.lower(), **extra))])
    if name == 'Poly': pipe.set_params(**{'svm__kernel': 'poly'})
    gs = GridSearchCV(pipe, grid, cv=5, n_jobs=-1)
    gs.fit(X_tr, y_tr)
    print(f"{name:<8} best_params={gs.best_params_}  CV={gs.best_score_:.4f}  Test={gs.score(X_te,y_te):.4f}")` }
  ]
};

L['ml-w4-l3'] = {
  duration_mins: 14,
  sections: [
    { type: 'text', body: `
<h2>K-Nearest Neighbors — Algorithm & Distance Metrics</h2>
<p>K-Nearest Neighbors (KNN) is the simplest possible machine learning algorithm: to predict the label of a new point, find the K most similar training points and take a majority vote (classification) or average (regression). There is no training phase — the entire dataset is the model.</p>
<h3>Distance metrics</h3>
<p>KNN's definition of "nearest" depends entirely on the distance metric:</p>
<ul>
  <li><strong>Euclidean distance</strong> (L2) — Straight-line distance. Default and most common. Sensitive to feature scale — features with large ranges dominate. Always scale your features.</li>
  <li><strong>Manhattan distance</strong> (L1) — Sum of absolute differences. More robust to outliers than Euclidean. Preferred in high-dimensional spaces.</li>
  <li><strong>Minkowski distance</strong> — Generalises both: p=1 gives Manhattan, p=2 gives Euclidean.</li>
  <li><strong>Cosine similarity</strong> — Angle between vectors, ignoring magnitude. Natural for text data where direction matters more than magnitude.</li>
</ul>
<h3>The curse of dimensionality</h3>
<p>KNN degrades severely in high dimensions. As dimensionality increases, all points become approximately equidistant from each other — the concept of "nearest neighbour" loses meaning. Beyond ~20 relevant features, KNN rarely outperforms tree-based models.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler

data = load_iris()
X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, stratify=y, random_state=42)

scaler = StandardScaler()
Xs_tr = scaler.fit_transform(X_tr)
Xs_te = scaler.transform(X_te)

# ── Effect of K on accuracy ────────────────────────────────────────────
k_values = range(1, 31)
train_acc, cv_acc = [], []
for k in k_values:
    knn = KNeighborsClassifier(n_neighbors=k)
    knn.fit(Xs_tr, y_tr)
    train_acc.append(knn.score(Xs_tr, y_tr))
    cv_acc.append(cross_val_score(knn, Xs_tr, y_tr, cv=5).mean())

fig, ax = plt.subplots(figsize=(9, 4))
ax.plot(k_values, train_acc, label='Train accuracy', marker='.', markersize=4)
ax.plot(k_values, cv_acc,   label='CV accuracy',    marker='.', markersize=4, color='coral')
ax.axvline(k_values[np.argmax(cv_acc)], ls='--', color='red',
           label=f'Best k = {k_values[np.argmax(cv_acc)]}')
ax.set_xlabel('k (number of neighbors)'); ax.set_ylabel('Accuracy')
ax.set_title('KNN: k=1 overfits; large k underfits'); ax.legend()
plt.tight_layout(); plt.show()

best_k = k_values[np.argmax(cv_acc)]
best_knn = KNeighborsClassifier(n_neighbors=best_k)
best_knn.fit(Xs_tr, y_tr)
print(f"Best k = {best_k}")
print(f"Test accuracy: {best_knn.score(Xs_te, y_te):.4f}")

# ── Distance metric comparison ─────────────────────────────────────────
for metric in ['euclidean', 'manhattan', 'chebyshev']:
    knn = KNeighborsClassifier(n_neighbors=best_k, metric=metric)
    cv = cross_val_score(knn, Xs_tr, y_tr, cv=5).mean()
    print(f"  metric={metric:12s}  CV acc={cv:.4f}")` },
    { type: 'exercise', title: 'KNN Sensitivity Analysis', body: `<p>Use the digits dataset (<code>from sklearn.datasets import load_digits</code>) to do a thorough KNN analysis:</p>
<ol>
<li>Plot train vs CV accuracy for k = 1 to 30. Mark the optimal k.</li>
<li>At the optimal k, compare three distance metrics: euclidean, manhattan, cosine. Which is best?</li>
<li>Compare <code>weights='uniform'</code> vs <code>weights='distance'</code> at the optimal k. Does distance weighting help?</li>
<li>The digits dataset has 64 features. Apply PCA to reduce to 20 components first — does it improve KNN accuracy? (This demonstrates the curse of dimensionality.)</li>
</ol>`,
    hint: `<code>from sklearn.decomposition import PCA</code>. Use <code>Pipeline([('pca', PCA(n_components=20)), ('scaler', StandardScaler()), ('knn', KNeighborsClassifier(n_neighbors=k))])</code>.`,
    solution: `import numpy as np, matplotlib.pyplot as plt
from sklearn.datasets import load_digits
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.pipeline import Pipeline

data = load_digits(); X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
sc = StandardScaler(); Xs_tr = sc.fit_transform(X_tr); Xs_te = sc.transform(X_te)

k_vals = range(1,31); cv_acc = []
for k in k_vals:
    cv_acc.append(cross_val_score(KNeighborsClassifier(n_neighbors=k), Xs_tr, y_tr, cv=5).mean())
best_k = k_vals[np.argmax(cv_acc)]

plt.figure(figsize=(9,4)); plt.plot(k_vals, cv_acc, 'o-', ms=4)
plt.axvline(best_k, color='red', ls='--', label=f'best k={best_k}')
plt.xlabel('k'); plt.ylabel('CV Accuracy'); plt.legend(); plt.title('KNN k Sensitivity'); plt.show()

for metric in ['euclidean','manhattan','cosine']:
    cv = cross_val_score(KNeighborsClassifier(n_neighbors=best_k,metric=metric), Xs_tr,y_tr,cv=5).mean()
    print(f"metric={metric:12s}  CV={cv:.4f}")

for w in ['uniform','distance']:
    cv = cross_val_score(KNeighborsClassifier(n_neighbors=best_k,weights=w), Xs_tr,y_tr,cv=5).mean()
    print(f"weights={w:10s}  CV={cv:.4f}")

pca_pipe = Pipeline([('pca', PCA(n_components=20)), ('sc', StandardScaler()),
                     ('knn', KNeighborsClassifier(n_neighbors=best_k))])
cv_pca = cross_val_score(pca_pipe, X_tr, y_tr, cv=5).mean()
print(f"With PCA(20): CV={cv_pca:.4f}  vs without: {max(cv_acc):.4f}")` }
  ]
};

L['ml-w4-l4'] = {
  duration_mins: 13,
  sections: [
    { type: 'text', body: `
<h2>KNN — Weighted Voting & Practical Considerations</h2>
<p>Standard KNN gives equal weight to all K neighbours regardless of their distance. <strong>Distance-weighted KNN</strong> gives closer neighbours more influence, weighting each vote by 1/distance. This often improves performance, especially when K is large.</p>
<h3>KNN for regression</h3>
<p>For regression, KNN predicts the average of the K nearest neighbours' target values. The same considerations apply: scale features, choose K via cross-validation, consider distance weighting.</p>
<h3>KNN as a recommendation engine</h3>
<p>The simplest form of collaborative filtering is user-user or item-item KNN: find the K most similar users (or items) and recommend what they liked. Before neural recommendation systems became dominant, KNN was the workhorse of recommendation at companies like Netflix and Amazon.</p>
<h3>When to use KNN</h3>
<p>Use KNN when: the dataset is small (&lt;10,000 samples, fast enough at prediction time); you need a simple, interpretable baseline; the decision boundary is highly irregular; or you're building a prototype quickly. Avoid it when: features are high-dimensional; the dataset is large (prediction is O(n) per sample); or interpretability of coefficients matters.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
from sklearn.datasets import load_breast_cancer, fetch_california_housing
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import roc_auc_score, mean_squared_error

# ── KNN Classification with distance weighting ─────────────────────────
data = load_breast_cancer()
X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
scaler = StandardScaler()
Xs_tr = scaler.fit_transform(X_tr); Xs_te = scaler.transform(X_te)

for weights in ['uniform', 'distance']:
    knn = KNeighborsClassifier(n_neighbors=7, weights=weights)
    knn.fit(Xs_tr, y_tr)
    auc = roc_auc_score(y_te, knn.predict_proba(Xs_te)[:,1])
    print(f"  weights={weights:10s}  AUC={auc:.4f}")

# ── KNN Regression ─────────────────────────────────────────────────────
housing = fetch_california_housing()
X_h, y_h = housing.data, housing.target
X_htr, X_hte, y_htr, y_hte = train_test_split(X_h, y_h, test_size=0.2, random_state=42)
sc_h = StandardScaler()
Xhs_tr = sc_h.fit_transform(X_htr); Xhs_te = sc_h.transform(X_hte)

results = {}
for k in [3, 5, 10, 20]:
    knn_r = KNeighborsRegressor(n_neighbors=k, weights='distance')
    knn_r.fit(Xhs_tr, y_htr)
    rmse = mean_squared_error(y_hte, knn_r.predict(Xhs_te), squared=False)
    results[k] = rmse
    print(f"  k={k:2d}  RMSE={rmse:.4f}")

# ── Scale sensitivity demo ─────────────────────────────────────────────
print("\nKNN without scaling:")
knn_unscaled = KNeighborsClassifier(n_neighbors=7)
cv_unscaled = cross_val_score(knn_unscaled, X, y, cv=5).mean()
print(f"  CV accuracy (unscaled): {cv_unscaled:.4f}")

print("KNN with scaling:")
from sklearn.pipeline import Pipeline
pipeline = Pipeline([('scale', StandardScaler()), ('knn', KNeighborsClassifier(n_neighbors=7))])
cv_scaled = cross_val_score(pipeline, X, y, cv=5).mean()
print(f"  CV accuracy (scaled)  : {cv_scaled:.4f}")` },
    { type: 'warn', body: `Scaling is <strong>mandatory</strong> for KNN. A salary feature ranging 0–200,000 will completely dominate a age feature ranging 18–70 in Euclidean distance calculations, making age effectively invisible. Always use a StandardScaler or MinMaxScaler inside a Pipeline.` },
    { type: 'exercise', title: 'KNN Regression for House Price Imputation', body: `<p>Use KNN regression as a feature imputation strategy — a common real-world use case:</p>
<ol>
<li>Load the California Housing dataset. Deliberately set 10% of <code>MedHouseVal</code> (the target) to NaN</li>
<li>For the rows with NaN target, use KNN regression (k=10) trained on the non-NaN rows to predict the missing values</li>
<li>Compare the imputed values to the true values: compute MAE and correlation</li>
<li>Bonus: compare k=3, 5, 10, 20 — which k gives the best imputation MAE?</li>
</ol>`,
    hint: `Split rows into <code>train_mask = ~y.isna()</code> and <code>pred_mask = y.isna()</code>. Scale features before KNN. <code>KNeighborsRegressor</code> is in <code>sklearn.neighbors</code>. Evaluate with <code>mean_absolute_error(y_true[pred_mask], y_imputed)</code>.`,
    solution: `import numpy as np, pandas as pd
from sklearn.datasets import fetch_california_housing
from sklearn.neighbors import KNeighborsRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error
import scipy.stats

housing = fetch_california_housing(as_frame=True)
X = housing.data.values; y = housing.target.values.copy()

np.random.seed(42)
nan_idx = np.random.choice(len(y), int(0.1*len(y)), replace=False)
y_nan = y.copy(); y_nan[nan_idx] = np.nan

train_mask = ~np.isnan(y_nan); pred_mask = np.isnan(y_nan)

sc = StandardScaler(); Xs = sc.fit_transform(X)

for k in [3, 5, 10, 20]:
    knn = KNeighborsRegressor(n_neighbors=k)
    knn.fit(Xs[train_mask], y_nan[train_mask])
    y_imputed = knn.predict(Xs[pred_mask])
    mae = mean_absolute_error(y[pred_mask], y_imputed)
    corr, _ = scipy.stats.pearsonr(y[pred_mask], y_imputed)
    print(f"k={k:2d}  MAE={mae:.4f}  r={corr:.4f}")` }
  ]
};

L['ml-w4-l5'] = {
  duration_mins: 16,
  sections: [
    { type: 'text', body: `
<h2>Model Comparison Case Study — SVM vs KNN vs Logistic Regression</h2>
<p>In this lesson we run a fair, systematic comparison of the three classifiers you've learned so far: Logistic Regression, SVM (RBF kernel), and KNN. "Fair" means all models use the same train/test splits, all are properly scaled, and all are tuned with cross-validation rather than default hyperparameters.</p>
<p>The goal is not to find the "winner" in the abstract — it's to develop intuition for how these models behave differently on different data shapes, and to practice the systematic comparison workflow you'll use on every real project.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import (cross_validate, StratifiedKFold,
                                      train_test_split, GridSearchCV)
from sklearn.metrics import roc_auc_score, classification_report
from sklearn.datasets import load_breast_cancer

data = load_breast_cancer()
X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

models = {
    'Logistic Regression': Pipeline([
        ('scale', StandardScaler()),
        ('clf', LogisticRegression(C=1.0, max_iter=10000, random_state=42))
    ]),
    'SVM (RBF)': Pipeline([
        ('scale', StandardScaler()),
        ('clf', SVC(kernel='rbf', C=10, gamma=0.01, probability=True, random_state=42))
    ]),
    'KNN (k=7)': Pipeline([
        ('scale', StandardScaler()),
        ('clf', KNeighborsClassifier(n_neighbors=7, weights='distance'))
    ]),
}

results = []
for name, pipeline in models.items():
    cv_res = cross_validate(pipeline, X_tr, y_tr, cv=skf,
                             scoring=['accuracy','roc_auc','f1'],
                             return_train_score=True)
    pipeline.fit(X_tr, y_tr)
    test_auc = roc_auc_score(y_te, pipeline.predict_proba(X_te)[:,1])
    results.append({
        'Model':         name,
        'CV Accuracy':   f"{cv_res['test_accuracy'].mean():.4f} ± {cv_res['test_accuracy'].std():.4f}",
        'CV ROC-AUC':    f"{cv_res['test_roc_auc'].mean():.4f} ± {cv_res['test_roc_auc'].std():.4f}",
        'CV F1':         f"{cv_res['test_f1'].mean():.4f} ± {cv_res['test_f1'].std():.4f}",
        'Test ROC-AUC':  f"{test_auc:.4f}",
    })
    print(f"\n=== {name} ===")
    print(classification_report(y_te, pipeline.predict(X_te), target_names=data.target_names))

print("\nSummary:")
print(pd.DataFrame(results).to_string(index=False))` },
    { type: 'exercise', title: 'Add Gradient Boosting to the Comparison', body: `<p>Extend the comparison above by adding <code>GradientBoostingClassifier(n_estimators=200, learning_rate=0.05, max_depth=3)</code> to the models dict. Note: Gradient Boosting doesn't require scaling. Compare its ROC-AUC and F1 against the three linear/instance-based models. Which algorithm performs best on this dataset?</p>`,
    hint: `Gradient Boosting is not affected by feature scale, so you can pass raw X_tr directly or wrap it in a Pipeline with a pass-through transformer.`,
    solution: `from sklearn.ensemble import GradientBoostingClassifier\nmodels['Gradient Boosting'] = GradientBoostingClassifier(\n    n_estimators=200, learning_rate=0.05, max_depth=3, random_state=42)\n# Add to the cross_validate loop above — no scaler needed for GBM` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 5 — UNSUPERVISED LEARNING
══════════════════════════════════════════════════════════════════════════ */

L['ml-w5-l1'] = {
  duration_mins: 16,
  sections: [
    { type: 'text', body: `
<h2>K-Means Clustering</h2>
<p>K-Means is the most widely used clustering algorithm. Given a target number of clusters K, it iteratively assigns each point to its nearest cluster centroid, then recomputes centroids as the mean of assigned points, until convergence. The result partitions the data into K non-overlapping groups.</p>
<h3>The algorithm step by step</h3>
<ol>
  <li>Randomly initialise K centroids (or use <em>k-means++</em> for smarter initialisation).</li>
  <li><strong>Assignment step</strong>: Assign each point to the nearest centroid (by Euclidean distance).</li>
  <li><strong>Update step</strong>: Recompute each centroid as the mean of all assigned points.</li>
  <li>Repeat steps 2–3 until centroid positions stop changing (or change less than a tolerance threshold).</li>
</ol>
<h3>Choosing K: The Elbow Method & Silhouette Score</h3>
<p>K-Means requires you to specify K in advance. Two diagnostics help:</p>
<p><strong>Elbow method</strong>: Plot the within-cluster sum of squares (WCSS) against K. WCSS decreases as K increases (adding more clusters always reduces it). The "elbow" — where the rate of decrease slows sharply — suggests the natural K.</p>
<p><strong>Silhouette score</strong>: Measures how similar each point is to its own cluster versus the next-nearest cluster. Ranges from -1 (badly misassigned) to +1 (well-separated). Averaged across all points; higher is better.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score, silhouette_samples
from sklearn.datasets import make_blobs

np.random.seed(42)
X, y_true = make_blobs(n_samples=400, centers=4, cluster_std=1.2, random_state=42)

scaler = StandardScaler()
Xs = scaler.fit_transform(X)

# ── Elbow & Silhouette sweep ───────────────────────────────────────────
k_range = range(2, 10)
wcss   = [KMeans(n_clusters=k, init='k-means++', n_init=10, random_state=42).fit(Xs).inertia_ for k in k_range]
sil    = [silhouette_score(Xs, KMeans(n_clusters=k, init='k-means++', n_init=10, random_state=42).fit_predict(Xs)) for k in k_range]

fig, axes = plt.subplots(1, 3, figsize=(15, 4))
axes[0].plot(list(k_range), wcss, marker='o')
axes[0].set_xlabel('K'); axes[0].set_ylabel('WCSS')
axes[0].set_title('Elbow Method — look for the kink')

axes[1].plot(list(k_range), sil, marker='o', color='coral')
axes[1].set_xlabel('K'); axes[1].set_ylabel('Silhouette Score')
axes[1].set_title('Silhouette Score — higher is better')

# ── Final model with best K ────────────────────────────────────────────
best_k = list(k_range)[np.argmax(sil)]
km = KMeans(n_clusters=best_k, init='k-means++', n_init=10, random_state=42)
labels = km.fit_predict(Xs)

axes[2].scatter(Xs[:,0], Xs[:,1], c=labels, cmap='tab10', s=20, alpha=0.7)
axes[2].scatter(km.cluster_centers_[:,0], km.cluster_centers_[:,1],
               c='black', s=200, marker='X', label='Centroids', zorder=5)
axes[2].set_title(f'K-Means Clusters (K={best_k})')
axes[2].legend()
plt.tight_layout(); plt.show()

# ── Practical: customer segmentation ──────────────────────────────────
# (In real projects, cluster on RFM features, then profile each cluster)
print(f"Best K = {best_k}")
print(f"Cluster sizes: {np.bincount(labels)}")
print(f"Silhouette score: {silhouette_score(Xs, labels):.4f}")` },
    { type: 'warn', body: `K-Means assumes clusters are spherical and roughly equal in size. It will partition the data into K groups no matter what — even if the true structure is non-spherical, nested, or has no clusters at all. Always visualise your clusters and ask whether the groupings make domain sense.` },
    { type: 'exercise', title: 'K-Means on Real Customer Data', body: `<p>Apply K-Means to the wine dataset (treat it as unlabelled clustering, ignore the true labels for training):</p>
<ol>
<li>Scale features with StandardScaler. Run K-Means for K = 2 to 10. Plot inertia (elbow) and silhouette score.</li>
<li>Choose the best K. Compute the Adjusted Rand Index (<code>adjusted_rand_score</code>) between your cluster labels and the true wine labels — how well do the clusters align with reality?</li>
<li>Profile each cluster: compute mean of every feature per cluster. Which features differ most between clusters?</li>
<li>Visualise clusters using the first 2 PCA components. Colour by cluster label and mark true class with marker shape.</li>
</ol>`,
    hint: `<code>from sklearn.metrics import adjusted_rand_score, silhouette_score</code>. For profiling: <code>pd.DataFrame(Xs, columns=feature_names).assign(cluster=labels).groupby('cluster').mean()</code>.`,
    solution: `import numpy as np, pandas as pd, matplotlib.pyplot as plt
from sklearn.datasets import load_wine
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.metrics import silhouette_score, adjusted_rand_score

data = load_wine(); X, y = data.data, data.target
sc = StandardScaler(); Xs = sc.fit_transform(X)

inertias, silhouettes = [], []
for k in range(2,11):
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    lbl = km.fit_predict(Xs); inertias.append(km.inertia_)
    silhouettes.append(silhouette_score(Xs, lbl))

fig,(ax1,ax2)=plt.subplots(1,2,figsize=(12,4))
ax1.plot(range(2,11),inertias,'o-'); ax1.set_xlabel('K'); ax1.set_ylabel('Inertia'); ax1.set_title('Elbow')
ax2.plot(range(2,11),silhouettes,'o-',color='coral'); ax2.set_xlabel('K'); ax2.set_ylabel('Silhouette'); ax2.set_title('Silhouette')
plt.tight_layout(); plt.show()

best_k = 3
km = KMeans(n_clusters=best_k, random_state=42, n_init=10)
labels = km.fit_predict(Xs)
print(f"ARI (vs true labels): {adjusted_rand_score(y, labels):.4f}")

profile = pd.DataFrame(Xs, columns=data.feature_names).assign(cluster=labels).groupby('cluster').mean()
print(profile.round(2))

pca = PCA(n_components=2); Xp = pca.fit_transform(Xs)
markers = ['o','s','^']
for cls in range(3):
    m = y==cls
    plt.scatter(Xp[m,0], Xp[m,1], c=labels[m], marker=markers[cls], s=40, alpha=0.7, cmap='Set1', label=f'True class {cls}')
plt.colorbar(label='Cluster'); plt.legend(); plt.title('K-Means clusters (colour) vs true class (shape)'); plt.show()` }
  ]
};

L['ml-w5-l2'] = {
  duration_mins: 15,
  sections: [
    { type: 'text', body: `
<h2>Hierarchical Clustering & Dendrograms</h2>
<p>Hierarchical clustering builds a full tree of cluster relationships — a <em>dendrogram</em> — without requiring you to specify K in advance. You choose the number of clusters by cutting the tree at a desired height. This is powerful for exploratory analysis where you don't know the right number of clusters.</p>
<h3>Agglomerative (bottom-up) clustering</h3>
<ol>
  <li>Start with each point as its own cluster.</li>
  <li>Merge the two most similar clusters.</li>
  <li>Repeat until all points are in one cluster.</li>
</ol>
<p>The choice of <strong>linkage criterion</strong> determines how "similarity between clusters" is measured:</p>
<ul>
  <li><strong>Ward linkage</strong> — Merges clusters that minimise the increase in total within-cluster variance. Produces compact, roughly equal-sized clusters. Default choice.</li>
  <li><strong>Complete linkage</strong> — Distance between clusters = maximum pairwise distance. Produces compact clusters; sensitive to outliers.</li>
  <li><strong>Average linkage</strong> — Distance = average pairwise distance. Compromise between single and complete.</li>
  <li><strong>Single linkage</strong> — Distance = minimum pairwise distance. Creates long, chain-like clusters (the "chaining" effect). Rarely the best choice except for elongated clusters.</li>
</ul>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import AgglomerativeClustering
from sklearn.datasets import make_blobs
from sklearn.preprocessing import StandardScaler
from scipy.cluster.hierarchy import dendrogram, linkage, fcluster
from sklearn.metrics import silhouette_score

np.random.seed(42)
X, _ = make_blobs(n_samples=150, centers=4, cluster_std=1.0, random_state=42)
scaler = StandardScaler()
Xs = scaler.fit_transform(X)

# ── Dendrogram ─────────────────────────────────────────────────────────
Z = linkage(Xs, method='ward')

fig, axes = plt.subplots(1, 2, figsize=(14, 5))
dendrogram(Z, ax=axes[0], truncate_mode='lastp', p=30,
           leaf_rotation=90, leaf_font_size=8)
axes[0].set_title('Dendrogram (Ward linkage) — cut the horizontal line to choose K')
axes[0].set_xlabel('Sample index'); axes[0].set_ylabel('Distance')

# Cut at K=4
labels_hier = fcluster(Z, t=4, criterion='maxclust') - 1
axes[1].scatter(Xs[:,0], Xs[:,1], c=labels_hier, cmap='tab10', s=20, alpha=0.7)
axes[1].set_title('Agglomerative Clusters (K=4, Ward)')
plt.tight_layout(); plt.show()

# ── Compare linkage methods ────────────────────────────────────────────
print("Silhouette scores by linkage method:")
for linkage_method in ['ward', 'complete', 'average', 'single']:
    model = AgglomerativeClustering(n_clusters=4, linkage=linkage_method)
    labels = model.fit_predict(Xs)
    sil = silhouette_score(Xs, labels)
    print(f"  {linkage_method:10s}: {sil:.4f}")` },
    { type: 'exercise', title: 'Hierarchical vs K-Means Comparison', body: `<p>Compare K-Means and Hierarchical Clustering on two synthetic datasets: one with circular clusters and one with elongated clusters:</p>
<ol>
<li>Generate: (a) 3 isotropic blobs with <code>make_blobs</code> (standard), (b) 3 elongated clusters using <code>make_blobs</code> with <code>cluster_std=[0.5,2,0.5]</code> and rotate one cluster</li>
<li>Apply K-Means (k=3) and Agglomerative Clustering (k=3, linkage='ward') to both datasets</li>
<li>Plot 4 panels: 2 datasets × 2 algorithms, coloured by cluster label</li>
<li>Compute ARI against ground truth for all 4 combinations. Which algorithm handles elongated clusters better?</li>
</ol>`,
    hint: `<code>from sklearn.cluster import AgglomerativeClustering</code>. For rotation: use a 2D rotation matrix on the elongated blob. <code>make_blobs(n_samples=300, centers=3, cluster_std=[1,2.5,0.8])</code> creates different-sized clusters.`,
    solution: `import numpy as np, matplotlib.pyplot as plt
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans, AgglomerativeClustering
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import adjusted_rand_score

np.random.seed(42)
X_iso, y_iso = make_blobs(300, centers=3, cluster_std=1.2, random_state=42)
X_aniso, y_aniso = make_blobs(300, centers=3, cluster_std=[0.5,2.5,0.8], random_state=42)
# Rotate one cluster
theta=np.pi/4; R=np.array([[np.cos(theta),-np.sin(theta)],[np.sin(theta),np.cos(theta)]])
mask=y_aniso==1; X_aniso[mask] = X_aniso[mask] @ R

datasets=[('Isotropic',X_iso,y_iso),('Elongated',X_aniso,y_aniso)]
algorithms=[('K-Means', KMeans(3,random_state=42,n_init=10)),
            ('Ward Hierarchical', AgglomerativeClustering(3, linkage='ward'))]

fig,axes=plt.subplots(2,2,figsize=(12,8))
for row,(dname,X,y_true) in enumerate(datasets):
    sc=StandardScaler(); Xs=sc.fit_transform(X)
    for col,(aname,alg) in enumerate(algorithms):
        labels=alg.fit_predict(Xs)
        ari=adjusted_rand_score(y_true,labels)
        axes[row,col].scatter(X[:,0],X[:,1],c=labels,cmap='Set1',s=15,alpha=0.7)
        axes[row,col].set_title(f'{dname} — {aname}\nARI={ari:.3f}')
plt.tight_layout(); plt.show()` }
  ]
};

L['ml-w5-l3'] = {
  duration_mins: 15,
  sections: [
    { type: 'text', body: `
<h2>DBSCAN — Density-Based Clustering</h2>
<p>DBSCAN (Density-Based Spatial Clustering of Applications with Noise) takes a completely different approach: it defines clusters as dense regions separated by sparse regions. It can find clusters of arbitrary shape, handles noise (outliers) naturally by labelling them as such, and doesn't require you to specify the number of clusters.</p>
<h3>The two parameters</h3>
<p><strong>ε (eps)</strong> — The maximum distance within which two points are considered neighbours. If point B is within ε of point A, they are in each other's neighbourhood.</p>
<p><strong>min_samples</strong> — The minimum number of points within ε to define a core point. A <em>core point</em> has at least min_samples neighbours within ε. <em>Border points</em> are within ε of a core point but have too few neighbours themselves. <em>Noise points</em> (labelled −1) are neither core nor border — true outliers.</p>
<h3>When to use DBSCAN</h3>
<ul>
  <li>Clusters are non-spherical (rings, crescents, irregular shapes).</li>
  <li>You want outliers explicitly labelled rather than forced into a cluster.</li>
  <li>You don't know the number of clusters in advance.</li>
  <li>Anomaly detection — isolate noise points.</li>
</ul>
<p>DBSCAN struggles when clusters have very different densities, and ε needs careful tuning (usually via a k-distance plot).</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import DBSCAN, KMeans
from sklearn.datasets import make_moons, make_circles, make_blobs
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score

fig, axes = plt.subplots(2, 3, figsize=(15, 9))

datasets = [
    make_moons(n_samples=300, noise=0.1, random_state=42),
    make_circles(n_samples=300, noise=0.05, factor=0.5, random_state=42),
    make_blobs(n_samples=300, centers=[[-3,-3],[0,3],[3,-3]], cluster_std=[0.5,0.5,0.5], random_state=42),
]
dset_names = ['Moons', 'Circles', 'Blobs']

scaler = StandardScaler()
for col, (X, y_true), name in zip(range(3), datasets, dset_names):
    Xs = scaler.fit_transform(X)

    # K-Means
    km_labels = KMeans(n_clusters=2, n_init=10, random_state=42).fit_predict(Xs)
    axes[0,col].scatter(Xs[:,0], Xs[:,1], c=km_labels, cmap='tab10', s=20, alpha=0.7)
    axes[0,col].set_title(f'{name}: K-Means (K=2)')

    # DBSCAN
    db = DBSCAN(eps=0.3, min_samples=5).fit(Xs)
    db_labels = db.labels_
    n_clusters = len(set(db_labels)) - (1 if -1 in db_labels else 0)
    n_noise    = (db_labels == -1).sum()
    axes[1,col].scatter(Xs[:,0], Xs[:,1], c=db_labels, cmap='tab10', s=20, alpha=0.7)
    axes[1,col].set_title(f'{name}: DBSCAN ({n_clusters} clusters, {n_noise} noise pts)')

plt.suptitle('K-Means (top) vs DBSCAN (bottom) on Different Cluster Shapes',
             fontsize=12, fontweight='bold', y=1.01)
plt.tight_layout(); plt.show()

# ── k-distance plot to help choose eps ────────────────────────────────
from sklearn.neighbors import NearestNeighbors
X_demo, _ = make_moons(n_samples=300, noise=0.1, random_state=42)
Xs_demo = scaler.fit_transform(X_demo)
nbrs = NearestNeighbors(n_neighbors=5).fit(Xs_demo)
distances, _ = nbrs.kneighbors(Xs_demo)
k_dists = np.sort(distances[:, -1])[::-1]

fig, ax = plt.subplots(figsize=(7, 3))
ax.plot(k_dists)
ax.set_xlabel('Points sorted by 5th-nearest-neighbour distance')
ax.set_ylabel('Distance')
ax.set_title('k-Distance Plot — the "knee" suggests a good eps value')
plt.tight_layout(); plt.show()` },
    { type: 'exercise', title: 'DBSCAN for Anomaly Detection', body: `<p>DBSCAN labels low-density points as noise (label = -1), making it a natural anomaly detector:</p>
<ol>
<li>Generate 1000 normal transactions: amount ~ Normal(500, 100), duration ~ Normal(30, 5). Add 20 anomalous transactions: amount ~ Normal(5000, 500), duration ~ Normal(2, 0.5)</li>
<li>Standardise features. Apply DBSCAN with eps=0.3 and min_samples=10</li>
<li>How many points were labelled as noise (label=-1)? What fraction of the noise points are true anomalies?</li>
<li>Sweep eps from 0.1 to 1.0 (step 0.1). For each eps, report: n_clusters, n_noise, and precision/recall for anomaly detection.</li>
</ol>`,
    hint: `Create a ground-truth anomaly array: 0 for normal, 1 for anomalous. Points with <code>labels == -1</code> are DBSCAN's anomalies. Precision = TP/(TP+FP), Recall = TP/(TP+FN) where TP = anomalies that DBSCAN flags as noise.`,
    solution: `import numpy as np, matplotlib.pyplot as plt
from sklearn.cluster import DBSCAN
from sklearn.preprocessing import StandardScaler

np.random.seed(42)
X_normal = np.column_stack([np.random.normal(500,100,1000), np.random.normal(30,5,1000)])
X_anomaly = np.column_stack([np.random.normal(5000,500,20), np.random.normal(2,0.5,20)])
X = np.vstack([X_normal, X_anomaly])
y_true = np.array([0]*1000 + [1]*20)

sc = StandardScaler(); Xs = sc.fit_transform(X)

print(f"{'eps':>5} {'clusters':>9} {'noise':>7} {'precision':>10} {'recall':>8}")
for eps in np.arange(0.1, 1.1, 0.1):
    db = DBSCAN(eps=round(eps,1), min_samples=10).fit(Xs)
    flagged = (db.labels_ == -1).astype(int)
    tp = ((flagged==1) & (y_true==1)).sum(); fp = ((flagged==1) & (y_true==0)).sum()
    fn = ((flagged==0) & (y_true==1)).sum()
    prec = tp/(tp+fp) if (tp+fp)>0 else 0; rec = tp/(tp+fn) if (tp+fn)>0 else 0
    n_cl = len(set(db.labels_)) - (1 if -1 in db.labels_ else 0)
    print(f"{eps:5.1f} {n_cl:>9} {flagged.sum():>7} {prec:>10.3f} {rec:>8.3f}")` }
  ]
};

L['ml-w5-l4'] = {
  duration_mins: 16,
  sections: [
    { type: 'text', body: `
<h2>Principal Component Analysis (PCA)</h2>
<p>PCA is the most widely used dimensionality reduction technique. It finds the directions of maximum variance in the data — called <em>principal components</em> — and projects the data onto those directions. The first component captures the most variance, the second (orthogonal to the first) captures the next most, and so on.</p>
<h3>Why reduce dimensions?</h3>
<ul>
  <li><strong>Visualisation</strong> — You can't visualise 30 features; you can visualise 2 or 3 principal components.</li>
  <li><strong>Speed</strong> — Training on 10 components instead of 100 features is 10× faster.</li>
  <li><strong>Noise reduction</strong> — Low-variance components often represent noise; discarding them can improve model generalisation.</li>
  <li><strong>Multicollinearity</strong> — PCA components are orthogonal (uncorrelated), which solves multicollinearity for linear models.</li>
</ul>
<h3>How much variance to keep?</h3>
<p>Plot the <em>explained variance ratio</em> cumulatively. Choose the number of components that captures 90–95% of variance, or look for a "knee" in the scree plot. sklearn's <code>PCA(n_components=0.95)</code> automatically selects the number needed to explain 95% of variance.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import load_breast_cancer, load_digits
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import Pipeline

# ── PCA for visualisation ─────────────────────────────────────────────
data = load_breast_cancer()
X, y = data.data, data.target

pca_2d = Pipeline([('scale', StandardScaler()), ('pca', PCA(n_components=2))])
X_2d   = pca_2d.fit_transform(X)

fig, axes = plt.subplots(1, 2, figsize=(13, 5))
for cls, name, color in zip([0,1], data.target_names, ['red','blue']):
    mask = y == cls
    axes[0].scatter(X_2d[mask,0], X_2d[mask,1], s=20, alpha=0.6, label=name, c=color)
axes[0].set_xlabel('PC 1'); axes[0].set_ylabel('PC 2')
axes[0].set_title('Breast Cancer: First Two Principal Components')
axes[0].legend()

# ── Scree plot ─────────────────────────────────────────────────────────
scaler = StandardScaler()
Xs = scaler.fit_transform(X)
pca_full = PCA().fit(Xs)

axes[1].bar(range(1, 11), pca_full.explained_variance_ratio_[:10]*100,
            color='steelblue', edgecolor='white')
axes[1].plot(range(1, 11),
             np.cumsum(pca_full.explained_variance_ratio_[:10])*100,
             marker='o', color='coral', label='Cumulative %')
axes[1].set_xlabel('Principal Component')
axes[1].set_ylabel('Variance Explained (%)')
axes[1].set_title('Scree Plot')
axes[1].legend()
plt.tight_layout(); plt.show()

# ── PCA for speed: digits dataset (64 features → few components) ───────
digits = load_digits()
X_d, y_d = digits.data, digits.target
for n_comp in [10, 20, 30, 40, 64]:
    pipe = Pipeline([
        ('scale', StandardScaler()),
        ('pca',   PCA(n_components=n_comp)),
        ('lr',    LogisticRegression(max_iter=2000, random_state=42))
    ])
    cv = cross_val_score(pipe, X_d, y_d, cv=5).mean()
    print(f"n_components={n_comp:3d}  CV accuracy={cv:.4f}")
print("\n64 components = original (no PCA) — compare accuracy loss")` },
    { type: 'exercise', title: 'PCA for Noise Reduction & Feature Engineering', body: `<p>Apply PCA in two practical ways:</p>
<ol>
<li><strong>Explained variance selection:</strong> On the breast cancer dataset, find the minimum number of PCA components that capture 95% of total variance. Plot the cumulative explained variance curve.</li>
<li><strong>PCA as preprocessing:</strong> Compare Logistic Regression accuracy with: (a) raw features, (b) top-k PCA components (k chosen for 95% variance), (c) all PCA components. Use 5-fold CV for each.</li>
<li><strong>Noise reduction:</strong> Add Gaussian noise to the features (noise_std=2.0). Re-run the comparison — does PCA help more when the data is noisy?</li>
</ol>`,
    hint: `<code>pca.explained_variance_ratio_.cumsum()</code> gives cumulative variance. Find k where this first exceeds 0.95: <code>k = np.argmax(pca.explained_variance_ratio_.cumsum() >= 0.95) + 1</code>.`,
    solution: `import numpy as np, matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer
from sklearn.decomposition import PCA
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import Pipeline

data = load_breast_cancer(); X, y = data.data, data.target

# 1. Find k for 95% variance
sc = StandardScaler(); Xs = sc.fit_transform(X)
pca_full = PCA().fit(Xs)
cumvar = pca_full.explained_variance_ratio_.cumsum()
k95 = np.argmax(cumvar >= 0.95) + 1
plt.plot(range(1,len(cumvar)+1), cumvar); plt.axvline(k95, ls='--', color='red', label=f'k={k95} (95%)')
plt.xlabel('Components'); plt.ylabel('Cumulative Explained Variance')
plt.title('PCA Variance'); plt.legend(); plt.show()
print(f"Components for 95% variance: {k95}")

# 2. Accuracy comparison (clean)
for name, pipe in [
    ('Raw', Pipeline([('sc', StandardScaler()), ('lr', LogisticRegression(max_iter=2000))])),
    (f'PCA-{k95}', Pipeline([('sc', StandardScaler()), ('pca', PCA(n_components=k95)), ('lr', LogisticRegression(max_iter=2000))])),
    (f'PCA-all', Pipeline([('sc', StandardScaler()), ('pca', PCA()), ('lr', LogisticRegression(max_iter=2000))])),
]:
    cv = cross_val_score(pipe, X, y, cv=5).mean()
    print(f"{name:<12}: CV accuracy = {cv:.4f}")

# 3. With noise
X_noisy = X + np.random.normal(0, 2.0, X.shape)
print("\nWith noise:")
for name, pipe in [('Raw noisy', Pipeline([('sc', StandardScaler()), ('lr', LogisticRegression(max_iter=2000))])),
                    (f'PCA-{k95} noisy', Pipeline([('sc', StandardScaler()), ('pca', PCA(n_components=k95)), ('lr', LogisticRegression(max_iter=2000))]))]:
    print(f"{name}: {cross_val_score(pipe, X_noisy, y, cv=5).mean():.4f}")` }
  ]
};

L['ml-w5-l5'] = {
  duration_mins: 14,
  sections: [
    { type: 'text', body: `
<h2>t-SNE & UMAP — Non-Linear Dimensionality Reduction</h2>
<p>PCA is a linear technique — it can only find linear combinations of features. Many real datasets have non-linear structure that PCA misses. t-SNE and UMAP are non-linear methods that excel at preserving local structure for <strong>visualisation</strong>.</p>
<h3>t-SNE (t-Distributed Stochastic Neighbour Embedding)</h3>
<p>t-SNE models the probability that two points are neighbours in the high-dimensional space (using a Gaussian kernel), then finds a 2D layout that preserves those probabilities (using a heavier-tailed t-distribution). The result tends to produce visually striking cluster separations. Key hyperparameter: <em>perplexity</em> (5–50, controls the effective number of neighbours — think of it as the characteristic cluster scale).</p>
<p><strong>Caveats</strong>: t-SNE is stochastic (different runs give different layouts), slow on large datasets, and should not be used for anything other than visualisation — distances and cluster sizes in t-SNE plots are not directly interpretable.</p>
<h3>UMAP (Uniform Manifold Approximation and Projection)</h3>
<p>UMAP is faster than t-SNE, preserves more global structure (the overall topology), and can be used for general-purpose dimensionality reduction (not just visualisation). It also supports transforming new data — t-SNE does not. For most modern applications, UMAP is preferred over t-SNE.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.manifold import TSNE
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import load_digits, load_iris

# ── t-SNE on the Digits dataset (1797 samples, 64 features, 10 classes) ─
digits = load_digits()
X, y = digits.data, digits.target

scaler = StandardScaler()
Xs = scaler.fit_transform(X)

# Run t-SNE (can take 20-60 seconds on larger datasets)
tsne = TSNE(n_components=2, perplexity=30, learning_rate='auto',
            init='pca', random_state=42, n_iter=1000)
X_tsne = tsne.fit_transform(Xs)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))
scatter = axes[0].scatter(X_tsne[:,0], X_tsne[:,1], c=y,
                           cmap='tab10', s=10, alpha=0.7)
plt.colorbar(scatter, ax=axes[0])
axes[0].set_title('t-SNE: Digits Dataset (10 classes)')
axes[0].set_xlabel('t-SNE 1'); axes[0].set_ylabel('t-SNE 2')

# ── Effect of perplexity ───────────────────────────────────────────────
from sklearn.datasets import load_iris
iris_X, iris_y = load_iris().data, load_iris().target
iris_Xs = scaler.fit_transform(iris_X)

for i, perp in enumerate([5, 30, 50]):
    t = TSNE(n_components=2, perplexity=perp, random_state=42).fit_transform(iris_Xs)
    if i == 1:
        for cls, name in enumerate(['Setosa','Versicolor','Virginica']):
            m = iris_y == cls
            axes[1].scatter(t[m,0], t[m,1], s=20, alpha=0.8, label=name)
        axes[1].set_title(f't-SNE on Iris (perplexity={perp})')
        axes[1].legend(fontsize=8)
plt.tight_layout(); plt.show()

print("\nNote: For UMAP, install with 'pip install umap-learn'")
print("Usage: import umap; reducer = umap.UMAP(n_neighbors=15, min_dist=0.1)")
print("       X_umap = reducer.fit_transform(Xs)")` },
    { type: 'exercise', title: 'Cluster and Visualise Customer Segments', body: `<p>Generate a customer dataset with 5 features: <code>recency</code>, <code>frequency</code>, <code>monetary</code>, <code>age</code>, <code>tenure_months</code>. Apply K-Means (find the best K with the elbow method), then visualise the resulting clusters with t-SNE. Label each cluster with its mean RFM values to give it a business name (e.g., "Champions", "At Risk").</p>`,
    hint: `Scale before both K-Means and t-SNE. For t-SNE, pass <code>n_components=2</code>. Use the cluster labels as colours in the scatter plot.`,
    solution: `# Generate, scale, find K with WCSS, fit KMeans(n_clusters=best_k)\n# labels = km.fit_predict(Xs)\n# X_tsne = TSNE(n_components=2, random_state=42).fit_transform(Xs)\n# plt.scatter(X_tsne[:,0], X_tsne[:,1], c=labels, cmap='tab10')\n# Profile: df.groupby('cluster')[rfm_cols].mean()` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 6 — MODEL EVALUATION & TUNING
══════════════════════════════════════════════════════════════════════════ */

L['ml-w6-l1'] = {
  duration_mins: 16,
  sections: [
    { type: 'text', body: `
<h2>Cross-Validation in Depth</h2>
<p>Cross-validation (CV) is the most important tool for honest model evaluation. A single train/test split is a lottery — the result depends heavily on which specific samples ended up in which set. CV averages over many splits, producing a stable, representative estimate of how well your model generalises.</p>
<h3>Stratified K-Fold — the right default for classification</h3>
<p>Standard K-Fold splits randomly. If one class is rare (say, 5% of samples), a random fold might contain none of that class at all — making training and evaluation meaningless. Stratified K-Fold guarantees each fold preserves the overall class proportions.</p>
<h3>Time Series CV — respecting temporal order</h3>
<p>With time-series data, you must never use future data to predict the past. <code>TimeSeriesSplit</code> implements expanding-window CV: each fold uses all past data for training and the next time window for validation. Never use standard K-Fold on time-series data.</p>
<h3>Grouped CV — when samples aren't independent</h3>
<p>If multiple samples come from the same patient, user, or session, standard CV will leak information across the train/test boundary (two samples from the same patient will end up in different folds, but they share structure). <code>GroupKFold</code> ensures all samples from one group stay together in one fold.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import (KFold, StratifiedKFold, TimeSeriesSplit,
                                      GroupKFold, cross_validate)
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
from sklearn.preprocessing import StandardScaler

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=10,
                            weights=[0.85, 0.15], random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)

# ── Compare CV strategies ──────────────────────────────────────────────
cv_strategies = {
    'KFold (5)':            KFold(n_splits=5, shuffle=True, random_state=42),
    'StratifiedKFold (5)':  StratifiedKFold(n_splits=5, shuffle=True, random_state=42),
    'KFold (10)':           KFold(n_splits=10, shuffle=True, random_state=42),
    'StratifiedKFold (10)': StratifiedKFold(n_splits=10, shuffle=True, random_state=42),
}

print(f"Class balance: {np.bincount(y)}")
print(f"\n{'Strategy':25s}  {'Mean ROC-AUC':15s}  {'Std':8s}  {'Min':8s}  {'Max':8s}")
for name, cv in cv_strategies.items():
    res = cross_validate(model, X, y, cv=cv, scoring='roc_auc')['test_score']
    print(f"{name:25s}  {res.mean():.4f}         {res.std():.4f}    {res.min():.4f}    {res.max():.4f}")

# ── Time Series CV visualisation ───────────────────────────────────────
tscv = TimeSeriesSplit(n_splits=5)
fig, ax = plt.subplots(figsize=(10, 3))
for i, (tr_idx, te_idx) in enumerate(tscv.split(X)):
    ax.scatter(tr_idx, [i]*len(tr_idx), c='steelblue', marker='|', s=5, alpha=0.3)
    ax.scatter(te_idx, [i]*len(te_idx), c='coral',     marker='|', s=5)
ax.set_xlabel('Sample index'); ax.set_ylabel('Fold')
ax.set_title('TimeSeriesSplit: training (blue) grows; test (red) moves forward')
plt.tight_layout(); plt.show()` }
  ]
};

L['ml-w6-l2'] = {
  duration_mins: 17,
  sections: [
    { type: 'text', body: `
<h2>Hyperparameter Tuning — Grid Search, Random Search & Bayesian Optimisation</h2>
<p>Hyperparameters are settings you choose before training (number of trees, learning rate, regularisation strength). Unlike model parameters (weights, coefficients), they're not learned from data — you tune them. The goal is to find the hyperparameter combination that maximises generalisation performance on held-out data.</p>
<h3>Grid Search</h3>
<p>Exhaustively tries every combination in a defined grid. Simple, reproducible, and guaranteed to find the best combination in the grid — but scales exponentially with the number of hyperparameters and values. 4 hyperparameters × 4 values each = 4⁴ = 256 combinations × number of CV folds.</p>
<h3>Randomised Search</h3>
<p>Samples combinations randomly from continuous or discrete distributions. Counterintuitively, random search finds good hyperparameters faster than grid search in high-dimensional spaces — because not all hyperparameters matter equally, and random search is more likely to explore diverse values of the important ones.</p>
<h3>Bayesian Optimisation</h3>
<p>Builds a probabilistic model of how hyperparameter values relate to validation performance, then uses it to choose the next trial intelligently — focusing on promising regions. Libraries: <code>optuna</code> (recommended), <code>scikit-optimize</code>, <code>hyperopt</code>. Often finds better solutions in 50 trials than grid search in 500.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
from scipy.stats import randint, uniform
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import (train_test_split, GridSearchCV,
                                      RandomizedSearchCV, cross_val_score)
from sklearn.datasets import load_breast_cancer
import time

data = load_breast_cancer()
X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# ── Grid Search ────────────────────────────────────────────────────────
param_grid = {
    'n_estimators': [100, 200],
    'max_depth':    [None, 5, 10],
    'min_samples_leaf': [1, 3, 5],
}
t0 = time.time()
gs = GridSearchCV(RandomForestClassifier(random_state=42),
                  param_grid, cv=5, scoring='roc_auc', n_jobs=-1)
gs.fit(X_tr, y_tr)
t_gs = time.time() - t0
print(f"Grid Search:   best AUC={gs.best_score_:.4f}  trials={len(gs.cv_results_['mean_test_score'])}  time={t_gs:.1f}s")
print(f"  Best params: {gs.best_params_}")

# ── Randomised Search ─────────────────────────────────────────────────
param_dist = {
    'n_estimators':     randint(50, 500),
    'max_depth':        [None, 5, 10, 15, 20],
    'min_samples_leaf': randint(1, 20),
    'max_features':     uniform(0.2, 0.8),
}
t0 = time.time()
rs = RandomizedSearchCV(RandomForestClassifier(random_state=42),
                         param_dist, n_iter=50, cv=5, scoring='roc_auc',
                         random_state=42, n_jobs=-1)
rs.fit(X_tr, y_tr)
t_rs = time.time() - t0
print(f"\nRandomised:    best AUC={rs.best_score_:.4f}  trials=50  time={t_rs:.1f}s")
print(f"  Best params: {rs.best_params_}")

# ── Report final test performance ──────────────────────────────────────
from sklearn.metrics import roc_auc_score
for name, model in [('GridSearch', gs.best_estimator_), ('RandomSearch', rs.best_estimator_)]:
    prob = model.predict_proba(X_te)[:, 1]
    print(f"{name:15s} test AUC: {roc_auc_score(y_te, prob):.4f}")` }
  ]
};

L['ml-w6-l3'] = {
  duration_mins: 16,
  sections: [
    { type: 'text', body: `
<h2>The Bias-Variance Tradeoff</h2>
<p>Every model error has two fundamental components — bias and variance — plus irreducible noise. Understanding this decomposition tells you whether your model is underfitting or overfitting, and guides your next action.</p>
<h3>The decomposition</h3>
<p><strong>Bias</strong> is systematic error — the difference between the average prediction of your model and the true value. A high-bias model is too simple. It makes the same systematic mistakes on any dataset drawn from the same distribution. Example: fitting a linear model to non-linear data.</p>
<p><strong>Variance</strong> is sensitivity to training data fluctuations. A high-variance model fits the training data very closely but produces different predictions when trained on different samples from the same distribution. Example: a very deep decision tree that memorises noise.</p>
<p><strong>Expected error = Bias² + Variance + Irreducible noise</strong></p>
<p>The irreducible noise is the fundamental randomness in the data — even a perfect model can't eliminate it. Bias and variance trade off against each other: increasing model complexity reduces bias but increases variance. Your job is to find the sweet spot.</p>
<h3>Diagnosing with learning curves</h3>
<p>A <em>learning curve</em> plots training and validation error as a function of training set size. The shape tells you everything: high bias shows both errors high and converging; high variance shows a large gap between train and val errors.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.model_selection import learning_curve, validation_curve
from sklearn.datasets import make_regression
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_breast_cancer

np.random.seed(42)
X, y = make_regression(n_samples=300, n_features=1, noise=20, random_state=42)

fig, axes = plt.subplots(1, 3, figsize=(15, 4))

# ── Underfitting vs. well-fit vs. overfitting ─────────────────────────
x_plot = np.linspace(X.min(), X.max(), 200).reshape(-1,1)
for ax, degree, title in zip(axes, [1, 3, 15],
                              ['Degree 1 (Underfitting)','Degree 3 (Good fit)','Degree 15 (Overfitting)']):
    pipe = Pipeline([('poly', PolynomialFeatures(degree)), ('lr', LinearRegression())])
    pipe.fit(X, y)
    ax.scatter(X, y, s=15, alpha=0.4)
    ax.plot(x_plot, pipe.predict(x_plot), 'r-', lw=2)
    ax.set_title(title)
plt.tight_layout(); plt.show()

# ── Learning curves ────────────────────────────────────────────────────
cancer = load_breast_cancer()
X_c, y_c = cancer.data, cancer.target

fig, axes = plt.subplots(1, 2, figsize=(13, 5))
for ax, model, label in zip(axes,
    [DecisionTreeClassifier(max_depth=1, random_state=42),   # high bias
     DecisionTreeClassifier(max_depth=None, random_state=42)],  # high variance
    ['Shallow Tree (max_depth=1) — High Bias', 'Full Tree (max_depth=None) — High Variance']):

    train_sizes, train_scores, val_scores = learning_curve(
        model, X_c, y_c, cv=5, scoring='accuracy',
        train_sizes=np.linspace(0.1, 1.0, 10), n_jobs=-1)

    tr_mean = train_scores.mean(axis=1)
    va_mean = val_scores.mean(axis=1)
    ax.plot(train_sizes, tr_mean, 'o-', label='Train accuracy')
    ax.plot(train_sizes, va_mean, 's-', label='CV accuracy', color='coral')
    ax.fill_between(train_sizes, tr_mean-train_scores.std(axis=1),
                    tr_mean+train_scores.std(axis=1), alpha=0.1)
    ax.fill_between(train_sizes, va_mean-val_scores.std(axis=1),
                    va_mean+val_scores.std(axis=1), alpha=0.1, color='coral')
    ax.set_title(label); ax.set_xlabel('Training set size')
    ax.set_ylabel('Accuracy'); ax.legend()
plt.tight_layout(); plt.show()` },
    { type: 'exercise', title: 'TimeSeriesSplit vs Standard CV', body: `<p>Demonstrate that standard K-Fold is invalid for time series — it leaks future data into training:</p>
<ol>
<li>Generate a time-ordered synthetic series: <code>y = sin(t/10) + 0.1*t + noise</code> for t=0..999. Features: lags [y_{t-1}, y_{t-2}, y_{t-3}]. Target: y_t.</li>
<li>Train a Ridge regression model and evaluate with: (a) 5-fold KFold (shuffled), (b) TimeSeriesSplit(n_splits=5). Report mean RMSE for each.</li>
<li>Why should KFold give an overly optimistic (low) RMSE for time series? Explain in a comment.</li>
<li>Bonus: plot the TimeSeriesSplit fold boundaries on the time axis to visualise why ordering matters.</li>
</ol>`,
    hint: `Create lag features with <code>np.column_stack([y[i:n+i] for i in range(3, 0, -1)])</code>. Don't shuffle TimeSeriesSplit. The KFold RMSE is optimistic because it trains on future data to predict past values.`,
    solution: `import numpy as np, matplotlib.pyplot as plt
from sklearn.linear_model import Ridge
from sklearn.model_selection import KFold, TimeSeriesSplit, cross_val_score
from sklearn.metrics import mean_squared_error

np.random.seed(42); n=1000; t=np.arange(n)
y = np.sin(t/10) + 0.01*t + np.random.normal(0,0.5,n)
X = np.column_stack([y[2:n], y[1:n-1], y[0:n-2]]); y_target = y[3:]

kf   = KFold(n_splits=5, shuffle=True, random_state=42)
tscv = TimeSeriesSplit(n_splits=5)

for name, cv in [('KFold (shuffled)', kf), ('TimeSeriesSplit', tscv)]:
    rmse = np.sqrt(-cross_val_score(Ridge(), X, y_target, cv=cv, scoring='neg_mean_squared_error').mean())
    print(f"{name:25s} RMSE={rmse:.4f}")
# KFold gives optimistic RMSE because it trains on future data to predict past values.
# A model trained on data from t=500-900 to predict t=100 appears accurate
# but this would never happen in production.` }
  ]
};

L['ml-w6-l4'] = {
  duration_mins: 15,
  sections: [
    { type: 'text', body: `
<h2>Diagnosing & Fixing Model Problems</h2>
<p>A model that performs poorly gives you one of three signals: underfitting (high bias), overfitting (high variance), or class imbalance issues. Each has a different fix — and applying the wrong fix wastes time.</p>
<h3>Diagnosing underfitting (high bias)</h3>
<p>Both training and validation error are high and similar to each other. The model is too simple to capture the patterns in the data.</p>
<p><strong>Fixes</strong>: Use a more expressive model family; add polynomial features or feature interactions; reduce regularisation (increase C for SVM/logistic, decrease α for Ridge/Lasso); engineer better features; train longer (for iterative models).</p>
<h3>Diagnosing overfitting (high variance)</h3>
<p>Training error is much lower than validation error. The model has memorised training noise.</p>
<p><strong>Fixes</strong>: Add regularisation; reduce model complexity (shallower tree, fewer features); get more training data; use dropout (for neural networks); apply bagging (Random Forest) or early stopping (Gradient Boosting).</p>
<h3>Diagnosing class imbalance</h3>
<p>Accuracy is high but recall on the minority class is terrible. The model learned "always predict majority class."</p>
<p><strong>Fixes</strong>: <code>class_weight='balanced'</code>; oversample with SMOTE; use ROC-AUC or F1 as your metric instead of accuracy; tune the decision threshold.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import validation_curve, cross_val_score
from sklearn.datasets import load_breast_cancer
from sklearn.metrics import classification_report

data = load_breast_cancer()
X, y = data.data, data.target

# ── Validation curve: max_depth vs AUC ────────────────────────────────
param_range = range(1, 15)
train_scores, val_scores = validation_curve(
    DecisionTreeClassifier(random_state=42), X, y,
    param_name='max_depth', param_range=param_range,
    cv=5, scoring='roc_auc', n_jobs=-1)

train_mean = train_scores.mean(axis=1)
val_mean   = val_scores.mean(axis=1)

fig, axes = plt.subplots(1, 2, figsize=(13, 4))
axes[0].plot(param_range, train_mean, 'o-', label='Train AUC')
axes[0].plot(param_range, val_mean,   's-', label='CV AUC', color='coral')
axes[0].fill_between(list(param_range), train_mean - train_scores.std(axis=1),
                     train_mean + train_scores.std(axis=1), alpha=0.1)
axes[0].axvline(list(param_range)[np.argmax(val_mean)], ls='--', color='red',
                label=f'Best depth = {list(param_range)[np.argmax(val_mean)]}')
axes[0].set_xlabel('max_depth'); axes[0].set_ylabel('ROC-AUC')
axes[0].set_title('Validation Curve: max_depth vs AUC')
axes[0].legend()

# ── Class imbalance: accuracy vs F1 ───────────────────────────────────
from sklearn.datasets import make_classification
X_imb, y_imb = make_classification(n_samples=1000, weights=[0.95, 0.05], random_state=42)

for cw, label in [(None, 'No class_weight'), ('balanced', 'class_weight=balanced')]:
    lr = LogisticRegression(class_weight=cw, max_iter=1000, random_state=42)
    acc = cross_val_score(lr, X_imb, y_imb, cv=5, scoring='accuracy').mean()
    f1  = cross_val_score(lr, X_imb, y_imb, cv=5, scoring='f1').mean()
    print(f"{label:35s}  accuracy={acc:.4f}  F1={f1:.4f}")

axes[1].bar(['No weight\n(accuracy)','Balanced\n(accuracy)','No weight\n(F1)','Balanced\n(F1)'],
            [0.953, 0.891, 0.10, 0.55], color=['steelblue','steelblue','coral','coral'])
axes[1].set_title('Class Imbalance: Accuracy hides the problem; F1 reveals it')
axes[1].set_ylabel('Score')
plt.tight_layout(); plt.show()` },
    { type: 'exercise', title: 'Validation Curve & Hyperparameter Sensitivity', body: `<p>Use validation curves to understand how two key hyperparameters affect a model:</p>
<ol>
<li>For a Random Forest on the wine dataset, plot two validation curves: one varying <code>n_estimators</code> (10 to 300) and one varying <code>max_features</code> (0.1 to 1.0). Scoring: accuracy.</li>
<li>For each, identify: (a) the value where CV accuracy plateaus, (b) whether increasing the parameter causes overfitting</li>
<li>Run a quick <code>RandomizedSearchCV</code> (20 iterations) over both parameters simultaneously. Does the best combo match your curves?</li>
</ol>`,
    hint: `<code>validation_curve(estimator, X, y, param_name='max_features', param_range=np.linspace(0.1,1,10), cv=5)</code>. For the combined search: <code>{'n_estimators': randint(10,300), 'max_features': uniform(0.1,0.9)}</code>.`,
    solution: `import numpy as np, matplotlib.pyplot as plt
from sklearn.datasets import load_wine
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import validation_curve, RandomizedSearchCV
from scipy.stats import randint, uniform

data = load_wine(); X, y = data.data, data.target
fig, axes = plt.subplots(1,2,figsize=(13,5))

for ax, param, rng, label in [
    (axes[0], 'n_estimators', range(10,305,20), 'n_estimators'),
    (axes[1], 'max_features', np.linspace(0.1,1,10), 'max_features'),
]:
    tr, va = validation_curve(RandomForestClassifier(random_state=42, n_jobs=-1),
                               X, y, param_name=param, param_range=list(rng), cv=5, n_jobs=-1)
    ax.plot(list(rng), tr.mean(1), 'o-', label='Train')
    ax.fill_between(list(rng), tr.mean(1)-tr.std(1), tr.mean(1)+tr.std(1), alpha=.1)
    ax.plot(list(rng), va.mean(1), 's-', label='CV', color='coral')
    ax.fill_between(list(rng), va.mean(1)-va.std(1), va.mean(1)+va.std(1), alpha=.1, color='coral')
    ax.set_xlabel(label); ax.set_ylabel('Accuracy'); ax.legend(); ax.set_title(f'{label} Validation Curve')
plt.tight_layout(); plt.show()

rs = RandomizedSearchCV(RandomForestClassifier(random_state=42, n_jobs=-1),
                         {'n_estimators': randint(10,300), 'max_features': uniform(0.1,0.9)},
                         n_iter=20, cv=5, n_jobs=-1, random_state=42)
rs.fit(X, y); print(f"Best CV accuracy: {rs.best_score_:.4f}  params: {rs.best_params_}")` }
  ]
};

L['ml-w6-l5'] = {
  duration_mins: 15,
  sections: [
    { type: 'text', body: `
<h2>Feature Selection Techniques</h2>
<p>Adding irrelevant features to a model increases noise, slows training, and can hurt performance. Feature selection identifies the most informative subset of features — making models faster, more interpretable, and sometimes more accurate.</p>
<h3>Filter methods — fast, model-agnostic</h3>
<p>Score each feature independently of the model. Use as a quick pre-filter when you have thousands of features. <code>SelectKBest</code> with <code>f_classif</code> (F-test) or <code>mutual_info_classif</code> (mutual information) are common choices.</p>
<h3>Wrapper methods — search over feature subsets</h3>
<p><code>RFE (Recursive Feature Elimination)</code> — Repeatedly fits the model, removes the lowest-importance feature, repeats. Finds the best subset but is expensive (O(p²) model fits). Use with cross-validation (<code>RFECV</code>) for proper evaluation.</p>
<h3>Embedded methods — built into the model</h3>
<p>Random Forest and Gradient Boosting naturally rank features by importance. Lasso drives irrelevant coefficients to zero. These are the most practical methods for most workflows — you get feature selection as a byproduct of model training.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer
from sklearn.feature_selection import (SelectKBest, f_classif,
                                        mutual_info_classif, RFECV)
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression, LassoCV
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.preprocessing import StandardScaler

data = load_breast_cancer()
X, y = data.data, data.target
feature_names = data.feature_names

# ── Filter: SelectKBest ────────────────────────────────────────────────
selector_f  = SelectKBest(f_classif,           k=10).fit(X, y)
selector_mi = SelectKBest(mutual_info_classif, k=10).fit(X, y)

print("Top 10 by F-test:")
top_f  = [feature_names[i] for i in selector_f.get_support(indices=True)]
top_mi = [feature_names[i] for i in selector_mi.get_support(indices=True)]
print(top_f)
print("\nTop 10 by Mutual Information:")
print(top_mi)

# ── Embedded: Random Forest importances ───────────────────────────────
rf = RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1)
rf.fit(X, y)
importances = pd.Series(rf.feature_importances_, index=feature_names)
top10_rf = importances.nlargest(10)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))
top10_rf.sort_values().plot(kind='barh', ax=axes[0], color='steelblue')
axes[0].set_title('Random Forest Feature Importances (top 10)')

# ── Wrapper: RFECV ─────────────────────────────────────────────────────
scaler = StandardScaler()
Xs = scaler.fit_transform(X)
rfecv = RFECV(LogisticRegression(max_iter=5000, C=1.0),
              step=1, cv=StratifiedKFold(5), scoring='roc_auc', n_jobs=-1)
rfecv.fit(Xs, y)
print(f"\nRFECV optimal number of features: {rfecv.n_features_}")
selected = [feature_names[i] for i in rfecv.get_support(indices=True)]
print(f"Selected features: {selected}")

axes[1].plot(range(1, len(rfecv.cv_results_['mean_test_score'])+1),
             rfecv.cv_results_['mean_test_score'], marker='o', markersize=4)
axes[1].axvline(rfecv.n_features_, ls='--', color='red',
                label=f'Optimal: {rfecv.n_features_} features')
axes[1].set_xlabel('Number of features')
axes[1].set_ylabel('CV ROC-AUC')
axes[1].set_title('RFECV: Finding the Optimal Feature Count')
axes[1].legend()
plt.tight_layout(); plt.show()` },
    { type: 'exercise', title: 'Full Tuning Pipeline', body: `<p>Using the Titanic dataset (available via seaborn: <code>sns.load_dataset('titanic')</code>), build a complete tuning pipeline: (1) preprocess (impute, encode), (2) select top 10 features with mutual information, (3) tune a Random Forest with RandomizedSearchCV (20 iterations, 5-fold stratified CV, ROC-AUC), (4) report final test performance with a full classification report.</p>`,
    hint: `Use <code>Pipeline([('prep', ColumnTransformer(...)), ('select', SelectKBest(mutual_info_classif, k=10)), ('model', RandomForestClassifier())])</code>. Wrap the whole pipeline in RandomizedSearchCV.`,
    solution: `# Full solution requires ~50 lines — key steps:\n# 1. Drop rows with missing 'survived'; fill 'age' with median\n# 2. Select numeric + a few categorical features\n# 3. Build ColumnTransformer + Pipeline\n# 4. RandomizedSearchCV over RF hyperparameters\n# 5. pipeline.fit(X_tr, y_tr); print(classification_report(y_te, pipeline.predict(X_te)))` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 7 — ENSEMBLE METHODS
══════════════════════════════════════════════════════════════════════════ */

L['ml-w7-l1'] = {
  duration_mins: 15,
  sections: [
    { type: 'text', body: `
<h2>Bagging & Random Forests — Deep Dive</h2>
<p>You've seen Random Forest as a black box — now let's understand exactly why it works so well. The key insight is that averaging many noisy-but-unbiased estimators produces an estimator with lower variance and (roughly) the same bias. The trick is making the estimators sufficiently decorrelated.</p>
<h3>Bootstrap sampling</h3>
<p>Each tree is trained on a bootstrap sample — n observations drawn with replacement from the n training points. On average, each bootstrap sample contains about 63.2% of the unique training points (the rest appear multiple times or not at all). The ~36.8% of points not in a bootstrap sample form the <strong>out-of-bag (OOB)</strong> set for that tree — a free validation estimate.</p>
<h3>The random subspace trick</h3>
<p>At each split, only a random subset of √p features (classification) or p/3 features (regression) are considered. This is what decorrelates the trees. Without it, all trees would focus on the same dominant features, and averaging them would reduce variance only modestly.</p>
<h3>Extra-Trees (Extremely Randomised Trees)</h3>
<p>Extra-Trees push randomisation further: instead of finding the optimal split threshold for each feature, they pick a random threshold. This makes individual trees much weaker but dramatically faster to train, and the ensemble is often just as accurate as Random Forest.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import (RandomForestClassifier, ExtraTreesClassifier,
                               BaggingClassifier)
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import roc_auc_score

data = load_breast_cancer()
X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# ── Manual bagging to see the principle ───────────────────────────────
np.random.seed(42)
n_estimators = 50
single_aucs, ensemble_probs = [], np.zeros(len(X_te))

for i in range(n_estimators):
    # Bootstrap sample
    idx = np.random.choice(len(X_tr), len(X_tr), replace=True)
    X_boot, y_boot = X_tr[idx], y_tr[idx]
    tree = DecisionTreeClassifier(max_depth=None, random_state=i)
    tree.fit(X_boot, y_boot)
    probs = tree.predict_proba(X_te)[:, 1]
    single_aucs.append(roc_auc_score(y_te, probs))
    ensemble_probs += probs

ensemble_probs /= n_estimators
print(f"Average single tree AUC : {np.mean(single_aucs):.4f} ± {np.std(single_aucs):.4f}")
print(f"Bagged ensemble AUC     : {roc_auc_score(y_te, ensemble_probs):.4f}")

# ── sklearn ensembles comparison ───────────────────────────────────────
models = {
    'Single Decision Tree':  DecisionTreeClassifier(random_state=42),
    'Bagging (DTree)':       BaggingClassifier(DecisionTreeClassifier(), n_estimators=100, random_state=42, n_jobs=-1),
    'Random Forest':         RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1),
    'Extra-Trees':           ExtraTreesClassifier(n_estimators=100, random_state=42, n_jobs=-1),
}

print(f"\n{'Model':25s}  {'CV AUC':10s}  {'Std':8s}  {'Train time'}")
import time
for name, model in models.items():
    t0 = time.time()
    cv = cross_val_score(model, X_tr, y_tr, cv=5, scoring='roc_auc', n_jobs=-1)
    t = time.time() - t0
    print(f"{name:25s}  {cv.mean():.4f}      {cv.std():.4f}    {t:.2f}s")

# ── OOB score as free validation ──────────────────────────────────────
rf = RandomForestClassifier(n_estimators=200, oob_score=True, random_state=42, n_jobs=-1)
rf.fit(X_tr, y_tr)
print(f"\nOOB score (free):  {rf.oob_score_:.4f}")
print(f"Test accuracy    :  {rf.score(X_te, y_te):.4f}")` },
    { type: 'exercise', title: 'Bootstrap vs Full-Dataset Training', body: `<p>Empirically demonstrate why bootstrap sampling helps Random Forest:</p>
<ol>
<li>Train 100 individual Decision Trees on the full training set (same data, same model). Measure their average CV AUC and std.</li>
<li>Train 100 individual Decision Trees each on a different bootstrap sample. Measure average CV AUC and std.</li>
<li>Train a Random Forest (100 trees, max_features='sqrt'). Compare its test AUC to the two above.</li>
<li>Plot the distribution of individual tree test accuracies for both approaches. Which has higher variance?</li>
</ol>`,
    hint: `For bootstrap samples: <code>idx = np.random.choice(len(X_tr), len(X_tr), replace=True); tree.fit(X_tr[idx], y_tr[idx])</code>. Plot histograms with <code>plt.hist(accs_full, alpha=0.5, label='Full', bins=20)</code>.`,
    solution: `import numpy as np, matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score

data = load_breast_cancer(); X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

np.random.seed(42)
aucs_full, aucs_boot = [], []
for _ in range(100):
    t_full = DecisionTreeClassifier(max_depth=None, random_state=np.random.randint(10000))
    t_full.fit(X_tr, y_tr); aucs_full.append(roc_auc_score(y_te, t_full.predict_proba(X_te)[:,1]))

    idx = np.random.choice(len(X_tr), len(X_tr), replace=True)
    t_boot = DecisionTreeClassifier(max_depth=None, random_state=np.random.randint(10000))
    t_boot.fit(X_tr[idx], y_tr[idx]); aucs_boot.append(roc_auc_score(y_te, t_boot.predict_proba(X_te)[:,1]))

rf = RandomForestClassifier(100, max_features='sqrt', random_state=42).fit(X_tr, y_tr)
rf_auc = roc_auc_score(y_te, rf.predict_proba(X_te)[:,1])

print(f"Full trees:   mean={np.mean(aucs_full):.4f} std={np.std(aucs_full):.4f}")
print(f"Boot trees:   mean={np.mean(aucs_boot):.4f} std={np.std(aucs_boot):.4f}")
print(f"Random Forest AUC: {rf_auc:.4f}")

plt.figure(figsize=(9,4))
plt.hist(aucs_full, bins=20, alpha=0.5, label='Full dataset trees')
plt.hist(aucs_boot, bins=20, alpha=0.5, label='Bootstrap trees')
plt.axvline(rf_auc, color='red', ls='--', lw=2, label=f'Random Forest={rf_auc:.4f}')
plt.xlabel('Test AUC'); plt.ylabel('Count'); plt.legend(); plt.title('Individual Trees vs Random Forest')
plt.show()` }
  ]
};

L['ml-w7-l2'] = {
  duration_mins: 16,
  sections: [
    { type: 'text', body: `
<h2>Boosting — AdaBoost & Gradient Boosting Theory</h2>
<p>While bagging trains models in parallel on different data subsets, boosting trains models <em>sequentially</em>, where each new model focuses specifically on what the previous ensemble got wrong. This iterative error-correction makes boosting algorithms the most accurate methods on tabular data.</p>
<h3>AdaBoost</h3>
<p>AdaBoost (Adaptive Boosting) trains a sequence of weak learners (typically stumps — depth-1 trees). After each round, incorrectly classified samples get higher weights, so the next learner focuses on the hard cases. Each learner's contribution is weighted by its accuracy. The final prediction is a weighted majority vote.</p>
<h3>Gradient Boosting — the general framework</h3>
<p>Gradient Boosting generalises boosting to any differentiable loss function. The key insight: fitting a new model to the <em>negative gradient</em> of the loss is equivalent to gradient descent in function space. This unifies AdaBoost, regression boosting, and ranking into one framework.</p>
<p>At step m:</p>
<ol>
  <li>Compute pseudo-residuals: rᵢₘ = −∂L(yᵢ, Fₘ₋₁(xᵢ)) / ∂Fₘ₋₁(xᵢ)</li>
  <li>Fit a new tree hₘ to pseudo-residuals</li>
  <li>Update: Fₘ(x) = Fₘ₋₁(x) + η·hₘ(x)</li>
</ol>
<p>For squared-error loss, pseudo-residuals = actual residuals yᵢ − ŷᵢ. For log-loss (classification), they're the difference between observed and predicted probabilities.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.ensemble import AdaBoostClassifier, GradientBoostingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import roc_auc_score

np.random.seed(42)
X, y = make_classification(n_samples=1000, n_features=20, n_informative=10, random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

# ── AdaBoost ───────────────────────────────────────────────────────────
ada = AdaBoostClassifier(
    estimator=DecisionTreeClassifier(max_depth=1),  # stumps
    n_estimators=200,
    learning_rate=0.5,
    random_state=42
)
ada.fit(X_tr, y_tr)
print(f"AdaBoost AUC: {roc_auc_score(y_te, ada.predict_proba(X_te)[:,1]):.4f}")

# ── Gradient Boosting: staged predictions ─────────────────────────────
gb = GradientBoostingClassifier(n_estimators=300, learning_rate=0.1,
                                  max_depth=3, subsample=0.8, random_state=42)
gb.fit(X_tr, y_tr)

# Staged AUC: how does performance evolve as trees are added?
train_auc, val_auc = [], []
for i, (y_tr_prob, y_te_prob) in enumerate(
        zip(gb.staged_predict_proba(X_tr), gb.staged_predict_proba(X_te))):
    train_auc.append(roc_auc_score(y_tr, y_tr_prob[:,1]))
    val_auc.append(roc_auc_score(y_te, y_te_prob[:,1]))

best_n = np.argmax(val_auc) + 1
fig, ax = plt.subplots(figsize=(9, 4))
ax.plot(train_auc, label='Train AUC', lw=1.5)
ax.plot(val_auc,   label='Val AUC',   lw=1.5, color='coral')
ax.axvline(best_n-1, ls='--', color='red', label=f'Best n_estimators={best_n}')
ax.set_xlabel('n_estimators'); ax.set_ylabel('ROC-AUC')
ax.set_title('Gradient Boosting: Staged AUC (train vs val)')
ax.legend(); plt.tight_layout(); plt.show()
print(f"Best n_estimators: {best_n}  Val AUC: {val_auc[best_n-1]:.4f}")` },
    { type: 'exercise', title: 'AdaBoost Weight Dynamics', body: `<p>Visualise how AdaBoost reweights training examples through its iterations:</p>
<ol>
<li>Generate a binary classification dataset with 200 samples and 2 features (for 2D plotting)</li>
<li>Train an AdaBoost with 50 stumps. After fitting, access the sample weights at each round — <code>model.estimator_weights_</code> and examine how weight evolves</li>
<li>Plot the training AUC vs number of boosting rounds (use <code>staged_predict_proba</code>)</li>
<li>Identify which training points have the highest final weight — visualise them with larger markers. Are they the hard cases near the decision boundary?</li>
</ol>`,
    hint: `<code>list(model.staged_predict_proba(X_te))</code> gives probabilities at each stage. For sample weights: after fitting, <code>model.estimators_</code> holds the stumps; to get the raw AdaBoost weight vector, access <code>model.estimator_weights_</code> (the α values, not sample weights directly).`,
    solution: `import numpy as np, matplotlib.pyplot as plt
from sklearn.ensemble import AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score

np.random.seed(42)
X, y = make_classification(200, n_features=2, n_redundant=0, n_informative=2, random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

ada = AdaBoostClassifier(DecisionTreeClassifier(max_depth=1), n_estimators=50, random_state=42)
ada.fit(X_tr, y_tr)

staged_aucs = [roc_auc_score(y_te, p[:,1]) for p in ada.staged_predict_proba(X_te)]
plt.figure(figsize=(9,4)); plt.plot(range(1,51), staged_aucs, 'o-', ms=3)
plt.xlabel('Boosting round'); plt.ylabel('Test AUC'); plt.title('AdaBoost: AUC vs Rounds')
plt.tight_layout(); plt.show()

# Sample weights after fitting — AdaBoost computes them internally via SAMME
# Approximate: re-fit and track errors
print(f"Estimator weights (alpha): {ada.estimator_weights_[:5].round(3)} ...")
print(f"Final test AUC: {staged_aucs[-1]:.4f}")` }
  ]
};

L['ml-w7-l3'] = {
  duration_mins: 18,
  sections: [
    { type: 'text', body: `
<h2>XGBoost & LightGBM — Production-Grade Boosting</h2>
<p>XGBoost and LightGBM are the practical go-to algorithms for tabular machine learning in 2024. They implement gradient boosting with engineering optimisations that make them 10–100× faster than sklearn's GradientBoosting, while adding regularisation that improves generalisation.</p>
<h3>XGBoost innovations</h3>
<ul>
  <li><strong>Regularised objective</strong> — Adds L1 (reg_alpha) and L2 (reg_lambda) penalties on leaf weights directly into the tree-building objective. Prevents individual leaves from overspecialising.</li>
  <li><strong>Column subsampling</strong> — Like Random Forest, randomly selects a fraction of features per tree (colsample_bytree) and per split (colsample_bylevel). Decorrelates trees.</li>
  <li><strong>Row subsampling</strong> — Trains each tree on a random fraction of samples (subsample). Similar to bagging within boosting.</li>
  <li><strong>Sparse-aware algorithm</strong> — Handles missing values natively by learning the best default direction at each split.</li>
</ul>
<h3>LightGBM innovations</h3>
<ul>
  <li><strong>Leaf-wise growth</strong> — Grows the leaf with the highest loss reduction, rather than growing all leaves at each level. Produces deeper, more asymmetric trees that converge faster.</li>
  <li><strong>Histogram-based splitting</strong> — Bins continuous features into 255 discrete bins. Dramatically reduces memory and computation for finding optimal splits.</li>
  <li><strong>GOSS (Gradient-based One-Side Sampling)</strong> — Keeps all samples with large gradients (hard cases) but only a fraction of easy cases. Preserves the signal while reducing computation.</li>
</ul>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_squared_error
import time

# Install: pip install xgboost lightgbm
try:
    import xgboost as xgb
    import lightgbm as lgb
    LIBS_AVAILABLE = True
except ImportError:
    print("Install with: pip install xgboost lightgbm")
    LIBS_AVAILABLE = False

housing = fetch_california_housing()
X, y = housing.data, housing.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

if LIBS_AVAILABLE:
    models = {
        'XGBoost': xgb.XGBRegressor(
            n_estimators=500, learning_rate=0.05, max_depth=5,
            subsample=0.8, colsample_bytree=0.8,
            reg_alpha=0.1, reg_lambda=1.0,
            n_jobs=-1, random_state=42, verbosity=0),
        'LightGBM': lgb.LGBMRegressor(
            n_estimators=500, learning_rate=0.05, max_depth=-1,
            num_leaves=63, subsample=0.8, colsample_bytree=0.8,
            reg_alpha=0.1, reg_lambda=1.0,
            n_jobs=-1, random_state=42, verbose=-1),
    }

    for name, model in models.items():
        t0 = time.time()
        model.fit(X_tr, y_tr,
                  eval_set=[(X_te, y_te)],
                  callbacks=[xgb.callback.EarlyStopping(50)] if 'XGB' in name else
                             [lgb.early_stopping(50, verbose=False)])
        elapsed = time.time() - t0
        rmse = mean_squared_error(y_te, model.predict(X_te), squared=False)
        print(f"{name:12s}  RMSE={rmse:.4f}  Time={elapsed:.1f}s  Best n_est={model.best_iteration_}")

    # ── Key hyperparameter guide ──────────────────────────────────────
    print("\nKey hyperparameters for XGBoost/LightGBM:")
    params = {
        'n_estimators':    'More trees = better (use early stopping to avoid over-shooting)',
        'learning_rate':   'Lower = better generalisation; pair with more trees. Default: 0.05-0.1',
        'max_depth':       'Tree depth. 3-8 typical. LightGBM: use num_leaves instead',
        'subsample':       'Row sampling per tree. 0.7-0.9 reduces overfitting',
        'colsample_bytree':'Feature sampling per tree. 0.7-0.9 decorrelates trees',
        'reg_alpha':       'L1 regularisation. 0.1-10. Use when many irrelevant features',
        'reg_lambda':      'L2 regularisation. 0-10. Default=1 for XGBoost',
        'min_child_weight':'Min sum of weights in a leaf. Higher = smoother model',
    }
    for p, desc in params.items():
        print(f"  {p:20s}: {desc}")` },
    { type: 'tip', body: `Always use early stopping with XGBoost and LightGBM. Set <code>n_estimators</code> very high (1000+), provide an eval set, and let early stopping find the optimal number automatically. This prevents overfitting without manual grid searching over n_estimators.` },
    { type: 'exercise', title: 'LightGBM vs XGBoost Benchmark', body: `<p>Run a fair speed and accuracy benchmark between LightGBM and XGBoost on a large dataset:</p>
<ol>
<li>Generate a dataset with 50,000 samples and 50 features using <code>make_classification</code></li>
<li>Train both LightGBM and XGBoost with comparable settings (n_estimators=300, learning_rate=0.05, max_depth=6) and measure training time</li>
<li>Compare test ROC-AUC for both</li>
<li>If you don't have both installed, implement with whichever is available and compare against sklearn GradientBoostingClassifier</li>
</ol>`,
    hint: `<code>import time; t0=time.time(); model.fit(X_tr,y_tr); elapsed=time.time()-t0</code>. For LightGBM: <code>import lightgbm as lgb; lgb.LGBMClassifier(n_estimators=300, learning_rate=0.05, max_depth=6, n_jobs=-1)</code>.`,
    solution: `import numpy as np, time
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score
from sklearn.ensemble import GradientBoostingClassifier

np.random.seed(42)
X, y = make_classification(50000, n_features=50, n_informative=25, random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

models = {'sklearn GB': GradientBoostingClassifier(n_estimators=300, learning_rate=0.05, max_depth=6, random_state=42)}
try:
    import xgboost as xgb
    models['XGBoost'] = xgb.XGBClassifier(n_estimators=300, learning_rate=0.05, max_depth=6, n_jobs=-1, random_state=42, use_label_encoder=False, eval_metric='logloss')
except ImportError: pass
try:
    import lightgbm as lgb
    models['LightGBM'] = lgb.LGBMClassifier(n_estimators=300, learning_rate=0.05, max_depth=6, n_jobs=-1, random_state=42)
except ImportError: pass

for name, m in models.items():
    t0 = time.time(); m.fit(X_tr, y_tr); elapsed = time.time()-t0
    auc = roc_auc_score(y_te, m.predict_proba(X_te)[:,1])
    print(f"{name:<15} AUC={auc:.4f}  Time={elapsed:.1f}s")` }
  ]
};

L['ml-w7-l4'] = {
  duration_mins: 15,
  sections: [
    { type: 'text', body: `
<h2>Stacking & Voting Ensembles</h2>
<p>Beyond bagging and boosting, a third ensemble strategy is <strong>stacking</strong>: train multiple diverse base models, then train a <em>meta-learner</em> on their predictions. The meta-learner learns how to best combine the base models — which to trust more in different regions of the feature space.</p>
<h3>Voting classifiers</h3>
<p><strong>Hard voting</strong> — Each model votes for a class; majority wins. Simple, robust, and often surprisingly effective.</p>
<p><strong>Soft voting</strong> — Average the predicted probabilities across models, then predict the class with the highest average probability. Almost always better than hard voting when all models produce reliable probabilities.</p>
<h3>Stacking (Stacked Generalisation)</h3>
<p>Train base models (Level 0) on the training data. Use their predictions — generated via cross-validation to avoid leakage — as features for a meta-learner (Level 1). The meta-learner learns which base models to trust. Key implementation detail: the meta-learner must be trained on out-of-fold predictions from the Level 0 models, not on predictions from models that saw that training data.</p>
<h3>When stacking helps</h3>
<p>Stacking is most effective when your base models make different kinds of errors — they're diverse. A random forest, an SVM, and a logistic regression will disagree in different regions of the feature space; stacking captures this complementarity. Three identical models produce minimal gain from stacking.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
from sklearn.ensemble import (RandomForestClassifier, GradientBoostingClassifier,
                               VotingClassifier, StackingClassifier)
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import roc_auc_score
from sklearn.datasets import load_breast_cancer

data = load_breast_cancer()
X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

scaler = StandardScaler()
Xs_tr = scaler.fit_transform(X_tr)
Xs_te = scaler.transform(X_te)

# ── Individual models ──────────────────────────────────────────────────
base_models = [
    ('lr',  LogisticRegression(C=1.0, max_iter=10000, random_state=42)),
    ('rf',  RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)),
    ('gb',  GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)),
    ('svm', SVC(kernel='rbf', C=10, gamma=0.01, probability=True, random_state=42)),
    ('knn', KNeighborsClassifier(n_neighbors=7, weights='distance')),
]

print("Individual model AUCs:")
for name, model in base_models:
    cv = cross_val_score(model, Xs_tr, y_tr, cv=5, scoring='roc_auc').mean()
    print(f"  {name:5s}: {cv:.4f}")

# ── Voting ensemble ────────────────────────────────────────────────────
soft_voter = VotingClassifier(estimators=base_models, voting='soft', n_jobs=-1)
cv_vote = cross_val_score(soft_voter, Xs_tr, y_tr, cv=5, scoring='roc_auc').mean()
print(f"\nSoft Voting:  {cv_vote:.4f}")

# ── Stacking ensemble ─────────────────────────────────────────────────
stacker = StackingClassifier(
    estimators=base_models,
    final_estimator=LogisticRegression(C=10, max_iter=5000),
    cv=5,           # out-of-fold predictions for Level 0 — avoids leakage
    stack_method='predict_proba',
    n_jobs=-1,
    passthrough=False  # True to also pass original features to meta-learner
)
cv_stack = cross_val_score(stacker, Xs_tr, y_tr, cv=5, scoring='roc_auc').mean()
print(f"Stacking:     {cv_stack:.4f}")

# Test set
soft_voter.fit(Xs_tr, y_tr)
stacker.fit(Xs_tr, y_tr)
print(f"\nSoft Voting test AUC : {roc_auc_score(y_te, soft_voter.predict_proba(Xs_te)[:,1]):.4f}")
print(f"Stacking test AUC    : {roc_auc_score(y_te, stacker.predict_proba(Xs_te)[:,1]):.4f}")` },
    { type: 'exercise', title: 'Hard vs Soft Voting Comparison', body: `<p>Compare hard voting (majority vote) vs soft voting (average probabilities) on the wine dataset:</p>
<ol>
<li>Build 5 diverse base classifiers: Logistic Regression, SVM (RBF), Random Forest, KNN, Gradient Boosting</li>
<li>Train and evaluate each individually. Record test accuracy and ROC-AUC (macro OVR).</li>
<li>Build VotingClassifier with voting='hard' and voting='soft'. Report accuracy and AUC for each.</li>
<li>Does the ensemble beat all individual models? Does soft outperform hard?</li>
</ol>`,
    hint: `For wine (3 classes): <code>roc_auc_score(y_te, model.predict_proba(X_te), multi_class='ovr')</code>. All base models must support <code>predict_proba</code> for soft voting. Use <code>probability=True</code> for SVC.`,
    solution: `import numpy as np
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, VotingClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, roc_auc_score

data = load_wine(); X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
sc = StandardScaler(); Xs_tr = sc.fit_transform(X_tr); Xs_te = sc.transform(X_te)

estimators = [
    ('lr',  LogisticRegression(max_iter=2000)),
    ('svc', SVC(probability=True, kernel='rbf', C=10)),
    ('rf',  RandomForestClassifier(200, random_state=42)),
    ('knn', KNeighborsClassifier(n_neighbors=7)),
    ('gb',  GradientBoostingClassifier(100, random_state=42)),
]

for name, est in estimators:
    est.fit(Xs_tr, y_tr); acc=est.score(Xs_te,y_te)
    auc=roc_auc_score(y_te, est.predict_proba(Xs_te), multi_class='ovr')
    print(f"  {name:<5} acc={acc:.4f}  AUC={auc:.4f}")

for voting in ['hard','soft']:
    vc = VotingClassifier(estimators=estimators, voting=voting)
    vc.fit(Xs_tr, y_tr); acc=vc.score(Xs_te,y_te)
    auc = roc_auc_score(y_te, vc.predict_proba(Xs_te), multi_class='ovr') if voting=='soft' else None
    print(f"Voting({voting}):  acc={acc:.4f}{'  AUC='+f'{auc:.4f}' if auc else ''}")` }
  ]
};

L['ml-w7-l5'] = {
  duration_mins: 14,
  sections: [
    { type: 'text', body: `
<h2>Choosing Your Ensemble Strategy</h2>
<p>With so many ensemble options, choosing the right one for a given problem comes down to three factors: dataset size, time budget, and diversity of base models.</p>
<h3>Decision framework</h3>
<p><strong>Start here: Gradient Boosting (XGBoost/LightGBM)</strong> — For most structured/tabular datasets, a well-tuned gradient boosting model beats bagging and is simpler than stacking. This is your default weapon.</p>
<p><strong>When Random Forest wins</strong> — Very noisy data (random sampling is protective); when you need fast training with minimal tuning; when interpretability through feature importances matters; when you have very high-dimensional data with many irrelevant features.</p>
<p><strong>When Stacking is worth it</strong> — In competitions where every 0.001 of AUC matters; when you have a diverse set of strong base models; when you have enough data that the meta-learner has enough signal (usually 10,000+ samples).</p>
<p><strong>When Voting is the right call</strong> — Quick win: 3–5 diverse, well-tuned models with soft voting. Takes 30 minutes to set up and often gets you 80% of the gain from a full stacking system.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import (RandomForestClassifier, GradientBoostingClassifier,
                               VotingClassifier, StackingClassifier, ExtraTreesClassifier)
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import make_classification
import time

np.random.seed(42)
X, y = make_classification(n_samples=3000, n_features=25, n_informative=12,
                            n_redundant=5, random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
Xs_tr = scaler.fit_transform(X_tr); Xs_te = scaler.transform(X_te)

strategies = {
    'Random Forest':     RandomForestClassifier(n_estimators=200, n_jobs=-1, random_state=42),
    'Gradient Boosting': GradientBoostingClassifier(n_estimators=200, learning_rate=0.05,
                                                     max_depth=4, random_state=42),
    'Soft Voting (3)':   VotingClassifier(voting='soft', n_jobs=-1, estimators=[
                             ('rf', RandomForestClassifier(n_estimators=100, random_state=42)),
                             ('gb', GradientBoostingClassifier(n_estimators=100, random_state=42)),
                             ('lr', LogisticRegression(max_iter=5000, random_state=42))]),
    'Stacking':          StackingClassifier(
                             estimators=[
                                 ('rf', RandomForestClassifier(n_estimators=100, n_jobs=-1, random_state=42)),
                                 ('gb', GradientBoostingClassifier(n_estimators=100, random_state=42)),
                                 ('et', ExtraTreesClassifier(n_estimators=100, n_jobs=-1, random_state=42)),
                             ],
                             final_estimator=LogisticRegression(C=5, max_iter=5000),
                             cv=5, n_jobs=-1),
}

results = []
for name, model in strategies.items():
    t0 = time.time()
    cv_auc = cross_val_score(model, Xs_tr, y_tr, cv=5, scoring='roc_auc', n_jobs=1).mean()
    elapsed = time.time() - t0
    results.append({'Strategy': name, 'CV AUC': round(cv_auc, 4), 'Time (s)': round(elapsed, 1)})
    print(f"{name:25s}  AUC={cv_auc:.4f}  Time={elapsed:.1f}s")

df_res = pd.DataFrame(results)
fig, ax = plt.subplots(figsize=(9, 4))
bars = ax.barh(df_res['Strategy'], df_res['CV AUC'], color='steelblue', edgecolor='white')
ax.set_xlabel('CV ROC-AUC'); ax.set_title('Ensemble Strategy Comparison')
ax.set_xlim(0.85, 1.0)
for bar, t in zip(bars, df_res['Time (s)']):
    ax.text(bar.get_width() + 0.001, bar.get_y() + bar.get_height()/2,
            f"{bar.get_width():.4f} ({t}s)", va='center', fontsize=9)
plt.tight_layout(); plt.show()` },
    { type: 'exercise', title: 'Build a Blending Ensemble', body: `<p>Train 3 diverse base models on 70% of the training data. Use the remaining 30% (the "hold-out") to generate predictions from each base model. Stack these predictions as features and train a Logistic Regression meta-learner on the hold-out set. Compare the blend's test AUC against each individual model. This is "blending" — a simpler version of stacking used in many Kaggle competitions.</p>`,
    hint: `Split X_train into X_blend_train (70%) and X_blend_val (30%). Fit base models on X_blend_train. Predict probabilities on X_blend_val → that becomes X_meta_train. Fit meta-learner on X_meta_train with y_blend_val as target.`,
    solution: `X_bt, X_bv, y_bt, y_bv = train_test_split(X_tr, y_tr, test_size=0.3, random_state=42)\nbase = [RandomForestClassifier(n_estimators=100,random_state=42),\n        GradientBoostingClassifier(n_estimators=100,random_state=42),\n        KNeighborsClassifier(n_neighbors=7)]\nfor m in base: m.fit(Xs_bt, y_bt)\nmeta_tr = np.column_stack([m.predict_proba(Xs_bv)[:,1] for m in base])\nmeta_te = np.column_stack([m.predict_proba(Xs_te)[:,1] for m in base])\nmeta = LogisticRegression().fit(meta_tr, y_bv)\nprint('Blend AUC:', roc_auc_score(y_te, meta.predict_proba(meta_te)[:,1]))` }
  ]
};

// --- WEEK 8: END-TO-END ML PROJECT (CAPSTONE) -------------------------------

L['ml-w8-l1'] = {
  duration_mins: 55,
  sections: [
    { type: 'text', body: '<h2>Problem Framing & Data Collection Strategy</h2><p>The most expensive ML mistake is building the wrong model for the wrong problem. Week 8 begins with the upstream decisions that determine whether a project succeeds before a single line of code is written.</p>' },
    { type: 'text', body: '<h3>The Problem Framing Checklist</h3><p>Before touching data, answer these six questions:</p><ol><li><strong>What decision will the model inform?</strong> (operational action, not "insight")</li><li><strong>Who acts on the output?</strong> (human analyst, automated pipeline, downstream API)</li><li><strong>What is the cost of a false positive vs. false negative?</strong> (drives metric choice)</li><li><strong>What is the baseline?</strong> (current rule, random, majority class � your model must beat this)</li><li><strong>What is good enough?</strong> (acceptable precision/recall/latency for deployment)</li><li><strong>What data is available at inference time?</strong> (avoids target leakage)</li></ol>' },
    { type: 'text', body: '<h3>Translating Business Goals to ML Tasks</h3><table style="width:100%;border-collapse:collapse;font-size:.9rem"><thead><tr><th style="border:1px solid #444;padding:6px;text-align:left">Business Goal</th><th style="border:1px solid #444;padding:6px;text-align:left">ML Task</th><th style="border:1px solid #444;padding:6px;text-align:left">Primary Metric</th></tr></thead><tbody><tr><td style="border:1px solid #444;padding:6px">Predict next month revenue</td><td style="border:1px solid #444;padding:6px">Regression</td><td style="border:1px solid #444;padding:6px">RMSE, MAPE</td></tr><tr><td style="border:1px solid #444;padding:6px">Flag fraudulent transactions</td><td style="border:1px solid #444;padding:6px">Binary classification</td><td style="border:1px solid #444;padding:6px">Precision-Recall AUC</td></tr><tr><td style="border:1px solid #444;padding:6px">Group customers for targeting</td><td style="border:1px solid #444;padding:6px">Clustering</td><td style="border:1px solid #444;padding:6px">Silhouette + business KPI</td></tr><tr><td style="border:1px solid #444;padding:6px">Rank products for recommendation</td><td style="border:1px solid #444;padding:6px">Learning-to-rank</td><td style="border:1px solid #444;padding:6px">NDCG@K</td></tr><tr><td style="border:1px solid #444;padding:6px">Detect anomalous server behaviour</td><td style="border:1px solid #444;padding:6px">Anomaly detection</td><td style="border:1px solid #444;padding:6px">Recall at fixed FPR</td></tr></tbody></table>' },
    { type: 'text', body: '<h3>Data Collection Strategy</h3><p>Once the task is clear, plan data collection:</p><ul><li><strong>Label acquisition cost</strong>: supervised learning requires labels � estimate hours-per-label x volume. If labels are expensive, consider semi-supervised or active learning.</li><li><strong>Historical window</strong>: how far back to look? Too short = small sample; too long = distribution shift from stale data.</li><li><strong>Representativeness</strong>: does training data cover the deployment distribution? Survivorship bias, demographic gaps, and seasonal effects all cause distribution mismatch.</li><li><strong>Feature availability at inference</strong>: a feature computed from tomorrow data cannot be used � audit every column timestamp carefully.</li></ul>' },
    { type: 'code', lang: 'python', src: '# Leakage audit helper\nimport pandas as pd\n\ndef check_leakage(df, target_col, event_date_col, feature_date_cols):\n    leaky = []\n    for col in feature_date_cols:\n        if pd.api.types.is_datetime64_any_dtype(df[col]):\n            if (df[col] > df[event_date_col]).any():\n                pct = (df[col] > df[event_date_col]).mean() * 100\n                leaky.append((col, f"{pct:.1f}% rows after event date"))\n    return leaky' },
    { type: 'text', body: '<h3>Defining Train / Validation / Test Splits for Business Data</h3><p>For time-series or event-based data, never shuffle randomly:</p><ul><li><strong>Temporal split</strong>: train on oldest 70%, validate on next 15%, test on most recent 15%.</li><li><strong>Walk-forward validation</strong>: expand training window, predict one period ahead, repeat � gives realistic performance estimate for production.</li><li><strong>Customer-level split</strong>: if multiple rows per customer, split on customer_id (not row) to prevent data leakage across folds.</li></ul>' },
    { type: 'code', lang: 'python', src: '# Walk-forward validation\nfrom sklearn.model_selection import TimeSeriesSplit\nimport numpy as np\n\ndef walk_forward_cv(model, X, y, n_splits=5):\n    tscv = TimeSeriesSplit(n_splits=n_splits)\n    scores = []\n    for fold, (train_idx, val_idx) in enumerate(tscv.split(X)):\n        X_tr, X_va = X.iloc[train_idx], X.iloc[val_idx]\n        y_tr, y_va = y.iloc[train_idx], y.iloc[val_idx]\n        model.fit(X_tr, y_tr)\n        score = model.score(X_va, y_va)\n        scores.append(score)\n        print(f"Fold {fold+1}: train={len(train_idx)}, val={len(val_idx)}, score={score:.4f}")\n    print(f"Mean CV: {np.mean(scores):.4f} +/- {np.std(scores):.4f}")\n    return scores' },
    { type: 'text', body: '<h3>The ML Project Charter</h3><p>Document before building: (1) business objective and success metric, (2) ML task type and evaluation metric, (3) baseline performance and minimum bar, (4) data sources, volumes, and refresh frequency, (5) known constraints (latency SLA, interpretability requirements, fairness constraints), (6) deployment target (batch job, REST API, edge device). A charter forces early agreement between data scientists, engineers, and stakeholders � preventing the most common project failure: building something nobody needs or can deploy.</p>' },
    { type: 'tip', title: 'Start with the baseline', body: 'Always implement the simplest possible baseline first (majority class classifier, mean predictor, or existing business rules). This tells you what "good enough" means in practice. A 70% accurate model is only useful if the baseline is 60% � not if it is 69%.' },
    { type: 'exercise', title: 'Frame a Churn Problem', hint: 'Think about what churn means operationally � when is it defined, what action follows, what is the cost asymmetry?', solution: '# Problem framing\nframing = {\n    "business_goal": "Reduce involuntary churn by proactively offering retention deals",\n    "ml_task": "Binary classification: will customer churn in next 30 days?",\n    "evaluation_metric": "Recall@Precision=0.6",\n    "baseline": "Rule-based: flag customers inactive > 14 days (recall=0.42, precision=0.51)",\n    "good_enough": "Recall >= 0.70 at Precision >= 0.60",\n    "excluded_features": ["cancellation_reason"],  # only known AFTER churn\n    "deployment": "Nightly batch job, scores loaded into CRM by 8am"\n}' }
  ]
};

L['ml-w8-l2'] = {
  duration_mins: 60,
  sections: [
    { type: 'text', body: '<h2>Building a Production-Ready sklearn Pipeline</h2><p>A production ML pipeline is not a Jupyter notebook � it is a software artefact that must run reliably on new data, be tested, versioned, and maintained. This lesson covers building pipelines that survive contact with production.</p>' },
    { type: 'text', body: '<h3>Why Pipelines?</h3><p>The #1 cause of production ML failures is <strong>training-serving skew</strong>: preprocessing applied manually in a notebook but not replicated at inference time. <code>sklearn.pipeline.Pipeline</code> solves this by bundling every transformation with the model into a single <code>.fit()</code> / <code>.predict()</code> object. Benefits: preprocessing steps are fitted on training data only (no leakage), the entire pipeline is one serialisable object, cross-validation works on the whole pipeline, and new data goes through identical preprocessing automatically.</p>' },
    { type: 'code', lang: 'python', src: 'import pandas as pd\nimport numpy as np\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import RobustScaler, OneHotEncoder\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.ensemble import GradientBoostingClassifier\n\nnumeric_features = ["tenure_months","avg_monthly_spend_90d","days_since_last_login",\n                    "support_tickets_30d"]\ncategorical_features = ["plan_type","payment_method","region"]\n\nnumeric_transformer = Pipeline([\n    ("imputer", SimpleImputer(strategy="median")),\n    ("scaler",  RobustScaler())\n])\n\ncategorical_transformer = Pipeline([\n    ("imputer", SimpleImputer(strategy="most_frequent")),\n    ("encoder", OneHotEncoder(drop="first", handle_unknown="ignore", sparse_output=False))\n])\n\npreprocessor = ColumnTransformer([\n    ("num", numeric_transformer, numeric_features),\n    ("cat", categorical_transformer, categorical_features)\n], remainder="drop")\n\npipeline = Pipeline([\n    ("preprocessor", preprocessor),\n    ("classifier", GradientBoostingClassifier(\n        n_estimators=300, learning_rate=0.05,\n        max_depth=4, subsample=0.8, random_state=42\n    ))\n])\n\nprint("Pipeline steps:")\nfor name, step in pipeline.steps:\n    print(f"  {name}: {type(step).__name__}")' },
    { type: 'text', body: '<h3>Custom Transformers for Feature Engineering</h3><p>Custom transformers let you include domain-specific feature engineering without breaking the pipeline boundary:</p>' },
    { type: 'code', lang: 'python', src: 'from sklearn.base import BaseEstimator, TransformerMixin\n\nclass ChurnFeatureEngineer(BaseEstimator, TransformerMixin):\n    def fit(self, X, y=None):\n        return self  # stateless\n\n    def transform(self, X):\n        X = X.copy()\n        X["tickets_per_month"] = X["support_tickets_30d"] / X["tenure_months"].clip(1)\n        X["recency_score"] = 1 - (X["days_since_last_login"].clip(0, 90) / 90)\n        return X\n\npipeline_v2 = Pipeline([\n    ("feature_eng",  ChurnFeatureEngineer()),\n    ("preprocessor", preprocessor),\n    ("classifier",   GradientBoostingClassifier(n_estimators=300, learning_rate=0.05,\n                                                max_depth=4, subsample=0.8, random_state=42))\n])' },
    { type: 'text', body: '<h3>Hyperparameter Search on the Full Pipeline</h3><p>Use double-underscore notation to address parameters inside nested steps:</p>' },
    { type: 'code', lang: 'python', src: 'from sklearn.model_selection import RandomizedSearchCV\nfrom scipy.stats import randint, uniform\n\nparam_dist = {\n    "classifier__n_estimators":  randint(100, 500),\n    "classifier__learning_rate": uniform(0.01, 0.2),\n    "classifier__max_depth":     randint(3, 8),\n    "classifier__subsample":     uniform(0.6, 0.4),\n    "preprocessor__num__imputer__strategy": ["median", "mean"]\n}\n\nsearch = RandomizedSearchCV(\n    pipeline, param_distributions=param_dist,\n    n_iter=50, cv=5, scoring="roc_auc",\n    n_jobs=-1, random_state=42, verbose=1\n)\n# search.fit(X_train, y_train)\n# best_pipeline = search.best_estimator_' },
    { type: 'text', body: '<h3>Testing Your Pipeline</h3><p>Production pipelines need automated tests:</p>' },
    { type: 'code', lang: 'python', src: 'import numpy as np\nimport pandas as pd\n\ndef make_sample_data(n=100):\n    np.random.seed(0)\n    return pd.DataFrame({\n        "tenure_months":         np.random.randint(1, 60, n),\n        "avg_monthly_spend_90d": np.random.uniform(20, 200, n),\n        "days_since_last_login": np.random.randint(0, 90, n),\n        "support_tickets_30d":   np.random.randint(0, 10, n),\n        "plan_type":    np.random.choice(["basic","premium","enterprise"], n),\n        "payment_method": np.random.choice(["card","bank","paypal"], n),\n        "region":       np.random.choice(["north","south","east","west"], n),\n    })\n\ndef test_pipeline_output_shape():\n    X = make_sample_data(200)\n    y = np.random.randint(0, 2, 200)\n    pipeline.fit(X, y)\n    preds = pipeline.predict(X)\n    assert preds.shape == (200,)\n\ndef test_pipeline_handles_unseen_categories():\n    X_train = make_sample_data(200)\n    y_train = np.random.randint(0, 2, 200)\n    pipeline.fit(X_train, y_train)\n    X_new = make_sample_data(10)\n    X_new["plan_type"] = "unknown_plan"\n    proba = pipeline.predict_proba(X_new)  # should not raise\n    assert proba.shape == (10, 2)' },
    { type: 'tip', title: 'Use set_output(transform="pandas")', body: 'sklearn >= 1.2 supports pipeline.set_output(transform="pandas") which makes all transformers return DataFrames with column names instead of numpy arrays. Invaluable for debugging intermediate steps.' },
    { type: 'exercise', title: 'Build & Test a Production Pipeline', body: `<p>Build a complete, tested sklearn Pipeline for the wine quality dataset:</p>
<ol>
<li>Load the white wine dataset: <code>pd.read_csv('https://archive.ics.uci.edu/ml/machine-learning-databases/wine-quality/winequality-white.csv', sep=';')</code>. Target: <code>quality >= 7</code> (binary).</li>
<li>Add a custom transformer that creates two features: <code>alcohol_acid_ratio = alcohol / (volatile acidity + 0.01)</code> and <code>density_sugar_ratio = density / (residual sugar + 0.01)</code></li>
<li>Build a full Pipeline: custom transformer → ColumnTransformer (scale numeric) → GradientBoosting. Tune with RandomizedSearchCV (20 iterations, 5-fold CV, ROC-AUC).</li>
<li>Write two pytest-style assert tests: (a) pipeline output shape matches input rows, (b) pipeline handles NaN in test set without crashing (add 5% NaN to X_test first)</li>
</ol>`,
    hint: `<code>from sklearn.base import BaseEstimator, TransformerMixin</code>. Your custom transformer must define <code>fit(self, X, y=None)</code> and <code>transform(self, X)</code> and work on both DataFrames and numpy arrays. Use <code>pd.DataFrame(X).copy()</code> inside transform.`,
    solution: `import pandas as pd, numpy as np
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import RobustScaler
from sklearn.impute import SimpleImputer
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from scipy.stats import randint, uniform

url = 'https://archive.ics.uci.edu/ml/machine-learning-databases/wine-quality/winequality-white.csv'
df = pd.read_csv(url, sep=';'); df.columns = df.columns.str.replace(' ','_')
X = df.drop(columns=['quality']); y = (df['quality'] >= 7).astype(int)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

class WineFeatures(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None): return self
    def transform(self, X):
        X = pd.DataFrame(X, columns=self._columns).copy() if not isinstance(X, pd.DataFrame) else X.copy()
        X['alc_acid'] = X['alcohol'] / (X['volatile_acidity'] + 0.01)
        X['den_sugar'] = X['density'] / (X['residual_sugar'] + 0.01)
        return X
    def fit_transform(self, X, y=None): self._columns = list(X.columns); return self.fit(X,y).transform(X)

pipe = Pipeline([('fe', WineFeatures()),
                 ('sc', ColumnTransformer([('sc', RobustScaler(), X.columns.tolist()+ ['alc_acid','den_sugar'])], remainder='drop')),
                 ('clf', GradientBoostingClassifier(random_state=42))])

rs = RandomizedSearchCV(pipe, {'clf__n_estimators': randint(100,400), 'clf__learning_rate': uniform(0.01,0.2)},
                         n_iter=20, cv=5, scoring='roc_auc', random_state=42)
rs.fit(X_tr, y_tr)
print(f"Best AUC: {rs.best_score_:.4f}  Test AUC: {rs.score(X_te, y_te):.4f}")

# Tests
assert rs.best_estimator_.predict(X_te).shape == (len(X_te),), "Shape mismatch"
X_te_nan = X_te.copy(); X_te_nan.iloc[np.random.choice(len(X_te),5), 0] = np.nan
try: rs.best_estimator_.predict_proba(X_te_nan); print("NaN test: PASS (imputer handles NaN)")
except: print("NaN test: FAIL — add SimpleImputer to pipeline")` }
  ]
};

L['ml-w8-l3'] = {
  duration_mins: 50,
  sections: [
    { type: 'text', body: '<h2>Model Serialisation & Serving</h2><p>A trained model is worthless if it cannot be deployed. This lesson covers how to save, load, version, and serve sklearn pipelines in production environments.</p>' },
    { type: 'text', body: '<h3>joblib: The Standard Choice</h3><p><code>joblib</code> is included with scikit-learn and handles numpy arrays efficiently using memory-mapped files. It is the recommended serialisation method for sklearn objects.</p>' },
    { type: 'code', lang: 'python', src: 'import joblib\nimport json\nfrom pathlib import Path\nfrom datetime import datetime\n\ndef save_model(pipeline, model_dir, model_name, metadata=None):\n    Path(model_dir).mkdir(parents=True, exist_ok=True)\n    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")\n    model_path = Path(model_dir) / f"{model_name}_{timestamp}.joblib"\n    meta_path  = Path(model_dir) / f"{model_name}_{timestamp}_meta.json"\n\n    joblib.dump(pipeline, model_path, compress=3)\n\n    meta = {\n        "model_name":     model_name,\n        "trained_at":    timestamp,\n        "sklearn_version": __import__("sklearn").__version__,\n        **(metadata or {})\n    }\n    meta_path.write_text(json.dumps(meta, indent=2))\n    print(f"Saved: {model_path}  ({model_path.stat().st_size / 1024:.1f} KB)")\n    return str(model_path)\n\ndef load_model(model_path):\n    pipeline = joblib.load(model_path)\n    print(f"Loaded: {type(pipeline).__name__}")\n    return pipeline' },
    { type: 'text', body: '<h3>Serving via REST API (FastAPI)</h3><p>The simplest production serving pattern: wrap your pipeline in a FastAPI endpoint that accepts JSON and returns predictions.</p>' },
    { type: 'code', lang: 'python', src: '# serve.py � run with: uvicorn serve:app --host 0.0.0.0 --port 8000\nfrom fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\nimport joblib\nimport pandas as pd\nfrom typing import Optional\n\napp = FastAPI(title="Churn Prediction API", version="1.0")\npipeline = joblib.load("models/churn_v1_latest.joblib")\nTHRESHOLD = 0.42\n\nclass CustomerFeatures(BaseModel):\n    tenure_months:         float\n    avg_monthly_spend_90d: float\n    days_since_last_login: float\n    support_tickets_30d:   float\n    plan_type:             str\n    payment_method:        str\n    region:                str\n    customer_id:           Optional[str] = None\n\nclass PredictionResponse(BaseModel):\n    customer_id:  Optional[str]\n    churn_prob:   float\n    churn_flag:   bool\n    risk_segment: str\n\n@app.post("/predict", response_model=PredictionResponse)\ndef predict(customer: CustomerFeatures):\n    try:\n        df = pd.DataFrame([customer.dict(exclude={"customer_id"})])\n        prob = float(pipeline.predict_proba(df)[0, 1])\n        flag = prob >= THRESHOLD\n        segment = "high" if prob > 0.7 else ("medium" if prob > 0.4 else "low")\n        return PredictionResponse(\n            customer_id=customer.customer_id,\n            churn_prob=round(prob, 4),\n            churn_flag=flag,\n            risk_segment=segment\n        )\n    except Exception as e:\n        raise HTTPException(status_code=422, detail=str(e))\n\n@app.get("/health")\ndef health():\n    return {"status": "ok"}' },
    { type: 'text', body: '<h3>Batch Scoring</h3><p>Many production use cases do not need real-time APIs � a nightly batch job that writes scores to a database is simpler and more robust:</p>' },
    { type: 'code', lang: 'python', src: '# batch_score.py\nimport joblib\nimport pandas as pd\nfrom datetime import date\n\ndef run_batch_scoring(db_conn, model_path, threshold=0.42):\n    pipeline = joblib.load(model_path)\n    customers = pd.read_sql(\n        "SELECT * FROM customer_features_daily WHERE snapshot_date = CURRENT_DATE", db_conn\n    )\n    print(f"Scoring {len(customers):,} customers...")\n\n    probs = pipeline.predict_proba(customers.drop(columns=["customer_id","snapshot_date"]))\n    customers["churn_prob"]    = probs[:, 1]\n    customers["churn_flag"]    = customers["churn_prob"] >= threshold\n    customers["scored_date"]   = date.today()\n    customers["model_version"] = model_path.split("/")[-1]\n\n    scores = customers[["customer_id","churn_prob","churn_flag","scored_date","model_version"]]\n    scores.to_sql("churn_scores", db_conn, if_exists="append", index=False)\n    print(f"Flagged {customers[\'churn_flag\'].sum():,} high-risk customers.")' },
    { type: 'text', body: '<h3>Versioning Strategy</h3><p><strong>Champion/Challenger</strong>: production always runs one champion model. New challenger models score on shadow copy and are promoted only when they beat the champion on held-out data. <strong>Semantic versioning</strong>: v{major}.{minor} � major for architecture changes, minor for retraining on new data. <strong>Never overwrite models</strong>: always append timestamp to filename � rollback requires preserved old models.</p>' },
    { type: 'warn', title: 'pickle security risk', body: 'Both pickle and joblib are unsafe to load from untrusted sources — a malicious .pkl file can execute arbitrary code on load. Only load model files from sources you control. Never expose a model-loading endpoint to public input.' },
    { type: 'tip', title: 'Model cards', body: 'For any model that informs decisions affecting people, write a model card: intended use, evaluation data, performance across demographic slices, known limitations. This is now required practice at major tech companies and increasingly expected by regulators.' },
    { type: 'exercise', title: 'Save, Load & Version a Pipeline', body: `<p>Build a complete model versioning workflow:</p>
<ol>
<li>Train a RandomForest + StandardScaler Pipeline on the breast cancer dataset</li>
<li>Save it with joblib to <code>models/breast_cancer_v1_YYYYMMDD.joblib</code> and save a JSON metadata file with: model_name, version, trained_at, n_features, feature_names, test_auc, sklearn_version</li>
<li>Load the model back and verify: (a) same predictions as original, (b) file size < 2 MB</li>
<li>Write a <code>load_latest_model(model_dir, model_name)</code> function that scans the directory for all files matching <code>{model_name}_*.joblib</code> and loads the most recently created one</li>
</ol>`,
    hint: `<code>Path(model_dir).glob(f'{model_name}_*.joblib')</code> lists matching files. Sort by <code>path.stat().st_ctime</code> to find the latest. Use <code>np.allclose(preds_original, preds_loaded)</code> to verify round-trip consistency.`,
    solution: `import joblib, json, numpy as np
from pathlib import Path
from datetime import datetime
from sklearn.datasets import load_breast_cancer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score
import sklearn

data = load_breast_cancer(); X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

pipe = Pipeline([('sc', StandardScaler()), ('rf', RandomForestClassifier(200, random_state=42))])
pipe.fit(X_tr, y_tr)
auc = roc_auc_score(y_te, pipe.predict_proba(X_te)[:,1])
orig_preds = pipe.predict_proba(X_te[:,1])

Path("models").mkdir(exist_ok=True)
ts = datetime.now().strftime("%Y%m%d_%H%M%S")
model_path = f"models/breast_cancer_v1_{ts}.joblib"
joblib.dump(pipe, model_path, compress=3)
meta = {"model_name": "breast_cancer", "version": "1.0", "trained_at": ts,
        "n_features": X.shape[1], "feature_names": list(data.feature_names),
        "test_auc": round(auc,4), "sklearn_version": sklearn.__version__}
with open(model_path.replace(".joblib","_meta.json"),"w") as f: json.dump(meta, f, indent=2)
print(f"Saved {model_path} ({Path(model_path).stat().st_size/1024:.0f} KB)")

loaded = joblib.load(model_path)
loaded_preds = loaded.predict_proba(X_te)[:,1]
print(f"Round-trip OK: {np.allclose(pipe.predict_proba(X_te)[:,1], loaded_preds)}")
assert Path(model_path).stat().st_size < 2*1024*1024

def load_latest_model(model_dir, model_name):
    files = list(Path(model_dir).glob(f"{model_name}_*.joblib"))
    if not files: raise FileNotFoundError
    latest = max(files, key=lambda p: p.stat().st_ctime)
    print(f"Loading: {latest.name}"); return joblib.load(latest)

m = load_latest_model("models", "breast_cancer_v1"); print(type(m))` }
  ]
};

L['ml-w8-l4'] = {
  duration_mins: 50,
  sections: [
    { type: 'text', body: '<h2>Model Monitoring & Data Drift</h2><p>A model deployed to production begins degrading the moment training ends. The world changes � customer behaviour shifts, new products launch, economic conditions change � and your model silently becomes less accurate. Monitoring is how you find out before it causes damage.</p>' },
    { type: 'text', body: '<h3>Types of Drift</h3><ul><li><strong>Data drift (covariate shift)</strong>: the distribution of input features X changes. Example: a new marketing campaign attracts younger customers � age distribution shifts.</li><li><strong>Concept drift</strong>: the relationship between X and y changes. Example: customers who used to churn after 3 support tickets now churn after 1 � same features, different outcome pattern.</li><li><strong>Label drift</strong>: the distribution of y changes. Example: seasonally higher churn in summer means the model trained on winter data is systematically wrong.</li><li><strong>Infrastructure drift</strong>: the data pipeline changes � a column is renamed, a feature starts arriving with delay, NULL values appear where they did not before.</li></ul>' },
    { type: 'code', lang: 'python', src: 'import numpy as np\nimport pandas as pd\nfrom scipy import stats\n\nclass DriftMonitor:\n    def fit(self, X_reference):\n        self.reference = X_reference.copy()\n        self.numeric_cols =     X_reference.select_dtypes(include="number").columns.tolist()\n        self.categorical_cols = X_reference.select_dtypes(include="object").columns.tolist()\n        return self\n\n    def detect(self, X_current, p_threshold=0.05):\n        results = []\n        for col in self.numeric_cols:\n            stat, p = stats.ks_2samp(\n                self.reference[col].dropna(), X_current[col].dropna()\n            )\n            results.append({\n                "feature": col, "test": "KS",\n                "statistic": round(stat, 4), "p_value": round(p, 4),\n                "drifted": p < p_threshold\n            })\n        for col in self.categorical_cols:\n            ref = self.reference[col].value_counts(normalize=True)\n            cur = X_current[col].value_counts(normalize=True)\n            all_cats = ref.index.union(cur.index)\n            ref_f = ref.reindex(all_cats, fill_value=1e-10).values\n            cur_f = cur.reindex(all_cats, fill_value=1e-10).values\n            stat, p = stats.chisquare(cur_f / cur_f.sum(), f_exp=ref_f / ref_f.sum())\n            results.append({\n                "feature": col, "test": "chi2",\n                "statistic": round(stat, 4), "p_value": round(p, 4),\n                "drifted": p < p_threshold\n            })\n        report = pd.DataFrame(results)\n        print(f"Drift in {report[\'drifted\'].sum()}/{len(report)} features")\n        return report' },
    { type: 'code', lang: 'python', src: '# Performance monitoring with delayed labels\nimport pandas as pd\nfrom sklearn.metrics import roc_auc_score, precision_score, recall_score\n\ndef monitor_performance(predictions_db, label_db):\n    merged = predictions_db.merge(label_db, on="customer_id")\n    merged["week"] = pd.to_datetime(merged["score_date"]).dt.to_period("W")\n    weekly = []\n    for week, grp in merged.groupby("week"):\n        if len(grp) < 30:\n            continue\n        weekly.append({\n            "week":       str(week),\n            "n":          len(grp),\n            "auc":        roc_auc_score(grp["churned"], grp["churn_prob"]),\n            "precision":  precision_score(grp["churned"], grp["churn_flag"]),\n            "recall":     recall_score(grp["churned"], grp["churn_flag"]),\n            "churn_rate": grp["churned"].mean()\n        })\n    return pd.DataFrame(weekly)' },
    { type: 'text', body: '<h3>Alerting & Retraining Triggers</h3><ul><li><strong>Hard alert</strong>: if AUC drops below minimum bar (e.g., 0.70), page oncall immediately.</li><li><strong>Soft alert</strong>: if AUC drops 5% from baseline over 2 weeks, schedule retraining within 48 hours.</li><li><strong>Drift alert</strong>: if >30% of features show drift, trigger data investigation before retraining.</li><li><strong>Scheduled retraining</strong>: regardless of drift, retrain monthly on rolling 12-month window to stay current.</li></ul>' },
    { type: 'text', body: '<h3>Tools Overview</h3><table style="width:100%;border-collapse:collapse;font-size:.9rem"><thead><tr><th style="border:1px solid #444;padding:6px">Tool</th><th style="border:1px solid #444;padding:6px">Use case</th></tr></thead><tbody><tr><td style="border:1px solid #444;padding:6px">Evidently AI</td><td style="border:1px solid #444;padding:6px">Open-source drift reports, HTML dashboards, Grafana integration</td></tr><tr><td style="border:1px solid #444;padding:6px">WhyLogs / WhyLabs</td><td style="border:1px solid #444;padding:6px">Statistical profiles, lightweight logging, cloud monitoring</td></tr><tr><td style="border:1px solid #444;padding:6px">MLflow</td><td style="border:1px solid #444;padding:6px">Experiment tracking, model registry, champion/challenger tagging</td></tr><tr><td style="border:1px solid #444;padding:6px">Prometheus + Grafana</td><td style="border:1px solid #444;padding:6px">Infrastructure metrics + custom ML metrics via /metrics endpoint</td></tr></tbody></table>' },
    { type: 'exercise', title: 'Simulate & Detect Data Drift', body: `<p>Build a drift simulation and detector:</p>
<ol>
<li>Train a logistic regression on the breast cancer dataset (80/20 split). Record baseline AUC and mean prediction probability.</li>
<li>Create drifted test data by multiplying features 0–9 by 2.5 (simulates a calibration shift)</li>
<li>For each feature, run a KS test comparing training vs drifted distribution. Print features where p &lt; 0.05.</li>
<li>Show AUC drop on drifted data. Plot overlapping histograms of prediction scores (original vs drifted) — this is what a monitoring dashboard shows.</li>
</ol>`,
    hint: `<code>from scipy.stats import ks_2samp; stat, p = ks_2samp(X_train[:,i], X_drifted[:,i])</code>. Multiply only the test set by 2.5 for columns 0-9, not the training set.`,
    solution: `import numpy as np, matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score
from scipy.stats import ks_2samp

data = load_breast_cancer(); X, y = data.data, data.target
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
pipe = Pipeline([('sc', StandardScaler()), ('lr', LogisticRegression(max_iter=10000))])
pipe.fit(X_tr, y_tr)

X_drifted = X_te.copy(); X_drifted[:, :10] *= 2.5
probs_orig  = pipe.predict_proba(X_te)[:,1]
probs_drift = pipe.predict_proba(X_drifted)[:,1]
print(f"Original AUC: {roc_auc_score(y_te, probs_orig):.4f}  mean={probs_orig.mean():.3f}")
print(f"Drifted  AUC: {roc_auc_score(y_te, probs_drift):.4f}  mean={probs_drift.mean():.3f}")

print("Drifted features (KS p<0.05):")
for i, name in enumerate(data.feature_names):
    _, p = ks_2samp(X_tr[:,i], X_drifted[:,i])
    if p < 0.05: print(f"  {name}")

plt.figure(figsize=(9,4))
plt.hist(probs_orig, bins=30, alpha=0.5, label='Original'); plt.hist(probs_drift, bins=30, alpha=0.5, label='Drifted', color='red')
plt.xlabel('Predicted Probability'); plt.title('Score Distribution Drift'); plt.legend(); plt.tight_layout(); plt.show()` },
    { type: 'tip', title: 'Monitor prediction distributions first', body: 'Performance metrics require ground-truth labels which arrive with delay. Monitor prediction score distributions (mean probability, % flagged) daily � sudden shifts are an early warning of drift even before labels arrive.' }
  ]
};

L['ml-w8-l5'] = {
  duration_mins: 120,
  sections: [
    { type: 'text', body: '<h2>Capstone: Customer Churn Prediction � End-to-End</h2><p>This capstone integrates everything from the course into a single, production-grade project: framing, preprocessing, modelling, evaluation, pipeline construction, serialisation, and monitoring design. Work through every section � this is the project you will show in your portfolio.</p>' },
    { type: 'text', body: '<h3>Project Brief</h3><p>A telecom company loses approximately 15% of its customers each quarter to churn. The retention team can proactively offer discounts to at-risk customers, but each outreach costs Rs 450 and the discount costs Rs 1,200 � a total of Rs 1,650 per intervention. A churning customer generates Rs 18,000 per year on average.</p><p><strong>Success criterion</strong>: At the operating threshold, Precision >= 0.60 and Recall >= 0.70. Business value = (TP x Rs 18,000) - (TP + FP) x Rs 1,650.</p>' },
    { type: 'code', lang: 'python', src: '# PART 1: DATA GENERATION\nimport numpy as np\nimport pandas as pd\nfrom sklearn.model_selection import train_test_split, StratifiedKFold, cross_validate\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import RobustScaler, OneHotEncoder\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier\nfrom sklearn.metrics import (roc_auc_score, classification_report,\n                             PrecisionRecallDisplay, RocCurveDisplay,\n                             precision_recall_curve)\nimport matplotlib.pyplot as plt\nimport warnings\nwarnings.filterwarnings("ignore")\nnp.random.seed(42)\n\ndef generate_churn_data(n=5000):\n    tenure  = np.random.exponential(24, n).clip(1, 72).astype(int)\n    plan    = np.random.choice(["basic","standard","premium"], n, p=[.4,.4,.2])\n    monthly = np.where(plan=="basic",    np.random.normal(45, 10, n),\n              np.where(plan=="standard", np.random.normal(75, 15, n),\n                                         np.random.normal(120, 20, n))).clip(20, 200)\n    tickets    = np.random.poisson(1.5, n)\n    last_login = np.random.exponential(10, n).clip(0, 90).astype(int)\n    payment    = np.random.choice(["card","bank","paypal"], n, p=[.5,.3,.2])\n    region     = np.random.choice(["north","south","east","west"], n)\n    logit = (-2.5 + 0.04*(30-tenure).clip(0)\n              + 0.35*tickets + 0.02*last_login - 0.008*monthly\n              + np.where(plan=="basic", 0.4, 0))\n    prob    = 1 / (1 + np.exp(-logit))\n    churned = (np.random.uniform(size=n) < prob).astype(int)\n    # 5% missingness\n    monthly[np.random.choice([True,False], n, p=[.05,.95])] = np.nan\n    tickets = tickets.astype(float)\n    tickets[np.random.choice([True,False], n, p=[.05,.95])] = np.nan\n    return pd.DataFrame({\n        "tenure_months":         tenure,\n        "avg_monthly_spend_90d": monthly,\n        "support_tickets_30d":   tickets,\n        "days_since_last_login": last_login,\n        "plan_type": plan, "payment_method": payment,\n        "region": region, "churned": churned\n    })\n\ndf = generate_churn_data(5000)\nprint(df.shape, f"  Churn rate: {df.churned.mean():.1%}")\ndf.describe().T[["mean","std","min","max"]]' },
    { type: 'code', lang: 'python', src: '# PART 2: EDA\nimport seaborn as sns\n\nfig, axes = plt.subplots(2, 3, figsize=(14, 8))\nnumcols = ["tenure_months","avg_monthly_spend_90d","support_tickets_30d"]\nfor i, col in enumerate(numcols):\n    ax = axes[0, i]\n    df[df.churned==0][col].dropna().hist(ax=ax, bins=30, alpha=.6,\n                                          label="Retained", color="steelblue")\n    df[df.churned==1][col].dropna().hist(ax=ax, bins=30, alpha=.6,\n                                          label="Churned",  color="tomato")\n    ax.set_title(col.replace("_"," ").title()); ax.legend(fontsize=8)\n\nplan_churn = df.groupby("plan_type")["churned"].mean().sort_values(ascending=False)\naxes[1,0].bar(plan_churn.index, plan_churn.values,\n              color=["#e74c3c","#f39c12","#27ae60"])\naxes[1,0].set_title("Churn Rate by Plan")\n\ntix_churn = df.groupby("support_tickets_30d")["churned"].mean()\naxes[1,1].plot(tix_churn.index, tix_churn.values, "o-", color="purple")\naxes[1,1].set_title("Churn Rate by Support Tickets")\n\nall_num = ["tenure_months","avg_monthly_spend_90d","support_tickets_30d",\n           "days_since_last_login","churned"]\nsns.heatmap(df[all_num].corr(), annot=True, fmt=".2f",\n            ax=axes[1,2], cmap="RdBu_r", center=0)\naxes[1,2].set_title("Correlation Matrix")\nplt.tight_layout(); plt.savefig("churn_eda.png", dpi=150, bbox_inches="tight"); plt.show()' },
    { type: 'code', lang: 'python', src: '# PART 3: PIPELINE & MODEL COMPARISON\nfrom sklearn.base import BaseEstimator, TransformerMixin\n\nclass ChurnFeatureEngineer(BaseEstimator, TransformerMixin):\n    def fit(self, X, y=None): return self\n    def transform(self, X):\n        X = pd.DataFrame(X).copy()\n        X["tickets_per_month"] = (X["support_tickets_30d"].fillna(0)\n                                   / X["tenure_months"].fillna(1).clip(1))\n        X["recency_score"] = 1 - X["days_since_last_login"].fillna(45) / 90\n        return X\n\nX = df.drop(columns=["churned"]); y = df["churned"]\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=.2, stratify=y, random_state=42)\n\nnumeric_features =     ["tenure_months","avg_monthly_spend_90d","support_tickets_30d",\n                         "days_since_last_login","tickets_per_month","recency_score"]\ncategorical_features = ["plan_type","payment_method","region"]\n\ndef make_pipeline(model):\n    pre = ColumnTransformer([\n        ("num", Pipeline([(("imp"), SimpleImputer(strategy="median")),\n                          (("sc"),  RobustScaler())]), numeric_features),\n        ("cat", Pipeline([(("imp"), SimpleImputer(strategy="most_frequent")),\n                          (("enc"), OneHotEncoder(drop="first",\n                                                  handle_unknown="ignore",\n                                                  sparse_output=False))]),\n         categorical_features)\n    ], remainder="drop")\n    return Pipeline([("eng", ChurnFeatureEngineer()), ("pre", pre), ("clf", model)])\n\nmodels = {\n    "LogReg":      LogisticRegression(C=0.1, max_iter=500, class_weight="balanced"),\n    "RandomForest":RandomForestClassifier(n_estimators=200, max_depth=8,\n                                          class_weight="balanced", random_state=42),\n    "GradBoost":   GradientBoostingClassifier(n_estimators=300, learning_rate=0.05,\n                                              max_depth=4, subsample=0.8, random_state=42)\n}\ncv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)\nresults = {}\nfor name, model in models.items():\n    pipe = make_pipeline(model)\n    cv_res = cross_validate(pipe, X_train, y_train, cv=cv,\n                            scoring=["roc_auc","f1","precision","recall"])\n    results[name] = {m: cv_res[f"test_{m}"].mean()\n                     for m in ["roc_auc","f1","precision","recall"]}\n    print(f"{name:15s} | AUC={results[name][\'roc_auc\']:.4f} "\n          f"F1={results[name][\'f1\']:.4f} P={results[name][\'precision\']:.4f} "\n          f"R={results[name][\'recall\']:.4f}")\nbest_name = max(results, key=lambda k: results[k]["roc_auc"])\nprint(f"Best model: {best_name}")' },
    { type: 'code', lang: 'python', src: '# PART 4: THRESHOLD TUNING FOR BUSINESS VALUE\nbest_pipe = make_pipeline(models[best_name])\nbest_pipe.fit(X_train, y_train)\ny_prob = best_pipe.predict_proba(X_test)[:, 1]\nprecs, recs, thresholds = precision_recall_curve(y_test, y_prob)\n\nINTERVENTION_COST = 1650\nCHURN_VALUE       = 18000\nbest_value, best_thresh, best_idx = -np.inf, 0.5, 0\nfor i, t in enumerate(thresholds):\n    y_pred = (y_prob >= t).astype(int)\n    tp = ((y_pred==1) & (y_test==1)).sum()\n    fp = ((y_pred==1) & (y_test==0)).sum()\n    value = tp * CHURN_VALUE - (tp + fp) * INTERVENTION_COST\n    if value > best_value:\n        best_value, best_thresh, best_idx = value, t, i\n\nprint(f"Optimal threshold: {best_thresh:.3f}")\ny_pred_final = (y_prob >= best_thresh).astype(int)\nprint(classification_report(y_test, y_pred_final, target_names=["Retained","Churned"]))\nprint(f"Estimated business value: Rs {best_value:,.0f}")\n\nfig, axes = plt.subplots(1, 2, figsize=(12, 5))\nPrecisionRecallDisplay.from_predictions(y_test, y_prob, ax=axes[0], name=best_name)\naxes[0].scatter(recs[best_idx], precs[best_idx], s=120, zorder=5,\n                color="red", label=f"Optimum (t={best_thresh:.2f})")\naxes[0].legend(); axes[0].set_title("Precision-Recall Curve")\nRocCurveDisplay.from_predictions(y_test, y_prob, ax=axes[1], name=best_name)\naxes[1].set_title("ROC Curve")\nplt.tight_layout(); plt.savefig("churn_curves.png", dpi=150, bbox_inches="tight"); plt.show()' },
    { type: 'code', lang: 'python', src: '# PART 5: FEATURE IMPORTANCE\nclfstep = best_pipe.named_steps["clf"]\nif hasattr(clfstep, "feature_importances_"):\n    importances = clfstep.feature_importances_\nelse:\n    importances = np.abs(clfstep.coef_[0])\ncat_names = (best_pipe.named_steps["pre"]\n               .named_transformers_["cat"]\n               .named_steps["enc"]\n               .get_feature_names_out(categorical_features).tolist())\nall_names = numeric_features + cat_names\ntry:\n    fi = pd.Series(importances[:len(all_names)], index=all_names).sort_values(ascending=False)\nexcept Exception:\n    fi = pd.Series(importances).sort_values(ascending=False)\nfig, ax = plt.subplots(figsize=(8, 5))\nfi.head(10).sort_values().plot.barh(ax=ax, color="steelblue")\nax.set_title("Top 10 Feature Importances"); ax.set_xlabel("Importance")\nplt.tight_layout(); plt.savefig("churn_importances.png", dpi=150, bbox_inches="tight"); plt.show()\nprint("Top features:", fi.head(5).index.tolist())' },
    { type: 'code', lang: 'python', src: '# PART 6: SAVE & VERIFY\nimport joblib, json\nfrom pathlib import Path\nfrom datetime import datetime\n\nPath("models").mkdir(exist_ok=True)\nts = datetime.now().strftime("%Y%m%d_%H%M%S")\nmodel_path = f"models/churn_{ts}.joblib"\njoblib.dump(best_pipe, model_path, compress=3)\nmeta = {\n    "model_name": "churn_predictor", "version": "1.0",\n    "trained_at": ts, "train_samples": len(X_train),\n    "test_auc": round(roc_auc_score(y_test, y_prob), 4),\n    "threshold": round(best_thresh, 4),\n    "features": list(X.columns),\n    "business_value_test": int(best_value)\n}\nwith open(model_path.replace(".joblib","_meta.json"), "w") as f:\n    json.dump(meta, f, indent=2)\nprint(f"Saved: {model_path}")\nprint(json.dumps(meta, indent=2))\n\n# Round-trip verification\nloaded = joblib.load(model_path)\ntest_preds = loaded.predict_proba(X_test[:5])[:, 1]\nprint("Round-trip verification (5 probabilities):", test_preds.round(4))' },
    { type: 'text', body: '<h3>Portfolio Presentation Checklist</h3><p>Your capstone is ready to show when you have:</p><ol><li><strong>Problem statement</strong>: clear business context, cost asymmetry, success metric</li><li><strong>EDA notebook</strong>: exploratory analysis with charts, key insights documented</li><li><strong>Pipeline code</strong>: reproducible, no bare preprocessing outside the pipeline</li><li><strong>Model comparison</strong>: at least 3 models, CV scores, not just test scores</li><li><strong>Threshold tuning</strong>: business-metric optimisation, not just accuracy</li><li><strong>Feature importance</strong>: interpretability section with visualisation</li><li><strong>Artefacts</strong>: saved joblib model + metadata JSON</li><li><strong>README</strong>: how to reproduce from scratch (data to pipeline to prediction)</li></ol>' },
    { type: 'tip', title: 'You have completed the Machine Learning course', body: 'You now have a full ML engineering toolkit: supervised and unsupervised models, rigorous evaluation, production pipelines, serialisation, and monitoring. The capstone project, polished into a GitHub repo with a clear README and visualisations, is a competitive portfolio piece that demonstrates real ML engineering � not just notebook experimentation.' }
  ]
};

L['ml-w8-quiz'] = {
  duration_mins: 15,
  sections: [
    { type: 'text', body: '<h2>Week 8 Quiz � End-to-End ML Projects</h2><p>Test your understanding of production ML practices, pipelines, and deployment concepts covered this week.</p>' }
  ]
};

})();

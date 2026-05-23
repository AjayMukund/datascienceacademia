(function(){
'use strict';
window.DSA_LESSON_CONTENT = window.DSA_LESSON_CONTENT || {};
const L = window.DSA_LESSON_CONTENT;

// ─── WEEK 1 — Missing Data & Data Quality ───────────────────────────────────

L['fe-w1-l1'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>Understanding Missing Data: MCAR, MAR, and MNAR</h2>
<p>Missing data is one of the most pervasive problems in real-world datasets. Before you impute a single value, you must understand <em>why</em> data is missing — because the mechanism determines which imputation strategies are valid, and which will silently introduce bias.</p>
<p>There are three canonical missing-data mechanisms, formalised by Rubin (1976):</p>
<ul>
  <li><strong>MCAR — Missing Completely At Random:</strong> The probability that a value is missing has no relationship to any observed or unobserved data. A sensor randomly drops packets regardless of the reading. Simple imputation introduces no bias.</li>
  <li><strong>MAR — Missing At Random:</strong> Missingness depends on <em>other observed</em> variables but not on the missing value itself. Income data is more likely to be missing for younger respondents, but once you condition on age the missingness is random. Model-based imputation works well here.</li>
  <li><strong>MNAR — Missing Not At Random:</strong> Missingness depends on the unobserved value itself. High earners refuse to report income; very ill patients drop out of clinical trials. This is the hardest case — no imputation technique fully corrects for it without auxiliary assumptions.</li>
</ul>` },
    { type: 'tip', body: `MCAR is the only mechanism where listwise deletion (dropping rows) is unbiased. For MAR and MNAR, deleting rows shrinks your dataset AND introduces bias. Always ask why data is missing before reaching for <code>dropna()</code>.` },
    { type: 'text', body: `<h3>Diagnosing the Mechanism</h3>
<p>You cannot prove MCAR from data alone — that requires domain knowledge. But you can run statistical tests to rule it out:</p>
<ul>
  <li><strong>Little's MCAR test</strong> (statsmodels / pyampute) — tests whether the missing pattern is independent of observed values.</li>
  <li><strong>Logistic regression on missingness indicators</strong> — if you can predict missingness from other columns, it's at least MAR.</li>
  <li><strong>Visualise with missingno</strong> — heatmaps and dendrograms reveal correlated missingness patterns.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import missingno as msno
import matplotlib.pyplot as plt

df = pd.read_csv('housing.csv')

# 1. Summary table
missing = (df.isnull().sum()
             .rename('count')
             .to_frame()
             .assign(pct=lambda x: x['count'] / len(df) * 100)
             .query('count > 0')
             .sort_values('pct', ascending=False))
print(missing)

# 2. Missingness matrix — columns with similar patterns cluster visually
msno.matrix(df, figsize=(12, 5))
plt.tight_layout()
plt.savefig('missing_matrix.png', dpi=150)

# 3. Correlation heatmap — dark squares = columns that go missing together
msno.heatmap(df)
plt.tight_layout()
plt.savefig('missing_heatmap.png', dpi=150)

# 4. Quick logistic test: can we predict missingness of 'LotFrontage'?
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler

target = df['LotFrontage'].isnull().astype(int)
features = df[['GrLivArea', 'YearBuilt', 'OverallQual']].fillna(0)

lr = LogisticRegression()
lr.fit(StandardScaler().fit_transform(features), target)
print("Coefficients:", dict(zip(features.columns, lr.coef_[0])))
# Non-zero coefficients suggest MAR (missingness relates to other variables)` },
    { type: 'warn', title: 'The MNAR Trap', body: `If your target variable itself drives missingness (e.g. customers who churned don't respond to surveys), imputing won't fix the selection bias. You need to either model the missingness explicitly or acknowledge the limitation in your results.` },
    { type: 'text', body: `<h3>Practical Decision Framework</h3>
<p>Use this flow when you encounter missing data:</p>
<ol>
  <li>Count and rank missing columns by percentage.</li>
  <li>Drop columns with &gt;80% missing (unless domain-critical).</li>
  <li>Visualise patterns with missingno — look for correlated blocks.</li>
  <li>Run logistic regression on missingness indicator — MAR check.</li>
  <li>Consult domain knowledge — is the value missing because of the value itself?</li>
  <li>Choose imputation strategy based on mechanism and column type.</li>
</ol>` },
    { type: 'exercise', title: 'Diagnose Missingness on the Ames Housing Dataset', hint: 'Use missingno.heatmap() and a logistic regression on the GarageType missingness indicator vs GarageArea and GarageCars.', solution: `import pandas as pd, missingno as msno
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler

df = pd.read_csv('ames_housing.csv')

# Missingness summary
print(df.isnull().mean().sort_values(ascending=False).head(10))

# Is GarageType missingness predictable from GarageArea / GarageCars?
mask = df['GarageType'].isnull().astype(int)
Xg = df[['GarageArea','GarageCars']].fillna(0)
lr = LogisticRegression().fit(StandardScaler().fit_transform(Xg), mask)
print(dict(zip(Xg.columns, lr.coef_[0])))
# Large coefficients → MAR (houses with no garage have missing type)` }
  ]
};

L['fe-w1-l2'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>Simple Imputation Strategies</h2>
<p>Simple imputation replaces missing values with a single statistic computed from the observed data. It is fast, interpretable, and works well when missingness is truly MCAR. The three classic strategies are mean, median, and mode imputation — but each has assumptions and failure modes you must understand.</p>
<h3>Mean Imputation</h3>
<p>Replace missing numerics with the column mean. This preserves the marginal mean but <em>compresses variance</em> — every imputed value is identical, which shrinks the distribution. Downstream models that rely on variance (e.g. regression coefficients, PCA) will be subtly distorted. Use mean imputation only when the column is roughly symmetric and missingness is low (&lt;5%).</p>
<h3>Median Imputation</h3>
<p>Replace with the column median. Robust to outliers — the right default for right-skewed numeric features like income, house price, or page views. If your column has extreme values, always prefer median over mean.</p>
<h3>Mode (Frequent-Category) Imputation</h3>
<p>Replace missing categoricals with the most frequent value. Tends to over-represent already-dominant categories. Acceptable at very low missingness rates (&lt;3%). At higher rates it artificially inflates mode frequency, which can mislead tree-based models that split on category counts.</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer

df = pd.read_csv('housing.csv')

num_cols = df.select_dtypes('number').columns.tolist()
cat_cols = df.select_dtypes('object').columns.tolist()

# Sklearn SimpleImputer — always fit on train, transform both
num_imputer = SimpleImputer(strategy='median')   # robust to skew
cat_imputer = SimpleImputer(strategy='most_frequent')

preprocessor = ColumnTransformer([
    ('num', num_imputer, num_cols),
    ('cat', cat_imputer, cat_cols),
])

# In a real pipeline, fit only on X_train
from sklearn.model_selection import train_test_split
X = df.drop('SalePrice', axis=1)
y = df['SalePrice']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

preprocessor.fit(X_train)   # learn medians/modes from train only
X_train_imp = preprocessor.transform(X_train)
X_test_imp  = preprocessor.transform(X_test)   # use train statistics

print("No more NaNs:", pd.DataFrame(X_train_imp, columns=num_cols+cat_cols).isnull().sum().sum())` },
    { type: 'warn', title: 'Data Leakage from Imputing Before Split', body: `Never compute imputation statistics (mean, median, mode) on the full dataset before splitting into train/test. If you do, your test set statistics contaminate your training statistics — a form of data leakage. Always fit the imputer on training data only, then transform both sets.` },
    { type: 'text', body: `<h3>Constant / Arbitrary Value Imputation</h3>
<p>Sometimes the best strategy is a domain-specific sentinel: fill with -1, 0, or "Missing". Tree-based models (XGBoost, LightGBM, Random Forest) can learn to treat these sentinels as a distinct category, effectively recovering the "was missing" signal without a separate indicator column.</p>
<p>This is especially useful for categorical columns with high cardinality — adding a literal "Missing" category is cleaner than mode imputation.</p>` },
    { type: 'code', lang: 'python', src: `from sklearn.impute import SimpleImputer

# Numerical: fill with -999 (sentinel trees can split on)
num_const = SimpleImputer(strategy='constant', fill_value=-999)

# Categorical: fill with explicit 'Missing' string
cat_const = SimpleImputer(strategy='constant', fill_value='Missing')

# This works particularly well with LightGBM which handles -999 / 'Missing' categories natively` },
    { type: 'tip', body: `For tree-based models (LightGBM, XGBoost, CatBoost), constant imputation with sentinel values often outperforms mean/median because the model can learn from the pattern of missingness rather than having it erased.` },
    { type: 'exercise', title: 'Compare Mean vs Median vs Constant Imputation', hint: 'Use cross_val_score with a RandomForestRegressor inside a Pipeline for each imputation strategy. Compare RMSE on the Ames dataset.', solution: `import pandas as pd, numpy as np
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score

df = pd.read_csv('ames_housing.csv')
X = df.select_dtypes('number').drop('SalePrice', axis=1)
y = df['SalePrice']

for strategy, fill in [('mean',None),('median',None),('constant',-999)]:
    kw = {'strategy': strategy}
    if fill is not None: kw['fill_value'] = fill
    pipe = Pipeline([('imp', SimpleImputer(**kw)),
                     ('rf',  RandomForestRegressor(n_estimators=100, random_state=42))])
    scores = cross_val_score(pipe, X, y, cv=5, scoring='neg_root_mean_squared_error')
    print(f"{strategy:10s}  RMSE: {-scores.mean():.0f} ± {scores.std():.0f}")` }
  ]
};

L['fe-w1-l3'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `<h2>Advanced Imputation: KNN and MICE</h2>
<p>When missingness is MAR — dependent on other observed features — simple statistics can't recover the true distribution. Advanced imputation methods leverage relationships between columns to produce more accurate estimates.</p>
<h3>KNN Imputation</h3>
<p>K-Nearest Neighbours imputation finds the <em>k</em> rows most similar to the row with a missing value (measured by Euclidean distance on observed features), then imputes with the mean (numeric) or mode (categorical) of those neighbours. It is non-parametric, so it handles non-linear relationships naturally.</p>
<p><strong>Strengths:</strong> Captures local structure, adapts to distributional shape.<br>
<strong>Weaknesses:</strong> O(n²) distance computation — slow on large datasets. Sensitive to scale — always standardise before KNN imputation. Requires all <em>other</em> features to be complete (or pre-imputed).</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
from sklearn.impute import KNNImputer
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

df = pd.read_csv('housing.csv')
num_cols = df.select_dtypes('number').columns.tolist()
X_num = df[num_cols]

# Scale first — KNN is distance-based, scale matters enormously
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('knn',    KNNImputer(n_neighbors=5, weights='distance'))
    # weights='distance' gives closer neighbours more influence
])

X_imputed = pipe.fit_transform(X_num)
X_imputed_df = pd.DataFrame(X_imputed, columns=num_cols)

# Check: no remaining NaNs
print("NaN count:", X_imputed_df.isnull().sum().sum())

# Compare distribution of imputed vs observed LotFrontage
import matplotlib.pyplot as plt
obs = X_num['LotFrontage'].dropna()
imp = X_imputed_df.loc[X_num['LotFrontage'].isnull(), 'LotFrontage']
plt.hist(obs, bins=40, alpha=0.6, label='Observed')
plt.hist(imp, bins=40, alpha=0.6, label='Imputed (KNN)')
plt.legend(); plt.title('LotFrontage distribution'); plt.show()` },
    { type: 'text', body: `<h3>MICE — Multiple Imputation by Chained Equations</h3>
<p>MICE (also called Fully Conditional Specification) iteratively imputes each missing column by training a regression model on all other columns, cycling through all incomplete variables multiple times until convergence. Sklearn implements this as <code>IterativeImputer</code>.</p>
<p>The key insight is that each variable's imputation model can be completely different — a random forest for skewed data, linear regression for Gaussian columns, etc.</p>
<p><strong>Algorithm steps:</strong></p>
<ol>
  <li>Initial fill with column means (to have a starting point).</li>
  <li>For each column with missing values: train a model predicting that column from all others, predict missing entries.</li>
  <li>Repeat step 2 for all incomplete columns — one full pass = one iteration.</li>
  <li>Repeat for <code>max_iter</code> cycles (typically 10) until imputed values stabilise.</li>
</ol>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
from sklearn.experimental import enable_iterative_imputer   # must import this first
from sklearn.impute import IterativeImputer
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import BayesianRidge

df = pd.read_csv('housing.csv')
num_cols = df.select_dtypes('number').columns.tolist()
X_num = df[num_cols]

# Default: BayesianRidge estimator (fast, works well for most cases)
mice_lr = IterativeImputer(
    estimator=BayesianRidge(),
    max_iter=10,
    random_state=42,
    verbose=0
)
X_imp_lr = mice_lr.fit_transform(X_num)

# Random Forest estimator: better for non-linear dependencies, slower
mice_rf = IterativeImputer(
    estimator=RandomForestRegressor(n_estimators=50, random_state=42),
    max_iter=5,
    random_state=42
)
X_imp_rf = mice_rf.fit_transform(X_num)

print("MICE-LR complete:", pd.DataFrame(X_imp_lr, columns=num_cols).isnull().sum().sum())
print("MICE-RF complete:", pd.DataFrame(X_imp_rf, columns=num_cols).isnull().sum().sum())` },
    { type: 'tip', body: `MICE with a RandomForest estimator (sometimes called MissForest) is one of the most accurate single-imputation methods available. Use it when you have moderate missingness (&lt;30%) and can afford the computation. For production with millions of rows, KNN or simple median is more practical.` },
    { type: 'warn', title: 'IterativeImputer is Experimental in sklearn', body: `You must import <code>from sklearn.experimental import enable_iterative_imputer</code> before importing IterativeImputer. This requirement may be removed in future sklearn versions.` },
    { type: 'exercise', title: 'Benchmark Simple vs KNN vs MICE Imputation', hint: 'Artificially introduce 20% MCAR missingness into a clean numeric dataset, impute with each method, then measure RMSE against the original values.', solution: `import numpy as np, pandas as pd
from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import SimpleImputer, KNNImputer, IterativeImputer
from sklearn.preprocessing import StandardScaler

rng = np.random.default_rng(0)
# Load clean dataset (no missing)
df = pd.read_csv('boston.csv')   # or any clean numeric dataset
X_true = df.values.astype(float)

# Introduce 20% MCAR missingness
mask = rng.random(X_true.shape) < 0.20
X_miss = X_true.copy()
X_miss[mask] = np.nan

methods = {
    'Median':     SimpleImputer(strategy='median'),
    'KNN-5':      Pipeline([('sc', StandardScaler()), ('knn', KNNImputer(n_neighbors=5))]),
    'MICE-Ridge': IterativeImputer(max_iter=10, random_state=42),
}

for name, imp in methods.items():
    X_imp = imp.fit_transform(X_miss)
    rmse = np.sqrt(((X_imp[mask] - X_true[mask])**2).mean())
    print(f"{name:15s}  RMSE on imputed cells: {rmse:.4f}")` }
  ]
};

L['fe-w1-l4'] = {
  duration_mins: 30,
  sections: [
    { type: 'text', body: `<h2>Missing Indicators: Preserving the Signal of Missingness</h2>
<p>When you impute a missing value, you replace the "gap" with a number — but you also erase the information that the value <em>was</em> missing. For MAR and MNAR data, the fact that a value is missing is itself a predictive signal. Missing indicators preserve that signal.</p>
<p>A missing indicator is a binary column added alongside imputed values: 1 if the original was NaN, 0 otherwise. You then impute the original column as normal <em>and</em> pass both the imputed column and the indicator to the model.</p>
<p><strong>When do indicators help?</strong></p>
<ul>
  <li>MAR: missingness correlates with other features → the indicator captures that correlation for linear models.</li>
  <li>MNAR: the missing value itself is informative (e.g. salary survey non-response is correlated with high salary).</li>
  <li>Tree-based models with sentinel imputation already learn from the gap — adding indicators often doesn't help much.</li>
  <li>Linear models and neural networks benefit most from explicit indicators.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer, MissingIndicator
from sklearn.pipeline import FeatureUnion, Pipeline
from sklearn.compose import ColumnTransformer

df = pd.read_csv('housing.csv')
num_cols = ['LotFrontage', 'MasVnrArea', 'GarageYrBlt']
X = df[num_cols]

# FeatureUnion: imputed values + indicator columns side by side
union = FeatureUnion([
    ('imputed',    SimpleImputer(strategy='median')),
    ('indicators', MissingIndicator(features='missing-only'))
])

result = union.fit_transform(X)
n_orig = len(num_cols)
n_ind  = result.shape[1] - n_orig
print(f"Output columns: {n_orig} imputed + {n_ind} indicators = {result.shape[1]}")

# Reconstruct DataFrame for inspection
ind_cols = [f"{c}_missing" for c in num_cols if df[c].isnull().any()]
out_df = pd.DataFrame(result, columns=num_cols + ind_cols)
print(out_df.head())` },
    { type: 'code', lang: 'python', src: `# More explicit approach — add indicators manually
def add_missing_indicators(df, cols):
    df = df.copy()
    for c in cols:
        if df[c].isnull().any():
            df[f'{c}_missing'] = df[c].isnull().astype(int)
    return df

cols_with_missing = df.columns[df.isnull().any()].tolist()
df_with_indicators = add_missing_indicators(df, cols_with_missing)
print(f"Added {df_with_indicators.shape[1] - df.shape[1]} indicator columns")` },
    { type: 'tip', body: `Only add indicators for columns where missingness rate is between ~2% and ~80%. Below 2% there isn't enough signal; above 80% the column itself might be dropped and the indicator becomes redundant.` },
    { type: 'warn', title: 'Do Not Add Indicators for Every Column', body: `Adding a missing indicator for a column with zero missing values introduces a constant column (all zeros) which wastes model capacity and can cause issues in some models. Use <code>MissingIndicator(features='missing-only')</code> or filter manually.` },
    { type: 'exercise', title: 'Test Whether Indicators Improve a Linear Model', hint: 'Train a Ridge regression on Ames Housing with and without missing indicators alongside median imputation. Compare 5-fold CV RMSE.', solution: `import pandas as pd
from sklearn.impute import SimpleImputer, MissingIndicator
from sklearn.pipeline import Pipeline, FeatureUnion
from sklearn.linear_model import Ridge
from sklearn.model_selection import cross_val_score

df = pd.read_csv('ames_housing.csv')
X = df.select_dtypes('number').drop('SalePrice', axis=1)
y = df['SalePrice']

pipe_no_ind = Pipeline([('imp', SimpleImputer(strategy='median')), ('m', Ridge())])
pipe_with_ind = Pipeline([
    ('feats', FeatureUnion([
        ('imp', SimpleImputer(strategy='median')),
        ('ind', MissingIndicator(features='missing-only'))
    ])),
    ('m', Ridge())
])

for name, pipe in [('No indicators', pipe_no_ind), ('With indicators', pipe_with_ind)]:
    s = cross_val_score(pipe, X, y, cv=5, scoring='neg_root_mean_squared_error')
    print(f"{name:18s}  RMSE: {-s.mean():.0f}")` }
  ]
};

L['fe-w1-l5'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>Data Quality Audit Framework</h2>
<p>Missing data is just one dimension of data quality. Before building any model, a systematic audit catches issues that will silently corrupt your results. This lesson gives you a repeatable checklist and code framework you can apply to any tabular dataset.</p>
<h3>The Seven Dimensions of Data Quality</h3>
<ol>
  <li><strong>Completeness</strong> — What fraction of values are present?</li>
  <li><strong>Uniqueness</strong> — Are there duplicate rows or IDs?</li>
  <li><strong>Consistency</strong> — Do related columns agree? (e.g. birth_date vs age)</li>
  <li><strong>Validity</strong> — Are values within expected ranges and types?</li>
  <li><strong>Accuracy</strong> — Do values match ground truth? (hardest to check automatically)</li>
  <li><strong>Timeliness</strong> — Is data current enough for the use case?</li>
  <li><strong>Referential Integrity</strong> — Do foreign keys actually exist in parent tables?</li>
</ol>
<p>In a feature engineering context, dimensions 1–4 are most automatable and most impactful.</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np

def audit_dataframe(df, target_col=None):
    """Comprehensive data quality report."""
    print("=" * 60)
    print(f"SHAPE: {df.shape[0]:,} rows × {df.shape[1]} columns")
    print("=" * 60)

    # 1. Completeness
    miss = df.isnull().mean().mul(100).round(2)
    miss = miss[miss > 0].sort_values(ascending=False)
    if not miss.empty:
        print(f"\n[MISSING] {len(miss)} columns have nulls:")
        print(miss.to_string())

    # 2. Duplicates
    n_dup = df.duplicated().sum()
    print(f"\n[DUPLICATES] {n_dup} exact duplicate rows ({n_dup/len(df)*100:.1f}%)")

    # 3. Cardinality
    print("\n[CARDINALITY]")
    for c in df.select_dtypes('object').columns:
        n_unique = df[c].nunique()
        top_val  = df[c].value_counts().index[0] if n_unique else 'N/A'
        top_pct  = df[c].value_counts(normalize=True).iloc[0]*100 if n_unique else 0
        print(f"  {c:30s}  {n_unique:>6,} unique  top='{top_val}' ({top_pct:.1f}%)")

    # 4. Numerical range checks
    print("\n[RANGES]")
    for c in df.select_dtypes('number').columns:
        col = df[c].dropna()
        q1, q3 = col.quantile([0.25, 0.75])
        iqr = q3 - q1
        n_outliers = ((col < q1 - 3*iqr) | (col > q3 + 3*iqr)).sum()
        print(f"  {c:30s}  min={col.min():.2g}  max={col.max():.2g}  outliers(3×IQR)={n_outliers}")

    # 5. Constant/near-constant columns
    near_const = [c for c in df.columns if df[c].nunique() <= 1]
    if near_const:
        print(f"\n[CONSTANT] Drop these columns: {near_const}")

    # 6. Target leakage hint (if target provided)
    if target_col and target_col in df.columns:
        corrs = df.select_dtypes('number').corr()[target_col].abs().drop(target_col)
        perfect = corrs[corrs > 0.99]
        if not perfect.empty:
            print(f"\n[LEAKAGE RISK] Near-perfect correlation with target: {perfect.index.tolist()}")

    print("\n" + "=" * 60)

# Usage
df = pd.read_csv('housing.csv')
audit_dataframe(df, target_col='SalePrice')` },
    { type: 'text', body: `<h3>Handling Discovered Issues</h3>
<p>After the audit, you'll typically find several categories of problems:</p>
<ul>
  <li><strong>Duplicate rows:</strong> <code>df.drop_duplicates()</code> — but check if "duplicates" are legitimate repeated measurements.</li>
  <li><strong>Constant columns:</strong> Drop them — they provide zero information. Beware: a column might be constant in the <em>training</em> set but vary in production.</li>
  <li><strong>Impossible values:</strong> Age = -5, price = 0 for a sold property, date in the future. These require domain-specific cleaning rules, not statistical imputation.</li>
  <li><strong>Type mismatches:</strong> A numeric column stored as string because of a stray "N/A" or comma separator. Use <code>pd.to_numeric(errors='coerce')</code>.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `# Common fixes after audit

# 1. Remove exact duplicates
df = df.drop_duplicates()

# 2. Drop near-constant columns (< 1% unique values or 0 unique)
threshold = 0.01
low_var = [c for c in df.columns if df[c].nunique() / len(df) < threshold]
df = df.drop(columns=low_var)
print(f"Dropped {len(low_var)} low-variance columns")

# 3. Fix type mismatches (numeric stored as string)
for c in ['price', 'area', 'age']:
    if c in df.columns:
        df[c] = pd.to_numeric(df[c], errors='coerce')  # invalid → NaN

# 4. Clip impossible values
if 'age' in df.columns:
    df['age'] = df['age'].clip(lower=0, upper=120)

# 5. Parse dates
if 'date_listed' in df.columns:
    df['date_listed'] = pd.to_datetime(df['date_listed'], errors='coerce')` },
    { type: 'tip', body: `Build your audit function into a reusable module and run it as the first step in every new project. Fifteen minutes of auditing can save days of debugging mysterious model behaviour later.` },
    { type: 'exercise', title: 'Write a Quality Report Function', hint: 'Extend the audit_dataframe function to output a dictionary with numeric quality scores (completeness score 0–1, duplicate rate, etc.) suitable for logging to a monitoring system.', solution: `def quality_scores(df):
    scores = {}
    scores['completeness']   = 1 - df.isnull().mean().mean()
    scores['uniqueness']     = 1 - df.duplicated().sum() / len(df)
    n_const = sum(df[c].nunique() <= 1 for c in df.columns)
    scores['no_constants']   = 1 - n_const / df.shape[1]
    scores['overall']        = (scores['completeness'] +
                                scores['uniqueness'] +
                                scores['no_constants']) / 3
    return {k: round(v, 4) for k, v in scores.items()}

df = pd.read_csv('housing.csv')
print(quality_scores(df))` }
  ]
};

// ─── WEEK 2 — Categorical Encoding ──────────────────────────────────────────

L['fe-w2-l1'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>Label Encoding and Ordinal Encoding</h2>
<p>Machine learning algorithms operate on numbers. Before any categorical feature can enter a model, it must be converted to a numeric representation. The choice of encoding is not cosmetic — it communicates structure to the model and directly affects what relationships it can discover.</p>
<h3>Label Encoding</h3>
<p>Label encoding assigns each unique category an integer: "cat" → 0, "dog" → 1, "fish" → 2. Sklearn's <code>LabelEncoder</code> is designed for the <em>target</em> variable only. For input features, use <code>OrdinalEncoder</code>.</p>
<p><strong>Critical limitation:</strong> Label encoding implies an ordinal relationship. If your categories are nominal (no inherent order), label encoding tells the model that "fish" (2) is twice "dog" (1), which is nonsense. Tree-based models can partially work around this by splitting at every threshold, but linear models will be misled.</p>
<p><strong>When is label encoding appropriate for features?</strong> Only when the category genuinely is ordinal: quality ratings (poor=0, fair=1, good=2, excellent=3), size labels (S=0, M=1, L=2, XL=3), education level.</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
from sklearn.preprocessing import LabelEncoder, OrdinalEncoder

df = pd.DataFrame({
    'quality': ['poor', 'good', 'excellent', 'fair', 'good', 'poor'],
    'city':    ['Mumbai', 'Delhi', 'Mumbai', 'Chennai', 'Delhi', 'Hyderabad'],
    'size':    ['M', 'XL', 'S', 'L', 'M', 'XL']
})

# Ordinal encoding with explicit order — correct for quality, size
quality_order = [['poor', 'fair', 'good', 'excellent']]
size_order    = [['S', 'M', 'L', 'XL']]

enc_quality = OrdinalEncoder(categories=quality_order)
enc_size    = OrdinalEncoder(categories=size_order)

df['quality_enc'] = enc_quality.fit_transform(df[['quality']])
df['size_enc']    = enc_size.fit_transform(df[['size']])
print(df[['quality','quality_enc','size','size_enc']])

# WRONG: using OrdinalEncoder on nominal 'city' without categories= implies arbitrary order
enc_city_wrong = OrdinalEncoder()   # alphabetical order — arbitrary!
df['city_wrong'] = enc_city_wrong.fit_transform(df[['city']])
print(df[['city','city_wrong']])   # Delhi=0, Hyderabad=1, Mumbai=2, Chennai=3 — meaningless` },
    { type: 'warn', title: 'OrdinalEncoder vs LabelEncoder', body: `<code>LabelEncoder</code> is for 1D arrays (target variable). <code>OrdinalEncoder</code> is for 2D arrays (feature columns) and supports multiple columns at once via the <code>categories</code> parameter. Never use LabelEncoder on feature columns — it produces ambiguous integer assignments and doesn't support pipeline composition cleanly.` },
    { type: 'text', body: `<h3>Handling Unknown Categories at Inference</h3>
<p>A category unseen during training (e.g. a new city added to the dataset) will cause sklearn's encoder to raise a ValueError by default. You have two options:</p>
<ul>
  <li><code>handle_unknown='use_encoded_value', unknown_value=-1</code> — maps unknowns to a sentinel integer. Tree models can split around -1; linear models see a misleading value.</li>
  <li><code>handle_unknown='infrequent_if_exist'</code> — groups unknowns with rare categories (when <code>min_frequency</code> is set).</li>
</ul>` },
    { type: 'code', lang: 'python', src: `from sklearn.preprocessing import OrdinalEncoder
import numpy as np

enc = OrdinalEncoder(
    categories=[['poor','fair','good','excellent']],
    handle_unknown='use_encoded_value',
    unknown_value=-1
)

train = [['good'], ['poor'], ['excellent']]
test  = [['good'], ['outstanding']]   # 'outstanding' is unknown

enc.fit(train)
print(enc.transform(test))   # [[2.], [-1.]]  ← unknown maps to -1` },
    { type: 'exercise', title: 'Encode the Ames Housing Quality Columns', hint: "Ames has several ordinal columns like OverallQual (1-10), ExterQual (Po/Fa/TA/Gd/Ex), KitchenQual. Use OrdinalEncoder with explicit category lists.", solution: `import pandas as pd
from sklearn.preprocessing import OrdinalEncoder

df = pd.read_csv('ames_housing.csv')

quality_cats = ['Po','Fa','TA','Gd','Ex']
enc = OrdinalEncoder(
    categories=[quality_cats, quality_cats, quality_cats],
    handle_unknown='use_encoded_value', unknown_value=-1
)

cols = ['ExterQual','KitchenQual','HeatingQC']
df[cols] = df[cols].fillna('TA')
df[[c+'_enc' for c in cols]] = enc.fit_transform(df[cols])
print(df[['ExterQual','ExterQual_enc']].value_counts().sort_index())` }
  ]
};

L['fe-w2-l2'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>One-Hot Encoding and the Dummy Variable Trap</h2>
<p>One-hot encoding (OHE) creates one binary column per category. "Mumbai" becomes [0,0,1], "Delhi" becomes [1,0,0], "Chennai" becomes [0,1,0]. It is the standard encoding for nominal categories with linear models because it makes no assumption about ordering.</p>
<h3>When to Use OHE</h3>
<ul>
  <li>Nominal categories (no natural order): city, colour, product type</li>
  <li>Low to moderate cardinality: ideally &lt;15 unique values per column</li>
  <li>Linear models, SVMs, and neural networks that cannot infer ordinal structure from integers</li>
</ul>
<h3>The Dummy Variable Trap</h3>
<p>If you create k binary columns for k categories, you have perfect multicollinearity: knowing the values of k–1 columns tells you the last one exactly. This causes linear models to have infinitely many solutions (singular matrix). The fix: drop one column (<code>drop='first'</code> or <code>drop='if_binary'</code>), leaving k–1 dummies. The dropped category becomes the reference level absorbed into the intercept.</p>
<p>Tree-based models are immune to multicollinearity, so you can pass all k columns without issue — and sometimes this helps (symmetric splits).</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
from sklearn.preprocessing import OneHotEncoder
import numpy as np

df = pd.DataFrame({'city': ['Mumbai','Delhi','Chennai','Mumbai','Delhi']})

# drop='first' avoids dummy trap for linear models
enc_linear = OneHotEncoder(drop='first', sparse_output=False)
result = enc_linear.fit_transform(df[['city']])
print("For linear models (drop=first):")
print(pd.DataFrame(result, columns=enc_linear.get_feature_names_out()))

# drop=None (keep all columns) for tree-based models
enc_tree = OneHotEncoder(drop=None, sparse_output=False)
result2 = enc_tree.fit_transform(df[['city']])
print("\nFor tree models (drop=None):")
print(pd.DataFrame(result2, columns=enc_tree.get_feature_names_out()))` },
    { type: 'text', body: `<h3>Dealing with High Cardinality</h3>
<p>OHE on a column with 500 unique values produces 499 or 500 new binary columns. This is called the "curse of dimensionality" in miniature — sparse, high-dimensional representations that hurt linear models (regularisation helps) and bloat memory. Practical mitigations:</p>
<ul>
  <li><code>min_frequency</code> parameter: categories rarer than a threshold get grouped into an "infrequent" bin.</li>
  <li><code>max_categories</code> parameter: keep only the top-N categories; the rest become "infrequent".</li>
  <li>Target encoding or frequency encoding (Lessons 3 & 4) for high-cardinality columns.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `from sklearn.preprocessing import OneHotEncoder
import pandas as pd

df = pd.read_csv('housing.csv')

# Neighborhood has 25 unique values — manageable with min_frequency grouping
enc = OneHotEncoder(
    min_frequency=5,         # categories seen < 5 times → 'infrequent_sklearn'
    max_categories=20,       # at most 20 output columns including infrequent
    drop='if_binary',        # drop one column only for binary features
    sparse_output=False
)

result = enc.fit_transform(df[['Neighborhood']])
print(f"Input cardinality: {df['Neighborhood'].nunique()}")
print(f"Output columns: {result.shape[1]}")
print("Column names:", enc.get_feature_names_out().tolist())` },
    { type: 'warn', title: 'sparse_output vs sparse (sklearn version)', body: `In sklearn &lt; 1.2 the parameter was named <code>sparse=False</code>. In sklearn ≥ 1.2 it was renamed to <code>sparse_output=False</code>. If you see a TypeError, check your sklearn version with <code>sklearn.__version__</code>.` },
    { type: 'tip', body: `When using OHE inside a sklearn Pipeline with ColumnTransformer, the feature names from <code>get_feature_names_out()</code> are available after fitting via <code>pipeline.named_steps['preprocessor'].get_feature_names_out()</code>. This is useful for inspecting model coefficients.` },
    { type: 'exercise', title: 'Build a Full Preprocessing Pipeline with OHE', hint: 'Use ColumnTransformer with median imputation + OHE for categoricals and median imputation + StandardScaler for numerics. Fit on train, transform test.', solution: `import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split

df = pd.read_csv('ames_housing.csv')
y = df['SalePrice']
X = df.drop('SalePrice', axis=1)

num_cols = X.select_dtypes('number').columns.tolist()
cat_cols = X.select_dtypes('object').columns.tolist()

num_pipe = Pipeline([('imp', SimpleImputer(strategy='median')),
                     ('sc',  StandardScaler())])
cat_pipe = Pipeline([('imp', SimpleImputer(strategy='constant', fill_value='Missing')),
                     ('ohe', OneHotEncoder(handle_unknown='ignore', sparse_output=False,
                                           min_frequency=5))])

ct = ColumnTransformer([('num', num_pipe, num_cols),
                         ('cat', cat_pipe, cat_cols)])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
X_tr = ct.fit_transform(X_train)
X_te = ct.transform(X_test)
print(f"Train shape: {X_tr.shape}  Test shape: {X_te.shape}")` }
  ]
};

L['fe-w2-l3'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>Target Encoding and Leave-One-Out Encoding</h2>
<p>Target encoding replaces each category with the mean of the target variable for rows belonging to that category. A city's encoding becomes the average house price for that city. This is powerful for high-cardinality features because it compresses k categories into a single numeric column while preserving the relationship with the target.</p>
<p><strong>Why it works:</strong> Instead of asking "which city?", the model sees "what is the typical target value for this city?" — a directly relevant signal.</p>
<h3>The Overfitting Problem</h3>
<p>Naive target encoding is vulnerable to <em>target leakage</em>: for categories with few samples, the mean is dominated by the specific rows in the training set. A category with a single row has a perfectly predictive encoding (the mean is exactly its target). The model memorises noise.</p>
<p>Solutions:</p>
<ul>
  <li><strong>Smoothing (shrinkage):</strong> Blend the category mean with the global mean, weighted by sample size: <code>smooth = (n × cat_mean + m × global_mean) / (n + m)</code> where m is a smoothing factor (typically 10–300). Rare categories are pulled toward the global mean.</li>
  <li><strong>Leave-One-Out (LOO) encoding:</strong> During training, encode each row's category using the mean of all <em>other</em> rows in that category, then add Gaussian noise. Eliminates self-leakage.</li>
  <li><strong>Cross-validation target encoding:</strong> Use out-of-fold means from k-fold CV — the sklearn approach.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
from sklearn.preprocessing import TargetEncoder   # sklearn >= 1.3
from sklearn.model_selection import train_test_split

df = pd.read_csv('ames_housing.csv')
X = df[['Neighborhood','MSSubClass','BldgType']]
y = df['SalePrice']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# sklearn TargetEncoder uses cross-validated encoding on the training set
enc = TargetEncoder(
    target_type='continuous',   # regression target
    smooth='auto',              # automatic smoothing based on variance ratio
    cv=5,                       # 5-fold CV for training encoding
    random_state=42
)

X_tr_enc = enc.fit_transform(X_train, y_train)
X_te_enc  = enc.transform(X_test)   # uses global means (no CV needed at test time)

print("Encoded train shape:", X_tr_enc.shape)
print("Neighborhood encodings (first 5):", X_tr_enc[:5, 0])` },
    { type: 'code', lang: 'python', src: `# Manual smoothed target encoding — useful when sklearn < 1.3 or need custom smoothing
def smoothed_target_encode(train, test, col, target, smoothing=20):
    global_mean = train[target].mean()
    stats = (train.groupby(col)[target]
               .agg(['mean', 'count'])
               .rename(columns={'mean':'cat_mean','count':'n'}))
    # Blended estimate: n*cat_mean + m*global_mean) / (n + m)
    stats['encoded'] = ((stats['n'] * stats['cat_mean'] + smoothing * global_mean)
                        / (stats['n'] + smoothing))

    train_enc = train[col].map(stats['encoded']).fillna(global_mean)
    test_enc  = test[col].map(stats['encoded']).fillna(global_mean)
    return train_enc, test_enc

import pandas as pd
df = pd.read_csv('ames_housing.csv')
train_df = df.sample(frac=0.8, random_state=42)
test_df  = df.drop(train_df.index)

tr_enc, te_enc = smoothed_target_encode(train_df, test_df, 'Neighborhood', 'SalePrice', smoothing=30)
print(tr_enc.describe())` },
    { type: 'warn', title: 'Never Target-Encode on the Full Dataset Before Splitting', body: `If you compute target means on all rows (including test), your test set encodes use target information from the test samples themselves — severe leakage. Always fit target encoding on training folds only, then apply the fitted mapping to test.` },
    { type: 'tip', body: `Target encoding shines for high-cardinality nominal features (&gt;20 categories) with tree-based models. For linear models, add regularisation or use the smoothed version. For neural networks, consider learned embeddings instead.` },
    { type: 'exercise', title: 'Compare OHE vs Target Encoding on Neighborhood', hint: 'Build two pipelines — one with OHE, one with TargetEncoder. Compare 5-fold CV RMSE with a LightGBM regressor.', solution: `import pandas as pd
from sklearn.preprocessing import OneHotEncoder, TargetEncoder
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score
import lightgbm as lgb

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice',axis=1), df['SalePrice']

cat_col = ['Neighborhood'] if 'Neighborhood' in df.columns else []
num_col = [c for c in X.columns if c not in cat_col]

for name, enc in [('OHE', OneHotEncoder(sparse_output=False, handle_unknown='ignore')),
                   ('TargetEnc', TargetEncoder(smooth='auto', cv=5))]:
    pipe = Pipeline([('imp', SimpleImputer()), ('enc', enc if cat_col else 'passthrough'),
                     ('m', lgb.LGBMRegressor(random_state=42, verbose=-1))])
    s = cross_val_score(pipe, X, y, cv=5, scoring='neg_root_mean_squared_error')
    print(f"{name:12s}  RMSE: {-s.mean():.0f}")` }
  ]
};

L['fe-w2-l4'] = {
  duration_mins: 30,
  sections: [
    { type: 'text', body: `<h2>Frequency Encoding and Feature Hashing</h2>
<h3>Frequency (Count) Encoding</h3>
<p>Frequency encoding replaces each category with how often it appears in the training set — either as raw count or as a proportion. A city appearing in 2,000 rows is encoded as 2000 (or 0.20 if using proportions).</p>
<p><strong>Why it's useful:</strong></p>
<ul>
  <li>Preserves information about rare vs common categories</li>
  <li>Produces a single numeric column regardless of cardinality — no dimensionality explosion</li>
  <li>No target leakage risk</li>
  <li>Works well with gradient boosted trees</li>
</ul>
<p><strong>Limitation:</strong> Two categories with identical frequency get identical encodings even if they have very different relationships with the target. Frequency encoding collapses any two equally-common categories into the same number — the model cannot distinguish them.</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd

df = pd.read_csv('ames_housing.csv')
train = df.sample(frac=0.8, random_state=42)
test  = df.drop(train.index)

col = 'Neighborhood'
freq_map = train[col].value_counts(normalize=True)   # proportion
train[col + '_freq'] = train[col].map(freq_map)
test[col + '_freq']  = test[col].map(freq_map).fillna(0)  # unseen → 0

print(train[[col, col+'_freq']].drop_duplicates().sort_values(col+'_freq', ascending=False))` },
    { type: 'text', body: `<h3>Feature Hashing (Hashing Trick)</h3>
<p>Feature hashing maps categories to a fixed-width vector using a hash function. A category like "Mumbai" is hashed to an integer in [0, 2^b), and that position in a sparse binary vector is set to 1. Multiple categories can hash to the same position (hash collisions), which introduces noise but bounds memory.</p>
<p><strong>When to use hashing:</strong></p>
<ul>
  <li>Extremely high cardinality (millions of unique values: URLs, user IDs, product SKUs)</li>
  <li>Online learning where new categories arrive continuously and you can't refit an encoder</li>
  <li>Memory-constrained environments</li>
  <li>NLP bag-of-words features</li>
</ul>
<p>The output dimension (number of hash buckets) is a tunable hyperparameter — larger values reduce collision rate but increase dimensionality. A common starting point is 2^18 = 262,144 buckets for text.</p>` },
    { type: 'code', lang: 'python', src: `from sklearn.feature_extraction import FeatureHasher
import pandas as pd

df = pd.DataFrame({'category': ['Mumbai','Delhi','Chennai','Mumbai','Hyderabad','Delhi','Mumbai']})

# FeatureHasher expects an iterable of dicts
hasher = FeatureHasher(n_features=8, input_type='string')
result = hasher.fit_transform(df['category'])
print(result.toarray())   # sparse → dense for display

# For a DataFrame column, convert to list of single-item lists
hasher2 = FeatureHasher(n_features=16, input_type='string')
X_hashed = hasher2.fit_transform(df['category'])
print(f"Shape: {X_hashed.shape}  Non-zero: {X_hashed.nnz}")` },
    { type: 'code', lang: 'python', src: `# Manual hashing approach using Python's built-in hash
def hash_encode(series, n_buckets=64):
    """Map each category to a bucket in [0, n_buckets)."""
    return series.apply(lambda x: hash(x) % n_buckets if pd.notnull(x) else -1)

df['cat_hash'] = hash_encode(df['category'], n_buckets=16)
print(df)
# Note: hash() is not stable across Python sessions — use hashlib for reproducibility` },
    { type: 'tip', body: `For tree-based models (LightGBM, XGBoost), frequency encoding is usually better than hashing because gradient boosted trees can split on frequency values meaningfully. Hashing shines for linear models and online learning scenarios where categorical space is open-ended.` },
    { type: 'exercise', title: 'Encode a High-Cardinality Postal Code Column', hint: 'Generate a synthetic dataset with 500 unique postal codes. Encode with frequency, target (smoothed), and hashing. Compare model performance on a regression task.', solution: `import numpy as np, pandas as pd
from sklearn.linear_model import Ridge
from sklearn.model_selection import cross_val_score
from sklearn.feature_extraction import FeatureHasher

rng = np.random.default_rng(42)
n = 5000
codes = [f"PIN{rng.integers(100,600):04d}" for _ in range(n)]
df = pd.DataFrame({'postal_code': codes})
df['value'] = df['postal_code'].apply(lambda x: int(x[3:]) * 0.1 + rng.normal(0,5))

# Frequency encode
freq = df['postal_code'].value_counts(normalize=True)
X_freq = df['postal_code'].map(freq).values.reshape(-1,1)

# Hash encode
hasher = FeatureHasher(n_features=256, input_type='string')
X_hash = hasher.transform(df['postal_code']).toarray()

for name, X in [('Frequency', X_freq), ('Hashing-256', X_hash)]:
    s = cross_val_score(Ridge(), X, df['value'], cv=5, scoring='r2')
    print(f"{name:15s}  R²: {s.mean():.4f}")` }
  ]
};

L['fe-w2-l5'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>High Cardinality and Rare Label Handling</h2>
<p>Many real-world datasets contain categorical columns with hundreds or thousands of unique values — product SKUs, neighbourhood codes, medical diagnosis codes, user agent strings. Applying standard OHE to these columns creates enormous, sparse feature matrices that hurt model performance and explode memory. Rare labels compound the problem: a category appearing only twice in training provides almost no signal but contributes a nearly-zero column to the matrix.</p>
<h3>What is a Rare Label?</h3>
<p>Typically, categories representing less than 1–5% of the training set are considered rare. The exact threshold depends on dataset size: in a 10,000-row dataset, 5% = 500 rows (enough to estimate reliably); in a 200-row dataset, 5% = 10 rows (not enough).</p>
<h3>Strategy 1: Group Rare Labels into "Other"</h3>
<p>Replace all categories below the frequency threshold with a single "Other" bucket before encoding. The number of unique values shrinks dramatically, and OHE or target encoding can work without bloating.</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd

def group_rare_labels(series, min_freq=0.01, replacement='Rare'):
    freq = series.value_counts(normalize=True)
    return series.map(lambda x: x if freq.get(x, 0) >= min_freq else replacement)

df = pd.read_csv('ames_housing.csv')
print("Before:", df['Neighborhood'].nunique(), "unique")
df['Neighborhood_clean'] = group_rare_labels(df['Neighborhood'], min_freq=0.03)
print("After: ", df['Neighborhood_clean'].nunique(), "unique")
print(df['Neighborhood_clean'].value_counts())` },
    { type: 'text', body: `<h3>Strategy 2: feature-engine's RareLabelEncoder</h3>
<p>The <code>feature-engine</code> library provides a production-ready implementation that integrates cleanly with sklearn pipelines. It stores the learned rare categories from the training set and applies the same mapping to new data — critical for preventing training/serving skew.</p>` },
    { type: 'code', lang: 'python', src: `from feature_engine.encoding import RareLabelEncoder, OrdinalEncoder as FEOrdinalEncoder
import pandas as pd

df = pd.read_csv('ames_housing.csv')
cat_cols = df.select_dtypes('object').columns.tolist()

# RareLabelEncoder: group categories below tol into 'Rare'
rle = RareLabelEncoder(
    tol=0.03,                    # < 3% of training rows → 'Rare'
    n_categories=5,              # apply only to columns with > 5 unique values
    variables=cat_cols,
    replace_with='Rare'
)

df_train = df.sample(frac=0.8, random_state=42)
df_test  = df.drop(df_train.index)

rle.fit(df_train)   # learn which labels are rare on training set only
df_train_enc = rle.transform(df_train)
df_test_enc  = rle.transform(df_test)

for col in cat_cols[:3]:
    before = df[col].nunique()
    after  = df_train_enc[col].nunique()
    print(f"{col:25s}  {before} → {after} unique values")` },
    { type: 'text', body: `<h3>Strategy 3: Embedding Layers for Very High Cardinality</h3>
<p>When cardinality exceeds a few hundred and you're using a neural network, learned embeddings are often the best solution. Each category maps to a dense low-dimensional vector (embedding dimension ≈ min(50, (n_categories+1)//2) is a common rule of thumb). The embeddings are optimised jointly with the rest of the network.</p>
<p>For non-neural models, entity embeddings can be pre-trained in a small neural network and then used as features in tree-based models — a technique popularised in Kaggle competitions.</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np

# Rule of thumb for embedding dimension
def embed_dim(n_cats):
    return min(50, (n_cats + 1) // 2)

# Example: 500 postal codes → embedding of size 50
n_postal = 500
print(f"Postal codes: {n_postal} → embedding dim {embed_dim(n_postal)}")
# 1000 product SKUs → embedding dim 50
n_skus = 1000
print(f"Product SKUs:  {n_skus} → embedding dim {embed_dim(n_skus)}")

# In PyTorch (sketch):
# self.embed = nn.Embedding(num_embeddings=n_cats+1, embedding_dim=embed_dim(n_cats))
# x_cat = self.embed(category_indices_tensor)  # shape: [batch, embed_dim]` },
    { type: 'tip', body: `A practical pipeline for production: (1) group rare labels → 'Rare', (2) apply OHE with max_categories to cap dimensions, (3) if cardinality is still high, switch to target encoding or frequency encoding. Benchmark each approach with cross-validation before deciding.` },
    { type: 'exercise', title: 'Build a Pipeline for a High-Cardinality Dataset', hint: 'Load a dataset with a column having 100+ unique values (e.g. zip codes). Apply RareLabelEncoder (tol=0.02) then TargetEncoder. Compare RMSE against raw OHE.', solution: `import pandas as pd
from feature_engine.encoding import RareLabelEncoder
from sklearn.preprocessing import TargetEncoder, OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import cross_val_score

df = pd.read_csv('ames_housing.csv')
X = df[['Neighborhood']].copy()
y = df['SalePrice']

pipe_ohe = Pipeline([
    ('ohe', OneHotEncoder(sparse_output=False, handle_unknown='ignore')),
    ('m',   GradientBoostingRegressor(random_state=42))
])

pipe_rare_te = Pipeline([
    ('rare', RareLabelEncoder(tol=0.03, variables=['Neighborhood'])),
    ('te',   TargetEncoder(smooth='auto', cv=5)),
    ('m',    GradientBoostingRegressor(random_state=42))
])

for name, pipe in [('OHE', pipe_ohe), ('Rare+TargetEnc', pipe_rare_te)]:
    s = cross_val_score(pipe, X, y, cv=5, scoring='neg_root_mean_squared_error')
    print(f"{name:20s}  RMSE: {-s.mean():.0f}")` }
  ]
};


// ─── WEEK 3 — Numerical Transformations ─────────────────────────────────────

L['fe-w3-l1'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>Feature Scaling: StandardScaler, MinMaxScaler, and RobustScaler</h2>
<p>Most machine learning algorithms are sensitive to the scale of input features. A column ranging from 0 to 1,000,000 will dominate distance calculations (KNN, SVM) and gradient magnitudes (neural networks, logistic regression) compared to a column ranging from 0 to 1. Scaling brings features onto a comparable range without changing their relative ordering or relationships.</p>
<p><strong>Tree-based models (Decision Trees, Random Forests, XGBoost, LightGBM) are scale-invariant</strong> — they split on thresholds, so scaling doesn't affect them. Scale only for algorithms that care about magnitude: linear models, SVMs, KNN, PCA, neural networks, regularised regression.</p>
<h3>StandardScaler (Z-score Normalisation)</h3>
<p>Subtracts the mean and divides by the standard deviation: <code>x' = (x − μ) / σ</code>. Output has mean ≈ 0, std ≈ 1. Assumes roughly Gaussian distribution — works poorly for heavily skewed data because the mean and std are pulled by outliers.</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler
from sklearn.model_selection import train_test_split

df = pd.read_csv('housing.csv')
num_cols = ['GrLivArea', 'LotArea', 'OverallQual', 'YearBuilt']
X = df[num_cols].fillna(df[num_cols].median())

X_train, X_test = train_test_split(X, test_size=0.2, random_state=42)

scalers = {
    'StandardScaler': StandardScaler(),
    'MinMaxScaler':   MinMaxScaler(),
    'RobustScaler':   RobustScaler(quantile_range=(25.0, 75.0)),
}

for name, scaler in scalers.items():
    Xtr = scaler.fit_transform(X_train)
    Xte = scaler.transform(X_test)
    print(f"{name:18s}  train range: [{Xtr.min():.2f}, {Xtr.max():.2f}]  "
          f"mean: {Xtr.mean():.3f}  std: {Xtr.std():.3f}")` },
    { type: 'text', body: `<h3>MinMaxScaler</h3>
<p>Maps to [0, 1]: <code>x' = (x − min) / (max − min)</code>. Preserves zero values (good for sparse data). Very sensitive to outliers — a single extreme value compresses all other values into a narrow range.</p>
<h3>RobustScaler</h3>
<p>Uses the median and IQR: <code>x' = (x − median) / IQR</code>. Robust to outliers because it uses quantile-based statistics. The best default for real-world data where outliers are common (income, transaction amounts, page views).</p>
<h3>MaxAbsScaler</h3>
<p>Divides by the maximum absolute value: <code>x' = x / |max|</code>. Preserves sparsity and zero values, does not shift the mean. Useful for already-centred sparse data.</p>` },
    { type: 'warn', title: 'Always Fit Scalers on Training Data Only', body: `Never call <code>scaler.fit_transform(X_all)</code> before splitting. The scaler would learn the min/max/mean/std from the test set, leaking information. Fit on <code>X_train</code>, call <code>.transform()</code> on both train and test.` },
    { type: 'tip', body: `Use RobustScaler as your default for real-world tabular data — it degrades gracefully in the presence of outliers. Switch to StandardScaler only when you know the data is approximately Gaussian and outlier-free.` },
    { type: 'exercise', title: 'Compare Scaler Impact on Ridge Regression', hint: 'Fit a Ridge regressor with each scaler on Ames Housing. Compare 5-fold CV RMSE and check how coefficient magnitudes change.', solution: `import pandas as pd
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler
from sklearn.linear_model import Ridge
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice',axis=1), df['SalePrice']

for name, sc in [('StandardScaler', StandardScaler()),
                  ('MinMaxScaler',   MinMaxScaler()),
                  ('RobustScaler',   RobustScaler())]:
    pipe = Pipeline([('imp', SimpleImputer(strategy='median')),
                     ('sc',  sc),
                     ('m',   Ridge(alpha=1.0))])
    s = cross_val_score(pipe, X, y, cv=5, scoring='neg_root_mean_squared_error')
    print(f"{name:18s}  RMSE: {-s.mean():.0f}")` }
  ]
};

L['fe-w3-l2'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>Power Transformations: Log, Box-Cox, and Yeo-Johnson</h2>
<p>Many numeric features are right-skewed: income, house price, page views, transaction amounts. Linear models assume Gaussian residuals; skewed features violate this and produce poor coefficient estimates. Power transformations reduce skewness and compress the dynamic range, often dramatically improving linear model performance.</p>
<h3>Log Transform</h3>
<p>The simplest and most common: <code>x' = log(x + 1)</code>. The +1 handles zeros. Works only for non-negative data. Reduces right skew by compressing large values and stretching small values. After transformation, percentage changes in the original become additive changes in the log scale.</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

df = pd.read_csv('ames_housing.csv')
col = 'GrLivArea'  # Right-skewed: living area in sq ft

fig, axes = plt.subplots(1, 3, figsize=(14, 4))

for ax, transform, label in zip(axes,
    [lambda x: x, np.log1p, lambda x: stats.boxcox(x+1)[0]],
    ['Original', 'log1p', 'Box-Cox']):
    data = transform(df[col].dropna())
    ax.hist(data, bins=50, edgecolor='k', linewidth=0.3)
    sk = pd.Series(data).skew()
    ax.set_title(f'{label} (skew={sk:.2f})')
    ax.set_xlabel(col)

plt.tight_layout()
plt.savefig('transforms.png', dpi=150)` },
    { type: 'text', body: `<h3>Box-Cox Transform</h3>
<p>The Box-Cox transform finds the optimal power parameter λ that maximises the normality of the output: <code>x'= (x^λ − 1) / λ</code> for λ ≠ 0, or <code>log(x)</code> for λ = 0. Requires strictly positive data (x > 0). Scipy's <code>boxcox</code> function estimates λ automatically via maximum likelihood.</p>
<h3>Yeo-Johnson Transform</h3>
<p>An extension of Box-Cox that handles zero and negative values. The formula is more complex but the sklearn implementation makes it trivial: it finds the optimal λ automatically, handles positives and negatives, and integrates into pipelines. <strong>In practice, Yeo-Johnson is the go-to power transform</strong> because it doesn't restrict the input range.</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
from sklearn.preprocessing import PowerTransformer, QuantileTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline

df = pd.read_csv('ames_housing.csv')
num_cols = df.select_dtypes('number').columns.tolist()
num_cols = [c for c in num_cols if c != 'SalePrice']
X = df[num_cols]

# Yeo-Johnson: handles zeros and negatives, estimates lambda automatically
yjt = PowerTransformer(method='yeo-johnson', standardize=True)
# standardize=True applies StandardScaler after the transform

pipe = Pipeline([
    ('imp', SimpleImputer(strategy='median')),
    ('yjt', yjt)
])

X_transformed = pipe.fit_transform(X)
X_tr_df = pd.DataFrame(X_transformed, columns=num_cols)

# Compare skewness before and after
orig_skew = X.skew().abs().mean()
new_skew  = X_tr_df.skew().abs().mean()
print(f"Mean |skewness|: {orig_skew:.3f} → {new_skew:.3f}")` },
    { type: 'code', lang: 'python', src: `# QuantileTransformer: maps to Gaussian or Uniform distribution
# More aggressive than Yeo-Johnson — useful for extreme outliers
from sklearn.preprocessing import QuantileTransformer

qt_gauss = QuantileTransformer(output_distribution='normal', random_state=42, n_quantiles=1000)
qt_unif  = QuantileTransformer(output_distribution='uniform', random_state=42, n_quantiles=1000)

import pandas as pd, numpy as np
from sklearn.impute import SimpleImputer

df = pd.read_csv('ames_housing.csv')
X = SimpleImputer(strategy='median').fit_transform(df[['GrLivArea','LotArea']])
print("Gauss output mean/std:", qt_gauss.fit_transform(X).mean(axis=0).round(3),
      qt_gauss.fit_transform(X).std(axis=0).round(3))` },
    { type: 'tip', body: `For regression targets, always check if the target itself benefits from log or Yeo-Johnson transformation. House prices are log-normally distributed — fitting a linear model on log(price) and exponentiating predictions often outperforms fitting directly on price.` },
    { type: 'exercise', title: 'Transform the Target and Evaluate Impact', hint: 'Log-transform SalePrice, fit a Ridge regression, then exponentiate predictions. Compare RMSE on the original scale against a model trained without log-transforming the target.', solution: `import pandas as pd, numpy as np
from sklearn.linear_model import Ridge
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice',axis=1), df['SalePrice']

imp = SimpleImputer(strategy='median')

# No log on target
pipe1 = Pipeline([('imp', imp), ('m', Ridge())])
s1 = cross_val_score(pipe1, X, y, cv=5, scoring='neg_root_mean_squared_error')
print(f"Direct RMSE:   {-s1.mean():.0f}")

# Log-transform target
import numpy as np
y_log = np.log1p(y)
pipe2 = Pipeline([('imp', SimpleImputer(strategy='median')), ('m', Ridge())])
# cross_val_score can't exponentiate internally; use manual CV
from sklearn.model_selection import KFold
kf = KFold(n_splits=5, shuffle=True, random_state=42)
rmses = []
for tr, te in kf.split(X):
    Xtr = pipe2.fit(imp.fit_transform(X.iloc[tr]), y_log.iloc[tr])
    # predict on test in log space, then exponentiate
    # simplified: use pipeline directly
rmses_log = cross_val_score(pipe2, imp.fit_transform(X), y_log, cv=5,
                             scoring='neg_root_mean_squared_error')
print(f"Log-target RMSE (log scale): {-rmses_log.mean():.4f}")` }
  ]
};

L['fe-w3-l3'] = {
  duration_mins: 30,
  sections: [
    { type: 'text', body: `<h2>Discretisation and Binning</h2>
<p>Discretisation (binning) converts a continuous feature into a set of discrete intervals or categories. This can seem counterintuitive — why discard information? — but it has several legitimate uses:</p>
<ul>
  <li><strong>Non-linear relationships in linear models:</strong> If income's effect on purchase probability is non-linear (plateaus above a threshold), binning + OHE lets linear models capture this without polynomial features.</li>
  <li><strong>Robustness to outliers:</strong> Extreme values fall into the top/bottom bin rather than dominating regression coefficients.</li>
  <li><strong>Interpretability:</strong> Age bins (18–25, 26–35, etc.) are easier to explain than continuous age.</li>
  <li><strong>Encoding domain knowledge:</strong> Medical reference ranges, regulatory thresholds, price tiers.</li>
</ul>
<p><strong>When NOT to bin:</strong> For tree-based models, binning is almost never beneficial because trees already find optimal splits. It reduces information and usually hurts performance.</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
from sklearn.preprocessing import KBinsDiscretizer

df = pd.read_csv('ames_housing.csv')

# 1. Equal-width binning — n equal-width intervals
# Problem: skewed data → most samples in one bin
eq_width = KBinsDiscretizer(n_bins=5, encode='ordinal', strategy='uniform')
df['age_bin_uniform'] = eq_width.fit_transform(df[['YearBuilt']])

# 2. Equal-frequency (quantile) binning — equal number of samples per bin
# Better for skewed distributions
eq_freq = KBinsDiscretizer(n_bins=5, encode='ordinal', strategy='quantile')
df['age_bin_quantile'] = eq_freq.fit_transform(df[['YearBuilt']])

# 3. K-means binning — cluster centroids define bin boundaries
km_bins = KBinsDiscretizer(n_bins=5, encode='ordinal', strategy='kmeans')
df['age_bin_kmeans'] = km_bins.fit_transform(df[['YearBuilt']])

# Inspect bin boundaries
print("Quantile bin edges:", eq_freq.bin_edges_[0].round(0))
print(df['age_bin_quantile'].value_counts().sort_index())` },
    { type: 'code', lang: 'python', src: `# Manual binning with custom boundaries — domain-driven
df['price_tier'] = pd.cut(
    df['SalePrice'],
    bins=[0, 100_000, 200_000, 300_000, np.inf],
    labels=['budget', 'mid-range', 'premium', 'luxury'],
    right=False
)
print(df['price_tier'].value_counts())

# Encode bins as OHE for linear models
from sklearn.preprocessing import OneHotEncoder
enc = OneHotEncoder(sparse_output=False, drop='first')
bins_ohe = enc.fit_transform(df[['price_tier']].astype(str))
print("OHE shape:", bins_ohe.shape)` },
    { type: 'tip', body: `Optimal binning for a binary classification target can be done with the <code>optbinning</code> library — it finds bin boundaries that maximise the information value (IV) with respect to the target, commonly used in credit risk modelling.` },
    { type: 'exercise', title: 'Compare Continuous vs Binned Features in a Linear Model', hint: 'Use KBinsDiscretizer (quantile) + OHE on LotArea and YearBuilt. Compare Ridge regression RMSE vs using raw continuous features.', solution: `import pandas as pd
from sklearn.preprocessing import KBinsDiscretizer, OneHotEncoder
from sklearn.linear_model import Ridge
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import cross_val_score

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1,thresh=800)
X, y = df.drop('SalePrice',axis=1), df['SalePrice']

to_bin = ['LotArea','YearBuilt','GrLivArea']
rest   = [c for c in X.columns if c not in to_bin]

ct = ColumnTransformer([
    ('bin', Pipeline([('imp', SimpleImputer(strategy='median')),
                      ('kbd', KBinsDiscretizer(n_bins=8, encode='onehot-dense', strategy='quantile'))]),
             to_bin),
    ('rest', SimpleImputer(strategy='median'), rest),
])

pipe = Pipeline([('ct', ct), ('m', Ridge())])
s = cross_val_score(pipe, X, y, cv=5, scoring='neg_root_mean_squared_error')
print(f"Binned RMSE: {-s.mean():.0f}")` }
  ]
};

L['fe-w3-l4'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>Outlier Detection and Handling</h2>
<p>Outliers are data points that lie far from the bulk of the distribution. They can arise from data entry errors, genuine rare events, sensor malfunctions, or extreme but valid cases. How you handle them depends on their cause.</p>
<p><strong>Impact of outliers by model type:</strong></p>
<ul>
  <li><strong>Linear models:</strong> Highly sensitive — OLS minimises squared residuals, so extreme points pull the regression line hard.</li>
  <li><strong>Tree-based models:</strong> Relatively robust — splits are based on rank order, not magnitude. But outliers can still affect leaf statistics and gradient calculations in boosting.</li>
  <li><strong>KNN / distance-based:</strong> Very sensitive — one extreme point can dominate all distance calculations.</li>
  <li><strong>Neural networks:</strong> Sensitive through gradient magnitude — outlier targets produce large loss values and unstable gradients.</li>
</ul>
<h3>Detection Methods</h3>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np

df = pd.read_csv('ames_housing.csv')
col = 'GrLivArea'
data = df[col].dropna()

# 1. IQR rule (non-parametric — no distribution assumption)
Q1, Q3 = data.quantile([0.25, 0.75])
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR
iqr_outliers = data[(data < lower) | (data > upper)]
print(f"IQR outliers: {len(iqr_outliers)} ({len(iqr_outliers)/len(data)*100:.1f}%)")

# 2. Z-score (parametric — assumes normality)
z = (data - data.mean()) / data.std()
z_outliers = data[z.abs() > 3]
print(f"Z>3 outliers: {len(z_outliers)}")

# 3. Modified Z-score (robust — uses median absolute deviation)
mad = (data - data.median()).abs().median()
m_z = 0.6745 * (data - data.median()) / mad
mz_outliers = data[m_z.abs() > 3.5]
print(f"Modified Z>3.5: {len(mz_outliers)}")

# 4. Isolation Forest (multivariate)
from sklearn.ensemble import IsolationForest
num_df = df.select_dtypes('number').fillna(df.select_dtypes('number').median())
iso = IsolationForest(contamination=0.05, random_state=42)
preds = iso.fit_predict(num_df)
print(f"Isolation Forest anomalies: {(preds == -1).sum()}")` },
    { type: 'text', body: `<h3>Handling Strategies</h3>
<ol>
  <li><strong>Investigate first:</strong> Are the extreme values genuine? A 6,000 sq ft house in Ames, Iowa might be a data error or a legitimate mansion. Domain knowledge is essential.</li>
  <li><strong>Capping / Winsorising:</strong> Replace values beyond the 1st/99th percentile (or IQR fence) with the fence value. Retains the point but limits its influence. Most practical approach for production pipelines.</li>
  <li><strong>Deletion:</strong> Remove the row. Safe only when you're confident it's a data error and the row is otherwise unusable.</li>
  <li><strong>Transformations:</strong> Log or power transforms reduce the influence of large values by compressing the scale (Lesson 2 of this week).</li>
  <li><strong>Robust models:</strong> Use Huber regression instead of OLS, or median-based estimators.</li>
</ol>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin

class Winsoriser(BaseEstimator, TransformerMixin):
    """Cap values at lower/upper percentile fences."""
    def __init__(self, lower_pct=1, upper_pct=99):
        self.lower_pct = lower_pct
        self.upper_pct = upper_pct

    def fit(self, X, y=None):
        self.lower_ = np.percentile(X, self.lower_pct, axis=0)
        self.upper_ = np.percentile(X, self.upper_pct, axis=0)
        return self

    def transform(self, X):
        return np.clip(X, self.lower_, self.upper_)

# Example usage
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer

df = pd.read_csv('ames_housing.csv')
num_cols = df.select_dtypes('number').columns.tolist()
X = df[num_cols].values

pipe = Pipeline([
    ('imp', SimpleImputer(strategy='median')),
    ('win', Winsoriser(lower_pct=1, upper_pct=99)),
])
X_clean = pipe.fit_transform(X)
print("Max value before:", X[~np.isnan(X)].max())
print("Max value after: ", X_clean.max())` },
    { type: 'warn', title: 'Fit Winsoriser on Training Data Only', body: `The percentile boundaries must be learned from the training set. If you compute percentiles on the full dataset, test-set extreme values may get capped at a fence computed with knowledge of the test distribution — subtle leakage.` },
    { type: 'exercise', title: 'Build a Robust Outlier-Handling Pipeline', hint: 'Combine SimpleImputer → Winsoriser → RobustScaler in a Pipeline. Test on Ames Housing with Ridge regression and compare RMSE to a pipeline without Winsoriser.', solution: `import pandas as pd, numpy as np
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import RobustScaler
from sklearn.linear_model import Ridge
from sklearn.model_selection import cross_val_score
from sklearn.base import BaseEstimator, TransformerMixin

class Winsoriser(BaseEstimator, TransformerMixin):
    def __init__(self, q=(1, 99)):
        self.q = q
    def fit(self, X, y=None):
        self.lo_, self.hi_ = np.percentile(X, self.q, axis=0)
        return self
    def transform(self, X):
        return np.clip(X, self.lo_, self.hi_)

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']

for name, steps in [
    ('No winsorise', [('imp',SimpleImputer(strategy='median')),('sc',RobustScaler()),('m',Ridge())]),
    ('Winsorise',    [('imp',SimpleImputer(strategy='median')),('win',Winsoriser()),('sc',RobustScaler()),('m',Ridge())]),
]:
    s = cross_val_score(Pipeline(steps), X, y, cv=5, scoring='neg_root_mean_squared_error')
    print(f"{name:14s}  RMSE: {-s.mean():.0f}")` }
  ]
};

L['fe-w3-l5'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>Date/Time Features and Cyclical Encoding</h2>
<p>DateTime columns are raw pointers to a moment in time. Models cannot use timestamps as-is — you must extract the predictive signal encoded within them. A datetime column is secretly multiple features: year, month, day, hour, day-of-week, is-weekend, days-since-event, and cyclical patterns.</p>
<h3>Basic Datetime Decomposition</h3>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np

df = pd.read_csv('sales.csv', parse_dates=['sale_date'])

# Extract temporal components
df['year']        = df['sale_date'].dt.year
df['month']       = df['sale_date'].dt.month          # 1–12
df['day']         = df['sale_date'].dt.day            # 1–31
df['dayofweek']   = df['sale_date'].dt.dayofweek      # 0=Monday, 6=Sunday
df['quarter']     = df['sale_date'].dt.quarter        # 1–4
df['weekofyear']  = df['sale_date'].dt.isocalendar().week.astype(int)
df['is_weekend']  = df['sale_date'].dt.dayofweek.ge(5).astype(int)
df['is_month_end']= df['sale_date'].dt.is_month_end.astype(int)

# Time elapsed — often more predictive than raw date
reference_date = pd.Timestamp('2010-01-01')
df['days_since_launch'] = (df['sale_date'] - reference_date).dt.days

# For housing: age of the property
df_housing = pd.read_csv('ames_housing.csv')
df_housing['house_age'] = 2010 - df_housing['YearBuilt']  # dataset was compiled ~2010
df_housing['years_since_remodel'] = 2010 - df_housing['YearRemodAdd']

print(df.dtypes)` },
    { type: 'text', body: `<h3>The Problem with Linear Month Encoding</h3>
<p>Month 12 (December) and month 1 (January) are neighbours in time, but numerically they are at opposite ends: 12 − 1 = 11. If you pass raw month numbers to a linear model, it cannot learn that December and January are similar. The same applies to hours (23 and 0 are adjacent), days of week, and compass directions.</p>
<h3>Cyclical Encoding with Sine and Cosine</h3>
<p>Project the cyclic variable onto the unit circle using sin and cos. For a variable with period T: <code>sin(2π × x / T)</code> and <code>cos(2π × x / T)</code>. This places month 12 and month 1 adjacent on the circle, preserving the cyclic structure. You need both sin and cos to uniquely identify each position (sin alone is ambiguous between two symmetric points).</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

df = pd.read_csv('sales.csv', parse_dates=['sale_date'])
df['month'] = df['sale_date'].dt.month

# Cyclical encoding
df['month_sin'] = np.sin(2 * np.pi * df['month'] / 12)
df['month_cos'] = np.cos(2 * np.pi * df['month'] / 12)

df['dow']     = df['sale_date'].dt.dayofweek
df['dow_sin'] = np.sin(2 * np.pi * df['dow'] / 7)
df['dow_cos'] = np.cos(2 * np.pi * df['dow'] / 7)

# Visualise the cyclical encoding — months form a circle
months = pd.DataFrame({'m': range(1, 13)})
months['sin'] = np.sin(2 * np.pi * months['m'] / 12)
months['cos'] = np.cos(2 * np.pi * months['m'] / 12)

plt.figure(figsize=(5, 5))
for _, row in months.iterrows():
    plt.annotate(str(int(row['m'])), (row['cos'], row['sin']),
                 ha='center', va='center', fontsize=11)
plt.scatter(months['cos'], months['sin'])
theta = np.linspace(0, 2*np.pi, 200)
plt.plot(np.cos(theta), np.sin(theta), 'k--', alpha=0.3)
plt.title('Monthly cyclical encoding — unit circle')
plt.savefig('cyclic_months.png', dpi=150)
print(df[['month','month_sin','month_cos']].drop_duplicates().sort_values('month'))` },
    { type: 'code', lang: 'python', src: `# Sklearn-compatible cyclical transformer for pipeline use
from sklearn.base import BaseEstimator, TransformerMixin
import numpy as np
import pandas as pd

class CyclicalEncoder(BaseEstimator, TransformerMixin):
    def __init__(self, col, period):
        self.col    = col
        self.period = period
    def fit(self, X, y=None): return self
    def transform(self, X):
        X = pd.DataFrame(X) if not isinstance(X, pd.DataFrame) else X.copy()
        X[f'{self.col}_sin'] = np.sin(2 * np.pi * X[self.col] / self.period)
        X[f'{self.col}_cos'] = np.cos(2 * np.pi * X[self.col] / self.period)
        return X.drop(columns=[self.col])

# Usage in a pipeline step — encode month (period=12) and hour (period=24)` },
    { type: 'tip', body: `For gradient boosted trees, cyclic encoding is less critical because trees can learn "month 11 or 12" splits directly. Cyclic encoding most benefits linear models and neural networks where distance in feature space matters.` },
    { type: 'exercise', title: 'Engineer Datetime Features from an E-commerce Dataset', hint: 'Extract month, day-of-week, hour with cyclical encoding. Add is_weekend, is_month_end. Use a Ridge regression to predict daily sales. Compare R² with and without cyclical encoding.', solution: `import pandas as pd, numpy as np
from sklearn.linear_model import Ridge
from sklearn.model_selection import cross_val_score

# Simulate data
rng = np.random.default_rng(42)
dates = pd.date_range('2022-01-01', periods=500, freq='D')
df = pd.DataFrame({'date': dates})
df['month'] = df['date'].dt.month
df['dow']   = df['date'].dt.dayofweek
df['is_weekend'] = df['dow'].ge(5).astype(int)
# Sales with monthly and weekday seasonality
df['sales'] = (100 + 20*np.sin(2*np.pi*df['month']/12)
               + 15*(df['dow'] == 0) + rng.normal(0, 10, 500))

def make_features(df, cyclic=True):
    X = df[['is_weekend']].copy()
    if cyclic:
        X['month_sin'] = np.sin(2*np.pi*df['month']/12)
        X['month_cos'] = np.cos(2*np.pi*df['month']/12)
        X['dow_sin']   = np.sin(2*np.pi*df['dow']/7)
        X['dow_cos']   = np.cos(2*np.pi*df['dow']/7)
    else:
        X['month'] = df['month']
        X['dow']   = df['dow']
    return X

for name, cyclic in [('Raw month/dow', False), ('Cyclical', True)]:
    X = make_features(df, cyclic)
    s = cross_val_score(Ridge(), X, df['sales'], cv=5, scoring='r2')
    print(f"{name:18s}  R²: {s.mean():.4f}")` }
  ]
};

// ─── WEEK 4 — Feature Creation & Domain Engineering ─────────────────────────

L['fe-w4-l1'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>Interaction Features and Polynomial Features</h2>
<p>Raw features describe each variable independently. Interaction features capture how two variables work <em>together</em>. A linear model with two features x₁ and x₂ fits: <code>y = β₀ + β₁x₁ + β₂x₂</code>. Adding the interaction term x₁×x₂ lets the model fit: <code>y = β₀ + β₁x₁ + β₂x₂ + β₃(x₁×x₂)</code> — the effect of x₁ can now depend on the value of x₂.</p>
<p><strong>Classic housing example:</strong> Quality × size. A small house with high quality is worth something; a large house with low quality is worth something else. But a large, high-quality house is worth disproportionately more than their sum. This multiplicative interaction is captured by <code>OverallQual × GrLivArea</code>.</p>
<h3>When Do Interactions Help?</h3>
<ul>
  <li>Linear and logistic regression models — they cannot discover interactions on their own.</li>
  <li>When domain knowledge suggests joint effects.</li>
  <li>When polynomial features improve cross-validation score.</li>
</ul>
<p>Tree-based models discover interactions implicitly through split sequences, so adding explicit interactions rarely helps them — and can hurt by bloating the feature space.</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.linear_model import Ridge
from sklearn.model_selection import cross_val_score

df = pd.read_csv('ames_housing.csv')
X = df[['GrLivArea','OverallQual','TotalBsmtSF','GarageArea']].fillna(0)
y = df['SalePrice']

# PolynomialFeatures degree=2: all pairwise interactions + squares
# interaction_only=True: skip x² terms (keep only x₁×x₂)
for degree, interaction_only in [(2, False), (2, True)]:
    pipe = Pipeline([
        ('imp', SimpleImputer(strategy='median')),
        ('poly', PolynomialFeatures(degree=degree, include_bias=False,
                                     interaction_only=interaction_only)),
        ('m', Ridge(alpha=10.0))
    ])
    s = cross_val_score(pipe, X, y, cv=5, scoring='neg_root_mean_squared_error')
    tag = "interactions+squares" if not interaction_only else "interactions only"
    print(f"degree={degree} {tag:25s}  features={pipe.fit(X,y).named_steps['poly'].n_output_features_}  RMSE={-s.mean():.0f}")` },
    { type: 'code', lang: 'python', src: `# Manual domain-specific interactions (often more powerful than automated)
df = pd.read_csv('ames_housing.csv')

df['qual_x_area']    = df['OverallQual'] * df['GrLivArea'].fillna(0)
df['total_sqft']     = df['TotalBsmtSF'].fillna(0) + df['GrLivArea'].fillna(0)
df['qual_x_condition']= df['OverallQual'] * df['OverallCond']
df['remodel_age']    = df['YearRemodAdd'] - df['YearBuilt']
df['garage_ratio']   = df['GarageArea'].fillna(0) / (df['GrLivArea'].fillna(1))

# These domain interactions often outperform blind PolynomialFeatures
new_features = ['qual_x_area','total_sqft','qual_x_condition','remodel_age','garage_ratio']
print(df[new_features].describe())` },
    { type: 'warn', title: 'Interaction Feature Explosion', body: `PolynomialFeatures(degree=2) on n features produces O(n²) output features. On 100 features that is ~5,000 columns; degree=3 gives ~170,000. Always add regularisation (Ridge, Lasso) and monitor the train vs CV gap to catch overfitting.` },
    { type: 'tip', body: `SHAP interaction values (covered in Week 5) can identify which pairs of features have the strongest interactions, allowing you to add only the most impactful interaction terms rather than all pairwise combinations.` },
    { type: 'exercise', title: 'Add Domain Interactions and Measure RMSE Improvement', hint: 'Add qual_x_area, total_sqft, and remodel_age to the Ames feature set. Compare Ridge RMSE with and without these interactions using 5-fold CV.', solution: `import pandas as pd
from sklearn.linear_model import Ridge
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score

df = pd.read_csv('ames_housing.csv')
y = df['SalePrice']
num_cols = df.select_dtypes('number').columns.tolist()
X_base = df[num_cols].drop(columns=['SalePrice'])

X_enhanced = X_base.copy()
X_enhanced['qual_x_area']  = df['OverallQual'] * df['GrLivArea'].fillna(0)
X_enhanced['total_sqft']   = df['TotalBsmtSF'].fillna(0) + df['GrLivArea'].fillna(0)
X_enhanced['remodel_age']  = df['YearRemodAdd'] - df['YearBuilt']

for name, X in [('Baseline', X_base), ('+ Interactions', X_enhanced)]:
    pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('m', Ridge())])
    s = cross_val_score(pipe, X, y, cv=5, scoring='neg_root_mean_squared_error')
    print(f"{name:18s}  RMSE: {-s.mean():.0f}  features: {X.shape[1]}")` }
  ]
};

L['fe-w4-l2'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>Aggregation Features</h2>
<p>Aggregation features summarise information about groups of related records. They answer questions like: "What is the average sale price in this neighbourhood?" or "How many orders has this customer placed in the last 30 days?" These features encode context that a single row cannot see.</p>
<p>Aggregations are most common in:</p>
<ul>
  <li><strong>Customer-level features from transaction history:</strong> count, sum, mean, recency of purchases</li>
  <li><strong>Geospatial context:</strong> average price per neighbourhood, crime rate per zip code</li>
  <li><strong>Time-windowed aggregations:</strong> 7-day rolling average, 30-day sum (requires careful temporal handling)</li>
  <li><strong>Entity-level statistics:</strong> seller average rating, product review sentiment average</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np

df = pd.read_csv('ames_housing.csv')

# Group-level aggregations: statistics per Neighborhood
neigh_stats = df.groupby('Neighborhood')['SalePrice'].agg(
    neigh_median_price='median',
    neigh_mean_price='mean',
    neigh_count='count',
    neigh_price_std='std'
).reset_index()

df = df.merge(neigh_stats, on='Neighborhood', how='left')
print(df[['Neighborhood','SalePrice','neigh_median_price']].head(10))

# Quality group: mean area per quality tier
qual_area = df.groupby('OverallQual')['GrLivArea'].agg(
    qual_mean_area='mean', qual_median_area='median'
).reset_index()
df = df.merge(qual_area, on='OverallQual', how='left')

# Ratio feature: house area vs neighborhood typical area
df['area_vs_neigh'] = df['GrLivArea'] / df['neigh_mean_price'].replace(0, np.nan)
print(df[['GrLivArea','neigh_mean_price','area_vs_neigh']].describe())` },
    { type: 'warn', title: 'Temporal Leakage in Aggregations', body: `When computing aggregations for a training set, you must use only information available <em>before</em> each row's timestamp. If computing "neighbourhood average price" for a June 2009 sale, only sales before June 2009 should be included. Using future data in aggregations is a severe form of leakage — the model will appear excellent in CV but fail in production.` },
    { type: 'code', lang: 'python', src: `# Safe temporal aggregation — for time-series splits
import pandas as pd

df = pd.read_csv('sales_ts.csv', parse_dates=['sale_date'])
df = df.sort_values('sale_date')

# Rolling aggregation: use only past 30 days of sales for each row
df['roll_30d_mean'] = (df.set_index('sale_date')['amount']
                        .rolling('30D', min_periods=1)
                        .mean()
                        .values)

# Expanding mean (all history up to current row)
df['expanding_mean'] = df['amount'].expanding().mean()

# Manual group-level expanding mean (per customer)
df['customer_hist_mean'] = (df.groupby('customer_id')['amount']
                              .expanding()
                              .mean()
                              .shift(1)   # shift(1): don't include current row
                              .reset_index(level=0, drop=True))` },
    { type: 'tip', body: `The RFM framework (Recency, Frequency, Monetary value) is a classic aggregation pattern for customer analytics. Computing these three statistics per customer from transaction history gives powerful predictors for churn, lifetime value, and next-purchase timing models.` },
    { type: 'exercise', title: 'Compute Neighbourhood Statistics and Measure Uplift', hint: 'For Ames Housing, add neighbourhood median price, std, and count. Also add a ratio of the house price to neighbourhood median (for training data, compute the aggregate on the full training fold — not using the current row\'s price).', solution: `import pandas as pd
from sklearn.linear_model import Ridge
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import KFold, cross_val_score
import numpy as np

df = pd.read_csv('ames_housing.csv')
y = df['SalePrice']
num_base = df.select_dtypes('number').columns.drop('SalePrice').tolist()

# Out-of-fold neighbourhood aggregation to avoid leakage
kf = KFold(n_splits=5, shuffle=True, random_state=42)
df['neigh_median_oof'] = np.nan

for tr, te in kf.split(df):
    stats = df.iloc[tr].groupby('Neighborhood')['SalePrice'].median()
    df.loc[df.index[te], 'neigh_median_oof'] = df.iloc[te]['Neighborhood'].map(stats)

df['neigh_median_oof'] = df['neigh_median_oof'].fillna(y.median())

X_base = df[num_base].copy()
X_enh  = X_base.copy()
X_enh['neigh_median_oof'] = df['neigh_median_oof']

for name, X in [('Base', X_base), ('+ Neigh agg', X_enh)]:
    pipe = Pipeline([('imp',SimpleImputer(strategy='median')),('m',Ridge())])
    s = cross_val_score(pipe, X, y, cv=5, scoring='neg_root_mean_squared_error')
    print(f"{name:14s}  RMSE: {-s.mean():.0f}")` }
  ]
};

L['fe-w4-l3'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>The feature-engine Library</h2>
<p><code>feature-engine</code> is a Python library designed specifically for feature engineering, built to be fully compatible with sklearn pipelines. While sklearn provides basic preprocessors, feature-engine covers transformations that sklearn lacks or handles awkwardly: rare label encoding, monotonic transformations, mathematical combination, cyclical encoding, and more.</p>
<p>The key advantage is pipeline composability — every transformer in feature-engine follows the fit/transform API and accepts a <code>variables</code> parameter to target specific columns. This makes multi-column pipelines far cleaner than raw sklearn ColumnTransformer chains.</p>` },
    { type: 'code', lang: 'python', src: `# Install: pip install feature-engine
import pandas as pd
from feature_engine.imputation import MeanMedianImputer, CategoricalImputer, AddMissingIndicator
from feature_engine.encoding import RareLabelEncoder, OrdinalEncoder
from feature_engine.transformation import LogTransformer, YeoJohnsonTransformer
from feature_engine.outliers import Winsorizer
from sklearn.pipeline import Pipeline

df = pd.read_csv('ames_housing.csv')
num_cols = ['LotArea','GrLivArea','TotalBsmtSF','GarageArea']
cat_cols = ['Neighborhood','BldgType','HouseStyle']

pipe = Pipeline([
    # 1. Add missing indicators before imputing
    ('add_ind', AddMissingIndicator(variables=num_cols + cat_cols, missing_only=True)),

    # 2. Impute missing values
    ('num_imp', MeanMedianImputer(imputation_method='median', variables=num_cols)),
    ('cat_imp', CategoricalImputer(imputation_method='frequent', variables=cat_cols)),

    # 3. Group rare categories
    ('rare',    RareLabelEncoder(tol=0.03, n_categories=5, variables=cat_cols)),

    # 4. Clip outliers
    ('winsor',  Winsorizer(capping_method='iqr', tail='both', fold=1.5, variables=num_cols)),

    # 5. Log-transform skewed numerics
    ('logt',    LogTransformer(variables=['LotArea','GrLivArea'])),

    # 6. Ordinal encode remaining cats
    ('ordenc',  OrdinalEncoder(encoding_method='ordered', variables=cat_cols)),
])

pipe.fit(df.drop('SalePrice', axis=1), df['SalePrice'])
X_transformed = pipe.transform(df.drop('SalePrice', axis=1))
print(X_transformed.shape, X_transformed.dtypes.value_counts())` },
    { type: 'code', lang: 'python', src: `# MathematicalCombination: auto-generate interaction features
from feature_engine.creation import MathematicalCombination, CombineWithReferenceFeature

df = pd.read_csv('ames_housing.csv').fillna(0)

# Generate all pairwise math combinations for a set of columns
mc = MathematicalCombination(
    variables_to_combine=['GrLivArea','TotalBsmtSF','GarageArea'],
    math_operations=['sum','prod','mean']
)
mc.fit(df)
df_combo = mc.transform(df)
print("New columns:", [c for c in df_combo.columns if c not in df.columns])

# CombineWithReferenceFeature: create ratios against a reference
crf = CombineWithReferenceFeature(
    variables_to_combine=['TotalBsmtSF','GarageArea'],
    reference_variables=['GrLivArea'],
    operations=['div']   # ratio of each column to GrLivArea
)
crf.fit(df)
df_ratio = crf.transform(df)
print("Ratio columns:", [c for c in df_ratio.columns if c not in df.columns])` },
    { type: 'tip', body: `feature-engine's transformers store all fitting parameters (e.g. imputation values, rare label lists, percentile fences) and apply them identically at inference time — no risk of fitting on test data. This makes it production-safe out of the box.` },
    { type: 'exercise', title: 'Build a Full feature-engine Pipeline', hint: 'Use feature-engine transformers for imputation, rare label grouping, winsorisation, log transform, and ordinal encoding. Plug the pipeline into a RandomForestRegressor and evaluate with 5-fold CV.', solution: `import pandas as pd
from feature_engine.imputation import MeanMedianImputer, CategoricalImputer
from feature_engine.encoding import RareLabelEncoder, OrdinalEncoder
from feature_engine.outliers import Winsorizer
from feature_engine.transformation import LogTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score

df = pd.read_csv('ames_housing.csv')
y = df['SalePrice']
X = df.drop('SalePrice', axis=1)

num_cols = X.select_dtypes('number').columns.tolist()
cat_cols = X.select_dtypes('object').columns.tolist()
log_cols = [c for c in ['LotArea','GrLivArea'] if c in num_cols]

pipe = Pipeline([
    ('num_imp', MeanMedianImputer(imputation_method='median', variables=num_cols)),
    ('cat_imp', CategoricalImputer(variables=cat_cols)),
    ('rare',    RareLabelEncoder(tol=0.02, variables=cat_cols)),
    ('winsor',  Winsorizer(capping_method='iqr', variables=num_cols)),
    ('logt',    LogTransformer(variables=log_cols)),
    ('enc',     OrdinalEncoder(encoding_method='arbitrary', variables=cat_cols)),
    ('m',       RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1))
])

s = cross_val_score(pipe, X, y, cv=5, scoring='neg_root_mean_squared_error')
print(f"RMSE: {-s.mean():.0f} ± {s.std():.0f}")` }
  ]
};

L['fe-w4-l4'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>Leakage-Free Pipelines</h2>
<p>Data leakage occurs when information from outside the training data's time or scope contaminates the model, making it appear more accurate than it actually is. It is one of the most common and costly mistakes in applied ML — models that look great in validation and fail in production.</p>
<h3>Types of Leakage</h3>
<ul>
  <li><strong>Target leakage:</strong> A feature that is not available at prediction time because it is measured after (or simultaneously with) the target. Example: using "amount claimed" to predict "will file insurance claim?" — the amount is only known after the claim is filed.</li>
  <li><strong>Training/test contamination:</strong> Fitting a preprocessor (scaler, imputer, encoder) on the entire dataset before splitting, so test-set statistics flow into training. The most common form of leakage.</li>
  <li><strong>Future data leakage:</strong> In time-series, using data from future periods to compute features for past periods (e.g. a moving average computed forward instead of backward).</li>
</ul>` },
    { type: 'code', lang: 'python', src: `# THE WRONG WAY — common beginner mistake
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
from sklearn.model_selection import train_test_split

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna()
X, y = df.drop('SalePrice', axis=1), df['SalePrice']

# LEAK: fitting scaler on all data before split
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)         # uses test set statistics!
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2)
# This model's CV score is optimistically biased

# THE RIGHT WAY — fit preprocessors inside the pipeline
from sklearn.pipeline import Pipeline

X_train_raw, X_test_raw, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
pipe = Pipeline([('sc', StandardScaler()), ('m', Ridge())])
pipe.fit(X_train_raw, y_train)   # scaler sees only train data
score = pipe.score(X_test_raw, y_test)
print(f"Correct R²: {score:.4f}")` },
    { type: 'text', body: `<h3>Cross-Validation with Pipelines</h3>
<p>Using <code>cross_val_score</code> with a Pipeline is automatically leakage-free: sklearn refits the entire pipeline (including all preprocessing steps) on each training fold. The test fold is transformed using parameters learned from the training fold only.</p>
<p>This is why <strong>always wrapping your preprocessing in a Pipeline before cross-validating</strong> is a cardinal rule of feature engineering.</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.linear_model import Ridge
from sklearn.model_selection import cross_val_score, KFold

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']

# Every step in this pipeline is refit fresh for each fold — no leakage
pipe = Pipeline([
    ('imp', SimpleImputer(strategy='median')),
    ('sc',  StandardScaler()),
    ('m',   Ridge(alpha=10.0))
])

kf = KFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(pipe, X, y, cv=kf, scoring='neg_root_mean_squared_error')
print(f"5-fold CV RMSE: {-scores.mean():.0f} ± {scores.std():.0f}")

# Fitting on full data for final model (after CV confirms performance)
pipe.fit(X, y)
print("Pipeline fitted on full training data — ready for deployment")` },
    { type: 'code', lang: 'python', src: `# Detecting target leakage: correlation with target
import pandas as pd
import numpy as np

df = pd.read_csv('insurance_claims.csv')
corr = df.corr()['claim_filed'].abs().sort_values(ascending=False)
suspicious = corr[corr > 0.95].index.tolist()
if suspicious:
    print("Potential target leakage — very high correlation with target:")
    for c in suspicious:
        print(f"  {c}: {corr[c]:.3f}")

# Check feature availability: can we observe this feature BEFORE we know the target?
# "claim_amount" — known only after filing — is leakage
# "policy_age_days" — known at quote time — is valid` },
    { type: 'warn', title: 'Leakage in Target Encoding', body: `Target encoding is inherently leaky when applied naively — the training row's target is used to compute the category mean that encodes that same row. Use sklearn's TargetEncoder (which uses CV internally) or LOO encoding with noise addition.` },
    { type: 'exercise', title: 'Audit a Pipeline for Leakage', hint: 'Given a pipeline that applies StandardScaler before train/test split, identify the leak, fix it by moving the scaler inside a Pipeline object, and compare the biased vs correct CV score.', solution: `import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']
X = X.fillna(X.median())

# Leaked version
sc_leak = StandardScaler()
X_leak = sc_leak.fit_transform(X)   # entire dataset
X_tr, X_te, y_tr, y_te = train_test_split(X_leak, y, test_size=0.2, random_state=42)
m_leak = Ridge().fit(X_tr, y_tr)
print(f"Leaked R²: {m_leak.score(X_te, y_te):.4f}")

# Fixed version: Pipeline CV
pipe = Pipeline([('sc', StandardScaler()), ('m', Ridge())])
s = cross_val_score(pipe, X, y, cv=5, scoring='r2')
print(f"Correct CV R²: {s.mean():.4f}")` }
  ]
};

L['fe-w4-l5'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>Domain Knowledge Features</h2>
<p>The most valuable feature engineering insight rarely comes from automated tools — it comes from understanding the domain. A data scientist who knows that house prices depend on "price per square foot" will create that ratio feature, which captures something that raw area and price individually do not. A fraud analyst who knows that "transaction at 3am on a weekend with a new device" is suspicious will create that composite flag.</p>
<p>Domain knowledge features work because they encode relationships that actually drive the outcome in the real world. They reduce the amount of data the model needs to discover the relationship on its own.</p>
<h3>Housing Domain Features</h3>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np

df = pd.read_csv('ames_housing.csv')

# Quality and condition composite
df['overall_score'] = df['OverallQual'] * df['OverallCond']
df['external_score'] = (df['ExterQual'].map({'Ex':5,'Gd':4,'TA':3,'Fa':2,'Po':1}).fillna(3) +
                        df['ExterCond'].map({'Ex':5,'Gd':4,'TA':3,'Fa':2,'Po':1}).fillna(3))

# Age and renovation features
df['house_age']          = 2010 - df['YearBuilt']
df['years_since_remodel']= 2010 - df['YearRemodAdd']
df['is_renovated']       = (df['YearRemodAdd'] > df['YearBuilt']).astype(int)
df['years_since_sale']   = 2010 - df['YrSold']

# Space features
df['total_sf']           = (df['TotalBsmtSF'].fillna(0) + df['GrLivArea'].fillna(0))
df['total_bathrooms']    = (df['FullBath'].fillna(0) +
                            0.5 * df['HalfBath'].fillna(0) +
                            df['BsmtFullBath'].fillna(0) +
                            0.5 * df['BsmtHalfBath'].fillna(0))
df['porch_sf']           = (df['OpenPorchSF'].fillna(0) + df['EnclosedPorch'].fillna(0) +
                            df['ScreenPorch'].fillna(0) + df['3SsnPorch'].fillna(0))
df['has_pool']           = (df['PoolArea'].fillna(0) > 0).astype(int)
df['has_2nd_floor']      = (df['2ndFlrSF'].fillna(0) > 0).astype(int)

# Garage features
df['garage_age']         = df['YrSold'] - df['GarageYrBlt'].fillna(df['YearBuilt'])
df['cars_per_area']      = df['GarageCars'].fillna(0) / (df['GarageArea'].fillna(1) + 1)

print(df[['house_age','total_sf','total_bathrooms','is_renovated']].describe())` },
    { type: 'text', body: `<h3>Feature Engineering Heuristics Across Domains</h3>
<p>These patterns recur across many domains:</p>
<ul>
  <li><strong>Ratios:</strong> Revenue per user, price per sq ft, conversion rate. Normalise one quantity by another to remove scale effects.</li>
  <li><strong>Differences and deltas:</strong> Year built minus year remodelled, current price minus baseline price. Capture change rather than absolute level.</li>
  <li><strong>Binary flags:</strong> Has pool (yes/no), is new construction, is high season. Compress a continuous feature when the threshold matters more than the value.</li>
  <li><strong>Counts:</strong> Number of bedrooms, number of previous purchases, number of failed login attempts.</li>
  <li><strong>Composite scores:</strong> Combine multiple weak signals (quality + condition + age) into a single domain-informed feature.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `# Evaluate which domain features add the most signal
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.inspection import permutation_importance
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
import pandas as pd, numpy as np

df = pd.read_csv('ames_housing.csv')
y = df['SalePrice']

# Add all domain features
df['total_sf']        = df['TotalBsmtSF'].fillna(0) + df['GrLivArea'].fillna(0)
df['house_age']       = 2010 - df['YearBuilt']
df['total_bathrooms'] = df['FullBath'].fillna(0) + 0.5*df['HalfBath'].fillna(0)
df['is_renovated']    = (df['YearRemodAdd'] > df['YearBuilt']).astype(int)
df['overall_score']   = df['OverallQual'] * df['OverallCond']

X = df.select_dtypes('number').drop('SalePrice', axis=1)
X = SimpleImputer(strategy='median').fit_transform(X)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

m = GradientBoostingRegressor(n_estimators=200, random_state=42).fit(X_tr, y_tr)
imp = permutation_importance(m, X_te, y_te, n_repeats=10, random_state=42)
cols = df.select_dtypes('number').drop('SalePrice', axis=1).columns
for idx in imp.importances_mean.argsort()[::-1][:10]:
    print(f"  {cols[idx]:25s}  {imp.importances_mean[idx]:.4f}")` },
    { type: 'tip', body: `Read papers, kaggle discussion threads, and talk to domain experts before engineering features. The best features often come from the single insight: "people who do X are twice as likely to Y" — which becomes a binary flag in your dataset.` },
    { type: 'exercise', title: 'Create a Domain Feature Set and Evaluate Uplift', hint: 'Add at least 5 domain-informed features to Ames Housing. Measure 5-fold CV RMSE improvement over the raw numeric-only baseline with a GradientBoostingRegressor.', solution: `import pandas as pd, numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score

df = pd.read_csv('ames_housing.csv')
y = df['SalePrice']

def add_domain_features(df):
    d = df.copy()
    d['total_sf']         = d['TotalBsmtSF'].fillna(0) + d['GrLivArea'].fillna(0)
    d['house_age']        = 2010 - d['YearBuilt']
    d['total_bathrooms']  = d['FullBath'].fillna(0) + 0.5*d['HalfBath'].fillna(0)
    d['is_renovated']     = (d['YearRemodAdd'] > d['YearBuilt']).astype(int)
    d['overall_score']    = d['OverallQual'] * d['OverallCond']
    d['porch_sf']         = d['OpenPorchSF'].fillna(0) + d['EnclosedPorch'].fillna(0)
    return d

X_base = df.select_dtypes('number').drop('SalePrice', axis=1)
X_enh  = add_domain_features(df).select_dtypes('number').drop('SalePrice', axis=1)

for name, X in [('Baseline', X_base), ('Domain features', X_enh)]:
    pipe = Pipeline([('imp', SimpleImputer(strategy='median')),
                     ('m',   GradientBoostingRegressor(n_estimators=200, random_state=42))])
    s = cross_val_score(pipe, X, y, cv=5, scoring='neg_root_mean_squared_error')
    print(f"{name:18s}  RMSE: {-s.mean():.0f}  n_features: {X.shape[1]}")` }
  ]
};


// ─── WEEK 5 — Feature Selection ─────────────────────────────────────────────

L['fe-w5-l1'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>Filter Methods for Feature Selection</h2>
<p>Feature selection reduces the number of features fed to a model, improving generalisation, training speed, and interpretability. Filter methods evaluate each feature independently of the model, using a statistical test or score to measure its relationship to the target. They are fast and model-agnostic — compute once, use with any algorithm.</p>
<h3>Variance Threshold</h3>
<p>Remove features with very low variance — they provide almost no information. A binary feature that is 1 for 99% of samples has variance p(1−p) = 0.0099. Setting a threshold of 0.01 removes such features.</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
from sklearn.feature_selection import (VarianceThreshold, SelectKBest, SelectPercentile,
                                        f_regression, f_classif, chi2, mutual_info_regression)
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']
X_imp = SimpleImputer(strategy='median').fit_transform(X)

# 1. Variance threshold — remove near-constant columns
vt = VarianceThreshold(threshold=0.01)
X_vt = vt.fit_transform(X_imp)
removed = X.shape[1] - X_vt.shape[1]
print(f"VarianceThreshold removed {removed} columns → {X_vt.shape[1]} remaining")
print("Removed:", X.columns[~vt.get_support()].tolist())` },
    { type: 'code', lang: 'python', src: `# 2. Correlation-based filtering — remove redundant features
import pandas as pd, numpy as np

def remove_correlated(X_df, threshold=0.95):
    corr = X_df.corr().abs()
    upper = corr.where(np.triu(np.ones(corr.shape), k=1).astype(bool))
    to_drop = [c for c in upper.columns if any(upper[c] > threshold)]
    return X_df.drop(columns=to_drop), to_drop

df_num = df.drop('SalePrice', axis=1).fillna(df.median())
X_uncorr, dropped = remove_correlated(df_num, threshold=0.90)
print(f"Correlation filter (>0.90) dropped: {dropped}")
print(f"Remaining features: {X_uncorr.shape[1]}")` },
    { type: 'code', lang: 'python', src: `# 3. Statistical tests: f_regression, mutual_info_regression
from sklearn.feature_selection import SelectPercentile, f_regression, mutual_info_regression

X_imp_df = pd.DataFrame(SimpleImputer(strategy='median').fit_transform(X), columns=X.columns)

# F-statistic: measures linear correlation between feature and target
sel_f = SelectPercentile(f_regression, percentile=50)
sel_f.fit(X_imp_df, y)
f_selected = X_imp_df.columns[sel_f.get_support()].tolist()
print(f"F-regression keeps: {len(f_selected)} features")

# Mutual information: measures any (linear or non-linear) dependence
sel_mi = SelectPercentile(mutual_info_regression, percentile=50)
sel_mi.fit(X_imp_df, y)
mi_selected = X_imp_df.columns[sel_mi.get_support()].tolist()
print(f"Mutual info keeps: {len(mi_selected)} features")

# Agreement: features selected by both
both = set(f_selected) & set(mi_selected)
print(f"Agreed on: {len(both)} features: {sorted(both)[:5]}...")` },
    { type: 'warn', title: 'Filter Methods Are Univariate', body: `Filter methods evaluate each feature in isolation. They miss redundancy between features (two individually predictive features that carry identical information) and cannot detect features that are individually weak but powerful in combination. Use them as a first pass to remove obvious junk, not as a final selector.` },
    { type: 'tip', body: `Use <code>chi2</code> from sklearn for classification tasks with non-negative features (counts, frequencies). Use <code>f_classif</code> for continuous features in classification, and <code>f_regression</code> or <code>mutual_info_regression</code> for regression targets.` },
    { type: 'exercise', title: 'Pipeline with Variance + Correlation + MI Filter', hint: 'Chain VarianceThreshold → correlation filter → SelectPercentile(mutual_info_regression) before a Ridge regressor. Report how many features remain at each step and the final CV RMSE.', solution: `import pandas as pd, numpy as np
from sklearn.feature_selection import VarianceThreshold, SelectPercentile, mutual_info_regression
from sklearn.impute import SimpleImputer
from sklearn.linear_model import Ridge
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']

pipe = Pipeline([
    ('imp',  SimpleImputer(strategy='median')),
    ('vt',   VarianceThreshold(threshold=0.01)),
    ('mi',   SelectPercentile(mutual_info_regression, percentile=60)),
    ('m',    Ridge())
])

s = cross_val_score(pipe, X, y, cv=5, scoring='neg_root_mean_squared_error')
pipe.fit(X, y)
n_after_vt = pipe.named_steps['vt'].get_support().sum()
n_after_mi = pipe.named_steps['mi'].get_support().sum()
print(f"After VT: {n_after_vt}, After MI: {n_after_mi}, RMSE: {-s.mean():.0f}")` }
  ]
};

L['fe-w5-l2'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>Wrapper Methods: RFE and RFECV</h2>
<p>Wrapper methods select features by repeatedly training a model and evaluating subset quality. Unlike filter methods, they account for the interactions between features as seen by a specific estimator. The trade-off: they are much more computationally expensive.</p>
<h3>Recursive Feature Elimination (RFE)</h3>
<p>RFE works backwards. Starting with all features:</p>
<ol>
  <li>Train the model on the current feature set.</li>
  <li>Rank features by importance (coefficient magnitude for linear models, feature importance for trees).</li>
  <li>Remove the least important feature(s).</li>
  <li>Repeat until the target number of features is reached.</li>
</ol>
<p>You specify how many features to keep (<code>n_features_to_select</code>). This requires knowing the target count in advance — which is why RFECV is usually preferred.</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
from sklearn.feature_selection import RFE, RFECV
from sklearn.linear_model import Ridge, Lasso
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import KFold
import matplotlib.pyplot as plt

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']
X_imp = SimpleImputer(strategy='median').fit_transform(X)
feature_names = X.columns.tolist()

# RFE with Ridge — selects top 20 features
rfe = RFE(estimator=Ridge(), n_features_to_select=20, step=1)
rfe.fit(X_imp, y)
selected_rfe = [f for f, s in zip(feature_names, rfe.support_) if s]
print(f"RFE selected {len(selected_rfe)} features:")
print(sorted(selected_rfe))` },
    { type: 'code', lang: 'python', src: `from sklearn.feature_selection import RFECV
from sklearn.linear_model import Ridge
from sklearn.model_selection import KFold
import matplotlib.pyplot as plt

# RFECV: automatically finds optimal number of features via cross-validation
kf = KFold(n_splits=5, shuffle=True, random_state=42)
rfecv = RFECV(
    estimator=Ridge(),
    step=1,
    cv=kf,
    scoring='neg_root_mean_squared_error',
    min_features_to_select=5,
    n_jobs=-1
)
rfecv.fit(X_imp, y)

print(f"Optimal number of features: {rfecv.n_features_}")
selected_rfecv = [f for f, s in zip(feature_names, rfecv.support_) if s]
print("Selected:", selected_rfecv)

# Plot CV score vs number of features
n_scores = len(rfecv.cv_results_['mean_test_score'])
plt.figure(figsize=(8, 4))
plt.plot(range(1, n_scores + 1), -rfecv.cv_results_['mean_test_score'])
plt.axvline(rfecv.n_features_, color='r', linestyle='--', label=f'Optimal: {rfecv.n_features_}')
plt.xlabel('Number of features')
plt.ylabel('RMSE (CV)')
plt.title('RFECV — feature count vs CV error')
plt.legend()
plt.tight_layout()
plt.savefig('rfecv.png', dpi=150)` },
    { type: 'text', body: `<h3>RFE with Tree-Based Estimators</h3>
<p>RFE works with any estimator that exposes <code>feature_importances_</code> or <code>coef_</code>. Using a GradientBoostingRegressor inside RFE captures non-linear relationships that Ridge would miss — but is much slower. A common practical approach: run RFE with Ridge quickly to narrow to ~50 features, then use a tree model for the final selection from those 50.</p>` },
    { type: 'code', lang: 'python', src: `from sklearn.feature_selection import RFE
from sklearn.ensemble import RandomForestRegressor

# Tree-based RFE — step=0.1 removes 10% of remaining features per iteration
rfe_rf = RFE(
    estimator=RandomForestRegressor(n_estimators=50, random_state=42, n_jobs=-1),
    n_features_to_select=15,
    step=0.1   # remove 10% per step — faster than step=1
)
rfe_rf.fit(X_imp, y)
selected_rf = [f for f, s in zip(feature_names, rfe_rf.support_) if s]
print(f"Tree RFE selected: {sorted(selected_rf)}")` },
    { type: 'tip', body: `For large datasets (>100,000 rows), RFE/RFECV can be very slow. Speed it up by: (1) pre-filtering with a filter method first, (2) using <code>step=0.1</code> instead of <code>step=1</code>, (3) using a fast model like Ridge or a shallow RandomForest inside RFE.` },
    { type: 'exercise', title: 'RFECV with Ridge vs GradientBoosting — Feature Count Comparison', hint: 'Run RFECV with Ridge and separately with GradientBoostingRegressor on Ames Housing. Compare how many features each selects and whether the selected sets overlap.', solution: `import pandas as pd
from sklearn.feature_selection import RFECV
from sklearn.linear_model import Ridge
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.impute import SimpleImputer
from sklearn.model_selection import KFold

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']
X_imp = SimpleImputer(strategy='median').fit_transform(X)
cols = X.columns.tolist()
kf = KFold(n_splits=5, shuffle=True, random_state=42)

results = {}
for name, est in [('Ridge', Ridge()), ('GBR', GradientBoostingRegressor(n_estimators=50, random_state=42))]:
    rfecv = RFECV(estimator=est, cv=kf, scoring='neg_root_mean_squared_error', step=2, n_jobs=-1)
    rfecv.fit(X_imp, y)
    results[name] = set(c for c, s in zip(cols, rfecv.support_) if s)
    print(f"{name}: {len(results[name])} features selected")

overlap = results['Ridge'] & results['GBR']
print(f"Overlap: {len(overlap)} features: {sorted(overlap)[:5]}...")` }
  ]
};

L['fe-w5-l3'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>Embedded Methods and Permutation Importance</h2>
<p>Embedded methods perform feature selection as part of the model training process. Rather than a separate selection step, regularisation drives less useful features toward zero. This makes them efficient — one model fit does both learning and selection.</p>
<h3>L1 Regularisation (Lasso)</h3>
<p>Lasso regression adds a penalty equal to the sum of absolute coefficient values: loss = RSS + α × Σ|βⱼ|. The L1 penalty drives some coefficients to exactly zero, performing automatic feature selection. Features with zero coefficients are effectively excluded from the model. The regularisation strength α controls sparsity — larger α = fewer features retained.</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
from sklearn.linear_model import Lasso, LassoCV
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']

# LassoCV automatically finds optimal alpha via CV
pipe = Pipeline([
    ('imp', SimpleImputer(strategy='median')),
    ('sc',  StandardScaler()),
    ('lasso', LassoCV(cv=5, max_iter=10000, random_state=42, n_jobs=-1))
])
pipe.fit(X, y)

lasso = pipe.named_steps['lasso']
print(f"Optimal alpha: {lasso.alpha_:.4f}")

coefs = pd.Series(lasso.coef_, index=X.columns).abs().sort_values(ascending=False)
nonzero = coefs[coefs > 0]
zero    = coefs[coefs == 0]
print(f"Non-zero coefs: {len(nonzero)}  Zero (excluded): {len(zero)}")
print(nonzero.head(10))` },
    { type: 'code', lang: 'python', src: `# SelectFromModel: use any estimator's feature_importances_ / coef_ as selector
from sklearn.feature_selection import SelectFromModel
from sklearn.linear_model import LassoCV
from sklearn.ensemble import GradientBoostingRegressor

# Lasso-based selection
lasso_sel = SelectFromModel(
    LassoCV(cv=5, random_state=42),
    threshold='1e-5'  # coef > threshold → selected
)
lasso_sel.fit(X_imp, y)
print(f"Lasso SelectFromModel: {lasso_sel.get_support().sum()} features")

# GBM-based selection (uses feature_importances_)
gbm_sel = SelectFromModel(
    GradientBoostingRegressor(n_estimators=100, random_state=42),
    threshold='median'  # keep features above median importance
)
gbm_sel.fit(X_imp, y)
print(f"GBM SelectFromModel: {gbm_sel.get_support().sum()} features")` },
    { type: 'text', body: `<h3>Permutation Importance</h3>
<p>Permutation importance measures how much model performance degrades when a single feature's values are randomly shuffled (breaking its relationship with the target). A feature with high permutation importance is one the model relies on — shuffling it hurts badly. A feature with near-zero permutation importance can be removed with little performance loss.</p>
<p><strong>Advantages over tree feature_importances_:</strong> works with any model, is not biased toward high-cardinality features, and is computed on a held-out test set so it reflects true generalisation.</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
from sklearn.inspection import permutation_importance
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']
X_imp = SimpleImputer(strategy='median').fit_transform(X)
cols = X.columns.tolist()

X_tr, X_te, y_tr, y_te = train_test_split(X_imp, y, test_size=0.25, random_state=42)
m = GradientBoostingRegressor(n_estimators=200, random_state=42).fit(X_tr, y_tr)

result = permutation_importance(m, X_te, y_te, n_repeats=20, random_state=42, n_jobs=-1)

perm_df = pd.DataFrame({
    'feature': cols,
    'importance_mean': result.importances_mean,
    'importance_std':  result.importances_std
}).sort_values('importance_mean', ascending=False)

# Features with negative importance are truly useless (shuffling them helps!)
useful = perm_df[perm_df['importance_mean'] > 0]
print(f"Useful features: {len(useful)} / {len(cols)}")
print(useful.head(10).to_string(index=False))` },
    { type: 'tip', body: `Permutation importance can be negative — shuffling the feature improved performance. This means the model was using the feature in a way that introduced noise. These features are strong candidates for removal.` },
    { type: 'exercise', title: 'Compare Lasso vs Permutation Importance Feature Sets', hint: 'Select features with LassoCV SelectFromModel and with permutation importance (keep positive-importance features). Compare overlap and CV RMSE with a GradientBoostingRegressor.', solution: `import pandas as pd, numpy as np
from sklearn.linear_model import LassoCV
from sklearn.feature_selection import SelectFromModel
from sklearn.inspection import permutation_importance
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split, cross_val_score

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']
imp = SimpleImputer(strategy='median')
X_imp = imp.fit_transform(X)
cols = X.columns.tolist()

# Lasso selection
from sklearn.preprocessing import StandardScaler
X_sc = StandardScaler().fit_transform(X_imp)
lasso_sel = SelectFromModel(LassoCV(cv=5, random_state=42, max_iter=5000))
lasso_sel.fit(X_sc, y)
lasso_mask = lasso_sel.get_support()

# Permutation importance
X_tr, X_te, y_tr, y_te = train_test_split(X_imp, y, test_size=0.25, random_state=42)
m = GradientBoostingRegressor(n_estimators=100, random_state=42).fit(X_tr, y_tr)
pi = permutation_importance(m, X_te, y_te, n_repeats=15, random_state=42)
perm_mask = pi.importances_mean > 0

for name, mask in [('Lasso', lasso_mask), ('Permutation', perm_mask), ('Both', lasso_mask & perm_mask)]:
    n = mask.sum()
    m2 = GradientBoostingRegressor(n_estimators=100, random_state=42)
    s = cross_val_score(m2, X_imp[:, mask], y, cv=5, scoring='neg_root_mean_squared_error')
    print(f"{name:15s}  n={n}  RMSE: {-s.mean():.0f}")` }
  ]
};

L['fe-w5-l4'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `<h2>SHAP for Feature Selection and Interpretation</h2>
<p>SHAP (SHapley Additive exPlanations) is a unified framework for explaining any ML model's predictions. Based on cooperative game theory, it assigns each feature a fair share of the prediction — the Shapley value — representing how much that feature contributed to the difference between the model's prediction and the average prediction.</p>
<p><strong>Why SHAP over feature importance?</strong></p>
<ul>
  <li>Sklearn's <code>feature_importances_</code> measures how often a feature is used in splits — biased toward high-cardinality features.</li>
  <li>Permutation importance can conflate correlated features.</li>
  <li>SHAP provides directional information: does this feature push the prediction up or down?</li>
  <li>SHAP values are consistent: if model A uses feature X more than model B, A's SHAP value for X is always ≥ B's.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `# pip install shap
import shap
import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']
X_imp = SimpleImputer(strategy='median').fit_transform(X)
X_imp_df = pd.DataFrame(X_imp, columns=X.columns)

X_tr, X_te, y_tr, y_te = train_test_split(X_imp_df, y, test_size=0.2, random_state=42)
model = GradientBoostingRegressor(n_estimators=200, random_state=42).fit(X_tr, y_tr)

# TreeExplainer is fast for tree-based models (exact, not approximate)
explainer = shap.TreeExplainer(model)
shap_values = explainer(X_te)   # returns Explanation object

# Mean absolute SHAP value = global feature importance
mean_abs_shap = pd.Series(
    np.abs(shap_values.values).mean(axis=0),
    index=X.columns
).sort_values(ascending=False)
print("Top 10 features by mean |SHAP|:")
print(mean_abs_shap.head(10))` },
    { type: 'code', lang: 'python', src: `import shap
import matplotlib.pyplot as plt

# 1. Beeswarm plot — shows distribution of SHAP values for all features
shap.plots.beeswarm(shap_values, max_display=15, show=False)
plt.tight_layout()
plt.savefig('shap_beeswarm.png', dpi=150)
plt.close()

# 2. Bar plot — mean |SHAP| per feature (global importance)
shap.plots.bar(shap_values, max_display=15, show=False)
plt.tight_layout()
plt.savefig('shap_bar.png', dpi=150)
plt.close()

# 3. Waterfall for a single prediction — explains one row
shap.plots.waterfall(shap_values[0], show=False)
plt.tight_layout()
plt.savefig('shap_waterfall_row0.png', dpi=150)
plt.close()

# 4. Dependence plot — SHAP value of GrLivArea vs its actual value
shap.plots.scatter(shap_values[:, 'GrLivArea'], color=shap_values, show=False)
plt.tight_layout()
plt.savefig('shap_dependence.png', dpi=150)
plt.close()` },
    { type: 'text', body: `<h3>Using SHAP for Feature Selection</h3>
<p>SHAP values give you a principled, model-aware way to select features:</p>
<ol>
  <li>Train a model on all features.</li>
  <li>Compute mean |SHAP| for each feature.</li>
  <li>Drop features below a threshold (e.g. &lt;1% of maximum mean |SHAP|).</li>
  <li>Retrain on the reduced feature set and verify CV performance doesn't degrade.</li>
</ol>
<p>This is more informative than filter methods (accounts for model's actual use of features) and cheaper than RFECV (one model fit instead of many).</p>` },
    { type: 'code', lang: 'python', src: `import shap, pandas as pd, numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.impute import SimpleImputer
from sklearn.model_selection import cross_val_score

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']
X_imp = pd.DataFrame(SimpleImputer(strategy='median').fit_transform(X), columns=X.columns)

# Step 1: train on all features
m = GradientBoostingRegressor(n_estimators=200, random_state=42).fit(X_imp, y)

# Step 2: SHAP importance
exp = shap.TreeExplainer(m)
sv  = exp(X_imp)
mean_shap = pd.Series(np.abs(sv.values).mean(axis=0), index=X.columns)

# Step 3: Keep features above 1% of max importance
threshold = mean_shap.max() * 0.01
selected = mean_shap[mean_shap >= threshold].index.tolist()
print(f"SHAP selection: {len(selected)} / {X.shape[1]} features")

# Step 4: Verify on CV
m2 = GradientBoostingRegressor(n_estimators=200, random_state=42)
s_all  = cross_val_score(m2, X_imp, y, cv=5, scoring='neg_root_mean_squared_error')
s_shap = cross_val_score(m2, X_imp[selected], y, cv=5, scoring='neg_root_mean_squared_error')
print(f"All features  RMSE: {-s_all.mean():.0f}")
print(f"SHAP selected RMSE: {-s_shap.mean():.0f}")` },
    { type: 'tip', body: `SHAP interaction values (<code>shap.TreeExplainer(model).shap_interaction_values(X)</code>) reveal which pairs of features interact most. This is a powerful guide for which interaction features to add (Week 4, Lesson 1).` },
    { type: 'exercise', title: 'SHAP-Based Feature Selection and Explanation', hint: 'Train a LightGBM regressor on Ames Housing, compute SHAP values, select features with mean |SHAP| above 1% of max, and plot the beeswarm. Compare RMSE before and after selection.', solution: `import shap, pandas as pd, numpy as np
import lightgbm as lgb
from sklearn.impute import SimpleImputer
from sklearn.model_selection import cross_val_score

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']
X_imp = pd.DataFrame(SimpleImputer(strategy='median').fit_transform(X), columns=X.columns)

m = lgb.LGBMRegressor(n_estimators=300, random_state=42, verbose=-1).fit(X_imp, y)
exp = shap.TreeExplainer(m)
sv  = exp(X_imp)

mean_shap = pd.Series(np.abs(sv.values).mean(axis=0), index=X.columns)
selected = mean_shap[mean_shap >= mean_shap.max()*0.01].index.tolist()
print(f"Selected: {len(selected)} features")

m2 = lgb.LGBMRegressor(n_estimators=300, random_state=42, verbose=-1)
for name, X_use in [('All', X_imp), ('SHAP sel', X_imp[selected])]:
    s = cross_val_score(m2, X_use, y, cv=5, scoring='neg_root_mean_squared_error')
    print(f"{name:10s}  RMSE: {-s.mean():.0f}  features: {X_use.shape[1]}")` }
  ]
};

L['fe-w5-l5'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>PCA and UMAP for Dimensionality Reduction</h2>
<p>PCA (Principal Component Analysis) and UMAP (Uniform Manifold Approximation and Projection) transform a high-dimensional feature space into a lower-dimensional one. Unlike feature selection (which keeps original features), dimensionality reduction creates new composite features.</p>
<h3>PCA</h3>
<p>PCA finds orthogonal directions (principal components) of maximum variance in the data and projects all features onto these directions. The first component explains the most variance, the second the next most, and so on. You keep only the top-k components, discarding the rest.</p>
<p><strong>When PCA helps:</strong></p>
<ul>
  <li>Many correlated features — PCA de-correlates them into independent components.</li>
  <li>Linear models suffering from multicollinearity.</li>
  <li>High-dimensional data where training is slow.</li>
  <li>Visualisation: project to 2D for scatter plots.</li>
</ul>
<p><strong>PCA limitations:</strong> Assumes linear structure. Components are combinations of all features and hard to interpret. Sensitive to scale — always standardise first.</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.linear_model import Ridge
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score
import matplotlib.pyplot as plt

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']

# 1. How many components explain 95% variance?
pipe_pca = Pipeline([
    ('imp', SimpleImputer(strategy='median')),
    ('sc',  StandardScaler()),
    ('pca', PCA(n_components=0.95, random_state=42))  # keep 95% variance
])
pipe_pca.fit(X)
n_comp = pipe_pca.named_steps['pca'].n_components_
print(f"Components for 95% variance: {n_comp} / {X.shape[1]}")

# 2. Scree plot — explained variance per component
pca_full = Pipeline([
    ('imp', SimpleImputer(strategy='median')),
    ('sc',  StandardScaler()),
    ('pca', PCA())
])
pca_full.fit(X)
ev = pca_full.named_steps['pca'].explained_variance_ratio_
cumev = ev.cumsum()

plt.figure(figsize=(8, 4))
plt.bar(range(1, min(21, len(ev)+1)), ev[:20], alpha=0.7, label='Individual')
plt.plot(range(1, min(21, len(ev)+1)), cumev[:20], 'r-o', label='Cumulative')
plt.axhline(0.95, color='grey', linestyle='--')
plt.xlabel('Principal Component')
plt.ylabel('Explained Variance Ratio')
plt.title('PCA Scree Plot')
plt.legend()
plt.tight_layout()
plt.savefig('pca_scree.png', dpi=150)

# 3. CV comparison: raw vs PCA
pipe_ridge = Pipeline([('imp', SimpleImputer(strategy='median')),
                        ('sc', StandardScaler()), ('m', Ridge())])
pipe_pca_ridge = Pipeline([('imp', SimpleImputer(strategy='median')),
                             ('sc', StandardScaler()),
                             ('pca', PCA(n_components=0.95)),
                             ('m', Ridge())])

for name, pipe in [('Ridge (raw)', pipe_ridge), ('PCA + Ridge', pipe_pca_ridge)]:
    s = cross_val_score(pipe, X, y, cv=5, scoring='neg_root_mean_squared_error')
    print(f"{name:15s}  RMSE: {-s.mean():.0f}")` },
    { type: 'text', body: `<h3>UMAP for Non-Linear Dimensionality Reduction</h3>
<p>UMAP extends the idea of dimensionality reduction to non-linear manifolds. Where PCA finds linear projections, UMAP preserves the local neighbourhood structure of the data in a lower-dimensional embedding. UMAP is primarily a <em>visualisation</em> tool, but its embeddings can also be used as features in downstream models — particularly when the data lies on a complex manifold.</p>` },
    { type: 'code', lang: 'python', src: `# pip install umap-learn
import umap
import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']

# Preprocess
X_imp = SimpleImputer(strategy='median').fit_transform(X)
X_sc  = StandardScaler().fit_transform(X_imp)

# UMAP 2D embedding for visualisation
reducer = umap.UMAP(n_components=2, n_neighbors=15, min_dist=0.1, random_state=42)
X_2d = reducer.fit_transform(X_sc)

plt.figure(figsize=(8, 6))
sc = plt.scatter(X_2d[:, 0], X_2d[:, 1], c=y, cmap='viridis', s=8, alpha=0.7)
plt.colorbar(sc, label='SalePrice')
plt.title('UMAP 2D projection coloured by SalePrice')
plt.tight_layout()
plt.savefig('umap_2d.png', dpi=150)

# Use UMAP components as features in a model
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import Ridge

# 10D UMAP as features
reducer_10d = umap.UMAP(n_components=10, n_neighbors=15, random_state=42)
X_umap = reducer_10d.fit_transform(X_sc)
s = cross_val_score(Ridge(), X_umap, y, cv=5, scoring='neg_root_mean_squared_error')
print(f"UMAP-10 + Ridge RMSE: {-s.mean():.0f}")` },
    { type: 'warn', title: 'UMAP Fitting Must Be Done on Training Data Only', body: `Always fit UMAP on the training set, then call <code>.transform(X_test)</code> to project test data. Never fit on the combined dataset — UMAP is not immune to the data leakage principle.` },
    { type: 'tip', body: `PCA and UMAP can be combined with the original features (concatenate embeddings + raw features) for models that benefit from both the compressed signal and the original interpretable features. This is especially effective for neural networks.` },
    { type: 'exercise', title: 'Compare PCA, UMAP, and Raw Features on a Ridge Regressor', hint: 'For Ames Housing numerics: (1) raw features, (2) top-15 PCA components, (3) 10D UMAP. Compare 5-fold CV RMSE with Ridge.', solution: `import pandas as pd, numpy as np
import umap
from sklearn.decomposition import PCA
from sklearn.linear_model import Ridge
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import Pipeline

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']
X_sc = Pipeline([('imp', SimpleImputer(strategy='median')),
                  ('sc',  StandardScaler())]).fit_transform(X)

X_pca  = PCA(n_components=15, random_state=42).fit_transform(X_sc)
X_umap = umap.UMAP(n_components=10, random_state=42).fit_transform(X_sc)

for name, X_use in [('Raw', X_sc), ('PCA-15', X_pca), ('UMAP-10', X_umap)]:
    s = cross_val_score(Ridge(), X_use, y, cv=5, scoring='neg_root_mean_squared_error')
    print(f"{name:10s}  features={X_use.shape[1]}  RMSE: {-s.mean():.0f}")` }
  ]
};

// ─── WEEK 6 — Model Selection & Capstone ────────────────────────────────────

L['fe-w6-l1'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>Model Selection Fundamentals and Baselines</h2>
<p>Model selection answers the question: which algorithm (and which feature set) should I deploy? A rigorous model selection process always starts with baselines — simple models that set a performance floor. If your fancy model cannot beat a baseline, something is wrong: bad features, leakage, or a misconfigured model.</p>
<h3>Why Start Simple</h3>
<ul>
  <li>A simple baseline reveals what "free" performance the data already contains (strong autocorrelation, obvious linear trend).</li>
  <li>Baselines are fast to compute and easy to debug.</li>
  <li>Every additional model complexity must justify itself against the baseline gain.</li>
  <li>Simple models are often more robust in production (fewer failure modes, easier to monitor).</li>
</ul>
<h3>Baseline Models for Regression</h3>
<ul>
  <li><strong>DummyRegressor (mean):</strong> Predicts the training mean for every sample. RMSE = target standard deviation.</li>
  <li><strong>DummyRegressor (median):</strong> More robust baseline for skewed targets.</li>
  <li><strong>Linear regression (no regularisation):</strong> No hyperparameters to tune — fast sanity check.</li>
  <li><strong>Ridge regression:</strong> First "real" model. If Ridge doesn't beat Dummy, your features carry no signal.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
from sklearn.dummy import DummyRegressor
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']

models = {
    'Dummy (mean)':     DummyRegressor(strategy='mean'),
    'Dummy (median)':   DummyRegressor(strategy='median'),
    'LinearRegression': LinearRegression(),
    'Ridge':            Ridge(alpha=10.0),
    'RandomForest':     RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1),
    'GradientBoosting': GradientBoostingRegressor(n_estimators=200, random_state=42),
}

for name, model in models.items():
    steps = [('imp', SimpleImputer(strategy='median'))]
    if 'Dummy' not in name and 'Forest' not in name and 'Boosting' not in name:
        steps.append(('sc', StandardScaler()))
    steps.append(('m', model))
    pipe = Pipeline(steps)
    s = cross_val_score(pipe, X, y, cv=5, scoring='neg_root_mean_squared_error')
    print(f"{name:22s}  RMSE: {-s.mean():>8,.0f} ± {s.std():,.0f}")` },
    { type: 'text', body: `<h3>The Bias-Variance Trade-off</h3>
<p>Model selection is fundamentally about managing the bias-variance trade-off:</p>
<ul>
  <li><strong>High bias (underfitting):</strong> Model is too simple — misses real patterns. Low train error, low CV error, but both are far from optimal. Solution: more complex model or better features.</li>
  <li><strong>High variance (overfitting):</strong> Model memorises training noise — performs well in-sample, poorly out-of-sample. Large gap between train and CV error. Solution: more data, regularisation, feature selection, simpler model.</li>
</ul>
<p>Cross-validation is the tool to detect both: if CV error is much higher than train error → overfitting. If both are high → underfitting.</p>` },
    { type: 'code', lang: 'python', src: `from sklearn.model_selection import learning_curve
import matplotlib.pyplot as plt
import numpy as np

def plot_learning_curve(estimator, X, y, cv=5, title='Learning Curve'):
    train_sizes, train_scores, cv_scores = learning_curve(
        estimator, X, y, cv=cv, scoring='neg_root_mean_squared_error',
        train_sizes=np.linspace(0.1, 1.0, 10), n_jobs=-1
    )
    train_mean = -train_scores.mean(axis=1)
    cv_mean    = -cv_scores.mean(axis=1)

    plt.figure(figsize=(8, 5))
    plt.plot(train_sizes, train_mean, 'b-o', label='Train RMSE')
    plt.plot(train_sizes, cv_mean,    'r-o', label='CV RMSE')
    plt.fill_between(train_sizes, train_mean - train_scores.std(axis=1),
                     train_mean + train_scores.std(axis=1), alpha=0.1, color='b')
    plt.fill_between(train_sizes, cv_mean - cv_scores.std(axis=1),
                     cv_mean + cv_scores.std(axis=1), alpha=0.1, color='r')
    plt.xlabel('Training samples')
    plt.ylabel('RMSE')
    plt.title(title)
    plt.legend()
    plt.tight_layout()
    plt.savefig(f'{title.replace(" ","_")}.png', dpi=150)

from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import GradientBoostingRegressor

pipe_gbm = Pipeline([('imp', SimpleImputer(strategy='median')),
                      ('m', GradientBoostingRegressor(n_estimators=200, random_state=42))])

plot_learning_curve(pipe_gbm, X, y, title='GBM Learning Curve')` },
    { type: 'tip', body: `If your train RMSE ≈ CV RMSE (both high), you're underfitting — add features or a more complex model. If train RMSE is low but CV RMSE is high, you're overfitting — add regularisation, reduce features, or get more data.` },
    { type: 'exercise', title: 'Establish and Document Your Baseline Scorecard', hint: 'Run all 6 baseline models on your Ames feature set (including domain features from Week 4). Print a ranked table of CV RMSE. Identify the best baseline before moving to hyperparameter tuning.', solution: `import pandas as pd
from sklearn.dummy import DummyRegressor
from sklearn.linear_model import Ridge
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score

df = pd.read_csv('ames_housing.csv')
df['total_sf']     = df['TotalBsmtSF'].fillna(0) + df['GrLivArea'].fillna(0)
df['house_age']    = 2010 - df['YearBuilt']
df['overall_score']= df['OverallQual'] * df['OverallCond']
X = df.select_dtypes('number').drop('SalePrice', axis=1)
y = df['SalePrice']

results = []
for name, model in [('Dummy',   DummyRegressor()),
                     ('Ridge',   Ridge()),
                     ('RF-100',  RandomForestRegressor(100, random_state=42, n_jobs=-1)),
                     ('GBM-200', GradientBoostingRegressor(200, random_state=42))]:
    pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('m', model)])
    s = cross_val_score(pipe, X, y, cv=5, scoring='neg_root_mean_squared_error')
    results.append({'Model': name, 'RMSE': -s.mean(), 'Std': s.std()})

print(pd.DataFrame(results).sort_values('RMSE').to_string(index=False))` }
  ]
};

L['fe-w6-l2'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>Grid Search and Randomised Search</h2>
<p>Most ML models have hyperparameters — settings not learned from data but set before training. The regularisation strength α in Ridge, the number of trees in a Random Forest, the learning rate in gradient boosting. Finding optimal hyperparameters is called hyperparameter optimisation (HPO).</p>
<h3>GridSearchCV</h3>
<p>Grid search exhaustively evaluates every combination of hyperparameters in a predefined grid, using cross-validation to estimate each combination's performance. It is guaranteed to find the best combination in the grid, but the cost grows exponentially with the number of parameters: a 3×3×3×3 grid = 81 fits × k folds.</p>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV
from sklearn.preprocessing import StandardScaler
import numpy as np

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']

pipe = Pipeline([
    ('imp', SimpleImputer(strategy='median')),
    ('m', GradientBoostingRegressor(random_state=42))
])

# Grid search — parameter names use the step name + __ prefix
param_grid = {
    'm__n_estimators':    [100, 200],
    'm__max_depth':       [3, 5],
    'm__learning_rate':   [0.05, 0.1],
    'm__min_samples_leaf':[3, 5],
}

gs = GridSearchCV(pipe, param_grid, cv=5, scoring='neg_root_mean_squared_error',
                  n_jobs=-1, verbose=1, refit=True)
gs.fit(X, y)

print(f"Best RMSE: {-gs.best_score_:.0f}")
print(f"Best params: {gs.best_params_}")

# All results as DataFrame
import pandas as pd
results = pd.DataFrame(gs.cv_results_)
results['mean_test_rmse'] = -results['mean_test_score']
print(results[['params','mean_test_rmse','std_test_score']].sort_values('mean_test_rmse').head(5))` },
    { type: 'text', body: `<h3>RandomizedSearchCV</h3>
<p>Instead of exhaustive enumeration, RandomizedSearchCV samples n_iter combinations at random from the parameter distributions. This is usually much more efficient — adding more parameters doesn't exponentially increase cost, and you can use continuous distributions (scipy.stats) instead of discrete lists. In practice, random search finds nearly as good solutions as grid search in far fewer evaluations.</p>` },
    { type: 'code', lang: 'python', src: `from scipy.stats import randint, uniform, loguniform
from sklearn.model_selection import RandomizedSearchCV

param_dist = {
    'm__n_estimators':     randint(50, 500),         # integers 50–500
    'm__max_depth':        randint(2, 8),
    'm__learning_rate':    loguniform(0.01, 0.3),    # log-uniform [0.01, 0.30]
    'm__subsample':        uniform(0.6, 0.4),        # uniform [0.6, 1.0]
    'm__min_samples_leaf': randint(1, 20),
    'm__max_features':     uniform(0.3, 0.7),        # fraction of features per split
}

rs = RandomizedSearchCV(
    pipe, param_dist, n_iter=50, cv=5,
    scoring='neg_root_mean_squared_error',
    n_jobs=-1, random_state=42, verbose=1, refit=True
)
rs.fit(X, y)

print(f"Best RMSE: {-rs.best_score_:.0f}")
print(f"Best params: {rs.best_params_}")` },
    { type: 'warn', title: 'Nested Cross-Validation for Unbiased Estimates', body: `If you use the same data to tune hyperparameters and evaluate the model, your test score is optimistically biased — the best parameters were chosen to perform well on that test fold. For an unbiased estimate, use nested CV: outer loop evaluates the full (GridSearch + fit) pipeline, inner loop tunes hyperparameters within each outer training fold.` },
    { type: 'code', lang: 'python', src: `from sklearn.model_selection import cross_val_score, RandomizedSearchCV
from scipy.stats import randint, loguniform

# Nested CV: outer loop (5 folds) × inner loop (3 folds × 20 iterations)
inner_cv = 3
outer_cv = 5

rs_inner = RandomizedSearchCV(pipe, param_dist, n_iter=20, cv=inner_cv,
                               scoring='neg_root_mean_squared_error',
                               n_jobs=-1, random_state=42)

# cross_val_score with a GridSearch/RandomSearch object = nested CV
nested_scores = cross_val_score(rs_inner, X, y, cv=outer_cv,
                                scoring='neg_root_mean_squared_error', n_jobs=-1)
print(f"Nested CV RMSE: {-nested_scores.mean():.0f} ± {nested_scores.std():.0f}")
# This is an unbiased estimate of the performance of the HPO process` },
    { type: 'tip', body: `Halving strategies (<code>HalvingGridSearchCV</code>, <code>HalvingRandomSearchCV</code> from sklearn.model_selection) are much faster than standard GridSearch/RandomSearch: they start with many candidates and progressively eliminate poor ones using more data. Enable with <code>from sklearn.model_selection import HalvingRandomSearchCV</code>.` },
    { type: 'exercise', title: 'Tune a LightGBM Model with RandomizedSearchCV', hint: 'Define a distribution over n_estimators, max_depth, learning_rate, num_leaves, reg_alpha, reg_lambda. Run 40 iterations with 5-fold CV. Report best RMSE and compare to untuned LightGBM.', solution: `import pandas as pd
import lightgbm as lgb
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import RandomizedSearchCV, cross_val_score
from scipy.stats import randint, loguniform, uniform

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']

pipe = Pipeline([('imp', SimpleImputer(strategy='median')),
                  ('m', lgb.LGBMRegressor(random_state=42, verbose=-1))])

# Untuned baseline
s0 = cross_val_score(pipe, X, y, cv=5, scoring='neg_root_mean_squared_error')
print(f"Untuned RMSE: {-s0.mean():.0f}")

param_dist = {
    'm__n_estimators':  randint(100, 600),
    'm__max_depth':     randint(3, 10),
    'm__learning_rate': loguniform(0.01, 0.2),
    'm__num_leaves':    randint(15, 100),
    'm__reg_alpha':     loguniform(0.001, 10),
    'm__reg_lambda':    loguniform(0.001, 10),
    'm__subsample':     uniform(0.6, 0.4),
}

rs = RandomizedSearchCV(pipe, param_dist, n_iter=40, cv=5,
                         scoring='neg_root_mean_squared_error',
                         n_jobs=-1, random_state=42)
rs.fit(X, y)
print(f"Tuned RMSE: {-rs.best_score_:.0f}")
print(f"Best params: {rs.best_params_}")` }
  ]
};

L['fe-w6-l3'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `<h2>Optuna: Bayesian Hyperparameter Optimisation</h2>
<p>Grid and random search treat each trial independently. Bayesian optimisation learns from past trials — it builds a probabilistic model of the objective function and suggests parameter combinations likely to improve on the current best. It is substantially more efficient than random search, especially for expensive models with many hyperparameters.</p>
<p>Optuna is the leading Python framework for Bayesian HPO. It uses Tree-structured Parzen Estimator (TPE) by default, supports pruning (early stopping of unpromising trials), distributed search, and integrates with sklearn, LightGBM, XGBoost, and PyTorch.</p>` },
    { type: 'code', lang: 'python', src: `# pip install optuna optuna-integration
import optuna
import optuna.integration
import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer
from sklearn.model_selection import cross_val_score
import lightgbm as lgb

optuna.logging.set_verbosity(optuna.logging.WARNING)

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']
X_imp = SimpleImputer(strategy='median').fit_transform(X)

def objective(trial):
    params = {
        'n_estimators':     trial.suggest_int('n_estimators', 100, 800),
        'max_depth':        trial.suggest_int('max_depth', 3, 10),
        'learning_rate':    trial.suggest_float('learning_rate', 0.01, 0.3, log=True),
        'num_leaves':       trial.suggest_int('num_leaves', 15, 150),
        'reg_alpha':        trial.suggest_float('reg_alpha', 1e-3, 10.0, log=True),
        'reg_lambda':       trial.suggest_float('reg_lambda', 1e-3, 10.0, log=True),
        'subsample':        trial.suggest_float('subsample', 0.5, 1.0),
        'colsample_bytree': trial.suggest_float('colsample_bytree', 0.4, 1.0),
        'min_child_samples':trial.suggest_int('min_child_samples', 5, 50),
        'random_state': 42, 'verbose': -1
    }
    model = lgb.LGBMRegressor(**params)
    scores = cross_val_score(model, X_imp, y, cv=5,
                              scoring='neg_root_mean_squared_error', n_jobs=-1)
    return -scores.mean()   # Optuna minimises, so negate RMSE already negative

# Run 80 trials — Optuna learns from each to guide the next
study = optuna.create_study(direction='minimize', sampler=optuna.samplers.TPESampler(seed=42))
study.optimize(objective, n_trials=80, show_progress_bar=True)

print(f"Best RMSE: {study.best_value:.0f}")
print(f"Best params: {study.best_params}")` },
    { type: 'code', lang: 'python', src: `import optuna
import matplotlib.pyplot as plt

# Visualise the optimisation history
fig = optuna.visualization.matplotlib.plot_optimization_history(study)
plt.tight_layout()
plt.savefig('optuna_history.png', dpi=150)
plt.close()

# Which parameters mattered most?
fig2 = optuna.visualization.matplotlib.plot_param_importances(study)
plt.tight_layout()
plt.savefig('optuna_param_importance.png', dpi=150)
plt.close()

# Slice plot: how does RMSE change with one parameter?
fig3 = optuna.visualization.matplotlib.plot_slice(study, params=['learning_rate','num_leaves'])
plt.tight_layout()
plt.savefig('optuna_slice.png', dpi=150)` },
    { type: 'text', body: `<h3>Pruning Unpromising Trials</h3>
<p>LightGBM and XGBoost support reporting intermediate results (e.g. CV score after 50 trees). Optuna's pruners can terminate trials early if they are clearly worse than the current best — reducing wasted compute by up to 10×.</p>` },
    { type: 'code', lang: 'python', src: `import optuna
from optuna.integration import LightGBMPruningCallback
import lightgbm as lgb
from sklearn.model_selection import StratifiedKFold, train_test_split
import numpy as np

X_tr, X_val, y_tr, y_val = train_test_split(X_imp, y, test_size=0.2, random_state=42)
dtrain = lgb.Dataset(X_tr, label=y_tr)
dval   = lgb.Dataset(X_val, label=y_val, reference=dtrain)

def objective_pruning(trial):
    params = {
        'objective': 'regression',
        'metric':    'rmse',
        'verbosity': -1,
        'learning_rate':    trial.suggest_float('learning_rate', 0.01, 0.3, log=True),
        'num_leaves':       trial.suggest_int('num_leaves', 20, 150),
        'reg_alpha':        trial.suggest_float('reg_alpha', 1e-3, 10.0, log=True),
        'reg_lambda':       trial.suggest_float('reg_lambda', 1e-3, 10.0, log=True),
    }
    pruning_callback = LightGBMPruningCallback(trial, 'valid rmse')
    model = lgb.train(params, dtrain, num_boost_round=500,
                      valid_sets=[dval],
                      callbacks=[pruning_callback, lgb.early_stopping(50, verbose=False)])
    return model.best_score['valid']['rmse']

study2 = optuna.create_study(direction='minimize',
                              pruner=optuna.pruners.MedianPruner(n_startup_trials=10))
study2.optimize(objective_pruning, n_trials=60, show_progress_bar=True)
print(f"Pruned study best RMSE: {study2.best_value:.0f}")` },
    { type: 'tip', body: `Use <code>study.enqueue_trial()</code> to inject known-good parameter sets as the first trials. This gives Optuna a warm start instead of beginning from scratch — useful when you have results from a previous random search.` },
    { type: 'exercise', title: 'Optuna HPO with Parameter Importance Analysis', hint: 'Run an Optuna study for 50 trials on a GradientBoostingRegressor (sklearn). Plot param_importances to identify which hyperparameters matter most. Narrow the search space for a follow-up 30-trial study.', solution: `import optuna, pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.impute import SimpleImputer
from sklearn.model_selection import cross_val_score
import matplotlib.pyplot as plt

optuna.logging.set_verbosity(optuna.logging.WARNING)
df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']
X_imp = SimpleImputer(strategy='median').fit_transform(X)

def obj(trial):
    p = {
        'n_estimators':    trial.suggest_int('n_estimators', 50, 500),
        'max_depth':       trial.suggest_int('max_depth', 2, 8),
        'learning_rate':   trial.suggest_float('lr', 0.01, 0.3, log=True),
        'subsample':       trial.suggest_float('subsample', 0.5, 1.0),
        'min_samples_leaf':trial.suggest_int('min_samples_leaf', 1, 30),
        'random_state': 42
    }
    m = GradientBoostingRegressor(**p)
    s = cross_val_score(m, X_imp, y, cv=3, scoring='neg_root_mean_squared_error')
    return -s.mean()

study = optuna.create_study(direction='minimize')
study.optimize(obj, n_trials=50, show_progress_bar=True)
print(f"Best RMSE: {study.best_value:.0f}")
optuna.visualization.matplotlib.plot_param_importances(study)
plt.tight_layout(); plt.savefig('param_imp.png', dpi=150)` }
  ]
};

L['fe-w6-l4'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>AutoML: Automated Machine Learning</h2>
<p>AutoML systems automate the entire ML pipeline — preprocessing, feature engineering, algorithm selection, and hyperparameter tuning — using search strategies like Bayesian optimisation, evolutionary algorithms, or meta-learning. They are not magic: they still require clean data, thoughtful feature engineering for domain-specific insights, and careful evaluation. But they dramatically reduce iteration time and can find good pipelines you wouldn't have tried manually.</p>
<h3>Key Python AutoML Libraries</h3>
<ul>
  <li><strong>FLAML:</strong> Fast, lightweight, uses Bayesian optimisation. Best for time-constrained scenarios.</li>
  <li><strong>AutoSklearn:</strong> Ensemble of sklearn pipelines selected by Bayesian search. Academic origin, powerful but heavy.</li>
  <li><strong>PyCaret:</strong> Comparison-oriented — quickly compares many models and selects the best. Great for exploration.</li>
  <li><strong>TPOT:</strong> Genetic programming to evolve sklearn pipelines. Slow but finds unusual pipeline structures.</li>
  <li><strong>H2O AutoML:</strong> Enterprise-grade, distributed, produces leaderboards.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `# pip install flaml
from flaml import AutoML
import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']
X = SimpleImputer(strategy='median').fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

automl = AutoML()
automl.fit(
    X_train, y_train,
    task='regression',
    metric='rmse',
    time_budget=120,    # 2-minute search budget
    seed=42,
    verbose=0
)

print(f"Best RMSE (CV): {automl.best_loss:.0f}")
print(f"Best model: {type(automl.best_estimator).__name__}")
print(f"Best config: {automl.best_config}")

from sklearn.metrics import mean_squared_error
y_pred = automl.predict(X_test)
test_rmse = mean_squared_error(y_test, y_pred, squared=False)
print(f"Test RMSE: {test_rmse:.0f}")` },
    { type: 'code', lang: 'python', src: `# PyCaret — comparison workflow
# pip install pycaret
from pycaret.regression import setup, compare_models, pull, save_model
import pandas as pd

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)

# PyCaret setup handles preprocessing automatically
exp = setup(data=df, target='SalePrice', session_id=42,
            imputation_type='simple', normalize=True,
            remove_multicollinearity=True, multicollinearity_threshold=0.9,
            fold=5, verbose=False)

# Compare all available regression algorithms
best_models = compare_models(n_select=3, sort='RMSE', verbose=False)
results = pull()  # retrieve the comparison table
print(results[['Model','RMSE','R2']].head(8))

# Save the best model
save_model(best_models[0], 'pycaret_best_model')` },
    { type: 'warn', title: 'AutoML Does Not Replace Domain Knowledge', body: `AutoML optimises what you measure. If your CV metric doesn't perfectly match business objectives, AutoML will optimise the wrong thing. Domain-specific features (Week 4), leakage audits (Week 4), and business-aligned metrics are your responsibility — AutoML handles the algorithm and hyperparameter search.` },
    { type: 'tip', body: `Use AutoML early in a project to quickly establish a strong baseline across many algorithms. Then manually refine the best model found using Optuna (Lesson 3 of this week) with domain knowledge about the search space.` },
    { type: 'exercise', title: 'FLAML AutoML vs Manual Best Model', hint: 'Run FLAML for 3 minutes on Ames Housing. Compare its best RMSE against the best manually-tuned LightGBM from Lesson 3. Note the trade-off between automation and expertise.', solution: `from flaml import AutoML
import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import lightgbm as lgb

df = pd.read_csv('ames_housing.csv').select_dtypes('number').dropna(axis=1, thresh=800)
X, y = df.drop('SalePrice', axis=1), df['SalePrice']
X_imp = SimpleImputer(strategy='median').fit_transform(X)
X_tr, X_te, y_tr, y_te = train_test_split(X_imp, y, test_size=0.2, random_state=42)

# AutoML
automl = AutoML()
automl.fit(X_tr, y_tr, task='regression', metric='rmse', time_budget=180, seed=42, verbose=0)
automl_rmse = mean_squared_error(y_te, automl.predict(X_te), squared=False)
print(f"FLAML AutoML RMSE: {automl_rmse:.0f}  model: {type(automl.best_estimator).__name__}")

# Manual LightGBM (best params from Lesson 3)
best_lgb = lgb.LGBMRegressor(n_estimators=400, learning_rate=0.05, num_leaves=63,
                               reg_alpha=0.1, reg_lambda=1.0, subsample=0.8,
                               random_state=42, verbose=-1)
best_lgb.fit(X_tr, y_tr)
manual_rmse = mean_squared_error(y_te, best_lgb.predict(X_te), squared=False)
print(f"Manual LightGBM RMSE: {manual_rmse:.0f}")` }
  ]
};

L['fe-w6-l5'] = {
  duration_mins: 60,
  sections: [
    { type: 'text', body: `<h2>Capstone: End-to-End Feature Engineering Pipeline</h2>
<p>In this capstone you will build a complete, production-ready feature engineering and model selection pipeline from raw data to final predictions. You will apply every technique from this course: missing data handling, encoding, transformations, domain features, feature selection, and Bayesian HPO — assembled into a single leakage-free pipeline.</p>
<p>We will use the Ames Housing dataset as our case study, but the patterns here are universal.</p>
<h3>Step 1: Data Audit and Initial Cleaning</h3>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
import warnings
warnings.filterwarnings('ignore')

# Load and audit
df = pd.read_csv('ames_housing.csv')
print(f"Shape: {df.shape}")

# Missing values
missing = df.isnull().mean().sort_values(ascending=False)
high_miss = missing[missing > 0.80].index.tolist()
print(f"Dropping {len(high_miss)} columns >80% missing: {high_miss}")
df = df.drop(columns=high_miss)

# Duplicates
df = df.drop_duplicates()
print(f"After cleaning: {df.shape}")` },
    { type: 'text', body: `<h3>Step 2: Domain Feature Engineering</h3>` },
    { type: 'code', lang: 'python', src: `def engineer_features(df):
    d = df.copy()

    # Space features
    d['total_sf']          = d['TotalBsmtSF'].fillna(0) + d['GrLivArea'].fillna(0)
    d['total_bathrooms']   = (d['FullBath'].fillna(0) + 0.5*d['HalfBath'].fillna(0) +
                              d['BsmtFullBath'].fillna(0) + 0.5*d['BsmtHalfBath'].fillna(0))
    d['porch_sf']          = (d['OpenPorchSF'].fillna(0) + d['EnclosedPorch'].fillna(0) +
                              d['ScreenPorch'].fillna(0))

    # Age and renovation
    d['house_age']         = 2010 - d['YearBuilt']
    d['years_since_remodel']= 2010 - d['YearRemodAdd']
    d['is_renovated']      = (d['YearRemodAdd'] > d['YearBuilt']).astype(int)

    # Quality composites
    d['overall_score']     = d['OverallQual'] * d['OverallCond']
    d['qual_x_area']       = d['OverallQual'] * d['GrLivArea'].fillna(0)

    # Garage
    d['has_garage']        = (d['GarageArea'].fillna(0) > 0).astype(int)
    d['has_basement']      = (d['TotalBsmtSF'].fillna(0) > 0).astype(int)
    d['has_pool']          = (d['PoolArea'].fillna(0) > 0).astype(int)

    return d

df_eng = engineer_features(df)
print(f"Features after engineering: {df_eng.shape[1]}")` },
    { type: 'text', body: `<h3>Step 3: Preprocessing Pipeline with feature-engine + sklearn</h3>` },
    { type: 'code', lang: 'python', src: `from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from feature_engine.encoding import RareLabelEncoder
from feature_engine.outliers import Winsorizer
from sklearn.model_selection import train_test_split

y = df_eng['SalePrice']
X = df_eng.drop('SalePrice', axis=1)

num_cols = X.select_dtypes('number').columns.tolist()
cat_cols = X.select_dtypes('object').columns.tolist()

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

num_pipe = Pipeline([
    ('imp',    SimpleImputer(strategy='median')),
    ('winsor', Winsorizer(capping_method='iqr', tail='both', variables=num_cols)),
    ('sc',     StandardScaler()),
])

cat_pipe = Pipeline([
    ('imp',  SimpleImputer(strategy='constant', fill_value='Missing')),
    ('rare', RareLabelEncoder(tol=0.03, n_categories=5, variables=cat_cols)),
    ('ohe',  OneHotEncoder(handle_unknown='ignore', sparse_output=False, min_frequency=5)),
])

preprocessor = ColumnTransformer([
    ('num', num_pipe, num_cols),
    ('cat', cat_pipe, cat_cols),
], remainder='drop')

preprocessor.fit(X_train)
X_tr_pp = preprocessor.transform(X_train)
X_te_pp = preprocessor.transform(X_test)
print(f"Preprocessed shape: {X_tr_pp.shape}")` },
    { type: 'text', body: `<h3>Step 4: Feature Selection with SHAP</h3>` },
    { type: 'code', lang: 'python', src: `import shap
import lightgbm as lgb
import numpy as np

# Quick LightGBM for SHAP importance
quick_lgb = lgb.LGBMRegressor(n_estimators=200, random_state=42, verbose=-1)
quick_lgb.fit(X_tr_pp, y_train)

exp = shap.TreeExplainer(quick_lgb)
sv  = exp(X_tr_pp)
mean_shap = np.abs(sv.values).mean(axis=0)
threshold = mean_shap.max() * 0.005   # keep features above 0.5% of max
shap_mask = mean_shap >= threshold

X_tr_sel = X_tr_pp[:, shap_mask]
X_te_sel = X_te_pp[:, shap_mask]
print(f"SHAP selection: {shap_mask.sum()} / {len(shap_mask)} features retained")` },
    { type: 'text', body: `<h3>Step 5: Optuna Hyperparameter Tuning</h3>` },
    { type: 'code', lang: 'python', src: `import optuna
from sklearn.model_selection import cross_val_score

optuna.logging.set_verbosity(optuna.logging.WARNING)

def objective(trial):
    params = {
        'n_estimators':     trial.suggest_int('n_estimators', 200, 800),
        'learning_rate':    trial.suggest_float('learning_rate', 0.01, 0.2, log=True),
        'num_leaves':       trial.suggest_int('num_leaves', 20, 150),
        'reg_alpha':        trial.suggest_float('reg_alpha', 1e-3, 10.0, log=True),
        'reg_lambda':       trial.suggest_float('reg_lambda', 1e-3, 10.0, log=True),
        'subsample':        trial.suggest_float('subsample', 0.6, 1.0),
        'colsample_bytree': trial.suggest_float('colsample_bytree', 0.5, 1.0),
        'min_child_samples':trial.suggest_int('min_child_samples', 5, 40),
        'random_state': 42, 'verbose': -1
    }
    m = lgb.LGBMRegressor(**params)
    s = cross_val_score(m, X_tr_sel, y_train, cv=5,
                         scoring='neg_root_mean_squared_error', n_jobs=-1)
    return -s.mean()

study = optuna.create_study(direction='minimize',
                             sampler=optuna.samplers.TPESampler(seed=42))
study.optimize(objective, n_trials=60, show_progress_bar=True)
print(f"Best CV RMSE: {study.best_value:.0f}")
print(f"Best params: {study.best_params}")` },
    { type: 'text', body: `<h3>Step 6: Final Model Evaluation and Reporting</h3>` },
    { type: 'code', lang: 'python', src: `import shap
import matplotlib.pyplot as plt
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

# Retrain best model on full training set
best_params = {**study.best_params, 'random_state': 42, 'verbose': -1}
final_model = lgb.LGBMRegressor(**best_params)
final_model.fit(X_tr_sel, y_train)

# Evaluate on held-out test set
y_pred = final_model.predict(X_te_sel)
test_rmse = mean_squared_error(y_test, y_pred, squared=False)
test_mae  = mean_absolute_error(y_test, y_pred)
test_r2   = r2_score(y_test, y_pred)

print("=" * 50)
print(f"TEST SET RESULTS")
print(f"  RMSE: {test_rmse:,.0f}")
print(f"  MAE:  {test_mae:,.0f}")
print(f"  R²:   {test_r2:.4f}")
print("=" * 50)

# Residual plot
residuals = y_test - y_pred
plt.figure(figsize=(8, 5))
plt.scatter(y_pred, residuals, alpha=0.4, s=10)
plt.axhline(0, color='r', linewidth=1)
plt.xlabel('Predicted SalePrice')
plt.ylabel('Residual')
plt.title('Residuals vs Predicted')
plt.tight_layout()
plt.savefig('residuals.png', dpi=150)

# SHAP on test set for final interpretability
exp_final = shap.TreeExplainer(final_model)
sv_test   = exp_final(X_te_sel)

# Get feature names from preprocessor (after SHAP masking)
try:
    all_feat_names = preprocessor.get_feature_names_out()
    sel_feat_names = [all_feat_names[i] for i, m in enumerate(shap_mask) if m]
except:
    sel_feat_names = [f'feat_{i}' for i in range(X_te_sel.shape[1])]

sv_test.feature_names = sel_feat_names
shap.plots.beeswarm(sv_test, max_display=15, show=False)
plt.tight_layout()
plt.savefig('shap_final.png', dpi=150)
print("Pipeline complete. All plots saved.")` },
    { type: 'tip', body: `Save the entire pipeline (preprocessor + SHAP mask + final model) with joblib for production deployment. Load once at startup and call predict() on new data — it will apply all the same transformations learned at training time.` },
    { type: 'exercise', title: 'Capstone: Run the Full Pipeline on a New Dataset', hint: 'Replace the Ames Housing dataset with a dataset of your choice (California Housing, Boston, or a Kaggle competition dataset). Apply all six steps: audit, engineer, preprocess, SHAP select, Optuna tune, evaluate. Document the performance at each stage.', solution: `# Full pipeline template — adapt to any tabular regression dataset
import pandas as pd, numpy as np, warnings, optuna, shap
warnings.filterwarnings('ignore')
optuna.logging.set_verbosity(optuna.logging.WARNING)

from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import lightgbm as lgb
from sklearn.metrics import mean_squared_error

# Load
data = fetch_california_housing(as_frame=True)
X, y = data.data, data.target

# Train/test split
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

# Preprocess
num_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('sc', StandardScaler())])
ct = ColumnTransformer([('num', num_pipe, X.columns.tolist())])
X_tr_pp = ct.fit_transform(X_tr)
X_te_pp = ct.transform(X_te)

# SHAP selection
m0 = lgb.LGBMRegressor(n_estimators=200, random_state=42, verbose=-1).fit(X_tr_pp, y_tr)
sv = shap.TreeExplainer(m0)(X_tr_pp)
mask = np.abs(sv.values).mean(axis=0) >= np.abs(sv.values).mean(axis=0).max() * 0.01
X_tr_s, X_te_s = X_tr_pp[:, mask], X_te_pp[:, mask]
print(f"SHAP kept {mask.sum()} features")

# Optuna
def obj(trial):
    p = {'n_estimators': trial.suggest_int('n', 100, 500),
         'learning_rate': trial.suggest_float('lr', 0.01, 0.2, log=True),
         'num_leaves': trial.suggest_int('nl', 15, 100), 'verbose': -1}
    s = cross_val_score(lgb.LGBMRegressor(**p), X_tr_s, y_tr, cv=5,
                         scoring='neg_root_mean_squared_error')
    return -s.mean()

study = optuna.create_study(direction='minimize')
study.optimize(obj, n_trials=40)
best = {**study.best_params, 'verbose': -1}
best['n_estimators'] = best.pop('n')
best['learning_rate'] = best.pop('lr')
best['num_leaves'] = best.pop('nl')

final = lgb.LGBMRegressor(**best).fit(X_tr_s, y_tr)
rmse  = mean_squared_error(y_te, final.predict(X_te_s), squared=False)
print(f"Test RMSE: {rmse:.4f}  (target scale: {y.min():.1f}–{y.max():.1f})")` }
  ]
};

})();

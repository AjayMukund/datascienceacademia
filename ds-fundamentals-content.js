'use strict';
window.DSA_LESSON_CONTENT = window.DSA_LESSON_CONTENT || {};
const L = window.DSA_LESSON_CONTENT;

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 1 — WHAT IS DATA SCIENCE?
══════════════════════════════════════════════════════════════════════════ */

L['dsf-w1-l1'] = {
  duration_mins: 14,
  sections: [
    { type: 'text', body: `
<h2>The Data Science Landscape</h2>
<p>Data science is the discipline of extracting knowledge and actionable insight from data. It sits at the intersection of three domains: <strong>statistics</strong> (understanding uncertainty and patterns), <strong>computer science</strong> (processing and automating at scale), and <strong>domain expertise</strong> (knowing which questions are worth asking).</p>
<p>The term became mainstream around 2012, when Harvard Business Review called the data scientist "the sexiest job of the 21st century." A decade later, the landscape has matured considerably. Today, data science is not one job — it is a family of related roles, each with a distinct focus.</p>
<h3>Key roles in the data ecosystem</h3>
<ul>
  <li><strong>Data Analyst</strong> — Answers business questions using historical data. Primary tools: SQL, Excel, Tableau. Output: dashboards and reports.</li>
  <li><strong>Data Scientist</strong> — Builds predictive models and runs experiments. Primary tools: Python, machine learning libraries. Output: models, insights, and recommendations.</li>
  <li><strong>Data Engineer</strong> — Builds the pipelines that move and store data reliably. Primary tools: Spark, Airflow, cloud platforms. Output: clean, accessible data infrastructure.</li>
  <li><strong>ML Engineer</strong> — Deploys models into production systems. Bridges data science and software engineering.</li>
  <li><strong>Business Intelligence (BI) Developer</strong> — Maintains reporting infrastructure and data warehouses.</li>
</ul>
<p>You don't need to master all of these roles. But understanding where they connect helps you collaborate effectively and chart your own growth path.</p>
<h3>Why data science matters now</h3>
<p>Three forces converged in the 2010s to make modern data science possible: <strong>cheap storage</strong> (cloud computing made petabytes affordable), <strong>fast compute</strong> (GPUs originally built for gaming enabled neural networks to scale), and <strong>open-source tooling</strong> (Python's ecosystem — NumPy, pandas, scikit-learn, PyTorch — democratised techniques that once required expensive proprietary software).</p>
<p>Today, every industry generates data at unprecedented scale. Healthcare systems use it to predict patient readmissions. Retailers use it to optimise inventory. Banks use it to detect fraud in milliseconds. Understanding data science is no longer optional for anyone who makes decisions with data — which, increasingly, is everyone.</p>
` },
    { type: 'tip', body: `Don't get paralysed by the role taxonomy. Most practitioners start as analysts, grow into data scientists, and specialise later. Focus on building strong fundamentals and the specialisation will follow naturally.` },
    { type: 'exercise', title: 'Map a Business Problem to a Role', body: `<p>For each scenario below, identify which data role is best suited to solve it:</p>
<ol>
  <li>A supermarket wants to know which products are frequently bought together.</li>
  <li>A hospital needs a live dashboard showing ICU bed occupancy.</li>
  <li>An e-commerce company's data pipeline keeps failing overnight — missing sales records every morning.</li>
  <li>A streaming service wants to predict which subscribers will cancel next month.</li>
</ol>`,
    hint: `<p>Think about the <em>output</em> of each task: is it a report, a model, infrastructure, or a prediction?</p>`,
    solution: `1. Data Scientist (market basket / association rules)\n2. BI Developer or Data Analyst (dashboard)\n3. Data Engineer (pipeline reliability)\n4. Data Scientist (churn prediction model)` }
  ]
};

L['dsf-w1-l2'] = {
  duration_mins: 14,
  sections: [
    { type: 'text', body: `
<h2>The Data Science Workflow</h2>
<p>Every successful data science project follows a recognisable sequence of steps. The most widely used framework is <strong>CRISP-DM</strong> (Cross-Industry Standard Process for Data Mining), originally published in 1999 and still the best mental model for structuring a project from vague question to deployed solution.</p>
<h3>The six phases of CRISP-DM</h3>
<ol>
  <li><strong>Business Understanding</strong> — What problem are we actually solving? This is the most underrated step. Bad problem framing is the leading cause of data science projects that produce technically correct results that nobody uses.</li>
  <li><strong>Data Understanding</strong> — What data do we have? What is its shape, quality, and coverage? What is missing?</li>
  <li><strong>Data Preparation</strong> — Clean, transform, and engineer features until the data is ready for modelling. In practice, this consumes 60–80% of total project time.</li>
  <li><strong>Modelling</strong> — Select and train algorithms. This is the glamorous step that gets far too much attention relative to its actual time share.</li>
  <li><strong>Evaluation</strong> — Does the model meet the business objective? A model with 95% accuracy may still be useless if the relevant metric is precision on the minority class.</li>
  <li><strong>Deployment</strong> — Get predictions into the hands of decision-makers. A model that lives in a Jupyter notebook has zero business value.</li>
</ol>
<p>CRISP-DM is <em>iterative</em> — you rarely go through the phases exactly once. A modelling result often sends you back to data preparation. Business feedback from deployment often reframes the original problem.</p>
<h3>The practical mindset</h3>
<p>The best data scientists think like detectives, not engineers. An engineer has a blueprint and executes it. A detective has a question and works backwards from evidence. You will regularly find that the data doesn't support the original hypothesis, that the real insight is in an unexpected variable, or that the business question needs to be sharpened before any model will help.</p>
` },
    { type: 'code', lang: 'python', src: `# A minimal project skeleton that mirrors the CRISP-DM workflow
# This is a structural pattern — not a runnable script yet,
# but you will fill in each section throughout this course.

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

# ── 1. Business Understanding ──────────────────────────────────────────
# Question: Can we predict whether a loan applicant will default?
# Success metric: Recall on the 'default' class ≥ 0.80
# (We care more about catching defaults than avoiding false alarms)

# ── 2. Data Understanding ──────────────────────────────────────────────
df = pd.read_csv('loan_data.csv')
print(df.shape)          # rows × columns
print(df.dtypes)         # data types of each column
print(df.isnull().sum()) # missing value counts

# ── 3. Data Preparation ────────────────────────────────────────────────
df = df.dropna(subset=['income'])        # drop rows where income is missing
df['debt_ratio'] = df['debt'] / df['income']   # engineer a useful feature
df['log_income'] = np.log1p(df['income'])       # reduce skew

# ── 4. Modelling ───────────────────────────────────────────────────────
from sklearn.ensemble import RandomForestClassifier
X = df[['debt_ratio', 'log_income', 'credit_score']]
y = df['default']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# ── 5. Evaluation ─────────────────────────────────────────────────────
from sklearn.metrics import classification_report
print(classification_report(y_test, model.predict(X_test)))

# ── 6. Deployment ─────────────────────────────────────────────────────
import joblib
joblib.dump(model, 'loan_default_model.pkl')  # save for serving` },
    { type: 'tip', body: `Always write down your business metric <em>before</em> you open the data. If you don't know what "good" looks like before you start, you'll unconsciously optimise for the wrong thing.` }
  ]
};

L['dsf-w1-l3'] = {
  duration_mins: 13,
  sections: [
    { type: 'text', body: `
<h2>Types of Data</h2>
<p>Not all data is created equal. Understanding the <em>type</em> of data you're working with determines which tools to use, which visualisations are appropriate, and which statistical tests are valid. Getting this wrong leads to real mistakes — like computing the "average" of a categorical variable or treating ordinal data as continuous.</p>
<h3>The fundamental taxonomy</h3>
<p><strong>Structured data</strong> lives in tables — rows and columns with consistent types. Every SQL database, every CSV file, most spreadsheets. This is the easiest to work with and historically the most common in enterprise settings.</p>
<p><strong>Semi-structured data</strong> has some organisation but doesn't fit neatly into rows and columns. JSON and XML files are the canonical examples. A JSON API response might have nested objects, optional fields, and arrays of varying length.</p>
<p><strong>Unstructured data</strong> has no predefined format. Text documents, images, audio, video. This represents the vast majority (~80%) of all data generated globally. Working with it typically requires specialised methods: NLP for text, computer vision for images.</p>
<h3>Statistical data types</h3>
<p>Within structured data, each column has a statistical type that determines what operations make sense on it:</p>
<ul>
  <li><strong>Nominal (categorical)</strong> — Labels with no inherent order. Colours, country names, product categories. You can count them; averaging them is meaningless.</li>
  <li><strong>Ordinal</strong> — Categories with a meaningful order but no fixed spacing. Survey ratings (1–5 stars), education levels. You can rank them; arithmetic is questionable.</li>
  <li><strong>Interval</strong> — Numbers with consistent spacing but no true zero. Temperature in Celsius (0°C ≠ "no temperature"). You can add/subtract; ratios are meaningless.</li>
  <li><strong>Ratio</strong> — Numbers with consistent spacing and a true zero. Height, income, age. All arithmetic operations are valid.</li>
</ul>
` },
    { type: 'code', lang: 'python', src: `import pandas as pd

# Load a sample dataset with mixed data types
df = pd.DataFrame({
    'customer_id':  [101, 102, 103, 104],
    'country':      ['India', 'USA', 'UK', 'India'],   # nominal
    'satisfaction': [4, 2, 5, 3],                       # ordinal (1–5 scale)
    'temperature_c':[22.5, 18.0, 15.3, 30.1],          # interval
    'revenue':      [4500, 2300, 8900, 3100],           # ratio
    'notes':        ['Great product', 'Late delivery', 'Perfect', 'Good value']  # unstructured text
})

# Check what pandas inferred
print(df.dtypes)

# Convert country to categorical (saves memory on large datasets)
df['country'] = df['country'].astype('category')

# Ordinal encoding — preserve the ranking
from pandas.api.types import CategoricalDtype
rating_order = CategoricalDtype(categories=[1,2,3,4,5], ordered=True)
df['satisfaction'] = df['satisfaction'].astype(rating_order)

# Now comparisons work correctly
print(df['satisfaction'] > 3)   # True for customers with rating 4 or 5
print(df['satisfaction'].min()) # 2 — the lowest rating in the dataset` },
    { type: 'warn', body: `A common mistake: encoding nominal categories as integers (e.g., India=0, USA=1, UK=2) and feeding them directly into a model. The model will treat 2 as "more than" 1, which is nonsense for country codes. Always use one-hot encoding or dedicated categorical handling for nominal data.` },
    { type: 'exercise', title: 'Classify the Columns', body: `<p>A hospital dataset has these columns: <code>patient_id</code>, <code>age</code>, <code>blood_type</code>, <code>pain_scale (1–10)</code>, <code>temperature_celsius</code>, <code>weight_kg</code>, <code>diagnosis_notes</code>.</p>
<p>Classify each column as: nominal / ordinal / interval / ratio / unstructured. Then decide which columns you <em>cannot</em> meaningfully average.</p>`,
    hint: `<p>Ask: Does zero mean "none of it"? Is there a natural order? Are the gaps between values equal?</p>`,
    solution: `patient_id: nominal (identifier)\nage: ratio (true zero, equal spacing)\nblood_type: nominal\npain_scale: ordinal (ordered, gaps not guaranteed equal)\ntemperature_celsius: interval (0°C is not "no temperature")\nweight_kg: ratio\ndiagnosis_notes: unstructured text\n\nCannot meaningfully average: patient_id, blood_type, pain_scale (debatable), diagnosis_notes` }
  ]
};

L['dsf-w1-l4'] = {
  duration_mins: 15,
  sections: [
    { type: 'text', body: `
<h2>Tools of the Trade</h2>
<p>A data scientist's toolkit has converged around a fairly stable set of technologies over the last decade. You don't need to master all of them immediately, but knowing what each tool does — and why it exists — helps you choose the right one for a given task.</p>
<h3>The Python ecosystem</h3>
<p><strong>Python</strong> is the dominant language for data science. It won over R and MATLAB not because it's faster (it isn't — raw Python is slow), but because of its ecosystem, readability, and general-purpose nature. You can use the same language to clean data, train a model, and serve it as an API.</p>
<p>The core libraries you'll use in this course:</p>
<ul>
  <li><strong>NumPy</strong> — Fast array operations. The foundation every other library is built on. Provides vectorised computation that runs in optimised C code, not slow Python loops.</li>
  <li><strong>pandas</strong> — DataFrames for tabular data. The workhorse of data cleaning and EDA. Think of it as a programmable spreadsheet with superpowers.</li>
  <li><strong>Matplotlib / Seaborn</strong> — Visualisation. Matplotlib is the low-level engine; Seaborn provides a higher-level API for statistical charts.</li>
  <li><strong>scikit-learn</strong> — Machine learning. A consistent API for dozens of algorithms: fit, predict, transform. Excellent documentation.</li>
  <li><strong>Jupyter Notebook / JupyterLab</strong> — Interactive development environment. Code, output, and narrative live together in "cells." Industry standard for exploration and communication.</li>
</ul>
<h3>SQL — still essential</h3>
<p>Despite Python's dominance, SQL remains the single most valuable language for data professionals. Most data lives in databases, and the fastest way to get it is to query it directly. A data scientist who can write efficient SQL queries is dramatically more productive than one who always pulls data into Python first.</p>
<h3>Version control: Git</h3>
<p>Data science code needs version control just like any other software. Git tracks changes, enables collaboration, and lets you roll back to a working state when an experiment goes wrong. GitHub and GitLab also serve as portfolio platforms — hiring managers look at your repositories.</p>
` },
    { type: 'code', lang: 'python', src: `# The "hello world" of data science tooling
# Run this to verify your environment is set up correctly

import sys
import numpy as np
import pandas as pd
import matplotlib
import sklearn

print(f"Python  : {sys.version.split()[0]}")
print(f"NumPy   : {np.__version__}")
print(f"pandas  : {pd.__version__}")
print(f"Matplotlib: {matplotlib.__version__}")
print(f"scikit-learn: {sklearn.__version__}")

# A quick NumPy sanity check
arr = np.array([1, 2, 3, 4, 5])
print(f"\nArray mean : {arr.mean()}")
print(f"Array std  : {arr.std():.4f}")

# A quick pandas sanity check
df = pd.DataFrame({'x': arr, 'x_squared': arr ** 2})
print(f"\n{df}")` },
    { type: 'tip', body: `Install everything via <strong>Anaconda</strong> or <strong>Miniconda</strong> rather than pip-installing into your global Python. Conda environments keep project dependencies isolated, preventing the classic "it works on my machine" problem when sharing notebooks with colleagues.` }
  ]
};

L['dsf-w1-l5'] = {
  duration_mins: 16,
  sections: [
    { type: 'text', body: `
<h2>Setting Up Your Data Science Environment</h2>
<p>A consistent, reproducible environment is the foundation of good data science practice. This lesson walks through setting up a professional Python environment from scratch — the way a working data scientist would.</p>
<h3>Option 1: Miniconda (recommended)</h3>
<p>Miniconda is a minimal installer for the conda package manager. It's much lighter than the full Anaconda distribution and lets you install only what you need. Download the installer for your operating system from <em>docs.conda.io</em> and run it. During installation, choose <strong>not</strong> to add conda to your PATH automatically — let the installer create a separate "conda prompt" on Windows or modify your shell config on macOS/Linux.</p>
<h3>Option 2: venv + pip</h3>
<p>If you already have Python 3.10+ installed, the built-in <code>venv</code> module creates lightweight virtual environments. This approach is slightly more manual but works anywhere Python does.</p>
<h3>Jupyter Lab</h3>
<p>JupyterLab is the modern successor to Jupyter Notebook. It provides a full IDE-like interface with a file browser, multiple tabs, and a terminal. All course exercises are designed to run in JupyterLab.</p>
` },
    { type: 'code', lang: 'bash', src: `# ── Using Miniconda (recommended) ──────────────────────────────────────

# Create a new conda environment named 'dsa' with Python 3.11
conda create -n dsa python=3.11 -y

# Activate it
conda activate dsa

# Install the core data science stack
conda install -c conda-forge numpy pandas matplotlib seaborn scikit-learn jupyterlab -y

# Launch JupyterLab — a browser tab will open automatically
jupyter lab` },
    { type: 'code', lang: 'bash', src: `# ── Using venv + pip (alternative) ────────────────────────────────────

# Create the virtual environment
python -m venv dsa-env

# Activate it
# On macOS/Linux:
source dsa-env/bin/activate
# On Windows:
dsa-env\\Scripts\\activate

# Install packages
pip install numpy pandas matplotlib seaborn scikit-learn jupyterlab

# Launch JupyterLab
jupyter lab` },
    { type: 'code', lang: 'python', src: `# ── Your first real Jupyter notebook cell ──────────────────────────────
# Paste this into a new cell in JupyterLab and run it with Shift+Enter

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Generate some fake sales data
np.random.seed(42)
months = ['Jan','Feb','Mar','Apr','May','Jun',
          'Jul','Aug','Sep','Oct','Nov','Dec']
sales  = np.random.normal(loc=50000, scale=8000, size=12).round(0)

df = pd.DataFrame({'month': months, 'sales': sales})

# Plot it
fig, ax = plt.subplots(figsize=(10, 4))
ax.bar(df['month'], df['sales'], color='steelblue', edgecolor='white', linewidth=0.5)
ax.set_title('Monthly Sales 2024', fontsize=14, fontweight='bold')
ax.set_ylabel('Sales (₹)')
ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, _: f'₹{x:,.0f}'))
plt.tight_layout()
plt.show()

print(f"Best month  : {df.loc[df['sales'].idxmax(), 'month']}")
print(f"Worst month : {df.loc[df['sales'].idxmin(), 'month']}")
print(f"Total sales : ₹{df['sales'].sum():,.0f}")` },
    { type: 'tip', body: `Save your notebooks with meaningful names like <code>01_eda_customer_data.ipynb</code>, not <code>Untitled3.ipynb</code>. You will have dozens of notebooks within a month. Naming them well from the start costs nothing and saves hours later.` },
    { type: 'exercise', title: 'Reproduce the Environment', body: `<p>Set up the conda environment from scratch using the commands above. Then create a new notebook, paste the sales chart code, and modify it to show <strong>quarterly</strong> totals (Q1–Q4) instead of monthly. Use a horizontal bar chart (<code>ax.barh</code>) instead of a vertical one.</p>`,
    hint: `<p>Group months into quarters: Q1 = Jan+Feb+Mar, etc. You can slice <code>df['sales']</code> and use <code>.sum()</code> on groups of three rows.</p>`,
    solution: `quarters = ['Q1', 'Q2', 'Q3', 'Q4']\nq_sales = [df['sales'][:3].sum(), df['sales'][3:6].sum(),\n           df['sales'][6:9].sum(), df['sales'][9:].sum()]\nfig, ax = plt.subplots(figsize=(7,4))\nax.barh(quarters, q_sales, color='steelblue')\nax.set_xlabel('Sales (₹)')\nax.set_title('Quarterly Sales 2024')\nplt.tight_layout(); plt.show()` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 2 — DATA COLLECTION & STORAGE
══════════════════════════════════════════════════════════════════════════ */

L['dsf-w2-l1'] = {
  duration_mins: 14,
  sections: [
    { type: 'text', body: `
<h2>Data Sources & APIs</h2>
<p>Before you can analyse data, you have to get it. In real projects, data rarely arrives as a clean CSV on your desktop. It comes from databases, APIs, web pages, sensors, log files, third-party vendors, and internal systems — often several of these at once.</p>
<h3>Primary vs secondary data</h3>
<p><strong>Primary data</strong> is collected directly for your project — surveys, A/B experiments, sensor deployments. You control its quality and scope, but it costs time and money to gather.</p>
<p><strong>Secondary data</strong> already exists and was collected for another purpose — government statistics, transaction records, social media feeds. It's faster to access but may not perfectly fit your question.</p>
<h3>REST APIs</h3>
<p>Most modern web services expose data through a REST API. You make an HTTP request to a URL (an <em>endpoint</em>), and the server responds with data — almost always in JSON format. Python's <code>requests</code> library makes this straightforward.</p>
<p>Key concepts: <strong>endpoint</strong> (the URL you call), <strong>authentication</strong> (API key, OAuth token), <strong>rate limiting</strong> (most APIs restrict how many calls you can make per minute), <strong>pagination</strong> (large datasets are split across multiple pages of results).</p>
` },
    { type: 'code', lang: 'python', src: `import requests
import pandas as pd

# Example: fetch public COVID data from disease.sh (no API key needed)
url = 'https://disease.sh/v3/covid-19/countries'
response = requests.get(url, timeout=10)

# Always check the status code first
print(f"Status: {response.status_code}")  # 200 = success

# Parse JSON into a list of dicts
data = response.json()
print(f"Records returned: {len(data)}")
print(f"Keys in first record: {list(data[0].keys())[:8]}")

# Convert to DataFrame
df = pd.json_normalize(data)

# Select relevant columns
cols = ['country', 'cases', 'deaths', 'recovered', 'population']
df = df[cols].copy()

# Derive a case fatality rate
df['cfr_pct'] = (df['deaths'] / df['cases'] * 100).round(2)

# Top 10 by total cases
print(df.nlargest(10, 'cases')[['country','cases','deaths','cfr_pct']])` },
    { type: 'tip', body: `Always store your API keys in environment variables (<code>os.environ['MY_API_KEY']</code>) or a <code>.env</code> file — never hardcode them in a notebook. A leaked API key in a public GitHub repository can cost you real money within hours.` }
  ]
};

L['dsf-w2-l2'] = {
  duration_mins: 15,
  sections: [
    { type: 'text', body: `
<h2>Working with CSV and Excel Files</h2>
<p>CSV (Comma-Separated Values) and Excel files remain the most common data interchange formats in business. A huge proportion of real-world data science work starts with a file that someone emailed you or dropped in a shared folder.</p>
<h3>Reading files with pandas</h3>
<p>pandas provides <code>read_csv()</code> and <code>read_excel()</code> with a rich set of options. Knowing these options saves you from a lot of manual post-processing.</p>
` },
    { type: 'code', lang: 'python', src: `import pandas as pd

# ── CSV basics ─────────────────────────────────────────────────────────
df = pd.read_csv('sales.csv')

# Common gotchas and their fixes:

# 1. Non-standard separator (semicolons are common in European data)
df = pd.read_csv('sales_eu.csv', sep=';')

# 2. Date columns not parsed automatically
df = pd.read_csv('sales.csv', parse_dates=['order_date', 'ship_date'])

# 3. Large file — only read the first 1000 rows while exploring
df_sample = pd.read_csv('large_file.csv', nrows=1000)

# 4. File has no header row
df = pd.read_csv('no_header.csv', header=None,
                 names=['id','product','qty','price','date'])

# 5. Encoding issues (common with data from older systems)
df = pd.read_csv('legacy.csv', encoding='latin-1')

# ── Excel files ────────────────────────────────────────────────────────
# Single sheet
df = pd.read_excel('report.xlsx', sheet_name='Sales')

# Read all sheets at once — returns a dict of DataFrames
all_sheets = pd.read_excel('report.xlsx', sheet_name=None)
for name, sheet_df in all_sheets.items():
    print(f"Sheet: {name}, Shape: {sheet_df.shape}")

# ── Writing back ───────────────────────────────────────────────────────
df_clean = df.dropna()
df_clean.to_csv('sales_clean.csv', index=False)   # index=False avoids a spurious row number column
df_clean.to_excel('sales_clean.xlsx', index=False, sheet_name='Cleaned')` },
    { type: 'code', lang: 'python', src: `# ── Handling multiple CSV files in a folder ────────────────────────────
import glob

# Find all CSV files in a directory
csv_files = glob.glob('data/monthly_reports/*.csv')
print(f"Found {len(csv_files)} files")

# Read and concatenate them into one DataFrame
dfs = []
for f in csv_files:
    tmp = pd.read_csv(f)
    tmp['source_file'] = f          # track which file each row came from
    dfs.append(tmp)

combined = pd.concat(dfs, ignore_index=True)
print(f"Combined shape: {combined.shape}")
print(combined['source_file'].value_counts())` },
    { type: 'warn', body: `<code>pd.read_excel</code> requires the <code>openpyxl</code> library for <code>.xlsx</code> files. Install it with <code>pip install openpyxl</code>. For older <code>.xls</code> files you need <code>xlrd</code> instead.` }
  ]
};

L['dsf-w2-l3'] = {
  duration_mins: 14,
  sections: [
    { type: 'text', body: `
<h2>Introduction to Web Scraping</h2>
<p>When data isn't available via an API or file download, web scraping — programmatically extracting data from web pages — is the next tool in the box. Python's <code>requests</code> library fetches the raw HTML; <code>BeautifulSoup</code> parses it into a navigable structure.</p>
<p><strong>Important ethical and legal note:</strong> Always check a website's <code>robots.txt</code> file and Terms of Service before scraping. Many sites explicitly prohibit automated access. Even where it's technically permitted, be respectful — use delays between requests, don't hammer servers, and identify your scraper with a descriptive User-Agent string.</p>
<h3>How HTML is structured</h3>
<p>Every web page is a tree of HTML elements: <code>&lt;table&gt;</code>, <code>&lt;div&gt;</code>, <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>, etc. Each element can have <em>attributes</em> (like <code>class</code>, <code>id</code>, <code>href</code>) that you use to locate the data you want. Browser developer tools (F12) let you inspect any element and find its path in the HTML tree before writing a single line of code.</p>
` },
    { type: 'code', lang: 'python', src: `import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

# Example: scrape a public table from Wikipedia
url = 'https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)'
headers = {'User-Agent': 'DSA-student-scraper/1.0 (educational use)'}

response = requests.get(url, headers=headers, timeout=10)
soup = BeautifulSoup(response.text, 'html.parser')

# Find the first wikitable on the page
table = soup.find('table', {'class': 'wikitable'})

# Extract headers
headers_row = table.find('tr')
col_names = [th.get_text(strip=True) for th in headers_row.find_all('th')]
print("Columns found:", col_names)

# Extract data rows
rows = []
for tr in table.find_all('tr')[1:]:   # skip the header row
    cells = tr.find_all(['td', 'th'])
    if cells:
        rows.append([c.get_text(strip=True) for c in cells])

df = pd.DataFrame(rows, columns=col_names[:len(rows[0])])
print(df.head(10))

# Be polite — pause between requests if scraping multiple pages
time.sleep(1)` },
    { type: 'tip', body: `<code>pd.read_html(url)</code> is a pandas shortcut that automatically parses all HTML tables on a page into a list of DataFrames. It works surprisingly well on Wikipedia and many government websites — try it before reaching for BeautifulSoup.` }
  ]
};

L['dsf-w2-l4'] = {
  duration_mins: 14,
  sections: [
    { type: 'text', body: `
<h2>Introduction to Databases for Data Scientists</h2>
<p>Most business data lives in a relational database, not a CSV file. Being able to query databases directly — rather than waiting for someone else to export the data for you — is one of the highest-leverage skills a data scientist can have.</p>
<h3>Connecting Python to a database</h3>
<p>The standard Python interface for relational databases is <strong>DB-API 2.0</strong>. Every database driver (SQLite, PostgreSQL, MySQL) implements this same API, so the pattern is nearly identical regardless of which database you use. SQLite is particularly convenient for learning — it stores the entire database in a single file and requires no server installation.</p>
<p>In production, you'll typically use SQLAlchemy as an abstraction layer — it lets you switch databases without rewriting your connection code and integrates seamlessly with pandas.</p>
` },
    { type: 'code', lang: 'python', src: `import sqlite3
import pandas as pd

# ── Create an in-memory SQLite database ────────────────────────────────
conn = sqlite3.connect(':memory:')   # ':memory:' = no file, lives in RAM
cursor = conn.cursor()

# Create a table and insert sample data
cursor.executescript("""
    CREATE TABLE orders (
        id          INTEGER PRIMARY KEY,
        customer    TEXT NOT NULL,
        product     TEXT NOT NULL,
        quantity    INTEGER,
        unit_price  REAL,
        order_date  TEXT
    );
    INSERT INTO orders VALUES
        (1, 'Priya',   'Laptop',  1, 75000, '2024-01-15'),
        (2, 'Arjun',   'Mouse',   2,  1200, '2024-01-16'),
        (3, 'Sneha',   'Laptop',  1, 75000, '2024-01-18'),
        (4, 'Priya',   'Webcam',  1,  3500, '2024-01-20'),
        (5, 'Vikram',  'Keyboard',1,  2800, '2024-01-22'),
        (6, 'Arjun',   'Monitor', 1, 22000, '2024-01-25');
""")
conn.commit()

# ── Query with pandas — the most convenient pattern ────────────────────
df = pd.read_sql_query("""
    SELECT
        customer,
        COUNT(*)                              AS total_orders,
        SUM(quantity * unit_price)            AS total_spend,
        ROUND(AVG(unit_price), 2)             AS avg_unit_price
    FROM orders
    GROUP BY customer
    ORDER BY total_spend DESC
""", conn)

print(df)

# ── Using SQLAlchemy (production-grade connection management) ──────────
from sqlalchemy import create_engine
engine = create_engine('sqlite:///company.db')  # file-backed database
df.to_sql('customer_summary', engine, if_exists='replace', index=False)
print("Written to database successfully")` }
  ]
};

L['dsf-w2-l5'] = {
  duration_mins: 13,
  sections: [
    { type: 'text', body: `
<h2>Data Quality & Completeness</h2>
<p>The phrase "garbage in, garbage out" is the oldest cliché in data science, and it remains perfectly accurate. A sophisticated model trained on bad data produces confidently wrong predictions. Understanding data quality before you model is not optional — it's the most important validation you'll do on any project.</p>
<h3>Dimensions of data quality</h3>
<ul>
  <li><strong>Completeness</strong> — Are there missing values? Which columns? What proportion?</li>
  <li><strong>Accuracy</strong> — Do the values reflect reality? An age of 450 or a negative salary are obvious; subtler errors (a zip code in the wrong state) require domain knowledge to spot.</li>
  <li><strong>Consistency</strong> — Is the same entity represented the same way everywhere? "Mumbai", "Bombay", and "mumbai" are the same city but will appear as three separate categories.</li>
  <li><strong>Timeliness</strong> — Is the data current enough for your question? A churn model trained on two-year-old data may not reflect current user behaviour.</li>
  <li><strong>Uniqueness</strong> — Are there duplicate records? Duplicates silently skew aggregations and model training.</li>
</ul>
` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np

# Simulate a messy real-world dataset
df = pd.DataFrame({
    'customer_id': [1, 2, 2, 3, 4, 5, 5, 6],           # duplicates: 2, 5
    'name':        ['Priya','Arjun','Arjun','Sneha', None,'Vikram','Vikram','Ananya'],
    'age':         [28, 34, 34, None, 450, 26, 26, 31], # 450 is invalid
    'city':        ['Mumbai','Delhi','Delhi','mumbai','Chennai','Pune','Pune','Hyderabad'],
    'revenue':     [5200, 3100, 3100, 7800, 2200, None, None, 4600]
})

print("=== BASIC QUALITY AUDIT ===\n")

# 1. Shape
print(f"Rows: {df.shape[0]},  Columns: {df.shape[1]}")

# 2. Missing values
missing = df.isnull().sum()
missing_pct = (missing / len(df) * 100).round(1)
print("\nMissing values:")
print(pd.DataFrame({'count': missing, 'pct': missing_pct})[missing > 0])

# 3. Duplicates
dupes = df.duplicated(subset='customer_id', keep=False)
print(f"\nDuplicate customer IDs: {dupes.sum()} rows")

# 4. Out-of-range values
print(f"\nAges outside [0, 120]: {((df['age'] < 0) | (df['age'] > 120)).sum()} rows")

# 5. Inconsistent string casing
print(f"\nUnique cities (raw): {df['city'].unique()}")
df['city'] = df['city'].str.title().str.strip()
print(f"Unique cities (normalised): {df['city'].unique()}")` },
    { type: 'exercise', title: 'Quality Score a Dataset', body: `<p>Write a function <code>quality_report(df)</code> that prints: (1) total rows and columns, (2) missing value percentage per column, (3) number of duplicate rows, and (4) number of numeric columns with values outside mean ± 3σ.</p>`,
    hint: `<p>Use <code>df.duplicated().sum()</code> for duplicates. For outliers: <code>np.abs((col - col.mean()) / col.std()) > 3</code>.</p>`,
    solution: `def quality_report(df):\n    print(f"Shape: {df.shape}")\n    print("\\nMissing %:")\n    print((df.isnull().mean()*100).round(1))\n    print(f"\\nDuplicates: {df.duplicated().sum()}")\n    print("\\nOutliers (>3σ):")\n    for col in df.select_dtypes('number'):\n        n = (np.abs((df[col]-df[col].mean())/df[col].std())>3).sum()\n        if n: print(f"  {col}: {n}")` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 3 — DATA CLEANING & PREPARATION
══════════════════════════════════════════════════════════════════════════ */

L['dsf-w3-l1'] = {
  duration_mins: 13,
  sections: [
    { type: 'text', body: `
<h2>Understanding Dirty Data</h2>
<p>Data cleaning is not glamorous, but it is the skill that separates data scientists who produce reliable results from those who produce confident nonsense. In surveys of practising data scientists, 60–80% of project time is consistently reported as data preparation. This isn't a sign of failure — it's the reality of working with data generated by humans, machines, and legacy systems that were never designed with analysis in mind.</p>
<h3>Where dirty data comes from</h3>
<p><strong>Entry errors</strong> — Human data entry is error-prone. Transposed digits, misspelled names, wrong units. A salary of 5,000,000 might be genuine for a CEO or a missing decimal for a junior analyst.</p>
<p><strong>System migrations</strong> — When companies switch software, data is often converted imperfectly. Dates change formats, codes get remapped inconsistently, and some records get dropped entirely.</p>
<p><strong>Multiple sources</strong> — Joining data from two systems that were built independently produces inconsistencies. The same customer might be "Priya K" in the CRM and "P. Krishnamurthy" in the billing system.</p>
<p><strong>Deliberate omissions</strong> — Survey respondents skip uncomfortable questions. Customers provide fake email addresses. Missing data is not always random — and non-random missingness can seriously bias your analysis.</p>
<h3>A systematic cleaning checklist</h3>
<ol>
  <li>Audit shape, types, and missing values</li>
  <li>Handle duplicates</li>
  <li>Fix data types (dates as strings, numbers as objects)</li>
  <li>Standardise text (case, whitespace, encoding)</li>
  <li>Detect and treat outliers</li>
  <li>Handle missing values (drop, impute, or flag)</li>
  <li>Validate business rules (age > 0, price > 0, end_date > start_date)</li>
</ol>
` },
    { type: 'tip', body: `<strong>Never clean data in place without a backup.</strong> Always keep the raw original file untouched. Save cleaned versions with a suffix like <code>_clean</code> or <code>_v2</code>. You will need to trace back to the raw data more often than you expect.` }
  ]
};

L['dsf-w3-l2'] = {
  duration_mins: 16,
  sections: [
    { type: 'text', body: `
<h2>Handling Missing Values</h2>
<p>Missing values are present in virtually every real dataset. pandas represents them as <code>NaN</code> (Not a Number) for numeric columns and <code>None</code> or <code>NaN</code> for object columns. Your strategy for handling them should be driven by <em>why</em> they're missing — not just <em>how many</em> are missing.</p>
<h3>Three categories of missingness</h3>
<ul>
  <li><strong>MCAR — Missing Completely At Random</strong>: The probability of missing has nothing to do with the data. A server outage dropped records randomly. Safe to drop these rows without introducing bias.</li>
  <li><strong>MAR — Missing At Random</strong>: The probability of missing depends on other observed variables. Income is more likely to be missing for younger respondents. Imputation works well here.</li>
  <li><strong>MNAR — Missing Not At Random</strong>: The probability of missing depends on the missing value itself. High-earners are less likely to report income. This is the dangerous case — dropping or naively imputing will bias your results.</li>
</ul>
` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    'age':    [25, 30, None, 35, 28, None, 40, 22],
    'salary': [45000, None, 62000, None, 38000, 55000, None, 41000],
    'city':   ['Mumbai', None, 'Delhi', 'Pune', 'Mumbai', None, 'Chennai', 'Delhi'],
    'score':  [88, 72, 91, None, 85, 78, 95, 69]
})

# ── 1. Survey the damage ───────────────────────────────────────────────
print(df.isnull().sum())

# ── 2. Drop rows only when missingness is rare and random ──────────────
# Drop rows where the TARGET variable (score) is missing
df_model = df.dropna(subset=['score'])

# ── 3. Mean / median imputation ────────────────────────────────────────
# Median is more robust to outliers than mean
df['age'].fillna(df['age'].median(), inplace=True)
df['salary'].fillna(df['salary'].median(), inplace=True)

# ── 4. Mode imputation for categorical columns ─────────────────────────
df['city'].fillna(df['city'].mode()[0], inplace=True)

# ── 5. Forward-fill (for time series data) ─────────────────────────────
# ts = pd.Series([10, None, None, 13, None, 15])
# ts.ffill()  →  [10, 10, 10, 13, 13, 15]

# ── 6. sklearn imputer (proper for ML pipelines) ──────────────────────
from sklearn.impute import SimpleImputer
imputer = SimpleImputer(strategy='median')   # or 'mean', 'most_frequent'
# Fits the median from training data — avoids data leakage in CV
# imputer.fit(X_train); X_train_imp = imputer.transform(X_train)

# ── 7. Add a missingness indicator column (preserves signal) ──────────
df['salary_was_missing'] = df['salary'].isnull().astype(int)

print(df)` },
    { type: 'warn', body: `Imputing with the mean/median of the <em>entire dataset</em> when training a model causes <strong>data leakage</strong>. Fit the imputer only on the training set, then apply it to the test set. sklearn's <code>Pipeline</code> handles this correctly automatically.` }
  ]
};

L['dsf-w3-l3'] = {
  duration_mins: 15,
  sections: [
    { type: 'text', body: `
<h2>Outliers & Anomalies</h2>
<p>An outlier is a data point that lies far from the rest of the distribution. Outliers are not always errors — they can be genuinely important signal (a fraudulent transaction, an exceptionally profitable customer). Your job is to investigate them, not blindly remove them.</p>
<h3>Detection methods</h3>
<p><strong>IQR method (robust)</strong>: Calculate Q1 (25th percentile) and Q3 (75th percentile). The Interquartile Range IQR = Q3 − Q1. Any value below Q1 − 1.5×IQR or above Q3 + 1.5×IQR is flagged. This is the rule behind box plots.</p>
<p><strong>Z-score method</strong>: Flag values more than 3 standard deviations from the mean. Assumes the data is approximately normally distributed — which most real-world data isn't. Use with caution.</p>
<p><strong>Visual inspection</strong>: Box plots, histograms, and scatter plots reveal outliers immediately. Always plot before you calculate.</p>
` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)
salaries = np.concatenate([
    np.random.normal(60000, 10000, 95),
    [5000, 8000, 250000, 300000, 12000]   # 5 outliers injected
])
df = pd.DataFrame({'salary': salaries})

# ── IQR method ─────────────────────────────────────────────────────────
Q1 = df['salary'].quantile(0.25)
Q3 = df['salary'].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

outliers = df[(df['salary'] < lower) | (df['salary'] > upper)]
print(f"Outliers detected (IQR): {len(outliers)}")
print(outliers.round(0))

# ── Z-score method ─────────────────────────────────────────────────────
from scipy import stats
z_scores = np.abs(stats.zscore(df['salary']))
z_outliers = df[z_scores > 3]
print(f"\nOutliers detected (Z-score): {len(z_outliers)}")

# ── Visualise ──────────────────────────────────────────────────────────
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))
ax1.boxplot(df['salary'], vert=False)
ax1.set_title('Box Plot — reveals outliers as individual dots')
ax1.set_xlabel('Salary (₹)')
ax2.hist(df['salary'], bins=30, edgecolor='white', linewidth=0.4, color='steelblue')
ax2.set_title('Histogram — shows the full distribution shape')
ax2.set_xlabel('Salary (₹)')
plt.tight_layout(); plt.show()

# ── Treatment options ──────────────────────────────────────────────────
# Option 1: Cap (winsorisation) — preserves the row
df['salary_capped'] = df['salary'].clip(lower=lower, upper=upper)

# Option 2: Remove — use only if outlier is a genuine data entry error
df_clean = df[(df['salary'] >= lower) & (df['salary'] <= upper)]

# Option 3: Log transform — compresses the scale without removing data
df['log_salary'] = np.log1p(df['salary'])` }
  ]
};

L['dsf-w3-l4'] = {
  duration_mins: 14,
  sections: [
    { type: 'text', body: `
<h2>Data Type Conversions & String Cleaning</h2>
<p>When pandas reads a CSV, it makes its best guess about the data type of each column. It's often wrong. Dates become strings. Numbers with thousand-separators are read as strings. Categorical columns stay as generic objects. Fixing these correctly makes all subsequent operations faster and less error-prone.</p>
` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np

# Simulate a typical messy import
df = pd.DataFrame({
    'order_id':    ['ORD-001', 'ORD-002', 'ORD-003', 'ORD-004'],
    'order_date':  ['15-Jan-2024', '2024/01/16', 'Jan 18 2024', '20-01-2024'],
    'revenue':     ['₹4,500.00', '₹2,300', '₹8,900.50', '₹3,100.00'],
    'is_returned': ['Yes', 'No', 'No', 'Yes'],
    'category':    ['  Electronics ', 'electronics', 'ELECTRONICS', 'Electronics'],
})

print("Before cleaning:")
print(df.dtypes)
print(df)

# ── Fix dates (mixed formats → uniform datetime) ───────────────────────
df['order_date'] = pd.to_datetime(df['order_date'], dayfirst=True)
df['order_year']  = df['order_date'].dt.year
df['order_month'] = df['order_date'].dt.month

# ── Fix revenue (string with currency symbol and comma → float) ────────
df['revenue'] = (df['revenue']
                 .str.replace('₹', '', regex=False)
                 .str.replace(',', '', regex=False)
                 .str.strip()
                 .astype(float))

# ── Fix boolean column ─────────────────────────────────────────────────
df['is_returned'] = df['is_returned'].map({'Yes': True, 'No': False})

# ── Standardise strings ────────────────────────────────────────────────
df['category'] = df['category'].str.strip().str.lower().str.title()

print("\nAfter cleaning:")
print(df.dtypes)
print(df)` }
  ]
};

L['dsf-w3-l5'] = {
  duration_mins: 15,
  sections: [
    { type: 'text', body: `
<h2>Feature Engineering Basics</h2>
<p>Feature engineering is the process of creating new columns from existing ones that better represent the underlying structure of the problem. It is one of the highest-impact activities in a data science project — a well-engineered feature often does more for model performance than switching algorithms.</p>
<h3>Common transformations</h3>
<p><strong>Extracting from dates</strong>: A raw timestamp is nearly useless as a model input. Extracting year, month, day-of-week, hour, and flags like "is weekend" or "is holiday" exposes the temporal patterns that matter.</p>
<p><strong>Interaction features</strong>: Multiplying or dividing two existing columns can capture relationships the model can't learn alone. Revenue per customer is more informative than revenue and customer count separately.</p>
<p><strong>Log transforms</strong>: Right-skewed distributions (income, house price, website traffic) are common. Taking the log makes the distribution more symmetric, which benefits many algorithms.</p>
<p><strong>Binning</strong>: Converting a continuous variable into categories (age groups, income brackets) can help when the relationship with the target is non-linear and step-like.</p>
` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    'signup_date':    pd.date_range('2024-01-01', periods=8, freq='13D'),
    'last_order_date':pd.date_range('2024-03-01', periods=8, freq='5D'),
    'total_orders':   [1, 5, 3, 12, 2, 8, 4, 15],
    'total_revenue':  [800, 12000, 4500, 38000, 1200, 22000, 6800, 55000],
    'age':            [22, 35, 28, 45, 19, 52, 33, 41],
})

# 1. Date-derived features
today = pd.Timestamp('2024-06-01')
df['days_since_signup']      = (today - df['signup_date']).dt.days
df['days_since_last_order']  = (today - df['last_order_date']).dt.days
df['signup_month']           = df['signup_date'].dt.month

# 2. Interaction / ratio features
df['avg_order_value'] = df['total_revenue'] / df['total_orders']
df['orders_per_month'] = df['total_orders'] / (df['days_since_signup'] / 30).clip(lower=1)

# 3. Log transform (handle right skew)
df['log_revenue'] = np.log1p(df['total_revenue'])

# 4. Age binning
df['age_group'] = pd.cut(
    df['age'],
    bins=[0, 25, 35, 50, 100],
    labels=['Gen Z', 'Millennial', 'Gen X', 'Boomer']
)

# 5. High-value customer flag
revenue_threshold = df['total_revenue'].quantile(0.75)
df['is_high_value'] = (df['total_revenue'] >= revenue_threshold).astype(int)

print(df[['avg_order_value','orders_per_month','log_revenue','age_group','is_high_value']])` },
    { type: 'exercise', title: 'Engineer Features from a Telecom Dataset', body: `<p>You have columns: <code>account_start_date</code>, <code>monthly_charge</code>, <code>total_charges</code>, <code>num_complaints</code>. Create: (1) <code>tenure_months</code>, (2) <code>avg_monthly_vs_total_ratio</code>, (3) <code>complaint_rate</code> (complaints per year of tenure), (4) a <code>high_risk</code> flag for customers with more than 2 complaints.</p>`,
    hint: `<p>Tenure = (today - start_date).dt.days / 30. For complaint_rate, divide by (tenure_months/12) and clip denominator at 1 to avoid division by zero.</p>`,
    solution: `today = pd.Timestamp.today()\ndf['tenure_months'] = (today - pd.to_datetime(df['account_start_date'])).dt.days / 30\ndf['avg_monthly_vs_total_ratio'] = df['monthly_charge'] / df['total_charges'].replace(0,1)\ndf['complaint_rate'] = df['num_complaints'] / (df['tenure_months']/12).clip(lower=1)\ndf['high_risk'] = (df['num_complaints'] > 2).astype(int)` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 4 — EXPLORATORY DATA ANALYSIS
══════════════════════════════════════════════════════════════════════════ */

L['dsf-w4-l1'] = {
  duration_mins: 13,
  sections: [
    { type: 'text', body: `
<h2>EDA: Thinking Like a Detective</h2>
<p>Exploratory Data Analysis (EDA) is the process of investigating a dataset to understand its structure, distributions, relationships, and anomalies — before imposing any model or hypothesis. The goal is to let the data speak before you try to fit it into a framework.</p>
<p>The term was popularised by statistician John Tukey in his 1977 book of the same name. Tukey's insight was radical for its time: look at the data first. Compute diagnostics. Be suspicious of your assumptions. Formulate hypotheses from the data, not just confirm ones you already had.</p>
<h3>The detective mindset</h3>
<p>Good EDA is investigative. For each dataset, ask:</p>
<ul>
  <li>What does each row represent? (one customer? one transaction? one event?)</li>
  <li>What is the grain of the data?</li>
  <li>What is the date range? Is coverage complete?</li>
  <li>Which columns have the most variation? The least?</li>
  <li>Are there patterns in the missing values?</li>
  <li>What relationships between columns are obvious? Which are surprising?</li>
</ul>
<h3>EDA questions by column type</h3>
<p><strong>Numerical columns</strong>: What is the range? Is the distribution symmetric or skewed? Are there multiple modes? Are there outliers?</p>
<p><strong>Categorical columns</strong>: How many unique values? What is the frequency of the most/least common? Are there near-duplicates (typos, case differences)?</p>
<p><strong>Datetime columns</strong>: What is the earliest/latest date? Are there gaps? Are there seasonal patterns?</p>
` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np

# The first 10 commands on any new dataset
# (Assume df is already loaded)

print("=== FIRST LOOK ===")
print(df.shape)           # how big is it?
print(df.dtypes)          # column types
print(df.head(5))         # first 5 rows
print(df.tail(5))         # last 5 rows — catch truncation issues
print(df.sample(5))       # random 5 — avoids header bias

print("\n=== NUMERIC SUMMARY ===")
print(df.describe().round(2))  # count, mean, std, min, quartiles, max

print("\n=== CATEGORICAL SUMMARY ===")
for col in df.select_dtypes('object'):
    print(f"\n{col}: {df[col].nunique()} unique | top={df[col].mode()[0]}")
    print(df[col].value_counts().head(5))

print("\n=== MISSING VALUES ===")
missing = df.isnull().sum()
print(missing[missing > 0])` }
  ]
};

L['dsf-w4-l2'] = {
  duration_mins: 15,
  sections: [
    { type: 'text', body: `
<h2>Univariate Analysis</h2>
<p>Univariate analysis examines one variable at a time. The goal is to understand each column's distribution before looking at how variables relate to each other. It's quick — but skipping it is one of the most common mistakes beginners make. Outliers, unexpected modes, and truncated ranges are all visible in univariate plots and invisible in summary statistics alone.</p>
<h3>Histograms vs KDE plots</h3>
<p>A <strong>histogram</strong> divides the range of values into equal-width bins and counts how many observations fall in each. The choice of bin count matters — too few hides structure, too many shows noise. A good starting point is the square root of n, or let matplotlib/seaborn choose automatically.</p>
<p>A <strong>KDE (Kernel Density Estimate)</strong> plot is a smoothed version of the histogram. It's better at showing the overall shape of a distribution and supports easy comparison of multiple distributions on the same axes.</p>
` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

sns.set_theme(style='darkgrid', palette='muted')
np.random.seed(42)

# Simulated customer dataset
df = pd.DataFrame({
    'age':     np.random.normal(35, 9, 500).clip(18, 70).round(0),
    'revenue': np.concatenate([np.random.exponential(5000, 480), np.random.uniform(40000, 80000, 20)]),
    'segment': np.random.choice(['Enterprise','SMB','Consumer'], 500, p=[0.1,0.35,0.55])
})

fig, axes = plt.subplots(2, 3, figsize=(15, 8))

# 1. Histogram — Age
axes[0,0].hist(df['age'], bins=20, edgecolor='white', linewidth=0.4, color='steelblue')
axes[0,0].set_title('Age Distribution')
axes[0,0].set_xlabel('Age')

# 2. KDE — Age
sns.kdeplot(df['age'], ax=axes[0,1], fill=True)
axes[0,1].set_title('Age Distribution (KDE)')

# 3. Box plot — Revenue
axes[0,2].boxplot(df['revenue'], vert=True)
axes[0,2].set_title('Revenue Box Plot')
axes[0,2].set_ylabel('Revenue (₹)')

# 4. Histogram — Revenue (skewed)
axes[1,0].hist(df['revenue'], bins=40, edgecolor='white', linewidth=0.4, color='coral')
axes[1,0].set_title('Revenue Distribution (skewed)')

# 5. Log-scaled Revenue
axes[1,1].hist(np.log1p(df['revenue']), bins=30, edgecolor='white', linewidth=0.4, color='mediumseagreen')
axes[1,1].set_title('log(Revenue) — more symmetric')

# 6. Bar chart — Categorical
segment_counts = df['segment'].value_counts()
axes[1,2].bar(segment_counts.index, segment_counts.values, color=['steelblue','coral','gold'], edgecolor='white')
axes[1,2].set_title('Customer Segment Counts')

plt.tight_layout(); plt.show()

# Numeric summary statistics — go beyond mean
print(df['revenue'].describe())
print(f"\nSkewness : {df['revenue'].skew():.2f}")
print(f"Kurtosis : {df['revenue'].kurtosis():.2f}")` }
  ]
};

L['dsf-w4-l3'] = {
  duration_mins: 15,
  sections: [
    { type: 'text', body: `
<h2>Bivariate & Multivariate Analysis</h2>
<p>Univariate analysis tells you about individual variables. Bivariate and multivariate analysis reveal relationships between them — which is where the interesting questions live. Does revenue increase with customer tenure? Do satisfaction scores differ by product category? Is there a correlation between page views and conversion rate?</p>
<h3>Correlation</h3>
<p>The <strong>Pearson correlation coefficient</strong> (r) measures the linear relationship between two numeric variables. It ranges from -1 (perfect negative linear relationship) to +1 (perfect positive). A value near 0 means no <em>linear</em> relationship — but there might still be a non-linear one. Always check with a scatter plot before concluding there's no relationship.</p>
` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

np.random.seed(42)
n = 300
df = pd.DataFrame({
    'tenure_days': np.random.randint(30, 1200, n),
    'num_orders':  np.random.poisson(8, n),
    'revenue':     np.random.normal(15000, 5000, n).clip(1000),
    'satisfaction':np.random.choice([1,2,3,4,5], n, p=[0.05,0.10,0.20,0.40,0.25]),
    'segment':     np.random.choice(['Enterprise','SMB','Consumer'], n, p=[0.1,0.35,0.55])
})
# Add correlations intentionally
df['revenue'] = df['revenue'] + df['tenure_days'] * 10 + df['num_orders'] * 800

fig, axes = plt.subplots(2, 2, figsize=(13, 10))

# 1. Scatter plot with regression line
axes[0,0].scatter(df['tenure_days'], df['revenue'], alpha=0.4, s=20)
m, b = np.polyfit(df['tenure_days'], df['revenue'], 1)
x_range = np.linspace(df['tenure_days'].min(), df['tenure_days'].max(), 100)
axes[0,0].plot(x_range, m*x_range+b, 'r-', linewidth=2)
axes[0,0].set_xlabel('Tenure (days)'); axes[0,0].set_ylabel('Revenue (₹)')
axes[0,0].set_title(f'Tenure vs Revenue  (r = {df["tenure_days"].corr(df["revenue"]):.2f})')

# 2. Correlation heatmap
corr = df[['tenure_days','num_orders','revenue','satisfaction']].corr()
sns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm', ax=axes[0,1],
            linewidths=0.5, vmin=-1, vmax=1)
axes[0,1].set_title('Correlation Matrix')

# 3. Box plot by category
df.boxplot(column='revenue', by='segment', ax=axes[1,0])
axes[1,0].set_title('Revenue by Segment')
axes[1,0].set_xlabel('Segment'); axes[1,0].set_ylabel('Revenue (₹)')

# 4. Pair plot (examine all pairs at once)
# sns.pairplot(df[['tenure_days','num_orders','revenue']], plot_kws={'alpha':0.3})

# Use violin plot as an alternative to pairplot for categorical breakdown
sns.violinplot(data=df, x='segment', y='revenue', ax=axes[1,1], inner='quartile')
axes[1,1].set_title('Revenue Distribution by Segment (Violin)')

plt.tight_layout(); plt.show()` }
  ]
};

L['dsf-w4-l4'] = {
  duration_mins: 14,
  sections: [
    { type: 'text', body: `
<h2>Grouping and Aggregation with pandas</h2>
<p>Groupby operations are among the most powerful tools in data analysis. The pattern is always: <strong>split</strong> the data into groups, <strong>apply</strong> a function to each group, and <strong>combine</strong> the results. pandas makes this three-step process a single chained expression.</p>
` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    'region':   np.random.choice(['North','South','East','West'], 200),
    'category': np.random.choice(['Electronics','Apparel','Books','Home'], 200),
    'revenue':  np.random.normal(8000, 3000, 200).clip(500).round(2),
    'orders':   np.random.randint(1, 20, 200),
    'returns':  np.random.randint(0, 5, 200),
    'month':    np.random.randint(1, 13, 200)
})

# ── Basic groupby ──────────────────────────────────────────────────────
region_summary = df.groupby('region')['revenue'].agg(['sum','mean','count']).round(2)
print("Revenue by Region:\n", region_summary)

# ── Multiple columns and multiple aggregations ─────────────────────────
summary = df.groupby(['region','category']).agg(
    total_revenue = ('revenue', 'sum'),
    avg_revenue   = ('revenue', 'mean'),
    total_orders  = ('orders',  'sum'),
    return_rate   = ('returns', lambda x: x.sum() / df.loc[x.index, 'orders'].sum())
).round(3)
print("\nDetailed Summary:\n", summary.head(8))

# ── Pivot tables — a friendlier groupby for cross-tabulations ──────────
pivot = pd.pivot_table(
    df,
    values='revenue',
    index='region',
    columns='category',
    aggfunc='sum',
    margins=True,          # adds row/column totals
    fill_value=0
).round(0)
print("\nRevenue Pivot Table:\n", pivot)

# ── Transform — group stats without collapsing rows ────────────────────
df['region_avg_revenue'] = df.groupby('region')['revenue'].transform('mean')
df['pct_of_region_avg']  = (df['revenue'] / df['region_avg_revenue'] * 100).round(1)
print("\nFirst 5 rows with group context:\n", df.head())` }
  ]
};

L['dsf-w4-l5'] = {
  duration_mins: 18,
  sections: [
    { type: 'text', body: `
<h2>End-to-End EDA Case Study</h2>
<p>In this lesson we bring together everything from Weeks 3 and 4 — cleaning, type conversion, feature engineering, and exploratory visualisation — into a single coherent analysis of a realistic dataset. This mirrors how you'd approach the first 2–3 hours of a real data science project.</p>
<p>The dataset is a retail transaction log. Each row is one order line: customer, product, date, quantity, and unit price.</p>
` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

sns.set_theme(style='darkgrid')
np.random.seed(42)

# ── Generate a realistic retail dataset ───────────────────────────────
n = 500
categories = {'Electronics':2500,'Apparel':800,'Books':350,'Home':1200,'Beauty':600}
cat_names  = list(categories.keys())
cat_prices = list(categories.values())

df = pd.DataFrame({
    'order_id':    range(1001, 1001+n),
    'customer_id': np.random.randint(100, 160, n),
    'order_date':  pd.date_range('2023-01-01', periods=n, freq='15h')[:n],
    'category':    np.random.choice(cat_names, n, p=[.25,.30,.15,.20,.10]),
    'quantity':    np.random.randint(1, 6, n),
    'unit_price':  [categories[c] * np.random.uniform(0.8,1.3) for c in np.random.choice(cat_names,n,p=[.25,.30,.15,.20,.10])],
    'discount_pct':np.random.choice([0,5,10,15,20], n, p=[.5,.2,.15,.1,.05]),
})
# inject some missing values
df.loc[np.random.choice(n, 15, replace=False), 'unit_price'] = np.nan

# ── Step 1: Quick audit ────────────────────────────────────────────────
print(f"Shape: {df.shape}")
print(f"Date range: {df['order_date'].min().date()} → {df['order_date'].max().date()}")
print(f"Missing values:\n{df.isnull().sum()[df.isnull().sum()>0]}")

# ── Step 2: Clean ─────────────────────────────────────────────────────
df['unit_price'].fillna(df.groupby('category')['unit_price'].transform('median'), inplace=True)

# ── Step 3: Feature engineering ───────────────────────────────────────
df['line_total']    = df['quantity'] * df['unit_price'] * (1 - df['discount_pct']/100)
df['order_month']   = df['order_date'].dt.month
df['order_dow']     = df['order_date'].dt.day_name()
df['order_quarter'] = df['order_date'].dt.quarter

# ── Step 4: EDA visualisation ─────────────────────────────────────────
fig, axes = plt.subplots(2, 3, figsize=(16, 9))
fig.suptitle('Retail Transaction EDA', fontsize=15, fontweight='bold', y=1.01)

# Revenue by category
cat_rev = df.groupby('category')['line_total'].sum().sort_values(ascending=True)
axes[0,0].barh(cat_rev.index, cat_rev.values, color='steelblue')
axes[0,0].set_title('Total Revenue by Category')
axes[0,0].set_xlabel('Revenue (₹)')

# Monthly revenue trend
monthly = df.groupby('order_month')['line_total'].sum()
axes[0,1].plot(monthly.index, monthly.values, marker='o', color='coral')
axes[0,1].set_title('Monthly Revenue Trend')
axes[0,1].set_xlabel('Month'); axes[0,1].set_ylabel('Revenue (₹)')

# Distribution of order values
axes[0,2].hist(df['line_total'], bins=30, edgecolor='white', linewidth=0.4, color='mediumseagreen')
axes[0,2].set_title('Order Value Distribution')
axes[0,2].set_xlabel('Line Total (₹)')

# Top 10 customers
top_customers = df.groupby('customer_id')['line_total'].sum().nlargest(10)
axes[1,0].bar(top_customers.index.astype(str), top_customers.values, color='gold', edgecolor='white')
axes[1,0].set_title('Top 10 Customers by Revenue')
axes[1,0].tick_params(axis='x', rotation=45)

# Day of week distribution
dow_order = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
dow_rev = df.groupby('order_dow')['line_total'].sum().reindex(dow_order)
axes[1,1].bar(range(7), dow_rev.values, color='mediumpurple', edgecolor='white')
axes[1,1].set_xticks(range(7))
axes[1,1].set_xticklabels([d[:3] for d in dow_order])
axes[1,1].set_title('Revenue by Day of Week')

# Discount impact
axes[1,2].scatter(df['discount_pct'], df['line_total'], alpha=0.3, s=15, color='tomato')
axes[1,2].set_title('Discount % vs Order Value')
axes[1,2].set_xlabel('Discount (%)'); axes[1,2].set_ylabel('Line Total (₹)')

plt.tight_layout(); plt.show()

# ── Step 5: Key findings ───────────────────────────────────────────────
print("\n=== KEY FINDINGS ===")
print(f"Top category by revenue : {cat_rev.idxmax()}")
print(f"Best month              : {monthly.idxmax()}")
print(f"Avg order value         : ₹{df['line_total'].mean():,.0f}")
print(f"Avg discount given      : {df['discount_pct'].mean():.1f}%")` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 5 — STATISTICS FOUNDATIONS
══════════════════════════════════════════════════════════════════════════ */

L['dsf-w5-l1'] = {
  duration_mins: 15,
  sections: [
    { type: 'text', body: `
<h2>Descriptive Statistics</h2>
<p>Statistics is the language of uncertainty. Before you can build models or test hypotheses, you need to describe what you have. Descriptive statistics summarise a dataset in a handful of numbers — measures of centre, spread, and shape.</p>
<h3>Measures of central tendency</h3>
<p><strong>Mean</strong> — The arithmetic average. Sensitive to outliers. A single billionaire raises the mean income of a village dramatically.</p>
<p><strong>Median</strong> — The middle value when sorted. Robust to outliers. The median income is a much better "typical" value than the mean for skewed distributions.</p>
<p><strong>Mode</strong> — The most frequent value. Most useful for categorical data. A distribution can be bimodal (two peaks) or multimodal — always plot to check.</p>
<h3>Measures of spread</h3>
<p><strong>Range</strong> — Max minus min. Easy to compute, completely dominated by extremes.</p>
<p><strong>Variance</strong> — Average squared deviation from the mean. Squaring amplifies outliers and changes the units (₹ becomes ₹²).</p>
<p><strong>Standard deviation</strong> — Square root of variance. Back in the original units. Roughly 68% of values in a normal distribution fall within ±1σ, 95% within ±2σ, 99.7% within ±3σ.</p>
<p><strong>IQR</strong> — Q3 − Q1. The range of the middle 50% of the data. Robust to outliers.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import pandas as pd
from scipy import stats

# Two distributions with the same mean but different spreads
np.random.seed(42)
stable_team   = np.random.normal(loc=75, scale=5,  size=100)
volatile_team = np.random.normal(loc=75, scale=20, size=100)

def describe_dist(name, arr):
    print(f"\n{name}")
    print(f"  Mean     : {arr.mean():.2f}")
    print(f"  Median   : {np.median(arr):.2f}")
    print(f"  Std dev  : {arr.std():.2f}")
    print(f"  Variance : {arr.var():.2f}")
    print(f"  IQR      : {np.percentile(arr,75) - np.percentile(arr,25):.2f}")
    print(f"  Skewness : {stats.skew(arr):.3f}")
    print(f"  Kurtosis : {stats.kurtosis(arr):.3f}")
    print(f"  Range    : [{arr.min():.1f}, {arr.max():.1f}]")

describe_dist("Stable Team (σ=5)", stable_team)
describe_dist("Volatile Team (σ=20)", volatile_team)

# Both have mean ≈ 75 — but very different distributions!
import matplotlib.pyplot as plt
fig, ax = plt.subplots(figsize=(9,4))
ax.hist(stable_team,   bins=20, alpha=0.6, label='Stable  (σ=5)',  color='steelblue', edgecolor='white')
ax.hist(volatile_team, bins=20, alpha=0.6, label='Volatile (σ=20)', color='coral',     edgecolor='white')
ax.axvline(75, color='black', linestyle='--', label='Mean = 75')
ax.legend(); ax.set_title('Same Mean, Different Spread')
plt.tight_layout(); plt.show()` }
  ]
};

L['dsf-w5-l2'] = {
  duration_mins: 14,
  sections: [
    { type: 'text', body: `
<h2>Probability Fundamentals</h2>
<p>Probability is the mathematical framework for reasoning about uncertainty. Every machine learning model is, at some level, a probability machine — it assigns likelihoods to outcomes. Understanding the basics of probability makes you a better interpreter of model outputs and a better designer of experiments.</p>
<h3>Core rules</h3>
<p><strong>Addition rule</strong>: P(A or B) = P(A) + P(B) − P(A and B). Subtract the intersection to avoid double-counting. If A and B are mutually exclusive, P(A and B) = 0, so P(A or B) = P(A) + P(B).</p>
<p><strong>Multiplication rule</strong>: P(A and B) = P(A) × P(B|A), where P(B|A) is the probability of B given that A has occurred. If A and B are independent, P(B|A) = P(B), so P(A and B) = P(A) × P(B).</p>
<p><strong>Conditional probability</strong>: P(B|A) = P(A and B) / P(A). "What is the probability of B, given that we know A has happened?"</p>
<p><strong>Bayes' Theorem</strong>: P(A|B) = P(B|A) × P(A) / P(B). This is the foundation of Bayesian statistics and naive Bayes classifiers. It lets you update your belief about A after observing evidence B.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import matplotlib.pyplot as plt

# ── Simulating probability with random experiments ─────────────────────
np.random.seed(42)

# Law of Large Numbers: as n → ∞, empirical probability → true probability
coin_flips = np.random.choice(['H','T'], size=10000)
running_prob_heads = np.cumsum(coin_flips == 'H') / np.arange(1, 10001)

plt.figure(figsize=(10,4))
plt.plot(running_prob_heads, color='steelblue', linewidth=1)
plt.axhline(0.5, color='red', linestyle='--', label='True P(H) = 0.5')
plt.xlabel('Number of flips')
plt.ylabel('Empirical P(H)')
plt.title('Law of Large Numbers: Coin Flip Simulation')
plt.legend(); plt.tight_layout(); plt.show()

# ── Bayes' Theorem: Medical Test Example ──────────────────────────────
# A disease affects 1% of the population (prevalence)
# The test is 95% sensitive and 90% specific
prevalence     = 0.01    # P(Disease)
sensitivity    = 0.95    # P(Positive | Disease)
specificity    = 0.90    # P(Negative | No Disease)
false_pos_rate = 1 - specificity   # P(Positive | No Disease) = 0.10

# P(Positive) = P(Pos|Disease)*P(Disease) + P(Pos|No Disease)*P(No Disease)
p_positive = sensitivity * prevalence + false_pos_rate * (1 - prevalence)

# P(Disease | Positive) — posterior probability after a positive test
p_disease_given_positive = (sensitivity * prevalence) / p_positive
print(f"P(Disease | Positive test) = {p_disease_given_positive:.1%}")
# This is often surprisingly low when the disease is rare!` }
  ]
};

L['dsf-w5-l3'] = {
  duration_mins: 14,
  sections: [
    { type: 'text', body: `
<h2>Probability Distributions</h2>
<p>A probability distribution describes the likelihood of every possible value a random variable can take. Choosing the right distribution for your data is fundamental — it determines which statistical tests are valid, which models are appropriate, and how to interpret uncertainty in your predictions.</p>
<h3>Key distributions in data science</h3>
<p><strong>Normal (Gaussian)</strong>: The bell curve. Arises naturally from sums of many independent random variables (Central Limit Theorem). Symmetric around the mean. Used everywhere from test scores to measurement errors. Parameters: μ (mean) and σ (standard deviation).</p>
<p><strong>Binomial</strong>: Number of successes in n independent trials, each with probability p. Email open rates, quality defect counts, A/B test outcomes. Parameters: n (trials) and p (success probability).</p>
<p><strong>Poisson</strong>: Number of events in a fixed time interval, given a known average rate. Customer arrivals per hour, support tickets per day, fraud alerts per week. Parameter: λ (average rate).</p>
<p><strong>Exponential</strong>: Time between events in a Poisson process. Time until next server failure, time between customer purchases. Parameter: λ (rate).</p>
<p><strong>Uniform</strong>: Every value in a range is equally likely. Random number generation, simulation seeds. Parameters: a (min) and b (max).</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

fig, axes = plt.subplots(2, 3, figsize=(15, 8))
fig.suptitle('Common Probability Distributions', fontsize=14, fontweight='bold')

# 1. Normal
x = np.linspace(-4, 4, 200)
for mu, sigma, color in [(0,1,'steelblue'),(0,0.5,'coral'),(1,1,'mediumseagreen')]:
    axes[0,0].plot(x, stats.norm.pdf(x, mu, sigma), label=f'μ={mu}, σ={sigma}', color=color)
axes[0,0].set_title('Normal Distribution'); axes[0,0].legend(fontsize=8)

# 2. Binomial (n=20 trials, varying p)
k = np.arange(0, 21)
for p, color in [(0.3,'steelblue'),(0.5,'coral'),(0.8,'mediumseagreen')]:
    axes[0,1].bar(k + (p-0.5)*0.15, stats.binom.pmf(k,20,p), width=0.15, label=f'p={p}', color=color, alpha=0.8)
axes[0,1].set_title('Binomial (n=20)'); axes[0,1].legend(fontsize=8)

# 3. Poisson
k = np.arange(0, 20)
for lam, color in [(2,'steelblue'),(5,'coral'),(10,'mediumseagreen')]:
    axes[0,2].bar(k + (lam-5)*0.02, stats.poisson.pmf(k, lam), width=0.2, label=f'λ={lam}', color=color, alpha=0.8)
axes[0,2].set_title('Poisson Distribution'); axes[0,2].legend(fontsize=8)

# 4. Central Limit Theorem demonstration
sample_means = [np.random.exponential(2, 30).mean() for _ in range(3000)]
axes[1,0].hist(sample_means, bins=50, edgecolor='white', linewidth=0.3, color='steelblue', density=True)
x_clt = np.linspace(min(sample_means), max(sample_means), 200)
mu_clt = np.mean(sample_means); std_clt = np.std(sample_means)
axes[1,0].plot(x_clt, stats.norm.pdf(x_clt, mu_clt, std_clt), 'r-', linewidth=2)
axes[1,0].set_title('CLT: Means of Exp(λ=0.5) samples → Normal')

# 5. QQ plot — check normality of real data
data = np.random.normal(50, 10, 200)
stats.probplot(data, dist='norm', plot=axes[1,1])
axes[1,1].set_title('QQ Plot — Normal data → straight line')

# 6. Exponential
x = np.linspace(0, 10, 200)
for lam, color in [(0.5,'steelblue'),(1,'coral'),(2,'mediumseagreen')]:
    axes[1,2].plot(x, stats.expon.pdf(x, scale=1/lam), label=f'λ={lam}', color=color)
axes[1,2].set_title('Exponential Distribution'); axes[1,2].legend(fontsize=8)

plt.tight_layout(); plt.show()` }
  ]
};

L['dsf-w5-l4'] = {
  duration_mins: 16,
  sections: [
    { type: 'text', body: `
<h2>Hypothesis Testing</h2>
<p>Hypothesis testing gives you a principled framework for deciding whether an observation in your data is likely to be a real effect or just random noise. It is the engine behind A/B testing, clinical trials, and quality control.</p>
<h3>The framework</h3>
<ol>
  <li><strong>State the null hypothesis (H₀)</strong>: The "nothing interesting is happening" baseline. Example: "The new checkout page has the same conversion rate as the old one."</li>
  <li><strong>State the alternative hypothesis (H₁)</strong>: What you're trying to show. "The new page has a different conversion rate."</li>
  <li><strong>Choose a significance level (α)</strong>: Your tolerance for false positives. α = 0.05 means you accept a 5% chance of rejecting H₀ when it's actually true.</li>
  <li><strong>Compute the test statistic and p-value</strong>: The p-value is the probability of observing your data (or something more extreme) if H₀ were true.</li>
  <li><strong>Make a decision</strong>: If p &lt; α, reject H₀. If p ≥ α, fail to reject H₀ (you haven't proven it true — you've just failed to find evidence against it).</li>
</ol>
<p><strong>Common trap</strong>: "p &lt; 0.05" does not mean the effect is large or practically important. A study with 1 million participants will find statistically significant differences that are economically meaningless. Always pair statistical significance with <strong>effect size</strong>.</p>
` },
    { type: 'code', lang: 'python', src: `import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

np.random.seed(42)

# ── Scenario: A/B test on email subject lines ──────────────────────────
# Group A (control): old subject line, 1000 emails sent
# Group B (treatment): new subject line, 1000 emails sent
n_a, n_b = 1000, 1000
opens_a = np.random.binomial(1, 0.22, n_a)  # true rate: 22%
opens_b = np.random.binomial(1, 0.27, n_b)  # true rate: 27%

rate_a = opens_a.mean()
rate_b = opens_b.mean()
print(f"Open rate A: {rate_a:.1%}")
print(f"Open rate B: {rate_b:.1%}")
print(f"Observed lift: {(rate_b - rate_a)/rate_a:.1%}")

# ── Two-proportion z-test ─────────────────────────────────────────────
count = np.array([opens_a.sum(), opens_b.sum()])
nobs  = np.array([n_a, n_b])
from statsmodels.stats.proportion import proportions_ztest
z_stat, p_value = proportions_ztest(count, nobs)
print(f"\nZ-statistic : {z_stat:.3f}")
print(f"P-value     : {p_value:.4f}")
print(f"Significant at α=0.05? {'YES' if p_value < 0.05 else 'NO'}")

# ── Independent samples t-test (continuous outcome) ───────────────────
group_a_revenue = np.random.normal(4500, 1200, 80)
group_b_revenue = np.random.normal(4900, 1200, 80)

t_stat, p_value_t = stats.ttest_ind(group_a_revenue, group_b_revenue)
print(f"\nRevenue t-test: t={t_stat:.3f}, p={p_value_t:.4f}")

# Effect size: Cohen's d
cohens_d = (group_b_revenue.mean() - group_a_revenue.mean()) / (
    np.sqrt((group_a_revenue.std()**2 + group_b_revenue.std()**2) / 2))
print(f"Cohen's d (effect size): {cohens_d:.3f}")
print("Interpretation: <0.2 trivial, 0.2-0.5 small, 0.5-0.8 medium, >0.8 large")` }
  ]
};

L['dsf-w5-l5'] = {
  duration_mins: 13,
  sections: [
    { type: 'text', body: `
<h2>Correlation vs Causation</h2>
<p>This is the most important conceptual distinction in data science. Correlation means two variables move together. Causation means one variable <em>causes</em> the other to change. Confusing the two leads to costly mistakes: interventions that don't work, policies built on spurious associations, and models that perform well in the past but fail in the future because the data-generating process has changed.</p>
<h3>Why correlations appear without causation</h3>
<p><strong>Confounding variables</strong>: A third variable causes both. Ice cream sales and drowning deaths are correlated — because both increase in hot weather. Hot weather is the confounder. Banning ice cream would not reduce drownings.</p>
<p><strong>Reverse causation</strong>: You have the direction backwards. Hospitals have sicker patients — hospital stays don't make you sick. Companies with more lawyers face more lawsuits — lawyers don't cause lawsuits.</p>
<p><strong>Spurious correlations</strong>: With enough variables, you will find correlations by pure chance. The number of films Nicolas Cage appeared in correlates with the number of pool drownings (r ≈ 0.67). This is noise masquerading as signal.</p>
<h3>How to establish causation</h3>
<p>The gold standard is a <strong>randomised controlled experiment (RCT)</strong>: randomly assign subjects to treatment and control, then measure the outcome. Randomisation balances confounders across groups. When RCTs are impossible (unethical, too expensive, or observational), analysts use techniques like difference-in-differences, instrumental variables, or regression discontinuity to approximate causal inference from observational data.</p>
` },
    { type: 'tip', body: `Before making any recommendation based on a correlation, ask: "Could there be a confounder? Could the direction be reversed? Could this be spurious?" If the answer to any is "yes," be explicit about the limitation in your report.` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 6 — STORYTELLING & NEXT STEPS
══════════════════════════════════════════════════════════════════════════ */

L['dsf-w6-l1'] = {
  duration_mins: 13,
  sections: [
    { type: 'text', body: `
<h2>Data Visualization Principles</h2>
<p>A chart that requires explanation has failed. Good data visualisation communicates a single, clear insight at a glance — it does not simply display data. Every visual element (colour, size, position, shape) must earn its place by encoding meaningful information.</p>
<h3>The hierarchy of visual encodings</h3>
<p>Research by Cleveland and McGill (1984) established that humans perceive different visual attributes with different accuracy, from most accurate to least:</p>
<ol>
  <li><strong>Position along a common scale</strong> — Bar charts, dot plots. Easiest to read accurately.</li>
  <li><strong>Position along non-aligned scales</strong> — Scatter plots.</li>
  <li><strong>Length</strong> — Bar lengths, line lengths.</li>
  <li><strong>Angle/slope</strong> — Pie charts, line angles. Harder to compare accurately.</li>
  <li><strong>Area</strong> — Bubble charts. We systematically underestimate areas.</li>
  <li><strong>Colour saturation/hue</strong> — Heat maps. Only for approximate comparisons.</li>
</ol>
<h3>Choosing the right chart type</h3>
<p><strong>Comparison</strong>: Bar chart (few categories), dot plot (many categories).<br>
<strong>Distribution</strong>: Histogram, KDE plot, box plot, violin plot.<br>
<strong>Relationship</strong>: Scatter plot (two variables), bubble chart (three), heatmap (matrix of correlations).<br>
<strong>Composition</strong>: Stacked bar (absolute), 100% stacked bar (proportional). Avoid pie charts — they require reading angles.<br>
<strong>Time series</strong>: Line chart. Use bars only for discrete time periods (monthly totals).</p>
` }
  ]
};

L['dsf-w6-l2'] = {
  duration_mins: 16,
  sections: [
    { type: 'text', body: `
<h2>Matplotlib & Seaborn Fundamentals</h2>
<p>matplotlib is the foundation of Python visualisation — powerful, flexible, and verbose. Seaborn is a higher-level wrapper that produces beautiful statistical charts in far fewer lines. In practice, you use seaborn for most charts and drop down to matplotlib when you need precise control over every element.</p>
` },
    { type: 'code', lang: 'python', src: `import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd

sns.set_theme(style='darkgrid', palette='muted', font_scale=1.05)
np.random.seed(42)

# Simulate employee performance data
df = pd.DataFrame({
    'dept':        np.random.choice(['Engineering','Sales','Marketing','Support'], 200),
    'experience':  np.random.uniform(0, 15, 200).round(1),
    'salary':      np.random.normal(70000, 20000, 200).clip(30000, 150000).round(-2),
    'performance': np.random.normal(75, 15, 200).clip(30, 100).round(1),
    'tenure':      np.random.randint(1, 10, 200)
})
# Add realistic correlation
df['salary'] += df['experience'] * 4000

fig = plt.figure(figsize=(16, 10))
gs = fig.add_gridspec(2, 3, hspace=0.4, wspace=0.3)

# 1. Seaborn histplot (improved histogram)
ax1 = fig.add_subplot(gs[0,0])
sns.histplot(df, x='salary', hue='dept', kde=True, ax=ax1, bins=20)
ax1.set_title('Salary Distribution by Dept')

# 2. Seaborn scatterplot with regression line
ax2 = fig.add_subplot(gs[0,1])
sns.regplot(data=df, x='experience', y='salary', ax=ax2,
            scatter_kws={'alpha':0.4,'s':20}, line_kws={'color':'red'})
ax2.set_title('Experience vs Salary')

# 3. Seaborn boxplot
ax3 = fig.add_subplot(gs[0,2])
sns.boxplot(data=df, x='dept', y='performance', ax=ax3, palette='muted')
ax3.set_title('Performance by Department')
ax3.tick_params(axis='x', rotation=20)

# 4. Seaborn heatmap (correlation matrix)
ax4 = fig.add_subplot(gs[1,0])
corr = df[['experience','salary','performance','tenure']].corr()
sns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm', ax=ax4,
            linewidths=0.5, vmin=-1, vmax=1, square=True)
ax4.set_title('Correlation Matrix')

# 5. Seaborn barplot with confidence intervals
ax5 = fig.add_subplot(gs[1,1])
sns.barplot(data=df, x='dept', y='salary', ax=ax5, errorbar='ci', palette='muted')
ax5.set_title('Mean Salary ± 95% CI by Dept')
ax5.tick_params(axis='x', rotation=20)

# 6. Polished line chart (matplotlib)
ax6 = fig.add_subplot(gs[1,2])
quarterly = df.groupby(df.index // 50)['salary'].mean()
ax6.plot(quarterly.index, quarterly.values, marker='o', linewidth=2, color='steelblue')
ax6.fill_between(quarterly.index, quarterly.values, alpha=0.2, color='steelblue')
ax6.set_title('Average Salary by Cohort')
ax6.set_xlabel('Cohort'); ax6.set_ylabel('Mean Salary (₹)')

plt.suptitle('Employee Analytics Dashboard', fontsize=14, fontweight='bold', y=1.01)
plt.show()` }
  ]
};

L['dsf-w6-l3'] = {
  duration_mins: 12,
  sections: [
    { type: 'text', body: `
<h2>Writing Data Science Reports</h2>
<p>The best analysis in the world has zero value if nobody reads it or nobody understands it. Writing clearly is a core professional skill for data scientists, not a nice-to-have.</p>
<h3>Structure of an effective data science report</h3>
<ol>
  <li><strong>Executive Summary</strong> (1 paragraph): What did you find? What should stakeholders do? Written for people who will read only this section.</li>
  <li><strong>Business Context</strong>: What question were you answering? Why does it matter? What was the success criterion?</li>
  <li><strong>Data Description</strong>: What data did you use? What is its source, date range, and quality?</li>
  <li><strong>Methodology</strong>: What did you do? Enough detail for a colleague to reproduce your work, not a line-by-line code listing.</li>
  <li><strong>Findings</strong>: What did the analysis show? Each finding gets its own section with a chart or table. Lead with the insight, not the method.</li>
  <li><strong>Limitations</strong>: What can't you conclude? What assumptions did you make? Being honest about limits builds trust.</li>
  <li><strong>Recommendations</strong>: Specific, actionable. "Consider testing X" is not a recommendation. "Run a 14-day A/B test targeting users who…" is.</li>
</ol>
<h3>Writing principles</h3>
<p><strong>Lead with the finding</strong>: "Revenue grew 23% in Q3, driven by the Electronics category" is better than "We observed that when examining the revenue data segmented by category over the third quarter of the year, the Electronics category…"</p>
<p><strong>Every chart needs a title that is a sentence</strong>: "Electronics Revenue Grew 3× Faster than Average in Q3" is better than "Revenue by Category".</p>
<p><strong>Numbers need context</strong>: ₹2.3 lakh in revenue means nothing without a comparison. Is that good or bad relative to last year? Relative to target?</p>
` }
  ]
};

L['dsf-w6-l4'] = {
  duration_mins: 12,
  sections: [
    { type: 'text', body: `
<h2>Building Your Data Science Portfolio</h2>
<p>In data science, your portfolio is your CV. Hiring managers look at what you've built, not just what you claim to know. A well-constructed GitHub profile with 3–5 substantial projects signals competence more powerfully than a list of course certificates.</p>
<h3>What makes a strong portfolio project</h3>
<p><strong>A real question</strong>: Not "I applied random forest to the Titanic dataset." Instead: "I analysed 3 years of food delivery order data and built a demand forecasting model that beats a seasonal naive baseline by 18% MAPE."</p>
<p><strong>End-to-end</strong>: Data collection → cleaning → EDA → modelling → evaluation → communication. A half-finished notebook that stops at EDA is weak. A notebook that walks through the whole pipeline, explains decisions, and draws conclusions is strong.</p>
<p><strong>Domain variety</strong>: Show you can apply your skills in different contexts. One project on finance, one on healthcare, one on e-commerce is more impressive than three projects on the same Kaggle dataset.</p>
<p><strong>Clean code and clear communication</strong>: Notebooks should be readable by someone who wasn't there. Use markdown cells to explain your reasoning. Name variables meaningfully. Write a proper README.</p>
<h3>Project ideas to get started</h3>
<ul>
  <li>EDA of any public dataset (government data, Kaggle, data.world) — pick one you're genuinely curious about</li>
  <li>Customer churn prediction on a telecom or SaaS dataset</li>
  <li>Time series forecasting on stock prices, weather, or website traffic</li>
  <li>Sentiment analysis of product reviews or news articles</li>
  <li>Build a simple dashboard with Plotly Dash or Streamlit and deploy it to the cloud</li>
</ul>
` },
    { type: 'tip', body: `Kaggle is a great starting point, but stand out by going further than the competition leaderboard. Write a Medium article or a LinkedIn post about what you found. Demonstrating communication skills — not just model accuracy — is what gets you interviews.` }
  ]
};

L['dsf-w6-l5'] = {
  duration_mins: 25,
  sections: [
    { type: 'text', body: `
<h2>Capstone — Full EDA Pipeline</h2>
<p>This capstone brings together every skill from the course: data loading, quality assessment, cleaning, feature engineering, statistical analysis, and professional visualisation. You'll build a complete, end-to-end analysis that could be presented to a business stakeholder.</p>
<p><strong>The scenario</strong>: You've been given a dataset of e-commerce customer transactions. Your task is to profile the customer base, identify high-value segments, understand purchasing patterns, and produce a short set of business recommendations.</p>
` },
    { type: 'code', lang: 'python', src: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

sns.set_theme(style='darkgrid', palette='muted')
np.random.seed(42)

# ══════════════════════════════════════════════════════════════════════
# STEP 1: Generate realistic dataset
# ══════════════════════════════════════════════════════════════════════
n_customers = 500
n_txns      = 2000

customers = pd.DataFrame({
    'customer_id': range(1, n_customers+1),
    'city':        np.random.choice(['Mumbai','Delhi','Bangalore','Chennai','Pune','Hyderabad'], n_customers, p=[.25,.20,.20,.15,.10,.10]),
    'age':         np.random.normal(32, 9, n_customers).clip(18, 65).round(0).astype(int),
    'gender':      np.random.choice(['M','F','Other'], n_customers, p=[.48,.48,.04]),
    'signup_date': pd.to_datetime('2022-01-01') + pd.to_timedelta(np.random.randint(0,730,n_customers), 'd'),
})

txns = pd.DataFrame({
    'txn_id':      range(10001, 10001+n_txns),
    'customer_id': np.random.randint(1, n_customers+1, n_txns),
    'txn_date':    pd.to_datetime('2023-01-01') + pd.to_timedelta(np.random.randint(0,365,n_txns),'d'),
    'category':    np.random.choice(['Electronics','Apparel','Books','Home','Beauty'], n_txns, p=[.20,.30,.15,.25,.10]),
    'amount':      np.random.lognormal(8.5, 0.8, n_txns).round(2),
    'is_returned': np.random.choice([True,False], n_txns, p=[.08,.92]),
})

# ══════════════════════════════════════════════════════════════════════
# STEP 2: Data quality check
# ══════════════════════════════════════════════════════════════════════
print("=== DATA QUALITY ===")
print(f"Customers: {customers.shape} | Missing: {customers.isnull().sum().sum()}")
print(f"Transactions: {txns.shape} | Missing: {txns.isnull().sum().sum()}")
print(f"Date range: {txns['txn_date'].min().date()} → {txns['txn_date'].max().date()}")
print(f"Amount range: ₹{txns['amount'].min():.0f} — ₹{txns['amount'].max():.0f}")
print(f"Return rate: {txns['is_returned'].mean():.1%}")

# ══════════════════════════════════════════════════════════════════════
# STEP 3: Feature engineering
# ══════════════════════════════════════════════════════════════════════
# Customer-level aggregates
cust_stats = txns.groupby('customer_id').agg(
    total_orders  = ('txn_id',     'count'),
    total_spend   = ('amount',     'sum'),
    avg_order_val = ('amount',     'mean'),
    return_count  = ('is_returned','sum'),
    first_order   = ('txn_date',   'min'),
    last_order    = ('txn_date',   'max'),
    fav_category  = ('category',   lambda x: x.mode()[0])
).reset_index()

cust_stats['days_active']   = (cust_stats['last_order'] - cust_stats['first_order']).dt.days
cust_stats['return_rate']   = cust_stats['return_count'] / cust_stats['total_orders']
cust_stats['avg_days_btw']  = cust_stats['days_active'] / cust_stats['total_orders'].clip(lower=1)

# Merge with demographics
df = customers.merge(cust_stats, on='customer_id', how='left')
# Customers with no 2023 transactions
df['total_orders'].fillna(0, inplace=True)
df['total_spend'].fillna(0, inplace=True)

# ══════════════════════════════════════════════════════════════════════
# STEP 4: RFM Segmentation (Recency, Frequency, Monetary)
# ══════════════════════════════════════════════════════════════════════
snapshot = pd.Timestamp('2024-01-01')
rfm = txns.groupby('customer_id').agg(
    recency   = ('txn_date',  lambda x: (snapshot - x.max()).days),
    frequency = ('txn_id',    'count'),
    monetary  = ('amount',    'sum')
).reset_index()

# Score each dimension 1–5 (5 = best)
rfm['R'] = pd.qcut(rfm['recency'],   5, labels=[5,4,3,2,1])  # lower recency = better
rfm['F'] = pd.qcut(rfm['frequency'].rank(method='first'), 5, labels=[1,2,3,4,5])
rfm['M'] = pd.qcut(rfm['monetary'].rank(method='first'),  5, labels=[1,2,3,4,5])

rfm['RFM_score'] = rfm[['R','F','M']].astype(int).sum(axis=1)

def segment(score):
    if score >= 12: return 'Champion'
    if score >= 9:  return 'Loyal'
    if score >= 6:  return 'At Risk'
    return 'Lost'
rfm['segment'] = rfm['RFM_score'].apply(segment)

print(f"\n=== RFM SEGMENTS ===")
print(rfm['segment'].value_counts())

# ══════════════════════════════════════════════════════════════════════
# STEP 5: Visualisation
# ══════════════════════════════════════════════════════════════════════
fig, axes = plt.subplots(2, 3, figsize=(16, 9))
fig.suptitle('E-Commerce Customer Analysis 2023', fontsize=14, fontweight='bold')

# Revenue by category
cat_rev = txns.groupby('category')['amount'].sum().sort_values(ascending=True)
axes[0,0].barh(cat_rev.index, cat_rev.values, color='steelblue')
axes[0,0].set_title('Total Revenue by Category')

# Monthly trend
monthly = txns.groupby(txns['txn_date'].dt.month)['amount'].sum()
axes[0,1].plot(monthly.index, monthly.values, marker='o', color='coral', linewidth=2)
axes[0,1].set_title('Monthly Revenue Trend')
axes[0,1].set_xlabel('Month')

# RFM segments
seg_rev = rfm.merge(txns.groupby('customer_id')['amount'].sum(), on='customer_id')
seg_summary = seg_rev.groupby('segment')['amount'].sum().sort_values(ascending=False)
colors = ['#FFD700','#4682B4','#FF6B6B','#95A5A6']
axes[0,2].bar(seg_summary.index, seg_summary.values, color=colors[:len(seg_summary)])
axes[0,2].set_title('Revenue by RFM Segment')

# Age distribution by gender
for gender, color in [('M','steelblue'),('F','coral')]:
    subset = df[df['gender']==gender]['age'].dropna()
    axes[1,0].hist(subset, bins=20, alpha=0.6, label=gender, color=color, edgecolor='white')
axes[1,0].set_title('Age Distribution by Gender')
axes[1,0].legend()

# City breakdown
city_spend = df.groupby('city')['total_spend'].mean().sort_values(ascending=False)
axes[1,1].bar(city_spend.index, city_spend.values, color='mediumseagreen', edgecolor='white')
axes[1,1].set_title('Avg Customer Spend by City')
axes[1,1].tick_params(axis='x', rotation=30)

# Return rate by category
ret_rate = txns.groupby('category')['is_returned'].mean().sort_values(ascending=False)
axes[1,2].bar(ret_rate.index, ret_rate.values * 100, color='tomato', edgecolor='white')
axes[1,2].set_title('Return Rate by Category (%)')
axes[1,2].set_ylabel('%')

plt.tight_layout(); plt.show()

# ══════════════════════════════════════════════════════════════════════
# STEP 6: Key findings
# ══════════════════════════════════════════════════════════════════════
print("\n=== RECOMMENDATIONS ===")
champ_pct  = (rfm['segment']=='Champion').mean()
at_risk_pct= (rfm['segment']=='At Risk').mean()
top_cat    = cat_rev.idxmax()
high_ret   = ret_rate.idxmax()
print(f"1. {champ_pct:.0%} of customers are Champions — prioritise retention with loyalty rewards.")
print(f"2. {at_risk_pct:.0%} are At Risk — launch a win-back campaign within 30 days.")
print(f"3. {top_cat} drives the highest revenue — increase inventory and targeted ads.")
print(f"4. {high_ret} has the highest return rate ({ret_rate.max():.0%}) — review product descriptions or sizing guides.")` }
  ]
};

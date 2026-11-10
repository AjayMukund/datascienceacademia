/* ─────────────────────────────────────────────────────────
   DSA Blog — Post Data
   Add new posts to the TOP of the array (newest first).
   Fields: slug, title, category, catLabel, date, dateDisplay,
           readTime, excerpt, body (HTML string)
   Optional: seoTitle (shorter <title>), draft: true (local preview only —
           rendered to blog/<slug>.draft.html, never published)
───────────────────────────────────────────────────────── */

const CAT_STYLE = {
  tutorial:  { color: '#3ecfb2', border: 'rgba(62,207,178,.28)',  bg: 'rgba(62,207,178,.07)'  },
  career:    { color: '#c8a96e', border: 'rgba(200,169,110,.28)', bg: 'rgba(200,169,110,.07)' },
  industry:  { color: '#7a9fff', border: 'rgba(122,159,255,.28)', bg: 'rgba(122,159,255,.07)' },
  research:  { color: '#c792ea', border: 'rgba(199,146,234,.28)', bg: 'rgba(199,146,234,.07)' },
};

const POSTS = [
  /* ── Career roadmap 2026 (supersedes the 2025 guide below) ── */
  {
    slug: 'data-science-career-india-2026',
    cover: 'Website Images/Blog - Data Science Career in India 2025.jpeg',
    title: 'Building a Data Science Career in India: The 2026 Roadmap',
    seoTitle: 'Data Science Career in India: 2026 Roadmap',
    category: 'career',
    catLabel: 'Career',
    date: '2026-11-10',
    dateDisplay: 'November 10, 2026',
    readTime: '9 min read',
    excerpt: 'What actually gets you hired in Indian data teams in 2026 — the roles, the skills, how generative AI changed the bar, real salary data, and a 6-month plan you can start this week.',
    body: `
<p>A year ago we wrote that the Indian data science market had grown up. In 2026 it has also changed shape. Generative AI is now part of everyday work, entry-level hiring rewards proof over promises, and the gap between candidates who can <em>ship</em> something and candidates who can only describe it has never been wider. This is our honest roadmap for the year ahead.</p>

<h2>What changed since 2025</h2>
<ul>
<li><strong>GenAI is a tool, not a job title.</strong> Most teams now expect analysts and data scientists to use LLMs for code, SQL drafts and summarisation — and to know when not to trust them. Knowing how to evaluate model output matters more than knowing every new model name.</li>
<li><strong>Fundamentals are back in fashion.</strong> Because anyone can generate code, interviews lean harder on reasoning: why this metric, why this model, what could go wrong. SQL and statistics rounds have become more important, not less.</li>
<li><strong>Portfolios are checked.</strong> Interviewers open your GitHub and ask you to walk through a decision you made. A project you cannot explain line by line now counts against you.</li>
</ul>

<h2>The four roles — and where freshers really start</h2>
<ul>
<li><strong>Data Analyst:</strong> SQL, Excel, Power BI or Tableau, and clear business answers. The most common first job.</li>
<li><strong>Data Scientist:</strong> statistics, machine learning, experimentation. Usually reached after 1–3 years of analyst or junior work, or straight from a strong project portfolio.</li>
<li><strong>ML Engineer:</strong> putting models into production — APIs, Docker, monitoring, MLOps. Closer to software engineering.</li>
<li><strong>GenAI / LLM Engineer:</strong> retrieval-augmented generation (RAG), prompt and evaluation pipelines, fine-tuning. Growing fast, but it rewards people who already have Python and ML foundations.</li>
</ul>
<p>Our advice to most students: aim for an analyst or junior data scientist role first, and build towards ML or GenAI engineering from there. Skipping the foundations is the most common reason strong-looking candidates fail interviews.</p>

<h2>The skills that get you hired in 2026</h2>
<h3>Non-negotiable</h3>
<ul>
<li><strong>SQL</strong> — joins, window functions, CTEs. Expect a written SQL round almost everywhere.</li>
<li><strong>Python</strong> — Pandas, NumPy and scikit-learn, well enough to go from a raw CSV to an evaluated model without copy-pasting.</li>
<li><strong>Statistics</strong> — distributions, hypothesis tests, confidence intervals, A/B testing. You should be able to explain a p-value to a manager.</li>
</ul>
<h3>Differentiators</h3>
<ul>
<li><strong>One BI tool, properly</strong> — a published dashboard beats a list of tools on your CV. (See <a href="power-bi-vs-tableau.html">Power BI vs Tableau</a>.)</li>
<li><strong>Working with LLMs responsibly</strong> — a small RAG or classification project with an honest evaluation section.</li>
<li><strong>Deployment basics</strong> — a model served through FastAPI or a Streamlit app that someone else can open.</li>
<li><strong>Communication</strong> — a one-page write-up of a project that a non-technical person can follow.</li>
</ul>

<h2>Salary expectations in 2026 — real data, read carefully</h2>
<p>Salary numbers on social media are usually the top of the market. Here is what self-reported data shows for India, from <a href="https://www.payscale.com/research/IN/Job=Data_Scientist/Salary" target="_blank" rel="noopener">PayScale (Data Scientist, updated September 2026, 1,122 profiles)</a> and <a href="https://www.payscale.com/research/IN/Job=Data_Analyst/Salary" target="_blank" rel="noopener">PayScale (Data Analyst, updated October 2026, 2,081 profiles)</a>:</p>
<ul>
<li><strong>Data Analyst</strong> — average base about <strong>₹5.8 LPA</strong>; most profiles between about ₹2.9 LPA and ₹10 LPA. Entry level (under 1 year): about ₹4.1 LPA total pay.</li>
<li><strong>Data Scientist</strong> — average base about <strong>₹10.1 LPA</strong>; most profiles between about ₹3.1 LPA and ₹20 LPA. Entry level: about ₹6 LPA; early career (1–4 years): about ₹10 LPA total pay.</li>
</ul>
<p>Three things to keep in mind:</p>
<ol>
<li>These are averages across all company types and cities. Product companies and global capability centres in Bengaluru, Hyderabad and Chennai typically pay above them; small services firms below.</li>
<li>The jump from analyst to data scientist roughly doubles the typical salary — which is why investing in statistics and ML pays off.</li>
<li>Your first offer matters less than your second. Skills you can demonstrate decide how fast you grow after year one.</li>
</ol>

<h2>On certifications</h2>
<p>A certificate tells an employer you finished a structured programme; it does not replace demonstrated skill. Proctored, exam-based certifications from cloud providers — for example Microsoft's Azure and Power BI exams — carry more weight than video-completion certificates, especially for analyst and cloud roles. Pair any certificate with a project that uses the same skills.</p>
<blockquote>Certifications open doors. Projects decide what happens inside the room.</blockquote>

<h2>A 6-month plan you can start this week</h2>
<ol>
<li><strong>Month 1 — Python and SQL.</strong> One hour a day. Finish with a cleaned, analysed public dataset on GitHub.</li>
<li><strong>Month 2 — Statistics and a BI tool.</strong> Rebuild your month-1 analysis as an interactive dashboard and publish it.</li>
<li><strong>Months 3–4 — Machine learning.</strong> Two end-to-end projects in a domain you understand: problem, data, model, evaluation, limitations.</li>
<li><strong>Month 5 — One GenAI project.</strong> A small RAG assistant over documents you care about, with an honest evaluation of where it fails.</li>
<li><strong>Month 6 — Interview preparation.</strong> Timed SQL practice, two mock case studies, and a one-page write-up for each project.</li>
</ol>
<p>Strong project areas for the Indian market: demand forecasting, credit risk or fraud detection, customer churn, NLP on Indian-language text, and computer vision for agriculture or healthcare.</p>

<h2>Where to go from here</h2>
<p>If you want a structured version of this plan with live mentoring, the <a href="../programmes/ai-mastery.html">12-month AI Mastery Track</a> follows the same order — foundations, analytics, machine learning, then advanced AI — with a capstone project every quarter. If you want to start smaller, begin with <a href="../courses/python.html">Python Programming</a> and <a href="../courses/sql.html">SQL for Data Science</a>.</p>
<p>The market rewards depth over breadth. Pick the next step, and start this week.</p>
    `
  },

  /* ── Python vs R ── */
  {
    slug: 'python-vs-r-for-data-science',
    cover: 'foundation-category-banner',
    title: 'Python or R: Which Should You Learn First for Data Science?',
    seoTitle: 'Python vs R for Data Science: Which First?',
    category: 'tutorial',
    catLabel: 'Tutorial',
    date: '2026-11-10',
    dateDisplay: 'November 10, 2026',
    readTime: '7 min read',
    excerpt: 'Both languages are excellent — but they are built for different people and different jobs. A side-by-side comparison with real code, and a clear answer for students, researchers and working professionals.',
    body: `
<p>It is one of the first questions every new student asks us: <em>should I learn Python or R?</em> The honest answer is that both are excellent, both are free, and you will probably use both at some point. But you have to start somewhere — and the right first choice depends on what you want to do.</p>

<h2>The short answer</h2>
<ul>
<li><strong>Learn Python first</strong> if you want a job in industry — data analyst, data scientist, ML or GenAI engineer. It is the language of production systems and almost every AI library.</li>
<li><strong>Learn R first</strong> if your work is research or statistics-heavy — a Ph.D., clinical or social-science research, survey analysis, or publishing papers.</li>
</ul>
<p>If you are not sure, start with Python. It keeps more doors open.</p>

<h2>The same task in both languages</h2>
<p>Here is a common first exercise: load a CSV, find the average salary by department, and plot it.</p>
<h3>Python (pandas + matplotlib)</h3>
<pre><code>import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("employees.csv")
avg = df.groupby("department")["salary"].mean().sort_values()

avg.plot(kind="barh", title="Average salary by department")
plt.tight_layout()
plt.show()</code></pre>
<h3>R (tidyverse)</h3>
<pre><code>library(tidyverse)

df &lt;- read_csv("employees.csv")

df |&gt;
  group_by(department) |&gt;
  summarise(avg_salary = mean(salary)) |&gt;
  ggplot(aes(x = avg_salary, y = reorder(department, avg_salary))) +
  geom_col() +
  labs(title = "Average salary by department", x = NULL, y = NULL)</code></pre>
<p>Both are short and readable. R's pipe-and-grammar style feels natural for analysis; Python reads more like a general programming language — which is exactly the point.</p>

<h2>Where each language wins</h2>
<h3>Python</h3>
<ul>
<li><strong>Machine learning and AI:</strong> scikit-learn, PyTorch, TensorFlow, Hugging Face and nearly every LLM toolkit are Python-first.</li>
<li><strong>Production:</strong> web APIs, automation scripts, data pipelines and cloud services all speak Python.</li>
<li><strong>Jobs:</strong> most data and AI job descriptions in India list Python; far fewer require R.</li>
<li><strong>One language for everything:</strong> the same skills carry over to backend development, automation and scripting.</li>
</ul>
<h3>R</h3>
<ul>
<li><strong>Statistics:</strong> classical and modern statistical methods often appear in R packages first, written by the statisticians who invented them.</li>
<li><strong>Visualisation:</strong> ggplot2 remains one of the most elegant ways to build publication-quality charts.</li>
<li><strong>Reproducible research:</strong> R Markdown and Quarto make it easy to combine code, results and writing into a single report or paper.</li>
<li><strong>Academia:</strong> widely used in biostatistics, epidemiology, economics and the social sciences.</li>
</ul>

<h2>Our recommendation by goal</h2>
<ul>
<li><strong>Engineering or BCA/MCA student aiming for a data job:</strong> Python, then SQL. Add R later only if a role asks for it.</li>
<li><strong>Working professional moving into analytics:</strong> Python plus a BI tool such as Power BI.</li>
<li><strong>M.Sc. statistics or Ph.D. scholar:</strong> R for your analysis and thesis; Python when you need machine learning or deep learning.</li>
<li><strong>Faculty member:</strong> whichever your department's curriculum uses — and the other one as a second language within a year.</li>
</ul>
<blockquote>The language matters less than the habits: clean data, honest statistics and results someone else can reproduce.</blockquote>

<h2>Learning one makes the second much easier</h2>
<p>The hard parts of data science — thinking in tables, cleaning messy data, choosing the right statistical test — are the same in both languages. Once you are comfortable in one, most people can work productively in the other within a few weeks.</p>

<h2>Start with us</h2>
<p>Our <a href="../courses/python.html">Python Programming</a> course is built for absolute beginners and ends with a real exploratory data analysis project. If your path is research, <a href="../courses/r-programming.html">R Programming</a> covers the tidyverse, ggplot2 and R Markdown end to end. Not sure which fits? Book a free trial session and we will help you decide.</p>
    `
  },

  /* ── Power BI vs Tableau ── */
  {
    slug: 'power-bi-vs-tableau',
    cover: 'analytics-category-banner',
    title: 'Power BI vs Tableau: Which Should an Analyst in India Learn First?',
    seoTitle: 'Power BI vs Tableau: Which to Learn First?',
    category: 'career',
    catLabel: 'Career',
    date: '2026-11-10',
    dateDisplay: 'November 10, 2026',
    readTime: '7 min read',
    excerpt: 'Both are industry-standard BI tools. We compare them on cost, learning curve, job demand in India and the kind of dashboards each does best — and give a clear recommendation.',
    body: `
<p>If you want to become a data analyst, you will need at least one business intelligence (BI) tool on your CV. In India, that choice almost always comes down to <strong>Microsoft Power BI</strong> or <strong>Tableau</strong>. Both are excellent. Here is how to choose the one to learn first.</p>

<h2>The short answer</h2>
<p><strong>Learn Power BI first</strong> if you are a student or early-career analyst in India. It is free to start, it fits naturally with Excel, and it is widely used by the services companies, banks and enterprises where most analysts get their first job. <strong>Add Tableau</strong> when a target employer uses it, or when your work is centred on visual storytelling and data exploration.</p>

<h2>Cost: what you need to start</h2>
<ul>
<li><strong>Power BI Desktop is a free download</strong> — you can build complete reports on your laptop without paying anything. Sharing reports inside an organisation needs a paid licence; Microsoft lists Power BI Pro at ₹1,165 per user per month and Premium Per User at ₹1,995 per user per month, billed yearly plus GST (<a href="https://www.microsoft.com/en-in/power-platform/products/power-bi/pricing" target="_blank" rel="noopener">Microsoft India pricing page</a>, checked November 2026).</li>
<li><strong>Tableau</strong> is licensed per user, with different roles for people who build and people who only view dashboards. Check <a href="https://www.tableau.com/pricing" target="_blank" rel="noopener">Tableau's pricing page</a> for current figures. Learners can practise with <strong>Tableau Public</strong>, the free edition — note that anything you save there is published publicly.</li>
</ul>
<p>For a student, both are effectively free to learn. For a company, cost depends on how many people need to create or view reports.</p>

<h2>Learning curve</h2>
<ul>
<li><strong>Power BI</strong> feels familiar to anyone who knows Excel. Data preparation happens in <em>Power Query</em> (the same engine as in Excel), and calculations are written in <em>DAX</em>. Basic reports come quickly; DAX takes real practice to master.</li>
<li><strong>Tableau</strong> is famous for its drag-and-drop exploration — you can find patterns in a dataset within minutes. Advanced work uses calculated fields and <em>Level of Detail (LOD)</em> expressions, which also take practice.</li>
</ul>
<p>Neither is "easy" at a professional level. Both reward the same fundamentals: a clean data model, the right chart for the question, and a dashboard that answers one decision clearly.</p>

<h2>Where each one shines</h2>
<h3>Power BI</h3>
<ul>
<li>Tight integration with Excel, Teams, SharePoint and the wider Microsoft cloud.</li>
<li>Strong data modelling for business reporting — sales, finance, HR and operations dashboards.</li>
<li>A clear certification path: Microsoft's <strong>PL-300 (Power BI Data Analyst)</strong> exam.</li>
</ul>
<h3>Tableau</h3>
<ul>
<li>Fast, flexible visual exploration and storytelling.</li>
<li>Highly polished interactive visualisations; popular with analytics, consulting and product teams.</li>
<li>A large public community — Tableau Public is full of inspiring examples you can learn from.</li>
</ul>

<h2>Job demand in India</h2>
<p>Search any Indian job portal for "data analyst" and you will see both tools — often listed together as "Power BI or Tableau". In our experience working with students, Power BI appears more often in openings at IT services firms, banks and large enterprises that already run on Microsoft, while Tableau shows up more in analytics consultancies and some product companies. Before you choose, open ten job descriptions for roles you actually want and count. That is the most reliable data you will get.</p>

<h2>Recommendation by profile</h2>
<ul>
<li><strong>Student or fresher:</strong> Power BI, plus SQL. Publish two dashboards built on real public data.</li>
<li><strong>Excel-heavy professional:</strong> Power BI — the jump from Excel is the smallest.</li>
<li><strong>Researcher or storyteller:</strong> Tableau for exploration and publication-quality visuals.</li>
<li><strong>Already know one?</strong> Learn the other in a few weeks; the concepts transfer almost completely.</li>
</ul>
<blockquote>Employers don't hire a tool. They hire someone who can turn a messy spreadsheet into a decision.</blockquote>

<h2>Learn it with us</h2>
<p>Our <a href="../courses/power-bi.html">Power BI</a> course takes you from raw data to published, interactive dashboards with DAX and Power Query, and our <a href="../courses/tableau.html">Tableau</a> course covers LOD expressions, dashboards and publishing to Tableau Public. If certification is your goal, the <a href="../programmes/microsoft-certification.html">Microsoft Certification Programme</a> includes PL-300 preparation.</p>
    `
  },

  /* ── 1 ──────────────────────────────────────────────── */
  {
    slug: 'statistics-still-matters-deep-learning',
    cover: 'Website Images/Blog - Statistics Meets Deep Learning.jpeg',
    title: 'Why Statistics Still Matters in the Age of Deep Learning',
    category: 'research',
    catLabel: 'Research',
    date: '2025-04-05',
    dateDisplay: 'April 5, 2025',
    readTime: '6 min read',
    excerpt: 'With deep learning dominating headlines, is classical statistics still relevant? The answer is an emphatic yes — and understanding why will make you a sharper, more credible ML practitioner.',
    body: `
<p>Every few years a new wave of AI progress prompts a variation of the same question: <em>do we still need statistics?</em> In the 1990s it was neural networks. In the 2010s it was big data. Today it is large language models and foundation models. The answer has always been the same — yes, more than ever — but the reasoning deserves spelling out.</p>

<h2>What Statistics Actually Is</h2>
<p>Statistics is not a collection of tests to run before publishing a paper. It is a framework for <strong>reasoning under uncertainty</strong> — asking what we can conclude from limited, noisy data, and how confident we should be in those conclusions. That problem does not disappear when you have a GPU cluster and a billion parameters.</p>
<blockquote>Deep learning changes what models can represent. It does not change the fact that data is finite, noisy, and often biased.</blockquote>

<h2>Three Places Where Statistics Is Irreplaceable</h2>

<h3>1. Knowing When to Trust Your Model</h3>
<p>A neural network that achieves 94% accuracy on a test set tells you very little by itself. What was the class imbalance? Is 94% better than the baseline of always predicting the majority class? Is the test set representative of production data? These questions are statistical in nature, and answering them requires understanding <strong>confidence intervals, hypothesis testing, and sampling bias</strong> — not more model capacity.</p>
<pre><code>from scipy import stats

# Is Model A significantly better than Model B?
# Use McNemar's test for paired classification results
from statsmodels.stats.contingency_tables import mcnemar

table = [[n00, n01],   # both right, A right B wrong
         [n10, n11]]   # A wrong B right, both wrong
result = mcnemar(table, exact=True)
print(f"p-value: {result.pvalue:.4f}")  # < 0.05 = significant</code></pre>

<h3>2. A/B Testing and Causal Inference</h3>
<p>Every product company runs experiments. Whether a new recommendation model improves click-through rate, whether a UI change increases conversions — these are statistical questions. Getting them wrong has real consequences: launching a change that appears to work due to random variation, or discarding a genuine improvement because the experiment was underpowered.</p>
<p>The deep learning model is the <em>intervention</em>. Statistics is the framework that tells you whether the intervention actually worked. You cannot replace one with the other.</p>

<h3>3. Understanding What Your Model Has Learned</h3>
<p>Interpretability is partly a statistical problem. <strong>SHAP values</strong> (SHapley Additive exPlanations) are grounded in cooperative game theory and statistics. Feature importance measures have statistical properties — they can be biased toward high-cardinality features, for instance. Knowing this prevents you from drawing wrong conclusions about your model.</p>

<h2>The Bayesian Perspective</h2>
<p>Bayesian statistics offers something fundamentally different from the point estimates that most ML training produces: a <strong>distribution over predictions</strong>. Instead of "this customer will churn," you get "there is a 73% probability this customer will churn, with a standard deviation of 8%." That uncertainty estimate is often more valuable than the prediction itself — especially in high-stakes domains like healthcare, finance, and autonomous systems.</p>
<p>Bayesian neural networks and methods like Monte Carlo dropout bring this kind of uncertainty quantification to deep learning. The foundation, however, is classical Bayesian reasoning — prior, likelihood, posterior.</p>

<h2>The Honest Admission</h2>
<p>There are tasks — image classification, speech recognition, language generation — where deep learning has moved so far ahead of classical approaches that statistics, as a modelling tool, is largely irrelevant. Nobody is fitting logistic regression to ImageNet.</p>
<p>But even in those domains, statistical thinking governs how you evaluate, compare, deploy, and monitor models. The choice of loss function is a statistical modelling decision. Early stopping criteria are statistical. Deciding whether a production model has degraded enough to warrant retraining is a statistical question.</p>

<h2>What This Means for Your Learning</h2>
<p>If you are building your data science skills, do not skip statistics in favour of "more exciting" deep learning topics. The investment compounds. A solid understanding of probability distributions, hypothesis testing, regression, and Bayesian reasoning will make every ML topic you encounter — including the most advanced — significantly more comprehensible and usable.</p>
<p>At Data Science Academia, our Statistics for Data Science course is deliberately placed before the deep learning modules. Not because it is a prerequisite gate, but because the students who complete it consistently build better models, ask better questions, and produce more credible results.</p>
    `
  },

  /* ── 2 ──────────────────────────────────────────────── */
  {
    slug: 'feature-engineering-craft',
    cover: 'Website Images/Blog - Feature Engineering Mastery.jpeg',
    title: 'Feature Engineering: The Craft Behind Great ML Models',
    category: 'tutorial',
    catLabel: 'Tutorial',
    date: '2025-03-22',
    dateDisplay: 'March 22, 2025',
    readTime: '7 min read',
    excerpt: 'Raw data is almost never model-ready. Feature engineering — transforming inputs into signals a model can use — is often the difference between a mediocre model and a genuinely useful one.',
    body: `
<p>There is a persistent myth in machine learning: that with enough data and a powerful enough model, feature engineering becomes unnecessary. AutoML and deep learning have fed this myth. In practice, thoughtful feature engineering remains one of the highest-leverage skills a data scientist can have — and understanding why reveals something important about how models actually work.</p>

<h2>What Feature Engineering Is (and Is Not)</h2>
<p>Feature engineering is the process of using domain knowledge and data understanding to <strong>create, transform, or select variables</strong> that make a machine learning model more effective. It is not data cleaning — though clean data is a prerequisite. It is the step between cleaned data and model training.</p>
<p>Bad features make powerful models useless. Good features make simple models competitive. This is not theoretical: Kaggle competition winners routinely beat deep learning ensembles with well-engineered features fed into gradient boosting.</p>

<h2>The Core Techniques</h2>

<h3>1. Handling Missing Values Thoughtfully</h3>
<p>Imputing the mean is the default. It is often wrong. Consider <em>why</em> a value is missing. If missingness is informative — a customer who didn't fill in their income field may be different from one who did — create an <strong>indicator feature</strong> before imputing.</p>
<pre><code>import pandas as pd
import numpy as np

# Create missingness indicator BEFORE imputing
df['income_missing'] = df['income'].isna().astype(int)

# Then impute — median is more robust than mean for skewed data
df['income'] = df['income'].fillna(df['income'].median())</code></pre>

<h3>2. Encoding Categorical Variables</h3>
<p>One-hot encoding is appropriate for low-cardinality nominal categories. For high-cardinality categories (city, product ID with thousands of values), it creates thousands of sparse columns. Better alternatives:</p>
<ul>
<li><strong>Target encoding:</strong> replace each category with the mean target value for that category. Powerful but requires careful cross-validation to avoid leakage.</li>
<li><strong>Frequency encoding:</strong> replace with count or frequency of the category in training data.</li>
<li><strong>Embeddings:</strong> for very high cardinality, learned embeddings (as in deep learning) capture richer relationships.</li>
</ul>

<h3>3. Date and Time Decomposition</h3>
<p>A raw datetime column is useless to most models. Decompose it into components that carry signal:</p>
<pre><code>df['hour']        = df['timestamp'].dt.hour
df['day_of_week'] = df['timestamp'].dt.dayofweek
df['month']       = df['timestamp'].dt.month
df['is_weekend']  = (df['day_of_week'] >= 5).astype(int)
df['is_holiday']  = df['date'].isin(holiday_dates).astype(int)

# Time since a reference event
df['days_since_signup'] = (df['timestamp'] - df['signup_date']).dt.days</code></pre>

<h3>4. Interaction Features</h3>
<p>Models like linear regression and shallow trees cannot automatically capture interactions between features. You can create them explicitly:</p>
<pre><code># Ratio features often carry more signal than raw values
df['revenue_per_visit']  = df['revenue'] / (df['visits'] + 1)
df['bounce_rate_x_time'] = df['bounce_rate'] * df['avg_session_time']</code></pre>
<p>Be disciplined here. Creating hundreds of interaction features without domain justification leads to overfitting and is computationally expensive. Start with interactions that have a plausible causal story.</p>

<h3>5. Scaling and Normalisation</h3>
<p>Tree-based models (Random Forest, XGBoost) are invariant to monotonic transformations of features — scaling doesn't matter. But linear models, SVMs, and neural networks are sensitive to feature scales. Use <code>StandardScaler</code> or <code>MinMaxScaler</code>, and always fit the scaler on training data only, then transform both train and test.</p>
<pre><code>from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('model', LogisticRegression())
])
pipe.fit(X_train, y_train)  # scaler only sees training data
pipe.score(X_test, y_test)</code></pre>

<h2>The Most Dangerous Pitfall: Data Leakage</h2>
<p>Data leakage occurs when information from the future or from the target variable contaminates your features. It produces models that look excellent in evaluation but fail completely in production. Common causes:</p>
<ul>
<li>Scaling or imputing using statistics computed on the full dataset (including test rows)</li>
<li>Including features that are only known after the outcome (e.g., total_purchases in a churn model when the customer has already churned)</li>
<li>Target encoding without cross-validation</li>
</ul>
<blockquote>If your model's performance seems too good to be true, look for leakage before celebrating.</blockquote>

<h2>Feature Selection: Less is Often More</h2>
<p>More features do not always mean a better model. Irrelevant features add noise and can hurt performance, especially with limited data. Use feature importance from tree models, SHAP values, or variance inflation factor (for multicollinearity) to prune features that don't contribute.</p>
<p>Feature engineering is, ultimately, the application of domain knowledge to data. The best features are not discovered by algorithms — they are thought up by someone who understands the problem. That understanding is yours to build, and it does not come from tutorials. It comes from spending time with the data and the domain together.</p>
    `
  },

  /* ── 3 ──────────────────────────────────────────────── */
  {
    slug: 'llms-every-data-scientist-needs-to-know',
    cover: 'Website Images/Blog - LLMs in Production 2025.jpeg',
    title: 'Large Language Models: What Every Data Scientist Needs to Know',
    seoTitle: 'LLMs: What Every Data Scientist Needs to Know',
    category: 'industry',
    catLabel: 'Industry',
    date: '2025-03-08',
    dateDisplay: 'March 8, 2025',
    readTime: '9 min read',
    excerpt: 'LLMs have changed what\'s possible in AI. But beyond the hype, what does a working data scientist actually need to understand about them to use them effectively — and critically?',
    body: `
<p>In two years, large language models have moved from research curiosity to the default answer for a remarkable range of AI tasks. If you work in data science, you will encounter them — in products you build, in tools you use, and in conversations with stakeholders who want to know how they work. This is what you actually need to understand.</p>

<h2>What an LLM Actually Is</h2>
<p>A large language model is a neural network — specifically a <strong>Transformer architecture</strong> — trained on vast quantities of text to predict the next token given a sequence of previous tokens. The "large" refers to the number of parameters, which ranges from billions to hundreds of billions in frontier models.</p>
<p>The core mechanism is <strong>self-attention</strong>: each token in a sequence attends to every other token, learning contextual relationships. This is why LLMs can maintain coherence across long documents and capture subtle semantic relationships that earlier models could not.</p>
<pre><code># Conceptually, what attention computes:
# For each token, compute a weighted sum of all other tokens' values
# Weights are determined by how "relevant" each token is to the current token

# In practice, using Hugging Face:
from transformers import pipeline

generator = pipeline('text-generation', model='gpt2')
result = generator("Data science is", max_new_tokens=50)
print(result[0]['generated_text'])</code></pre>

<h2>Training: Three Phases You Should Know</h2>
<h3>Pre-training</h3>
<p>The model is trained on a massive corpus (Common Crawl, books, code, Wikipedia) to predict the next token. This is where the "knowledge" is acquired. Pre-training a frontier model costs tens of millions of dollars and months of compute — this is not something most organisations do themselves.</p>

<h3>Instruction Fine-Tuning (SFT)</h3>
<p>The pre-trained model is fine-tuned on curated (prompt, response) pairs to make it follow instructions rather than just complete text. This is what turns a text predictor into a helpful assistant.</p>

<h3>RLHF — Reinforcement Learning from Human Feedback</h3>
<p>Human raters compare model outputs, and a reward model is trained on their preferences. The LLM is then fine-tuned to maximise this reward. This phase significantly improves helpfulness and reduces harmful outputs — and it's also what makes models seem to "reason" and "align" with human values.</p>

<h2>What LLMs Are Good At (and Not Good At)</h2>
<p>Understanding capability boundaries is critical for responsible use:</p>
<ul>
<li><strong>Strong at:</strong> text generation, summarisation, translation, code generation, classification, entity extraction, question answering over provided context.</li>
<li><strong>Weak at:</strong> precise arithmetic, factual recall for niche or recent events (without retrieval), tasks requiring verifiable correctness, reasoning chains beyond a certain depth.</li>
<li><strong>Fundamentally unreliable for:</strong> anything where a confident-sounding wrong answer is worse than no answer. LLMs hallucinate — they generate plausible-sounding falsehoods — and detecting hallucination programmatically is an unsolved problem.</li>
</ul>
<blockquote>An LLM is not a database. It does not look things up — it predicts what a plausible answer looks like. The difference matters enormously in production.</blockquote>

<h2>RAG: The Most Practical Pattern</h2>
<p><strong>Retrieval-Augmented Generation</strong> addresses the hallucination and knowledge-cutoff problems by giving the model access to a curated knowledge base at inference time. The pipeline:</p>
<ol>
<li>User asks a question</li>
<li>Relevant documents are retrieved from a vector database (using semantic search)</li>
<li>Documents are injected into the LLM's context alongside the question</li>
<li>The LLM answers based on the provided documents, not just its training</li>
</ol>
<pre><code># Minimal RAG pattern using LangChain + Chroma
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vectorstore = Chroma.from_documents(docs, embeddings)

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(search_kwargs={"k": 4})
)
result = qa_chain.run("What is our refund policy?")</code></pre>
<p>RAG is now the standard approach for building LLM-powered applications over proprietary data. Understanding it is close to mandatory for data scientists working on AI products.</p>

<h2>Fine-Tuning vs. Prompting</h2>
<p>Many tasks that seem to require fine-tuning can be solved with better prompting. Before investing weeks in a fine-tuning run, exhaust these prompting strategies:</p>
<ul>
<li><strong>Few-shot prompting:</strong> include 3–5 examples of the desired input/output format in the prompt</li>
<li><strong>Chain-of-thought:</strong> ask the model to reason step-by-step ("Think through this carefully before answering")</li>
<li><strong>System prompt engineering:</strong> define the model's persona, constraints, and output format explicitly</li>
</ul>
<p>Fine-tune when: you need a specific style or format that prompting can't achieve, you need lower latency or cost (smaller fine-tuned model vs. large prompted model), or your task requires knowledge not present in the base model and RAG is insufficient.</p>

<h2>Evaluation: The Hardest Part</h2>
<p>Evaluating LLM outputs is genuinely hard. Metrics like BLEU and ROUGE measure surface-level similarity to reference text — they correlate poorly with quality for open-ended generation. The emerging standards are:</p>
<ul>
<li><strong>LLM-as-judge:</strong> use a powerful model (GPT-4, Claude) to score outputs against criteria</li>
<li><strong>Human evaluation:</strong> still the gold standard, expensive and slow</li>
<li><strong>Task-specific metrics:</strong> for classification or extraction tasks extracted from LLM outputs, standard classification metrics apply</li>
</ul>
<p>The practical implication: when building LLM-powered features, define your success criteria and evaluation method before you start building. "It seems to work" is not a deployment criterion.</p>
    `
  },

  /* ── 4 ──────────────────────────────────────────────── */
  {
    slug: 'data-science-career-india-2025',
    cover: 'Website Images/Blog - Data Science Career in India 2025.jpeg',
    title: 'Building a Data Science Career in India: A 2025 Roadmap',
    category: 'career',
    catLabel: 'Career',
    date: '2025-02-24',
    dateDisplay: 'February 24, 2025',
    readTime: '8 min read',
    excerpt: 'The Indian data science job market has matured significantly. Here\'s a practical, honest roadmap — from the skills that actually get you hired to salary expectations and what interviewers actually test.',
    body: `
<p><em>Update, November 2026: there is a newer version of this guide — <a href="data-science-career-india-2026.html">Building a Data Science Career in India: The 2026 Roadmap</a>, with current salary data and how generative AI has changed hiring.</em></p>

<p>The Indian data science job market has grown up. What was once a shortage of talent chasing a handful of roles has matured into a competitive market with clear hiring patterns, recognisable skill benchmarks, and real differentiation between candidates. This is an honest roadmap — not the optimistic one you'll find on LinkedIn.</p>

<h2>Understanding the Role Landscape</h2>
<p>India now hosts major data teams at product companies (Flipkart, Swiggy, Meesho, CRED, Razorpay), analytics-heavy consulting firms (EXL, WNS, Mu Sigma, Tiger Analytics), and the Indian centres of every major global tech company. The roles broadly split into:</p>
<ul>
<li><strong>Data Analyst:</strong> SQL-heavy, dashboards, business questions. Entry point for many. Tools: SQL, Excel/Google Sheets, Tableau/Power BI.</li>
<li><strong>Data Scientist:</strong> ML models, experimentation, feature engineering. Requires statistics and coding.</li>
<li><strong>ML Engineer:</strong> Production systems, model deployment, MLOps. Closer to software engineering than data science.</li>
<li><strong>AI Researcher:</strong> Novel algorithms, publications, deep domain expertise. Typically requires a Masters or PhD.</li>
</ul>
<p>Most first jobs for fresh graduates are <em>analyst or junior data scientist</em> roles. The jump to senior happens at 2–4 years of genuine hands-on experience.</p>

<h2>The Skills That Actually Get You Hired</h2>
<h3>Non-Negotiable Foundation</h3>
<ul>
<li><strong>SQL:</strong> Every data role requires it. Window functions, CTEs, aggregations, query optimisation. This is tested — in writing — in almost every interview.</li>
<li><strong>Python:</strong> Pandas, NumPy, Scikit-learn. You should be able to take a raw dataset to a trained model without looking up syntax.</li>
<li><strong>Statistics:</strong> Hypothesis testing, probability distributions, A/B testing logic. Not optional. Not just "knowing the terms."</li>
</ul>
<h3>The Differentiators</h3>
<ul>
<li><strong>ML depth:</strong> Understand the algorithms you use — not just how to call them, but how they work, what assumptions they make, and when they fail.</li>
<li><strong>End-to-end projects:</strong> A model on your laptop is not a project. A project has data sourcing, cleaning, EDA, modelling, evaluation, and a written conclusion. It lives on GitHub.</li>
<li><strong>Communication:</strong> The most overlooked skill. Can you explain your model's results and limitations to a non-technical stakeholder? Most candidates cannot.</li>
</ul>

<h2>On Certifications: Be Honest With Yourself</h2>
<p>A certificate from Coursera, Udemy, or even Google is a signal that you completed a structured programme — not a credential in the way a degree is. It helps when your resume needs something to anchor a conversation, but it will not substitute for demonstrated skill.</p>
<blockquote>Certifications open doors. Projects determine what happens inside the room.</blockquote>
<p>The certifications worth your time are those that require passing a technically substantive exam: Google Professional Data Engineer, AWS Certified ML Specialty, and the TensorFlow Developer Certificate. Certificates that require only completing videos do not distinguish you.</p>

<h2>Building Your Portfolio</h2>
<p>The single most impactful thing a fresher can do is build 2–3 strong, end-to-end projects and document them properly on GitHub. Not 15 Kaggle notebooks — two real projects with problem framing, methodology, results, and limitations clearly written up.</p>
<p>Strong project territory for India's job market:</p>
<ul>
<li>Demand forecasting (retail, food delivery, logistics)</li>
<li>Credit risk scoring or fraud detection</li>
<li>Customer segmentation and churn prediction</li>
<li>NLP on Indian-language or domain-specific text</li>
<li>Computer vision for agriculture or healthcare</li>
</ul>
<p>Pick one that intersects with a domain you understand. Domain knowledge is a genuine differentiator.</p>

<h2>The Interview Process — What Actually Happens</h2>
<p>Most data science interviews in India run 3–4 rounds:</p>
<ol>
<li><strong>Online Assessment:</strong> SQL queries + Python coding. 60–90 minutes. Timed. Practice on HackerRank and LeetCode (easy/medium).</li>
<li><strong>Take-home or Case Study:</strong> Build a model on a provided dataset, submit with code and a write-up. Often the most decisive round.</li>
<li><strong>Technical Panel:</strong> Concepts (explain Random Forest, what is regularisation, when would you use XGBoost over a neural network), walkthrough of your project.</li>
<li><strong>HR / Culture Fit:</strong> Usually straightforward.</li>
</ol>
<p>The case study is where most candidates lose interviews — not because they build bad models, but because they don't structure their thinking. Practice the <em>problem → data understanding → approach → modelling → evaluation → business recommendation</em> flow until it is natural.</p>

<h2>Salary Expectations (2025)</h2>
<p>In Tier-1 cities (Bengaluru, Hyderabad, Mumbai, Chennai):</p>
<ul>
<li>Fresher (0–1 year): ₹5–12 LPA</li>
<li>Junior Data Scientist (2–3 years): ₹15–28 LPA</li>
<li>Senior Data Scientist (4–6 years): ₹30–55 LPA</li>
<li>Lead / Principal (7+ years): ₹55–90 LPA</li>
</ul>
<p>Product companies pay 30–50% more than services firms at the same level. Remote-first companies hiring in India often pay US-influenced salaries — the best-paying opportunities in the market right now.</p>
<p>The path is clear, the competition is real, and the market rewards depth over breadth. Start building.</p>
    `
  },

  /* ── 5 ──────────────────────────────────────────────── */
  {
    slug: 'bias-variance-tradeoff',
    cover: 'Website Images/Blog - Bias-Variance Tradeoff.jpeg',
    title: 'Understanding the Bias-Variance Tradeoff',
    category: 'tutorial',
    catLabel: 'Tutorial',
    date: '2025-02-10',
    dateDisplay: 'February 10, 2025',
    readTime: '6 min read',
    excerpt: 'Every ML practitioner faces this fundamental tension. Learn what bias and variance actually mean, why they trade off, and how to diagnose and correct both in your own models.',
    body: `
<p>The bias-variance tradeoff is one of those ideas you encounter early in machine learning and keep understanding more deeply for years. At its core, it explains why making a model more complex doesn't always make it better — and why a simpler model often outperforms a sophisticated one on new data.</p>

<h2>What is Bias?</h2>
<p>Bias is the error introduced by approximating a real-world problem with a model that is too simple. A model with <strong>high bias</strong> makes strong assumptions about the data and systematically misses patterns that are genuinely present.</p>
<p>The classic example: fitting a straight line to data that follows a curve. The line cannot capture the curve regardless of how much training data you provide — it is fundamentally underfitting. The error isn't noise; it's a structural limitation of the model family.</p>
<blockquote>High bias → underfitting → the model performs poorly on both training and test data.</blockquote>

<h2>What is Variance?</h2>
<p>Variance is the error introduced by the model's sensitivity to small fluctuations in the training data. A model with <strong>high variance</strong> learns the training data — including its noise — too precisely, and fails to generalise to new examples.</p>
<p>Imagine fitting a 15th-degree polynomial to 20 data points. The curve passes through every single training point with near-zero training error. But show it new data and performance collapses — it learned the noise, not the underlying signal.</p>
<blockquote>High variance → overfitting → strong training performance, weak test performance.</blockquote>

<h2>The Fundamental Tradeoff</h2>
<p>As model complexity increases, bias decreases (the model can represent more patterns) but variance increases (the model becomes more sensitive to the specific training data). Total error decomposes as:</p>
<pre><code>Total Error = Bias² + Variance + Irreducible Noise</code></pre>
<p><strong>Irreducible noise</strong> is the floor — the inherent randomness in data that no model can eliminate. The goal of ML is to minimise the sum of Bias² and Variance, not either one in isolation.</p>

<h2>Diagnosing Your Model</h2>
<p>The simplest diagnostic is the <strong>training vs. validation error gap</strong>:</p>
<ul>
<li><strong>Both high:</strong> high bias (underfit). Make the model more expressive, add features, reduce regularisation.</li>
<li><strong>Training low, validation high:</strong> high variance (overfit). Simplify, regularise, or get more data.</li>
<li><strong>Both low:</strong> well-calibrated. Ship it.</li>
</ul>
<p>Learning curves make this visual. Plot training and validation error against training set size:</p>
<pre><code>from sklearn.model_selection import learning_curve
import numpy as np
import matplotlib.pyplot as plt

sizes, train_scores, val_scores = learning_curve(
    model, X, y, cv=5,
    train_sizes=np.linspace(0.1, 1.0, 10),
    scoring='neg_mean_squared_error'
)

plt.plot(sizes, -train_scores.mean(axis=1), label='Training error')
plt.plot(sizes, -val_scores.mean(axis=1), label='Validation error')
plt.xlabel('Training set size')
plt.ylabel('MSE')
plt.legend()
plt.show()</code></pre>
<p>A large, persistent gap between the two curves at full training size signals high variance. Curves that converge at a high error level signal high bias.</p>

<h2>Practical Fixes</h2>
<h3>Fixing High Bias</h3>
<ul>
<li>Use a more expressive model (Random Forest instead of Logistic Regression)</li>
<li>Add more features, or create polynomial/interaction features</li>
<li>Reduce regularisation strength (lower α in Ridge/Lasso)</li>
<li>Train for more iterations (for iterative algorithms)</li>
</ul>
<h3>Fixing High Variance</h3>
<ul>
<li>Collect more training data — often the most effective fix available</li>
<li>Add regularisation (L1/L2 for linear models, dropout for neural networks)</li>
<li>Use a simpler model or reduce the number of features</li>
<li>Use ensemble methods: bagging (e.g., Random Forest) reduces variance by averaging multiple high-variance models</li>
</ul>

<h2>The Practical Implication</h2>
<p>In production, you rarely achieve the theoretical optimum. What the bias-variance framework gives you is a <em>direction to move</em> when your model isn't performing. It turns "my model is bad" into "my model is underfitting, so I should try X" or "my model is overfitting, so I should try Y." That diagnostic clarity is what separates practitioners who improve models systematically from those who tune hyperparameters at random.</p>
    `
  },

  /* ── 6 ──────────────────────────────────────────────── */
  {
    slug: 'python-data-science-roadmap',
    cover: 'Website Images/Blog - Python Learning Roadmap 2025.jpeg',
    title: 'Python for Data Science: The Beginner\'s Roadmap',
    category: 'tutorial',
    catLabel: 'Tutorial',
    date: '2025-01-15',
    dateDisplay: 'January 15, 2025',
    readTime: '7 min read',
    excerpt: 'Python is the lingua franca of data science. This guide walks through the essential libraries, a practical learning sequence, and the project-first mindset that separates people who learn data science from those who do it.',
    body: `
<p>Python was not designed for data science. It became the language of data science because it got the fundamentals right: readable syntax, an enormous ecosystem, and a community that moves quickly. If you are beginning your data science journey, Python is where you start.</p>

<h2>Setting Up Your Environment</h2>
<p>Before writing a line of analysis, get your environment right. The standard approach is <strong>Miniconda</strong> for environment management and <strong>Jupyter Notebooks</strong> or <strong>JupyterLab</strong> for interactive development.</p>
<pre><code># Create an isolated environment for each project
conda create -n dsenv python=3.11
conda activate dsenv
pip install numpy pandas matplotlib seaborn scikit-learn jupyter

# Launch Jupyter
jupyter notebook</code></pre>
<p>One environment per project. Never install packages globally. This discipline saves hours of debugging dependency conflicts as your projects multiply.</p>

<h2>The Core Stack: Four Libraries to Learn First</h2>

<h3>NumPy — The Foundation</h3>
<p>NumPy is the numerical backbone of Python's data science ecosystem. Pandas, Scikit-learn, and TensorFlow all build on NumPy arrays. Use it for vectorised operations, linear algebra, and random number generation.</p>
<pre><code>import numpy as np

a = np.array([1, 2, 3, 4, 5])
print(a.mean())       # 3.0
print(a ** 2)         # [ 1  4  9 16 25]
print(a[a > 2])       # [3 4 5]

# Vectorisation: apply operations to entire arrays without loops
b = np.random.randn(1_000_000)
print(b.mean(), b.std())  # Milliseconds, not seconds</code></pre>
<p>The key insight is <strong>vectorisation</strong>: array operations apply element-wise without explicit Python loops, and they execute in compiled C code under the hood. A loop over a million elements might take seconds; NumPy does it in milliseconds.</p>

<h3>Pandas — Data Wrangling</h3>
<p>If NumPy is the foundation, Pandas is where you'll spend most of your time. It gives you the <strong>DataFrame</strong> — a labelled, two-dimensional table — and rich tools to load, clean, filter, group, and reshape data.</p>
<pre><code>import pandas as pd

df = pd.read_csv('sales_data.csv')
df.head()               # first 5 rows
df.info()               # column types and null counts
df.describe()           # summary statistics

# Filter, group, aggregate
monthly = (df[df['region'] == 'South']
             .groupby('month')['revenue']
             .sum()
             .reset_index())</code></pre>
<p>The most valuable Pandas skills are <code>groupby</code>, <code>merge/join</code>, and handling missing data. Master these and you can wrangle 90% of real-world datasets.</p>

<h3>Matplotlib and Seaborn — Visualisation</h3>
<p>Matplotlib is low-level and flexible; Seaborn is high-level and opinionated. Use Seaborn for exploratory analysis, Matplotlib for custom publication-quality figures.</p>
<pre><code>import seaborn as sns
import matplotlib.pyplot as plt

# Distribution
sns.histplot(df['revenue'], bins=30, kde=True)
plt.title('Revenue Distribution')

# Correlation heatmap — essential for EDA
plt.figure(figsize=(10, 8))
sns.heatmap(df.corr(), annot=True, cmap='coolwarm', center=0)
plt.show()</code></pre>

<h3>Scikit-learn — Machine Learning</h3>
<p>Scikit-learn's unified API — <code>fit()</code>, <code>predict()</code>, <code>transform()</code> — is one of the best-designed interfaces in open-source software. It covers preprocessing, dimensionality reduction, model selection, and almost every classical ML algorithm.</p>
<pre><code>from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('model', RandomForestClassifier(n_estimators=100, random_state=42))
])

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
pipe.fit(X_train, y_train)
print(classification_report(y_test, pipe.predict(X_test)))</code></pre>

<h2>A Practical Learning Sequence</h2>
<p>The biggest mistake beginners make is tutorial-hopping — watching video after video without building anything. Here is a sequence that actually works:</p>
<ul>
<li><strong>Weeks 1–2:</strong> Python fundamentals (variables, control flow, functions, classes, file I/O). <em>Automate the Boring Stuff with Python</em> is free and excellent.</li>
<li><strong>Weeks 3–4:</strong> NumPy and Pandas. Work through a real dataset — the Titanic dataset is overused but genuinely useful for first-time learning.</li>
<li><strong>Weeks 5–6:</strong> Visualisation and basic statistics (mean, median, standard deviation, correlation, distributions).</li>
<li><strong>Weeks 7–8:</strong> Scikit-learn — linear regression, logistic regression, decision trees. Focus on the process, not the algorithms.</li>
<li><strong>Month 3+:</strong> Build one project end-to-end. Data sourcing → cleaning → EDA → modelling → written summary. The project is the credential.</li>
</ul>

<h2>The Mindset That Matters Most</h2>
<blockquote>Build projects on data you care about. If you follow cricket, analyse match data. If you care about health, use a public medical dataset. Curiosity about the domain makes you push through the hard parts.</blockquote>
<p>Python is a tool. The goal is to develop your thinking as a data scientist — asking the right questions, healthy scepticism about results, and clear communication of findings. The libraries listed above are just the fastest path to practising that thinking on real problems.</p>
    `
  },
];

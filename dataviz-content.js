(function(){
'use strict';
window.DSA_LESSON_CONTENT = window.DSA_LESSON_CONTENT || {};
const L = window.DSA_LESSON_CONTENT;

/* ─── MODULE 1 — Visualisation Principles & Chart Selection ─────────────── */

L['dataviz-w1-l1'] = {
  title: 'Why Visualise? Anscombe\'s Quartet & Pre-attentive Attributes',
  sections: [
    { type: 'text', body: `<h2>The Case for Visualisation</h2>
<p>Data visualisation is the practice of encoding information as visual objects — positions, lengths, colours, shapes — so that the human visual system can process patterns, outliers, and relationships that would take minutes to extract from a table. A well-chosen chart does in seconds what statistical summaries cannot.</p>
<h3>Anscombe's Quartet</h3>
<p>In 1973, statistician Francis Anscombe constructed four datasets that are <em>identical</em> across every standard summary statistic — mean, variance, correlation, and regression line — yet look completely different when plotted.</p>
<table>
  <tr><th>Dataset</th><th>Mean X</th><th>Mean Y</th><th>Correlation</th><th>Regression slope</th></tr>
  <tr><td>I</td><td>9.0</td><td>7.5</td><td>0.816</td><td>0.500</td></tr>
  <tr><td>II</td><td>9.0</td><td>7.5</td><td>0.816</td><td>0.500</td></tr>
  <tr><td>III</td><td>9.0</td><td>7.5</td><td>0.816</td><td>0.500</td></tr>
  <tr><td>IV</td><td>9.0</td><td>7.5</td><td>0.816</td><td>0.500</td></tr>
</table>
<p>Dataset I is a normal linear relationship. Dataset II is a perfect curve that a line poorly approximates. Dataset III has a single outlier distorting the regression. Dataset IV has all points at one X value except one extreme outlier. The lesson: <strong>always plot before you model.</strong></p>` },
    { type: 'text', body: `<h3>Pre-attentive Attributes</h3>
<p>Pre-attentive processing happens in under 250 milliseconds, before conscious attention — it is handled by the visual cortex in parallel across the entire visual field. Certain visual properties trigger pre-attentive processing; others do not.</p>
<ul>
  <li><strong>Position</strong> — the most powerful channel. The eye instantly locates the highest bar in a bar chart. Use for quantitative comparisons.</li>
  <li><strong>Length</strong> — effective for comparing magnitudes. Bar charts exploit length.</li>
  <li><strong>Colour hue</strong> — excellent for categorical distinctions (up to ~7 categories). The eye pops a red dot among blue ones instantly.</li>
  <li><strong>Colour saturation / luminance</strong> — good for encoding a continuous quantity on a map or heatmap.</li>
  <li><strong>Size / area</strong> — effective for order-of-magnitude differences; humans are poor at precise area judgements (bubble charts). Use with caution.</li>
  <li><strong>Shape</strong> — distinguishes categories but is weaker than colour. Good as a secondary channel.</li>
  <li><strong>Orientation</strong> — angle is processed pre-attentively (a tilted line among vertical ones pops), but angle <em>magnitude</em> is judged poorly — hence pie charts are hard to read precisely.</li>
</ul>
<p><strong>Rule:</strong> Encode your most important dimension using the strongest channel available — typically position. Reserve colour for the second dimension, shape for the third.</p>` },
    { type: 'tip', body: `Test your chart with the "5-second rule": show it to someone for 5 seconds and ask what they took away. If the answer matches your intent, the chart works. If not, you have a design problem — not a data problem. The fix is usually to strengthen the encoding channel (switch from pie to bar) or reduce clutter.` },
    { type: 'exercise', title: 'Reproduce Anscombe\'s Quartet and observe statistical blindness', hint: 'Use the anscombe dataset built into seaborn or construct it manually, then plot all four in a 2×2 grid', solution: `import seaborn as sns
import matplotlib.pyplot as plt

anscombe = sns.load_dataset("anscombe")

fig, axes = plt.subplots(2, 2, figsize=(10, 8), sharex=False, sharey=False)
fig.suptitle("Anscombe's Quartet — Same Statistics, Very Different Data", fontsize=14, fontweight='bold')

for ax, (dataset, group) in zip(axes.flat, anscombe.groupby("dataset")):
    ax.scatter(group["x"], group["y"], color="#e07b39", edgecolors="#333", s=60, zorder=3)
    # Fit regression line
    import numpy as np
    m, b = np.polyfit(group["x"], group["y"], 1)
    x_line = np.linspace(group["x"].min()-0.5, group["x"].max()+0.5, 100)
    ax.plot(x_line, m*x_line + b, color="#2d6be4", linewidth=1.5, zorder=2)
    ax.set_title(f"Dataset {dataset}")
    ax.set_xlabel("x"); ax.set_ylabel("y")
    stats = f"r={group['x'].corr(group['y']):.3f}"
    ax.text(0.05, 0.9, stats, transform=ax.transAxes, fontsize=9, color="#555")

plt.tight_layout()
plt.savefig("anscombe_quartet.png", dpi=150, bbox_inches='tight')
plt.show()` }
  ]
};

L['dataviz-w1-l2'] = {
  title: 'Data Types → Chart Types — The Matching Framework',
  sections: [
    { type: 'text', body: `<h2>The Chart Selection Problem</h2>
<p>Choosing the wrong chart type is the most common visualisation mistake. A pie chart for 12 categories, a bar chart for time-series trend, a line chart for unordered categories — all are technically renderable but cognitively misleading. The right chart type follows from two questions: <strong>What is the data type?</strong> and <strong>What relationship am I showing?</strong></p>
<h3>Data Type Taxonomy</h3>
<ul>
  <li><strong>Nominal (categorical)</strong> — unordered labels: country, product category, gender. No meaningful numeric distance between values.</li>
  <li><strong>Ordinal</strong> — ordered categories with no uniform spacing: survey ratings (Poor/Fair/Good/Excellent), education level, age bands.</li>
  <li><strong>Interval</strong> — numeric with equal spacing but no true zero: temperature in Celsius, calendar years. You can add/subtract but not multiply (twice as warm is meaningless in °C).</li>
  <li><strong>Ratio</strong> — numeric with a true zero: revenue, count, weight, duration. All arithmetic is meaningful.</li>
  <li><strong>Temporal</strong> — dates and times. A special case of interval/ratio with calendar structure (cyclical: hours, days, months).</li>
  <li><strong>Spatial / Geographic</strong> — coordinates, regions, countries. Requires map-based encoding.</li>
</ul>` },
    { type: 'text', body: `<h3>Chart Selection Matrix</h3>
<table>
  <tr><th>Goal</th><th>Data types involved</th><th>Recommended chart</th><th>Avoid</th></tr>
  <tr><td>Compare magnitudes</td><td>Nominal + Ratio</td><td>Bar chart (horizontal if labels long)</td><td>Pie, 3D bar</td></tr>
  <tr><td>Show trend over time</td><td>Temporal + Ratio</td><td>Line chart</td><td>Bar (for many time points), pie</td></tr>
  <tr><td>Show distribution</td><td>Ratio (single variable)</td><td>Histogram, KDE, box plot</td><td>Bar with arbitrary bins</td></tr>
  <tr><td>Show relationship (correlation)</td><td>Ratio + Ratio</td><td>Scatter plot</td><td>Line (implies sequence)</td></tr>
  <tr><td>Show composition (part of whole)</td><td>Nominal + Ratio (sums to 100%)</td><td>Stacked bar, waffle chart</td><td>Pie (&gt;5 slices)</td></tr>
  <tr><td>Show ranking</td><td>Nominal + Ratio</td><td>Sorted horizontal bar</td><td>Unsorted bar, pie</td></tr>
  <tr><td>Show geographic patterns</td><td>Spatial + Ratio/Nominal</td><td>Choropleth, bubble map</td><td>Bar chart of regions</td></tr>
  <tr><td>Compare distributions across groups</td><td>Nominal + Ratio</td><td>Box plot, violin plot</td><td>Grouped bar (hides distribution)</td></tr>
  <tr><td>Show correlation matrix</td><td>Multiple Ratio variables</td><td>Heatmap, pair plot</td><td>Table of numbers</td></tr>
</table>` },
    { type: 'tip', body: `When in doubt, default to a <strong>sorted horizontal bar chart</strong>. It works for most categorical comparisons, labels are readable regardless of length, and humans are excellent at comparing lengths along a common baseline. The bar chart is the Swiss army knife of data visualisation — reach for it first, then consider alternatives only when the bar chart genuinely fails to answer the question.` },
    { type: 'exercise', title: 'For each dataset, identify the data types and choose the right chart', hint: 'Load the provided datasets, identify variable types, then build the most appropriate chart for each', solution: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Dataset 1: Sales by category (Nominal + Ratio) → Horizontal bar chart
sales = pd.DataFrame({
    'category': ['Electronics','Clothing','Food','Books','Sports','Toys'],
    'revenue': [45000, 32000, 28000, 15000, 22000, 18000]
}).sort_values('revenue')

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

axes[0].barh(sales['category'], sales['revenue'], color='#2d6be4')
axes[0].set_title('Sales by Category\\n(Nominal + Ratio → Horizontal Bar)')
axes[0].set_xlabel('Revenue')

# Dataset 2: Temperature over months (Temporal + Ratio) → Line chart
months = range(1, 13)
temp = [22, 24, 28, 32, 36, 38, 37, 35, 31, 28, 24, 21]
axes[1].plot(list(months), temp, marker='o', color='#e07b39', linewidth=2)
axes[1].set_xticks(list(months))
axes[1].set_xticklabels(['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], rotation=45)
axes[1].set_title('Monthly Temperature\\n(Temporal + Ratio → Line Chart)')
axes[1].set_ylabel('°C')

# Dataset 3: Exam score distribution (Ratio single var) → Histogram
import numpy as np
scores = np.random.normal(68, 12, 200).clip(0, 100)
axes[2].hist(scores, bins=20, color='#2db85e', edgecolor='white')
axes[2].set_title('Exam Score Distribution\\n(Ratio → Histogram)')
axes[2].set_xlabel('Score')

plt.tight_layout()
plt.show()` }
  ]
};

L['dataviz-w1-l3'] = {
  title: 'Colour Theory for Data — Palettes, Perception & Accessibility',
  sections: [
    { type: 'text', body: `<h2>Why Colour Matters</h2>
<p>Colour is the second most powerful visual channel after position — and the most abused. The wrong palette introduces misleading emphasis, hides patterns, or renders a chart unreadable for the 8% of men and 0.5% of women who have colour vision deficiency. Good colour choices are not aesthetic preferences; they are analytical decisions.</p>
<h3>The Three Palette Types</h3>
<ul>
  <li><strong>Categorical (qualitative)</strong> — distinct hues for unordered groups. Each colour should be equally "loud" — no hue should visually dominate. Examples: <code>Set2</code>, <code>tab10</code>, <code>Paired</code> in Matplotlib/Seaborn. Use when encoding nominal data (country, product line). Limit to 7–8 colours maximum — beyond that, add textures or shapes.</li>
  <li><strong>Sequential</strong> — a single hue progressing from light (low) to dark (high), or multiple hues on a perceptually uniform path. Examples: <code>Blues</code>, <code>viridis</code>, <code>plasma</code>. Use when encoding a continuous quantity where higher = more (temperature, count, intensity).</li>
  <li><strong>Diverging</strong> — two contrasting hues meeting at a neutral midpoint. Examples: <code>RdBu</code>, <code>coolwarm</code>, <code>PiYG</code>. Use when data has a meaningful centre (zero, average, neutral) and deviations in both directions matter (profit/loss, political lean, temperature anomaly).</li>
</ul>` },
    { type: 'text', body: `<h3>Perceptual Uniformity</h3>
<p>Not all colour scales are perceptually uniform — a numerically equal step in the data should look like an equal visual step in the colour. The classic <code>jet</code> (rainbow) palette is <em>not</em> perceptually uniform: yellow and cyan appear far brighter than blue and red, creating false peaks and valleys in maps. Always prefer <strong>viridis</strong>, <strong>plasma</strong>, <strong>inferno</strong>, or <strong>magma</strong> — designed to be perceptually uniform and readable in greyscale.</p>
<h3>Accessibility: Colour Vision Deficiency</h3>
<p>The most common colour vision deficiency is deuteranopia (red-green blindness). Rules:</p>
<ul>
  <li>Never use red/green as the only distinguishing colours. Use blue/orange instead.</li>
  <li>Add a second encoding channel — shape, pattern, or label — alongside colour.</li>
  <li>Test your palette with a simulator (e.g. Coblis online tool or <code>colorblind</code> Python package).</li>
  <li>The <code>viridis</code> and <code>cividis</code> palettes are specifically designed to be distinguishable under all common colour vision deficiencies.</li>
</ul>
<pre><code>import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

fig, axes = plt.subplots(1, 3, figsize=(15, 4))

# Categorical — use Set2 (colour-blind friendly)
categories = ['A', 'B', 'C', 'D', 'E']
values = [23, 45, 12, 67, 34]
colors = sns.color_palette("Set2", len(categories))
axes[0].bar(categories, values, color=colors)
axes[0].set_title('Categorical: Set2 palette')

# Sequential — viridis on a heatmap
data = np.random.randn(8, 8)
sns.heatmap(data, ax=axes[1], cmap='viridis', center=0)
axes[1].set_title('Sequential: viridis')

# Diverging — coolwarm for values with a meaningful centre
sns.heatmap(data, ax=axes[2], cmap='RdBu_r', center=0,
            vmin=-3, vmax=3, annot=False)
axes[2].set_title('Diverging: RdBu_r')

plt.tight_layout()
plt.show()

# Print all seaborn built-in palettes
print(sns.palettes.SEABORN_PALETTES.keys())</code></pre>` },
    { type: 'tip', body: `Use colour sparingly — add it only when it encodes information. A monochrome bar chart with one highlight bar in gold draws attention to the key insight far more effectively than a rainbow of 12 different colours where every bar screams equally. Colour is like seasoning: just enough adds meaning; too much overwhelms everything.` },
    { type: 'exercise', title: 'Compare jet vs viridis on a 2D data surface and demonstrate the rainbow trap', hint: 'Create a 2D array with a smooth gradient, plot with jet and viridis side by side, then convert to greyscale to see which survives', solution: `import numpy as np
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors

# Create smooth 2D surface
x = np.linspace(-3, 3, 100)
y = np.linspace(-3, 3, 100)
X, Y = np.meshgrid(x, y)
Z = np.sin(np.sqrt(X**2 + Y**2))

fig, axes = plt.subplots(2, 3, figsize=(15, 10))
fig.suptitle('The Rainbow Trap: jet vs viridis', fontsize=14, fontweight='bold')

palettes = ['jet', 'viridis', 'plasma']
for col, cmap in enumerate(palettes):
    # Colour version
    im = axes[0, col].imshow(Z, cmap=cmap, aspect='auto')
    axes[0, col].set_title(f'{cmap} (colour)')
    plt.colorbar(im, ax=axes[0, col])

    # Greyscale version — shows perceptual uniformity
    grey_cmap = plt.get_cmap(cmap)(np.linspace(0, 1, 256))
    luminance = 0.2126*grey_cmap[:,0] + 0.7152*grey_cmap[:,1] + 0.0722*grey_cmap[:,2]
    grey_arr = plt.get_cmap('gray')(luminance[
        (Z - Z.min()) / (Z.max() - Z.min()) * 255).astype(int)])[:,:,:3]
    axes[1, col].imshow(grey_arr, aspect='auto')
    axes[1, col].set_title(f'{cmap} (greyscale — perceptual test)')

plt.tight_layout()
plt.show()
# Observation: jet greyscale is non-monotonic (bright bands appear for no reason)
# viridis/plasma greyscale is smooth — what you see in colour is real` }
  ]
};

L['dataviz-w1-l4'] = {
  title: 'Tufte\'s Principles & Chart Anti-patterns',
  sections: [
    { type: 'text', body: `<h2>Edward Tufte and the Data-Ink Ratio</h2>
<p>Edward Tufte, in <em>The Visual Display of Quantitative Information</em> (1983), introduced the concept of <strong>data-ink ratio</strong>: the fraction of ink (or pixels) in a chart that is used to convey data, as opposed to decorative or redundant elements.</p>
<blockquote style="border-left:3px solid var(--champ);padding:.5rem 1rem;margin:1rem 0;font-style:italic;color:var(--fog2);">"Above all else, show the data."<br>— Edward Tufte</blockquote>
<p><strong>Data-ink ratio = Data ink ÷ Total ink used</strong></p>
<p>Maximise the data-ink ratio by removing everything that does not encode data: redundant grid lines, heavy borders, background fills, 3D effects, legends that can be replaced by direct labels, tick marks that duplicate axis labels.</p>
<h3>The Five Tufte Principles</h3>
<ul>
  <li><strong>Show the data.</strong> The chart should reveal the data clearly. Every element should serve this goal.</li>
  <li><strong>Maximise the data-ink ratio.</strong> Erase non-data ink. Erase redundant data ink.</li>
  <li><strong>Erase chartjunk.</strong> Remove decoration, moiré patterns, heavy grids, unnecessary borders.</li>
  <li><strong>Avoid distortion.</strong> Representation should be proportional to the data. Bar charts must start at zero. Dual axes must be used with extreme caution.</li>
  <li><strong>Serve the data's purpose.</strong> The complexity of the design should be proportional to the complexity of the data.</li>
</ul>` },
    { type: 'text', body: `<h3>The Hall of Shame — Common Anti-patterns</h3>
<ul>
  <li><strong>3D charts</strong> — 3D bar charts and 3D pie charts distort lengths and areas through perspective, making accurate comparison impossible. The extra dimension adds zero information. Never use them.</li>
  <li><strong>Truncated Y-axis</strong> — starting a bar chart axis at anything other than zero makes small differences look enormous. A 2% change shown between y=48 and y=50 appears as a 100% change visually. Exception: line charts may use non-zero baselines when the trend (not absolute magnitude) is the story.</li>
  <li><strong>Pie charts with many slices</strong> — humans are poor at judging angle. Beyond 4–5 slices, use a sorted bar chart. Never use pie charts to compare values across two pies (use side-by-side bars instead).</li>
  <li><strong>Dual Y-axes</strong> — two separate Y-axes create an illusion of correlation by letting each axis be scaled independently. The apparent relationship changes completely depending on scale choice. Almost always a better alternative exists.</li>
  <li><strong>Rainbow colour for sequential data</strong> — as shown in Lesson 3, the jet palette creates false visual patterns. Use perceptually uniform palettes.</li>
  <li><strong>Overloaded legends</strong> — a legend forces the reader to look away from the chart. When possible, label data directly on or next to the data series.</li>
</ul>
<pre><code>import matplotlib.pyplot as plt
import numpy as np

# Good vs Bad: Truncated axis
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
categories = ['Q1', 'Q2', 'Q3', 'Q4']
values = [98.2, 99.1, 98.8, 99.5]

# Bad: truncated y-axis — exaggerates differences
ax1.bar(categories, values, color='#e07b39')
ax1.set_ylim(97.5, 100)
ax1.set_title('BAD: Truncated Y-axis\\n(differences look huge)', color='red')

# Good: starts at zero — honest representation
ax2.bar(categories, values, color='#2d6be4')
ax2.set_ylim(0, 105)
ax2.set_title('GOOD: Y-axis from zero\\n(differences are tiny)', color='green')

for ax in (ax1, ax2):
    ax.set_ylabel('Value')
    for spine in ['top', 'right']:
        ax.spines[spine].set_visible(False)

plt.tight_layout()
plt.show()</code></pre>` },
    { type: 'tip', body: `The fastest way to improve any chart: remove the top and right spines (<code>ax.spines['top'].set_visible(False)</code>), reduce grid line opacity to 0.3, and directly label data series instead of using a legend. These three changes take 3 lines of code and instantly make your chart look professional.` },
    { type: 'exercise', title: 'Take a "bad" chart and apply Tufte\'s principles to redesign it', hint: 'Start with a cluttered chart full of chartjunk, then strip it down to maximise data-ink ratio', solution: `import matplotlib.pyplot as plt
import numpy as np

months = ['Jan','Feb','Mar','Apr','May','Jun']
product_a = [120, 145, 132, 168, 155, 190]
product_b = [95, 102, 118, 125, 140, 135]

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))

# BAD version — chartjunk overload
ax1.set_facecolor('#f0f8ff')
ax1.plot(months, product_a, 'r-o', linewidth=3, markersize=10, label='Product A')
ax1.plot(months, product_b, 'b-s', linewidth=3, markersize=10, label='Product B')
ax1.set_title('MONTHLY SALES REPORT Q1-Q2', fontsize=14, fontweight='bold', color='darkblue')
ax1.set_xlabel('MONTH', fontsize=12, fontweight='bold')
ax1.set_ylabel('UNITS SOLD', fontsize=12, fontweight='bold')
ax1.grid(True, linewidth=1.5, color='gray')
ax1.legend(fontsize=11, frameon=True, shadow=True)
ax1.tick_params(axis='both', which='major', labelsize=11)
ax1.set_title('BAD — Chartjunk version', color='red', pad=10)

# GOOD version — Tufte-inspired
ax2.plot(months, product_a, color='#2d6be4', linewidth=2, marker='o', markersize=5)
ax2.plot(months, product_b, color='#e07b39', linewidth=2, marker='o', markersize=5)
# Direct labels instead of legend
ax2.text(months[-1], product_a[-1]+3, 'Product A', color='#2d6be4', fontsize=9, va='bottom')
ax2.text(months[-1], product_b[-1]-8, 'Product B', color='#e07b39', fontsize=9, va='top')
ax2.set_title('Monthly Sales — Units Sold', fontsize=11)
ax2.spines['top'].set_visible(False)
ax2.spines['right'].set_visible(False)
ax2.grid(axis='y', alpha=0.3, linewidth=0.7)
ax2.tick_params(axis='both', labelsize=9)
ax2.set_title('GOOD — Tufte-inspired version', color='green', pad=10)

plt.tight_layout()
plt.show()` }
  ]
};

L['dataviz-w1-l5'] = {
  title: 'Setting Up the Python Visualisation Stack',
  sections: [
    { type: 'text', body: `<h2>The Python Visualisation Ecosystem</h2>
<p>Python has a rich and layered visualisation ecosystem. Understanding how the libraries relate to each other helps you choose the right tool for each task rather than defaulting to the same library for everything.</p>
<table>
  <tr><th>Layer</th><th>Library</th><th>Best for</th><th>Output</th></tr>
  <tr><td>Foundation</td><td>Matplotlib</td><td>Full control, publication figures, custom layouts</td><td>Static PNG/SVG/PDF</td></tr>
  <tr><td>Statistical</td><td>Seaborn</td><td>Statistical plots, built on Matplotlib</td><td>Static (via Matplotlib)</td></tr>
  <tr><td>Interactive</td><td>Plotly</td><td>Interactive charts for web/dashboards</td><td>Interactive HTML</td></tr>
  <tr><td>Dashboard</td><td>Plotly Dash</td><td>Multi-chart web dashboards with callbacks</td><td>Web app (Flask-based)</td></tr>
  <tr><td>Quick EDA</td><td>Pandas .plot()</td><td>Fast plots during data exploration</td><td>Static (via Matplotlib)</td></tr>
  <tr><td>Big data</td><td>Datashader</td><td>Rasterising millions of points</td><td>Static raster image</td></tr>
</table>
<h3>Installation</h3>
<pre><code># Core stack for this course
pip install matplotlib seaborn plotly dash pandas numpy

# Optional extras
pip install dash-bootstrap-components  # Bootstrap UI for Dash
pip install kaleido                     # Static image export from Plotly
pip install openpyxl xlrd               # Excel support for pandas</code></pre>` },
    { type: 'text', body: `<h3>Your First Plot in Each Library</h3>
<pre><code>import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px

# Sample data: daily website visits for two months
np.random.seed(42)
dates = pd.date_range('2024-01-01', periods=60)
visits = 1000 + np.cumsum(np.random.randn(60) * 30)
df = pd.DataFrame({'date': dates, 'visits': visits.astype(int)})

# ── Matplotlib ──────────────────────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(10, 4))
ax.plot(df['date'], df['visits'], color='#2d6be4', linewidth=2)
ax.fill_between(df['date'], df['visits'], alpha=0.1, color='#2d6be4')
ax.set_title('Daily Website Visits — Matplotlib')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
plt.tight_layout()
plt.show()

# ── Seaborn ──────────────────────────────────────────────────────────────────
sns.set_theme(style='whitegrid', palette='muted')
fig, ax = plt.subplots(figsize=(10, 4))
sns.lineplot(data=df, x='date', y='visits', ax=ax, color='#e07b39', linewidth=2)
ax.set_title('Daily Website Visits — Seaborn')
plt.xticks(rotation=30)
plt.tight_layout()
plt.show()

# ── Plotly (interactive) ──────────────────────────────────────────────────
fig = px.line(df, x='date', y='visits',
              title='Daily Website Visits — Plotly (Interactive)',
              labels={'visits': 'Visits', 'date': 'Date'},
              template='plotly_dark')
fig.update_traces(line_color='#2d6be4', line_width=2)
fig.show()  # opens in browser</code></pre>` },
    { type: 'tip', body: `Set Seaborn's theme once at the top of your notebook — <code>sns.set_theme(style='whitegrid', palette='muted', font_scale=1.1)</code> — and all subsequent Matplotlib and Seaborn plots inherit it automatically. This single line eliminates most of the visual noise from default Matplotlib and makes your exploratory charts presentation-ready from the start.` },
    { type: 'exercise', title: 'Install the full stack, load a real dataset, and create one chart in each library', hint: 'Use the Titanic or Tips dataset from seaborn, create a bar chart in Matplotlib, a violin plot in Seaborn, and a scatter plot in Plotly', solution: `import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px

# Load built-in dataset
tips = sns.load_dataset('tips')
print(tips.head())
print(tips.dtypes)

# 1. Matplotlib — average bill by day
fig, ax = plt.subplots(figsize=(8, 5))
avg_bill = tips.groupby('day')['total_bill'].mean().reindex(['Thur','Fri','Sat','Sun'])
colors = ['#2d6be4', '#e07b39', '#2db85e', '#e04444']
bars = ax.bar(avg_bill.index, avg_bill.values, color=colors, width=0.6)
ax.bar_label(bars, fmt='\${:.1f}', padding=3, fontsize=9)
ax.set_title('Average Bill by Day — Matplotlib')
ax.set_ylabel('Average Total Bill (\$)')
ax.set_ylim(0, 25)
ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
plt.tight_layout(); plt.show()

# 2. Seaborn — distribution of tips by smoker status
sns.set_theme(style='whitegrid')
fig, ax = plt.subplots(figsize=(8, 5))
sns.violinplot(data=tips, x='day', y='tip', hue='smoker',
               split=True, palette='Set2', ax=ax, order=['Thur','Fri','Sat','Sun'])
ax.set_title('Tip Distribution by Day & Smoking Status — Seaborn')
plt.tight_layout(); plt.show()

# 3. Plotly — interactive scatter
fig = px.scatter(tips, x='total_bill', y='tip', color='time',
                 size='size', hover_data=['day','smoker'],
                 title='Bill vs Tip — Plotly Interactive',
                 labels={'total_bill':'Total Bill (\$)','tip':'Tip (\$)'},
                 template='plotly_white')
fig.show()` }
  ]
};

L['dataviz-w1-quiz'] = {
  title: 'Quiz — Visualisation Principles & Chart Selection',
  sections: [
    { type: 'text', body: `<h2>Module 1 Quiz</h2><p>Test your understanding of visualisation principles, chart selection, colour theory, and Tufte's guidelines.</p>` }
  ]
};

/* ─── MODULE 2 — Matplotlib Deep Dive ───────────────────────────────────── */

L['dataviz-w2-l1'] = {
  title: 'Figure & Axes Architecture — The Object-Oriented Approach',
  sections: [
    { type: 'text', body: `<h2>Two APIs, One Library</h2>
<p>Matplotlib has two programming interfaces: the <strong>pyplot (stateful) API</strong> and the <strong>object-oriented (OO) API</strong>. Beginners use pyplot (<code>plt.plot()</code>, <code>plt.title()</code>); professionals use the OO API. Understanding the object model is essential for building any chart more complex than a single plot.</p>
<h3>The Object Hierarchy</h3>
<pre>
Figure
└── Axes  (one or more — each is a complete plot area)
    ├── XAxis / YAxis
    │   ├── Ticks (major + minor)
    │   └── Labels
    ├── Lines, Patches, Collections (the actual data representations)
    ├── Title
    └── Legend
</pre>
<ul>
  <li><strong>Figure</strong> — the entire canvas. Controls overall size (<code>figsize</code>), resolution (<code>dpi</code>), and saving. Created with <code>fig = plt.figure()</code> or <code>fig, ax = plt.subplots()</code>.</li>
  <li><strong>Axes</strong> — a single plot within the Figure. Has its own coordinate system, title, axis labels, ticks, and data artists. <em>Axes</em> ≠ <em>Axis</em> — Axes is the plot; Axis is the x or y line.</li>
  <li><strong>Artist</strong> — everything visible on a Figure is an Artist: lines, text, patches (rectangles, circles), images, legends. All Artists live on an Axes.</li>
</ul>` },
    { type: 'text', body: `<h3>The OO Workflow</h3>
<pre><code>import matplotlib.pyplot as plt
import numpy as np

# Step 1: Create Figure and Axes together
fig, ax = plt.subplots(figsize=(9, 5))   # fig is Figure; ax is a single Axes

x = np.linspace(0, 2 * np.pi, 200)

# Step 2: Call methods on the Axes object
ax.plot(x, np.sin(x), label='sin(x)', color='#2d6be4', linewidth=2)
ax.plot(x, np.cos(x), label='cos(x)', color='#e07b39', linewidth=2, linestyle='--')

# Step 3: Configure via Axes methods (NOT plt.xxx)
ax.set_title('Sine and Cosine Waves', fontsize=13, fontweight='bold')
ax.set_xlabel('Angle (radians)')
ax.set_ylabel('Amplitude')
ax.set_xlim(0, 2 * np.pi)
ax.set_ylim(-1.3, 1.3)
ax.set_xticks([0, np.pi/2, np.pi, 3*np.pi/2, 2*np.pi])
ax.set_xticklabels(['0', 'π/2', 'π', '3π/2', '2π'])
ax.legend(loc='upper right')
ax.grid(axis='y', alpha=0.3)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

# Step 4: Save or show
fig.tight_layout()
fig.savefig('sine_cosine.png', dpi=150, bbox_inches='tight')
plt.show()

# Creating multiple Axes (a 2×2 grid)
fig, axes = plt.subplots(nrows=2, ncols=2, figsize=(12, 8))
# axes is a 2D numpy array — access with axes[row, col]
axes[0, 0].set_title('Top Left')
axes[0, 1].set_title('Top Right')
axes[1, 0].set_title('Bottom Left')
axes[1, 1].set_title('Bottom Right')
plt.tight_layout()
plt.show()</code></pre>` },
    { type: 'tip', body: `Always use the OO API — <code>fig, ax = plt.subplots()</code> — even for single plots. It makes adding subplots trivial, keeps code readable, and is the only approach that scales. The pyplot API (<code>plt.plot()</code> without an axes object) uses a hidden global state that breaks unpredictably in loops, functions, and Jupyter notebooks with multiple cells.` },
    { type: 'exercise', title: 'Build a Figure with 3 Axes using OO API and configure each independently', hint: 'Use plt.subplots(1, 3), plot different functions in each, apply different titles and styles to each axes individually', solution: `import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(1, 3, figsize=(15, 5))
fig.suptitle('Three Axes — OO API Demo', fontsize=14, fontweight='bold')

x = np.linspace(-3, 3, 300)

# Axes 0: Gaussian
axes[0].plot(x, np.exp(-x**2), color='#2d6be4', linewidth=2)
axes[0].fill_between(x, np.exp(-x**2), alpha=0.15, color='#2d6be4')
axes[0].set_title('Gaussian Curve')
axes[0].set_xlabel('x'); axes[0].set_ylabel('f(x)')

# Axes 1: Step function
axes[1].step(x, np.sign(x), color='#e07b39', linewidth=2, where='mid')
axes[1].axhline(0, color='gray', linewidth=0.8, linestyle='--')
axes[1].set_title('Sign Function')
axes[1].set_xlabel('x')
axes[1].set_ylim(-1.5, 1.5)
axes[1].set_yticks([-1, 0, 1])

# Axes 2: Polar-like plot using Cartesian
t = np.linspace(0, 2*np.pi, 500)
r = 1 + 0.5 * np.sin(5*t)
axes[2].plot(r * np.cos(t), r * np.sin(t), color='#2db85e', linewidth=1.5)
axes[2].set_title('Rose Curve')
axes[2].set_aspect('equal')
axes[2].set_xlabel('x'); axes[2].set_ylabel('y')

# Apply shared style to all axes
for ax in axes:
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.grid(alpha=0.2)

plt.tight_layout()
plt.show()` }
  ]
};

L['dataviz-w2-l2'] = {
  title: 'Core Charts — Line, Bar, Scatter, Histogram',
  sections: [
    { type: 'text', body: `<h2>The Four Workhorses</h2>
<p>Four chart types cover the vast majority of analytical needs: line charts for trends, bar charts for comparisons, scatter plots for relationships, and histograms for distributions. Mastering these in Matplotlib — including their parameters, variations, and common customisations — is the foundation of all visualisation work.</p>
<h3>Line Charts</h3>
<pre><code>import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

# Multi-line chart with markers, colours, and fill
fig, ax = plt.subplots(figsize=(10, 5))

months = np.arange(1, 13)
revenue_2023 = [45, 52, 48, 61, 70, 68, 75, 82, 79, 88, 95, 110]
revenue_2022 = [38, 40, 44, 50, 55, 58, 60, 65, 68, 72, 78, 85]

ax.plot(months, revenue_2023, color='#2d6be4', marker='o', markersize=6,
        linewidth=2.5, label='2023', zorder=3)
ax.plot(months, revenue_2022, color='#e07b39', marker='s', markersize=5,
        linewidth=2, linestyle='--', label='2022', alpha=0.8, zorder=2)
ax.fill_between(months, revenue_2022, revenue_2023, alpha=0.08, color='#2d6be4')

ax.set_xticks(months)
ax.set_xticklabels(['Jan','Feb','Mar','Apr','May','Jun',
                    'Jul','Aug','Sep','Oct','Nov','Dec'])
ax.set_ylabel('Revenue (₹ Lakhs)')
ax.set_title('Monthly Revenue — Year-on-Year Comparison')
ax.legend()
ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
ax.grid(axis='y', alpha=0.3)
plt.tight_layout(); plt.show()</code></pre>` },
    { type: 'text', body: `<h3>Bar Charts, Scatter Plots & Histograms</h3>
<pre><code># Bar chart — grouped
fig, axes = plt.subplots(1, 3, figsize=(16, 5))

# Grouped bar
categories = ['North', 'South', 'East', 'West']
q1 = [23, 31, 19, 27]; q2 = [28, 25, 24, 32]
x = np.arange(len(categories)); width = 0.35
axes[0].bar(x - width/2, q1, width, label='Q1', color='#2d6be4')
axes[0].bar(x + width/2, q2, width, label='Q2', color='#e07b39')
axes[0].set_xticks(x); axes[0].set_xticklabels(categories)
axes[0].set_title('Grouped Bar — Regional Sales')
axes[0].legend()

# Scatter with colour and size encoding
np.random.seed(0)
n = 80
x_sc = np.random.randn(n); y_sc = x_sc * 0.7 + np.random.randn(n) * 0.5
sizes = np.random.uniform(30, 300, n)
colors_sc = np.random.uniform(0, 1, n)
sc = axes[1].scatter(x_sc, y_sc, c=colors_sc, s=sizes, cmap='viridis',
                     alpha=0.7, edgecolors='white', linewidth=0.5)
plt.colorbar(sc, ax=axes[1], label='Third variable')
axes[1].set_title('Scatter — 4D via colour + size')

# Histogram with KDE overlay
data = np.concatenate([np.random.normal(65, 10, 200), np.random.normal(85, 8, 100)])
axes[2].hist(data, bins=25, density=True, color='#2d6be4', alpha=0.6, edgecolor='white')
from scipy.stats import gaussian_kde
kde = gaussian_kde(data)
x_kde = np.linspace(data.min(), data.max(), 200)
axes[2].plot(x_kde, kde(x_kde), color='#e07b39', linewidth=2)
axes[2].set_title('Histogram + KDE overlay')
axes[2].set_xlabel('Score')

for ax in axes:
    ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
plt.tight_layout(); plt.show()</code></pre>` },
    { type: 'tip', body: `For bar charts, always sort by value (descending) unless there is a natural order (time, ranking). An unsorted bar chart forces the reader to scan every bar to find the largest — wasted cognitive effort. <code>df.sort_values('value', ascending=False).plot.barh()</code> is three seconds of work that dramatically improves readability.` },
    { type: 'exercise', title: 'Build a 4-panel dashboard showing the four core chart types on one dataset', hint: 'Use the tips dataset, show tips by day (bar), bill vs tip (scatter), tip distribution (histogram), and cumulative revenue by week (line)', solution: `import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

tips = sns.load_dataset('tips')
fig, axes = plt.subplots(2, 2, figsize=(14, 10))
fig.suptitle('Tips Dataset — Four Chart Types', fontsize=14, fontweight='bold')

# Bar — average tip by day
avg_tip = tips.groupby('day')['tip'].mean().reindex(['Thur','Fri','Sat','Sun'])
axes[0,0].barh(avg_tip.index, avg_tip.values, color='#2d6be4')
axes[0,0].set_title('Average Tip by Day')
axes[0,0].set_xlabel('Average Tip (\$)')
for v, name in zip(avg_tip.values, avg_tip.index):
    axes[0,0].text(v+0.05, name, f'\${v:.2f}', va='center', fontsize=9)

# Scatter — bill vs tip coloured by size
sc = axes[0,1].scatter(tips['total_bill'], tips['tip'],
                       c=tips['size'], cmap='Blues', s=60,
                       alpha=0.7, edgecolors='gray', linewidth=0.3)
plt.colorbar(sc, ax=axes[0,1], label='Party size')
axes[0,1].set_title('Bill vs Tip (coloured by party size)')
axes[0,1].set_xlabel('Total Bill (\$)'); axes[0,1].set_ylabel('Tip (\$)')

# Histogram — tip amount distribution
axes[1,0].hist(tips['tip'], bins=20, color='#e07b39', edgecolor='white', alpha=0.8)
axes[1,0].axvline(tips['tip'].mean(), color='#2d6be4', linestyle='--',
                  linewidth=1.5, label=f'Mean: \${tips["tip"].mean():.2f}')
axes[1,0].set_title('Tip Distribution')
axes[1,0].set_xlabel('Tip (\$)')
axes[1,0].legend()

# Line — cumulative tips over index (proxy for time)
cumulative = tips['tip'].cumsum()
axes[1,1].plot(cumulative.values, color='#2db85e', linewidth=2)
axes[1,1].fill_between(range(len(cumulative)), cumulative.values, alpha=0.1, color='#2db85e')
axes[1,1].set_title('Cumulative Tips Over Visits')
axes[1,1].set_xlabel('Visit number'); axes[1,1].set_ylabel('Cumulative (\$)')

for ax in axes.flat:
    ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
    ax.grid(alpha=0.2)

plt.tight_layout(); plt.show()` }
  ]
};

L['dataviz-w2-l3'] = {
  title: 'Customisation — Titles, Labels, Ticks, Legends & Annotations',
  sections: [
    { type: 'text', body: `<h2>Making Charts Communication-Ready</h2>
<p>A chart that tells the right story with the right data can still fail if the audience cannot read it — missing axis labels, tiny tick text, a legend that requires a key lookup, or a title that says nothing. Customisation is not decoration; it is the last mile of communication.</p>
<h3>Titles and Axis Labels</h3>
<pre><code>import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(10, 6))

# Title hierarchy: main title + subtitle
ax.set_title('Customer Churn Rate by Quarter', fontsize=14, fontweight='bold', pad=20)
fig.text(0.5, 0.92, 'Year-over-year comparison: 2022 vs 2023 | Source: CRM System',
         ha='center', fontsize=9, color='#888', style='italic')

# Axis labels with units
ax.set_xlabel('Quarter', fontsize=11, labelpad=10)
ax.set_ylabel('Churn Rate (%)', fontsize=11, labelpad=10)

# Custom tick locations and labels
quarters = [1, 2, 3, 4]
ax.set_xticks(quarters)
ax.set_xticklabels(['Q1\\nJan–Mar', 'Q2\\nApr–Jun', 'Q3\\nJul–Sep', 'Q4\\nOct–Dec'],
                   fontsize=10)
ax.set_yticks(range(0, 25, 5))
ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda v, _: f'{v:.0f}%'))

# Tick styling
ax.tick_params(axis='both', which='major', length=4, color='#ccc', labelsize=10)
ax.tick_params(axis='x', bottom=False)  # hide x tick marks but keep labels
plt.tight_layout(); plt.show()</code></pre>` },
    { type: 'text', body: `<h3>Legends and Annotations</h3>
<pre><code>import matplotlib.pyplot as plt
import numpy as np

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

# Left: Legend customisation
x = np.arange(6)
lines_data = {'Product A': [12,15,14,18,20,22], 'Product B': [8,9,11,10,13,15]}
colors = ['#2d6be4', '#e07b39']
for (label, vals), col in zip(lines_data.items(), colors):
    ax1.plot(x, vals, color=col, label=label, marker='o', linewidth=2)
ax1.legend(
    title='Products', title_fontsize=10,
    fontsize=9, loc='upper left',
    framealpha=0.9, edgecolor='#ddd',
    bbox_to_anchor=(0.02, 0.98)
)
ax1.set_title('Legend Customisation')

# Right: Annotations — pointing out key events
months = np.arange(12)
price = [100, 108, 105, 112, 125, 118, 130, 145, 138, 142, 155, 170]
ax2.plot(months, price, color='#2d6be4', linewidth=2, marker='o', markersize=4)

# Arrow annotation for a key event
ax2.annotate(
    'Product launch\\n(+25% revenue)',
    xy=(4, 125), xytext=(5.5, 108),
    arrowprops=dict(arrowstyle='->', color='#e04444', lw=1.5),
    fontsize=9, color='#e04444', fontweight='bold'
)
# Simple text annotation (no arrow)
ax2.text(10.2, 156, 'YE target\\n✓ Hit!', fontsize=8, color='#2db85e', fontweight='bold')
ax2.axhline(150, color='#2db85e', linestyle='--', linewidth=1, alpha=0.7)

ax2.set_xticks(months)
ax2.set_xticklabels(['J','F','M','A','M','J','J','A','S','O','N','D'])
ax2.set_title('Annotations — Pointing Out Key Events')

for ax in (ax1, ax2):
    ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
    ax.grid(alpha=0.2)
plt.tight_layout(); plt.show()</code></pre>` },
    { type: 'tip', body: `Replace legends with <strong>direct labels</strong> whenever you have 2–4 lines. Position the label at the end of the line (<code>ax.text(x[-1], y[-1], 'Label')</code>) so the reader's eye naturally flows from the line to its name. This eliminates the cognitive cost of looking away from the data to a legend box and back. Direct labels are always clearer than legends for line charts.` },
    { type: 'exercise', title: 'Add a full annotation layer to a financial chart — events, targets, and call-outs', hint: 'Plot a stock-price-like time series, add annotations for key events, a horizontal target line, and a shaded recession band', solution: `import matplotlib.pyplot as plt
import numpy as np
import matplotlib.patches as mpatches

np.random.seed(42)
days = np.arange(252)  # 1 trading year
price = 100 + np.cumsum(np.random.randn(252) * 1.2)

fig, ax = plt.subplots(figsize=(13, 6))
ax.plot(days, price, color='#2d6be4', linewidth=1.8, zorder=3)
ax.fill_between(days, price, price.min()-2, alpha=0.07, color='#2d6be4', zorder=2)

# Shaded band for a downturn period
ax.axvspan(60, 100, alpha=0.08, color='red', label='Market downturn')

# Target price line
target = 115
ax.axhline(target, color='#2db85e', linestyle='--', linewidth=1.2, alpha=0.8)
ax.text(252, target+0.5, f'Target: \${target:.0f}', fontsize=9,
        color='#2db85e', va='bottom', ha='right')

# Key event annotations
events = [
    (30, price[30], 'Q1 earnings\\n+8% beat', 'up'),
    (75, price[75], 'CEO resigns', 'down'),
    (120, price[120], 'Acquisition\\nannounced', 'up'),
    (200, price[200], 'Record\\nrevenue', 'up'),
]
for day, px_val, label, direction in events:
    dy = 8 if direction == 'up' else -8
    ax.annotate(label, xy=(day, px_val),
                xytext=(day + (10 if day < 220 else -40), px_val + dy),
                arrowprops=dict(arrowstyle='->', color='#555', lw=1.2),
                fontsize=8, ha='center',
                bbox=dict(boxstyle='round,pad=0.3', fc='white', ec='#ccc', alpha=0.9))
    ax.plot(day, px_val, 'o', color='#e07b39', zorder=4, markersize=6)

ax.set_title('Simulated Stock Price — Annotated Events', fontsize=13, fontweight='bold')
ax.set_xlabel('Trading day')
ax.set_ylabel('Price (\$)')
ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
ax.grid(alpha=0.15)
ax.legend(loc='upper left', fontsize=9, framealpha=0.8)
plt.tight_layout(); plt.show()` }
  ]
};

L['dataviz-w2-l4'] = {
  title: 'Subplots & GridSpec — Complex Multi-panel Layouts',
  sections: [
    { type: 'text', body: `<h2>Beyond the Single Chart</h2>
<p>Real dashboards and reports require multiple charts in a single figure — sometimes in a simple grid, sometimes in an asymmetric layout where one chart is wider or taller than others. Matplotlib provides three mechanisms for multi-panel layouts, in increasing order of flexibility.</p>
<h3>1. plt.subplots() — Simple Grids</h3>
<pre><code>import matplotlib.pyplot as plt
import numpy as np

# Regular grid: 2 rows × 3 columns
fig, axes = plt.subplots(2, 3, figsize=(14, 8))
# axes is shape (2, 3) — index with [row, col]

# Shared axes: useful when plots share the same scale
fig, axes = plt.subplots(1, 3, figsize=(14, 4),
                         sharex=True, sharey=True)
# All axes share x range and y range — one zoom affects all

# Flatten for easy iteration
for i, ax in enumerate(axes.flat):
    ax.plot(np.random.randn(50).cumsum())
    ax.set_title(f'Series {i+1}')
plt.tight_layout(); plt.show()</code></pre>
<h3>2. GridSpec — Asymmetric Layouts</h3>
<pre><code>import matplotlib.gridspec as gridspec

fig = plt.figure(figsize=(14, 8))
gs = gridspec.GridSpec(3, 3, figure=fig, hspace=0.4, wspace=0.3)

# Large chart spanning 2 rows × 2 columns (top-left)
ax_main = fig.add_subplot(gs[0:2, 0:2])
ax_main.set_title('Main Chart (2×2)')

# Sidebar chart: 2 rows × 1 column (top-right)
ax_side = fig.add_subplot(gs[0:2, 2])
ax_side.set_title('Side Chart (2×1)')

# Bottom row: three equal panels
ax_b1 = fig.add_subplot(gs[2, 0])
ax_b2 = fig.add_subplot(gs[2, 1])
ax_b3 = fig.add_subplot(gs[2, 2])
for ax, title in zip([ax_b1, ax_b2, ax_b3], ['Metric A', 'Metric B', 'Metric C']):
    ax.set_title(title)
plt.show()</code></pre>` },
    { type: 'text', body: `<h3>3. subplot_mosaic() — Named Panels</h3>
<pre><code>import matplotlib.pyplot as plt
import numpy as np

# Define layout with ASCII art — letters become axes
layout = [
    ['main', 'main', 'side'],
    ['main', 'main', 'side'],
    ['bot1', 'bot2', 'bot3'],
]
fig, axd = plt.subplot_mosaic(layout, figsize=(14, 9),
                              gridspec_kw={'hspace': 0.4, 'wspace': 0.3})

# Access axes by name — much more readable
np.random.seed(42)
x = np.linspace(0, 10, 200)

axd['main'].plot(x, np.sin(x) + np.random.randn(200) * 0.15, alpha=0.8, color='#2d6be4')
axd['main'].set_title('Main Time Series (spanning 2×2)', fontsize=12)

axd['side'].barh(['A','B','C','D'], [4,7,3,9], color='#e07b39')
axd['side'].set_title('Rankings')

for key, color in zip(['bot1','bot2','bot3'], ['#2db85e','#9b59b6','#e04444']):
    axd[key].hist(np.random.randn(200), bins=15, color=color, alpha=0.7, edgecolor='white')
    axd[key].set_title(key.title())

for ax in axd.values():
    ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)

plt.suptitle('subplot_mosaic — Named Panel Layout', fontsize=14, fontweight='bold', y=1.01)
plt.show()</code></pre>` },
    { type: 'tip', body: `Use <code>subplot_mosaic()</code> for any layout with panels of different sizes — it is far more readable than GridSpec slicing because the ASCII layout makes the visual structure immediately obvious in the code. Reserve GridSpec for programmatic layouts (e.g., creating panels in a loop) or when you need fine-grained control over spacing between specific panels.` },
    { type: 'exercise', title: 'Design a financial summary figure with an asymmetric 3-panel layout', hint: 'Use subplot_mosaic with a wide main chart on top and two smaller panels on the bottom, each showing a different view of the same dataset', solution: `import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

np.random.seed(42)
days = pd.date_range('2024-01-01', periods=90)
price = 100 + np.cumsum(np.random.randn(90) * 0.8)
volume = np.random.randint(500000, 2000000, 90)
returns = np.diff(price) / price[:-1] * 100

layout = [['price', 'price', 'price'],
          ['volume', 'returns', 'stats']]
fig, axd = plt.subplot_mosaic(layout, figsize=(15, 9),
                              gridspec_kw={'hspace': 0.4})
fig.suptitle('90-Day Trading Summary', fontsize=14, fontweight='bold')

# Main: price chart
axd['price'].plot(days, price, color='#2d6be4', linewidth=2)
axd['price'].fill_between(days, price, price.min()-1, alpha=0.08, color='#2d6be4')
axd['price'].set_title('Stock Price')
axd['price'].set_ylabel('Price (\$)')

# Volume bar chart
colors_vol = ['#2db85e' if r > 0 else '#e04444' for r in np.append([0], returns)]
axd['volume'].bar(days, volume, color=colors_vol, width=0.8, alpha=0.8)
axd['volume'].set_title('Volume')
axd['volume'].yaxis.set_major_formatter(plt.FuncFormatter(lambda v,_: f'{v/1e6:.1f}M'))

# Returns distribution
axd['returns'].hist(returns, bins=20, color='#9b59b6', edgecolor='white', alpha=0.8)
axd['returns'].axvline(0, color='white', linewidth=1)
axd['returns'].set_title('Daily Returns Distribution')
axd['returns'].set_xlabel('Return (%)')

# Summary stats text box
stats_text = (f"Period: 90 days\\n"
              f"Start: \${price[0]:.2f}\\n"
              f"End: \${price[-1]:.2f}\\n"
              f"Return: {(price[-1]/price[0]-1)*100:+.1f}%\\n"
              f"Volatility: {returns.std():.2f}%\\n"
              f"Max Drawdown: {((price - np.maximum.accumulate(price)) / np.maximum.accumulate(price)).min()*100:.1f}%")
axd['stats'].text(0.1, 0.5, stats_text, transform=axd['stats'].transAxes,
                 fontsize=10, va='center', fontfamily='monospace',
                 bbox=dict(boxstyle='round', fc='#1a1b1e', ec='#2d6be4', alpha=0.9))
axd['stats'].set_title('Key Metrics')
axd['stats'].axis('off')

for key, ax in axd.items():
    if key != 'stats':
        ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
        ax.grid(alpha=0.15)

plt.tight_layout(); plt.show()` }
  ]
};

L['dataviz-w2-l5'] = {
  title: 'Publication-Quality Figures — Styles, rcParams & Exporting',
  sections: [
    { type: 'text', body: `<h2>From Notebook to Publication</h2>
<p>The default Matplotlib style produces charts suitable for quick exploration but not for publications, reports, or presentations. Three mechanisms control the visual defaults of all charts: <strong>style sheets</strong>, <strong>rcParams</strong>, and <strong>context managers</strong>. Using them correctly means you set your visual theme once and every chart inherits it automatically.</p>
<h3>Built-in Style Sheets</h3>
<pre><code>import matplotlib.pyplot as plt
import matplotlib as mpl

# List all available styles
print(plt.style.available)
# ['Solarize_Light2', '_classic_test_patch', 'bmh', 'classic',
#  'dark_background', 'fast', 'fivethirtyeight', 'ggplot',
#  'grayscale', 'seaborn-v0_8', 'seaborn-v0_8-paper', ...]

# Apply a style
plt.style.use('seaborn-v0_8-whitegrid')   # clean white with gridlines
plt.style.use('fivethirtyeight')            # bold, opinionated journalism style

# Apply temporarily for just one chart
with plt.style.context('dark_background'):
    fig, ax = plt.subplots()
    ax.plot([1, 2, 3], [4, 1, 7])
    plt.show()
# After the block, style reverts to previous setting</code></pre>
<h3>rcParams — Fine-grained Global Defaults</h3>
<pre><code># Set individual parameters
mpl.rcParams['font.family'] = 'DejaVu Sans'
mpl.rcParams['font.size'] = 11
mpl.rcParams['axes.spines.top'] = False
mpl.rcParams['axes.spines.right'] = False
mpl.rcParams['axes.grid'] = True
mpl.rcParams['grid.alpha'] = 0.3
mpl.rcParams['grid.linewidth'] = 0.7
mpl.rcParams['figure.dpi'] = 120

# Or set many at once
mpl.rc('axes', titlesize=13, titleweight='bold', labelsize=11)
mpl.rc('xtick', labelsize=9); mpl.rc('ytick', labelsize=9)
mpl.rc('legend', fontsize=9, framealpha=0.9)
mpl.rc('figure', figsize=(10, 6), facecolor='white')

# Reset to defaults
mpl.rcdefaults()</code></pre>` },
    { type: 'text', body: `<h3>Custom Style File & Saving Figures</h3>
<pre><code># Create a reusable style file: ~/.config/matplotlib/stylelib/dsa.mplstyle
# Contents of dsa.mplstyle:
# axes.spines.top: False
# axes.spines.right: False
# axes.grid: True
# grid.alpha: 0.3
# grid.color: "#e0e0e0"
# font.size: 11
# axes.labelsize: 11
# axes.titlesize: 13
# axes.titleweight: bold
# figure.figsize: 10, 6
# figure.facecolor: white

# Then use: plt.style.use('dsa')

# Saving figures for different use cases
fig, ax = plt.subplots(figsize=(10, 6))
ax.plot([1, 2, 3, 4], [10, 14, 12, 18], color='#2d6be4', linewidth=2)
ax.set_title('Example Chart')

# For web (PNG, compact)
fig.savefig('chart.png', dpi=96, bbox_inches='tight', facecolor='white')

# For print/publication (PDF, vector)
fig.savefig('chart.pdf', bbox_inches='tight', facecolor='white')

# For high-res PNG (journals, posters)
fig.savefig('chart_hires.png', dpi=300, bbox_inches='tight', facecolor='white')

# For web with transparency (PNG)
fig.savefig('chart_transparent.png', dpi=150, bbox_inches='tight',
            transparent=True)

# For presentations (wider, larger fonts)
with mpl.rc_context({'font.size': 14, 'axes.titlesize': 16}):
    fig_pres, ax_pres = plt.subplots(figsize=(13, 7))
    ax_pres.plot([1, 2, 3, 4], [10, 14, 12, 18], color='#2d6be4', linewidth=3)
    ax_pres.set_title('Presentation Chart')
    fig_pres.savefig('chart_presentation.png', dpi=150, bbox_inches='tight')</code></pre>` },
    { type: 'tip', body: `Always use <code>bbox_inches='tight'</code> when saving — it prevents clipping of axis labels and titles that extend beyond the axes bounds. Without it, long y-axis labels and rotated x-tick labels are frequently cut off. Also always set <code>facecolor='white'</code> unless you specifically want a transparent background — the default transparent background looks invisible on dark slide backgrounds.` },
    { type: 'exercise', title: 'Create a custom rcParams theme and apply it to a multi-chart summary', hint: 'Define a DSA theme using rc_context, build 4 charts inside it, save as PDF and PNG at two resolutions', solution: `import matplotlib.pyplot as plt
import matplotlib as mpl
import numpy as np

# Define DSA custom theme
DSA_THEME = {
    'font.family': 'DejaVu Sans',
    'font.size': 11,
    'axes.spines.top': False,
    'axes.spines.right': False,
    'axes.grid': True,
    'grid.alpha': 0.25,
    'grid.color': '#cccccc',
    'grid.linewidth': 0.7,
    'axes.labelsize': 11,
    'axes.titlesize': 12,
    'axes.titleweight': 'bold',
    'axes.prop_cycle': mpl.cycler(color=['#2d6be4','#e07b39','#2db85e','#9b59b6','#e04444']),
    'figure.facecolor': 'white',
    'figure.figsize': (12, 8),
    'xtick.labelsize': 9,
    'ytick.labelsize': 9,
    'legend.fontsize': 9,
    'legend.framealpha': 0.9,
}

np.random.seed(42)
x = np.linspace(0, 10, 100)

with mpl.rc_context(DSA_THEME):
    fig, axes = plt.subplots(2, 2)
    fig.suptitle('DSA Custom Theme Demo', fontsize=14, fontweight='bold')

    axes[0,0].plot(x, np.sin(x), label='sin(x)')
    axes[0,0].plot(x, np.cos(x), label='cos(x)')
    axes[0,0].set_title('Line Chart'); axes[0,0].legend()

    axes[0,1].bar(['A','B','C','D'], [23,45,12,34])
    axes[0,1].set_title('Bar Chart')

    axes[1,0].scatter(np.random.randn(80), np.random.randn(80), alpha=0.6, s=40)
    axes[1,0].set_title('Scatter Plot')

    axes[1,1].hist(np.random.randn(300), bins=20, edgecolor='white', alpha=0.8)
    axes[1,1].set_title('Histogram')

    plt.tight_layout()
    fig.savefig('dsa_theme_web.png', dpi=96, bbox_inches='tight')
    fig.savefig('dsa_theme_print.pdf', bbox_inches='tight')
    fig.savefig('dsa_theme_hires.png', dpi=200, bbox_inches='tight')
    plt.show()
    print("Saved: web (96dpi PNG), print (PDF), hi-res (200dpi PNG)")` }
  ]
};

L['dataviz-w2-quiz'] = {
  title: 'Quiz — Matplotlib Deep Dive',
  sections: [
    { type: 'text', body: `<h2>Module 2 Quiz</h2><p>Test your understanding of Matplotlib's object model, chart types, customisation, layouts, and figure export.</p>` }
  ]
};

/* ─── MODULE 3 — Statistical Visualisation with Seaborn ─────────────────── */

L['dataviz-w3-l1'] = {
  title: 'Seaborn Architecture — Themes, Palettes & Long-form Data',
  sections: [
    { type: 'text', body: `<h2>What Seaborn Adds to Matplotlib</h2>
<p>Seaborn is a statistical visualisation library built on top of Matplotlib. It adds: a higher-level API for common statistical plots (one function call instead of 20 lines), a theme and palette system, built-in support for Pandas DataFrames, and automatic statistical aggregation (means, confidence intervals, regression lines) computed on the fly.</p>
<h3>Seaborn's Theme System</h3>
<pre><code>import seaborn as sns
import matplotlib.pyplot as plt

# Five built-in styles
for style in ['darkgrid', 'whitegrid', 'dark', 'white', 'ticks']:
    print(style)

# Apply a style (affects all subsequent plots)
sns.set_theme(style='whitegrid', palette='muted', font_scale=1.1)

# Styles explained:
# darkgrid  — dark background with grid (good for presentations)
# whitegrid — white background with grid (good for papers/reports) ← recommended
# dark      — dark background, no grid
# white     — white background, no grid (use with despine())
# ticks     — white with tick marks only

# Despine removes the top/right spines (Tufte-style)
fig, ax = plt.subplots()
sns.lineplot(x=[1,2,3], y=[4,2,6], ax=ax)
sns.despine()   # applies to current axes
sns.despine(ax=ax, left=True)  # remove left spine too (for horizontal bar)</code></pre>
<h3>Palette System</h3>
<pre><code># Set palette globally
sns.set_palette('Set2')

# Or pass per-chart
sns.barplot(data=df, x='category', y='value', palette='Blues_d')

# Useful palettes by type:
# Categorical: Set2, tab10, Paired, colorblind (accessible)
# Sequential:  Blues, viridis, rocket, mako, flare
# Diverging:   coolwarm, RdBu, vlag, icefire

# Preview a palette
sns.palplot(sns.color_palette('Set2', 8))
plt.show()</code></pre>` },
    { type: 'text', body: `<h3>Wide-form vs Long-form Data</h3>
<p>Seaborn strongly prefers <strong>long-form (tidy) data</strong>: one row per observation, one column per variable. Wide-form data (one column per group) needs melting before use with most Seaborn functions.</p>
<pre><code>import pandas as pd
import seaborn as sns

# Wide-form data (not ideal for Seaborn)
wide = pd.DataFrame({
    'month': ['Jan','Feb','Mar','Apr'],
    'product_a': [120, 145, 132, 168],
    'product_b': [95, 102, 118, 125]
})

# Convert to long-form (tidy) — melt
long = wide.melt(id_vars='month', var_name='product', value_name='sales')
#   month    product  sales
#   Jan    product_a    120
#   Jan    product_b     95
#   Feb    product_a    145
#   ...

# Now Seaborn can use it naturally
fig, ax = plt.subplots(figsize=(9, 5))
sns.lineplot(data=long, x='month', y='sales', hue='product',
             palette='Set2', marker='o', ax=ax)
ax.set_title('Monthly Sales by Product')
sns.despine()
plt.show()

# The 'hue', 'style', 'size' parameters all reference column names
# hue  → colour encoding
# style → line/marker style encoding
# size  → size encoding</code></pre>` },
    { type: 'tip', body: `Always call <code>sns.set_theme()</code> once at the top of your notebook — before any imports or plot calls. It applies globally to both Seaborn and Matplotlib charts for the rest of the session. Combine <code>style='whitegrid'</code> with <code>palette='muted'</code> for a professional, readable look that works equally well in light and dark environments.` },
    { type: 'exercise', title: 'Melt a wide dataset and explore Seaborn\'s theme and hue system', hint: 'Load the flights dataset from seaborn, melt it to long form, then create line charts exploring hue, style, and palette options', solution: `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

# Load and inspect
flights = sns.load_dataset('flights')
print(flights.head())
# month, year, passengers — already long form!

# Pivot to wide, then melt back (to practise melting)
wide = flights.pivot(index='month', columns='year', values='passengers')
print("Wide form shape:", wide.shape)

# Melt back to long
long = wide.reset_index().melt(id_vars='month', var_name='year', value_name='passengers')
long['year'] = long['year'].astype(str)

# Explore themes side by side
fig, axes = plt.subplots(1, 2, figsize=(14, 6))

# Chart 1: whitegrid + muted
with sns.axes_style('whitegrid'):
    sns.lineplot(data=long[long['year'].isin(['1949','1954','1959'])],
                 x='month', y='passengers', hue='year', style='year',
                 markers=True, palette='muted', ax=axes[0])
    axes[0].set_title('whitegrid style, muted palette')
    axes[0].tick_params(axis='x', rotation=30)

# Chart 2: darkgrid + Set2
with sns.axes_style('darkgrid'):
    sns.lineplot(data=long[long['year'].isin(['1949','1954','1959'])],
                 x='month', y='passengers', hue='year', style='year',
                 markers=True, palette='Set2', ax=axes[1])
    axes[1].set_title('darkgrid style, Set2 palette')
    axes[1].tick_params(axis='x', rotation=30)

plt.suptitle('Seaborn Themes & Palettes', fontsize=13, fontweight='bold')
plt.tight_layout(); plt.show()` }
  ]
};

L['dataviz-w3-l2'] = {
  title: 'Distribution Plots — histplot, kdeplot, ecdfplot & boxenplot',
  sections: [
    { type: 'text', body: `<h2>Understanding Distributions</h2>
<p>Distribution plots answer: <em>What values does this variable take, how often, and what shape does the spread have?</em> Seaborn provides four distinct approaches to visualising a single continuous variable's distribution, each revealing different aspects of the data.</p>
<h3>histplot — Binned Frequency</h3>
<pre><code>import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

sns.set_theme(style='whitegrid')
penguins = sns.load_dataset('penguins').dropna()

fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Basic histogram with automatic bins
sns.histplot(data=penguins, x='flipper_length_mm', ax=axes[0,0],
             color='#2d6be4', edgecolor='white', bins=20)
axes[0,0].set_title('histplot — basic')

# With KDE overlay and hue
sns.histplot(data=penguins, x='flipper_length_mm', hue='species',
             kde=True, stat='density', common_norm=False,
             palette='Set2', ax=axes[0,1], edgecolor='white')
axes[0,1].set_title('histplot — hue + KDE overlay')

# KDE only — smooth density estimate
sns.kdeplot(data=penguins, x='flipper_length_mm', hue='species',
            fill=True, alpha=0.4, palette='Set2', ax=axes[1,0],
            common_norm=False, linewidth=2)
axes[1,0].set_title('kdeplot — filled by species')

# ECDF — empirical cumulative distribution function
sns.ecdfplot(data=penguins, x='flipper_length_mm', hue='species',
             palette='Set2', ax=axes[1,1], linewidth=2)
axes[1,1].set_title('ecdfplot — what % of penguins have flipper ≤ x?')
axes[1,1].axhline(0.5, color='gray', linestyle='--', linewidth=0.8)
axes[1,1].text(220, 0.52, 'Median', fontsize=8, color='gray')

for ax in axes.flat:
    sns.despine(ax=ax)
plt.suptitle('Seaborn Distribution Plots — Penguin Flipper Length', fontsize=13, fontweight='bold')
plt.tight_layout(); plt.show()</code></pre>` },
    { type: 'text', body: `<h3>rugplot, displot & boxenplot</h3>
<pre><code>fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# rugplot — shows exact data positions as tick marks on the axis
sns.histplot(data=penguins, x='body_mass_g', ax=axes[0],
             color='#e07b39', edgecolor='white', bins=20, alpha=0.7)
sns.rugplot(data=penguins, x='body_mass_g', ax=axes[0],
            color='#e07b39', height=0.05, alpha=0.5)
axes[0].set_title('histplot + rugplot')

# displot — figure-level function (creates its own figure)
# Useful for faceted distribution exploration
# sns.displot(penguins, x='body_mass_g', col='species', kde=True, bins=15)

# boxenplot (letter-value plot) — better than boxplot for large datasets
# Shows more quantiles, revealing the full distribution shape
np.random.seed(42)
data_bxp = {
    'scores': np.concatenate([
        np.random.normal(70, 12, 300),
        np.random.normal(80, 8, 200),
        np.random.normal(60, 15, 150)
    ]),
    'class': ['A']*300 + ['B']*200 + ['C']*150
}
import pandas as pd
df_bxp = pd.DataFrame(data_bxp)

sns.boxplot(data=df_bxp, x='class', y='scores', palette='Set2', ax=axes[1], width=0.5)
axes[1].set_title('boxplot — shows quartiles')

sns.boxenplot(data=df_bxp, x='class', y='scores', palette='Set2', ax=axes[2])
axes[2].set_title('boxenplot — reveals full distribution shape')

for ax in axes:
    sns.despine(ax=ax)
plt.tight_layout(); plt.show()</code></pre>` },
    { type: 'tip', body: `Use <code>ecdfplot</code> when your audience asks questions like "what fraction of customers spend less than ₹500?" or "what percentage of models finish training in under 2 hours?" — the ECDF directly answers percentage-threshold questions without any mental arithmetic. It is also more robust than histograms because it has no arbitrary bin-width parameter to tune.` },
    { type: 'exercise', title: 'Compare the distribution of exam scores across three departments using four distribution plots', hint: 'Generate three score distributions with different shapes (normal, skewed, bimodal), then plot histplot, kdeplot, ecdfplot, and boxenplot in a 2×2 grid', solution: `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

sns.set_theme(style='whitegrid', palette='Set2')
np.random.seed(42)

# Three departments with different score distributions
scores = pd.DataFrame({
    'score': np.concatenate([
        np.random.normal(72, 10, 200),                          # CS — normal
        np.concatenate([np.random.normal(60, 8, 120),           # IT — bimodal
                        np.random.normal(82, 6, 80)]),
        np.random.beta(2, 8, 200) * 100                         # Maths — left skewed
    ]),
    'department': ['Computer Science']*200 + ['Information Tech']*200 + ['Mathematics']*200
})

fig, axes = plt.subplots(2, 2, figsize=(14, 10))
fig.suptitle('Exam Score Distributions by Department', fontsize=14, fontweight='bold')

# histplot
sns.histplot(data=scores, x='score', hue='department', bins=25,
             kde=True, stat='density', common_norm=False,
             alpha=0.5, ax=axes[0,0], edgecolor='white')
axes[0,0].set_title('histplot + KDE')

# kdeplot
sns.kdeplot(data=scores, x='score', hue='department', fill=True,
            alpha=0.35, common_norm=False, linewidth=2, ax=axes[0,1])
axes[0,1].set_title('kdeplot — Smooth Density')

# ecdfplot
sns.ecdfplot(data=scores, x='score', hue='department',
             linewidth=2.5, ax=axes[1,0])
axes[1,0].axvline(50, color='gray', linestyle=':', linewidth=1)
axes[1,0].text(51, 0.1, 'Pass mark\\n(50)', fontsize=8, color='gray')
axes[1,0].set_title('ecdfplot — Cumulative %')

# boxenplot
sns.boxenplot(data=scores, x='department', y='score',
              palette='Set2', ax=axes[1,1])
axes[1,1].tick_params(axis='x', rotation=10)
axes[1,1].set_title('boxenplot — Full Distribution Shape')

for ax in axes.flat:
    sns.despine(ax=ax)
plt.tight_layout(); plt.show()` }
  ]
};

L['dataviz-w3-l3'] = {
  title: 'Categorical Plots — boxplot, violinplot, barplot & stripplot',
  sections: [
    { type: 'text', body: `<h2>Visualising Distributions Across Groups</h2>
<p>When you have a continuous variable split across categorical groups, the question is: how does the distribution differ between groups? Seaborn provides a family of categorical plots that answer this at different levels of detail — from summary statistics (bar) to full distribution shape (violin).</p>
<h3>The Categorical Plot Family</h3>
<pre><code>import seaborn as sns
import matplotlib.pyplot as plt

sns.set_theme(style='whitegrid')
tips = sns.load_dataset('tips')

fig, axes = plt.subplots(2, 3, figsize=(16, 10))

# barplot — shows mean + 95% confidence interval (bootstrapped)
sns.barplot(data=tips, x='day', y='tip', hue='sex', palette='Set2',
            order=['Thur','Fri','Sat','Sun'], ax=axes[0,0], capsize=.08)
axes[0,0].set_title('barplot — Mean ± 95% CI')

# countplot — frequency of each category
sns.countplot(data=tips, x='day', hue='sex', palette='Set2',
              order=['Thur','Fri','Sat','Sun'], ax=axes[0,1])
axes[0,1].set_title('countplot — Frequency')

# boxplot — median, IQR, whiskers, outliers
sns.boxplot(data=tips, x='day', y='tip', hue='sex', palette='Set2',
            order=['Thur','Fri','Sat','Sun'], ax=axes[0,2], width=0.5,
            flierprops={'marker':'o','markersize':4,'alpha':0.5})
axes[0,2].set_title('boxplot — Median + IQR')

# violinplot — KDE of full distribution (+ inner boxplot)
sns.violinplot(data=tips, x='day', y='tip', hue='sex', split=True,
               palette='Set2', order=['Thur','Fri','Sat','Sun'],
               inner='quart', ax=axes[1,0])
axes[1,0].set_title('violinplot — Full distribution shape')

# stripplot — individual data points jittered
sns.stripplot(data=tips, x='day', y='tip', hue='sex', palette='Set2',
              order=['Thur','Fri','Sat','Sun'], jitter=True, alpha=0.6,
              dodge=True, ax=axes[1,1], size=4)
axes[1,1].set_title('stripplot — Every data point')

# swarmplot — non-overlapping points (better than strip for small n)
sns.swarmplot(data=tips, x='day', y='tip', hue='sex', palette='Set2',
              order=['Thur','Fri','Sat','Sun'], dodge=True, ax=axes[1,2], size=3)
axes[1,2].set_title('swarmplot — Non-overlapping points')

for ax in axes.flat:
    sns.despine(ax=ax)
    ax.legend(fontsize=8)
plt.suptitle('Seaborn Categorical Plots — Tips Dataset', fontsize=13, fontweight='bold')
plt.tight_layout(); plt.show()</code></pre>` },
    { type: 'text', body: `<h3>Combining Plots for Maximum Insight</h3>
<pre><code>import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset('tips')
fig, ax = plt.subplots(figsize=(10, 6))

# Layer: violin (full distribution) + strip (individual points)
sns.violinplot(data=tips, x='day', y='total_bill', palette='Set2',
               order=['Thur','Fri','Sat','Sun'], inner=None, alpha=0.5, ax=ax)
sns.stripplot(data=tips, x='day', y='total_bill',
              order=['Thur','Fri','Sat','Sun'],
              color='black', alpha=0.4, size=3, jitter=True, ax=ax)

# Add mean markers
import numpy as np
day_order = ['Thur','Fri','Sat','Sun']
for i, day in enumerate(day_order):
    mean_val = tips[tips['day']==day]['total_bill'].mean()
    ax.plot(i, mean_val, 'D', color='white', markersize=8,
            markeredgecolor='black', zorder=5)

ax.set_title('Total Bill by Day — Violin + Strip + Mean markers')
ax.set_xlabel('Day'); ax.set_ylabel('Total Bill (\$)')
sns.despine()
plt.tight_layout(); plt.show()</code></pre>` },
    { type: 'tip', body: `The <strong>violin + strip combination</strong> is the gold standard for small to medium datasets (n &lt; 1000). The violin shows the distribution shape; the strip shows every individual data point; diamond markers show the mean. This triple encoding gives the audience all three levels of detail — distribution, individual observations, and summary statistic — without requiring separate charts.` },
    { type: 'exercise', title: 'Compare salary distributions across job roles and departments using layered plots', hint: 'Generate a salary dataset with different distributions per role, then build a violin + stripplot combination with sorted order', solution: `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

sns.set_theme(style='whitegrid')
np.random.seed(42)

roles = {
    'Data Analyst':    (55000, 12000, 180),
    'Data Engineer':   (75000, 18000, 120),
    'ML Engineer':     (90000, 22000, 100),
    'Data Scientist':  (85000, 20000, 130),
    'BI Developer':    (60000, 10000, 90)
}
records = []
for role, (mean, std, n) in roles.items():
    salaries = np.random.normal(mean, std, n).clip(30000, 160000)
    records.append(pd.DataFrame({'role': role, 'salary': salaries}))
df = pd.concat(records, ignore_index=True)

# Sort by median salary for better readability
order = df.groupby('role')['salary'].median().sort_values().index.tolist()

fig, axes = plt.subplots(1, 2, figsize=(15, 7))

# Left: Violin + strip
sns.violinplot(data=df, x='salary', y='role', order=order,
               palette='Set2', inner=None, alpha=0.55, ax=axes[0])
sns.stripplot(data=df, x='salary', y='role', order=order,
              color='#333', alpha=0.25, size=2.5, jitter=True, ax=axes[0])
# Median markers
for i, role in enumerate(order):
    med = df[df['role']==role]['salary'].median()
    axes[0].plot(med, i, 'D', color='white', markersize=9,
                 markeredgecolor='#333', zorder=5)
axes[0].set_title('Salary Distribution by Role\\n(violin + strip + median)')
axes[0].set_xlabel('Annual Salary (₹)')
axes[0].xaxis.set_major_formatter(plt.FuncFormatter(lambda v,_: f'{v/1000:.0f}K'))

# Right: Boxenplot
sns.boxenplot(data=df, x='salary', y='role', order=order,
              palette='Set2', ax=axes[1])
axes[1].set_title('Salary Distribution — boxenplot')
axes[1].set_xlabel('Annual Salary (₹)')
axes[1].xaxis.set_major_formatter(plt.FuncFormatter(lambda v,_: f'{v/1000:.0f}K'))

for ax in axes:
    sns.despine(ax=ax)
plt.suptitle('Data Career Salary Survey', fontsize=13, fontweight='bold')
plt.tight_layout(); plt.show()` }
  ]
};

L['dataviz-w3-l4'] = {
  title: 'Relational Plots & Heatmaps — scatterplot, lineplot & heatmap',
  sections: [
    { type: 'text', body: `<h2>Showing Relationships Between Variables</h2>
<p>Relational plots reveal how two (or more) variables co-vary. Seaborn's <code>scatterplot</code> and <code>lineplot</code> are the primary tools, with <code>heatmap</code> for showing relationships across an entire matrix of variable pairs.</p>
<h3>scatterplot and lineplot</h3>
<pre><code>import seaborn as sns
import matplotlib.pyplot as plt

sns.set_theme(style='whitegrid')
penguins = sns.load_dataset('penguins').dropna()

fig, axes = plt.subplots(1, 2, figsize=(14, 6))

# scatterplot — 4 dimensions: x, y, hue, style
sns.scatterplot(data=penguins, x='bill_length_mm', y='bill_depth_mm',
                hue='species', style='sex', size='body_mass_g',
                sizes=(30, 200), palette='Set2', alpha=0.8, ax=axes[0])
axes[0].set_title('Bill Dimensions by Species, Sex & Body Mass')
axes[0].set_xlabel('Bill Length (mm)')
axes[0].set_ylabel('Bill Depth (mm)')

# lineplot — auto-aggregates (mean + CI) when multiple y per x
flights = sns.load_dataset('flights')
sns.lineplot(data=flights, x='month', y='passengers', hue='year',
             palette='Blues_d', linewidth=1.5, ax=axes[1],
             legend='auto')
axes[1].set_title('Monthly Passengers by Year\\n(mean + 95% CI shaded)')
axes[1].tick_params(axis='x', rotation=30)

for ax in axes:
    sns.despine(ax=ax)
plt.tight_layout(); plt.show()</code></pre>
<h3>Heatmap — Correlation Matrix</h3>
<pre><code>import pandas as pd
import numpy as np

fig, axes = plt.subplots(1, 2, figsize=(14, 6))

# Correlation heatmap
corr = penguins.select_dtypes('number').corr()
mask = np.triu(np.ones_like(corr, dtype=bool))  # hide upper triangle
sns.heatmap(corr, mask=mask, annot=True, fmt='.2f', cmap='coolwarm',
            center=0, vmin=-1, vmax=1, linewidths=0.5,
            ax=axes[0], cbar_kws={'shrink': 0.8})
axes[0].set_title('Penguin Feature Correlations')

# Pivot table heatmap — passengers by month and year
flights_pivot = flights.pivot(index='month', columns='year', values='passengers')
sns.heatmap(flights_pivot, cmap='YlOrRd', annot=True, fmt='d',
            linewidths=0.3, ax=axes[1], cbar_kws={'shrink': 0.8})
axes[1].set_title('Passengers by Month × Year')
axes[1].set_xlabel('Year'); axes[1].set_ylabel('')

plt.tight_layout(); plt.show()</code></pre>` },
    { type: 'tip', body: `Always mask the upper triangle of a correlation heatmap with <code>mask=np.triu(np.ones_like(corr, dtype=bool))</code> — the matrix is symmetric so showing both triangles doubles the visual clutter without adding information. Also always set <code>center=0</code> on the <code>coolwarm</code> colormap so that zero correlation maps to the neutral colour, not an arbitrary point in the scale.` },
    { type: 'exercise', title: 'Build a correlation analysis dashboard for a real dataset with scatter matrix and heatmap', hint: 'Load the diamonds or mpg dataset, compute correlations, build a heatmap and three key scatter plots showing the strongest relationships', solution: `import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

sns.set_theme(style='whitegrid')
mpg = sns.load_dataset('mpg').dropna()

fig, axes = plt.subplots(2, 2, figsize=(14, 11))
fig.suptitle('MPG Dataset — Relationship Analysis', fontsize=14, fontweight='bold')

# Correlation heatmap
num_cols = ['mpg','cylinders','displacement','horsepower','weight','acceleration','model_year']
corr = mpg[num_cols].corr()
mask = np.triu(np.ones_like(corr, dtype=bool))
sns.heatmap(corr, mask=mask, annot=True, fmt='.2f', cmap='RdBu_r',
            center=0, vmin=-1, vmax=1, linewidths=0.5,
            ax=axes[0,0], cbar_kws={'shrink': 0.7}, square=True)
axes[0,0].set_title('Feature Correlations')

# Weight vs MPG — strongest negative correlation
sns.scatterplot(data=mpg, x='weight', y='mpg', hue='cylinders',
                palette='viridis', size='displacement', sizes=(20,150),
                alpha=0.7, ax=axes[0,1])
axes[0,1].set_title('Weight vs MPG (strongest correlation: -0.83)')

# Horsepower vs MPG by origin
sns.scatterplot(data=mpg, x='horsepower', y='mpg', hue='origin',
                palette='Set2', alpha=0.7, s=40, ax=axes[1,0])
# Add regression lines per origin
for origin, grp in mpg.groupby('origin'):
    m, b = np.polyfit(grp['horsepower'], grp['mpg'], 1)
    x_line = np.linspace(grp['horsepower'].min(), grp['horsepower'].max(), 50)
    axes[1,0].plot(x_line, m*x_line+b, linewidth=1.5, alpha=0.8)
axes[1,0].set_title('Horsepower vs MPG by Origin')

# MPG trend over model year
sns.lineplot(data=mpg, x='model_year', y='mpg', hue='cylinders',
             palette='RdYlGn_r', linewidth=2, ax=axes[1,1], legend='auto')
axes[1,1].set_title('MPG Trend by Model Year & Cylinders')

for ax in axes.flat:
    sns.despine(ax=ax)
plt.tight_layout(); plt.show()` }
  ]
};

L['dataviz-w3-l5'] = {
  title: 'FacetGrid & PairGrid — Multi-panel Statistical Exploration',
  sections: [
    { type: 'text', body: `<h2>Trellis Charts — One Plot Per Group</h2>
<p>FacetGrid creates a grid of subplots where each panel shows the same chart for a different subset of the data. This "small multiples" technique enables direct comparison across groups without overloading a single panel. PairGrid is the specialised version for pairwise relationships between all numeric variables.</p>
<h3>FacetGrid</h3>
<pre><code>import seaborn as sns
import matplotlib.pyplot as plt

sns.set_theme(style='whitegrid')
tips = sns.load_dataset('tips')
penguins = sns.load_dataset('penguins').dropna()

# FacetGrid — row and column dimensions
g = sns.FacetGrid(tips, col='time', row='sex', height=4, aspect=1.2,
                  palette='Set2', margin_titles=True)
g.map_dataframe(sns.histplot, x='total_bill', bins=15,
                color='#2d6be4', edgecolor='white', alpha=0.8)
g.map_dataframe(sns.kdeplot, x='total_bill', color='#e07b39', linewidth=2)
g.set_axis_labels('Total Bill (\$)', 'Count')
g.set_titles(row_template='Sex: {row_name}', col_template='Time: {col_name}')
g.fig.suptitle('Bill Distribution by Sex and Meal Time', y=1.02, fontsize=13)
plt.show()

# FacetGrid with scatter and regression
g2 = sns.FacetGrid(penguins, col='species', height=4, aspect=1,
                   hue='sex', palette='Set2')
g2.map_dataframe(sns.scatterplot, x='bill_length_mm', y='bill_depth_mm',
                 alpha=0.7, s=40)
g2.add_legend()
g2.set_axis_labels('Bill Length (mm)', 'Bill Depth (mm)')
g2.set_titles(col_template='{col_name}')
g2.fig.suptitle('Bill Dimensions by Species', y=1.02)
plt.show()</code></pre>` },
    { type: 'text', body: `<h3>PairGrid and pairplot</h3>
<pre><code># pairplot — quick version of PairGrid
# Diagonal: distribution of each variable
# Off-diagonal: scatter between all pairs
pair_p = sns.pairplot(penguins, hue='species', palette='Set2',
                      plot_kws={'alpha': 0.5, 's': 30},
                      diag_kind='kde',
                      corner=True)        # lower triangle only (saves space)
pair_p.fig.suptitle('Penguin Feature Pairs', y=1.01, fontsize=13)
plt.show()

# PairGrid — full control over diagonal, upper, and lower panels
g = sns.PairGrid(penguins.select_dtypes('number').dropna(), corner=False)
g.map_lower(sns.scatterplot, alpha=0.4, s=25, color='#2d6be4')
g.map_upper(sns.kdeplot, fill=True, alpha=0.4, cmap='Blues')
g.map_diag(sns.histplot, color='#2d6be4', edgecolor='white', bins=15, kde=True)
g.fig.suptitle('PairGrid — Scatter / KDE / Histogram', y=1.01)
plt.show()</code></pre>` },
    { type: 'tip', body: `Use <code>corner=True</code> in <code>pairplot</code> and <code>PairGrid</code> to show only the lower triangle — the upper triangle is a mirror image of the lower and adds zero information while doubling the chart size. With 5+ variables, the full pair grid becomes extremely large; the lower triangle alone is far more readable and prints on a single page.` },
    { type: 'exercise', title: 'Build a complete FacetGrid exploration of a multi-group dataset with custom mapping functions', hint: 'Use the penguins dataset, build a FacetGrid with species as columns and island as rows, map both a histogram and KDE overlay onto each facet', solution: `import seaborn as sns
import matplotlib.pyplot as plt

sns.set_theme(style='whitegrid')
penguins = sns.load_dataset('penguins').dropna()

# FacetGrid: species × island
g = sns.FacetGrid(penguins, col='species', row='island',
                  height=3.5, aspect=1.1, margin_titles=True,
                  col_order=['Adelie','Chinstrap','Gentoo'],
                  row_order=['Biscoe','Dream','Torgersen'])

g.map_dataframe(sns.histplot, x='body_mass_g', bins=12,
                stat='density', color='#2d6be4', edgecolor='white', alpha=0.6)
g.map_dataframe(sns.kdeplot, x='body_mass_g', color='#e07b39', linewidth=2)
g.set_axis_labels('Body Mass (g)', 'Density')
g.set_titles(col_template='{col_name}', row_template='{row_name}')
g.fig.suptitle('Penguin Body Mass Distribution\\nby Species (columns) × Island (rows)',
               y=1.01, fontsize=13, fontweight='bold')

# Add mean vline to each panel
def add_mean(x, **kwargs):
    import matplotlib.pyplot as plt
    plt.axvline(x.mean(), color='white', linestyle='--', linewidth=1.5, alpha=0.9)
    plt.text(x.mean()+30, plt.gca().get_ylim()[1]*0.85,
             f'μ={x.mean():.0f}g', fontsize=7, color='white')
g.map_dataframe(add_mean, x='body_mass_g')
plt.show()

# PairGrid for full numeric exploration
g2 = sns.PairGrid(penguins, hue='species', palette='Set2', corner=True)
g2.map_lower(sns.scatterplot, alpha=0.5, s=25)
g2.map_diag(sns.kdeplot, fill=True, alpha=0.4)
g2.add_legend()
g2.fig.suptitle('Penguin Feature Pairs — Lower Triangle', y=1.01, fontsize=12)
plt.show()` }
  ]
};

L['dataviz-w3-quiz'] = {
  title: 'Quiz — Statistical Visualisation with Seaborn',
  sections: [
    { type: 'text', body: `<h2>Module 3 Quiz</h2><p>Test your understanding of Seaborn's architecture, distribution plots, categorical plots, relational plots, and FacetGrid.</p>` }
  ]
};

/* ─── MODULE 4 — Interactive Charts with Plotly ─────────────────────────── */

L['dataviz-w4-l1'] = {
  title: 'Plotly Express — One-line Interactive Charts',
  sections: [
    { type: 'text', body: `<h2>Plotly Express</h2>
<p>Plotly Express (px) is the high-level Plotly API. Every chart is a single function call that returns a fully interactive HTML figure — hover tooltips, zoom, pan, and download built-in by default. The output works in Jupyter, in a browser, and as an embedded HTML file.</p>
<pre><code>import plotly.express as px
import pandas as pd

df = px.data.gapminder()   # built-in dataset: country GDP, pop, life expectancy

# Scatter
fig = px.scatter(df[df.year==2007], x='gdpPercap', y='lifeExp',
                 size='pop', color='continent', hover_name='country',
                 log_x=True, size_max=60,
                 title='GDP vs Life Expectancy (2007)',
                 labels={'gdpPercap':'GDP per Capita','lifeExp':'Life Expectancy'})
fig.show()

# Bar
fig = px.bar(df[df.year==2007].nlargest(15,'gdpPercap'),
             x='gdpPercap', y='country', orientation='h',
             color='continent', title='Top 15 Countries by GDP per Capita')
fig.update_layout(yaxis={'categoryorder':'total ascending'})
fig.show()

# Line with facets
fig = px.line(df[df.country.isin(['India','China','United States','Germany'])],
              x='year', y='gdpPercap', color='country', facet_col='country',
              markers=True, title='GDP Growth by Country')
fig.show()</code></pre>` },
    { type: 'text', body: `<h3>More px Chart Types</h3>
<pre><code>import plotly.express as px

tips = px.data.tips()

# Box plot
fig = px.box(tips, x='day', y='total_bill', color='sex',
             category_orders={'day':['Thur','Fri','Sat','Sun']},
             title='Bill Distribution by Day', points='outliers')
fig.show()

# Histogram with marginal
fig = px.histogram(tips, x='total_bill', color='sex', barmode='overlay',
                   marginal='box', opacity=0.7,
                   title='Bill Distribution with Marginal Box')
fig.show()

# Heatmap from pivot
flights = px.data.tips()   # use a different example
import seaborn as sns, pandas as pd
fl = sns.load_dataset('flights')
pivot = fl.pivot(index='month', columns='year', values='passengers')
fig = px.imshow(pivot, aspect='auto', color_continuous_scale='YlOrRd',
                title='Flights Heatmap — Passengers by Month & Year')
fig.show()

# Pie (use sparingly — max 5 slices)
fig = px.pie(tips, names='day', values='total_bill',
             title='Total Revenue by Day', hole=0.4)
fig.show()</code></pre>` },
    { type: 'tip', body: `Set a default template once: <code>import plotly.io as pio; pio.templates.default = "plotly_dark"</code> and all subsequent px charts inherit it. Use <code>"plotly_white"</code> for reports, <code>"plotly_dark"</code> for dashboards and presentations. Switching templates never requires changing any chart code.` },
    { type: 'exercise', title: 'Build an animated bubble chart showing GDP growth over time with Plotly Express', hint: 'Use the gapminder dataset, add animation_frame=year and play button to trace each country\'s path from 1952 to 2007', solution: `import plotly.express as px

df = px.data.gapminder()

fig = px.scatter(df, x='gdpPercap', y='lifeExp',
                 animation_frame='year', animation_group='country',
                 size='pop', color='continent',
                 hover_name='country', log_x=True, size_max=55,
                 range_x=[200, 100000], range_y=[25, 90],
                 title='Global Development 1952–2007',
                 labels={'gdpPercap':'GDP per Capita (log scale)',
                         'lifeExp':'Life Expectancy (years)'})

fig.update_layout(
    font_family='Arial',
    title_font_size=16,
    legend=dict(orientation='v', x=1.01, y=0.5)
)
fig.layout.updatemenus[0].buttons[0].args[1]['frame']['duration'] = 600
fig.layout.updatemenus[0].buttons[0].args[1]['transition']['duration'] = 300

fig.write_html('gapminder_animation.html')
fig.show()` }
  ]
};

L['dataviz-w4-l2'] = {
  title: 'Graph Objects API — Full Control over Traces & Layout',
  sections: [
    { type: 'text', body: `<h2>Graph Objects vs Plotly Express</h2>
<p>Plotly Express is a wrapper around <code>plotly.graph_objects</code> (go). When px does not support what you need — custom trace types, precise layout control, combining multiple trace types in one figure — drop down to go directly.</p>
<pre><code>import plotly.graph_objects as go
import numpy as np

# A figure is a dict with 'data' (list of traces) and 'layout'
fig = go.Figure()

x = np.linspace(0, 4*np.pi, 300)

# Add traces
fig.add_trace(go.Scatter(x=x, y=np.sin(x), mode='lines',
                         name='sin(x)', line=dict(color='#2d6be4', width=2.5)))
fig.add_trace(go.Scatter(x=x, y=np.cos(x), mode='lines',
                         name='cos(x)', line=dict(color='#e07b39', width=2, dash='dash')))
fig.add_trace(go.Scatter(x=[np.pi/2], y=[1], mode='markers+text',
                         name='peak', marker=dict(size=12, color='red', symbol='star'),
                         text=['Max'], textposition='top center', showlegend=False))

# Configure layout
fig.update_layout(
    title=dict(text='Sine and Cosine Waves', font=dict(size=18)),
    xaxis=dict(title='x (radians)', tickvals=[0,np.pi,2*np.pi,3*np.pi,4*np.pi],
               ticktext=['0','π','2π','3π','4π'], showgrid=True, gridcolor='#eee'),
    yaxis=dict(title='Amplitude', zeroline=True, zerolinecolor='#ccc'),
    legend=dict(x=0.01, y=0.99, bgcolor='rgba(255,255,255,0.8)'),
    plot_bgcolor='white', paper_bgcolor='white',
    hovermode='x unified', width=900, height=500
)
fig.show()</code></pre>` },
    { type: 'text', body: `<h3>Mixed Trace Types & Dual Axes</h3>
<pre><code>import plotly.graph_objects as go
from plotly.subplots import make_subplots
import numpy as np

months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
revenue = [45,52,48,61,70,68,75,82,79,88,95,110]
growth  = [0,15.6,-7.7,27.1,14.8,-2.9,10.3,9.3,-3.7,11.4,7.9,15.8]

# Dual Y-axis: bar (revenue) + line (growth rate)
fig = make_subplots(specs=[[{'secondary_y': True}]])

fig.add_trace(go.Bar(x=months, y=revenue, name='Revenue (₹L)',
                     marker_color='#2d6be4', opacity=0.8), secondary_y=False)

fig.add_trace(go.Scatter(x=months, y=growth, name='MoM Growth (%)',
                         mode='lines+markers',
                         line=dict(color='#e07b39', width=2.5),
                         marker=dict(size=7)), secondary_y=True)

fig.update_layout(title='Monthly Revenue & Growth Rate',
                  plot_bgcolor='white', hovermode='x unified',
                  legend=dict(x=0.01, y=0.99))
fig.update_yaxes(title_text='Revenue (₹ Lakhs)', secondary_y=False, showgrid=True, gridcolor='#eee')
fig.update_yaxes(title_text='MoM Growth (%)', secondary_y=True, showgrid=False)
fig.show()</code></pre>` },
    { type: 'tip', body: `Use <code>hovermode='x unified'</code> in <code>update_layout</code> whenever you have multiple traces sharing the same x-axis — it shows one combined hover tooltip for all traces at the same x position, rather than separate tooltips per trace. This dramatically improves readability for time-series dashboards with 3+ overlapping lines.` },
    { type: 'exercise', title: 'Build a candlestick chart with volume bars using graph objects', hint: 'Generate OHLCV data, use go.Candlestick for price and go.Bar for volume on a secondary y-axis with make_subplots', solution: `import plotly.graph_objects as go
from plotly.subplots import make_subplots
import pandas as pd
import numpy as np

np.random.seed(42)
dates = pd.date_range('2024-01-01', periods=60, freq='B')
close = 100 + np.cumsum(np.random.randn(60) * 1.5)
high = close + np.random.uniform(0.5, 3, 60)
low  = close - np.random.uniform(0.5, 3, 60)
open_ = close + np.random.randn(60) * 0.8
volume = np.random.randint(500000, 3000000, 60)

fig = make_subplots(rows=2, cols=1, shared_xaxes=True,
                    vertical_spacing=0.05, row_heights=[0.7, 0.3])

# Candlestick
fig.add_trace(go.Candlestick(x=dates, open=open_, high=high, low=low, close=close,
                              name='OHLC',
                              increasing_line_color='#2db85e',
                              decreasing_line_color='#e04444'), row=1, col=1)

# Volume bars coloured by direction
colors = ['#2db85e' if c >= o else '#e04444' for c, o in zip(close, open_)]
fig.add_trace(go.Bar(x=dates, y=volume, name='Volume',
                     marker_color=colors, opacity=0.7), row=2, col=1)

fig.update_layout(title='60-Day OHLCV Chart', xaxis_rangeslider_visible=False,
                  plot_bgcolor='#0e1117', paper_bgcolor='#0e1117',
                  font_color='white', hovermode='x unified',
                  showlegend=False, height=650)
fig.update_xaxes(showgrid=False)
fig.update_yaxes(showgrid=True, gridcolor='#333')
fig.show()` }
  ]
};

L['dataviz-w4-l3'] = {
  title: 'Tooltips, Animations & Sliders',
  sections: [
    { type: 'text', body: `<h2>Enhancing Interactivity</h2>
<p>The default Plotly hover tooltip shows x and y values. Custom tooltips, animations with sliders, and buttons elevate a static chart into an exploratory tool — letting the audience ask their own questions rather than only seeing the answers you chose.</p>
<h3>Custom Hover Templates</h3>
<pre><code>import plotly.graph_objects as go
import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    'country': ['India','US','Germany','Japan','Brazil','UK','France','Canada'],
    'gdp': [3.7, 25.5, 4.1, 4.2, 2.1, 3.1, 2.9, 2.1],
    'pop': [1428, 335, 84, 125, 215, 67, 68, 38],
    'hdi': [0.633, 0.926, 0.942, 0.920, 0.754, 0.929, 0.903, 0.935],
    'region': ['Asia','Americas','Europe','Asia','Americas','Europe','Europe','Americas']
})

fig = go.Figure(go.Scatter(
    x=df['gdp'], y=df['hdi'],
    mode='markers+text',
    text=df['country'],
    textposition='top center',
    marker=dict(size=df['pop']/10, color=df['gdp'],
                colorscale='Viridis', showscale=True,
                colorbar=dict(title='GDP (T\$)')),
    customdata=df[['country','pop','region']],
    hovertemplate=(
        '<b>%{customdata[0]}</b><br>'
        'GDP: \$%{x:.1f}T<br>'
        'HDI: %{y:.3f}<br>'
        'Population: %{customdata[1]}M<br>'
        'Region: %{customdata[2]}<br>'
        '<extra></extra>'   # removes the trace name box
    )
))
fig.update_layout(title='GDP vs Human Development Index',
                  xaxis_title='GDP (Trillion \$)', yaxis_title='HDI',
                  plot_bgcolor='white')
fig.show()</code></pre>` },
    { type: 'text', body: `<h3>Sliders and Buttons</h3>
<pre><code>import plotly.graph_objects as go
import numpy as np

# Slider: show different frequencies of a sine wave
x = np.linspace(0, 4*np.pi, 500)
frequencies = [0.5, 1, 2, 3, 5]

traces = [go.Scatter(x=x, y=np.sin(f*x), name=f'f={f}Hz',
                     line=dict(color='#2d6be4', width=2.5),
                     visible=(f == 1))
          for f in frequencies]

steps = []
for i, f in enumerate(frequencies):
    step = dict(method='update',
                args=[{'visible': [j == i for j in range(len(frequencies))]},
                      {'title': f'Sine Wave — Frequency {f} Hz'}],
                label=f'{f} Hz')
    steps.append(step)

fig = go.Figure(data=traces)
fig.update_layout(
    sliders=[dict(active=1, steps=steps, pad={'t': 50},
                  currentvalue={'prefix': 'Frequency: ', 'font': {'size': 14}})],
    title='Sine Wave — Frequency {f} Hz'.replace('{f}', '1'),
    xaxis_title='x', yaxis_title='Amplitude',
    plot_bgcolor='white'
)
fig.show()</code></pre>` },
    { type: 'tip', body: `Always add <code>&lt;extra&gt;&lt;/extra&gt;</code> at the end of your <code>hovertemplate</code> string — it removes the trace name box that Plotly appends by default (a coloured rectangle with the series name). Without it, the hover tooltip has redundant information that clutters the display. This one tag makes every custom tooltip cleaner.` },
    { type: 'exercise', title: 'Build an animated bar chart race showing changing rankings over time', hint: 'Generate revenue data for 6 companies over 12 months, use animation_frame in px.bar with sorted layout per frame', solution: `import plotly.express as px
import pandas as pd
import numpy as np

np.random.seed(7)
companies = ['Acme','ByteCo','CloudX','DataFlow','EdgeAI','FastML']
months = pd.date_range('2024-01', periods=12, freq='MS').strftime('%b %Y').tolist()

records = []
revenue = {c: np.random.randint(30, 80) for c in companies}
for month in months:
    for c in companies:
        revenue[c] = max(5, revenue[c] + np.random.randint(-8, 15))
        records.append({'month': month, 'company': c, 'revenue': revenue[c]})

df = pd.DataFrame(records)

# Plotly Express handles animation_frame natively
fig = px.bar(df, x='revenue', y='company', animation_frame='month',
             orientation='h', color='company',
             color_discrete_sequence=px.colors.qualitative.Set2,
             range_x=[0, 160],
             title='Monthly Revenue Race — 2024',
             labels={'revenue': 'Revenue (₹ Lakhs)', 'company': ''})

fig.update_layout(yaxis={'categoryorder': 'total ascending'},
                  showlegend=False,
                  plot_bgcolor='white',
                  font_size=13)
fig.layout.updatemenus[0].buttons[0].args[1]['frame']['duration'] = 800
fig.layout.updatemenus[0].buttons[0].args[1]['transition']['duration'] = 500

fig.write_html('bar_race.html')
fig.show()` }
  ]
};

L['dataviz-w4-l4'] = {
  title: 'Geographic Visualisations — Choropleth & Scatter Maps',
  sections: [
    { type: 'text', body: `<h2>Visualising Data on Maps</h2>
<p>Geographic visualisations place data in spatial context — revealing patterns that only appear when you know <em>where</em> something happened. Plotly provides two map backends: <strong>built-in geo maps</strong> (no API key, country/state boundaries) and <strong>Mapbox maps</strong> (satellite, streets, terrain — requires a free token).</p>
<h3>Choropleth Maps</h3>
<pre><code>import plotly.express as px
import plotly.graph_objects as go

# Country-level choropleth (iso_alpha country codes)
df = px.data.gapminder().query("year == 2007")

fig = px.choropleth(df, locations='iso_alpha', color='lifeExp',
                    hover_name='country', hover_data=['gdpPercap','pop'],
                    color_continuous_scale='RdYlGn',
                    range_color=[40, 85],
                    title='Life Expectancy by Country (2007)',
                    labels={'lifeExp':'Life Expectancy'})
fig.update_geos(showcoastlines=True, coastlinecolor='#555',
                showland=True, landcolor='#f8f8f8',
                showocean=True, oceancolor='#e8f4f8',
                projection_type='natural earth')
fig.update_layout(coloraxis_colorbar=dict(title='Years', ticksuffix='yr'))
fig.show()

# US state-level choropleth
import pandas as pd
state_data = pd.DataFrame({
    'state': ['CA','TX','NY','FL','IL','PA','OH','GA','NC','MI'],
    'value': [45, 32, 38, 28, 22, 19, 18, 16, 15, 14]
})
fig = px.choropleth(state_data, locations='state', locationmode='USA-states',
                    color='value', scope='usa',
                    color_continuous_scale='Blues',
                    title='Sample State-level Data')
fig.show()</code></pre>` },
    { type: 'text', body: `<h3>Scatter Maps & Density Maps</h3>
<pre><code>import plotly.express as px

# scatter_geo — bubble map (no API key)
df = px.data.gapminder().query("year == 2007")
fig = px.scatter_geo(df, locations='iso_alpha', size='pop',
                     color='continent', hover_name='country',
                     size_max=50, projection='natural earth',
                     title='World Population by Country (2007)')
fig.show()

# density_mapbox — heatmap on Mapbox (needs free token)
# import os; os.environ['MAPBOX_TOKEN'] = 'your_token_here'
# px.set_mapbox_access_token(os.environ['MAPBOX_TOKEN'])

# Without token — use open street map style
earthquake = px.data.carshare()  # lat/lon data
fig = px.scatter_mapbox(earthquake, lat='centroid_lat', lon='centroid_lon',
                        color='peak_hour', size='car_hours',
                        mapbox_style='open-street-map',
                        zoom=10, height=500,
                        title='Car Share Usage by Location')
fig.show()

# Density map (heatmap on map)
fig = px.density_mapbox(earthquake, lat='centroid_lat', lon='centroid_lon',
                        z='car_hours', radius=15,
                        mapbox_style='open-street-map',
                        title='Car Share Density Map')
fig.show()</code></pre>` },
    { type: 'tip', body: `For India-specific state maps, use <code>px.choropleth</code> with <code>geojson</code> parameter pointing to an India GeoJSON file (available from GitHub: india-states.geojson). The <code>featureidkey</code> parameter maps GeoJSON feature properties to your DataFrame column. This pattern works for any custom geography — districts, postal codes, sales territories.` },
    { type: 'exercise', title: 'Build an India state-level sales map with a hover tooltip showing KPIs', hint: 'Download or use a sample India state dataset with lat/lon centroids, plot as scatter_geo or scatter_mapbox with custom hover showing revenue, growth, and team size', solution: `import plotly.express as px
import pandas as pd
import numpy as np

np.random.seed(42)
# India state centroids (lat/lon) + sample business data
states = pd.DataFrame({
    'state':   ['Maharashtra','Tamil Nadu','Karnataka','Telangana','Gujarat',
                 'Rajasthan','Uttar Pradesh','West Bengal','Kerala','Punjab'],
    'lat':     [19.75, 11.13, 15.32, 17.12, 22.26, 27.02, 26.85, 22.99, 10.85, 31.15],
    'lon':     [75.71, 78.66, 75.71, 79.02, 71.19, 74.22, 80.91, 87.85, 76.27, 75.34],
    'revenue': np.random.randint(50, 500, 10),
    'growth':  np.random.uniform(-5, 35, 10).round(1),
    'clients': np.random.randint(10, 200, 10),
    'region':  ['West','South','South','South','West','North','North','East','South','North']
})

fig = px.scatter_geo(states, lat='lat', lon='lon',
                     size='revenue', color='region',
                     hover_name='state',
                     hover_data={'revenue': True, 'growth': True,
                                 'clients': True, 'lat': False, 'lon': False},
                     size_max=45,
                     color_discrete_sequence=px.colors.qualitative.Set2,
                     title='India Sales Map — Revenue by State',
                     scope='asia')
fig.update_geos(fitbounds='locations', visible=False,
                showland=True, landcolor='#f5f0e8',
                showcoastlines=True, coastlinecolor='#aaa',
                showborders=True, bordercolor='#888')
fig.update_traces(
    hovertemplate='<b>%{hovertext}</b><br>Revenue: ₹%{marker.size}L<br>Growth: %{customdata[1]:.1f}%<br>Clients: %{customdata[2]}<extra></extra>'
)
fig.update_layout(height=600, legend_title='Region')
fig.show()` }
  ]
};

L['dataviz-w4-l5'] = {
  title: 'Exporting & Embedding Plotly Charts',
  sections: [
    { type: 'text', body: `<h2>Getting Plotly Charts Out of Jupyter</h2>
<p>A Plotly figure's interactive features only work in environments that run JavaScript — browsers and Jupyter. For static contexts (PDFs, PowerPoint, email), you need to export to PNG or PDF. For sharing with others, the self-contained HTML export is the most practical option.</p>
<h3>HTML Export — Self-contained Interactive</h3>
<pre><code>import plotly.express as px

fig = px.scatter(px.data.iris(), x='sepal_length', y='sepal_width',
                 color='species', title='Iris Dataset')

# Full standalone HTML (includes Plotly.js — ~3MB)
fig.write_html('iris_chart.html', include_plotlyjs=True)

# Smaller file — loads Plotly from CDN (requires internet)
fig.write_html('iris_small.html', include_plotlyjs='cdn')

# Embed-ready div snippet (no html/head tags) — paste into existing web page
fig.write_html('iris_div.html', full_html=False, include_plotlyjs='cdn')

# Open directly in browser
import webbrowser, os
webbrowser.open('file://' + os.path.abspath('iris_chart.html'))</code></pre>
<h3>Static Export — PNG / PDF / SVG</h3>
<pre><code># Requires: pip install kaleido
import plotly.express as px

fig = px.bar(px.data.tips(), x='day', y='total_bill',
             color='sex', barmode='group', title='Tips by Day')

# PNG (for presentations, social media)
fig.write_image('tips_chart.png', width=1200, height=700, scale=2)

# PDF (for print/publication — vector format)
fig.write_image('tips_chart.pdf', width=1200, height=700)

# SVG (for web/Illustrator editing)
fig.write_image('tips_chart.svg', width=1200, height=700)

# Embed in Matplotlib figure (e.g. for a mixed report)
import matplotlib.pyplot as plt
import matplotlib.image as mpimg

fig.write_image('tmp.png', width=900, height=500, scale=2)
plt_fig, ax = plt.subplots(figsize=(9, 5))
ax.imshow(mpimg.imread('tmp.png'))
ax.axis('off')
plt.tight_layout(); plt.show()</code></pre>` },
    { type: 'tip', body: `For reports sent by email or shared via Google Drive, use <code>include_plotlyjs='cdn'</code> to keep HTML files small (under 20KB vs 3MB). The CDN version loads Plotly from a public server — it requires internet access but is always available on any modern browser. For offline use (client demo on a plane), use <code>include_plotlyjs=True</code> to bundle everything.` },
    { type: 'exercise', title: 'Export a multi-chart figure as HTML, PNG, and PDF and compare file sizes', hint: 'Build three charts in subplots using make_subplots, export in three formats, print file sizes', solution: `import plotly.express as px
from plotly.subplots import make_subplots
import plotly.graph_objects as go
import pandas as pd, numpy as np, os

tips = px.data.tips()
iris = px.data.iris()

fig = make_subplots(rows=1, cols=3, subplot_titles=['Tips by Day','Sepal Dimensions','Fare Distribution'])

# Chart 1 — bar
for sex, color in zip(['Male','Female'],['#2d6be4','#e07b39']):
    grp = tips[tips.sex==sex].groupby('day')['total_bill'].mean()
    fig.add_trace(go.Bar(x=['Thur','Fri','Sat','Sun'],
                         y=[grp.get(d,0) for d in ['Thur','Fri','Sat','Sun']],
                         name=sex, marker_color=color, showlegend=(sex=='Male')), row=1, col=1)

# Chart 2 — scatter
for sp, col in zip(iris.species.unique(), ['#2d6be4','#e07b39','#2db85e']):
    d = iris[iris.species==sp]
    fig.add_trace(go.Scatter(x=d.sepal_length, y=d.sepal_width, mode='markers',
                             name=sp, marker=dict(color=col, size=6, opacity=0.7),
                             showlegend=False), row=1, col=2)

# Chart 3 — histogram
fig.add_trace(go.Histogram(x=tips.total_bill, nbinsx=20,
                           marker_color='#2db85e', opacity=0.8,
                           showlegend=False), row=1, col=3)

fig.update_layout(title='Multi-chart Export Demo', height=450, barmode='group',
                  plot_bgcolor='white', paper_bgcolor='white')

# Export in three formats and compare sizes
fig.write_html('report_cdn.html',    include_plotlyjs='cdn')
fig.write_html('report_full.html',   include_plotlyjs=True)
fig.write_image('report.png', width=1400, height=500, scale=2)
fig.write_image('report.pdf', width=1400, height=500)

for fname in ['report_cdn.html','report_full.html','report.png','report.pdf']:
    size = os.path.getsize(fname)
    print(f'{fname:25} {size/1024:8.1f} KB')
fig.show()` }
  ]
};

L['dataviz-w4-quiz'] = {
  title: 'Quiz — Interactive Charts with Plotly',
  sections: [
    { type: 'text', body: `<h2>Module 4 Quiz</h2><p>Test your understanding of Plotly Express, Graph Objects, hover templates, animations, geographic maps, and export formats.</p>` }
  ]
};

/* ─── MODULE 5 — Dashboard Development with Plotly Dash ─────────────────── */

L['dataviz-w5-l1'] = {
  title: 'Dash Fundamentals — Layout & Core Components',
  sections: [
    { type: 'text', body: `<h2>What is Plotly Dash?</h2>
<p>Dash is a Python framework for building analytical web dashboards — no JavaScript required. It runs a Flask server and renders Plotly charts with reactive callbacks. A Dash app has two parts: a <strong>layout</strong> (what it looks like) and <strong>callbacks</strong> (how it behaves when the user interacts with it).</p>
<pre><code># pip install dash pandas plotly

from dash import Dash, html, dcc
import plotly.express as px
import pandas as pd

app = Dash(__name__)

df = px.data.gapminder().query("year == 2007")

app.layout = html.Div([
    html.H1("Gapminder 2007 Dashboard",
            style={'textAlign': 'center', 'color': '#2d6be4', 'fontFamily': 'Arial'}),

    html.P("An interactive explorer of global development indicators.",
           style={'textAlign': 'center', 'color': '#888'}),

    dcc.Graph(
        id='main-scatter',
        figure=px.scatter(df, x='gdpPercap', y='lifeExp',
                          size='pop', color='continent',
                          hover_name='country', log_x=True, size_max=55,
                          template='plotly_white',
                          title='GDP per Capita vs Life Expectancy')
    ),

    html.Div([
        html.Div([
            html.H3(f"{df.shape[0]}", style={'color': '#2d6be4', 'margin': 0}),
            html.P("Countries", style={'color': '#888', 'margin': 0})
        ], style={'textAlign': 'center', 'padding': '1rem'}),
        html.Div([
            html.H3(f"\${df['gdpPercap'].median():,.0f}", style={'color': '#2db85e', 'margin': 0}),
            html.P("Median GDP per Capita", style={'color': '#888', 'margin': 0})
        ], style={'textAlign': 'center', 'padding': '1rem'}),
    ], style={'display': 'flex', 'justifyContent': 'center', 'gap': '3rem',
              'background': '#f8f8f8', 'borderRadius': '8px', 'margin': '1rem'})
])

if __name__ == '__main__':
    app.run(debug=True)   # http://127.0.0.1:8050</code></pre>` },
    { type: 'text', body: `<h3>html vs dcc Components</h3>
<ul>
  <li><strong>html.*</strong> — mirrors every HTML tag: <code>html.Div</code>, <code>html.H1</code>, <code>html.P</code>, <code>html.Button</code>, <code>html.Table</code>. Accepts <code>style</code> (CSS dict), <code>className</code>, and <code>id</code>.</li>
  <li><strong>dcc.*</strong> (Dash Core Components) — interactive widgets: <code>dcc.Graph</code> (Plotly figure), <code>dcc.Dropdown</code>, <code>dcc.Slider</code>, <code>dcc.Input</code>, <code>dcc.DatePickerRange</code>, <code>dcc.Checklist</code>, <code>dcc.RadioItems</code>, <code>dcc.Store</code> (client-side state).</li>
</ul>
<pre><code>from dash import html, dcc

# Layout with multiple component types
layout = html.Div([
    # Dropdown
    dcc.Dropdown(id='continent-dd',
                 options=[{'label': c, 'value': c}
                          for c in ['Africa','Americas','Asia','Europe','Oceania']],
                 value='Asia', clearable=False),

    # Radio items
    dcc.RadioItems(id='chart-type',
                   options=[{'label': 'Scatter', 'value': 'scatter'},
                             {'label': 'Bar',     'value': 'bar'}],
                   value='scatter', inline=True),

    # Range slider
    dcc.RangeSlider(id='year-slider', min=1952, max=2007, step=5,
                    marks={y: str(y) for y in range(1952, 2008, 5)},
                    value=[1992, 2007]),

    # Graph placeholder — filled by callback
    dcc.Graph(id='output-graph'),
])</code></pre>` },
    { type: 'tip', body: `Structure your Dash layout using <code>html.Div</code> with CSS flexbox (<code>style={'display':'flex','gap':'1rem'}</code>) rather than HTML tables for alignment. Flexbox layouts are responsive, simpler to read in Python, and identical to how modern web apps are built. For production dashboards, switch to <code>dash-bootstrap-components</code> for a full grid system with zero custom CSS.` },
    { type: 'exercise', title: 'Build a static Dash layout for a sales dashboard without callbacks', hint: 'Create a header, KPI cards row, and two placeholder graph components using html and dcc', solution: `from dash import Dash, html, dcc
import plotly.express as px

app = Dash(__name__)

# Sample data for static charts
tips = px.data.tips()

kpi_style = {'textAlign':'center','padding':'1.5rem','background':'#1a1b1e',
             'borderRadius':'10px','flex':'1','minWidth':'140px'}

app.layout = html.Div([
    # Header
    html.Div([
        html.H1("Sales Analytics Dashboard",
                style={'margin':0,'color':'#c8a96e','fontFamily':'Georgia'}),
        html.P("Q2 2024 | Updated daily",
               style={'margin':0,'color':'#888','fontSize':'0.85rem'})
    ], style={'background':'#0b0c0e','padding':'1.5rem 2rem',
              'borderBottom':'1px solid #2a2b2e'}),

    # KPI row
    html.Div([
        html.Div([html.H2("\$24,580",style={'color':'#2d6be4','margin':0}),
                  html.P("Total Revenue",style={'color':'#aaa','margin':0})], style=kpi_style),
        html.Div([html.H2("1,245",style={'color':'#2db85e','margin':0}),
                  html.P("Total Orders",style={'color':'#aaa','margin':0})], style=kpi_style),
        html.Div([html.H2("\$19.74",style={'color':'#e07b39','margin':0}),
                  html.P("Avg Tip",style={'color':'#aaa','margin':0})], style=kpi_style),
        html.Div([html.H2("244",style={'color':'#9b59b6','margin':0}),
                  html.P("Unique Visitors",style={'color':'#aaa','margin':0})], style=kpi_style),
    ], style={'display':'flex','gap':'1rem','padding':'1.5rem 2rem','background':'#111215'}),

    # Charts row
    html.Div([
        dcc.Graph(figure=px.bar(tips.groupby('day')['total_bill'].sum().reset_index(),
                                x='day', y='total_bill', template='plotly_dark',
                                title='Revenue by Day',
                                category_orders={'day':['Thur','Fri','Sat','Sun']}),
                  style={'flex':'1'}),
        dcc.Graph(figure=px.pie(tips, names='time', values='total_bill',
                                template='plotly_dark', title='Lunch vs Dinner Share',
                                hole=0.45),
                  style={'flex':'1'}),
    ], style={'display':'flex','gap':'1rem','padding':'0 2rem 2rem'}),

], style={'background':'#0b0c0e','minHeight':'100vh','fontFamily':'Arial'})

if __name__ == '__main__':
    app.run(debug=True)` }
  ]
};

L['dataviz-w5-l2'] = {
  title: 'Callbacks — Reactive Interactivity',
  sections: [
    { type: 'text', body: `<h2>The Callback Pattern</h2>
<p>Callbacks are Python functions that Dash calls automatically when an Input component's value changes. They receive the current input values as arguments and return values that update Output components. This is the core of Dash interactivity — no JavaScript needed.</p>
<pre><code>from dash import Dash, html, dcc, callback, Output, Input
import plotly.express as px

app = Dash(__name__)
df = px.data.gapminder()

app.layout = html.Div([
    html.H2("Gapminder Explorer"),
    dcc.Dropdown(id='year-dd',
                 options=[{'label': y, 'value': y} for y in sorted(df.year.unique())],
                 value=2007, clearable=False),
    dcc.Graph(id='scatter-out')
])

@callback(
    Output('scatter-out', 'figure'),   # what to update: component id + property
    Input('year-dd', 'value')          # what triggers the update: component id + property
)
def update_chart(selected_year):       # argument = current value of the Input
    filtered = df[df.year == selected_year]
    fig = px.scatter(filtered, x='gdpPercap', y='lifeExp',
                     size='pop', color='continent', hover_name='country',
                     log_x=True, size_max=55, template='plotly_white',
                     title=f'GDP vs Life Expectancy ({selected_year})')
    return fig   # returned value → sets the Output property

if __name__ == '__main__':
    app.run(debug=True)</code></pre>` },
    { type: 'text', body: `<h3>Multiple Inputs, Multiple Outputs & State</h3>
<pre><code>from dash import Dash, html, dcc, callback, Output, Input, State
import plotly.express as px

app = Dash(__name__)
df = px.data.gapminder()

app.layout = html.Div([
    dcc.Dropdown(id='continent-dd',
                 options=[{'label': c, 'value': c} for c in df.continent.unique()],
                 value='Asia', clearable=False),
    dcc.Slider(id='year-slider', min=1952, max=2007, step=5, value=2007,
               marks={y: str(y) for y in range(1952, 2008, 5)}),
    dcc.Checklist(id='log-check', options=[{'label': ' Log X axis', 'value': 'log'}],
                  value=['log']),
    html.Div(id='summary-text', style={'padding':'0.5rem','color':'#888'}),
    dcc.Graph(id='main-graph')
])

@callback(
    Output('main-graph', 'figure'),
    Output('summary-text', 'children'),   # two outputs from one callback
    Input('continent-dd', 'value'),
    Input('year-slider', 'value'),
    Input('log-check', 'value')
)
def update_all(continent, year, log_vals):
    filtered = df[(df.continent == continent) & (df.year == year)]
    use_log = 'log' in (log_vals or [])
    fig = px.scatter(filtered, x='gdpPercap', y='lifeExp',
                     size='pop', hover_name='country',
                     log_x=use_log, size_max=50, template='plotly_white',
                     title=f'{continent} — {year}')
    summary = (f"{len(filtered)} countries | "
               f"Median GDP: \${filtered['gdpPercap'].median():,.0f} | "
               f"Median Life Exp: {filtered['lifeExp'].median():.1f} yrs")
    return fig, summary

if __name__ == '__main__':
    app.run(debug=True)</code></pre>` },
    { type: 'tip', body: `Use <code>State</code> instead of <code>Input</code> when you want to read a component's value without triggering the callback on every change — for example, a text input field where you only want to react when the user clicks a "Submit" button, not on every keystroke. <code>Input</code> triggers the callback immediately; <code>State</code> passes the value silently as an extra argument.` },
    { type: 'exercise', title: 'Build a sales dashboard with 3 filter callbacks updating 2 charts simultaneously', hint: 'Use continent/year/metric dropdowns, callback updates both a scatter and a bar chart from the same inputs', solution: `from dash import Dash, html, dcc, callback, Output, Input
import plotly.express as px
import pandas as pd

app = Dash(__name__)
df = px.data.gapminder()
continents = sorted(df.continent.unique())
years = sorted(df.year.unique())
metrics = {'Life Expectancy': 'lifeExp', 'GDP per Capita': 'gdpPercap', 'Population': 'pop'}

app.layout = html.Div([
    html.H2("Gapminder Multi-filter Dashboard", style={'color':'#2d6be4','textAlign':'center'}),
    html.Div([
        html.Div([html.Label("Continent"),
                  dcc.Dropdown(id='cont-dd',
                               options=[{'label':c,'value':c} for c in continents],
                               value='Asia', clearable=False)], style={'flex':'1'}),
        html.Div([html.Label("Year"),
                  dcc.Dropdown(id='year-dd',
                               options=[{'label':y,'value':y} for y in years],
                               value=2007, clearable=False)], style={'flex':'1'}),
        html.Div([html.Label("Metric (bar chart)"),
                  dcc.Dropdown(id='metric-dd',
                               options=[{'label':k,'value':v} for k,v in metrics.items()],
                               value='gdpPercap', clearable=False)], style={'flex':'1'}),
    ], style={'display':'flex','gap':'1rem','padding':'1rem 2rem'}),
    html.Div([
        dcc.Graph(id='scatter-chart', style={'flex':'1'}),
        dcc.Graph(id='bar-chart',     style={'flex':'1'}),
    ], style={'display':'flex','gap':'1rem','padding':'0 2rem'})
])

@callback(
    Output('scatter-chart', 'figure'),
    Output('bar-chart', 'figure'),
    Input('cont-dd', 'value'),
    Input('year-dd', 'value'),
    Input('metric-dd', 'value')
)
def update_charts(continent, year, metric):
    filtered = df[(df.continent == continent) & (df.year == year)]
    scatter = px.scatter(filtered, x='gdpPercap', y='lifeExp', size='pop',
                         hover_name='country', size_max=50, log_x=True,
                         template='plotly_white',
                         title=f'{continent} — GDP vs Life Expectancy ({year})')
    bar = px.bar(filtered.nlargest(10, metric), x='country', y=metric,
                 color=metric, color_continuous_scale='Blues',
                 template='plotly_white',
                 title=f'Top 10 by {metric} ({year})')
    bar.update_layout(xaxis_tickangle=-30)
    return scatter, bar

if __name__ == '__main__':
    app.run(debug=True)` }
  ]
};

L['dataviz-w5-l3'] = {
  title: 'Core Components — Dropdown, Slider, DatePicker & DataTable',
  sections: [
    { type: 'text', body: `<h2>The Dash Component Library</h2>
<p>Dash ships with a complete set of form controls in <code>dcc</code> (Dash Core Components) and <code>dash_table</code>. Each component has a set of properties that can be read by callbacks (Input/State) or written to (Output).</p>
<pre><code>from dash import Dash, html, dcc, dash_table, callback, Output, Input
import plotly.express as px
import pandas as pd

app = Dash(__name__)
tips = px.data.tips()

app.layout = html.Div([
    # ── Dropdown (multi-select) ──────────────────────────────────────────────
    html.Label("Select days:"),
    dcc.Dropdown(id='day-dd',
                 options=[{'label': d, 'value': d} for d in ['Thur','Fri','Sat','Sun']],
                 value=['Sat','Sun'], multi=True, clearable=False),

    # ── RangeSlider ─────────────────────────────────────────────────────────
    html.Label("Bill range:"),
    dcc.RangeSlider(id='bill-slider', min=0, max=60, step=5, value=[0, 60],
                    tooltip={'placement':'bottom','always_visible':True},
                    marks={0:'0', 20:'20', 40:'40', 60:'60'}),

    # ── DatePickerRange ──────────────────────────────────────────────────────
    # (not used with tips — shown for reference)
    # dcc.DatePickerRange(id='date-range',
    #                     min_date_allowed='2024-01-01',
    #                     max_date_allowed='2024-12-31',
    #                     start_date='2024-01-01',
    #                     end_date='2024-06-30'),

    # ── DataTable ───────────────────────────────────────────────────────────
    html.H4("Filtered Data Table"),
    dash_table.DataTable(
        id='data-table',
        columns=[{'name': c, 'id': c} for c in tips.columns],
        data=tips.to_dict('records'),
        page_size=10,
        sort_action='native',
        filter_action='native',
        style_header={'backgroundColor':'#2d6be4','color':'white','fontWeight':'bold'},
        style_data_conditional=[
            {'if': {'row_index': 'odd'}, 'backgroundColor': '#f8f8f8'}
        ],
        style_table={'overflowX': 'auto'},
    ),
])</code></pre>` },
    { type: 'text', body: `<h3>Wiring Components to Callbacks</h3>
<pre><code>@callback(
    Output('data-table', 'data'),
    Input('day-dd', 'value'),
    Input('bill-slider', 'value')
)
def filter_table(days, bill_range):
    if not days:
        return []
    filtered = tips[
        tips['day'].isin(days) &
        tips['total_bill'].between(bill_range[0], bill_range[1])
    ]
    return filtered.to_dict('records')

if __name__ == '__main__':
    app.run(debug=True)</code></pre>
<h3>Key Component Properties</h3>
<table>
  <tr><th>Component</th><th>Key Input property</th><th>Key Output property</th></tr>
  <tr><td>dcc.Dropdown</td><td>value</td><td>options, value, disabled</td></tr>
  <tr><td>dcc.Slider / RangeSlider</td><td>value</td><td>min, max, marks, value</td></tr>
  <tr><td>dcc.DatePickerRange</td><td>start_date, end_date</td><td>min/max_date_allowed</td></tr>
  <tr><td>dcc.Graph</td><td>clickData, hoverData, selectedData</td><td>figure</td></tr>
  <tr><td>dash_table.DataTable</td><td>active_cell, selected_rows</td><td>data, columns, style_*</td></tr>
  <tr><td>html.Button</td><td>n_clicks</td><td>children, disabled, style</td></tr>
  <tr><td>dcc.Store</td><td>data</td><td>data</td></tr>
</table>` },
    { type: 'tip', body: `Use <code>dcc.Store(id='store', storage_type='session')</code> to pass data between callbacks without re-querying the database on every interaction. Compute the full filtered DataFrame in one callback, store it as JSON in the Store, then have other callbacks read from the Store. This is especially important when the data query is slow — compute once, reuse everywhere.` },
    { type: 'exercise', title: 'Build a searchable, sortable DataTable with linked chart and summary stats', hint: 'Load the mpg dataset, add a text search, column sort, and row click callback that highlights the selected car in a scatter plot', solution: `from dash import Dash, html, dcc, dash_table, callback, Output, Input
import plotly.express as px
import pandas as pd

app = Dash(__name__)
mpg = px.data.gapminder().query("year == 2007")[['country','continent','lifeExp','gdpPercap','pop']]
mpg.columns = ['Country','Continent','Life Exp','GDP/Capita','Population']
mpg = mpg.round(2)

app.layout = html.Div([
    html.H2("Gapminder 2007 — Searchable Table", style={'color':'#2d6be4'}),
    html.Div([
        dcc.Dropdown(id='cont-filter',
                     options=[{'label':c,'value':c} for c in sorted(mpg.Continent.unique())],
                     placeholder='Filter by continent...', multi=True),
    ], style={'padding':'0 2rem','maxWidth':'400px'}),
    html.Div([
        dash_table.DataTable(
            id='mpg-table',
            columns=[{'name':c,'id':c,'type':'numeric' if mpg[c].dtype!='O' else 'text'}
                     for c in mpg.columns],
            data=mpg.to_dict('records'),
            sort_action='native', filter_action='native',
            row_selectable='single', page_size=12,
            style_header={'backgroundColor':'#2d6be4','color':'white','fontWeight':'bold'},
            style_data_conditional=[{'if':{'row_index':'odd'},'backgroundColor':'#f8f8f8'}],
            style_cell={'fontFamily':'Arial','fontSize':'0.85rem','padding':'6px 12px'},
        ),
        dcc.Graph(id='linked-chart')
    ], style={'display':'flex','gap':'1rem','padding':'1rem 2rem','alignItems':'flex-start'})
])

@callback(Output('mpg-table','data'), Input('cont-filter','value'))
def filter_continent(continents):
    if not continents:
        return mpg.to_dict('records')
    return mpg[mpg.Continent.isin(continents)].to_dict('records')

@callback(Output('linked-chart','figure'),
          Input('mpg-table','derived_virtual_data'),
          Input('mpg-table','selected_rows'))
def update_chart(rows, sel):
    df = pd.DataFrame(rows or mpg.to_dict('records'))
    colors = ['#e04444' if (sel and i in sel) else '#2d6be4'
              for i in range(len(df))]
    fig = px.scatter(df, x='GDP/Capita', y='Life Exp', color='Continent',
                     hover_name='Country', size='Population', size_max=45,
                     log_x=True, template='plotly_white',
                     title='Click a row to highlight it')
    if sel and len(df) > 0:
        row = df.iloc[sel[0]]
        fig.add_annotation(x=row['GDP/Capita'], y=row['Life Exp'],
                           text=row['Country'], showarrow=True, arrowhead=2)
    return fig

if __name__ == '__main__':
    app.run(debug=True)` }
  ]
};

L['dataviz-w5-l4'] = {
  title: 'Multi-page Dash Apps & Bootstrap Styling',
  sections: [
    { type: 'text', body: `<h2>Multi-page Apps</h2>
<p>Dash supports multi-page apps through its built-in page registry. Each page is a separate Python file in a <code>pages/</code> folder. Dash automatically creates routes and a navigation structure.</p>
<pre><code># Project structure:
# my_dashboard/
#   app.py           ← entry point
#   pages/
#     overview.py    ← /
#     sales.py       ← /sales
#     analytics.py   ← /analytics

# app.py
from dash import Dash, html, dcc, page_container, page_registry
import dash_bootstrap_components as dbc

app = Dash(__name__, use_pages=True,
           external_stylesheets=[dbc.themes.DARKLY])

app.layout = html.Div([
    # Navigation bar
    dbc.NavbarSimple(
        children=[dbc.NavLink(page['name'], href=page['path'])
                  for page in page_registry.values()],
        brand="DSA Analytics",
        brand_href="/",
        color="primary", dark=True, className="mb-4"
    ),
    # Page content renders here
    page_container
])

if __name__ == '__main__':
    app.run(debug=True)</code></pre>
<pre><code># pages/overview.py
from dash import html, register_page
import dash_bootstrap_components as dbc
import plotly.express as px

register_page(__name__, path='/', name='Overview')

df = px.data.gapminder().query("year == 2007")

layout = dbc.Container([
    dbc.Row(dbc.Col(html.H2("Global Overview 2007"), className="my-3")),
    dbc.Row([
        dbc.Col(dbc.Card([dbc.CardBody([html.H4("142"), html.P("Countries")])]), md=3),
        dbc.Col(dbc.Card([dbc.CardBody([html.H4("5"),   html.P("Continents")])]), md=3),
    ], className="mb-3"),
    dbc.Row(dbc.Col(dcc.Graph(figure=px.scatter(df, x='gdpPercap', y='lifeExp',
                                                color='continent', hover_name='country',
                                                log_x=True, size='pop', size_max=50,
                                                template='plotly_dark')))),
], fluid=True)</code></pre>` },
    { type: 'text', body: `<h3>Bootstrap Grid System in Dash</h3>
<pre><code>import dash_bootstrap_components as dbc
from dash import html, dcc

# dbc.Row / dbc.Col gives you a 12-column responsive grid
layout = dbc.Container([
    dbc.Row([
        # Full width header
        dbc.Col(html.H1("Sales Dashboard"), width=12)
    ]),
    dbc.Row([
        # 4 KPI cards — 3 columns each on medium screens
        dbc.Col(dbc.Card(dbc.CardBody([html.H3("\$48K"), html.P("Revenue")])), md=3),
        dbc.Col(dbc.Card(dbc.CardBody([html.H3("1.2K"), html.P("Orders")])),   md=3),
        dbc.Col(dbc.Card(dbc.CardBody([html.H3("\$38"),  html.P("Avg Order")])), md=3),
        dbc.Col(dbc.Card(dbc.CardBody([html.H3("8.4%"), html.P("Growth")])),   md=3),
    ], className="g-3 mb-3"),   # g-3 = gap, mb-3 = margin-bottom
    dbc.Row([
        # Wide chart left, narrow chart right
        dbc.Col(dcc.Graph(id='line-chart'), md=8),
        dbc.Col(dcc.Graph(id='pie-chart'),  md=4),
    ]),
], fluid=True)</code></pre>` },
    { type: 'tip', body: `Bootstrap themes from <code>dash-bootstrap-components</code> let you switch the entire app's look by changing one line: <code>external_stylesheets=[dbc.themes.DARKLY]</code>. Available themes: BOOTSTRAP, DARKLY, FLATLY, JOURNAL, LUX, MINTY, SKETCHY, SLATE, SOLAR, SUPERHERO. Try <code>DARKLY</code> for a dark-mode dashboard and <code>LUX</code> for a clean corporate report style — no CSS required.` },
    { type: 'exercise', title: 'Convert a single-page Dash app to multi-page with Bootstrap navigation', hint: 'Split the gapminder app into an Overview page and a Country Detail page, add a navbar, and use dbc.Container for layout', solution: `# Run with: python app.py
# File: app.py

from dash import Dash, html, page_container, page_registry
import dash_bootstrap_components as dbc

app = Dash(__name__, use_pages=True,
           external_stylesheets=[dbc.themes.DARKLY],
           suppress_callback_exceptions=True)

app.layout = html.Div([
    dbc.NavbarSimple(
        children=[
            dbc.NavLink(p['name'], href=p['path'], className="me-2")
            for p in page_registry.values()
        ],
        brand="DSA Gapminder", brand_href="/",
        color="primary", dark=True, className="mb-0"
    ),
    dbc.Container(page_container, fluid=True, className="py-4")
])

if __name__ == '__main__':
    app.run(debug=True)

# File: pages/overview.py
# from dash import register_page, html, dcc
# from dash_bootstrap_components import Row, Col, Card, CardBody, Container
# import plotly.express as px
# register_page(__name__, path='/', name='Overview')
# df = px.data.gapminder()
# layout = Container([Row([Col(html.H2("Overview"), width=12)]),
#   Row([Col(dcc.Graph(figure=px.choropleth(df[df.year==2007],
#     locations='iso_alpha', color='lifeExp', hover_name='country',
#     color_continuous_scale='RdYlGn', title='Life Expectancy 2007')))
# ])])

# File: pages/trends.py
# from dash import register_page, html, dcc, callback, Output, Input
# import plotly.express as px, dash_bootstrap_components as dbc
# register_page(__name__, path='/trends', name='Trends')
# df = px.data.gapminder()
# layout = dbc.Container([
#   dbc.Row(dbc.Col(html.H2("Trends by Country"))),
#   dbc.Row(dbc.Col(dcc.Dropdown(id='country-dd',
#     options=[{'label':c,'value':c} for c in sorted(df.country.unique())],
#     value='India', clearable=False))),
#   dbc.Row(dbc.Col(dcc.Graph(id='trend-graph')))
# ])
# @callback(Output('trend-graph','figure'), Input('country-dd','value'))
# def show_trend(country):
#   d = df[df.country==country]
#   return px.line(d, x='year', y=['lifeExp','gdpPercap'],
#     facet_col='variable', template='plotly_dark', title=country)
print("Multi-page app structure ready — see comments for pages/ content")` }
  ]
};

L['dataviz-w5-l5'] = {
  title: 'Deploying Dash on Render & Hugging Face Spaces',
  sections: [
    { type: 'text', body: `<h2>Going Live</h2>
<p>A Dash app running on your laptop is only visible to you. Deploying it to a cloud platform makes it accessible to anyone with a link — clients, teammates, or the public. Two free options are ideal for data science projects: <strong>Render</strong> (generic web service) and <strong>Hugging Face Spaces</strong> (ML-community focused).</p>
<h3>Deploying on Render (Free Tier)</h3>
<pre><code># Step 1: Prepare your project
# my_app/
#   app.py
#   requirements.txt
#   render.yaml  (optional — or configure in the Render UI)

# requirements.txt
dash==2.17.0
plotly==5.22.0
pandas==2.2.0
gunicorn==21.2.0

# Step 2: Modify app.py for production
# Add server = app.server (exposes Flask server for gunicorn)
from dash import Dash, html, dcc
app = Dash(__name__)
server = app.server      # ← REQUIRED for Render/gunicorn

app.layout = html.Div([html.H1("Hello from Render!")])

if __name__ == '__main__':
    app.run(debug=False)   # debug=False in production

# Step 3: render.yaml
# services:
#   - type: web
#     name: my-dash-app
#     env: python
#     plan: free
#     buildCommand: pip install -r requirements.txt
#     startCommand: gunicorn app:server -b 0.0.0.0:\$PORT

# Step 4: Push to GitHub → connect to Render → Deploy</code></pre>` },
    { type: 'text', body: `<h3>Deploying on Hugging Face Spaces</h3>
<pre><code># Hugging Face Spaces supports Gradio and Dash (SDK: gradio or static)
# For Dash, use the Docker SDK option

# Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 7860
CMD ["gunicorn", "app:server", "-b", "0.0.0.0:7860", "--workers", "1"]

# app.py — same as above with server = app.server
# HF Spaces URL: https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE

# README.md (required — YAML frontmatter tells HF the SDK)
# ---
# title: My Dash Dashboard
# emoji: 📊
# colorFrom: blue
# colorTo: indigo
# sdk: docker
# pinned: false
# ---

# Push files, HF builds and runs the Docker container automatically</code></pre>
<h3>Performance Tips for Production</h3>
<ul>
  <li><strong>Cache expensive callbacks</strong> with <code>from dash import DiskcacheManager</code> or <code>flask_caching</code> — prevents re-running slow queries on every user.</li>
  <li><strong>Use <code>dcc.Store</code></strong> to share computed data between callbacks without re-fetching.</li>
  <li><strong>Set <code>prevent_initial_call=True</code></strong> on callbacks that should not run on page load.</li>
  <li><strong>Serve static assets</strong> from an <code>assets/</code> folder — Dash serves these automatically at <code>/assets/filename</code>.</li>
</ul>` },
    { type: 'tip', body: `Always test your deployed app in an incognito window immediately after deployment — cached credentials and local state can mask errors that real users will see. Check that all charts load, all dropdowns work, and the layout renders correctly on a mobile screen. The free Render tier sleeps after 15 minutes of inactivity — the first load takes 30–60 seconds to wake up. Add a loading spinner (<code>dcc.Loading</code>) so users know something is happening.` },
    { type: 'exercise', title: 'Package and deploy a complete Dash app to Render with all production requirements', hint: 'Create requirements.txt, add server = app.server, write a Procfile, push to GitHub and connect to Render', solution: `# Complete production-ready Dash app structure

# === app.py ===
from dash import Dash, html, dcc, callback, Output, Input
import plotly.express as px
import dash_bootstrap_components as dbc

app = Dash(__name__, external_stylesheets=[dbc.themes.DARKLY])
server = app.server   # Expose Flask server for gunicorn

df = px.data.gapminder()

app.layout = dbc.Container([
    dbc.Row(dbc.Col(html.H1("Global Development Dashboard",
                            style={'color':'#c8a96e','textAlign':'center'}), className="my-3")),
    dbc.Row([
        dbc.Col(dcc.Dropdown(
            id='metric', clearable=False,
            options=[{'label':'Life Expectancy','value':'lifeExp'},
                     {'label':'GDP per Capita','value':'gdpPercap'},
                     {'label':'Population','value':'pop'}],
            value='lifeExp'), md=4),
        dbc.Col(dcc.Slider(id='year', min=1952, max=2007, step=5, value=2007,
                           marks={y:str(y) for y in range(1952,2008,5)}), md=8),
    ], className="mb-3"),
    dbc.Row([
        dbc.Col(dcc.Loading(dcc.Graph(id='world-map')), md=8),
        dbc.Col(dcc.Loading(dcc.Graph(id='bar-chart')), md=4),
    ])
], fluid=True)

@callback(Output('world-map','figure'), Output('bar-chart','figure'),
          Input('metric','value'), Input('year','value'))
def update(metric, year):
    d = df[df.year == year]
    world = px.choropleth(d, locations='iso_alpha', color=metric,
                          hover_name='country', color_continuous_scale='RdYlGn',
                          template='plotly_dark', title=f'{metric} — {year}')
    bar = px.bar(d.nlargest(10, metric), x=metric, y='country',
                 orientation='h', template='plotly_dark',
                 color=metric, color_continuous_scale='Blues',
                 title=f'Top 10 — {metric}')
    bar.update_layout(yaxis={'categoryorder':'total ascending'}, showlegend=False)
    return world, bar

if __name__ == '__main__':
    app.run(debug=False)

# === requirements.txt ===
# dash==2.17.0
# plotly==5.22.0
# pandas==2.2.0
# dash-bootstrap-components==1.6.0
# gunicorn==21.2.0

# === Procfile (for Render) ===
# web: gunicorn app:server

# === .gitignore ===
# __pycache__/
# *.pyc
# .env
print("Production app ready — push to GitHub and connect to Render")` }
  ]
};

L['dataviz-w5-quiz'] = {
  title: 'Quiz — Dashboard Development with Plotly Dash',
  sections: [
    { type: 'text', body: `<h2>Module 5 Quiz</h2><p>Test your understanding of Dash layout, callbacks, core components, multi-page apps, and deployment.</p>` }
  ]
};

/* ─── MODULE 6 — Capstone: Business Dashboard Project ───────────────────── */

L['dataviz-w6-l1'] = {
  title: 'Dataset Selection & EDA for Storytelling',
  sections: [
    { type: 'text', body: `<h2>Starting with a Question, Not a Chart</h2>
<p>The most common capstone mistake is opening a dataset and immediately building charts. Great data stories start with a question — a decision someone needs to make, a phenomenon someone wants to understand. The dataset and the charts are in service of that question.</p>
<h3>Choosing Your Dataset</h3>
<p>A good capstone dataset has: at least 3 variable types (categorical, numeric, temporal); enough rows to have meaningful distributions (500+); a domain that connects to a real business or research question. Recommended sources:</p>
<table>
  <tr><th>Domain</th><th>Dataset</th><th>Source</th><th>Key variables</th></tr>
  <tr><td>Retail</td><td>Superstore Sales</td><td>Kaggle</td><td>Sales, Profit, Region, Category, Date</td></tr>
  <tr><td>Finance</td><td>Stock prices (yfinance)</td><td>Python library</td><td>OHLCV, ticker, date</td></tr>
  <tr><td>Healthcare</td><td>Hospital readmissions</td><td>UCI ML Repo</td><td>Age, diagnosis, LOS, readmit</td></tr>
  <tr><td>Transport</td><td>NYC Taxi Trips</td><td>NYC Open Data</td><td>Distance, fare, pickup hour, location</td></tr>
  <tr><td>HR</td><td>IBM HR Attrition</td><td>Kaggle</td><td>Attrition, Department, Salary, Age</td></tr>
  <tr><td>Sports</td><td>IPL match data</td><td>Kaggle</td><td>Team, runs, wickets, venue, season</td></tr>
</table>
<h3>The EDA Storytelling Framework</h3>
<ol>
  <li><strong>Profile</strong> — shape, dtypes, nulls, cardinality. Know what you have.</li>
  <li><strong>Univariate</strong> — distribution of each key variable. Find ranges, outliers, skew.</li>
  <li><strong>Bivariate</strong> — relationships between pairs. Correlation matrix, scatter, group-by.</li>
  <li><strong>Temporal</strong> — how do values change over time? Trend, seasonality, events.</li>
  <li><strong>Insight harvest</strong> — from all the above, list the 5 most surprising or actionable findings. These become the dashboard's stories.</li>
</ol>` },
    { type: 'text', body: `<h3>EDA for the Superstore Dataset</h3>
<pre><code>import pandas as pd
import plotly.express as px

# Load Superstore (download from Kaggle as 'superstore.csv')
df = pd.read_csv('superstore.csv', encoding='latin-1',
                 parse_dates=['Order Date', 'Ship Date'])

# ── Profile ──────────────────────────────────────────────────────────────────
print(df.shape)           # (9994, 21)
print(df.dtypes)
print(df.isnull().sum())  # check for nulls
print(df.describe())

# Key derived columns
df['profit_margin'] = df['Profit'] / df['Sales'] * 100
df['order_month'] = df['Order Date'].dt.to_period('M').astype(str)
df['order_year'] = df['Order Date'].dt.year

# ── Univariate ────────────────────────────────────────────────────────────────
fig = px.histogram(df, x='Sales', nbins=50, log_y=True, template='plotly_white',
                   title='Sales Distribution (log scale — heavily right-skewed)')
fig.show()

# ── Bivariate ─────────────────────────────────────────────────────────────────
fig = px.scatter(df, x='Discount', y='Profit', color='Category',
                 opacity=0.4, template='plotly_white', trendline='ols',
                 title='Discount vs Profit — discounts destroy margin')
fig.show()

# ── Temporal ──────────────────────────────────────────────────────────────────
monthly = df.groupby('order_month')[['Sales','Profit']].sum().reset_index()
fig = px.line(monthly, x='order_month', y=['Sales','Profit'],
              template='plotly_white', title='Monthly Revenue & Profit')
fig.update_xaxes(tickangle=45)
fig.show()

# ── 5 Key Insights (from exploration):
# 1. Tables sub-category has deeply negative profit — selling below cost
# 2. Discounts above 20% almost always result in negative profit
# 3. West region has highest sales but Central has best margin
# 4. Q4 shows consistent seasonal spike every year
# 5. Standard Class shipping dominates but Same Day has highest margin</code></pre>` },
    { type: 'tip', body: `Write your 5 insights as statements before building any dashboard chart: "The West region accounts for 32% of sales but only 28% of profit — suggesting pricing pressure." This forces you to know what each chart needs to prove. Charts built from pre-defined insight statements are always more focused and persuasive than charts built by browsing the data visually.` },
    { type: 'exercise', title: 'Load any dataset and document the 5 most important insights from EDA', hint: 'Use the Superstore, IBM HR, or any Kaggle dataset — run the 5-step EDA framework and write each insight as a sentence before building a chart', solution: `import pandas as pd
import plotly.express as px
import numpy as np

# Using IBM HR Attrition as example (available on Kaggle)
# Simulating a small version for this exercise
np.random.seed(42)
n = 1000
df = pd.DataFrame({
    'Age': np.random.randint(22, 60, n),
    'Department': np.random.choice(['Sales','R&D','HR'], n, p=[0.35,0.50,0.15]),
    'Attrition': np.random.choice(['Yes','No'], n, p=[0.16,0.84]),
    'MonthlyIncome': np.random.normal(6500, 3000, n).clip(1000, 20000).astype(int),
    'YearsAtCompany': np.random.exponential(7, n).clip(0, 40).astype(int),
    'JobSatisfaction': np.random.randint(1, 5, n),
    'OverTime': np.random.choice(['Yes','No'], n, p=[0.28,0.72])
})

# 1. Profile
print("Shape:", df.shape)
print("Attrition rate:", df['Attrition'].value_counts(normalize=True).round(3))

# 2. Univariate — income distribution
fig = px.histogram(df, x='MonthlyIncome', color='Attrition',
                   barmode='overlay', opacity=0.7, template='plotly_white',
                   title='Insight 1: Lower income = higher attrition risk')
fig.show()

# 3. Bivariate — overtime vs attrition
ot_attr = df.groupby(['OverTime','Attrition']).size().reset_index(name='count')
fig = px.bar(ot_attr, x='OverTime', y='count', color='Attrition',
             barmode='group', template='plotly_white',
             title='Insight 2: Overtime employees leave at 2× the rate')
fig.show()

# 4. Department breakdown
dept_attr = df.groupby('Department')['Attrition'].apply(
    lambda x: (x=='Yes').mean()*100).reset_index()
dept_attr.columns = ['Department','Attrition Rate %']
fig = px.bar(dept_attr.sort_values('Attrition Rate %'),
             x='Attrition Rate %', y='Department', orientation='h',
             template='plotly_white', title='Insight 3: Sales has highest attrition rate')
fig.show()

insights = [
    "1. Lower income employees (< ₹4,000/mo) attrite at 3× the overall rate",
    "2. Overtime workers leave at 2× the rate of non-overtime workers",
    "3. Sales department has the highest attrition (~22%)",
    "4. Employees in Year 1-2 are most likely to leave (tenure cliff)",
    "5. Low job satisfaction (score 1) nearly triples attrition risk"
]
for i in insights:
    print(i)` }
  ]
};

L['dataviz-w6-l2'] = {
  title: 'Dashboard Design — Wireframing & Layout Principles',
  sections: [
    { type: 'text', body: `<h2>Design Before You Code</h2>
<p>The single most effective practice for building a good dashboard is spending 20 minutes with pencil and paper before opening your code editor. A wireframe forces decisions about hierarchy, layout, and what to include — decisions that are fast on paper and expensive to redo in code.</p>
<h3>Dashboard Design Principles</h3>
<ul>
  <li><strong>Z-pattern reading</strong> — eyes move left-to-right across the top, then diagonally to the bottom-left, then across the bottom. Put the most important KPI top-left, the primary chart top-right, supporting charts bottom.</li>
  <li><strong>Progressive disclosure</strong> — show summary (KPIs) at the top, detail (filtered tables, drill-downs) at the bottom. The reader controls how deep they go.</li>
  <li><strong>One story per dashboard</strong> — a dashboard that tries to tell 10 stories tells none. Define the one question it answers, and ruthlessly cut everything that does not serve that question.</li>
  <li><strong>Consistent colour vocabulary</strong> — use one colour for positive (green), one for negative (red), one for neutral (blue), and one accent for highlights. Never re-use colours for different meanings.</li>
  <li><strong>White space is not wasted space</strong> — padding and margins let each chart breathe. A cramped dashboard is harder to read than a simple one with room.</li>
</ul>
<h3>Standard Dashboard Layout Templates</h3>
<pre>
Template A — KPI + Detail:           Template B — Comparison:
┌─────────┬─────────┬─────────┐      ┌────────────┬────────────┐
│  KPI 1  │  KPI 2  │  KPI 3  │      │  Filter    │  Filter    │
├─────────┴─────────┴─────────┤      ├────────────┴────────────┤
│                             │      │  Chart A   │  Chart B   │
│     Primary Wide Chart      │      ├────────────┼────────────┤
├──────────────┬──────────────┤      │  Chart C   │  Chart D   │
│  Chart B     │  Chart C     │      └────────────┴────────────┘
└──────────────┴──────────────┘
</pre>` },
    { type: 'text', body: `<h3>Translating Wireframe to Dash Layout</h3>
<pre><code>import dash_bootstrap_components as dbc
from dash import html, dcc

# Template A — KPI + Detail in Dash
def kpi_card(title, value, delta=None, color='primary'):
    return dbc.Card([
        dbc.CardBody([
            html.P(title, className="text-muted mb-1", style={'fontSize':'0.8rem'}),
            html.H3(value, className=f"text-{color} mb-0 fw-bold"),
            html.Small(delta, className="text-success") if delta else None
        ])
    ], className="shadow-sm h-100")

layout = dbc.Container([
    # Row 1: Page header
    dbc.Row([
        dbc.Col([
            html.H2("Sales Performance Dashboard", className="mb-0"),
            html.P("Q2 2024 | Updated: 2024-06-30", className="text-muted")
        ], md=8),
        dbc.Col([
            dcc.Dropdown(id='region-filter', placeholder='All Regions',
                         options=['North','South','East','West'])
        ], md=4, className="d-flex align-items-center")
    ], className="mb-4 align-items-end"),

    # Row 2: KPI cards
    dbc.Row([
        dbc.Col(kpi_card("Total Revenue",    "\$2.4M",  "↑ 12% vs Q1", "primary"), md=3),
        dbc.Col(kpi_card("Total Orders",     "3,842",   "↑ 8%",         "success"), md=3),
        dbc.Col(kpi_card("Avg Order Value",  "\$625",   "↑ 4%",         "warning"), md=3),
        dbc.Col(kpi_card("Return Rate",      "3.2%",    "↓ 0.5%",       "danger"),  md=3),
    ], className="mb-4 g-3"),

    # Row 3: Primary wide chart
    dbc.Row([dbc.Col(dcc.Graph(id='revenue-trend'), md=12)], className="mb-3"),

    # Row 4: Two supporting charts
    dbc.Row([
        dbc.Col(dcc.Graph(id='category-chart'),  md=6),
        dbc.Col(dcc.Graph(id='region-map'),       md=6),
    ], className="mb-3"),
], fluid=True)</code></pre>` },
    { type: 'tip', body: `Always put filter controls (dropdowns, date pickers) in a sticky top bar or a left sidebar — never scattered between charts. Users should be able to change all filters in one place and see all charts update simultaneously. A filter buried between charts is a filter the user will not find, making the interactivity invisible.` },
    { type: 'exercise', title: 'Wireframe and implement the skeleton layout for your capstone dashboard', hint: 'Draw your layout on paper first, then translate it to a Dash layout with placeholder charts and real KPI values', solution: `from dash import Dash, html, dcc, callback, Output, Input
import dash_bootstrap_components as dbc
import plotly.express as px
import pandas as pd, numpy as np

app = Dash(__name__, external_stylesheets=[dbc.themes.DARKLY])
server = app.server

np.random.seed(42)
df = pd.DataFrame({
    'month': pd.date_range('2024-01','2024-07',freq='MS').repeat(4),
    'region': ['North','South','East','West']*6,
    'sales': np.random.randint(50, 300, 24),
    'profit': np.random.randint(5, 80, 24)
})

def kpi(label, value, sub, color):
    return dbc.Card(dbc.CardBody([
        html.P(label, className='text-muted mb-1', style={'fontSize':'.78rem'}),
        html.H3(value, style={'color': color, 'margin':0}),
        html.Small(sub, style={'color':'#aaa'})
    ]), style={'borderTop': f'3px solid {color}'})

app.layout = dbc.Container([
    dbc.Row(dbc.Col(html.H2("Sales Dashboard — H1 2024",
                            style={'color':'#c8a96e','padding':'1rem 0'}), width=12)),
    dbc.Row([
        dbc.Col(kpi("Revenue",  "\$1.24M", "↑ 14% vs H1 2023", "#2d6be4"), md=3),
        dbc.Col(kpi("Orders",   "2,341",   "↑ 9%",              "#2db85e"), md=3),
        dbc.Col(kpi("Avg Deal", "\$530",   "↑ 5%",              "#e07b39"), md=3),
        dbc.Col(kpi("Margin",   "28.3%",   "↑ 2.1pp",           "#9b59b6"), md=3),
    ], className="g-3 mb-4"),
    dbc.Row([dbc.Col(dcc.Graph(
        figure=px.line(df.groupby('month')[['sales','profit']].sum().reset_index(),
                       x='month', y=['sales','profit'], template='plotly_dark',
                       title='Monthly Sales & Profit')), width=12)], className="mb-3"),
    dbc.Row([
        dbc.Col(dcc.Graph(figure=px.bar(
            df.groupby('region')['sales'].sum().reset_index(),
            x='region', y='sales', color='region', template='plotly_dark',
            title='Sales by Region')), md=6),
        dbc.Col(dcc.Graph(figure=px.scatter(df, x='sales', y='profit',
            color='region', template='plotly_dark', title='Sales vs Profit')), md=6),
    ])
], fluid=True)

if __name__ == '__main__':
    app.run(debug=True)` }
  ]
};

L['dataviz-w6-l3'] = {
  title: 'Building the Dash App — Charts, Callbacks & Drill-downs',
  sections: [
    { type: 'text', body: `<h2>From Skeleton to Full Dashboard</h2>
<p>With the layout wireframe translated to Dash structure, the next step is wiring up real data to real charts with working callbacks. The key patterns are: filter callbacks that update multiple charts simultaneously, click-through drill-downs using <code>clickData</code>, and chained callbacks for dependent filters.</p>
<h3>Multi-chart Filter Callback</h3>
<pre><code>from dash import Dash, html, dcc, callback, Output, Input
import dash_bootstrap_components as dbc
import plotly.express as px, pandas as pd

app = Dash(__name__, external_stylesheets=[dbc.themes.DARKLY])
server = app.server

# Load Superstore data (or similar)
df = pd.read_csv('superstore.csv', encoding='latin-1',
                 parse_dates=['Order Date'])
df['Year'] = df['Order Date'].dt.year
df['Month'] = df['Order Date'].dt.to_period('M').astype(str)

app.layout = dbc.Container([
    dbc.Row([
        dbc.Col(dcc.Dropdown(id='region-dd', options=['East','West','Central','South'],
                             value=None, placeholder='All Regions', multi=True), md=3),
        dbc.Col(dcc.Dropdown(id='cat-dd',
                             options=df['Category'].unique().tolist(),
                             value=None, placeholder='All Categories', multi=True), md=3),
        dbc.Col(dcc.RangeSlider(id='year-sl', min=2020, max=2023, step=1, value=[2020,2023],
                                marks={y:str(y) for y in range(2020,2024)}), md=6),
    ], className="mb-3 g-2"),
    dbc.Row([
        dbc.Col(dcc.Graph(id='trend-chart'), md=8),
        dbc.Col(dcc.Graph(id='cat-pie'),     md=4),
    ], className="mb-3"),
    dbc.Row([dbc.Col(dcc.Graph(id='sub-bar'), md=12)])
])

@callback(
    Output('trend-chart','figure'),
    Output('cat-pie','figure'),
    Output('sub-bar','figure'),
    Input('region-dd','value'),
    Input('cat-dd','value'),
    Input('year-sl','value')
)
def update_all(regions, categories, years):
    d = df.copy()
    if regions:   d = d[d['Region'].isin(regions)]
    if categories: d = d[d['Category'].isin(categories)]
    d = d[d['Year'].between(years[0], years[1])]

    trend = px.line(d.groupby('Month')[['Sales','Profit']].sum().reset_index(),
                    x='Month', y=['Sales','Profit'], template='plotly_dark',
                    title='Monthly Revenue & Profit')

    pie = px.pie(d.groupby('Category')['Sales'].sum().reset_index(),
                 names='Category', values='Sales', template='plotly_dark',
                 title='Revenue by Category', hole=0.4)

    bar = px.bar(d.groupby('Sub-Category')[['Sales','Profit']].sum().reset_index()
                  .sort_values('Sales', ascending=False),
                 x='Sub-Category', y=['Sales','Profit'], template='plotly_dark',
                 barmode='group', title='Sales & Profit by Sub-Category')
    return trend, pie, bar

if __name__ == '__main__':
    app.run(debug=True)</code></pre>` },
    { type: 'tip', body: `Implement click-through drill-downs with <code>Input('chart-id', 'clickData')</code>. When a user clicks a bar (e.g., a region), <code>clickData</code> contains the clicked value. Use it to filter a detail table or secondary chart below. This turns a static dashboard into a self-service analytics tool — the user becomes the analyst, not just the audience.` },
    { type: 'exercise', title: 'Add a click-through drill-down: clicking a region bar shows that region\'s sub-category breakdown', hint: 'Add clickData Input from the region bar chart, use it to filter a second bar chart showing sub-categories for the clicked region', solution: `from dash import Dash, html, dcc, callback, Output, Input
import dash_bootstrap_components as dbc
import plotly.express as px, pandas as pd, numpy as np

app = Dash(__name__, external_stylesheets=[dbc.themes.DARKLY])
server = app.server

np.random.seed(42)
regions = ['North','South','East','West']
subs = ['Electronics','Clothing','Food','Books','Sports','Furniture']
records = []
for r in regions:
    for s in subs:
        records.append({'Region':r,'SubCategory':s,
                        'Sales':np.random.randint(30,300),
                        'Profit':np.random.randint(5,80)})
df = pd.DataFrame(records)

app.layout = dbc.Container([
    dbc.Row(dbc.Col(html.H3("Click a region to drill down",
                            style={'color':'#c8a96e'}), className="my-3")),
    dbc.Row([
        dbc.Col(dcc.Graph(
            id='region-bar',
            figure=px.bar(df.groupby('Region')['Sales'].sum().reset_index()
                           .sort_values('Sales',ascending=False),
                          x='Region', y='Sales', color='Region',
                          template='plotly_dark', title='Sales by Region — click to drill down')),
            md=5),
        dbc.Col(dcc.Graph(id='sub-drill'), md=7),
    ])
], fluid=True)

@callback(Output('sub-drill','figure'), Input('region-bar','clickData'))
def drill_down(click):
    if not click:
        d = df
        title = 'All Regions — Sub-category Breakdown'
    else:
        region = click['points'][0]['x']
        d = df[df['Region'] == region]
        title = f'{region} Region — Sub-category Breakdown'

    fig = px.bar(d.sort_values('Sales', ascending=True),
                 x='Sales', y='SubCategory', orientation='h',
                 color='Profit', color_continuous_scale='RdYlGn',
                 template='plotly_dark', title=title)
    return fig

if __name__ == '__main__':
    app.run(debug=True)` }
  ]
};

L['dataviz-w6-l4'] = {
  title: 'Data Storytelling — Annotations, Narrative & Insight Hierarchy',
  sections: [
    { type: 'text', body: `<h2>From Chart to Story</h2>
<p>A chart that shows data is not the same as a chart that tells a story. Storytelling requires: a clear insight statement, visual emphasis on the key element, annotations that direct attention, and a narrative flow from context → finding → implication.</p>
<h3>The Insight Statement</h3>
<p>Every chart in a business dashboard should be able to complete this sentence: <em>"This chart shows that [finding], which means [implication], so we should [action]."</em></p>
<ul>
  <li><strong>Bad title:</strong> "Monthly Revenue by Product" — describes the data, not the insight</li>
  <li><strong>Good title:</strong> "Furniture revenue collapsed 34% in Q3 — driven by two returned bulk orders" — states the finding</li>
</ul>
<h3>Adding Annotations to Plotly Charts</h3>
<pre><code>import plotly.express as px
import plotly.graph_objects as go
import pandas as pd, numpy as np

months = pd.date_range('2024-01','2024-12',freq='MS')
revenue = [120,135,128,145,160,142,98,88,135,150,168,195]

fig = go.Figure()
fig.add_trace(go.Scatter(x=months, y=revenue, mode='lines+markers',
                         line=dict(color='#2d6be4', width=2.5),
                         marker=dict(size=7)))

# Highlight the worst month
fig.add_annotation(x=months[7], y=revenue[7],
                   text="Aug: 45% drop<br>due to supplier delay",
                   showarrow=True, arrowhead=2, arrowcolor='#e04444',
                   font=dict(color='#e04444', size=11),
                   bgcolor='rgba(224,68,68,0.1)', bordercolor='#e04444',
                   ax=60, ay=-60)

# Mark a target line
target = 150
fig.add_hline(y=target, line_dash='dot', line_color='#2db85e', line_width=1.5,
              annotation_text="Monthly target: \$150K",
              annotation_position="bottom right",
              annotation_font_color='#2db85e')

# Add a shaded "recovery" band
fig.add_vrect(x0=months[8], x1=months[11],
              fillcolor='rgba(45,184,94,0.07)', line_width=0,
              annotation_text="Recovery", annotation_position="top left",
              annotation_font_size=10, annotation_font_color='#2db85e')

fig.update_layout(
    title=dict(text="Revenue dipped 45% in Aug due to supplier delay — recovered in Sep",
               font=dict(size=14), x=0.5),
    xaxis_title='Month', yaxis_title='Revenue (K\$)',
    plot_bgcolor='white', hovermode='x unified'
)
fig.show()</code></pre>` },
    { type: 'tip', body: `Use <strong>three levels of emphasis</strong> in any chart: (1) the key bar/point in the primary colour, (2) supporting bars in a muted grey, (3) an annotation arrow pointing to the most important element. This is called "greying out" — when everything is colourful, nothing stands out. When only one element has colour, that element immediately captures attention.` },
    { type: 'exercise', title: 'Transform three plain charts into annotated, story-driven charts with insight titles', hint: 'Take three charts from your EDA, rewrite their titles as insight statements, add annotations for the key finding, and grey out all non-essential elements', solution: `import plotly.graph_objects as go
from plotly.subplots import make_subplots
import pandas as pd, numpy as np

np.random.seed(42)

fig = make_subplots(rows=1, cols=3,
                    subplot_titles=[
                        'Discounts above 20% destroy profit margin',
                        'Tables sub-category loses money every quarter',
                        'Q4 drives 38% of annual revenue — plan capacity now'
                    ])

# Chart 1: Discount buckets vs avg profit
discount_bins = ['0-10%','10-20%','20-30%','30%+']
avg_profit = [85, 42, -15, -68]
colors = ['#2d6be4','#2d6be4','#e04444','#e04444']
fig.add_trace(go.Bar(x=discount_bins, y=avg_profit, marker_color=colors,
                     text=[f'\${v:+d}' for v in avg_profit], textposition='outside',
                     name='Avg Profit'), row=1, col=1)
fig.add_hline(y=0, line_dash='dash', line_color='#888', row=1, col=1)

# Chart 2: Sub-category profit (highlight Tables in red, rest grey)
cats = ['Chairs','Bookcases','Furnishings','Tables']
profits = [26600, -3473, 13059, -17725]
bar_colors = ['#aaa','#aaa','#aaa','#e04444']
fig.add_trace(go.Bar(y=cats, x=profits, orientation='h',
                     marker_color=bar_colors, name='Profit by Sub-Cat'), row=1, col=2)
fig.add_annotation(x=-17725, y='Tables', text="(\$17.7K) loss",
                   showarrow=False, font=dict(color='#e04444', size=10),
                   xanchor='right', row=1, col=2)

# Chart 3: Quarterly revenue — highlight Q4
quarters = ['Q1','Q2','Q3','Q4']
rev = [145, 162, 138, 215]
q_colors = ['#aaa','#aaa','#aaa','#2d6be4']
fig.add_trace(go.Bar(x=quarters, y=rev, marker_color=q_colors,
                     text=[f'\${v}K' for v in rev], textposition='outside',
                     name='Quarterly Revenue'), row=1, col=3)

fig.update_layout(showlegend=False, height=500,
                  plot_bgcolor='white', paper_bgcolor='white',
                  title_text='Three Insights — Story-driven Titles & Emphasis',
                  title_x=0.5, title_font_size=14)
for i in range(1, 4):
    fig.update_xaxes(showgrid=False, row=1, col=i)
    fig.update_yaxes(showgrid=True, gridcolor='#eee', row=1, col=i)
fig.show()` }
  ]
};

L['dataviz-w6-l5'] = {
  title: 'Capstone — Stakeholder Presentation & Design Critique',
  sections: [
    { type: 'text', body: `<h2>Presenting to a Non-technical Audience</h2>
<p>Building the dashboard is 70% of the work; presenting it effectively is the other 30% and the part that determines whether anyone acts on it. A stakeholder walkthrough follows a specific structure: context → finding → so what → now what.</p>
<h3>The Stakeholder Walkthrough Script</h3>
<ol>
  <li><strong>Context (30 sec)</strong> — "This dashboard shows Q1–Q2 2024 sales performance across all four regions. The data comes from our CRM, updated daily."</li>
  <li><strong>The headline finding (1 min)</strong> — "The most important thing this dashboard shows is that the West region is generating 34% of revenue but only 18% of profit — a margin problem we did not see in the raw reports."</li>
  <li><strong>Walk through the evidence (3 min)</strong> — show 2–3 charts that support the finding. "You can see the margin gap here in the profit chart... and when we drill into West by sub-category, Furniture is the primary driver..."</li>
  <li><strong>The implication (30 sec)</strong> — "This means we are subsidising West sales with margin from other regions. If we fix Furniture pricing in West, our overall margin improves by ~4pp."</li>
  <li><strong>The ask (30 sec)</strong> — "I'd recommend a pricing review for the Furniture category in West for Q3. I can set up an automated alert on this dashboard to flag if margin drops below 15%."</li>
</ol>
<h3>Design Critique Framework</h3>
<p>When reviewing your own or a peer's dashboard, ask these questions:</p>
<ul>
  <li><strong>The 5-second test</strong>: What does a first-time viewer take away in 5 seconds? Is that the intended message?</li>
  <li><strong>The remove test</strong>: What happens if you remove any chart? If nothing is lost, remove it.</li>
  <li><strong>The colour test</strong>: Does every colour encode information? Are the same colours used for the same concepts throughout?</li>
  <li><strong>The mobile test</strong>: Does the layout work on a phone screen? Do the charts still make sense at 50% width?</li>
  <li><strong>The title test</strong>: Do the chart titles state insights or just describe the data? Rewrite every descriptive title as a finding.</li>
</ul>` },
    { type: 'text', body: `<h3>Complete Capstone Checklist</h3>
<pre><code># Run this checklist before submitting your capstone

checklist = {
    "Data": [
        "Dataset has 500+ rows and 3+ variable types",
        "Data is clean: nulls handled, dtypes correct, no duplicates",
        "Derived columns created (e.g. profit_margin, order_month)",
        "5 key insights documented as written statements"
    ],
    "Charts": [
        "At least 4 chart types used (line, bar, scatter, pie/map/distribution)",
        "Every chart has an insight-statement title (not just a description)",
        "Colour is used intentionally: consistent vocabulary across charts",
        "Key finding is visually emphasised (colour, annotation, or callout)"
    ],
    "Dashboard": [
        "At least 2 working callbacks (filters update multiple charts)",
        "KPI cards show the most important numbers at the top",
        "Filter controls are grouped together (not scattered between charts)",
        "Loading spinner added for slow callbacks (dcc.Loading)",
        "Responsive layout tested at 768px width"
    ],
    "Storytelling": [
        "Dashboard answers a single clearly defined question",
        "A 5-minute stakeholder walkthrough has been rehearsed",
        "The headline finding can be stated in one sentence",
        "Each chart supports the headline or provides necessary context"
    ],
    "Deployment": [
        "server = app.server is set in app.py",
        "requirements.txt is complete and pinned",
        "App is live on Render or Hugging Face Spaces",
        "Shared URL tested in a fresh browser (incognito)"
    ]
}

for section, items in checklist.items():
    print(f"\\n{'='*40}")
    print(f" {section}")
    print('='*40)
    for item in items:
        print(f"  [ ] {item}")

print("\\nCapstone complete when all boxes are checked.")</code></pre>` },
    { type: 'tip', body: `Record a 3-minute screen capture walkthrough of your deployed dashboard and share the video alongside the URL. Many stakeholders will watch a video before clicking a link — and a recorded walkthrough demonstrates that the dashboard works, highlights the key insights in the right order, and shows the interactive features that would be invisible in a static screenshot.` },
    { type: 'exercise', title: 'Complete capstone — deploy your dashboard and deliver a 5-minute recorded walkthrough', hint: 'Build your full dashboard, deploy it, record a walkthrough using OBS or Loom, and document your 5 key insights with the evidence chart for each', solution: `# Capstone Final Submission Checklist

# === 1. Final app.py — production-ready structure ===
# from dash import Dash, html, dcc, callback, Output, Input
# import dash_bootstrap_components as dbc
# import plotly.express as px, pandas as pd
#
# app = Dash(__name__, external_stylesheets=[dbc.themes.DARKLY], use_pages=False)
# server = app.server   # for gunicorn / Render
#
# [your layout and callbacks here]
#
# if __name__ == '__main__':
#     app.run(debug=False)

# === 2. requirements.txt ===
reqs = """dash>=2.17
plotly>=5.22
pandas>=2.2
dash-bootstrap-components>=1.6
gunicorn>=21.2
"""
print("requirements.txt:")
print(reqs)

# === 3. Insight documentation template ===
insights_template = [
    {"insight": "[State the finding in one sentence]",
     "chart":   "[Chart type and what it shows]",
     "action":  "[What should the team do?]",
     "urgency": "High / Medium / Low"},
]

print("\\nInsight Documentation:")
print("-" * 60)
for i, item in enumerate(insights_template, 1):
    print(f"\\nInsight {i}:")
    for k, v in item.items():
        print(f"  {k.capitalize():10}: {v}")

# === 4. Walkthrough script outline ===
script = [
    "0:00 — Introduce the business question this dashboard answers",
    "0:30 — Show the KPI cards — state the headline number",
    "1:00 — Walk through the primary time-series chart — the trend",
    "1:45 — Drill into the anomaly — what caused it?",
    "2:30 — Show the geographic or category breakdown",
    "3:00 — Demonstrate a filter interaction live",
    "3:30 — State the implication and recommended action",
    "4:00 — Show the live URL and how to share it",
    "4:30 — Q&A"
]
print("\\nWalkthrough Script:")
for line in script:
    print(f"  {line}")

print("\\nCapstone complete — dashboard deployed and walkthrough recorded.")` }
  ]
};

L['dataviz-w6-quiz'] = {
  title: 'Quiz — Capstone & Data Storytelling',
  sections: [
    { type: 'text', body: `<h2>Module 6 Quiz</h2><p>Test your understanding of EDA for storytelling, dashboard design, Dash callbacks, annotations, and stakeholder communication.</p>` }
  ]
};

})();




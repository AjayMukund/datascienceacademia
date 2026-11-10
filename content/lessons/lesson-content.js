/* ════════════════════════════════════════════════════════════════════════════
   DSA Lesson Content — Python for Data Science (8 weeks, 39 lessons)
   Each key maps to lesson.content_url in Supabase (type = 'text')
════════════════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
window.DSA_LESSON_CONTENT = window.DSA_LESSON_CONTENT || {};
const L = window.DSA_LESSON_CONTENT;

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 1 — PYTHON FUNDAMENTALS
   Setup, variables, data types, operators, strings, type conversion
══════════════════════════════════════════════════════════════════════════ */

L['python-w1-l1'] = {
  duration_mins: 12,
  sections: [
    { type:'text', body:`
<h2>Setup &amp; Your First Python Program</h2>
<p>Python is a language that reads almost like English. Before we write any code, let's get your environment ready. You have two good options: <strong>VS Code</strong> (recommended for this course — lightweight and powerful) or <strong>Jupyter Notebook</strong> (great for experimenting interactively).</p>
<p>Download Python from <em>python.org</em> and choose the latest 3.x release. During installation on Windows, tick <strong>"Add Python to PATH"</strong> — this one checkbox saves you a lot of frustration later. Once installed, open a terminal and run:</p>
`},
    { type:'code', lang:'bash', src:`python --version
# Expected: Python 3.12.x  (any 3.10+ is fine)` },
    { type:'text', body:`
<h3>The two ways to run Python</h3>
<p><strong>Interactive shell (REPL):</strong> Type <code>python</code> in your terminal. You get a <code>>>></code> prompt where Python evaluates one expression at a time — perfect for quick experiments.</p>
<p><strong>Script file:</strong> Write your code in a <code>.py</code> file and run it with <code>python filename.py</code>. This is how all real programs are written.</p>
<p>For this course, keep a script file open in VS Code and use the built-in terminal to run it. You'll build intuition much faster writing real files than typing in a shell.</p>
<h3>Your first program</h3>
<p>Every programmer starts here. The tradition goes back to 1978 and a book called <em>The C Programming Language</em>. Let's honour it:</p>
`},
    { type:'code', src:`print("Hello, World!")`, out:`Hello, World!` },
    { type:'text', body:`<p><code>print()</code> is a <em>function</em> — a named action Python knows how to perform. You pass it a piece of text (called a <strong>string</strong>, always wrapped in quotes) and it displays that text. That's it. One line. One result.</p>
<p>Let's make it slightly more interesting:</p>`},
    { type:'code', src:`print("Hello, World!")
print("My name is Arjun.")
print("I am learning Python at Data Science Academia.")
print("Let's build something amazing.")`,
      out:`Hello, World!
My name is Arjun.
I am learning Python at Data Science Academia.
Let's build something amazing.` },
    { type:'tip', body:`Every <code>print()</code> call outputs one line. Python runs your file top to bottom, one statement at a time.` },
    { type:'text', body:`<h3>Comments — notes for humans, ignored by Python</h3>
<p>Anything after a <code>#</code> on a line is a <strong>comment</strong>. Python skips it entirely. Use comments to explain <em>why</em> your code does something, not what it does.</p>`},
    { type:'code', src:`# This program greets the user
print("Hello, World!")   # this is an inline comment

# Python ignores these lines completely
# They are purely for humans reading the code` },
    { type:'text', body:`
<h3>Virtual environments — always use one</h3>
<p>A <strong>virtual environment</strong> is an isolated Python installation for your project. Without it, all your projects share the same packages — and version conflicts are inevitable. With it, each project has its own sandbox.</p>
<p>Create and activate one before starting any project:</p>
`},
    { type:'code', lang:'bash', src:`# Create a virtual environment (do this once per project)
python -m venv venv

# Activate it — Windows
venv\\Scripts\\activate

# Activate it — Mac / Linux
source venv/bin/activate

# Your prompt changes: (venv) C:\\Projects\\my-project>
# Now install packages — they stay inside this folder
pip install pandas numpy matplotlib scikit-learn

# Save your project's dependencies to a file
pip freeze > requirements.txt

# Anyone can recreate your environment later with:
pip install -r requirements.txt` },
    { type:'tip', body:`Add <code>venv/</code> to your <code>.gitignore</code> file — never commit the virtual environment folder to git. Commit <code>requirements.txt</code> instead. This is how every professional Python project is managed.` },
    { type:'text', body:`
<h3>The data science toolkit</h3>
<p>Python alone is just a general-purpose language. What makes it the #1 language for data science is its ecosystem. These five libraries are your core toolkit — you'll use them in every project:</p>
<table style="width:100%;border-collapse:collapse;margin:1rem 0">
<tr style="background:var(--fog2)"><th style="padding:.5rem .8rem;text-align:left">Library</th><th style="padding:.5rem .8rem;text-align:left">What it does</th><th style="padding:.5rem .8rem;text-align:left">When you use it</th></tr>
<tr><td style="padding:.4rem .8rem"><code>numpy</code></td><td style="padding:.4rem .8rem">Fast numerical arrays</td><td style="padding:.4rem .8rem">Any math on numbers / matrices</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><code>pandas</code></td><td style="padding:.4rem .8rem">DataFrames (tables)</td><td style="padding:.4rem .8rem">Loading, cleaning, analysing data</td></tr>
<tr><td style="padding:.4rem .8rem"><code>matplotlib</code></td><td style="padding:.4rem .8rem">Charts and plots</td><td style="padding:.4rem .8rem">Visualising data and results</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><code>scikit-learn</code></td><td style="padding:.4rem .8rem">Machine learning algorithms</td><td style="padding:.4rem .8rem">Building ML models</td></tr>
<tr><td style="padding:.4rem .8rem"><code>seaborn</code></td><td style="padding:.4rem .8rem">Statistical visualisation</td><td style="padding:.4rem .8rem">Beautiful, publication-ready charts</td></tr>
</table>
<p>Install all five with one command: <code>pip install numpy pandas matplotlib scikit-learn seaborn</code>. Then verify:</p>
`},
    { type:'code', src:`import numpy as np
import pandas as pd
import matplotlib
import sklearn
import seaborn

print(f"NumPy:       {np.__version__}")
print(f"Pandas:      {pd.__version__}")
print(f"Matplotlib:  {matplotlib.__version__}")
print(f"Scikit-learn:{sklearn.__version__}")
print(f"Seaborn:     {seaborn.__version__}")
print("\\nAll libraries loaded successfully! You are ready.")`,
      out:`NumPy:       1.26.4
Pandas:      2.2.1
Matplotlib:  3.8.3
Scikit-learn:1.4.1.post1
Seaborn:     0.13.2

All libraries loaded successfully! You are ready.` },
    { type:'exercise', title:'Environment Setup & Version Check',
      body:`<p>Create a new folder called <code>dsa-python</code>, set up a virtual environment inside it, and install the data science stack. Then write a script called <code>check_env.py</code> that:</p>
<ol>
<li>Imports numpy, pandas, matplotlib, and scikit-learn</li>
<li>Prints each library's version using <code>.__version__</code></li>
<li>Prints your Python version using the <code>sys</code> module</li>
<li>Prints a greeting: <code>Ready to do data science in Python X.X!</code></li>
</ol>`,
      hint:`<code>import sys</code> then <code>sys.version</code> gives the full version string. Use <code>sys.version_info.major</code> and <code>sys.version_info.minor</code> for just the numbers.`,
      solution:`import sys
import numpy as np
import pandas as pd
import matplotlib
import sklearn

print(f"Python:      {sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}")
print(f"NumPy:       {np.__version__}")
print(f"Pandas:      {pd.__version__}")
print(f"Matplotlib:  {matplotlib.__version__}")
print(f"Scikit-learn:{sklearn.__version__}")
print(f"\\nReady to do data science in Python {sys.version_info.major}.{sys.version_info.minor}!")`}
  ]
};

L['python-w1-l2'] = {
  duration_mins: 25,
  sections: [
    { type:'text', body:`
<h2>Variables &amp; Data Types</h2>
<p>A <strong>variable</strong> is a named container that holds a value. Think of it as a labelled box — you put something in the box, give the box a name, and later you can open the box by using that name.</p>
<p>In Python, you create a variable simply by writing its name, an equals sign, and the value. No <code>var</code>, no <code>let</code>, no type declaration needed:</p>
`},
    { type:'code', src:`# Storing a student's information
name = "Kavya"
age = 22
cgpa = 8.75
is_enrolled = True

print(name)
print(age)
print(cgpa)
print(is_enrolled)`,
      out:`Kavya
22
8.75
True` },
    { type:'text', body:`<h3>The four fundamental data types</h3>
<p>Python has four types you'll use constantly:</p>
<ul>
<li><strong>int</strong> — whole numbers: <code>22</code>, <code>-5</code>, <code>1000000</code></li>
<li><strong>float</strong> — decimal numbers: <code>8.75</code>, <code>3.14</code>, <code>-0.001</code></li>
<li><strong>str</strong> — text (string): <code>"Kavya"</code>, <code>'Chennai'</code>, <code>"123"</code></li>
<li><strong>bool</strong> — truth values: <code>True</code> or <code>False</code> (capital T and F always)</li>
</ul>
<p>Use the built-in <code>type()</code> function to inspect what type any value is:</p>`},
    { type:'code', src:`name = "Kavya"
age = 22
cgpa = 8.75
is_enrolled = True

print(type(name))       # which box type?
print(type(age))
print(type(cgpa))
print(type(is_enrolled))`,
      out:`<class 'str'>
<class 'int'>
<class 'float'>
<class 'bool'>` },
    { type:'tip', body:`Python is <strong>dynamically typed</strong> — you never declare what type a variable is. Python figures it out from the value you assign. You can also reassign a variable to a completely different type, though doing so is usually a bad idea for clarity.` },
    { type:'text', body:`<h3>Variable naming rules</h3>
<p>Names must start with a letter or underscore. They can contain letters, digits, and underscores. They are <strong>case-sensitive</strong>: <code>Score</code> and <code>score</code> are two different variables.</p>
<p>The Python community uses <em>snake_case</em> — all lowercase with underscores between words. This is convention, not a rule, but follow it so your code looks professional:</p>`},
    { type:'code', src:`# Good names — descriptive, snake_case
student_name = "Rohan"
exam_score = 91
is_passing = True

# Bad names — hard to read or understand
x = "Rohan"         # too vague
ExamScore = 91      # not snake_case
iP = True           # impossible to decode

# This causes an error — starts with a digit
# 1st_name = "Rohan"  # SyntaxError!` },
    { type:'text', body:`<h3>Multiple assignment tricks</h3>
<p>Python lets you assign multiple variables on one line — useful when values are related:</p>`},
    { type:'code', src:`# Assign the same value to multiple variables
x = y = z = 0
print(x, y, z)

# Assign different values in one line (tuple unpacking)
lat, lon = 13.0827, 80.2707    # Chennai coordinates
print(lat, lon)

# Swap two variables — no temp variable needed in Python!
a = 10
b = 25
a, b = b, a
print(a, b)   # a is now 25, b is now 10`,
      out:`0 0 0
13.0827 80.2707
25 10` },
    { type:'text', body:`
<h3>The fifth type: None</h3>
<p><code>None</code> is Python's way of saying "no value" or "empty". It's not zero, not an empty string, not False — it is its own type (<code>NoneType</code>). You'll encounter it constantly in data science: missing values before they're set, functions that have no explicit return, and database nulls often become <code>None</code> in Python.</p>
`},
    { type:'code', src:`result = None
print(result)           # None
print(type(result))     # <class 'NoneType'>

# Check for None with 'is', not '=='
if result is None:
    print("No value assigned yet.")

# A function with no return statement returns None
def process():
    x = 2 + 2    # does something but returns nothing

output = process()
print(output)           # None
print(output is None)   # True` },
    { type:'text', body:`
<h3>isinstance() — safer type checking</h3>
<p>While <code>type(x) == int</code> checks the exact type, <code>isinstance(x, int)</code> checks the type AND its subclasses — which is almost always what you want. More importantly, you can check multiple types at once:</p>
`},
    { type:'code', src:`score = 88
name  = "Priya"
value = None

# Check if a value is a number (int or float)
print(isinstance(score, (int, float)))   # True
print(isinstance(score, str))            # False
print(isinstance(name, str))             # True
print(isinstance(value, type(None)))     # True

# Practical: validate input before processing
def compute_grade(score):
    if not isinstance(score, (int, float)):
        raise TypeError(f"Expected a number, got {type(score).__name__}")
    if score >= 90: return "A"
    if score >= 75: return "B"
    if score >= 50: return "C"
    return "F"

print(compute_grade(88))        # B
print(compute_grade(92.5))      # A
# compute_grade("88")  → TypeError: Expected a number, got str`,
      out:`True
False
True
True
B
A` },
    { type:'warn', body:`<strong>int("88")</strong> works — but <strong>int("88.5")</strong> raises <code>ValueError</code>. This is the #1 beginner bug when reading CSV data. Use <code>float("88.5")</code> then cast to int if needed: <code>int(float("88.5"))</code>.` },
    { type:'exercise', title:'Student Profile with Validation',
      body:`<p>Create a function <code>build_profile(name, age, score)</code> that:</p>
<ol>
<li>Validates that <code>name</code> is a non-empty string (raise <code>ValueError</code> if not)</li>
<li>Validates that <code>age</code> is an integer between 15 and 60</li>
<li>Validates that <code>score</code> is a number between 0 and 100</li>
<li>Returns a dictionary with keys: <code>name</code>, <code>age</code>, <code>score</code>, <code>grade</code> (A/B/C/F), and <code>has_distinction</code> (bool, True if score ≥ 75)</li>
</ol>
<p>Test it with valid data and then with <code>age="twenty"</code> to see the error.</p>`,
      hint:`Use <code>isinstance()</code> for type checks. Build the return dict using grade logic from an <code>if/elif</code> chain.`,
      solution:`def build_profile(name, age, score):
    if not isinstance(name, str) or not name.strip():
        raise ValueError("name must be a non-empty string")
    if not isinstance(age, int) or not (15 <= age <= 60):
        raise ValueError(f"age must be an integer between 15 and 60, got {age!r}")
    if not isinstance(score, (int, float)) or not (0 <= score <= 100):
        raise ValueError(f"score must be a number 0–100, got {score!r}")

    if score >= 90:   grade = "A"
    elif score >= 75: grade = "B"
    elif score >= 50: grade = "C"
    else:             grade = "F"

    return {
        "name": name.strip(),
        "age": age,
        "score": float(score),
        "grade": grade,
        "has_distinction": score >= 75,
    }

print(build_profile("Ananya Krishnan", 20, 87.4))
# Test error case:
try:
    build_profile("Ravi", "twenty", 85)
except ValueError as e:
    print(f"Error: {e}")`}
  ]
};

L['python-w1-l3'] = {
  duration_mins: 15,
  sections: [
    { type:'text', body:`
<h2>Operators &amp; Expressions</h2>
<p>An <strong>expression</strong> is any combination of values, variables, and operators that Python can evaluate to produce a result. Operators are the symbols that tell Python what calculation to perform.</p>
<h3>Arithmetic operators</h3>
<p>Python supports all standard math operations, plus two you might not know:</p>
`},
    { type:'code', src:`a = 17
b = 5

print(a + b)    # Addition         → 22
print(a - b)    # Subtraction      → 12
print(a * b)    # Multiplication   → 85
print(a / b)    # Division         → 3.4  (always float)
print(a // b)   # Floor division   → 3    (truncates decimal)
print(a % b)    # Modulo (remainder) → 2
print(a ** b)   # Exponentiation   → 1419857 (17 to the power 5)`,
      out:`22
12
85
3.4
3
2
1419857` },
    { type:'tip', body:`<code>//</code> (floor division) and <code>%</code> (modulo) are extremely useful. <code>n % 2 == 0</code> tells you if <code>n</code> is even. <code>n // 10</code> strips the last digit. You'll use these constantly.` },
    { type:'text', body:`<h3>Operator precedence — Python follows BODMAS/PEMDAS</h3>
<p>Python evaluates expressions in this order: parentheses first, then exponentiation, then multiplication/division/floor-division/modulo, then addition/subtraction. Use parentheses to make your intent explicit:</p>`},
    { type:'code', src:`# Calculating compound interest
principal = 10000
rate = 0.08       # 8% annual
years = 3

# Without parentheses — wrong!
# amount = principal * 1 + rate ** years  # not what we want

# With parentheses — correct
amount = principal * (1 + rate) ** years
print(f"Amount after {years} years: {amount:.2f}")`,
      out:`Amount after 3 years: 12597.12` },
    { type:'text', body:`<h3>Comparison operators — produce True or False</h3>
<p>Comparisons don't compute a number — they answer a yes/no question and return a <strong>bool</strong>:</p>`},
    { type:'code', src:`score = 74

print(score == 74)    # Equal to?         → True
print(score != 75)    # Not equal to?     → True
print(score > 75)     # Greater than?     → False
print(score < 75)     # Less than?        → True
print(score >= 74)    # Greater or equal? → True
print(score <= 60)    # Less or equal?    → False

# Comparisons chain beautifully in Python
print(60 <= score <= 80)   # Is score between 60 and 80? → True`,
      out:`True
True
False
True
True
False
True` },
    { type:'text', body:`<h3>Logical operators — combine conditions</h3>
<p><code>and</code>, <code>or</code>, <code>not</code> — Python uses English words instead of <code>&&</code>, <code>||</code>, <code>!</code>:</p>`},
    { type:'code', src:`age = 20
has_id = True
is_member = False

# and — both must be True
can_enter = age >= 18 and has_id
print(can_enter)          # True

# or — at least one must be True
gets_discount = age < 18 or is_member
print(gets_discount)      # False

# not — flips the boolean
print(not is_member)      # True

# Real-world: grade classification
marks = 82
grade = "Distinction" if marks >= 75 and marks <= 100 else "Pass" if marks >= 50 else "Fail"
print(grade)              # Distinction`,
      out:`True
False
True
Distinction` },
    { type:'text', body:`
<h3>Augmented assignment — the shorthand every data scientist uses</h3>
<p>Instead of writing <code>total = total + value</code>, Python gives you shorthand operators that combine the operation with assignment. These appear constantly in loops and data processing:</p>
`},
    { type:'code', src:`total = 0
count = 0
data  = [45, 82, 67, 91, 58, 74]

for value in data:
    total += value   # same as: total = total + value
    count += 1

average = total / count
print(f"Sum: {total}  Count: {count}  Average: {average:.1f}")

# All augmented operators:
x = 100
x -= 10    # x = 90    (subtract)
x *= 2     # x = 180   (multiply)
x //= 7    # x = 25    (floor divide)
x **= 2    # x = 625   (power)
x %= 100   # x = 25    (modulo)
print(f"Final x: {x}")`,
      out:`Sum: 417  Count: 6  Average: 69.5
Final x: 25` },
    { type:'text', body:`
<h3>Operator precedence — know the order, avoid the bugs</h3>
<p>Python evaluates operators in a fixed order. The full hierarchy (highest precedence first):</p>
<table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:.9rem">
<tr style="background:var(--fog2)"><th style="padding:.4rem .8rem;text-align:left">Precedence</th><th style="padding:.4rem .8rem;text-align:left">Operator(s)</th><th style="padding:.4rem .8rem;text-align:left">Example</th></tr>
<tr><td style="padding:.4rem .8rem">1 (highest)</td><td style="padding:.4rem .8rem"><code>()</code></td><td style="padding:.4rem .8rem">Parentheses first</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem">2</td><td style="padding:.4rem .8rem"><code>**</code></td><td style="padding:.4rem .8rem"><code>2**3 = 8</code></td></tr>
<tr><td style="padding:.4rem .8rem">3</td><td style="padding:.4rem .8rem"><code>+x  -x  ~x</code></td><td style="padding:.4rem .8rem">Unary operators</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem">4</td><td style="padding:.4rem .8rem"><code>*  /  //  %</code></td><td style="padding:.4rem .8rem">Multiply, divide</td></tr>
<tr><td style="padding:.4rem .8rem">5</td><td style="padding:.4rem .8rem"><code>+  -</code></td><td style="padding:.4rem .8rem">Add, subtract</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem">6</td><td style="padding:.4rem .8rem"><code>==  !=  >  <  >=  <=</code></td><td style="padding:.4rem .8rem">Comparisons</td></tr>
<tr><td style="padding:.4rem .8rem">7</td><td style="padding:.4rem .8rem"><code>not</code></td><td style="padding:.4rem .8rem">Boolean NOT</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem">8</td><td style="padding:.4rem .8rem"><code>and</code></td><td style="padding:.4rem .8rem">Boolean AND</td></tr>
<tr><td style="padding:.4rem .8rem">9 (lowest)</td><td style="padding:.4rem .8rem"><code>or</code></td><td style="padding:.4rem .8rem">Boolean OR</td></tr>
</table>
<p>When in doubt, use parentheses. Code with explicit parentheses is always clearer than code that relies on precedence knowledge.</p>
`},
    { type:'exercise', title:'Student Score Analyser',
      body:`<p>Given a list of exam scores <code>[82, 45, 91, 67, 73, 55, 88, 38, 95, 61]</code>, write a program that uses operators and expressions (no loops yet — just Python's built-in <code>max()</code>, <code>min()</code>, <code>sum()</code>, and <code>len()</code>) to:</p>
<ol>
<li>Calculate the total, average, highest, and lowest score</li>
<li>Calculate the <strong>pass rate</strong> — percentage of scores ≥ 50 (use a generator expression: <code>sum(1 for s in scores if s >= 50)</code>)</li>
<li>Determine if the class average qualifies for a distinction (≥ 75) using a boolean expression</li>
<li>Print a formatted report with all values, aligned to 2 decimal places</li>
</ol>`,
      hint:`<code>sum(1 for s in scores if s >= 50) / len(scores) * 100</code> gives the pass rate percentage. Use f-string <code>:.2f</code> for formatting.`,
      solution:`scores = [82, 45, 91, 67, 73, 55, 88, 38, 95, 61]

total     = sum(scores)
average   = total / len(scores)
highest   = max(scores)
lowest    = min(scores)
pass_rate = sum(1 for s in scores if s >= 50) / len(scores) * 100
has_dist  = average >= 75

print("=" * 35)
print("  Class Performance Report")
print("=" * 35)
print(f"  Total score   : {total}")
print(f"  Average       : {average:.2f}")
print(f"  Highest       : {highest}")
print(f"  Lowest        : {lowest}")
print(f"  Pass rate     : {pass_rate:.2f}%")
print(f"  Distinction   : {'Yes' if has_dist else 'No'}")`}
  ]
};

L['python-w1-l4'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>Strings &amp; String Methods</h2>
<p>Strings are the most versatile data type in Python. Any text — names, sentences, file paths, JSON responses from an API — is a string. Understanding strings deeply will serve you in every area of data science.</p>
<h3>Creating strings</h3>
<p>Use single quotes, double quotes, or triple quotes. They're all equivalent; choose based on what's inside the string:</p>
`},
    { type:'code', src:`# Single and double quotes are interchangeable
city = 'Chennai'
greeting = "Vanakkam!"

# Use the other quote type inside a string — no escaping needed
message = "It's a beautiful day in Chennai."
code_note = 'She said "Hello" to everyone.'

# Triple quotes — for multi-line strings
bio = """My name is Vikram.
I am a data scientist.
I love Python."""
print(bio)`,
      out:`My name is Vikram.
I am a data scientist.
I love Python.` },
    { type:'text', body:`<h3>String operations</h3>
<p>Strings support <code>+</code> (concatenation) and <code>*</code> (repetition). You can also get the length with <code>len()</code> and access individual characters with indexing:</p>`},
    { type:'code', src:`first = "Data"
last  = "Science"

# Concatenation
full = first + " " + last
print(full)                # Data Science

# Repetition
print("-" * 30)            # 30 dashes

# Length
print(len(full))           # 12

# Indexing — positions start at 0
print(full[0])             # D
print(full[-1])            # e  (last character)

# Slicing — [start : stop : step]
print(full[0:4])           # Data
print(full[5:])            # Science
print(full[::-1])          # ecneicS ataD  (reversed!)`,
      out:`Data Science
------------------------------
12
D
e
Data
Science
ecneicS ataD` },
    { type:'text', body:`<h3>Essential string methods</h3>
<p>String methods don't modify the original string — they return a <em>new</em> string with the transformation applied. Strings in Python are <strong>immutable</strong>:</p>`},
    { type:'code', src:`name = "  kavya KRISHNAN  "

# Cleaning
print(name.strip())          # "kavya KRISHNAN"   — remove whitespace
print(name.strip().lower())  # "kavya krishnan"
print(name.strip().upper())  # "KAVYA KRISHNAN"
print(name.strip().title())  # "Kavya Krishnan"   — capitalise each word

sentence = "Python is powerful, Python is popular"
print(sentence.replace("Python", "DSA Python"))
print(sentence.count("Python"))    # 2
print(sentence.find("powerful"))   # 10  (index where it starts, -1 if not found)
print(sentence.startswith("Python"))   # True
print(sentence.endswith("popular"))    # True

# Splitting and joining
csv_line = "Arjun,22,Chennai,Data Science"
parts = csv_line.split(",")
print(parts)                 # ['Arjun', '22', 'Chennai', 'Data Science']
print(" | ".join(parts))     # Arjun | 22 | Chennai | Data Science`,
      out:`kavya KRISHNAN
kavya krishnan
KAVYA KRISHNAN
Kavya Krishnan
DSA Python is powerful, DSA Python is popular
2
10
True
True
['Arjun', '22', 'Chennai', 'Data Science']
Arjun | 22 | Chennai | Data Science` },
    { type:'text', body:`<h3>f-strings — the modern way to embed values in text</h3>
<p>Put an <code>f</code> before the opening quote. Then wrap any variable or expression in <code>{}</code> and Python will substitute its value. f-strings are faster, more readable, and more powerful than the old <code>%</code> or <code>.format()</code> approaches:</p>`},
    { type:'code', src:`name   = "Meera"
score  = 91.666
rank   = 3
city   = "Madurai"

# Basic substitution
print(f"Hello, {name}! You scored {score} and ranked #{rank}.")

# Format specifiers inside {}
print(f"Score: {score:.1f}%")          # 1 decimal place → 91.7
print(f"Score: {score:.0f}%")          # 0 decimals → 92
print(f"Rank: {rank:03d}")             # zero-padded 3 digits → 003

# Expressions inside {} — Python evaluates them
print(f"Next rank: {rank - 1}")
print(f"Name length: {len(name)} characters")
print(f"Uppercase: {name.upper()}")

# Multiline f-string report
report = f"""
=== Student Report ===
Name  : {name}
City  : {city}
Score : {score:.2f}%
Rank  : #{rank}
======================"""
print(report)`,
      out:`Hello, Meera! You scored 91.666 and ranked #3.
Score: 91.7%
Score: 92%
Rank: 003
Next rank: 2
Name length: 5 characters
Uppercase: MEERA

=== Student Report ===
Name  : Meera
City  : Madurai
Score : 91.67%
Rank  : #3
======================` },
    { type:'text', body:`
<h3>String methods for data cleaning — critical for data science</h3>
<p>In real datasets, text data is almost always messy: extra spaces, inconsistent casing, mixed delimiters, unwanted characters. These string methods are your cleaning toolkit:</p>
`},
    { type:'code', src:`# Simulated messy data from a CSV upload
raw_records = [
    "  PRIYA SHARMA  ,  priya.s@gmail.com  ,  mumbai  ",
    "Rajan Kumar, RAJAN@HOTMAIL.COM ,Delhi ",
    "  ananya reddy,ananya_r@yahoo.co.in,BENGALURU",
]

cleaned = []
for record in raw_records:
    parts = record.split(",")
    name  = parts[0].strip().title()          # strip whitespace, Title Case
    email = parts[1].strip().lower()          # strip, lowercase
    city  = parts[2].strip().capitalize()     # strip, Capitalize

    # Validate email has @ and at least one dot after @
    domain = email.split("@")[-1] if "@" in email else ""
    valid_email = "@" in email and "." in domain

    cleaned.append({
        "name":  name,
        "email": email,
        "city":  city,
        "valid_email": valid_email
    })

for r in cleaned:
    print(f"{r['name']:<20} | {r['email']:<30} | {r['city']:<12} | valid={r['valid_email']}")`,
      out:`Priya Sharma         | priya.s@gmail.com              | Mumbai       | valid=True
Rajan Kumar          | rajan@hotmail.com              | Delhi        | valid=True
Ananya Reddy         | ananya_r@yahoo.co.in           | Bengaluru    | valid=True` },
    { type:'tip', body:`<code>str.strip()</code> removes whitespace from BOTH ends. <code>lstrip()</code> removes from the left only, <code>rstrip()</code> from the right. In data pipelines, always strip before splitting — whitespace around delimiters is the #1 source of empty-string bugs.` },
    { type:'exercise', title:'CSV Record Cleaner',
      body:`<p>You receive this messy student data (one string per student, pipe-separated):</p>
<pre style="background:rgba(255,255,255,.04);padding:.75rem;border-radius:6px;font-size:.82rem;font-family:var(--fm)">records = [
    "  DSA001 | PRIYA SHARMA | priya.s@dsa.in | PYTHON | 88  ",
    "DSA002|Rajan Kumar |RAJAN@DSA.IN| sql |76",
    "  DSA003 | ananya REDDY|ananya@dsa.in|Machine Learning| 91 ",
]</pre>
<p>Write a function <code>clean_record(raw)</code> that parses each string and returns a dict with: <code>id</code> (stripped), <code>name</code> (Title Case), <code>email</code> (lowercase), <code>course</code> (Title Case), <code>score</code> (integer), <code>grade</code> (A/B/C/F based on score). Print each cleaned record as a formatted line.</p>`,
      hint:`Split on <code>"|"</code>. Each field needs <code>.strip()</code>. Convert score with <code>int(parts[4].strip())</code>. Grade logic: A≥90, B≥75, C≥50, else F.`,
      solution:`records = [
    "  DSA001 | PRIYA SHARMA | priya.s@dsa.in | PYTHON | 88  ",
    "DSA002|Rajan Kumar |RAJAN@DSA.IN| sql |76",
    "  DSA003 | ananya REDDY|ananya@dsa.in|Machine Learning| 91 ",
]

def clean_record(raw):
    parts = raw.split("|")
    sid    = parts[0].strip()
    name   = parts[1].strip().title()
    email  = parts[2].strip().lower()
    course = parts[3].strip().title()
    score  = int(parts[4].strip())
    grade  = "A" if score >= 90 else "B" if score >= 75 else "C" if score >= 50 else "F"
    return {"id": sid, "name": name, "email": email,
            "course": course, "score": score, "grade": grade}

for raw in records:
    r = clean_record(raw)
    print(f"{r['id']} | {r['name']:<20} | {r['email']:<25} | {r['course']:<18} | {r['score']:>3} ({r['grade']})")`}
  ]
};

L['python-w1-l5'] = {
  duration_mins: 12,
  sections: [
    { type:'text', body:`
<h2>User Input &amp; Type Casting</h2>
<p>Every useful program interacts with the world — it takes input and produces output. In Python, the <code>input()</code> function pauses execution, displays a prompt, and waits for the user to type something and press Enter.</p>
`},
    { type:'code', src:`name = input("What is your name? ")
print(f"Hello, {name}! Welcome to DSA.")` },
    { type:'warn', body:`<code>input()</code> <strong>always returns a string</strong>, no matter what the user types. If they type <code>25</code>, Python gives you the string <code>"25"</code>, not the integer <code>25</code>. This is the most common source of beginner bugs.` },
    { type:'code', src:`# Wrong — trying to do arithmetic on a string
age = input("Enter your age: ")
# print(age + 10)   # TypeError: can only concatenate str to str

# Correct — convert first
age = int(input("Enter your age: "))
print(f"In 10 years you'll be {age + 10}.")` },
    { type:'text', body:`<h3>Type conversion functions</h3>
<p>Python provides built-in functions to convert between types:</p>`},
    { type:'code', src:`# int() — converts to integer (truncates floats, parses digit strings)
print(int("42"))          # 42
print(int(3.99))          # 3   (not rounded — truncated!)
print(int(True))          # 1
print(int(False))         # 0

# float() — converts to decimal number
print(float("3.14"))      # 3.14
print(float("7"))         # 7.0
print(float(True))        # 1.0

# str() — converts anything to string
print(str(100))           # '100'
print(str(3.14))          # '3.14'
print(str(True))          # 'True'

# bool() — converts to True/False
# Falsy: 0, 0.0, "", None, [], {}, ()
# Everything else is Truthy
print(bool(0))            # False
print(bool(""))           # False
print(bool("hello"))      # True
print(bool(42))           # True`,
      out:`42
3
1
0
3.14
7.0
1.0
100
3.14
True
False
False
True
True` },
    { type:'text', body:`<h3>A complete interactive program</h3>
<p>Let's put it all together. Notice how we convert types immediately after <code>input()</code> so the rest of the code can work with proper numbers:</p>`},
    { type:'code', src:`# Simple EMI calculator
principal = float(input("Loan amount (₹): "))
annual_rate = float(input("Annual interest rate (%): "))
months = int(input("Loan duration (months): "))

# Convert annual rate to monthly decimal
monthly_rate = annual_rate / (12 * 100)

# EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
emi = principal * monthly_rate * (1 + monthly_rate) ** months / ((1 + monthly_rate) ** months - 1)

total_payment = emi * months
total_interest = total_payment - principal

print(f"""
=== EMI Breakdown ===
Principal   : ₹{principal:,.0f}
Monthly EMI : ₹{emi:,.2f}
Total paid  : ₹{total_payment:,.2f}
Interest    : ₹{total_interest:,.2f}""")` },
    { type:'text', body:`
<h3>Safe type conversion — handling bad input like a professional</h3>
<p>In production code and data pipelines, input is often messy. A robust program doesn't crash on bad input — it handles it gracefully:</p>
`},
    { type:'code', src:`def safe_to_float(value, default=None):
    """Convert a value to float, returning default if conversion fails."""
    try:
        return float(value)
    except (ValueError, TypeError):
        return default

def safe_to_int(value, default=None):
    try:
        return int(float(value))   # handles "88.5" → 88
    except (ValueError, TypeError):
        return default

# Simulating CSV row values (all strings from file read)
raw_data = [
    ("Priya",  "88",    "92.5", "True"),
    ("Rajan",  "N/A",   "78",   "False"),
    ("Ananya", "91",    "",     "True"),
    ("Dev",    "67abc", "85",   "0"),
]

print(f"{'Name':<10} {'Python':>8} {'SQL':>8} {'Employed':>10}")
print("-" * 40)
for name, python_str, sql_str, emp_str in raw_data:
    python_score = safe_to_int(python_str)
    sql_score    = safe_to_float(sql_str)
    employed     = emp_str.strip().lower() in ("true", "1", "yes")

    py_display  = f"{python_score:>8}" if python_score is not None else "     N/A"
    sql_display = f"{sql_score:>8.1f}" if sql_score   is not None else "     N/A"
    print(f"{name:<10} {py_display} {sql_display} {str(employed):>10}")`,
      out:`Name       Python      SQL   Employed
----------------------------------------
Priya          88     92.5       True
Rajan         N/A     78.0      False
Ananya         91      N/A       True
Dev           N/A     85.0      False` },
    { type:'exercise', title:'CSV Row Parser',
      body:`<p>You receive student data as raw strings (from a file read). Each string is a comma-separated row: <code>id, name, age, score, passed</code>. Some fields may be missing or malformed.</p>
<pre style="background:rgba(255,255,255,.04);padding:.75rem;border-radius:6px;font-size:.82rem;font-family:var(--fm)">rows = [
    "S001, Priya Sharma, 22, 88.5, True",
    "S002, Rajan Kumar, N/A, 76, False",
    "S003, Ananya Reddy, 24, , True",
    "S004, Dev Bhatia, 21, 95, 1",
]</pre>
<p>Write a parser that converts each row into a dict with properly typed values. Use <code>None</code> for unparseable numbers. Print a summary showing: total students, number with valid scores, and average score (ignoring None values).</p>`,
      hint:`Split on <code>","</code>, strip each part. For passed: check if the stripped value is in <code>("true","1","yes")</code>. Calculate average by filtering out <code>None</code> scores.`,
      solution:`rows = [
    "S001, Priya Sharma, 22, 88.5, True",
    "S002, Rajan Kumar, N/A, 76, False",
    "S003, Ananya Reddy, 24, , True",
    "S004, Dev Bhatia, 21, 95, 1",
]

def safe_float(s, default=None):
    try: return float(s)
    except: return default

def parse_row(raw):
    parts = [p.strip() for p in raw.split(",")]
    sid, name, age_s, score_s, passed_s = parts
    return {
        "id":     sid,
        "name":   name.title(),
        "age":    safe_float(age_s),
        "score":  safe_float(score_s),
        "passed": passed_s.lower() in ("true", "1", "yes"),
    }

students = [parse_row(r) for r in rows]
valid_scores = [s["score"] for s in students if s["score"] is not None]

print(f"Total students  : {len(students)}")
print(f"With valid score: {len(valid_scores)}")
print(f"Average score   : {sum(valid_scores)/len(valid_scores):.2f}")
print()
for s in students:
    sc = f"{s['score']:.1f}" if s['score'] is not None else "N/A"
    print(f"  {s['id']} | {s['name']:<15} | Age:{s['age'] or 'N/A'!s} | Score:{sc:>5} | Passed:{s['passed']}")`}
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 2 — CONTROL FLOW
══════════════════════════════════════════════════════════════════════════ */

L['python-w2-l1'] = {
  duration_mins: 15,
  sections: [
    { type:'text', body:`
<h2>if, elif, and else</h2>
<p>Programs are not always a straight line from top to bottom. <strong>Conditional statements</strong> let your program make decisions — run one block of code when something is true, and a different block when it's false.</p>
<p>The anatomy of an <code>if</code> statement: the keyword <code>if</code>, a condition that evaluates to <code>True</code> or <code>False</code>, a colon, and then an <strong>indented block</strong> of code. Indentation (4 spaces or 1 tab) is how Python knows what belongs inside the <code>if</code>:</p>
`},
    { type:'code', src:`temperature = 38.5   # body temperature in °C

if temperature > 37.5:
    print("Fever detected.")
    print("Please consult a doctor.")

print("Check complete.")   # this always runs — not indented`,
      out:`Fever detected.
Please consult a doctor.
Check complete.` },
    { type:'text', body:`<h3>else — the fallback path</h3>
<p>Use <code>else</code> to define what happens when the <code>if</code> condition is <code>False</code>:</p>`},
    { type:'code', src:`balance = 1200
withdrawal = 2000

if withdrawal <= balance:
    balance -= withdrawal
    print(f"Withdrawal successful. New balance: ₹{balance}")
else:
    print(f"Insufficient funds. Your balance is ₹{balance}.")`,
      out:`Insufficient funds. Your balance is ₹1200.` },
    { type:'text', body:`<h3>elif — multiple conditions</h3>
<p>When you have more than two possible paths, chain conditions with <code>elif</code> (short for "else if"). Python evaluates them in order and stops at the first <code>True</code> condition:</p>`},
    { type:'code', src:`marks = 73

if marks >= 90:
    grade = "O"
    label = "Outstanding"
elif marks >= 75:
    grade = "A+"
    label = "Excellent"
elif marks >= 60:
    grade = "A"
    label = "Very Good"
elif marks >= 50:
    grade = "B"
    label = "Good"
elif marks >= 35:
    grade = "C"
    label = "Pass"
else:
    grade = "F"
    label = "Fail"

print(f"Marks: {marks} → Grade {grade} ({label})")`,
      out:`Marks: 73 → Grade A (Very Good)` },
    { type:'text', body:`<h3>Nested if statements</h3>
<p>You can put an <code>if</code> inside another <code>if</code>. Use this when a decision only makes sense after a prior condition is met:</p>`},
    { type:'code', src:`age = 19
has_voter_id = True
is_in_constituency = True

if age >= 18:
    if has_voter_id:
        if is_in_constituency:
            print("You are eligible to vote.")
        else:
            print("You must vote in your registered constituency.")
    else:
        print("You need a voter ID to vote.")
else:
    print("You must be 18 or older to vote.")`,
      out:`You are eligible to vote.` },
    { type:'tip', body:`Deep nesting (3+ levels) is a code smell. If you find yourself writing <code>if</code> inside <code>if</code> inside <code>if</code>, look for ways to combine conditions with <code>and</code>/<code>or</code>.` },
    { type:'exercise', title:'Traffic Light Logic',
      body:`<p>Write a program that takes a traffic signal colour as input (<code>input()</code>) and prints the appropriate driving instruction:</p>
<ul>
<li><code>red</code> → "Stop the vehicle."</li>
<li><code>yellow</code> → "Slow down and prepare to stop."</li>
<li><code>green</code> → "Proceed safely."</li>
<li>Anything else → "Unknown signal — stop to be safe."</li>
</ul>
<p>Make it case-insensitive (so "RED" and "Red" also work).</p>`,
      hint:`Convert the input to lowercase with <code>.lower()</code> before the <code>if</code> chain.`,
      solution:`signal = input("Enter signal colour: ").lower().strip()

if signal == "red":
    print("Stop the vehicle.")
elif signal == "yellow":
    print("Slow down and prepare to stop.")
elif signal == "green":
    print("Proceed safely.")
else:
    print("Unknown signal — stop to be safe.")`}
  ]
};

L['python-w2-l2'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>for Loops</h2>
<p>A <code>for</code> loop repeats a block of code for each item in a <em>sequence</em>. The sequence can be a list, a string, a range of numbers — anything iterable. This is the most common loop in Python data science code.</p>
`},
    { type:'code', src:`# Looping over a list
cities = ["Chennai", "Mumbai", "Delhi", "Bengaluru"]

for city in cities:
    print(f"Processing city: {city}")

print("Done.")`,
      out:`Processing city: Chennai
Processing city: Mumbai
Processing city: Delhi
Processing city: Bengaluru
Done.` },
    { type:'text', body:`<h3>range() — generating number sequences</h3>
<p><code>range(n)</code> generates numbers from <code>0</code> to <code>n-1</code>. <code>range(start, stop)</code> goes from start to stop-1. <code>range(start, stop, step)</code> lets you control the increment:</p>`},
    { type:'code', src:`# range(stop)
for i in range(5):
    print(i, end=" ")      # end=" " keeps it on one line
print()                    # newline after loop

# range(start, stop)
for i in range(1, 6):
    print(i, end=" ")
print()

# range(start, stop, step)
for i in range(0, 20, 4):
    print(i, end=" ")
print()

# Counting down
for i in range(10, 0, -1):
    print(i, end=" ")
print()
print("Blast off! 🚀")`,
      out:`0 1 2 3 4
1 2 3 4 5
0 4 8 12 16
10 9 8 7 6 5 4 3 2 1
Blast off! 🚀` },
    { type:'text', body:`<h3>Accumulating results inside a loop</h3>
<p>A very common pattern: start with a variable before the loop (accumulator), update it each iteration, and read the final result after the loop:</p>`},
    { type:'code', src:`# Sum and product
numbers = [4, 7, 2, 9, 1, 6]

total = 0
product = 1
maximum = numbers[0]

for n in numbers:
    total += n              # same as: total = total + n
    product *= n
    if n > maximum:
        maximum = n

print(f"Numbers : {numbers}")
print(f"Sum     : {total}")
print(f"Product : {product}")
print(f"Maximum : {maximum}")`,
      out:`Numbers : [4, 7, 2, 9, 1, 6]
Sum     : 29
Product : 3024
Maximum : 9` },
    { type:'text', body:`<h3>enumerate() — loop with index and value</h3>
<p>Need both the position and the value? Don't use a counter variable — use <code>enumerate()</code>:</p>`},
    { type:'code', src:`subjects = ["Maths", "Physics", "Chemistry", "Biology", "English"]
marks    = [88, 76, 91, 83, 95]

print("Subject-wise results:")
for i, subject in enumerate(subjects, start=1):
    print(f"  {i}. {subject:<12} : {marks[i-1]}")

total = sum(marks)
average = total / len(marks)
print(f"\nTotal: {total}  |  Average: {average:.1f}")`,
      out:`Subject-wise results:
  1. Maths        : 88
  2. Physics      : 76
  3. Chemistry    : 91
  4. Biology      : 83
  5. English      : 95

Total: 433  |  Average: 86.6` },
    { type:'text', body:`<h3>Looping over strings and zip()</h3>`},
    { type:'code', src:`# Every string is iterable
vowels = 0
word = "Anthropic"
for char in word:
    if char.lower() in "aeiou":
        vowels += 1
print(f"'{word}' has {vowels} vowels.")

# zip() — pair up two sequences element by element
students = ["Arun", "Bala", "Chitra"]
scores   = [88, 72, 95]
for student, score in zip(students, scores):
    result = "Pass" if score >= 50 else "Fail"
    print(f"{student}: {score} ({result})")`,
      out:`'Anthropic' has 3 vowels.
Arun: 88 (Pass)
Bala: 72 (Pass)
Chitra: 95 (Pass)` },
    { type:'text', body:`
<h3>Looping over real data — the data science pattern</h3>
<p>In data science, you almost never loop over a range of numbers. You loop over <strong>datasets</strong> — lists of records, rows of a CSV, responses from an API. Here's the core pattern with <code>enumerate()</code> and <code>zip()</code>:</p>
`},
    { type:'code', src:`# Real pattern: process student records
students = ["Priya", "Rajan", "Ananya", "Bala", "Chitra"]
scores   = [92, 78, 85, 61, 88]
courses  = ["Python", "SQL", "ML", "Python", "ML"]

print(f"{'#':>3}  {'Name':<10}  {'Course':<8}  {'Score':>5}  {'Grade'}")
print("-" * 44)

for rank, (name, score, course) in enumerate(zip(students, scores, courses), start=1):
    grade = "A" if score >= 90 else "B" if score >= 75 else "C" if score >= 50 else "F"
    flag  = " ★" if score >= 90 else ""
    print(f"{rank:>3}. {name:<10}  {course:<8}  {score:>5}  {grade}{flag}")

print("-" * 44)
passing = sum(1 for s in scores if s >= 50)
print(f"Pass rate: {passing}/{len(scores)} = {passing/len(scores):.0%}")`,
      out:`  #  Name        Course    Score  Grade
--------------------------------------------
  1. Priya       Python      92  A ★
  2. Rajan       SQL         78  B
  3. Ananya      ML          85  B
  4. Bala        Python      61  C
  5. Chitra      ML          88  B
--------------------------------------------
Pass rate: 5/5 = 100%` },
    { type:'exercise', title:'Batch Score Analyser',
      body:`<p>Given a list of 10 students, each with scores for 3 subjects, write a program using <code>for</code> loops, <code>enumerate()</code>, and <code>zip()</code> to:</p>
<ol>
<li>Calculate each student's average score and overall grade (A/B/C/F)</li>
<li>Print a formatted leaderboard sorted by average (highest first) using the built-in <code>sorted()</code></li>
<li>Count how many students are in each grade category</li>
<li>Identify the subject with the highest class average</li>
</ol>`,
      hint:`Store each student as a dict. Use <code>sorted(students, key=lambda s: s['avg'], reverse=True)</code> for the leaderboard. Use a dict to count grade categories.`,
      solution:`students = [
    {"name": "Priya",   "python": 92, "sql": 88, "ml": 79},
    {"name": "Rajan",   "python": 78, "sql": 82, "ml": 71},
    {"name": "Ananya",  "python": 85, "sql": 76, "ml": 91},
    {"name": "Bala",    "python": 61, "sql": 55, "ml": 48},
    {"name": "Chitra",  "python": 88, "sql": 93, "ml": 85},
    {"name": "Dev",     "python": 72, "sql": 68, "ml": 75},
    {"name": "Esha",    "python": 95, "sql": 91, "ml": 88},
    {"name": "Faiz",    "python": 47, "sql": 52, "ml": 60},
    {"name": "Gita",    "python": 83, "sql": 79, "ml": 82},
    {"name": "Hari",    "python": 66, "sql": 71, "ml": 58},
]

for s in students:
    s["avg"] = round((s["python"] + s["sql"] + s["ml"]) / 3, 1)
    if s["avg"] >= 90:   s["grade"] = "A"
    elif s["avg"] >= 75: s["grade"] = "B"
    elif s["avg"] >= 50: s["grade"] = "C"
    else:                s["grade"] = "F"

ranked = sorted(students, key=lambda s: s["avg"], reverse=True)
print(f"{'Rank':<5} {'Name':<10} {'Python':>7} {'SQL':>5} {'ML':>5} {'Avg':>6} {'Grade'}")
print("-" * 50)
for i, s in enumerate(ranked, 1):
    print(f"{i:<5} {s['name']:<10} {s['python']:>7} {s['sql']:>5} {s['ml']:>5} {s['avg']:>6} {s['grade']}")

grade_counts = {}
for s in students:
    grade_counts[s["grade"]] = grade_counts.get(s["grade"], 0) + 1
print(f"\nGrade distribution: {grade_counts}")

for subj in ("python", "sql", "ml"):
    avg = sum(s[subj] for s in students) / len(students)
    print(f"  {subj.upper()} class avg: {avg:.1f}")` }
  ]
};

L['python-w2-l3'] = {
  duration_mins: 15,
  sections: [
    { type:'text', body:`
<h2>while Loops, break &amp; continue</h2>
<p>A <code>while</code> loop keeps running its body as long as its condition is <code>True</code>. Use it when you don't know in advance how many iterations you need — for example, reading user input until it's valid, or running a game until the player quits.</p>
`},
    { type:'code', src:`# Countdown timer
seconds = 5

while seconds > 0:
    print(f"T-minus {seconds}...")
    seconds -= 1          # crucial! without this it loops forever

print("Lift off! 🚀")`,
      out:`T-minus 5...
T-minus 4...
T-minus 3...
T-minus 2...
T-minus 1...
Lift off! 🚀` },
    { type:'warn', body:`A <code>while</code> loop with a condition that never becomes <code>False</code> runs forever — an <strong>infinite loop</strong>. Always make sure something inside the loop moves you toward the exit condition. Press <strong>Ctrl+C</strong> to kill a runaway loop.` },
    { type:'text', body:`<h3>Input validation — a classic while use case</h3>
<p>Keep asking for input until the user provides something acceptable:</p>`},
    { type:'code', src:`while True:
    age = input("Enter your age (1–120): ").strip()

    # Validate: must be a digit and in range
    if age.isdigit() and 1 <= int(age) <= 120:
        age = int(age)
        break                   # exit the loop — we have valid input
    else:
        print("Invalid age. Please try again.")

print(f"Valid age recorded: {age}")` },
    { type:'text', body:`<h3>break — exit the loop immediately</h3>
<p><code>break</code> stops the loop entirely, regardless of the condition. Use it when you've found what you need and further iterations are pointless:</p>`},
    { type:'code', src:`# Search for the first negative number in a list
data = [12, 45, 7, -3, 22, -8, 19]

for i, value in enumerate(data):
    if value < 0:
        print(f"First negative: {value} at index {i}")
        break
else:
    # The for-else: runs only if the loop completed without a break
    print("No negative numbers found.")`,
      out:`First negative: -3 at index 3` },
    { type:'text', body:`<h3>continue — skip the rest of this iteration</h3>
<p><code>continue</code> jumps straight to the next iteration, skipping everything below it in the current iteration. Useful for filtering:</p>`},
    { type:'code', src:`# Sum only the even numbers, skip odds
numbers = [3, 8, 15, 22, 7, 40, 11, 6]
even_sum = 0

for n in numbers:
    if n % 2 != 0:
        continue            # skip odd numbers
    even_sum += n
    print(f"  Adding {n} → running total: {even_sum}")

print(f"Sum of evens: {even_sum}")`,
      out:`  Adding 8 → running total: 8
  Adding 22 → running total: 30
  Adding 40 → running total: 70
  Adding 6 → running total: 76
Sum of evens: 76` },
    { type:'exercise', title:'Batch Data Entry Validator',
      body:`<p>A data entry operator is entering student records one at a time. Write a <code>while True</code> input loop that:</p>
<ol>
<li>Asks for: name (non-empty string), age (integer 15–60), score (float 0–100)</li>
<li>Validates each field — print a specific error message if invalid, and re-ask that field until it's valid</li>
<li>Stores each valid record in a list of dicts</li>
<li>After each record, asks "Add another? (y/n)". If n, exit the loop and print a summary table of all records entered</li>
</ol>`,
      hint:`Use nested <code>while True</code> loops for each field. Break from the inner loop once the field is valid. The outer loop runs until the user types 'n'.`,
      solution:`records = []

while True:
    print("\\n--- New Record ---")

    while True:
        name = input("Name: ").strip()
        if name: break
        print("  Error: name cannot be empty")

    while True:
        try:
            age = int(input("Age (15-60): "))
            if 15 <= age <= 60: break
            print("  Error: age must be between 15 and 60")
        except ValueError:
            print("  Error: please enter a whole number")

    while True:
        try:
            score = float(input("Score (0-100): "))
            if 0 <= score <= 100: break
            print("  Error: score must be between 0 and 100")
        except ValueError:
            print("  Error: please enter a number")

    records.append({"name": name, "age": age, "score": score})
    print(f"  ✓ Record saved for {name}")

    again = input("Add another? (y/n): ").strip().lower()
    if again != "y":
        break

print("\\n=== Summary ===")
print(f"{'Name':<20} {'Age':>4} {'Score':>7}")
print("-" * 34)
for r in records:
    print(f"{r['name']:<20} {r['age']:>4} {r['score']:>7.1f}")`}
  ]
};

L['python-w2-l4'] = {
  duration_mins: 12,
  sections: [
    { type:'text', body:`
<h2>Nested Loops &amp; Patterns</h2>
<p>A nested loop is a loop inside another loop. The inner loop runs completely for every single iteration of the outer loop. They're used whenever you need to work with two-dimensional data — grids, matrices, tables, combinations.</p>
`},
    { type:'code', src:`# Multiplication table — classic nested loop
for row in range(1, 5):           # outer: controls the row
    for col in range(1, 5):       # inner: controls the column
        print(f"{row * col:4d}", end="")
    print()                       # newline after each row`,
      out:`   1   2   3   4
   2   4   6   8
   3   6   9  12
   4   8  12  16` },
    { type:'text', body:`<h3>Pattern problems — the best way to internalise nested loops</h3>
<p>Star and number patterns train your spatial thinking. The key insight: the outer loop controls <em>rows</em>, the inner loop controls <em>columns per row</em>.</p>`},
    { type:'code', src:`n = 5

# Right triangle
print("Right triangle:")
for i in range(1, n+1):
    print("*" * i)

print()

# Inverted triangle
print("Inverted triangle:")
for i in range(n, 0, -1):
    print("*" * i)

print()

# Number pyramid
print("Number pyramid:")
for i in range(1, n+1):
    for j in range(1, i+1):
        print(j, end=" ")
    print()`,
      out:`Right triangle:
*
**
***
****
*****

Inverted triangle:
*****
****
***
**
*

Number pyramid:
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5` },
    { type:'text', body:`<h3>Nested loops on real data — finding pairs</h3>
<p>Nested loops shine when you need every combination of two collections:</p>`},
    { type:'code', src:`# Find all pairs that sum to a target
numbers = [2, 7, 11, 15, -2, 4]
target = 9

print(f"Pairs that sum to {target}:")
for i in range(len(numbers)):
    for j in range(i + 1, len(numbers)):   # j starts at i+1 to avoid duplicates
        if numbers[i] + numbers[j] == target:
            print(f"  {numbers[i]} + {numbers[j]} = {target}")`,
      out:`Pairs that sum to 9:
  2 + 7 = 9
  -2 + 11 = 9` },
    { type:'exercise', title:'Comprehension Data Transformer',
      body:`<p>You have a raw dataset of student records. Use <strong>only list and dict comprehensions</strong> (no explicit <code>for</code> loops except inside comprehensions) to answer these questions:</p>
<pre style="background:rgba(255,255,255,.04);padding:.75rem;border-radius:6px;font-size:.82rem;font-family:var(--fm)">students = [
    {"name": "Priya",  "score": 92, "city": "Mumbai",    "employed": True},
    {"name": "Rajan",  "score": 78, "city": "Delhi",     "employed": False},
    {"name": "Ananya", "score": 85, "city": "Bengaluru", "employed": True},
    {"name": "Bala",   "score": 45, "city": "Chennai",   "employed": False},
    {"name": "Chitra", "score": 91, "city": "Mumbai",    "employed": True},
    {"name": "Dev",    "score": 67, "city": "Delhi",     "employed": False},
]</pre>
<ol>
<li>List comprehension: names of all students who scored ≥ 75</li>
<li>List comprehension: scores normalised to 0–1 scale (divide by 100)</li>
<li>Dict comprehension: <code>{name: grade}</code> for all students (A≥90, B≥75, C≥50, F)</li>
<li>List comprehension: dicts with <code>name</code> and <code>status</code> ("Placed" if employed else "Seeking")</li>
<li>Nested comprehension: group names by city into a dict <code>{city: [names]}</code></li>
</ol>`,
      hint:`For (5): <code>{city: [s["name"] for s in students if s["city"]==city] for city in set(s["city"] for s in students)}</code>`,
      solution:`students = [
    {"name": "Priya",  "score": 92, "city": "Mumbai",    "employed": True},
    {"name": "Rajan",  "score": 78, "city": "Delhi",     "employed": False},
    {"name": "Ananya", "score": 85, "city": "Bengaluru", "employed": True},
    {"name": "Bala",   "score": 45, "city": "Chennai",   "employed": False},
    {"name": "Chitra", "score": 91, "city": "Mumbai",    "employed": True},
    {"name": "Dev",    "score": 67, "city": "Delhi",     "employed": False},
]

# 1. Names with score >= 75
top = [s["name"] for s in students if s["score"] >= 75]
print("Top students:", top)

# 2. Normalised scores
norm = [round(s["score"] / 100, 2) for s in students]
print("Normalised:", norm)

# 3. Name → grade dict
def grade(sc): return "A" if sc>=90 else "B" if sc>=75 else "C" if sc>=50 else "F"
grades = {s["name"]: grade(s["score"]) for s in students}
print("Grades:", grades)

# 4. Placement status
status = [{"name": s["name"], "status": "Placed" if s["employed"] else "Seeking"} for s in students]
print("Status:", status)

# 5. City → names
cities = set(s["city"] for s in students)
by_city = {city: [s["name"] for s in students if s["city"] == city] for city in cities}
print("By city:", by_city)`}
  ]
};

L['python-w2-l5'] = {
  duration_mins: 15,
  sections: [
    { type:'text', body:`
<h2>List Comprehensions</h2>
<p>A list comprehension is Python's compact syntax for creating a new list by applying an expression to each item in an iterable — often in a single, readable line. They're one of Python's most celebrated features and you'll see them everywhere in data science code.</p>
<h3>The pattern</h3>
<p><code>[expression for item in iterable]</code> — read it as: "give me <em>expression</em> for each <em>item</em> in <em>iterable</em>".</p>
`},
    { type:'code', src:`# Traditional loop approach
squares_loop = []
for n in range(1, 8):
    squares_loop.append(n ** 2)

# List comprehension — same result, one line
squares_comp = [n ** 2 for n in range(1, 8)]

print(squares_loop)
print(squares_comp)    # identical!`,
      out:`[1, 4, 9, 16, 25, 36, 49]
[1, 4, 9, 16, 25, 36, 49]` },
    { type:'text', body:`<h3>Adding a condition — filtering</h3>
<p><code>[expression for item in iterable if condition]</code> — only includes items where the condition is <code>True</code>:</p>`},
    { type:'code', src:`# All even squares up to 100
even_squares = [n**2 for n in range(1, 11) if n % 2 == 0]
print(even_squares)

# Extract passing scores from a list
results = [45, 72, 38, 91, 55, 29, 88, 63]
passing = [score for score in results if score >= 50]
print(passing)

# Convert to letter grades
grades = ["Pass" if s >= 50 else "Fail" for s in results]
print(grades)`,
      out:`[4, 16, 36, 64, 100]
[72, 91, 55, 88, 63]
['Fail', 'Pass', 'Fail', 'Pass', 'Pass', 'Fail', 'Pass', 'Pass']` },
    { type:'text', body:`<h3>String transformations</h3>
<p>Comprehensions work on any iterable — strings, lists of strings, anything:</p>`},
    { type:'code', src:`# Clean a messy list of city names
raw_cities = ["  chennai ", "MUMBAI", "Bengaluru  ", "delhi"]
clean_cities = [city.strip().title() for city in raw_cities]
print(clean_cities)

# Extract first letter of each word (initials)
names = ["Arun Kumar", "Priya Sharma", "Vikram Nair"]
initials = ["".join(word[0] for word in name.split()) for name in names]
print(initials)

# Filter words longer than 4 characters
sentence = "The quick brown fox jumps over the lazy dog"
long_words = [w for w in sentence.split() if len(w) > 4]
print(long_words)`,
      out:`['Chennai', 'Mumbai', 'Bengaluru', 'Delhi']
['AK', 'PS', 'VN']
['quick', 'brown', 'jumps']` },
    { type:'tip', body:`Use list comprehensions when the logic is simple and fits on one readable line. If the expression or condition is complex, a regular <code>for</code> loop is clearer. Readability always wins.` },
    { type:'exercise', title:'Data Cleaning Pipeline',
      body:`<p>You have a raw list of temperature readings (some have errors): <code>[22.1, -999, 31.5, 0.0, -999, 28.3, 45.2, -999, 19.8]</code></p>
<p>Using list comprehensions, in three separate lines:</p>
<ol>
<li>Filter out invalid readings (<code>-999</code>)</li>
<li>Convert the valid Celsius values to Fahrenheit</li>
<li>Round each Fahrenheit value to 1 decimal place</li>
</ol>`,
      hint:`Chain three comprehensions. Each one takes the output of the previous as its input.`,
      solution:`raw = [22.1, -999, 31.5, 0.0, -999, 28.3, 45.2, -999, 19.8]

valid_c   = [t for t in raw if t != -999]
fahrenheit = [t * 9/5 + 32 for t in valid_c]
rounded    = [round(t, 1) for t in fahrenheit]

print("Valid (°C):      ", valid_c)
print("Fahrenheit (°F): ", fahrenheit)
print("Rounded (°F):    ", rounded)`}
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 3 — FUNCTIONS & MODULES
══════════════════════════════════════════════════════════════════════════ */

L['python-w3-l1'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>Defining &amp; Calling Functions</h2>
<p>A function is a reusable, named block of code. Instead of writing the same logic five times in different parts of your program, you write it once as a function and call it by name whenever you need it. This is the single most important abstraction in all of programming.</p>
<h3>The def keyword</h3>
`},
    { type:'code', src:`def greet_student(name):
    """Greet a student by name."""         # docstring
    message = f"Welcome, {name}! Let's learn Python."
    print(message)

# Calling the function
greet_student("Priya")
greet_student("Arjun")
greet_student("Meera")`,
      out:`Welcome, Priya! Let's learn Python.
Welcome, Arjun! Let's learn Python.
Welcome, Meera! Let's learn Python.` },
    { type:'text', body:`<h3>return — sending a value back to the caller</h3>
<p>Functions that <code>print</code> are for displaying. Functions that <code>return</code> produce a value you can store and use. Most useful functions return something:</p>`},
    { type:'code', src:`def calculate_cgpa(marks_list):
    """Calculate CGPA from a list of marks (out of 100)."""
    total = sum(marks_list)
    average = total / len(marks_list)
    cgpa = average / 10          # convert percentage to 10-point scale
    return round(cgpa, 2)

# The returned value can be stored, printed, or used in expressions
priya_marks  = [88, 76, 91, 83, 95]
arjun_marks  = [72, 68, 79, 85, 70]

priya_cgpa = calculate_cgpa(priya_marks)
arjun_cgpa = calculate_cgpa(arjun_marks)

print(f"Priya's CGPA : {priya_cgpa}")
print(f"Arjun's CGPA : {arjun_cgpa}")
print(f"Higher CGPA  : {max(priya_cgpa, arjun_cgpa)}")`,
      out:`Priya's CGPA : 8.66
Arjun's CGPA : 7.48
Higher CGPA  : 8.66` },
    { type:'text', body:`<h3>Returning multiple values</h3>
<p>Python functions can return multiple values as a tuple. The caller can unpack them directly:</p>`},
    { type:'code', src:`def analyse_scores(scores):
    """Return min, max, mean, and standard deviation of a list."""
    n = len(scores)
    mean = sum(scores) / n
    variance = sum((x - mean) ** 2 for x in scores) / n
    std_dev = variance ** 0.5
    return min(scores), max(scores), round(mean, 2), round(std_dev, 2)

data = [74, 88, 55, 92, 67, 83, 71, 96, 60, 79]
low, high, avg, spread = analyse_scores(data)

print(f"Min    : {low}")
print(f"Max    : {high}")
print(f"Mean   : {avg}")
print(f"Std Dev: {spread}")`,
      out:`Min    : 55
Max    : 96
Mean   : 76.5
Std Dev: 13.0` },
    { type:'text', body:`<h3>Functions calling other functions</h3>
<p>Build complex behaviour by composing simple functions. This is how professional code is organised:</p>`},
    { type:'code', src:`def celsius_to_fahrenheit(c):
    return c * 9/5 + 32

def is_fever(temp_celsius):
    return temp_celsius > 37.5

def diagnose(temp_celsius):
    f = celsius_to_fahrenheit(temp_celsius)
    fever = is_fever(temp_celsius)
    status = "Fever" if fever else "Normal"
    return f"Temp: {temp_celsius}°C ({f:.1f}°F) → {status}"

print(diagnose(36.8))
print(diagnose(38.2))
print(diagnose(40.1))`,
      out:`Temp: 36.8°C (98.2°F) → Normal
Temp: 38.2°C (100.8°F) → Fever
Temp: 40.1°C (104.2°F) → Fever` },
    { type:'text', body:`
<h3>Type hints and docstrings — professional Python</h3>
<p>Type hints (Python 3.5+) annotate what types a function expects and returns. They don't enforce types at runtime, but they make your code self-documenting, help IDEs catch mistakes, and are expected in any professional codebase. A docstring is the string immediately after <code>def</code> that explains what the function does:</p>
`},
    { type:'code', src:`def calculate_grade(score: float, max_score: float = 100.0) -> str:
    """
    Calculate a letter grade from a numeric score.

    Args:
        score:     The student's raw score.
        max_score: The maximum possible score (default 100).

    Returns:
        A letter grade: 'A', 'B', 'C', or 'F'.

    Raises:
        ValueError: If score is negative or exceeds max_score.
    """
    if not (0 <= score <= max_score):
        raise ValueError(f"score {score} is outside valid range [0, {max_score}]")

    pct = score / max_score * 100
    if pct >= 90: return "A"
    if pct >= 75: return "B"
    if pct >= 50: return "C"
    return "F"

# IDEs show the type hints in autocomplete
print(calculate_grade(85))          # B
print(calculate_grade(45, 50))      # A  (45/50 = 90%)
help(calculate_grade)               # shows the docstring`,
      out:`B
A
Help on function calculate_grade in module __main__:

calculate_grade(score: float, max_score: float = 100.0) -> str
    Calculate a letter grade from a numeric score.
    ...` },
    { type:'tip', body:`Use <code>from typing import Optional, List, Dict, Tuple</code> for complex types. <code>Optional[float]</code> means "float or None". In Python 3.10+, you can write <code>float | None</code> directly. Always annotate function signatures in code you'll share or maintain.` },
    { type:'exercise', title:'Student Report Generator',
      body:`<p>Write three functions with full type hints and docstrings:</p>
<ol>
<li><code>compute_stats(scores: list[float]) -> dict</code> — returns a dict with <code>mean</code>, <code>median</code>, <code>std</code>, <code>min</code>, <code>max</code> (compute without importing any library)</li>
<li><code>assign_grade(score: float) -> str</code> — returns A/B/C/F</li>
<li><code>generate_report(students: list[dict]) -> None</code> — takes a list of <code>{"name": str, "scores": list[float]}</code> dicts and prints a formatted table with each student's average, grade, and whether they are above the class average</li>
</ol>`,
      hint:`For median: sort the list, take the middle element (or average of two middle elements for even-length lists). For std: <code>sqrt(sum((x-mean)**2 for x in scores) / len(scores))</code>.`,
      solution:`import math

def compute_stats(scores: list) -> dict:
    """Compute descriptive statistics for a list of scores."""
    n = len(scores)
    mean   = sum(scores) / n
    sorted_s = sorted(scores)
    median = sorted_s[n//2] if n%2 else (sorted_s[n//2-1]+sorted_s[n//2])/2
    std    = math.sqrt(sum((x - mean)**2 for x in scores) / n)
    return {"mean": round(mean,2), "median": round(median,2),
            "std": round(std,2), "min": min(scores), "max": max(scores)}

def assign_grade(score: float) -> str:
    """Return a letter grade for a score 0–100."""
    if score >= 90: return "A"
    if score >= 75: return "B"
    if score >= 50: return "C"
    return "F"

def generate_report(students: list) -> None:
    """Print a formatted performance report for a list of students."""
    all_avgs = [sum(s["scores"])/len(s["scores"]) for s in students]
    class_avg = sum(all_avgs) / len(all_avgs)

    print(f"{'Name':<12} {'Avg':>6} {'Grade':>6} {'vs Class':>10}")
    print("-" * 38)
    for s, avg in zip(students, all_avgs):
        grade = assign_grade(avg)
        flag  = "↑ above" if avg >= class_avg else "↓ below"
        print(f"{s['name']:<12} {avg:>6.1f} {grade:>6} {flag:>10}")
    print(f"\nClass average: {class_avg:.2f}")

students = [
    {"name": "Priya",  "scores": [92, 88, 79]},
    {"name": "Rajan",  "scores": [78, 82, 71]},
    {"name": "Ananya", "scores": [85, 76, 91]},
    {"name": "Bala",   "scores": [61, 55, 48]},
    {"name": "Chitra", "scores": [88, 93, 85]},
]
generate_report(students)`}
  ]
};

L['python-w3-l2'] = {
  duration_mins: 15,
  sections: [
    { type:'text', body:`
<h2>Arguments — Positional, Keyword &amp; Defaults</h2>
<p>Python gives you several flexible ways to pass data into functions. Understanding argument types is key to writing functions that are both powerful and easy to use.</p>
<h3>Positional arguments — order matters</h3>
<p>When you call a function, Python matches arguments to parameters <em>by position</em>, left to right. This is the default and most common behaviour:</p>
`},
    { type:'code', src:`def describe_product(name, category, price):
    print(f"[{category}] {name} — ₹{price:,.0f}")

describe_product("MacBook Air", "Laptop", 114990)   # correct order
describe_product("Laptop", 114990, "MacBook Air")   # wrong order — no error, wrong output!`,
      out:`[Laptop] MacBook Air — ₹1,14,990
[114990] Laptop — ₹0` },
    { type:'text', body:`<h3>Keyword arguments — name them explicitly</h3>
<p>Pass arguments by name and order stops mattering. This also makes call sites more readable:</p>`},
    { type:'code', src:`def describe_product(name, category, price):
    print(f"[{category}] {name} — ₹{price:,.0f}")

# Keyword arguments — any order
describe_product(price=114990, name="MacBook Air", category="Laptop")

# Mix: positional first, then keyword (positional must come first!)
describe_product("MacBook Air", price=114990, category="Laptop")`,
      out:`[Laptop] MacBook Air — ₹1,14,990
[Laptop] MacBook Air — ₹1,14,990` },
    { type:'text', body:`<h3>Default parameter values</h3>
<p>Assign a default value in the function definition. If the caller doesn't provide that argument, the default is used. Put parameters with defaults <em>after</em> those without:</p>`},
    { type:'code', src:`def calculate_discount(price, discount_pct=10, currency="INR"):
    """Calculate final price after discount."""
    discount = price * discount_pct / 100
    final = price - discount
    symbol = "₹" if currency == "INR" else "$"
    return f"{symbol}{final:,.2f} (saved {symbol}{discount:,.2f})"

# Using all defaults
print(calculate_discount(5000))

# Override discount, use default currency
print(calculate_discount(5000, discount_pct=25))

# Override everything
print(calculate_discount(5000, discount_pct=15, currency="USD"))`,
      out:`₹4,500.00 (saved ₹500.00)
₹3,750.00 (saved ₹1,250.00)
$4,250.00 (saved $750.00)` },
    { type:'warn', body:`Never use a mutable object (list, dict) as a default value. Use <code>None</code> instead and create the object inside the function. Using a mutable default is a classic Python gotcha that causes mysterious bugs.` },
    { type:'code', src:`# Wrong — the list persists across calls!
def add_item_bad(item, cart=[]):
    cart.append(item)
    return cart

print(add_item_bad("Apple"))    # ['Apple']
print(add_item_bad("Banana"))   # ['Apple', 'Banana'] ← unexpected!

# Correct — use None as default
def add_item_good(item, cart=None):
    if cart is None:
        cart = []          # fresh list every time
    cart.append(item)
    return cart

print(add_item_good("Apple"))    # ['Apple']
print(add_item_good("Banana"))   # ['Banana']`,
      out:`['Apple']
['Apple', 'Banana']
['Apple']
['Banana']` },
    { type:'exercise', title:'Flexible Grading Function',
      body:`<p>Write a function <code>grade(score, total=100, passing=50, scheme="percentage")</code> that:</p>
<ul>
<li>Converts the score to a percentage (score/total × 100)</li>
<li>Returns <code>"Pass"</code> or <code>"Fail"</code> based on the passing threshold</li>
<li>If <code>scheme="letter"</code>, return A/B/C/D/F instead</li>
</ul>
<p>Test it with multiple calls using different combinations of arguments.</p>`,
      hint:`Use an <code>if/elif</code> chain inside the function. Check <code>scheme == "letter"</code> to decide which output format to use.`,
      solution:`def grade(score, total=100, passing=50, scheme="percentage"):
    pct = score / total * 100
    if scheme == "letter":
        if pct >= 90: return "A"
        elif pct >= 75: return "B"
        elif pct >= 60: return "C"
        elif pct >= passing: return "D"
        else: return "F"
    else:
        return "Pass" if pct >= passing else "Fail"

print(grade(72))                             # Pass
print(grade(72, passing=75))                 # Fail
print(grade(36, total=50))                   # Pass (72%)
print(grade(85, scheme="letter"))            # B
print(grade(45, total=50, scheme="letter"))  # A`}
  ]
};

L['python-w3-l3'] = {
  duration_mins: 15,
  sections: [
    { type:'text', body:`
<h2>*args &amp; **kwargs</h2>
<p>Sometimes you don't know in advance how many arguments a function will receive. Python solves this with <code>*args</code> and <code>**kwargs</code> — two conventions for collecting variable numbers of arguments.</p>
<h3>*args — collect extra positional arguments into a tuple</h3>
`},
    { type:'code', src:`def total_cost(*prices):
    """Accept any number of prices and return their sum."""
    print(f"Received {len(prices)} prices: {prices}")
    return sum(prices)

print(total_cost(299))
print(total_cost(299, 599, 1299))
print(total_cost(49, 99, 149, 199, 249, 399))`,
      out:`Received 1 prices: (299,)
Received 3 prices: (299, 599, 1299)
Received 6 prices: (49, 99, 149, 199, 249, 399)
299
2197
1144` },
    { type:'text', body:`<p>Notice that inside the function, <code>prices</code> is a plain <strong>tuple</strong>. You can loop over it, index it, pass it to <code>sum()</code>, etc. The <code>*</code> only appears in the function definition.</p>
<h3>**kwargs — collect extra keyword arguments into a dict</h3>`},
    { type:'code', src:`def create_profile(name, **details):
    """Create a user profile with any number of extra fields."""
    profile = {"name": name}
    profile.update(details)       # merge kwargs into profile
    return profile

p1 = create_profile("Arun")
p2 = create_profile("Priya", age=22, city="Chennai", course="ML")
p3 = create_profile("Vikram", age=28, role="admin", verified=True)

for p in [p1, p2, p3]:
    print(p)`,
      out:`{'name': 'Arun'}
{'name': 'Priya', 'age': 22, 'city': 'Chennai', 'course': 'ML'}
{'name': 'Vikram', 'age': 28, 'role': 'admin', 'verified': True}` },
    { type:'text', body:`<h3>Combining them — the full signature order</h3>
<p>A function can have all types: regular → defaults → *args → **kwargs. Always in that order:</p>`},
    { type:'code', src:`def log_event(level, message, *tags, timestamp=None, **metadata):
    """Structured event logger."""
    output = f"[{level.upper()}] {message}"
    if tags:
        output += f" | tags: {', '.join(tags)}"
    if timestamp:
        output += f" | at: {timestamp}"
    if metadata:
        output += " | " + ", ".join(f"{k}={v}" for k, v in metadata.items())
    print(output)

log_event("info", "User logged in")
log_event("error", "DB timeout", "database", "critical", timestamp="09:32:15")
log_event("warn", "High memory", "system", user_id=42, region="south")`,
      out:`[INFO] User logged in
[ERROR] DB timeout | tags: database, critical | at: 09:32:15
[WARN] High memory | tags: system | user_id=42, region=south` },
    { type:'text', body:`<h3>Unpacking with * and ** when calling functions</h3>
<p>The <code>*</code> and <code>**</code> operators also work at call sites to unpack sequences and dicts into arguments:</p>`},
    { type:'code', src:`def describe(name, age, city):
    print(f"{name}, {age}, from {city}")

# Unpack a list as positional args
info = ["Meera", 24, "Kochi"]
describe(*info)

# Unpack a dict as keyword args
info_dict = {"name": "Karthik", "age": 30, "city": "Pune"}
describe(**info_dict)`,
      out:`Meera, 24, from Kochi
Karthik, 30, from Pune` },
    { type:'exercise', title:'Flexible Statistics Function',
      body:`<p>Write a function <code>stats(*numbers, decimals=2)</code> that accepts any number of numeric arguments and returns a dictionary containing: <code>count</code>, <code>sum</code>, <code>mean</code>, <code>min</code>, <code>max</code>, and <code>range</code> (max − min). Round floats to <code>decimals</code> places.</p>
<p>Test it with <code>stats(5, 2, 8, 1, 9, 3)</code> and <code>stats(10.5, 20.3, 15.8, decimals=1)</code>.</p>`,
      hint:`Use Python's built-in <code>sum()</code>, <code>min()</code>, <code>max()</code>, and <code>len()</code>. Build the result dict with a dict literal.`,
      solution:`def stats(*numbers, decimals=2):
    n = len(numbers)
    total = sum(numbers)
    mean = total / n
    lo, hi = min(numbers), max(numbers)
    return {
        "count": n,
        "sum":   round(total, decimals),
        "mean":  round(mean, decimals),
        "min":   lo,
        "max":   hi,
        "range": round(hi - lo, decimals)
    }

print(stats(5, 2, 8, 1, 9, 3))
print(stats(10.5, 20.3, 15.8, decimals=1))`}
  ]
};

L['python-w3-l4'] = {
  duration_mins: 15,
  sections: [
    { type:'text', body:`
<h2>Lambda Functions &amp; Higher-Order Functions</h2>
<p>A <strong>lambda</strong> is a tiny, anonymous function written in one expression. It's useful for short throwaway functions you'd rather not give a name — especially when passing a function as an argument to another function.</p>
<h3>Lambda syntax</h3>
<p><code>lambda parameters: expression</code> — no <code>def</code>, no <code>return</code>, no body block. The expression is automatically returned.</p>
`},
    { type:'code', src:`# A regular function
def square(x):
    return x ** 2

# Equivalent lambda
square_lambda = lambda x: x ** 2

print(square(7))         # 49
print(square_lambda(7))  # 49

# Multi-parameter lambda
bmi = lambda weight, height: round(weight / height ** 2, 1)
print(bmi(68, 1.72))     # 23.0` },
    { type:'text', body:`<h3>sorted() with a key function</h3>
<p>This is where lambdas truly shine. <code>sorted()</code> accepts a <code>key</code> argument — a function that maps each item to a comparison value. Lambdas make this concise:</p>`},
    { type:'code', src:`students = [
    {"name": "Arun",   "cgpa": 8.4, "age": 21},
    {"name": "Priya",  "cgpa": 9.1, "age": 22},
    {"name": "Bala",   "cgpa": 7.8, "age": 20},
    {"name": "Chitra", "cgpa": 9.1, "age": 23},
]

# Sort by CGPA descending
by_cgpa = sorted(students, key=lambda s: s["cgpa"], reverse=True)
for s in by_cgpa:
    print(f"  {s['name']:8} {s['cgpa']}")

print()

# Sort by CGPA descending, then by age ascending (multiple keys)
by_cgpa_age = sorted(students, key=lambda s: (-s["cgpa"], s["age"]))
for s in by_cgpa_age:
    print(f"  {s['name']:8} CGPA:{s['cgpa']}  Age:{s['age']}")`,
      out:`  Priya    9.1
  Chitra   9.1
  Arun     8.4
  Bala     7.8

  Priya    CGPA:9.1  Age:22
  Chitra   CGPA:9.1  Age:23
  Arun     CGPA:8.4  Age:21
  Bala     CGPA:7.8  Age:20` },
    { type:'text', body:`<h3>map() — apply a function to every element</h3>`},
    { type:'code', src:`temperatures_c = [0, 20, 37, 100, -40]

# map returns a lazy iterator — wrap in list() to see it
temperatures_f = list(map(lambda c: c * 9/5 + 32, temperatures_c))
print(temperatures_f)

# map with a named function
def normalise(val, lo, hi):
    return (val - lo) / (hi - lo)

scores = [45, 72, 88, 55, 91]
normalised = list(map(lambda s: round(normalise(s, min(scores), max(scores)), 3), scores))
print(normalised)`,
      out:`[32.0, 68.0, 98.6, 212.0, -40.0]
[0.0, 0.587, 0.935, 0.217, 1.0]` },
    { type:'text', body:`<h3>filter() — keep only elements that pass a test</h3>`},
    { type:'code', src:`prices = [199, 4999, 299, 14999, 799, 24999, 499]

affordable = list(filter(lambda p: p < 1000, prices))
premium    = list(filter(lambda p: p >= 10000, prices))

print(f"Under ₹1000 : {affordable}")
print(f"₹10,000+    : {premium}")`,
      out:`Under ₹1000 : [199, 299, 799, 499]
₹10,000+    : [14999, 24999]` },
    { type:'tip', body:`In modern Python, list comprehensions with conditions are usually preferred over <code>filter()</code>, and comprehensions over <code>map()</code>. But <code>sorted(key=lambda…)</code> is used everywhere and is the main practical use of lambdas.` },
    { type:'exercise', title:'Sort a Product Catalogue',
      body:`<p>You have a list of products: <code>[{"name":"Laptop","price":54999,"rating":4.2}, {"name":"Phone","price":23999,"rating":4.5}, {"name":"Tablet","price":31999,"rating":4.0}, {"name":"Watch","price":12999,"rating":4.7}]</code></p>
<ol>
<li>Sort by price (ascending)</li>
<li>Sort by rating (descending)</li>
<li>Filter products with rating ≥ 4.3 using <code>filter()</code> and a lambda</li>
<li>Use <code>map()</code> and a lambda to add a <code>"discounted_price"</code> key (10% off) to each product</li>
</ol>`,
      hint:`For part 4, a <code>map()</code> lambda can return a new dict: <code>lambda p: {**p, "discounted_price": ...}</code>`,
      solution:`products = [
    {"name":"Laptop","price":54999,"rating":4.2},
    {"name":"Phone","price":23999,"rating":4.5},
    {"name":"Tablet","price":31999,"rating":4.0},
    {"name":"Watch","price":12999,"rating":4.7}
]

by_price  = sorted(products, key=lambda p: p["price"])
by_rating = sorted(products, key=lambda p: p["rating"], reverse=True)
top_rated = list(filter(lambda p: p["rating"] >= 4.3, products))
with_disc = list(map(lambda p: {**p, "discounted_price": round(p["price"]*0.9,2)}, products))

print("By price:", [p["name"] for p in by_price])
print("By rating:", [p["name"] for p in by_rating])
print("Top rated:", [p["name"] for p in top_rated])
for p in with_disc:
    print(f"  {p['name']}: ₹{p['price']} → ₹{p['discounted_price']}")`}
  ]
};

L['python-w3-l5'] = {
  duration_mins: 12,
  sections: [
    { type:'text', body:`
<h2>Scope &amp; Built-in Modules</h2>
<p><strong>Scope</strong> is the region of code where a variable is visible and accessible. Understanding scope prevents a whole class of confusing bugs.</p>
<h3>Local vs global scope</h3>
<p>A variable created inside a function is <strong>local</strong> — it exists only within that function and disappears when the function returns. A variable created outside any function is <strong>global</strong>:</p>
`},
    { type:'code', src:`tax_rate = 0.18          # global variable

def calculate_tax(price):
    tax = price * tax_rate   # tax is local; tax_rate is global (read OK)
    return tax

print(calculate_tax(1000))   # 180.0
# print(tax)                 # NameError — 'tax' doesn't exist here` },
    { type:'tip', body:`Reading a global is fine. <em>Modifying</em> a global inside a function requires the <code>global</code> keyword — but this is almost always a design mistake. Instead, return the new value and let the caller update it.` },
    { type:'code', src:`# The LEGB rule — Python looks up names in this order:
# Local → Enclosing → Global → Built-in

x = "global"

def outer():
    x = "enclosing"

    def inner():
        x = "local"
        print(f"inner  sees: {x}")    # local
    inner()
    print(f"outer  sees: {x}")        # enclosing

outer()
print(f"module sees: {x}")            # global`,
      out:`inner  sees: local
outer  sees: enclosing
module sees: global` },
    { type:'text', body:`<h3>The standard library — batteries included</h3>
<p>Python ships with a vast <em>standard library</em> — modules you can import without installing anything. Here are the ones you'll use most in data science work:</p>`},
    { type:'code', src:`import math
import random
import datetime

# math — mathematical functions
print(math.pi)               # 3.141592653589793
print(math.sqrt(144))        # 12.0
print(math.log10(1000))      # 3.0
print(math.ceil(4.3))        # 5
print(math.floor(4.9))       # 4

# random — generate random values
random.seed(42)              # reproducibility
print(random.randint(1, 100))           # random integer 1–100
print(random.choice(["a","b","c","d"])) # random pick
nums = list(range(1, 11))
random.shuffle(nums)
print(nums)                             # shuffled list
print(random.sample(nums, 3))          # 3 unique picks

# datetime — working with dates and times
today = datetime.date.today()
now   = datetime.datetime.now()
print(today)                            # 2025-05-17
print(now.strftime("%d %B %Y, %H:%M")) # 17 May 2025, 09:30`,
      out:`3.141592653589793
12.0
3.0
5
4
53
b
[5, 1, 8, 10, 3, 7, 4, 2, 9, 6]
[8, 3, 5]
2025-05-17
17 May 2025, 09:30` },
    { type:'text', body:`
<h3>Generators — memory-efficient iteration</h3>
<p>A <strong>generator</strong> is a function that uses <code>yield</code> instead of <code>return</code>. It produces values one at a time — on demand — rather than building the entire sequence in memory. This is critical when working with large datasets:</p>
`},
    { type:'code', src:`# Compare: list vs generator for large sequence
import sys

# List — builds all 1M values in memory at once
big_list = [x ** 2 for x in range(1_000_000)]
print(f"List size: {sys.getsizeof(big_list):,} bytes")   # ~8 MB

# Generator — builds values ONE at a time, tiny memory footprint
def squares(n):
    for x in range(n):
        yield x ** 2

gen = squares(1_000_000)
print(f"Generator size: {sys.getsizeof(gen)} bytes")     # ~112 bytes

# Both work the same in a for loop:
total = sum(squares(1_000_000))   # never holds all values at once
print(f"Sum: {total:,}")`,
      out:`List size: 8,448,728 bytes
Generator size: 112 bytes
Sum: 333,332,833,333,500,000` },
    { type:'code', src:`# Practical generator: read a large CSV line by line
def read_csv_rows(filename: str):
    """Yield one parsed row at a time from a CSV file."""
    with open(filename, "r", encoding="utf-8") as f:
        headers = [h.strip() for h in next(f).split(",")]
        for line in f:
            values = [v.strip() for v in line.split(",")]
            yield dict(zip(headers, values))

# Process a 1M-row CSV without loading it all into RAM:
# for row in read_csv_rows("big_data.csv"):
#     process(row)   # each row is a dict, one at a time

# Generator expression — like a list comprehension but lazy:
scores = [88, 45, 92, 67, 71, 55, 83]
passing_gen = (s for s in scores if s >= 50)   # parentheses, not brackets
print("Passing scores:", list(passing_gen))`,
      out:`Passing scores: [88, 92, 67, 71, 55, 83]` },
    { type:'exercise', title:'Data Pipeline with Generators',
      body:`<p>Write a data processing pipeline using generators:</p>
<ol>
<li><code>generate_students(n: int)</code> — yields <code>n</code> dicts, each with a random <code>name</code>, <code>score</code> (50–100), and <code>city</code></li>
<li><code>filter_top(students, threshold: float)</code> — a generator that yields only students with score ≥ threshold</li>
<li><code>enrich(students)</code> — a generator that adds a <code>"grade"</code> key to each student dict</li>
<li>Chain them: <code>enrich(filter_top(generate_students(1000), 80))</code> and print a summary of how many passed and their average score — all without building intermediate lists</li>
</ol>`,
      hint:`Each generator function uses <code>yield</code>. Chain them by passing one generator as the iterable to the next. To get count and sum without a list: use a <code>for</code> loop over the chained generator and accumulate.`,
      solution:`import random

names = ["Priya","Rajan","Ananya","Bala","Chitra","Dev","Esha","Faiz","Gita","Hari"]
cities = ["Mumbai","Delhi","Bengaluru","Chennai","Hyderabad"]

def generate_students(n: int):
    for i in range(n):
        yield {
            "name":  random.choice(names) + f"_{i}",
            "score": random.randint(50, 100),
            "city":  random.choice(cities),
        }

def filter_top(students, threshold: float):
    for s in students:
        if s["score"] >= threshold:
            yield s

def enrich(students):
    for s in students:
        score = s["score"]
        s["grade"] = "A" if score >= 90 else "B" if score >= 75 else "C"
        yield s

random.seed(42)
pipeline = enrich(filter_top(generate_students(1000), 80))

count, total = 0, 0
grade_counts = {"A": 0, "B": 0, "C": 0}
for student in pipeline:
    count += 1
    total += student["score"]
    grade_counts[student["grade"]] += 1

print(f"Students scoring ≥ 80: {count}")
print(f"Average score        : {total/count:.2f}")
print(f"Grade distribution   : {grade_counts}")`}
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 4 — DATA STRUCTURES
══════════════════════════════════════════════════════════════════════════ */

L['python-w4-l1'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>Lists — Creation, Indexing &amp; Slicing</h2>
<p>A list is Python's most versatile container. It holds an ordered collection of items — any types, any mix, any size. Lists are <strong>mutable</strong>: you can add, remove, and change items after creation.</p>
<h3>Creating lists</h3>
`},
    { type:'code', src:`# Empty list
empty = []

# Homogeneous list (same type — most common in data science)
temperatures = [22.1, 24.5, 19.8, 31.2, 28.7, 20.0]

# Mixed types (valid, but unusual)
record = ["Priya", 22, 9.1, True, None]

# List of lists — 2D data (like a spreadsheet)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# list() constructor — convert other iterables
from_range  = list(range(1, 8))       # [1, 2, 3, 4, 5, 6, 7]
from_string = list("hello")           # ['h', 'e', 'l', 'l', 'o']
from_set    = list({3, 1, 4, 1, 5})   # order not guaranteed

print(from_range)
print(from_string)` },
    { type:'text', body:`<h3>Indexing — access by position</h3>
<p>Lists use zero-based indexing. Negative indices count from the end:</p>`},
    { type:'code', src:`rankings = ["Gold", "Silver", "Bronze", "Merit", "Finalist"]
#             0         1          2         3         4
#            -5        -4         -3        -2        -1

print(rankings[0])    # Gold        — first item
print(rankings[2])    # Bronze      — third item
print(rankings[-1])   # Finalist    — last item
print(rankings[-2])   # Merit       — second from end

# 2D list access: [row][column]
matrix = [[1,2,3],[4,5,6],[7,8,9]]
print(matrix[1][2])   # 6  (row 1, column 2)` },
    { type:'text', body:`<h3>Slicing — extract a sub-list</h3>
<p>Slicing syntax: <code>list[start : stop : step]</code>. The stop index is <em>exclusive</em> (not included). Omitting start means "from the beginning"; omitting stop means "to the end":</p>`},
    { type:'code', src:`scores = [55, 72, 88, 43, 91, 67, 79, 84, 60, 95]
#          0   1   2   3   4   5   6   7   8   9

print(scores[2:5])      # [88, 43, 91]      — index 2,3,4
print(scores[:4])       # [55, 72, 88, 43]  — first 4
print(scores[6:])       # [79, 84, 60, 95]  — from index 6 to end
print(scores[-3:])      # [60, 95] wait... [-3:] → [84, 60, 95]
print(scores[::2])      # every 2nd: [55, 88, 91, 79, 60]
print(scores[::-1])     # reversed: [95, 60, 84, 79, 67, 91, 43, 88, 72, 55]

# Slicing creates a shallow COPY — safe to modify
top3 = sorted(scores, reverse=True)[:3]
print(f"Top 3 scores: {top3}")`,
      out:`[88, 43, 91]
[55, 72, 88, 43]
[79, 84, 60, 95]
[84, 60, 95]
[55, 88, 91, 79, 60]
[95, 60, 84, 79, 67, 91, 43, 88, 72, 55]
Top 3 scores: [95, 91, 88]` },
    { type:'text', body:`<h3>List membership and length</h3>`},
    { type:'code', src:`fruits = ["mango", "apple", "banana", "guava", "papaya"]

# Check membership
print("mango" in fruits)         # True
print("pineapple" not in fruits) # True

# Length
print(len(fruits))               # 5

# Min, max, sum (for numeric lists)
prices = [299, 599, 149, 1299, 449]
print(min(prices), max(prices), sum(prices))  # 149 1299 2795`,
      out:`True
True
5
149 1299 2795` },
    { type:'exercise', title:'Exam Score Analysis',
      body:`<p>Given scores: <code>[67, 45, 88, 92, 55, 73, 81, 36, 94, 60]</code></p>
<ol>
<li>Print the first 3 and last 3 scores using slicing</li>
<li>Print the scores in reverse order</li>
<li>Print every other score (index 0, 2, 4…)</li>
<li>Find the top 3 scores without modifying the original list</li>
<li>Count how many scores are above 70</li>
</ol>`,
      hint:`For #4, use <code>sorted(scores, reverse=True)[:3]</code>. For #5, use a list comprehension with a condition and <code>len()</code>.`,
      solution:`scores = [67, 45, 88, 92, 55, 73, 81, 36, 94, 60]

print("First 3:   ", scores[:3])
print("Last 3:    ", scores[-3:])
print("Reversed:  ", scores[::-1])
print("Every 2nd: ", scores[::2])
print("Top 3:     ", sorted(scores, reverse=True)[:3])
above_70 = len([s for s in scores if s > 70])
print(f"Above 70:   {above_70} students")`}
  ]
};

L['python-w4-l2'] = {
  duration_mins: 15,
  sections: [
    { type:'text', body:`
<h2>List Methods</h2>
<p>Lists come loaded with built-in methods for adding, removing, searching, and reorganising elements. These are the operations you'll use in almost every data science program.</p>
`},
    { type:'code', src:`# Start with a to-do list
tasks = ["Read chapter 1", "Write notes", "Do exercises"]
print("Initial:", tasks)

# append() — add one item to the end
tasks.append("Submit assignment")
print("After append:", tasks)

# insert(index, item) — add at a specific position
tasks.insert(1, "Watch revision video")
print("After insert:", tasks)

# extend() — add all items from another list
extras = ["Review code", "Take quiz"]
tasks.extend(extras)
print("After extend:", tasks)`,
      out:`Initial: ['Read chapter 1', 'Write notes', 'Do exercises']
After append: ['Read chapter 1', 'Write notes', 'Do exercises', 'Submit assignment']
After insert: ['Read chapter 1', 'Watch revision video', 'Write notes', 'Do exercises', 'Submit assignment']
After extend: ['Read chapter 1', 'Watch revision video', 'Write notes', 'Do exercises', 'Submit assignment', 'Review code', 'Take quiz']` },
    { type:'code', src:`data = [4, 7, 2, 9, 2, 5, 2, 8, 1]

# remove(value) — removes FIRST occurrence of a value
data.remove(2)
print("After remove(2):", data)     # first 2 gone

# pop(index) — removes and RETURNS item at index
last  = data.pop()           # no index → removes last
third = data.pop(2)          # removes index 2
print(f"Popped last={last}, third={third}")
print("After pop:", data)

# index(value) — find position of first occurrence
nums = [10, 20, 30, 20, 50]
print(nums.index(20))        # 1
print(nums.count(20))        # 2  — count occurrences

# sort() — in-place sort (modifies the list!)
scores = [88, 43, 91, 55, 72]
scores.sort()
print("Sorted asc:", scores)
scores.sort(reverse=True)
print("Sorted desc:", scores)

# reverse() — reverse in-place
scores.reverse()
print("Reversed:", scores)

# copy() — shallow copy (safe: modifying copy won't affect original)
original = [1, 2, 3, 4, 5]
copy     = original.copy()
copy[0]  = 99
print("Original:", original)   # unchanged
print("Copy:    ", copy)`,
      out:`After remove(2): [4, 7, 9, 2, 5, 2, 8, 1]
Popped last=1, third=9
After pop: [4, 7, 2, 5, 2, 8]
1
2
Sorted asc: [43, 55, 72, 88, 91]
Sorted desc: [91, 88, 72, 55, 43]
Reversed: [43, 55, 72, 88, 91]
Original: [1, 2, 3, 4, 5]
Copy:     [99, 2, 3, 4, 5]` },
    { type:'warn', body:`<code>sort()</code> modifies the original list in place and returns <code>None</code>. <code>sorted()</code> (without the dot) returns a <em>new</em> sorted list and leaves the original untouched. Don't write <code>my_list = my_list.sort()</code> — that sets <code>my_list</code> to <code>None</code>!` },
    { type:'exercise', title:'Shopping Cart System',
      body:`<p>Build a shopping cart using a list and these functions:</p>
<ul>
<li><code>add_item(cart, item)</code> — append if not already in cart, else print "Already in cart"</li>
<li><code>remove_item(cart, item)</code> — remove if present, else print "Item not found"</li>
<li><code>show_cart(cart)</code> — print numbered list of items</li>
</ul>
<p>Test with: add Laptop, add Phone, add Laptop (duplicate), remove Tablet (not in cart), remove Phone, show_cart.</p>`,
      hint:`Use the <code>in</code> operator to check membership before adding or removing.`,
      solution:`def add_item(cart, item):
    if item in cart:
        print(f"'{item}' is already in cart.")
    else:
        cart.append(item)
        print(f"Added '{item}'.")

def remove_item(cart, item):
    if item in cart:
        cart.remove(item)
        print(f"Removed '{item}'.")
    else:
        print(f"'{item}' not found in cart.")

def show_cart(cart):
    print(f"\nCart ({len(cart)} items):")
    for i, item in enumerate(cart, 1):
        print(f"  {i}. {item}")

cart = []
add_item(cart, "Laptop")
add_item(cart, "Phone")
add_item(cart, "Laptop")
remove_item(cart, "Tablet")
remove_item(cart, "Phone")
show_cart(cart)`}
  ]
};

L['python-w4-l3'] = {
  duration_mins: 12,
  sections: [
    { type:'text', body:`
<h2>Tuples — Immutability &amp; Use Cases</h2>
<p>A tuple looks just like a list but uses parentheses instead of square brackets — and crucially, it is <strong>immutable</strong>: once created, you cannot add, remove, or change its elements. This constraint is a feature, not a limitation.</p>
`},
    { type:'code', src:`# Creating tuples
point    = (10, 20)                    # 2D coordinate
rgb_red  = (255, 0, 0)                 # RGB colour
record   = ("Priya", 22, "Chennai")    # mixed types

# Single-element tuple — MUST have trailing comma
singleton = (42,)      # this is a tuple
not_tuple = (42)       # this is just the integer 42!

print(type(singleton))   # <class 'tuple'>
print(type(not_tuple))   # <class 'int'>` },
    { type:'text', body:`<h3>Why use tuples over lists?</h3>
<ul>
<li><strong>Semantic clarity</strong> — a tuple signals "these values belong together and won't change": a GPS coordinate, an RGB colour, a date</li>
<li><strong>Dictionary keys</strong> — lists can't be dict keys (they're mutable); tuples can</li>
<li><strong>Performance</strong> — tuples are slightly faster and use less memory than lists</li>
<li><strong>Protection</strong> — passing a tuple to a function guarantees it won't be accidentally modified</li>
</ul>`},
    { type:'code', src:`# Tuple unpacking — clean and Pythonic
latitude, longitude = (13.0827, 80.2707)
print(f"Chennai: lat={latitude}, lon={longitude}")

# Swap variables — uses tuple packing/unpacking under the hood
a, b = 10, 25
a, b = b, a      # Python makes a temporary tuple (25, 10) then unpacks it
print(a, b)

# Returning multiple values from a function is really a tuple
def minmax(data):
    return min(data), max(data)    # Python packs these into a tuple

lo, hi = minmax([5, 2, 9, 1, 8])
print(lo, hi)

# Tuples as dictionary keys (lists cannot do this!)
distances = {
    ("Chennai", "Bengaluru"): 346,
    ("Chennai", "Mumbai"):    1338,
    ("Mumbai",  "Delhi"):     1415,
}
print(distances[("Chennai", "Mumbai")])`,
      out:`Chennai: lat=13.0827, lon=80.2707
25 10
1 9
1338` },
    { type:'code', src:`# Named tuples — tuples with descriptive field names
from collections import namedtuple

Student = namedtuple("Student", ["name", "cgpa", "city"])

s1 = Student("Arun",  8.4, "Chennai")
s2 = Student("Priya", 9.1, "Mumbai")

# Access by name (readable!) or by index (still works)
print(s1.name, s1.cgpa)
print(s2[1])           # 9.1

students = [s1, s2, Student("Bala", 7.8, "Delhi")]
top = sorted(students, key=lambda s: s.cgpa, reverse=True)
for s in top:
    print(f"{s.name}: {s.cgpa}")`,
      out:`Arun 8.4
9.1
Priya: 9.1
Arun: 8.4
Bala: 7.8` },
    { type:'exercise', title:'City Distance Lookup',
      body:`<p>Create a dictionary where keys are <code>(city_a, city_b)</code> tuples (at least 4 pairs) and values are distances in km.</p>
<p>Write a function <code>get_distance(city1, city2, distances)</code> that looks up the distance between two cities — it should work regardless of which city the user names first (i.e., look up both <code>(city1,city2)</code> and <code>(city2,city1)</code>).</p>`,
      hint:`Try both tuple orders. If neither exists, return <code>None</code> or a helpful message. Use <code>.get(key, default)</code> on the dict.`,
      solution:`distances = {
    ("Chennai","Bengaluru"): 346,
    ("Chennai","Mumbai"):    1338,
    ("Mumbai","Delhi"):      1415,
    ("Delhi","Kolkata"):     1472,
}

def get_distance(city1, city2, distances):
    d = distances.get((city1, city2)) or distances.get((city2, city1))
    if d is None:
        return f"No route found between {city1} and {city2}."
    return f"{city1} ↔ {city2}: {d} km"

print(get_distance("Chennai", "Mumbai", distances))
print(get_distance("Mumbai", "Chennai", distances))
print(get_distance("Delhi", "Bengaluru", distances))`}
  ]
};

L['python-w4-l4'] = {
  duration_mins: 20,
  sections: [
    { type:'text', body:`
<h2>Dictionaries</h2>
<p>A dictionary stores data as <strong>key–value pairs</strong>. It's the data structure of choice whenever you want to look something up by a meaningful name rather than a numeric position. Think of it as a mini-database: keys are like column names, values are the data.</p>
<h3>Creating and accessing dictionaries</h3>
`},
    { type:'code', src:`# Student profile dictionary
student = {
    "name":    "Kavya Ramesh",
    "age":     22,
    "cgpa":    9.1,
    "city":    "Chennai",
    "courses": ["Python", "ML", "SQL"],
    "active":  True
}

# Access by key
print(student["name"])         # Kavya Ramesh
print(student["courses"][0])   # Python  — list inside dict!

# .get() — safe access: returns None (or default) if key missing
print(student.get("phone"))           # None
print(student.get("phone", "N/A"))    # N/A

# Check membership
print("cgpa" in student)       # True
print("gpa"  in student)       # False`,
      out:`Kavya Ramesh
Python
None
N/A
True
False` },
    { type:'text', body:`<h3>Adding, updating, and deleting entries</h3>`},
    { type:'code', src:`profile = {"name": "Arun", "score": 72}

# Add a new key
profile["rank"] = 5
profile["passed"] = True

# Update an existing key
profile["score"] = 88     # direct assignment
profile.update({"rank": 3, "batch": "2024-A"})   # update multiple at once

print(profile)

# Delete entries
del profile["passed"]
removed = profile.pop("batch", None)   # pop returns the value; default if missing
print(f"Removed batch: {removed}")
print(profile)`,
      out:`{'name': 'Arun', 'score': 88, 'rank': 3, 'passed': True, 'batch': '2024-A'}
Removed batch: 2024-A
{'name': 'Arun', 'score': 88, 'rank': 3}` },
    { type:'text', body:`<h3>Iterating over dictionaries</h3>`},
    { type:'code', src:`grades = {"Maths": 91, "Physics": 78, "Chemistry": 85, "English": 94}

# Loop over keys (default)
for subject in grades:
    print(subject, end=", ")
print()

# Loop over values
for mark in grades.values():
    print(mark, end=" ")
print()

# Loop over key-value pairs — most useful
for subject, mark in grades.items():
    status = "✓" if mark >= 80 else "✗"
    print(f"  {status} {subject:<12}: {mark}")

# Dict comprehension — create a dict in one line
above_80 = {subj: mark for subj, mark in grades.items() if mark >= 80}
print(above_80)`,
      out:`Maths, Physics, Chemistry, English,
91 78 85 94
  ✓ Maths       : 91
  ✗ Physics     : 78
  ✓ Chemistry   : 85
  ✓ English     : 94
{'Maths': 91, 'Chemistry': 85, 'English': 94}` },
    { type:'text', body:`
<h3>The collections module — power-ups for dicts</h3>
<p>Python's <code>collections</code> module provides specialised dict-like containers that solve recurring problems cleanly. Three are essential for data science work:</p>
`},
    { type:'code', src:`from collections import Counter, defaultdict

# Counter — count things in one line
text = "data science is the science of data and data analysis"
word_counts = Counter(text.split())
print(word_counts.most_common(3))    # 3 most frequent

votes = ["BJP","INC","BJP","AAP","BJP","INC","BJP"]
print(Counter(votes))                # vote tally in one line

# Arithmetic on counters
morning = Counter({"Python": 40, "SQL": 25})
evening = Counter({"Python": 15, "SQL": 35, "ML": 20})
total   = morning + evening
print(total)                         # combined totals`,
      out:`[('data', 3), ('science', 2), ('is', 1)]
Counter({'BJP': 4, 'INC': 2, 'AAP': 1})
Counter({'Python': 55, 'SQL': 60, 'ML': 20})` },
    { type:'code', src:`from collections import defaultdict

# defaultdict — no KeyError for missing keys, auto-initialises
# Group students by city without "key exists?" checks:
students = [
    ("Priya",  "Mumbai"),  ("Rajan",  "Delhi"),
    ("Ananya", "Mumbai"),  ("Bala",   "Chennai"),
    ("Chitra", "Delhi"),   ("Dev",    "Mumbai"),
]

by_city = defaultdict(list)         # default value is an empty list
for name, city in students:
    by_city[city].append(name)      # no if-else needed!

for city, names in sorted(by_city.items()):
    print(f"  {city}: {names}")

# defaultdict(int) — count without initialisation
word = "mississippi"
freq = defaultdict(int)
for char in word:
    freq[char] += 1                  # starts at 0 automatically
print(dict(sorted(freq.items())))`,
      out:`  Chennai: ['Bala']
  Delhi: ['Rajan', 'Chitra']
  Mumbai: ['Priya', 'Ananya', 'Dev']
{'i': 4, 'm': 1, 'p': 2, 's': 4}` },
    { type:'tip', body:`<code>Counter</code> is the right tool whenever you're counting things. <code>defaultdict(list)</code> is the right tool whenever you're grouping things. Both save the "check if key exists first" boilerplate that clutters plain-dict code.` },
    { type:'text', body:`<h3>Nested dictionaries — the standard for structured data</h3>
<p>Real-world data is rarely flat. Dicts inside dicts mirror the structure of JSON APIs, database records, and config files:</p>`},
    { type:'code', src:`classroom = {
    "Arun":  {"marks": [88, 76, 91], "city": "Chennai"},
    "Priya": {"marks": [95, 89, 97], "city": "Mumbai"},
    "Bala":  {"marks": [72, 65, 70], "city": "Delhi"},
}

for name, info in classroom.items():
    avg = sum(info["marks"]) / len(info["marks"])
    print(f"  {name} ({info['city']}): avg = {avg:.1f}")`,
      out:`  Arun (Chennai): avg = 85.0
  Priya (Mumbai): avg = 93.7
  Bala (Delhi): avg = 69.0` },
    { type:'exercise', title:'Text Analytics Dashboard',
      body:`<p>You have a corpus of customer feedback strings. Build a text analytics function <code>analyse_feedback(texts: list[str]) -> dict</code> that returns:</p>
<ol>
<li><code>word_freq</code>: a <code>Counter</code> of all words (lowercase, punctuation stripped)</li>
<li><code>top_10</code>: the 10 most common words (excluding stopwords: "the","a","is","in","of","and","to","for","it","this","that","i","we","our","was","are","with","on","at","be")</li>
<li><code>avg_length</code>: average number of words per feedback string</li>
<li><code>by_sentiment</code>: a defaultdict grouping feedbacks as "positive" (if they contain "good","great","excellent","love","amazing") or "negative" (if "bad","poor","terrible","worst","hate"), else "neutral"</li>
</ol>`,
      hint:`Use <code>Counter</code> with a generator expression inside: <code>Counter(word for text in texts for word in ...)</code>. For top_10, filter out stopwords: <code>Counter({w:c for w,c in freq.items() if w not in stopwords}).most_common(10)</code>.`,
      solution:`import re
from collections import Counter, defaultdict

STOPWORDS = {"the","a","is","in","of","and","to","for","it","this","that",
             "i","we","our","was","are","with","on","at","be","an"}
POS_WORDS = {"good","great","excellent","love","amazing","wonderful","best"}
NEG_WORDS = {"bad","poor","terrible","worst","hate","awful","horrible"}

def analyse_feedback(texts: list) -> dict:
    def tokenise(t):
        return re.sub(r"[^a-z\\s]", "", t.lower()).split()

    all_words = Counter(w for t in texts for w in tokenise(t))
    top_10 = Counter({w: c for w, c in all_words.items()
                      if w not in STOPWORDS}).most_common(10)

    avg_length = sum(len(tokenise(t)) for t in texts) / len(texts)

    by_sentiment = defaultdict(list)
    for t in texts:
        words = set(tokenise(t))
        if words & POS_WORDS:        by_sentiment["positive"].append(t)
        elif words & NEG_WORDS:      by_sentiment["negative"].append(t)
        else:                        by_sentiment["neutral"].append(t)

    return {"word_freq": all_words, "top_10": top_10,
            "avg_length": avg_length, "by_sentiment": dict(by_sentiment)}

texts = [
    "The course is great and the instructors are excellent!",
    "Poor material, terrible support. Worst experience.",
    "Good content but the platform needs improvement.",
    "I love the live sessions! Amazing community.",
    "Average course, nothing special in the content.",
]

result = analyse_feedback(texts)
print("Top 10 words (no stopwords):")
for word, count in result["top_10"]:
    print(f"  {word}: {count}")
print(f"\\nAvg words per feedback: {result['avg_length']:.1f}")
for sentiment, items in result["by_sentiment"].items():
    print(f"{sentiment}: {len(items)} feedback(s)")`}
  ]
};

L['python-w4-l5'] = {
  duration_mins: 13,
  sections: [
    { type:'text', body:`
<h2>Sets &amp; Choosing the Right Data Structure</h2>
<p>A set is an unordered collection of <strong>unique</strong> items. Duplicates are automatically eliminated. Sets excel at membership testing and mathematical set operations.</p>
`},
    { type:'code', src:`# Creating sets
prime_digits = {2, 3, 5, 7}
even_digits  = {0, 2, 4, 6, 8}

# Duplicates are silently removed
visitors = {"Arun", "Priya", "Arun", "Bala", "Priya", "Chitra"}
print(visitors)   # only unique names — order not guaranteed

# Membership test — O(1) speed (much faster than list for large data!)
print("Arun" in visitors)    # True
print("Dev"  in visitors)    # False` },
    { type:'text', body:`<h3>Set operations — the real power</h3>`},
    { type:'code', src:`python_students = {"Arun", "Priya", "Bala", "Chitra", "Dev"}
ml_students     = {"Priya", "Esha", "Bala", "Faiz", "Dev"}

# Union — all students in either course
all_students = python_students | ml_students
print("All:", all_students)

# Intersection — students in BOTH courses
both_courses = python_students & ml_students
print("Both:", both_courses)

# Difference — in Python but not ML
only_python = python_students - ml_students
print("Only Python:", only_python)

# Symmetric difference — in one but not both
either_not_both = python_students ^ ml_students
print("Exclusive:", either_not_both)

# Subset / superset
print(both_courses.issubset(python_students))   # True — all "both" are in python`,
      out:`All: {'Dev', 'Esha', 'Priya', 'Faiz', 'Arun', 'Chitra', 'Bala'}
Both: {'Dev', 'Priya', 'Bala'}
Only Python: {'Arun', 'Chitra'}
Exclusive: {'Esha', 'Arun', 'Faiz', 'Chitra'}
True` },
    { type:'text', body:`<h3>Choosing the right data structure</h3>
<p>This decision shapes the readability and performance of your code:</p>
<ul>
<li><strong>list</strong> — ordered sequence, items can repeat, you need indexing or slicing → exam scores, time series, feature columns</li>
<li><strong>tuple</strong> — ordered, fixed, items belong together semantically → coordinates, RGB, record rows, function return values</li>
<li><strong>dict</strong> — key–value lookup, fast by key, data has named fields → student profile, word count, config, JSON</li>
<li><strong>set</strong> — uniqueness matters, membership tests, set math → finding duplicates, common elements, deduplication</li>
</ul>`},
    { type:'code', src:`# Real example: deduplicating and analysing website visitors
raw_log = [
    ("2025-05-01", "user_42"), ("2025-05-01", "user_17"),
    ("2025-05-01", "user_42"), ("2025-05-02", "user_99"),
    ("2025-05-02", "user_17"), ("2025-05-02", "user_42"),
]

# How many unique users visited?
unique_users = {uid for _, uid in raw_log}
print(f"Unique visitors: {len(unique_users)}")

# Which users visited on BOTH days?
day1_users = {uid for date, uid in raw_log if date == "2025-05-01"}
day2_users = {uid for date, uid in raw_log if date == "2025-05-02"}
returning  = day1_users & day2_users
print(f"Returning users: {returning}")

# Build a per-user visit count (dict is right here)
visit_count = {}
for _, uid in raw_log:
    visit_count[uid] = visit_count.get(uid, 0) + 1
print("Visit counts:", visit_count)`,
      out:`Unique visitors: 3
Returning users: {'user_42', 'user_17'}
Visit counts: {'user_42': 3, 'user_17': 2, 'user_99': 1}` },
    { type:'exercise', title:'Student Enrollment Analyser',
      body:`<p>Three courses have these enrollment lists (use actual lists with some duplicates): Python, ML, SQL — each with 6–8 student names, some shared across courses.</p>
<p>Using sets, find and print:</p>
<ol>
<li>Total unique students across all three courses</li>
<li>Students enrolled in all three courses</li>
<li>Students enrolled in Python but not ML</li>
<li>Students enrolled in exactly one course (hint: use symmetric difference carefully)</li>
</ol>`,
      hint:`Convert lists to sets. Use <code>&</code>, <code>-</code>, and <code>|</code>. For "exactly one course", a student appears in exactly one of the three sets.`,
      solution:`python_class = {"Arun","Priya","Bala","Chitra","Dev","Esha"}
ml_class     = {"Priya","Bala","Faiz","Dev","Gita","Hema"}
sql_class    = {"Arun","Chitra","Faiz","Dev","Ishan","Jaya"}

all_students  = python_class | ml_class | sql_class
all_three     = python_class & ml_class & sql_class
python_not_ml = python_class - ml_class

only_one = set()
for s in all_students:
    count = (s in python_class) + (s in ml_class) + (s in sql_class)
    if count == 1:
        only_one.add(s)

print("Total unique:   ", len(all_students))
print("All 3 courses:  ", all_three)
print("Python not ML:  ", python_not_ml)
print("Exactly 1 course:", only_one)`}
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 5 — OBJECT-ORIENTED PROGRAMMING
══════════════════════════════════════════════════════════════════════════ */

L['python-w5-l1'] = {
  duration_mins: 20,
  sections: [
    { type:'text', body:`
<h2>Classes &amp; Objects — Thinking in Blueprints</h2>
<p>Everything in Python is an object. A string is an object. A list is an object. Even functions are objects. Until now, you've been <em>using</em> objects without thinking about them. This week you'll learn to <em>create</em> your own.</p>
<p>A <strong>class</strong> is a blueprint. An <strong>object</strong> (also called an <em>instance</em>) is something built from that blueprint. Think of a class as the architectural plan for a house and each house that gets built as an object. Every house shares the same structure (rooms, doors, windows) but can have different details (colour, furniture).</p>
<h3>Defining your first class</h3>
<p>Use the <code>class</code> keyword followed by the name (capitalised by convention) and a colon:</p>
`},
    { type:'code', src:`class Student:
    """Represents a student at Data Science Academia."""
    pass   # 'pass' means "nothing here yet"

# Create two instances from the same blueprint
s1 = Student()
s2 = Student()

print(type(s1))   # <class '__main__.Student'>
print(s1 is s2)   # False — two different objects`,
      out:`<class '__main__.Student'>
False` },
    { type:'text', body:`
<h3>Attributes — giving objects their own data</h3>
<p>You can attach data to any object at any time by assigning to <code>object.attribute</code>. But the professional way is to set all attributes inside a special method called <code>__init__</code> (covered next lesson). For now, let's see the concept:</p>
`},
    { type:'code', src:`class Student:
    pass

s1 = Student()
s1.name = "Priya Sharma"
s1.age  = 22
s1.batch = "2024-A"

print(s1.name)          # Priya Sharma
print(f"{s1.name} is {s1.age} years old.")`,
      out:`Priya Sharma
Priya Sharma is 22 years old.` },
    { type:'text', body:`
<h3>Methods — giving objects behaviour</h3>
<p>A <strong>method</strong> is a function defined inside a class. The first parameter of every method is <strong>always</strong> <code>self</code> — Python automatically passes the object itself as the first argument so the method can access the object's data.</p>
`},
    { type:'code', src:`class Student:
    def greet(self):
        print("Hi, I am a student!")

    def introduce(self, name, course):
        self.name   = name
        self.course = course
        print(f"Hi, I am {self.name} and I study {self.course}.")

s = Student()
s.greet()
s.introduce("Rajan", "Python Programming")
print(s.name)   # attribute is now stored on the object`,
      out:`Hi, I am a student!
Hi, I am Rajan and I study Python Programming.
Rajan` },
    { type:'tip', body:`<code>self</code> is just a convention — Python doesn't care what you call it — but <em>every</em> Python developer uses <code>self</code>. Don't be clever here; use <code>self</code>.` },
    { type:'text', body:`
<h3>A realistic example — modelling a bank account</h3>
<p>Let's build something that feels real. A bank account has a balance (data) and operations like deposit and withdraw (behaviour):</p>
`},
    { type:'code', src:`class BankAccount:
    def deposit(self, amount):
        self.balance = getattr(self, 'balance', 0) + amount
        print(f"Deposited ₹{amount:,}. Balance: ₹{self.balance:,}")

    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds!")
        else:
            self.balance -= amount
            print(f"Withdrew ₹{amount:,}. Balance: ₹{self.balance:,}")

acc = BankAccount()
acc.deposit(50000)
acc.deposit(25000)
acc.withdraw(10000)
acc.withdraw(100000)`,
      out:`Deposited ₹50,000. Balance: ₹50,000
Deposited ₹25,000. Balance: ₹75,000
Withdrew ₹10,000. Balance: ₹65,000
Insufficient funds!` },
    { type:'warn', body:`In the example above we used <code>getattr(self, 'balance', 0)</code> as a workaround. In the next lesson, <code>__init__</code> will solve this properly by always initialising <code>self.balance = 0</code> when the account is created.` },
    { type:'exercise', title:'Rectangle Class',
      body:`<p>Create a <code>Rectangle</code> class with a method <code>set_dimensions(width, height)</code> that stores the dimensions, a method <code>area()</code> that returns width × height, and a method <code>perimeter()</code> that returns 2 × (width + height). Then create two rectangles: 5×3 and 12×7, and print each one's area and perimeter.</p>`,
      hint:`Store width and height in <code>set_dimensions</code> using <code>self.width</code> and <code>self.height</code>. The other two methods just compute and return.`,
      solution:`class Rectangle:
    def set_dimensions(self, width, height):
        self.width  = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

r1 = Rectangle()
r1.set_dimensions(5, 3)
print(f"5×3  — Area: {r1.area()}, Perimeter: {r1.perimeter()}")

r2 = Rectangle()
r2.set_dimensions(12, 7)
print(f"12×7 — Area: {r2.area()}, Perimeter: {r2.perimeter()}")` }
  ]
};

L['python-w5-l2'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>__init__ &amp; Special Methods</h2>
<p>Last lesson we set attributes <em>after</em> creating an object. That's error-prone — what if someone forgets to call <code>set_dimensions</code>? Python solves this with <strong><code>__init__</code></strong>, the constructor method. It runs automatically the moment you create a new object.</p>
<h3>The constructor: __init__</h3>
`},
    { type:'code', src:`class Student:
    def __init__(self, name, age, batch):
        self.name  = name
        self.age   = age
        self.batch = batch
        self.grades = []   # every student starts with an empty grade list

    def add_grade(self, subject, score):
        self.grades.append((subject, score))

    def average(self):
        if not self.grades:
            return 0
        return sum(score for _, score in self.grades) / len(self.grades)

s = Student("Ananya Reddy", 21, "2024-B")
s.add_grade("Python",  88)
s.add_grade("Maths",   92)
s.add_grade("SQL",     85)

print(s.name)
print(f"Average: {s.average():.1f}")`,
      out:`Ananya Reddy
Average: 88.3` },
    { type:'tip', body:`Always initialise every attribute inside <code>__init__</code>. If an attribute can be added later (like grades), start it as an empty list or <code>None</code>. This way every instance always has the same shape.` },
    { type:'text', body:`
<h3>Special methods (dunders) — making your objects feel native</h3>
<p>Python has dozens of special methods surrounded by double underscores (<em>dunders</em>). They let your objects work with Python's built-in operators and functions. You don't call them directly — Python calls them for you.</p>
<table style="width:100%;border-collapse:collapse;margin:1rem 0">
<tr style="background:var(--fog2)"><th style="padding:.4rem .8rem;text-align:left">Method</th><th style="padding:.4rem .8rem;text-align:left">Called when you write…</th></tr>
<tr><td style="padding:.4rem .8rem"><code>__str__</code></td><td style="padding:.4rem .8rem"><code>print(obj)</code> or <code>str(obj)</code></td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><code>__repr__</code></td><td style="padding:.4rem .8rem">REPL output, <code>repr(obj)</code></td></tr>
<tr><td style="padding:.4rem .8rem"><code>__len__</code></td><td style="padding:.4rem .8rem"><code>len(obj)</code></td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><code>__eq__</code></td><td style="padding:.4rem .8rem"><code>obj1 == obj2</code></td></tr>
<tr><td style="padding:.4rem .8rem"><code>__lt__</code></td><td style="padding:.4rem .8rem"><code>obj1 &lt; obj2</code></td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><code>__add__</code></td><td style="padding:.4rem .8rem"><code>obj1 + obj2</code></td></tr>
</table>
`},
    { type:'code', src:`class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner   = owner
        self.balance = balance
        self._txns   = []   # transaction history

    def deposit(self, amount):
        self.balance += amount
        self._txns.append(('deposit', amount))

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
        self._txns.append(('withdrawal', amount))

    def __str__(self):
        return f"Account({self.owner}, ₹{self.balance:,.0f})"

    def __repr__(self):
        return f"BankAccount(owner={self.owner!r}, balance={self.balance})"

    def __len__(self):
        return len(self._txns)   # number of transactions

    def __eq__(self, other):
        return self.balance == other.balance

acc1 = BankAccount("Priya", 10000)
acc2 = BankAccount("Rajan", 10000)

acc1.deposit(5000)
acc1.withdraw(2000)

print(acc1)            # uses __str__
print(len(acc1))       # uses __len__  → 2 transactions
print(acc1 == acc2)    # uses __eq__   → False (13000 vs 10000)`,
      out:`Account(Priya, ₹13,000)
2
False` },
    { type:'text', body:`<h3>Making your object sortable with __lt__</h3>`},
    { type:'code', src:`class Student:
    def __init__(self, name, gpa):
        self.name = name
        self.gpa  = gpa

    def __str__(self):
        return f"{self.name} (GPA {self.gpa})"

    def __lt__(self, other):
        return self.gpa < other.gpa   # sort by GPA ascending

students = [
    Student("Bala",   8.4),
    Student("Chitra", 9.1),
    Student("Dev",    7.8),
    Student("Esha",   9.5),
]

students.sort()   # uses __lt__ internally
for s in students:
    print(s)`,
      out:`Dev (GPA 7.8)
Bala (GPA 8.4)
Chitra (GPA 9.1)
Esha (GPA 9.5)` },
    { type:'exercise', title:'Temperature class with dunders',
      body:`<p>Create a <code>Temperature</code> class that stores a value in Celsius (<code>__init__(self, celsius)</code>). Add:</p>
<ul>
<li><code>__str__</code> that returns e.g. <code>"36.6°C"</code></li>
<li><code>__repr__</code> that returns e.g. <code>"Temperature(36.6)"</code></li>
<li><code>__eq__</code> comparing two temperatures by value</li>
<li>A property <code>fahrenheit</code> returning the converted value (formula: F = C × 9/5 + 32)</li>
</ul>
<p>Test: create <code>body = Temperature(36.6)</code>, print it, print its Fahrenheit, and check <code>body == Temperature(36.6)</code>.</p>`,
      hint:`For the property, use <code>@property</code> decorator above the method definition. It lets you call <code>obj.fahrenheit</code> without parentheses.`,
      solution:`class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @property
    def fahrenheit(self):
        return self.celsius * 9/5 + 32

    def __str__(self):
        return f"{self.celsius}°C"

    def __repr__(self):
        return f"Temperature({self.celsius})"

    def __eq__(self, other):
        return self.celsius == other.celsius

body = Temperature(36.6)
print(body)               # 36.6°C
print(body.fahrenheit)    # 97.88
print(body == Temperature(36.6))   # True
print(body == Temperature(37.0))   # False` }
  ]
};

L['python-w5-l3'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>Inheritance — Building on What Exists</h2>
<p>Inheritance lets one class <em>extend</em> another. The child class (subclass) gets all the attributes and methods of the parent class (superclass) for free, and can add or override anything it needs.</p>
<p>Real-world analogy: a <em>SavingsAccount</em> is a type of <em>BankAccount</em>. It has everything a bank account has (owner, balance, deposit, withdraw) plus something extra (interest rate). Instead of rewriting the whole thing, you inherit.</p>
`},
    { type:'code', src:`class Animal:
    def __init__(self, name, sound):
        self.name  = name
        self.sound = sound

    def speak(self):
        print(f"{self.name} says {self.sound}!")

    def __str__(self):
        return f"Animal({self.name})"

class Dog(Animal):          # Dog inherits from Animal
    def fetch(self, item):
        print(f"{self.name} fetches the {item}!")

class Cat(Animal):          # Cat inherits from Animal
    def purr(self):
        print(f"{self.name} purrs contentedly.")

dog = Dog("Bruno", "Woof")
cat = Cat("Milo",  "Meow")

dog.speak()    # inherited from Animal
dog.fetch("ball")
cat.speak()    # inherited from Animal
cat.purr()`,
      out:`Bruno says Woof!
Bruno fetches the ball!
Milo says Meow!
Milo purrs contentedly.` },
    { type:'text', body:`<h3>super() — calling the parent's method</h3>
<p>When the child class needs to <em>extend</em> the parent's <code>__init__</code> rather than replace it, use <code>super()</code>. It gives you a proxy to the parent class:</p>`},
    { type:'code', src:`class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner   = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def __str__(self):
        return f"{self.owner}: ₹{self.balance:,.0f}"

class SavingsAccount(BankAccount):
    def __init__(self, owner, balance=0, interest_rate=0.04):
        super().__init__(owner, balance)   # run parent's __init__ first
        self.interest_rate = interest_rate

    def apply_interest(self):
        interest = self.balance * self.interest_rate
        self.balance += interest
        print(f"Interest added: ₹{interest:,.2f}")

    def __str__(self):
        base = super().__str__()   # reuse parent's __str__
        return f"{base} (rate {self.interest_rate*100:.1f}%)"

class CurrentAccount(BankAccount):
    def __init__(self, owner, balance=0, overdraft_limit=5000):
        super().__init__(owner, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):   # override parent's withdraw
        if amount > self.balance + self.overdraft_limit:
            print("Exceeds overdraft limit!")
        else:
            self.balance -= amount
            print(f"Withdrew ₹{amount:,}. Balance: ₹{self.balance:,}")

savings = SavingsAccount("Ananya", 100000, 0.05)
savings.deposit(50000)
savings.apply_interest()
print(savings)

current = CurrentAccount("Bala", 2000, 8000)
current.withdraw(9000)   # 9000 ≤ 2000 + 8000 → allowed
current.withdraw(2000)   # now balance -7000, next would exceed limit`,
      out:`Interest added: ₹7,500.00
Ananya: ₹1,57,500 (rate 5.0%)
Withdrew ₹9,000. Balance: ₹-7,000
Exceeds overdraft limit!` },
    { type:'tip', body:`Always call <code>super().__init__()</code> first in a child's <code>__init__</code>. The parent may set up attributes that the child's own code depends on.` },
    { type:'text', body:`
<h3>isinstance() and issubclass()</h3>
<p>Python lets you check object lineage at runtime:</p>
`},
    { type:'code', src:`savings = SavingsAccount("Priya", 50000)

print(isinstance(savings, SavingsAccount))  # True
print(isinstance(savings, BankAccount))     # True  — it IS a BankAccount
print(isinstance(savings, CurrentAccount))  # False

print(issubclass(SavingsAccount, BankAccount))  # True
print(issubclass(BankAccount, SavingsAccount))  # False`,
      out:`True
True
False
True
False` },
    { type:'exercise', title:'Employee Hierarchy',
      body:`<p>Create a class hierarchy for employees:</p>
<ul>
<li><code>Employee(name, base_salary)</code> — has a <code>monthly_pay()</code> method returning <code>base_salary</code> and a <code>__str__</code></li>
<li><code>Manager(name, base_salary, bonus)</code> — inherits Employee; <code>monthly_pay()</code> returns <code>base_salary + bonus</code></li>
<li><code>Intern(name, stipend)</code> — inherits Employee; <code>monthly_pay()</code> returns <code>stipend</code></li>
</ul>
<p>Create one of each, call <code>monthly_pay()</code> on all three, and use <code>isinstance</code> to confirm the Manager is also an Employee.</p>`,
      hint:`Manager and Intern both call <code>super().__init__()</code>. Intern can pass <code>stipend</code> as <code>base_salary</code> to the parent. Override <code>monthly_pay()</code> in each subclass as needed.`,
      solution:`class Employee:
    def __init__(self, name, base_salary):
        self.name        = name
        self.base_salary = base_salary

    def monthly_pay(self):
        return self.base_salary

    def __str__(self):
        return f"{self.name} — ₹{self.monthly_pay():,}/month"

class Manager(Employee):
    def __init__(self, name, base_salary, bonus):
        super().__init__(name, base_salary)
        self.bonus = bonus

    def monthly_pay(self):
        return self.base_salary + self.bonus

class Intern(Employee):
    def __init__(self, name, stipend):
        super().__init__(name, stipend)

    def monthly_pay(self):
        return self.base_salary   # base_salary holds the stipend

emp  = Employee("Chitra",  60000)
mgr  = Manager("Dev",      80000, 20000)
intern = Intern("Esha",    15000)

for person in [emp, mgr, intern]:
    print(person)

print(isinstance(mgr, Employee))   # True` }
  ]
};

L['python-w5-l4'] = {
  duration_mins: 12,
  sections: [
    { type:'text', body:`
<h2>Encapsulation &amp; Polymorphism</h2>
<h3>Encapsulation — protecting your data</h3>
<p>Encapsulation means keeping the internal details of an object hidden from the outside world, exposing only what's needed. Python uses naming conventions rather than hard access restrictions:</p>
<ul>
<li><code>_name</code> — single underscore: "by convention, treat as private — don't access from outside"</li>
<li><code>__name</code> — double underscore: Python <em>name-mangles</em> this to <code>_ClassName__name</code>, making accidental access harder</li>
</ul>
`},
    { type:'code', src:`class BankAccount:
    def __init__(self, owner, pin, balance=0):
        self.owner    = owner          # public
        self._balance = balance        # "private" by convention
        self.__pin    = pin            # name-mangled

    def check_balance(self, pin):
        if pin == self.__pin:
            return self._balance
        raise PermissionError("Wrong PIN")

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("Balance cannot be negative")
        self._balance = value

acc = BankAccount("Priya", pin=1234, balance=50000)

print(acc.balance)                  # via property — clean access
print(acc.check_balance(1234))      # 50000

acc.balance = 60000                 # uses setter
print(acc.balance)                  # 60000

# acc.__pin would raise AttributeError
# acc._BankAccount__pin works but is considered rude`,
      out:`50000
50000
60000` },
    { type:'tip', body:`Use <code>@property</code> to expose computed or validated read access to "private" attributes. Use <code>@x.setter</code> to validate before setting. This is Python's preferred approach over Java-style getters and setters.` },
    { type:'text', body:`
<h3>Polymorphism — one interface, many forms</h3>
<p>Polymorphism means different objects respond to the <em>same method name</em> in different ways. It's what makes code flexible — you can write a function that works with <em>any</em> object that has the right method, regardless of its exact type.</p>
`},
    { type:'code', src:`class Shape:
    def area(self):
        raise NotImplementedError("Subclass must implement area()")

    def describe(self):
        print(f"I am a {type(self).__name__} with area {self.area():.2f}")

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        import math
        return math.pi * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w, self.h = w, h
    def area(self):
        return self.w * self.h

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height
    def area(self):
        return 0.5 * self.base * self.height

shapes = [Circle(5), Rectangle(4, 6), Triangle(8, 3)]

for shape in shapes:
    shape.describe()   # same call, different behaviour

total = sum(s.area() for s in shapes)
print(f"Total area: {total:.2f}")`,
      out:`I am a Circle with area 78.54
I am a Rectangle with area 24.00
I am a Triangle with area 12.00
Total area: 114.54` },
    { type:'text', body:`<h3>Duck typing — "if it quacks like a duck…"</h3>
<p>Python doesn't require formal inheritance for polymorphism. Any object with the right method works:</p>`},
    { type:'code', src:`class PDFReport:
    def export(self):
        return "Exporting as PDF..."

class ExcelReport:
    def export(self):
        return "Exporting as Excel spreadsheet..."

class EmailReport:
    def export(self):
        return "Sending via email..."

def generate_reports(report_list):
    for report in report_list:
        print(report.export())   # works with ANY object that has export()

reports = [PDFReport(), ExcelReport(), EmailReport()]
generate_reports(reports)`,
      out:`Exporting as PDF...
Exporting as Excel spreadsheet...
Sending via email...` },
    { type:'exercise', title:'Data Pipeline with Polymorphism',
      body:`<p>Design a polymorphic data processing pipeline. Create:</p>
<ol>
<li>A base class <code>DataSource</code> with abstract methods: <code>load() -> list</code> and <code>describe() -> str</code> (both raise <code>NotImplementedError</code>)</li>
<li>Two subclasses: <code>InMemorySource(data)</code> that wraps a list, and <code>FilteredSource(source, predicate)</code> that wraps any source and filters its output</li>
<li>A <code>Pipeline</code> class accepting any <code>DataSource</code>, with chainable <code>filter(fn)</code>, <code>transform(fn)</code>, and <code>summary()</code> methods</li>
<li>Show that the same Pipeline code works identically with either source — demonstrating polymorphism</li>
</ol>`,
      hint:`<code>filter</code> and <code>transform</code> update <code>self._data</code> and return <code>self</code>. <code>FilteredSource.load()</code> calls <code>self._inner.load()</code> then filters the result.`,
      solution:`class DataSource:
    def load(self) -> list:
        raise NotImplementedError
    def describe(self) -> str:
        raise NotImplementedError

class InMemorySource(DataSource):
    def __init__(self, data: list):
        self._data = data
    def load(self) -> list:
        return list(self._data)
    def describe(self) -> str:
        return f"InMemorySource({len(self._data)} records)"

class FilteredSource(DataSource):
    def __init__(self, inner: DataSource, predicate):
        self._inner     = inner
        self._predicate = predicate
    def load(self) -> list:
        return [r for r in self._inner.load() if self._predicate(r)]
    def describe(self) -> str:
        return f"FilteredSource(wraps {self._inner.describe()})"

class Pipeline:
    def __init__(self, source: DataSource):
        self._data = source.load()
        print(f"Loaded: {source.describe()} → {len(self._data)} records")

    def filter(self, fn):
        self._data = [r for r in self._data if fn(r)]
        return self

    def transform(self, fn):
        self._data = [fn(r) for r in self._data]
        return self

    def summary(self):
        print(f"Records remaining: {len(self._data)}")
        for r in self._data[:3]:
            print(f"  {r}")

students = [
    {"name": "Priya",  "score": 92, "city": "Mumbai"},
    {"name": "Rajan",  "score": 78, "city": "Delhi"},
    {"name": "Ananya", "score": 85, "city": "Bengaluru"},
    {"name": "Bala",   "score": 45, "city": "Chennai"},
    {"name": "Chitra", "score": 91, "city": "Mumbai"},
]

# Same pipeline, two different sources — polymorphism in action
for source in [
    InMemorySource(students),
    FilteredSource(InMemorySource(students), lambda r: r["city"] == "Mumbai"),
]:
    (Pipeline(source)
        .filter(lambda r: r["score"] >= 75)
        .transform(lambda r: {**r, "grade": "A" if r["score"]>=90 else "B"})
        .summary())` }
  ]
};

L['python-w5-l5'] = {
  duration_mins: 12,
  sections: [
    { type:'text', body:`
<h2>Mini-Project — Library Management System</h2>
<p>You've learned classes, inheritance, special methods, encapsulation, and polymorphism. Now let's put them all together in a coherent mini-project: a command-line library catalogue.</p>
<p>The system will manage books and members, track loans, and demonstrate every OOP concept from this week in a single cohesive program. Read it carefully — every design choice has a reason behind it.</p>
`},
    { type:'code', src:`from datetime import date, timedelta

class Book:
    def __init__(self, isbn, title, author, copies=1):
        self.isbn    = isbn
        self.title   = title
        self.author  = author
        self._copies = copies   # total copies
        self._loans  = 0        # currently loaned out

    @property
    def available(self):
        return self._copies - self._loans

    def checkout(self):
        if self.available == 0:
            raise RuntimeError(f"'{self.title}' is not available")
        self._loans += 1

    def return_book(self):
        if self._loans == 0:
            raise RuntimeError("No loans to return")
        self._loans -= 1

    def __str__(self):
        return f"[{self.isbn}] {self.title} by {self.author} ({self.available}/{self._copies} available)"

    def __repr__(self):
        return f"Book(isbn={self.isbn!r}, title={self.title!r})"


class Member:
    MAX_LOANS = 3

    def __init__(self, member_id, name, email):
        self.member_id = member_id
        self.name      = name
        self.email     = email
        self._loans    = {}   # isbn → due_date

    def borrow(self, book, days=14):
        if len(self._loans) >= self.MAX_LOANS:
            raise RuntimeError(f"{self.name} has reached the loan limit")
        book.checkout()
        due = date.today() + timedelta(days=days)
        self._loans[book.isbn] = due
        print(f"'{book.title}' borrowed by {self.name}. Due: {due}")

    def return_book(self, book):
        if book.isbn not in self._loans:
            raise RuntimeError(f"{self.name} did not borrow this book")
        book.return_book()
        del self._loans[book.isbn]
        print(f"'{book.title}' returned by {self.name}.")

    def overdue_books(self):
        today = date.today()
        return {isbn: due for isbn, due in self._loans.items() if due < today}

    def __str__(self):
        return f"Member({self.member_id}: {self.name}, loans={len(self._loans)})"


class Library:
    def __init__(self, name):
        self.name    = name
        self._books  = {}   # isbn → Book
        self._members = {}  # member_id → Member

    def add_book(self, book):
        self._books[book.isbn] = book
        print(f"Added: {book}")

    def register_member(self, member):
        self._members[member.member_id] = member
        print(f"Registered: {member.name}")

    def search(self, query):
        query = query.lower()
        results = [b for b in self._books.values()
                   if query in b.title.lower() or query in b.author.lower()]
        return results

    def catalogue(self):
        print(f"\\n{'─'*60}")
        print(f"  {self.name} — {len(self._books)} books")
        print(f"{'─'*60}")
        for book in self._books.values():
            print(f"  {book}")
        print(f"{'─'*60}\\n")


# ── Demo ─────────────────────────────────────────────────────
lib = Library("DSA Learning Library")

b1 = Book("978-0-13-468599-1", "Clean Code",          "Robert Martin", copies=2)
b2 = Book("978-0-13-110362-7", "The Pragmatic Programmer", "Hunt & Thomas")
b3 = Book("978-1-49-195016-0", "Python Crash Course", "Eric Matthes",  copies=3)

lib.add_book(b1)
lib.add_book(b2)
lib.add_book(b3)

m1 = Member("M001", "Priya Sharma",  "priya@dsa.com")
m2 = Member("M002", "Rajan Kumar",   "rajan@dsa.com")

lib.register_member(m1)
lib.register_member(m2)

lib.catalogue()

m1.borrow(b1)
m1.borrow(b3)
m2.borrow(b1)   # second copy
m2.borrow(b3)

lib.catalogue()  # shows reduced availability

m1.return_book(b1)
lib.catalogue()  # b1 back to 2 available`,
      out:`Added: [978-0-13-468599-1] Clean Code by Robert Martin (2/2 available)
Added: [978-0-13-110362-7] The Pragmatic Programmer by Hunt & Thomas (1/1 available)
Added: [978-1-49-195016-0] Python Crash Course by Eric Matthes (3/3 available)
Registered: Priya Sharma
Registered: Rajan Kumar

────────────────────────────────────────────────────────────
  DSA Learning Library — 3 books
────────────────────────────────────────────────────────────
  [978-0-13-468599-1] Clean Code by Robert Martin (2/2 available)
  [978-0-13-110362-7] The Pragmatic Programmer by Hunt & Thomas (1/1 available)
  [978-1-49-195016-0] Python Crash Course by Eric Matthes (3/3 available)
────────────────────────────────────────────────────────────

'Clean Code' borrowed by Priya Sharma. Due: 2024-08-15
'Python Crash Course' borrowed by Priya Sharma. Due: 2024-08-15
'Clean Code' borrowed by Rajan Kumar. Due: 2024-08-15
'Python Crash Course' borrowed by Rajan Kumar. Due: 2024-08-15
...` },
    { type:'tip', body:`Notice how <code>Member.borrow()</code> delegates to <code>Book.checkout()</code> — each class is responsible for managing its own state. This separation of concerns is the heart of good OOP design.` },
    { type:'exercise', title:'Extend the Library',
      body:`<p>Add a <code>PremiumMember</code> class that inherits from <code>Member</code> with <code>MAX_LOANS = 6</code> and a 30-day loan period by default. Also add a <code>Library.report()</code> method that prints total books, total members, and how many books are currently on loan across all members.</p>`,
      hint:`Override <code>MAX_LOANS</code> as a class variable. For the default loan period, override <code>borrow(self, book, days=30)</code>. For the report, iterate <code>self._members.values()</code> and sum <code>len(m._loans)</code>.`,
      solution:`class PremiumMember(Member):
    MAX_LOANS = 6

    def borrow(self, book, days=30):   # 30-day default
        super().borrow(book, days)

# In Library class:
def report(self):
    total_on_loan = sum(len(m._loans) for m in self._members.values())
    print(f"Books in catalogue: {len(self._books)}")
    print(f"Registered members: {len(self._members)}")
    print(f"Books currently on loan: {total_on_loan}")` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 6 — FILES, EXCEPTIONS & CONTEXT MANAGERS
══════════════════════════════════════════════════════════════════════════ */

L['python-w6-l1'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>Reading &amp; Writing Files</h2>
<p>Every real program interacts with the file system — reading configuration, writing logs, loading data. Python's built-in <code>open()</code> function gives you full control over files.</p>
<h3>The open() function</h3>
<p><code>open(filename, mode)</code> returns a <em>file object</em>. The mode controls what you can do:</p>
<table style="width:100%;border-collapse:collapse;margin:1rem 0">
<tr style="background:var(--fog2)"><th style="padding:.4rem .8rem;text-align:left">Mode</th><th style="padding:.4rem .8rem;text-align:left">Meaning</th><th style="padding:.4rem .8rem;text-align:left">File must exist?</th></tr>
<tr><td style="padding:.4rem .8rem"><code>'r'</code></td><td style="padding:.4rem .8rem">Read (default)</td><td style="padding:.4rem .8rem">Yes</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><code>'w'</code></td><td style="padding:.4rem .8rem">Write (overwrites)</td><td style="padding:.4rem .8rem">No — creates it</td></tr>
<tr><td style="padding:.4rem .8rem"><code>'a'</code></td><td style="padding:.4rem .8rem">Append</td><td style="padding:.4rem .8rem">No — creates it</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><code>'r+'</code></td><td style="padding:.4rem .8rem">Read + Write</td><td style="padding:.4rem .8rem">Yes</td></tr>
<tr><td style="padding:.4rem .8rem"><code>'rb'</code> / <code>'wb'</code></td><td style="padding:.4rem .8rem">Binary mode</td><td style="padding:.4rem .8rem">Varies</td></tr>
</table>
`},
    { type:'code', src:`# ── Writing a file ────────────────────────────────────────
f = open("students.txt", "w", encoding="utf-8")
f.write("Priya Sharma,Python,92\\n")
f.write("Rajan Kumar,SQL,85\\n")
f.write("Ananya Reddy,ML,88\\n")
f.close()

# ── Reading the entire file at once ───────────────────────
f = open("students.txt", "r", encoding="utf-8")
content = f.read()
f.close()
print(content)`,
      out:`Priya Sharma,Python,92
Rajan Kumar,SQL,85
Ananya Reddy,ML,88` },
    { type:'warn', body:`Always call <code>f.close()</code> after you're done — or better yet, use a <code>with</code> statement (covered in lesson 6-5) which closes the file automatically even if an error occurs.` },
    { type:'text', body:`<h3>Reading line by line</h3>
<p>For large files, reading everything at once wastes memory. Iterate over the file object instead — Python loads one line at a time:</p>`},
    { type:'code', src:`with open("students.txt", "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()   # remove trailing newline
        name, course, score = line.split(",")
        print(f"{name:20} | {course:10} | Score: {score}")`,
      out:`Priya Sharma         | Python     | Score: 92
Rajan Kumar          | SQL        | Score: 85
Ananya Reddy         | ML         | Score: 88` },
    { type:'text', body:`<h3>Appending to an existing file</h3>`},
    { type:'code', src:`with open("students.txt", "a", encoding="utf-8") as f:
    f.write("Bala Subramanian,Python,79\\n")

# Verify the file now has 4 lines
with open("students.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()   # returns a list, one element per line
    print(f"Total students: {len(lines)}")
    for line in lines:
        print(line, end="")`,
      out:`Total students: 4
Priya Sharma,Python,92
Rajan Kumar,SQL,85
Ananya Reddy,ML,88
Bala Subramanian,Python,79` },
    { type:'text', body:`<h3>Writing structured reports</h3>
<p>Often you want to generate a readable report file. f-strings inside <code>write()</code> calls make this clean:</p>`},
    { type:'code', src:`students = [
    ("Priya Sharma",      "Python", 92),
    ("Rajan Kumar",       "SQL",    85),
    ("Ananya Reddy",      "ML",     88),
    ("Bala Subramanian",  "Python", 79),
]

with open("report.txt", "w", encoding="utf-8") as f:
    f.write("=" * 50 + "\\n")
    f.write("  DSA Student Report\\n")
    f.write("=" * 50 + "\\n")
    for name, course, score in students:
        grade = "A" if score >= 90 else "B" if score >= 80 else "C"
        f.write(f"  {name:<22} {course:<10} {score:>3}  ({grade})\\n")
    f.write("=" * 50 + "\\n")
    avg = sum(s for _, _, s in students) / len(students)
    f.write(f"  Class average: {avg:.1f}\\n")

# Print what we just wrote
with open("report.txt") as f:
    print(f.read())`,
      out:`==================================================
  DSA Student Report
==================================================
  Priya Sharma           Python      92  (A)
  Rajan Kumar            SQL         85  (B)
  Ananya Reddy           ML          88  (B)
  Bala Subramanian       Python      79  (C)
==================================================
  Class average: 86.0` },
    { type:'text', body:`
<h3>pathlib — the modern way to handle file paths</h3>
<p>The old <code>os.path</code> approach works, but <code>pathlib.Path</code> (Python 3.4+) is cleaner, more readable, and cross-platform. Use it for all new code:</p>
`},
    { type:'code', src:`from pathlib import Path

# Create Path objects — works on Windows and Mac/Linux automatically
data_dir  = Path("data")
report    = Path("reports") / "weekly" / "report.txt"  # / joins paths

# Check existence
print(report.exists())          # False (doesn't exist yet)
print(report.parent)            # reports/weekly
print(report.name)              # report.txt
print(report.stem)              # report
print(report.suffix)            # .txt

# Create directories (like mkdir -p)
data_dir.mkdir(parents=True, exist_ok=True)
(Path("reports") / "weekly").mkdir(parents=True, exist_ok=True)

# Write and read using Path directly (no open() needed!)
report.write_text("Sales: ₹1,23,456\\nUnits: 142\\n", encoding="utf-8")
content = report.read_text(encoding="utf-8")
print(content)

# List all CSV files in a directory
for csv_file in data_dir.glob("*.csv"):
    print(f"Found: {csv_file.name}  size={csv_file.stat().st_size} bytes")`,
      out:`False
reports/weekly
report.txt
report
.txt
Sales: ₹1,23,456
Units: 142` },
    { type:'tip', body:`Always use <code>pathlib.Path</code> instead of string concatenation for file paths. <code>"data/" + filename</code> breaks on Windows (backslashes). <code>Path("data") / filename</code> works everywhere. It's also more readable — <code>path.stem</code>, <code>path.suffix</code>, <code>path.parent</code> replace cryptic <code>os.path.splitext()</code> calls.` },
    { type:'exercise', title:'File System Organiser',
      body:`<p>Write a program that simulates a data project file organiser:</p>
<ol>
<li>Create this directory structure using <code>pathlib</code>: <code>project/data/raw/</code>, <code>project/data/processed/</code>, <code>project/reports/</code>, <code>project/models/</code></li>
<li>Create 3 fake CSV files in <code>data/raw/</code> (write a header line + 2 data rows to each)</li>
<li>Write a function <code>scan_project(root_dir)</code> that prints a summary of the project: each subdirectory, the number of files in it, and their names and sizes</li>
<li>Write a <code>project/README.txt</code> summarising what you found</li>
</ol>`,
      hint:`Use <code>Path.iterdir()</code> to list directory contents, <code>path.stat().st_size</code> for file size. <code>path.is_dir()</code> and <code>path.is_file()</code> distinguish types.`,
      solution:`from pathlib import Path

# 1. Create directory structure
root = Path("project")
for sub in ["data/raw", "data/processed", "reports", "models"]:
    (root / sub).mkdir(parents=True, exist_ok=True)

# 2. Create fake CSV files
for i, name in enumerate(["sales_jan", "sales_feb", "sales_mar"], 1):
    p = root / "data" / "raw" / f"{name}.csv"
    p.write_text(
        "month,region,sales,units\\n"
        f"2024-{i:02d},North,{120000+i*5000},{15+i}\\n"
        f"2024-{i:02d},South,{95000+i*3000},{12+i}\\n",
        encoding="utf-8"
    )

# 3. Scan project
def scan_project(root_dir: Path) -> str:
    lines = [f"Project: {root_dir.resolve()}\\n"]
    for subdir in sorted(root_dir.rglob("*")):
        if subdir.is_dir():
            files = list(subdir.iterdir())
            files = [f for f in files if f.is_file()]
            lines.append(f"  {subdir.relative_to(root_dir)}/  ({len(files)} files)")
            for f in files:
                lines.append(f"    {f.name}  ({f.stat().st_size} bytes)")
    return "\\n".join(lines)

summary = scan_project(root)
print(summary)

# 4. Write README
(root / "README.txt").write_text(summary, encoding="utf-8")
print("\\nREADME.txt written.")` }
  ]
};

L['python-w6-l2'] = {
  duration_mins: 15,
  sections: [
    { type:'text', body:`
<h2>Working with CSV Files</h2>
<p>CSV (Comma-Separated Values) is the most common format for exchanging tabular data. You can open a CSV in Excel, Google Sheets, or any database — making it ideal for data pipelines.</p>
<p>Python's built-in <code>csv</code> module handles all the edge cases: quoted fields, commas inside values, different delimiters. Never parse CSV manually with <code>split(',')</code>.</p>
`},
    { type:'code', src:`import csv

# ── Writing CSV ───────────────────────────────────────────
rows = [
    ["Student ID", "Name",             "Course",  "Score", "Grade"],
    ["S001",       "Priya Sharma",      "Python",  92,      "A"],
    ["S002",       "Rajan Kumar",       "SQL",     85,      "B"],
    ["S003",       "Ananya Reddy",      "ML",      88,      "B"],
    ["S004",       "Bala Subramanian",  "Python",  79,      "C"],
    ["S005",       "Chitra Nair",       "Python",  95,      "A"],
]

with open("students.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerows(rows)   # write all rows at once

print("Written students.csv")`,
      out:`Written students.csv` },
    { type:'warn', body:`Always pass <code>newline=""</code> when opening a file for CSV writing. Without it, Python's universal newline translation adds a blank line between every row on Windows.` },
    { type:'code', src:`# ── Reading CSV ───────────────────────────────────────────
import csv

with open("students.csv", "r", encoding="utf-8") as f:
    reader = csv.reader(f)
    header = next(reader)   # consume the header row
    print("Columns:", header)
    print()
    for row in reader:
        sid, name, course, score, grade = row
        print(f"{sid}  {name:<22}  {course:<8}  {score}  {grade}")`,
      out:`Columns: ['Student ID', 'Name', 'Course', 'Score', 'Grade']

S001  Priya Sharma            Python    92  A
S002  Rajan Kumar             SQL       85  B
S003  Ananya Reddy            ML        88  B
S004  Bala Subramanian        Python    79  C
S005  Chitra Nair             Python    95  A` },
    { type:'text', body:`
<h3>DictReader — accessing columns by name</h3>
<p><code>csv.DictReader</code> maps each row to a dictionary, using the header row as keys. This is much safer when the column order might change:</p>
`},
    { type:'code', src:`import csv

with open("students.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    python_students = []
    for row in reader:
        if row["Course"] == "Python":
            python_students.append(row)

print(f"Python students: {len(python_students)}")
scores = [int(r["Score"]) for r in python_students]
print(f"Average score:   {sum(scores)/len(scores):.1f}")
print(f"Top student:     {max(python_students, key=lambda r: int(r['Score']))['Name']}")`,
      out:`Python students: 3
Average score:   88.7
Top student:     Chitra Nair` },
    { type:'text', body:`<h3>DictWriter — writing rows from dictionaries</h3>`},
    { type:'code', src:`import csv

report = [
    {"Month": "Jan", "Revenue": 125000, "Students": 42},
    {"Month": "Feb", "Revenue": 148000, "Students": 51},
    {"Month": "Mar", "Revenue": 172000, "Students": 63},
    {"Month": "Apr", "Revenue": 195000, "Students": 71},
]

fieldnames = ["Month", "Revenue", "Students"]

with open("monthly_report.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(report)

# Read back and display
with open("monthly_report.csv") as f:
    print(f.read())`,
      out:`Month,Revenue,Students
Jan,125000,42
Feb,148000,51
Mar,172000,63
Apr,195000,71` },
    { type:'exercise', title:'CSV data analyser',
      body:`<p>Create a CSV file with columns <code>product, category, price, quantity</code> (at least 8 rows of made-up inventory data). Write a program that reads the CSV and prints: (1) the total inventory value (price × quantity for each row summed), (2) the average price per category, (3) the most expensive product, (4) a new CSV <code>low_stock.csv</code> containing only rows where quantity &lt; 5.</p>`,
      hint:`Use <code>DictReader</code> to read. Accumulate category totals in a dict. Convert price/quantity to float/int as you read. For low_stock.csv use <code>DictWriter</code> with the same fieldnames.`,
      solution:`import csv
from collections import defaultdict

# Create sample data
data = [
    ["product","category","price","quantity"],
    ["Laptop","Electronics","65000","8"],
    ["Mouse","Electronics","1200","3"],
    ["Desk","Furniture","18000","2"],
    ["Chair","Furniture","12000","6"],
    ["Notebook","Stationery","120","50"],
    ["Pen","Stationery","25","4"],
    ["Monitor","Electronics","28000","5"],
    ["Keyboard","Electronics","3500","1"],
]
with open("inventory.csv","w",newline="") as f:
    csv.writer(f).writerows(data)

total_value = 0
cat_totals  = defaultdict(list)
max_prod    = None
low_stock   = []

with open("inventory.csv") as f:
    for row in csv.DictReader(f):
        price = float(row["price"])
        qty   = int(row["quantity"])
        total_value += price * qty
        cat_totals[row["category"]].append(price)
        if max_prod is None or price > float(max_prod["price"]):
            max_prod = row
        if qty < 5:
            low_stock.append(row)

print(f"Total inventory value: ₹{total_value:,.0f}")
for cat, prices in cat_totals.items():
    print(f"{cat} avg price: ₹{sum(prices)/len(prices):,.0f}")
print(f"Most expensive: {max_prod['product']}")

with open("low_stock.csv","w",newline="") as f:
    w = csv.DictWriter(f, fieldnames=["product","category","price","quantity"])
    w.writeheader(); w.writerows(low_stock)
print(f"Low stock items: {len(low_stock)}")` }
  ]
};

L['python-w6-l3'] = {
  duration_mins: 12,
  sections: [
    { type:'text', body:`
<h2>JSON — Exchanging Structured Data</h2>
<p>JSON (JavaScript Object Notation) is the lingua franca of web APIs and configuration files. Python's <code>json</code> module converts between Python objects and JSON strings seamlessly.</p>
<p>The mapping is intuitive:</p>
<table style="width:100%;border-collapse:collapse;margin:1rem 0">
<tr style="background:var(--fog2)"><th style="padding:.4rem .8rem;text-align:left">Python</th><th style="padding:.4rem .8rem;text-align:left">JSON</th></tr>
<tr><td style="padding:.4rem .8rem"><code>dict</code></td><td style="padding:.4rem .8rem"><code>{}</code> object</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><code>list</code></td><td style="padding:.4rem .8rem"><code>[]</code> array</td></tr>
<tr><td style="padding:.4rem .8rem"><code>str</code></td><td style="padding:.4rem .8rem">string</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><code>int</code> / <code>float</code></td><td style="padding:.4rem .8rem">number</td></tr>
<tr><td style="padding:.4rem .8rem"><code>True</code> / <code>False</code></td><td style="padding:.4rem .8rem"><code>true</code> / <code>false</code></td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><code>None</code></td><td style="padding:.4rem .8rem"><code>null</code></td></tr>
</table>
`},
    { type:'code', src:`import json

# ── Python → JSON string ──────────────────────────────────
course = {
    "id": "PY-2024",
    "title": "Python Programming",
    "duration_weeks": 8,
    "is_free": True,
    "modules": ["Basics", "OOP", "Files", "NumPy", "Pandas"],
    "instructor": {"name": "Dr. Rao", "rating": 4.9},
    "prerequisites": None
}

json_string = json.dumps(course, indent=2)
print(json_string)`,
      out:`{
  "id": "PY-2024",
  "title": "Python Programming",
  "duration_weeks": 8,
  "is_free": true,
  "modules": [
    "Basics",
    "OOP",
    "Files",
    "NumPy",
    "Pandas"
  ],
  "instructor": {
    "name": "Dr. Rao",
    "rating": 4.9
  },
  "prerequisites": null
}` },
    { type:'code', src:`import json

# ── JSON string → Python ──────────────────────────────────
json_str = '{"name": "Priya", "score": 92, "passed": true}'
data = json.loads(json_str)

print(type(data))           # <class 'dict'>
print(data["name"])         # Priya
print(data["passed"])       # True (Python bool, not string)
print(data["score"] + 8)    # 100  (it's an int)`,
      out:`<class 'dict'>
Priya
True
100` },
    { type:'text', body:`<h3>Reading and writing JSON files</h3>`},
    { type:'code', src:`import json

# ── Write JSON to file ────────────────────────────────────
students = [
    {"id": "S001", "name": "Priya Sharma",  "scores": {"python": 92, "sql": 88}},
    {"id": "S002", "name": "Rajan Kumar",   "scores": {"python": 79, "sql": 85}},
    {"id": "S003", "name": "Ananya Reddy",  "scores": {"python": 88, "sql": 91}},
]

with open("students.json", "w", encoding="utf-8") as f:
    json.dump(students, f, indent=2, ensure_ascii=False)

# ── Read JSON from file ───────────────────────────────────
with open("students.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)

for student in loaded:
    avg = sum(student["scores"].values()) / len(student["scores"])
    print(f"{student['name']:<22}  avg: {avg:.1f}")`,
      out:`Priya Sharma            avg: 90.0
Rajan Kumar             avg: 82.0
Ananya Reddy            avg: 89.5` },
    { type:'tip', body:`Use <code>json.dumps()</code> / <code>json.loads()</code> for strings. Use <code>json.dump()</code> / <code>json.load()</code> for files. The difference: <code>dump<strong>s</strong></code> → string; <code>dump</code> → file.` },
    { type:'text', body:`<h3>A practical use case: config file</h3>
<p>JSON is excellent for application configuration — human-readable and easy to load:</p>`},
    { type:'code', src:`import json, os

CONFIG_FILE = "app_config.json"

def load_config():
    if not os.path.exists(CONFIG_FILE):
        default = {"theme": "dark", "language": "en", "max_students": 50}
        with open(CONFIG_FILE, "w") as f:
            json.dump(default, f, indent=2)
        return default
    with open(CONFIG_FILE) as f:
        return json.load(f)

def save_config(config):
    with open(CONFIG_FILE, "w") as f:
        json.dump(config, f, indent=2)

config = load_config()
print("Current config:", config)

config["theme"] = "light"
config["max_students"] = 75
save_config(config)
print("Config saved.")

# Simulate next program startup
config2 = load_config()
print("Loaded config:", config2)`,
      out:`Current config: {'theme': 'dark', 'language': 'en', 'max_students': 50}
Config saved.
Loaded config: {'theme': 'light', 'language': 'en', 'max_students': 75}` },
    { type:'exercise', title:'Student gradebook JSON',
      body:`<p>Build a gradebook that persists to JSON. Write functions: <code>add_student(name)</code>, <code>add_grade(name, subject, score)</code>, <code>report()</code> — printing each student with their average. The gradebook should load from <code>gradebook.json</code> at start and save after every modification. Test by adding 3 students with 2 grades each, then calling <code>report()</code>.</p>`,
      hint:`Keep the gradebook as a dict of <code>{name: {subject: score, ...}}</code>. Load from file at the start of each function (or once at module level). After mutations, always write back with <code>json.dump</code>.`,
      solution:`import json, os

GFILE = "gradebook.json"

def _load():
    if os.path.exists(GFILE):
        with open(GFILE) as f: return json.load(f)
    return {}

def _save(gb):
    with open(GFILE, "w") as f: json.dump(gb, f, indent=2)

def add_student(name):
    gb = _load()
    if name not in gb: gb[name] = {}
    _save(gb)

def add_grade(name, subject, score):
    gb = _load()
    gb.setdefault(name, {})[subject] = score
    _save(gb)

def report():
    gb = _load()
    for name, grades in gb.items():
        avg = sum(grades.values())/len(grades) if grades else 0
        print(f"{name}: {grades}  →  avg {avg:.1f}")

add_grade("Priya",  "Python", 92); add_grade("Priya",  "SQL", 88)
add_grade("Rajan",  "Python", 79); add_grade("Rajan",  "SQL", 85)
add_grade("Ananya", "Python", 88); add_grade("Ananya", "SQL", 91)
report()` }
  ]
};

L['python-w6-l4'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>Exception Handling — Failing Gracefully</h2>
<p>Errors are inevitable. A user types letters where you expect a number. A file doesn't exist. A network request times out. Python's exception system lets you handle these situations cleanly, without crashing your entire program.</p>
<h3>The try/except structure</h3>
`},
    { type:'code', src:`# Without exception handling — program crashes:
age = int("twenty")   # ValueError: invalid literal for int() with base 10: 'twenty'

# With exception handling — program continues:
try:
    age = int("twenty")
except ValueError:
    print("That's not a valid age. Please enter a number.")
    age = 0

print(f"Age set to: {age}")`,
      out:`That's not a valid age. Please enter a number.
Age set to: 0` },
    { type:'text', body:`<h3>Catching multiple exception types</h3>`},
    { type:'code', src:`def divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("Error: cannot divide by zero")
        return None
    except TypeError as e:
        print(f"Error: wrong type — {e}")
        return None

print(divide(10, 2))    # 5.0
print(divide(10, 0))    # Error message, returns None
print(divide(10, "2"))  # Type error message`,
      out:`5.0
Error: cannot divide by zero
None
Error: wrong type — unsupported operand type(s) for /: 'int' and 'str'
None` },
    { type:'text', body:`<h3>else and finally</h3>
<p>The full try/except structure has two optional extra clauses:</p>
<ul>
<li><code>else</code> — runs if the <code>try</code> block <strong>succeeded</strong> (no exception)</li>
<li><code>finally</code> — runs <strong>always</strong>, whether an exception occurred or not (essential for cleanup)</li>
</ul>`},
    { type:'code', src:`def read_score(filename):
    try:
        f = open(filename, "r")
        score = int(f.read().strip())
    except FileNotFoundError:
        print(f"File '{filename}' not found")
        return None
    except ValueError:
        print("File content is not a valid integer")
        return None
    else:
        print(f"Score read successfully: {score}")
        return score
    finally:
        print("(cleanup: ensuring file is closed)")
        try:
            f.close()
        except:
            pass   # f was never opened

# Test cases
read_score("no_such_file.txt")
print()`,
      out:`File 'no_such_file.txt' not found
(cleanup: ensuring file is closed)` },
    { type:'tip', body:`Use <code>else</code> for code that only makes sense when no error occurred (e.g., using the result). Keep <code>try</code> blocks small — only the specific lines that might fail, not entire functions.` },
    { type:'text', body:`<h3>Raising your own exceptions</h3>
<p>Use <code>raise</code> to signal an error in your own code. You can raise any built-in exception or create custom ones:</p>`},
    { type:'code', src:`class InsufficientFundsError(Exception):
    """Raised when a withdrawal exceeds the account balance."""
    def __init__(self, amount, balance):
        self.amount  = amount
        self.balance = balance
        super().__init__(f"Cannot withdraw ₹{amount:,}: balance is only ₹{balance:,}")

class BankAccount:
    def __init__(self, owner, balance):
        self.owner   = owner
        self.balance = balance

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self.balance:
            raise InsufficientFundsError(amount, self.balance)
        self.balance -= amount
        return amount

acc = BankAccount("Priya", 5000)

try:
    acc.withdraw(3000)
    print(f"Withdrew ₹3,000. Balance: ₹{acc.balance:,}")
    acc.withdraw(4000)   # will fail
except InsufficientFundsError as e:
    print(f"Transaction declined: {e}")
except ValueError as e:
    print(f"Invalid input: {e}")`,
      out:`Withdrew ₹3,000. Balance: ₹2,000
Transaction declined: Cannot withdraw ₹4,000: balance is only ₹2,000` },
    { type:'text', body:`<h3>A robust user-input loop</h3>
<p>Combining all of the above to build a resilient CLI prompt:</p>`},
    { type:'code', src:`def get_positive_int(prompt):
    """Keep asking until the user enters a valid positive integer."""
    while True:
        try:
            value = int(input(prompt))
            if value <= 0:
                raise ValueError("Must be positive")
            return value
        except ValueError as e:
            print(f"  Invalid: {e}. Try again.")

# In a real script you'd call this; here we simulate inputs:
inputs = ["abc", "-5", "0", "42"]
idx = 0
def input(p):
    global idx
    val = inputs[idx]; idx += 1
    print(f"{p}{val}")
    return val

result = get_positive_int("Enter number of students: ")
print(f"You entered: {result}")`,
      out:`Enter number of students: abc
  Invalid: invalid literal for int() with base 10: 'abc'. Try again.
Enter number of students: -5
  Invalid: Must be positive. Try again.
Enter number of students: 0
  Invalid: Must be positive. Try again.
Enter number of students: 42
You entered: 42` },
    { type:'exercise', title:'Safe calculator',
      body:`<p>Write a <code>Calculator</code> class with methods <code>add</code>, <code>subtract</code>, <code>multiply</code>, and <code>divide</code>. Each method should accept two arguments. <code>divide</code> should raise a custom <code>CalculationError</code> for division by zero. All methods should raise <code>TypeError</code> with a helpful message if either argument is not a number. Write tests that demonstrate both the happy path and each error case being caught gracefully.</p>`,
      hint:`Check types with <code>isinstance(x, (int, float))</code>. Create <code>CalculationError(Exception)</code>. Test each operation, wrapping calls in try/except.`,
      solution:`class CalculationError(Exception):
    pass

class Calculator:
    def _validate(self, a, b):
        if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
            raise TypeError(f"Arguments must be numbers, got {type(a).__name__} and {type(b).__name__}")

    def add(self, a, b):      self._validate(a, b); return a + b
    def subtract(self, a, b): self._validate(a, b); return a - b
    def multiply(self, a, b): self._validate(a, b); return a * b
    def divide(self, a, b):
        self._validate(a, b)
        if b == 0: raise CalculationError("Division by zero is undefined")
        return a / b

calc = Calculator()
tests = [
    lambda: calc.add(10, 5),
    lambda: calc.divide(20, 4),
    lambda: calc.divide(10, 0),
    lambda: calc.multiply("x", 3),
]
for t in tests:
    try:
        print("Result:", t())
    except CalculationError as e:
        print(f"Calc error: {e}")
    except TypeError as e:
        print(f"Type error: {e}")` }
  ]
};

L['python-w6-l5'] = {
  duration_mins: 12,
  sections: [
    { type:'text', body:`
<h2>Context Managers — Automatic Cleanup</h2>
<p>Every time you open a file, acquire a lock, or connect to a database, you have two responsibilities: use the resource and then release it. If your code crashes between the two, the resource stays locked or open — a bug called a <em>resource leak</em>.</p>
<p>Context managers solve this problem elegantly. Python guarantees that the cleanup code runs even if an exception is raised.</p>
<h3>The with statement</h3>
`},
    { type:'code', src:`# The old way — fragile if an exception occurs between open and close:
f = open("data.txt", "w")
f.write("hello")
# if an exception happened here, f.close() is never called
f.close()

# The context manager way — guaranteed cleanup:
with open("data.txt", "w") as f:
    f.write("hello")
# f.close() is ALWAYS called here, even if write() raised an exception

# You can open multiple files in one with statement:
with open("input.txt", "r") as src, open("output.txt", "w") as dst:
    for line in src:
        dst.write(line.upper())` },
    { type:'text', body:`<h3>How it works: __enter__ and __exit__</h3>
<p>Any class that implements <code>__enter__</code> and <code>__exit__</code> can be used as a context manager. The <code>with</code> statement calls <code>__enter__</code> on entry and <code>__exit__</code> on exit (regardless of success or failure).</p>`},
    { type:'code', src:`class Timer:
    """Context manager that times a block of code."""
    import time

    def __enter__(self):
        self._start = __import__('time').time()
        return self   # the value bound to 'as' variable

    def __exit__(self, exc_type, exc_val, exc_tb):
        elapsed = __import__('time').time() - self._start
        print(f"Elapsed: {elapsed:.4f}s")
        return False  # False = don't suppress exceptions

with Timer() as t:
    total = sum(i**2 for i in range(1_000_000))
    print(f"Sum of squares: {total:,}")`,
      out:`Sum of squares: 333,332,833,333,500,000
Elapsed: 0.0842s` },
    { type:'tip', body:`The three arguments to <code>__exit__</code> describe any exception that occurred: type, value, and traceback. Return <code>True</code> to suppress the exception (rare), <code>False</code> to let it propagate (almost always what you want).` },
    { type:'text', body:`<h3>contextlib.contextmanager — the easy way</h3>
<p>Writing a full class just to get a context manager is verbose. The <code>contextlib.contextmanager</code> decorator lets you write one with a generator function:</p>`},
    { type:'code', src:`from contextlib import contextmanager
import json, os

@contextmanager
def atomic_write(filepath):
    """Write to a temp file, then rename — ensures the target file
    is never left in a half-written state if an error occurs."""
    tmp = filepath + ".tmp"
    try:
        with open(tmp, "w", encoding="utf-8") as f:
            yield f          # execution pauses here while the 'with' block runs
        os.replace(tmp, filepath)   # atomic rename
        print(f"Saved {filepath} safely.")
    except Exception as e:
        if os.path.exists(tmp):
            os.remove(tmp)
        print(f"Write failed: {e}. Original file untouched.")
        raise

data = {"scores": [92, 85, 88, 79], "average": 86.0}

with atomic_write("scores.json") as f:
    json.dump(data, f, indent=2)`,
      out:`Saved scores.json safely.` },
    { type:'text', body:`<h3>A database connection context manager</h3>
<p>This pattern is used in nearly every Python web framework:</p>`},
    { type:'code', src:`from contextlib import contextmanager

class FakeDatabase:
    """Simulates a database connection."""
    def connect(self):    print("  [DB] Connection opened")
    def disconnect(self): print("  [DB] Connection closed")
    def query(self, sql): return f"Results for: {sql}"

@contextmanager
def db_connection(database):
    conn = database
    conn.connect()
    try:
        yield conn
    finally:
        conn.disconnect()  # always runs

db = FakeDatabase()

with db_connection(db) as conn:
    result = conn.query("SELECT * FROM students")
    print(f"  Got: {result}")

print("Connection is closed now — done safely")`,
      out:`  [DB] Connection opened
  Got: Results for: SELECT * FROM students
  [DB] Connection closed
Connection is closed now — done safely` },
    { type:'exercise', title:'Logging context manager',
      body:`<p>Create a context manager <code>log_operation(name)</code> using <code>@contextmanager</code>. It should: print <code>"Starting: {name}"</code> before the block, print <code>"Completed: {name} in {elapsed:.3f}s"</code> after success, and print <code>"FAILED: {name} — {error}"</code> if an exception occurs (then re-raise). Test it by wrapping a successful operation (summing a large range) and a failing operation (dividing by zero).</p>`,
      hint:`Use <code>time.time()</code> before <code>yield</code> and after. Wrap the <code>yield</code> in a try/except to catch exceptions, then re-raise with <code>raise</code>.`,
      solution:`from contextlib import contextmanager
import time

@contextmanager
def log_operation(name):
    print(f"Starting: {name}")
    start = time.time()
    try:
        yield
        elapsed = time.time() - start
        print(f"Completed: {name} in {elapsed:.3f}s")
    except Exception as e:
        print(f"FAILED: {name} — {e}")
        raise

with log_operation("sum large range"):
    result = sum(range(10_000_000))
    print(f"  sum = {result:,}")

try:
    with log_operation("divide by zero"):
        x = 1 / 0
except ZeroDivisionError:
    print("Caught the re-raised exception outside.")` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 7 — NUMPY & PANDAS
══════════════════════════════════════════════════════════════════════════ */

L['python-w7-l1'] = {
  duration_mins: 20,
  sections: [
    { type:'text', body:`
<h2>NumPy Arrays — The Engine of Scientific Python</h2>
<p>NumPy is the foundation of data science in Python. Nearly every library you'll encounter — Pandas, scikit-learn, TensorFlow — is built on top of it. Understanding NumPy arrays will make everything else click.</p>
<p>The key insight: Python lists are <em>flexible but slow</em>. A list can hold anything (integers, strings, objects, mixed types) but that flexibility costs performance. A NumPy <strong>ndarray</strong> holds one fixed type — and that constraint enables C-speed computation on millions of values in milliseconds.</p>
<h3>Installing and importing NumPy</h3>
<pre style="background:var(--fog2);padding:.5rem 1rem;border-radius:.4rem;font-family:monospace">pip install numpy</pre>
`},
    { type:'code', src:`import numpy as np

# Creating arrays from Python lists
a = np.array([1, 2, 3, 4, 5])
b = np.array([10.5, 20.1, 30.8, 40.0, 50.3])

print(a)
print(b)
print(f"dtype of a: {a.dtype}")   # int64
print(f"dtype of b: {b.dtype}")   # float64
print(f"shape:      {a.shape}")   # (5,) → 1-D, 5 elements
print(f"size:       {a.size}")    # 5 elements total`,
      out:`[1 2 3 4 5]
[10.5 20.1 30.8 40.  50.3]
dtype of a: int64
dtype of b: float64
shape:      (5,)
size:       5` },
    { type:'text', body:`<h3>2-D arrays (matrices)</h3>`},
    { type:'code', src:`import numpy as np

# 2-D array — matrix of student scores (rows=students, cols=subjects)
scores = np.array([
    [85, 92, 78, 90],   # Priya:  Python, SQL, ML, Stats
    [79, 85, 88, 82],   # Rajan
    [91, 88, 95, 89],   # Ananya
    [72, 76, 80, 74],   # Bala
])

print("Shape:", scores.shape)    # (4, 4) — 4 rows, 4 columns
print("Dims: ", scores.ndim)     # 2
print("Size: ", scores.size)     # 16 total elements
print()
print("Row 0 (Priya's scores):", scores[0])
print("Col 1 (SQL scores):    ", scores[:, 1])
print("Top-left 2×2:\\n", scores[:2, :2])`,
      out:`Shape: (4, 4)
Dims:  2
Size:  16

Row 0 (Priya's scores): [85 92 78 90]
Col 1 (SQL scores):     [92 85 88 76]
Top-left 2×2:
 [[85 92]
 [79 85]]` },
    { type:'text', body:`<h3>Array creation functions</h3>
<p>NumPy provides many ways to create arrays without typing every value:</p>`},
    { type:'code', src:`import numpy as np

print(np.zeros((3, 4)))          # 3×4 matrix of zeros
print()
print(np.ones((2, 3)))           # 2×3 matrix of ones
print()
print(np.arange(0, 20, 3))      # like range() but returns an array: [0,3,6,9,12,15,18]
print()
print(np.linspace(0, 1, 6))     # 6 evenly spaced points between 0 and 1
print()
np.random.seed(42)
print(np.random.randint(60, 100, size=(3, 4)))  # 3×4 matrix of random ints`,
      out:`[[0. 0. 0. 0.]
 [0. 0. 0. 0.]
 [0. 0. 0. 0.]]

[[1. 1. 1.]
 [1. 1. 1.]]

[ 0  3  6  9 12 15 18]

[0.  0.2 0.4 0.6 0.8 1. ]

[[82 96 60 80]
 [73 95 88 72]
 [91 73 66 97]]` },
    { type:'text', body:`<h3>Vectorised operations — no loops needed</h3>
<p>This is the whole point. Instead of writing a Python for-loop to apply an operation to each element, NumPy applies it to the entire array at once using optimised C code:</p>`},
    { type:'code', src:`import numpy as np

prices = np.array([1200, 3500, 28000, 65000, 1800])  # product prices in ₹

# Apply 18% GST — one operation, entire array:
with_gst = prices * 1.18
print("With GST:    ", with_gst)

# 10% discount on everything over ₹10,000:
discount_mask = prices > 10000
discounted = np.where(discount_mask, prices * 0.90, prices)
print("Discounted:  ", discounted)

# Statistics — all built in:
print(f"Mean:   ₹{prices.mean():,.0f}")
print(f"Median: ₹{np.median(prices):,.0f}")
print(f"Std:    ₹{prices.std():,.0f}")
print(f"Min:    ₹{prices.min():,}  Max: ₹{prices.max():,}")`,
      out:`With GST:     [  1416.   4130.  33040.  76700.   2124.]
Discounted:   [ 1200.  3500. 25200. 58500.  1800.]
Mean:   ₹20,100
Median: ₹3,500
Std:    ₹24,428
Min:    ₹1,200  Max: ₹65,000` },
    { type:'tip', body:`NumPy's vectorised operations are typically 10–100× faster than Python for-loops. When working with arrays of numbers, <strong>always</strong> reach for NumPy operations rather than loops.` },
    { type:'exercise', title:'Student grade analytics',
      body:`<p>You have scores for 6 students across 5 subjects stored as a 6×5 NumPy array (generate with <code>np.random.seed(7); np.random.randint(50, 100, (6, 5))</code>). Compute: (1) each student's average score, (2) each subject's average, (3) the student with the highest overall average, (4) how many students scored above 80 in at least 3 subjects.</p>`,
      hint:`<code>scores.mean(axis=1)</code> averages across columns (per student). <code>scores.mean(axis=0)</code> averages across rows (per subject). Use <code>np.argmax()</code> for the top student. For condition 4: <code>(scores > 80).sum(axis=1)</code> gives how many subjects each student passed.`,
      solution:`import numpy as np

np.random.seed(7)
scores = np.random.randint(50, 100, (6, 5))
students = ["Priya","Rajan","Ananya","Bala","Chitra","Dev"]
subjects = ["Python","SQL","ML","Stats","Viz"]

student_avgs = scores.mean(axis=1)
subject_avgs = scores.mean(axis=0)

print("Student averages:")
for name, avg in zip(students, student_avgs):
    print(f"  {name:<8} {avg:.1f}")

print("\\nSubject averages:")
for sub, avg in zip(subjects, subject_avgs):
    print(f"  {sub:<8} {avg:.1f}")

top_idx = np.argmax(student_avgs)
print(f"\\nTop student: {students[top_idx]} ({student_avgs[top_idx]:.1f})")

above_80 = (scores > 80).sum(axis=1)
strong = (above_80 >= 3).sum()
print(f"Students scoring >80 in ≥3 subjects: {strong}")` }
  ]
};

L['python-w7-l2'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>Broadcasting &amp; Vectorisation</h2>
<p>Broadcasting is NumPy's way of performing arithmetic between arrays of <em>different shapes</em> without copying data. It's one of NumPy's most powerful features — and the source of many confusing bugs if you don't understand it.</p>
<h3>The simple case: scalar and array</h3>
`},
    { type:'code', src:`import numpy as np

temps_celsius = np.array([0, 20, 37, 100])

# Scalar broadcasts to every element:
temps_fahrenheit = temps_celsius * 9/5 + 32
print("Fahrenheit:", temps_fahrenheit)

# Same with a 2-D array:
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

print("Matrix × 3:\\n", matrix * 3)
print("Matrix - 5:\\n", matrix - 5)`,
      out:`Fahrenheit: [ 32.  68.  98.6 212. ]
Matrix × 3:
 [[ 3  6  9]
 [12 15 18]
 [21 24 27]]
Matrix - 5:
 [[-4 -3 -2]
 [-1  0  1]
 [ 2  3  4]]` },
    { type:'text', body:`<h3>Broadcasting rules</h3>
<p>NumPy compares shapes <em>from the right</em>. Two dimensions are compatible if they are equal, or one of them is 1 (in which case the size-1 dimension is "stretched" to match).</p>`},
    { type:'code', src:`import numpy as np

# Shape (4, 3) with shape (3,) — 1-D array broadcasts across rows:
scores = np.array([[85, 92, 78],    # student 1
                   [79, 85, 88],    # student 2
                   [91, 88, 95],    # student 3
                   [72, 76, 80]])   # student 4

subject_weights = np.array([0.3, 0.4, 0.3])   # shape (3,)

# Weight each subject — broadcasting stretches (3,) → (4, 3):
weighted = scores * subject_weights
print("Weighted scores:\\n", weighted)
print("Weighted averages:", weighted.sum(axis=1))`,
      out:`Weighted scores:
 [[25.5 36.8 23.4]
 [23.7 34.  26.4]
 [27.3 35.2 28.5]
 [21.6 30.4 24. ]]
Weighted averages: [85.7 84.1 91.  76. ]` },
    { type:'code', src:`import numpy as np

# Shape (4, 1) with shape (1, 4) — outer product via broadcasting:
row = np.array([[1, 2, 3, 4]])    # shape (1, 4)
col = np.array([[10],             # shape (4, 1)
                [20],
                [30],
                [40]])

print(row * col)   # result is (4, 4) — each row*col combination`,
      out:`[[ 10  20  30  40]
 [ 20  40  60  80]
 [ 30  60  90 120]
 [ 40  80 120 160]]` },
    { type:'text', body:`<h3>Universal functions (ufuncs)</h3>
<p>NumPy's mathematical functions operate element-wise on arrays. They're implemented in C and are far faster than Python's math module equivalents on large arrays:</p>`},
    { type:'code', src:`import numpy as np

x = np.linspace(0, np.pi, 5)  # [0, π/4, π/2, 3π/4, π]

print("x:       ", np.round(x, 3))
print("sin(x):  ", np.round(np.sin(x), 3))
print("cos(x):  ", np.round(np.cos(x), 3))
print("exp(x):  ", np.round(np.exp(x[:3]), 3))   # just first 3 for brevity

# Aggregate ufuncs:
data = np.array([3, 1, 4, 1, 5, 9, 2, 6, 5, 3])
print("\\ncumulative sum:", np.cumsum(data))
print("sorted:        ", np.sort(data))
print("arg of max:    ", np.argmax(data), "→ value:", data[np.argmax(data)])`,
      out:`x:        [0.    0.785 1.571 2.356 3.142]
sin(x):   [0.    0.707 1.    0.707 0.   ]
cos(x):   [ 1.    0.707 0.   -0.707 -1.   ]
exp(x):   [ 1.     2.193  4.81 ]

cumulative sum: [ 3  4  8  9 14 23 25 31 36 39]
sorted:         [1 1 2 3 3 4 5 5 6 9]
arg of max:     5 → value: 9` },
    { type:'text', body:`<h3>Boolean indexing — filtering without loops</h3>`},
    { type:'code', src:`import numpy as np

np.random.seed(1)
salaries = np.random.randint(30000, 150000, 20)  # 20 random salaries

print("All salaries:  ", salaries)
print()

# Select only salaries above ₹1 lakh:
high = salaries[salaries > 100000]
print("Above ₹1L:     ", high)
print("Count:         ", len(high))
print("Their mean:    ₹", high.mean().round(0))

# Replace salaries below ₹40,000 with the floor:
adjusted = np.where(salaries < 40000, 40000, salaries)
print()
print("After floor:   ", adjusted)`,
      out:`All salaries:   [ 57197 118131  80829 ... ]
Above ₹1L:      [118131 ...]
Count:           5
Their mean:     ₹ 115628.0

After floor:    [ 57197 118131  80829 ... ]` },
    { type:'exercise', title:'Normalise and analyse a dataset',
      body:`<p>Create a NumPy array of 50 random exam scores between 40 and 100 (seed with 42). Then: (1) normalise the scores to a 0–1 range using min-max normalisation: <code>(x - min) / (max - min)</code>, (2) count how many original scores fall in each band: &lt;60, 60–74, 75–89, ≥90, (3) compute the z-scores: <code>(x - mean) / std</code>, and (4) identify which scores are more than 1.5 standard deviations below the mean (students at risk).</p>`,
      hint:`Boolean indexing for bands: <code>((scores >= 60) & (scores < 75)).sum()</code>. Z-scores are just <code>(scores - scores.mean()) / scores.std()</code>. Students at risk: <code>scores[z_scores < -1.5]</code>.`,
      solution:`import numpy as np

np.random.seed(42)
scores = np.random.randint(40, 101, 50)

normalised = (scores - scores.min()) / (scores.max() - scores.min())

bands = {
    "Fail (<60)":   (scores < 60).sum(),
    "Pass (60-74)": ((scores >= 60) & (scores < 75)).sum(),
    "Merit (75-89)":((scores >= 75) & (scores < 90)).sum(),
    "Dist (≥90)":   (scores >= 90).sum(),
}

z = (scores - scores.mean()) / scores.std()
at_risk = scores[z < -1.5]

print(f"Scores sample: {scores[:10]}...")
print(f"Normalised:    {normalised[:5].round(2)}...")
print()
for band, count in bands.items():
    print(f"  {band:<15}: {count} students")
print(f"\\nMean: {scores.mean():.1f}  Std: {scores.std():.1f}")
print(f"At-risk scores (z < -1.5): {at_risk}")` }
  ]
};

L['python-w7-l3'] = {
  duration_mins: 20,
  sections: [
    { type:'text', body:`
<h2>Pandas DataFrames — Spreadsheets Upgraded</h2>
<p>If NumPy is the engine, Pandas is the driver's seat. Pandas adds labels to NumPy arrays, giving you <strong>named columns</strong>, <strong>labelled rows</strong>, <strong>mixed data types</strong>, and a rich set of data manipulation tools. It's how data scientists spend most of their time in Python.</p>
<h3>Two core data structures</h3>
<ul>
<li><strong>Series</strong>: a 1-D labelled array (think: one column of a spreadsheet)</li>
<li><strong>DataFrame</strong>: a 2-D labelled table (think: the whole spreadsheet)</li>
</ul>
<pre style="background:var(--fog2);padding:.5rem 1rem;border-radius:.4rem;font-family:monospace">pip install pandas</pre>
`},
    { type:'code', src:`import pandas as pd

# ── Series ────────────────────────────────────────────────
scores = pd.Series([92, 85, 88, 79, 95],
                   index=["Priya","Rajan","Ananya","Bala","Chitra"],
                   name="Python Score")

print(scores)
print()
print(f"Priya's score:  {scores['Priya']}")
print(f"Mean:           {scores.mean():.1f}")
print(f"Above 88:       {scores[scores > 88].index.tolist()}")`,
      out:`Priya     92
Rajan     85
Ananya    88
Bala      79
Chitra    95
Name: Python Score, dtype: int64

Priya's score:  92
Mean:           87.8
Above 88:       ['Priya', 'Chitra']` },
    { type:'code', src:`import pandas as pd

# ── DataFrame from a dict ─────────────────────────────────
data = {
    "Name":    ["Priya Sharma","Rajan Kumar","Ananya Reddy","Bala Sub","Chitra Nair"],
    "City":    ["Mumbai","Delhi","Bengaluru","Chennai","Kolkata"],
    "Python":  [92, 85, 88, 79, 95],
    "SQL":     [88, 90, 91, 76, 83],
    "ML":      [85, 78, 94, 81, 87],
}

df = pd.DataFrame(data)
print(df)
print()
print(f"Shape: {df.shape}")    # (5, 5) — 5 rows, 5 columns`,
      out:`           Name       City  Python  SQL  ML
0   Priya Sharma     Mumbai      92   88  85
1    Rajan Kumar      Delhi      85   90  78
2   Ananya Reddy  Bengaluru      88   91  94
3       Bala Sub    Chennai      79   76  81
4    Chitra Nair    Kolkata      95   83  87

Shape: (5, 5)` },
    { type:'text', body:`<h3>Loading data from CSV (the real-world workflow)</h3>
<p>In practice you never type data into a dict — you load it from a file:</p>`},
    { type:'code', src:`import pandas as pd

# df = pd.read_csv("students.csv")   # reads any CSV file

# For this demo, we create the same DataFrame directly:
df = pd.DataFrame({
    "Name":    ["Priya Sharma","Rajan Kumar","Ananya Reddy","Bala Sub","Chitra Nair"],
    "City":    ["Mumbai","Delhi","Bengaluru","Chennai","Kolkata"],
    "Python":  [92, 85, 88, 79, 95],
    "SQL":     [88, 90, 91, 76, 83],
    "ML":      [85, 78, 94, 81, 87],
})

# The first things you do on any new dataset:
print(df.info())
print()
print(df.describe())`,
      out:`<class 'pandas.core.frame.DataFrame'>
RangeIndex: 5 entries, 0 to 4
Data columns (total 5 columns):
 #   Column  Non-Null Count  Dtype
---  ------  --------------  -----
 0   Name    5 non-null      object
 1   City    5 non-null      object
 2   Python  5 non-null      int64
 3   SQL     5 non-null      int64
 4   ML      5 non-null      int64
dtypes: int64(3), object(2)

       Python        SQL         ML
count    5.00       5.00       5.00
mean    87.80      85.60      85.00
std      5.76       5.77       5.79
min     79.00      76.00      78.00
25%     85.00      83.00      81.00
50%     88.00      88.00      85.00
75%     92.00      90.00      87.00
max     95.00      91.00      94.00` },
    { type:'text', body:`<h3>Selecting columns and adding new ones</h3>`},
    { type:'code', src:`import pandas as pd

df = pd.DataFrame({
    "Name":   ["Priya","Rajan","Ananya","Bala","Chitra"],
    "Python": [92, 85, 88, 79, 95],
    "SQL":    [88, 90, 91, 76, 83],
    "ML":     [85, 78, 94, 81, 87],
})

# Select one column → Series:
print(df["Python"])
print()

# Select multiple columns → DataFrame:
print(df[["Name", "Python"]])
print()

# Add a derived column:
df["Average"] = df[["Python", "SQL", "ML"]].mean(axis=1).round(1)
df["Grade"] = df["Average"].apply(lambda x: "A" if x >= 90 else "B" if x >= 80 else "C")

print(df[["Name","Average","Grade"]])`,
      out:`0    92
1    85
2    88
3    79
4    95
Name: Python, dtype: int64

     Name  Python
0   Priya      92
1   Rajan      85
2  Ananya      88
3    Bala      79
4  Chitra      95

     Name  Average Grade
0   Priya     88.3     B
1   Rajan     84.3     B
2  Ananya     91.0     A
3    Bala     78.7     C
4  Chitra     88.3     B` },
    { type:'text', body:`<h3>Filtering rows</h3>`},
    { type:'code', src:`import pandas as pd

df = pd.DataFrame({
    "Name":    ["Priya","Rajan","Ananya","Bala","Chitra"],
    "City":    ["Mumbai","Delhi","Bengaluru","Chennai","Kolkata"],
    "Python":  [92, 85, 88, 79, 95],
    "SQL":     [88, 90, 91, 76, 83],
})

# Students who scored > 85 in Python:
print(df[df["Python"] > 85])
print()

# Students from South India (Chennai or Bengaluru):
south = df[df["City"].isin(["Chennai","Bengaluru"])]
print(south)
print()

# Students who scored > 85 in BOTH Python and SQL:
top = df[(df["Python"] > 85) & (df["SQL"] > 85)]
print(top)`,
      out:`     Name       City  Python  SQL
0   Priya     Mumbai      92   88
2  Ananya  Bengaluru      88   91
4  Chitra    Kolkata      95   83

     Name       City  Python  SQL
2  Ananya  Bengaluru      88   91
3    Bala    Chennai      79   76

     Name    City  Python  SQL
0   Priya  Mumbai      92   88
2  Ananya  Bengaluru   88   91` },
    { type:'exercise', title:'Employee dataset analysis',
      body:`<p>Create a DataFrame with 8 employees: columns <code>name, department, salary, years_exp, rating</code> (make up realistic data). Then: (1) add a column <code>bonus</code> = 10% of salary if rating ≥ 4, else 5%, (2) filter to show only employees in "Engineering" with more than 2 years experience, (3) find the highest-paid employee in each department, (4) save the full DataFrame to a CSV file and read it back.</p>`,
      hint:`Use <code>.apply()</code> or <code>np.where()</code> for the bonus column. Chained boolean conditions with <code>&</code> for filtering. For highest paid per department: <code>df.groupby("department")["salary"].idxmax()</code> then use <code>.loc[]</code> to get those rows.`,
      solution:`import pandas as pd
import numpy as np

df = pd.DataFrame({
    "name":       ["Priya","Rajan","Ananya","Bala","Chitra","Dev","Esha","Faiz"],
    "department": ["Engineering","Marketing","Engineering","HR","Engineering","Marketing","HR","Engineering"],
    "salary":     [90000,65000,95000,55000,88000,70000,58000,105000],
    "years_exp":  [4,2,6,1,3,5,2,7],
    "rating":     [4.5,3.8,4.2,3.5,4.7,4.1,3.9,4.8],
})

df["bonus"] = np.where(df["rating"] >= 4, df["salary"]*0.10, df["salary"]*0.05)

eng_exp = df[(df["department"]=="Engineering") & (df["years_exp"] > 2)]
print("Engineering with 2+ years:\\n", eng_exp[["name","salary","years_exp"]])

top_idx = df.groupby("department")["salary"].idxmax()
print("\\nHighest paid per dept:\\n", df.loc[top_idx][["department","name","salary"]])

df.to_csv("employees.csv", index=False)
df2 = pd.read_csv("employees.csv")
print(f"\\nReloaded: {len(df2)} rows, columns: {list(df2.columns)}")` }
  ]
};

L['python-w7-l4'] = {
  duration_mins: 15,
  sections: [
    { type:'text', body:`
<h2>Selecting Data with loc &amp; iloc</h2>
<p>Pandas gives you two powerful ways to select rows and columns from a DataFrame. Choosing the right one matters — they work differently and mixing them up is a classic source of bugs.</p>
<table style="width:100%;border-collapse:collapse;margin:1rem 0">
<tr style="background:var(--fog2)"><th style="padding:.4rem .8rem;text-align:left">Method</th><th style="padding:.4rem .8rem;text-align:left">Selects by</th><th style="padding:.4rem .8rem;text-align:left">Slice end</th></tr>
<tr><td style="padding:.4rem .8rem"><code>loc</code></td><td style="padding:.4rem .8rem">Labels (row index + column names)</td><td style="padding:.4rem .8rem"><strong>Inclusive</strong></td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><code>iloc</code></td><td style="padding:.4rem .8rem">Integer positions (0-based)</td><td style="padding:.4rem .8rem"><strong>Exclusive</strong> (like Python slices)</td></tr>
</table>
`},
    { type:'code', src:`import pandas as pd

df = pd.DataFrame({
    "Name":    ["Priya","Rajan","Ananya","Bala","Chitra"],
    "City":    ["Mumbai","Delhi","Bengaluru","Chennai","Kolkata"],
    "Python":  [92, 85, 88, 79, 95],
    "SQL":     [88, 90, 91, 76, 83],
    "ML":      [85, 78, 94, 81, 87],
}, index=["S1","S2","S3","S4","S5"])   # custom row labels

print(df)`,
      out:`      Name       City  Python  SQL  ML
S1   Priya     Mumbai      92   88  85
S2   Rajan      Delhi      85   90  78
S3  Ananya  Bengaluru      88   91  94
S4    Bala    Chennai      79   76  81
S5  Chitra    Kolkata      95   83  87` },
    { type:'code', src:`# ── loc — label-based ─────────────────────────────────────
print("Single row by label:")
print(df.loc["S3"])
print()

print("Range of rows (INCLUSIVE of both ends):")
print(df.loc["S2":"S4"])
print()

print("Specific row + specific column:")
print(df.loc["S3", "SQL"])     # 91
print()

print("Multiple rows, multiple columns:")
print(df.loc[["S1","S3","S5"], ["Name","Python","ML"]])`,
      out:`Single row by label:
Name      Ananya
City   Bengaluru
Python        88
SQL           91
ML            94
Name: S3, dtype: object

Range of rows (INCLUSIVE of both ends):
     Name       City  Python  SQL  ML
S2  Rajan      Delhi      85   90  78
S3 Ananya  Bengaluru      88   91  94
S4   Bala    Chennai      79   76  81

Specific row + specific column:
91

Multiple rows, multiple columns:
       Name  Python  ML
S1    Priya      92  85
S3   Ananya      88  94
S5   Chitra      95  87` },
    { type:'code', src:`# ── iloc — integer position-based ────────────────────────
print("First row (position 0):")
print(df.iloc[0])
print()

print("Rows 1-3 (positions 1,2,3 — EXCLUSIVE of end):")
print(df.iloc[1:4])
print()

print("Last 2 rows, first 3 columns:")
print(df.iloc[-2:, :3])
print()

print("Every other row:")
print(df.iloc[::2])`,
      out:`First row (position 0):
Name       Priya
City      Mumbai
Python        92
SQL           88
ML            85
Name: S1, dtype: object

Rows 1-3 (positions 1,2,3 — EXCLUSIVE of end):
     Name       City  Python  SQL  ML
S2  Rajan      Delhi      85   90  78
S3 Ananya  Bengaluru      88   91  94
S4   Bala    Chennai      79   76  81

Last 2 rows, first 3 columns:
       Name     City  Python
S4     Bala  Chennai      79
S5   Chitra  Kolkata      95

Every other row:
      Name       City  Python  SQL  ML
S1   Priya     Mumbai      92   88  85
S3  Ananya  Bengaluru      88   91  94
S5  Chitra    Kolkata      95   83  87` },
    { type:'warn', body:`Never use <code>df[2:4]</code> for row selection — this works but is ambiguous. Always use <code>loc</code> or <code>iloc</code> explicitly. Also avoid chained indexing like <code>df["col"][0]</code>; use <code>df.loc[0, "col"]</code> to avoid the SettingWithCopyWarning.` },
    { type:'text', body:`<h3>Conditional selection with loc</h3>
<p><code>loc</code> accepts a boolean Series as the row selector — this is the idiomatic Pandas way to filter:</p>`},
    { type:'code', src:`import pandas as pd

df = pd.DataFrame({
    "Name":    ["Priya","Rajan","Ananya","Bala","Chitra"],
    "Python":  [92, 85, 88, 79, 95],
    "SQL":     [88, 90, 91, 76, 83],
}, index=["S1","S2","S3","S4","S5"])

# Boolean condition as row selector, column list as col selector:
top = df.loc[df["Python"] > 87, ["Name","Python"]]
print(top)
print()

# Update values with loc — this is safe (unlike chained indexing):
df.loc[df["Python"] < 85, "Python"] = 85   # floor at 85
print(df)`,
      out:`      Name  Python
S1   Priya      92
S3  Ananya      88
S5  Chitra      95

     Name  Python  SQL
S1  Priya      92   88
S2  Rajan      85   90
S3 Ananya      88   91
S4   Bala      85   76
S5 Chitra      95   83` },
    { type:'exercise', title:'Sales data slicing',
      body:`<p>Create a 10-row sales DataFrame with columns: <code>date, region, product, units, price</code>. Add a <code>revenue</code> column (units × price). Then use <code>loc</code> and <code>iloc</code> to: (1) select all North region sales, (2) select columns <code>product</code> and <code>revenue</code> for rows 3–7 using iloc, (3) find the date of the highest revenue sale using loc with a boolean condition, (4) update all prices below 100 to exactly 100 using loc.</p>`,
      hint:`For (3): find the index of the max revenue with <code>df["revenue"].idxmax()</code>, then use <code>df.loc[idx, "date"]</code>. For (4): <code>df.loc[df["price"] < 100, "price"] = 100</code>.`,
      solution:`import pandas as pd, numpy as np

np.random.seed(5)
df = pd.DataFrame({
    "date":    pd.date_range("2024-01-01", periods=10, freq="W"),
    "region":  np.random.choice(["North","South","East","West"], 10),
    "product": np.random.choice(["Laptop","Mouse","Keyboard","Monitor"], 10),
    "units":   np.random.randint(1, 20, 10),
    "price":   np.random.randint(80, 500, 10)*100,
})
df["revenue"] = df["units"] * df["price"]

north = df.loc[df["region"]=="North", ["date","product","revenue"]]
print("North sales:\\n", north)

mid = df.iloc[3:8][["product","revenue"]]
print("\\nRows 3-7:\\n", mid)

top_date = df.loc[df["revenue"].idxmax(), "date"]
print(f"\\nHighest revenue date: {top_date.date()}")

df.loc[df["price"] < 100, "price"] = 100
print(f"\\nMin price after floor: {df['price'].min()}")` }
  ]
};

L['python-w7-l5'] = {
  duration_mins: 12,
  sections: [
    { type:'text', body:`
<h2>groupby &amp; Pivot Tables</h2>
<p><strong>groupby</strong> is Pandas' most used and most powerful operation. It lets you split a DataFrame into groups, apply a function to each group, and combine the results — the classic <em>split-apply-combine</em> workflow that shows up in almost every data analysis.</p>
`},
    { type:'code', src:`import pandas as pd

sales = pd.DataFrame({
    "Month":  ["Jan","Jan","Feb","Feb","Mar","Mar","Jan","Feb","Mar"],
    "Region": ["North","South","North","South","North","South","East","East","East"],
    "Rep":    ["Arjun","Priya","Arjun","Rajan","Bala","Chitra","Dev","Dev","Dev"],
    "Sales":  [120000, 95000, 145000, 110000, 132000, 98000, 87000, 102000, 115000],
    "Units":  [15, 12, 18, 14, 17, 13, 11, 13, 15],
})

# Total sales per region:
print(sales.groupby("Region")["Sales"].sum())`,
      out:`Region
East     304000
North    397000
South    303000
Name: Sales, dtype: int64` },
    { type:'code', src:`import pandas as pd

sales = pd.DataFrame({
    "Month":  ["Jan","Jan","Feb","Feb","Mar","Mar","Jan","Feb","Mar"],
    "Region": ["North","South","North","South","North","South","East","East","East"],
    "Rep":    ["Arjun","Priya","Arjun","Rajan","Bala","Chitra","Dev","Dev","Dev"],
    "Sales":  [120000, 95000, 145000, 110000, 132000, 98000, 87000, 102000, 115000],
    "Units":  [15, 12, 18, 14, 17, 13, 11, 13, 15],
})

# Multiple aggregations at once:
summary = sales.groupby("Region").agg(
    total_sales=("Sales","sum"),
    avg_sales=("Sales","mean"),
    total_units=("Units","sum"),
    num_transactions=("Sales","count"),
)
print(summary.round(0))`,
      out:`        total_sales   avg_sales  total_units  num_transactions
Region
East         304000  101333.0           39                 3
North        397000  132333.0           50                 3
South        303000  101000.0           39                 3` },
    { type:'code', src:`import pandas as pd

sales = pd.DataFrame({
    "Month":  ["Jan","Jan","Feb","Feb","Mar","Mar","Jan","Feb","Mar"],
    "Region": ["North","South","North","South","North","South","East","East","East"],
    "Sales":  [120000, 95000, 145000, 110000, 132000, 98000, 87000, 102000, 115000],
    "Units":  [15, 12, 18, 14, 17, 13, 11, 13, 15],
})

# Group by multiple columns:
monthly_region = sales.groupby(["Month","Region"])["Sales"].sum().reset_index()
print(monthly_region)
print()

# Filter groups — only regions with total sales > 300,000:
big_regions = sales.groupby("Region").filter(lambda g: g["Sales"].sum() > 300000)
print("Big regions:", big_regions["Region"].unique())`,
      out:`  Month Region   Sales
0   Feb   East  102000
1   Feb  North  145000
2   Feb  South  110000
3   Jan   East   87000
4   Jan  North  120000
5   Jan  South   95000
6   Mar   East  115000
7   Mar  North  132000
8   Mar  South   98000

Big regions: ['North' 'South' 'East']` },
    { type:'text', body:`<h3>Pivot tables — groupby in spreadsheet form</h3>
<p>A pivot table is a summary that shows one variable's values as rows, another as columns, and an aggregated metric as the cells:</p>`},
    { type:'code', src:`import pandas as pd

sales = pd.DataFrame({
    "Month":  ["Jan","Jan","Feb","Feb","Mar","Mar","Jan","Feb","Mar"],
    "Region": ["North","South","North","South","North","South","East","East","East"],
    "Sales":  [120000, 95000, 145000, 110000, 132000, 98000, 87000, 102000, 115000],
    "Units":  [15, 12, 18, 14, 17, 13, 11, 13, 15],
})

pivot = pd.pivot_table(
    sales,
    values="Sales",
    index="Region",       # rows
    columns="Month",      # columns
    aggfunc="sum",
    fill_value=0,
    margins=True,         # adds row/column totals
    margins_name="Total"
)

print(pivot)`,
      out:`Month     Feb     Jan     Mar   Total
Region
East   102000   87000  115000  304000
North  145000  120000  132000  397000
South  110000   95000   98000  303000
Total  357000  302000  345000 1004000` },
    { type:'tip', body:`<code>pivot_table</code> with <code>margins=True</code> is the Pandas equivalent of "Grand Total" in Excel pivot tables. Set <code>aggfunc</code> to <code>"mean"</code>, <code>"count"</code>, or a list like <code>["sum","mean"]</code> for different views.` },
    { type:'exercise', title:'Student performance dashboard',
      body:`<p>Create a 20-row student performance DataFrame with columns: <code>name, batch, subject, score, attempts</code>. Use groupby to: (1) find the average score per batch, (2) find the highest score per subject, (3) find students whose average score across all subjects is below 70 (at-risk), (4) build a pivot table showing average score by batch (rows) and subject (columns).</p>`,
      hint:`For at-risk: first groupby name, get mean score, then filter. Use <code>.reset_index()</code> to turn the groupby result back into a DataFrame you can filter with a boolean condition.`,
      solution:`import pandas as pd, numpy as np

np.random.seed(10)
students = ["Priya","Rajan","Ananya","Bala","Chitra","Dev","Esha","Faiz","Gita","Hari"]
rows = []
for name in students:
    batch = "A" if name[0] < "F" else "B"
    for subj in ["Python","SQL","ML"]:
        rows.append({
            "name": name, "batch": batch, "subject": subj,
            "score": int(np.random.normal(75, 15).clip(40, 100)),
            "attempts": np.random.randint(1,4)
        })
df = pd.DataFrame(rows)

print("Avg score per batch:")
print(df.groupby("batch")["score"].mean().round(1))

print("\\nTop score per subject:")
print(df.groupby("subject")["score"].max())

at_risk = df.groupby("name")["score"].mean().reset_index()
at_risk = at_risk[at_risk["score"] < 70]
print("\\nAt-risk students:")
print(at_risk)

pivot = pd.pivot_table(df, values="score", index="batch", columns="subject", aggfunc="mean").round(1)
print("\\nPivot table:")
print(pivot)` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 8 — MATPLOTLIB & CAPSTONE PROJECT
══════════════════════════════════════════════════════════════════════════ */

L['python-w8-l1'] = {
  duration_mins: 18,
  sections: [
    { type:'text', body:`
<h2>Matplotlib — Telling Stories with Data</h2>
<p>Data in a table tells you facts. A chart tells you a story. Matplotlib is Python's foundational plotting library — the basis for Seaborn, Pandas' built-in plotting, and dozens of other visualization tools.</p>
<p>The key concept: every Matplotlib plot has two layers:</p>
<ul>
<li><strong>Figure</strong>: the entire window / page. Created with <code>plt.figure()</code>.</li>
<li><strong>Axes</strong>: one individual chart within the figure. This is where your data actually appears.</li>
</ul>
<p>For simple one-chart plots, the <code>pyplot</code> interface manages all of this automatically.</p>
<pre style="background:var(--fog2);padding:.5rem 1rem;border-radius:.4rem;font-family:monospace">pip install matplotlib</pre>
`},
    { type:'code', src:`import matplotlib.pyplot as plt
import numpy as np

# ── Line chart — DSA student count over 12 months ────────
months = ["Jan","Feb","Mar","Apr","May","Jun",
          "Jul","Aug","Sep","Oct","Nov","Dec"]
students = [42, 48, 61, 73, 85, 98, 112, 125, 138, 151, 165, 180]

plt.figure(figsize=(10, 5))          # width=10", height=5"
plt.plot(months, students,
         color="#2196F3",            # blue line
         linewidth=2.5,
         marker="o",                 # circle at each data point
         markersize=7,
         markerfacecolor="white",
         markeredgewidth=2)

plt.title("DSA Student Growth — 2024", fontsize=16, fontweight="bold", pad=15)
plt.xlabel("Month", fontsize=12)
plt.ylabel("Enrolled Students", fontsize=12)
plt.ylim(0, 200)
plt.grid(axis="y", linestyle="--", alpha=0.5)
plt.tight_layout()
plt.savefig("growth_chart.png", dpi=150)
plt.show()
print("Chart saved to growth_chart.png")`,
      out:`Chart saved to growth_chart.png` },
    { type:'tip', body:`Always call <code>plt.tight_layout()</code> before saving — it adjusts spacing so labels never get clipped. Use <code>dpi=150</code> for screen-quality PNGs; use <code>dpi=300</code> for print.` },
    { type:'text', body:`<h3>Bar chart — comparing categories</h3>`},
    { type:'code', src:`import matplotlib.pyplot as plt
import numpy as np

courses = ["Python", "SQL", "ML", "Data Viz", "Stats"]
enrollments = [180, 145, 120, 98, 75]
colors = ["#4CAF50","#2196F3","#FF9800","#9C27B0","#F44336"]

fig, ax = plt.subplots(figsize=(9, 5))

bars = ax.bar(courses, enrollments, color=colors, width=0.6, edgecolor="white")

# Add value labels on top of each bar:
for bar, val in zip(bars, enrollments):
    ax.text(bar.get_x() + bar.get_width()/2,
            bar.get_height() + 2,
            str(val),
            ha="center", va="bottom", fontweight="bold")

ax.set_title("Course Enrollments at DSA", fontsize=15, fontweight="bold")
ax.set_ylabel("Number of Students")
ax.set_ylim(0, 210)
ax.spines[["top","right"]].set_visible(False)  # clean look
plt.tight_layout()
plt.savefig("enrollments.png", dpi=150)
plt.show()`,
      out:`[Bar chart saved as enrollments.png]` },
    { type:'text', body:`<h3>Scatter plot — revealing relationships</h3>`},
    { type:'code', src:`import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
study_hours = np.random.uniform(1, 8, 60)
exam_scores = study_hours * 8 + np.random.normal(0, 8, 60)
exam_scores = np.clip(exam_scores, 30, 100)

fig, ax = plt.subplots(figsize=(8, 6))

scatter = ax.scatter(study_hours, exam_scores,
                     c=exam_scores,           # colour by score
                     cmap="RdYlGn",           # red→yellow→green
                     s=80,                     # marker size
                     alpha=0.8,
                     edgecolors="white",
                     linewidths=0.5)

# Trend line:
z = np.polyfit(study_hours, exam_scores, 1)
p = np.poly1d(z)
x_line = np.linspace(1, 8, 100)
ax.plot(x_line, p(x_line), "k--", linewidth=1.5, alpha=0.6, label="Trend")

plt.colorbar(scatter, ax=ax, label="Score")
ax.set_xlabel("Study Hours per Day", fontsize=12)
ax.set_ylabel("Exam Score", fontsize=12)
ax.set_title("Study Hours vs Exam Performance", fontsize=14, fontweight="bold")
ax.legend()
ax.spines[["top","right"]].set_visible(False)
plt.tight_layout()
plt.savefig("scatter.png", dpi=150)
plt.show()`,
      out:`[Scatter plot saved as scatter.png — shows positive correlation between study hours and score]` },
    { type:'exercise', title:'Histogram of score distribution',
      body:`<p>Generate 200 random exam scores with <code>np.random.normal(72, 12, 200)</code> clipped to [0, 100]. Plot a histogram with 15 bins, coloured <code>#3F51B5</code>. Add a vertical line at the mean (use <code>plt.axvline</code> in red dashes), another at median (green dashes). Add a title, axis labels, and a legend. Save as <code>score_dist.png</code>.</p>`,
      hint:`<code>ax.hist(scores, bins=15, color=..., edgecolor='white')</code>. Mean and median from <code>np.mean()</code> and <code>np.median()</code>. <code>ax.axvline(mean, color='red', linestyle='--', label='Mean')</code>. Call <code>ax.legend()</code> to show the legend.`,
      solution:`import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
scores = np.random.normal(72, 12, 200).clip(0, 100)
mean   = scores.mean()
median = np.median(scores)

fig, ax = plt.subplots(figsize=(9, 5))
ax.hist(scores, bins=15, color="#3F51B5", edgecolor="white", alpha=0.85)
ax.axvline(mean,   color="red",   linestyle="--", linewidth=2, label=f"Mean: {mean:.1f}")
ax.axvline(median, color="green", linestyle="--", linewidth=2, label=f"Median: {median:.1f}")
ax.set_title("Exam Score Distribution (n=200)", fontsize=14, fontweight="bold")
ax.set_xlabel("Score")
ax.set_ylabel("Number of Students")
ax.legend()
ax.spines[["top","right"]].set_visible(False)
plt.tight_layout()
plt.savefig("score_dist.png", dpi=150)
plt.show()` }
  ]
};

L['python-w8-l2'] = {
  duration_mins: 15,
  sections: [
    { type:'text', body:`
<h2>Subplots &amp; Chart Customisation</h2>
<p>Real data reports always have multiple charts. Matplotlib's <code>subplots()</code> lets you arrange several charts in a grid on one figure — so your reader can compare them side by side without juggling multiple images.</p>
`},
    { type:'code', src:`import matplotlib.pyplot as plt
import numpy as np

np.random.seed(7)
months   = ["Jan","Feb","Mar","Apr","May","Jun"]
revenue  = [125, 148, 172, 195, 210, 238]   # ₹ lakhs
students = [42,  51,  63,  71,  85,  98]
dropout  = [8,   6,   5,   4,   7,   3]
satisfaction = [3.8, 4.0, 4.1, 4.3, 4.2, 4.5]   # out of 5

# 2×2 grid of charts:
fig, axes = plt.subplots(2, 2, figsize=(12, 8))
fig.suptitle("DSA Platform — H1 2024 Dashboard", fontsize=16, fontweight="bold", y=1.01)

# ── Chart 1: Revenue trend ────────────────────────────────
axes[0,0].plot(months, revenue, "o-", color="#4CAF50", linewidth=2.5, markersize=8)
axes[0,0].fill_between(months, revenue, alpha=0.15, color="#4CAF50")
axes[0,0].set_title("Monthly Revenue (₹ Lakhs)")
axes[0,0].set_ylabel("₹ Lakhs")
axes[0,0].grid(axis="y", linestyle="--", alpha=0.4)

# ── Chart 2: Student enrolments ───────────────────────────
axes[0,1].bar(months, students, color="#2196F3", width=0.6, edgecolor="white")
axes[0,1].set_title("New Enrolments")
axes[0,1].set_ylabel("Students")

# ── Chart 3: Dropout rate ────────────────────────────────
axes[1,0].bar(months, dropout, color="#F44336", width=0.6, edgecolor="white")
axes[1,0].set_title("Dropouts")
axes[1,0].set_ylabel("Students")

# ── Chart 4: Satisfaction score ───────────────────────────
axes[1,1].plot(months, satisfaction, "s-", color="#FF9800", linewidth=2.5, markersize=9)
axes[1,1].set_ylim(3, 5)
axes[1,1].set_title("Avg Satisfaction (out of 5)")
axes[1,1].set_ylabel("Score")
axes[1,1].axhline(4.0, color="gray", linestyle="--", alpha=0.5, label="Target 4.0")
axes[1,1].legend()

for ax in axes.flatten():
    ax.spines[["top","right"]].set_visible(False)

plt.tight_layout()
plt.savefig("dashboard.png", dpi=150, bbox_inches="tight")
plt.show()
print("Dashboard saved.")`,
      out:`Dashboard saved.` },
    { type:'tip', body:`<code>axes.flatten()</code> converts the 2-D array of Axes objects into a 1-D list, making it easy to apply formatting to all charts in a single loop.` },
    { type:'text', body:`<h3>Pie chart &amp; donut chart</h3>`},
    { type:'code', src:`import matplotlib.pyplot as plt

categories = ["Python", "SQL", "ML", "Data Viz", "Other"]
sizes      = [35, 25, 20, 12, 8]   # percentages
colors     = ["#4CAF50","#2196F3","#FF9800","#9C27B0","#607D8B"]
explode    = (0.05, 0, 0, 0, 0)    # pull out Python slice slightly

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# Standard pie chart:
ax1.pie(sizes, labels=categories, colors=colors, explode=explode,
        autopct="%1.1f%%", startangle=90, pctdistance=0.8)
ax1.set_title("Course Popularity (Pie)", fontsize=13)

# Donut chart (pie with a white circle in the centre):
wedges, texts, autotexts = ax2.pie(
    sizes, labels=categories, colors=colors,
    autopct="%1.1f%%", startangle=90, pctdistance=0.8,
    wedgeprops={"linewidth": 3, "edgecolor": "white"}
)
centre = plt.Circle((0, 0), 0.55, fc="white")
ax2.add_patch(centre)
ax2.text(0, 0, "DSA\\nCourses", ha="center", va="center",
         fontsize=12, fontweight="bold")
ax2.set_title("Course Popularity (Donut)", fontsize=13)

plt.tight_layout()
plt.savefig("pie_charts.png", dpi=150)
plt.show()`,
      out:`[Pie and donut charts saved as pie_charts.png]` },
    { type:'text', body:`<h3>Customising style and aesthetics</h3>
<p>Matplotlib ships with style sheets you can apply in one line to change the entire look:</p>`},
    { type:'code', src:`import matplotlib.pyplot as plt
import numpy as np

# Available styles:
# print(plt.style.available)

# Apply a clean style for professional reports:
plt.style.use("seaborn-v0_8-whitegrid")

np.random.seed(3)
x = np.linspace(0, 10, 100)
for i, (name, color) in enumerate([("Batch A","#E91E63"),
                                    ("Batch B","#2196F3"),
                                    ("Batch C","#4CAF50")]):
    y = np.sin(x + i) * (3-i) + 5 + i*2
    plt.plot(x, y, label=name, color=color, linewidth=2)

plt.title("Student Progress Trajectories", fontsize=14, fontweight="bold")
plt.xlabel("Week")
plt.ylabel("Cumulative Score")
plt.legend(loc="upper left")
plt.tight_layout()
plt.savefig("trajectories.png", dpi=150)
plt.show()`,
      out:`[Multi-line chart saved as trajectories.png]` },
    { type:'exercise', title:'3-panel report',
      body:`<p>Build a 1×3 subplot figure (3 charts side by side). Use the DSA data: (1) a horizontal bar chart of 5 courses by number of lessons (invent the numbers), (2) a stacked bar chart showing male/female split per batch (3 batches, invent data), (3) a line chart showing average score across 8 weeks for 2 batches. Give each chart a title and axis labels. Save as <code>report3.png</code>.</p>`,
      hint:`Horizontal bar: <code>ax.barh()</code>. Stacked bar: two <code>ax.bar()</code> calls with the second having <code>bottom=first_values</code>. Use <code>fig, axes = plt.subplots(1, 3, figsize=(15, 5))</code>.`,
      solution:`import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# 1 — Horizontal bar
courses = ["Python","SQL","ML","Viz","Stats"]
lessons = [39, 28, 35, 20, 24]
axes[0].barh(courses, lessons, color="#2196F3", edgecolor="white")
axes[0].set_title("Lessons per Course"); axes[0].set_xlabel("Lessons")

# 2 — Stacked bar
batches = ["2024-A","2024-B","2024-C"]
male   = [28, 35, 22]
female = [32, 29, 38]
x = np.arange(len(batches))
axes[1].bar(x, male,   label="Male",   color="#2196F3", width=0.5)
axes[1].bar(x, female, bottom=male,    color="#E91E63", width=0.5, label="Female")
axes[1].set_xticks(x); axes[1].set_xticklabels(batches)
axes[1].set_title("Gender Split per Batch"); axes[1].set_ylabel("Students")
axes[1].legend()

# 3 — Line chart
weeks = list(range(1, 9))
batch_a = [55, 62, 68, 71, 75, 79, 83, 88]
batch_b = [52, 60, 65, 69, 74, 77, 81, 86]
axes[2].plot(weeks, batch_a, "o-", label="Batch A", color="#4CAF50", linewidth=2)
axes[2].plot(weeks, batch_b, "s-", label="Batch B", color="#FF9800", linewidth=2)
axes[2].set_title("Weekly Avg Score"); axes[2].set_xlabel("Week"); axes[2].set_ylabel("Score")
axes[2].legend()

for ax in axes: ax.spines[["top","right"]].set_visible(False)
plt.tight_layout()
plt.savefig("report3.png", dpi=150)
plt.show()` }
  ]
};

L['python-w8-l3'] = {
  duration_mins: 12,
  sections: [
    { type:'text', body:`
<h2>Exploratory Data Analysis (EDA) — The Full Workflow</h2>
<p>EDA is what every data scientist does before any modelling. It is how you learn what your data actually contains, find problems (missing values, outliers, strange distributions), and generate hypotheses worth testing.</p>
<p>This lesson walks you through a complete EDA on a realistic dataset — start to finish. The dataset contains 100 student records with realistic noise: missing values, an outlier, and some interesting patterns to find.</p>
`},
    { type:'code', src:`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(2024)
n = 100

# ── Generate realistic student dataset ───────────────────
df = pd.DataFrame({
    "student_id": [f"S{i:03d}" for i in range(1, n+1)],
    "age":        np.random.randint(20, 30, n),
    "city":       np.random.choice(["Mumbai","Delhi","Bengaluru","Chennai","Hyderabad"], n,
                                   p=[0.3,0.2,0.25,0.15,0.1]),
    "study_hrs":  np.round(np.random.normal(4.5, 1.5, n).clip(0.5, 10), 1),
    "python":     np.random.normal(72, 15, n).clip(35, 100).round(1),
    "sql":        np.random.normal(68, 12, n).clip(35, 100).round(1),
    "ml":         np.random.normal(65, 18, n).clip(30, 100).round(1),
    "employed":   np.random.choice([True, False], n, p=[0.68, 0.32]),
})

# Inject some noise:
df.loc[np.random.choice(n, 5, replace=False), "python"] = np.nan   # 5 missing
df.loc[4, "study_hrs"] = 25   # one obvious outlier
df.loc[np.random.choice(n, 3, replace=False), "sql"] = np.nan

print("=== STEP 1: FIRST LOOK ===")
print(f"Shape: {df.shape}")
print(df.head())`,
      out:`=== STEP 1: FIRST LOOK ===
Shape: (100, 9)
  student_id  age       city  study_hrs  python  sql   ml  employed
0       S001   24     Mumbai        3.5    85.2  71.3  58.4      True
1       S002   27      Delhi        5.1    62.1  55.0  74.8     False
2       S003   21  Bengaluru        4.8    78.4  NaN   61.2      True
...` },
    { type:'code', src:`import pandas as pd
import numpy as np

# (continuing from above — df already created)
np.random.seed(2024); n=100
df = pd.DataFrame({
    "student_id": [f"S{i:03d}" for i in range(1,n+1)],
    "age": np.random.randint(20,30,n),
    "city": np.random.choice(["Mumbai","Delhi","Bengaluru","Chennai","Hyderabad"],n,p=[0.3,0.2,0.25,0.15,0.1]),
    "study_hrs": np.round(np.random.normal(4.5,1.5,n).clip(0.5,10),1),
    "python": np.random.normal(72,15,n).clip(35,100).round(1),
    "sql": np.random.normal(68,12,n).clip(35,100).round(1),
    "ml": np.random.normal(65,18,n).clip(30,100).round(1),
    "employed": np.random.choice([True,False],n,p=[0.68,0.32]),
})
df.loc[np.random.choice(n,5,replace=False),"python"] = np.nan
df.loc[4,"study_hrs"] = 25
df.loc[np.random.choice(n,3,replace=False),"sql"] = np.nan

print("=== STEP 2: MISSING VALUES ===")
missing = df.isnull().sum()
print(missing[missing > 0])
print()

print("=== STEP 3: SUMMARY STATISTICS ===")
print(df[["study_hrs","python","sql","ml"]].describe().round(1))`,
      out:`=== STEP 2: MISSING VALUES ===
python    5
sql       3
dtype: int64

=== STEP 3: SUMMARY STATISTICS ===
       study_hrs  python    sql     ml
count     100.0    95.0   97.0  100.0
mean        4.8    71.8   68.3   64.9
std         2.1    14.6   12.1   17.4
min         0.5    35.0   35.0   30.0
25%         3.5    60.5   59.8   52.0
50%         4.5    72.3   69.1   65.4
75%         5.7    82.1   76.8   77.3
max        25.0   100.0   99.2   99.8` },
    { type:'code', src:`# (continuing) — clean the data and visualise
# ... df defined as above (abbreviated here)

print("=== STEP 4: HANDLE OUTLIER & MISSING VALUES ===")
# Cap study hours at 10 (the outlier at 25 is clearly a data entry error):
df["study_hrs"] = df["study_hrs"].clip(upper=10)

# Fill missing scores with the column median (conservative imputation):
df["python"] = df["python"].fillna(df["python"].median())
df["sql"]    = df["sql"].fillna(df["sql"].median())

print(f"study_hrs max after capping: {df['study_hrs'].max()}")
print(f"Missing values remaining:    {df.isnull().sum().sum()}")
print()

# Add derived columns:
df["avg_score"] = df[["python","sql","ml"]].mean(axis=1).round(1)
df["performance"] = pd.cut(df["avg_score"],
                           bins=[0,60,75,90,100],
                           labels=["Weak","Average","Good","Excellent"])

print("=== STEP 5: KEY FINDINGS ===")
print("Performance distribution:")
print(df["performance"].value_counts().sort_index())
print()
print("Employment rate by performance:")
print(df.groupby("performance")["employed"].mean().round(2))`,
      out:`=== STEP 4: HANDLE OUTLIER & MISSING VALUES ===
study_hrs max after capping: 10.0
Missing values remaining:    0

=== STEP 5: KEY FINDINGS ===
Performance distribution:
performance
Weak          18
Average       45
Good          29
Excellent      8
dtype: int64

Employment rate by performance:
performance
Weak         0.33
Average      0.64
Good         0.79
Excellent    1.00
dtype: float64` },
    { type:'tip', body:`The findings above tell a clear story: employment rate climbs steadily with performance — from 33% for weak students to 100% for excellent ones. This is the kind of insight EDA is designed to surface.` },
    { type:'exercise', title:'Mini EDA on your own dataset',
      body:`<p>Download any CSV from a public source (or create one with at least 50 rows and 5 columns — include some numeric and some categorical fields). Run a full EDA: (1) display shape and data types, (2) check for and handle missing values, (3) print summary statistics for numeric columns, (4) produce at least two charts (e.g. a histogram and a bar chart of a categorical column), (5) state two insights you found.</p>`,
      hint:`The <code>df.info()</code> call is your best friend for step 1 and 2 combined. For charts: <code>df["numeric_col"].hist()</code> and <code>df["cat_col"].value_counts().plot(kind='bar')</code> get you started quickly.`,
      solution:`# Template — adapt to your own data
import pandas as pd
import matplotlib.pyplot as plt

# df = pd.read_csv("your_data.csv")

# 1. Shape and types
print(df.shape)
print(df.dtypes)

# 2. Missing values
print(df.isnull().sum())
df = df.dropna(subset=["critical_col"])  # or fillna

# 3. Summary statistics
print(df.describe())

# 4. Charts
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
df["numeric_col"].hist(bins=20, ax=ax1, color="#2196F3")
ax1.set_title("Distribution of numeric_col")

df["cat_col"].value_counts().plot(kind="bar", ax=ax2, color="#4CAF50")
ax2.set_title("Category counts")
plt.tight_layout()
plt.savefig("eda_charts.png", dpi=150)
plt.show()

# 5. Two insights from your data` }
  ]
};

L['python-w8-l4'] = {
  duration_mins: 25,
  sections: [
    { type:'text', body:`
<h2>Capstone Project — Data Science Pipeline from Scratch</h2>
<p>You've spent 8 weeks building Python skills: variables, control flow, functions, OOP, file handling, exceptions, NumPy, Pandas, and Matplotlib. This capstone project ties them all together in one complete, real-world data science pipeline.</p>
<p><strong>Project:</strong> Analyse a student performance dataset, identify at-risk students, generate a report, and produce a visualisation dashboard. Every section uses a different skill from the course.</p>
<h3>The full pipeline — read carefully before running</h3>
<p>The project is structured in 6 stages. Read each stage's code and understand what it does before moving on.</p>
<h4>Stage 1 — Data Generation (simulating a real CSV)</h4>
`},
    { type:'code', src:`import pandas as pd
import numpy as np
import json
import matplotlib.pyplot as plt
from contextlib import contextmanager
import time

np.random.seed(2024)
N = 200   # 200 students

# ── Generate the dataset ──────────────────────────────────
batches = np.random.choice(["2024-A","2024-B","2024-C"], N, p=[0.4,0.35,0.25])
cities  = np.random.choice(["Mumbai","Delhi","Bengaluru","Chennai","Hyderabad"],
                            N, p=[0.25,0.20,0.25,0.15,0.15])

raw = pd.DataFrame({
    "student_id": [f"DSA{i:04d}" for i in range(1, N+1)],
    "name":       [f"Student_{i:04d}" for i in range(1, N+1)],
    "batch":      batches,
    "city":       cities,
    "age":        np.random.randint(20, 32, N),
    "study_hrs":  np.round(np.random.normal(4, 1.8, N).clip(0.5, 12), 1),
    "python":     np.random.normal(70, 16, N).clip(30, 100).round(1),
    "sql":        np.random.normal(67, 14, N).clip(30, 100).round(1),
    "ml":         np.random.normal(63, 18, N).clip(25, 100).round(1),
    "projects":   np.random.randint(0, 5, N),
    "attendance": np.round(np.random.normal(78, 12, N).clip(40, 100), 1),
})

# Inject realistic noise:
raw.loc[np.random.choice(N, 12, replace=False), "python"]     = np.nan
raw.loc[np.random.choice(N, 8,  replace=False), "sql"]        = np.nan
raw.loc[np.random.choice(N, 15, replace=False), "attendance"] = np.nan

raw.to_csv("raw_students.csv", index=False)
print(f"Generated raw_students.csv — {N} students, {raw.shape[1]} columns")
print(f"Missing values:\\n{raw.isnull().sum()[raw.isnull().sum()>0]}")`,
      out:`Generated raw_students.csv — 200 students, 11 columns
Missing values:
python        12
sql            8
attendance    15
dtype: int64` },
    { type:'text', body:`<h4>Stage 2 — Data Cleaning (File I/O + Exceptions + Pandas)</h4>`},
    { type:'code', src:`@contextmanager
def pipeline_stage(name):
    """Context manager that times and logs each pipeline stage."""
    print(f"\\n{'='*55}")
    print(f"  STAGE: {name}")
    print(f"{'='*55}")
    start = time.time()
    try:
        yield
        print(f"  ✓ Completed in {time.time()-start:.2f}s")
    except Exception as e:
        print(f"  ✗ FAILED: {e}")
        raise

with pipeline_stage("Load & Clean Data"):
    df = pd.read_csv("raw_students.csv")

    # Impute missing numeric values with column medians:
    for col in ["python","sql","attendance"]:
        median = df[col].median()
        n_missing = df[col].isnull().sum()
        df[col] = df[col].fillna(median)
        print(f"  Imputed {n_missing} missing '{col}' values with median {median:.1f}")

    # Remove duplicates (none here, but good practice):
    before = len(df)
    df = df.drop_duplicates(subset="student_id")
    print(f"  Removed {before - len(df)} duplicate records")

    print(f"  Clean dataset: {df.shape[0]} rows × {df.shape[1]} cols")`,
      out:`
=======================================================
  STAGE: Load & Clean Data
=======================================================
  Imputed 12 missing 'python' values with median 70.2
  Imputed 8 missing 'sql' values with median 67.1
  Imputed 15 missing 'attendance' values with median 78.3
  Removed 0 duplicate records
  Clean dataset: 200 rows × 11 cols
  ✓ Completed in 0.04s` },
    { type:'text', body:`<h4>Stage 3 — Feature Engineering (NumPy + Pandas)</h4>`},
    { type:'code', src:`with pipeline_stage("Feature Engineering"):
    # Composite score (weighted: projects and attendance matter):
    df["score"] = (
        df["python"]     * 0.30 +
        df["sql"]        * 0.25 +
        df["ml"]         * 0.25 +
        df["projects"]   * 4.0  +   # each project = 4 points
        df["attendance"] * 0.20
    ).round(1)

    # Z-score normalisation of study hours:
    df["study_z"] = ((df["study_hrs"] - df["study_hrs"].mean())
                     / df["study_hrs"].std()).round(2)

    # Risk flag — at risk if score < 60 OR attendance < 65:
    df["at_risk"] = (df["score"] < 60) | (df["attendance"] < 65)

    # Performance band:
    df["band"] = pd.cut(df["score"],
                        bins=[0, 55, 65, 80, 100],
                        labels=["Critical","Developing","Proficient","Advanced"])

    at_risk_count = df["at_risk"].sum()
    print(f"  At-risk students: {at_risk_count} ({at_risk_count/len(df)*100:.1f}%)")
    print(f"  Score range: {df['score'].min():.1f} – {df['score'].max():.1f}")
    print(f"  Band distribution:\\n{df['band'].value_counts().sort_index().to_string()}")`,
      out:`
=======================================================
  STAGE: Feature Engineering
=======================================================
  At-risk students: 23 (11.5%)
  Score range: 38.4 – 95.7
  Band distribution:
  Critical      23
  Developing    47
  Proficient    89
  Advanced      41
  ✓ Completed in 0.02s` },
    { type:'text', body:`<h4>Stage 4 — Analysis (groupby + OOP)</h4>`},
    { type:'code', src:`class BatchReport:
    """Encapsulates per-batch statistics and report generation."""
    def __init__(self, df):
        self.df      = df
        self.summary = df.groupby("batch").agg(
            students     =("student_id","count"),
            avg_score    =("score","mean"),
            at_risk      =("at_risk","sum"),
            avg_attend   =("attendance","mean"),
            avg_projects =("projects","mean"),
        ).round(1)

    def top_student(self, batch):
        batch_df = self.df[self.df["batch"]==batch]
        idx = batch_df["score"].idxmax()
        return batch_df.loc[idx, ["student_id","score"]]

    def __str__(self):
        return f"BatchReport: {len(self.df)} students across {self.df['batch'].nunique()} batches"

with pipeline_stage("Batch Analysis"):
    report = BatchReport(df)
    print(f"  {report}")
    print()
    print(report.summary.to_string())
    print()
    for batch in sorted(df["batch"].unique()):
        top = report.top_student(batch)
        print(f"  Top in {batch}: {top['student_id']} (score {top['score']:.1f})")`,
      out:`
=======================================================
  STAGE: Batch Analysis
=======================================================
  BatchReport: 200 students across 3 batches

           students  avg_score  at_risk  avg_attend  avg_projects
batch
2024-A           81       72.1        9        78.4           1.9
2024-B           70       71.8        8        77.9           2.1
2024-C           49       70.9        6        78.1           2.0

  Top in 2024-A: DSA0023 (score 94.8)
  Top in 2024-B: DSA0112 (score 95.7)
  Top in 2024-C: DSA0178 (score 93.2)
  ✓ Completed in 0.03s` },
    { type:'text', body:`<h4>Stage 5 — Visualisation Dashboard (Matplotlib)</h4>`},
    { type:'code', src:`with pipeline_stage("Visualisation Dashboard"):
    fig = plt.figure(figsize=(16, 10))
    fig.suptitle("DSA Student Performance Dashboard — 2024",
                 fontsize=18, fontweight="bold", y=1.01)

    # ── Plot 1: Score distribution histogram ──────────────
    ax1 = fig.add_subplot(2, 3, 1)
    ax1.hist(df["score"], bins=20, color="#3F51B5", edgecolor="white", alpha=0.85)
    ax1.axvline(df["score"].mean(), color="red", linestyle="--", linewidth=2,
                label=f"Mean: {df['score'].mean():.1f}")
    ax1.set_title("Score Distribution"); ax1.set_xlabel("Score")
    ax1.legend(); ax1.spines[["top","right"]].set_visible(False)

    # ── Plot 2: Performance bands pie ─────────────────────
    ax2 = fig.add_subplot(2, 3, 2)
    band_counts = df["band"].value_counts().sort_index()
    colors = ["#F44336","#FF9800","#4CAF50","#2196F3"]
    ax2.pie(band_counts, labels=band_counts.index, autopct="%1.0f%%",
            colors=colors, startangle=90)
    ax2.set_title("Performance Bands")

    # ── Plot 3: Study hours vs score scatter ──────────────
    ax3 = fig.add_subplot(2, 3, 3)
    sc = ax3.scatter(df["study_hrs"], df["score"],
                     c=df["at_risk"].astype(int),
                     cmap="RdYlGn_r", alpha=0.6, s=30)
    ax3.set_xlabel("Study Hours/Day"); ax3.set_ylabel("Score")
    ax3.set_title("Study Hours vs Score")
    plt.colorbar(sc, ax=ax3, label="At Risk")
    ax3.spines[["top","right"]].set_visible(False)

    # ── Plot 4: Batch comparison bar ──────────────────────
    ax4 = fig.add_subplot(2, 3, 4)
    batches = report.summary.index
    x = np.arange(len(batches))
    ax4.bar(x, report.summary["avg_score"], color="#2196F3", width=0.5)
    ax4.set_xticks(x); ax4.set_xticklabels(batches)
    ax4.set_ylim(60, 80); ax4.set_title("Avg Score by Batch")
    ax4.set_ylabel("Score"); ax4.spines[["top","right"]].set_visible(False)

    # ── Plot 5: At-risk by batch ──────────────────────────
    ax5 = fig.add_subplot(2, 3, 5)
    ax5.bar(x, report.summary["at_risk"], color="#F44336", width=0.5)
    ax5.set_xticks(x); ax5.set_xticklabels(batches)
    ax5.set_title("At-Risk Count by Batch")
    ax5.set_ylabel("Students"); ax5.spines[["top","right"]].set_visible(False)

    # ── Plot 6: City distribution ─────────────────────────
    ax6 = fig.add_subplot(2, 3, 6)
    city_counts = df["city"].value_counts()
    ax6.barh(city_counts.index, city_counts.values, color="#9C27B0")
    ax6.set_title("Students by City")
    ax6.set_xlabel("Count"); ax6.spines[["top","right"]].set_visible(False)

    plt.tight_layout()
    plt.savefig("capstone_dashboard.png", dpi=150, bbox_inches="tight")
    plt.show()
    print("  Dashboard saved as capstone_dashboard.png")`,
      out:`
=======================================================
  STAGE: Visualisation Dashboard
=======================================================
  Dashboard saved as capstone_dashboard.png
  ✓ Completed in 1.24s` },
    { type:'text', body:`<h4>Stage 6 — Export Report (JSON + CSV + File I/O)</h4>`},
    { type:'code', src:`with pipeline_stage("Export Results"):
    # At-risk student list to CSV:
    at_risk_df = df[df["at_risk"]][["student_id","batch","score","attendance","band"]]
    at_risk_df = at_risk_df.sort_values("score")
    at_risk_df.to_csv("at_risk_students.csv", index=False)

    # Summary report to JSON:
    summary_data = {
        "generated_at": "2024-08-01",
        "total_students": len(df),
        "at_risk": int(df["at_risk"].sum()),
        "avg_score": round(df["score"].mean(), 1),
        "batches": {}
    }
    for batch, row in report.summary.iterrows():
        summary_data["batches"][batch] = {
            "students": int(row["students"]),
            "avg_score": float(row["avg_score"]),
            "at_risk": int(row["at_risk"]),
        }

    with open("summary_report.json", "w") as f:
        json.dump(summary_data, f, indent=2)

    # Human-readable text report:
    with open("report.txt", "w", encoding="utf-8") as f:
        f.write("DSA STUDENT PERFORMANCE REPORT\\n")
        f.write("=" * 50 + "\\n\\n")
        f.write(f"Total students analysed: {len(df)}\\n")
        f.write(f"At-risk students:        {df['at_risk'].sum()} ({df['at_risk'].mean()*100:.1f}%)\\n")
        f.write(f"Overall average score:   {df['score'].mean():.1f}\\n\\n")
        f.write("BATCH SUMMARY\\n" + "-"*30 + "\\n")
        f.write(report.summary.to_string() + "\\n\\n")
        f.write("AT-RISK STUDENTS (first 10)\\n" + "-"*30 + "\\n")
        f.write(at_risk_df.head(10).to_string(index=False) + "\\n")

    print("  Exported: at_risk_students.csv, summary_report.json, report.txt")

    with open("report.txt") as f:
        print("\\n" + f.read())`,
      out:`
=======================================================
  STAGE: Export Results
=======================================================
  Exported: at_risk_students.csv, summary_report.json, report.txt

DSA STUDENT PERFORMANCE REPORT
==================================================

Total students analysed: 200
At-risk students:        23 (11.5%)
Overall average score:   72.0

BATCH SUMMARY
------------------------------
           students  avg_score  at_risk  avg_attend  avg_projects
batch
2024-A           81       72.1        9        78.4           1.9
2024-B           70       71.8        8        77.9           2.1
2024-C           49       70.9        6        78.1           2.0

AT-RISK STUDENTS (first 10)
------------------------------
 student_id   batch  score  attendance     band
   DSA0041  2024-C   38.4        72.3  Critical
   ...
  ✓ Completed in 0.08s` },
    { type:'tip', body:`This capstone used: variables and data types, control flow, functions, OOP (BatchReport class), file I/O (read_csv, to_csv, JSON, text files), exception handling (via the context manager), NumPy (numerical operations), Pandas (cleaning, groupby, pivot), and Matplotlib (6-panel dashboard). That is the complete Python data science toolkit.` },
    { type:'exercise', title:'Extend the capstone — your own feature',
      body:`<p>Pick <strong>one</strong> of the following extensions and implement it:</p>
<ol>
<li><strong>Prediction:</strong> Use a simple linear formula to predict a student's employability score: <code>emp_score = 0.4 × avg_score + 0.3 × projects × 20 + 0.3 × attendance</code>. Add this column to the DataFrame and identify the top 20 students to recommend to hiring partners.</li>
<li><strong>Alerting:</strong> Write a function <code>send_alert(student_row)</code> that simulates sending an email alert for at-risk students (print a formatted message with the student ID, score, and recommended action). Call it for all at-risk students.</li>
<li><strong>Trend analysis:</strong> Simulate 6 months of data (run the same pipeline 6 times with different random seeds, changing the mean score by +1 each month). Plot a line chart showing how the at-risk percentage changes month by month.</li>
</ol>`,
      hint:`For (1): <code>df["emp_score"] = (0.4*df["score"] + 0.3*df["projects"]*20 + 0.3*df["attendance"]).round(1)</code>, then sort descending and take <code>.head(20)</code>. For (2): iterate <code>df[df["at_risk"]].iterrows()</code>. For (3): wrap the pipeline in a function returning the at-risk rate, loop 6 times.`,
      solution:`# Extension 1 — Employability prediction
df["emp_score"] = (0.4*df["score"] + 0.3*df["projects"]*20 + 0.3*df["attendance"]).round(1)
top20 = df.nlargest(20, "emp_score")[["student_id","batch","score","projects","emp_score"]]
print("Top 20 for hiring partners:")
print(top20.to_string(index=False))
top20.to_csv("hiring_recommendations.csv", index=False)

# Extension 2 — At-risk alerts
def send_alert(row):
    action = "Assign mentor" if row["score"] < 50 else "Send study plan"
    print(f"[ALERT] {row['student_id']} | Batch {row['batch']} | "
          f"Score: {row['score']:.1f} | Action: {action}")

for _, student in df[df["at_risk"]].iterrows():
    send_alert(student)

# Extension 3 — Monthly trend
import matplotlib.pyplot as plt
at_risk_rates = []
for month, seed in enumerate(range(2024, 2030)):
    np.random.seed(seed)
    scores = np.random.normal(65 + month, 15, 100).clip(30, 100)
    rate = ((scores < 60).sum() / len(scores)) * 100
    at_risk_rates.append(rate)

months = ["Jan","Feb","Mar","Apr","May","Jun"]
plt.plot(months, at_risk_rates, "o-", color="#F44336", linewidth=2)
plt.title("At-Risk Rate Trend"); plt.ylabel("At-Risk %")
plt.savefig("trend.png", dpi=150); plt.show()` }
  ]
};

})();

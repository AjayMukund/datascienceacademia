/* ════════════════════════════════════════════════════════════════════════════
   DSA Lesson Content — R Programming (6 weeks, 30 lessons)
   Each key maps to lesson.content_url in Supabase (type = 'text')
════════════════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
window.DSA_LESSON_CONTENT = window.DSA_LESSON_CONTENT || {};
const L = window.DSA_LESSON_CONTENT;

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 1 — R BASICS & RSTUDIO
══════════════════════════════════════════════════════════════════════════ */

L['r-w1-l1'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `
<h2>Setup, RStudio Tour &amp; Your First R Script</h2>
<p>R is the language of statisticians, academic researchers, and data analysts. Before Python dominated machine learning, R was the undisputed tool for data analysis — and for statistical modelling, it still is. Understanding R gives you access to the deepest statistical computing ecosystem ever built.</p>
<h3>Installing R and RStudio</h3>
<p>You need two things: <strong>R</strong> (the language engine, from <em>cran.r-project.org</em>) and <strong>RStudio</strong> (the IDE, from <em>posit.co/download/rstudio-desktop</em>). Always install R first, then RStudio. RStudio detects R automatically.</p>
<p>On Windows: download the <code>.exe</code> installer for both. On macOS: download the <code>.pkg</code> files. On Ubuntu: <code>sudo apt install r-base</code> then install RStudio's <code>.deb</code> package.</p>
<h3>The RStudio Interface</h3>
<p>RStudio has four panes:</p>
<ul>
  <li><strong>Source</strong> (top-left): where you write and save <code>.R</code> scripts</li>
  <li><strong>Console</strong> (bottom-left): where R evaluates code live — your interactive scratchpad</li>
  <li><strong>Environment/History</strong> (top-right): all objects currently in memory</li>
  <li><strong>Files/Plots/Help</strong> (bottom-right): file browser, chart output, and documentation</li>
</ul>
<p>Key shortcuts: <kbd>Ctrl+Enter</kbd> (run selected line), <kbd>Alt+-</kbd> (insert <code>&lt;-</code>), <kbd>Ctrl+Shift+M</kbd> (insert <code>%&gt;%</code> pipe). These three shortcuts alone will speed up your workflow dramatically.</p>
` },
    { type: 'code', lang: 'r', src: `# Your first R script — run each line with Ctrl+Enter
print("Hello, Data Science Academia!")

# R as a calculator
2 + 3          # 5
10 / 3         # 3.333...
2 ^ 10         # 1024  (^ is exponentiation)
sqrt(144)      # 12
abs(-42)       # 42

# Assignment — R uses <- (preferred) or =
name <- "Priya Sharma"
score <- 88.5
enrolled <- TRUE

cat("Student:", name, "| Score:", score, "\\n")
cat("Enrolled:", enrolled, "\\n")`,
      out: `[1] "Hello, Data Science Academia!"
[1] 12
Student: Priya Sharma | Score: 88.5
Enrolled: TRUE` },
    { type: 'text', body: `
<h3>R vs Python: When to Use Each</h3>
<table style="width:100%;border-collapse:collapse;font-size:.9rem;margin:1rem 0">
<thead><tr style="background:var(--fog2)">
  <th style="padding:.5rem .8rem;text-align:left">Task</th>
  <th style="padding:.5rem .8rem;text-align:left">R</th>
  <th style="padding:.5rem .8rem;text-align:left">Python</th>
</tr></thead>
<tbody>
<tr><td style="padding:.4rem .8rem">Statistical modelling</td><td style="padding:.4rem .8rem">✅ Best-in-class</td><td style="padding:.4rem .8rem">Good (statsmodels, scipy)</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem">Data visualisation</td><td style="padding:.4rem .8rem">✅ ggplot2 is unmatched</td><td style="padding:.4rem .8rem">Good (matplotlib, seaborn)</td></tr>
<tr><td style="padding:.4rem .8rem">Machine learning</td><td style="padding:.4rem .8rem">Good (tidymodels, caret)</td><td style="padding:.4rem .8rem">✅ Best-in-class</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem">Reproducible reports</td><td style="padding:.4rem .8rem">✅ R Markdown / Quarto</td><td style="padding:.4rem .8rem">Good (Jupyter)</td></tr>
<tr><td style="padding:.4rem .8rem">Production engineering</td><td style="padding:.4rem .8rem">Limited</td><td style="padding:.4rem .8rem">✅ Best-in-class</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem">Academic research</td><td style="padding:.4rem .8rem">✅ Dominant</td><td style="padding:.4rem .8rem">Growing</td></tr>
</tbody></table>
<p>A data scientist fluent in both R and Python is rare and highly valued. R's statistical depth and ggplot2's visualisation quality are genuinely difficult to replicate in Python.</p>
` },
    { type: 'tip', body: `Use the RStudio Project system (<strong>File → New Project</strong>) for every analysis. Projects keep your working directory consistent, make paths relative, and make your work reproducible. Never use <code>setwd()</code> in scripts — it breaks on other machines.` },
    { type: 'exercise', title: 'Your First R Profile',
      body: `<p>Write an R script that:</p>
<ol>
<li>Stores your name, city, and current year in variables using <code>&lt;-</code></li>
<li>Calculates your approximate age if born in 2002</li>
<li>Stores a logical: <code>is_data_scientist &lt;- FALSE</code> (you're learning!)</li>
<li>Uses <code>cat()</code> to print a formatted introduction: <em>"My name is Priya. I am from Chennai. I am 23 years old. Data scientist: FALSE"</em></li>
<li>Uses <code>class()</code> and <code>typeof()</code> to inspect the type of each variable</li>
</ol>`,
      hint: `<code>cat()</code> pastes values together: <code>cat("Name:", name, "\\n")</code>. The <code>\\n</code> is a newline. Use <code>2025 - 2002</code> for the age calculation.`,
      solution: `name <- "Priya"
city <- "Chennai"
year <- 2025
birth_year <- 2002
age <- year - birth_year
is_data_scientist <- FALSE

cat("My name is", name, "\\n")
cat("I am from", city, "\\n")
cat("I am", age, "years old\\n")
cat("Data scientist:", is_data_scientist, "\\n")

# Inspect types
cat("\\nTypes:\\n")
cat("name    :", class(name), typeof(name), "\\n")
cat("age     :", class(age),  typeof(age),  "\\n")
cat("is_ds   :", class(is_data_scientist), "\\n")` }
  ]
};

L['r-w1-l2'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `
<h2>Vectors — The Fundamental R Data Structure</h2>
<p>Everything in R is a vector. A single number like <code>42</code> is a vector of length 1. When you understand vectors deeply, you understand R. Unlike Python where you must import NumPy for array operations, vectorised computing is <em>built into base R</em>.</p>
<h3>Creating Vectors</h3>
<p>The <code>c()</code> function (combine) is the primary way to create vectors. All elements must be the same type — R <em>coerces</em> if they're not.</p>
` },
    { type: 'code', lang: 'r', src: `# Numeric vectors
scores <- c(88, 92, 76, 85, 91, 68, 95, 78)
ages   <- c(22, 24, 21, 23, 25)

# Character vector
cities <- c("Mumbai", "Delhi", "Bengaluru", "Chennai", "Hyderabad")

# Logical vector
passed <- c(TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, TRUE, TRUE)

# Sequences — two efficient shortcuts
1:10                          # 1 2 3 4 5 6 7 8 9 10
seq(0, 1, by = 0.25)          # 0.00 0.25 0.50 0.75 1.00
seq(10, 50, length.out = 5)   # 10 20 30 40 50
rep(0, times = 5)             # 0 0 0 0 0
rep(c(1, 2), times = 3)       # 1 2 1 2 1 2

# Vector length
length(scores)   # 8
length(cities)   # 5`,
      out: `[1]  1  2  3  4  5  6  7  8  9 10
[1] 0.00 0.25 0.50 0.75 1.00
[1] 8` },
    { type: 'text', body: `
<h3>Vectorised Operations — R's Superpower</h3>
<p>Operations on vectors apply element-by-element automatically. This is not a loop — it's a vectorised C operation under the hood, making it extremely fast even on millions of elements.</p>
` },
    { type: 'code', lang: 'r', src: `scores <- c(88, 92, 76, 85, 91, 68, 95, 78)

# All arithmetic applies element-wise
scores + 5          # add 5 to every score
scores * 1.1        # 10% bonus
scores - mean(scores)  # deviation from mean

# Comparison operators return logical vectors
scores >= 80        # TRUE FALSE FALSE TRUE TRUE FALSE TRUE FALSE
scores == max(scores)  # which score is the maximum?

# Vectorised functions
mean(scores)   # 84.125
sum(scores)    # 673
max(scores)    # 95
min(scores)    # 68
sd(scores)     # standard deviation: 9.1
var(scores)    # variance

# Recycling — shorter vector repeats to match longer
c(1,2,3,4,5,6) + c(10,20)   # c(11,22,13,24,15,26) — 10,20 recycles`,
      out: `[1] TRUE FALSE FALSE TRUE TRUE FALSE TRUE FALSE
[1] 84.125
[1] 95
[1] 68` },
    { type: 'text', body: `
<h3>Vector Indexing &amp; Subsetting</h3>
<p>R uses <strong>1-based indexing</strong> (not 0-based like Python). You can index by position, logical vector, or name.</p>
` },
    { type: 'code', lang: 'r', src: `students <- c(priya=88, rajan=92, ananya=76, bala=85, chitra=91)

# Positional indexing (1-based!)
students[1]          # priya   88
students[c(1,3,5)]   # priya ananya chitra
students[-2]         # all except rajan (negative = exclude)
students[2:4]        # rajan ananya bala

# Logical indexing — most useful in data analysis
students[students >= 85]          # priya rajan bala chitra
students[students > mean(students)]  # above-average students

# Named indexing
students["ananya"]    # 76
students[c("priya","chitra")]  # 88 91

# Modifying elements
students["bala"] <- 90   # update Bala's score
students`,
      out: `priya
   88
priya ananya chitra
   88     76     91
priya  rajan   bala chitra
   88     92     85     91` },
    { type: 'warn', body: `In R, <code>students[0]</code> returns an empty vector (not the first element). First element is <code>students[1]</code>. This is the single most common error for Python programmers switching to R.` },
    { type: 'exercise', title: 'Student Score Analysis',
      body: `<p>Given exam scores for 10 students: <code>c(85, 92, 67, 78, 95, 55, 88, 72, 91, 63)</code></p>
<ol>
<li>Assign names: <em>Arjun, Priya, Rajan, Ananya, Bala, Chitra, Dev, Esha, Faiz, Gita</em></li>
<li>Compute: mean, median, standard deviation, range</li>
<li>Create a logical vector <code>passed</code> (score ≥ 70)</li>
<li>Extract the names of students who passed using logical indexing</li>
<li>Find how many students scored above the class average</li>
<li>Scale scores to 0–100 using: <code>(score - min) / (max - min) * 100</code></li>
</ol>`,
      hint: `<code>names(scores) &lt;- c("Arjun", ...)</code> assigns names. <code>names(scores[scores >= 70])</code> extracts names of passing students. For the count above average: <code>sum(scores &gt; mean(scores))</code>.`,
      solution: `scores <- c(85, 92, 67, 78, 95, 55, 88, 72, 91, 63)
names(scores) <- c("Arjun","Priya","Rajan","Ananya","Bala",
                    "Chitra","Dev","Esha","Faiz","Gita")

cat("Mean   :", mean(scores), "\\n")
cat("Median :", median(scores), "\\n")
cat("SD     :", round(sd(scores), 2), "\\n")
cat("Range  :", range(scores), "\\n")

passed <- scores >= 70
cat("Passed :", names(scores[passed]), "\\n")
cat("Above avg:", sum(scores > mean(scores)), "students\\n")

scaled <- (scores - min(scores)) / (max(scores) - min(scores)) * 100
cat("\\nScaled scores:\\n")
print(round(scaled, 1))` }
  ]
};

L['r-w1-l3'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `
<h2>Factors &amp; Core Data Types</h2>
<p>R has a data type that no other major language has: the <strong>factor</strong>. Factors represent categorical data with a fixed set of levels — ordered or unordered. They're fundamental for statistical modelling (R uses them automatically in regression) and for efficient storage of repeated categories.</p>
<h3>R's Core Data Types</h3>
<table style="width:100%;border-collapse:collapse;font-size:.9rem;margin:1rem 0">
<thead><tr style="background:var(--fog2)">
  <th style="padding:.5rem .8rem">Type</th><th style="padding:.5rem .8rem">Example</th><th style="padding:.5rem .8rem">typeof()</th><th style="padding:.5rem .8rem">Notes</th>
</tr></thead>
<tbody>
<tr><td style="padding:.4rem .8rem"><code>numeric</code></td><td style="padding:.4rem .8rem"><code>3.14</code></td><td style="padding:.4rem .8rem">double</td><td style="padding:.4rem .8rem">Default number type</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><code>integer</code></td><td style="padding:.4rem .8rem"><code>5L</code></td><td style="padding:.4rem .8rem">integer</td><td style="padding:.4rem .8rem">The <code>L</code> suffix forces integer</td></tr>
<tr><td style="padding:.4rem .8rem"><code>character</code></td><td style="padding:.4rem .8rem"><code>"hello"</code></td><td style="padding:.4rem .8rem">character</td><td style="padding:.4rem .8rem">R's string type</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><code>logical</code></td><td style="padding:.4rem .8rem"><code>TRUE / FALSE</code></td><td style="padding:.4rem .8rem">logical</td><td style="padding:.4rem .8rem">Always capitalised</td></tr>
<tr><td style="padding:.4rem .8rem"><code>complex</code></td><td style="padding:.4rem .8rem"><code>3+2i</code></td><td style="padding:.4rem .8rem">complex</td><td style="padding:.4rem .8rem">Rare in data science</td></tr>
</tbody></table>
` },
    { type: 'code', lang: 'r', src: `# Type coercion hierarchy: logical < integer < double < character
# When you mix types, R promotes everything to the highest type
c(TRUE, 1L, 3.14)          # all become double: 1.00 1.00 3.14
c(TRUE, 1L, 3.14, "hello") # all become character: "TRUE" "1" "3.14" "hello"

# Explicit type conversion
as.numeric("88.5")    # 88.5
as.integer(3.9)       # 3  (truncates, doesn't round!)
as.character(42)      # "42"
as.logical(0)         # FALSE
as.logical(1)         # TRUE
as.logical("TRUE")    # TRUE

# Missing values — NA is type-specific
NA             # logical NA
NA_real_       # numeric NA
NA_character_  # character NA
is.na(NA)      # TRUE
is.na(42)      # FALSE`,
      out: `[1] 1.00 1.00 3.14
[1] "TRUE" "1" "3.14" "hello"
[1] 3
[1] FALSE` },
    { type: 'text', body: `
<h3>Factors — Categorical Data Done Right</h3>
<p>A factor stores categories as integers internally while displaying labels. This makes them memory-efficient and statistically correct — regression models automatically create dummy variables for factors, and ggplot2 respects their order when plotting.</p>
` },
    { type: 'code', lang: 'r', src: `# Unordered factor (nominal)
city <- factor(c("Mumbai","Delhi","Bengaluru","Mumbai","Chennai","Delhi","Mumbai"))
levels(city)          # "Bengaluru" "Chennai" "Delhi"   "Mumbai"
nlevels(city)         # 4
table(city)           # frequency count

# Ordered factor (ordinal) — order matters!
education <- factor(
  c("Bachelor","Master","PhD","Bachelor","High School","Master"),
  levels  = c("High School","Bachelor","Master","PhD"),
  ordered = TRUE
)
education[1] < education[3]  # TRUE: Bachelor < Master

# Releveling — change the reference level (important for regression)
city <- relevel(city, ref = "Mumbai")
levels(city)[1]  # "Mumbai" is now first

# Converting factor to character or numeric
as.character(city)[1:3]
as.numeric(education)  # 2 3 4 2 1 3  (integer codes)`,
      out: `city
Bengaluru   Chennai     Delhi    Mumbai
        1         1         2         3
[1] TRUE` },
    { type: 'tip', body: `Always use <code>stringsAsFactors = FALSE</code> (the default in R 4.0+) when reading CSV files. In older R, strings were automatically converted to factors — a major source of bugs. Check <code>R.version$major</code> to confirm you're on R 4+.` },
    { type: 'exercise', title: 'Categorical Data Analysis',
      body: `<p>You have survey data from 12 students:</p>
<ul>
<li><code>education</code>: "Bachelor", "Master", "Bachelor", "PhD", "Bachelor", "Master", "High School", "Bachelor", "Master", "PhD", "Bachelor", "Bachelor"</li>
<li><code>city</code>: "Mumbai", "Delhi", "Chennai", "Mumbai", "Bengaluru", "Delhi", "Mumbai", "Chennai", "Delhi", "Mumbai", "Bengaluru", "Chennai"</li>
</ul>
<ol>
<li>Create <code>education</code> as an <strong>ordered factor</strong> (High School &lt; Bachelor &lt; Master &lt; PhD)</li>
<li>Create <code>city</code> as an unordered factor</li>
<li>Use <code>table()</code> to count students per education level and per city</li>
<li>Find the most common education level using <code>which.max(table(...))</code></li>
<li>Create a cross-tabulation: <code>table(city, education)</code></li>
</ol>`,
      hint: `<code>factor(..., levels=c(...), ordered=TRUE)</code>. For <code>which.max</code>: it returns the index; wrap with <code>names(which.max(table(education)))</code> to get the level name.`,
      solution: `education <- factor(
  c("Bachelor","Master","Bachelor","PhD","Bachelor","Master",
    "High School","Bachelor","Master","PhD","Bachelor","Bachelor"),
  levels  = c("High School","Bachelor","Master","PhD"),
  ordered = TRUE
)
city <- factor(c("Mumbai","Delhi","Chennai","Mumbai","Bengaluru","Delhi",
                  "Mumbai","Chennai","Delhi","Mumbai","Bengaluru","Chennai"))

cat("Education distribution:\\n"); print(table(education))
cat("\\nCity distribution:\\n");    print(table(city))
cat("\\nMost common level:", names(which.max(table(education))), "\\n")
cat("\\nCross-tabulation:\\n");    print(table(city, education))` }
  ]
};

L['r-w1-l4'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `
<h2>Control Flow — if/else, Loops &amp; Functions</h2>
<p>R's control flow is similar to other languages, but there's one critical difference: in data analysis, you should use vectorised operations and the <code>apply</code> family instead of loops whenever possible. Loops in R are slower than C-level vectorised operations by 10–100x. Learn loops, then learn when NOT to use them.</p>
<h3>if / else if / else</h3>
` },
    { type: 'code', lang: 'r', src: `# Standard if/else
score <- 82

if (score >= 90) {
  grade <- "A"
} else if (score >= 75) {
  grade <- "B"
} else if (score >= 50) {
  grade <- "C"
} else {
  grade <- "F"
}
cat("Grade:", grade, "\\n")   # B

# ifelse() — vectorised if for entire vectors (use this over loops!)
scores <- c(88, 45, 92, 67, 73, 55, 88)
grades <- ifelse(scores >= 75, "Pass", "Fail")
cat(grades, "\\n")   # Pass Fail Pass Fail Pass Fail Pass

# Nested ifelse for multiple categories
letter_grade <- ifelse(scores >= 90, "A",
                ifelse(scores >= 75, "B",
                ifelse(scores >= 50, "C", "F")))
cat(letter_grade, "\\n")   # B F A C B C B`,
      out: `Grade: B
Pass Fail Pass Fail Pass Fail Pass
B F A C B C B` },
    { type: 'text', body: `<h3>for Loops and while Loops</h3><p>Use loops for sequential tasks where each step depends on the previous one. For applying a function to each element of a vector or list, use <code>sapply()</code> or <code>lapply()</code> instead — they're faster and more idiomatic R.</p>` },
    { type: 'code', lang: 'r', src: `# for loop — iterates over each element
students <- c("Priya", "Rajan", "Ananya", "Bala")
for (student in students) {
  cat("Processing:", student, "\\n")
}

# Loop with index using seq_along() (safer than 1:length())
scores <- c(88, 72, 91, 65)
for (i in seq_along(scores)) {
  cat(students[i], "scored", scores[i],
      if (scores[i] >= 75) "— PASS" else "— FAIL", "\\n")
}

# while loop — use when termination condition is unknown
n <- 1
while (n * n < 100) {
  n <- n + 1
}
cat("First n where n² >= 100:", n, "\\n")   # 10

# break and next (R's continue)
for (i in 1:10) {
  if (i %% 2 == 0) next    # skip even numbers
  if (i > 7)       break   # stop at 7
  cat(i, "")
}
# Output: 1 3 5 7`,
      out: `Processing: Priya
Processing: Rajan
Priya scored 88 — PASS
Rajan scored 72 — FAIL
First n where n² >= 100: 10
1 3 5 7` },
    { type: 'text', body: `<h3>Writing Functions in R</h3><p>Functions are first-class objects in R — you can pass them as arguments, return them from other functions, and store them in lists. The last expression evaluated in a function is its return value (the <code>return()</code> call is optional but recommended for clarity).</p>` },
    { type: 'code', lang: 'r', src: `# Basic function definition
compute_grade <- function(score, max_score = 100) {
  pct <- score / max_score * 100
  if      (pct >= 90) return("A")
  else if (pct >= 75) return("B")
  else if (pct >= 50) return("C")
  else                return("F")
}

compute_grade(82)         # "B"
compute_grade(45, 50)     # "A"  (90%)

# Functions with multiple return values via list
score_summary <- function(x) {
  list(
    n      = length(x),
    mean   = round(mean(x), 2),
    sd     = round(sd(x), 2),
    median = median(x),
    range  = range(x)
  )
}

scores <- c(88, 72, 91, 65, 83, 79)
result <- score_summary(scores)
cat("N:", result$n, "| Mean:", result$mean, "| SD:", result$sd, "\\n")

# Applying a function over a vector — sapply() vs for loop
sapply(scores, compute_grade)   # vectorised application, returns vector`,
      out: `[1] "B"
[1] "A"
N: 6 | Mean: 79.67 | SD: 9.83
[1] "B" "C" "A" "F" "B" "C"` },
    { type: 'tip', body: `Prefer <code>sapply()</code> over for loops when applying a function to each element of a vector. <code>sapply()</code> tries to simplify the result to a vector/matrix; <code>lapply()</code> always returns a list. Use <code>vapply()</code> in production code — it requires you to specify the expected output type, making it safer.` },
    { type: 'exercise', title: 'BMI Calculator with Functions',
      body: `<p>Write two functions:</p>
<ol>
<li><code>bmi(weight_kg, height_m)</code> — returns the BMI rounded to 1 decimal place</li>
<li><code>bmi_category(bmi_val)</code> — returns: "Underweight" (&lt;18.5), "Normal" (18.5–24.9), "Overweight" (25–29.9), "Obese" (≥30)</li>
</ol>
<p>Test with: weights <code>c(55, 78, 92, 48, 105)</code>, heights <code>c(1.65, 1.75, 1.68, 1.58, 1.80)</code>. Use <code>sapply()</code> or <code>mapply()</code> (for two vectors simultaneously) to compute BMI for all, then categorise all using <code>sapply()</code>.</p>`,
      hint: `BMI = weight / height². Use <code>mapply(bmi, weights, heights)</code> to apply a function over two vectors simultaneously. Then <code>sapply(bmi_vals, bmi_category)</code> to categorise.`,
      solution: `bmi <- function(weight_kg, height_m) {
  round(weight_kg / height_m^2, 1)
}

bmi_category <- function(bmi_val) {
  if      (bmi_val < 18.5) "Underweight"
  else if (bmi_val < 25.0) "Normal"
  else if (bmi_val < 30.0) "Overweight"
  else                     "Obese"
}

weights <- c(55, 78, 92, 48, 105)
heights <- c(1.65, 1.75, 1.68, 1.58, 1.80)

bmi_vals  <- mapply(bmi, weights, heights)
categories <- sapply(bmi_vals, bmi_category)

result <- data.frame(
  weight = weights, height = heights,
  bmi = bmi_vals, category = categories
)
print(result)` }
  ]
};

L['r-w1-l5'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `
<h2>String Manipulation &amp; Getting Help in R</h2>
<p>String handling in R uses base R functions and the <strong>stringr</strong> package (part of the tidyverse). Base R strings are less consistent in naming but are always available; stringr is cleaner and preferred for data cleaning tasks.</p>
<h3>Base R String Functions</h3>
` },
    { type: 'code', lang: 'r', src: `# Core string operations
name <- "  Priya Sharma  "
nchar(name)              # 16 (includes spaces)
nchar(trimws(name))      # 12 (trimws removes leading/trailing whitespace)

toupper("hello")         # "HELLO"
tolower("WORLD")         # "world"
trimws("  hello  ")      # "hello"

# Combining strings
paste("Data", "Science")           # "Data Science" (space by default)
paste0("score_", 1:3)              # "score_1" "score_2" "score_3"
paste(c("a","b","c"), collapse="-")  # "a-b-c"

# Splitting and searching
strsplit("Mumbai,Delhi,Chennai", ",")[[1]]  # "Mumbai" "Delhi" "Chennai"
grepl("^[A-Z]", c("Mumbai","delhi","Chennai"))  # TRUE FALSE TRUE
sub("Dr\\.", "Prof.", "Dr. Sharma")          # "Prof. Sharma"
gsub("[aeiou]", "*", "banana")               # "b*n*n*"

# sprintf — like Python f-strings but older
sprintf("Name: %-15s | Score: %5.2f%%", "Priya", 88.5)`,
      out: `[1] "score_1" "score_2" "score_3"
[1] "a-b-c"
[1] "Mumbai" "Delhi" "Chennai"
[1] "Prof. Sharma"
[1] "Name: Priya            | Score: 88.50%"` },
    { type: 'text', body: `<h3>stringr — The Tidyverse String Package</h3><p><code>stringr</code> provides a consistent interface: all functions start with <code>str_</code>, all take the string as the first argument (pipe-friendly), and all return predictable types.</p>` },
    { type: 'code', lang: 'r', src: `library(stringr)

emails <- c("priya@dsa.in", "RAJAN@dsa.in", "  ananya@dsa.in  ", "bala@DSA.IN")

# Consistent, readable string operations
str_trim(emails)                       # remove whitespace
str_to_lower(emails)                   # all lowercase
str_length(emails)                     # character count
str_detect(emails, "@dsa\\.in$")       # ends with @dsa.in?
str_extract(emails, "^[^@]+")          # extract username before @
str_replace_all(emails, "DSA", "dsa")  # case-insensitive normalise

# Clean the email column in a pipeline (preview of Week 3)
clean_emails <- emails |>
  str_trim() |>
  str_to_lower()
print(clean_emails)`,
      out: `[1] "priya@dsa.in"   "rajan@dsa.in"   "ananya@dsa.in"   "bala@dsa.in"
[1] TRUE TRUE TRUE TRUE
[1] "priya@dsa.in" "rajan@dsa.in" "ananya@dsa.in" "bala@dsa.in"` },
    { type: 'text', body: `<h3>Getting Help in R</h3><p>R's help system is comprehensive and always available offline. Knowing how to read documentation is a core skill.</p>` },
    { type: 'code', lang: 'r', src: `# Help for a function
?mean              # opens help pane in RStudio
help("lm")         # same
help.search("correlation")    # search all installed packages

# Examples from the documentation
example(mean)
example(cor)

# Package documentation
browseVignettes("dplyr")   # opens vignettes in browser
vignette("dplyr")          # open a specific vignette

# Find what package a function belongs to
??ggplot           # search installed packages
find("filter")     # shows which packages export 'filter'

# See all functions in a package
ls("package:stringr")` },
    { type: 'tip', body: `When <code>?function_name</code> says "No documentation for 'x' in specified packages", use <code>??x</code> (two question marks) to do a broader search. Also check <strong>CRAN Task Views</strong> (cran.r-project.org/web/views) for curated lists of packages by topic — Statistics, MachineLearning, TimeSeries, etc.` },
    { type: 'exercise', title: 'Data Cleaning Pipeline',
      body: `<p>You receive this raw student data as character strings:</p>
<pre style="background:rgba(255,255,255,.04);padding:.75rem;border-radius:6px;font-size:.82rem">raw <- c("  DSA001 | PRIYA SHARMA | priya@dsa.in | 88  ",
         "DSA002|Rajan Kumar |RAJAN@DSA.IN|76",
         "  DSA003 | ananya REDDY|ananya@dsa.in| 91 ")</pre>
<p>Using base R or stringr, write a function <code>clean_record(raw)</code> that parses each string and returns a list with: <code>id</code> (trimmed), <code>name</code> (title case), <code>email</code> (lowercase), <code>score</code> (integer). Apply it to all 3 records with <code>lapply()</code>.</p>`,
      hint: `Split on <code>"|"</code> using <code>strsplit(raw, "\\\\|")[[1]]</code>. Use <code>trimws()</code> and <code>tools::toTitleCase()</code> for title case (or <code>str_to_title()</code> from stringr). Convert score with <code>as.integer(trimws(parts[4]))</code>.`,
      solution: `library(stringr)

clean_record <- function(raw) {
  parts <- str_split(raw, "\\\\|")[[1]]
  list(
    id    = str_trim(parts[1]),
    name  = str_to_title(str_trim(parts[2])),
    email = str_to_lower(str_trim(parts[3])),
    score = as.integer(str_trim(parts[4]))
  )
}

raw <- c("  DSA001 | PRIYA SHARMA | priya@dsa.in | 88  ",
         "DSA002|Rajan Kumar |RAJAN@DSA.IN|76",
         "  DSA003 | ananya REDDY|ananya@dsa.in| 91 ")

records <- lapply(raw, clean_record)
for (r in records) {
  cat(sprintf("%-10s %-20s %-25s %d\\n", r$id, r$name, r$email, r$score))
}` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 2 — R DATA STRUCTURES
══════════════════════════════════════════════════════════════════════════ */

L['r-w2-l1'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `
<h2>Matrices &amp; Arrays</h2>
<p>A matrix is a 2D vector — all elements must be the same type. Matrices are fundamental in statistical computing: linear algebra, covariance matrices, and model coefficients are all represented as matrices in R.</p>
<h3>Creating Matrices</h3>
` },
    { type: 'code', lang: 'r', src: `# Create a matrix — filled column by column by default
m <- matrix(1:12, nrow = 3, ncol = 4)
m
#      [,1] [,2] [,3] [,4]
# [1,]    1    4    7   10
# [2,]    2    5    8   11
# [3,]    3    6    9   12

# Fill row by row
matrix(1:12, nrow = 3, byrow = TRUE)

# From vectors: rbind (row-bind) and cbind (column-bind)
scores <- c(88, 92, 76)
grades <- c(85, 90, 78)
m2 <- rbind(scores, grades)   # 2 rows
m3 <- cbind(scores, grades)   # 2 columns

# Matrix properties
dim(m)       # 3 4
nrow(m)      # 3
ncol(m)      # 4
t(m)         # transpose: 4x3 matrix`,
      out: `     [,1] [,2] [,3] [,4]
[1,]    1    4    7   10
[2,]    2    5    8   11
[3,]    3    6    9   12` },
    { type: 'code', lang: 'r', src: `# Matrix arithmetic
A <- matrix(c(1,2,3,4), nrow=2)
B <- matrix(c(5,6,7,8), nrow=2)

A + B         # element-wise addition
A * B         # element-wise multiplication (NOT matrix multiply!)
A %*% B       # TRUE matrix multiplication
t(A)          # transpose
det(A)        # determinant: -2
solve(A)      # matrix inverse: A^-1
diag(A)       # extract diagonal: 1 4

# Named rows and columns
exam_scores <- matrix(
  c(88,92,76,85,91,79),
  nrow = 2, ncol = 3,
  dimnames = list(
    c("Midterm","Final"),
    c("Priya","Rajan","Ananya")
  )
)
exam_scores["Midterm", "Rajan"]   # 92
exam_scores["Final",  ]           # all final scores
apply(exam_scores, 2, mean)        # mean per student (margin=2 = columns)`,
      out: `     Priya Rajan Ananya
Midterm    88    92     76
Final      85    91     79

Midterm Final
  85.0  91.0  79.0` },
    { type: 'tip', body: `The <code>apply(matrix, margin, function)</code> function applies a function across rows (margin=1) or columns (margin=2). This is the matrix equivalent of <code>sapply()</code> and is far faster than a for loop over rows or columns.` },
    { type: 'exercise', title: 'Marks Matrix Operations',
      body: `<p>Create a 4×5 marks matrix for 4 subjects (Maths, Python, Statistics, R) and 5 students (Arjun, Priya, Rajan, Ananya, Bala). Use these marks:</p>
<pre style="background:rgba(255,255,255,.04);padding:.75rem;border-radius:6px;font-size:.82rem">Maths    : 85, 92, 78, 88, 70
Python   : 90, 88, 82, 95, 75
Statistics: 78, 85, 70, 82, 68
R        : 88, 91, 75, 87, 72</pre>
<ol>
<li>Name the rows and columns appropriately</li>
<li>Use <code>apply()</code> to compute: average per student (across subjects) and average per subject (across students)</li>
<li>Find the student with the highest overall average</li>
<li>Find which subject has the highest class average</li>
</ol>`,
      hint: `<code>apply(marks, 2, mean)</code> gives averages across subjects per student (margin=2=columns). <code>which.max(student_avgs)</code> returns the index of the highest-average student.`,
      solution: `marks <- matrix(
  c(85,90,78,88, 92,88,85,91, 78,82,70,75, 88,95,82,87, 70,75,68,72),
  nrow = 4,
  dimnames = list(
    c("Maths","Python","Statistics","R"),
    c("Arjun","Priya","Rajan","Ananya","Bala")
  )
)

student_avg <- apply(marks, 2, mean)
subject_avg <- apply(marks, 1, mean)

cat("Student averages:\\n"); print(round(student_avg, 1))
cat("\\nSubject averages:\\n"); print(round(subject_avg, 1))
cat("\\nBest student:", names(which.max(student_avg)), "\\n")
cat("Hardest subject:", names(which.min(subject_avg)), "\\n")` }
  ]
};

L['r-w2-l2'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `
<h2>Lists — Heterogeneous Containers</h2>
<p>A list can hold any combination of types — a number, a character, a vector, another list, a function. Lists are R's equivalent of Python dictionaries and are the backbone of how R models return results: <code>lm()</code>, <code>t.test()</code>, and most model functions return complex lists.</p>
<h3>Creating and Accessing Lists</h3>
` },
    { type: 'code', lang: 'r', src: `# A student record as a list
student <- list(
  id      = "DSA001",
  name    = "Priya Sharma",
  scores  = c(88, 92, 85, 79),
  city    = "Mumbai",
  active  = TRUE
)

# Three ways to access elements
student$name              # "Priya Sharma"  ($ notation — most common)
student[["scores"]]       # c(88,92,85,79) (returns the element itself)
student["name"]           # returns a list of length 1 (NOT the element)
student[[2]]              # "Priya Sharma"  (by position)

# Nested lists — accessing deep elements
school <- list(
  name     = "Data Science Academia",
  batch    = list(year = 2025, section = "A"),
  students = list(student)
)

school$batch$year               # 2025
school[["students"]][[1]]$name  # "Priya Sharma"`,
      out: `[1] "Priya Sharma"
[1] 88 92 85 79
[1] 2025
[1] "Priya Sharma"` },
    { type: 'code', lang: 'r', src: `# Modifying lists
student$phone <- "+91 99887 65432"  # add new element
student$city  <- "Bengaluru"        # update element
student[["scores"]] <- NULL         # delete element

# Useful list functions
length(student)           # 5 (after deletion)
names(student)            # "id" "name" "city" "active" "phone"
str(student)              # compact display of structure

# Converting between lists and vectors
scores_list <- list(88, 92, 85, 79)
scores_vec  <- unlist(scores_list)   # list -> named vector

# lapply and sapply on lists
students <- list(
  list(name="Priya",  score=88),
  list(name="Rajan",  score=72),
  list(name="Ananya", score=91)
)
names_vec <- sapply(students, function(s) s$name)
score_vec <- sapply(students, function(s) s$score)
cat("Names:", names_vec, "\\n")
cat("Scores:", score_vec, "\\n")`,
      out: `Names: Priya Rajan Ananya
Scores: 88 72 91` },
    { type: 'exercise', title: 'Student Registry as Nested List',
      body: `<p>Create a list <code>registry</code> containing 3 student records. Each student should have: <code>id</code>, <code>name</code>, <code>courses</code> (a character vector of 2–3 courses), <code>scores</code> (named numeric vector), and <code>active</code> (logical).</p>
<ol>
<li>Use <code>sapply()</code> to extract all student names</li>
<li>Use <code>sapply()</code> to compute each student's average score</li>
<li>Find the student with the highest average</li>
<li>Add an <code>overall_grade</code> element to each student using a for loop or <code>lapply()</code></li>
</ol>`,
      hint: `Access nested elements with <code>sapply(registry, function(s) mean(s$scores))</code>. For adding elements: <code>registry[[i]]$overall_grade &lt;- ...</code> inside a for loop.`,
      solution: `registry <- list(
  list(id="DSA001", name="Priya",  courses=c("R","Python","ML"),
       scores=c(R=88, Python=92, ML=85), active=TRUE),
  list(id="DSA002", name="Rajan",  courses=c("R","SQL"),
       scores=c(R=72, SQL=80), active=TRUE),
  list(id="DSA003", name="Ananya", courses=c("R","Python","DL"),
       scores=c(R=91, Python=87, DL=94), active=FALSE)
)

names_v <- sapply(registry, function(s) s$name)
avgs    <- sapply(registry, function(s) mean(s$scores))
cat("Names:", names_v, "\\n")
cat("Averages:", round(avgs, 1), "\\n")
cat("Best student:", names_v[which.max(avgs)], "\\n")

for (i in seq_along(registry)) {
  avg <- mean(registry[[i]]$scores)
  registry[[i]]$overall_grade <- if (avg >= 85) "A" else if (avg >= 70) "B" else "C"
}
sapply(registry, function(s) s$overall_grade)` }
  ]
};

L['r-w2-l3'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `
<h2>Data Frames &amp; Tibbles</h2>
<p>The data frame is R's central data structure for data analysis — a list of equal-length vectors, displayed as a table. Every column can be a different type. This maps directly to a spreadsheet, a SQL table, or a pandas DataFrame. The tidyverse's <strong>tibble</strong> is a modern, stricter data frame that prints more sensibly and never creates row names.</p>
<h3>Creating Data Frames</h3>
` },
    { type: 'code', lang: 'r', src: `# Create a data frame
students <- data.frame(
  id     = paste0("DSA00", 1:5),
  name   = c("Priya","Rajan","Ananya","Bala","Chitra"),
  city   = c("Mumbai","Delhi","Bengaluru","Chennai","Hyderabad"),
  score  = c(88, 72, 91, 65, 83),
  active = c(TRUE, TRUE, FALSE, TRUE, TRUE),
  stringsAsFactors = FALSE   # always set this for R < 4.0
)

# Basic inspection
nrow(students)       # 5
ncol(students)       # 5
dim(students)        # 5 5
str(students)        # compact structure display
summary(students)    # summary statistics per column
head(students, 3)    # first 3 rows
tail(students, 2)    # last 2 rows`,
      out: `'data.frame':	5 obs. of  5 variables:
 $ id    : chr  "DSA001" "DSA002" "DSA003" "DSA004" ...
 $ name  : chr  "Priya" "Rajan" "Ananya" "Bala" ...
 $ score : num  88 72 91 65 83` },
    { type: 'code', lang: 'r', src: `# Accessing data frame elements
students$name              # column as vector (most common)
students[["score"]]        # same, by name
students[, "city"]         # same, matrix-style
students[1, ]              # first row (returns a data frame)
students[c(1,3,5), ]       # rows 1, 3, 5

# Logical subsetting — the workhorse of data analysis
students[students$score >= 80, ]          # high-scoring students
students[students$city == "Mumbai", "name"]  # name of Mumbai students
students[students$active == TRUE, c("name","score")]

# Adding columns
students$grade <- ifelse(students$score >= 75, "Pass", "Fail")
students$scaled <- round((students$score - min(students$score)) /
                          (max(students$score) - min(students$score)), 2)

# Tibble — the tidyverse data frame
library(tibble)
tb <- as_tibble(students)   # convert existing df to tibble
tb                           # prints max 10 rows, shows column types
tb <- tibble(                # create directly
  x = 1:5,
  y = x * 2,                 # can reference previous columns!
  z = sqrt(y)
)`,
      out: `     id   name       city score active grade scaled
2 DSA002  Rajan      Delhi    72   TRUE  Fail   0.27
4 DSA004   Bala    Chennai    65   TRUE  Fail   0.00` },
    { type: 'tip', body: `Use <code>tibble::glimpse(df)</code> instead of <code>str(df)</code> — it shows one variable per row with type annotations, truncates long values, and works with tibbles and data frames equally. Install once with <code>install.packages("tibble")</code>, then use freely.` },
    { type: 'exercise', title: 'Student Performance Data Frame',
      body: `<p>Create a data frame with 8 student records including: <code>name</code>, <code>batch</code> (A or B), <code>python_score</code>, <code>r_score</code>, <code>sql_score</code>.</p>
<ol>
<li>Add a <code>total</code> column (sum of 3 scores) and an <code>average</code> column</li>
<li>Add a <code>result</code> column: "Distinction" (avg ≥ 80), "Pass" (avg ≥ 50), "Fail"</li>
<li>Extract only students from Batch A who passed</li>
<li>Sort the data frame by average score (descending) using <code>order()</code></li>
<li>Print a summary showing: count per result category, and average scores by batch</li>
</ol>`,
      hint: `Sort with: <code>df[order(-df$average), ]</code>. Count per category: <code>table(df$result)</code>. Average by batch: use <code>tapply(df$average, df$batch, mean)</code>.`,
      solution: `df <- data.frame(
  name = c("Arjun","Priya","Rajan","Ananya","Bala","Chitra","Dev","Esha"),
  batch = c("A","A","B","A","B","B","A","B"),
  python_score = c(88,92,72,85,65,78,91,70),
  r_score      = c(82,89,68,80,70,75,88,65),
  sql_score    = c(79,88,75,82,60,80,85,72),
  stringsAsFactors = FALSE
)
df$total   <- df$python_score + df$r_score + df$sql_score
df$average <- round(df$total / 3, 1)
df$result  <- ifelse(df$average >= 80, "Distinction",
               ifelse(df$average >= 50, "Pass", "Fail"))

cat("Batch A passes:\\n")
print(df[df$batch == "A" & df$result != "Fail", c("name","average","result")])

cat("\\nSorted by average (desc):\\n")
print(df[order(-df$average), c("name","batch","average","result")])

cat("\\nResult counts:\\n"); print(table(df$result))
cat("\\nAvg score by batch:\\n"); print(tapply(df$average, df$batch, mean))` }
  ]
};

L['r-w2-l4'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `
<h2>Importing Data — CSV, Excel, RDS &amp; More</h2>
<p>Real analysis starts with data that lives in files or databases. R has excellent support for every common data format. The rule of thumb: use <code>readr</code> for CSVs (faster than base R, better type inference), <code>readxl</code> for Excel, and <code>arrow</code> for Parquet/large files.</p>
<h3>Reading CSV Files</h3>
` },
    { type: 'code', lang: 'r', src: `library(readr)   # part of tidyverse

# Base R — slower but always available
students_base <- read.csv("students.csv", stringsAsFactors = FALSE)

# readr — faster, better defaults, shows column types
students <- read_csv("students.csv")
# readr shows: "── Column specification ──────────────────────────
# Delimiter: ","
# chr (2): name, city
# dbl (2): score, age

# Controlling types explicitly
students <- read_csv("students.csv",
  col_types = cols(
    id    = col_character(),
    name  = col_character(),
    score = col_double(),
    date  = col_date(format = "%Y-%m-%d")
  )
)

# Writing CSV
write_csv(students, "students_clean.csv")   # readr: no row numbers
write.csv(students, "students_r.csv", row.names = FALSE)  # base R

# Quick demo: create and re-read a file
tmp <- data.frame(
  name  = c("Priya","Rajan","Ananya"),
  score = c(88, 72, 91)
)
write_csv(tmp, "demo.csv")
readLines("demo.csv")   # see the raw text`,
      out: `[1] "name,score"
[1] "Priya,88"
[1] "Rajan,72"
[1] "Ananya,91"` },
    { type: 'code', lang: 'r', src: `library(readxl)

# Reading Excel — .xls and .xlsx
students_xl <- read_excel("students.xlsx")
students_xl <- read_excel("students.xlsx",
  sheet = "Sheet1",    # or sheet number
  range = "A1:E100",   # specific cell range
  na    = c("", "N/A", "-")  # what counts as NA
)

# List all sheets
excel_sheets("students.xlsx")

# R's native binary format — fastest read/write
saveRDS(students, "students.rds")    # save
students2 <- readRDS("students.rds") # load — preserves all R attributes

# Reading from URL (for public datasets)
library(readr)
url <- "https://raw.githubusercontent.com/tidyverse/dplyr/main/data-raw/starwars.csv"
# sw <- read_csv(url)   # read directly from internet

# Useful for large files: skip rows, use only needed columns
big <- read_csv("big_file.csv",
  n_max   = 1000,          # only first 1000 rows
  skip    = 5,             # skip 5 header rows
  col_select = c(name, score, date)  # only these columns
)`,
      out: `[1] "Sheet1" "Sheet2" "Summary"` },
    { type: 'warn', body: `When reading large CSVs with base R <code>read.csv()</code>, it reads the entire file into memory. For files &gt; 500 MB, use <code>data.table::fread()</code> (10x faster than <code>readr</code>) or <code>arrow::read_parquet()</code> for Parquet files. In the tidyverse era, always try <code>readr</code> first.` },
    { type: 'exercise', title: 'Multi-Source Data Load',
      body: `<p>Write R code that:</p>
<ol>
<li>Creates a student data frame (10 rows) and saves it as <em>both</em> CSV and RDS</li>
<li>Reads the CSV back with <code>readr::read_csv()</code> and the RDS back with <code>readRDS()</code></li>
<li>Verifies they are identical with <code>identical()</code> or <code>all.equal()</code></li>
<li>Creates a "messy" CSV (some NA values written as "N/A" or "-") and reads it back with correct NA handling</li>
<li>Reports: number of rows, number of complete cases (<code>complete.cases()</code>), and number of NAs per column</li>
</ol>`,
      hint: `<code>complete.cases(df)</code> returns a logical vector; <code>sum(complete.cases(df))</code> counts complete rows. To count NAs per column: <code>colSums(is.na(df))</code>.`,
      solution: `library(readr)

# Create data
df <- data.frame(
  id    = paste0("S", sprintf("%03d", 1:10)),
  name  = paste0("Student_", LETTERS[1:10]),
  score = c(88,72,NA,91,65,83,NA,79,88,70),
  city  = c("Mumbai","Delhi",NA,"Chennai","Hyderabad",
            "Mumbai","Delhi","Bengaluru",NA,"Chennai")
)

write_csv(df, "students.csv", na = "N/A")
saveRDS(df, "students.rds")

df_csv <- read_csv("students.csv", na = c("","N/A","-"))
df_rds <- readRDS("students.rds")

cat("CSV rows:", nrow(df_csv), "\\n")
cat("Complete cases:", sum(complete.cases(df_csv)), "\\n")
cat("NAs per column:\\n"); print(colSums(is.na(df_csv)))
cat("CSV == RDS:", isTRUE(all.equal(df_csv, df_rds)), "\\n")` }
  ]
};

L['r-w2-l5'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `
<h2>Inspecting, Understanding &amp; Cleaning Raw Data</h2>
<p>Before any analysis, you must understand your data's shape, types, missingness, and distributions. This "first look" step prevents the most dangerous class of errors: running an analysis on data you misunderstood. R has excellent tools for this workflow.</p>
<h3>The First-Look Workflow</h3>
` },
    { type: 'code', lang: 'r', src: `# Load a real-ish dataset (using built-in iris as proxy)
df <- datasets::airquality   # 153 rows, 6 columns, has NAs

# Step 1: Dimensions and structure
dim(df)         # 153 6
str(df)         # compact type overview
dplyr::glimpse(df)  # tidyverse version — nicer for wide dfs

# Step 2: First and last rows
head(df, 3)
tail(df, 3)

# Step 3: Summary statistics
summary(df)     # min/max/mean/quartiles for numeric, counts for factors

# Step 4: Missing values audit
any(is.na(df))           # TRUE — there are NAs
colSums(is.na(df))       # NAs per column
mean(is.na(df$Ozone))    # fraction missing in Ozone column: 0.163

# Step 5: Complete cases
complete_df <- df[complete.cases(df), ]   # keep only full rows
cat("Complete rows:", nrow(complete_df), "/", nrow(df), "\\n")`,
      out: `Ozone   Solar.R      Wind      Temp     Month       Day
   37         7         0         0         0         0
Complete rows: 111 / 153` },
    { type: 'code', lang: 'r', src: `library(dplyr)

# Step 6: Duplicate detection
nrow(df) - nrow(distinct(df))   # 0 = no duplicates

# Step 7: Value distribution check
table(df$Month)        # frequency count
quantile(df$Temp, probs = c(0.01, 0.25, 0.75, 0.99), na.rm = TRUE)

# Step 8: Outlier detection (IQR method)
iqr_outliers <- function(x) {
  q <- quantile(x, c(0.25, 0.75), na.rm = TRUE)
  iqr <- q[2] - q[1]
  x < (q[1] - 1.5 * iqr) | x > (q[2] + 1.5 * iqr)
}

outlier_flags <- sapply(
  df[, c("Ozone","Solar.R","Wind","Temp")],
  function(col) sum(iqr_outliers(col), na.rm = TRUE)
)
cat("Outliers per column:\\n"); print(outlier_flags)

# Step 9: Imputation — replace NA with column median
df_clean <- df
df_clean$Ozone[is.na(df_clean$Ozone)] <- median(df$Ozone, na.rm = TRUE)
cat("NAs remaining:", sum(is.na(df_clean$Ozone)), "\\n")`,
      out: `  5   6   7   8   9
 31  30  31  31  30
Outliers per column:
  Ozone Solar.R    Wind    Temp
      2       0       3       0
NAs remaining: 0` },
    { type: 'tip', body: `Install the <strong>skimr</strong> package: <code>install.packages("skimr")</code>, then <code>skimr::skim(df)</code>. It gives the most comprehensive single-function data summary in R — missing count, histogram, percentiles, and type information in one well-formatted output. It's the professional's replacement for <code>summary()</code>.` },
    { type: 'exercise', title: 'Full Data Audit Report',
      body: `<p>Generate a complete data audit for the built-in <code>mtcars</code> dataset:</p>
<ol>
<li>Report: dimensions, column types, missing values per column, duplicate rows</li>
<li>For each numeric column: mean, median, SD, min, max, and outlier count (IQR method)</li>
<li>Identify the column with the highest coefficient of variation (SD/mean × 100)</li>
<li>Bin the <code>mpg</code> column into 3 categories using <code>cut()</code>: "Low" (&lt;15), "Mid" (15–25), "High" (&gt;25). Count cars in each bin.</li>
</ol>`,
      hint: `<code>cut(mtcars$mpg, breaks=c(0,15,25,Inf), labels=c("Low","Mid","High"))</code>. For coefficient of variation: <code>sd(x)/mean(x)*100</code> per column using <code>sapply()</code>.`,
      solution: `data(mtcars)
cat("Dimensions:", dim(mtcars), "\\n")
cat("Column types:\\n"); print(sapply(mtcars, class))
cat("Missing values:", sum(is.na(mtcars)), "\\n")
cat("Duplicates:", nrow(mtcars) - nrow(unique(mtcars)), "\\n\\n")

iqr_out <- function(x) {
  q <- quantile(x, c(0.25,0.75)); iqr <- q[2]-q[1]
  sum(x < q[1]-1.5*iqr | x > q[2]+1.5*iqr)
}

audit <- data.frame(
  mean    = sapply(mtcars, mean),
  median  = sapply(mtcars, median),
  sd      = sapply(mtcars, sd),
  cv      = sapply(mtcars, function(x) sd(x)/mean(x)*100),
  outliers = sapply(mtcars, iqr_out)
)
print(round(audit, 2))

cat("\\nHighest CV column:", rownames(audit)[which.max(audit$cv)], "\\n")

mpg_bins <- cut(mtcars$mpg, breaks=c(0,15,25,Inf), labels=c("Low","Mid","High"))
cat("\\nMPG bins:\\n"); print(table(mpg_bins))` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 3 — DATA WRANGLING WITH dplyr & tidyr
══════════════════════════════════════════════════════════════════════════ */

L['r-w3-l1'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `
<h2>The Pipe Operator &amp; dplyr Foundations</h2>
<p>The tidyverse's <strong>pipe operator</strong> (<code>|&gt;</code> in base R 4.1+, <code>%&gt;%</code> from magrittr) is one of the most impactful additions to R. It passes the result of the left side as the first argument to the right side — eliminating deeply nested function calls and making code read as a sequence of operations: <em>take data, then filter, then select, then summarise.</em></p>
<h3>The Pipe in Practice</h3>
` },
    { type: 'code', lang: 'r', src: `library(dplyr)

# Without pipe: nested, reads inside-out
result <- arrange(
  filter(
    select(mtcars, mpg, cyl, hp, wt),
    cyl == 6
  ),
  desc(mpg)
)

# With pipe: reads left-to-right, top-to-bottom
result <- mtcars |>
  select(mpg, cyl, hp, wt) |>
  filter(cyl == 6) |>
  arrange(desc(mpg))

print(result)

# The pipe simply passes the LHS as the first argument:
c(3,1,4,1,5,9) |> mean()   # 3.833...
c(3,1,4,1,5,9) |> sort() |> rev()  # 9 5 4 3 1 1`,
      out: `   mpg cyl  hp    wt
   21   6 110 2.620
   21   6 110 2.875
...` },
    { type: 'text', body: `<h3>filter() — Subsetting Rows</h3><p><code>filter()</code> keeps rows where the condition is TRUE. Multiple conditions use <code>&amp;</code> (AND), <code>|</code> (OR), and <code>!</code> (NOT). Use <code>%in%</code> for "is one of".</p>` },
    { type: 'code', lang: 'r', src: `library(dplyr); library(tibble)

students <- tibble(
  name    = c("Priya","Rajan","Ananya","Bala","Chitra","Dev","Esha"),
  batch   = c("A","B","A","B","A","B","A"),
  python  = c(88, 72, 91, 65, 83, 79, 95),
  r_score = c(82, 68, 88, 70, 77, 75, 90),
  city    = c("Mumbai","Delhi","Bengaluru","Chennai","Mumbai","Hyderabad","Delhi")
)

# Single condition
students |> filter(python >= 85)

# Multiple conditions (AND)
students |> filter(batch == "A", python >= 85)

# OR condition
students |> filter(city == "Mumbai" | city == "Delhi")

# %in% — cleaner OR for categorical
students |> filter(city %in% c("Mumbai","Delhi","Chennai"))

# Negation
students |> filter(!batch == "A")   # same as batch == "B"
students |> filter(between(python, 75, 90))  # 75 <= python <= 90

# Filter with string matching (stringr)
students |> filter(stringr::str_starts(name, "P"))`,
      out: `# A tibble: 3 × 5
  name   batch python r_score city
  Priya  A        88      82 Mumbai
  Ananya A        91      88 Bengaluru
  Esha   A        95      90 Delhi` },
    { type: 'text', body: `<h3>select() — Choosing Columns</h3><p><code>select()</code> chooses, reorders, or renames columns. It supports helper functions like <code>starts_with()</code>, <code>ends_with()</code>, <code>contains()</code>, and <code>where()</code>.</p>` },
    { type: 'code', lang: 'r', src: `# Basic column selection
students |> select(name, python, r_score)
students |> select(-city)                    # drop city
students |> select(name, everything())       # name first, then rest

# Selection helpers
students |> select(starts_with("r"))        # r_score (and any others)
students |> select(ends_with("_score") | ends_with("n"))  # r_score, python
students |> select(where(is.numeric))       # only numeric columns

# Renaming within select
students |> select(student_name = name, py = python, r = r_score)

# rename() — rename without dropping other columns
students |> rename(r = r_score, py_score = python)`,
      out: `# A tibble: 7 × 3
  student_name    py     r
  Priya           88    82
  Rajan           72    68` },
    { type: 'exercise', title: 'Flights Data Filtering',
      body: `<p>Use the <code>nycflights13::flights</code> dataset (install with <code>install.packages("nycflights13")</code>). This dataset has 336,776 flights from NYC airports in 2013.</p>
<ol>
<li>Find all flights to Mumbai (dest == "BOM") — how many are there?</li>
<li>Find flights in January that were delayed on departure by more than 2 hours</li>
<li>Find flights operated by United ("UA") or American ("AA") with arrival delay &gt; 30 min</li>
<li>Select only: year, month, day, carrier, origin, dest, dep_delay, arr_delay. Rename dep_delay to "departure_delay" and arr_delay to "arrival_delay".</li>
<li>Find the 5 most common destination airports using <code>count(dest, sort=TRUE)</code></li>
</ol>`,
      hint: `<code>library(nycflights13)</code>. <code>nrow(flights |> filter(...))</code> for counts. <code>count(dest, sort=TRUE) |> head(5)</code> for top destinations.`,
      solution: `library(nycflights13); library(dplyr)

# 1. Flights to BOM
bom <- flights |> filter(dest == "BOM")
cat("Flights to Mumbai:", nrow(bom), "\\n")  # 0 — no direct NYC-Mumbai

# 2. Jan flights, dep_delay > 120 min
jan_delayed <- flights |> filter(month == 1, dep_delay > 120)
cat("Jan long delays:", nrow(jan_delayed), "\\n")

# 3. UA or AA with arr_delay > 30
ua_aa_late <- flights |> filter(carrier %in% c("UA","AA"), arr_delay > 30)
cat("UA/AA late arrivals:", nrow(ua_aa_late), "\\n")

# 4. Select and rename
clean_flights <- flights |>
  select(year, month, day, carrier, origin, dest,
         departure_delay = dep_delay,
         arrival_delay   = arr_delay)
glimpse(clean_flights)

# 5. Top 5 destinations
flights |> count(dest, sort = TRUE) |> head(5)` }
  ]
};

L['r-w3-l2'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `
<h2>mutate(), arrange() &amp; Advanced Column Operations</h2>
<p><code>mutate()</code> is the engine of feature engineering in R. It creates new columns or modifies existing ones without changing the number of rows. Crucially, you can reference newly created columns in the same <code>mutate()</code> call — something not possible with base R's <code>transform()</code>.</p>
<h3>mutate() — Creating and Transforming Columns</h3>
` },
    { type: 'code', lang: 'r', src: `library(dplyr); library(tibble)

students <- tibble(
  name    = c("Priya","Rajan","Ananya","Bala","Chitra","Dev"),
  python  = c(88, 72, 91, 65, 83, 79),
  r_score = c(82, 68, 88, 70, 77, 75),
  sql     = c(85, 76, 90, 68, 80, 72)
)

students |>
  mutate(
    total   = python + r_score + sql,      # new column
    average = round(total / 3, 1),          # uses total just created!
    grade   = case_when(                    # multi-condition categorisation
      average >= 85 ~ "Distinction",
      average >= 70 ~ "Pass",
      TRUE          ~ "Fail"               # TRUE = else
    ),
    percentile = percent_rank(average) * 100  # 0–100 percentile rank
  )`,
      out: `# A tibble: 6 × 8
  name   python r_score   sql total average grade       percentile
  Priya      88      82    85   255    85    Distinction       80
  Rajan      72      68    76   216    72    Pass              20` },
    { type: 'code', lang: 'r', src: `# case_when() — the tidyverse if/else for vectors
# Much cleaner than nested ifelse()
students |>
  mutate(
    tier = case_when(
      python >= 90 & r_score >= 85 ~ "Elite",
      python >= 80 | r_score >= 80 ~ "Advanced",
      python >= 70 | r_score >= 70 ~ "Intermediate",
      .default                      = "Beginner"
    )
  )

# across() — apply same operation to multiple columns
students |>
  mutate(across(c(python, r_score, sql), ~ round(.x / 100 * 10, 1),
                .names = "{.col}_out_of_10"))

# Conditional mutation with if_else()
students |>
  mutate(
    bonus_score = if_else(python >= 85, python * 1.05, python)
  )`,
      out: `# A tibble: 6 × 3
  python_out_of_10 r_score_out_of_10 sql_out_of_10
               8.8               8.2           8.5` },
    { type: 'text', body: `<h3>arrange() — Sorting Rows</h3><p><code>arrange()</code> sorts rows. Use <code>desc()</code> for descending order. Multiple columns create a secondary sort.</p>` },
    { type: 'code', lang: 'r', src: `students_graded <- students |>
  mutate(average = round((python + r_score + sql) / 3, 1))

# Ascending (default)
students_graded |> arrange(average)

# Descending
students_graded |> arrange(desc(average))

# Multiple sort keys — primary by average desc, secondary by name
students_graded |> arrange(desc(average), name)

# NAs sort to the end by default (use na_last argument to control)
tibble(x = c(3, NA, 1, NA, 2)) |>
  arrange(x)   # 1 2 3 NA NA`,
      out: `# Arranged by desc(average):
  name   python r_score   sql average
  Ananya     91      88    90    89.7
  Priya      88      82    85    85.0` },
    { type: 'exercise', title: 'Product Catalogue Analysis',
      body: `<p>Create a tibble of 10 e-commerce products with columns: <code>product_name</code>, <code>category</code> (Electronics/Books/Furniture), <code>price</code>, <code>rating</code> (1–5), <code>units_sold</code>.</p>
<ol>
<li>Add: <code>revenue</code> (price × units_sold), <code>revenue_lakhs</code> (revenue / 100000), <code>price_tier</code> (Budget &lt;1000, Mid 1000–10000, Premium &gt;10000)</li>
<li>Add a <code>rank</code> column ranking products by revenue (1 = highest, using <code>min_rank(desc(revenue))</code>)</li>
<li>Sort by category, then by revenue descending within each category</li>
<li>Use <code>across()</code> to round all numeric columns to 2 decimal places</li>
</ol>`,
      hint: `<code>case_when(price &lt; 1000 ~ "Budget", price &lt;= 10000 ~ "Mid", TRUE ~ "Premium")</code>. <code>min_rank(desc(revenue))</code> gives rank 1 to highest.`,
      solution: `library(dplyr); library(tibble)

products <- tibble(
  product_name = c("Laptop Pro","Mouse","Python Book","Standing Desk","Webcam",
                   "R Handbook","Monitor","Keyboard","Office Chair","SQL Guide"),
  category     = c("Electronics","Electronics","Books","Furniture","Electronics",
                   "Books","Electronics","Electronics","Furniture","Books"),
  price        = c(75000, 1299, 599, 18500, 2499, 799, 28000, 3500, 12000, 699),
  rating       = c(4.5, 4.2, 4.8, 4.3, 3.9, 4.7, 4.4, 4.1, 4.6, 4.5),
  units_sold   = c(120, 450, 380, 85, 200, 310, 95, 320, 60, 290)
)

products |>
  mutate(
    revenue       = price * units_sold,
    revenue_lakhs = round(revenue / 1e5, 2),
    price_tier    = case_when(price < 1000 ~ "Budget", price <= 10000 ~ "Mid", TRUE ~ "Premium"),
    rank          = min_rank(desc(revenue))
  ) |>
  arrange(category, desc(revenue)) |>
  mutate(across(where(is.numeric), ~ round(.x, 2)))` }
  ]
};

L['r-w3-l3'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `
<h2>group_by() &amp; summarise() — Aggregation Workflows</h2>
<p>The <code>group_by()</code> + <code>summarise()</code> combination is the most powerful data analysis pattern in R. It mirrors SQL's <code>GROUP BY</code> + aggregate functions — split data into groups, compute summaries for each group, combine results. This single pattern answers the majority of real business questions.</p>
<h3>Basic Aggregation</h3>
` },
    { type: 'code', lang: 'r', src: `library(dplyr); library(tibble)

sales <- tibble(
  month    = rep(c("Jan","Feb","Mar"), each = 3),
  region   = rep(c("North","South","East"), 3),
  rep_name = c("Arjun","Priya","Rajan","Ananya","Bala","Chitra","Dev","Esha","Faiz"),
  sales    = c(120, 95, 87, 145, 110, 102, 132, 98, 115),
  units    = c(15, 12, 11, 18, 14, 13, 17, 13, 15)
)

# Basic group + summarise
sales |>
  group_by(region) |>
  summarise(
    total_sales = sum(sales),
    avg_sales   = round(mean(sales), 1),
    n_months    = n(),                    # count rows in group
    best_month  = max(sales)
  )`,
      out: `# A tibble: 3 × 5
  region total_sales avg_sales n_months best_month
  East           304     101.3        3        115
  North          397     132.3        3        145
  South          303     101.0        3        110` },
    { type: 'code', lang: 'r', src: `# Multiple grouping variables
sales |>
  group_by(month, region) |>
  summarise(total = sum(sales), .groups = "drop")

# n() and n_distinct()
sales |>
  group_by(region) |>
  summarise(
    reps        = n_distinct(rep_name),
    total_sales = sum(sales),
    avg_units   = mean(units)
  )

# summarise with across() — apply same summary to multiple columns
sales |>
  group_by(region) |>
  summarise(
    across(c(sales, units), list(mean = mean, sd = sd, total = sum),
           .names = "{.col}_{.fn}")
  )

# Filter groups with .by (dplyr 1.1+) or filter after summarise
# Top region per month:
sales |>
  group_by(month) |>
  slice_max(order_by = sales, n = 1)   # keep row with max sales per month`,
      out: `# A tibble: 3 × 4
  region   reps total_sales avg_units
  East        3         304      13.0
  North       3         397      16.7
  South       3         303      13.0` },
    { type: 'tip', body: `Always add <code>.groups = "drop"</code> to <code>summarise()</code> when you don't need the grouping anymore. Without it, the resulting tibble stays grouped by the first variable, which causes confusing behaviour in subsequent operations. Or use <code>ungroup()</code> explicitly at the end of your pipeline.` },
    { type: 'exercise', title: 'Sales Dashboard with dplyr',
      body: `<p>Using the sales tibble above (or a similar one you create), answer these business questions with dplyr pipelines:</p>
<ol>
<li>What is the total revenue by region, sorted highest to lowest?</li>
<li>Which rep had the highest average sales across all months?</li>
<li>For each month, what was the revenue growth vs the previous month? (Hint: create a wide summary first, then compute differences.)</li>
<li>Find all months where any region had sales above 130</li>
<li>Compute what percentage of total sales each region contributed (use <code>mutate()</code> after <code>summarise()</code>)</li>
</ol>`,
      hint: `For percentage: after <code>summarise(total = sum(sales))</code>, use <code>mutate(pct = total / sum(total) * 100)</code> — <code>sum(total)</code> here sums the summarised column (not grouped).`,
      solution: `library(dplyr)

# 1. Revenue by region
sales |> group_by(region) |> summarise(revenue=sum(sales)) |> arrange(desc(revenue))

# 2. Top rep by avg sales
sales |> group_by(rep_name) |> summarise(avg=mean(sales)) |> slice_max(avg, n=1)

# 3. Monthly revenue
monthly <- sales |> group_by(month) |> summarise(rev=sum(sales))
monthly |> mutate(growth = rev - lag(rev))

# 4. Months with any region sales > 130
sales |> group_by(month) |> filter(any(sales > 130)) |> distinct(month)

# 5. Regional share
sales |>
  group_by(region) |>
  summarise(total = sum(sales), .groups="drop") |>
  mutate(pct = round(total / sum(total) * 100, 1))` }
  ]
};

L['r-w3-l4'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `
<h2>Reshaping Data with tidyr</h2>
<p>Most real-world data arrives in a format that's convenient for data entry but inconvenient for analysis. The <strong>tidy data</strong> principle (Hadley Wickham, 2014) defines the correct structure: one variable per column, one observation per row, one value per cell. <code>tidyr</code> provides tools to convert between wide and long formats.</p>
<h3>Wide vs Long Format</h3>
<table style="width:100%;border-collapse:collapse;font-size:.9rem;margin:1rem 0">
<thead><tr style="background:var(--fog2)">
  <th style="padding:.5rem .8rem">Wide format</th><th style="padding:.5rem .8rem">Long (tidy) format</th>
</tr></thead>
<tbody>
<tr><td style="padding:.4rem .8rem">One column per time point/category</td><td style="padding:.4rem .8rem">One row per observation</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem">Easy for humans to read</td><td style="padding:.4rem .8rem">Required for ggplot2 and most models</td></tr>
<tr><td style="padding:.4rem .8rem">Excel pivot tables naturally produce this</td><td style="padding:.4rem .8rem">dplyr group_by works naturally</td></tr>
</tbody></table>
` },
    { type: 'code', lang: 'r', src: `library(tidyr); library(dplyr); library(tibble)

# WIDE format — one column per subject
scores_wide <- tibble(
  student = c("Priya","Rajan","Ananya","Bala"),
  Python  = c(88, 72, 91, 65),
  R       = c(82, 68, 88, 70),
  SQL     = c(85, 76, 90, 68)
)

# pivot_longer() — wide to long (tidy)
scores_long <- scores_wide |>
  pivot_longer(
    cols      = c(Python, R, SQL),   # or: -student, or: where(is.numeric)
    names_to  = "subject",           # new column for old column names
    values_to = "score"              # new column for values
  )

print(scores_long)`,
      out: `# A tibble: 12 × 3
   student subject score
   Priya   Python     88
   Priya   R          82
   Priya   SQL        85
   Rajan   Python     72
   ...` },
    { type: 'code', lang: 'r', src: `# pivot_wider() — long to wide (spread)
scores_long |>
  pivot_wider(
    names_from  = subject,
    values_from = score
  )
# Reconstructs the original wide format

# Real-world use case: monthly revenue — one row per month per region
revenue_long <- tibble(
  month  = rep(c("Jan","Feb","Mar"), 3),
  region = rep(c("North","South","East"), each=3),
  rev    = c(120,145,132, 95,110,98, 87,102,115)
)

# Pivot to wide for a comparison table
revenue_long |>
  pivot_wider(names_from = month, values_from = rev)

# separate() and unite() — split/merge columns
df <- tibble(full_name = c("Priya_Sharma","Rajan_Kumar","Ananya_Reddy"))
df |> separate(full_name, into = c("first","last"), sep = "_")

df2 <- tibble(first = c("Priya","Rajan"), last = c("Sharma","Kumar"))
df2 |> unite("full_name", first, last, sep = " ")`,
      out: `# A tibble: 3 × 4
  region   Jan   Feb   Mar
  East      87   102   115
  North    120   145   132
  South     95   110    98` },
    { type: 'exercise', title: 'Reshape Student Exam Data',
      body: `<p>You receive exam data in wide format with one column per exam:</p>
<pre style="background:rgba(255,255,255,.04);padding:.75rem;border-radius:6px;font-size:.82rem">exams_wide <- tibble(
  student = c("Priya","Rajan","Ananya","Bala","Chitra"),
  mid_python = c(82,68,88,62,79),
  mid_r      = c(78,65,85,60,75),
  final_python = c(90,74,93,70,85),
  final_r      = c(85,72,91,68,82)
)</pre>
<ol>
<li>Pivot to long format with columns: <code>student</code>, <code>exam</code> (mid/final), <code>subject</code> (python/r), <code>score</code>. Hint: use <code>names_sep = "_"</code> with <code>pivot_longer</code>.</li>
<li>Compute improvement (final − midterm) per student per subject</li>
<li>Find which student improved the most overall (sum of improvements)</li>
<li>Pivot back to wide format showing only final scores</li>
</ol>`,
      hint: `<code>pivot_longer(cols=-student, names_to=c("exam","subject"), names_sep="_", values_to="score")</code>. For improvement: <code>pivot_wider(names_from=exam, values_from=score) |> mutate(improvement = final - mid)</code>.`,
      solution: `library(tidyr); library(dplyr); library(tibble)

exams_wide <- tibble(
  student      = c("Priya","Rajan","Ananya","Bala","Chitra"),
  mid_python   = c(82,68,88,62,79), mid_r   = c(78,65,85,60,75),
  final_python = c(90,74,93,70,85), final_r = c(85,72,91,68,82)
)

# 1. Pivot to long
long <- exams_wide |>
  pivot_longer(-student, names_to=c("exam","subject"), names_sep="_", values_to="score")

# 2 & 3. Improvement
improvement <- long |>
  pivot_wider(names_from=exam, values_from=score) |>
  mutate(improvement=final-mid) |>
  group_by(student) |>
  summarise(total_improvement=sum(improvement)) |>
  arrange(desc(total_improvement))
print(improvement)

# 4. Wide with final scores only
long |> filter(exam=="final") |>
  pivot_wider(names_from=subject, values_from=score)` }
  ]
};

L['r-w3-l5'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `
<h2>Join Functions — Combining Data Frames</h2>
<p>Real data lives across multiple tables. Join operations combine them on shared keys. Understanding the difference between join types — particularly the hazard of rows that don't match — is critical for data integrity. R's <code>dplyr</code> joins mirror SQL joins exactly.</p>
<h3>The Four Core Joins</h3>
<table style="width:100%;border-collapse:collapse;font-size:.9rem;margin:1rem 0">
<thead><tr style="background:var(--fog2)">
  <th style="padding:.5rem .8rem">Function</th><th style="padding:.5rem .8rem">Keeps</th><th style="padding:.5rem .8rem">SQL Equivalent</th>
</tr></thead>
<tbody>
<tr><td style="padding:.4rem .8rem"><code>inner_join()</code></td><td style="padding:.4rem .8rem">Rows matching in BOTH tables</td><td style="padding:.4rem .8rem">INNER JOIN</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><code>left_join()</code></td><td style="padding:.4rem .8rem">All left + matching right (NA for no match)</td><td style="padding:.4rem .8rem">LEFT JOIN</td></tr>
<tr><td style="padding:.4rem .8rem"><code>right_join()</code></td><td style="padding:.4rem .8rem">All right + matching left</td><td style="padding:.4rem .8rem">RIGHT JOIN</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><code>full_join()</code></td><td style="padding:.4rem .8rem">All rows from both, NAs where no match</td><td style="padding:.4rem .8rem">FULL OUTER JOIN</td></tr>
</tbody></table>
` },
    { type: 'code', lang: 'r', src: `library(dplyr); library(tibble)

students <- tibble(
  id   = c("S001","S002","S003","S004","S005"),
  name = c("Priya","Rajan","Ananya","Bala","Chitra"),
  batch_id = c("B01","B01","B02","B02","B03")
)

batches <- tibble(
  batch_id   = c("B01","B02","B04"),
  batch_name = c("Python Cohort 1","ML Cohort 1","SQL Cohort 1"),
  start_date = as.Date(c("2025-01-06","2025-02-03","2025-03-03"))
)

# inner_join — only students with a known batch
inner_join(students, batches, by = "batch_id")
# 4 rows: Priya,Rajan,Ananya,Bala  (Chitra's batch B03 not in batches)

# left_join — all students, batch info where available
left_join(students, batches, by = "batch_id")
# 5 rows: Chitra has NA for batch_name and start_date

# anti_join — students with NO matching batch (useful for data quality)
anti_join(students, batches, by = "batch_id")
# Chitra — she's in a batch not yet registered`,
      out: `# inner_join (4 rows):
  id    name  batch_id batch_name      start_date
  S001  Priya    B01  Python Cohort 1  2025-01-06
  S002  Rajan    B01  Python Cohort 1  2025-01-06` },
    { type: 'code', lang: 'r', src: `# Joining on different column names
scores <- tibble(
  student_id = c("S001","S002","S003","S004"),
  python     = c(88, 72, 91, 65),
  r_score    = c(82, 68, 88, 70)
)

# students.id ↔ scores.student_id
left_join(students, scores, by = c("id" = "student_id"))

# Multiple key columns
sessions <- tibble(
  id = c("S001","S001","S002","S003"),
  month = c(1L, 2L, 1L, 1L),
  hours = c(45, 52, 38, 60)
)
attendance <- tibble(
  id = c("S001","S001","S002"),
  month = c(1L, 2L, 1L),
  attended = c(12, 14, 10)
)
inner_join(sessions, attendance, by = c("id","month"))

# bind_rows() — stack data frames vertically (like UNION ALL in SQL)
batch1 <- tibble(name=c("Priya","Rajan"), score=c(88,72), batch="A")
batch2 <- tibble(name=c("Ananya","Bala"), score=c(91,65), batch="B")
bind_rows(batch1, batch2)`,
      out: `# A tibble: 3 × 4
  id    month hours attended
  S001      1    45       12
  S001      2    52       14
  S002      1    38       10` },
    { type: 'warn', body: `<strong>Watch for row multiplication with joins.</strong> If the right table has multiple rows matching a single left-table key, you get duplicate rows in the output. Always check: <code>nrow(result) == nrow(left_table)</code> after a left_join. If it's larger, you have a many-to-many relationship that needs investigation.` },
    { type: 'exercise', title: 'Multi-Table Analysis',
      body: `<p>You have three tables:</p>
<ul>
<li><strong>students</strong>: id, name, city (5 rows)</li>
<li><strong>enrollments</strong>: student_id, course, score (8 rows — some students in multiple courses)</li>
<li><strong>courses</strong>: course, instructor, duration_weeks (4 rows)</li>
</ul>
<ol>
<li>Combine all three to get: student name, city, course, score, instructor</li>
<li>Find students NOT enrolled in any course (<code>anti_join</code>)</li>
<li>Compute each student's average score across all their courses</li>
<li>Find the course with the highest average student score</li>
<li>Check the join integrity: are there any enrollments for student IDs that don't exist in the students table?</li>
</ol>`,
      hint: `Chain two left_joins: <code>enrollments |> left_join(students, by=c("student_id"="id")) |> left_join(courses)</code>. For integrity check: <code>anti_join(enrollments, students, by=c("student_id"="id"))</code>.`,
      solution: `library(dplyr); library(tibble)

students <- tibble(
  id=c("S1","S2","S3","S4","S5"), name=c("Priya","Rajan","Ananya","Bala","Chitra"),
  city=c("Mumbai","Delhi","Bengaluru","Chennai","Hyderabad"))

enrollments <- tibble(
  student_id=c("S1","S1","S2","S3","S3","S4","S5","S6"),
  course=c("Python","R","Python","ML","R","Python","R","SQL"),
  score=c(88,82,72,91,88,65,83,75))

courses <- tibble(
  course=c("Python","R","ML","SQL"),
  instructor=c("Dr. Mehta","Prof. Iyer","Dr. Reddy","Ms. Nair"),
  duration_weeks=c(8,6,10,5))

# 1. Full join
full <- enrollments |>
  left_join(students, by=c("student_id"="id")) |>
  left_join(courses, by="course")
print(full[,c("name","city","course","score","instructor")])

# 2. Not enrolled
anti_join(students, enrollments, by=c("id"="student_id"))

# 3. Avg per student
enrollments |> left_join(students,by=c("student_id"="id")) |>
  group_by(name) |> summarise(avg=round(mean(score),1))

# 4. Best course
enrollments |> group_by(course) |> summarise(avg=mean(score)) |> slice_max(avg)

# 5. Integrity
anti_join(enrollments, students, by=c("student_id"="id"))` }
  ]
};


/* ══════════════════════════════════════════════════════════════════════════
   WEEK 4 — DATA VISUALISATION WITH ggplot2
══════════════════════════════════════════════════════════════════════════ */

L['r-w4-l1'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `
<h2>The Grammar of Graphics — ggplot2 Framework</h2>
<p>ggplot2, created by Hadley Wickham, is the gold standard for statistical visualisation. It implements Leland Wilkinson's "Grammar of Graphics" — a systematic framework where every plot is built from the same components: <strong>data</strong>, <strong>aesthetics</strong> (mappings), and <strong>geoms</strong> (geometric shapes). This means you learn one system and can create any chart.</p>
<h3>The Three-Layer Structure</h3>
<p>Every ggplot2 chart has these required components:</p>
<ol>
<li><strong>Data</strong>: a data frame (or tibble)</li>
<li><strong>Aesthetics</strong> (<code>aes()</code>): map data columns to visual properties (x, y, colour, size, shape)</li>
<li><strong>Geom</strong>: the geometric shape that represents the data (point, line, bar, etc.)</li>
</ol>
<p>Additional layers — scales, themes, labels, facets — are added with <code>+</code>.</p>
` },
    { type: 'code', lang: 'r', src: `library(ggplot2)
library(dplyr)

# Create sample data
students <- data.frame(
  name        = c("Priya","Rajan","Ananya","Bala","Chitra","Dev","Esha","Faiz"),
  study_hours = c(6.5, 4.2, 7.1, 3.0, 5.8, 4.9, 7.5, 3.5),
  score       = c(88, 72, 91, 65, 83, 79, 95, 68),
  batch       = c("A","B","A","B","A","B","A","B")
)

# Minimal ggplot: data + aes + geom
ggplot(data = students, aes(x = study_hours, y = score)) +
  geom_point()

# Add colour, size, labels, theme
ggplot(students, aes(x = study_hours, y = score,
                      colour = batch, size = score)) +
  geom_point(alpha = 0.8) +
  geom_text(aes(label = name), nudge_y = 2, size = 3) +
  geom_smooth(method = "lm", se = FALSE, colour = "gray50", linewidth = 0.7) +
  scale_colour_manual(values = c("A" = "#2196F3", "B" = "#FF5722")) +
  labs(
    title    = "Study Hours vs Exam Score",
    subtitle = "DSA Student Performance — 2025",
    x        = "Daily Study Hours",
    y        = "Exam Score",
    colour   = "Batch",
    size     = "Score"
  ) +
  theme_minimal(base_size = 13) +
  theme(legend.position = "bottom")`,
      out: `[Chart: scatter plot with blue/orange dots, regression line, student labels]` },
    { type: 'text', body: `
<h3>Aesthetic Mappings vs Fixed Properties</h3>
<p>This is the single most important distinction in ggplot2. If a property <em>depends on data</em>, it goes inside <code>aes()</code>. If it's a <em>fixed value</em>, it goes outside <code>aes()</code> as an argument to the geom.</p>
` },
    { type: 'code', lang: 'r', src: `# INSIDE aes() — mapped from data
ggplot(students, aes(x = study_hours, y = score, colour = batch)) +
  geom_point(size = 4, alpha = 0.8)   # size and alpha are FIXED

# OUTSIDE aes() — fixed regardless of data
ggplot(students, aes(x = study_hours, y = score)) +
  geom_point(colour = "steelblue", size = 4, shape = 16)   # all same colour

# Common mistake — colour inside aes() with a literal value
# DON'T: geom_point(aes(colour = "blue"))  ← maps "blue" as a factor, shows legend
# DO:    geom_point(colour = "blue")        ← sets colour directly`,
      out: `[Correct: all points steelblue | Incorrect: one weird legend entry]` },
    { type: 'tip', body: `Save your ggplot to a variable and reuse it: <code>p &lt;- ggplot(...) + geom_point()</code>. Then <code>p + theme_dark()</code> or <code>p + facet_wrap(~batch)</code> without redrawing from scratch. This makes exploration much faster.` },
    { type: 'exercise', title: 'Your First ggplot2 Chart',
      body: `<p>Using the built-in <code>mtcars</code> dataset:</p>
<ol>
<li>Create a scatter plot: <code>wt</code> (x) vs <code>mpg</code> (y). Colour points by <code>cyl</code> (use <code>factor(cyl)</code> to treat it as categorical). Size by <code>hp</code>.</li>
<li>Add a smooth regression line per <code>cyl</code> group using <code>geom_smooth(method="lm")</code></li>
<li>Add proper labels and use <code>theme_classic()</code></li>
<li>Repeat with <code>diamonds</code> dataset: <code>carat</code> vs <code>price</code>, coloured by <code>cut</code>, with alpha=0.1 (why is alpha needed here?)</li>
</ol>`,
      hint: `<code>aes(colour = factor(cyl))</code> converts numeric cylinder count to a discrete factor, which ggplot2 colours separately. With 53,940 diamonds, alpha=0.1 reduces overplotting by making points 90% transparent.`,
      solution: `library(ggplot2)

# 1-3. mtcars
ggplot(mtcars, aes(x=wt, y=mpg, colour=factor(cyl), size=hp)) +
  geom_point(alpha=0.8) +
  geom_smooth(aes(group=factor(cyl)), method="lm", se=FALSE, linewidth=0.7) +
  scale_colour_viridis_d(name="Cylinders") +
  labs(title="Car Weight vs Fuel Efficiency",
       subtitle="Coloured by cylinder count, sized by horsepower",
       x="Weight (1000 lbs)", y="Miles Per Gallon", size="HP") +
  theme_classic(base_size=12)

# 4. Diamonds
ggplot(diamonds, aes(x=carat, y=price, colour=cut)) +
  geom_point(alpha=0.1, size=0.5) +
  scale_colour_viridis_d() +
  labs(title="Diamond Carat vs Price by Cut",
       subtitle="alpha=0.1 reduces overplotting of 53,940 points") +
  theme_minimal()` }
  ]
};

L['r-w4-l2'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `
<h2>Bar Charts, Line Charts &amp; Histograms</h2>
<p>Three of the most common chart types in data analysis. Bar charts compare categories. Line charts show trends over time or ordered categories. Histograms reveal the distribution of a single continuous variable. Each has specific ggplot2 geoms and common pitfalls to avoid.</p>
<h3>Bar Charts with geom_bar() and geom_col()</h3>
<p><code>geom_bar()</code> <em>counts</em> rows automatically. <code>geom_col()</code> uses pre-computed heights from a column. Know which to use: if your data has one row per category with a value column, use <code>geom_col()</code>.</p>
` },
    { type: 'code', lang: 'r', src: `library(ggplot2); library(dplyr)

# geom_bar() — auto-counts
students <- data.frame(batch = c("A","A","B","A","B","B","A","C","C","B"))
ggplot(students, aes(x = batch, fill = batch)) +
  geom_bar() +
  geom_text(stat = "count", aes(label = after_stat(count)),
            vjust = -0.3, fontface = "bold") +
  scale_fill_brewer(palette = "Set2") +
  labs(title = "Students per Batch", x = "Batch", y = "Count") +
  theme_minimal() + theme(legend.position = "none")

# geom_col() — uses pre-computed values
revenue <- data.frame(
  course  = c("Python","R","ML","DL","SQL"),
  revenue = c(450, 280, 620, 510, 190)
)
ggplot(revenue, aes(x = reorder(course, -revenue), y = revenue, fill = course)) +
  geom_col(width = 0.65, colour = "white") +
  geom_text(aes(label = paste0("₹", revenue, "K")), vjust = -0.4, size = 3.5) +
  scale_fill_viridis_d() +
  labs(title = "Revenue by Course (₹ Thousands)", x = NULL, y = "Revenue (₹K)") +
  theme_minimal() + theme(legend.position = "none")`,
      out: `[Bar chart with count labels | Revenue chart sorted by revenue descending]` },
    { type: 'code', lang: 'r', src: `# Line chart — time series
library(lubridate)

monthly <- data.frame(
  month   = seq(as.Date("2025-01-01"), as.Date("2025-12-01"), by="month"),
  revenue = c(42, 48, 61, 73, 85, 98, 112, 125, 138, 151, 165, 180)
)

ggplot(monthly, aes(x = month, y = revenue)) +
  geom_line(colour = "#2196F3", linewidth = 1.5) +
  geom_point(colour = "#2196F3", size = 3, fill = "white", shape = 21, stroke = 2) +
  geom_ribbon(aes(ymin = revenue * 0.9, ymax = revenue * 1.1),
              alpha = 0.15, fill = "#2196F3") +
  scale_x_date(date_labels = "%b %Y", date_breaks = "2 months") +
  labs(title = "DSA Student Growth 2025",
       x = NULL, y = "Enrolled Students") +
  theme_minimal()

# Histogram
scores <- rnorm(200, mean=75, sd=12) |> pmax(0) |> pmin(100)
ggplot(data.frame(score=scores), aes(x=score)) +
  geom_histogram(bins=20, fill="#4CAF50", colour="white", alpha=0.85) +
  geom_vline(xintercept=mean(scores), colour="red", linetype="dashed", linewidth=1) +
  geom_vline(xintercept=median(scores), colour="blue", linetype="dashed", linewidth=1) +
  annotate("text", x=mean(scores)+2, y=25, label=paste0("Mean: ",round(mean(scores),1)),
           colour="red", hjust=0) +
  labs(title="Score Distribution (n=200)", x="Score", y="Count") +
  theme_classic()`,
      out: `[Line chart with ribbon | Histogram with mean/median lines]` },
    { type: 'exercise', title: 'Sales Dashboard Plots',
      body: `<p>Using this sales data:</p>
<pre style="background:rgba(255,255,255,.04);padding:.75rem;border-radius:6px;font-size:.82rem">sales <- data.frame(
  month = rep(month.abb[1:6], 3),
  region = rep(c("North","South","East"), each=6),
  revenue = c(120,145,132,158,175,190, 95,110,102,125,140,155, 87,102,115,128,142,160)
)</pre>
<ol>
<li>Create a grouped bar chart: revenue by month, filled by region</li>
<li>Create a line chart showing revenue trends by region (one line per region)</li>
<li>Create a stacked bar chart of total revenue per month</li>
<li>Use <code>coord_flip()</code> to make a horizontal bar chart of total revenue by region</li>
</ol>`,
      hint: `For grouped bars: <code>geom_col(position="dodge")</code>. For stacked: <code>geom_col(position="stack")</code>. For multi-line: <code>aes(colour=region, group=region)</code>.`,
      solution: `library(ggplot2)
sales <- data.frame(
  month=rep(month.abb[1:6],3), region=rep(c("North","South","East"),each=6),
  revenue=c(120,145,132,158,175,190,95,110,102,125,140,155,87,102,115,128,142,160))
sales$month <- factor(sales$month, levels=month.abb[1:6])

# 1. Grouped bar
ggplot(sales, aes(month,revenue,fill=region)) +
  geom_col(position="dodge") + theme_minimal() + labs(title="Revenue by Month & Region")

# 2. Line chart
ggplot(sales, aes(month,revenue,colour=region,group=region)) +
  geom_line(linewidth=1.2) + geom_point(size=3) + theme_minimal()

# 3. Stacked
ggplot(sales, aes(month,revenue,fill=region)) +
  geom_col(position="stack") + theme_minimal()

# 4. Horizontal region totals
sales |> dplyr::group_by(region) |> dplyr::summarise(total=sum(revenue)) |>
  ggplot(aes(reorder(region,total),total,fill=region)) +
  geom_col() + coord_flip() + theme_minimal() + labs(x=NULL)` }
  ]
};

L['r-w4-l3'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `
<h2>Boxplots, Violin Plots &amp; Statistical Summaries</h2>
<p>When you want to show the <em>distribution</em> of a variable across groups — not just the mean — boxplots and violin plots are your tools. They reveal median, spread, skewness, and outliers simultaneously. A boxplot showing the same mean as a violin plot can look very different — always visualise distributions, not just summaries.</p>
<h3>Boxplots</h3>
` },
    { type: 'code', lang: 'r', src: `library(ggplot2); library(dplyr)

# Generate realistic score data
set.seed(42)
df <- data.frame(
  subject = rep(c("Python","R","Statistics","ML"), each = 40),
  score   = c(
    rnorm(40, mean=78, sd=10),   # Python — moderate
    rnorm(40, mean=72, sd=8),    # R — slightly lower
    rnorm(40, mean=65, sd=15),   # Statistics — wider spread
    rnorm(40, mean=80, sd=7)     # ML — highest, tight
  ) |> pmax(40) |> pmin(100)
)

# Boxplot
ggplot(df, aes(x = reorder(subject, score, median), y = score, fill = subject)) +
  geom_boxplot(outlier.colour = "red", outlier.shape = 4, outlier.size = 2,
               alpha = 0.8, notch = FALSE) +
  stat_summary(fun = mean, geom = "point", shape = 23, size = 3,
               fill = "white", colour = "black") +   # show mean as diamond
  scale_fill_brewer(palette = "Set2") +
  labs(title = "Score Distribution by Subject",
       subtitle = "Diamond = mean; box = IQR; whiskers = 1.5×IQR; red × = outliers",
       x = NULL, y = "Score") +
  theme_minimal() + theme(legend.position = "none") +
  coord_flip()`,
      out: `[Horizontal boxplot, subjects ordered by median, mean diamonds visible]` },
    { type: 'code', lang: 'r', src: `# Violin plot — shows full density, not just quartiles
ggplot(df, aes(x = subject, y = score, fill = subject)) +
  geom_violin(trim = FALSE, alpha = 0.7) +
  geom_boxplot(width = 0.15, fill = "white", alpha = 0.8, outlier.size = 0) +
  scale_fill_brewer(palette = "Pastel1") +
  labs(title = "Score Distributions — Violin + Boxplot Combo",
       x = NULL, y = "Score") +
  theme_bw() + theme(legend.position = "none")

# Density plot — smooth histogram (great for comparing groups)
ggplot(df, aes(x = score, fill = subject, colour = subject)) +
  geom_density(alpha = 0.3, linewidth = 0.8) +
  scale_fill_brewer(palette = "Set1") +
  scale_colour_brewer(palette = "Set1") +
  geom_vline(data = df |> group_by(subject) |> summarise(m=mean(score)),
             aes(xintercept = m, colour = subject), linetype = "dashed") +
  labs(title = "Score Density by Subject", x = "Score") +
  theme_minimal()`,
      out: `[Violin plot with inner boxplots | Overlapping density curves with mean lines]` },
    { type: 'exercise', title: 'Distribution Comparison Dashboard',
      body: `<p>Using the <code>iris</code> dataset:</p>
<ol>
<li>Create a boxplot of <code>Sepal.Length</code> by <code>Species</code> — add jittered individual points with <code>geom_jitter()</code></li>
<li>Create a violin plot of <code>Petal.Length</code> by species</li>
<li>Create a density plot comparing <code>Sepal.Width</code> across species (overlapping, alpha=0.4)</li>
<li>Create a scatterplot matrix using <code>GGally::ggpairs(iris, aes(colour=Species))</code> (install GGally first)</li>
</ol>`,
      hint: `Combine boxplot and jitter: <code>geom_boxplot() + geom_jitter(width=0.2, alpha=0.4, size=1.5)</code>. Order them so the boxplot is drawn first (underneath the points). <code>GGally::ggpairs()</code> creates a matrix of all pairwise plots automatically.`,
      solution: `library(ggplot2); library(dplyr)

# 1. Boxplot + jitter
ggplot(iris, aes(Species, Sepal.Length, fill=Species)) +
  geom_boxplot(alpha=0.6, outlier.size=0) +
  geom_jitter(width=0.2, alpha=0.5, size=1.5) +
  scale_fill_brewer(palette="Set2") +
  theme_minimal() + theme(legend.position="none")

# 2. Violin
ggplot(iris, aes(Species, Petal.Length, fill=Species)) +
  geom_violin(trim=FALSE) +
  geom_boxplot(width=0.1, fill="white") +
  theme_minimal()

# 3. Density
ggplot(iris, aes(Sepal.Width, fill=Species, colour=Species)) +
  geom_density(alpha=0.4) + theme_minimal()

# 4. Pairs plot
if (!requireNamespace("GGally", quietly=TRUE)) install.packages("GGally")
GGally::ggpairs(iris, aes(colour=Species, alpha=0.7))` }
  ]
};

L['r-w4-l4'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `
<h2>Faceting, Themes &amp; Scales</h2>
<p>Faceting creates small multiples — the same plot repeated for each value of a grouping variable. Edward Tufte called these "the most powerful tool in data visualisation" because they allow comparison across conditions without overlapping data. <code>facet_wrap()</code> wraps facets into a rectangle; <code>facet_grid()</code> creates a strict rows × columns grid.</p>
` },
    { type: 'code', lang: 'r', src: `library(ggplot2); library(dplyr)
data(mpg)   # fuel economy data, built into ggplot2

# facet_wrap() — one variable, wrap into grid
ggplot(mpg, aes(x = displ, y = hwy, colour = drv)) +
  geom_point(alpha = 0.7, size = 2) +
  geom_smooth(method = "lm", se = FALSE) +
  facet_wrap(~ class, ncol = 3) +
  labs(title = "Engine Displacement vs Highway MPG by Car Class",
       x = "Engine Displacement (L)", y = "Highway MPG",
       colour = "Drive") +
  theme_light(base_size = 11)

# facet_grid() — two variables, strict grid
ggplot(mpg |> filter(cyl %in% c(4,6,8)),
       aes(x = displ, y = hwy)) +
  geom_point(aes(colour = factor(cyl)), alpha = 0.7) +
  facet_grid(drv ~ cyl,               # rows ~ columns
             labeller = labeller(
               drv = c("4"="4WD","f"="FWD","r"="RWD"),
               cyl = function(x) paste0(x," cyl")
             )) +
  theme_bw()`,
      out: `[7-panel facet grid by car class | 3x3 facet grid by drive type and cylinders]` },
    { type: 'code', lang: 'r', src: `# Scales — control axis ranges, colours, sizes
ggplot(mpg, aes(x=displ, y=hwy, colour=hwy, size=cty)) +
  geom_point(alpha=0.7) +
  scale_x_continuous(limits=c(1,7), breaks=1:7, labels=paste0(1:7,"L")) +
  scale_y_continuous(limits=c(10,50)) +
  scale_colour_gradient(low="#FF6B6B", high="#2196F3", name="Hwy MPG") +
  scale_size_continuous(range=c(1,8), name="City MPG") +
  labs(title="MPG Comparison") + theme_minimal()

# Themes — changing the overall look
p <- ggplot(mpg, aes(x=class)) + geom_bar(fill="#2196F3")
p + theme_minimal()    # clean, no background
p + theme_classic()    # axes only, classic look
p + theme_dark()       # dark background
p + theme_bw()         # black and white, good for print

# Custom theme modifications
p + theme_minimal() +
  theme(
    plot.title       = element_text(size=16, face="bold", colour="#1a1a2e"),
    axis.text.x      = element_text(angle=45, hjust=1),
    panel.grid.minor = element_blank(),
    plot.background  = element_rect(fill="#f8f9fa", colour=NA)
  )`,
      out: `[Coloured scatter with custom axes | Multiple theme variations]` },
    { type: 'exercise', title: 'Faceted Analysis with Custom Theme',
      body: `<p>Using the <code>gapminder</code> data (install with <code>install.packages("gapminder")</code>):</p>
<ol>
<li>Filter to Asia, Americas, and Europe. Create a faceted scatter: <code>gdpPercap</code> (log scale) vs <code>lifeExp</code>, faceted by continent, coloured by year</li>
<li>Use <code>scale_x_log10()</code> and <code>scale_colour_viridis_c()</code></li>
<li>Create a custom theme that uses a light grey background, removes minor gridlines, and uses a bold title</li>
<li>Add country labels for the 3 highest GDP countries per continent using <code>ggrepel::geom_text_repel()</code></li>
</ol>`,
      hint: `<code>scale_x_log10(labels=scales::dollar_format())</code> for nice x-axis. For labelling top 3 per facet: filter to <code>slice_max(gdpPercap, n=3)</code> per continent before passing to <code>geom_text_repel()</code> via a separate data argument.`,
      solution: `library(ggplot2); library(dplyr)
if(!requireNamespace("gapminder",quietly=TRUE)) install.packages("gapminder")
library(gapminder)
if(!requireNamespace("ggrepel",quietly=TRUE)) install.packages("ggrepel")
library(ggrepel)

top3 <- gapminder |>
  filter(continent %in% c("Asia","Americas","Europe")) |>
  group_by(continent) |> slice_max(gdpPercap, n=3)

gapminder |>
  filter(continent %in% c("Asia","Americas","Europe")) |>
  ggplot(aes(gdpPercap, lifeExp, colour=year)) +
  geom_point(alpha=0.6, size=1.5) +
  geom_text_repel(data=top3, aes(label=country), size=2.5, max.overlaps=15) +
  scale_x_log10(labels=scales::dollar_format()) +
  scale_colour_viridis_c(name="Year") +
  facet_wrap(~continent) +
  labs(title="GDP per Capita vs Life Expectancy",
       x="GDP per Capita (log scale)", y="Life Expectancy") +
  theme_minimal() +
  theme(plot.title=element_text(face="bold",size=14),
        panel.grid.minor=element_blank())` }
  ]
};

L['r-w4-l5'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `
<h2>Publication-Ready Charts &amp; ggsave</h2>
<p>A great analysis with poor visuals loses its impact. Publication-ready charts have: clean typography, colour-blind-friendly palettes, proper aspect ratios, no unnecessary chartjunk, and captions/sources. ggplot2 makes all of this achievable with systematic effort.</p>
<h3>The Anatomy of a Professional ggplot2 Chart</h3>
` },
    { type: 'code', lang: 'r', src: `library(ggplot2); library(dplyr); library(scales)

# A complete, polished chart
revenue <- data.frame(
  quarter = c("Q1 2024","Q2 2024","Q3 2024","Q4 2024","Q1 2025","Q2 2025"),
  revenue = c(12.5, 15.8, 18.2, 22.4, 25.1, 30.3),
  students= c(42, 58, 71, 89, 102, 128)
)

p <- ggplot(revenue, aes(x = quarter, y = revenue, group = 1)) +
  geom_area(fill = "#2196F3", alpha = 0.15) +
  geom_line(colour = "#2196F3", linewidth = 1.5) +
  geom_point(colour = "#2196F3", size = 4, fill = "white",
             shape = 21, stroke = 2) +
  geom_text(aes(label = paste0("₹", revenue, "L")),
            vjust = -1, size = 3.5, fontface = "bold", colour = "#1565C0") +
  scale_y_continuous(
    limits = c(0, 35),
    labels = function(x) paste0("₹", x, "L"),
    expand = expansion(mult = c(0, 0.05))
  ) +
  labs(
    title    = "DSA Revenue Growth — FY 2024–25",
    subtitle = "Quarterly revenue in ₹ Lakhs | Consistent quarter-over-quarter growth",
    x        = NULL,
    y        = "Revenue (₹ Lakhs)",
    caption  = "Source: DSA Finance Team | as of Q2 FY25"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    plot.title       = element_text(face="bold", size=16, colour="#0D1B2A"),
    plot.subtitle    = element_text(colour="grey40", size=11),
    plot.caption     = element_text(colour="grey60", size=9, hjust=0),
    panel.grid.major.x = element_blank(),
    panel.grid.minor   = element_blank(),
    axis.text.x      = element_text(angle=30, hjust=1, size=10),
    plot.margin      = margin(20,20,10,20)
  )
print(p)`,
      out: `[Polished line/area chart with value labels, clean grid, proper caption]` },
    { type: 'code', lang: 'r', src: `# ggsave — saving at the right resolution
ggsave("dsa_revenue.png",
  plot   = p,
  width  = 10,
  height = 6,
  dpi    = 300,            # 300 DPI for print, 96-150 for web
  bg     = "white"
)

ggsave("dsa_revenue.pdf",   # PDF for vector graphics (best for reports)
  plot = p, width = 10, height = 6)

ggsave("dsa_revenue.svg",   # SVG for web embedding
  plot = p, width = 10, height = 6)

# Colour-blind-friendly palettes
library(RColorBrewer)
display.brewer.all(colorblindFriendly = TRUE)  # see all CB-safe palettes

# Recommended palettes:
scale_fill_brewer(palette = "Set2")        # 8 CB-safe qualitative colours
scale_fill_viridis_d()                     # perceptually uniform, CB-safe
scale_colour_manual(values = c(           # custom CB-safe palette
  "#0073C2", "#EFC000", "#CD534C", "#868686"
))`,
      out: `[Files saved: dsa_revenue.png (300dpi), .pdf, .svg]` },
    { type: 'tip', body: `Use the <strong>patchwork</strong> package to combine multiple ggplots into a single figure: <code>library(patchwork); p1 + p2</code> puts them side by side; <code>p1 / p2</code> stacks them. <code>(p1 | p2) / p3</code> creates complex layouts. This replaces the clunky <code>par(mfrow=c(1,2))</code> approach for base R.` },
    { type: 'exercise', title: 'Dashboard with patchwork',
      body: `<p>Create a 4-panel analytics dashboard for the <code>mpg</code> dataset using <strong>patchwork</strong>:</p>
<ol>
<li>Top-left: bar chart of vehicle class frequency</li>
<li>Top-right: scatter of <code>displ</code> vs <code>hwy</code>, coloured by <code>drv</code></li>
<li>Bottom-left: boxplot of <code>hwy</code> by <code>drv</code></li>
<li>Bottom-right: histogram of <code>hwy</code></li>
<li>Combine with <code>(p1 | p2) / (p3 | p4)</code>, add an overall title with <code>plot_annotation(title=...)</code>, and save at 12×9 inches, 200 DPI</li>
</ol>`,
      hint: `<code>install.packages("patchwork")</code>. Each plot is a variable. <code>(p1|p2)/(p3|p4)</code> creates a 2×2 grid. Add <code>& theme_minimal()</code> to apply a theme to all panels at once.`,
      solution: `library(ggplot2); library(patchwork)
data(mpg)

p1 <- ggplot(mpg, aes(x=reorder(class,class,length))) +
  geom_bar(fill="#4CAF50") + coord_flip() + labs(title="Vehicle Classes",x=NULL)

p2 <- ggplot(mpg, aes(displ,hwy,colour=drv)) +
  geom_point(alpha=0.7) + geom_smooth(method="lm",se=FALSE) +
  labs(title="Displacement vs Highway MPG")

p3 <- ggplot(mpg, aes(drv,hwy,fill=drv)) +
  geom_boxplot() + labs(title="Hwy MPG by Drive Type") +
  theme(legend.position="none")

p4 <- ggplot(mpg, aes(hwy)) +
  geom_histogram(bins=20, fill="#2196F3", colour="white") +
  labs(title="Hwy MPG Distribution")

dashboard <- (p1|p2)/(p3|p4) &
  theme_minimal(base_size=11)

dashboard + plot_annotation(
  title="Vehicle Fuel Efficiency Dashboard",
  theme=theme(plot.title=element_text(face="bold",size=16))
)
ggsave("mpg_dashboard.png", width=12, height=9, dpi=200, bg="white")` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 5 — STATISTICAL ANALYSIS IN R
══════════════════════════════════════════════════════════════════════════ */

L['r-w5-l1'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `
<h2>Descriptive Statistics — Summarising Data</h2>
<p>Descriptive statistics describe what your data looks like without making inferences about a population. R's base functions are comprehensive, and the tidyverse provides clean pipelines for grouped summaries. Before fitting any model, you must understand your data's central tendency, spread, and shape.</p>
<h3>Measures of Central Tendency and Spread</h3>
` },
    { type: 'code', lang: 'r', src: `# Built-in dataset: student exam scores
set.seed(42)
scores <- round(rnorm(50, mean=72, sd=14)) |> pmax(0) |> pmin(100)

# Central tendency
mean(scores)            # arithmetic mean
median(scores)          # 50th percentile — robust to outliers
# Mode (no built-in): use table
as.integer(names(which.max(table(scores))))

# Spread
var(scores)             # variance
sd(scores)              # standard deviation (sqrt of variance)
range(scores)           # min and max
diff(range(scores))     # range as single number
IQR(scores)             # inter-quartile range (Q3 - Q1)

# Quartiles and percentiles
quantile(scores, probs = c(0, 0.25, 0.5, 0.75, 1))
quantile(scores, probs = seq(0, 1, 0.1))   # deciles

# Comprehensive summary
summary(scores)
# Min. 1st Qu.  Median    Mean 3rd Qu.    Max.
# 35     62      73      71.8     83      98`,
      out: `[1] 71.8    (mean)
   0%  25%  50%  75% 100%
   35   62   73   83   98` },
    { type: 'code', lang: 'r', src: `library(dplyr); library(tibble)

# Grouped descriptive statistics — the data analysis workflow
students <- tibble(
  batch   = rep(c("A","B","C"), each=20),
  score   = c(rnorm(20,78,10), rnorm(20,72,12), rnorm(20,82,8)) |>
              pmax(40) |> pmin(100) |> round()
)

students |>
  group_by(batch) |>
  summarise(
    n       = n(),
    mean    = round(mean(score), 1),
    median  = median(score),
    sd      = round(sd(score), 2),
    cv      = round(sd(score)/mean(score)*100, 1),  # coefficient of variation
    q1      = quantile(score, 0.25),
    q3      = quantile(score, 0.75),
    iqr     = IQR(score)
  )

# Skewness and kurtosis (moments package)
if (!requireNamespace("moments", quietly=TRUE)) install.packages("moments")
library(moments)
skewness(scores)   # > 0: right-skewed; < 0: left-skewed
kurtosis(scores)   # > 3: heavy tails (leptokurtic)`,
      out: `  batch     n  mean median    sd    cv    q1    q3   iqr
  A        20  77.2     78  9.72  12.6  71.0  83.5  12.5
  B        20  72.2     71 11.84  16.4  64.0  80.0  16.0
  C        20  82.1     82  8.12   9.9  76.2  88.0  11.8` },
    { type: 'exercise', title: 'Comprehensive Descriptive Analysis',
      body: `<p>Use the built-in <code>mtcars</code> dataset:</p>
<ol>
<li>Compute mean, median, SD, IQR, and CV for <code>mpg</code>, <code>hp</code>, and <code>wt</code></li>
<li>Compute these same statistics grouped by <code>cyl</code> (number of cylinders)</li>
<li>Find the outliers in <code>hp</code> using the 1.5×IQR method. Which cars are they?</li>
<li>Create a correlation table for <code>mpg</code>, <code>hp</code>, <code>wt</code>, and <code>disp</code> using <code>cor()</code>. Round to 2 decimal places.</li>
</ol>`,
      hint: `For outlier cars: <code>q &lt;- quantile(mtcars$hp, c(.25,.75)); iqr &lt;- q[2]-q[1]; mtcars[mtcars$hp &lt; q[1]-1.5*iqr | mtcars$hp &gt; q[2]+1.5*iqr, ]</code>. <code>cor(mtcars[,c("mpg","hp","wt","disp")])</code> gives the full correlation matrix.`,
      solution: `data(mtcars)
# 1. Overall stats
cols <- c("mpg","hp","wt")
stats <- sapply(mtcars[,cols], function(x)
  c(mean=round(mean(x),2), median=median(x), sd=round(sd(x),2),
    iqr=round(IQR(x),2), cv=round(sd(x)/mean(x)*100,1)))
print(t(stats))

# 2. Grouped by cyl
library(dplyr)
mtcars |> group_by(cyl) |>
  summarise(across(c(mpg,hp,wt),
    list(mean=~round(mean(.),1), sd=~round(sd(.),2)), .names="{.col}_{.fn}"))

# 3. hp outliers
q <- quantile(mtcars$hp, c(.25,.75)); iqr <- q[2]-q[1]
mtcars[mtcars$hp < q[1]-1.5*iqr | mtcars$hp > q[2]+1.5*iqr, ]

# 4. Correlation matrix
round(cor(mtcars[,c("mpg","hp","wt","disp")]), 2)` }
  ]
};

L['r-w5-l2'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `
<h2>Probability Distributions in R</h2>
<p>R has built-in functions for every major probability distribution, following a consistent four-letter naming convention. This makes probability calculations, random sampling, and statistical testing seamless — no lookup tables needed.</p>
<h3>The d/p/q/r Convention</h3>
<table style="width:100%;border-collapse:collapse;font-size:.9rem;margin:1rem 0">
<thead><tr style="background:var(--fog2)">
  <th style="padding:.5rem .8rem">Prefix</th><th style="padding:.5rem .8rem">Meaning</th><th style="padding:.5rem .8rem">Example (normal)</th><th style="padding:.5rem .8rem">Returns</th>
</tr></thead>
<tbody>
<tr><td style="padding:.4rem .8rem"><code>d</code></td><td style="padding:.4rem .8rem">Density (PDF)</td><td style="padding:.4rem .8rem"><code>dnorm(x)</code></td><td style="padding:.4rem .8rem">Probability density at x</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><code>p</code></td><td style="padding:.4rem .8rem">Cumulative (CDF)</td><td style="padding:.4rem .8rem"><code>pnorm(q)</code></td><td style="padding:.4rem .8rem">P(X ≤ q)</td></tr>
<tr><td style="padding:.4rem .8rem"><code>q</code></td><td style="padding:.4rem .8rem">Quantile (inverse CDF)</td><td style="padding:.4rem .8rem"><code>qnorm(p)</code></td><td style="padding:.4rem .8rem">x such that P(X ≤ x) = p</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem"><code>r</code></td><td style="padding:.4rem .8rem">Random sample</td><td style="padding:.4rem .8rem"><code>rnorm(n)</code></td><td style="padding:.4rem .8rem">n random draws</td></tr>
</tbody></table>
` },
    { type: 'code', lang: 'r', src: `# Normal distribution — the most important distribution
# dnorm: height of the bell curve at x
dnorm(0, mean=0, sd=1)          # 0.3989 — peak of standard normal

# pnorm: cumulative probability (area under curve)
pnorm(1.96, mean=0, sd=1)       # 0.975 — 97.5% of values below 1.96σ
pnorm(75, mean=72, sd=10)       # P(score <= 75) for our exam

# qnorm: inverse — what value corresponds to a given percentile?
qnorm(0.975)                    # 1.96 — the famous z-score for 95% CI
qnorm(0.95, mean=72, sd=10)     # 95th percentile of our exam score distribution

# rnorm: generate random normal data
set.seed(42)
sample_scores <- rnorm(n=100, mean=72, sd=10)

# Other key distributions:
rbinom(10, size=5, prob=0.6)    # binomial: 10 draws, 5 trials, P=0.6
rpois(10, lambda=3)             # Poisson: avg 3 events
runif(5, min=0, max=100)        # uniform: random numbers 0-100
rexp(5, rate=0.5)               # exponential: avg waiting time = 1/rate`,
      out: `[1] 0.3989
[1] 0.975
[1] 1.96
[1]  2  3  3  5  2  3  4  3  3  4  (binomial)` },
    { type: 'code', lang: 'r', src: `library(ggplot2)

# Visualise the normal distribution
x <- seq(-4, 4, length.out=300)
df_norm <- data.frame(
  x     = x,
  y     = dnorm(x),
  fill  = ifelse(abs(x) <= 1.96, "within_95", "outside_95")
)

ggplot(df_norm, aes(x=x, y=y)) +
  geom_area(aes(fill=fill), alpha=0.6) +
  geom_line(linewidth=1.2) +
  scale_fill_manual(values=c("within_95"="#2196F3","outside_95"="#EF5350"),
                    labels=c("Within 95% CI","Outside 95% CI"),
                    name=NULL) +
  geom_vline(xintercept=c(-1.96,1.96), linetype="dashed", colour="#E91E63") +
  annotate("text", x=0, y=0.15, label="95% of data",
           size=5, fontface="bold", colour="#1565C0") +
  labs(title="Standard Normal Distribution — 95% Confidence Interval",
       x="Z-score", y="Density") +
  theme_minimal()`,
      out: `[Bell curve with blue 95% region and red tails highlighted]` },
    { type: 'exercise', title: 'Probability Calculations',
      body: `<p>An entrance exam has scores ~ N(mean=65, sd=12).</p>
<ol>
<li>What proportion of candidates score above 80?</li>
<li>What score corresponds to the top 10% of candidates?</li>
<li>What is the probability of scoring between 50 and 80?</li>
<li>Simulate 1,000 exam scores. Plot a histogram with the theoretical normal density curve overlaid (use <code>geom_histogram(aes(y=after_stat(density)))</code> + <code>stat_function(fun=dnorm, args=list(mean=65,sd=12))</code>)</li>
<li>Generate 50 random Poisson values with λ=4 (e.g., support tickets per day). What is P(X ≥ 6) from the Poisson distribution?</li>
</ol>`,
      hint: `For "above 80": <code>1 - pnorm(80, 65, 12)</code> or <code>pnorm(80, 65, 12, lower.tail=FALSE)</code>. For P(50≤X≤80): <code>pnorm(80,65,12) - pnorm(50,65,12)</code>. Poisson: <code>ppois(5, lambda=4, lower.tail=FALSE)</code> = P(X≥6).`,
      solution: `# 1. P(X > 80)
cat("P(score > 80):", round(1-pnorm(80,65,12), 4), "\\n")

# 2. Top 10% cutoff
cat("Top 10% score:", round(qnorm(0.9,65,12), 1), "\\n")

# 3. P(50 < X < 80)
cat("P(50<X<80):", round(pnorm(80,65,12)-pnorm(50,65,12), 4), "\\n")

# 4. Histogram with density curve
set.seed(42); sims <- rnorm(1000, 65, 12)
library(ggplot2)
ggplot(data.frame(x=sims), aes(x)) +
  geom_histogram(aes(y=after_stat(density)), bins=30,
                 fill="#4CAF50", colour="white", alpha=0.7) +
  stat_function(fun=dnorm, args=list(mean=65,sd=12),
                colour="red", linewidth=1.5) +
  labs(title="Exam Scores: Simulated vs Theoretical",x="Score",y="Density") +
  theme_minimal()

# 5. Poisson
set.seed(42); tickets <- rpois(50, lambda=4)
cat("P(X>=6):", round(ppois(5,lambda=4,lower.tail=FALSE), 4), "\\n")` }
  ]
};

L['r-w5-l3'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `
<h2>Hypothesis Testing — t-test, Chi-Squared &amp; ANOVA</h2>
<p>Hypothesis testing answers "did this happen by chance?" You start with a null hypothesis (H₀: no effect, no difference) and compute how surprising your data would be if H₀ were true. The p-value is that probability — a small p-value (usually &lt;0.05) means the result is unlikely under H₀, so you reject it.</p>
<h3>One-Sample t-test</h3>
<p>Tests whether a sample mean differs from a hypothesised population mean.</p>
` },
    { type: 'code', lang: 'r', src: `# One-sample t-test: Is the mean score different from 70?
set.seed(42)
scores <- rnorm(30, mean=74, sd=10) |> round()

result <- t.test(scores, mu = 70,    # test against this value
                 alternative = "two.sided")  # two-tailed
print(result)
# Output:
# t = 2.18, df = 29, p-value = 0.037
# 95 percent CI: [70.4, 77.9]
# sample estimates: mean = 74.1

cat("p-value:", result$p.value, "\\n")
cat("95% CI: [", result$conf.int[1], ",", result$conf.int[2], "]\\n")
cat("Reject H0:", result$p.value < 0.05, "\\n")

# Two-sample t-test: Do two groups have the same mean?
batch_a <- rnorm(25, mean=78, sd=10) |> round()
batch_b <- rnorm(25, mean=72, sd=10) |> round()

t.test(batch_a, batch_b,
       var.equal = FALSE,     # Welch's t-test — safer default
       alternative = "greater")  # is batch_a > batch_b?`,
      out: `t = 2.18, df = 29, p-value = 0.037
95% CI: [70.4, 77.9]
Reject H0: TRUE` },
    { type: 'code', lang: 'r', src: `# Chi-Squared Test — for categorical data
# Are gender and course preference independent?
survey <- matrix(
  c(45, 30, 25,   # Male: Python, R, SQL
    35, 42, 28),  # Female: Python, R, SQL
  nrow = 2,
  dimnames = list(
    Gender = c("Male","Female"),
    Course = c("Python","R","SQL")
  )
)

chisq_result <- chisq.test(survey)
cat("Chi-squared:", chisq_result$statistic, "\\n")
cat("p-value:", chisq_result$p.value, "\\n")
cat("Independent?", chisq_result$p.value > 0.05, "\\n")
chisq_result$expected   # expected frequencies under independence

# One-Way ANOVA — comparing means across 3+ groups
# H0: all group means are equal
batch_data <- data.frame(
  score = c(rnorm(20,78,10), rnorm(20,72,12), rnorm(20,82,8)),
  batch = rep(c("A","B","C"), each=20)
)

anova_result <- aov(score ~ batch, data = batch_data)
summary(anova_result)

# Post-hoc: which pairs are different? (Tukey's HSD)
TukeyHSD(anova_result)`,
      out: `Chi-squared: 3.12   p-value: 0.21   Independent: TRUE

ANOVA:
          Df Sum Sq Mean Sq F value  Pr(>F)
batch      2   1283     641    5.92 0.0037 **
Residuals 57   6170     108` },
    { type: 'warn', body: `A p-value of 0.05 is not a magic threshold — it's an arbitrary convention. A result can be statistically significant but practically irrelevant (huge sample size + tiny effect). Always report <strong>effect sizes</strong> (Cohen's d, eta-squared) alongside p-values. Use <code>effectsize::cohens_d()</code> for t-tests and <code>effectsize::eta_squared()</code> for ANOVA.` },
    { type: 'exercise', title: 'A/B Test Analysis',
      body: `<p>DSA ran an A/B test on two teaching methods:</p>
<ul>
<li>Method A (traditional): 25 students, post-test scores ~ N(72, 12)</li>
<li>Method B (project-based): 25 students, post-test scores ~ N(78, 10)</li>
</ul>
<ol>
<li>Generate both samples with <code>set.seed(100)</code></li>
<li>Compute descriptive statistics for both groups</li>
<li>Test whether Method B is significantly better (one-sided t-test)</li>
<li>Compute Cohen's d effect size: <code>d = (mean_B - mean_A) / pooled_sd</code>. Interpret: small &lt;0.2, medium 0.5, large &gt;0.8</li>
<li>Create a boxplot comparing the two groups, with a label showing the p-value</li>
</ol>`,
      hint: `Pooled SD: <code>sqrt(((n1-1)*var(A) + (n2-1)*var(B)) / (n1+n2-2))</code>. Add p-value to plot: <code>annotate("text", x=1.5, y=max(c(A,B))+3, label=paste0("p=",round(p,3)))</code>.`,
      solution: `set.seed(100)
A <- round(rnorm(25, 72, 12))
B <- round(rnorm(25, 78, 10))
cat("Method A:", round(mean(A),1), "±", round(sd(A),1), "\\n")
cat("Method B:", round(mean(B),1), "±", round(sd(B),1), "\\n")

# One-sided t-test
res <- t.test(B, A, alternative="greater")
cat("p-value:", round(res$p.value,4), "\\n")
cat("Significant:", res$p.value < 0.05, "\\n")

# Cohen's d
pooled_sd <- sqrt(((24*var(A))+(24*var(B)))/48)
d <- (mean(B)-mean(A))/pooled_sd
cat("Cohen's d:", round(d,2), "-",
    if(abs(d)<0.2)"negligible"else if(abs(d)<0.5)"small"else if(abs(d)<0.8)"medium"else"large","\\n")

# Boxplot
library(ggplot2)
df <- data.frame(score=c(A,B), method=rep(c("A","B"),each=25))
ggplot(df, aes(method,score,fill=method)) + geom_boxplot() +
  annotate("text",x=1.5,y=max(c(A,B))+3,
           label=paste0("p=",round(res$p.value,3)),size=4,fontface="bold") +
  theme_minimal() + labs(title="A/B Test: Teaching Methods")` }
  ]
};

L['r-w5-l4'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `
<h2>Correlation Analysis</h2>
<p>Correlation quantifies the linear relationship between two variables. R provides three correlation coefficients, each appropriate for different data types, and excellent visualisation tools for correlation matrices.</p>
<h3>Pearson, Spearman, and Kendall</h3>
<table style="width:100%;border-collapse:collapse;font-size:.9rem;margin:1rem 0">
<thead><tr style="background:var(--fog2)">
  <th style="padding:.5rem .8rem">Method</th><th style="padding:.5rem .8rem">Use when</th><th style="padding:.5rem .8rem">R argument</th>
</tr></thead>
<tbody>
<tr><td style="padding:.4rem .8rem">Pearson (r)</td><td style="padding:.4rem .8rem">Both variables are continuous and normally distributed</td><td style="padding:.4rem .8rem"><code>method="pearson"</code></td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem">Spearman (ρ)</td><td style="padding:.4rem .8rem">Ordinal data, outliers present, or non-normal distribution</td><td style="padding:.4rem .8rem"><code>method="spearman"</code></td></tr>
<tr><td style="padding:.4rem .8rem">Kendall (τ)</td><td style="padding:.4rem .8rem">Small sample, many tied ranks, or ordinal data</td><td style="padding:.4rem .8rem"><code>method="kendall"</code></td></tr>
</tbody></table>
` },
    { type: 'code', lang: 'r', src: `set.seed(42)
n <- 50
study <- data.frame(
  study_hours = runif(n, 2, 8),
  sleep_hours = runif(n, 5, 9),
  attendance  = runif(n, 60, 100)
)
study$score <- 30 + 6*study$study_hours + 2*study$sleep_hours +
               0.3*study$attendance + rnorm(n, 0, 8)

# Pairwise correlation
cor(study$study_hours, study$score)         # Pearson r
cor(study$study_hours, study$score, method="spearman")  # Spearman rho

# Test significance
cor.test(study$study_hours, study$score)    # r, p-value, CI

# Full correlation matrix
cor_matrix <- cor(study)
print(round(cor_matrix, 3))

# Pairwise p-values
library(Hmisc)
rcorr(as.matrix(study))$P   # p-value matrix`,
      out: `[1] 0.821
[1] 0.808

Pearson's product-moment correlation
t = 10.1, df = 48, p-value < 2.2e-16
95% CI [0.724, 0.892]
sample estimates: r = 0.821` },
    { type: 'code', lang: 'r', src: `# Correlation heatmap with ggplot2
library(ggplot2); library(reshape2)

cor_df <- melt(cor_matrix)  # from wide to long

ggplot(cor_df, aes(Var1, Var2, fill = value)) +
  geom_tile(colour = "white", linewidth = 0.5) +
  geom_text(aes(label = round(value, 2)), size = 4, fontface = "bold") +
  scale_fill_gradient2(
    low = "#EF5350", mid = "white", high = "#2196F3",
    midpoint = 0, limits = c(-1, 1), name = "r"
  ) +
  labs(title = "Correlation Matrix — Study Habits vs Score",
       x = NULL, y = NULL) +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 30, hjust = 1))

# Or use corrplot package (much easier)
if (!requireNamespace("corrplot", quietly=TRUE)) install.packages("corrplot")
corrplot::corrplot(cor_matrix, method="color", type="upper",
                   addCoef.col="black", tl.srt=45)`,
      out: `[Heatmap with blue=positive, red=negative correlations and r values inside]` },
    { type: 'exercise', title: 'Correlation Study with mtcars',
      body: `<p>Using the <code>mtcars</code> dataset:</p>
<ol>
<li>Compute the full Pearson correlation matrix for all numeric columns</li>
<li>Identify the three strongest (absolute) correlations with <code>mpg</code></li>
<li>Create a correlation heatmap using <code>corrplot</code> or ggplot2</li>
<li>Test whether the correlation between <code>hp</code> and <code>mpg</code> is statistically significant. Report r, p-value, and 95% CI.</li>
<li>Check if the correlation changes when using Spearman instead of Pearson — what does this tell you about outliers?</li>
</ol>`,
      hint: `To find top correlations: <code>cor_mpg &lt;- cor(mtcars)["mpg",]; sort(abs(cor_mpg), decreasing=TRUE)[2:4]</code> (skip the diagonal 1.0).`,
      solution: `data(mtcars)
# 1. Full correlation matrix
cm <- cor(mtcars); print(round(cm,2))

# 2. Top 3 correlations with mpg
mpg_cor <- sort(abs(cm["mpg",]), decreasing=TRUE)
cat("Top correlates with mpg:\\n"); print(mpg_cor[2:4])

# 3. Corrplot heatmap
if(!requireNamespace("corrplot",quietly=TRUE)) install.packages("corrplot")
corrplot::corrplot(cm, method="color", type="upper", addCoef.col="black",
                   tl.srt=45, title="mtcars Correlations", mar=c(0,0,1,0))

# 4. hp vs mpg correlation test
test_p <- cor.test(mtcars$hp, mtcars$mpg)
cat("\\nr =", round(test_p$estimate,3), "| p =", round(test_p$p.value,6))
cat("\\n95% CI: [", round(test_p$conf.int[1],3), ",", round(test_p$conf.int[2],3), "]\\n")

# 5. Pearson vs Spearman
cat("Pearson:", round(cor(mtcars$hp, mtcars$mpg),3), "\\n")
cat("Spearman:", round(cor(mtcars$hp, mtcars$mpg, method="spearman"),3), "\\n")` }
  ]
};

L['r-w5-l5'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `
<h2>Linear Regression in R</h2>
<p>Linear regression is the workhorse of statistical modelling. R's <code>lm()</code> function fits linear models using a formula interface that is expressive, extensible, and consistent across hundreds of packages. Understanding the output of <code>summary(lm(...))</code> is a core R competency.</p>
<h3>Simple Linear Regression</h3>
` },
    { type: 'code', lang: 'r', src: `set.seed(42)
n <- 100
df <- data.frame(
  study_hours = runif(n, 1, 8),
  score       = NA
)
df$score <- 45 + 6*df$study_hours + rnorm(n, 0, 8)
df$score <- pmin(pmax(df$score, 0), 100)

# Fit simple linear regression: score ~ study_hours
model <- lm(score ~ study_hours, data = df)

summary(model)
# Call: lm(formula = score ~ study_hours, data = df)
# Coefficients:
#              Estimate Std. Error t value Pr(>|t|)
# (Intercept)   45.123      2.341   19.28  < 2e-16 ***
# study_hours    6.089      0.467   13.04  < 2e-16 ***
# Residual standard error: 7.94 on 98 degrees of freedom
# Multiple R-squared: 0.634,  Adjusted R-squared: 0.630
# F-statistic: 170 on 1 and 98 DF,  p-value: < 2.2e-16

coef(model)          # intercept and slope
fitted(model)        # predicted values
residuals(model)     # actual - predicted
predict(model, newdata = data.frame(study_hours = 5))  # predict new`,
      out: `(Intercept) study_hours
     45.123       6.089
[1] 75.57   (predicted score for 5h study)` },
    { type: 'code', lang: 'r', src: `# Multiple linear regression
df$sleep  <- runif(n, 5, 9)
df$attend <- runif(n, 60, 100)
df$score  <- 20 + 5*df$study_hours + 3*df$sleep + 0.2*df$attend + rnorm(n,0,8)

multi_model <- lm(score ~ study_hours + sleep + attend, data = df)
summary(multi_model)

# Model diagnostics — the four key plots
par(mfrow = c(2,2))
plot(multi_model)
par(mfrow = c(1,1))

# Or with ggplot2 (ggfortify package)
library(ggfortify)
autoplot(multi_model, which = 1:4, ncol = 2)

# Predictions with confidence intervals
new_data <- data.frame(study_hours=6, sleep=7, attend=85)
predict(multi_model, newdata=new_data, interval="confidence", level=0.95)
predict(multi_model, newdata=new_data, interval="prediction", level=0.95)

# Model comparison with AIC
aic_simple <- AIC(model)
aic_multi  <- AIC(multi_model)
cat("Simple AIC:", round(aic_simple, 1), "\\n")
cat("Multi AIC: ", round(aic_multi,  1), "\\n")  # lower is better`,
      out: `(Intercept)  study_hours        sleep       attend
     20.045        4.987        2.981        0.208
Multiple R-squared: 0.812

           fit    lwr    upr
confidence 82.4   79.1  85.7
prediction 82.4   65.8  99.0` },
    { type: 'exercise', title: 'Full Regression Analysis',
      body: `<p>Using the <code>mtcars</code> dataset, build a regression model to predict <code>mpg</code>:</p>
<ol>
<li>Fit a simple regression: <code>mpg ~ wt</code>. Report coefficients, R², and interpret the slope.</li>
<li>Fit a multiple regression: <code>mpg ~ wt + hp + cyl</code>. Compare R² to the simple model.</li>
<li>Run diagnostic plots and check: are residuals normally distributed? Is there heteroscedasticity?</li>
<li>Add an interaction term: <code>mpg ~ wt * hp</code>. Does it improve the model (compare AIC)?</li>
<li>Predict mpg for a car with wt=3.0 (thousand lbs), hp=150, cyl=6. Provide a 95% prediction interval.</li>
</ol>`,
      hint: `Interaction model: <code>lm(mpg ~ wt * hp)</code> automatically includes main effects and interaction. Use <code>shapiro.test(residuals(model))</code> for normality test. AIC comparison: <code>AIC(m1, m2, m3)</code> compares all at once.`,
      solution: `data(mtcars)

# 1. Simple regression
m1 <- lm(mpg ~ wt, data=mtcars)
cat("wt slope:", round(coef(m1)["wt"],2), "— each 1000lb heavier = X less mpg\\n")
cat("R²:", round(summary(m1)$r.squared, 3), "\\n")

# 2. Multiple regression
m2 <- lm(mpg ~ wt + hp + cyl, data=mtcars)
cat("Multiple R²:", round(summary(m2)$r.squared, 3), "\\n")
print(summary(m2)$coefficients)

# 3. Diagnostics
par(mfrow=c(2,2)); plot(m2); par(mfrow=c(1,1))
shapiro.test(residuals(m2))

# 4. Interaction
m3 <- lm(mpg ~ wt * hp, data=mtcars)
print(AIC(m1, m2, m3))

# 5. Prediction
new <- data.frame(wt=3.0, hp=150, cyl=6)
pred <- predict(m2, newdata=new, interval="prediction")
cat("Predicted mpg:", round(pred[1],1), "95% PI: [", round(pred[2],1), ",", round(pred[3],1), "]\\n")` }
  ]
};

/* ══════════════════════════════════════════════════════════════════════════
   WEEK 6 — R MARKDOWN & CAPSTONE
══════════════════════════════════════════════════════════════════════════ */

L['r-w6-l1'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `
<h2>R Markdown — Reproducible Research Reports</h2>
<p>R Markdown combines R code, its output (tables, plots, numbers), and formatted prose in a single document. When you re-run the report, everything updates automatically. This is <strong>reproducible research</strong>: someone else can take your <code>.Rmd</code> file and exactly reproduce your results. It's now an expected skill in data science roles that involve reporting.</p>
<h3>The Three Components of an R Markdown Document</h3>
<ol>
<li><strong>YAML header</strong>: document metadata — title, author, date, output format</li>
<li><strong>Markdown text</strong>: formatted prose using standard Markdown syntax</li>
<li><strong>Code chunks</strong>: R code between <code>\`\`\`{r}</code> and <code>\`\`\`</code> that runs and embeds its output</li>
</ol>
` },
    { type: 'code', lang: 'r', src: `# ── A complete .Rmd file structure ──────────────────────────────────────
# Save this as report.Rmd and click "Knit" in RStudio

# --- YAML header ---
# ---
# title: "Student Performance Analysis"
# author: "Priya Sharma"
# date: "\`r Sys.Date()\`"
# output:
#   html_document:
#     toc: true
#     toc_float: true
#     theme: "flatly"
#     code_folding: hide
# ---

# --- Text section (Markdown) ---
# ## Introduction
# This report analyses the **exam scores** of 50 DSA students across
# three subjects. Key findings are highlighted below.

# --- Code chunk ---
# \`\`\`{r setup, include=FALSE}
# knitr::opts_chunk$set(echo=TRUE, warning=FALSE, message=FALSE)
# library(dplyr); library(ggplot2)
# \`\`\`

# --- Inline code --- (backtick r expression backtick)
# The mean score was \`r round(mean(scores),1)\` out of 100.

# Chunk options (most common):
# echo=FALSE     — hide code, show output
# eval=FALSE     — show code, don't run it
# include=FALSE  — run silently, show nothing
# fig.width=8, fig.height=5  — figure dimensions
# cache=TRUE     — cache chunk output (speeds up slow chunks)
# results="hide" — run but suppress all output`,
      out: `[.Rmd → HTML/PDF/Word with embedded code output and formatted text]` },
    { type: 'code', lang: 'r', src: `# Rendering an R Markdown document programmatically
library(rmarkdown)

# Render to HTML
render("report.Rmd", output_format = "html_document")

# Render to PDF (requires LaTeX: install.packages("tinytex"); tinytex::install_tinytex())
render("report.Rmd", output_format = "pdf_document")

# Render to Word
render("report.Rmd", output_format = "word_document")

# Parametrised reports — render the same template for different data
render("report.Rmd",
  params = list(batch = "A", year = 2025),
  output_file = "report_batch_A.html"
)

# In the Rmd YAML:
# params:
#   batch: "A"
#   year: 2025
# In the Rmd text: Results for Batch \`r params$batch\`, \`r params$year\`

# knitr::kable — nice tables in R Markdown
library(knitr)
students <- data.frame(name=c("Priya","Rajan"), score=c(88,72))
kable(students, caption="Student Scores", digits=1, align="lc")`,
      out: `| name  | score |
|-------|-------|
| Priya |    88 |
| Rajan |    72 |` },
    { type: 'tip', body: `Use <code>knitr::opts_chunk$set(echo=TRUE, warning=FALSE, message=FALSE)</code> in your first setup chunk to globally suppress warnings and messages. Without this, your rendered HTML will be cluttered with package loading messages. Add <code>cache=TRUE</code> for chunks that take more than 30 seconds to run.` },
    { type: 'exercise', title: 'Create Your First R Markdown Report',
      body: `<p>Create a file called <code>student_analysis.Rmd</code> with:</p>
<ol>
<li>YAML header: title "Student Performance Report", your name, today's date (using <code>Sys.Date()</code>), output = html_document with table of contents</li>
<li>Section "Data Overview": load mtcars, show a kable summary table of the first 6 rows</li>
<li>Section "Key Statistics": compute mean, median, SD of mpg. Use <strong>inline code</strong> to embed the mean value in a sentence: "The average fuel efficiency is X mpg."</li>
<li>Section "Visualisation": create a ggplot2 scatter (wt vs mpg, coloured by cyl). Use chunk options <code>fig.width=8, fig.height=5, echo=FALSE</code>.</li>
<li>Knit to HTML. Submit the .Rmd and the .html files.</li>
</ol>`,
      hint: `Inline code syntax: <code>\`r round(mean(mtcars$mpg), 1)\`</code>. For the kable table: <code>knitr::kable(head(mtcars), caption="mtcars (first 6 rows)")</code>. Make sure ggplot2 is loaded in the setup chunk.`,
      solution: `# student_analysis.Rmd
# ---
# title: "Student Performance Report"
# author: "Your Name"
# date: "\`r Sys.Date()\`"
# output:
#   html_document:
#     toc: true
# ---
# \`\`\`{r setup, include=FALSE}
# knitr::opts_chunk$set(echo=TRUE, warning=FALSE, message=FALSE)
# library(ggplot2); library(knitr)
# \`\`\`
# ## Data Overview
# \`\`\`{r}
# kable(head(mtcars), caption="mtcars Dataset (first 6 rows)")
# \`\`\`
# ## Key Statistics
# \`\`\`{r include=FALSE}
# mpg_mean <- round(mean(mtcars$mpg), 1)
# \`\`\`
# The average fuel efficiency is \`r mpg_mean\` mpg.
# Mean=\`r mpg_mean\`, Median=\`r median(mtcars$mpg)\`, SD=\`r round(sd(mtcars$mpg),1)\`.
# ## Visualisation
# \`\`\`{r, fig.width=8, fig.height=5, echo=FALSE}
# ggplot(mtcars, aes(wt, mpg, colour=factor(cyl))) +
#   geom_point(size=3) + theme_minimal() + labs(colour="Cyl")
# \`\`\`` }
  ]
};

L['r-w6-l2'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `
<h2>Advanced R Markdown &amp; Quarto</h2>
<p>R Markdown is powerful, but <strong>Quarto</strong> (Posit's next-generation publishing system, 2022) takes it further: multilingual (R, Python, Julia, Observable), better defaults, unified CLI, and native support for dashboards, books, websites, and presentations from the same source format.</p>
<h3>Tables with gt and kableExtra</h3>
` },
    { type: 'code', lang: 'r', src: `# kableExtra — enhanced kable tables
library(knitr); library(kableExtra)

summary_table <- data.frame(
  Batch  = c("A","B","C"),
  N      = c(20, 22, 18),
  Mean   = c(78.2, 72.5, 82.1),
  SD     = c(9.8, 11.2, 8.1),
  Pass   = c("90%","77%","94%")
)

kable(summary_table, align=c("l","c","c","c","c"),
      caption="Student Performance by Batch") |>
  kable_styling(bootstrap_options=c("striped","hover"),
                full_width=FALSE) |>
  row_spec(3, bold=TRUE, background="#E8F5E9") |>  # highlight best batch
  add_header_above(c(" "=1, "Statistics"=4)) |>
  footnote(general="Pass rate = score ≥ 70")

# gt package — more flexible, modern table styling
library(gt)
summary_table |>
  gt() |>
  tab_header(title="Student Performance by Batch",
             subtitle="Academic Year 2025") |>
  data_color(columns=Mean,
             palette=c("#FFF3E0","#FF6F00")) |>  # colour cells by value
  cols_align(align="center", columns=c(N,Mean,SD,Pass)) |>
  tab_source_note("Source: DSA Student Database")`,
      out: `[Styled HTML table with coloured cells, header spans, and footer notes]` },
    { type: 'code', lang: 'r', src: `# Quarto document basics (.qmd file)
# Very similar to R Markdown but uses --- for YAML and #| for chunk options

# --- quarto_report.qmd ---
# ---
# title: "DSA Analysis"
# format:
#   html:
#     theme: lux
#     code-fold: true
# execute:
#   warning: false
# ---
#
# ## Analysis
#
# \`\`\`{r}
# #| label: fig-scatter
# #| fig-cap: "Scatter plot of study hours vs score"
# #| fig-width: 8
#
# library(ggplot2)
# ggplot(mtcars, aes(wt, mpg)) + geom_point() + theme_minimal()
# \`\`\`

# Render a Quarto document
# In terminal: quarto render report.qmd
# Or in R:
if (system.file(package="quarto") != "") {
  quarto::quarto_render("report.qmd", output_format="html")
}`,
      out: `[Quarto renders: HTML with collapsible code blocks, figure captions, cross-references]` },
    { type: 'exercise', title: 'Parametrised Report',
      body: `<p>Create a parametrised R Markdown report that can generate a performance summary for any batch:</p>
<ol>
<li>Add a <code>params</code> section to the YAML: <code>batch: "A"</code> and <code>min_score: 70</code></li>
<li>In the document, filter student data to <code>params$batch</code> and compute descriptive stats</li>
<li>Create a ggplot2 bar chart of the score distribution</li>
<li>Create a summary table using kable showing: student name, score, and pass/fail status based on <code>params$min_score</code></li>
<li>Render the same report twice with <code>rmarkdown::render()</code>: once for Batch A (min_score=70), once for Batch B (min_score=75), saving to different output files</li>
</ol>`,
      hint: `<code>rmarkdown::render("report.Rmd", params=list(batch="A", min_score=70), output_file="report_A.html")</code>. In the Rmd, reference params with <code>params$batch</code> and <code>params$min_score</code>.`,
      solution: `# report_template.Rmd
# ---
# title: "Batch Report"
# params:
#   batch: "A"
#   min_score: 70
# ---
# \`\`\`{r echo=FALSE}
# library(dplyr); library(ggplot2); library(knitr)
# set.seed(42)
# students <- data.frame(
#   name=paste0("Student_",1:40),
#   batch=rep(c("A","B"),20),
#   score=c(rnorm(20,78,10),rnorm(20,72,12)) |> round() |> pmax(40) |> pmin(100)
# )
# batch_data <- students |> filter(batch==params$batch) |>
#   mutate(status=if_else(score>=params$min_score,"Pass","Fail"))
# \`\`\`
# ## Batch \`r params$batch\` — Summary (Pass ≥ \`r params$min_score\`)
# \`\`\`{r echo=FALSE}
# kable(batch_data, caption=paste("Batch",params$batch,"Results"))
# \`\`\`

# Render both batches
library(rmarkdown)
for (b in c("A","B")) {
  render("report_template.Rmd",
    params=list(batch=b, min_score=70),
    output_file=paste0("report_batch_",b,".html"))
}` }
  ]
};

L['r-w6-l3'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `
<h2>Introduction to Shiny — Interactive Web Apps in R</h2>
<p>Shiny turns R code into interactive web applications with no web development knowledge required. A Shiny app has two parts: the <strong>UI</strong> (what the user sees) and the <strong>server</strong> (the R logic that responds to user input). The reactive system connects them — when an input changes, all outputs that depend on it automatically update.</p>
<h3>A Minimal Shiny App</h3>
` },
    { type: 'code', lang: 'r', src: `# Install and load shiny
# install.packages("shiny")
library(shiny)

# A complete minimal Shiny app — save as app.R and run with shiny::runApp()
ui <- fluidPage(
  titlePanel("Score Distribution Explorer"),

  sidebarLayout(
    sidebarPanel(
      sliderInput(inputId = "n",
                  label   = "Number of students:",
                  min = 10, max = 200, value = 50, step = 10),
      numericInput(inputId = "mean",
                   label   = "Mean score:",
                   value   = 72, min = 0, max = 100),
      numericInput(inputId = "sd",
                   label   = "Standard deviation:",
                   value   = 10, min = 1, max = 30),
      checkboxInput("show_mean", "Show mean line", value = TRUE)
    ),

    mainPanel(
      plotOutput("histogram"),
      textOutput("summary_text"),
      tableOutput("percentiles")
    )
  )
)

server <- function(input, output, session) {
  # Reactive: auto-regenerates when inputs change
  scores <- reactive({
    rnorm(input$n, mean=input$mean, sd=input$sd) |> pmax(0) |> pmin(100)
  })

  output$histogram <- renderPlot({
    s <- scores()
    hist(s, breaks=20, col="#2196F3", border="white",
         main=paste0("Score Distribution (n=", input$n, ")"),
         xlab="Score")
    if (input$show_mean)
      abline(v=mean(s), col="red", lwd=2, lty=2)
  })

  output$summary_text <- renderText({
    s <- scores()
    paste0("Mean: ", round(mean(s),1), " | SD: ", round(sd(s),1),
           " | Pass rate (≥60): ", round(mean(s>=60)*100,1), "%")
  })

  output$percentiles <- renderTable({
    s <- scores()
    data.frame(
      Percentile = c("25th","50th","75th","90th"),
      Score      = round(quantile(s, c(.25,.5,.75,.9)), 1)
    )
  })
}

shinyApp(ui, server)`,
      out: `[Shiny app launches in browser: histogram updates live when sliders move]` },
    { type: 'tip', body: `Deploy Shiny apps for free at <strong>shinyapps.io</strong> (Posit's hosted service). Use <code>rsconnect::deployApp()</code> after registering. For internal use, <strong>Shiny Server</strong> (open-source) runs on any Linux server. For production with authentication and scaling, use <strong>Posit Connect</strong>.` },
    { type: 'exercise', title: 'Shiny EDA Dashboard',
      body: `<p>Build a Shiny app with a sidebar and two tabs:</p>
<ol>
<li><strong>Sidebar inputs</strong>: dataset selector (mtcars, iris, airquality), x-variable selector (all columns of selected dataset), y-variable selector, colour-by variable (optional)</li>
<li><strong>Tab 1 "Visualisation"</strong>: scatter plot of x vs y, coloured by the selected variable. Auto-updates when any input changes.</li>
<li><strong>Tab 2 "Summary"</strong>: a kable table showing summary statistics for all numeric columns of the selected dataset</li>
<li>Add a download button that saves the current plot as a PNG</li>
</ol>`,
      hint: `Use <code>reactive(get(input$dataset))</code> to load the selected dataset. <code>updateSelectInput(session, "x_var", choices=names(data()))</code> to update the variable dropdowns reactively. <code>downloadHandler(filename="plot.png", content=function(file) ggsave(file, plot=current_plot()))</code>.`,
      solution: `library(shiny); library(ggplot2); library(knitr); library(kableExtra)

ui <- fluidPage(
  titlePanel("Dataset Explorer"),
  sidebarLayout(
    sidebarPanel(
      selectInput("dataset","Dataset:", c("mtcars","iris","airquality")),
      selectInput("x_var","X variable:",choices=NULL),
      selectInput("y_var","Y variable:",choices=NULL),
      selectInput("colour","Colour by:",choices=c("None"="none")),
      downloadButton("download_plot","Download Plot")
    ),
    mainPanel(tabsetPanel(
      tabPanel("Visualisation",plotOutput("scatter")),
      tabPanel("Summary",tableOutput("summary_tbl"))
    ))
  )
)

server <- function(input,output,session) {
  data <- reactive(get(input$dataset))
  observeEvent(data(),{
    cols <- names(data()); num_cols <- names(Filter(is.numeric,data()))
    updateSelectInput(session,"x_var",choices=num_cols)
    updateSelectInput(session,"y_var",choices=num_cols,selected=num_cols[2])
    updateSelectInput(session,"colour",choices=c("None"="none",cols))
  })
  current_plot <- reactive({
    p <- ggplot(data(),aes(.data[[input$x_var]],.data[[input$y_var]]))
    if(input$colour!="none") p <- p+aes(colour=.data[[input$colour]])
    p + geom_point(alpha=0.7,size=3) + theme_minimal()
  })
  output$scatter <- renderPlot(current_plot())
  output$summary_tbl <- renderTable(summary(Filter(is.numeric,data())))
  output$download_plot <- downloadHandler(
    filename="plot.png",
    content=function(f) ggsave(f,current_plot(),width=8,height=5,dpi=150)
  )
}
shinyApp(ui,server)` }
  ]
};

L['r-w6-l4'] = {
  duration_mins: 55,
  sections: [
    { type: 'text', body: `
<h2>Capstone EDA Project — End-to-End Analysis in R</h2>
<p>This lesson walks through a complete exploratory data analysis (EDA) using everything you've learned: data import, cleaning, wrangling with dplyr, visualisation with ggplot2, and statistical testing. Work through every step — this is the pattern you'll use on every real analysis.</p>
<h3>The Dataset: Indian Air Quality</h3>
<p>We'll analyse air quality data (AQI) across Indian cities — a public dataset available from data.gov.in. The analysis answers: Which cities have the worst air quality? Is AQI trending over time? Are weekday and weekend AQI values different?</p>
` },
    { type: 'code', lang: 'r', src: `# Simulate the air quality dataset (mirrors real AQI data structure)
library(dplyr); library(ggplot2); library(lubridate); library(tidyr)
set.seed(42)

cities_aqi <- list(
  Delhi     = list(mean=180, sd=60),
  Mumbai    = list(mean=120, sd=40),
  Bengaluru = list(mean= 80, sd=25),
  Chennai   = list(mean= 95, sd=30),
  Hyderabad = list(mean=105, sd=35)
)

# Generate 2 years of daily data per city
dates <- seq(as.Date("2023-01-01"), as.Date("2024-12-31"), by="day")
aqi_data <- bind_rows(lapply(names(cities_aqi), function(city) {
  params  <- cities_aqi[[city]]
  n       <- length(dates)
  seasonal <- 20 * sin(2 * pi * as.numeric(format(dates,"%m")) / 12)
  tibble(
    date    = dates,
    city    = city,
    aqi     = round(pmax(20, rnorm(n, params$mean + seasonal, params$sd))),
    pm25    = round(pmax(5,  rnorm(n, params$mean*0.4, params$sd*0.3)), 1),
    pm10    = round(pmax(10, rnorm(n, params$mean*0.7, params$sd*0.5)), 1)
  )
}))

cat("Rows:", nrow(aqi_data), "| Cols:", ncol(aqi_data), "\\n")
cat("Date range:", as.character(min(aqi_data$date)), "to", as.character(max(aqi_data$date)), "\\n")
glimpse(aqi_data)`,
      out: `Rows: 3650 | Cols: 5
Date range: 2023-01-01 to 2024-12-31` },
    { type: 'code', lang: 'r', src: `# ── STEP 1: DATA CLEANING & FEATURE ENGINEERING ─────────────────────
aqi_clean <- aqi_data |>
  mutate(
    year     = year(date),
    month    = month(date, label=TRUE),
    weekday  = wday(date, label=TRUE),
    is_weekend = weekday %in% c("Sat","Sun"),
    aqi_cat  = case_when(
      aqi <= 50  ~ "Good",
      aqi <= 100 ~ "Moderate",
      aqi <= 150 ~ "Unhealthy (Sensitive)",
      aqi <= 200 ~ "Unhealthy",
      aqi <= 300 ~ "Very Unhealthy",
      TRUE       ~ "Hazardous"
    ) |> factor(levels=c("Good","Moderate","Unhealthy (Sensitive)",
                          "Unhealthy","Very Unhealthy","Hazardous"),
                ordered=TRUE)
  )

# ── STEP 2: SUMMARY BY CITY ─────────────────────────────────────────
city_summary <- aqi_clean |>
  group_by(city) |>
  summarise(
    mean_aqi  = round(mean(aqi),  1),
    median_aqi = median(aqi),
    max_aqi   = max(aqi),
    pct_good  = round(mean(aqi<=100)*100, 1)
  ) |>
  arrange(desc(mean_aqi))

print(city_summary)`,
      out: `  city      mean_aqi median_aqi max_aqi pct_good
  Delhi        188.3        186     378     8.5
  Mumbai       126.7        124     280    43.2
  Hyderabad    112.4        110     248    58.9
  Chennai      102.1        100     225    64.1
  Bengaluru     85.3         84     191    82.7` },
    { type: 'code', lang: 'r', src: `# ── STEP 3: VISUALISATIONS ─────────────────────────────────────────
# City comparison boxplot
p1 <- ggplot(aqi_clean, aes(reorder(city, aqi, median), aqi, fill=city)) +
  geom_boxplot(alpha=0.8, outlier.size=0.5, outlier.alpha=0.3) +
  geom_hline(yintercept=100, linetype="dashed", colour="orange", linewidth=1) +
  annotate("text", x=0.7, y=105, label="Moderate threshold (AQI=100)",
           colour="orange", hjust=0, size=3.5) +
  scale_fill_brewer(palette="Set2") +
  labs(title="Air Quality Index by City (2023–2024)",
       x=NULL, y="AQI", fill=NULL) +
  theme_minimal() + theme(legend.position="none") + coord_flip()

# Monthly trend
p2 <- aqi_clean |>
  group_by(city, month) |>
  summarise(mean_aqi=mean(aqi), .groups="drop") |>
  ggplot(aes(month, mean_aqi, colour=city, group=city)) +
  geom_line(linewidth=1.2) + geom_point(size=2.5) +
  labs(title="Monthly AQI Trend by City",
       x="Month", y="Mean AQI", colour="City") +
  theme_minimal()

library(patchwork)
p1 / p2`,
      out: `[Horizontal boxplot showing Delhi highest AQI | Line chart showing seasonal trend]` },
    { type: 'code', lang: 'r', src: `# ── STEP 4: STATISTICAL TESTING ─────────────────────────────────────
# Is weekend AQI different from weekday AQI?
delhi <- aqi_clean |> filter(city=="Delhi")

weekday_aqi <- delhi |> filter(!is_weekend) |> pull(aqi)
weekend_aqi <- delhi |> filter(is_weekend)  |> pull(aqi)

test_result <- t.test(weekday_aqi, weekend_aqi, alternative="two.sided")
cat("Delhi weekday mean:", round(mean(weekday_aqi),1), "\\n")
cat("Delhi weekend mean:", round(mean(weekend_aqi),1), "\\n")
cat("p-value:", round(test_result$p.value, 4), "\\n")
cat("Significant difference?", test_result$p.value < 0.05, "\\n")

# ANOVA: Are city AQI means significantly different?
anova_result <- aov(aqi ~ city, data=aqi_clean)
cat("\\nANOVA p-value:", summary(anova_result)[[1]][["Pr(>F)"]][1], "\\n")

# Post-hoc pairwise comparisons
tukey <- TukeyHSD(anova_result)
# Which city pairs are NOT significantly different?
sig_pairs <- as.data.frame(tukey$city) |>
  filter(\`p adj\` > 0.05)
cat("Non-significant city pairs:\\n"); print(sig_pairs)`,
      out: `Delhi weekday mean: 190.1
Delhi weekend mean: 183.5
p-value: 0.0312
Significant difference? TRUE

ANOVA p-value: < 2.2e-16` },
    { type: 'exercise', title: 'Extend the AQI Analysis',
      body: `<p>Using the <code>aqi_clean</code> dataset from this lesson:</p>
<ol>
<li>Identify the worst-10 individual days (highest AQI) across all cities. Show: date, city, AQI, AQI category.</li>
<li>Compute year-over-year change in mean AQI per city (2024 vs 2023). Is any city improving?</li>
<li>Create a heatmap: cities as rows, months as columns, fill = mean AQI (use ggplot2 with <code>geom_tile()</code>)</li>
<li>Test whether PM2.5 and PM10 are significantly correlated with AQI using <code>cor.test()</code>. Report r and p-value for each.</li>
</ol>`,
      hint: `For YoY change: <code>group_by(city, year) |> summarise(mean_aqi=mean(aqi)) |> pivot_wider(names_from=year) |> mutate(change="2024"-"2023")</code>. For the heatmap: <code>group_by(city, month) |> summarise(mean_aqi=mean(aqi))</code> then <code>geom_tile(aes(fill=mean_aqi)) + scale_fill_gradient2()</code>.`,
      solution: `library(dplyr); library(ggplot2); library(tidyr)

# 1. Worst 10 days
worst10 <- aqi_clean |> slice_max(aqi, n=10) |>
  select(date, city, aqi, aqi_cat) |> arrange(desc(aqi))
print(worst10)

# 2. YoY change
yoy <- aqi_clean |> group_by(city, year) |>
  summarise(mean_aqi=round(mean(aqi),1), .groups="drop") |>
  pivot_wider(names_from=year, values_from=mean_aqi,
              names_prefix="aqi_") |>
  mutate(change=aqi_2024-aqi_2023,
         trend=if_else(change<0,"Improving","Worsening"))
print(yoy)

# 3. Heatmap
aqi_clean |> group_by(city, month) |>
  summarise(mean_aqi=mean(aqi), .groups="drop") |>
  ggplot(aes(month, city, fill=mean_aqi)) +
  geom_tile(colour="white") +
  scale_fill_gradient(low="#E8F5E9", high="#B71C1C", name="Mean AQI") +
  labs(title="Monthly AQI Heatmap by City") + theme_minimal()

# 4. Correlations
for (poll in c("pm25","pm10")) {
  res <- cor.test(aqi_clean$aqi, aqi_clean[[poll]])
  cat(poll, "r =", round(res$estimate,3), "p <", signif(res$p.value,3), "\\n")
}` }
  ]
};

L['r-w6-l5'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `
<h2>Next Steps — tidymodels, Career Paths &amp; the R Ecosystem</h2>
<p>You've completed the R Programming course — a serious foundation in data analysis. This lesson maps out what's next: machine learning in R with tidymodels, the broader ecosystem of packages, and how R fits into data science careers.</p>
<h3>tidymodels — Machine Learning in R</h3>
<p><code>tidymodels</code> is the tidyverse's answer to scikit-learn: a collection of packages with a unified interface for ML in R. The workflow mirrors Python's pipelines but uses R's formula interface and dplyr-style syntax.</p>
` },
    { type: 'code', lang: 'r', src: `# Install once: install.packages("tidymodels")
library(tidymodels)

# Complete ML pipeline in tidymodels
data(ames, package="modeldata")   # house prices dataset

# Step 1: Split data
set.seed(42)
ames_split <- initial_split(ames, prop=0.8, strata=Sale_Price)
ames_train <- training(ames_split)
ames_test  <- testing(ames_split)

# Step 2: Recipe (preprocessing)
ames_recipe <- recipe(Sale_Price ~ ., data=ames_train) |>
  step_log(Sale_Price, base=10) |>         # log-transform target
  step_impute_median(all_numeric_predictors()) |>
  step_dummy(all_nominal_predictors()) |>  # one-hot encode
  step_normalize(all_numeric_predictors()) |>
  step_nzv(all_predictors())               # remove near-zero variance

# Step 3: Model specification
rf_spec <- rand_forest(trees=200, mtry=tune(), min_n=tune()) |>
  set_engine("ranger") |>
  set_mode("regression")

# Step 4: Workflow
ames_wf <- workflow() |>
  add_recipe(ames_recipe) |>
  add_model(rf_spec)

# Step 5: Cross-validation and tuning
cv_folds <- vfold_cv(ames_train, v=5, strata=Sale_Price)
# tune_result <- tune_grid(ames_wf, resamples=cv_folds, grid=20)
# best_params <- select_best(tune_result, metric="rmse")
cat("tidymodels workflow defined — 5-fold CV ready for tuning\\n")`,
      out: `tidymodels workflow defined — 5-fold CV ready for tuning` },
    { type: 'text', body: `
<h3>The Broader R Ecosystem</h3>
<table style="width:100%;border-collapse:collapse;font-size:.9rem;margin:1rem 0">
<thead><tr style="background:var(--fog2)">
  <th style="padding:.5rem .8rem">Domain</th><th style="padding:.5rem .8rem">Key Packages</th><th style="padding:.5rem .8rem">Use</th>
</tr></thead>
<tbody>
<tr><td style="padding:.4rem .8rem">ML / Modelling</td><td style="padding:.4rem .8rem">tidymodels, caret, xgboost</td><td style="padding:.4rem .8rem">Supervised learning, classification, regression</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem">Time Series</td><td style="padding:.4rem .8rem">forecast, fable, timetk</td><td style="padding:.4rem .8rem">ARIMA, ETS, Prophet-style models</td></tr>
<tr><td style="padding:.4rem .8rem">Text Analysis</td><td style="padding:.4rem .8rem">tidytext, quanteda, tm</td><td style="padding:.4rem .8rem">Sentiment analysis, topic modelling, NLP</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem">Bayesian Stats</td><td style="padding:.4rem .8rem">brms, Stan, rstanarm</td><td style="padding:.4rem .8rem">Bayesian regression, hierarchical models</td></tr>
<tr><td style="padding:.4rem .8rem">Geospatial</td><td style="padding:.4rem .8rem">sf, ggmap, leaflet</td><td style="padding:.4rem .8rem">Maps, spatial data, interactive maps</td></tr>
<tr style="background:var(--fog2)"><td style="padding:.4rem .8rem">Survival Analysis</td><td style="padding:.4rem .8rem">survival, survminer</td><td style="padding:.4rem .8rem">Time-to-event, Kaplan-Meier curves</td></tr>
<tr><td style="padding:.4rem .8rem">Reproducibility</td><td style="padding:.4rem .8rem">renv, targets, docker</td><td style="padding:.4rem .8rem">Package management, pipeline automation</td></tr>
</tbody></table>
` },
    { type: 'code', lang: 'r', src: `# renv — project-level package management (R's equivalent of virtualenv)
# install.packages("renv")

# In a new project:
# renv::init()         # creates renv.lock file with exact package versions
# renv::snapshot()     # update lock file after installing packages
# renv::restore()      # restore exact versions (for reproducibility)

# targets — pipeline automation (like Makefile for R)
# install.packages("targets")
# Each analysis step is defined as a target; targets only re-runs
# steps whose dependencies changed — extremely useful for long analyses

# Example targets pipeline (stored in _targets.R):
# library(targets)
# list(
#   tar_target(raw_data,     read_csv("data/raw.csv")),
#   tar_target(clean_data,   clean(raw_data)),
#   tar_target(model,        fit_model(clean_data)),
#   tar_target(report,       render_report(model, clean_data))
# )
# Run with: targets::tar_make()

# R vs Python: final thoughts
career_paths <- data.frame(
  Role             = c("Academic Researcher","Data Analyst","Biostatistician",
                       "ML Engineer","Data Scientist (Generalist)"),
  R_importance     = c("Essential","High","Essential","Low","Medium"),
  Python_importance= c("Low","Medium","Low","Essential","High")
)
print(career_paths)`,
      out: `                  Role R_importance Python_importance
1  Academic Researcher    Essential               Low
2         Data Analyst         High            Medium
3      Biostatistician    Essential               Low
4         ML Engineer          Low         Essential
5 Data Scientist (Gen)       Medium              High` },
    { type: 'tip', body: `The fastest way to deepen your R skills: read <strong>R for Data Science (2nd edition)</strong> by Hadley Wickham — free online at r4ds.hadley.nz. Then <strong>Advanced R</strong> for language internals. For statistical modelling: <strong>Statistical Learning with R</strong> (ISLR) has a free companion R package with all datasets and exercises built in.` },
    { type: 'exercise', title: 'Capstone: Full Analysis Pipeline',
      body: `<p>Conduct a complete end-to-end analysis on the <code>gapminder</code> dataset:</p>
<ol>
<li><strong>Clean & Explore</strong>: report dimensions, missing values, and a glimpse. Compute life expectancy statistics by continent and year.</li>
<li><strong>Visualise</strong>: (a) Line chart of mean life expectancy over time by continent. (b) Scatter of GDP per capita (log) vs life expectancy for the most recent year, sized by population, coloured by continent.</li>
<li><strong>Statistical Testing</strong>: ANOVA testing whether life expectancy differs across continents in 2007. Run TukeyHSD post-hoc. Which continents are significantly different from each other?</li>
<li><strong>Model</strong>: Fit a linear regression predicting life expectancy from <code>log(gdpPercap)</code> and <code>year</code>. Report R², interpret the GDP coefficient.</li>
<li><strong>Report</strong>: Create an R Markdown report with all the above — plots, tables, and inline statistics. Save as HTML.</li>
</ol>`,
      hint: `<code>library(gapminder)</code>. For the regression: <code>lm(lifeExp ~ log(gdpPercap) + year, data=gapminder)</code>. For TukeyHSD: <code>TukeyHSD(aov(lifeExp ~ continent, data=gapminder2007))</code>.`,
      solution: `library(gapminder); library(dplyr); library(ggplot2)

# 1. Clean & Explore
cat("Dimensions:", dim(gapminder), "\\n")
cat("Missing values:", sum(is.na(gapminder)), "\\n")
gapminder |> group_by(continent, year) |>
  summarise(mean_le=round(mean(lifeExp),1), .groups="drop") |> tail(10)

# 2a. Life expectancy trend
gapminder |> group_by(continent, year) |>
  summarise(mean_le=mean(lifeExp), .groups="drop") |>
  ggplot(aes(year, mean_le, colour=continent)) +
  geom_line(linewidth=1.2) + theme_minimal() +
  labs(title="Life Expectancy Trend by Continent")

# 2b. GDP vs Life Exp 2007
gapminder |> filter(year==2007) |>
  ggplot(aes(gdpPercap, lifeExp, size=pop/1e6, colour=continent)) +
  geom_point(alpha=0.7) + scale_x_log10() +
  scale_size_continuous(range=c(1,15), guide=guide_legend(title="Pop (M)")) +
  theme_minimal() + labs(title="GDP vs Life Expectancy (2007)")

# 3. ANOVA
gm2007 <- gapminder |> filter(year==2007)
anova_res <- aov(lifeExp ~ continent, data=gm2007)
cat("\\nANOVA:\\n"); print(summary(anova_res))
cat("\\nTukey HSD:\\n"); print(TukeyHSD(anova_res))

# 4. Linear model
model <- lm(lifeExp ~ log(gdpPercap) + year, data=gapminder)
cat("\\nModel summary:\\n"); print(summary(model)$coefficients)
cat("R-squared:", round(summary(model)$r.squared, 3), "\\n")` }
  ]
};


L['r-w1-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Week 1 Quiz — R Basics &amp; RStudio</h2><p>Test your knowledge of the RStudio interface, vectors, factors, core data types, control flow (if/else, loops, functions), and string manipulation in R.</p>` }
]};

L['r-w2-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Week 2 Quiz — R Data Structures</h2><p>Test your knowledge of matrices, arrays, lists, data frames, tibbles, importing data from CSV/Excel/RDS, and inspecting and cleaning raw data.</p>` }
]};

L['r-w3-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Week 3 Quiz — Data Wrangling</h2><p>Test your knowledge of the pipe operator, dplyr verbs (filter, select, mutate, arrange), group_by and summarise, reshaping with tidyr (pivot_longer/pivot_wider), and joining data frames.</p>` }
]};

L['r-w4-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Week 4 Quiz — Data Visualisation</h2><p>Test your knowledge of the grammar of graphics, ggplot2 layers (geom_bar, geom_line, geom_histogram, geom_boxplot, geom_violin), faceting, themes, scales, and exporting publication-ready charts with ggsave.</p>` }
]};

L['r-w5-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Week 5 Quiz — Statistical Analysis</h2><p>Test your knowledge of descriptive statistics, probability distributions (dnorm, pnorm, qnorm, rnorm), hypothesis testing (t-test, chi-squared, ANOVA), correlation analysis (Pearson, Spearman), and linear regression in R.</p>` }
]};

L['r-w6-quiz'] = { duration_mins: 10, sections: [
  { type:'text', body:`<h2>Week 6 Quiz — R Markdown &amp; Capstone</h2><p>Test your knowledge of R Markdown document structure, output formats (HTML, PDF, Word), Quarto, building interactive Shiny applications, and the end-to-end EDA capstone workflow.</p>` }
]};

})();

## Content History — Field Guide

This file explains every column in content-history.csv so routines interpret it consistently.

### File: social-automation/content-history.csv

Each row = one day's published content. Routine 5 appends the row. Routines 1 and 3 read it for freshness checks.

---

### Column Definitions

**date** — YYYY-MM-DD format. The date the content was planned (not necessarily published).

**day_of_week** — Monday through Sunday.

**topic** — 5-10 word description of the core topic. Be specific.
Examples: "Python replacing Excel in Indian data jobs", "AZ-900 certification career impact India", "Research paper rejection common mistakes"

**topic_category** — One of: career / tutorial / research / testimonial / AI-news / promotion / community
Maps to the weekly content calendar theme.

**hook_first_line** — The exact first line of the LinkedIn post (Asset 1 from Routine 3). This is what Routine 3 checks to avoid repetition.

**hook_type** — Classify the hook structure:
- question: Opens with a direct question ("Have you ever wondered why...")
- stat: Opens with a number or data point ("72% of data science job postings...")
- challenge: Directly challenges the reader ("Your resume says Python. But...")
- story: Opens with a mini-narrative ("Priya had 11 rejection emails when she came to us...")
- bold-claim: Makes a strong declarative statement ("Python is dead for analysts who don't know this.")
- contrast: Sets up an unexpected contrast ("Everyone is learning AI. Nobody is learning to use it.")

**emotional_trigger** — Primary emotion activated:
- fear: Fear of being left behind, replaced, rejected
- aspiration: Desire for a better career, salary, recognition
- curiosity: Intrigue about a concept, trend, or surprising fact
- FOMO: Fear of missing a specific opportunity or deadline
- pride: Validation of being a learner, achiever, part of DSA community

**platform** — LinkedIn / Instagram / Both

**format** — Carousel / TextPost / Reel / Story / Poll / Document

**persona** — A / B / C / D
A = Anxious Engineering Student
B = Stuck Professional
C = Research-Pressured M.Tech/PhD
D = Corporate L&D Decision Maker

**dsa_product** — Which DSA offering was the content connected to:
AI-DS-Program / Azure-DataEngineer / Azure-AI / PowerBI / Research-Assistance / DSA-CodeChamps / Corporate-Training / Communication / General-Branding

**lead_magnet** — Which free resource was offered:
AI-Roadmap / Interview-Prep-Kit / Azure-Guide / Research-Template / Webinar / None

**cta_keyword** — The DM trigger word used (e.g., ROADMAP, GUIDE, APPLY, ENROLL). "None" if no keyword CTA.

**quality_score** — Routine 5's content quality audit score out of 50. Blank if Routine 5 hasn't run yet.

**notes** — One sentence of Routine 5's key insight about this day's content. What worked or what to watch.

---

### How Routines Use This File

**Routine 1 (Trend Scanner):**
1. Read all rows from the last 14 days
2. Extract the list of topics covered
3. EXCLUDE topics that match any entry from the last 7 days
4. Apply -3 penalty score to topics similar to any entry from days 8-14
5. Check the last 5 persona column values — avoid selecting the same persona 3 days in a row
6. Check the last 5 format values — avoid the same format 3 consecutive days

**Routine 3 (Copywriter):**
1. Read the last 7 rows
2. Extract hook_first_line and hook_type from each
3. Your LinkedIn hook MUST use a different hook_type than the last 3 entries
4. Check emotional_trigger column — avoid using the same trigger as the last 2 entries
5. This ensures the content feed feels varied and non-repetitive to followers

**Routine 5 (Intelligence Engine):**
After completing the quality audit and optimization report, append a new row:
Format: {TODAY_DATE},{DAY_NAME},{topic},{topic_category},{hook_first_line},{hook_type},{emotional_trigger},{platform},{format},{persona},{dsa_product},{lead_magnet},{cta_keyword},{quality_score},{one-sentence note}

Use commas within fields carefully — if a field contains a comma, wrap it in double quotes.
After appending, include this file in the git commit.

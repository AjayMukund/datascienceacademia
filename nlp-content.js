(function(){
'use strict';
window.DSA_LESSON_CONTENT = window.DSA_LESSON_CONTENT || {};
const L = window.DSA_LESSON_CONTENT;

// ─── WEEK 1 — Text Preprocessing ────────────────────────────────────────────

L['nlp-w1-l1'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>Introduction to NLP and Text Data</h2>
<p>Natural Language Processing (NLP) is the branch of AI concerned with enabling computers to understand, interpret, and generate human language. Unlike structured tabular data where values are numeric or categorical, text is high-dimensional, sparse, ambiguous, and context-dependent — which makes it both challenging and richly informative.</p>
<h3>Why Text is Different</h3>
<ul>
  <li><strong>Unstructured:</strong> No fixed schema. A sentence can be 3 words or 3,000.</li>
  <li><strong>Ambiguous:</strong> "Bank" means a financial institution or a riverbank depending on context.</li>
  <li><strong>Compositional:</strong> Meaning emerges from word combinations, not individual words ("not bad" ≠ "bad").</li>
  <li><strong>High-dimensional:</strong> A vocabulary of 50,000 words means 50,000 potential features per document.</li>
  <li><strong>Sequential:</strong> Word order matters — "dog bites man" ≠ "man bites dog".</li>
</ul>
<h3>Core NLP Tasks</h3>
<p>NLP covers a broad range of tasks, each building on the others:</p>
<ul>
  <li><strong>Text classification:</strong> Spam detection, sentiment analysis, topic categorisation</li>
  <li><strong>Named entity recognition (NER):</strong> Extracting names, dates, locations from text</li>
  <li><strong>Machine translation:</strong> English → Hindi</li>
  <li><strong>Question answering:</strong> Given a passage, answer a question</li>
  <li><strong>Text generation:</strong> Summarisation, dialogue, story writing</li>
  <li><strong>Information extraction:</strong> Pulling structured data from unstructured documents</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import pandas as pd

# Example: loading and inspecting a text dataset
df = pd.read_csv('news_articles.csv')
print(df.head())
print(f"\nShape: {df.shape}")
print(f"Columns: {df.columns.tolist()}")

# Basic text statistics
df['text_len']   = df['article'].str.len()
df['word_count'] = df['article'].str.split().str.len()
df['sent_count'] = df['article'].str.count(r'[.!?]+')

print(df[['text_len','word_count','sent_count']].describe().round(1))

# Class distribution (for classification tasks)
if 'label' in df.columns:
    print(df['label'].value_counts(normalize=True).mul(100).round(1))` },
    { type: 'text', body: `<h3>The NLP Pipeline</h3>
<p>Most NLP systems share a common pipeline structure:</p>
<ol>
  <li><strong>Raw text</strong> → collect and clean</li>
  <li><strong>Preprocessing</strong> → tokenise, normalise, remove noise</li>
  <li><strong>Feature extraction</strong> → BoW, TF-IDF, embeddings</li>
  <li><strong>Modelling</strong> → classify, generate, extract</li>
  <li><strong>Evaluation</strong> → accuracy, F1, BLEU, human judgement</li>
  <li><strong>Deployment</strong> → serve, monitor, retrain</li>
</ol>
<p>This course follows that structure across 8 weeks. Weeks 1–2 cover preprocessing and traditional feature extraction. Weeks 3–6 cover learned representations from Word2Vec through Transformers. Weeks 7–8 cover applications and production deployment.</p>` },
    { type: 'tip', body: `The best NLP system is the simplest one that meets your requirements. Before reaching for BERT, check whether TF-IDF + logistic regression achieves acceptable performance. It often does, and it is orders of magnitude cheaper to train, deploy, and explain.` },
    { type: 'exercise', title: 'Explore a Text Dataset', hint: 'Load the 20 Newsgroups dataset from sklearn. Compute average document length, vocabulary size, and class distribution. Identify the 3 most and least common words.', solution: `from sklearn.datasets import fetch_20newsgroups
import pandas as pd
from collections import Counter
import re

data = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'))
df = pd.DataFrame({'text': data.data, 'label': data.target})

# Basic stats
df['word_count'] = df['text'].str.split().str.len()
print(f"Docs: {len(df):,}")
print(f"Avg words: {df['word_count'].mean():.0f}")
print(f"Classes: {len(data.target_names)}")

# Vocabulary
all_words = ' '.join(df['text']).lower().split()
vocab = Counter(all_words)
print(f"Vocabulary size: {len(vocab):,}")
print("Most common:", vocab.most_common(5))
print("Rarest:", vocab.most_common()[-5:])` }
  ]
};

L['nlp-w1-l2'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>Tokenisation</h2>
<p>Tokenisation splits raw text into discrete units called tokens — typically words, subwords, or characters. It is the first and most fundamental step in any NLP pipeline. The choice of tokeniser affects everything downstream: vocabulary size, model input format, and how well the model handles rare or unseen words.</p>
<h3>Word Tokenisation</h3>
<p>Splitting on whitespace is the simplest approach but fails for punctuation, contractions, and languages with no word boundaries (Chinese, Japanese). More robust tokenisers handle these edge cases:</p>
<ul>
  <li><strong>NLTK word_tokenize:</strong> Uses the Penn Treebank tokeniser — handles "don't" → ["do", "n't"], punctuation separation</li>
  <li><strong>spaCy tokeniser:</strong> Rule-based with language-specific exceptions; fast and production-ready</li>
  <li><strong>Regex-based:</strong> Custom patterns for specific domains (emails, URLs, hashtags)</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import nltk
nltk.download('punkt_tab', quiet=True)
from nltk.tokenize import word_tokenize, sent_tokenize, TweetTokenizer
import re

text = "I can't believe it's 2025! Dr. Smith's paper (published in J.A.M.A.) changed everything."

# 1. Naive whitespace split — misses punctuation
print("Whitespace:", text.split())

# 2. NLTK word_tokenize — handles contractions and punctuation
print("NLTK:", word_tokenize(text))

# 3. Sentence tokenisation first, then word tokenisation
sentences = sent_tokenize(text)
print(f"Sentences: {sentences}")
for s in sentences:
    print(" Tokens:", word_tokenize(s))

# 4. Regex tokeniser — keep only alphabetic tokens
re_tokens = re.findall(r'\b[a-zA-Z]+\b', text.lower())
print("Regex:", re_tokens)

# 5. Tweet tokeniser — preserves hashtags, mentions, emoticons
tweet = "OMG @elonmusk just tweeted #AI is 🔥🔥🔥 lol"
tw_tok = TweetTokenizer()
print("Tweet:", tw_tok.tokenize(tweet))` },
    { type: 'text', body: `<h3>Subword Tokenisation</h3>
<p>Modern transformer models (BERT, GPT) use subword tokenisation, which decomposes rare words into smaller meaningful units. This eliminates out-of-vocabulary (OOV) problems — any word can be represented as a sequence of known subwords.</p>
<ul>
  <li><strong>BPE (Byte Pair Encoding):</strong> Used by GPT — starts from characters, merges the most frequent pairs iteratively</li>
  <li><strong>WordPiece:</strong> Used by BERT — similar to BPE but uses likelihood instead of frequency for merges</li>
  <li><strong>SentencePiece:</strong> Language-agnostic, works on raw text without word boundaries (useful for multilingual models)</li>
</ul>` },
    { type: 'code', lang: 'python', src: `from transformers import AutoTokenizer

# BERT WordPiece tokeniser
bert_tok = AutoTokenizer.from_pretrained('bert-base-uncased')
text = "The immunoglobulin concentration was unmeasurable."
tokens = bert_tok.tokenize(text)
print("BERT tokens:", tokens)
# ['the', 'im', '##mun', '##og', '##lob', '##ulin', 'concentration', 'was', 'un', '##meas', '##urable', '.']
# '##' prefix = continuation of previous token (not a word start)

# Encoding (tokens → IDs for model input)
enc = bert_tok(text, return_tensors='pt')
print("Input IDs:", enc['input_ids'])
print("Decoded:", bert_tok.decode(enc['input_ids'][0]))

# GPT-2 BPE tokeniser
gpt_tok = AutoTokenizer.from_pretrained('gpt2')
print("GPT-2 tokens:", gpt_tok.tokenize(text))` },
    { type: 'warn', title: 'Token ≠ Word for Transformer Models', body: `When using BERT or GPT models, "512 tokens" does not mean 512 words. Subword tokenisation means a single uncommon word might expand to 4–6 tokens. Always check actual token counts with the specific tokeniser — not word counts — when enforcing length limits.` },
    { type: 'exercise', title: 'Compare Tokenisers on the Same Text', hint: 'Tokenise a paragraph containing technical jargon, contractions, and an emoji using: whitespace split, NLTK, spaCy, and the BERT tokeniser. Count tokens and compare how each handles "immunotherapy" and "COVID-19".', solution: `import nltk; nltk.download('punkt_tab', quiet=True)
from nltk.tokenize import word_tokenize
import spacy; nlp = spacy.load('en_core_web_sm')
from transformers import AutoTokenizer

text = "COVID-19 immunotherapy trials can't be conducted without IRB approval — it's unethical 😷"

print("Whitespace:", len(text.split()), text.split())
print("NLTK:", len(word_tokenize(text)), word_tokenize(text))
print("spaCy:", len([t.text for t in nlp(text)]), [t.text for t in nlp(text)])
bert = AutoTokenizer.from_pretrained('bert-base-uncased')
bt = bert.tokenize(text)
print("BERT:", len(bt), bt)` }
  ]
};

L['nlp-w1-l3'] = {
  duration_mins: 30,
  sections: [
    { type: 'text', body: `<h2>Stopword Removal and Text Normalisation</h2>
<p>After tokenisation, raw tokens still contain noise that adds dimensionality without adding meaning. Text normalisation standardises tokens into a canonical form; stopword removal discards tokens that carry almost no content information.</p>
<h3>Stopwords</h3>
<p>Stopwords are high-frequency function words: "the", "a", "is", "of", "and". They appear in almost every document, so they have near-zero discriminative power for classification tasks. Removing them reduces vocabulary size by 20–30% without significant information loss — <em>for traditional bag-of-words models</em>.</p>
<p><strong>Important caveat:</strong> For modern transformer models, do NOT remove stopwords. BERT and GPT use every token to build contextual representations — "not good" and "good" are completely different, and removing "not" destroys the meaning. Stopword removal is a preprocessing step for BoW/TF-IDF pipelines only.</p>` },
    { type: 'code', lang: 'python', src: `import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
nltk.download('stopwords', quiet=True)
nltk.download('punkt_tab', quiet=True)

text = "The quick brown fox jumps over the lazy dog near the river bank"
tokens = word_tokenize(text.lower())

# NLTK stopword list (153 English words)
stop_en = set(stopwords.words('english'))
print(f"NLTK stopwords (sample): {list(stop_en)[:10]}")

filtered = [t for t in tokens if t not in stop_en and t.isalpha()]
print(f"Before: {tokens}")
print(f"After:  {filtered}")

# spaCy stopwords (330+ words, more comprehensive)
import spacy
nlp = spacy.load('en_core_web_sm')
doc = nlp(text)
spacy_filtered = [t.text for t in doc if not t.is_stop and not t.is_punct]
print(f"spaCy: {spacy_filtered}")` },
    { type: 'text', body: `<h3>Text Normalisation</h3>
<p>Normalisation maps different surface forms of the same concept to a single representation:</p>
<ul>
  <li><strong>Lowercasing:</strong> "Apple" → "apple". Reduces vocabulary by ~30% at the cost of losing case-sensitive signals (proper nouns, acronyms).</li>
  <li><strong>Punctuation removal:</strong> Strip non-alphanumeric characters for BoW. But preserve punctuation for sequence models — exclamation marks carry sentiment.</li>
  <li><strong>Number normalisation:</strong> Replace digits with a token (&lt;NUM&gt;) or remove them. "Call 9848012345" → "Call &lt;PHONE&gt;"</li>
  <li><strong>URL/email normalisation:</strong> Replace with &lt;URL&gt;, &lt;EMAIL&gt; tokens</li>
  <li><strong>Unicode normalisation:</strong> Handle accents (café → cafe), curly quotes, zero-width spaces</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import re
import unicodedata

def normalise_text(text, lowercase=True, remove_punct=True,
                   normalise_numbers=True, normalise_urls=True):
    # 1. Unicode normalisation — decompose accents, then remove non-ASCII
    text = unicodedata.normalize('NFKD', text)
    text = text.encode('ascii', 'ignore').decode('ascii')

    # 2. Lowercase
    if lowercase:
        text = text.lower()

    # 3. Normalise URLs
    if normalise_urls:
        text = re.sub(r'http\S+|www\.\S+', '<URL>', text)
        text = re.sub(r'\S+@\S+\.\S+', '<EMAIL>', text)

    # 4. Normalise numbers
    if normalise_numbers:
        text = re.sub(r'\d+', '<NUM>', text)

    # 5. Remove punctuation (keep spaces)
    if remove_punct:
        text = re.sub(r'[^\w\s<>]', ' ', text)

    # 6. Collapse multiple spaces
    text = re.sub(r'\s+', ' ', text).strip()
    return text

examples = [
    "Visit https://example.com or email info@company.org for details!",
    "Revenue grew 23% in Q3 2024, reaching $1.2B.",
    "Café René's menu has 42 items — all délicieux!"
]
for ex in examples:
    print(f"IN:  {ex}")
    print(f"OUT: {normalise_text(ex)}\n")` },
    { type: 'tip', body: `Domain-specific stopwords often matter more than generic ones. In medical text, "patient" might appear in 95% of documents and should be treated as a stopword. Build a corpus-specific stopword list by looking at the top-50 most frequent terms in your dataset.` },
    { type: 'exercise', title: 'Build a Text Cleaning Pipeline', hint: 'Write a clean_text() function that applies normalisation to a pandas Series. Apply it to the 20 Newsgroups dataset. Compare vocabulary size before and after cleaning.', solution: `from sklearn.datasets import fetch_20newsgroups
import pandas as pd, re, unicodedata
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import nltk; nltk.download('punkt_tab',quiet=True); nltk.download('stopwords',quiet=True)

data = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'))
df = pd.DataFrame({'text': data.data})

stop = set(stopwords.words('english'))

def clean_text(text):
    text = unicodedata.normalize('NFKD', text).encode('ascii','ignore').decode()
    text = re.sub(r'http\S+', '', text)
    text = text.lower()
    text = re.sub(r'[^\w\s]', ' ', text)
    tokens = [t for t in text.split() if t.isalpha() and t not in stop and len(t) > 1]
    return ' '.join(tokens)

df['clean'] = df['text'].apply(clean_text)

raw_vocab  = set(' '.join(df['text']).split())
clean_vocab = set(' '.join(df['clean']).split())
print(f"Raw vocab:   {len(raw_vocab):,}")
print(f"Clean vocab: {len(clean_vocab):,}")
print(f"Reduction:   {(1 - len(clean_vocab)/len(raw_vocab))*100:.1f}%")` }
  ]
};

L['nlp-w1-l4'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>Stemming and Lemmatisation</h2>
<p>Both stemming and lemmatisation reduce words to a base form, further collapsing the vocabulary. "running", "runs", "ran" all refer to the same concept — mapping them to a single form reduces sparsity in BoW models.</p>
<h3>Stemming</h3>
<p>Stemming applies heuristic rules to chop word suffixes: "running" → "run", "happiness" → "happi", "studies" → "studi". It is fast but crude — it produces stems that may not be real words, and over-stems (conflating unrelated words) or under-stems (keeping distinct words separate).</p>
<p>The Porter Stemmer and Snowball Stemmer are the most common. Snowball (Porter2) is an improvement and supports multiple languages.</p>
<h3>Lemmatisation</h3>
<p>Lemmatisation uses vocabulary and morphological analysis to return the dictionary base form (lemma): "running" → "run", "better" → "good", "was" → "be". It requires a Part-of-Speech tag to disambiguate: "meeting" as a noun → "meeting"; as a verb → "meet". Slower than stemming but produces real words and is more linguistically accurate.</p>` },
    { type: 'code', lang: 'python', src: `import nltk
from nltk.stem import PorterStemmer, SnowballStemmer
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet
nltk.download('wordnet', quiet=True)
nltk.download('averaged_perceptron_tagger_eng', quiet=True)

words = ["running", "studies", "better", "geese", "was", "meeting", "happiness"]

porter  = PorterStemmer()
snowball= SnowballStemmer('english')
wnl     = WordNetLemmatizer()

print(f"{'Word':15} {'Porter':12} {'Snowball':12} {'Lemma (no POS)':18} {'Lemma (with POS)'}")
for w in words:
    stem_p  = porter.stem(w)
    stem_s  = snowball.stem(w)
    lemma_n = wnl.lemmatize(w)              # assumes noun by default
    lemma_v = wnl.lemmatize(w, pos='v')    # with verb POS
    print(f"{w:15} {stem_p:12} {stem_s:12} {lemma_n:18} {lemma_v}")` },
    { type: 'code', lang: 'python', src: `# spaCy lemmatisation — uses full POS context automatically
import spacy
nlp = spacy.load('en_core_web_sm')

text = "The geese were running faster than the studies suggested they were meeting."
doc  = nlp(text)

print(f"{'Token':15} {'POS':8} {'Lemma'}")
for tok in doc:
    if not tok.is_punct:
        print(f"{tok.text:15} {tok.pos_:8} {tok.lemma_}")` },
    { type: 'text', body: `<h3>When to Use Which</h3>
<table>
  <tr><th>Scenario</th><th>Recommendation</th></tr>
  <tr><td>Traditional IR/search</td><td>Stemming (Porter/Snowball) — speed matters, exact form irrelevant</td></tr>
  <tr><td>BoW/TF-IDF classification</td><td>Lemmatisation — produces valid words, better for interpretability</td></tr>
  <tr><td>Transformer models (BERT, etc.)</td><td>Neither — subword tokenisers handle morphology internally</td></tr>
  <tr><td>Multilingual NLP</td><td>Snowball (supports 13 languages) or language-specific lemmatiser</td></tr>
</table>` },
    { type: 'warn', title: 'Lemmatisation Needs POS Tags', body: `Without POS context, NLTK's WordNetLemmatizer defaults to noun. "Better" (adjective) → "good" only when pos='a' is passed. "Meeting" (noun) → "meeting"; "meeting" (verb) → "meet". Always pass POS tags or use spaCy which handles this automatically.` },
    { type: 'exercise', title: 'Compare Vocabulary Reduction from Stemming vs Lemmatisation', hint: 'Apply Porter stemming and spaCy lemmatisation to the 20 Newsgroups training set. Count unique tokens after each. Which reduces vocabulary more? Which produces more readable tokens?', solution: `from sklearn.datasets import fetch_20newsgroups
from nltk.stem import PorterStemmer
import spacy, re
nlp_spacy = spacy.load('en_core_web_sm', disable=['ner','parser'])
porter = PorterStemmer()
nltk.download('punkt_tab', quiet=True)

data = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'))
texts = data.data[:500]  # subset for speed

def tokenise(t): return re.findall(r'\b[a-z]{2,}\b', t.lower())

stemmed_vocab = set()
lemma_vocab   = set()
for text in texts:
    stemmed_vocab.update(porter.stem(w) for w in tokenise(text))
    doc = nlp_spacy(text[:10000])
    lemma_vocab.update(t.lemma_ for t in doc if t.is_alpha and len(t.text) > 1)

raw_vocab = set(w for t in texts for w in tokenise(t))
print(f"Raw:      {len(raw_vocab):,}")
print(f"Stemmed:  {len(stemmed_vocab):,}")
print(f"Lemma:    {len(lemma_vocab):,}")` }
  ]
};

L['nlp-w1-l5'] = {
  duration_mins: 30,
  sections: [
    { type: 'text', body: `<h2>Regular Expressions for Text Cleaning</h2>
<p>Regular expressions (regex) are the Swiss Army knife of text preprocessing. They match patterns in strings rather than exact values — essential for extracting structured information from unstructured text and cleaning noisy data at scale.</p>
<h3>Essential Regex Patterns for NLP</h3>
<p>Before writing complex regex, understand the core building blocks:</p>
<ul>
  <li><code>\\w</code> — word character [a-zA-Z0-9_]</li>
  <li><code>\\d</code> — digit [0-9]</li>
  <li><code>\\s</code> — whitespace</li>
  <li><code>.</code> — any character except newline</li>
  <li><code>+</code> — one or more</li>
  <li><code>*</code> — zero or more</li>
  <li><code>?</code> — zero or one (optional)</li>
  <li><code>{n,m}</code> — between n and m repetitions</li>
  <li><code>^</code> / <code>$</code> — start / end of string</li>
  <li><code>(?P&lt;name&gt;...)</code> — named capture group</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import re

# 1. Extract emails
text = "Contact john.doe@example.com or support@company.co.uk for help."
emails = re.findall(r'[\w.+-]+@[\w-]+\.[\w.-]+', text)
print("Emails:", emails)

# 2. Extract URLs
text2 = "See https://arxiv.org/abs/2303.08774 and http://example.com/page?q=nlp&lang=en"
urls = re.findall(r'https?://[^\s<>"]+', text2)
print("URLs:", urls)

# 3. Extract phone numbers (Indian format)
text3 = "Call +91-9876543210 or 080-12345678 or 1800-111-222"
phones = re.findall(r'[\+\d][\d\-\s]{8,14}\d', text3)
print("Phones:", phones)

# 4. Extract dates
text4 = "The meeting is on 23/05/2025 or 2025-05-23 or May 23, 2025"
dates = re.findall(r'\d{1,2}[/\-]\d{1,2}[/\-]\d{2,4}|\d{4}-\d{2}-\d{2}|[A-Z][a-z]+ \d{1,2},? \d{4}', text4)
print("Dates:", dates)

# 5. Extract hashtags and mentions (social media)
tweet = "Excited about #NLP and #AI! Thanks @AnthropicAI for the amazing models 🙌"
hashtags = re.findall(r'#\w+', tweet)
mentions = re.findall(r'@\w+', tweet)
print("Hashtags:", hashtags, "Mentions:", mentions)` },
    { type: 'code', lang: 'python', src: `import re, pandas as pd

def clean_social_text(text):
    """Comprehensive cleaning for social media / web text."""
    # Remove URLs
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Remove email addresses
    text = re.sub(r'\S+@\S+\.\S+', '', text)
    # Normalise repeated characters (loooove → love, !!!! → !)
    text = re.sub(r'(.)\1{2,}', r'\1\1', text)
    # Remove non-ASCII and most punctuation (keep apostrophes)
    text = re.sub(r"[^a-zA-Z0-9\s']", ' ', text)
    # Collapse whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text

samples = [
    "OMG this is sooooo amazinggggg!!! Visit https://t.co/abc123 now!!!",
    "<p>HTML content with <b>bold</b> tags &amp; entities</p>",
    "Contact us at help@example.com — we're here 24/7!!!!!",
]
for s in samples:
    print(f"IN:  {s}")
    print(f"OUT: {clean_social_text(s)}\n")` },
    { type: 'tip', body: `Use <code>re.compile()</code> when applying the same pattern many times — it compiles the regex once and reuses it. On large datasets, compiled patterns can be 2–10× faster than calling <code>re.sub(pattern, ...)</code> in a loop.` },
    { type: 'exercise', title: 'Extract Structured Data from Unstructured Text', hint: 'Given a list of job postings, use regex to extract: salary range (e.g. "₹8-12 LPA"), required experience ("3-5 years"), and location mentions. Return as a DataFrame.', solution: `import re, pandas as pd

postings = [
    "Senior Data Scientist | Mumbai | 5-8 years exp | ₹20-35 LPA | ML/NLP required",
    "ML Engineer, Bangalore, 2-4 yrs, 12-18 LPA, Python expertise needed",
    "NLP Researcher | Remote | 3+ years | Compensation: ₹15L - ₹25L per annum",
]

def parse_posting(text):
    salary = re.search(r'[₹]?(\d+)\s*[-–]\s*(\d+)\s*L', text)
    exp    = re.search(r'(\d+)\s*[-+]\s*(\d+)?\s*y(?:ear|r)', text, re.I)
    loc    = re.search(r'(Mumbai|Bangalore|Hyderabad|Delhi|Remote)', text, re.I)
    return {
        'salary_min': int(salary.group(1)) if salary else None,
        'salary_max': int(salary.group(2)) if salary else None,
        'exp_min':    int(exp.group(1))    if exp    else None,
        'location':   loc.group(1)         if loc    else 'Unknown'
    }

df = pd.DataFrame([parse_posting(p) for p in postings])
print(df)` }
  ]
};

// ─── WEEK 2 — Bag of Words & TF-IDF ─────────────────────────────────────────

L['nlp-w2-l1'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>Bag of Words Representation</h2>
<p>The Bag of Words (BoW) model converts text into a fixed-length numeric vector by counting word occurrences. It is called "bag" of words because it discards word order — "dog bites man" and "man bites dog" produce identical BoW vectors. Despite this limitation, BoW remains powerful for many classification tasks.</p>
<h3>How BoW Works</h3>
<ol>
  <li><strong>Build vocabulary:</strong> Collect all unique tokens across all training documents. Vocabulary size V might be 5,000–100,000 words.</li>
  <li><strong>Vectorise:</strong> For each document, create a V-dimensional vector where position i contains the count of word i in that document. Most entries are zero (sparse).</li>
  <li><strong>Resulting matrix:</strong> n documents × V features — typically 99%+ sparse.</li>
</ol>
<p>The simplicity of BoW is also its strength: it works with any downstream model, is interpretable (features are words), and requires no pretrained model.</p>` },
    { type: 'code', lang: 'python', src: `from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd
import numpy as np

corpus = [
    "the cat sat on the mat",
    "the cat sat on the hat",
    "the dog sat on the mat",
    "the dog chased the cat",
]

# CountVectorizer: builds vocabulary and transforms in one step
cv = CountVectorizer()
X = cv.fit_transform(corpus)

# View the vocabulary and sparse matrix as dense for inspection
vocab = cv.get_feature_names_out()
df = pd.DataFrame(X.toarray(), columns=vocab)
print(df)
print(f"\nMatrix shape: {X.shape}  (docs × vocab_size)")
print(f"Sparsity: {100 * (1 - X.nnz / (X.shape[0]*X.shape[1])):.1f}%")` },
    { type: 'code', lang: 'python', src: `from sklearn.feature_extraction.text import CountVectorizer
from sklearn.datasets import fetch_20newsgroups

# Real dataset — control vocabulary size with max_features and min_df
data = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'),
                           categories=['sci.med','sci.space','rec.sport.hockey'])

cv = CountVectorizer(
    lowercase=True,
    stop_words='english',
    min_df=5,           # ignore terms appearing in < 5 docs
    max_df=0.95,        # ignore terms in > 95% of docs (near-stopwords)
    max_features=10000, # keep only 10k most frequent terms
    token_pattern=r'\b[a-zA-Z]{3,}\b'  # only 3+ letter alphabetic tokens
)

X_train = cv.fit_transform(data.data)
print(f"Vocabulary size: {len(cv.vocabulary_)}")
print(f"Feature matrix: {X_train.shape}")
print(f"Memory (sparse): {X_train.data.nbytes / 1024:.0f} KB")
print(f"Memory (dense would be): {X_train.shape[0]*X_train.shape[1]*8/1024/1024:.0f} MB")` },
    { type: 'tip', body: `Use <code>min_df=5</code> as a default to remove very rare words (likely typos or proper nouns). Use <code>max_df=0.9</code> to remove words that appear in almost every document (domain-specific stopwords). Together these two parameters often have more impact than a stopword list.` },
    { type: 'exercise', title: 'BoW Classification on 20 Newsgroups', hint: 'Build a CountVectorizer + LogisticRegression pipeline on 20 Newsgroups (all categories). Evaluate with 5-fold CV. Report accuracy and look at the top predictive words per class.', solution: `from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score
import numpy as np

data = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'))

pipe = Pipeline([
    ('cv', CountVectorizer(stop_words='english', min_df=5, max_features=20000)),
    ('lr', LogisticRegression(max_iter=500, C=5.0, n_jobs=-1))
])

scores = cross_val_score(pipe, data.data, data.target, cv=5, scoring='accuracy', n_jobs=-1)
print(f"5-fold CV Accuracy: {scores.mean():.3f} ± {scores.std():.3f}")

# Top words per class
pipe.fit(data.data, data.target)
cv, lr = pipe.named_steps['cv'], pipe.named_steps['lr']
for i, cls in enumerate(data.target_names[:3]):
    top = np.argsort(lr.coef_[i])[-8:]
    print(f"{cls}: {[cv.get_feature_names_out()[j] for j in top]}")` }
  ]
};

L['nlp-w2-l2'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>TF-IDF: Term Frequency–Inverse Document Frequency</h2>
<p>Raw word counts give more weight to frequent words like "the", "is", and "said" — words that are common in all documents and therefore not informative for distinguishing between them. TF-IDF reweights word counts to emphasise terms that are frequent in a document but rare across the corpus.</p>
<h3>The Formula</h3>
<p><strong>TF (Term Frequency):</strong> How often word t appears in document d. Often normalised: TF(t,d) = count(t,d) / total_words(d)</p>
<p><strong>IDF (Inverse Document Frequency):</strong> How rare the word is across all documents: IDF(t) = log(N / df(t)) where N = total documents, df(t) = documents containing term t. A word in every document gets IDF ≈ 0. A rare specialist term gets a high IDF.</p>
<p><strong>TF-IDF(t,d) = TF(t,d) × IDF(t)</strong></p>
<p>Result: common words (low IDF) get down-weighted; discriminative terms (high IDF) get up-weighted. A word appearing frequently in one document but rarely in others gets the highest TF-IDF score.</p>` },
    { type: 'code', lang: 'python', src: `from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
import numpy as np

corpus = [
    "machine learning is a subset of artificial intelligence",
    "deep learning uses neural networks for machine learning tasks",
    "natural language processing enables machines to understand text",
    "text classification is a common natural language processing task",
]

tfidf = TfidfVectorizer(norm='l2', smooth_idf=True, sublinear_tf=False)
X = tfidf.fit_transform(corpus)
vocab = tfidf.get_feature_names_out()

df = pd.DataFrame(X.toarray().round(3), columns=vocab)
print("TF-IDF matrix:")
print(df.to_string())

# Compare BoW vs TF-IDF weights for "learning" and "natural"
from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer()
X_bow = cv.fit_transform(corpus)
bow_df = pd.DataFrame(X_bow.toarray(), columns=cv.get_feature_names_out())

for word in ['learning', 'natural', 'machine']:
    if word in vocab:
        bow_vals  = bow_df[word].values if word in bow_df.columns else [0]*4
        tfidf_vals= df[word].values
        print(f"'{word}' BoW: {bow_vals}  TF-IDF: {tfidf_vals.round(3)}")` },
    { type: 'code', lang: 'python', src: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.datasets import fetch_20newsgroups
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score

data = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'))

# sublinear_tf=True: use 1+log(tf) instead of raw tf — compresses outliers
tfidf_pipe = Pipeline([
    ('tfidf', TfidfVectorizer(
        lowercase=True,
        stop_words='english',
        min_df=5,
        max_df=0.9,
        max_features=30000,
        ngram_range=(1, 2),   # unigrams + bigrams
        sublinear_tf=True,    # log-normalise term frequencies
        norm='l2'             # L2-normalise document vectors
    )),
    ('lr', LogisticRegression(C=5.0, max_iter=1000, n_jobs=-1))
])

scores = cross_val_score(tfidf_pipe, data.data, data.target, cv=5,
                          scoring='accuracy', n_jobs=-1)
print(f"TF-IDF + LR accuracy: {scores.mean():.3f} ± {scores.std():.3f}")` },
    { type: 'tip', body: `<code>sublinear_tf=True</code> replaces raw term frequency with 1+log(tf), which prevents a word appearing 100 times from dominating a word appearing 10 times. Almost always improves performance — enable it by default.` },
    { type: 'exercise', title: 'BoW vs TF-IDF Accuracy Comparison', hint: 'Compare CountVectorizer vs TfidfVectorizer (both with same parameters) on 20 Newsgroups using 5-fold CV accuracy with LogisticRegression. Also try sublinear_tf=True.', solution: `from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score

data = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'))
kw = dict(stop_words='english', min_df=5, max_features=20000)

configs = [
    ('BoW',                  CountVectorizer(**kw)),
    ('TF-IDF',               TfidfVectorizer(**kw)),
    ('TF-IDF sublinear',     TfidfVectorizer(**kw, sublinear_tf=True)),
    ('TF-IDF bigrams sub',   TfidfVectorizer(**kw, sublinear_tf=True, ngram_range=(1,2))),
]

for name, vec in configs:
    pipe = Pipeline([('v', vec), ('lr', LogisticRegression(C=5, max_iter=1000, n_jobs=-1))])
    s = cross_val_score(pipe, data.data, data.target, cv=5, scoring='accuracy', n_jobs=-1)
    print(f"{name:28s}  Acc: {s.mean():.3f} ± {s.std():.3f}")` }
  ]
};

L['nlp-w2-l3'] = {
  duration_mins: 30,
  sections: [
    { type: 'text', body: `<h2>N-grams</h2>
<p>Unigram BoW discards all word order. N-grams partially restore it by treating sequences of n consecutive words as single tokens. Bigrams (n=2) capture two-word phrases; trigrams (n=3) capture three-word phrases.</p>
<p><strong>Why n-grams help:</strong></p>
<ul>
  <li>"not good" → bigram captures negation (unigram BoW would just see "not" and "good" separately)</li>
  <li>"New York" → bigram treats a proper noun as a single entity</li>
  <li>"machine learning" → bigram is more informative than either word alone</li>
  <li>"side effects" in medical text → important domain phrase</li>
</ul>
<p><strong>Trade-off:</strong> Adding bigrams multiplies vocabulary size dramatically. A 20,000-word vocabulary yields potentially 400M bigram combinations, though most never appear. In practice, setting <code>min_df</code> filters rare bigrams effectively, keeping only a few thousand useful ones.</p>` },
    { type: 'code', lang: 'python', src: `from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
import pandas as pd

corpus = [
    "not a good product",
    "good product not cheap",
    "New York is a great city not a bad place",
]

# Character n-grams: useful for handling typos, morphological variants
char_cv = CountVectorizer(analyzer='char_wb', ngram_range=(3, 4))
X_char = char_cv.fit_transform(corpus)
print("Char 3-4 grams (sample):", list(char_cv.vocabulary_.keys())[:15])

# Word bigrams only
bigram_cv = CountVectorizer(ngram_range=(2, 2))
X_bi = bigram_cv.fit_transform(corpus)
print("Bigrams:", bigram_cv.get_feature_names_out().tolist())

# Mixed unigrams + bigrams (most practical)
mixed_cv = CountVectorizer(ngram_range=(1, 2))
X_mix = mixed_cv.fit_transform(corpus)
print(f"Mixed vocab size: {len(mixed_cv.vocabulary_)}")
print("Tokens:", mixed_cv.get_feature_names_out().tolist())` },
    { type: 'code', lang: 'python', src: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.datasets import fetch_20newsgroups
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score

data = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'))

for ngram_range in [(1,1), (1,2), (1,3), (2,2)]:
    pipe = Pipeline([
        ('tfidf', TfidfVectorizer(stop_words='english', min_df=5,
                                   max_features=50000, ngram_range=ngram_range,
                                   sublinear_tf=True)),
        ('nb',    MultinomialNB(alpha=0.1))
    ])
    s = cross_val_score(pipe, data.data, data.target, cv=3, scoring='accuracy', n_jobs=-1)
    n_vocab = TfidfVectorizer(stop_words='english', min_df=5, max_features=50000,
                               ngram_range=ngram_range).fit(data.data).vocabulary_
    print(f"n-gram {str(ngram_range):8}  vocab={len(n_vocab):6,}  acc={s.mean():.3f}")` },
    { type: 'tip', body: `Character n-grams (<code>analyzer='char_wb'</code>) are highly effective for noisy text: social media, OCR output, medical notes. They handle misspellings and new words gracefully because character sequences are robust to word-level noise.` },
    { type: 'exercise', title: 'N-gram Sentiment Analysis', hint: 'Load an IMDB movie review dataset (or SST-2). Compare TF-IDF unigrams vs unigrams+bigrams vs character 3-5 grams with LogisticRegression. Which works best for sentiment?', solution: `from sklearn.datasets import load_files
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score
# Using a simple synthetic sentiment dataset as placeholder
texts = (["great movie loved it amazing fantastic"] * 50 +
         ["terrible awful boring waste of time"] * 50)
labels = [1]*50 + [0]*50

for name, kw in [
    ('Unigram',       dict(ngram_range=(1,1))),
    ('Bigram',        dict(ngram_range=(1,2))),
    ('Char 3-5 gram', dict(analyzer='char_wb', ngram_range=(3,5))),
]:
    pipe = Pipeline([
        ('v', TfidfVectorizer(sublinear_tf=True, **kw)),
        ('m', LogisticRegression(max_iter=500))
    ])
    s = cross_val_score(pipe, texts, labels, cv=5, scoring='accuracy')
    print(f"{name:18s}  Acc: {s.mean():.3f}")` }
  ]
};

L['nlp-w2-l4'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>Text Classification with BoW/TF-IDF</h2>
<p>Text classification assigns predefined categories to documents — spam vs ham, positive vs negative, topic A vs B vs C. TF-IDF + a linear classifier is a strong baseline that often outperforms neural approaches on small datasets or when categories are well-separated by vocabulary.</p>
<h3>Choice of Classifier</h3>
<ul>
  <li><strong>Logistic Regression:</strong> Fast, interpretable coefficients (top words per class), strong regularisation via C. The go-to for text classification.</li>
  <li><strong>Multinomial Naive Bayes:</strong> Very fast, handles high-dimensional sparse data natively, works well on count features (use CountVectorizer, not TF-IDF, or add_alpha smoothing carefully). Great for imbalanced classes.</li>
  <li><strong>Linear SVM (SVC with kernel='linear' or LinearSVC):</strong> Often slightly better than LR for text at the cost of no probability outputs.</li>
  <li><strong>SGDClassifier:</strong> Online learning — efficient for very large corpora that don't fit in memory.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression, SGDClassifier
from sklearn.naive_bayes import MultinomialNB, ComplementNB
from sklearn.svm import LinearSVC
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score
import numpy as np

data = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'))
tfidf_params = dict(stop_words='english', min_df=5, max_features=30000,
                    ngram_range=(1,2), sublinear_tf=True)

classifiers = {
    'Logistic Regression':  LogisticRegression(C=5.0, max_iter=1000, n_jobs=-1),
    'Complement NB':         ComplementNB(alpha=0.1),   # better than MultinomialNB for imbalanced
    'Linear SVC':            LinearSVC(C=1.0, max_iter=2000),
    'SGD (log_loss)':        SGDClassifier(loss='log_loss', alpha=1e-4, n_jobs=-1, random_state=42),
}

for name, clf in classifiers.items():
    pipe = Pipeline([('tfidf', TfidfVectorizer(**tfidf_params)), ('clf', clf)])
    s = cross_val_score(pipe, data.data, data.target, cv=5, scoring='accuracy', n_jobs=-1)
    print(f"{name:22s}  Acc: {s.mean():.3f} ± {s.std():.3f}")` },
    { type: 'code', lang: 'python', src: `from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns, matplotlib.pyplot as plt

train = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'))
test  = fetch_20newsgroups(subset='test',  remove=('headers','footers','quotes'))

pipe = Pipeline([
    ('tfidf', TfidfVectorizer(stop_words='english', min_df=5, max_features=30000,
                               ngram_range=(1,2), sublinear_tf=True)),
    ('lr',    LogisticRegression(C=5.0, max_iter=1000, n_jobs=-1))
])

pipe.fit(train.data, train.target)
y_pred = pipe.predict(test.data)

print(classification_report(test.target, y_pred, target_names=test.target_names))

# Confusion matrix heatmap
cm = confusion_matrix(test.target, y_pred)
plt.figure(figsize=(14, 12))
sns.heatmap(cm, xticklabels=test.target_names, yticklabels=test.target_names,
            fmt='d', cmap='Blues', annot=False)
plt.title('Confusion Matrix — 20 Newsgroups')
plt.tight_layout()
plt.savefig('cm_newsgroups.png', dpi=150)` },
    { type: 'tip', body: `ComplementNB often outperforms MultinomialNB for multi-class text classification, especially with imbalanced classes. It trains each class's model on all <em>other</em> classes' data — a form of contrastive learning.` },
    { type: 'exercise', title: 'Spam Classifier with Threshold Tuning', hint: 'Train a TF-IDF + LogisticRegression spam classifier. Use predict_proba to adjust the classification threshold, trading off precision vs recall. Plot the precision-recall curve.', solution: `import numpy as np, matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import precision_recall_curve, average_precision_score

# Synthetic spam dataset
spam = ["win free money now click here"] * 200 + ["buy cheap pills online"] * 200
ham  = ["meeting tomorrow at 3pm"] * 200 + ["quarterly report attached"] * 200
texts  = spam + ham
labels = [1]*400 + [0]*400

X_tr, X_te, y_tr, y_te = train_test_split(texts, labels, test_size=0.3, random_state=42)

pipe = Pipeline([('v', TfidfVectorizer(ngram_range=(1,2))),
                  ('m', LogisticRegression(max_iter=500))])
pipe.fit(X_tr, y_tr)
probs = pipe.predict_proba(X_te)[:,1]

prec, rec, thresholds = precision_recall_curve(y_te, probs)
ap = average_precision_score(y_te, probs)

plt.figure(figsize=(7,5))
plt.plot(rec, prec)
plt.xlabel('Recall'); plt.ylabel('Precision')
plt.title(f'Precision-Recall Curve (AP={ap:.3f})')
plt.tight_layout(); plt.savefig('pr_curve.png', dpi=150)
print(f"Average Precision: {ap:.3f}")` }
  ]
};

L['nlp-w2-l5'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>Evaluating Text Classifiers</h2>
<p>Accuracy alone is rarely sufficient for text classification evaluation. Class imbalance (99% ham, 1% spam) means a classifier predicting "ham" for everything achieves 99% accuracy while being useless. Choosing the right metric depends on the task's cost structure.</p>
<h3>Classification Metrics Recap</h3>
<ul>
  <li><strong>Accuracy:</strong> (TP+TN)/(TP+TN+FP+FN). Misleading for imbalanced classes.</li>
  <li><strong>Precision:</strong> TP/(TP+FP). Of all flagged spam, how many were actually spam? Optimise when false positives are costly.</li>
  <li><strong>Recall (Sensitivity):</strong> TP/(TP+FN). Of all actual spam, how many were caught? Optimise when false negatives are costly (medical screening, fraud).</li>
  <li><strong>F1:</strong> Harmonic mean of precision and recall. Good single metric when both matter.</li>
  <li><strong>Macro F1:</strong> Average F1 per class — treats all classes equally regardless of size.</li>
  <li><strong>Weighted F1:</strong> Weighted by class support — more influenced by frequent classes.</li>
  <li><strong>ROC-AUC:</strong> Ranking quality across all thresholds. Use for binary classification when you need a threshold-independent metric.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_validate
from sklearn.metrics import (classification_report, f1_score, roc_auc_score,
                              make_scorer, confusion_matrix)
import numpy as np, pandas as pd

# Balanced 4-class problem
data = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'),
                           categories=['sci.med','sci.space','rec.sport.hockey','talk.politics.guns'])
X_tr, X_te, y_tr, y_te = train_test_split(data.data, data.target, test_size=0.25,
                                            stratify=data.target, random_state=42)
pipe = Pipeline([
    ('v', TfidfVectorizer(stop_words='english', min_df=3, sublinear_tf=True)),
    ('m', LogisticRegression(C=5, max_iter=1000, n_jobs=-1))
])
pipe.fit(X_tr, y_tr)
y_pred = pipe.predict(X_te)

print(classification_report(y_te, y_pred, target_names=data.target_names))

# Multi-metric CV
scoring = {
    'accuracy': 'accuracy',
    'macro_f1': make_scorer(f1_score, average='macro'),
    'weighted_f1': make_scorer(f1_score, average='weighted'),
}
cv_results = cross_validate(pipe, data.data, data.target, cv=5, scoring=scoring, n_jobs=-1)
for k, v in cv_results.items():
    if k.startswith('test_'):
        print(f"{k[5:]:15s}  {v.mean():.3f} ± {v.std():.3f}")` },
    { type: 'code', lang: 'python', src: `# Error analysis — examine misclassified documents
from sklearn.datasets import fetch_20newsgroups
import pandas as pd

test = fetch_20newsgroups(subset='test', remove=('headers','footers','quotes'),
                           categories=['sci.med','sci.space','rec.sport.hockey'])
# (assume pipe already trained)
y_pred = pipe.predict(test.data)

# Create misclassification dataframe
errors = [(test.data[i][:200], test.target_names[test.target[i]],
           test.target_names[y_pred[i]])
          for i in range(len(test.data)) if test.target[i] != y_pred[i]]

err_df = pd.DataFrame(errors, columns=['text_preview','true_label','pred_label'])
print(f"Total errors: {len(err_df)}")
print(err_df.groupby(['true_label','pred_label']).size().sort_values(ascending=False).head(10))
print("\nSample error:")
print(err_df.iloc[0]['text_preview'])` },
    { type: 'tip', body: `Error analysis is the highest-ROI activity in NLP. Reading 50 misclassified examples almost always reveals a pattern — a mislabelled class, domain-specific jargon the model misses, or a systematic ambiguity. Each insight drives a concrete improvement.` },
    { type: 'warn', title: 'Use Stratified K-Fold for Imbalanced Text Data', body: `Standard KFold splits may produce folds with very different class distributions. Always use <code>StratifiedKFold</code> (or pass <code>cv=StratifiedKFold(n_splits=5)</code> to cross_val_score) for classification tasks.` },
    { type: 'exercise', title: 'Imbalanced Text Classification', hint: 'Subsample the 20 Newsgroups dataset to create an imbalanced problem (90% one class, 10% others). Compare accuracy vs macro-F1 vs AUC. Try class_weight="balanced" in LogisticRegression.', solution: `import numpy as np
from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import StratifiedKFold, cross_validate
from sklearn.metrics import make_scorer, f1_score, roc_auc_score

data = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'),
                           categories=['sci.space','sci.med','rec.sport.hockey'])
# Artificially imbalance: keep all sci.space, 10% of others
idx0 = np.where(np.array(data.target)==0)[0]
idx_other = np.where(np.array(data.target)!=0)[0]
idx_other_sub = np.random.choice(idx_other, len(idx_other)//10, replace=False)
idx = np.concatenate([idx0, idx_other_sub])
texts  = [data.data[i] for i in idx]
labels = [data.target[i] for i in idx]
print("Class dist:", dict(zip(*np.unique(labels, return_counts=True))))

scoring = {'acc':'accuracy', 'macro_f1': make_scorer(f1_score,average='macro')}
cv = StratifiedKFold(5, shuffle=True, random_state=42)

for cw in [None, 'balanced']:
    pipe = Pipeline([('v', TfidfVectorizer(sublinear_tf=True, min_df=3)),
                      ('m', LogisticRegression(C=5, class_weight=cw, max_iter=500))])
    r = cross_validate(pipe, texts, labels, cv=cv, scoring=scoring, n_jobs=-1)
    print(f"class_weight={cw}  acc={r['test_acc'].mean():.3f}  macro_f1={r['test_macro_f1'].mean():.3f}")` }
  ]
};

// ─── WEEK 3 — Word Embeddings ────────────────────────────────────────────────

L['nlp-w3-l1'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>Word2Vec: Learning Word Representations</h2>
<p>BoW and TF-IDF treat words as discrete, independent symbols. "King" and "queen" are just two arbitrary IDs with no relationship. Word embeddings map every word to a dense, low-dimensional vector (typically 100–300 dimensions) where similar words are geometrically close — capturing semantic and syntactic relationships in the vector space.</p>
<p>Word2Vec (Mikolov et al., 2013) learns these vectors from a massive corpus by training a shallow neural network to predict either:</p>
<ul>
  <li><strong>Skip-gram:</strong> Given a centre word, predict surrounding context words. Works well for infrequent words.</li>
  <li><strong>CBOW (Continuous Bag of Words):</strong> Given context words, predict the centre word. Faster training, better for frequent words.</li>
</ul>
<p>The vectors are never used as classification labels — they're the hidden layer weights learned during training. The task is just a pretext for learning good representations.</p>
<p>Famous property: <strong>King − Man + Woman ≈ Queen</strong>. Vector arithmetic captures analogical relationships because the geometry encodes meaning.</p>` },
    { type: 'code', lang: 'python', src: `# pip install gensim
from gensim.models import Word2Vec
from gensim.utils import simple_preprocess
import numpy as np

# Training on a small corpus (in practice use millions of sentences)
sentences = [
    "the king is a wise ruler",
    "the queen is a noble ruler",
    "the man worked at the bank",
    "the woman worked at the bank",
    "paris is the capital of france",
    "berlin is the capital of germany",
    "cats and dogs are common pets",
    "machine learning is a branch of artificial intelligence",
]
tokenised = [simple_preprocess(s) for s in sentences]

# Train Word2Vec
model = Word2Vec(
    sentences=tokenised,
    vector_size=50,    # embedding dimension
    window=5,          # context window size (words on each side)
    min_count=1,       # minimum word frequency
    workers=4,
    sg=1,              # 1=skip-gram, 0=CBOW
    epochs=200,
    seed=42
)

# Access word vectors
print("Vector for 'king':", model.wv['king'][:8], '...')
print("Similarity king-queen:", model.wv.similarity('king', 'queen'))
print("Similarity king-dog:  ", model.wv.similarity('king', 'dog'))
print("Most similar to 'machine':", model.wv.most_similar('machine', topn=3))

# Analogy: king - man + woman = ?
result = model.wv.most_similar(positive=['king', 'woman'], negative=['man'], topn=3)
print("king - man + woman ≈", result)` },
    { type: 'code', lang: 'python', src: `# Using pretrained Word2Vec (Google News vectors — 3M words, 300d)
# Download: https://drive.google.com/file/d/0B7XkCwpI5KDYNlNUTTlSS21pQmM
import gensim.downloader as api

# Smaller pretrained model available via gensim API
wv = api.load('word2vec-google-news-300')  # 1.6GB download

print("Vocabulary size:", len(wv))
print("Vector dim:", wv.vector_size)
print("king - man + woman:", wv.most_similar(positive=['king','woman'], negative=['man'], topn=3))
print("Paris - France + Germany:", wv.most_similar(positive=['paris','germany'], negative=['france'], topn=3))

# Document embedding: average word vectors
def embed_document(text, wv):
    tokens = [t.lower() for t in text.split() if t.lower() in wv]
    if not tokens:
        return np.zeros(wv.vector_size)
    return np.mean([wv[t] for t in tokens], axis=0)

doc = "machine learning enables computers to learn from data"
vec = embed_document(doc, wv)
print(f"Document embedding shape: {vec.shape}")` },
    { type: 'tip', body: `For document classification, averaging word vectors is simple but loses word order and weighting. TF-IDF weighted averaging — weight each word vector by its TF-IDF score before averaging — often outperforms uniform averaging by giving more weight to discriminative terms.` },
    { type: 'exercise', title: 'Train Word2Vec on Your Corpus and Visualise with t-SNE', hint: 'Train Word2Vec on the 20 Newsgroups corpus. Extract vectors for 50 common words. Use t-SNE to project to 2D and colour by semantic category (sports words, science words, political words).', solution: `from sklearn.datasets import fetch_20newsgroups
from gensim.models import Word2Vec
from gensim.utils import simple_preprocess
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt, numpy as np

data = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'))
sentences = [simple_preprocess(t) for t in data.data]
model = Word2Vec(sentences, vector_size=100, window=5, min_count=10, workers=4, epochs=10)

groups = {
    'sports': ['hockey','game','team','player','season','goal','win'],
    'science': ['space','nasa','orbit','satellite','medical','doctor','disease'],
    'politics': ['government','president','congress','law','tax','vote'],
}
words, labels, colors = [], [], []
for cat, (name, wds) in enumerate(groups.items()):
    for w in wds:
        if w in model.wv:
            words.append(w); labels.append(name)
            colors.append(['blue','green','red'][cat])

vecs = np.array([model.wv[w] for w in words])
tsne = TSNE(n_components=2, random_state=42, perplexity=5)
xy = tsne.fit_transform(vecs)

plt.figure(figsize=(8,6))
for x, y, w, c in zip(xy[:,0], xy[:,1], words, colors):
    plt.scatter(x, y, c=c, s=30)
    plt.annotate(w, (x, y), fontsize=8)
plt.title('Word2Vec t-SNE'); plt.savefig('w2v_tsne.png', dpi=150)` }
  ]
};

L['nlp-w3-l2'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>GloVe: Global Vectors for Word Representation</h2>
<p>Word2Vec learns from local context windows — only nearby words influence a word's embedding. GloVe (Pennington et al., 2014) takes a different approach: it factorises the word co-occurrence matrix built from the entire corpus, combining the statistical efficiency of matrix factorisation methods with the scalability of Word2Vec.</p>
<h3>How GloVe Works</h3>
<p>GloVe builds a word × word co-occurrence matrix C where C[i,j] = how often word j appears within a window of word i across the entire corpus. It then learns vectors u_i and v_j such that: <code>u_i · v_j ≈ log(C[i,j])</code></p>
<p>The intuition: if "ice" and "steam" both co-occur frequently with "water" but differ in co-occurrence with "solid" vs "gas", their vectors will reflect this relationship. GloVe captures global corpus statistics rather than only local window patterns.</p>
<p><strong>In practice:</strong> GloVe and Word2Vec produce embeddings of similar quality. GloVe is often preferred because pretrained vectors are widely available (Wikipedia+Gigaword, CommonCrawl) and the training process is reproducible.</p>` },
    { type: 'code', lang: 'python', src: `import numpy as np

def load_glove(path, dim=100):
    """Load pretrained GloVe vectors from text file."""
    vectors = {}
    with open(path, 'r', encoding='utf-8') as f:
        for line in f:
            parts = line.split()
            word = parts[0]
            vec  = np.array(parts[1:], dtype=np.float32)
            if len(vec) == dim:
                vectors[word] = vec
    print(f"Loaded {len(vectors):,} vectors of dim {dim}")
    return vectors

# Download from: https://nlp.stanford.edu/projects/glove/
# Files: glove.6B.100d.txt, glove.6B.300d.txt, glove.42B.300d.txt
# glove = load_glove('glove.6B.100d.txt', dim=100)

# Using gensim's GloVe loader (converts to Word2Vec format)
from gensim.scripts.glove2word2vec import glove2word2vec
from gensim.models import KeyedVectors

# glove2word2vec('glove.6B.100d.txt', 'glove.6B.100d.w2v.txt')
# wv_glove = KeyedVectors.load_word2vec_format('glove.6B.100d.w2v.txt')

# Using gensim downloader (smaller GloVe variant)
import gensim.downloader as api
wv_glove = api.load('glove-wiki-gigaword-100')  # 400k vocab, 100d
print("GloVe vocab size:", len(wv_glove))
print("Similarity: king-queen:", wv_glove.similarity('king','queen'))
print("Analogy king-man+woman:", wv_glove.most_similar(positive=['king','woman'],negative=['man'],topn=3))` },
    { type: 'code', lang: 'python', src: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score
from sklearn.datasets import fetch_20newsgroups
import gensim.downloader as api

data = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'),
                           categories=['sci.med','sci.space','rec.sport.hockey'])
wv = api.load('glove-wiki-gigaword-100')

def tfidf_weighted_embedding(texts, wv, dim=100):
    """TF-IDF weighted average of word vectors."""
    from sklearn.feature_extraction.text import TfidfVectorizer
    tv = TfidfVectorizer(min_df=2, max_features=50000)
    tv.fit(texts)
    vocab = tv.vocabulary_
    idf   = tv.idf_

    vecs = []
    for text in texts:
        tokens  = text.lower().split()
        weights = [idf[vocab[t]] for t in tokens if t in vocab and t in wv]
        embs    = [wv[t] for t in tokens if t in vocab and t in wv]
        if embs:
            weighted = np.average(embs, axis=0, weights=weights)
        else:
            weighted = np.zeros(dim)
        vecs.append(weighted)
    return np.array(vecs)

X = tfidf_weighted_embedding(data.data, wv, dim=100)
scores = cross_val_score(LogisticRegression(max_iter=500), X, data.target,
                          cv=5, scoring='accuracy', n_jobs=-1)
print(f"GloVe TF-IDF weighted embedding accuracy: {scores.mean():.3f}")` },
    { type: 'tip', body: `When using pretrained GloVe or Word2Vec embeddings for a specialised domain (medical, legal, code), consider fine-tuning the embeddings on your domain corpus. Train Word2Vec on your corpus starting from pretrained vectors using <code>model.build_vocab(new_sentences, update=True)</code> and <code>model.train()</code>.` },
    { type: 'exercise', title: 'Compare GloVe vs TF-IDF for Sentence Similarity', hint: 'Take 10 pairs of sentences. Compute cosine similarity using (1) GloVe average embeddings, (2) TF-IDF vectors. Which method better captures semantic similarity vs lexical overlap?', solution: `import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import gensim.downloader as api

wv = api.load('glove-wiki-gigaword-100')

pairs = [
    ("The cat sat on the mat", "A kitten rested on the rug"),  # semantic sim
    ("The cat sat on the mat", "The cat sat on the mat"),      # identical
    ("I love machine learning", "Stock market crashed today"),  # dissimilar
    ("Python is a programming language", "Snakes are reptiles"),  # ambiguous
]

tv = TfidfVectorizer()
all_texts = [s for p in pairs for s in p]
tv.fit(all_texts)
vocab = tv.vocabulary_

def avg_embed(text, wv):
    ts = [t for t in text.lower().split() if t in wv]
    return np.mean([wv[t] for t in ts], axis=0) if ts else np.zeros(100)

print(f"{'Pair':50s} {'GloVe':8} {'TF-IDF':8}")
for s1, s2 in pairs:
    g_sim  = cosine_similarity([avg_embed(s1,wv)], [avg_embed(s2,wv)])[0,0]
    X_tfidf= tv.transform([s1, s2]).toarray()
    t_sim  = cosine_similarity([X_tfidf[0]], [X_tfidf[1]])[0,0]
    print(f"'{s1[:24]}' / '{s2[:20]}'  {g_sim:.3f}   {t_sim:.3f}")` }
  ]
};

L['nlp-w3-l3'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>FastText: Subword Embeddings</h2>
<p>Both Word2Vec and GloVe assign a single vector to each word token. They cannot handle:</p>
<ul>
  <li><strong>Out-of-vocabulary (OOV) words:</strong> "immunotherapy" is unseen → no vector</li>
  <li><strong>Morphological variants:</strong> "run", "running", "runner" get separate unrelated vectors</li>
  <li><strong>Misspellings:</strong> "recieve" → no vector</li>
  <li><strong>Languages with rich morphology:</strong> Turkish, Finnish, Arabic</li>
</ul>
<p>FastText (Bojanowski et al., 2017) solves this by representing each word as the sum of its character n-gram vectors. "apple" is decomposed into: &lt;ap, app, ppl, ple, le&gt;, &lt;apple&gt;. Each n-gram has a vector; the word vector is their sum. Unseen words can be embedded by summing their character n-gram vectors.</p>
<p>This makes FastText significantly more robust than Word2Vec for noisy text, morphologically rich languages, and rare words.</p>` },
    { type: 'code', lang: 'python', src: `# pip install fasttext  (or use gensim's FastText implementation)
from gensim.models import FastText
from gensim.utils import simple_preprocess
from sklearn.datasets import fetch_20newsgroups
import numpy as np

data = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'))
sentences = [simple_preprocess(t) for t in data.data[:2000]]

# Train FastText
ft_model = FastText(
    sentences=sentences,
    vector_size=100,
    window=5,
    min_count=3,
    min_n=3,     # minimum character n-gram length
    max_n=6,     # maximum character n-gram length
    workers=4,
    epochs=10,
    seed=42
)

# OOV handling — FastText can embed unseen words!
print("In-vocab 'learning':", ft_model.wv['learning'][:5])
print("OOV 'immunotherapy':", ft_model.wv['immunotherapy'][:5])  # works!
print("Misspelling 'learnig':", ft_model.wv['learnig'][:5])     # works!

# Similar words
print("Most similar to 'programming':", ft_model.wv.most_similar('programming', topn=5))` },
    { type: 'code', lang: 'python', src: `# Using Facebook's pretrained FastText vectors (157 languages)
# Download from: https://fasttext.cc/docs/en/crawl-vectors.html
# import fasttext
# ft = fasttext.load_model('cc.en.300.bin')
# vec = ft.get_word_vector('immunotherapy')

# Gensim approach with pretrained FastText
import gensim.downloader as api
ft_wv = api.load('fasttext-wiki-news-subwords-300')
print("FastText vocab size:", len(ft_wv))

# Robust to OOV
test_words = ['machine', 'machinelearning', 'learnng', 'NLP', 'GPT-4']
for w in test_words:
    try:
        sim = ft_wv.most_similar(w, topn=1)
        print(f"'{w}' → nearest: {sim[0][0]} ({sim[0][1]:.3f})")
    except Exception as e:
        print(f"'{w}' → Error: {e}")` },
    { type: 'text', body: `<h3>FastText for Text Classification</h3>
<p>Facebook released a companion FastText classifier (<code>fasttext.train_supervised</code>) that is remarkably fast — training on millions of examples in seconds — while achieving near-state-of-the-art accuracy for many text classification benchmarks. It uses the average of word/subword vectors as the document representation and trains a softmax classifier on top.</p>` },
    { type: 'code', lang: 'python', src: `# FastText classifier (requires fasttext package: pip install fasttext-wheel)
# import fasttext, tempfile, os
#
# # FastText expects data in format: __label__<class> <text>
# def write_fasttext_file(texts, labels, path):
#     with open(path, 'w') as f:
#         for text, label in zip(texts, labels):
#             f.write(f"__label__{label} {text.lower()}\n")
#
# data_train = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'))
# data_test  = fetch_20newsgroups(subset='test',  remove=('headers','footers','quotes'))
#
# with tempfile.NamedTemporaryFile(suffix='.txt', delete=False, mode='w') as f:
#     for text, label in zip(data_train.data, data_train.target):
#         f.write(f"__label__{label} {text.replace(chr(10),' ')[:500]}\n")
#     train_path = f.name
#
# model = fasttext.train_supervised(train_path, epoch=25, lr=1.0, wordNgrams=2,
#                                    minCount=5, loss='softmax')
# result = model.test(test_path)
# print(f"Accuracy: {result[1]:.3f}")` },
    { type: 'tip', body: `FastText is the best baseline to try after TF-IDF + LR. It often matches BERT performance on short text classification tasks while training in seconds rather than minutes, requiring no GPU, and producing OOV-robust representations.` },
    { type: 'exercise', title: 'Compare Word2Vec vs FastText on Noisy Text', hint: 'Create a test set with intentional misspellings and OOV technical terms. Embed with both models and compute classification accuracy. FastText should outperform Word2Vec on the noisy variants.', solution: `import numpy as np
from gensim.models import Word2Vec, FastText
from gensim.utils import simple_preprocess
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

texts = (["great movie loved amazing fantastic brilliant"] * 100 +
         ["terrible boring awful waste disaster rubbish"] * 100)
# Add noisy versions
noisy = (["gr8 movei luved amazin fantastik briliant"] * 50 +
         ["terribl borng awfl wste disastr rubish"] * 50)
labels = [1]*100 + [0]*100 + [1]*50 + [0]*50

sentences = [simple_preprocess(t) for t in texts + noisy]
w2v = Word2Vec(sentences, vector_size=50, window=3, min_count=1, epochs=50)
ft  = FastText(sentences, vector_size=50, window=3, min_count=1, epochs=50)

def embed_docs(texts, model):
    vecs = []
    for t in texts:
        ts = simple_preprocess(t)
        vs = [model.wv[w] for w in ts if w in model.wv or hasattr(model.wv,'get_vector')]
        vecs.append(np.mean(vs, axis=0) if vs else np.zeros(50))
    return np.array(vecs)

all_texts = texts + noisy
for name, model in [('Word2Vec', w2v), ('FastText', ft)]:
    X = embed_docs(all_texts, model)
    s = cross_val_score(LogisticRegression(), X, labels, cv=5)
    print(f"{name}: {s.mean():.3f}")` }
  ]
};

L['nlp-w3-l4'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>Using Pretrained Embeddings in Practice</h2>
<p>Training word embeddings from scratch requires large corpora (hundreds of millions to billions of words) to learn good representations. For most projects, using pretrained embeddings — trained on Wikipedia, CommonCrawl, or domain-specific corpora — is far more practical and often produces better results.</p>
<h3>Choosing the Right Pretrained Embedding</h3>
<ul>
  <li><strong>General text:</strong> GloVe 100d/300d (Wikipedia+Gigaword) or fasttext-wiki-news-300d</li>
  <li><strong>Medical/biomedical:</strong> BioWordVec, PubMedBERT embeddings</li>
  <li><strong>Social media/Twitter:</strong> GloVe Twitter 200d</li>
  <li><strong>Legal:</strong> Law2Vec</li>
  <li><strong>Code:</strong> CodeBERT embeddings</li>
</ul>
<p>Domain match matters enormously. A medical model using Twitter GloVe will have poor representations for terms like "erythrocyte" or "pharmacokinetics" — they're rare or absent in social media text.</p>` },
    { type: 'code', lang: 'python', src: `import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score
from sklearn.preprocessing import normalize
import gensim.downloader as api

# Load pretrained embeddings
wv = api.load('glove-wiki-gigaword-100')  # 400k words, 100d

def embed_docs_weighted(texts, wv, tfidf_vectorizer=None):
    """Embed documents using TF-IDF weighted word vectors."""
    dim = wv.vector_size
    vecs = []
    for text in texts:
        tokens = text.lower().split()
        if tfidf_vectorizer is not None:
            # TF-IDF weighting
            vocab = tfidf_vectorizer.vocabulary_
            idf   = tfidf_vectorizer.idf_
            valid = [(t, idf[vocab[t]]) for t in tokens if t in vocab and t in wv]
        else:
            # Uniform weighting (average)
            valid = [(t, 1.0) for t in tokens if t in wv]

        if not valid:
            vecs.append(np.zeros(dim))
        else:
            ws, wts = zip(*valid)
            vecs.append(np.average([wv[w] for w in ws], axis=0, weights=wts))
    return normalize(np.array(vecs))  # L2-normalise for cosine similarity

from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import TfidfVectorizer

data = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'),
                           categories=['sci.med','sci.space','rec.sport.hockey','rec.autos'])

tv = TfidfVectorizer(min_df=3, max_features=50000).fit(data.data)
X_uniform  = embed_docs_weighted(data.data, wv, None)
X_weighted = embed_docs_weighted(data.data, wv, tv)

for name, X in [('Uniform avg', X_uniform), ('TF-IDF weighted', X_weighted)]:
    s = cross_val_score(LogisticRegression(max_iter=500), X, data.target, cv=5, scoring='accuracy')
    print(f"{name:20s}  Acc: {s.mean():.3f}")` },
    { type: 'code', lang: 'python', src: `# Building an embedding matrix for Keras/PyTorch neural networks
import numpy as np

def build_embedding_matrix(tokenizer_word_index, wv, embedding_dim=100):
    """Build matrix where row i = embedding for token with index i."""
    vocab_size = len(tokenizer_word_index) + 1  # +1 for padding index 0
    matrix = np.zeros((vocab_size, embedding_dim))
    found, not_found = 0, []

    for word, idx in tokenizer_word_index.items():
        if word in wv:
            matrix[idx] = wv[word]
            found += 1
        else:
            not_found.append(word)
            # Option 1: leave as zeros
            # Option 2: random initialisation
            matrix[idx] = np.random.normal(0, 0.1, embedding_dim)

    coverage = found / len(tokenizer_word_index) * 100
    print(f"Embedding coverage: {coverage:.1f}%  ({found}/{len(tokenizer_word_index)})")
    print(f"OOV words (sample): {not_found[:10]}")
    return matrix

# In Keras:
# embedding_layer = keras.layers.Embedding(
#     input_dim=vocab_size, output_dim=embedding_dim,
#     weights=[embedding_matrix],
#     trainable=False  # freeze pretrained weights; set True to fine-tune
# )` },
    { type: 'tip', body: `When using pretrained embeddings in a neural network, start with <code>trainable=False</code> (frozen). If performance plateaus, unfreeze and fine-tune with a low learning rate (1e-5 to 1e-4). Freezing first prevents the pretrained representations from being destroyed by large early gradients.` },
    { type: 'exercise', title: 'Domain Adaptation: Fine-tune GloVe on Medical Text', hint: 'Train Word2Vec on PubMed abstracts (or a medical text dataset). Compare similarity of medical terms ("hypertension", "cardiovascular") in general GloVe vs your domain-specific model.', solution: `from gensim.models import Word2Vec, KeyedVectors
from gensim.utils import simple_preprocess
import gensim.downloader as api
import numpy as np

# General GloVe
wv_general = api.load('glove-wiki-gigaword-100')

# Simulate medical corpus (in practice, use PubMed abstracts)
medical_texts = [
    "hypertension is a risk factor for cardiovascular disease and stroke",
    "the patient was diagnosed with type 2 diabetes mellitus and hypertension",
    "cardiovascular mortality increases with uncontrolled hypertension",
    "antihypertensive therapy reduces the risk of myocardial infarction",
    "statins are prescribed for hyperlipidemia and cardiovascular disease prevention",
] * 50  # repeat to simulate corpus

sentences = [simple_preprocess(t) for t in medical_texts]
medical_model = Word2Vec(sentences, vector_size=100, window=5, min_count=1, epochs=100)

term = 'hypertension'
if term in wv_general:
    print("General GloVe nearest:", wv_general.most_similar(term, topn=5))
if term in medical_model.wv:
    print("Medical W2V nearest:", medical_model.wv.most_similar(term, topn=5))` }
  ]
};

L['nlp-w3-l5'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>Sentence Embeddings</h2>
<p>Word embeddings represent individual words. For most NLP tasks — classification, semantic search, clustering — you need a single vector for an entire sentence or document. We have seen simple approaches (average of word vectors); this lesson covers purpose-built sentence embedding models that produce dramatically better representations.</p>
<h3>The Problem with Word Vector Averaging</h3>
<p>Averaging GloVe vectors for "I am not happy" and "I am happy" produces nearly identical vectors — the negation "not" has a small, inconsistent effect. The representation doesn't encode the compositional structure of the sentence.</p>
<h3>Sentence-BERT (SBERT)</h3>
<p>SBERT fine-tunes BERT using siamese and triplet network structures on sentence pairs, producing embeddings optimised for semantic similarity. It is currently the state of the art for semantic search and sentence similarity tasks, and it is 9,000× faster than BERT-based cross-encoders for large-scale retrieval (because you can pre-compute embeddings).</p>` },
    { type: 'code', lang: 'python', src: `# pip install sentence-transformers
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')  # 80MB, fast, strong

sentences = [
    "The weather is lovely today.",
    "It's so sunny outside!",
    "He drove to the stadium.",
    "Machine learning is a type of artificial intelligence.",
    "I am not happy about the results.",
    "I am happy about the results.",
    "The cat sat on the mat.",
    "A kitten rested on the rug.",
]

# Encode all sentences at once (batched internally)
embeddings = model.encode(sentences, batch_size=16, show_progress_bar=False)
print(f"Embedding shape: {embeddings.shape}")  # (8, 384) for MiniLM-L6

# Pairwise cosine similarity matrix
sim_matrix = cosine_similarity(embeddings)

import pandas as pd
short = [s[:35] for s in sentences]
df_sim = pd.DataFrame(sim_matrix.round(3), index=short, columns=short)
print(df_sim)

# Key comparison
print(f"\n'not happy' vs 'happy': {sim_matrix[4,5]:.3f}")
print(f"'cat on mat' vs 'kitten on rug': {sim_matrix[6,7]:.3f}")
print(f"'weather' vs 'machine learning': {sim_matrix[0,3]:.3f}")` },
    { type: 'code', lang: 'python', src: `from sentence_transformers import SentenceTransformer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score
from sklearn.datasets import fetch_20newsgroups
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')

data = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'),
                           categories=['sci.med','sci.space','rec.sport.hockey'])

# Truncate to 256 chars for speed (MiniLM has 256 token limit anyway)
texts = [t[:512] for t in data.data[:500]]  # subset for demo speed
labels = data.target[:500]

print("Encoding documents...")
embeddings = model.encode(texts, batch_size=32, show_progress_bar=True)
print(f"Embeddings shape: {embeddings.shape}")

scores = cross_val_score(LogisticRegression(max_iter=500), embeddings, labels,
                          cv=5, scoring='accuracy', n_jobs=-1)
print(f"SBERT + LR accuracy: {scores.mean():.3f} ± {scores.std():.3f}")` },
    { type: 'code', lang: 'python', src: `# Semantic search with SBERT — find most similar documents to a query
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')

corpus = [
    "Python is a high-level programming language",
    "Machine learning models learn from data",
    "Neural networks are inspired by biological neurons",
    "Data science involves statistics and programming",
    "Cricket is a popular sport in India",
    "Football is played with a round ball",
]

query = "How do AI systems learn patterns?"

corpus_embeddings = model.encode(corpus)
query_embedding   = model.encode([query])

sims = cosine_similarity(query_embedding, corpus_embeddings)[0]
top_k = sims.argsort()[::-1][:3]

print(f"Query: {query}")
print("Top 3 results:")
for rank, idx in enumerate(top_k, 1):
    print(f"  {rank}. [{sims[idx]:.3f}] {corpus[idx]}")` },
    { type: 'tip', body: `For semantic search over large corpora (millions of documents), pre-compute and store all document embeddings. At query time, compute only the query embedding and use FAISS (Facebook AI Similarity Search) for approximate nearest neighbour search — it can search 1M vectors in milliseconds.` },
    { type: 'exercise', title: 'Build a Semantic FAQ Search Engine', hint: 'Create 20 FAQ Q&A pairs. Embed all questions with SBERT. Given a new user query, return the top-3 most similar FAQ questions and their answers using cosine similarity.', solution: `from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')

faqs = [
    ("How do I reset my password?", "Go to Settings > Account > Reset Password."),
    ("What payment methods are accepted?", "We accept credit cards, UPI, and net banking."),
    ("Can I cancel my subscription?", "Yes, cancellation is available in Account Settings."),
    ("How long does shipping take?", "Standard shipping takes 3-5 business days."),
    ("Do you offer a free trial?", "Yes, we offer a 14-day free trial for all plans."),
    ("How do I contact support?", "Email support@company.com or use the live chat."),
]

questions, answers = zip(*faqs)
q_embeddings = model.encode(list(questions))

def search_faq(query, top_k=2):
    q_emb = model.encode([query])
    sims  = cosine_similarity(q_emb, q_embeddings)[0]
    top   = sims.argsort()[::-1][:top_k]
    for i in top:
        print(f"  [{sims[i]:.3f}] Q: {questions[i]}")
        print(f"         A: {answers[i]}")

search_faq("I forgot my account password")
search_faq("When will my order arrive?")` }
  ]
};


// ─── WEEK 4 — spaCy & NLTK ──────────────────────────────────────────────────

L['nlp-w4-l1'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>The spaCy Pipeline</h2>
<p>spaCy is an industrial-strength NLP library designed for production use. Unlike NLTK (research-oriented, component-based), spaCy provides an opinionated, end-to-end pipeline that processes text through a sequence of components — tokeniser, tagger, parser, NER — in a single pass. It is typically 10–100× faster than NLTK for most tasks.</p>
<h3>spaCy's Core Pipeline Components</h3>
<ol>
  <li><strong>Tokenizer:</strong> Rule-based, language-specific. Handles contractions, prefixes, suffixes, infixes.</li>
  <li><strong>tok2vec / transformer:</strong> Shared text representation for downstream components.</li>
  <li><strong>tagger:</strong> Part-of-speech tagger — assigns POS labels (NOUN, VERB, ADJ, etc.)</li>
  <li><strong>parser:</strong> Dependency parser — finds grammatical structure (subject, object, modifier)</li>
  <li><strong>ner:</strong> Named entity recogniser — finds PERSON, ORG, GPE, DATE, MONEY, etc.</li>
  <li><strong>lemmatizer:</strong> Reduces tokens to base forms using POS context</li>
</ol>` },
    { type: 'code', lang: 'python', src: `# pip install spacy && python -m spacy download en_core_web_sm
import spacy

nlp = spacy.load('en_core_web_sm')

# Processing a document — all components run in a single pass
text = "Apple Inc. was founded by Steve Jobs in Cupertino, California in 1976. The company's revenue exceeded $394 billion in 2022."
doc = nlp(text)

# Token-level attributes
print(f"{'Token':15} {'POS':6} {'Dep':12} {'Lemma':15} {'IsStop':7} {'IsAlpha'}")
print("-" * 70)
for tok in doc:
    print(f"{tok.text:15} {tok.pos_:6} {tok.dep_:12} {tok.lemma_:15} {str(tok.is_stop):7} {tok.is_alpha}")` },
    { type: 'code', lang: 'python', src: `import spacy

nlp = spacy.load('en_core_web_sm')
text = "Apple Inc. was founded by Steve Jobs in Cupertino, California in 1976."
doc = nlp(text)

# Named entities
print("Entities:")
for ent in doc.ents:
    print(f"  {ent.text:25} {ent.label_:10} ({spacy.explain(ent.label_)})")

# Sentence segmentation
print("\nSentences:")
for sent in doc.sents:
    print(f"  '{sent.text[:80]}'")

# Noun phrases (chunks)
print("\nNoun phrases:")
for chunk in doc.noun_chunks:
    print(f"  '{chunk.text}' (root: '{chunk.root.text}', dep: '{chunk.root.dep_}')")

# Disable unused components for speed
# nlp_fast = spacy.load('en_core_web_sm', disable=['parser', 'ner'])
# Only runs tokenizer + tagger + lemmatizer — much faster for large corpora` },
    { type: 'code', lang: 'python', src: `import spacy
from spacy.tokens import DocBin
import time

nlp = spacy.load('en_core_web_sm')

# Efficient batch processing with nlp.pipe()
texts = ["Document number " + str(i) + " about machine learning and AI." for i in range(1000)]

# SLOW: processing one by one
t0 = time.time()
docs = [nlp(t) for t in texts[:100]]
print(f"One-by-one: {time.time()-t0:.2f}s for 100 docs")

# FAST: nlp.pipe() — batched, parallel, memory-efficient
t1 = time.time()
docs = list(nlp.pipe(texts, batch_size=64, disable=['parser']))
print(f"nlp.pipe():  {time.time()-t1:.2f}s for 1000 docs")
# nlp.pipe() is typically 3-5x faster than the loop` },
    { type: 'tip', body: `Always disable pipeline components you don't need when processing large corpora. If you only need POS tags and lemmas, <code>nlp.pipe(texts, disable=['parser','ner'])</code> can be 3–5× faster and use half the memory.` },
    { type: 'exercise', title: 'Extract Key Information from News Articles', hint: 'Process 50 news articles with spaCy. For each article, extract: all named entities (grouped by type), top noun phrases, and sentence count. Output as a structured DataFrame.', solution: `import spacy, pandas as pd
from collections import defaultdict

nlp = spacy.load('en_core_web_sm')

articles = [
    "Tesla CEO Elon Musk announced a new factory in Austin, Texas on Monday. The facility will employ 5,000 workers and produce 500,000 vehicles annually.",
    "The Reserve Bank of India raised interest rates by 25 basis points in Mumbai yesterday. Governor Shaktikanta Das cited inflation concerns.",
    "Manchester United signed striker Rasmus Hojlund from Atalanta for £72 million.",
]

rows = []
for doc in nlp.pipe(articles, batch_size=8):
    ents_by_type = defaultdict(list)
    for e in doc.ents:
        ents_by_type[e.label_].append(e.text)
    rows.append({
        'sentences': len(list(doc.sents)),
        'persons':   ents_by_type.get('PERSON', []),
        'orgs':      ents_by_type.get('ORG', []),
        'locations': ents_by_type.get('GPE', []),
        'money':     ents_by_type.get('MONEY', []),
        'top_np':    [c.text for c in doc.noun_chunks][:3],
    })

df = pd.DataFrame(rows)
print(df.to_string())` }
  ]
};

L['nlp-w4-l2'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>Named Entity Recognition</h2>
<p>Named Entity Recognition (NER) identifies and classifies named entities in text — people, organisations, locations, dates, monetary values, and more. It converts unstructured text into structured data, enabling downstream tasks like knowledge graph construction, question answering, and information retrieval.</p>
<h3>spaCy NER Labels (English)</h3>
<ul>
  <li><strong>PERSON:</strong> People, including fictional</li>
  <li><strong>ORG:</strong> Companies, agencies, institutions</li>
  <li><strong>GPE:</strong> Countries, cities, states</li>
  <li><strong>LOC:</strong> Non-GPE locations (mountains, rivers)</li>
  <li><strong>DATE / TIME:</strong> Absolute or relative dates/times</li>
  <li><strong>MONEY:</strong> Monetary values with currency</li>
  <li><strong>PRODUCT:</strong> Objects, vehicles, foods (not services)</li>
  <li><strong>EVENT:</strong> Named hurricanes, battles, wars, sports events</li>
  <li><strong>LAW:</strong> Named documents made into laws</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import spacy
from spacy import displacy

nlp = spacy.load('en_core_web_sm')

text = """
Sundar Pichai, CEO of Google LLC (a subsidiary of Alphabet Inc.), announced
a $300 million investment in AI safety research at a conference in San Francisco
on January 15, 2024. The initiative will partner with Oxford University and MIT.
"""

doc = nlp(text)

# Structured extraction
print(f"{'Entity':35} {'Label':10} {'Start':7} {'End'}")
print("-" * 65)
for ent in doc.ents:
    print(f"{ent.text:35} {ent.label_:10} {ent.start_char:7} {ent.end_char}")

# Visualise in notebook: displacy.render(doc, style='ent')
# Export as HTML:
html = displacy.render(doc, style='ent', page=True)
with open('ner_vis.html', 'w') as f:
    f.write(html)` },
    { type: 'text', body: `<h3>Training a Custom NER Model</h3>
<p>Pretrained NER models miss domain-specific entities: drug names, legal clauses, Indian company names in regional scripts, custom product codes. spaCy v3 allows you to train or fine-tune NER components with your own labelled data.</p>` },
    { type: 'code', lang: 'python', src: `import spacy
from spacy.tokens import DocBin
from spacy.training import Example
import random

# Training data format: (text, {"entities": [(start, end, label)]})
TRAIN_DATA = [
    ("Dr. Priya Sharma prescribed Metformin 500mg twice daily.",
     {"entities": [(4, 16, "PERSON"), (28, 37, "DRUG"), (38, 43, "DOSAGE")]}),
    ("Patient received Aspirin 100mg and Lisinopril for hypertension.",
     {"entities": [(17, 24, "DRUG"), (25, 30, "DOSAGE"), (35, 45, "DRUG")]}),
    ("Amoxicillin 250mg was prescribed for bacterial infection.",
     {"entities": [(0, 11, "DRUG"), (12, 17, "DOSAGE")]}),
]

# Initialise blank model and add NER component
nlp_custom = spacy.blank('en')
ner = nlp_custom.add_pipe('ner')
for _, annotations in TRAIN_DATA:
    for start, end, label in annotations['entities']:
        ner.add_label(label)

# Training loop
nlp_custom.begin_training()
for epoch in range(30):
    random.shuffle(TRAIN_DATA)
    losses = {}
    for text, annotations in TRAIN_DATA:
        doc = nlp_custom.make_doc(text)
        example = Example.from_dict(doc, annotations)
        nlp_custom.update([example], losses=losses, drop=0.3)
    if epoch % 10 == 0:
        print(f"Epoch {epoch}: NER loss = {losses.get('ner', 0):.3f}")

# Test
test_doc = nlp_custom("The doctor prescribed Warfarin 5mg for the patient.")
for ent in test_doc.ents:
    print(f"  '{ent.text}' → {ent.label_}")` },
    { type: 'tip', body: `For production custom NER, use spaCy's <code>spacy train</code> CLI with a config file rather than the Python training loop. The CLI handles dataset validation, model packaging, and evaluation automatically. Label at least 200–500 examples per entity type for reasonable performance.` },
    { type: 'exercise', title: 'NER-based Information Extraction Pipeline', hint: 'Process 20 job postings with spaCy NER to extract company names (ORG), locations (GPE), and monetary values (MONEY). Store results in a DataFrame and compute the most mentioned companies and cities.', solution: `import spacy, pandas as pd
from collections import Counter

nlp = spacy.load('en_core_web_sm')

postings = [
    "Google is hiring a Senior ML Engineer in Bangalore. Salary: ₹40-60 LPA.",
    "Microsoft Azure team in Hyderabad looking for Python developers. Comp: $80K-$120K.",
    "Amazon AWS is expanding its Chennai office. Offering up to ₹50 LPA for Senior SWEs.",
    "Flipkart seeks Data Scientists in Bangalore with 3+ years experience.",
    "Infosys and TCS are both hiring freshers in Pune. Starting salary ₹3.5 LPA.",
]

rows = []
for doc in nlp.pipe(postings):
    rows.append({
        'orgs':   [e.text for e in doc.ents if e.label_ == 'ORG'],
        'places': [e.text for e in doc.ents if e.label_ == 'GPE'],
        'money':  [e.text for e in doc.ents if e.label_ == 'MONEY'],
    })

df = pd.DataFrame(rows)
print(df)
all_orgs = [o for row in df['orgs'] for o in row]
print("\nTop companies:", Counter(all_orgs).most_common(5))` }
  ]
};

L['nlp-w4-l3'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>POS Tagging and Dependency Parsing</h2>
<p>Part-of-Speech tagging assigns grammatical roles to tokens (noun, verb, adjective, preposition) while dependency parsing identifies the grammatical relationships between words — which word is the subject, which is the object, which modifiers belong to which head. Together they reveal the syntactic structure that governs meaning.</p>
<h3>POS Tags (Universal Dependencies)</h3>
<ul>
  <li><strong>NOUN:</strong> apple, information, model</li>
  <li><strong>VERB:</strong> runs, trained, improved</li>
  <li><strong>ADJ:</strong> large, pretrained, excellent</li>
  <li><strong>ADV:</strong> quickly, very, however</li>
  <li><strong>PROPN:</strong> Google, India, BERT</li>
  <li><strong>ADP:</strong> prepositions — in, on, for</li>
  <li><strong>DET:</strong> determiners — the, a, this</li>
  <li><strong>PUNCT:</strong> punctuation</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import spacy
from spacy import displacy

nlp = spacy.load('en_core_web_sm')
text = "The experienced data scientist quickly trained a powerful neural network."
doc = nlp(text)

# POS tagging
print(f"{'Token':20} {'POS':8} {'Tag':8} {'Dep':15} {'Head'}")
print("-" * 65)
for tok in doc:
    print(f"{tok.text:20} {tok.pos_:8} {tok.tag_:8} {tok.dep_:15} {tok.head.text}")

# Dependency tree as ASCII (for debugging in terminals)
# displacy.serve(doc, style='dep')  # Opens browser with interactive viz

# Key relationships: find subject and object of the main verb
root = [tok for tok in doc if tok.dep_ == 'ROOT'][0]
print(f"\nRoot verb: '{root.text}'")
subj = [tok for tok in doc if tok.dep_ in ('nsubj','nsubjpass')]
obj  = [tok for tok in doc if tok.dep_ in ('dobj','obj')]
print(f"Subject: {[t.text for t in subj]}")
print(f"Object:  {[t.text for t in obj]}")` },
    { type: 'code', lang: 'python', src: `import spacy

nlp = spacy.load('en_core_web_sm')

# Useful patterns with dependency parsing

def extract_adjective_noun_pairs(text):
    """Extract adjective-noun pairs (e.g. 'excellent performance')."""
    doc = nlp(text)
    pairs = []
    for tok in doc:
        if tok.dep_ == 'amod' and tok.head.pos_ == 'NOUN':
            pairs.append((tok.text, tok.head.text))
    return pairs

def extract_verb_object_pairs(text):
    """Extract verb-direct object pairs (e.g. 'trained model')."""
    doc = nlp(text)
    pairs = []
    for tok in doc:
        if tok.dep_ in ('dobj', 'obj') and tok.head.pos_ == 'VERB':
            pairs.append((tok.head.text, tok.text))
    return pairs

def get_subject_verb_object(text):
    """Extract SVO triples."""
    doc = nlp(text)
    triples = []
    for tok in doc:
        if tok.dep_ == 'ROOT' and tok.pos_ == 'VERB':
            subj = [t for t in tok.lefts if t.dep_ in ('nsubj','nsubjpass')]
            obj  = [t for t in tok.rights if t.dep_ in ('dobj','obj')]
            if subj and obj:
                triples.append((subj[0].text, tok.text, obj[0].text))
    return triples

text = "Google's researchers published an excellent paper. The team trained a massive language model."
print("ADJ-NOUN:", extract_adjective_noun_pairs(text))
print("VERB-OBJ:", extract_verb_object_pairs(text))
print("SVO:", get_subject_verb_object(text))` },
    { type: 'tip', body: `Dependency parsing is the foundation of rule-based information extraction. When you need to extract structured facts from text ("Company X acquired Company Y for $Z"), writing dependency-based rules is more interpretable and controllable than training a neural model, especially for high-stakes domains.` },
    { type: 'exercise', title: 'Opinion Mining with POS and Dependency Parsing', hint: 'Extract (aspect, opinion) pairs from product reviews: find nouns (the aspect) that are modified by adjectives (the opinion). For "The battery life is excellent", extract (battery_life, excellent).', solution: `import spacy
import pandas as pd

nlp = spacy.load('en_core_web_sm')

reviews = [
    "The battery life is excellent but the camera quality is disappointing.",
    "I love the fast processor and the beautiful display.",
    "The build quality feels cheap and the software is buggy.",
    "The screen resolution is amazing and the sound quality is superb.",
]

def extract_aspect_opinion(text):
    doc = nlp(text)
    pairs = []
    for tok in doc:
        # Pattern: adjective modifying a noun (amod) or pred. complement (acomp)
        if tok.pos_ == 'ADJ':
            if tok.dep_ == 'amod':
                pairs.append((tok.head.text, tok.text, 'amod'))
            elif tok.dep_ == 'acomp' and tok.head.pos_ == 'VERB':
                # "battery is excellent" — find the subject noun
                subj = [t for t in tok.head.lefts if t.dep_ == 'nsubj']
                if subj:
                    pairs.append((subj[0].text, tok.text, 'acomp'))
    return pairs

rows = []
for review in reviews:
    for aspect, opinion, pattern in extract_aspect_opinion(review):
        rows.append({'review': review[:40], 'aspect': aspect,
                     'opinion': opinion, 'pattern': pattern})

print(pd.DataFrame(rows).to_string(index=False))` }
  ]
};

L['nlp-w4-l4'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>NLTK for Text Analysis</h2>
<p>NLTK (Natural Language Toolkit) is the oldest and most widely documented Python NLP library. Where spaCy excels at production pipelines, NLTK excels at educational exploration, linguistic analysis, and tasks requiring access to a broad range of corpora and algorithms. NLTK ships with 50+ corpora and a suite of text processing tools.</p>
<h3>NLTK Strengths</h3>
<ul>
  <li>Rich built-in corpora: WordNet, Brown Corpus, Reuters, Gutenberg, CMU Pronouncing Dict</li>
  <li>Concordance analysis, collocations, frequency distributions</li>
  <li>WordNet for semantic similarity and lexical relations</li>
  <li>Chunk parsing and tree representations</li>
  <li>Excellent documentation and teaching materials</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import nltk
nltk.download(['brown','reuters','wordnet','punkt_tab','averaged_perceptron_tagger_eng',
               'stopwords', 'maxent_ne_chunker_tab','words'], quiet=True)

from nltk.corpus import brown, reuters, wordnet as wn
from nltk.text import Text
from nltk import FreqDist, bigrams, collocations

# 1. Corpus exploration with Text object
brown_text = Text(brown.words(categories='news'))
print("Concordance for 'said':")
brown_text.concordance('said', width=60, lines=5)

# 2. Frequency distribution
fdist = FreqDist(brown.words(categories='news'))
print("\nTop 10 words:", fdist.most_common(10))
print(f"Hapax legomena (appear once): {len(fdist.hapaxes())}")

# 3. Collocations (frequently co-occurring word pairs)
brown_text.collocations(num=10)` },
    { type: 'code', lang: 'python', src: `from nltk.corpus import wordnet as wn
import nltk

# WordNet: lexical database of English
# Synsets = sets of synonyms representing a concept
synsets = wn.synsets('bank')
print(f"'bank' has {len(synsets)} synsets:")
for s in synsets:
    print(f"  {s.name():25} {s.definition()[:60]}")

# Semantic similarity using path length in WordNet taxonomy
car  = wn.synsets('car')[0]
auto = wn.synsets('automobile')[0]
bus  = wn.synsets('bus')[0]
dog  = wn.synsets('dog')[0]

print(f"\ncar-automobile: {car.path_similarity(auto):.3f}")
print(f"car-bus:        {car.path_similarity(bus):.3f}")
print(f"car-dog:        {car.path_similarity(dog):.3f}")

# Hypernyms (broader concepts) and hyponyms (narrower concepts)
print(f"\nhypernyms of 'dog': {wn.synsets('dog')[0].hypernyms()}")
print(f"hyponyms of 'dog' (first 5): {wn.synsets('dog')[0].hyponyms()[:5]}")

# Synonyms and antonyms
for syn in wn.synsets('happy')[:2]:
    for lemma in syn.lemmas():
        print(f"synonym: {lemma.name()}", end='')
        if lemma.antonyms():
            print(f"  antonym: {lemma.antonyms()[0].name()}", end='')
        print()` },
    { type: 'code', lang: 'python', src: `from nltk import ne_chunk, pos_tag, word_tokenize
from nltk.chunk import tree2conlltags
import nltk

# NLTK NER with MaxEnt chunker
text = "Barack Obama was born in Honolulu, Hawaii. He served as the 44th President of the United States."
tokens = word_tokenize(text)
pos_tags = pos_tag(tokens)
tree = ne_chunk(pos_tags, binary=False)

# Extract named entities from the tree
from nltk.chunk import tree2conlltags
iob_tags = tree2conlltags(tree)
print("IOB Tags:")
for word, pos, iob in iob_tags:
    if iob != 'O':
        print(f"  {word:15} {pos:6} {iob}")` },
    { type: 'tip', body: `WordNet similarity is surprisingly effective for domain-specific semantic alignment tasks. Use <code>wn.synsets(word, pos='n')</code> to restrict to nouns, and <code>s1.wup_similarity(s2)</code> (Wu-Palmer similarity) for a more robust metric than raw path similarity.` },
    { type: 'exercise', title: 'Build a Text Readability Analyser with NLTK', hint: 'Implement the Flesch Reading Ease score: 206.835 - 1.015×(words/sentences) - 84.6×(syllables/words). Count syllables by counting vowel groups. Also compute type-token ratio (unique words / total words).', solution: `import nltk, re
nltk.download('punkt_tab', quiet=True)
from nltk.tokenize import sent_tokenize, word_tokenize

def count_syllables(word):
    word = word.lower()
    count = len(re.findall(r'[aeiou]+', word))
    if word.endswith('e') and count > 1:
        count -= 1
    return max(1, count)

def readability_stats(text):
    sentences = sent_tokenize(text)
    words = [w for w in word_tokenize(text) if w.isalpha()]
    syllables = sum(count_syllables(w) for w in words)

    n_sent = len(sentences)
    n_words = len(words)
    n_syll = syllables

    flesch = 206.835 - 1.015*(n_words/n_sent) - 84.6*(n_syll/n_words)
    ttr = len(set(w.lower() for w in words)) / n_words

    return {'sentences': n_sent, 'words': n_words, 'syllables': n_syll,
            'flesch_ease': round(flesch, 1), 'type_token_ratio': round(ttr, 3)}

texts = {
    'Simple': "The cat sat on the mat. It was a sunny day. Birds sang.",
    'Complex': "The epistemological implications of machine learning methodologies necessitate comprehensive phenomenological examination of computational architectures.",
}
for name, t in texts.items():
    print(f"{name}: {readability_stats(t)}")` }
  ]
};

L['nlp-w4-l5'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>Custom NLP Pipelines</h2>
<p>Real-world NLP systems almost never use a library out of the box. They need custom components — domain-specific tokenisation rules, specialised entity detectors, custom classification heads, business logic filters. Both spaCy and NLTK support extensible pipelines, but spaCy's architecture makes it particularly clean to build, register, and compose custom components.</p>
<h3>spaCy Custom Components</h3>
<p>A spaCy pipeline component is any callable that receives a <code>Doc</code> object and returns a modified <code>Doc</code>. You register it with <code>@Language.component</code>, add it to the pipeline, and it runs automatically on every document processed by <code>nlp(text)</code>.</p>` },
    { type: 'code', lang: 'python', src: `import spacy
from spacy.language import Language
from spacy.tokens import Doc, Span, Token

nlp = spacy.load('en_core_web_sm')

# 1. Custom component: detect Indian phone numbers
@Language.component("phone_detector")
def phone_detector(doc):
    matches = []
    for i, tok in enumerate(doc):
        # Simple pattern: 10-digit number starting with 6-9
        if tok.like_num and len(tok.text) == 10 and tok.text[0] in '6789':
            matches.append((i, i+1, "PHONE"))

    # Add spans to doc.ents (merge with existing)
    from spacy.util import filter_spans
    new_ents = [Span(doc, start, end, label=label) for start, end, label in matches]
    doc.ents = filter_spans(list(doc.ents) + new_ents)
    return doc

nlp.add_pipe("phone_detector", after="ner")

text = "Call Priya at 9876543210 or Rahul at 7012345678 for details."
doc = nlp(text)
for ent in doc.ents:
    print(f"  {ent.text:20} {ent.label_}")` },
    { type: 'code', lang: 'python', src: `import spacy
from spacy.language import Language
from spacy.tokens import Doc

# 2. Custom component: add text statistics as custom attributes
Token = spacy.tokens.Token
Doc.set_extension("avg_word_len", default=0.0, force=True)
Doc.set_extension("lexical_density", default=0.0, force=True)

@Language.component("text_stats")
def text_stats(doc):
    alpha_tokens = [t for t in doc if t.is_alpha]
    if alpha_tokens:
        doc._.avg_word_len    = sum(len(t.text) for t in alpha_tokens) / len(alpha_tokens)
        content_words = [t for t in alpha_tokens if not t.is_stop and t.pos_ in ('NOUN','VERB','ADJ','ADV')]
        doc._.lexical_density = len(content_words) / len(alpha_tokens)
    return doc

nlp2 = spacy.load('en_core_web_sm')
nlp2.add_pipe("text_stats", last=True)

doc = nlp2("The quick brown fox jumps over the lazy dog near the riverbank.")
print(f"Avg word length: {doc._.avg_word_len:.2f}")
print(f"Lexical density: {doc._.lexical_density:.2f}")` },
    { type: 'code', lang: 'python', src: `# 3. Building a complete custom pipeline for sentiment + entity extraction
import spacy
from spacy.language import Language
from transformers import pipeline as hf_pipeline

# Load a HuggingFace sentiment model as a spaCy component
@Language.factory("sentiment_component")
def create_sentiment(nlp, name):
    sentiment_pipe = hf_pipeline("sentiment-analysis",
                                  model="distilbert-base-uncased-finetuned-sst-2-english",
                                  device=-1)  # CPU
    class SentimentComponent:
        def __init__(self, pipe):
            self.pipe = pipe
            from spacy.tokens import Doc
            Doc.set_extension("sentiment", default=None, force=True)
            Doc.set_extension("sentiment_score", default=0.0, force=True)
        def __call__(self, doc):
            result = self.pipe(doc.text[:512])[0]
            doc._.sentiment = result['label']
            doc._.sentiment_score = result['score']
            return doc
    return SentimentComponent(sentiment_pipe)

nlp3 = spacy.load('en_core_web_sm', disable=['parser'])
nlp3.add_pipe("sentiment_component", last=True)

docs = list(nlp3.pipe([
    "The product quality from Apple is absolutely outstanding!",
    "I am deeply disappointed with the service from Amazon.",
]))
for doc in docs:
    ents = [(e.text, e.label_) for e in doc.ents]
    print(f"Sentiment: {doc._.sentiment:10} ({doc._.sentiment_score:.3f})  Entities: {ents}")` },
    { type: 'tip', body: `Use <code>spacy.blank('en')</code> and add only the components you need when building specialised pipelines. A blank model plus a custom NER or classifier is often faster and more memory-efficient than loading the full en_core_web_sm and ignoring most of its components.` },
    { type: 'exercise', title: 'Build a Medical Text Extraction Pipeline', hint: 'Create a spaCy pipeline that: (1) detects drug names using a vocabulary list, (2) extracts dosages using regex, (3) links drugs to their dosages using dependency patterns. Test on 5 prescription texts.', solution: `import spacy, re
from spacy.language import Language
from spacy.tokens import Span
from spacy.util import filter_spans

nlp = spacy.load('en_core_web_sm', disable=['ner'])

DRUGS = ['aspirin','metformin','lisinopril','atorvastatin','amoxicillin','ibuprofen']

@Language.component("drug_ner")
def drug_ner(doc):
    new_ents = []
    for tok in doc:
        if tok.text.lower() in DRUGS:
            new_ents.append(Span(doc, tok.i, tok.i+1, label="DRUG"))
    # Detect dosages: e.g. "500mg", "10 mg", "2.5mg"
    for m in re.finditer(r'\d+\.?\d*\s*mg', doc.text):
        span = doc.char_span(m.start(), m.end(), label="DOSAGE")
        if span:
            new_ents.append(span)
    doc.ents = filter_spans(new_ents)
    return doc

nlp.add_pipe("drug_ner")

prescriptions = [
    "Patient prescribed Metformin 500mg twice daily for diabetes.",
    "Administer Aspirin 100mg once daily with food.",
    "Atorvastatin 20mg at bedtime for cholesterol management.",
]

for text in prescriptions:
    doc = nlp(text)
    print(f"Text: {text}")
    for ent in doc.ents:
        print(f"  {ent.label_:8} → '{ent.text}'")
    print()` }
  ]
};

// ─── WEEK 5 — RNNs & LSTMs ───────────────────────────────────────────────────

L['nlp-w5-l1'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>Recurrent Neural Networks</h2>
<p>Feedforward networks treat each input independently — every example is processed in isolation. Text is sequential: the meaning of "bank" in "I went to the river bank" depends on the preceding words. Recurrent Neural Networks (RNNs) process sequences by maintaining a <em>hidden state</em> that carries information from previous time steps.</p>
<h3>The RNN Equation</h3>
<p>At each time step t, the RNN receives the current input x_t and the previous hidden state h_{t-1}, producing a new hidden state: <code>h_t = tanh(W_h × h_{t-1} + W_x × x_t + b)</code></p>
<p>The same weight matrices W_h and W_x are shared across all time steps — the RNN learns a single transformation that is applied repeatedly, like a for loop with learned weights.</p>
<p>After processing the full sequence, the final hidden state h_T summarises the entire sequence and can be used for classification. Alternatively, all hidden states can be used for sequence labelling (POS tagging, NER).</p>` },
    { type: 'code', lang: 'python', src: `import torch
import torch.nn as nn
import numpy as np

# Minimal RNN for text classification
class SimpleRNN(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, n_classes):
        super().__init__()
        self.embed = nn.Embedding(vocab_size, embed_dim, padding_idx=0)
        self.rnn   = nn.RNN(embed_dim, hidden_dim, batch_first=True, num_layers=1)
        self.fc    = nn.Linear(hidden_dim, n_classes)
        self.drop  = nn.Dropout(0.3)

    def forward(self, x):
        # x: (batch, seq_len) integer token IDs
        emb = self.drop(self.embed(x))          # (batch, seq_len, embed_dim)
        out, h_n = self.rnn(emb)               # h_n: (1, batch, hidden_dim)
        h_last = h_n.squeeze(0)                # (batch, hidden_dim) — last step
        return self.fc(self.drop(h_last))      # (batch, n_classes)

# Instantiate
model = SimpleRNN(vocab_size=10000, embed_dim=128, hidden_dim=256, n_classes=4)
print(model)
print(f"Parameters: {sum(p.numel() for p in model.parameters()):,}")

# Forward pass with dummy data
x = torch.randint(0, 10000, (32, 50))  # batch_size=32, seq_len=50
logits = model(x)
print(f"Input: {x.shape}  Output: {logits.shape}")` },
    { type: 'text', body: `<h3>The Vanishing Gradient Problem</h3>
<p>During backpropagation through time (BPTT), gradients are multiplied by the weight matrix at every time step. If the weights are small (&lt;1), gradients shrink exponentially as they propagate backwards — the <em>vanishing gradient problem</em>. A 100-step sequence has 100 multiplications, and gradients for early time steps become essentially zero.</p>
<p>This means vanilla RNNs effectively have short-term memory — they can't learn long-range dependencies. LSTMs and GRUs were designed specifically to solve this problem.</p>` },
    { type: 'code', lang: 'python', src: `# Demonstrating vanishing gradients
import torch
import torch.nn as nn

# Simulate gradient flow through 100 time steps
hidden_size = 64
W = torch.randn(hidden_size, hidden_size) * 0.1  # small init
h = torch.ones(hidden_size)
grad_norms = []
for t in range(100):
    h = torch.tanh(W @ h)
    grad_norms.append(h.norm().item())

import matplotlib.pyplot as plt
plt.figure(figsize=(8,3))
plt.plot(grad_norms)
plt.xlabel('Time step (backwards)')
plt.ylabel('Activation norm (proxy for gradient)')
plt.title('Vanishing gradients in vanilla RNN')
plt.tight_layout()
plt.savefig('vanishing_grad.png', dpi=150)

print(f"Norm at step 0:   {grad_norms[0]:.4f}")
print(f"Norm at step 50:  {grad_norms[50]:.6f}")
print(f"Norm at step 99:  {grad_norms[99]:.8f}")` },
    { type: 'tip', body: `Vanilla RNNs are rarely used in practice today — LSTMs or GRUs work better for almost all sequence tasks. However, understanding the RNN foundation is essential for grasping why LSTMs were designed the way they were.` },
    { type: 'exercise', title: 'Train a Vanilla RNN for Sentiment Classification', hint: 'Build a SimpleRNN with an embedding layer, single RNN layer, and linear output. Train on IMDB (use torchtext or a CSV). Compare train vs validation accuracy over 5 epochs to observe overfitting behaviour.', solution: `import torch, torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
import numpy as np

# Synthetic data (replace with real IMDB)
pos = ["great movie loved amazing brilliant"] * 200
neg = ["terrible boring awful waste rubbish"] * 200
texts, labels = pos + neg, [1]*200 + [0]*200
X_tr, X_te, y_tr, y_te = train_test_split(texts, labels, test_size=0.2, random_state=42)

# Vocabulary
cv = CountVectorizer(max_features=1000)
cv.fit(X_tr)
def tokenise(texts, max_len=20):
    result = []
    for t in texts:
        ids = [cv.vocabulary_.get(w, 0) for w in t.split()[:max_len]]
        ids += [0] * (max_len - len(ids))
        result.append(ids)
    return torch.tensor(result)

Xtr = tokenise(X_tr); Xte = tokenise(X_te)
ytr = torch.tensor(y_tr); yte = torch.tensor(y_te)

class RNN(nn.Module):
    def __init__(self): super().__init__(); self.e=nn.Embedding(1001,32,padding_idx=0); self.r=nn.RNN(32,64,batch_first=True); self.f=nn.Linear(64,2)
    def forward(self,x): _,h=self.r(self.e(x)); return self.f(h.squeeze(0))

model = RNN(); opt = torch.optim.Adam(model.parameters(), lr=0.001)
loss_fn = nn.CrossEntropyLoss()
for ep in range(5):
    model.train(); opt.zero_grad(); loss=loss_fn(model(Xtr),ytr); loss.backward(); opt.step()
    model.eval()
    with torch.no_grad():
        tr_acc = (model(Xtr).argmax(1)==ytr).float().mean()
        te_acc = (model(Xte).argmax(1)==yte).float().mean()
    print(f"Ep {ep+1}  loss={loss:.3f}  train_acc={tr_acc:.3f}  val_acc={te_acc:.3f}")` }
  ]
};

L['nlp-w5-l2'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `<h2>LSTMs: Long Short-Term Memory</h2>
<p>LSTMs (Hochreiter & Schmidhuber, 1997) address the vanishing gradient problem by introducing a <em>cell state</em> — a separate memory pathway that runs through the entire sequence with only linear interactions (additions, not multiplications). Information can flow unchanged through hundreds of time steps.</p>
<h3>The LSTM Gates</h3>
<p>LSTMs use three multiplicative gates to control information flow:</p>
<ul>
  <li><strong>Forget gate (f_t):</strong> Decides what to erase from cell state: f_t = σ(W_f · [h_{t-1}, x_t] + b_f). Output ∈ (0,1) — 0 = forget everything, 1 = keep everything.</li>
  <li><strong>Input gate (i_t):</strong> Decides what new information to add: i_t = σ(W_i · [h_{t-1}, x_t] + b_i). Together with candidate values g_t = tanh(...).</li>
  <li><strong>Output gate (o_t):</strong> Decides what to expose from cell state: o_t = σ(W_o · [h_{t-1}, x_t] + b_o).</li>
</ul>
<p>Cell state update: <code>C_t = f_t ⊙ C_{t-1} + i_t ⊙ g_t</code></p>
<p>Hidden state: <code>h_t = o_t ⊙ tanh(C_t)</code></p>
<p>The key insight: the cell state update uses addition (not multiplication), so gradients flow backward through the cell state without vanishing.</p>` },
    { type: 'code', lang: 'python', src: `import torch
import torch.nn as nn

class TextLSTM(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, n_classes, n_layers=2, bidirectional=True):
        super().__init__()
        self.embed = nn.Embedding(vocab_size, embed_dim, padding_idx=0)
        self.lstm  = nn.LSTM(
            embed_dim, hidden_dim,
            num_layers=n_layers,
            bidirectional=bidirectional,
            batch_first=True,
            dropout=0.3 if n_layers > 1 else 0.0
        )
        lstm_out_dim = hidden_dim * (2 if bidirectional else 1)
        self.pool = nn.AdaptiveMaxPool1d(1)   # max over time
        self.norm = nn.LayerNorm(lstm_out_dim)
        self.fc   = nn.Sequential(
            nn.Dropout(0.4),
            nn.Linear(lstm_out_dim, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, n_classes)
        )

    def forward(self, x):
        emb = self.embed(x)                          # (B, T, E)
        out, _ = self.lstm(emb)                      # (B, T, H*dirs)
        pooled = self.pool(out.permute(0,2,1))        # (B, H*dirs, 1)
        pooled = pooled.squeeze(-1)                   # (B, H*dirs)
        return self.fc(self.norm(pooled))

model = TextLSTM(vocab_size=20000, embed_dim=200, hidden_dim=128, n_classes=4)
x = torch.randint(0, 20000, (32, 200))  # batch=32, seq_len=200
print(model(x).shape)  # (32, 4)
print(f"Parameters: {sum(p.numel() for p in model.parameters()):,}")` },
    { type: 'code', lang: 'python', src: `# Full training loop for LSTM text classifier
import torch, torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
from torch.optim.lr_scheduler import ReduceLROnPlateau
import numpy as np

def train_lstm(model, X_tr, y_tr, X_val, y_val, epochs=10, lr=1e-3, batch_size=64):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model  = model.to(device)
    opt    = torch.optim.AdamW(model.parameters(), lr=lr, weight_decay=1e-4)
    sched  = ReduceLROnPlateau(opt, patience=2, factor=0.5, verbose=True)
    loss_fn= nn.CrossEntropyLoss()

    tr_ds = TensorDataset(torch.tensor(X_tr), torch.tensor(y_tr))
    tr_dl = DataLoader(tr_ds, batch_size=batch_size, shuffle=True)

    X_val_t = torch.tensor(X_val).to(device)
    y_val_t = torch.tensor(y_val).to(device)

    for ep in range(epochs):
        model.train()
        total_loss = 0
        for xb, yb in tr_dl:
            xb, yb = xb.to(device), yb.to(device)
            opt.zero_grad()
            loss = loss_fn(model(xb), yb)
            loss.backward()
            nn.utils.clip_grad_norm_(model.parameters(), 1.0)  # gradient clipping
            opt.step()
            total_loss += loss.item()

        model.eval()
        with torch.no_grad():
            val_logits = model(X_val_t)
            val_acc = (val_logits.argmax(1) == y_val_t).float().mean().item()
            val_loss = loss_fn(val_logits, y_val_t).item()
        sched.step(val_loss)
        print(f"Ep {ep+1:2d}  train_loss={total_loss/len(tr_dl):.3f}  val_acc={val_acc:.3f}")

    return model` },
    { type: 'warn', title: 'Gradient Clipping for RNNs', body: `LSTMs can suffer from exploding gradients (the opposite of vanishing). Always apply <code>nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)</code> after <code>loss.backward()</code> and before <code>optimizer.step()</code> when training RNN/LSTM models.` },
    { type: 'exercise', title: 'Bidirectional LSTM vs Unidirectional for NER', hint: 'Implement a BiLSTM-CRF architecture for sequence labelling (simplified: BiLSTM + linear layer). Train on a small NER dataset (CoNLL-2003 subset). Compare F1 of bidirectional vs unidirectional LSTM.', solution: `import torch, torch.nn as nn

class BiLSTMTagger(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, n_tags):
        super().__init__()
        self.embed = nn.Embedding(vocab_size, embed_dim, padding_idx=0)
        self.bilstm= nn.LSTM(embed_dim, hidden_dim, bidirectional=True, batch_first=True)
        self.fc    = nn.Linear(hidden_dim * 2, n_tags)

    def forward(self, x):
        emb = self.embed(x)
        out, _ = self.bilstm(emb)   # (B, T, 2H)
        return self.fc(out)         # (B, T, n_tags) — per-token logits

# Tags: O, B-PER, I-PER, B-ORG, I-ORG, B-LOC, I-LOC
model = BiLSTMTagger(vocab_size=5000, embed_dim=100, hidden_dim=128, n_tags=7)
x = torch.randint(0, 5000, (8, 30))
logits = model(x)
print(f"Sequence labelling output: {logits.shape}")  # (8, 30, 7)
preds = logits.argmax(-1)
print(f"Predicted tag IDs: {preds[0]}")` }
  ]
};

L['nlp-w5-l3'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>Text Classification with LSTMs</h2>
<p>LSTMs outperform simple bag-of-words approaches on tasks where word order matters and long-range dependencies are informative. However, with transformer models readily available, LSTMs are most useful when you have limited compute, need fast inference, or are working on an edge device. Understanding the LSTM text classification pipeline is also foundational for understanding transformers.</p>
<h3>The Full Pipeline</h3>
<ol>
  <li><strong>Tokenisation:</strong> Convert text to integer token IDs</li>
  <li><strong>Padding:</strong> Pad sequences to uniform length</li>
  <li><strong>Embedding:</strong> Map IDs to dense vectors (pretrained or learned from scratch)</li>
  <li><strong>LSTM layers:</strong> Process sequence, produce contextualised representations</li>
  <li><strong>Pooling:</strong> Aggregate sequence representations (last state, max pool, mean pool, attention)</li>
  <li><strong>Classification head:</strong> Linear layer(s) → class probabilities</li>
</ol>` },
    { type: 'code', lang: 'python', src: `# Complete LSTM text classification with Keras (cleaner for prototyping)
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.layers import (Embedding, LSTM, Bidirectional,
                                      Dense, Dropout, GlobalMaxPooling1D)
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.datasets import fetch_20newsgroups
from sklearn.model_selection import train_test_split
import numpy as np

# Data
data = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'),
                           categories=['sci.med','sci.space','rec.sport.hockey','rec.autos'])
X_tr, X_val, y_tr, y_val = train_test_split(data.data, data.target, test_size=0.2, random_state=42)

# Tokenise
MAX_VOCAB = 15000
MAX_LEN   = 200
EMBED_DIM = 128

tokenizer = Tokenizer(num_words=MAX_VOCAB, oov_token='<OOV>')
tokenizer.fit_on_texts(X_tr)

def encode(texts):
    seqs = tokenizer.texts_to_sequences(texts)
    return pad_sequences(seqs, maxlen=MAX_LEN, padding='post', truncating='post')

X_tr_enc  = encode(X_tr)
X_val_enc = encode(X_val)

# Model
model = keras.Sequential([
    Embedding(MAX_VOCAB, EMBED_DIM, input_length=MAX_LEN, mask_zero=True),
    Bidirectional(LSTM(128, return_sequences=True, dropout=0.2, recurrent_dropout=0.1)),
    GlobalMaxPooling1D(),
    Dense(64, activation='relu'),
    Dropout(0.4),
    Dense(4, activation='softmax')
])
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.summary()

cb = [keras.callbacks.EarlyStopping(patience=3, restore_best_weights=True)]
history = model.fit(X_tr_enc, np.array(y_tr), validation_data=(X_val_enc, np.array(y_val)),
                     epochs=15, batch_size=64, callbacks=cb, verbose=1)
print(f"Best val accuracy: {max(history.history['val_accuracy']):.3f}")` },
    { type: 'code', lang: 'python', src: `# Initialising with pretrained GloVe embeddings in Keras
import numpy as np
import gensim.downloader as api

wv = api.load('glove-wiki-gigaword-100')

def build_embedding_matrix(word_index, wv, embed_dim=100, max_vocab=15000):
    matrix = np.zeros((min(max_vocab, len(word_index)+1), embed_dim))
    for word, idx in word_index.items():
        if idx < max_vocab and word in wv:
            matrix[idx] = wv[word]
    return matrix

embed_matrix = build_embedding_matrix(tokenizer.word_index, wv, embed_dim=100, max_vocab=MAX_VOCAB)
print(f"Embedding matrix shape: {embed_matrix.shape}")

# Use in Keras
embed_layer = keras.layers.Embedding(
    MAX_VOCAB, 100,
    weights=[embed_matrix],
    input_length=MAX_LEN,
    trainable=False,    # freeze pretrained; set True to fine-tune
    mask_zero=True
)` },
    { type: 'tip', body: `For LSTM text classifiers, <code>GlobalMaxPooling1D</code> (take max value across time steps for each feature) typically outperforms using only the last hidden state. It acts like soft attention — capturing the most salient feature at any position in the sequence.` },
    { type: 'exercise', title: 'LSTM vs TF-IDF+LR Comparison', hint: 'Train both a TF-IDF+LogisticRegression and a BiLSTM classifier on the same 20 Newsgroups split. Compare accuracy, training time, and inference speed. When does the LSTM win?', solution: `import time
from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

data = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'))
X_tr, X_val, y_tr, y_val = train_test_split(data.data, data.target, test_size=0.2)

# TF-IDF baseline
t0 = time.time()
tv = TfidfVectorizer(sublinear_tf=True, max_features=20000, min_df=3)
lr = LogisticRegression(C=5, max_iter=1000, n_jobs=-1)
lr.fit(tv.fit_transform(X_tr), y_tr)
tfidf_acc = lr.score(tv.transform(X_val), y_val)
print(f"TF-IDF+LR: acc={tfidf_acc:.3f}  time={time.time()-t0:.1f}s")

# Note: for full LSTM comparison, run the Keras model from previous code block
# Expected result: TF-IDF+LR often matches or beats LSTM on 20 Newsgroups
# (topic is well-captured by vocabulary alone; sequential modeling adds little)
# LSTM wins when: sentiment, style, or long-range context matters` }
  ]
};

L['nlp-w5-l4'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>Sequence-to-Sequence Models</h2>
<p>Text classification maps a sequence to a single label. Sequence-to-sequence (seq2seq) models map a sequence to another sequence of potentially different length — enabling machine translation, summarisation, dialogue systems, and text simplification.</p>
<h3>The Encoder-Decoder Architecture</h3>
<p>Seq2seq consists of two LSTMs:</p>
<ul>
  <li><strong>Encoder:</strong> Reads the input sequence and compresses it into a context vector — the final hidden state.</li>
  <li><strong>Decoder:</strong> Receives the context vector as its initial hidden state and generates the output sequence token by token. At each step it also takes its own previous output as input (auto-regressive).</li>
</ul>
<p><strong>Bottleneck problem:</strong> The entire input must be compressed into a single context vector. For long sequences, information is lost. This motivated the attention mechanism (next lesson).</p>` },
    { type: 'code', lang: 'python', src: `import torch
import torch.nn as nn
import torch.nn.functional as F

class Encoder(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, n_layers=1, dropout=0.3):
        super().__init__()
        self.embed  = nn.Embedding(vocab_size, embed_dim, padding_idx=0)
        self.lstm   = nn.LSTM(embed_dim, hidden_dim, n_layers, batch_first=True, dropout=dropout if n_layers>1 else 0)
        self.drop   = nn.Dropout(dropout)

    def forward(self, src):
        emb = self.drop(self.embed(src))          # (B, T, E)
        out, (h, c) = self.lstm(emb)              # h, c: (n_layers, B, H)
        return out, h, c

class Decoder(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, n_layers=1, dropout=0.3):
        super().__init__()
        self.embed  = nn.Embedding(vocab_size, embed_dim, padding_idx=0)
        self.lstm   = nn.LSTM(embed_dim, hidden_dim, n_layers, batch_first=True, dropout=dropout if n_layers>1 else 0)
        self.fc_out = nn.Linear(hidden_dim, vocab_size)
        self.drop   = nn.Dropout(dropout)

    def forward(self, tgt_token, h, c):
        # tgt_token: (B,) → (B, 1)
        emb = self.drop(self.embed(tgt_token.unsqueeze(1)))  # (B, 1, E)
        out, (h, c) = self.lstm(emb, (h, c))                 # (B, 1, H)
        logits = self.fc_out(out.squeeze(1))                  # (B, vocab_size)
        return logits, h, c

class Seq2Seq(nn.Module):
    def __init__(self, encoder, decoder, device):
        super().__init__()
        self.encoder = encoder
        self.decoder = decoder
        self.device  = device

    def forward(self, src, tgt, teacher_forcing_ratio=0.5):
        B, T_tgt = tgt.shape
        vocab_size = self.decoder.fc_out.out_features
        outputs = torch.zeros(B, T_tgt, vocab_size).to(self.device)

        _, h, c = self.encoder(src)
        dec_input = tgt[:, 0]   # <SOS> token

        for t in range(1, T_tgt):
            logits, h, c = self.decoder(dec_input, h, c)
            outputs[:, t] = logits
            # Teacher forcing: use ground-truth vs model's own prediction
            teacher_force = torch.rand(1).item() < teacher_forcing_ratio
            dec_input = tgt[:, t] if teacher_force else logits.argmax(1)

        return outputs   # (B, T_tgt, vocab)

enc = Encoder(vocab_size=5000, embed_dim=128, hidden_dim=256)
dec = Decoder(vocab_size=5000, embed_dim=128, hidden_dim=256)
model = Seq2Seq(enc, dec, device='cpu')
print(f"Seq2Seq parameters: {sum(p.numel() for p in model.parameters()):,}")` },
    { type: 'tip', body: `Teacher forcing accelerates training by using ground-truth previous tokens rather than the model's (possibly wrong) own predictions. Gradually anneal the teacher forcing ratio during training to prevent the model from becoming too dependent on it at test time.` },
    { type: 'exercise', title: 'Build a Number Reversal Seq2Seq', hint: 'Train a seq2seq model to reverse digit sequences: "1 2 3 4 5" → "5 4 3 2 1". This is a classic debugging task for seq2seq — the model must learn to encode the full sequence and decode in reverse.', solution: `import torch, torch.nn as nn, random
import numpy as np

# Generate data: reverse number sequences
def generate_data(n=5000, max_len=8):
    data = []
    for _ in range(n):
        seq_len = random.randint(3, max_len)
        seq = [random.randint(1, 9) for _ in range(seq_len)]
        # Vocab: 0=PAD, 1=SOS, 2=EOS, 3-11=digits 1-9
        src = [i+2 for i in seq]                    # shift by 2 (PAD=0, SOS=1)
        tgt = [1] + [i+2 for i in reversed(seq)] + [2]  # SOS + reversed + EOS
        data.append((src, tgt))
    return data

def pad(seqs, pad_val=0):
    max_len = max(len(s) for s in seqs)
    return [[*s, *[pad_val]*(max_len-len(s))] for s in seqs]

data = generate_data()
print("Sample:", data[0])
print("Src:", data[0][0], "→ Tgt:", data[0][1])
print("(Use Encoder-Decoder from lesson code to train this dataset)")` }
  ]
};

L['nlp-w5-l5'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>The Attention Mechanism</h2>
<p>The encoder-decoder bottleneck forces all source information through a single context vector. For long sequences, the decoder cannot access specific parts of the input it needs for each output token — a translation model must remember an entire sentence in one vector. Attention (Bahdanau et al., 2015) solves this by allowing the decoder to look at all encoder hidden states and decide which are most relevant for each decoding step.</p>
<h3>How Attention Works</h3>
<ol>
  <li><strong>Score:</strong> For each encoder hidden state h_s and decoder state h_t, compute a relevance score: score(h_t, h_s) = h_t · W · h_s</li>
  <li><strong>Softmax:</strong> Normalise scores into attention weights α_{ts} = softmax(scores). They sum to 1 across all source positions.</li>
  <li><strong>Context vector:</strong> Weighted sum of encoder states: c_t = Σ α_{ts} × h_s</li>
  <li><strong>Decode:</strong> Concatenate c_t with decoder state and pass through output layer.</li>
</ol>
<p>The attention weights α_{ts} form a soft alignment matrix — they show which input words the model focuses on when generating each output word. This matrix is directly interpretable and is the precursor to the self-attention in transformers.</p>` },
    { type: 'code', lang: 'python', src: `import torch
import torch.nn as nn
import torch.nn.functional as F

class BahdanauAttention(nn.Module):
    """Additive attention (Bahdanau et al., 2015)."""
    def __init__(self, enc_hid, dec_hid):
        super().__init__()
        self.W_enc  = nn.Linear(enc_hid, dec_hid, bias=False)
        self.W_dec  = nn.Linear(dec_hid, dec_hid, bias=False)
        self.v      = nn.Linear(dec_hid, 1, bias=False)

    def forward(self, enc_out, dec_hidden):
        # enc_out:    (B, T_src, enc_hid)
        # dec_hidden: (B, dec_hid)
        T_src = enc_out.shape[1]
        dec_h = dec_hidden.unsqueeze(1).expand(-1, T_src, -1)  # (B, T_src, dec_hid)
        energy = torch.tanh(self.W_enc(enc_out) + self.W_dec(dec_h))  # (B, T_src, dec_hid)
        scores = self.v(energy).squeeze(-1)                             # (B, T_src)
        weights= F.softmax(scores, dim=1)                               # (B, T_src) — sum to 1
        context= torch.bmm(weights.unsqueeze(1), enc_out).squeeze(1)   # (B, enc_hid)
        return context, weights

# Test
att = BahdanauAttention(enc_hid=256, dec_hid=256)
enc_out = torch.randn(4, 10, 256)   # batch=4, src_len=10, enc_hid=256
dec_h   = torch.randn(4, 256)
ctx, wts = att(enc_out, dec_h)
print(f"Context: {ctx.shape}  Weights: {wts.shape}  Sum: {wts.sum(dim=1).mean():.3f}")` },
    { type: 'code', lang: 'python', src: `# Scaled Dot-Product Attention (foundation of Transformers)
import torch
import torch.nn.functional as F
import math

def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    Q: (B, heads, T_q, d_k)
    K: (B, heads, T_k, d_k)
    V: (B, heads, T_k, d_v)
    Returns: (B, heads, T_q, d_v), (B, heads, T_q, T_k)
    """
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)

    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)

    weights = F.softmax(scores, dim=-1)
    output  = torch.matmul(weights, V)
    return output, weights

# Demo
B, T, d_k, d_v = 2, 8, 64, 64
Q = torch.randn(B, 1, T, d_k)   # 1 attention head
K = torch.randn(B, 1, T, d_k)
V = torch.randn(B, 1, T, d_v)

out, attn = scaled_dot_product_attention(Q, K, V)
print(f"Output: {out.shape}  Attention: {attn.shape}")
print(f"Attention weights sum to 1: {attn.sum(dim=-1).mean():.4f}")` },
    { type: 'tip', body: `The attention weight matrix is one of the best debugging tools for NLP models. If your seq2seq model makes translation errors, visualise the attention heatmap — you can often directly see if the model failed to attend to the correct source words.` },
    { type: 'exercise', title: 'Visualise Attention Weights', hint: 'Train a seq2seq model with Bahdanau attention on a simple task (date format conversion: "January 5, 2024" → "2024-01-05"). Plot the attention heatmap and verify the model attends to the correct source tokens.', solution: `import torch, torch.nn as nn, torch.nn.functional as F
import matplotlib.pyplot as plt
import numpy as np

# Simulate attention weights for visualisation
src_tokens = ['January', '5', ',', '2024']
tgt_tokens = ['2024', '-', '01', '-', '05']

# Hypothetical ideal attention (what a good model should learn)
attn_matrix = np.array([
    [0.0, 0.0, 0.0, 0.95],  # '2024' attends to '2024' in src
    [0.0, 0.0, 0.0, 0.00],  # '-' attends to ','
    [0.95,0.0, 0.0, 0.0 ],  # '01' attends to 'January'
    [0.0, 0.0, 0.0, 0.00],  # '-' attends to ','
    [0.0, 0.95,0.0, 0.0 ],  # '05' attends to '5'
])

fig, ax = plt.subplots(figsize=(6, 5))
im = ax.imshow(attn_matrix, cmap='Blues', aspect='auto')
ax.set_xticks(range(len(src_tokens))); ax.set_xticklabels(src_tokens, fontsize=12)
ax.set_yticks(range(len(tgt_tokens))); ax.set_yticklabels(tgt_tokens, fontsize=12)
ax.set_xlabel('Source'); ax.set_ylabel('Target (generated)')
plt.colorbar(im); plt.title('Attention Weights — Date Conversion')
plt.tight_layout(); plt.savefig('attention_heatmap.png', dpi=150)
print("Attention heatmap saved.")` }
  ]
};

// ─── WEEK 6 — Transformers & BERT ────────────────────────────────────────────

L['nlp-w6-l1'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `<h2>The Transformer Architecture</h2>
<p>The Transformer (Vaswani et al., "Attention is All You Need", 2017) replaced recurrence entirely with self-attention — a mechanism where every token attends to every other token in the sequence simultaneously. This enables full parallelism during training (no sequential dependency) and captures long-range dependencies without the vanishing gradient problem.</p>
<h3>Key Components</h3>
<ul>
  <li><strong>Multi-Head Self-Attention:</strong> Run h parallel attention heads, each learning different relationship patterns. Concatenate and project.</li>
  <li><strong>Feed-Forward Network:</strong> Two linear layers with ReLU in between, applied independently to each position.</li>
  <li><strong>Layer Normalisation:</strong> Applied before (Pre-LN) or after (Post-LN) each sub-layer for training stability.</li>
  <li><strong>Residual Connections:</strong> Skip connections around each sub-layer — critical for training deep transformers.</li>
  <li><strong>Positional Encoding:</strong> Since attention is order-invariant, position information must be injected explicitly via sinusoidal or learned position embeddings.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import torch
import torch.nn as nn
import math

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        assert d_model % n_heads == 0
        self.d_k    = d_model // n_heads
        self.n_heads= n_heads
        self.W_q    = nn.Linear(d_model, d_model)
        self.W_k    = nn.Linear(d_model, d_model)
        self.W_v    = nn.Linear(d_model, d_model)
        self.W_o    = nn.Linear(d_model, d_model)

    def split_heads(self, x):
        B, T, D = x.shape
        return x.view(B, T, self.n_heads, self.d_k).transpose(1, 2)  # (B, h, T, d_k)

    def forward(self, Q, K, V, mask=None):
        B = Q.shape[0]
        Q = self.split_heads(self.W_q(Q))
        K = self.split_heads(self.W_k(K))
        V = self.split_heads(self.W_v(V))

        scores = torch.matmul(Q, K.transpose(-2,-1)) / math.sqrt(self.d_k)
        if mask is not None:
            scores = scores.masked_fill(mask==0, -1e9)
        attn = torch.softmax(scores, dim=-1)
        out  = torch.matmul(attn, V)                          # (B, h, T, d_k)
        out  = out.transpose(1,2).contiguous().view(B, -1, self.n_heads * self.d_k)
        return self.W_o(out), attn

class TransformerBlock(nn.Module):
    def __init__(self, d_model=512, n_heads=8, d_ff=2048, dropout=0.1):
        super().__init__()
        self.attn    = MultiHeadAttention(d_model, n_heads)
        self.ff      = nn.Sequential(nn.Linear(d_model, d_ff), nn.GELU(),
                                      nn.Dropout(dropout), nn.Linear(d_ff, d_model))
        self.norm1   = nn.LayerNorm(d_model)
        self.norm2   = nn.LayerNorm(d_model)
        self.drop    = nn.Dropout(dropout)

    def forward(self, x, mask=None):
        # Pre-LN variant (more stable than post-LN)
        attn_out, _ = self.attn(self.norm1(x), self.norm1(x), self.norm1(x), mask)
        x = x + self.drop(attn_out)
        x = x + self.drop(self.ff(self.norm2(x)))
        return x

block = TransformerBlock(d_model=512, n_heads=8)
x = torch.randn(4, 32, 512)   # batch=4, seq_len=32, d_model=512
print(block(x).shape)          # (4, 32, 512)` },
    { type: 'code', lang: 'python', src: `# Sinusoidal positional encoding
import torch, math
import matplotlib.pyplot as plt

class PositionalEncoding(nn.Module):
    def __init__(self, d_model, max_len=5000, dropout=0.1):
        super().__init__()
        self.drop = nn.Dropout(dropout)
        pe = torch.zeros(max_len, d_model)
        pos = torch.arange(0, max_len).unsqueeze(1).float()
        div = torch.exp(torch.arange(0, d_model, 2).float() * (-math.log(10000) / d_model))
        pe[:, 0::2] = torch.sin(pos * div)
        pe[:, 1::2] = torch.cos(pos * div)
        self.register_buffer('pe', pe.unsqueeze(0))  # (1, max_len, d_model)

    def forward(self, x):
        return self.drop(x + self.pe[:, :x.size(1)])

# Visualise positional encodings
pe_module = PositionalEncoding(d_model=64, max_len=100)
pe_matrix = pe_module.pe[0].detach().numpy()  # (100, 64)

plt.figure(figsize=(10, 4))
plt.imshow(pe_matrix[:50, :32].T, cmap='RdBu', aspect='auto')
plt.colorbar()
plt.xlabel('Position'); plt.ylabel('Embedding dimension')
plt.title('Sinusoidal Positional Encoding (first 50 positions, 32 dims)')
plt.tight_layout(); plt.savefig('pos_encoding.png', dpi=150)` },
    { type: 'tip', body: `The "Attention is All You Need" paper used Post-LayerNorm (LN after residual). Most modern implementations use Pre-LayerNorm (LN before attention), which is more stable and allows training without the learning rate warmup. If you see NaN losses early in training, switch to Pre-LN.` },
    { type: 'exercise', title: 'Build a Mini Transformer Encoder', hint: 'Stack 2 TransformerBlocks with positional encoding to build a small encoder. Process a batch of token IDs (add an embedding layer). Verify the output shape and that gradients flow.', solution: `import torch, torch.nn as nn, math

class MiniTransformerEncoder(nn.Module):
    def __init__(self, vocab_size, d_model=128, n_heads=4, n_layers=2, max_len=512):
        super().__init__()
        self.embed = nn.Embedding(vocab_size, d_model, padding_idx=0)
        self.pos   = PositionalEncoding(d_model, max_len)
        self.layers= nn.ModuleList([TransformerBlock(d_model, n_heads) for _ in range(n_layers)])
        self.norm  = nn.LayerNorm(d_model)
        self.pool  = nn.Linear(d_model, 1)  # learned aggregation

    def forward(self, x):
        out = self.pos(self.embed(x))
        for layer in self.layers:
            out = layer(out)
        out = self.norm(out)
        # [CLS] token approach: use first position as document embedding
        return out[:, 0, :]   # (B, d_model)

enc = MiniTransformerEncoder(vocab_size=10000, d_model=128, n_heads=4, n_layers=2)
x = torch.randint(0, 10000, (8, 64))
out = enc(x)
print(f"Output: {out.shape}")  # (8, 128)
# Check gradients flow
loss = out.sum()
loss.backward()
print("Gradient check passed:", enc.embed.weight.grad is not None)` }
  ]
};

L['nlp-w6-l2'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>BERT: Bidirectional Encoder Representations from Transformers</h2>
<p>BERT (Devlin et al., 2018) is a large transformer encoder pretrained on 3.3B words (Wikipedia + BookCorpus) using two objectives:</p>
<ol>
  <li><strong>Masked Language Model (MLM):</strong> 15% of tokens are randomly masked; the model must predict the original token from context on both sides. This forces true bidirectional context understanding — unlike GPT, which is left-to-right only.</li>
  <li><strong>Next Sentence Prediction (NSP):</strong> Given two sentences, predict whether the second follows the first. (This objective was later found to be less useful — RoBERTa drops it.)</li>
</ol>
<p>BERT-base has 12 transformer layers, 768 hidden dimensions, 12 attention heads, 110M parameters. BERT-large has 24 layers, 1024 dimensions, 16 heads, 340M parameters.</p>
<h3>BERT Tokenisation: WordPiece</h3>
<p>BERT uses WordPiece tokenisation with a 30,522-token vocabulary. Continuation subwords are prefixed with "##". Every input starts with [CLS] and sentences are separated by [SEP].</p>` },
    { type: 'code', lang: 'python', src: `from transformers import BertTokenizer, BertModel
import torch

tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model      = BertModel.from_pretrained('bert-base-uncased')
model.eval()

# Tokenise a sentence pair (as used in classification tasks)
text_a = "The stock market crashed today."
text_b = "Investors are panic selling their portfolios."

encoding = tokenizer(
    text_a, text_b,
    max_length=128,
    padding='max_length',
    truncation=True,
    return_tensors='pt'
)

print("Input IDs:", encoding['input_ids'])
print("Tokens:", tokenizer.convert_ids_to_tokens(encoding['input_ids'][0]))
print("Token type IDs (0=A, 1=B):", encoding['token_type_ids'])
print("Attention mask:", encoding['attention_mask'])

# Forward pass
with torch.no_grad():
    outputs = model(**encoding)

last_hidden = outputs.last_hidden_state   # (1, 128, 768) — contextualised token embeddings
cls_embed   = last_hidden[:, 0, :]        # (1, 768) — [CLS] token = document embedding
pooled      = outputs.pooler_output       # (1, 768) — [CLS] through a dense+tanh layer
print(f"Last hidden shape: {last_hidden.shape}")
print(f"CLS embedding: {cls_embed.shape}")` },
    { type: 'code', lang: 'python', src: `# Contextual word embeddings — how BERT disambiguates polysemy
from transformers import BertTokenizer, BertModel
import torch

tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')
model.eval()

def get_word_embedding(sentence, word, tokenizer, model):
    """Get BERT contextual embedding for a specific word in a sentence."""
    enc = tokenizer(sentence, return_tensors='pt')
    tokens = tokenizer.convert_ids_to_tokens(enc['input_ids'][0])
    with torch.no_grad():
        out = model(**enc).last_hidden_state[0]  # (T, 768)
    # Find the word position
    for i, tok in enumerate(tokens):
        if tok.lower() == word.lower():
            return out[i].numpy()
    return None

sentences = [
    ("I deposited money at the bank.", "bank"),
    ("The picnic was by the river bank.", "bank"),
]

embeddings = [get_word_embedding(s, w, tokenizer, model) for s, w in sentences]
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
if all(e is not None for e in embeddings):
    sim = cosine_similarity([embeddings[0]], [embeddings[1]])[0,0]
    print(f"Cosine similarity of 'bank' in two contexts: {sim:.4f}")
    print("Low similarity = BERT correctly distinguishes the two senses of 'bank'")` },
    { type: 'warn', title: 'BERT Is Encoder-Only', body: `BERT uses only the transformer encoder and is designed for understanding tasks (classification, NER, Q&A). It cannot generate text autoregressively. For text generation use GPT (decoder-only) or T5/BART (encoder-decoder).` },
    { type: 'tip', body: `The 12 BERT layers encode different linguistic levels: lower layers capture syntax (POS, morphology), middle layers capture semantics, upper layers capture task-specific patterns. For sentence similarity, layers 8–12 work best; for syntactic tasks, layers 2–5 are often more informative.` },
    { type: 'exercise', title: 'Extract Sentence Embeddings from Multiple BERT Layers', hint: 'Pass a sentence through BERT with output_hidden_states=True. Compute the cosine similarity between two sentences using embeddings from layers 1, 6, and 12. Which layer gives the best semantic similarity?', solution: `from transformers import BertTokenizer, BertModel
import torch
from sklearn.metrics.pairwise import cosine_similarity

tok = BertTokenizer.from_pretrained('bert-base-uncased')
m   = BertModel.from_pretrained('bert-base-uncased')
m.eval()

pairs = [
    ("The dog barked loudly.", "The canine made a loud noise."),   # semantic paraphrase
    ("The dog barked loudly.", "Stock prices fell sharply today."), # unrelated
]

def get_layer_sim(s1, s2, layer=-1):
    def enc(s):
        e = tok(s, return_tensors='pt')
        with torch.no_grad():
            o = m(**e, output_hidden_states=True)
        return o.hidden_states[layer][:, 0, :].numpy()
    return cosine_similarity(enc(s1), enc(s2))[0,0]

for s1, s2 in pairs:
    print(f"\n'{s1[:30]}' vs '{s2[:30]}'")
    for layer in [1, 6, 12]:
        sim = get_layer_sim(s1, s2, layer=layer)
        print(f"  Layer {layer:2d}: {sim:.4f}")` }
  ]
};

L['nlp-w6-l3'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `<h2>Fine-tuning BERT for Downstream Tasks</h2>
<p>BERT's power comes from fine-tuning: take the pretrained model and add a small task-specific head (usually just a linear layer), then train the entire system end-to-end on your labelled data. Because BERT already knows language deeply, you need far less task-specific data — often just a few hundred labelled examples are sufficient for strong performance.</p>
<h3>Classification Architecture</h3>
<p>For classification, add a linear layer on top of the [CLS] token representation: <code>logits = W × CLS + b</code>. The [CLS] token is designed to aggregate sequence-level information during pretraining. Fine-tune with a low learning rate (2e-5 to 5e-5) to prevent "catastrophic forgetting" of pretrained knowledge.</p>` },
    { type: 'code', lang: 'python', src: `from transformers import (BertTokenizer, BertForSequenceClassification,
                            TrainingArguments, Trainer, DataCollatorWithPadding)
from datasets import Dataset
from sklearn.datasets import fetch_20newsgroups
from sklearn.model_selection import train_test_split
import numpy as np

# Data — 4 categories for speed
data = fetch_20newsgroups(subset='train', remove=('headers','footers','quotes'),
                           categories=['sci.med','sci.space','rec.sport.hockey','rec.autos'])
X_tr, X_val, y_tr, y_val = train_test_split(data.data, data.target, test_size=0.15,
                                              stratify=data.target, random_state=42)

# Tokeniser
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

def tokenise_fn(examples):
    return tokenizer(examples['text'], max_length=256, truncation=True)

train_ds = Dataset.from_dict({'text': X_tr, 'label': y_tr}).map(tokenise_fn, batched=True)
val_ds   = Dataset.from_dict({'text': X_val, 'label': y_val}).map(tokenise_fn, batched=True)

# Model: BERT + classification head (4 classes)
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=4)

# Training arguments
args = TrainingArguments(
    output_dir='./bert_newsgroups',
    num_train_epochs=3,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=32,
    learning_rate=2e-5,
    weight_decay=0.01,
    warmup_ratio=0.1,
    evaluation_strategy='epoch',
    save_strategy='epoch',
    load_best_model_at_end=True,
    metric_for_best_model='accuracy',
    fp16=True,            # Mixed precision — requires GPU
    report_to='none',
)

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = np.argmax(logits, axis=-1)
    return {'accuracy': (preds == labels).mean()}

trainer = Trainer(
    model=model,
    args=args,
    train_dataset=train_ds,
    eval_dataset=val_ds,
    tokenizer=tokenizer,
    data_collator=DataCollatorWithPadding(tokenizer),
    compute_metrics=compute_metrics,
)
trainer.train()` },
    { type: 'code', lang: 'python', src: `# Inference with fine-tuned BERT
from transformers import pipeline

# Load fine-tuned model for inference
classifier = pipeline('text-classification',
                       model='./bert_newsgroups/checkpoint-best',
                       tokenizer='bert-base-uncased',
                       device=0 if torch.cuda.is_available() else -1)

test_texts = [
    "NASA announced a new mission to Mars launching in 2026.",
    "The player scored a hat-trick in the Stanley Cup finals.",
    "The patient was prescribed metformin for type 2 diabetes.",
    "The Ferrari F1 team unveiled their new aerodynamic package.",
]

results = classifier(test_texts, truncation=True, max_length=256)
label_names = ['sci.med','sci.space','rec.sport.hockey','rec.autos']
for text, result in zip(test_texts, results):
    label_id = int(result['label'].split('_')[-1])
    print(f"'{text[:50]}...'")
    print(f"  → {label_names[label_id]} ({result['score']:.3f})")` },
    { type: 'warn', title: 'Fine-tuning Requires a GPU', body: `Fine-tuning BERT-base on even a small dataset (1,000 examples) takes 5–10 minutes on a modern GPU and several hours on CPU. Use Google Colab (free T4 GPU), Kaggle Notebooks, or AWS SageMaker for training. Inference is feasible on CPU for low-throughput applications.` },
    { type: 'exercise', title: 'Fine-tune DistilBERT for Sentiment Analysis', hint: 'Fine-tune distilbert-base-uncased-finetuned-sst-2-english (already pretrained on SST-2) on a small sentiment dataset using the Trainer API. DistilBERT is 40% smaller and 60% faster than BERT-base with 97% of its performance.', solution: `from transformers import (AutoTokenizer, AutoModelForSequenceClassification,
                            TrainingArguments, Trainer, DataCollatorWithPadding)
from datasets import Dataset
import numpy as np

MODEL = 'distilbert-base-uncased'
tok   = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL, num_labels=2)

pos = ["excellent product loved it amazing"] * 100
neg = ["terrible awful waste disappointed"] * 100
texts, labels = pos+neg, [1]*100+[0]*100

from sklearn.model_selection import train_test_split
Xtr,Xval,ytr,yval = train_test_split(texts, labels, test_size=0.2)

def tok_fn(ex): return tok(ex['text'], max_length=64, truncation=True)
tr_ds  = Dataset.from_dict({'text':Xtr,'label':ytr}).map(tok_fn, batched=True)
val_ds = Dataset.from_dict({'text':Xval,'label':yval}).map(tok_fn, batched=True)

args = TrainingArguments('./distilbert_sst', num_train_epochs=3,
                          per_device_train_batch_size=32, learning_rate=5e-5,
                          evaluation_strategy='epoch', report_to='none')
trainer = Trainer(model=model, args=args, train_dataset=tr_ds, eval_dataset=val_ds,
                  tokenizer=tok, data_collator=DataCollatorWithPadding(tok),
                  compute_metrics=lambda p: {'acc': (np.argmax(p[0],-1)==p[1]).mean()})
trainer.train()` }
  ]
};

L['nlp-w6-l4'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>Beyond BERT: RoBERTa, DistilBERT, ALBERT, and Domain-Specific Models</h2>
<p>The BERT paper spawned a wave of variants addressing its limitations. Understanding the trade-offs helps you select the right model for your task.</p>
<h3>RoBERTa (Robustly Optimised BERT)</h3>
<p>Facebook AI found that BERT was significantly under-trained. RoBERTa removes NSP, trains on 10× more data (160GB vs 16GB), uses larger batches, longer sequences, and dynamic masking. It consistently outperforms BERT-base on all GLUE benchmarks. Use RoBERTa as your default when BERT-base is sufficient in size.</p>
<h3>DistilBERT</h3>
<p>Knowledge distillation produces a 40% smaller, 60% faster model that retains 97% of BERT-base performance. The student model is trained to mimic the teacher's output distributions. Ideal for production where inference speed and memory matter.</p>
<h3>ALBERT (A Lite BERT)</h3>
<p>Reduces parameters by: (1) factorising the embedding matrix into smaller matrices, (2) sharing weights across all transformer layers. ALBERT-xxlarge outperforms BERT-large with fewer parameters — but is not faster at inference since depth is unchanged.</p>` },
    { type: 'code', lang: 'python', src: `from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# Loading different model variants — same API, different performance/speed
models_to_compare = {
    'BERT-base':       'bert-base-uncased',
    'RoBERTa-base':    'roberta-base',
    'DistilBERT':      'distilbert-base-uncased',
    'ALBERT-base-v2':  'albert-base-v2',
}

text = "The new iPhone features an excellent camera with computational photography."

for name, model_id in models_to_compare.items():
    try:
        tok   = AutoTokenizer.from_pretrained(model_id)
        model = AutoModelForSequenceClassification.from_pretrained(model_id, num_labels=2)
        enc   = tok(text, return_tensors='pt')
        n_params = sum(p.numel() for p in model.parameters()) / 1e6
        n_tokens = enc['input_ids'].shape[1]
        print(f"{name:20s}  params={n_params:.0f}M  tokens={n_tokens}")
    except Exception as e:
        print(f"{name:20s}  Error: {e}")` },
    { type: 'text', body: `<h3>Domain-Specific BERT Models</h3>
<p>General BERT was pretrained on Wikipedia and books — not ideal for specialised domains. Domain-specific models continue BERT pretraining on domain text, significantly improving performance on domain tasks:</p>
<ul>
  <li><strong>BioBERT:</strong> Medical literature (PubMed + PMC) — better NER for genes, diseases, drugs</li>
  <li><strong>ClinicalBERT:</strong> Clinical notes (MIMIC-III) — handles abbreviations, clinical jargon</li>
  <li><strong>LegalBERT:</strong> Legal text (legislation, court opinions)</li>
  <li><strong>FinBERT:</strong> Financial news and filings — better sentiment on "bullish", "margin compression"</li>
  <li><strong>CodeBERT:</strong> Code and natural language — used for code search and summarisation</li>
  <li><strong>multilingual-BERT:</strong> 104 languages — single model, lower per-language performance</li>
</ul>` },
    { type: 'code', lang: 'python', src: `# Domain-specific model: FinBERT for financial sentiment
from transformers import pipeline

# Load FinBERT — pretrained on financial text
finbert = pipeline('sentiment-analysis',
                    model='ProsusAI/finbert',
                    tokenizer='ProsusAI/finbert',
                    device=-1)

general_bert = pipeline('sentiment-analysis',
                          model='distilbert-base-uncased-finetuned-sst-2-english',
                          device=-1)

financial_texts = [
    "The company reported record earnings beating analyst estimates by 15%.",
    "Management warned of significant margin compression in Q3.",
    "The Fed's hawkish stance rattled bond markets causing yield inversion.",
    "Strong consumer spending data suggests economic resilience.",
]

print(f"{'Text':55} {'FinBERT':20} {'DistilBERT'}")
print("-" * 100)
for text in financial_texts:
    fb = finbert(text[:512])[0]
    db = general_bert(text[:512])[0]
    print(f"{text[:53]:55} {fb['label']:10}({fb['score']:.2f})  {db['label']:10}({db['score']:.2f})")` },
    { type: 'tip', body: `When choosing between general BERT and a domain model, first try the domain model if your text is highly specialised (medical, legal, financial). If you have enough in-domain labelled data (>5,000 examples), fine-tuning general BERT on your data often closes the gap.` },
    { type: 'exercise', title: 'Model Size vs Accuracy Trade-off Analysis', hint: 'Fine-tune BERT-base, DistilBERT, and RoBERTa on the same small dataset (200 examples). Compare: training time, inference time, accuracy, and model file size. Plot accuracy vs inference speed.', solution: `import time
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments, DataCollatorWithPadding
from datasets import Dataset
import numpy as np

texts  = (["positive good great excellent"] * 100 + ["negative bad terrible awful"] * 100)
labels = [1]*100 + [0]*100

results = {}
for name, mid in [('DistilBERT','distilbert-base-uncased'), ('BERT-base','bert-base-uncased')]:
    tok   = AutoTokenizer.from_pretrained(mid)
    model = AutoModelForSequenceClassification.from_pretrained(mid, num_labels=2)
    ds    = Dataset.from_dict({'text': texts, 'label': labels})
    ds    = ds.map(lambda ex: tok(ex['text'], max_length=64, truncation=True), batched=True)
    args  = TrainingArguments(f'./{name}', num_train_epochs=2,
                               per_device_train_batch_size=32, report_to='none')
    trainer = Trainer(model=model, args=args, train_dataset=ds, tokenizer=tok,
                      data_collator=DataCollatorWithPadding(tok))
    t0 = time.time()
    trainer.train()
    train_time = time.time() - t0
    t1 = time.time()
    trainer.predict(ds)
    inf_time = (time.time() - t1) / len(texts) * 1000
    params = sum(p.numel() for p in model.parameters()) / 1e6
    print(f"{name:12s}  params={params:.0f}M  train={train_time:.0f}s  inf={inf_time:.1f}ms/sample")` }
  ]
};

L['nlp-w6-l5'] = {
  duration_mins: 35,
  sections: [
    { type: 'text', body: `<h2>Sentence Transformers and Semantic Search</h2>
<p>BERT's [CLS] token embedding is optimised for next-sentence prediction, not semantic similarity. Using raw BERT embeddings for sentence similarity gives mediocre results. Sentence-BERT (SBERT) fine-tunes BERT using siamese/triplet networks on natural language inference and semantic textual similarity datasets, producing embeddings specifically optimised for similarity tasks.</p>
<h3>SBERT Architecture</h3>
<p>Two identical BERT encoders (shared weights) process two sentences simultaneously. The output embeddings are compared using cosine similarity, and the network is trained with contrastive loss to pull similar sentences together and push dissimilar ones apart.</p>
<p>The resulting embeddings can be precomputed and stored — at query time, find nearest neighbours with cosine similarity or FAISS approximate nearest neighbour search.</p>` },
    { type: 'code', lang: 'python', src: `from sentence_transformers import SentenceTransformer, util
import torch

# SBERT models for different tasks
models = {
    'MiniLM-L6':   'all-MiniLM-L6-v2',      # fastest, 80MB, 384-dim
    'MiniLM-L12':  'all-MiniLM-L12-v2',     # better, 120MB, 384-dim
    'MPNet-base':  'all-mpnet-base-v2',      # best quality, 438MB, 768-dim
    'Multilingual':'paraphrase-multilingual-MiniLM-L12-v2',  # 50 languages
}

model = SentenceTransformer('all-MiniLM-L6-v2')

# Semantic similarity
sentences = [
    "What is machine learning?",
    "Explain the concept of artificial intelligence learning from data.",
    "How do I boil an egg?",
    "What are the steps for cooking a hard-boiled egg?",
]

embeddings = model.encode(sentences, convert_to_tensor=True)

# Pairwise cosine similarities using sentence_transformers utility
cos_scores = util.cos_sim(embeddings, embeddings)
print("Cosine similarity matrix:")
for i in range(len(sentences)):
    for j in range(i+1, len(sentences)):
        print(f"  '{sentences[i][:35]}' vs '{sentences[j][:35]}': {cos_scores[i,j]:.3f}")` },
    { type: 'code', lang: 'python', src: `# Large-scale semantic search with FAISS
# pip install faiss-cpu  (or faiss-gpu for GPU)
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

# Corpus of documents (in production: millions of documents)
corpus = [
    "Python is a high-level programming language known for its simplicity.",
    "Machine learning enables computers to learn patterns from data.",
    "BERT is a transformer-based language model pretrained on large corpora.",
    "Data science combines statistics, programming, and domain expertise.",
    "Neural networks are inspired by the structure of the human brain.",
    "Natural language processing helps computers understand human text.",
    "Deep learning uses multiple layers to learn hierarchical representations.",
    "Gradient descent optimises model parameters by minimising a loss function.",
]

# Encode and build FAISS index
corpus_embeddings = model.encode(corpus, convert_to_numpy=True, normalize_embeddings=True)
dim = corpus_embeddings.shape[1]

index = faiss.IndexFlatIP(dim)   # Inner product (= cosine for normalised vectors)
index.add(corpus_embeddings.astype('float32'))
print(f"FAISS index size: {index.ntotal} vectors of dim {dim}")

# Search
queries = ["How do neural networks learn?", "What programming language for AI?"]
query_embeddings = model.encode(queries, convert_to_numpy=True, normalize_embeddings=True)
D, I = index.search(query_embeddings.astype('float32'), k=3)

for query, distances, indices in zip(queries, D, I):
    print(f"\nQuery: '{query}'")
    for dist, idx in zip(distances, indices):
        print(f"  [{dist:.3f}] {corpus[idx]}")` },
    { type: 'tip', body: `For production semantic search, use <code>faiss.IndexIVFFlat</code> or <code>IndexHNSWFlat</code> for approximate nearest neighbour search over millions of vectors. Exact IndexFlatIP search scales linearly with corpus size — fine for &lt;100K docs, slow for millions.` },
    { type: 'exercise', title: 'Build a Semantic Duplicate Detector', hint: 'Given a list of support tickets (or questions), use SBERT embeddings to find all pairs with cosine similarity > 0.85 (likely duplicates). Group them into clusters using agglomerative clustering.', solution: `from sentence_transformers import SentenceTransformer, util
from sklearn.cluster import AgglomerativeClustering
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')

tickets = [
    "My password doesn't work and I can't log in",
    "I am unable to login with my credentials",
    "The application keeps crashing on startup",
    "App crashes when I open it",
    "How do I reset my forgotten password?",
    "Payment failed when I tried to checkout",
    "My credit card is not being accepted",
    "The application is not launching properly",
]

embeddings = model.encode(tickets, normalize_embeddings=True)
cos_sim = util.cos_sim(embeddings, embeddings).numpy()

# Cluster similar tickets
clustering = AgglomerativeClustering(
    n_clusters=None, distance_threshold=0.3,
    metric='cosine', linkage='average'
)
labels = clustering.fit_predict(1 - cos_sim)  # distance = 1 - cosine_similarity

from collections import defaultdict
clusters = defaultdict(list)
for ticket, label in zip(tickets, labels):
    clusters[label].append(ticket)

print("Ticket clusters (likely duplicates):")
for cluster_id, group in clusters.items():
    if len(group) > 1:
        print(f"\nCluster {cluster_id}:")
        for t in group:
            print(f"  • {t}")` }
  ]
};


// ─── WEEK 7 — Advanced NLP Applications ─────────────────────────────────────

L['nlp-w7-l1'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `<h2>Text Summarisation</h2>
<p>Text summarisation automatically condenses long documents into shorter versions while preserving the most important information. Two broad families exist: <strong>extractive</strong> summarisation selects and concatenates existing sentences; <strong>abstractive</strong> summarisation generates new text that paraphrases the source.</p>
<h3>Extractive Summarisation</h3>
<p>Extractive methods rank sentences by importance and pick the top-k. Classic approaches include:</p>
<ul>
  <li><strong>TF-IDF scoring:</strong> sentences whose words have high TF-IDF in the document score highly.</li>
  <li><strong>TextRank:</strong> a graph algorithm (similar to PageRank) that builds a sentence-similarity graph and ranks sentences by eigenvector centrality.</li>
  <li><strong>LSA (Latent Semantic Analysis):</strong> applies SVD to the term-sentence matrix and uses singular vectors to score sentences.</li>
</ul>
<h3>Abstractive Summarisation</h3>
<p>Modern abstractive summarisers are seq2seq Transformers fine-tuned on paired (document, summary) datasets:</p>
<ul>
  <li><strong>BART</strong> (Lewis et al., 2019) — denoising autoencoder pre-trained by corrupting text and learning to reconstruct it; fine-tuned on CNN/DailyMail.</li>
  <li><strong>T5</strong> (Raffel et al., 2019) — frames all NLP tasks as text-to-text; "summarize: {document}" as input.</li>
  <li><strong>Pegasus</strong> (Zhang et al., 2020) — pre-trained by masking whole sentences (gap-sentence generation), ideally suited for summarisation.</li>
</ul>
<h3>Evaluation</h3>
<p><strong>ROUGE</strong> (Recall-Oriented Understudy for Gisting Evaluation) is the standard metric:</p>
<ul>
  <li>ROUGE-1: unigram overlap between candidate and reference.</li>
  <li>ROUGE-2: bigram overlap.</li>
  <li>ROUGE-L: longest common subsequence.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `# ── Extractive: TextRank with sumy ──────────────────────────────────────────
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.text_rank import TextRankSummarizer

text = """
SpaceX launched its Starship rocket on a test flight that ended in an explosion.
The company said the flight was still a success because they gathered valuable data.
Engineers will use this data to improve future launches.
Starship is designed to carry humans to the Moon and Mars.
NASA has selected Starship as the lunar lander for the Artemis programme.
"""

parser = PlaintextParser.from_string(text, Tokenizer("english"))
summarizer = TextRankSummarizer()
summary = summarizer(parser.document, sentences_count=2)
for sentence in summary:
    print(sentence)

# ── Abstractive: BART via HuggingFace ───────────────────────────────────────
from transformers import pipeline

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
result = summarizer(text, max_length=60, min_length=20, do_sample=False)
print(result[0]["summary_text"])

# ── ROUGE evaluation ─────────────────────────────────────────────────────────
from rouge_score import rouge_scorer

scorer = rouge_scorer.RougeScorer(["rouge1", "rouge2", "rougeL"], use_stemmer=True)
reference = "SpaceX's Starship exploded but provided data for future flights."
candidate = result[0]["summary_text"]
scores = scorer.score(reference, candidate)
for k, v in scores.items():
    print(f"{k}: P={v.precision:.3f} R={v.recall:.3f} F={v.fmeasure:.3f}")` },
    { type: 'tip', body: 'For long documents (>1024 tokens), use chunking strategies or longform models like LED (Longformer Encoder-Decoder) which handle up to 16,384 tokens.' },
    { type: 'exercise', title: 'Summarise a Wikipedia Article', hint: 'Fetch the Wikipedia intro for any topic using the `wikipedia` library, then apply BART summarisation. Compute ROUGE against the first sentence as a pseudo-reference.', solution: `import wikipedia
from transformers import pipeline
from rouge_score import rouge_scorer

wiki = wikipedia.summary("Transformer (machine learning model)", sentences=10)
pipe = pipeline("summarization", model="facebook/bart-large-cnn")
out = pipe(wiki, max_length=80, min_length=30, do_sample=False)[0]["summary_text"]
print("Summary:", out)

ref = wikipedia.summary("Transformer (machine learning model)", sentences=1)
scorer = rouge_scorer.RougeScorer(["rouge1","rougeL"], use_stemmer=True)
scores = scorer.score(ref, out)
print(scores)` }
  ]
};

L['nlp-w7-l2'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>Machine Translation</h2>
<p>Machine Translation (MT) automatically converts text from one language (source) to another (target). It is one of the oldest and most commercially successful NLP tasks, powering Google Translate, DeepL, and real-time caption translation.</p>
<h3>A Brief History</h3>
<ul>
  <li><strong>Rule-based MT (RBMT):</strong> hand-crafted bilingual dictionaries and grammar rules. Precise but brittle and expensive to build.</li>
  <li><strong>Statistical MT (SMT):</strong> learns phrase-to-phrase mappings from parallel corpora using language models and phrase tables (Moses toolkit). Dominated 2000–2016.</li>
  <li><strong>Neural MT (NMT):</strong> end-to-end seq2seq with attention (Bahdanau 2015). Replaced SMT in industry by 2017.</li>
  <li><strong>Transformer-based NMT:</strong> current SOTA. Helsinki-NLP/opus-mt models, M2M-100, NLLB-200 (No Language Left Behind).</li>
</ul>
<h3>How NMT Works</h3>
<p>A Transformer encoder maps source tokens to contextual representations. The decoder generates target tokens autoregressively, attending over encoder outputs via cross-attention. Training minimises cross-entropy over gold target sequences.</p>
<h3>Key Challenges</h3>
<ul>
  <li><strong>Low-resource languages:</strong> scarce parallel data. Mitigated by multilingual models and back-translation (translate monolingual target text back to source to synthesise parallel pairs).</li>
  <li><strong>Domain shift:</strong> a model trained on news performs poorly on legal or medical text. Fine-tune on domain-specific parallel data.</li>
  <li><strong>Evaluation:</strong> BLEU score measures n-gram precision against human references but correlates imperfectly with human judgement.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `# ── Translation with Helsinki-NLP opus-mt ───────────────────────────────────
from transformers import pipeline

# English → French
translator = pipeline("translation_en_to_fr",
                      model="Helsinki-NLP/opus-mt-en-fr")
texts = [
    "Machine translation has improved dramatically since neural networks.",
    "The model attends over encoder outputs using cross-attention."
]
results = translator(texts, max_length=256)
for src, res in zip(texts, results):
    print(f"EN: {src}")
    print(f"FR: {res['translation_text']}\n")

# ── BLEU evaluation ──────────────────────────────────────────────────────────
from sacrebleu.metrics import BLEU

bleu = BLEU()
hypothesis = ["Le modèle assiste les sorties de l'encodeur par une attention croisée."]
references  = [["Le modèle attend les sorties de l'encodeur via l'attention croisée."]]
score = bleu.corpus_score(hypothesis, references)
print(score)

# ── Batch translation with progress ─────────────────────────────────────────
from tqdm import tqdm

def batch_translate(texts, pipe, batch_size=16):
    results = []
    for i in tqdm(range(0, len(texts), batch_size)):
        batch = texts[i:i+batch_size]
        out   = pipe(batch, max_length=256)
        results.extend([r["translation_text"] for r in out])
    return results` },
    { type: 'warn', title: 'BLEU Limitations', body: 'BLEU only measures surface n-gram overlap. A translation can be semantically correct but score low if phrasing differs. Use COMET or chrF++ for more human-correlated evaluation in production.' },
    { type: 'exercise', title: 'Round-Trip Translation', hint: 'Translate a sentence EN→DE→EN using two Helsinki-NLP models. Measure BLEU between the original and the round-tripped sentence.', solution: `from transformers import pipeline
from sacrebleu.metrics import BLEU

en_de = pipeline("translation_en_to_de", model="Helsinki-NLP/opus-mt-en-de")
de_en = pipeline("translation_de_to_en", model="Helsinki-NLP/opus-mt-de-en")

original = "Deep learning has transformed natural language processing."
german   = en_de(original)[0]["translation_text"]
back     = de_en(german)[0]["translation_text"]
print("Original:", original)
print("German:  ", german)
print("Back:    ", back)

bleu = BLEU(effective_order=True)
print(bleu.sentence_score(back, [original]))` }
  ]
};

L['nlp-w7-l3'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `<h2>Question Answering</h2>
<p>Question Answering (QA) systems return a precise answer to a natural language question. Three broad paradigms exist: <strong>extractive QA</strong> (span extraction from a context passage), <strong>generative QA</strong> (free-form answer generation), and <strong>open-domain QA</strong> (retrieval + reading comprehension over a large corpus).</p>
<h3>Extractive QA</h3>
<p>Given a passage and a question, the model predicts start and end token positions of the answer span. SQuAD (Stanford Question Answering Dataset) is the standard benchmark. BERT fine-tuned on SQuAD was the first model to surpass human performance on this task.</p>
<p>Architecture: add two linear heads over the BERT [CLS]-less token representations — one for start logits, one for end logits. Answer = argmax(start) to argmax(end).</p>
<h3>Open-Domain QA (Retrieval-Augmented Generation)</h3>
<p>When no context passage is given, a retriever first fetches relevant documents from a large corpus (Wikipedia), then a reader extracts or generates the answer. This is called <strong>Retrieval-Augmented Generation (RAG)</strong>:</p>
<ol>
  <li>Encode question with a dense retriever (DPR — Dense Passage Retrieval).</li>
  <li>Retrieve top-k passages from a FAISS index of document embeddings.</li>
  <li>Pass question + retrieved passages to a generative model (RAG-Token or RAG-Sequence).</li>
</ol>
<h3>Evaluation Metrics</h3>
<ul>
  <li><strong>Exact Match (EM):</strong> 1 if prediction exactly matches any gold answer after normalisation.</li>
  <li><strong>F1:</strong> token-level overlap between prediction and gold answer.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `# ── Extractive QA with HuggingFace pipeline ─────────────────────────────────
from transformers import pipeline

qa = pipeline("question-answering",
              model="deepset/roberta-base-squad2")

context = """
The Transformer architecture was introduced in the paper
'Attention is All You Need' by Vaswani et al. in 2017.
It relies entirely on attention mechanisms, dispensing with
recurrence and convolutions. The model consists of an encoder
and a decoder, each with multi-head self-attention layers.
"""

questions = [
    "Who introduced the Transformer architecture?",
    "What year was it introduced?",
    "What does the Transformer rely on instead of recurrence?"
]

for q in questions:
    result = qa(question=q, context=context)
    print(f"Q: {q}")
    print(f"A: {result['answer']}  (score: {result['score']:.3f})\n")

# ── Simple RAG demo ──────────────────────────────────────────────────────────
from sentence_transformers import SentenceTransformer
import faiss, numpy as np

docs = [
    "The Transformer was introduced in 2017 by Vaswani et al.",
    "BERT uses masked language modelling for pre-training.",
    "GPT-3 has 175 billion parameters and uses autoregressive LM.",
    "T5 frames all NLP tasks as text-to-text problems.",
]

model = SentenceTransformer("all-MiniLM-L6-v2")
doc_embs = model.encode(docs, convert_to_numpy=True).astype("float32")

index = faiss.IndexFlatIP(doc_embs.shape[1])
faiss.normalize_L2(doc_embs)
index.add(doc_embs)

question = "What is the size of GPT-3?"
q_emb = model.encode([question], convert_to_numpy=True).astype("float32")
faiss.normalize_L2(q_emb)
_, I = index.search(q_emb, k=2)
retrieved = [docs[i] for i in I[0]]
print("Retrieved:", retrieved)

# Pass retrieved docs + question to QA model
full_context = " ".join(retrieved)
print(qa(question=question, context=full_context))` },
    { type: 'tip', body: 'For production RAG, use LangChain or LlamaIndex to handle document chunking, metadata filtering, and retrieval pipelines with multiple vector stores.' },
    { type: 'exercise', title: 'Custom QA System', hint: 'Build a QA system over a short document of your choice (e.g., a Wikipedia intro paragraph). Ask 3 questions and print answers with confidence scores.', solution: `from transformers import pipeline

qa = pipeline("question-answering", model="deepset/roberta-base-squad2")
context = """
Python is a high-level, general-purpose programming language created by
Guido van Rossum and first released in 1991. Python's design philosophy
emphasises code readability. It supports multiple programming paradigms,
including structured, object-oriented, and functional programming.
"""
qs = ["Who created Python?", "When was Python first released?",
      "What paradigms does Python support?"]
for q in qs:
    r = qa(question=q, context=context)
    print(f"Q: {q}\nA: {r['answer']} ({r['score']:.2f})\n")` }
  ]
};

L['nlp-w7-l4'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>Sentiment Analysis at Scale</h2>
<p>Sentiment analysis classifies the emotional polarity of text — positive, negative, or neutral. At scale this means processing millions of reviews, tweets, or support tickets efficiently and reliably.</p>
<h3>Approaches</h3>
<ul>
  <li><strong>Lexicon-based:</strong> count positive/negative words from a sentiment dictionary (VADER, SentiWordNet). Fast, no training, works on short informal text.</li>
  <li><strong>Traditional ML:</strong> TF-IDF features + logistic regression or SVM. Good baseline, interpretable.</li>
  <li><strong>Fine-tuned Transformers:</strong> BERT/RoBERTa fine-tuned on SST-2 or IMDb. State-of-the-art accuracy but heavier inference cost.</li>
</ul>
<h3>Aspect-Based Sentiment Analysis (ABSA)</h3>
<p>Instead of a document-level label, ABSA extracts sentiments for specific <em>aspects</em> of a product or service. For example, "The food was great but the service was slow" has positive sentiment toward food and negative toward service.</p>
<h3>Scaling Challenges</h3>
<ul>
  <li><strong>Throughput:</strong> batch inference, ONNX export, quantisation.</li>
  <li><strong>Multilingual:</strong> XLM-R or multilingual-BERT for cross-lingual sentiment.</li>
  <li><strong>Domain shift:</strong> a model trained on movie reviews may underperform on financial news — fine-tune on domain data or use domain-specific models (FinBERT).</li>
  <li><strong>Negation and sarcasm:</strong> "not bad at all" is positive; sarcasm requires broader context.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import pandas as pd
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from transformers import pipeline
from tqdm import tqdm

# ── VADER (lexicon-based) ────────────────────────────────────────────────────
vader = SentimentIntensityAnalyzer()
texts = [
    "Absolutely loved it! Best purchase ever.",
    "Total waste of money. Broke after two days.",
    "It's okay, nothing special.",
    "Not bad at all — surprisingly good for the price.",
]
for t in texts:
    scores = vader.polarity_scores(t)
    label  = "POS" if scores["compound"] >= 0.05 else \
             "NEG" if scores["compound"] <= -0.05 else "NEU"
    print(f"[{label}] {scores['compound']:.3f}  {t}")

# ── Transformer-based (batched) ──────────────────────────────────────────────
clf = pipeline("sentiment-analysis",
               model="distilbert-base-uncased-finetuned-sst-2-english",
               truncation=True, max_length=512)

def batch_predict(texts, pipe, batch_size=32):
    results = []
    for i in tqdm(range(0, len(texts), batch_size)):
        results.extend(pipe(texts[i:i+batch_size]))
    return results

# Simulate large dataset
large_corpus = texts * 250  # 1000 reviews
preds = batch_predict(large_corpus, clf)
df = pd.DataFrame(preds)
print(df["label"].value_counts(normalize=True))

# ── Aspect-level with PyABSA ─────────────────────────────────────────────────
# pip install pyabsa
from pyabsa import AspectTermExtraction as ATEPC

extractor = ATEPC.AspectExtractor("multilingual", auto_device=True)
sentence = "The camera quality is excellent but the battery life is terrible."
results = extractor.predict([sentence], pred_sentiment=True)
for res in results[0]["aspect"]:
    print(res)` },
    { type: 'warn', title: 'Class Imbalance', body: 'Real-world review datasets are often skewed (mostly positive). Evaluate with macro-F1, not accuracy, and consider oversampling negative examples or using class weights during fine-tuning.' },
    { type: 'exercise', title: 'Sentiment Dashboard', hint: 'Load the HuggingFace `datasets` IMDb dataset (25k train). Fine-tune DistilBERT for 1 epoch and compare macro-F1 against VADER on the test split.', solution: `from datasets import load_dataset
from transformers import (AutoTokenizer, AutoModelForSequenceClassification,
                          TrainingArguments, Trainer)
import numpy as np
from sklearn.metrics import f1_score

ds = load_dataset("imdb")
tok = AutoTokenizer.from_pretrained("distilbert-base-uncased")

def tokenize(batch):
    return tok(batch["text"], truncation=True, max_length=256, padding="max_length")

ds = ds.map(tokenize, batched=True)
ds = ds.rename_column("label", "labels")
ds.set_format("torch", columns=["input_ids","attention_mask","labels"])

model = AutoModelForSequenceClassification.from_pretrained(
    "distilbert-base-uncased", num_labels=2)

args = TrainingArguments(output_dir="imdb-distilbert",
                         num_train_epochs=1, per_device_train_batch_size=32,
                         per_device_eval_batch_size=64, evaluation_strategy="epoch")

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = np.argmax(logits, axis=-1)
    return {"macro_f1": f1_score(labels, preds, average="macro")}

trainer = Trainer(model=model, args=args,
                  train_dataset=ds["train"], eval_dataset=ds["test"],
                  compute_metrics=compute_metrics)
trainer.train()
print(trainer.evaluate())` }
  ]
};

L['nlp-w7-l5'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `<h2>Topic Modelling with LDA</h2>
<p>Topic modelling is an unsupervised technique that discovers latent themes (topics) in a collection of documents. <strong>Latent Dirichlet Allocation (LDA)</strong> is the most widely used probabilistic topic model.</p>
<h3>LDA Generative Model</h3>
<p>LDA assumes each document is a mixture of topics, and each topic is a distribution over words. The generative story:</p>
<ol>
  <li>For each document d, draw a topic distribution θ_d ~ Dirichlet(α).</li>
  <li>For each word position in d, draw a topic z ~ Categorical(θ_d).</li>
  <li>Draw a word w ~ Categorical(β_z), where β_z is the word distribution for topic z.</li>
</ol>
<p>Inference recovers θ (document-topic) and β (topic-word) matrices from observed words using variational EM or collapsed Gibbs sampling.</p>
<h3>Hyperparameters</h3>
<ul>
  <li><strong>K (number of topics):</strong> must be chosen. Use coherence scores (c_v) to select K.</li>
  <li><strong>α (document-topic Dirichlet prior):</strong> low α → each document focuses on few topics.</li>
  <li><strong>η (topic-word Dirichlet prior):</strong> low η → each topic focuses on few words.</li>
</ul>
<h3>Alternatives</h3>
<ul>
  <li><strong>NMF (Non-negative Matrix Factorisation):</strong> factorises TF-IDF matrix; faster, often interpretable.</li>
  <li><strong>BERTopic:</strong> clusters BERT sentence embeddings using UMAP + HDBSCAN, then extracts topic keywords with c-TF-IDF. State-of-the-art coherence on modern benchmarks.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `import gensim
import gensim.corpora as corpora
from gensim.models import LdaModel, CoherenceModel
from gensim.utils import simple_preprocess
import nltk
from nltk.corpus import stopwords

nltk.download("stopwords", quiet=True)
stop_words = set(stopwords.words("english"))

# ── Prepare data ─────────────────────────────────────────────────────────────
docs = [
    "machine learning algorithms optimise model parameters using gradient descent",
    "neural networks learn representations through backpropagation",
    "deep learning requires large amounts of training data",
    "climate change increases global temperatures and sea levels",
    "renewable energy sources include solar wind and hydropower",
    "carbon emissions from fossil fuels cause greenhouse gas warming",
    "basketball teams compete in the NBA playoffs every spring",
    "soccer players train for stamina speed and tactical positioning",
    "the Olympics feature athletes from over two hundred countries",
]

def preprocess(text):
    tokens = simple_preprocess(text)
    return [t for t in tokens if t not in stop_words and len(t) > 2]

tokenized = [preprocess(d) for d in docs]
id2word   = corpora.Dictionary(tokenized)
id2word.filter_extremes(no_below=2, no_above=0.9)
corpus    = [id2word.doc2bow(t) for t in tokenized]

# ── Train LDA ────────────────────────────────────────────────────────────────
lda = LdaModel(corpus=corpus, id2word=id2word,
               num_topics=3, random_state=42,
               passes=20, alpha="auto", eta="auto")

print("Topics:")
for i, topic in lda.print_topics(num_words=5):
    print(f"  Topic {i}: {topic}")

# ── Coherence score ──────────────────────────────────────────────────────────
coherence = CoherenceModel(model=lda, texts=tokenized,
                           dictionary=id2word, coherence="c_v")
print(f"\nCoherence (c_v): {coherence.get_coherence():.4f}")

# ── Infer topic for new doc ──────────────────────────────────────────────────
new_doc  = "transformer models process sequences using attention"
new_bow  = id2word.doc2bow(preprocess(new_doc))
topics   = lda.get_document_topics(new_bow)
dominant = max(topics, key=lambda x: x[1])
print(f"\nDominant topic: {dominant[0]} (prob={dominant[1]:.3f})")

# ── BERTopic (modern alternative) ───────────────────────────────────────────
# pip install bertopic
from bertopic import BERTopic
topic_model = BERTopic(nr_topics=3, verbose=False)
topics_b, _ = topic_model.fit_transform(docs)
print("\nBERTopic topic info:")
print(topic_model.get_topic_info())` },
    { type: 'tip', body: 'To choose K for LDA, train models for K=5,10,15,...,50 and plot coherence vs K. The elbow or peak is your best K. BERTopic automatically selects the number of topics via HDBSCAN min_cluster_size.' },
    { type: 'exercise', title: 'Topic Model on 20 Newsgroups', hint: 'Load `20newsgroups` from sklearn (4 categories). Train LDA with K=4. Print top words per topic and compute coherence. Do the topics align with the categories?', solution: `from sklearn.datasets import fetch_20newsgroups
from gensim.models import LdaModel, CoherenceModel
import gensim.corpora as corpora
from gensim.utils import simple_preprocess
from nltk.corpus import stopwords
import nltk; nltk.download("stopwords", quiet=True)

cats = ["rec.sport.hockey","sci.space","talk.politics.guns","comp.graphics"]
data = fetch_20newsgroups(subset="train", categories=cats,
                          remove=("headers","footers","quotes"))
stop_words = set(stopwords.words("english"))

def preprocess(text):
    return [t for t in simple_preprocess(text)
            if t not in stop_words and len(t) > 2]

tokenized = [preprocess(d) for d in data.data[:500]]
id2word   = corpora.Dictionary(tokenized)
id2word.filter_extremes(no_below=5, no_above=0.5)
corpus    = [id2word.doc2bow(t) for t in tokenized]

lda = LdaModel(corpus=corpus, id2word=id2word, num_topics=4,
               random_state=0, passes=10)
for i, t in lda.print_topics(num_words=8):
    print(f"Topic {i}: {t}")

coh = CoherenceModel(model=lda, texts=tokenized,
                     dictionary=id2word, coherence="c_v")
print(f"Coherence: {coh.get_coherence():.4f}")` }
  ]
};

// ─── WEEK 8 — Production NLP & Capstone ──────────────────────────────────────

L['nlp-w8-l1'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>NLP in Production</h2>
<p>Moving an NLP model from a Jupyter notebook to a production system involves a set of engineering concerns that go well beyond model accuracy. This lesson covers the full lifecycle: containerisation, batching, latency targets, and reliability patterns.</p>
<h3>Common Production Patterns</h3>
<ul>
  <li><strong>Synchronous REST API:</strong> client sends a POST request, waits for the model to return a response. Suitable for low-latency, interactive features (autocomplete, search).</li>
  <li><strong>Asynchronous queue:</strong> requests go into a queue (Kafka, RabbitMQ, SQS). Workers consume and process them. Suitable for batch jobs (nightly sentiment analysis of customer reviews).</li>
  <li><strong>Streaming:</strong> input tokens arrive as a stream; model generates output tokens incrementally (LLM chat interfaces).</li>
</ul>
<h3>Key Engineering Concerns</h3>
<ul>
  <li><strong>Latency:</strong> p50/p95/p99. Transformer inference is O(n²) in sequence length. Use truncation, shorter models, or caching.</li>
  <li><strong>Throughput:</strong> batching amortises fixed per-request overhead. Dynamic batching groups requests in a time window.</li>
  <li><strong>Memory:</strong> large models exceed GPU RAM. Use model parallelism, 8-bit quantisation, or smaller distilled variants.</li>
  <li><strong>Reproducibility:</strong> pin model versions and tokeniser versions. A tokeniser update can silently break model outputs.</li>
  <li><strong>Graceful degradation:</strong> if the model service is down, fall back to a lexicon-based or cached response rather than returning a 500 error.</li>
</ul>
<h3>Infrastructure Stack</h3>
<table>
  <tr><th>Layer</th><th>Tool</th></tr>
  <tr><td>Model serving</td><td>FastAPI, TorchServe, Triton Inference Server</td></tr>
  <tr><td>Containerisation</td><td>Docker, Kubernetes</td></tr>
  <tr><td>Feature store</td><td>Redis, Feast</td></tr>
  <tr><td>Monitoring</td><td>Prometheus + Grafana, Evidently AI</td></tr>
  <tr><td>CI/CD</td><td>GitHub Actions, MLflow, DVC</td></tr>
</table>` },
    { type: 'code', lang: 'python', src: `# ── Docker-ready project layout ──────────────────────────────────────────────
"""
nlp-service/
├── app/
│   ├── __init__.py
│   ├── main.py          ← FastAPI app
│   ├── model.py         ← model loading + inference
│   └── schemas.py       ← Pydantic request/response models
├── Dockerfile
├── requirements.txt
└── tests/
    └── test_api.py
"""

# app/model.py
from transformers import pipeline
import threading

_lock  = threading.Lock()
_model = None

def get_model():
    global _model
    if _model is None:
        with _lock:
            if _model is None:             # double-checked locking
                _model = pipeline(
                    "sentiment-analysis",
                    model="distilbert-base-uncased-finetuned-sst-2-english",
                    device=-1              # CPU; use 0 for GPU
                )
    return _model

def predict(texts: list[str]) -> list[dict]:
    model = get_model()
    return model(texts, truncation=True, max_length=512)

# ── Dockerfile ────────────────────────────────────────────────────────────────
dockerfile = """
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app/ ./app/
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
"""

# ── requirements.txt ─────────────────────────────────────────────────────────
requirements = """
fastapi==0.111.0
uvicorn[standard]==0.29.0
transformers==4.41.0
torch==2.3.0
pydantic==2.7.0
"""

print("Build: docker build -t nlp-service .")
print("Run:   docker run -p 8000:8000 nlp-service")` },
    { type: 'tip', body: 'Use `--model-cache` volume mounts in Docker so model weights are not re-downloaded on every container restart. Map `/root/.cache/huggingface` to a host directory.' },
    { type: 'exercise', title: 'Health Check Endpoint', hint: 'Add a `/health` endpoint to a FastAPI app that returns the model status and the version of the transformers library installed.', solution: `from fastapi import FastAPI
import transformers, torch

app = FastAPI()

@app.get("/health")
def health():
    return {
        "status": "ok",
        "transformers_version": transformers.__version__,
        "torch_version": torch.__version__,
        "cuda_available": torch.cuda.is_available(),
    }` }
  ]
};

L['nlp-w8-l2'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `<h2>Serving NLP Models with FastAPI</h2>
<p>FastAPI is the standard choice for Python ML APIs: async by design, automatic OpenAPI docs, Pydantic validation, and excellent performance with uvicorn. This lesson builds a complete, production-quality NLP serving layer.</p>
<h3>Design Principles</h3>
<ul>
  <li><strong>Load model at startup</strong> — not per-request. Use FastAPI lifespan context managers (FastAPI ≥ 0.95) or the deprecated startup event.</li>
  <li><strong>Validate inputs with Pydantic</strong> — reject malformed requests before they reach the model.</li>
  <li><strong>Return structured responses</strong> — include the model name, version, and inference time so clients can debug.</li>
  <li><strong>Implement dynamic batching</strong> — collect requests for 10–50 ms, batch them, run one forward pass, scatter results.</li>
  <li><strong>Set timeouts</strong> — a hanging model shouldn't block the event loop. Run inference in a thread pool.</li>
</ul>
<h3>Concurrency Model</h3>
<p>FastAPI is async (ASGI), but most ML frameworks (PyTorch, HuggingFace) are synchronous. Run inference in a thread pool using <code>asyncio.get_event_loop().run_in_executor()</code> or FastAPI's built-in <code>BackgroundTasks</code> to avoid blocking the event loop.</p>` },
    { type: 'code', lang: 'python', src: `# app/main.py — full production FastAPI NLP service
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from transformers import pipeline
import asyncio, time, logging
from concurrent.futures import ThreadPoolExecutor

logger  = logging.getLogger("nlp-service")
_pool   = ThreadPoolExecutor(max_workers=4)
_models = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # ── startup ──────────────────────────────────────────────────────────────
    logger.info("Loading models...")
    _models["sentiment"] = pipeline(
        "sentiment-analysis",
        model="distilbert-base-uncased-finetuned-sst-2-english",
        truncation=True, max_length=512
    )
    _models["ner"] = pipeline(
        "ner",
        model="dslim/bert-base-NER",
        aggregation_strategy="simple"
    )
    logger.info("Models ready.")
    yield
    # ── shutdown ─────────────────────────────────────────────────────────────
    _pool.shutdown(wait=False)

app = FastAPI(title="NLP Service", version="1.0.0", lifespan=lifespan)

# ── Schemas ──────────────────────────────────────────────────────────────────
class TextRequest(BaseModel):
    texts: list[str] = Field(..., min_length=1, max_length=64,
                             description="List of texts to process")

class SentimentResult(BaseModel):
    label: str
    score: float

class NEREntity(BaseModel):
    word: str; label: str; score: float; start: int; end: int

# ── Endpoints ────────────────────────────────────────────────────────────────
@app.post("/sentiment", response_model=list[SentimentResult])
async def sentiment(req: TextRequest):
    if not _models.get("sentiment"):
        raise HTTPException(503, "Model not ready")
    t0   = time.perf_counter()
    loop = asyncio.get_event_loop()
    results = await loop.run_in_executor(
        _pool, lambda: _models["sentiment"](req.texts)
    )
    logger.info(f"sentiment batch={len(req.texts)} t={time.perf_counter()-t0:.3f}s")
    return [SentimentResult(**r) for r in results]

@app.post("/ner", response_model=list[list[NEREntity]])
async def ner(req: TextRequest):
    loop = asyncio.get_event_loop()
    results = await loop.run_in_executor(
        _pool, lambda: _models["ner"](req.texts)
    )
    return [[NEREntity(word=e["word"], label=e["entity_group"],
                       score=e["score"], start=e["start"], end=e["end"])
             for e in doc] for doc in results]

@app.get("/health")
def health():
    return {"status": "ok", "models": list(_models.keys())}` },
    { type: 'code', lang: 'python', src: `# ── Test with httpx ──────────────────────────────────────────────────────────
import httpx, asyncio

async def test():
    async with httpx.AsyncClient(base_url="http://localhost:8000") as client:
        # health
        r = await client.get("/health")
        print(r.json())

        # sentiment
        r = await client.post("/sentiment", json={
            "texts": ["Amazing product!", "Terrible experience."]
        })
        print(r.json())

        # NER
        r = await client.post("/ner", json={
            "texts": ["Elon Musk founded SpaceX in 2002 in California."]
        })
        print(r.json())

asyncio.run(test())

# ── Load test with locust ─────────────────────────────────────────────────────
# locustfile.py
"""
from locust import HttpUser, task, between
class NLPUser(HttpUser):
    wait_time = between(0.1, 0.5)
    @task
    def sentiment(self):
        self.client.post("/sentiment",
            json={"texts": ["This product works great."] * 8})
"""
# Run: locust -f locustfile.py --headless -u 50 -r 10 -t 60s --host http://localhost:8000` },
    { type: 'exercise', title: 'Add a Summarisation Endpoint', hint: 'Extend the FastAPI app above with a `/summarize` endpoint using BART. Validate that input texts are at least 100 characters. Return summary text and inference time.', solution: `from fastapi import FastAPI
from pydantic import BaseModel, Field, field_validator
from transformers import pipeline
import time, asyncio
from concurrent.futures import ThreadPoolExecutor

app  = FastAPI()
pool = ThreadPoolExecutor(max_workers=2)
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

class SumRequest(BaseModel):
    texts: list[str] = Field(..., max_length=16)
    @field_validator("texts")
    @classmethod
    def min_length_check(cls, v):
        for t in v:
            if len(t) < 100:
                raise ValueError("Each text must be >= 100 characters")
        return v

class SumResponse(BaseModel):
    summary: str
    inference_ms: float

@app.post("/summarize", response_model=list[SumResponse])
async def summarize(req: SumRequest):
    loop = asyncio.get_event_loop()
    t0   = time.perf_counter()
    outs = await loop.run_in_executor(pool, lambda: summarizer(
        req.texts, max_length=100, min_length=20, do_sample=False))
    elapsed = (time.perf_counter() - t0) * 1000
    return [SumResponse(summary=o["summary_text"], inference_ms=elapsed/len(outs))
            for o in outs]` }
  ]
};

L['nlp-w8-l3'] = {
  duration_mins: 45,
  sections: [
    { type: 'text', body: `<h2>Model Optimisation: Quantisation and Distillation</h2>
<p>Large Transformer models are accurate but slow and memory-hungry. Two complementary techniques shrink them for production: <strong>quantisation</strong> reduces numerical precision; <strong>knowledge distillation</strong> trains a smaller student model to mimic a larger teacher.</p>
<h3>Quantisation</h3>
<p>Standard model weights are stored as 32-bit floats (FP32). Quantisation converts them to lower precision:</p>
<ul>
  <li><strong>INT8 (8-bit integer):</strong> 4× smaller than FP32. Minimal accuracy loss on most NLP tasks. Supported natively by CPU inference engines.</li>
  <li><strong>INT4 (4-bit):</strong> used in LLM serving (GPTQ, GGUF). More aggressive; may require quantisation-aware training (QAT).</li>
  <li><strong>Dynamic quantisation:</strong> weights quantised statically; activations quantised at runtime. Easy to apply, no calibration data needed.</li>
  <li><strong>Static quantisation:</strong> both weights and activations quantised using calibration data. Higher throughput but requires a representative dataset.</li>
</ul>
<h3>Knowledge Distillation</h3>
<p>Train a small <em>student</em> model to reproduce the <em>teacher's</em> soft probability outputs (logits), not just the hard labels. The KL-divergence between teacher and student distributions is added to the standard cross-entropy loss:</p>
<pre>L = α · CE(y_hard, student_logits) + (1-α) · KL(teacher_soft / T, student_soft / T)</pre>
<p>T (temperature) > 1 softens the teacher's distribution, revealing more information about class relationships. DistilBERT was distilled from BERT-base: 40% smaller, 60% faster, 97% of accuracy.</p>
<h3>ONNX Export</h3>
<p>Export a HuggingFace model to ONNX format for hardware-accelerated inference via ONNX Runtime (CPU) or TensorRT (GPU). ONNX removes Python overhead and enables graph-level optimisations (operator fusion, constant folding).</p>` },
    { type: 'code', lang: 'python', src: `import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import time, numpy as np

model_name = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer  = AutoTokenizer.from_pretrained(model_name)
model      = AutoModelForSequenceClassification.from_pretrained(model_name)
model.eval()

texts = ["I really enjoyed this movie, it was fantastic!",
         "The product broke after one week, very disappointing."] * 50

inputs = tokenizer(texts, return_tensors="pt", padding=True,
                   truncation=True, max_length=128)

# ── Baseline (FP32) ──────────────────────────────────────────────────────────
with torch.no_grad():
    t0     = time.perf_counter()
    logits = model(**inputs).logits
    fp32_t = time.perf_counter() - t0
print(f"FP32 latency: {fp32_t*1000:.1f} ms")

# ── Dynamic INT8 Quantisation ────────────────────────────────────────────────
quantized = torch.quantization.quantize_dynamic(
    model, {torch.nn.Linear}, dtype=torch.qint8
)
with torch.no_grad():
    t0     = time.perf_counter()
    logits = quantized(**inputs).logits
    int8_t = time.perf_counter() - t0
print(f"INT8 latency: {int8_t*1000:.1f} ms  (speedup {fp32_t/int8_t:.2f}x)")

# ── ONNX Export ──────────────────────────────────────────────────────────────
dummy = tokenizer("hello world", return_tensors="pt")
torch.onnx.export(
    model,
    (dummy["input_ids"], dummy["attention_mask"]),
    "sentiment.onnx",
    input_names=["input_ids","attention_mask"],
    output_names=["logits"],
    dynamic_axes={"input_ids":{0:"batch",1:"seq"},
                  "attention_mask":{0:"batch",1:"seq"},
                  "logits":{0:"batch"}},
    opset_version=17
)
print("Exported to sentiment.onnx")

# ── ONNX Runtime inference ───────────────────────────────────────────────────
import onnxruntime as ort

sess  = ort.InferenceSession("sentiment.onnx",
        providers=["CPUExecutionProvider"])
feeds = {k: v.numpy() for k, v in dummy.items()
         if k in ["input_ids","attention_mask"]}
t0    = time.perf_counter()
out   = sess.run(None, feeds)
print(f"ONNX latency: {(time.perf_counter()-t0)*1000:.1f} ms")` },
    { type: 'tip', body: 'Use `optimum-cli export onnx --model distilbert-base-uncased-finetuned-sst-2-english sentiment-onnx/` for a one-command export with graph optimisations from HuggingFace Optimum.' },
    { type: 'exercise', title: 'Compare Model Sizes', hint: 'Use `os.path.getsize` to compare FP32 weights vs INT8 quantised model saved to disk. Also benchmark latency on your CPU for both.', solution: `import torch, os
from transformers import AutoModelForSequenceClassification, AutoTokenizer

name  = "distilbert-base-uncased-finetuned-sst-2-english"
model = AutoModelForSequenceClassification.from_pretrained(name)
model.eval()

torch.save(model.state_dict(), "fp32.pt")
q = torch.quantization.quantize_dynamic(model, {torch.nn.Linear}, torch.qint8)
torch.save(q.state_dict(), "int8.pt")

fp32_mb = os.path.getsize("fp32.pt") / 1e6
int8_mb = os.path.getsize("int8.pt") / 1e6
print(f"FP32: {fp32_mb:.1f} MB")
print(f"INT8: {int8_mb:.1f} MB  ({int8_mb/fp32_mb*100:.0f}% of original)")` }
  ]
};

L['nlp-w8-l4'] = {
  duration_mins: 40,
  sections: [
    { type: 'text', body: `<h2>Monitoring NLP Systems</h2>
<p>A deployed NLP model is not static — input distributions shift, labels drift, and model performance degrades silently. Production NLP systems require observability at three levels: <strong>infrastructure</strong> (latency, error rates), <strong>data</strong> (input drift, schema violations), and <strong>model</strong> (prediction drift, downstream task metrics).</p>
<h3>Infrastructure Monitoring</h3>
<p>Standard site-reliability engineering metrics apply:</p>
<ul>
  <li>Request rate, error rate, p50/p95/p99 latency (RED metrics).</li>
  <li>GPU/CPU utilisation, memory, queue depth.</li>
  <li>Expose these via a Prometheus <code>/metrics</code> endpoint; visualise in Grafana.</li>
</ul>
<h3>Data Monitoring</h3>
<ul>
  <li><strong>Input text statistics:</strong> average token length, OOV rate, language distribution, null/empty rates.</li>
  <li><strong>Embedding drift:</strong> compute the centroid of incoming text embeddings; alert if cosine distance from training centroid exceeds a threshold.</li>
  <li><strong>Schema validation:</strong> reject requests where required fields are missing or text exceeds length limits.</li>
</ul>
<h3>Model / Prediction Monitoring</h3>
<ul>
  <li><strong>Prediction distribution:</strong> track the fraction of POSITIVE/NEGATIVE predictions per hour. A shift signals drift or a bug.</li>
  <li><strong>Label drift (with delayed ground truth):</strong> compare model predictions against eventual user actions (clicks, escalations) to estimate real-world accuracy.</li>
  <li><strong>Shadow mode:</strong> run a new model in parallel, logging but not serving its predictions. Compare distributions before switching traffic.</li>
</ul>
<h3>Tools</h3>
<ul>
  <li><strong>Evidently AI:</strong> drift reports for text data; integrates with MLflow.</li>
  <li><strong>WhyLogs / whylabs:</strong> lightweight statistical profiles logged per batch.</li>
  <li><strong>Prometheus + Grafana:</strong> infrastructure and custom business metrics.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `# ── Prometheus metrics in FastAPI ───────────────────────────────────────────
from prometheus_client import Counter, Histogram, Gauge, generate_latest, CONTENT_TYPE_LATEST
from fastapi import FastAPI, Response
import time

app = FastAPI()

REQUEST_COUNT    = Counter("nlp_requests_total",   "Total requests", ["endpoint","status"])
REQUEST_LATENCY  = Histogram("nlp_latency_seconds","Latency",        ["endpoint"])
PREDICTION_DIST  = Counter("nlp_predictions_total","Predictions",    ["label"])
INPUT_TOKEN_LEN  = Histogram("nlp_input_tokens",   "Input token count",
                             buckets=[16,32,64,128,256,512])

@app.middleware("http")
async def metrics_middleware(request, call_next):
    t0   = time.perf_counter()
    resp = await call_next(request)
    lat  = time.perf_counter() - t0
    REQUEST_COUNT.labels(endpoint=request.url.path,
                         status=resp.status_code).inc()
    REQUEST_LATENCY.labels(endpoint=request.url.path).observe(lat)
    return resp

@app.get("/metrics")
def metrics():
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)

# ── Embedding drift detection ─────────────────────────────────────────────────
import numpy as np
from sentence_transformers import SentenceTransformer

embed_model = SentenceTransformer("all-MiniLM-L6-v2")

# Store training centroid (computed offline)
TRAIN_CENTROID = np.load("train_centroid.npy")   # shape (384,)
DRIFT_THRESHOLD = 0.15                            # cosine distance

def check_input_drift(texts: list[str]) -> dict:
    embs    = embed_model.encode(texts, normalize_embeddings=True)
    centroid = embs.mean(axis=0)
    centroid /= np.linalg.norm(centroid)
    cos_dist = 1 - np.dot(centroid, TRAIN_CENTROID)
    return {"drift_score": float(cos_dist),
            "alert": cos_dist > DRIFT_THRESHOLD}

# ── Evidently drift report (offline batch) ───────────────────────────────────
import pandas as pd
from evidently.report import Report
from evidently.metric_preset import TextOverviewPreset

ref_data  = pd.DataFrame({"text": ["example training text"] * 100})
prod_data = pd.DataFrame({"text": ["example production text"] * 100})

report = Report(metrics=[TextOverviewPreset()])
report.run(reference_data=ref_data, current_data=prod_data)
report.save_html("drift_report.html")
print("Drift report saved to drift_report.html")` },
    { type: 'warn', title: 'Alert Fatigue', body: 'Set drift thresholds conservatively — too sensitive and on-call engineers will start ignoring alerts. Start with 2σ from training distribution and tighten based on observed false-positive rate.' },
    { type: 'exercise', title: 'Prediction Distribution Logger', hint: 'Extend the FastAPI sentiment endpoint to log each prediction label to a CSV file (appending). After 100 requests, compute and print the label distribution as a percentage.', solution: `import csv, os
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from collections import Counter

app  = FastAPI()
clf  = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
LOG  = "predictions.csv"

if not os.path.exists(LOG):
    with open(LOG, "w", newline="") as f:
        csv.writer(f).writerow(["label","score"])

class Req(BaseModel):
    texts: list[str]

@app.post("/sentiment")
def sentiment(req: Req):
    results = clf(req.texts, truncation=True)
    with open(LOG, "a", newline="") as f:
        writer = csv.writer(f)
        for r in results:
            writer.writerow([r["label"], round(r["score"], 4)])

    # print distribution every 100 rows
    with open(LOG) as f:
        rows = list(csv.DictReader(f))
    if len(rows) % 100 == 0:
        counts = Counter(r["label"] for r in rows)
        total  = sum(counts.values())
        for label, n in counts.items():
            print(f"{label}: {n/total*100:.1f}%")
    return results` }
  ]
};

L['nlp-w8-l5'] = {
  duration_mins: 60,
  sections: [
    { type: 'text', body: `<h2>Capstone: End-to-End NLP Pipeline</h2>
<p>This capstone integrates everything from the course into a working, production-grade NLP system. You will build a <strong>customer feedback intelligence platform</strong> that ingests raw reviews, classifies sentiment, extracts entities, generates a summary, performs topic modelling, and exposes results via a REST API — all in one coherent codebase.</p>
<h3>System Architecture</h3>
<pre>
Raw Reviews (CSV)
       │
       ▼
  Preprocessing          ← regex cleaning, tokenisation, deduplication
       │
       ▼
  Multi-task Inference   ← sentiment + NER + summarisation (batched)
       │
       ▼
  Topic Modelling        ← BERTopic on review embeddings
       │
       ▼
  Results Store          ← SQLite / PostgreSQL
       │
       ▼
  FastAPI Dashboard API  ← aggregate stats, per-review details
</pre>
<h3>Design Decisions</h3>
<ul>
  <li><strong>Batch-first:</strong> process reviews in batches of 32 to maximise GPU utilisation.</li>
  <li><strong>Model reuse:</strong> compute sentence embeddings once; reuse for both topic modelling (BERTopic) and semantic search (FAISS).</li>
  <li><strong>Async API:</strong> heavy processing runs in a background task triggered by a POST to <code>/ingest</code>; clients poll <code>/status/{job_id}</code>.</li>
  <li><strong>ONNX for sentiment:</strong> quantised INT8 ONNX model for 3× faster sentiment inference at scale.</li>
</ul>` },
    { type: 'code', lang: 'python', src: `# ── pipeline.py — batch processing ─────────────────────────────────────────
import pandas as pd, sqlite3, uuid, time
from transformers import pipeline as hf_pipeline
from sentence_transformers import SentenceTransformer
from bertopic import BERTopic
import re, logging

logger = logging.getLogger("capstone")

def clean_text(text: str) -> str:
    text = re.sub(r"http\\S+", "", text)
    text = re.sub(r"[^\\w\\s.,!?'\\-]", " ", text)
    return re.sub(r"\\s+", " ", text).strip()

class ReviewPipeline:
    def __init__(self):
        self.sentiment  = hf_pipeline("sentiment-analysis",
            model="distilbert-base-uncased-finetuned-sst-2-english",
            truncation=True, max_length=512, batch_size=32)
        self.ner        = hf_pipeline("ner",
            model="dslim/bert-base-NER",
            aggregation_strategy="simple", batch_size=32)
        self.summariser = hf_pipeline("summarization",
            model="facebook/bart-large-cnn", batch_size=8)
        self.embedder   = SentenceTransformer("all-MiniLM-L6-v2")
        self.topic_model = BERTopic(nr_topics="auto", verbose=False)

    def run(self, csv_path: str, db_path: str = "reviews.db") -> str:
        job_id = str(uuid.uuid4())[:8]
        logger.info(f"Job {job_id}: loading {csv_path}")

        df = pd.read_csv(csv_path).dropna(subset=["text"]).drop_duplicates("text")
        df["clean"] = df["text"].map(clean_text)
        df = df[df["clean"].str.len() >= 20].reset_index(drop=True)
        logger.info(f"Job {job_id}: {len(df)} reviews after cleaning")

        # sentiment
        sents = self.sentiment(df["clean"].tolist())
        df["sentiment"]       = [s["label"] for s in sents]
        df["sentiment_score"] = [round(s["score"], 4) for s in sents]

        # NER — collect unique product/org mentions per review
        ner_outs = self.ner(df["clean"].tolist())
        df["entities"] = [
            str([e["word"] for e in doc if e["entity_group"] in ("ORG","PRODUCT")])
            for doc in ner_outs
        ]

        # summarise long reviews (>200 chars)
        long_mask  = df["clean"].str.len() > 200
        summaries  = [""] * len(df)
        long_texts = df.loc[long_mask, "clean"].tolist()
        if long_texts:
            s_outs = self.summariser(long_texts, max_length=80,
                                     min_length=20, do_sample=False)
            for idx, s in zip(df.index[long_mask], s_outs):
                summaries[idx] = s["summary_text"]
        df["summary"] = summaries

        # topic modelling
        embs = self.embedder.encode(df["clean"].tolist(),
                                    show_progress_bar=True)
        topics, _ = self.topic_model.fit_transform(df["clean"].tolist(), embs)
        df["topic"] = topics

        # persist
        con = sqlite3.connect(db_path)
        df.to_sql("reviews", con, if_exists="replace", index_label="id")
        con.close()
        logger.info(f"Job {job_id}: done — results in {db_path}")
        return job_id` },
    { type: 'code', lang: 'python', src: `# ── main.py — FastAPI dashboard API ─────────────────────────────────────────
from contextlib import asynccontextmanager
from fastapi import FastAPI, BackgroundTasks, HTTPException
from pydantic import BaseModel
import sqlite3, asyncio, uuid

jobs: dict[str, str] = {}   # job_id → "running" | "done" | "error"
pipeline_instance = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global pipeline_instance
    from pipeline import ReviewPipeline
    pipeline_instance = ReviewPipeline()
    yield

app = FastAPI(title="Review Intelligence API", lifespan=lifespan)

def _run_job(job_id: str, csv_path: str):
    try:
        pipeline_instance.run(csv_path)
        jobs[job_id] = "done"
    except Exception as e:
        jobs[job_id] = f"error: {e}"

class IngestRequest(BaseModel):
    csv_path: str

@app.post("/ingest")
def ingest(req: IngestRequest, background_tasks: BackgroundTasks):
    job_id = str(uuid.uuid4())[:8]
    jobs[job_id] = "running"
    background_tasks.add_task(_run_job, job_id, req.csv_path)
    return {"job_id": job_id}

@app.get("/status/{job_id}")
def status(job_id: str):
    if job_id not in jobs:
        raise HTTPException(404, "Job not found")
    return {"job_id": job_id, "status": jobs[job_id]}

@app.get("/stats")
def stats(db: str = "reviews.db"):
    con = sqlite3.connect(db)
    cur = con.cursor()
    cur.execute("SELECT sentiment, COUNT(*) FROM reviews GROUP BY sentiment")
    sentiment_dist = dict(cur.fetchall())
    cur.execute("SELECT topic, COUNT(*) FROM reviews GROUP BY topic ORDER BY 2 DESC LIMIT 10")
    top_topics = [{"topic": r[0], "count": r[1]} for r in cur.fetchall()]
    cur.execute("SELECT COUNT(*) FROM reviews")
    total = cur.fetchone()[0]
    con.close()
    return {"total": total, "sentiment": sentiment_dist, "top_topics": top_topics}

@app.get("/reviews")
def reviews(sentiment: str | None = None, topic: int | None = None,
            limit: int = 20, offset: int = 0, db: str = "reviews.db"):
    con = sqlite3.connect(db)
    query = "SELECT id, text, sentiment, sentiment_score, summary, entities, topic FROM reviews WHERE 1=1"
    params = []
    if sentiment:
        query += " AND sentiment=?"; params.append(sentiment.upper())
    if topic is not None:
        query += " AND topic=?"; params.append(topic)
    query += " LIMIT ? OFFSET ?"; params += [limit, offset]
    rows = con.execute(query, params).fetchall()
    con.close()
    keys = ["id","text","sentiment","score","summary","entities","topic"]
    return [dict(zip(keys, r)) for r in rows]` },
    { type: 'tip', body: 'To deploy this capstone, containerise it with Docker, push to a container registry, and run on a cloud VM or managed container service (e.g., Google Cloud Run, AWS Fargate). Use a PostgreSQL managed database instead of SQLite for production scale.' },
    { type: 'exercise', title: 'Extend the Capstone', hint: 'Add a `/search` endpoint that accepts a natural language query, encodes it with the sentence embedder, and returns the top-5 most semantically similar reviews from the database using FAISS.', solution: `import faiss, numpy as np, sqlite3
from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer

app     = FastAPI()
embedder = SentenceTransformer("all-MiniLM-L6-v2")

# Build FAISS index from DB at startup
def build_index(db="reviews.db"):
    con  = sqlite3.connect(db)
    rows = con.execute("SELECT id, clean FROM reviews").fetchall()
    con.close()
    ids   = [r[0] for r in rows]
    texts = [r[1] for r in rows]
    embs  = embedder.encode(texts, normalize_embeddings=True).astype("float32")
    idx   = faiss.IndexFlatIP(embs.shape[1])
    idx.add(embs)
    return idx, ids, texts

INDEX, IDS, TEXTS = build_index()

class SearchRequest(BaseModel):
    query: str
    top_k: int = 5

@app.post("/search")
def search(req: SearchRequest):
    q_emb = embedder.encode([req.query], normalize_embeddings=True).astype("float32")
    scores, indices = INDEX.search(q_emb, req.top_k)
    return [{"id": IDS[i], "text": TEXTS[i], "score": float(scores[0][j])}
            for j, i in enumerate(indices[0])]` }
  ]
};

})();


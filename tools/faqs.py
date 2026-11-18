"""
faqs.py — per-page FAQs for course, programme and Code Champs level pages, generated from the data files.

Every answer is assembled from facts already in content/*.js (duration, hours, prerequisites, delivery,
certificate, audience …) plus content/course-guides-data.js, so the FAQ never says anything the rest
of the site does not. Answers are HTML; `faq_ld()` strips tags for the FAQPage JSON-LD.

Used by tools/build.py:  course_faqs(course, rel)  programme_faqs(programme, rel)  level_faqs(level, rel)
"""
from __future__ import annotations

import html
import re

COURSES: dict = {}
LEVELS: dict = {}
SITE: dict = {}

_TAG = re.compile(r"<[^>]+>")


def setup(courses: dict, levels: dict, site: dict) -> None:
    COURSES.update(courses)
    LEVELS.update(levels)
    SITE.update(site)


def _e(s: str) -> str:
    return html.escape(str(s), quote=False)


def _join(items: list[str], last: str = "and") -> str:
    items = [i for i in items if i]
    if len(items) <= 1:
        return "".join(items)
    return ", ".join(items[:-1]) + f" {last} " + items[-1]


def _lc(s: str) -> str:
    """Lower-case the first letter unless the first word is an acronym/proper noun (e.g. 'ML', 'Python')."""
    w = s.split(" ", 1)[0]
    return s if (w.isupper() or w[1:] != w[1:].lower()) else s[:1].lower() + s[1:]


def _ul(items: list[str]) -> str:
    return '<ul class="faq-ul">' + "".join(f"<li>{_e(i)}</li>" for i in items) + "</ul>"


def _course_link(cid: str, rel: str) -> str:
    c = COURSES[cid]
    return f'<a href="{rel}courses/{cid}.html">{_e(c["title"])}</a>'


def _contact(rel: str) -> str:
    return (f'<a href="{rel}contact.html">Enquire online</a>, WhatsApp <a href="{SITE["whatsapp"]}" target="_blank" '
            f'rel="noopener">{_e(SITE["phone"])}</a> or email <a href="mailto:{SITE["email"]}">{_e(SITE["email"])}</a>')


# ── Courses ────────────────────────────────────────────────────────────────
def course_faqs(c: dict, rel: str) -> list[dict]:
    g = c.get("guide") or {}
    t = _e(c["title"])
    hours = int(c["hours"].split()[0])
    weeks = int(c["duration"].split()[0])
    per_week = round(hours / weeks)
    faqs = []

    pre = _e(c["prereqs"])
    before = [b for b in g.get("before", []) if b in COURSES]
    if before:
        pre += f" New to the subject? Start with {_join([_course_link(b, rel) for b in before], 'or')} first."
    faqs.append({"q": f"Do I need prior experience to join the {t} course?", "a": pre})

    faqs.append({"q": f"How long is the {t} course?",
                 "a": f"{_e(c['duration'].capitalize())} with {_e(c['hours'])} of live, instructor-led sessions — "
                      f"about {per_week} hours of class a week, plus practice on your own."})

    faqs.append({"q": f"Can I take {t} online, or only in Chennai?",
                 "a": "Both. Classes run live in our Chennai classroom at Rajakilpakkam, near Tambaram, and online for "
                      "learners anywhere in India. Every session is recorded so enrolled students can replay it."})

    faqs.append({"q": "Will I receive a certificate?",
                 "a": "Yes. Complete the course and its project work to receive a Data Science Academia certificate of "
                      "completion that you can add to your CV and LinkedIn profile."})

    faqs.append({"q": f"Which tools will I use in the {t} course?",
                 "a": f"You work hands-on with {_join([_e(x) for x in c['tools']])}. We help you set everything up "
                      "in the first session."})

    roles = g.get("roles", [])
    nxt = [n for n in g.get("next", []) if n in COURSES]
    if roles or nxt:
        a = ""
        if roles:
            a += (f"The skills from {t} are used in roles such as {_join([_e(r) for r in roles])}. Most roles also "
                  "expect a portfolio of projects, which this course helps you start. ")
        if nxt:
            a += f"To keep building, learners usually continue with {_join([_course_link(n, rel) for n in nxt], 'or')}."
        faqs.append({"q": f"What can I do after completing {t}?", "a": a.strip()})

    for extra in g.get("faqs", []):
        faqs.append({"q": _e(extra["q"]), "a": extra["a"].replace("{rel}", rel)})

    faqs.append({"q": "What are the fees, and when does the next batch start?",
                 "a": f"Fees and batch dates depend on the delivery mode you choose. {_contact(rel)} for current pricing "
                      "and the next start date — we reply within one business day. You can also book a free, "
                      "no-commitment trial session."})
    return faqs


# ── Programmes ─────────────────────────────────────────────────────────────
def programme_faqs(p: dict, rel: str) -> list[dict]:
    t = _e(p["title"])
    faqs = []
    aud = p.get("audience") or []
    if aud:
        faqs.append({"q": "Who is this programme for?",
                     "a": "It is designed for:" + _ul(aud)})
    dur, dl = p.get("duration"), p.get("delivery") or []
    if dur or dl:
        a = f"Duration: {_e(dur)}." if dur else ""
        if dl:
            a += f" Delivery options: {'; '.join(_e(d) for d in dl)}."
        faqs.append({"q": "How long does it take, and how is it delivered?", "a": a.strip()})
    if p.get("prereqs"):
        faqs.append({"q": "What are the eligibility requirements?", "a": _e(p["prereqs"])})
    if p.get("certificate"):
        faqs.append({"q": "What do I receive on completion?", "a": f"{_e(p['certificate'])}."})
    cta = _e(p.get("cta") or "Enquire")
    faqs.append({"q": "What are the fees, and how do I apply?",
                 "a": f"Fees depend on the format and duration you choose. Use the <a href=\"{rel}contact.html?course="
                      f"{html.escape(p.get('ctaParam') or p['title'], quote=True).replace(' ', '%20')}\">{cta}</a> form, "
                      f"WhatsApp <a href=\"{SITE['whatsapp']}\" target=\"_blank\" rel=\"noopener\">{_e(SITE['phone'])}</a> "
                      f"or email <a href=\"mailto:{SITE['email']}\">{_e(SITE['email'])}</a> — we reply within one business day."})
    return faqs


# ── Code Champs levels (written for parents) ───────────────────────────────
def level_faqs(lv: dict, rel: str) -> list[dict]:
    n = _e(lv["name"])
    fl = lv.get("forList") or []
    faqs = []
    suits = [x for x in fl[1:] if not x.lower().startswith("has completed")]
    faqs.append({"q": f"Is {n} right for my child?",
                 "a": f"{n} is designed for {_e(lv['grade'])} ({_e(lv['age'].lower())})."
                      + (" Signs it is a good fit:" + _ul(suits) if suits else "")})
    prev = next((x for x in LEVELS.values() if x.get("next") == lv["id"]), None)
    if prev is None:
        a = (f"No. {n} starts from zero — no coding experience is needed, only curiosity. Children begin with visual, "
             "block-based coding before moving to text.")
    else:
        req = next((x for x in fl if x.lower().startswith("has completed")), "")
        a = (f"It helps. {n} builds on <a href=\"{rel}codechamps/{prev['id']}.html\">{_e(prev['name'])}</a>"
             + (f" — we recommend a child who {_e(_lc(req))}." if req else ".")
             + " Not sure? We assess every child in the free trial session and recommend the right level.")
    faqs.append({"q": "Does my child need any coding experience?", "a": a})
    faqs.append({"q": f"How long is {n}, and how are classes run?",
                 "a": f"{_e(lv['duration'].capitalize())}, {_e(lv['sessions'].lower())} in total, each about 90 minutes. Classes run "
                      "in partner schools across Chennai or live online, and parents receive progress updates after "
                      "each session."})
    faqs.append({"q": "Will my child receive a certificate?",
                 "a": f"Yes — the {_e(lv['cert'])} on completing the level, along with the projects your child built."})
    if lv.get("next") and lv["next"] in LEVELS:
        nx = LEVELS[lv["next"]]
        faqs.append({"q": f"What comes after {n}?",
                     "a": f"<a href=\"{rel}codechamps/{nx['id']}.html\">{_e(nx['name'])}</a> ({_e(nx['grade'])}) — "
                          "the next level of DSA Code Champs."})
    else:
        faqs.append({"q": f"What comes after {n}?",
                     "a": f"{n} is the highest Code Champs level. From here, the natural next step is our "
                          f"<a href=\"{rel}programmes/ai-mastery.html\">12-month AI Mastery Track</a> or one of our "
                          f"<a href=\"{rel}courses.html\">specialised courses</a> such as "
                          f"{_course_link('deep-learning', rel) if 'deep-learning' in COURSES else 'Deep Learning'}."})
    faqs.append({"q": "How do I enrol, and is there a free trial?",
                 "a": f"Yes — book a free trial session for your child. Fees depend on the format (in school or live "
                      f"online). {_contact(rel)} — we reply within one business day."})
    return faqs


# ── JSON-LD ────────────────────────────────────────────────────────────────
def faq_ld(faqs: list[dict]) -> dict:
    def txt(s: str) -> str:
        s = re.sub(r"</li>\s*<li>", "; ", s)
        s = re.sub(r"</li>\s*</ul>", ".", s)
        s = s.replace(':<ul class="faq-ul"><li>', ": ")
        return re.sub(r"\s+", " ", html.unescape(_TAG.sub("", s))).strip()
    return {"@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": [{"@type": "Question", "name": txt(f["q"]),
                            "acceptedAnswer": {"@type": "Answer", "text": txt(f["a"])}} for f in faqs]}

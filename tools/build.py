"""
build.py — static site generator for Data Science Academia (GitHub Pages).

    python tools/build.py

Reads:   src/pages/*.html            → root pages (index, courses, about, …)
         src/templates/detail-*.html → one static page per course / programme / blog post / Code Champs level
         *-data.js                   → content (courses-data.js, programmes-data.js, blog-data.js,
                                       cc-levels-data.js, projects-data.js, testimonials-data.js)
         assets/img/manifest.json    → image sizes (from tools/optimize_images.py)
Writes:  *.html, courses/*.html, programmes/*.html, blog/*.html, codechamps/*.html,
         legacy redirect shims (course.html, programme.html, blog-post.html, cc-level.html),
         sitemap.xml, robots.txt

Requires: jinja2, json5  (pip install -r tools/requirements.txt)
"""
from __future__ import annotations

import datetime as dt
import hashlib
import html
import json
import re
import sys
from pathlib import Path

import jinja2
from markupsafe import Markup

sys.path.insert(0, str(Path(__file__).resolve().parent))
from jsdata import load_all  # noqa: E402

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
TODAY = dt.date.today().isoformat()

# ── Site configuration (single source of truth for contact details & URLs) ──
SITE = {
    "name": "Data Science Academia",
    "legal": "Data Science Academia Private Limited",
    "short": "DSA",
    # Public base URL — change this once when moving to a custom domain.
    "url": "https://ajaymukund.github.io/datascienceacademia",
    "tagline": "Where Academic Rigour Meets Real-World AI Engineering",
    "description": (
        "Data Science Academia is a Ph.D.-led AI & Data Science institute in Chennai offering 18 courses "
        "(Python, Machine Learning, Deep Learning, LLMs, Power BI, Azure, AWS), AICTE-aligned internships, "
        "Microsoft certification prep and a 12-month AI Mastery Track — live in Chennai and online."
    ),
    "phone": "+91 91764 98814",
    "phone_intl": "+919176498814",
    "email": "info@datascienceacademia.in",
    "whatsapp": "https://wa.me/919176498814",
    "whatsapp_msg": "https://wa.me/919176498814?text=Hello%20DSA%2C%20I%27d%20like%20to%20know%20more%20about%20your%20courses.",
    "address": {
        "street": "2nd Floor, Arasan Complex, No. 69, Grand Southern Trunk Road, West Tambaram",
        "locality": "Chennai",
        "region": "Tamil Nadu",
        "postal": "600045",
        "country": "IN",
    },
    "geo": {"lat": 12.9286478, "lng": 80.1193835},
    "hours": "Mon – Sat · 9:00 AM – 7:00 PM IST",
    "social": {
        "linkedin": "https://www.linkedin.com/company/data-science-academia/",
        "youtube": "https://youtube.com/@datascienceacademia3805",
        "instagram": "https://www.instagram.com/data_science_academia",
    },
    "founded": "2019",
    "year": dt.date.today().year,
    "formspree": "https://formspree.io/f/xdaypadg",
    "maps_embed": (
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.696888476936!2d80.1193835!3d12.9286478"
        "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f63da0acd75%3A0x4309ce616da11096"
        "!2sData%20Science%20Academia!5e0!3m2!1sen!2sin!4v1776943605305!5m2!1sen!2sin"
    ),
    "maps_link": "https://maps.google.com/?q=Data+Science+Academia+West+Tambaram+Chennai",
    "author": {"name": "Ajay Mukund S", "role": "AI Engineer · Ph.D. Scholar, Anna University · Founder, Data Science Academia"},
}

NAV_ITEMS = [
    ("courses", "Courses", "courses.html"),
    ("programmes", "Programmes", "programmes.html"),
    ("codechamps", "Code Champs", "codechamps.html"),
    ("projects", "Projects", "projects.html"),
    ("testimonials", "Testimonials", "testimonials.html"),
    ("blog", "Blog", "blog.html"),
    ("about", "About", "about.html"),
    ("contact", "Contact", "contact.html"),
]

LEVEL_BADGE = {"Beginner": "badge-beginner", "Intermediate": "badge-intermediate", "Advanced": "badge-advanced"}
CATEGORY_SLUG = {"Foundation": "foundation", "Core ML": "core-ml", "Advanced AI": "advanced-ai", "Analytics": "analytics", "Cloud & BI": "cloud-bi"}

# ── Helpers ────────────────────────────────────────────────────────────────
_hash_cache: dict[str, str] = {}


def file_hash(rel_path: str) -> str:
    if rel_path not in _hash_cache:
        p = ROOT / rel_path
        _hash_cache[rel_path] = hashlib.md5(p.read_bytes()).hexdigest()[:8] if p.exists() else "0"
    return _hash_cache[rel_path]


def slugify(s: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return s


def strip_html(s: str) -> str:
    return html.unescape(re.sub(r"<[^>]+>", " ", s or "")).replace("\xa0", " ")


def squash(s: str) -> str:
    return re.sub(r"\s+", " ", s or "").strip()


def meta_desc(text: str, limit: int = 158) -> str:
    """Trim to a sensible meta-description length on a word boundary."""
    t = squash(strip_html(text))
    if len(t) <= limit:
        return t
    cut = t[: limit - 1]
    cut = cut[: cut.rfind(" ")] if " " in cut else cut
    return cut.rstrip(",;:—- ") + "…"


def absolute(path: str) -> str:
    path = path.lstrip("/")
    if path in ("", "index.html"):
        return SITE["url"] + "/"
    return SITE["url"] + "/" + path


def jsonld(obj) -> Markup:
    s = json.dumps(obj, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    return Markup('<script type="application/ld+json">' + s + "</script>")


def breadcrumb_ld(items):
    """items: list of (name, root-relative path or None for current page)."""
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": i + 1, "name": name, **({"item": absolute(path)} if path is not None else {})}
            for i, (name, path) in enumerate(items)
        ],
    }


def org_ld():
    u = SITE["url"]
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["EducationalOrganization", "LocalBusiness"],
                "@id": u + "/#organization",
                "name": SITE["legal"],
                "alternateName": ["Data Science Academia", "DSA", "DSA Chennai"],
                "url": u + "/",
                "logo": {"@type": "ImageObject", "url": u + "/favicon-192.png", "width": 192, "height": 192},
                "image": u + "/assets/og/default.jpg",
                "description": SITE["description"],
                "slogan": SITE["tagline"],
                "foundingDate": SITE["founded"],
                "telephone": SITE["phone_intl"],
                "email": SITE["email"],
                "priceRange": "₹₹",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": SITE["address"]["street"],
                    "addressLocality": SITE["address"]["locality"],
                    "addressRegion": SITE["address"]["region"],
                    "postalCode": SITE["address"]["postal"],
                    "addressCountry": SITE["address"]["country"],
                },
                "geo": {"@type": "GeoCoordinates", "latitude": SITE["geo"]["lat"], "longitude": SITE["geo"]["lng"]},
                "hasMap": SITE["maps_link"],
                "openingHoursSpecification": [{
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "09:00", "closes": "19:00",
                }],
                "areaServed": [{"@type": "City", "name": "Chennai"}, {"@type": "State", "name": "Tamil Nadu"}, {"@type": "Country", "name": "India"}],
                "sameAs": list(SITE["social"].values()) + [SITE["whatsapp"]],
                "contactPoint": [{"@type": "ContactPoint", "telephone": SITE["phone_intl"], "contactType": "admissions", "email": SITE["email"], "availableLanguage": ["English", "Tamil"], "areaServed": "IN"}],
            },
            {
                "@type": "WebSite",
                "@id": u + "/#website",
                "url": u + "/",
                "name": SITE["name"],
                "publisher": {"@id": u + "/#organization"},
                "inLanguage": "en-IN",
            },
        ],
    }


# ── Image helper (uses assets/img/manifest.json) ───────────────────────────
MANIFEST: dict = json.loads((ROOT / "assets/img/manifest.json").read_text(encoding="utf-8"))
BY_SRC = {v["src"]: k for k, v in MANIFEST.items()}


def image_entry(key_or_src: str):
    if key_or_src in MANIFEST:
        return MANIFEST[key_or_src]
    if key_or_src in BY_SRC:
        return MANIFEST[BY_SRC[key_or_src]]
    raise KeyError(f"image not in manifest: {key_or_src!r}")


def render_img(rel: str, key: str, alt: str = "", sizes: str = "100vw", cls: str = "", loading: str = "lazy",
               fetchpriority: str | None = None, max_width: int | None = None, width_attr: bool = True) -> Markup:
    e = image_entry(key)
    variants = sorted(e["variants"].values(), key=lambda v: v["w"])
    if max_width:
        variants = [v for v in variants if v["w"] <= max_width] or variants[:1]
    src = variants[min(1, len(variants) - 1)] if len(variants) > 1 else variants[0]
    # default src: the middle-ish variant (≤ 960px) for a sensible no-srcset fallback
    for v in variants:
        if v["w"] <= 960:
            src = v
    srcset = ", ".join(f"{rel}{v['file']} {v['w']}w" for v in variants)
    attrs = [
        f'src="{rel}{src["file"]}"',
        f'srcset="{srcset}"',
        f'sizes="{sizes}"',
        f'alt="{html.escape(alt, quote=True)}"',
    ]
    if width_attr:
        attrs.append(f'width="{src["w"]}" height="{src["h"]}"')
    if loading:
        attrs.append(f'loading="{loading}"')
    attrs.append('decoding="async"')
    if fetchpriority:
        attrs.append(f'fetchpriority="{fetchpriority}"')
    if cls:
        attrs.append(f'class="{cls}"')
    return Markup("<img " + " ".join(attrs) + ">")


def image_url(rel: str, key: str, width: int = 960) -> str:
    e = image_entry(key)
    best = min(e["variants"].values(), key=lambda v: abs(v["w"] - width))
    return rel + best["file"]


def og_for(kind: str, ident: str) -> str:
    p = ROOT / "assets" / "og" / f"{kind}-{ident}.jpg"
    return absolute(f"assets/og/{kind}-{ident}.jpg") if p.exists() else absolute("assets/og/default.jpg")


# ── Inline CSS (fonts.css + style.css minified into every page → no render-blocking CSS) ──
def minify_css(css: str) -> str:
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    return "\n".join(line.strip() for line in css.splitlines() if line.strip())


_STYLE_MIN = minify_css((ROOT / "style.css").read_text(encoding="utf-8"))
_FONTS_RAW = (ROOT / "assets/fonts/fonts.css").read_text(encoding="utf-8")
_inline_cache: dict = {}


def inline_css(rel: str) -> Markup:
    if rel not in _inline_cache:
        fonts = minify_css(_FONTS_RAW.replace("url('", f"url('{rel}assets/fonts/"))
        _inline_cache[rel] = Markup(fonts + "\n" + _STYLE_MIN)
    return _inline_cache[rel]


# ── Jinja environment ──────────────────────────────────────────────────────
env = jinja2.Environment(
    loader=jinja2.FileSystemLoader([str(SRC / "pages"), str(SRC / "templates")]),
    autoescape=jinja2.select_autoescape(["html"]),
    trim_blocks=True,
    lstrip_blocks=True,
    undefined=jinja2.StrictUndefined,
)
env.filters["slugify"] = slugify
env.filters["meta_desc"] = meta_desc
env.filters["strip_html"] = strip_html
env.filters["squash"] = squash
env.filters["initials"] = lambda name: "".join(w[0] for w in name.split()[:2]).upper()
env.filters["level_badge"] = lambda level: LEVEL_BADGE.get(level, "badge")
env.filters["cat_slug"] = lambda cat: CATEGORY_SLUG.get(cat, slugify(cat))
env.globals.update(site=SITE, nav_items=NAV_ITEMS, jsonld=jsonld, breadcrumb_ld=breadcrumb_ld, absolute=absolute,
                   og_for=og_for, today=TODAY, site_jsonld=jsonld(org_ld()), level_badge=LEVEL_BADGE, category_slug=CATEGORY_SLUG)


@jinja2.pass_context
def ctx_img(ctx, key, alt="", sizes="100vw", cls="", loading="lazy", fetchpriority=None, max_width=None):
    return render_img(ctx["rel"], key, alt, sizes, cls, loading, fetchpriority, max_width)


@jinja2.pass_context
def ctx_img_url(ctx, key, width=960):
    return image_url(ctx["rel"], key, width)


@jinja2.pass_context
def ctx_asset(ctx, path):
    return f"{ctx['rel']}{path}?v={file_hash(path)}"


@jinja2.pass_context
def ctx_url(ctx, path):
    return f"{ctx['rel']}{path}"


env.globals.update(img=ctx_img, img_url=ctx_img_url, asset=ctx_asset, url=ctx_url)


# ── Data ───────────────────────────────────────────────────────────────────
DATA = load_all(ROOT)
COURSES = DATA["courses"]
PROGRAMMES = DATA["programmes"]
POSTS = DATA["posts"]
LEVELS = DATA["levels"]
PROJECTS = DATA["projects"]
TESTIMONIALS = DATA["testimonials"]

for cid, c in COURSES.items():
    for m in c["modules"]:                      # normalise optional keys so templates can rely on them
        m.setdefault("resources", [])
    c["url"] = f"courses/{cid}.html"
    c["badge"] = LEVEL_BADGE.get(c["level"], "badge")
    c["cat_slug"] = CATEGORY_SLUG.get(c["category"], slugify(c["category"]))
for pid, p in PROGRAMMES.items():
    p["url"] = f"programmes/{pid}.html"
for post in POSTS:
    post["url"] = f"blog/{post['slug']}.html"
    post["author"] = SITE["author"]["name"]
for lid, lv in LEVELS.items():
    lv["url"] = f"codechamps/{lid}.html"
for i, pr in enumerate(PROJECTS):
    pr["idx"] = i
    pr["cat_label"] = DATA["project_cats"][pr["cat"]]["label"]
for t in TESTIMONIALS:
    t["img"] = BY_SRC.get(t["file"])

CATEGORIES = []
for cat in ["Foundation", "Core ML", "Advanced AI", "Analytics", "Cloud & BI"]:
    CATEGORIES.append({"name": cat, "slug": CATEGORY_SLUG[cat], "courses": [c for c in COURSES.values() if c["category"] == cat]})

COMMON = dict(
    courses=COURSES, courses_list=list(COURSES.values()), categories=CATEGORIES,
    programmes=PROGRAMMES, programmes_list=list(PROGRAMMES.values()),
    posts=POSTS, cat_style=DATA["cat_style"], levels=LEVELS, levels_list=list(LEVELS.values()),
    projects=PROJECTS, project_cats=DATA["project_cats"], testimonials=TESTIMONIALS,
)

SITEMAP: list[tuple[str, str, str]] = []   # (root-relative path, changefreq, priority)


def render(template: str, out_rel: str, changefreq: str | None = "monthly", priority: str = "0.6", **ctx) -> None:
    depth = out_rel.count("/")
    rel = "../" * depth
    context = dict(COMMON)
    context.update(rel=rel, depth=depth, out_path=out_rel, canonical=absolute(out_rel), nav_active=None, inline_css=inline_css(rel))
    context.update(ctx)
    out = env.get_template(template).render(**context)
    target = ROOT / out_rel
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(out, encoding="utf-8", newline="\n")
    if changefreq:
        SITEMAP.append((out_rel, changefreq, priority))
    print(f"  {out_rel}")


def build_pages() -> None:
    print("Root pages")
    freq = {"index.html": ("weekly", "1.0"), "courses.html": ("weekly", "0.9"), "programmes.html": ("monthly", "0.9"),
            "codechamps.html": ("monthly", "0.8"), "about.html": ("monthly", "0.8"), "contact.html": ("monthly", "0.7"),
            "projects.html": ("monthly", "0.7"), "testimonials.html": ("monthly", "0.7"), "blog.html": ("weekly", "0.8")}
    for page in sorted((SRC / "pages").glob("*.html")):
        name = page.name
        cf, pr = freq.get(name, (None if name == "404.html" else "monthly", "0.5"))
        render(name, name, changefreq=cf, priority=pr, nav_active=name[:-5])


def have(template: str) -> bool:
    if (SRC / "templates" / template).exists():
        return True
    print(f"  (skipping — src/templates/{template} not found)")
    return False


def build_details() -> None:
    print("Course pages")
    for cid, c in COURSES.items():
        if not have("detail-course.html"):
            break
        related = [x for x in COURSES.values() if x["category"] == c["category"] and x["id"] != cid][:3]
        if len(related) < 3:
            related += [x for x in COURSES.values() if x["id"] != cid and x not in related][: 3 - len(related)]
        render("detail-course.html", c["url"], "monthly", "0.8", course=c, related=related, nav_active="courses")
    print("Programme pages")
    for pid, p in PROGRAMMES.items():
        if not have("detail-programme.html"):
            break
        others = [x for x in PROGRAMMES.values() if x["id"] != pid][:3]
        render("detail-programme.html", p["url"], "monthly", "0.8", programme=p, others=others, nav_active="programmes")
    print("Blog posts")
    for i, post in enumerate(POSTS):
        if not have("detail-post.html"):
            break
        related = [p for p in POSTS if p["slug"] != post["slug"] and p["category"] == post["category"]]
        related += [p for p in POSTS if p["slug"] != post["slug"] and p not in related]
        render("detail-post.html", post["url"], "monthly", "0.7", post=post, related=related[:2], nav_active="blog")
    print("Code Champs levels")
    for lid, lv in LEVELS.items():
        if not have("detail-level.html"):
            break
        render("detail-level.html", lv["url"], "monthly", "0.7", level=lv, nav_active="codechamps")


def build_redirects() -> None:
    print("Legacy redirect shims")
    shims = [
        ("course.html", "id", {cid: c["url"] for cid, c in COURSES.items()}, "courses.html"),
        ("programme.html", "id", {pid: p["url"] for pid, p in PROGRAMMES.items()}, "programmes.html"),
        ("blog-post.html", "slug", {p["slug"]: p["url"] for p in POSTS}, "blog.html"),
        ("cc-level.html", "id", {lid: lv["url"] for lid, lv in LEVELS.items()}, "codechamps.html"),
    ]
    for legacy, param, mapping, fallback in shims:
        out = env.get_template("redirect.html").render(site=SITE, legacy=legacy, param=param, map=mapping, fallback=fallback)
        (ROOT / legacy).write_text(out, encoding="utf-8", newline="\n")
        print(f"  {legacy}")


def build_sitemap_robots() -> None:
    lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for path, cf, pr in SITEMAP + [("verify.html", "yearly", "0.3")]:
        lines.append(f"  <url><loc>{absolute(path)}</loc><lastmod>{TODAY}</lastmod><changefreq>{cf}</changefreq><priority>{pr}</priority></url>")
    lines.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")
    robots = f"""User-agent: *
Allow: /

# Portal, auth and non-website folders — no indexing value
Disallow: /admin/
Disallow: /student/
Disallow: /login.html
Disallow: /register.html
Disallow: /reset-password.html
Disallow: /forgot-password.html
Disallow: /course.html
Disallow: /programme.html
Disallow: /blog-post.html
Disallow: /cc-level.html
Disallow: /src/
Disallow: /tools/
Disallow: /_legacy/
Disallow: /dsa_app/
Disallow: /social-automation/
Disallow: /pwa_icon_bundle/

Sitemap: {SITE['url']}/sitemap.xml
"""
    (ROOT / "robots.txt").write_text(robots, encoding="utf-8", newline="\n")
    print(f"sitemap.xml ({len(SITEMAP) + 1} URLs) + robots.txt")


def build_llms_txt() -> None:
    """llms.txt — a Markdown map of the site for AI crawlers and agents (https://llmstxt.org)."""
    a = SITE["address"]
    L = [f"# {SITE['name']}", "", f"> {SITE['description']}", "",
         f"Address: {a['street']}, {a['locality']}, {a['region']} {a['postal']}, India. Phone/WhatsApp: {SITE['phone']}. "
         f"Email: {SITE['email']}. Hours: {SITE['hours']}. Founded {SITE['founded']}; MSME registered; AICTE-aligned internships and FDPs.",
         "", "## Key pages", ""]
    for name, path in [("Home", ""), ("All courses", "courses.html"), ("Programmes", "programmes.html"),
                       ("DSA Code Champs (schools, Grades 3-12)", "codechamps.html"), ("Student projects", "projects.html"),
                       ("Intern testimonials", "testimonials.html"), ("Blog", "blog.html"), ("About", "about.html"),
                       ("Contact and enrol", "contact.html")]:
        L.append(f"- [{name}]({absolute(path)})")
    L += ["", "## Courses", ""]
    for c in COURSES.values():
        L.append(f"- [{c['title']}]({absolute(c['url'])}): {c['category']} - {c['level']} - {c['duration']}, {c['hours']}. {meta_desc(c['overview'], 140)}")
    L += ["", "## Programmes", ""]
    for p in PROGRAMMES.values():
        L.append(f"- [{p['title']}]({absolute(p['url'])}): {p['subtitle']} - {p['duration']}. {meta_desc(p['overview'], 140)}")
    L += ["", "## DSA Code Champs levels", ""]
    for lv in LEVELS.values():
        L.append(f"- [{lv['name']}]({absolute(lv['url'])}): {lv['badge']} - {lv['grade']} - {lv['age']} - {lv['duration']}, {lv['sessions']}.")
    L += ["", "## Blog posts", ""]
    for post in POSTS:
        L.append(f"- [{post['title']}]({absolute(post['url'])}): {post['catLabel']}, {post['dateDisplay']}. {meta_desc(post['excerpt'], 140)}")
    L += ["", "## Optional", "", f"- [Company facts (plain text)]({absolute('Company_Info.txt')})", f"- [Sitemap]({absolute('sitemap.xml')})", ""]
    (ROOT / "llms.txt").write_text("\n".join(L), encoding="utf-8", newline="\n")
    print("llms.txt")


def main() -> None:
    build_pages()
    build_details()
    build_redirects()
    build_sitemap_robots()
    build_llms_txt()
    print("Build complete.")


if __name__ == "__main__":
    main()

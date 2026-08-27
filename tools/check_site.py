"""
check_site.py — static QA for the built site (SEO, accessibility, links, structured data).

    python tools/check_site.py            # check every public page
    python tools/check_site.py courses.html courses/python.html   # check specific pages

Exit code 1 if any ERROR is found. WARNs are advisory.
"""
from __future__ import annotations

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent
SKIP_DIRS = {"admin", "student", "_legacy", "src", "tools", "dsa_app", "social-automation", "pwa_icon_bundle", "node_modules", "assets"}
SKIP_FILES = {"login.html", "register.html", "reset-password.html", "forgot-password.html", "verify.html",
              "course.html", "programme.html", "blog-post.html", "cc-level.html"}

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.in_title = False
        self.meta = {}
        self.h1 = []
        self._h1_open = False
        self.links = []
        self.imgs = []
        self.ids = []
        self.jsonld = []
        self._ld_open = False
        self.canonical = None
        self.onclick = 0
        self.headings = []
        self._h_open = None
        self.text_len = 0
        self.details = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "title":
            self.in_title = True
        elif tag == "meta" and a.get("name") in ("description", "robots") or a.get("property", "").startswith("og:"):
            self.meta[a.get("name") or a.get("property")] = a.get("content", "")
        elif tag == "h1":
            self._h1_open = True
            self.h1.append("")
        elif tag in ("h2", "h3", "h4"):
            self._h_open = tag
            self.headings.append([tag, ""])
        elif tag == "a" and a.get("href"):
            self.links.append((a["href"], a.get("target"), a.get("rel", "")))
        elif tag == "img":
            self.imgs.append(a)
        elif tag == "link" and a.get("rel") == "canonical":
            self.canonical = a.get("href")
        elif tag == "link" and a.get("href"):
            self.links.append((a["href"], None, "asset"))
        elif tag == "script" and a.get("type") == "application/ld+json":
            self._ld_open = True
            self.jsonld.append("")
        elif tag == "script" and a.get("src"):
            self.links.append((a["src"], None, "asset"))
        elif tag == "details":
            self.details += 1
        if a.get("id"):
            self.ids.append(a["id"])
        if any(k.startswith("on") for k in a):
            self.onclick += 1

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        elif tag == "h1":
            self._h1_open = False
        elif tag in ("h2", "h3", "h4"):
            self._h_open = None
        elif tag == "script":
            self._ld_open = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self._h1_open and self.h1:
            self.h1[-1] += data
        if self._h_open and self.headings:
            self.headings[-1][1] += data
        if self._ld_open and self.jsonld:
            self.jsonld[-1] += data
        self.text_len += len(data.strip())


def public_pages():
    for p in ROOT.rglob("*.html"):
        rel = p.relative_to(ROOT)
        if rel.parts[0] in SKIP_DIRS or rel.name in SKIP_FILES or rel.name.startswith("."):
            continue
        yield rel.as_posix()


def check(rel: str) -> list[tuple[str, str]]:
    issues = []
    path = ROOT / rel
    html = path.read_text(encoding="utf-8", errors="replace")
    pg = Page()
    pg.feed(html)
    E = lambda m: issues.append(("ERROR", m))
    W = lambda m: issues.append(("WARN", m))

    t = pg.title.strip()
    if not t:
        E("missing <title>")
    elif len(t) > 65:
        W(f"title is {len(t)} chars (aim ≤ 60): {t!r}")
    d = pg.meta.get("description", "")
    if not d:
        E("missing meta description")
    elif len(d) < 80 or len(d) > 165:
        W(f"meta description is {len(d)} chars (aim 120–158)")
    if not pg.canonical:
        E("missing canonical")
    if len(pg.h1) != 1:
        E(f"{len(pg.h1)} <h1> elements (need exactly 1)")
    if not pg.meta.get("og:image"):
        W("no og:image")
    for i, ld in enumerate(pg.jsonld):
        try:
            json.loads(ld)
        except Exception as ex:
            E(f"JSON-LD block {i + 1} invalid: {ex}")
    if rel != "404.html" and len(pg.jsonld) < 2:
        W("no page-specific JSON-LD (only the site graph)")
    if pg.onclick:
        W(f"{pg.onclick} inline on* handler(s)")
    dup = {i for i in pg.ids if pg.ids.count(i) > 1}
    if dup:
        E(f"duplicate ids: {sorted(dup)[:6]}")
    if re.search(r"Website Images/|Intern Testimonials/", html):
        E("references unoptimised source images (use img())")
    if "{{" in html or "{%" in html:
        E("unrendered Jinja syntax in output")
    for a in pg.imgs:
        if "alt" not in a:
            E(f"<img> without alt: {a.get('src', '')[:60]}")
        if a.get("src", "").endswith(".webp") and not (a.get("width") and a.get("height")):
            W(f"<img> without width/height: {a.get('src', '')[:60]}")
    # links
    base_dir = path.parent
    for href, target, relattr in pg.links:
        if href.startswith(("http://", "https://", "mailto:", "tel:", "#", "data:", "javascript:")):
            if href.startswith("http") and target == "_blank" and "noopener" not in relattr:
                W(f"external target=_blank without rel=noopener: {href[:60]}")
            continue
        clean = unquote(urlsplit(href).path)
        if not clean:
            continue
        tgt = (base_dir / clean).resolve()
        if not tgt.exists():
            E(f"broken link/src: {href}")
    # heading order sanity
    last = 1
    for tag, text in pg.headings:
        lvl = int(tag[1])
        if lvl > last + 1:
            W(f"heading jumps h{last} → {tag} ({text.strip()[:40]!r})")
        last = lvl
    if pg.text_len < 800:
        W(f"thin content ({pg.text_len} chars of text)")
    return issues


def main() -> None:
    pages = sys.argv[1:] or sorted(public_pages())
    errors = 0
    for rel in pages:
        issues = check(rel)
        if issues:
            print(f"\n{rel}")
            for lvl, msg in issues:
                print(f"  {lvl}: {msg}")
                errors += lvl == "ERROR"
    print(f"\nChecked {len(pages)} pages — {errors} error(s).")
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()

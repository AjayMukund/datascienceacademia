"""Honest sitemap <lastmod> dates.

A page's lastmod changes only when the visible text of its main content changes — not when the header, footer,
icons, CSS or line-break characters change. Google ignores lastmod on sites where every page always says "today".

State lives in content/lastmod.json  { "path": {"hash": "...", "date": "YYYY-MM-DD"} }  (committed).
build.py calls  page_lastmod(path, html)  for each sitemap page.

  python tools/lastmod.py --seed    rebuild the JSON from git history (date of the last commit that changed each
                                    page's main text). Run once, or if the JSON is lost.
"""
from __future__ import annotations

import datetime as dt
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STATE = ROOT / "content" / "lastmod.json"
TODAY = dt.date.today().isoformat()


def content_hash(html: str) -> str:
    m = re.search(r"<main\b.*?</main>", html, re.S | re.I)
    body = m.group(0) if m else html
    body = re.sub(r"<(script|style|svg|head)\b.*?</\1>", " ", body, flags=re.S | re.I)
    text = re.sub(r"<[^>]+>", " ", body)
    text = re.sub(r"&nbsp;|&#160;", " ", text)
    text = text.replace("⁠", "").replace(" ", " ").replace("­", "")
    text = re.sub(r"[\U0001F000-\U0001FAFF☀-➿️]", "", text)   # emoji vs SVG icon swaps
    text = re.sub(r"\s+", " ", text).strip()
    return hashlib.sha1(text.encode("utf-8")).hexdigest()[:16]


_state: dict | None = None


def _load() -> dict:
    global _state
    if _state is None:
        _state = json.loads(STATE.read_text(encoding="utf-8")) if STATE.exists() else {}
    return _state


def page_lastmod(path: str, html: str) -> str:
    st = _load()
    h = content_hash(html)
    rec = st.get(path)
    if not rec or rec["hash"] != h:
        st[path] = rec = {"hash": h, "date": TODAY}
    return rec["date"]


def save() -> None:
    if _state is not None:
        STATE.write_text(json.dumps(dict(sorted(_state.items())), indent=1) + "\n", encoding="utf-8", newline="\n")


def _git(*args: str) -> str:
    return subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True, encoding="utf-8",
                          errors="replace").stdout


def seed() -> None:
    locs = re.findall(r"<loc>https://[^/]+/([^<]*)</loc>", (ROOT / "sitemap.xml").read_text(encoding="utf-8"))
    st = {}
    for path in locs:
        f = path or "index.html"
        cur = content_hash((ROOT / f).read_text(encoding="utf-8"))
        date = None
        log = _git("log", "--format=%H %ad", "--date=short", "--", f).split("\n")
        prev_date = None
        for line in filter(None, log):          # newest first
            sha, d = line.split()
            old = _git("show", f"{sha}:{f}")
            if content_hash(old) != cur:
                break                            # text differed before this commit → change happened at prev_date
            prev_date = d
        date = prev_date or TODAY
        st[path] = {"hash": cur, "date": date}
        print(f"  {date}  {path or '/'}")
    STATE.write_text(json.dumps(dict(sorted(st.items())), indent=1) + "\n", encoding="utf-8", newline="\n")


if __name__ == "__main__":
    if "--seed" in sys.argv:
        seed()

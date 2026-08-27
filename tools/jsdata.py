"""
jsdata.py — load the site's JavaScript data files (courses-data.js, programmes-data.js,
blog-data.js, cc-levels-data.js, projects-data.js, testimonials-data.js) into Python.

The data files are plain JS object/array literals (single quotes, unquoted keys,
trailing commas, comments, template literals). We slice the literal out of the
`const NAME = ...;` declaration, convert template literals to JSON strings and parse
the result with json5.

Usage:
    from jsdata import load_all
    data = load_all(ROOT)          # dict with courses, programmes, posts, cat_style, levels, projects, testimonials
"""
from __future__ import annotations

import json
import re
from pathlib import Path

import json5

_QUOTES = "'\"`"


def extract_literal(text: str, name: str) -> str:
    """Return the balanced `{...}` / `[...]` literal assigned to `const NAME = ...`."""
    m = re.search(r"(?:const|let|var)\s+" + re.escape(name) + r"\s*=\s*", text)
    if not m:
        raise KeyError(f"variable {name!r} not found")
    i = m.end()
    open_ch = text[i]
    close_ch = {"{": "}", "[": "]"}[open_ch]
    depth = 0
    j = i
    n = len(text)
    while j < n:
        c = text[j]
        if c in _QUOTES:                       # skip string
            q = c
            j += 1
            while j < n and text[j] != q:
                if text[j] == "\\":
                    j += 1
                j += 1
            j += 1
            continue
        if c == "/" and text[j + 1 : j + 2] == "/":   # line comment
            j = text.find("\n", j)
            if j == -1:
                j = n
            continue
        if c == "/" and text[j + 1 : j + 2] == "*":   # block comment
            j = text.find("*/", j) + 2
            continue
        if c == open_ch:
            depth += 1
        elif c == close_ch:
            depth -= 1
            if depth == 0:
                return text[i : j + 1]
        j += 1
    raise ValueError(f"unbalanced literal for {name}")


_ESC = {"n": "\n", "r": "\r", "t": "\t", "b": "\b", "f": "\f", "v": "\v", "0": "\0"}


def convert_template_literals(src: str) -> str:
    """Replace JS template literals (`...`) with JSON string literals."""
    out = []
    i = 0
    n = len(src)
    while i < n:
        c = src[i]
        if c == "`":
            j = i + 1
            buf = []
            while j < n and src[j] != "`":
                if src[j] == "\\" and j + 1 < n:
                    nxt = src[j + 1]
                    buf.append(_ESC.get(nxt, nxt))
                    j += 2
                    continue
                buf.append(src[j])
                j += 1
            out.append(json.dumps("".join(buf), ensure_ascii=False))
            i = j + 1
            continue
        if c in "'\"":
            q = c
            j = i + 1
            while j < n and src[j] != q:
                if src[j] == "\\":
                    j += 1
                j += 1
            out.append(src[i : j + 1])
            i = j + 1
            continue
        if c == "/" and src[i + 1 : i + 2] == "/":
            j = src.find("\n", i)
            j = n if j == -1 else j
            out.append(src[i:j])
            i = j
            continue
        if c == "/" and src[i + 1 : i + 2] == "*":
            j = src.find("*/", i) + 2
            out.append(src[i:j])
            i = j
            continue
        out.append(c)
        i += 1
    return "".join(out)


def load_var(path: Path, name: str):
    text = path.read_text(encoding="utf-8")
    literal = extract_literal(text, name)
    return json5.loads(convert_template_literals(literal))


def load_all(root: Path) -> dict:
    root = Path(root)
    courses = load_var(root / "courses-data.js", "DSA_COURSES")
    programmes = load_var(root / "programmes-data.js", "DSA_PROGRAMMES")
    posts = load_var(root / "blog-data.js", "POSTS")
    cat_style = load_var(root / "blog-data.js", "CAT_STYLE")
    levels = load_var(root / "cc-levels-data.js", "CC_LEVELS")
    projects = load_var(root / "projects-data.js", "PROJECTS")
    project_cats = load_var(root / "projects-data.js", "CAT")
    testimonials = load_var(root / "testimonials-data.js", "TESTIMONIALS")
    return {
        "courses": courses,
        "programmes": programmes,
        "posts": posts,
        "cat_style": cat_style,
        "levels": levels,
        "projects": projects,
        "project_cats": project_cats,
        "testimonials": testimonials,
    }


if __name__ == "__main__":  # quick self-test
    import sys

    root = Path(sys.argv[1] if len(sys.argv) > 1 else ".")
    d = load_all(root)
    for k, v in d.items():
        print(f"{k:14s} {type(v).__name__:5s} {len(v)}")

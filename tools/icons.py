"""Outline icon system for the static site.

Every emoji used as an icon in pages, templates and content/*-data.js is swapped at build time for an
inline outline SVG: Lucide (ISC, https://lucide.dev → src/icons/*.svg) or Tabler (MIT, https://tabler.io/icons →
src/icons/tabler/*.svg, written "tabler/<name>"). A data value or text can also name an icon directly with the
marker  ico:<name>  or  ico:tabler/<name>  (e.g. icon:'ico:tabler/brand-azure' in courses-data.js).
Colour comes from CSS (.ico → brand Navy on light surfaces, Muted Gold on dark/navy surfaces).

  python tools/icons.py --fetch    download any icon in EMOJI_ICONS that is missing from src/icons/

To add an icon: map the emoji to a Lucide name below, run --fetch, rebuild.
Star ratings (★) are deliberately NOT mapped: an outlined star reads as an empty rating.
"""
from __future__ import annotations

import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ICON_DIR = ROOT / "src" / "icons"
LUCIDE_VERSION = "0.460.0"
TABLER_VERSION = "3.19.0"

# emoji (without/with VS16 both handled) → Lucide icon name
EMOJI_ICONS: dict[str, str] = {
    "🎓": "graduation-cap", "🤖": "bot", "🏆": "trophy", "🏛": "landmark", "📊": "chart-column",
    "🔬": "microscope", "🐍": "tabler/brand-python", "💬": "messages-square", "⚙": "settings", "🧠": "brain",
    "👁": "scan-eye", "🎮": "gamepad-2", "🚀": "rocket", "📋": "clipboard-list", "📚": "library",
    "🎯": "tabler/target-arrow", "⚡": "zap", "⏱": "timer", "🏅": "award", "✉": "mail", "🏫": "school",
    "☁": "cloud", "📞": "phone", "📍": "map-pin", "💼": "briefcase", "🏢": "building-2",
    "📜": "tabler/certificate", "🗓": "calendar-days", "📖": "book-open", "📈": "trending-up",
    "📝": "notebook-pen", "📘": "book-marked", "📡": "monitor-play", "🔀": "blend", "🏷": "badge-check",
    "⏯": "circle-play", "🧭": "tabler/route", "🐱": "cat", "🌐": "globe", "🎥": "video",
    "🤝": "handshake", "📄": "file-text", "🧑‍🏫": "presentation", "💡": "lightbulb", "🎨": "palette",
    "🗄": "database", "📐": "sigma", "🗂": "folder-kanban", "🧪": "flask-conical", "🗺": "map",
    "🔐": "shield-check", "🌍": "earth", "👨‍👩‍👧": "users-round", "👦": "user-round", "🧒": "user-round",
    "👧": "user-round", "🕐": "clock", "✅": "circle-check", "🌱": "sprout", "👥": "users",
    "📁": "folder-open", "💻": "laptop", "⭐": "star", "🔗": "link", "🧱": "blocks", "🔁": "repeat",
    "🐢": "turtle", "🗣": "speech", "🖼": "image", "🔤": "bot-message-square", "✨": "sparkles",
    "🔷": "chart-pie", "🟠": "cloud-cog", "🏁": "flag", "✍": "pen-line", "🔍": "search",
    "⚗": "flask-round", "🔄": "refresh-cw", "📤": "send", "🧩": "puzzle", "🔢": "binary",
    "📅": "calendar", "🎒": "backpack", "🎤": "mic", "📧": "at-sign", "🖥": "monitor", "✏": "pencil",
    "🎙": "mic-vocal", "🌟": "sparkle", "⬆": "circle-arrow-up", "✕": "x",
}

_VS16 = "️"
# longest keys first so ZWJ sequences win over their first code point
_KEYS = sorted(EMOJI_ICONS, key=len, reverse=True)
EMOJI_RE = re.compile("(?:" + "|".join(re.escape(k) for k in _KEYS) + ")" + _VS16 + "?")
TOKEN_RE = re.compile(r"ico:((?:tabler/)?[a-z0-9-]+)")
_cache: dict[str, str] = {}
KEEP_TOGETHER = ("1-on-1", "+91 91764 98814", "problem-solving", "AI engineer", "AI Engineer", "Anna University", "pre-filled", "enquiry form", "Grades 3 to 12", "3 to 12")   # visible-text phrases that must never wrap mid-phrase


def _unbreakable(phrase: str) -> str:
    """Spaces → no-break spaces, hyphens → word-joined hyphens. No extra elements, so flex list items keep their layout."""
    return phrase.replace(" ", " ").replace("-", "⁠-⁠")


# Short hyphenated words (pre-filled, real-world, AI-901, end-to-end) never break at the hyphen. Skips URLs, file names,
# e-mails and anything longer than 24 characters so long strings can still wrap on phones.
HYPHEN_RE = re.compile(r"(?<![\w./@:#=-])(\w+(?:-\w+)+)(?![\w/@=-]|\.\w)")


def _join_hyphens(m: re.Match) -> str:
    w = m.group(1)
    return w.replace("-", "⁠-⁠") if len(w) <= 24 else w


def svg_inner(name: str) -> str:
    if name not in _cache:
        src = (ICON_DIR / f"{name}.svg").read_text(encoding="utf-8")
        src = re.sub(r"<!--.*?-->", "", src, flags=re.S).strip()
        body = src.split(">", 1)[-1].rsplit("</svg>", 1)[0]
        body = re.sub(r'<path stroke="none" d="M0 0h24v24H0z" fill="none"\s*/>', "", body)   # Tabler bounding box
        _cache[name] = re.sub(r"\s+", " ", re.sub(r"\s*/>", "/>", body)).strip()
    return _cache[name]


def icon_svg(name: str) -> str:
    return (f'<svg class="ico ico-{name.replace("/", "-")}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
            f'{svg_inner(name)}</svg>')


_SKIP = re.compile(r"(<script\b.*?</script>|<style\b.*?</style>|<title\b.*?</title>|<head\b.*?</head>|<textarea\b.*?</textarea>|<[^>]+>)", re.S | re.I)


def replace_emoji(html: str) -> str:
    """Swap mapped emoji in text nodes only (never inside tags, attributes, head, scripts or styles)."""
    out = []
    for part in _SKIP.split(html):
        if not part:
            continue
        if part.startswith("<"):
            out.append(part)
        else:
            for phrase in KEEP_TOGETHER:          # never break these across lines
                part = part.replace(phrase, _unbreakable(phrase))
            part = HYPHEN_RE.sub(_join_hyphens, part)   # plain text only — must run before SVG icons are inserted
            part = TOKEN_RE.sub(lambda m: icon_svg(m.group(1)), part)
            out.append(EMOJI_RE.sub(lambda m: icon_svg(EMOJI_ICONS[m.group().rstrip(_VS16)]), part))
    return "".join(out)


def fetch() -> None:
    names = set(EMOJI_ICONS.values())
    for f in list((ROOT / "content").glob("*-data.js")) + list((ROOT / "src").rglob("*.html")):
        names |= set(TOKEN_RE.findall(f.read_text(encoding="utf-8")))
    for name in sorted(names):
        p = ICON_DIR / f"{name}.svg"
        if p.exists():
            continue
        p.parent.mkdir(parents=True, exist_ok=True)
        if name.startswith("tabler/"):
            url = f"https://unpkg.com/@tabler/icons@{TABLER_VERSION}/icons/outline/{name[7:]}.svg"
        else:
            url = f"https://unpkg.com/lucide-static@{LUCIDE_VERSION}/icons/{name}.svg"
        try:
            data = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "icon-fetch"}), timeout=20).read()
            p.write_bytes(data)
            print("  fetched", name)
        except Exception as e:  # noqa: BLE001
            print("  MISSING", name, e)


if __name__ == "__main__":
    if "--fetch" in sys.argv:
        fetch()

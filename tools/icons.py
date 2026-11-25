"""Outline icon system for the static site.

Every emoji used as an icon in pages, templates and content/*-data.js is swapped at build time for an
inline Lucide outline SVG (ISC licence, https://lucide.dev — files vendored in src/icons/).
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

# emoji (without/with VS16 both handled) → Lucide icon name
EMOJI_ICONS: dict[str, str] = {
    "🎓": "graduation-cap", "🤖": "bot", "🏆": "trophy", "🏛": "landmark", "📊": "chart-column",
    "🔬": "microscope", "🐍": "code-xml", "💬": "messages-square", "⚙": "settings", "🧠": "brain",
    "👁": "scan-eye", "🎮": "gamepad-2", "🚀": "rocket", "📋": "clipboard-list", "📚": "library",
    "🎯": "target", "⚡": "zap", "⏱": "timer", "🏅": "award", "✉": "mail", "🏫": "school",
    "☁": "cloud", "📞": "phone", "📍": "map-pin", "💼": "briefcase", "🏢": "building-2",
    "📜": "scroll-text", "🗓": "calendar-days", "📖": "book-open", "📈": "trending-up",
    "📝": "notebook-pen", "📘": "book-marked", "📡": "radio", "🔀": "blend", "🏷": "badge-check",
    "⏯": "circle-play", "🧭": "compass", "🐱": "cat", "🌐": "globe", "🎥": "video",
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
_cache: dict[str, str] = {}


def svg_inner(name: str) -> str:
    if name not in _cache:
        src = (ICON_DIR / f"{name}.svg").read_text(encoding="utf-8")
        body = src.split(">", 2)[-1] if src.startswith("<!--") else src.split(">", 1)[-1]
        body = body.rsplit("</svg>", 1)[0]
        _cache[name] = re.sub(r"\s+", " ", re.sub(r"\s*/>", "/>", body)).strip()
    return _cache[name]


def icon_svg(name: str) -> str:
    return (f'<svg class="ico ico-{name}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
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
            out.append(EMOJI_RE.sub(lambda m: icon_svg(EMOJI_ICONS[m.group().rstrip(_VS16)]), part))
    return "".join(out)


def fetch() -> None:
    ICON_DIR.mkdir(parents=True, exist_ok=True)
    for name in sorted(set(EMOJI_ICONS.values())):
        p = ICON_DIR / f"{name}.svg"
        if p.exists():
            continue
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

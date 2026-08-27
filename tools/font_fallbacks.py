"""
font_fallbacks.py — generate metric-matched fallback @font-face rules so text does not
reflow when the self-hosted web fonts swap in (eliminates font-swap layout shift / CLS).

For each web font we compute size-adjust / ascent-override / descent-override /
line-gap-override for a widely available system fallback (Arial, Times New Roman,
Courier New — metric-compatible with Liberation Sans/Serif/Mono on Linux), and write
them into assets/fonts/fonts.css between marker comments. The CSS font stacks in
style.css list the fallback family right after the web font.

    python tools/font_fallbacks.py

Requires fontTools (pip install fonttools) and the TTFs in tools/.fonts-ttf
(downloaded by tools/fetch_fonts.py).
"""
from __future__ import annotations

import re
from pathlib import Path

from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
FONTS_CSS = ROOT / "assets" / "fonts" / "fonts.css"
WIN = Path("C:/Windows/Fonts")

# Representative English prose (site copy) — average advance width is measured over this.
SAMPLE = (
    "Data Science Academia is a Ph.D.-led AI institute in Chennai. 18 specialised courses, "
    "AICTE-aligned internships, Microsoft certification pathways and a 12-month AI Mastery "
    "Track — every module taught by a practising AI engineer with Anna University research "
    "depth. Learn Data Science & AI from practitioners, not just professors. Explore courses "
    "and book a free trial session today."
)

# (fallback family name used in CSS, web font TTF, local() candidates, local metrics file)
PAIRS = [
    ("Outfit Fallback", ROOT / "tools/.fonts-ttf/outfit-400.ttf",
     ["Arial", "Liberation Sans", "Helvetica Neue", "Helvetica"], WIN / "arial.ttf"),
    ("Cormorant Garamond Fallback", ROOT / "tools/.fonts-ttf/cormorant-garamond-600.ttf",
     ["Times New Roman", "Liberation Serif", "Tinos", "Times"], WIN / "times.ttf"),
    ("Fira Code Fallback", ROOT / "tools/.fonts-ttf/fira-code-400.ttf",
     ["Courier New", "Liberation Mono", "Cousine"], WIN / "cour.ttf"),
]


def avg_width(font: TTFont) -> float:
    cmap = font.getBestCmap()
    hmtx = font["hmtx"]
    upm = font["head"].unitsPerEm
    widths = [hmtx[cmap[ord(c)]][0] for c in SAMPLE if ord(c) in cmap]
    return sum(widths) / len(widths) / upm


def vmetrics(font: TTFont) -> tuple[float, float, float]:
    upm = font["head"].unitsPerEm
    os2, hhea = font["OS/2"], font["hhea"]
    if os2.fsSelection & (1 << 7):        # USE_TYPO_METRICS
        asc, desc, gap = os2.sTypoAscender, os2.sTypoDescender, os2.sTypoLineGap
    else:
        asc, desc, gap = hhea.ascent, hhea.descent, hhea.lineGap
    return asc / upm, abs(desc) / upm, gap / upm


def rule(name: str, web: Path, locals_: list[str], fallback: Path) -> str:
    w, f = TTFont(str(web)), TTFont(str(fallback))
    sa = avg_width(w) / avg_width(f)
    asc, desc, gap = vmetrics(w)
    src = ", ".join(f"local('{l}')" for l in locals_)
    print(f"  {name:28s} size-adjust {sa*100:6.2f}%  ascent {asc/sa*100:6.2f}%  descent {desc/sa*100:6.2f}%  line-gap {gap/sa*100:5.2f}%")
    return (f"@font-face{{font-family:'{name}';src:{src};size-adjust:{sa*100:.2f}%;"
            f"ascent-override:{asc/sa*100:.2f}%;descent-override:{desc/sa*100:.2f}%;line-gap-override:{gap/sa*100:.2f}%;}}")


def main() -> None:
    print("Metric-matched fallbacks:")
    block = "/* fallbacks:start — metric-matched system fallbacks (tools/font_fallbacks.py) */\n" + \
            "\n".join(rule(*p) for p in PAIRS) + "\n/* fallbacks:end */"
    css = FONTS_CSS.read_text(encoding="utf-8")
    if "/* fallbacks:start" in css:
        css = re.sub(r"/\* fallbacks:start.*?/\* fallbacks:end \*/", block, css, flags=re.S)
    else:
        css = css.rstrip("\n") + "\n" + block + "\n"
    FONTS_CSS.write_text(css, encoding="utf-8")
    print(f"written → {FONTS_CSS.relative_to(ROOT)}")


if __name__ == "__main__":
    main()

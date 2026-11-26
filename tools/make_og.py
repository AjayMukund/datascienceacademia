"""
make_og.py — generate 1200×630 Open Graph / Twitter preview images in assets/og/.

    python tools/make_og.py

Creates assets/og/default.jpg plus one image per course, programme, Code Champs level,
blog post and key landing page (title overlaid on the item's own artwork).
Fonts come from tools/.fonts-ttf (downloaded by tools/fetch_fonts.py).
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

sys.path.insert(0, str(Path(__file__).resolve().parent))
from jsdata import load_all  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "og"
FONTS = ROOT / "tools" / ".fonts-ttf"
W, H = 1200, 630
# Brand palette (designer brand guide, Nov 2026) — social templates: navy + ivory + teal, gold accents
NAVY = (16, 38, 61)
NAVY_D = (11, 27, 44)
IVORY = (246, 243, 236)
GOLD = (201, 169, 112)
TEAL = (73, 154, 145)
TEAL_L = (111, 194, 184)
MIST = (185, 194, 204)
# artwork sits inside a large circle on the right; its left edge is the brand "swoosh" curve
CX, CY, R = 1250, 315, 575


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    p = FONTS / name
    return ImageFont.truetype(str(p), size) if p.exists() else ImageFont.load_default()


F_TITLE = lambda s: font("outfit-700.ttf", s)
F_BODY = lambda s: font("outfit-400.ttf", s)
F_BOLD = lambda s: font("outfit-600.ttf", s)

_logo = None


def logo(size: int) -> Image.Image:
    global _logo
    if _logo is None:
        _logo = Image.open(ROOT / "assets/img/logo-mark-256.png").convert("RGBA")
    return _logo.resize((size, size), Image.LANCZOS)


def wrap(draw: ImageDraw.ImageDraw, text: str, fnt, max_w: int, max_lines: int = 2) -> list[str]:
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=fnt) <= max_w:
            cur = t
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    if len(lines) > max_lines:
        lines = lines[:max_lines]
        lines[-1] = lines[-1].rstrip(",;:") + "…"
    return lines


def spaced(draw: ImageDraw.ImageDraw, xy, text: str, fnt, fill, tracking: float) -> None:
    """Letter-spaced text (for the ACADEMIA wordmark line)."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += draw.textlength(ch, font=fnt) + tracking


def cover(src: Path) -> Image.Image:
    im = Image.open(src).convert("RGB")
    ratio = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * ratio), round(im.height * ratio)), Image.LANCZOS)
    x, y = (im.width - W) // 2, (im.height - H) // 2
    return im.crop((x, y, x + W, y + H))


def base(image: Path | None) -> Image.Image:
    """Navy canvas; the item's artwork (or an ivory disc) fills a large circle on the right,
    framed by a gold arc and a teal ring — the brand swoosh."""
    im = Image.new("RGB", (W, H), NAVY)
    glow = Image.new("RGB", (W, H), NAVY)
    ImageDraw.Draw(glow).ellipse((-260, -320, 640, 380), fill=(26, 58, 84))
    im = Image.blend(im, glow.filter(ImageFilter.GaussianBlur(140)), 0.8)
    mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(mask).ellipse((CX - R, CY - R, CX + R, CY + R), fill=255)
    if image and image.exists():
        art = cover(image)
        # soften the inner edge slightly so bright artwork meets the navy panel cleanly
        fade = Image.new("L", (W, H), 0)
        fd = ImageDraw.Draw(fade)
        for x in range(W):
            fd.line([(x, 0), (x, H)], fill=int(max(0, min(1, (x - (CX - R)) / 160)) * 255))
        art = Image.composite(art, Image.new("RGB", (W, H), NAVY_D), fade)
    else:
        art = Image.new("RGB", (W, H), IVORY)          # no artwork: ivory disc with brand rings + mark
        ad = ImageDraw.Draw(art)
        cx = 975
        ad.ellipse((cx - 250, CY - 250, cx + 250, CY + 250), fill=(226, 238, 235))
        ad.ellipse((cx - 170, CY - 170, cx + 170, CY + 170), outline=TEAL, width=7)
        ad.arc((cx - 205, CY - 205, cx + 205, CY + 205), 200, 320, fill=GOLD, width=5)
        ad.ellipse((cx - 118, CY - 118, cx + 118, CY + 118), fill=NAVY)
        lg = logo(150)
        art.paste(lg, (cx - 75, CY - 75), lg)
    im.paste(art, (0, 0), mask)
    d = ImageDraw.Draw(im)
    d.arc((CX - R - 14, CY - R - 14, CX + R + 14, CY + R + 14), 128, 228, fill=GOLD, width=4)
    d.arc((CX - R - 34, CY - R - 34, CX + R + 34, CY + R + 34), 150, 205, fill=TEAL, width=2)
    return im


_MANIFEST = None


def resolve(image: Path | None) -> Path | None:
    """Data files may name an image by its manifest key (e.g. 'analytics-category-banner')."""
    global _MANIFEST
    if image is None or image.exists():
        return image
    if _MANIFEST is None:
        import json
        _MANIFEST = json.loads((ROOT / "assets/img/manifest.json").read_text(encoding="utf-8"))
    entry = _MANIFEST.get(image.name)
    return (ROOT / "source-images" / entry["src"]) if entry else image


def clean(text: str) -> str:
    return text.replace("→", "–").replace("←", "–")     # arrows are not in the Outfit TTF


def make(name: str, title: str, kicker: str, image: Path | None, subtitle: str = "") -> None:
    title, kicker, subtitle = clean(title), clean(kicker), clean(subtitle)
    im = base(resolve(image))
    d = ImageDraw.Draw(im)
    text_w = 590                                   # stays left of the curved artwork edge
    # wordmark lockup: mark + DATA SCIENCE / ACADEMIA
    lg = logo(54)
    im.paste(lg, (72, 58), lg)
    d.text((138, 58), "DATA SCIENCE", font=F_TITLE(26), fill=IVORY)
    spaced(d, (139, 92), "ACADEMIA", F_BOLD(15), GOLD, 7.5)
    # kicker
    lines_sub = wrap(d, subtitle, F_BODY(23), text_w, 2) if subtitle else []
    size = 62
    while size > 40:
        lines = wrap(d, title, F_TITLE(size), text_w, 3)
        if all(d.textlength(l, font=F_TITLE(size)) <= text_w for l in lines) and not lines[-1].endswith("…"):
            break
        size -= 3
    block = 34 + len(lines) * int(size * 1.1) + (16 + len(lines_sub) * 31 if lines_sub else 0)
    y = max(160, 330 - block // 2)
    d.text((72, y), kicker.upper(), font=F_BOLD(19), fill=TEAL_L)
    d.line([(72, y + 30), (112, y + 30)], fill=GOLD, width=3)
    y += 44
    fnt = F_TITLE(size)
    for line in lines:
        d.text((70, y), line, font=fnt, fill=IVORY)
        y += int(size * 1.1)
    if lines_sub:
        y += 12
        for line in lines_sub:
            d.text((72, y), line, font=F_BODY(23), fill=MIST)
            y += 31
    # bottom strip
    d.line([(72, H - 80), (650, H - 80)], fill=GOLD, width=2)
    d.text((72, H - 64), "datascienceacademia.in", font=F_BOLD(20), fill=IVORY)
    cred = "NEP 2020-aligned · MSME Registered · Est. 2019"
    d.text((72, H - 36), cred, font=F_BODY(16), fill=MIST)
    OUT.mkdir(parents=True, exist_ok=True)
    im.save(OUT / f"{name}.jpg", "JPEG", quality=84, optimize=True, progressive=True)
    print(f"  {name}.jpg")


def main() -> None:
    d = load_all(ROOT)
    W_IMG = ROOT / "source-images"
    make("default", "Where Academic Rigour Meets Real-World AI Engineering", "Data Science & AI Institute · Chennai", None,
         "18 courses · project-based internships · Microsoft certification · 12-month AI Mastery Track")
    make("page-courses", "Data Science & AI Courses in Chennai", "18 specialised courses", W_IMG / "Website Images/Courses Page Hero Banner.jpeg",
         "Python · Machine Learning · Deep Learning · LLMs · Power BI · Azure · AWS")
    make("page-programmes", "Programmes for Students, Faculty & Enterprises", "Special programmes", W_IMG / "Website Images/AI Mastery Track Visual.jpeg",
         "AI Mastery Track · Internships · Microsoft Certification · FDP · Exam Coaching · Research")
    make("page-codechamps", "DSA Code Champs — AI & Coding for Grades 3–12", "School outreach wing", W_IMG / "Website Images/Code Champs Hero Illustration.jpeg",
         "Scratch · Python · Machine Learning · Computer Vision — delivered in schools across Chennai")
    make("page-about", "Where Industry Meets Academia", "About Data Science Academia", W_IMG / "Website Images/About Page Visual - ClassroomLab.jpeg",
         "Ph.D.-level academic depth from Anna University with active AI engineering experience")
    make("page-projects", "39 Student Research Projects", "Real projects, real impact", W_IMG / "Website Images/Projects/Autonomous Driving Aid with Multilabel Image Classification.jpeg",
         "Computer Vision · NLP · Healthcare AI · Analytics · Recommender Systems · Creative AI")
    make("page-testimonials", "What Our Interns Say", "15 five-star testimonials", None,
         "Real feedback from students across India on the DSA machine learning internship")
    make("page-blog", "The DSA Blog", "Insights & ideas", W_IMG / "Website Images/Blog - Statistics Meets Deep Learning.jpeg",
         "Machine learning tutorials, career guidance and research insights from a practising AI engineer")
    make("page-contact", "Begin Your Journey", "Enquire · Enrol · Collaborate", None,
         "Rajakilpakkam, Chennai · +91 91764 98814 · info@datascienceacademia.in")
    make("ml-internship", "Machine Learning Internship", "New batch · starts 1 December 2026 · online", W_IMG / "Website Images/Internship Programme.jpeg",
         "2 months · Mon–Fri 7:30–8:30 PM · training + guided group projects · ₹6,000 (₹3,000 select colleges)")
    for cid, c in d["courses"].items():
        make(f"course-{cid}", c["title"], f"{c['category']} course · {c['level']} · {c['duration']}", W_IMG / c["image"], c["overview"])
    for pid, p in d["programmes"].items():
        make(f"programme-{pid}", p["title"], p["subtitle"], W_IMG / p["image"], p["overview"])
    for lid, lv in d["levels"].items():
        make(f"level-{lid}", f"{lv['name']} — {lv['grade']}", f"DSA Code Champs · {lv['badge']}", W_IMG / lv["image"], lv["tagline"])
    for p in d["posts"]:
        make(f"post-{p['slug']}", p["title"], f"{p['catLabel']} · {p['readTime']}", W_IMG / p["cover"], "")
    total = sum(f.stat().st_size for f in OUT.glob("*.jpg"))
    print(f"{len(list(OUT.glob('*.jpg')))} OG images, {total / 1024 / 1024:.1f} MB")


if __name__ == "__main__":
    main()

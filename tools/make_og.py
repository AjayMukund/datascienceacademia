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
INK = (11, 12, 14)
CHAMP = (223, 192, 138)
CREAM = (245, 240, 232)
FOG = (155, 161, 179)


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    p = FONTS / name
    return ImageFont.truetype(str(p), size) if p.exists() else ImageFont.load_default()


F_TITLE = lambda s: font("cormorant-garamond-700.ttf", s)
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


def cover(src: Path) -> Image.Image:
    im = Image.open(src).convert("RGB")
    ratio = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * ratio), round(im.height * ratio)), Image.LANCZOS)
    x, y = (im.width - W) // 2, (im.height - H) // 2
    return im.crop((x, y, x + W, y + H))


def base(image: Path | None) -> Image.Image:
    if image and image.exists():
        im = cover(image).filter(ImageFilter.GaussianBlur(0.6))
        # darken + left/bottom gradient so the text stays readable
        grad = Image.new("L", (W, H), 0)
        gd = ImageDraw.Draw(grad)
        for y in range(H):
            gd.line([(0, y), (W, y)], fill=int(90 + 165 * (y / H) ** 1.4))
        dark = Image.new("RGB", (W, H), INK)
        im = Image.composite(dark, im, grad)
        return im
    im = Image.new("RGB", (W, H), INK)
    glow = Image.new("RGB", (W, H), INK)
    gd = ImageDraw.Draw(glow)
    gd.ellipse((-200, -350, 900, 450), fill=(58, 48, 30))
    gd.ellipse((700, 250, 1500, 900), fill=(18, 44, 40))
    glow = glow.filter(ImageFilter.GaussianBlur(160))
    return Image.blend(im, glow, 0.9)


def make(name: str, title: str, kicker: str, image: Path | None, subtitle: str = "") -> None:
    im = base(image)
    d = ImageDraw.Draw(im)
    # subtle top-left brand line
    lg = logo(56)
    im.paste(lg, (72, 60), lg)
    d.text((142, 66), "DATA SCIENCE ACADEMIA", font=F_BOLD(24), fill=CHAMP)
    d.text((142, 96), "Chennai · Ph.D.-led AI & Data Science education", font=F_BODY(19), fill=FOG)
    # kicker
    y = 300 if subtitle else 330
    d.text((72, y - 44), kicker.upper(), font=F_BOLD(22), fill=CHAMP, spacing=4)
    # title
    size = 74
    while size > 44:
        lines = wrap(d, title, F_TITLE(size), 1000, 2)
        if len(lines) <= 2 and all(d.textlength(l, font=F_TITLE(size)) <= 1000 for l in lines):
            break
        size -= 4
    fnt = F_TITLE(size)
    for line in lines:
        d.text((70, y), line, font=fnt, fill=CREAM)
        y += int(size * 1.08)
    if subtitle:
        for line in wrap(d, subtitle, F_BODY(26), 1000, 2):
            y += 10
            d.text((72, y), line, font=F_BODY(26), fill=FOG)
            y += 32
    # bottom strip
    d.line([(72, H - 78), (W - 72, H - 78)], fill=(200, 169, 110, 90), width=1)
    d.text((72, H - 62), "ajaymukund.github.io/datascienceacademia", font=F_BODY(20), fill=FOG)
    d.text((W - 72 - d.textlength("AICTE-aligned · MSME Registered · Est. 2019", font=F_BODY(20)), H - 62),
           "AICTE-aligned · MSME Registered · Est. 2019", font=F_BODY(20), fill=FOG)
    OUT.mkdir(parents=True, exist_ok=True)
    im.save(OUT / f"{name}.jpg", "JPEG", quality=82, optimize=True, progressive=True)
    print(f"  {name}.jpg")


def main() -> None:
    d = load_all(ROOT)
    W_IMG = ROOT
    make("default", "Where Academic Rigour Meets Real-World AI Engineering", "Data Science & AI Institute · Chennai", None,
         "18 courses · AICTE-aligned internships · Microsoft certification · 12-month AI Mastery Track")
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
         "West Tambaram, Chennai · +91 91764 98814 · info@datascienceacademia.in")
    for cid, c in d["courses"].items():
        make(f"course-{cid}", c["title"], f"{c['category']} course · {c['level']} · {c['duration']}", ROOT / c["image"], c["overview"])
    for pid, p in d["programmes"].items():
        make(f"programme-{pid}", p["title"], p["subtitle"], ROOT / p["image"], p["overview"])
    for lid, lv in d["levels"].items():
        make(f"level-{lid}", f"{lv['name']} — {lv['grade']}", f"DSA Code Champs · {lv['badge']}", ROOT / lv["image"], lv["tagline"])
    for p in d["posts"]:
        make(f"post-{p['slug']}", p["title"], f"{p['catLabel']} · {p['readTime']}", ROOT / p["cover"], "")
    total = sum(f.stat().st_size for f in OUT.glob("*.jpg"))
    print(f"{len(list(OUT.glob('*.jpg')))} OG images, {total / 1024 / 1024:.1f} MB")


if __name__ == "__main__":
    main()

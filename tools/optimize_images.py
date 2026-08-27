"""
optimize_images.py — convert the site's source images (Website Images/, Intern Testimonials/,
roadmap PNG, logo) into responsive WebP variants under assets/img/ and write
assets/img/manifest.json (used by build.py for width/height/srcset attributes).

Run:  python tools/optimize_images.py            (skips up-to-date outputs)
      python tools/optimize_images.py --force    (regenerate everything)

Requires Pillow (pip install Pillow).
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "img"
FORCE = "--force" in sys.argv

# (source glob, output subdir, widths)
JOBS = [
    ("Website Images/Courses/*.jpeg", "courses", (480, 720, 960, 1600)),
    ("Website Images/Projects/*.jpeg", "projects", (480, 720, 960)),
    ("Website Images/Code Champs/*.jpeg", "codechamps", (480, 720, 960, 1600)),
    ("Website Images/*.jpeg", "", (480, 720, 960, 1600)),
    ("Intern Testimonials/*.png", "testimonials", (480, 960)),
    ("12 Month AI Mastery Programme Roadmap.png", "", (960, 1600, 2400)),
]

QUALITY = {480: 76, 720: 74, 960: 72, 1600: 70, 2400: 66}


def slugify(name: str) -> str:
    s = name.lower()
    s = s.replace("&", " and ")
    s = re.sub(r"\(.*?\)", " ", s)             # drop parenthetical descriptions
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    s = s.replace("intern-testominal-", "").replace("intern-testimonial-", "")
    return s


def convert(src: Path, subdir: str, widths: tuple[int, ...], manifest: dict) -> None:
    key = (subdir + "/" if subdir else "") + slugify(src.stem)
    im = Image.open(src)
    im = ImageOps.exif_transpose(im)
    has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
    im = im.convert("RGBA" if has_alpha else "RGB")
    w0, h0 = im.size
    entry = {"src": str(src.relative_to(ROOT)).replace("\\", "/"), "w": w0, "h": h0, "variants": {}}
    for width in widths:
        if width > w0:
            width = w0
        height = round(h0 * width / w0)
        out = OUT / subdir / f"{slugify(src.stem)}-{width}.webp"
        out.parent.mkdir(parents=True, exist_ok=True)
        entry["variants"][str(width)] = {"file": str(out.relative_to(ROOT)).replace("\\", "/"), "w": width, "h": height}
        if out.exists() and not FORCE and out.stat().st_mtime >= src.stat().st_mtime:
            continue
        resized = im if width == w0 else im.resize((width, height), Image.LANCZOS)
        resized.save(out, "WEBP", quality=QUALITY.get(width, 80), method=6)
        print(f"  {out.relative_to(ROOT)}  {out.stat().st_size // 1024} KB")
    manifest[key] = entry


def make_logo(manifest: dict) -> None:
    """Champagne-tinted, transparent logo mark from the yellow-on-black PWA icon."""
    src = ROOT / "icons" / "icon-512.png"
    im = Image.open(src).convert("RGBA")
    px = im.load()
    w, h = im.size
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    opx = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            lum = max(r, g)                      # yellow → luminance mask
            if lum > 40 and b < 140:
                opx[x, y] = (223, 192, 138, int(a * min(1.0, lum / 230)))
    bbox = out.getbbox()
    out = out.crop(bbox)
    # square canvas with small padding
    side = max(out.size) + 24
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(out, ((side - out.width) // 2, (side - out.height) // 2), out)
    for size in (64, 128, 256):
        f = OUT / f"logo-mark-{size}.png"
        small = canvas.resize((size, size), Image.LANCZOS)
        small.quantize(colors=48, method=Image.Quantize.FASTOCTREE).save(f, "PNG", optimize=True)  # two-tone mark → tiny palette PNG
    canvas.resize((256, 256), Image.LANCZOS).save(OUT / "logo-mark-256.webp", "WEBP", quality=90, method=6)
    manifest["logo-mark"] = {"src": "icons/icon-512.png", "w": 256, "h": 256, "variants": {"256": {"file": "assets/img/logo-mark-256.png", "w": 256, "h": 256}}}

    # Favicons (champagne mark on ink background) + apple touch icon
    def on_ink(size: int, pad_ratio: float = 0.12) -> Image.Image:
        bg = Image.new("RGBA", (size, size), (11, 12, 14, 255))
        inner = int(size * (1 - 2 * pad_ratio))
        mark = canvas.resize((inner, inner), Image.LANCZOS)
        bg.paste(mark, ((size - inner) // 2, (size - inner) // 2), mark)
        return bg

    q = lambda im: im.convert("RGB").quantize(colors=48, method=Image.Quantize.FASTOCTREE)
    q(on_ink(180, 0.1)).save(ROOT / "apple-touch-icon.png", "PNG", optimize=True)
    q(on_ink(32, 0.06)).save(ROOT / "favicon-32.png", "PNG", optimize=True)
    q(on_ink(192, 0.1)).save(ROOT / "favicon-192.png", "PNG", optimize=True)
    on_ink(48, 0.06).save(ROOT / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print("  logo mark + favicons written")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    manifest: dict = {}
    for pattern, subdir, widths in JOBS:
        for src in sorted(ROOT.glob(pattern)):
            print(src.name)
            convert(src, subdir, widths, manifest)
    make_logo(manifest)
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=1), encoding="utf-8")
    total = sum(f.stat().st_size for f in OUT.rglob("*.webp"))
    print(f"\n{len(manifest)} images -> {total / 1024 / 1024:.1f} MB of WebP variants in assets/img/")


if __name__ == "__main__":
    main()

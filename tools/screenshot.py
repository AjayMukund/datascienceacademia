"""
screenshot.py — render a page with headless Chrome/Edge for visual QA.

    python tools/screenshot.py <path-or-url> <out.png> [--width 1440] [--height 4000] [--mobile]

<path-or-url> may be a site-relative path such as "index.html" or "courses/python.html"
(served from http://127.0.0.1:8765/ — start the server with `python tools/serve.py`),
or a full URL. --mobile renders the page inside a 390px-wide frame (Chrome enforces a
minimum window width, so a real narrow window is not possible).
Animations are disabled (prefers-reduced-motion) so screenshots are deterministic.
"""
from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

CANDIDATES = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
]


def browser() -> str:
    for c in CANDIDATES:
        if Path(c).exists():
            return c
    for name in ("chrome", "google-chrome", "chromium", "msedge"):
        if shutil.which(name):
            return shutil.which(name)
    sys.exit("No Chrome/Edge found")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("page")
    ap.add_argument("out")
    ap.add_argument("--width", type=int, default=1440)
    ap.add_argument("--height", type=int, default=4000)
    ap.add_argument("--mobile", action="store_true", help="render inside a 390px-wide frame")
    ap.add_argument("--base", default="http://127.0.0.1:8765/")
    a = ap.parse_args()
    url = a.page if a.page.startswith("http") else a.base + a.page.lstrip("/")
    out = Path(a.out).resolve()
    out.parent.mkdir(parents=True, exist_ok=True)
    width, height = a.width, a.height
    profile = Path(tempfile.mkdtemp(prefix="dsa-shot-"))   # unique per run → safe to run in parallel
    tmp_html = None
    if a.mobile:
        width = 390
        # same-origin frame served by the preview server (file:// → http iframes do not render in headless)
        root = Path(__file__).resolve().parent.parent
        tmp_html = root / "tools" / f".frame-{out.stem}.html"
        tmp_html.write_text(
            f'<!doctype html><html><head><meta charset="utf-8"><style>html,body{{margin:0;background:#0b0c0e}}'
            f'iframe{{display:block;width:390px;height:{height}px;border:0}}</style></head>'
            f'<body><iframe src="{url}"></iframe></body></html>', encoding="utf-8")
        url = a.base + "tools/" + tmp_html.name
    args = [
        browser(), "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-sandbox", "--no-first-run",
        "--disable-extensions", "--force-device-scale-factor=1", "--force-prefers-reduced-motion",
        "--run-all-compositor-stages-before-draw", "--virtual-time-budget=12000",
        f"--window-size={max(width, 500)},{height}", f"--screenshot={out}", f"--user-data-dir={profile}",
        "--enable-features=LazyImageLoading:enabled",
        url,
    ]
    subprocess.run(args, check=False, capture_output=True, timeout=120)
    if a.mobile and out.exists():
        try:
            from PIL import Image
            im = Image.open(out)
            im.crop((0, 0, 390, im.height)).save(out)
        except Exception:
            pass
    if tmp_html and tmp_html.exists():
        tmp_html.unlink()
    shutil.rmtree(profile, ignore_errors=True)
    print(out, out.stat().st_size // 1024 if out.exists() else "FAILED", "KB")


if __name__ == "__main__":
    main()

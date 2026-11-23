"""Tell IndexNow search engines (Bing, Yandex, Seznam, Naver) about new or changed pages.

Run AFTER the deploy has finished (the pages must be live):

    python tools/indexnow.py            # pages changed in the last commit
    python tools/indexnow.py HEAD~3     # pages changed since HEAD~3
    python tools/indexnow.py --all      # every URL in sitemap.xml

The key file <KEY>.txt in the site root proves ownership. Never delete it; it is
copied by .github/workflows/deploy-pages.yml.
"""
import json
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
KEY = "fc8eb34d40e3e051d52465939f4a4414"
HOST = "datascienceacademia.in"
BASE = f"https://{HOST}/"
SERVED = ("courses/", "programmes/", "blog/", "codechamps/")


def sitemap_urls():
    return re.findall(r"<loc>([^<]+)</loc>", (ROOT / "sitemap.xml").read_text(encoding="utf-8"))


def changed_urls(since):
    out = subprocess.run(["git", "diff", "--name-only", since, "HEAD"], cwd=ROOT,
                         capture_output=True, text=True, check=True).stdout.split()
    known = set(sitemap_urls())
    urls = []
    for f in out:
        if not f.endswith(".html") or ("/" in f and not f.startswith(SERVED)):
            continue
        url = BASE if f == "index.html" else BASE + f
        if url in known:
            urls.append(url)
    return urls


def main():
    arg = sys.argv[1] if len(sys.argv) > 1 else "HEAD~1"
    urls = sitemap_urls() if arg == "--all" else changed_urls(arg)
    if not urls:
        print("No changed pages to submit.")
        return
    body = json.dumps({"host": HOST, "key": KEY, "keyLocation": f"{BASE}{KEY}.txt",
                       "urlList": urls}).encode()
    req = urllib.request.Request("https://api.indexnow.org/indexnow", data=body,
                                 headers={"Content-Type": "application/json; charset=utf-8"})
    with urllib.request.urlopen(req, timeout=30) as r:
        print(f"IndexNow: HTTP {r.status} for {len(urls)} URL(s)")
    for u in urls:
        print("  ", u)


if __name__ == "__main__":
    main()

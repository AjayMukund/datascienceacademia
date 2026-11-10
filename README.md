# Data Science Academia — website

Static marketing site for **https://datascienceacademia.in/** (GitHub Pages) plus the
Supabase-backed student/admin portal (`login.html`, `student/`, `admin/`).

The public pages are **generated**: edit the sources, run the build, publish the whole folder.
Do not hand-edit the generated `*.html` files at the root or in `courses/`, `programmes/`, `blog/`,
`codechamps/` — the next build overwrites them.

## Folder map

The site is served straight from this folder by GitHub Pages, so **the top level holds only what must be at the
site root**: the page URLs (generated pages + portal entry pages + legacy redirect shims), `CNAME`, `.nojekyll`,
`robots.txt`, `sitemap.xml`, `llms.txt`, `manifest.json`, `sw.js` (must sit at the root to control every page)
and `favicon.ico`. Everything else lives in a folder:

| Path | What it is |
|---|---|
| `courses/`, `programmes/`, `blog/`, `codechamps/` | **generated** detail pages (one per course, programme, post, level) |
| `student/`, `admin/` | Supabase portal pages (hand-written, not generated) |
| `assets/css/` | `style.css` (design system, inlined into every public page by the build) · `portal.css` (portal look) |
| `assets/js/` | `script.js` (shared site behaviour, also used by the portal) · `supabase-client.js`, `auth-guard.js`, `portal.js` (portal) |
| `assets/icons/` | favicons, apple-touch icon, PWA icons (`favicon.ico` itself stays at the root) |
| `assets/img/`, `assets/og/`, `assets/fonts/` | generated WebP images + `manifest.json` · 1200×630 social previews · self-hosted fonts |
| `content/` | **site content**: `courses-data.js`, `programmes-data.js`, `blog-data.js`, `cc-levels-data.js`, `projects-data.js`, `testimonials-data.js` (read by the build) |
| `content/lessons/` | portal lesson content `*-content.js` (loaded by `student/lesson.html` and the admin seed pages) |
| `source-images/` | original photos/artwork (`Website Images/`, `Intern Testimonials/`, roadmap). Data files reference paths *relative to this folder*; `optimize_images.py` turns them into `assets/img/` |
| `src/pages/`, `src/templates/` | Jinja2 sources for every generated page (`base.html`, `partials/`, `detail-*.html`, `redirect.html`) |
| `src/preview/` | private design previews → `_preview/` (both git-ignored); `render_video.py` exports the hero animation |
| `tools/` | build pipeline (see below) |
| `docs/` | `Company_Info.txt` (company facts for the chat assistant; linked from `llms.txt`), `TODO.md`; `docs/private/` is git-ignored |
| `apps/` | `dsa_app/` (Flutter student app + its WSL scripts) and `pwa-assets/` (splash screens, icon bundle) — not part of the website build |
| `marketing/social-automation/` | social-media content routines and briefs — not part of the website build |
| `archive/` | zip backup of the previous site (Aug 2026) |
| `exports/` | rendered media such as `hero-video/` (git-ignored) |

## Build

```bash
pip install -r tools/requirements.txt        # jinja2, json5, Pillow (once)

python tools/optimize_images.py              # when source images change → assets/img/*.webp + manifest.json
python tools/make_og.py                      # when titles/images change   → assets/og/*.jpg
python tools/build.py                        # ALWAYS after editing src/ or content/*-data.js → all pages, sitemap, robots
python tools/check_site.py                   # QA: titles, descriptions, h1, links, JSON-LD, alt text …
python tools/serve.py                        # preview at http://127.0.0.1:8765/
python tools/screenshot.py courses.html out.png [--mobile]   # headless Chrome screenshot for visual checks
```

`tools/fetch_fonts.py` re-downloads the fonts (only needed if the font set changes).

## Editing

- **A course / programme / blog post / Code Champs level / project / testimonial** → edit the matching
  `content/*-data.js` file, then `python tools/build.py`. New entries get their own static page and sitemap entry
  automatically. Add a new image to `source-images/Website Images/…`, run `optimize_images.py`, then reference
  it in the data file as `Website Images/…` (paths are relative to `source-images/`).
- **Page copy or layout** → `src/pages/<page>.html` (components are documented at the top of `assets/css/style.css`).
- **Navigation, footer, head tags** → `src/templates/partials/` and `src/templates/base.html`.
- **Contact details, social links, opening hours, site URL** → the `SITE` dict at the top of
  `tools/build.py` (feeds the footer, contact page, JSON-LD, canonical URLs and sitemap).
- **Moving to a custom domain** → change `SITE["url"]`, add a `CNAME` file, rebuild, run `make_og.py`
  (the OG images print the domain).

## Deploy

Commit the whole folder — generated HTML included — and push `main` (GitHub Pages serves it within ~2 minutes).
`.nojekyll` is present so every folder is served as-is. After deploying, submit `sitemap.xml` in Google Search Console.

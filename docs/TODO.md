# Data Science Academia — website follow-ups

_Status on 2026-08-27 (commit `2aa6285`): site rebuilt and live at
https://datascienceacademia.in/ — PageSpeed 100 / 100 / 100 / 100 on desktop
and mobile; 46 pages, 0 checker errors. This file tracks what is still worth doing._

Legend: **You** = needs your account/decision · **Claude** = ask and it gets done · ☐ open · ☑ done

---

## 1. This week — indexing, local search, trust (highest impact)

- ☑ **You · Google Search Console** — done 2026-11-19 (see §3). Was: add a *URL-prefix* property for
  `https://datascienceacademia.in/`, then **Sitemaps → submit**
  `https://datascienceacademia.in/sitemap.xml`.
  https://search.google.com/search-console
  If you choose the *HTML tag* verification, send the `google-site-verification` token → Claude adds
  it to `src/templates/base.html` and redeploys.
- ☑ **You · Bing Webmaster Tools** — datascienceacademia.in added 2026-11-23, sitemap 53 URLs, IndexNow; Bing Places imported from GBP (weekly sync).
  https://www.bing.com/webmasters
- ☐ **You · Google Business Profile** — new address (Rajakilpakkam, 600073) set Nov 2026 — confirm the listing shows it; keep name, address,
  phone (+91 91764 98814) and hours (Mon–Sat 9:00–19:00) identical to the site.
  https://business.google.com/
- ☐ **You · Refresh social previews** for links shared before the rebuild:
  LinkedIn https://www.linkedin.com/post-inspector/ · Facebook/Instagram
  https://developers.facebook.com/tools/debug/ ("Scrape again").
- ☑ **Inherited claims** — owner confirmed 2026-11-23 that "10+ colleges", "100% would recommend" and "recognised by hiring partners" are true (kept). Was: confirm (edit or keep):
  | Claim | Where | Live page |
  |---|---|---|
  | "10+ colleges represented", "100% would recommend" | `src/pages/testimonials.html` | /testimonials.html |
  | "DSA AI Mastery Certificate — recognised by hiring partners" | `programmes-data.js` → `ai-mastery.outcomes` | /programmes/ai-mastery.html |
  | Director shown as "DS" (unnamed) on About, but Ajay Mukund S is named on Blog/Projects/Testimonials | `src/pages/about.html` | /about.html |
- ☑ **You · Test the enquiry form end-to-end** — done 2026-11-19, arrives at info@ in Zoho.
  WhatsApp button tested on a phone 2026-11-19 ✓.
- ☑ **You · Chatbase assistant** — `docs/Company_Info.txt` re-uploaded 2026-11-19 (auto-synced; Playground
  answers on Code Champs ages, AI-901 and the office address checked OK). Re-upload whenever Company_Info.txt changes.

## 2. Next — measurement and automation

- ☑ **Analytics** (2026-11-23): GA4 G-KK7SGHVKSE via Google tag GTM-K7TB3NBD, key events generate_lead / whatsapp_click / phone_click, linked to Search Console; Microsoft Clarity zi01v79mv9; Bing Webmaster + IndexNow; privacy.html. Was: decide GA4 (https://analytics.google.com) or Plausible
  (https://plausible.io). Send the measurement ID; Claude wires it into `base.html` with events for
  form submit, WhatsApp click, phone tap and "Enrol / enquire" clicks. Until then PageSpeed's
  "real users" panel stays empty and enquiries can't be attributed to pages.
- ☑ **Deploy via GitHub Actions** (Nov 2026: lean artifact, ~30 MB; builds still run locally) — was: **Claude · Build on GitHub Actions** — workflow that runs `tools/build.py` + `tools/check_site.py`
  on every push and deploys the output (Pages source switches from "branch" to "GitHub Actions").
  Removes the "remember to run build.py" step and lets you edit `*-data.js` in the GitHub web UI.
  Requires your OK to change Settings → Pages → Source.
- ☐ **Claude · Periodic checks** — (last: 2026-11-23, CLS fix + analytics on interaction) re-run PageSpeed monthly; run `python tools/check_site.py` after
  every content change (0 errors expected).

## 3. Custom domain — datascienceacademia.in

Bought 2026-11-10 at Hostinger (`.in` + `.com`, owner Ajay Mukund S, expire 2029-11-10, auto-renew on).

- ☑ **You** — DNS at Hostinger: 4 `A` + 4 `AAAA` records to GitHub Pages, `CNAME www → ajaymukund.github.io`,
  GitHub domain-verification `TXT` (`_github-pages-challenge-ajaymukund`).
- ☑ **Claude** — `SITE["url"]` in `tools/build.py`, `CNAME` file, rebuilt pages + OG images, redeployed.
- ☑ *Enforce HTTPS* on (Let's Encrypt cert, auto-renewed by GitHub).
- ☑ Supabase Auth Site URL + redirect URL set to the new domain; project resumed (it had auto-paused) and a
  daily keep-alive runs in `.github/workflows/supabase-keepalive.yml`.
- ☑ `datascienceacademia.com` → 301 to `https://datascienceacademia.in` (Hostinger *Redirects*).
- ☑ Zoho Mail Free (India): mailbox `ajay@`, aliases `info@`, `admissions@`, `careers@`, `internships@`;
  MX, SPF, DKIM (`zmail`, 2048-bit, verified), DMARC `p=none` (reports to `ajay@`). Site shows `info@`.
- ☑ Formspree (form `xdaypadg`) → *Workflow* → *Email* → Send to `info@datascienceacademia.in` (verified under
  *Linked Emails*; free plan = one recipient). Test enquiry from /contact.html arrived in Zoho 2026-11-19.
  Keep CAPTCHA disabled (the contact form submits via fetch).
- ☑ Google Search Console (2026-11-19, account ajaymukund1998@gmail.com): *URL-prefix* property
  `https://datascienceacademia.in/`, verified by `googleea0570a9b97a9835.html` in the site root — **never delete it**.
  `sitemap.xml` submitted: Success, 51 pages. Old `ajaymukund.github.io/datascienceacademia/` property kept (301s).
- ☑ Google Business Profile (2026-11-19): description, opening date, hours, address 52/1A, website; all 61
  unreplied reviews answered; site shows 4.9 ★ / 91 reviews (`SITE["google_rating"/"google_reviews"]` — update
  when they change) + "Review us on Google" in the footer. Newest review is Dec 2024 → ask 2025–26 students.
- ◐ **Apple Business** (2026-11-24): domain www verified (keep www DNS as A/AAAA + TXT, no CNAME); location "Data Science Academia" submitted for review (up to 5 days), address 52/1A First Floor, hours Mon–Sat 9–19, About in English + Tamil. **You:** add logo + cover (Go to Brand), 3–5 real photos, a "Learn more" action → contact.html; check the place card in Apple Maps once approved.
- ☐ **You** — social bios + directories from `docs/listings-bios.md` (Instagram, LinkedIn, YouTube ☑ 2026-11-22; Justdial paid plan ₹54k/yr declined — free listing only if offered);
  rebuild the student app (`dsa_app`) with the new certificate URL.
- ☐ **Claude, ~Dec 2026** — read the DMARC reports; if clean, tighten to `p=quarantine`. If Hostinger's
  nameservers still serve TXT records intermittently, move DNS (not the domain) to Cloudflare.
- ☐ Optional: put Cloudflare (free) in front → long cache lifetimes (the one remaining PageSpeed
  insight GitHub Pages cannot fix), Brotli, and analytics without cookies.

## 4. Content & SEO growth (compounds more than further tuning)

- ☐ **Blog cadence** — 8 posts Nov 2026 (incl. fees in Chennai + AICTE internships, 2026-11-23). Keep ~2 posts/month. Next ideas: Power BI interview questions for freshers; choosing a final-year ML project. Original note: aim for 2 posts/month targeting real searches, e.g.
  "data science course fees in Chennai", "AICTE internship for CSE students — how it works",
  "Power BI vs Tableau for analysts", "Python vs R for beginners", "how to prepare for AI-900".
  Add to the top of `content/blog-data.js` (newest first) → rebuild → push. New posts get their own
  page, OG image and sitemap entry automatically.
- ◐ **Course pages** — FAQs, roles and "who this is for" live 2026-11-18; still to do:
  batch start dates when known (also enables `CourseInstance.startDate` rich results).
- ☐ **Fees** — if you decide to publish fees, add `price`/`priceCurrency` to the Course `offers`
  in `src/templates/detail-course.html` (currently deliberately omitted).
- ☐ **Proof** — student outcome stories per cohort (placements, projects), Google reviews link on
  the testimonials page, more testimonials from the Mastery Track / corporate clients.
- ☐ **Video** — embed YouTube intros on course pages (lazy `lite-youtube` style; ask Claude).
- ☐ **Local citations** — consistent name/address/phone on Justdial, Sulekha, UrbanPro, LinkedIn
  company page, Facebook page; AICTE/college partner pages linking back.
- ☐ **Tamil landing page** (optional) — a short Tamil summary page with `hreflang` if you target
  Tamil-language searches.

## 5. Maintenance — how to change things

```bash
pip install -r tools/requirements.txt        # once
python tools/optimize_images.py              # when images change (source: source-images/ …)
python tools/make_og.py                      # when titles/images change
python tools/build.py                        # ALWAYS after editing src/ or content/*-data.js
python tools/check_site.py                   # must report 0 errors
python tools/serve.py                        # preview http://127.0.0.1:8765/
git add -A && git commit -m "…" && git push  # deploy (Pages rebuilds in ~1–2 min)
python tools/indexnow.py                     # after the deploy: tell Bing which pages changed
```

- Content lives in `content/courses-data.js`, `programmes-data.js`, `blog-data.js`, `cc-levels-data.js`,
  `projects-data.js`, `testimonials-data.js`; page copy in `src/pages/`; nav/footer/head in
  `src/templates/`; contact details & site URL in the `SITE` dict in `tools/build.py`.
- Keep `docs/Company_Info.txt` in sync with the site (it feeds the chat assistant and `llms.txt`).
- Do **not** edit the generated HTML at the root or in `courses/`, `programmes/`, `blog/`,
  `codechamps/` — the next build overwrites it.
- Fonts: `tools/fetch_fonts.py` then `tools/font_fallbacks.py` if the font set ever changes.
- Copyright year updates automatically at build time.

## 6. Housekeeping (low priority)

- ☐ The original source images (now in `source-images/`, ~80 MB) are no longer
  referenced by any page; move them out of the deploy branch (or to Git LFS) to slim the repo.
- ☐ Delete `archive/` (old-site backup zip) once you are confident nothing is missing.
- ☑ Root folder reorganised (Nov 2026): `content/`, `source-images/`, `docs/`, `apps/`, `marketing/`, `archive/`.
- ☐ `apps/` and `marketing/` are unrelated to the website
  and are published by Pages (blocked in `robots.txt`); consider a separate repo.
- ☐ Portal pages (`login.html`, `student/`, `admin/`) still use the old `portal.css` look — restyle
  to the new design system if consistency matters (they are behind sign-in / noindex).
- ☐ `verify.html` (certificate verification) could get the new header/footer for consistency.

## 7. Ideas for later

- Downloadable syllabus PDFs per course (lead magnet: email in exchange for the PDF).
- Course comparison table / "find my course" quiz on `courses.html`.
- WebMCP annotations on the enquiry form (Lighthouse "Agentic Browsing" audit) once the spec settles.
- Newsletter sign-up (the social-automation brand notes list several lead magnets — link them).
- Event schema for bootcamps / free trial sessions with dates.

---

### Reference

- Repo: https://github.com/AjayMukund/datascienceacademia · Pages settings:
  https://github.com/AjayMukund/datascienceacademia/settings/pages · Deployments:
  https://github.com/AjayMukund/datascienceacademia/deployments
- Live: https://datascienceacademia.in/ · sitemap `/sitemap.xml` · `/llms.txt`
- Validators: PageSpeed https://pagespeed.web.dev/ · Rich Results
  https://search.google.com/test/rich-results · Schema https://validator.schema.org/
- Build docs: `README.md`

"""Student brochure (A4 PDF) for the Machine Learning Internship – December 2026 batch.

    python marketing/brochures/ml-internship/make_brochure.py

Writes DSA-ML-Internship-Dec-2026-Brochure.pdf next to this file (plus brochure.html, the source page).
Batch facts come from SITE["batch"] in tools/build.py, so dates and fees always match the website.

REGISTRATION LINK: paste the Google Form share link into FORM_URL below and run the script again —
the placeholder box becomes the real link plus a scannable QR code.
"""
from __future__ import annotations

import base64
import io
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
sys.path.insert(0, str(ROOT / "tools"))

FORM_URL = "https://forms.gle/4u44v45jTVHmxVf96"   # Google Form registration link

from icons import icon_svg  # noqa: E402  (same outline icons as the website)


def site_batch() -> dict:
    """Read SITE without running the whole site build."""
    src = (ROOT / "tools" / "build.py").read_text(encoding="utf-8")
    start = src.index("SITE = {")
    end = src.index("\n}\n", start) + 3
    ns: dict = {}
    exec(src[start:end], {"dt": __import__("datetime")}, ns)  # noqa: S102 — our own file
    return ns["SITE"]


SITE = site_batch()
B = SITE["batch"]
FEE = f"₹{B['fee']:,}"
FEE_P = f"₹{B['fee_partner']:,}"
PAGE_URL = f"{SITE['url']}/{B['url']}"


def uri(p: Path) -> str:
    return p.resolve().as_uri()


def qr_svg(data: str) -> str:
    import segno
    buf = io.BytesIO()
    segno.make(data, error="m").save(buf, kind="svg", scale=4, border=0, dark="#10263D", xmldecl=False, svgns=True)
    return "data:image/svg+xml;base64," + base64.b64encode(buf.getvalue()).decode()


def ic(name: str) -> str:
    return icon_svg(name).replace('class="ico', 'class="bi')


def register_box() -> str:
    if FORM_URL:
        short = FORM_URL.replace("https://", "")
        return f'''<div class="reg">
  <div class="reg-txt"><div class="reg-k">Register online</div>
    <div class="reg-h">Scan the code or open the link</div>
    <a class="reg-link" href="{FORM_URL}">{short}</a>
    <p>Applications close <b>{B["apply_by_display"]}</b>.</p></div>
  <img class="qr" src="{qr_svg(FORM_URL)}" alt="QR code for the registration form"></div>'''
    return f'''<div class="reg placeholder">
  <div class="reg-txt"><div class="reg-k">Register online</div>
    <div class="reg-h">Scan the code or open the link</div>
    <div class="reg-link ph">[ Google Form registration link ]</div>
    <p>Applications close <b>{B["apply_by_display"]}</b>.</p></div>
  <div class="qr ph-qr">QR code<br>for the<br>Google Form</div></div>'''


WEEKS = [
    ("Week 1", "Python and data for ML", "NumPy and pandas refresher, exploratory data analysis, the ML workflow, train / validation / test splits."),
    ("Week 2", "Regression and classification", "Linear and logistic regression, regularisation, and the metrics that matter: MAE, RMSE, R², precision, recall, F1."),
    ("Week 3", "Trees and ensembles", "Decision trees, random forests, gradient boosting and XGBoost, and reading feature importance."),
    ("Week 4", "Unsupervised learning and pipelines", "K-Means and PCA, cross-validation and tuning, imbalanced data, and a full scikit-learn pipeline."),
    ("Week 5", "Teams and problem statements", "Groups formed, project topics assigned, datasets collected, plan agreed with the Internship Supervisor."),
    ("Week 6", "Data and baseline", "Cleaning, exploratory analysis, feature engineering and a first baseline model."),
    ("Week 7", "Improve and review", "Better models, tuning and error analysis; mid-project review with the supervisor."),
    ("Week 8", "Demo, documentation, presentation", "A simple web demo of the model, the project documentation, and the final presentation."),
]
PROJECTS = [
    ("tabler/school", "Student performance prediction", "from academic and attendance data"),
    ("tabler/report-money", "Loan default risk scoring", "for a lending business"),
    ("users", "Customer churn prediction", "for a subscription business"),
    ("tabler/home-dollar", "House price estimation", "for Chennai localities"),
    ("sprout", "Crop recommendation", "from soil and weather data"),
    ("search", "Fake job posting detection", "from job advert text"),
]
RECEIVE = [
    ("mail", "Internship Offer Letter", "Issued when you join the batch."),
    ("graduation-cap", "Internship Completion Certificate", "For completing the two-month internship."),
    ("award", "Project Completion Certificate", "For your group project, with its title."),
    ("file-text", "Project Documentation", "Your project report, ready for college and interviews."),
]
TOOLS = ["Python", "NumPy", "pandas", "Matplotlib", "Seaborn", "scikit-learn", "XGBoost", "Google Colab", "Streamlit", "GitHub"]


def page_html() -> str:
    fonts = ROOT / "assets" / "fonts"
    img = ROOT / "assets" / "img" / "internship-programme-960.webp"
    logo = ROOT / "assets" / "img" / "logo-mark-256.png"
    def wcol(label: str, cls: str, rows) -> str:
        return (f'<div class="wcol {cls}"><div class="wk-split">{label}</div>'
                + "".join(f'<div class="wk"><span class="wk-n">{n}</span><b>{t}</b><span>{d}</span></div>' for n, t, d in rows)
                + "</div>")
    weeks = wcol("Month 1 · December — Training", "", WEEKS[:4]) + wcol("Month 2 · January — Group projects", "m2", WEEKS[4:])
    projects = "".join(f'<div class="proj">{ic(i)}<div><b>{t}</b><span>{d}</span></div></div>' for i, t, d in PROJECTS)
    receive = "".join(f'<div class="rcv">{ic(i)}<b>{t}</b><span>{d}</span></div>' for i, t, d in RECEIVE)
    tools = "".join(f"<span class='tag'>{t}</span>" for t in TOOLS)
    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Machine Learning Internship – December 2026 | Data Science Academia</title>
<style>
@font-face{{font-family:Outfit;src:url('{uri(fonts / "outfit-var.woff2")}') format('woff2');font-weight:100 900}}
@font-face{{font-family:'Fira Code';src:url('{uri(fonts / "fira-code-var.woff2")}') format('woff2');font-weight:300 700}}
@page{{size:A4;margin:0}}
*{{box-sizing:border-box;margin:0;padding:0}}
:root{{--navy:#10263D;--navy2:#16304A;--teal:#499A91;--teal-d:#29716A;--gold:#C9A970;--gold-d:#7A5C24;--ivory:#F6F3EC;--char:#282D30;--fog:#55606A;--line:rgba(16,38,61,.12)}}
html,body{{font-family:Outfit,system-ui,sans-serif;color:var(--char);-webkit-print-color-adjust:exact;print-color-adjust:exact}}
.page{{width:210mm;height:297mm;position:relative;overflow:hidden;page-break-after:always;background:var(--ivory)}}
.page:last-child{{page-break-after:auto}}
.mono{{font-family:'Fira Code',monospace}}
.bi{{width:1em;height:1em;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0}}
.eyebrow{{font-size:8.5pt;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--teal-d);display:flex;align-items:center;gap:8px}}
.eyebrow::before{{content:'';width:22px;height:1.5px;background:var(--gold)}}
h2{{font-size:20pt;font-weight:700;color:var(--navy);letter-spacing:-.02em;line-height:1.15;margin:5px 0 12px}}
h2 em{{font-style:normal;color:var(--teal-d)}}
/* cover */
.cover{{background:var(--navy);color:var(--ivory);padding:16mm 16mm 0}}
.cover::before{{content:'';position:absolute;right:-60mm;top:-40mm;width:170mm;height:170mm;border-radius:50%;background:radial-gradient(circle,rgba(73,154,145,.28),transparent 65%)}}
.cover::after{{content:'';position:absolute;right:-78mm;top:46mm;width:120mm;height:120mm;border-radius:50%;border:2px solid rgba(201,169,112,.18)}}
.brand{{display:flex;align-items:center;gap:10px;position:relative;z-index:1}}
.brand img{{width:40px;height:40px}}
.wm1{{font-weight:700;font-size:13pt;letter-spacing:.02em;line-height:1}}
.wm2{{font-weight:600;font-size:8pt;letter-spacing:.42em;color:var(--gold);margin-top:3px}}
.brand-r{{margin-left:auto;font-size:8pt;letter-spacing:.16em;text-transform:uppercase;color:rgba(246,243,236,.65)}}
.cv-pill{{display:inline-flex;align-items:center;gap:8px;margin-top:16mm;padding:5px 12px 5px 5px;border-radius:99px;border:1px solid rgba(201,169,112,.5);font-size:8.5pt;letter-spacing:.06em;position:relative;z-index:1}}
.cv-pill b{{background:var(--gold);color:var(--navy);border-radius:99px;padding:3px 9px;font-size:7.5pt;letter-spacing:.12em;text-transform:uppercase}}
.cv-h{{font-size:44pt;font-weight:800;line-height:1.02;letter-spacing:-.035em;margin-top:8mm;position:relative;z-index:1}}
.cv-h em{{font-style:normal;color:var(--teal)}}
.cv-sub{{font-size:12pt;line-height:1.55;color:rgba(246,243,236,.82);margin-top:6mm;max-width:150mm;position:relative;z-index:1}}
.cv-mid{{display:grid;grid-template-columns:1fr 74mm;gap:9mm;margin-top:10mm;align-items:stretch;position:relative;z-index:1}}
.facts{{display:grid;grid-template-columns:1fr 1fr;gap:5mm}}
.fact{{border:1px solid rgba(246,243,236,.16);border-radius:10px;padding:4.2mm 4.5mm;background:rgba(246,243,236,.04)}}
.fact .bi{{font-size:15pt;color:var(--gold)}}
.fact .k{{font-family:'Fira Code',monospace;font-size:6.8pt;letter-spacing:.12em;text-transform:uppercase;color:rgba(246,243,236,.6);margin-top:3mm}}
.fact .v{{font-size:11.5pt;font-weight:600;margin-top:1.2mm;line-height:1.3}}
.fact .s{{font-size:8pt;color:rgba(246,243,236,.65);margin-top:.8mm}}
.cv-img{{border-radius:14px;overflow:hidden;border:1px solid rgba(201,169,112,.35)}}
.cv-img img{{width:100%;height:100%;object-fit:cover;display:block}}
.cv-band{{position:absolute;left:0;right:0;bottom:0;padding:9mm 16mm;background:linear-gradient(90deg,#0C1E31,#16304A);border-top:3px solid var(--gold);display:flex;align-items:center;gap:10mm;z-index:1}}
.cv-band .k{{font-family:'Fira Code',monospace;font-size:7pt;letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}}
.cv-band .v{{font-size:15pt;font-weight:700;margin-top:1mm;white-space:nowrap}}
.cv-band > div{{white-space:nowrap}}
.hl{{display:grid;grid-template-columns:repeat(4,1fr);gap:5mm;margin-top:9mm;position:relative;z-index:1}}
.hl div{{border-top:1.5px solid rgba(201,169,112,.55);padding-top:3.5mm}}
.hl b{{display:block;font-size:19pt;font-weight:800;color:var(--gold);letter-spacing:-.02em;line-height:1}}
.hl span{{display:block;font-size:8.6pt;line-height:1.4;color:rgba(246,243,236,.8);margin-top:1.8mm}}
.cv-band .v small{{font-size:9.5pt;font-weight:400;color:rgba(246,243,236,.75)}}
.cv-band .sep{{width:1px;align-self:stretch;background:rgba(246,243,236,.18)}}
.cv-band .url{{margin-left:auto;text-align:right;font-size:8.5pt;color:rgba(246,243,236,.75)}}
.cv-band .url b{{display:block;color:var(--ivory);font-size:10.5pt}}
/* inner pages */
.inner{{padding:14mm 16mm 0}}
.top{{display:flex;align-items:center;gap:8px;font-size:7.5pt;letter-spacing:.14em;text-transform:uppercase;color:var(--fog);padding-bottom:5mm;border-bottom:1px solid var(--line);margin-bottom:8mm}}
.top img{{width:20px;height:20px}}
.top span:last-child{{margin-left:auto}}
.months{{display:grid;grid-template-columns:1fr 1fr;gap:5mm;margin-bottom:7mm}}
.month{{background:#fff;border:1px solid var(--line);border-radius:12px;padding:5mm 5.5mm;border-top:3px solid var(--teal)}}
.month.m2{{border-top-color:var(--gold)}}
.month .bi{{font-size:17pt;color:var(--navy)}}
.month .k{{font-family:'Fira Code',monospace;font-size:7pt;letter-spacing:.12em;text-transform:uppercase;color:var(--teal-d);margin-top:3mm}}
.month.m2 .k{{color:var(--gold-d)}}
.month h3{{font-size:14pt;color:var(--navy);margin:1mm 0 2mm}}
.month p{{font-size:9.2pt;line-height:1.55;color:var(--fog)}}
.weeks{{display:grid;grid-template-columns:1fr 1fr;gap:5mm}}
.wcol{{background:#fff;border:1px solid var(--line);border-radius:12px;padding:3.5mm 5mm 2mm;border-top:3px solid var(--teal)}}
.wcol.m2{{border-top-color:var(--gold)}}
.wk-split{{font-family:'Fira Code',monospace;font-size:7pt;letter-spacing:.12em;text-transform:uppercase;color:var(--teal-d);padding:0 0 2mm}}
.m2 .wk-split{{color:var(--gold-d)}}
.wk{{padding:2.6mm 0;border-top:1px solid var(--line)}}
.wk-n{{display:block;font-family:'Fira Code',monospace;font-size:7pt;letter-spacing:.08em;text-transform:uppercase;color:var(--gold-d)}}
.wk b{{display:block;font-size:10pt;color:var(--navy);font-weight:600;margin-top:.6mm}}
.wk span{{display:block;font-size:8.4pt;line-height:1.5;color:var(--fog);margin-top:.5mm}}
.tools{{margin-top:6mm}}
.tags{{display:flex;flex-wrap:wrap;gap:2.2mm;margin-top:1mm}}
.tag{{font-family:'Fira Code',monospace;font-size:8pt;padding:1.6mm 3.2mm;border-radius:99px;background:#fff;border:1px solid var(--line);color:var(--navy)}}
.note{{font-size:8pt;color:var(--fog);margin-top:2.5mm}}
.cols{{display:grid;grid-template-columns:1fr 1fr;gap:8mm}}
.projs{{display:grid;grid-template-columns:1fr 1fr;gap:3mm}}
.proj{{display:flex;gap:3mm;align-items:flex-start;background:#fff;border:1px solid var(--line);border-radius:10px;padding:3.2mm 3.5mm}}
.proj .bi{{font-size:14pt;color:var(--navy);margin-top:.5mm}}
.proj b{{display:block;font-size:9pt;color:var(--navy);line-height:1.3}}
.proj span{{display:block;font-size:7.8pt;color:var(--fog);margin-top:.5mm}}
.rcvs{{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:3mm;margin-top:1mm}}
.rcv{{background:#fff;border:1px solid var(--line);border-radius:10px;padding:4mm 3.5mm}}
.rcv .bi{{font-size:17pt;color:var(--navy);display:block}}
.rcv b{{display:block;font-size:9pt;color:var(--navy);margin-top:2.5mm;line-height:1.3}}
.rcv span{{display:block;font-size:7.8pt;color:var(--fog);margin-top:1mm;line-height:1.45}}
.who li{{list-style:none;display:flex;gap:2.5mm;font-size:9pt;line-height:1.5;margin-bottom:1.8mm}}
.who li .bi{{font-size:11pt;color:var(--teal-d);margin-top:.7mm}}
.who b{{color:var(--navy)}}
.fees{{display:grid;grid-template-columns:1fr 1fr;gap:3mm}}
.fee{{border:1px solid var(--line);background:#fff;border-radius:10px;padding:4mm}}
.fee.alt{{background:rgba(73,154,145,.10);border-color:rgba(73,154,145,.4)}}
.fee .k{{font-size:7pt;letter-spacing:.12em;text-transform:uppercase;font-weight:600;color:var(--fog)}}
.fee .a{{font-size:21pt;font-weight:800;color:var(--navy);letter-spacing:-.02em;margin-top:1mm}}
.fee p{{font-size:7.8pt;color:var(--fog);line-height:1.45;margin-top:1mm}}
.steps{{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm}}
.step{{background:#fff;border:1px solid var(--line);border-radius:10px;padding:3.5mm}}
.step .n{{width:7mm;height:7mm;border-radius:50%;border:1.5px solid var(--gold);color:var(--gold-d);font-weight:700;font-size:9pt;display:flex;align-items:center;justify-content:center}}
.step b{{display:block;font-size:9.2pt;color:var(--navy);margin-top:2mm}}
.step span{{display:block;font-size:7.8pt;color:var(--fog);margin-top:1mm;line-height:1.45}}
.reg{{display:flex;align-items:center;gap:6mm;margin-top:6mm;background:var(--navy);color:var(--ivory);border-radius:14px;padding:5.5mm 6mm;border:2px solid var(--gold)}}
.reg-txt{{flex:1}}
.reg-k{{font-family:'Fira Code',monospace;font-size:7pt;letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}}
.reg-h{{font-size:15pt;font-weight:700;margin-top:1mm}}
.reg-link{{display:inline-block;margin-top:2.5mm;font-size:11pt;font-weight:600;color:var(--ivory);text-decoration:none;border-bottom:1.5px solid var(--gold)}}
.reg-link.ph{{border:1.5px dashed var(--gold);border-radius:8px;padding:2mm 4mm;color:var(--gold);font-weight:500}}
.reg p{{font-size:8.5pt;color:rgba(246,243,236,.75);margin-top:2.5mm}}
.qr{{width:30mm;height:30mm;background:#fff;border-radius:8px;padding:2.5mm}}
.ph-qr{{display:flex;align-items:center;justify-content:center;text-align:center;font-size:7.5pt;line-height:1.35;color:var(--gold);background:transparent;border:1.5px dashed var(--gold)}}
.foot{{position:absolute;left:0;right:0;bottom:0;padding:5mm 16mm;background:var(--navy);color:rgba(246,243,236,.85);display:flex;gap:7mm;font-size:8pt;align-items:center}}
.foot div{{display:flex;align-items:center;gap:2mm}}
.foot .bi{{font-size:10pt;color:var(--gold)}}
.foot .r{{margin-left:auto}}
.sec{{margin-top:7mm}}
</style></head><body>

<section class="page cover">
  <div class="brand"><img src="{uri(logo)}" alt=""><div><div class="wm1">DATA SCIENCE</div><div class="wm2">ACADEMIA</div></div>
    <div class="brand-r">Chennai · Est. {SITE["founded"]}</div></div>
  <div class="cv-pill"><b>New batch</b>{B["months_display"]}</div>
  <h1 class="cv-h">Machine Learning<br><em>Internship</em></h1>
  <p class="cv-sub">Two months, fully online: a month of live machine learning training, then a month building a real project in a small group, guided by the Internship Supervisor. One hour every weekday evening, so it fits around college.</p>
  <div class="cv-mid">
    <div class="facts">
      <div class="fact">{ic("calendar-days")}<div class="k">Starts</div><div class="v">{B["start_display"]}</div><div class="s">ends {B["end_display"]}</div></div>
      <div class="fact">{ic("timer")}<div class="k">Duration</div><div class="v">2 months</div><div class="s">training + group project</div></div>
      <div class="fact">{ic("clock")}<div class="k">Schedule</div><div class="v">Mon – Fri<br>7:30 – 8:30 PM IST</div><div class="s">live, not recorded</div></div>
      <div class="fact">{ic("monitor-play")}<div class="k">Mode</div><div class="v">Online, live</div><div class="s">join from anywhere</div></div>
    </div>
    <div class="cv-img"><img src="{uri(img)}" alt=""></div>
  </div>
  <div class="hl">
    <div><b>40 hours</b><span>of live training and supervised project work</span></div>
    <div><b>1 project</b><span>built end to end in a small group</span></div>
    <div><b>3 + 1</b><span>offer letter, 2 certificates and project documentation</span></div>
    <div><b>No limit</b><span>on seats — every eligible student can join</span></div>
  </div>
  <div class="cv-band">
    <div><div class="k">Apply by</div><div class="v">{B["apply_by_display"]}</div></div>
    <div class="sep"></div>
    <div><div class="k">Fee</div><div class="v">{FEE} <small>· {FEE_P} for select colleges</small></div></div>
    <div class="url">Final-year UG &amp; PG students<b>datascienceacademia.in</b></div>
  </div>
</section>

<section class="page inner">
  <div class="top"><img src="{uri(logo)}" alt=""><span>Data Science Academia · Machine Learning Internship</span><span>{B["months_display"]}</span></div>
  <div class="eyebrow">The programme</div>
  <h2>How the <em>two months</em> work</h2>
  <div class="months">
    <div class="month">{ic("brain")}<div class="k">Month 1 · December</div><h3>Training</h3>
      <p>Live sessions every weekday evening take you from the machine learning workflow to regression, classification, tree ensembles, clustering and complete scikit-learn pipelines, with hands-on exercises on real datasets after every topic.</p></div>
    <div class="month m2">{ic("users")}<div class="k">Month 2 · January</div><h3>Group projects</h3>
      <p>You join a small group and build one end-to-end machine learning project, guided by the Internship Supervisor: problem statement, data, model, evaluation, a simple demo, and the final documentation and presentation.</p></div>
  </div>
  <div class="eyebrow">Week by week</div>
  <h2>The <em>8-week</em> plan</h2>
  <div class="weeks">{weeks}</div>
  <p class="note">The Internship Supervisor may adjust the pace of the plan to suit the batch.</p>
  <div class="tools"><div class="eyebrow">Tools you'll use</div><div class="tags" style="margin-top:3mm">{tools}</div>
    </div>
  <div class="foot"><div>{ic("phone")}{SITE["phone"]} (call / WhatsApp)</div><div>{ic("mail")}{SITE["email"]}</div><div class="r">{ic("globe")}datascienceacademia.in</div></div>
</section>

<section class="page inner">
  <div class="top"><img src="{uri(logo)}" alt=""><span>Data Science Academia · Machine Learning Internship</span><span>{B["months_display"]}</span></div>
  <div class="cols">
    <div><div class="eyebrow">Month 2</div><h2>Example <em>projects</em></h2><div class="projs">{projects}</div>
      <p class="note">Final topics are assigned to each group by the Internship Supervisor.</p></div>
    <div><div class="eyebrow">Eligibility</div><h2>Who can <em>apply</em></h2>
      <ul class="who">
        <li>{ic("graduation-cap")}<span><b>Final-year undergraduates</b> in BCA, B.Sc. or B.E./B.Tech Computer Science</span></li>
        <li>{ic("tabler/certificate")}<span><b>Postgraduate students</b>, for example MCA, M.Sc. or M.E./M.Tech</span></li>
        <li>{ic("tabler/brand-python")}<span>Basic Python helps — week 1 covers the essentials you need</span></li>
        <li>{ic("laptop")}<span>A laptop or desktop with internet and a Google account</span></li>
        <li>{ic("users")}<span>No seat limit — every eligible student can join</span></li>
      </ul>
      <div class="fees" style="margin-top:3mm">
        <div class="fee"><div class="k">Standard fee</div><div class="a">{FEE}</div><p>Full two months: training, group project, supervision, certificates and documentation.</p></div>
        <div class="fee alt"><div class="k">Select colleges · 50% off</div><div class="a">{FEE_P}</div><p>Per student, for select partner colleges. Ask your placement or internship coordinator.</p></div>
      </div></div>
  </div>
  <div class="sec"><div class="eyebrow">Every intern receives</div><div class="rcvs" style="margin-top:3mm">{receive}</div></div>
  <div class="sec"><div class="eyebrow">How to apply</div>
    <div class="steps" style="margin-top:3mm">
      <div class="step"><div class="n">1</div><b>Register by {B["apply_by_display"].replace(" 2026", "")}</b><span>Fill in the online registration form with your details.</span></div>
      <div class="step"><div class="n">2</div><b>Pay the fee</b><span>Pay using the UPI QR code in the form and upload your payment screenshot.</span></div>
      <div class="step"><div class="n">3</div><b>Get your offer letter</b><span>We verify your payment and email your Internship Offer Letter.</span></div>
      <div class="step"><div class="n">4</div><b>Start on {B["start_display"].replace(" 2026", "")}</b><span>You receive the joining link and timetable before the first session.</span></div>
    </div>
    {register_box()}
  </div>
  <div class="foot"><div>{ic("phone")}{SITE["phone"]} (call / WhatsApp)</div><div>{ic("mail")}{SITE["email"]}</div><div class="r">{ic("globe")}datascienceacademia.in/ml-internship.html</div></div>
</section>
</body></html>"""


def main() -> None:
    html_path = HERE / "brochure.html"
    html_path.write_text(page_html(), encoding="utf-8")
    pdf_path = HERE / "DSA-ML-Internship-Dec-2026-Brochure.pdf"
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page()
        pg.goto(html_path.as_uri())
        pg.wait_for_load_state("networkidle")
        pg.evaluate("document.fonts.ready")
        pg.pdf(path=str(pdf_path), format="A4", print_background=True, prefer_css_page_size=True)
        b.close()
    print("wrote", pdf_path.relative_to(ROOT), "| registration link:", FORM_URL or "PLACEHOLDER")


if __name__ == "__main__":
    main()

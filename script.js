/* ══════════════════════════════════════════════════════════════════════════
   Data Science Academia — shared site script
   Loaded (deferred) by every public page AND by the portal pages
   (login / register / verify / student / admin), so every feature is
   feature-detected and no-ops when its markup is absent.
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var d = document, w = window, root = d.documentElement;
  var scriptURL = (d.currentScript && d.currentScript.src) || '';
  var reduceMotion = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = w.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var raf = w.requestAnimationFrame || function (f) { return setTimeout(f, 16); };
  root.classList.add('js');

  /* ── 1. Custom cursor (desktop pointers only) ─────────────────────────── */
  var cur = d.getElementById('cur');
  if (cur && finePointer && !reduceMotion) {
    var cx = -100, cy = -100, ticking = false;
    d.addEventListener('mousemove', function (e) {
      cx = e.clientX; cy = e.clientY;
      if (!ticking) { ticking = true; raf(function () { cur.style.left = cx + 'px'; cur.style.top = cy + 'px'; ticking = false; }); }
    }, { passive: true });
    d.addEventListener('mouseover', function (e) {
      var t = e.target.closest && e.target.closest('a,button,[role="button"],summary,label,input,select,textarea');
      cur.style.transform = t ? 'translate(-50%,-50%) scale(2.6)' : 'translate(-50%,-50%) scale(1)';
      cur.style.opacity = t ? '.5' : '1';
    }, { passive: true });
    d.addEventListener('mouseleave', function () { cur.style.opacity = '0'; });
    d.addEventListener('mouseenter', function () { cur.style.opacity = '1'; });
  } else if (cur) { cur.parentNode.removeChild(cur); }

  /* ── 2. Scroll progress bar ───────────────────────────────────────────── */
  if (!d.getElementById('scroll-progress')) {
    var bar = d.createElement('div'); bar.id = 'scroll-progress'; bar.setAttribute('aria-hidden', 'true');
    d.body.insertBefore(bar, d.body.firstChild);
    var pTick = false;
    var updateBar = function () {
      var max = d.documentElement.scrollHeight - w.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, w.scrollY / max) : 0).toFixed(4) + ')';
      pTick = false;
    };
    w.addEventListener('scroll', function () { if (!pTick) { pTick = true; raf(updateBar); } }, { passive: true });
    updateBar();
  }

  /* ── 3. Ambient neural-network background (cheap version) ─────────────── */
  var canvas = d.getElementById('bg-canvas') || d.getElementById('fluid-canvas');
  if (canvas && !reduceMotion && canvas.getContext) {
    var ctx = canvas.getContext('2d', { alpha: true });
    var DPR = Math.min(w.devicePixelRatio || 1, 1.5);
    var coarse = !finePointer;
    var W = 0, H = 0, nodes = [], sparks = [];
    var LINK = 150, MOUSE = 200, FRAME_MS = 1000 / 30;
    var mx = -9999, my = -9999, last = 0, running = true;

    function size() {
      W = w.innerWidth; H = w.innerHeight;
      canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      var n = Math.max(20, Math.min(coarse ? 38 : 70, Math.round(W * H / 24000)));
      nodes = [];
      for (var i = 0; i < n; i++) nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.3 + .9, p: Math.random() * 6.28 });
    }
    size();
    var rT; w.addEventListener('resize', function () { clearTimeout(rT); rT = setTimeout(size, 150); });

    if (finePointer) {
      d.addEventListener('mousemove', function (e) {
        mx = e.clientX; my = e.clientY;
        if (sparks.length < 36) for (var i = 0; i < 2; i++) {
          var a = Math.random() * 6.28, s = Math.random() + .3;
          sparks.push({ x: mx, y: my, vx: Math.cos(a) * s * .6, vy: Math.sin(a) * s * .6 - .3, life: 1, size: Math.random() * 2.2 + 1, gold: Math.random() > .4 });
        }
      }, { passive: true });
      d.addEventListener('mouseleave', function () { mx = my = -9999; });
    }
    d.addEventListener('visibilitychange', function () { running = !d.hidden; if (running) raf(tick); });

    function tick(now) {
      if (!running) return;
      raf(tick);
      if (now - last < FRAME_MS) return;
      last = now;
      ctx.clearRect(0, 0, W, H);
      var i, j, n = nodes.length, a, b, dx, dy, dist;
      // move + spatial hash
      var cell = LINK, cols = Math.ceil(W / cell) + 1, grid = {};
      for (i = 0; i < n; i++) {
        a = nodes[i]; a.x += a.vx; a.y += a.vy; a.p += .02;
        if (a.x < -20) a.x = W + 20; else if (a.x > W + 20) a.x = -20;
        if (a.y < -20) a.y = H + 20; else if (a.y > H + 20) a.y = -20;
        var key = ((a.x / cell) | 0) + ((a.y / cell) | 0) * cols;
        (grid[key] || (grid[key] = [])).push(i);
      }
      // links
      ctx.lineWidth = .65;
      for (i = 0; i < n; i++) {
        a = nodes[i];
        var gx = (a.x / cell) | 0, gy = (a.y / cell) | 0;
        for (var ox = -1; ox <= 1; ox++) for (var oy = -1; oy <= 1; oy++) {
          var bucket = grid[(gx + ox) + (gy + oy) * cols]; if (!bucket) continue;
          for (var k = 0; k < bucket.length; k++) {
            j = bucket[k]; if (j <= i) continue; b = nodes[j];
            dx = a.x - b.x; dy = a.y - b.y; dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < LINK) {
              ctx.strokeStyle = 'rgba(200,169,110,' + ((1 - dist / LINK) * .26).toFixed(3) + ')';
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
          }
        }
        if (mx > -100) {
          dx = a.x - mx; dy = a.y - my; dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE) {
            ctx.strokeStyle = 'rgba(62,207,178,' + ((1 - dist / MOUSE) * .7).toFixed(3) + ')';
            ctx.lineWidth = .9; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mx, my); ctx.stroke(); ctx.lineWidth = .65;
          }
        }
      }
      // nodes
      for (i = 0; i < n; i++) {
        a = nodes[i]; var pulse = .6 + .4 * Math.sin(a.p);
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r * 3.2, 0, 6.283); ctx.fillStyle = 'rgba(200,169,110,' + (.05 * pulse).toFixed(3) + ')'; ctx.fill();
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r * pulse, 0, 6.283); ctx.fillStyle = 'rgba(200,169,110,' + (.8 * pulse).toFixed(3) + ')'; ctx.fill();
      }
      // pointer ring + sparks
      if (mx > -100) {
        var rp = .5 + .5 * Math.sin(now * .004);
        ctx.beginPath(); ctx.arc(mx, my, 12 + rp * 5, 0, 6.283); ctx.strokeStyle = 'rgba(62,207,178,' + (.25 + .18 * rp).toFixed(3) + ')'; ctx.lineWidth = 1.1; ctx.stroke();
        ctx.beginPath(); ctx.arc(mx, my, 3.5, 0, 6.283); ctx.fillStyle = 'rgba(62,207,178,.95)'; ctx.fill();
      }
      for (i = sparks.length - 1; i >= 0; i--) {
        var s = sparks[i]; s.x += s.vx; s.y += s.vy; s.vy -= .03; s.life -= .04; s.size *= .97;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, 6.283);
        ctx.fillStyle = (s.gold ? 'rgba(200,169,110,' : 'rgba(62,207,178,') + s.life.toFixed(2) + ')'; ctx.fill();
      }
    }
    raf(tick);
  } else if (canvas) { canvas.style.display = 'none'; }

  /* ── 4. Navigation (scrolled state + mobile drawer) ───────────────────── */
  var nav = d.getElementById('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', w.scrollY > 40); };
    w.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    var menu = d.getElementById('nav-menu') || d.getElementById('nmenu');
    var tog = nav.querySelector('.nav-tog');
    if (menu && tog) {
      var overlay = d.createElement('div'); overlay.className = 'nav-overlay'; d.body.appendChild(overlay);
      var setOpen = function (open) {
        menu.classList.toggle('open', open); overlay.classList.toggle('show', open);
        d.body.classList.toggle('nav-open', open);
        tog.setAttribute('aria-expanded', open ? 'true' : 'false');
        tog.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      };
      tog.addEventListener('click', function () { setOpen(!menu.classList.contains('open')); });
      overlay.addEventListener('click', function () { setOpen(false); });
      menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
      d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('open')) { setOpen(false); tog.focus(); } });
      w.addEventListener('resize', function () { if (w.innerWidth > 1024 && menu.classList.contains('open')) setOpen(false); });
    }
  }

  /* ── 5. Scroll reveal ─────────────────────────────────────────────────── */
  var revealEls = d.querySelectorAll('[data-r]');
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in w)) {
      revealEls.forEach(function (el) { el.classList.add('vis'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('vis'); io.unobserve(en.target); } });
      }, { threshold: .08, rootMargin: '0px 0px -5% 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
      // safety nets: never leave content invisible (odd viewports, observer quirks, print)
      var revealAbove = function (factor) { revealEls.forEach(function (el) { if (el.getBoundingClientRect().top < w.innerHeight * factor) el.classList.add('vis'); }); };
      setTimeout(function () { revealAbove(1.25); }, 1200);
      w.addEventListener('load', function () { setTimeout(function () { revealAbove(1.25); }, 300); });
      w.addEventListener('beforeprint', function () { revealEls.forEach(function (el) { el.classList.add('vis'); }); });
    }
  }

  /* ── 6. Animated counters (.met-n / .stat-n / [data-count]) ───────────── */
  var counters = d.querySelectorAll('.met-n,[data-count]');
  if (counters.length && !reduceMotion && 'IntersectionObserver' in w) {
    var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
    var animate = function (el) {
      var raw = el.textContent.trim(), m = raw.match(/^([^\d]*)(\d[\d,]*)(.*)$/);
      if (!m) return;
      var target = parseInt(m[2].replace(/,/g, ''), 10), pre = m[1], suf = m[3];
      var start = target > 1900 && target < 2100 ? target - 12 : 0, t0 = performance.now(), dur = 1600;
      (function frame(now) {
        var p = Math.min((now - t0) / dur, 1);
        el.textContent = pre + Math.round(start + (target - start) * ease(p)) + suf;
        if (p < 1) raf(frame); else el.textContent = raw;
      })(t0);
    };
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { animate(en.target); cio.unobserve(en.target); } });
    }, { threshold: .5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ── 7. Generic filter tabs ───────────────────────────────────────────────
     <div class="filter-tabs" data-filter-group="cat" data-filter-target="#grid">
       <button class="ftab on" data-filter="all">All</button>
       <button class="ftab" data-filter="cv">Computer Vision</button>
     </div>
     Items inside #grid carry data-cat="cv". Several groups may target the same grid
     (an item is shown only when it matches every group). An optional element with
     data-filter-empty="#grid" is shown when nothing matches. */
  var groups = d.querySelectorAll('[data-filter-group]');
  if (groups.length) {
    var apply = function (target) {
      var active = [];
      d.querySelectorAll('[data-filter-group][data-filter-target="' + target + '"]').forEach(function (g) {
        var on = g.querySelector('.ftab.on');
        active.push({ attr: 'data-' + g.getAttribute('data-filter-group'), val: on ? on.getAttribute('data-filter') : 'all' });
      });
      var grid = d.querySelector(target); if (!grid) return;
      var shown = 0;
      grid.querySelectorAll('[data-filter-item]').forEach(function (item) {
        var ok = active.every(function (f) {
          if (f.val === 'all') return true;
          var v = item.getAttribute(f.attr) || '';
          return (' ' + v + ' ').indexOf(' ' + f.val + ' ') !== -1;
        });
        item.classList.toggle('hidden', !ok); if (ok) shown++;
      });
      var empty = d.querySelector('[data-filter-empty="' + target + '"]'); if (empty) empty.classList.toggle('hidden', shown > 0);
      var count = d.querySelector('[data-filter-count="' + target + '"]'); if (count) count.textContent = shown;
    };
    groups.forEach(function (g) {
      g.addEventListener('click', function (e) {
        var btn = e.target.closest('.ftab'); if (!btn) return;
        g.querySelectorAll('.ftab').forEach(function (b) { b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('on'); btn.setAttribute('aria-pressed', 'true');
        apply(g.getAttribute('data-filter-target'));
      });
      g.querySelectorAll('.ftab').forEach(function (b) { b.setAttribute('aria-pressed', b.classList.contains('on') ? 'true' : 'false'); });
    });
    // initial state from ?filter= query (e.g. courses.html?filter=advanced-ai)
    var qf = new URLSearchParams(location.search).get('filter');
    if (qf) { var qb = d.querySelector('.ftab[data-filter="' + qf + '"]'); if (qb) qb.click(); }
  }

  /* ── 8. External links: safe target=_blank ────────────────────────────── */
  d.querySelectorAll('a[target="_blank"]:not([rel~="noopener"])').forEach(function (a) { a.setAttribute('rel', (a.getAttribute('rel') || '') + ' noopener'); });

  /* ── 9. Service worker (public pages; portal registers it too) ────────── */
  if ('serviceWorker' in navigator && scriptURL && /^https?:/.test(location.protocol) && !/localhost|127\.0\.0\.1/.test(location.hostname)) {
    w.addEventListener('load', function () {
      try { navigator.serviceWorker.register(new URL('sw.js', scriptURL).href, { scope: new URL('./', scriptURL).href }).catch(function () {}); } catch (e) {}
    });
  }

  /* ── 10. Chatbase assistant — loaded lazily after first interaction ───── */
  if (!/verify\.html$/.test(location.pathname) && !navigator.webdriver && !/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {
    var chatLoaded = false;
    var loadChat = function () {
      if (chatLoaded) return; chatLoaded = true;
      if (!w.chatbase || w.chatbase('getState') !== 'initialized') {
        w.chatbase = function () { if (!w.chatbase.q) w.chatbase.q = []; w.chatbase.q.push(arguments); };
        w.chatbase = new Proxy(w.chatbase, { get: function (target, prop) { if (prop === 'q') return target.q; return function () { return target.apply(null, [prop].concat([].slice.call(arguments))); }; } });
      }
      var s = d.createElement('script'); s.src = 'https://www.chatbase.co/embed.min.js'; s.id = 'c0CBw_ktD4FG0ExvrlhUW'; s.domain = 'www.chatbase.co'; s.defer = true;
      d.body.appendChild(s);
    };
    ['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach(function (ev) { w.addEventListener(ev, loadChat, { once: true, passive: true }); });
    setTimeout(loadChat, 9000);
  }
})();

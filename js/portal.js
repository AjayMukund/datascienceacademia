/* ─── Portal shared logic ─────────────────────────────────────────────────── */
document.addEventListener('portal:ready', async function () {
  const p = window._profile;

  // Notification badge (students only)
  if (p.role === 'student') {
    const { count } = await supa
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', window._user.id)
      .eq('read', false);
    if (count > 0) {
      document.querySelectorAll('.notif-badge').forEach(el => {
        el.textContent = count > 9 ? '9+' : count;
        el.classList.add('show');
      });
    }
  }

  document.querySelectorAll('.portal-username').forEach(el => el.textContent = p.name);
  document.querySelectorAll('.portal-role').forEach(el => el.textContent =
    p.role === 'admin' ? 'Administrator' : 'Student');

  // Inject avatar into every .portal-topbar (before the ☰ hamburger)
  // so the student's face is visible on every page without opening the sidebar.
  const profileHref = (location.pathname.includes('/admin/') ? '../student/' : '') + 'profile.html';
  document.querySelectorAll('.portal-topbar').forEach(topbar => {
    if (topbar.querySelector('.topbar-av')) return; // already injected
    const tog = topbar.querySelector('.portal-mob-tog');
    if (!tog) return;
    const av = document.createElement('a');
    av.href      = profileHref;
    av.className = 'portal-avatar topbar-av';
    av.title     = p.name + ' — My Profile';
    av.style.cssText = 'width:32px;height:32px;font-size:.78rem;flex-shrink:0;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;';
    tog.insertAdjacentElement('beforebegin', av);
  });

  // Apply photo / initial to every portal-avatar (includes newly injected topbar ones)
  document.querySelectorAll('.portal-avatar').forEach(el => {
    if (p.avatar_url) {
      el.style.backgroundImage    = `url('${p.avatar_url}')`;
      el.style.backgroundSize     = 'cover';
      el.style.backgroundPosition = 'center';
      el.textContent = '';
    } else {
      el.style.backgroundImage = '';
      el.textContent = p.name.charAt(0).toUpperCase();
    }
  });

  document.querySelectorAll('.portal-logout').forEach(btn => {
    btn.addEventListener('click', async () => {
      await supa.auth.signOut();
      const root = location.pathname.includes('/student/') ||
                   location.pathname.includes('/admin/') ? '../' : '/';
      window.location.href = root + 'login.html';
    });
  });

  const links = document.querySelectorAll('.portal-nav a');
  links.forEach(a => {
    if (a.href === location.href) a.classList.add('active');
  });
});

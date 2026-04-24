/* ─── Portal shared logic ─────────────────────────────────────────────────── */
document.addEventListener('portal:ready', function () {
  const p = window._profile;

  document.querySelectorAll('.portal-username').forEach(el => el.textContent = p.name);
  document.querySelectorAll('.portal-role').forEach(el => el.textContent =
    p.role === 'admin' ? 'Administrator' : 'Student');
  document.querySelectorAll('.portal-avatar').forEach(el => {
    if (p.avatar_url) el.src = p.avatar_url;
    else el.textContent = p.name.charAt(0).toUpperCase();
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

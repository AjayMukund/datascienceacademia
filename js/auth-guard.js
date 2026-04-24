/* ─── Route protection ────────────────────────────────────────────────────────
   Include this script on every protected page (student/* and admin/*).
   It redirects unauthenticated visitors to /login.html and prevents students
   from accessing admin pages.
──────────────────────────────────────────────────────────────────────────── */
(async function () {
  const { data: { session } } = await supa.auth.getSession();

  const root = location.pathname.includes('/student/') ? '../' :
               location.pathname.includes('/admin/')   ? '../' : '/';

  if (!session) {
    window.location.href = root + 'login.html';
    return;
  }

  const { data: profile } = await supa
    .from('profiles')
    .select('role, name')
    .eq('id', session.user.id)
    .single();

  if (!profile) {
    window.location.href = root + 'login.html';
    return;
  }

  if (location.pathname.includes('/admin/') && profile.role !== 'admin') {
    window.location.href = '../student/dashboard.html';
    return;
  }

  if (location.pathname.includes('/student/') && profile.role === 'admin') {
    window.location.href = '../admin/dashboard.html';
    return;
  }

  window._user   = session.user;
  window._profile = profile;

  document.dispatchEvent(new Event('portal:ready'));
})();

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

  // Retry once after 400 ms in case of a transient DB hiccup
  let profile = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    const { data } = await supa
      .from('profiles')
      .select('role, name')
      .eq('id', session.user.id)
      .single();
    if (data) { profile = data; break; }
    if (attempt === 0) await new Promise(r => setTimeout(r, 400));
  }

  if (!profile) {
    // Sign out first so login.html doesn't see a valid session and
    // bounce the user straight back here — that's what causes the flicker loop.
    await supa.auth.signOut();
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

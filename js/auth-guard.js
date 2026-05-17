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
    // Profile row is missing (student added by admin directly in Supabase,
    // or upsert failed at registration). Auto-create it from session metadata.
    const name = session.user.user_metadata?.name
              || session.user.email?.split('@')[0]
              || 'Student';
    const { data: created } = await supa.from('profiles')
      .upsert({ id: session.user.id, name, role: 'student' })
      .select('role, name')
      .single();
    profile = created;
  }

  if (!profile) {
    // Still null after auto-create attempt — sign out to prevent redirect loop.
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

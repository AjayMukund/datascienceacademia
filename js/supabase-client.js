/* ─── Supabase client ─────────────────────────────────────────────────────────
   Replace the two placeholder values below with your Supabase project credentials.
   Project Settings → API → Project URL  +  anon/public key
──────────────────────────────────────────────────────────────────────────── */
const SUPABASE_URL  = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_ANON = 'YOUR_SUPABASE_ANON_KEY';

const supa = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

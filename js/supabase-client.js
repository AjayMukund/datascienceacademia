/* ─── Supabase client ─────────────────────────────────────────────────────────
   Replace the two placeholder values below with your Supabase project credentials.
   Project Settings → API → Project URL  +  anon/public key
──────────────────────────────────────────────────────────────────────────── */
const SUPABASE_URL  = 'https://isoepiysqmqffwhroseh.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlzb2VwaXlzcW1xZmZ3aHJvc2VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMTcyNDQsImV4cCI6MjA5MjU5MzI0NH0.lv4IquTcYPY90TRSy1IZoLktt-yY-GDAPb4gF95Cn7k';

const supa = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

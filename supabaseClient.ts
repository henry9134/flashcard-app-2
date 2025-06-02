import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nbnxxslihcrhciwxnjsc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ibnh4c2xpaGNyaGNpd3huanNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MzY3MjUsImV4cCI6MjA2NDQxMjcyNX0.doVsPxzjxLUkkjhhPC0JEc176tRjNfoBGCjqsLFN8DE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

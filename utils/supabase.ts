1import { createClient } from '@supabase/supabase-js';
2
3const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
4const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
5
6export const supabase = createClient(supabaseUrl, supabaseKey);
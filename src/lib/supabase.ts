import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ptmigsefczfrvbhspzxq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_z3OhltHnuJch7yWDPMacdg_1Qi_ZnRL';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

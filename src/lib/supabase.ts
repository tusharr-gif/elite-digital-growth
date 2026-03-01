import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ptmigsefczfrvbhspzxq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0bWlnc2VmY3pmcnZiaHNwenhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNDUwNDEsImV4cCI6MjA4NzkyMTA0MX0.7KoMThXbTxVcXik9HyYpkkM0rHlP9r_jWkm8kM9Xczc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

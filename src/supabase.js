import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wommhkxkqxkzkmbhrzpe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvbW1oa3hrcXhremttYmhyenBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MzAyODIsImV4cCI6MjA2NTIwNjI4Mn0.Y3GS4VGyAdmcKPwoRuWuTRAKO9yG5t13jJXHn-9920M';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

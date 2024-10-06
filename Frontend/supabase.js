
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://gaswppvpsylnkxfdyiwe.supabase.co';  
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdhc3dwcHZwc3lsbmt4ZmR5aXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxNDc1ODQsImV4cCI6MjA0MzcyMzU4NH0.i1o6KjcnAAp9KMEvnkYJ6ZRfkGo0w6UNAFYotlSkfSY';  
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

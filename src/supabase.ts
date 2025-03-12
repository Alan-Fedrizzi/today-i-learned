import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mbbcyzbcxvzzwxijjahn.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iYmN5emJjeHZ6end4aWpqYWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1Nzk0MTIsImV4cCI6MjA1NDE1NTQxMn0.V6Y9Gs4f5N_6OlBX7HSUKBkZRYcrAhyQtfOMYdGt7oc";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;

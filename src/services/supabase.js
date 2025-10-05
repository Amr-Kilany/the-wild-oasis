import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://caurnyeduepaddkaykzd.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhdXJueWVkdWVwYWRka2F5a3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1OTk1OTcsImV4cCI6MjA2NzE3NTU5N30.2eIO7DdiCXCBoEZbHxSSpgDx6pWCKm1rLKaUFsQLJmM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

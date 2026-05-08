import { createClient } from "@supabase/supabase-js";

// Vite loads variables starting with VITE_ from the .env file in the root directory
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Log values to verify they are loading (you can remove this after it works)
console.log("Supabase URL loaded:", !!supabaseUrl);
console.log("Supabase Key loaded:", !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Check your .env file in the root folder.");
}

export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);
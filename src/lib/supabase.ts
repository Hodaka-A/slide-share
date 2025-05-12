import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE.VITE_SUPABASE_KEY; 
const supabaseKey = import.meta.env.VITE.VITE_SUPABASE_KEY; 


export const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from '@supabase/supabase-js'

// Estas constantes vêm do seu Dashboard do Supabase
// (Settings > API)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY



export const supabase = createClient(supabaseUrl, supabaseKey)

export const login = async (email:string, password:string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  return { data, error };
};
import { createClient } from '@supabase/supabase-js';

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY as string
);

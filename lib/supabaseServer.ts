import { createClient } from '@supabase/supabase-js';

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_URL as string,
  process.env.SUPABASE_SECRET_KEY as string
);

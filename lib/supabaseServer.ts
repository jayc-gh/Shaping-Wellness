import { createClient } from '@supabase/supabase-js';

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_URL as string,
  process.env.SUPABASE_SECRET_KEY as string
);

export const donationsTable =
  process.env.NODE_ENV === 'production' ? 'donations' : 'donations_test';

export const messagesTable =
  process.env.NODE_ENV === 'production' ? 'messages' : 'messages_test';

export const volunteersTable =
  process.env.NODE_ENV === 'production' ? 'volunteers' : 'volunteers_test';

export const partnersTable =
  process.env.NODE_ENV === 'production' ? 'partners' : 'partners_test';

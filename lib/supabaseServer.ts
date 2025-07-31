import { createClient } from '@supabase/supabase-js';

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_URL as string,
  process.env.SUPABASE_SECRET_KEY as string
);

const isProd = process.env.VERCEL_ENV === 'production';

export const donationsTable = isProd ? 'donations' : 'donations_test';

export const messagesTable = isProd ? 'messages' : 'messages_test';

export const volunteersTable = isProd ? 'volunteers' : 'volunteers_test';

export const partnersTable = isProd ? 'partners' : 'partners_test';

export const subscriptionPricesTable = isProd
  ? 'subscription_prices'
  : process.env.VERCEL_ENV === 'preview'
  ? 'subscription_prices_test'
  : 'subscription_prices_test_local';

export const subscriptionInfoTable = isProd
  ? 'subscription_info'
  : 'subscription_info_test';

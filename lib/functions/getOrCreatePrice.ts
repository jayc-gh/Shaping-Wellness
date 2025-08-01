import { subscriptionPricesTable } from '../supabaseServer';
import type Stripe from 'stripe';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function getOrCreateRecurringPrice(
  amountInCents: number,
  stripe: Stripe,
  supabaseServer: SupabaseClient
): Promise<string> {
  // check if the price already exists in your DB
  const { data, error } = await supabaseServer
    .from(subscriptionPricesTable)
    .select('stripe_price_id')
    .eq('amount', amountInCents)
    .eq('currency', 'usd')
    .eq('interval', 'month')
    .limit(1)
    .maybeSingle();

  if (error) throw new Error('Failed to fetch from Supabase');

  if (data) {
    return data.stripe_price_id; // reuse existing price
  }

  // if not, create it in Stripe
  const price = await stripe.prices.create({
    unit_amount: amountInCents,
    currency: 'usd',
    recurring: { interval: 'month' },
    product_data: { name: `Monthly Donation - $${amountInCents / 100}` },
  });

  // store in your DB
  const { error: insertError } = await supabaseServer
    .from(subscriptionPricesTable)
    .insert([
      {
        amount: amountInCents,
        currency: 'usd',
        interval: 'month',
        stripe_price_id: price.id,
      },
    ]);

  if (insertError) {
    console.error('Failed to store new price in DB:', insertError);
    throw new Error(insertError.message);
  }

  return price.id;
}

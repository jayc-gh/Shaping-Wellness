import Stripe from 'stripe';

const key =
  process.env.VERCEL_ENV === 'production' ||
  process.env.VERCEL_ENV === 'preview'
    ? process.env.STRIPE_SECRET_KEY
    : process.env.STRIPE_SECRET_KEY_LOCAL;
export const stripe = new Stripe(key as string);

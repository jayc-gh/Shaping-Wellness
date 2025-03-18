'use client';

import CheckoutPage from '@/components/CheckoutPage';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey: string = process.env
  .NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string;
if (!stripePublicKey) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLIC_KEY');
}

const stripeSecretKey: string = process.env.STRIPE_SECRET_KEY as string;
if (!stripeSecretKey) {
  throw new Error('Missing STRIPE_SECRET_KEY');
}

const stripePromise = loadStripe(stripePublicKey);

export default function Donate() {
  return <div className="py-30">donation page</div>;
}

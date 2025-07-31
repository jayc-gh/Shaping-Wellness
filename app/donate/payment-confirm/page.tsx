import {
  fetchPayment,
  fetchSubscription,
} from '@/lib/functions/serverFunctions';
import ClientPaymentConfirm from './ClientPaymentConfirm';
import type Stripe from 'stripe';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export type DonationObject = {
  status: string;
  amount: number;
  last_payment_error: Stripe.PaymentIntent.LastPaymentError | null;
  error?: {
    message: string;
    status: number;
  };
};

export default async function PaymentConfirmPage({ searchParams }: Props) {
  // ignore warning
  const resolvedSearchParams = await searchParams;
  const paymentId = resolvedSearchParams.payment_intent;
  const subscriptionId = resolvedSearchParams.subscriptionId;
  const monthly = resolvedSearchParams.monthly as string;

  let fetchUrl: string;
  let donation: DonationObject;
  const baseUrl = process.env.VERCEL_ENV
    ? process.env.NEXT_PUBLIC_SITE_URL
    : 'http://localhost:3000';

  if (subscriptionId) {
    fetchUrl = `${baseUrl}/api/subscription-status?subscriptionId=${subscriptionId}`;
    donation = await fetchSubscription(fetchUrl);
  } else {
    fetchUrl = `${baseUrl}/api/payment-status?payment_intent=${paymentId}`;
    donation = await fetchPayment(fetchUrl);
  }
  return <ClientPaymentConfirm donation={donation} monthly={monthly} />;
}

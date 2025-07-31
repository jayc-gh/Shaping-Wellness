import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import type Stripe from 'stripe';

export async function GET(req: NextRequest) {
  const subscriptionId = req.nextUrl.searchParams.get('subscriptionId');
  if (!subscriptionId) {
    return NextResponse.json(
      { error: 'Missing subscription id' },
      { status: 400 }
    );
  }

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['latest_invoice.payment_intent'],
    });

    const latestInvoice = subscription.latest_invoice;

    let paymentIntentStatus: string | null = null;
    let lastPaymentError: Stripe.PaymentIntent.LastPaymentError | null = null;

    if (
      latestInvoice &&
      typeof latestInvoice !== 'string' &&
      'payment_intent' in latestInvoice &&
      latestInvoice.payment_intent &&
      typeof latestInvoice.payment_intent !== 'string'
    ) {
      const paymentIntent =
        latestInvoice.payment_intent as Stripe.PaymentIntent;
      paymentIntentStatus = paymentIntent.status;
      lastPaymentError = paymentIntent.last_payment_error ?? null;
    }

    return NextResponse.json({
      amount: subscription.items.data[0].price.unit_amount,
      status: paymentIntentStatus,
      last_payment_error: lastPaymentError,
    });
  } catch (error) {
    console.error('Supabase query error:', error);
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

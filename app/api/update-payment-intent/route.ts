import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  let amount: number | undefined;
  try {
    const { paymentIntentId, amount } = await request.json();

    if (!paymentIntentId || typeof amount !== 'number' || amount <= 0) {
      throw new Error('Invalid paymentIntentId or amount');
    }

    // Update the payment intent amount
    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      amount,
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    let message = 'Something went wrong while updating the payment intent.';

    // backend error log
    console.error('Stripe error', {
      error: error instanceof Error ? error.stack : error,
      context: { endpoint: '/api/update-payment-intent', amount },
    });
    if (error instanceof Stripe.errors.StripeError) {
      message = error.message;
    }

    return NextResponse.json({ message }, { status: 500 });
  }
}

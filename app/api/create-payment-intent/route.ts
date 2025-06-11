import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  let amount: number | undefined;
  try {
    const body = await request.json();
    const { amount } = body;

    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
      throw new Error('Invalid or missing payment amount.');
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    const clientSecret = paymentIntent.client_secret;

    return NextResponse.json({
      paymentIntentId: paymentIntent.id,
      paymentStatus: paymentIntent.status,
      clientSecret,
    });
  } catch (error) {
    let message = 'Something went wrong while creating the payment intent.';

    // backend error log
    console.error('Error', {
      error: error instanceof Error ? error.stack : error,
      context: { endpoint: '/api/create-payment-intent', amount },
    });
    if (error instanceof Stripe.errors.StripeError) {
      message = error.message;
    }

    return NextResponse.json({ message }, { status: 500 });
  }
}

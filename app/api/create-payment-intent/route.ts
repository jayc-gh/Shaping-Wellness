import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  let amount: number | undefined;
  try {
    const body = await request.json();
    amount = body.amount;

    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
      throw new Error('Invalid or missing payment amount.');
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    let message = 'Something went wrong while creating the payment intent.';

    // backend error log
    console.error('Stripe error', {
      error: error instanceof Error ? error.stack : error,
      context: { endpoint: '/api/create-payment-intent', amount },
    });
    if (error instanceof Stripe.errors.StripeError) {
      message = error.message;
    }

    return NextResponse.json({ message }, { status: 500 });
  }
}

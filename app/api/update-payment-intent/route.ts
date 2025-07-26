import { NextRequest, NextResponse } from 'next/server';
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
    if (error && typeof error === 'object' && 'type' in error) {
      // Stripe-specific error
      const stripeError = error as { message?: string; type?: string };
      message = stripeError.message || 'There was a problem with your payment.';
    } else if (error instanceof Error) {
      // Generic JS error
      message = error.message;
    } else {
      message = 'Unknown error occurred.';
    }

    return NextResponse.json({ message }, { status: 500 });
  }
}

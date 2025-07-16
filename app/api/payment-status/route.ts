import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(req: NextRequest) {
  const paymentIntentId = req.nextUrl.searchParams.get('payment_intent');
  if (!paymentIntentId) {
    return NextResponse.json(
      { error: 'Missing payment intent' },
      { status: 400 }
    );
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return NextResponse.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      last_payment_error: paymentIntent.last_payment_error,
    });
  } catch (error) {
    console.error('Error fetching PaymentIntent:', error);
    return NextResponse.json(
      { error: 'PaymentIntent not found' },
      { status: 404 }
    );
  }
}

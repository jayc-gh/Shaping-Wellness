import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { getOrCreateRecurringPrice } from '@/lib/functions/getOrCreatePrice';

export async function POST(req: NextRequest) {
  const { email, amount } = await req.json();

  if (!email || !amount)
    return NextResponse.json(
      { message: 'Invalid request data.' },
      { status: 400 }
    );

  try {
    const customer = await stripe.customers.create({ email });
    const priceId = await getOrCreateRecurringPrice(amount);

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        payment_method_types: ['card', 'us_bank_account'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
    });

    if (
      typeof subscription.latest_invoice === 'object' &&
      subscription.latest_invoice?.payment_intent &&
      typeof subscription.latest_invoice.payment_intent === 'object'
    ) {
      const paymentIntent = subscription.latest_invoice
        .payment_intent as Stripe.PaymentIntent;
      const clientSecret = paymentIntent.client_secret;

      return NextResponse.json({
        clientSecret,
        paymentIntent,
        customerId: customer.id,
        subscriptionId: subscription.id,
        status: subscription.status,
      });
    }
  } catch (error) {
    let message = 'Something went wrong while creating the subscription.';

    // backend error log
    console.error('Error', {
      error: error instanceof Error ? error.stack : error,
      context: { endpoint: '/api/create-subscription' },
    });
    if (error instanceof Stripe.errors.StripeError) {
      message = error.message;
    }

    return NextResponse.json({ message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  let amount: number | undefined;
  try {
    const body = await request.json();
    const {
      charged_amount,
      donation_amount,
      email,
      firstName,
      lastName,
      orgName,
      phoneNumber,
      phoneType,
      address1,
      address2,
      city,
      state,
      postalCode,
      country,
    } = body;
    amount = charged_amount;
    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
      throw new Error('Invalid or missing payment amount.');
    }

    const customer = await stripe.customers.create({
      email: email.toLowerCase().trim(),
      name: orgName ? orgName : `${firstName} ${lastName}`,
      phone: phoneNumber,
      address: {
        line1: address1,
        line2: address2,
        country: country,
        state: state,
        city: city,
        postal_code: postalCode,
      },
      metadata: {
        firstName,
        lastName,
        orgName,
        phoneNumber,
        phoneType,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: charged_amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      receipt_email: email.toLowerCase().trim(),
      customer: customer.id,
      description: `One-time donation`,
      metadata: {
        charged_amount: amount,
        donation_amount,
      },
    });

    const clientSecret = paymentIntent.client_secret;

    return NextResponse.json({
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      clientSecret,
    });
  } catch (error) {
    let message = 'Something went wrong while creating the payment intent.';

    // backend error log
    console.error('Error', {
      error: error instanceof Error ? error.stack : error,
      context: { endpoint: '/api/create-payment-intent', amount },
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

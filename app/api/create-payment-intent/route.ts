import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { supabaseServer } from '@/lib/supabaseServer';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  amount: number;
  clientSecret: string | null;
  paymentIntentId: string;
  paymentStatus: string;
};

export async function POST(request: NextRequest) {
  let amount: number | undefined;
  try {
    const body = await request.json();
    const { firstName, lastName, email, amount } = body;

    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
      throw new Error('Invalid or missing payment amount.');
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    const clientSecret = paymentIntent.client_secret;
    const paymentIntentId = paymentIntent.id;
    const paymentStatus = paymentIntent.status;

    const formData: FormData = {
      firstName,
      lastName,
      email,
      amount,
      clientSecret,
      paymentIntentId,
      paymentStatus,
    };

    const donorId = await storeData(formData);

    return NextResponse.json({
      clientSecret,
      paymentIntentId,
      paymentStatus,
      donorId,
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

const storeData = async (formData: FormData) => {
  const { error } = await supabaseServer
    .from(`donations_test`)
    .insert({
      donor_first_name: formData.firstName.toLowerCase(),
      donor_last_name: formData.lastName.toLowerCase(),
      donor_email: formData.email.toLowerCase(),
      payment_intent_id: formData.paymentIntentId,
      payment_intent_client_secret: formData.clientSecret,
      charged_amount: formData.amount,
      payment_status: formData.paymentStatus,
    })
    .select('id');

  if (error) {
    throw new Error(error.message);
  }
};

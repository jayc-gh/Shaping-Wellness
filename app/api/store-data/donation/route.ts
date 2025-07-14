import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseServer, donationsTable } from '@/lib/supabaseServer';
import { DatabaseDonationData } from '@/declarations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      orgName,
      phoneNum,
      phoneType,
      email,
      amount,
      clientSecret,
      paymentIntentId,
      paymentStatus,
      subscriptionId,
    } = body;

    const formData: DatabaseDonationData = {
      firstName,
      lastName,
      orgName,
      email,
      phoneNum,
      phoneType,
      amount,
      clientSecret,
      paymentIntentId,
      paymentStatus,
      subscriptionId,
    };

    const donorId = await storeData(formData);

    return NextResponse.json({
      donorId,
    });
  } catch (error) {
    let message =
      'Something went wrong while storing payment intent into database.';

    // backend error log
    console.error('Error', {
      error: error instanceof Error ? error.stack : error,
      context: { endpoint: '/api/store-data' },
    });
    if (error instanceof Stripe.errors.StripeError) {
      message = error.message;
    }

    return NextResponse.json({ message }, { status: 500 });
  }
}

const storeData = async (formData: DatabaseDonationData) => {
  const { data, error } = await supabaseServer
    .from(donationsTable)
    .insert({
      donor_first_name: formData.firstName.toLowerCase(),
      donor_last_name: formData.lastName.toLowerCase(),
      donor_email: formData.email.toLowerCase(),
      payment_intent_id: formData.paymentIntentId,
      payment_intent_client_secret: formData.clientSecret,
      charged_amount: formData.amount,
      payment_status: formData.paymentStatus,
      subscription_id: formData.subscriptionId,
      organization_name: formData.orgName,
      phone_number: formData.phoneNum,
      phone_type: formData.phoneType,
    })
    .select('id')
    .single();

  if (error) {
    throw new Error(error.message);
  } else {
    return data.id;
  }
};

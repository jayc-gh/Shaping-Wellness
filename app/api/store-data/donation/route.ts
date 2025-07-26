import { NextRequest, NextResponse } from 'next/server';
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
      charged_amount,
      donation_amount,
      clientSecret,
      paymentIntentId,
      paymentStatus,
      subscriptionId,
      address1,
      address2,
      country,
      state,
      city,
      postalCode,
      anonymous,
    } = body;

    const formData: DatabaseDonationData = {
      firstName,
      lastName,
      orgName,
      email,
      phoneNum,
      phoneType,
      charged_amount,
      donation_amount,
      clientSecret,
      paymentIntentId,
      paymentStatus,
      subscriptionId,
      address1,
      address2,
      country,
      state,
      city,
      postalCode,
      anonymous,
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

const storeData = async (formData: DatabaseDonationData) => {
  const { data, error } = await supabaseServer
    .from(donationsTable)
    .insert({
      donor_first_name: formData.firstName.toLowerCase(),
      donor_last_name: formData.lastName.toLowerCase(),
      donor_email: formData.email.toLowerCase(),
      payment_intent_id: formData.paymentIntentId,
      payment_intent_client_secret: formData.clientSecret,
      charged_amount: formData.charged_amount,
      donation_amount: formData.donation_amount,
      payment_status: formData.paymentStatus,
      subscription_id: formData.subscriptionId,
      organization_name: formData.orgName,
      phone_number: formData.phoneNum,
      phone_type: formData.phoneType,
      address1: formData.address1,
      address2: formData.address2,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      postal_code: formData.postalCode,
      anonymous: formData.anonymous,
    })
    .select('id')
    .single();

  if (error) {
    throw new Error(error.message);
  } else {
    return data.id;
  }
};

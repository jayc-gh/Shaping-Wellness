import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseServer, messagesTable } from '@/lib/supabaseServer';
import { ContactFormData } from '@/declarations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, details } = body;

    const formData: ContactFormData = {
      firstName,
      lastName,
      email,
      details,
    };

    const messageId = await storeData(formData);

    return NextResponse.json({
      messageId,
    });
  } catch (error) {
    let message =
      'Something went wrong while sending your message. Please try again.';

    // backend error log
    console.error('Error', {
      error: error instanceof Error ? error.stack : error,
      context: { endpoint: '/api/contact' },
    });
    if (error instanceof Stripe.errors.StripeError) {
      message = error.message;
    }

    return NextResponse.json({ message }, { status: 500 });
  }
}

const storeData = async (formData: ContactFormData) => {
  const { data, error } = await supabaseServer
    .from(messagesTable)
    .insert({
      first_name: formData.firstName.toLowerCase(),
      last_name: formData.lastName.toLowerCase(),
      email: formData.email.toLowerCase(),
      details: formData.details,
    })
    .select('id')
    .single();

  if (error) {
    throw new Error(error.message);
  } else {
    return data.id;
  }
};

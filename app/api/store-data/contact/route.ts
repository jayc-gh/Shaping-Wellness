import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer, messagesTable } from '@/lib/supabaseServer';
import { ContactFormData } from '@/declarations';
import SendFormEmail from '@/lib/functions/brevo/brevoForms';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, details } = body;

    const formData: ContactFormData = {
      firstName,
      lastName,
      email,
      details,
    };

    const messageId = await storeData(formData);
    const now = new Date();
    const dateChicagoTime = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(now);

    const emailProps = {
      firstName,
      lastName,
      message: details,
      formType: 'Contact',
      formId: messageId,
      email,
      date: dateChicagoTime,
    };
    await SendFormEmail(emailProps);

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

import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer, subscriptionInfoTable } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { message: 'Invalid request data.' },
      { status: 400 }
    );
  }

  try {
    const subscriptionId = await checkEmail(email);
    return NextResponse.json({
      subscriptionId,
    });
  } catch (error) {
    let message =
      'Something went wrong while trying to connect to the database.';

    // backend error log
    console.error('Error', {
      error: error instanceof Error ? error.stack : error,
      context: { endpoint: '/api/subscription-email' },
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

const checkEmail = async (email: string) => {
  const { data, error } = await supabaseServer
    .from(subscriptionInfoTable)
    .select('subscription_id')
    .eq('email', email)
    .eq('status', 'active')
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  } else {
    return data;
  }
};

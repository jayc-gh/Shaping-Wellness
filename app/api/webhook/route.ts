import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event: Stripe.Event;

  async function updatePaymentStatus(paymentIntentId: string, status: string) {
    const { error } = await supabaseServer
      .from(`donations_test`)
      .update({ payment_status: status })
      .eq('payment_intent_id', paymentIntentId);

    if (error) {
      throw new Error(error.message);
    }
  }

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    const intent = event.data.object as Stripe.PaymentIntent;

    switch (event.type) {
      case 'payment_intent.succeeded': {
        await updatePaymentStatus(intent.id, 'succeeded');
        break;
      }
      case 'payment_intent.processing': {
        await updatePaymentStatus(intent.id, 'processing');
        break;
      }
      case 'payment_intent.payment_failed': {
        await updatePaymentStatus(intent.id, 'failed');
        break;
      }
      case 'payment_intent.canceled': {
        await updatePaymentStatus(intent.id, 'canceled');
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    let message = 'Something went wrong while retrieving payment status.';

    // backend error log
    console.error('Stripe error', {
      error: error instanceof Error ? error.stack : error,
      context: { endpoint: '/api/webhook' },
    });
    if (error instanceof Stripe.errors.StripeError) {
      message = error.message;
    }

    return NextResponse.json({ message }, { status: 500 });
  }
}

import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  updateSubscription,
  updatePaymentStatus,
  createSubscriptionPayment,
} from '@/lib/functions/webhookFunctions';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return NextResponse.json(
      { message: 'Webhook signature verification failed.' },
      { status: 400 }
    );
  }

  // Respond immediately to Stripe before processing event
  const response = NextResponse.json({ received: true }, { status: 200 });

  // Fire and forget processing
  processEvent(event).catch(err => {
    console.error('Error processing webhook event:', err);
  });

  return response;
}

async function processEvent(event: Stripe.Event) {
  switch (event.type) {
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      await updateSubscription(subscription.id, subscription.status, true);
      break;
    }
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      await updateSubscription(subscription.id, subscription.status, false);
      break;
    }
    case 'payment_intent.succeeded':
    case 'payment_intent.processing':
    case 'payment_intent.payment_failed':
    case 'payment_intent.canceled': {
      const intent = event.data.object as Stripe.PaymentIntent;
      await updatePaymentStatus(intent.id, intent.status);
      break;
    }
    case 'invoice.created': {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId =
        typeof invoice.subscription === 'string'
          ? invoice.subscription
          : invoice.subscription?.id;

      if (!subscriptionId) {
        throw new Error(`Invoice ${invoice.id} has no subscription ID.`);
      }
      const customer = await stripe.customers.retrieve(
        invoice.customer as string
      );

      if (customer.deleted) {
        throw new Error(`Customer ${invoice.customer} was deleted`);
      }
      console.log('invoice created');
      await createSubscriptionPayment(
        // Pull data from customer metadata
        customer.metadata.firstName || '',
        customer.metadata.lastName || '',
        customer.metadata.orgName || '',
        customer.email || invoice.customer_email || '',
        customer.metadata.phoneNumber || '',
        customer.metadata.phoneType || '',
        invoice.amount_due,
        subscriptionId,
        invoice.id,
        invoice.status ?? 'pending'
      );
      break;
    }
    case 'invoice.paid':
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      await updatePaymentStatus(invoice.id, 'succeeded');
      break;
    }
    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      await updatePaymentStatus(invoice.id, 'failed');
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
      break;
  }
}

import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import {
  updateSubscription,
  updatePaymentStatus,
  createSubscriptionPayment,
} from '@/lib/functions/webhookFunctions';
import {
  getEmailInfoFromInvoice,
  getEmailInfoFromPaymentIntent,
  sendSuccessEmail,
  sendFailedEmail,
  sendProcessingEmail,
} from '@/lib/functions/emailFunctions';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('Stripe-Signature') as string;

  let event: Stripe.Event;

  const webhookSecret = process.env.VERCEL_ENV
    ? process.env.STRIPE_WEBHOOK_SECRET
    : process.env.STRIPE_WEBHOOK_SECRET_LOCAL;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret!);
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
    // update subscription webhooks
    case 'customer.subscription.deleted':
    case 'customer.subscription.updated': {
      console.log('Subscription updated');
      const subscription = event.data.object as Stripe.Subscription;
      await updateSubscription(subscription, stripe);
      break;
    }

    // one time payment webhooks
    case 'payment_intent.succeeded': {
      const intent = event.data.object as Stripe.PaymentIntent;
      if (intent.invoice) {
        console.log('Ignoring subscription-related payment intent');
        break;
      }
      console.log('Payment intent succeeded');
      const emailInfo = await getEmailInfoFromPaymentIntent(intent);
      console.log('emailInfo', emailInfo);
      if (emailInfo) {
        const emailSent = await sendSuccessEmail(emailInfo);
        const receiptSent =
          emailSent.status == 201 || emailSent.status == 200 ? true : false;
        console.log('emailSent', emailSent);
        await updatePaymentStatus(intent.id, 'succeeded', receiptSent);
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const intent = event.data.object as Stripe.PaymentIntent;
      let failedReason;
      if (
        intent.status === 'requires_payment_method' ||
        intent.status === 'canceled' ||
        intent.status === 'requires_action'
      ) {
        failedReason = intent.last_payment_error?.message || 'Unknown error';
        console.error('Payment intent failed.', failedReason);
        const emailInfo = await getEmailInfoFromPaymentIntent(intent);
        if (emailInfo) {
          await sendFailedEmail(emailInfo);
          await updatePaymentStatus(intent.id, 'failed', false, failedReason);
        }
      }
      break;
    }
    case 'payment_intent.canceled': {
      console.log('Payment intent canceled');
      const intent = event.data.object as Stripe.PaymentIntent;
      await updatePaymentStatus(intent.id, 'canceled');
      break;
    }

    // onetime and subscriptions
    case 'payment_intent.processing': {
      console.log('Payment intent processing');
      const intent = event.data.object as Stripe.PaymentIntent;
      let emailInfo;

      if (intent.invoice) {
        const invoice =
          typeof intent.invoice === 'string'
            ? await stripe.invoices.retrieve(intent.invoice)
            : intent.invoice;

        emailInfo = await getEmailInfoFromInvoice(invoice);
      } else {
        emailInfo = await getEmailInfoFromPaymentIntent(intent);
      }
      if (emailInfo) {
        await sendProcessingEmail(emailInfo);
        await updatePaymentStatus(intent.id, 'processing', false);
      }
      break;
    }

    // recurring subscription webhooks
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

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const { donation_amount, charged_amount, subscriber_id } =
        subscription.metadata ?? {};

      if (customer.deleted) {
        throw new Error(`Customer ${invoice.customer} was deleted`);
      }
      console.log('Invoice created');
      await createSubscriptionPayment(
        // Pull data from customer metadata
        customer.metadata.firstName || '',
        customer.metadata.lastName || '',
        customer.metadata.orgName || '',
        customer.email || invoice.customer_email || '',
        customer.metadata.phoneNumber || '',
        customer.metadata.phoneType || '',
        Number(charged_amount),
        Number(donation_amount),
        subscriber_id,
        invoice.id,
        invoice.status ?? 'pending',
        customer.address?.line1,
        customer.address?.line2,
        customer.address?.country,
        customer.address?.state,
        customer.address?.city,
        customer.address?.postal_code,
        customer.metadata.anonymous === 'true'
      );
      break;
    }
    case 'invoice.payment_succeeded': {
      console.log('Invoice paid');
      const invoice = event.data.object as Stripe.Invoice;
      const emailInfo = await getEmailInfoFromInvoice(invoice);
      if (emailInfo) {
        const emailSent = await sendSuccessEmail(emailInfo);
        const receiptSent =
          emailSent.status == 201 || emailSent.status == 200 ? true : false;

        await updatePaymentStatus(invoice.id, 'succeeded', receiptSent);
      }
      break;
    }
    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      let failedReason: string;
      if (typeof invoice.payment_intent === 'string') {
        const paymentIntent = await stripe.paymentIntents.retrieve(
          invoice.payment_intent
        );
        const error = paymentIntent.last_payment_error;
        console.error(
          'Invoice payment failed:',
          error?.message,
          error?.code,
          error?.decline_code
        );
        failedReason = error?.message || 'Unknown error.';
        const emailInfo = await getEmailInfoFromInvoice(invoice, failedReason);
        if (emailInfo) {
          await sendFailedEmail(emailInfo);
          await updatePaymentStatus(invoice.id, 'failed', false, failedReason);
        }
      } else {
        const error = invoice.payment_intent?.last_payment_error;
        console.error(
          'Invoice payment failed:',
          error?.message,
          error?.code,
          error?.decline_code
        );
        failedReason = error?.message || 'Unknown error.';
        const emailInfo = await getEmailInfoFromInvoice(invoice, failedReason);
        if (emailInfo) {
          await sendFailedEmail(emailInfo);
          await updatePaymentStatus(invoice.id, 'failed', false, failedReason);
        }
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
      break;
  }
}

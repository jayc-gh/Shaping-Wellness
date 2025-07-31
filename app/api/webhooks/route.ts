import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import {
  updateSubscription,
  updatePaymentStatus,
  createSubscriptionPayment,
  getSubscriptionPaymentInfo,
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
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  const webhookSecret =
    process.env.VERCEL_ENV === 'production' ||
    process.env.VERCEL_ENV === 'preview'
      ? process.env.STRIPE_WEBHOOK_SECRET
      : process.env.STRIPE_WEBHOOK_SECRET_LOCAL;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret as string
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(err);
    console.log(`Error message: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  try {
    await processEvent(event);
  } catch (err) {
    console.error('Error processing webhook event:', err);
    return NextResponse.json(
      { message: 'Webhook processing failed.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true }, { status: 200 });
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
      // get full intent because for whatever reason intent from webhook doesn't include invoice
      const fullIntent = await stripe.paymentIntents.retrieve(intent.id, {
        expand: ['payment_method', 'customer'],
      });
      if (fullIntent.invoice) {
        console.log('Ignoring subscription-related payment intent');
        break;
      }
      console.log('Payment intent succeeded');
      const emailInfo = await getEmailInfoFromPaymentIntent(fullIntent);
      if (emailInfo) {
        const emailSent = await sendSuccessEmail(emailInfo);
        const receiptSent =
          emailSent.status == 201 || emailSent.status == 200 ? true : false;
        await updatePaymentStatus(fullIntent.id, 'succeeded', receiptSent);
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const intent = event.data.object as Stripe.PaymentIntent;
      // get full intent because for whatever reason intent from webhook doesn't include invoice
      const fullIntent = await stripe.paymentIntents.retrieve(intent.id, {
        expand: ['payment_method', 'customer'],
      });
      if (fullIntent.invoice) {
        console.log('Ignoring subscription-related payment intent');
        break;
      }
      let failedReason;
      if (
        intent.status === 'requires_payment_method' ||
        intent.status === 'canceled' ||
        intent.status === 'requires_action'
      ) {
        failedReason =
          fullIntent.last_payment_error?.message || 'Unknown error';
        console.error('Payment intent failed.', failedReason);
        const emailInfo = await getEmailInfoFromPaymentIntent(fullIntent);
        if (emailInfo) {
          await sendFailedEmail(emailInfo);
          await updatePaymentStatus(
            fullIntent.id,
            'failed',
            false,
            failedReason
          );
        }
      }
      break;
    }
    case 'payment_intent.canceled': {
      console.log('Payment intent canceled');
      const intent = event.data.object as Stripe.PaymentIntent;
      // get full intent because for whatever reason intent from webhook doesn't include invoice
      const fullIntent = await stripe.paymentIntents.retrieve(intent.id, {
        expand: ['payment_method', 'customer'],
      });
      if (fullIntent.invoice) {
        console.log('Ignoring subscription-related payment intent');
        break;
      }
      await updatePaymentStatus(fullIntent.id, 'canceled');
      break;
    }

    // onetime and subscriptions
    case 'payment_intent.processing': {
      console.log('Payment intent processing');
      const intent = event.data.object as Stripe.PaymentIntent;
      const fullIntent = await stripe.paymentIntents.retrieve(intent.id, {
        expand: ['payment_method', 'customer', 'invoice'],
      });
      let emailInfo;

      if (
        fullIntent.invoice &&
        fullIntent.customer &&
        typeof fullIntent.customer !== 'string' &&
        !('deleted' in fullIntent.customer)
      ) {
        const invoice = fullIntent.invoice as Stripe.Invoice;

        const paymentMethod = fullIntent.payment_method;
        if (paymentMethod && typeof paymentMethod !== 'string') {
          emailInfo = await getEmailInfoFromInvoice(
            invoice,
            fullIntent.customer,
            paymentMethod
          );
        }
      } else {
        emailInfo = await getEmailInfoFromPaymentIntent(fullIntent);
      }

      if (emailInfo) {
        await sendProcessingEmail(emailInfo);
        await updatePaymentStatus(fullIntent.id, 'processing', false);
      }
      break;
    }

    // recurring subscription webhooks
    case 'invoice.payment_succeeded': {
      console.log('Invoice paid');
      const invoice = event.data.object as Stripe.Invoice;
      const fullInvoice = await stripe.invoices.retrieve(invoice.id, {
        expand: ['customer', 'payment_intent.payment_method'],
      });
      const paymentInfo = await getSubscriptionPaymentInfo(fullInvoice, stripe);
      if (
        fullInvoice.customer &&
        typeof fullInvoice.customer !== 'string' &&
        !('deleted' in fullInvoice.customer) &&
        fullInvoice.payment_intent &&
        typeof fullInvoice.payment_intent !== 'string'
      ) {
        const customer = fullInvoice.customer;
        const paymentIntent = fullInvoice.payment_intent;

        const paymentMethod = paymentIntent.payment_method;

        if (paymentMethod && typeof paymentMethod !== 'string') {
          const emailInfo = await getEmailInfoFromInvoice(
            fullInvoice,
            customer,
            paymentMethod
          );
          if (emailInfo) {
            const emailSent = await sendSuccessEmail(emailInfo);
            const receiptSent =
              emailSent.status == 201 || emailSent.status == 200 ? true : false;

            await createSubscriptionPayment({
              ...paymentInfo,
              status: 'succeeded',
              receiptSent,
            });
          }
        }
      }

      break;
    }
    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      const fullInvoice = await stripe.invoices.retrieve(invoice.id, {
        expand: ['customer', 'payment_intent.payment_method'],
      });
      const paymentInfo = await getSubscriptionPaymentInfo(fullInvoice, stripe);
      const paymentIntent = fullInvoice.payment_intent as Stripe.PaymentIntent;

      let failedReason = 'Unknown error.';
      const error = paymentIntent.last_payment_error;

      if (error) {
        console.error(
          'Invoice payment failed:',
          error.message,
          error.code,
          error.decline_code
        );
        failedReason = error.message || failedReason;
      }

      if (
        fullInvoice.customer &&
        typeof fullInvoice.customer !== 'string' &&
        !('deleted' in fullInvoice.customer) &&
        fullInvoice.payment_intent &&
        typeof fullInvoice.payment_intent !== 'string'
      ) {
        const customer = fullInvoice.customer;
        const paymentIntent = fullInvoice.payment_intent;

        const paymentMethod = paymentIntent.payment_method;

        if (paymentMethod && typeof paymentMethod !== 'string') {
          const emailInfo = await getEmailInfoFromInvoice(
            fullInvoice,
            customer,
            paymentMethod,
            failedReason
          );
          if (emailInfo) {
            const emailSent = await sendFailedEmail(emailInfo);
            const receiptSent =
              emailSent.status == 201 || emailSent.status == 200 ? true : false;

            await createSubscriptionPayment({
              ...paymentInfo,
              status: 'failed',
              receiptSent,
            });
          }
        }
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
      break;
  }
}

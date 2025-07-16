import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { getOrCreateRecurringPrice } from '@/lib/functions/getOrCreatePrice';
import { supabaseServer, subscriptionInfoTable } from '@/lib/supabaseServer';
import { SubscriptionData } from '@/declarations';

export async function POST(req: NextRequest) {
  const {
    email,
    amount,
    firstName,
    lastName,
    orgName,
    phoneNumber,
    phoneType,
  } = await req.json();

  if (!email || !amount || !firstName || !lastName) {
    return NextResponse.json(
      { message: 'Invalid request data.' },
      { status: 400 }
    );
  }

  try {
    const customer = await stripe.customers.create({
      email,
      name: orgName ? orgName : `${firstName} ${lastName}`,
      phone: phoneNumber,
      metadata: {
        firstName,
        lastName,
        orgName,
        phoneNumber,
        phoneType,
      },
    });
    const priceId = await getOrCreateRecurringPrice(amount);

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        payment_method_types: ['card', 'us_bank_account'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
    });
    const periodStart = new Date(subscription.current_period_start * 1000);
    const periodEnd = new Date(subscription.current_period_end * 1000);
    const cycleAnchor = new Date(subscription.billing_cycle_anchor * 1000);

    if (
      typeof subscription.latest_invoice === 'object' &&
      subscription.latest_invoice?.payment_intent &&
      typeof subscription.latest_invoice.payment_intent === 'object'
    ) {
      const paymentIntent = subscription.latest_invoice
        .payment_intent as Stripe.PaymentIntent;
      const clientSecret = paymentIntent.client_secret;

      const formData: SubscriptionData = {
        subscriptionId: subscription.id,
        firstName,
        lastName,
        orgName,
        phoneNumber,
        phoneType,
        email: email,
        amount: amount,
        status: paymentIntent.status,
        periodStart,
        periodEnd,
        cycleAnchor,
        invoiceId: subscription.latest_invoice.id,
      };
      await storeData(formData);
      return NextResponse.json({
        clientSecret,
        paymentIntent,
        customerId: customer.id,
        subscriptionId: subscription.id,
        status: subscription.status,
      });
    }
  } catch (error) {
    let message = 'Something went wrong while creating your subscription.';

    // backend error log
    console.error('Error', {
      error: error instanceof Error ? error.stack : error,
      context: { endpoint: '/api/create-subscription' },
    });
    if (error instanceof Stripe.errors.StripeError) {
      message = error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ message }, { status: 500 });
  }
}

const storeData = async (formData: SubscriptionData) => {
  const {
    subscriptionId,
    firstName,
    lastName,
    orgName,
    phoneNumber,
    phoneType,
    email,
    amount,
    status,
  } = formData;
  const { data, error } = await supabaseServer
    .from(subscriptionInfoTable)
    .insert({
      subscription_id: subscriptionId,
      first_name: firstName,
      last_name: lastName,
      org_name: orgName,
      phone_number: phoneNumber,
      phone_type: phoneType,
      email: email,
      amount: amount,
      status: status,
      billing_cycle_anchor: formData.cycleAnchor,
      current_period_start: formData.periodStart,
      current_period_end: formData.periodEnd,
    })
    .select('subscription_id')
    .single();

  if (error) {
    // duplicate unique violation - only one subscription per email
    if (error.code === '23505') {
      throw new Error('A subscription with this email already exists.');
    }
    throw new Error(error.message);
  } else {
    return data.subscription_id;
  }
};

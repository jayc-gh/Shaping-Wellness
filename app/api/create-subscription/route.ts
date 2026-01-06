import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getOrCreateRecurringPrice } from '@/lib/functions/getOrCreatePrice';
import { supabaseServer, subscriptionInfoTable } from '@/lib/supabaseServer';
import { SubscriptionData } from '@/declarations';
import type Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const url = new URL(req.url);

  // warmup ping
  if (url.searchParams.get('warmup') === '1') {
    return NextResponse.json({warm: true})
  }

  const {
    email,
    charged_amount,
    donation_amount,
    firstName,
    lastName,
    orgName,
    phoneNumber,
    phoneType,
    address1,
    address2,
    country,
    state,
    city,
    postalCode,
    anonymous,
  } = await req.json();

  if (
    !email ||
    !charged_amount ||
    !donation_amount ||
    !firstName ||
    !lastName
  ) {
    console.error('Invalid request data', {
      email,
      charged_amount,
      donation_amount,
      firstName,
      lastName,
      orgName,
      phoneNumber,
      phoneType,
      address1,
      address2,
      country,
      state,
      city,
      postalCode,
      anonymous,
    });
    return NextResponse.json(
      { message: 'Invalid request data.' },
      { status: 400 }
    );
  }

  try {
    const customer = await stripe.customers.create({
      email: email.toLowerCase().trim(),
      name: orgName ? orgName : `${firstName} ${lastName}`,
      phone: phoneNumber,
      address: {
        line1: address1,
        line2: address2,
        country: country,
        state: state,
        city: city,
        postal_code: postalCode,
      },
      metadata: {
        firstName,
        lastName,
        orgName,
        phoneNumber,
        phoneType,
        anonymous: String(anonymous).toLowerCase(),
      },
    });
    const priceId = await getOrCreateRecurringPrice(
      charged_amount,
      stripe,
      supabaseServer
    );

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        payment_method_types: ['card', 'us_bank_account'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        charged_amount: charged_amount,
        donation_amount: donation_amount,
      },
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
        email: email.toLowerCase().trim(),
        charged_amount: charged_amount,
        donation_amount: donation_amount,
        status: paymentIntent.status,
        periodStart,
        periodEnd,
        cycleAnchor,
        invoiceId: subscription.latest_invoice.id,
        address1,
        address2,
        country,
        state,
        city,
        postalCode,
        anonymous,
      };
      const subscriberId = await storeData(formData);
      await stripe.subscriptions.update(subscription.id, {
        metadata: {
          charged_amount: charged_amount,
          donation_amount: donation_amount,
          subscriber_id: subscriberId,
        },
      });
      return NextResponse.json({
        clientSecret,
        paymentIntent,
        customerId: customer.id,
        subscriptionId: subscription.id,
        subscriberId: subscriberId,
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

const storeData = async (formData: SubscriptionData) => {
  const {
    subscriptionId,
    firstName,
    lastName,
    orgName,
    phoneNumber,
    phoneType,
    email,
    charged_amount,
    donation_amount,
    status,
    address1,
    address2,
    country,
    state,
    city,
    postalCode,
    anonymous,
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
      charged_amount: charged_amount,
      donation_amount: donation_amount,
      status: status,
      billing_cycle_anchor: formData.cycleAnchor,
      current_period_start: formData.periodStart,
      current_period_end: formData.periodEnd,
      address1: address1,
      address2: address2,
      country: country,
      state: state,
      city: city,
      postal_code: postalCode,
      anonymous: anonymous,
    })
    .select('id')
    .single();

  if (error) {
    throw new Error(error.message);
  } else {
    return data.id;
  }
};

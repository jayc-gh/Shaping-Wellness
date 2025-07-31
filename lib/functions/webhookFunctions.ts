import {
  supabaseServer,
  donationsTable,
  subscriptionInfoTable,
} from '@/lib/supabaseServer';
import type Stripe from 'stripe';
import { CreateSubscriptionPaymentOptions } from '@/declarations';

export async function updatePaymentStatus(
  invoiceId: string,
  status: string,
  receiptSent: boolean = false,
  failedReason?: string
) {
  const column = invoiceId.startsWith('pi_')
    ? 'payment_intent_id'
    : 'invoice_id';
  const { error } = await supabaseServer
    .from(donationsTable)
    .update({
      payment_status: status,
      updated_at: new Date(),
      failed_reason: failedReason,
      receipt_sent: receiptSent,
    })
    .eq(column, invoiceId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateSubscription(
  subscription: Stripe.Subscription,
  stripe: Stripe
) {
  const subscriptionId = subscription.id;
  const customer = await stripe.customers.retrieve(
    subscription.customer as string
  );
  if (customer.deleted) {
    throw new Error(`Customer ${subscription.customer} was deleted`);
  }
  const { firstName, lastName, orgName, phoneNumber, phoneType } =
    customer.metadata;
  const now = new Date();
  const { error } = await supabaseServer
    .from(subscriptionInfoTable)
    .update({
      status: subscription.status,
      cancellation_date: subscription.canceled_at
        ? new Date(subscription.canceled_at * 1000)
        : null,
      updated_at: now,
      charged_amount: subscription.items.data[0].price.unit_amount,
      donation_amount: subscription.metadata.donation_amount,
      first_name: firstName?.toLowerCase(),
      last_name: lastName?.toLowerCase(),
      org_name: orgName?.toLowerCase(),
      phone_number: phoneNumber?.toLowerCase(),
      phone_type: phoneType?.toLowerCase(),
      current_period_start: new Date(subscription.current_period_start * 1000),
      current_period_end: new Date(subscription.current_period_end * 1000),
      email: customer.email?.toLowerCase(),
    })
    .eq('subscription_id', subscriptionId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getDonorInfo(subscriptionId: string) {
  const { data, error } = await supabaseServer
    .from(subscriptionInfoTable)
    .select(
      'email, charged_amount, donation_amount, first_name, last_name, org_name, phone_number, phone_type'
    )
    .eq('subscription_id', subscriptionId)
    .single();
  if (error) {
    throw new Error(error.message);
  } else {
    return data;
  }
}

export async function createSubscriptionPayment({
  firstName,
  lastName,
  orgName,
  email,
  phoneNumber,
  phoneType,
  chargedAmount,
  donationAmount,
  subscriberId,
  invoiceId,
  status,
  addressLine1,
  addressLine2,
  country,
  state,
  city,
  postalCode,
  anonymous,
  receiptSent,
  failedReason,
}: CreateSubscriptionPaymentOptions) {
  const { data, error } = await supabaseServer
    .from(donationsTable)
    .insert({
      donor_first_name: firstName.toLowerCase(),
      donor_last_name: lastName.toLowerCase(),
      donor_email: email.toLowerCase().trim(),
      charged_amount: chargedAmount,
      donation_amount: donationAmount,
      payment_status: status,
      subscriber_id: subscriberId,
      organization_name: orgName,
      phone_number: phoneNumber,
      phone_type: phoneType,
      invoice_id: invoiceId,
      address1: addressLine1,
      address2: addressLine2,
      country: country,
      state: state,
      city: city,
      postal_code: postalCode,
      anonymous: anonymous,
      receipt_sent: receiptSent,
      failed_reason: failedReason,
    })
    .select('id')
    .single();
  if (error) {
    throw new Error(error.message);
  } else {
    return data.id;
  }
}

export async function updateSubscriptionPaymentStatus(
  invoiceId: string,
  status: string
) {
  const { error } = await supabaseServer
    .from(donationsTable)
    .update({ payment_status: status, updated_at: new Date() })
    .eq('invoice_id', invoiceId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getSubscriptionPaymentInfo(
  fullInvoice: Stripe.Invoice,
  stripe: Stripe
) {
  const subscriptionId =
    typeof fullInvoice.subscription === 'string'
      ? fullInvoice.subscription
      : fullInvoice.subscription?.id;

  if (!subscriptionId) {
    throw new Error(`Invoice ${fullInvoice.id} has no subscription ID.`);
  }
  const customer = fullInvoice.customer as Stripe.Customer | null;

  const {
    firstName = '',
    lastName = '',
    orgName = '',
    phoneNum = '',
    phoneType = '',
    anonymous = '',
  } = customer?.metadata ?? {};
  const {
    line1 = undefined,
    line2 = undefined,
    country = undefined,
    state = undefined,
    city = undefined,
    postal_code = undefined,
  } = customer?.address ?? ({} as Stripe.Address);
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const { donation_amount, charged_amount, subscriber_id } =
    subscription.metadata ?? {};

  const paymentInfo: CreateSubscriptionPaymentOptions = {
    firstName,
    lastName,
    orgName,
    email: customer?.email || '',
    phoneNumber: phoneNum,
    phoneType,
    chargedAmount: Number(charged_amount),
    donationAmount: Number(donation_amount),
    subscriberId: subscriber_id,
    invoiceId: fullInvoice.id,
    addressLine1: line1 || undefined,
    addressLine2: line2 || undefined,
    country: country || undefined,
    state: state || undefined,
    city: city || undefined,
    postalCode: postal_code || undefined,
    anonymous: anonymous === 'true',
  };

  return paymentInfo;
}

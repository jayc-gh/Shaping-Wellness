import {
  supabaseServer,
  donationsTable,
  subscriptionInfoTable,
} from '@/lib/supabaseServer';
import type Stripe from 'stripe';

export async function updatePaymentStatus(
  invoiceId: string,
  status: string,
  receiptSent: boolean = false,
  failedReason?: string
) {
  console.log('inside updatePaymentStatus');
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

export async function createSubscriptionPayment(
  firstName: string,
  lastName: string,
  orgName: string,
  email: string,
  phoneNum: string,
  phoneType: string,
  charged_amount: number,
  donation_amount: number,
  subscriberId: string,
  invoiceId: string,
  paymentStatus: string,
  address1: string | undefined | null,
  address2: string | undefined | null,
  country: string | undefined | null,
  state: string | undefined | null,
  city: string | undefined | null,
  postalCode: string | undefined | null,
  anonymous: boolean
) {
  const { data, error } = await supabaseServer
    .from(donationsTable)
    .insert({
      donor_first_name: firstName.toLowerCase(),
      donor_last_name: lastName.toLowerCase(),
      donor_email: email.toLowerCase(),
      charged_amount: charged_amount,
      donation_amount: donation_amount,
      payment_status: paymentStatus,
      subscriber_id: subscriberId,
      organization_name: orgName,
      phone_number: phoneNum,
      phone_type: phoneType,
      invoice_id: invoiceId,
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

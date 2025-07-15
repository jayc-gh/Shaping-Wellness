import {
  supabaseServer,
  donationsTable,
  subscriptionInfoTable,
} from '@/lib/supabaseServer';

export async function updatePaymentStatus(
  paymentIntentId: string,
  status: string
) {
  const { error } = await supabaseServer
    .from(donationsTable)
    .update({ payment_status: status, updated_at: new Date() })
    .eq('payment_intent_id', paymentIntentId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateSubscription(
  subscriptionId: string,
  status: string,
  cancel: boolean
) {
  const now = new Date();
  const { error } = await supabaseServer
    .from(subscriptionInfoTable)
    .update({
      status: status,
      cancellation_date: cancel ? now : null,
      updated_at: now,
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
      'email, amount, first_name, last_name, org_name, phone_number, phone_type'
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
  paymentIntentId: string,
  amount: number,
  subscriptionId: string,
  invoiceId: string,
  paymentStatus: string
) {
  const { data, error } = await supabaseServer
    .from(donationsTable)
    .insert({
      donor_first_name: firstName.toLowerCase(),
      donor_last_name: lastName.toLowerCase(),
      donor_email: email.toLowerCase(),
      payment_intent_id: paymentIntentId,
      charged_amount: amount,
      payment_status: paymentStatus,
      subscription_id: subscriptionId,
      organization_name: orgName,
      phone_number: phoneNum,
      phone_type: phoneType,
      invoice_id: invoiceId,
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

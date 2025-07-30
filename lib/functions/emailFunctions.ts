import { stripe } from '@/lib/stripe';
import type Stripe from 'stripe';
import SendEmail from './brevo/brevoDonate';

export type SendEmailProps = {
  idType: string;
  userId: string;
  totalCharged: string;
  donationAmount: string;
  frequency: string;
  orgName?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneType: string;
  phoneNum: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  paymentMethod: string;
  paymentType: string;
  last4: string;
  failedReason?: string;
  nextBillingDate?: string;
};

export const sendSuccessEmail = async (props: SendEmailProps) => {
  return SendEmail(props, 'success');
};

export const sendFailedEmail = async (props: SendEmailProps) => {
  return SendEmail(props, 'failed');
};

export const sendProcessingEmail = async (props: SendEmailProps) => {
  return SendEmail(props, 'pending');
};

export const GetPaymentInfoOneTime = async (intent: Stripe.PaymentIntent) => {
  let paymentMethod;
  if (typeof intent.payment_method === 'string') {
    paymentMethod = await stripe.paymentMethods.retrieve(intent.payment_method);
  }
  const brandMap: Record<string, string> = {
    visa: 'Visa',
    mastercard: 'MasterCard',
    amex: 'American Express',
    discover: 'Discover',
    jcb: 'JCB',
    diners: 'Diners Club',
    unionpay: 'UnionPay',
  };
  if (paymentMethod?.us_bank_account) {
    return {
      last4: paymentMethod.us_bank_account.last4 || 'unknown',
      method: 'US Bank Account',
      brand: 'Account',
    };
  } else if (paymentMethod?.card) {
    const brand = paymentMethod.card.brand;
    const formattedBrand =
      brandMap[brand] ?? brand.charAt(0).toUpperCase() + brand.slice(1);

    return {
      last4: paymentMethod.card.last4,
      method: 'Credit Card',
      brand: formattedBrand,
    };
  }

  return {
    last4: 'unknown',
    method: 'unknown',
    brand: 'unknown',
  };
};

export const GetPaymentInfoSubscription = async (invoice: Stripe.Invoice) => {
  if (!invoice.payment_intent) {
    return {
      last4: 'unknown',
      method: 'unknown',
      brand: 'unknown',
    };
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(
    invoice.payment_intent as string,
    {
      expand: ['payment_method'],
    }
  );
  const brandMap: Record<string, string> = {
    visa: 'Visa',
    mastercard: 'MasterCard',
    amex: 'American Express',
    discover: 'Discover',
    jcb: 'JCB',
    diners: 'Diners Club',
    unionpay: 'UnionPay',
  };

  const paymentMethod =
    paymentIntent.payment_method as Stripe.PaymentMethod | null;

  if (!paymentMethod) {
    return {
      last4: 'unknown',
      method: 'unknown',
      brand: 'unknown',
    };
  }

  if (paymentMethod.us_bank_account) {
    return {
      last4: paymentMethod.us_bank_account.last4 || 'unknown',
      method: 'US Bank Account',
      brand: 'Account',
    };
  } else if (paymentMethod.card) {
    const brand = paymentMethod.card.brand;
    const formattedBrand =
      brandMap[brand] ?? brand.charAt(0).toUpperCase() + brand.slice(1);
    return {
      last4: paymentMethod.card.last4,
      method: 'Credit Card',
      brand: formattedBrand,
    };
  }

  return {
    last4: 'unknown',
    method: 'unknown',
    brand: 'unknown',
  };
};

export async function getEmailInfoFromPaymentIntent(
  paymentIntent: Stripe.PaymentIntent,
  failedReason?: string
) {
  const customer = await stripe.customers.retrieve(
    paymentIntent.customer as string
  );
  if (customer.deleted) {
    throw new Error(`Customer ${paymentIntent.customer} was deleted`);
  }
  const { line1, line2, country, state, city, postal_code } =
    customer.address as Stripe.Address;
  const paymentInfo = await GetPaymentInfoOneTime(paymentIntent);
  const { firstName, lastName, orgName, phoneNum, phoneType } =
    customer.metadata;
  const emailFields: SendEmailProps = {
    idType: 'Donor ID',
    userId: paymentIntent.metadata.donor_id,
    totalCharged: paymentIntent.metadata.charged_amount,
    donationAmount: paymentIntent.metadata.donation_amount,
    frequency: 'One-time',
    orgName,
    firstName,
    lastName,
    email: customer.email || '',
    phoneType,
    phoneNum,
    address1: line1 ?? '',
    address2: line2 ?? '',
    city: city ?? '',
    state: state ?? '',
    postalCode: postal_code ?? '',
    country: country ?? '',
    paymentMethod: paymentInfo.method,
    paymentType: paymentInfo.brand,
    last4: paymentInfo.last4,
    failedReason,
  };
  return emailFields;
}

export async function getEmailInfoFromInvoice(
  invoice: Stripe.Invoice,
  failedReason?: string
) {
  const subscription = await stripe.subscriptions.retrieve(
    invoice.subscription as string
  );
  const nextBillingDate = new Date(subscription.current_period_end * 1000);

  const chicagoDateString = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(nextBillingDate);
  const customer = await stripe.customers.retrieve(
    subscription.customer as string
  );
  if (customer.deleted) {
    throw new Error(`Customer ${subscription.customer} was deleted`);
  }

  const paymentInfo = await GetPaymentInfoSubscription(invoice);
  const { line1, line2, country, state, city, postal_code } =
    customer.address as Stripe.Address;
  const { firstName, lastName, orgName, phoneNum, phoneType } =
    customer.metadata;
  const emailFields: SendEmailProps = {
    idType: 'Subscriber ID',
    userId: subscription.metadata.subscriber_id,
    totalCharged: subscription.metadata.charged_amount,
    donationAmount: subscription.metadata.donation_amount,
    frequency: 'Monthly',
    orgName,
    firstName,
    lastName,
    email: customer.email || 'N/A',
    phoneType,
    phoneNum,
    address1: line1 ?? '',
    address2: line2 ?? '',
    city: city ?? '',
    state: state ?? '',
    postalCode: postal_code ?? '',
    country: country ?? '',
    paymentMethod: paymentInfo.method,
    paymentType: paymentInfo.brand,
    last4: paymentInfo.last4,
    failedReason,
    nextBillingDate: chicagoDateString,
  };
  return emailFields;
}

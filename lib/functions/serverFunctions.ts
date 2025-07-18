import {
  DatabaseDonationData,
  ContactFormData,
  VolunteerFormData,
  PartnerFormData,
  DonateFormData,
} from '@/declarations';
import { convertToSubcurrency } from './currencyFunctions';

export const createPaymentIntent = async (formData: DonateFormData) => {
  try {
    const convertedChargedAmount = convertToSubcurrency(
      Number(formData.totalCharged)
    );
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        charged_amount: convertedChargedAmount,
        email: formData.email.toLowerCase(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        orgName: formData.orgName,
        phoneNumber: formData.phone.number,
        phoneType: formData.phone.type,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.message || 'Failed to create payment intent.';
      throw new Error(errorMsg);
    }
    return {
      paymentIntentId: data.paymentIntentId,
      status: data.status,
      clientSecret: data.clientSecret,
    };
  } catch (error) {
    return {
      error: `${
        error instanceof Error ? error.message : String(error)
      } Please contact us if this error persists.`,
    };
  }
};

export const createSubscription = async (
  charged_amount: string,
  donation_amount: string,
  email: string,
  firstName: string,
  lastName: string,
  orgName: string,
  phoneNumber: string,
  phoneType: string,
  address1: string,
  address2: string | undefined,
  country: string,
  state: string,
  city: string,
  postalCode: string,
  anonymous: boolean
) => {
  try {
    const convertedChargedAmount = convertToSubcurrency(Number(charged_amount));
    const convertedDoantionAmount = convertToSubcurrency(
      Number(donation_amount)
    );
    const response = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        charged_amount: convertedChargedAmount,
        donation_amount: convertedDoantionAmount,
        email,
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
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.message || 'Failed to create subscription.';
      throw new Error(errorMsg);
    }
    return {
      paymentIntentId: data.paymentIntent,
      clientSecret: data.clientSecret,
      customerId: data.customerId,
      subscriptionId: data.subscriptionId,
      status: data.status,
      invoiceId: data.invoiceId,
    };
  } catch (error) {
    return {
      error: `${
        error instanceof Error ? error.message : String(error)
      } Please contact us if this error persists.`,
    };
  }
};

export const storeDonationData = async ({
  firstName,
  lastName,
  orgName,
  phoneNum,
  phoneType,
  email,
  charged_amount,
  donation_amount,
  clientSecret,
  paymentIntentId,
  paymentStatus,
  subscriptionId,
  address1,
  address2,
  country,
  state,
  city,
  postalCode,
}: DatabaseDonationData) => {
  try {
    const response = await fetch('/api/store-data/donation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        orgName,
        phoneNum,
        phoneType,
        email,
        charged_amount,
        donation_amount,
        clientSecret,
        paymentIntentId,
        paymentStatus,
        subscriptionId,
        address1,
        address2,
        country,
        state,
        city,
        postalCode,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.message || 'Failed to store data.';
      throw new Error(errorMsg);
    }
    return { donorId: data.donorId };
  } catch (error) {
    return {
      error: `${
        error instanceof Error ? error.message : String(error)
      } Please contact us if this error persists.`,
    };
  }
};

export const storeContactData = async ({
  firstName,
  lastName,
  email,
  details,
}: ContactFormData) => {
  try {
    const response = await fetch('/api/store-data/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        details,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.message || 'Failed to store data.';
      throw new Error(errorMsg);
    }
    return { messageId: data.messageId };
  } catch (error) {
    return {
      error: `${
        error instanceof Error ? error.message : String(error)
      } Please contact us if this error persists.`,
    };
  }
};

export const storePartnerData = async ({
  orgName,
  school,
  address,
  firstName,
  lastName,
  phone,
  email,
  details,
}: PartnerFormData) => {
  try {
    const response = await fetch('/api/store-data/partner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orgName,
        school,
        address,
        firstName,
        lastName,
        phone,
        email,
        details,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.message || 'Failed to store data.';
      throw new Error(errorMsg);
    }
    return { partnerFormId: data.partnerFormId };
  } catch (error) {
    return {
      error: `${
        error instanceof Error ? error.message : String(error)
      } Please contact us if this error persists.`,
    };
  }
};

export const storeVolunteerData = async ({
  firstName,
  lastName,
  phone,
  email,
  DOB,
  address,
  AoI,
  volunteerHours,
}: VolunteerFormData) => {
  try {
    const response = await fetch('/api/store-data/volunteer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        phone,
        email,
        DOB,
        address,
        AoI,
        volunteerHours,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.message || 'Failed to store data.';
      throw new Error(errorMsg);
    }
    return { volunteerFormId: data.volunteerFormId };
  } catch (error) {
    return {
      error: `${
        error instanceof Error ? error.message : String(error)
      } Please contact us if this error persists.`,
    };
  }
};

export const fetchPayment = async (url: string) => {
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Error fetching payment status: ${err}`);
    return {
      error: `Error fetching payment status: ${err}`,
    };
  }
};

export const fetchSubscription = async (url: string) => {
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Error fetching subscription status: ${err}`);
    return {
      error: `Error fetching subscription status: ${err}`,
    };
  }
};

export const checkSubscriptionEmail = async (email: string) => {
  try {
    const response = await fetch('/api/subscription-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.message || 'Failed to connect to the database.';
      throw new Error(errorMsg);
    }
    return { subscriptionId: data.subscriptionId };
  } catch (error) {
    return {
      error: `${
        error instanceof Error ? error.message : String(error)
      } Please contact us if this error persists.`,
    };
  }
};

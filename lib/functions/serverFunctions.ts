import {
  DatabaseDonationData,
  ContactFormData,
  VolunteerFormData,
  PartnerFormData,
} from '@/declarations';
import { convertToSubcurrency } from './currencyFunctions';

export const createPaymentIntent = async (amount: string) => {
  try {
    const convertedAmount = convertToSubcurrency(Number(amount));
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: convertedAmount,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.message || 'Failed to create payment intent.';
      throw new Error(errorMsg);
    }
    return {
      paymentIntentId: data.paymentIntentId,
      paymentStaus: data.paymentStatus,
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

export const storeDonationData = async ({
  firstName,
  lastName,
  email,
  amount,
  clientSecret,
  paymentIntentId,
  paymentStatus,
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
        email,
        amount,
        clientSecret,
        paymentIntentId,
        paymentStatus,
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

export const fetchPaymentWithRetry = async (
  url: string,
  retries = 5,
  delay = 1000
) => {
  let lastAttempt = { donorId: null, status: 'unknown', amount: null };
  const terminalStatuses = ['succeeded', 'failed', 'canceled'];

  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        lastAttempt.status = String(res.status);
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      const status = data.status;
      lastAttempt = data;

      if (terminalStatuses.includes(status)) {
        return data; // immediately return if terminal status
      }
    } catch (err) {
      console.error(`Error fetching payment status: ${err}`);
      return {
        ...lastAttempt,
        error: `Error fetching payment status: ${err}`,
      };
    }

    // wait before next attempt
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  // return last known status
  return lastAttempt;
};

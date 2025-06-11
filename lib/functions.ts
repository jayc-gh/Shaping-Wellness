import {
  DonateFormData,
  ErrorMap,
  StripeCtx,
  FormTypes,
  FormDataMap,
  VolunteerFormData,
  PartnerFormData,
  ContactFormData,
  DatabaseData,
} from '@/declarations';
import React, { useEffect } from 'react';
import { ValidatorConfig } from '@/declarations';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { useRouter } from 'next/navigation';

type Router = ReturnType<typeof useRouter>;

export const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
      10
    )}`;
  }
};

export const validateEmailFormat = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const validateDate = (month: string, day: string, year: string) => {
  const m = Number(month);
  const d = Number(day);
  const y = Number(year);

  if (
    m < 1 ||
    m > 12 ||
    d < 1 ||
    d > 31 ||
    y < 1900 ||
    y > new Date().getFullYear()
  )
    return false;

  const inputDate = new Date(y, m - 1, d);

  if (
    inputDate.getFullYear() !== y ||
    inputDate.getMonth() !== m - 1 ||
    inputDate.getDate() !== d
  ) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return inputDate < today;
};

export const formatDate = (type: 'day' | 'year', value: string) => {
  const digitsOnly = value.replace(/\D/g, '');
  const limits: Record<typeof type, number> = {
    day: 2,
    year: 4,
  };

  return digitsOnly.slice(0, limits[type]);
};

export function validateForm<T>(formData: T, config: ValidatorConfig<T>) {
  const errors: ErrorMap = {};

  if (config.requiredFields) {
    for (const key of config.requiredFields) {
      const value = getNestedValue(formData, key.toString());
      if (typeof value === 'string' && value.trim() === '') {
        const fieldKey = key.toString().split('.').pop();
        errors[fieldKey as keyof ErrorMap] = true;
      } else if (typeof value === 'boolean' && value === false) {
      }
    }
  }

  if (config.customValidations) {
    for (const validateFn of config.customValidations) {
      Object.assign(errors, validateFn(formData));
    }
  }

  return errors;
}

function getNestedValue<T>(obj: T, path: string): unknown {
  return path.split('.').reduce((acc: unknown, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

export function handleSubmitBasic<T extends FormTypes>(
  e: React.FormEvent<HTMLFormElement>,
  formData: FormDataMap[T],
  formType: T,
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>
) {
  e.preventDefault();
  if (formType === 'volunteer') {
    const errors = validateForm(formData as VolunteerFormData, {
      requiredFields: [
        'firstName',
        'lastName',
        'address.address1',
        'address.city',
        'address.state',
        'address.country',
        'address.postalCode',
        'phone.number',
        'phone.type',
        'DOB.month',
        'DOB.day',
        'DOB.year',
        'AoI',
        'volunteerHours',
      ],
      customValidations: [
        data =>
          !validateDate(data.DOB.month, data.DOB.day, data.DOB.year)
            ? { DOB: true }
            : {},
        data => (!validateEmailFormat(data.email) ? { email: true } : {}),
        data =>
          data.AoI.programCoord.trim() === '' &&
          data.AoI.expertWorkshop.trim() === '' &&
          data.AoI.mentor.trim() === ''
            ? { AoI: true }
            : {},
      ],
    });

    // Update state with all the errors
    setShowErrors(prev => ({
      ...prev,
      ...errors,
    }));

    // If there are any errors, prevent submission
    if (Object.keys(errors).length > 0) {
      return;
    }
  } else if (formType === 'partner') {
    const errors = validateForm(formData as PartnerFormData, {
      requiredFields: [
        'orgName',
        'school',
        'firstName',
        'lastName',
        'address.address1',
        'address.city',
        'address.state',
        'address.country',
        'address.postalCode',
        'phone.number',
        'phone.type',
        'details',
      ],
      customValidations: [
        data => (!validateEmailFormat(data.email) ? { email: true } : {}),
      ],
    });

    // Update state with all the errors
    setShowErrors(prev => ({
      ...prev,
      ...errors,
    }));

    // If there are any errors, prevent submission
    if (Object.keys(errors).length > 0) {
      return;
    }
  } else if (formType === 'contact') {
    const errors = validateForm(formData as ContactFormData, {
      requiredFields: ['firstName', 'lastName', 'details'],
      customValidations: [
        data => (!validateEmailFormat(data.email) ? { email: true } : {}),
      ],
    });

    // Update state with all the errors
    setShowErrors(prev => ({
      ...prev,
      ...errors,
    }));

    // If there are any errors, prevent submission
    if (Object.keys(errors).length > 0) {
      return;
    }
  }
  // No errors - clear previous errors
  setShowErrors({});
}

export async function handleSubmit({
  e,
  step,
  formData,
  stripeCtx,
  setShowErrors,
  nextStep,
  setLoading,
  setErrorMessage,
  router,
}: {
  e: React.FormEvent<HTMLFormElement>;
  step: number;
  formData: DonateFormData;
  stripeCtx: StripeCtx;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
  nextStep: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  router: Router;
}) {
  e.preventDefault();
  const { stripe, elements } = stripeCtx;
  if (step === 1) {
    const donationAmount = parseFloat(formData.donationAmount || '0');
    if (
      isNaN(donationAmount) ||
      donationAmount < 1 ||
      donationAmount > 999999.99
    ) {
      return;
    }
  } else if (step === 2) {
    const requiredFields = [
      'firstName',
      'lastName',
      'address.address1',
      'address.city',
      'address.country',
      'address.postalCode',
    ];

    if (
      formData.address.country === 'US' ||
      formData.address.country === 'CA'
    ) {
      requiredFields.push('address.state');
    }

    const errors = validateForm(formData, {
      requiredFields,
      customValidations: [
        data => (!validateEmailFormat(data.email) ? { email: true } : {}),
        data =>
          data.orgDonate && data.orgName.trim() === '' ? { orgName: true } : {},
      ],
    });

    // Update state with all the errors
    setShowErrors(prev => ({
      ...prev,
      ...errors,
    }));

    // If there are any errors, prevent submission
    if (Object.keys(errors).length > 0) {
      return;
    }

    // No errors - clear previous errors
    setShowErrors({});
  } else if (step === 3) {
    setLoading(true);

    if (!stripe || !elements) {
      console.warn('Stripe not ready');
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setLoading(false);
      return;
    }

    const intent = await createPaymentIntent(formData.totalCharged);
    if (intent.error) {
      setErrorMessage(intent.error);
      setLoading(false);
      return;
    }

    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      amount: convertToSubcurrency(Number(formData.totalCharged)),
      clientSecret: intent.clientSecret,
      paymentIntentId: intent.paymentIntentId,
      paymentStatus: intent.paymentStaus,
    };

    const storedData = await storeData(data);

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret: intent.clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/donate/payment-confirm?donorId=${storedData.donorId}&monthly=${formData.monthly}`,
        receipt_email: formData.email,
        payment_method_data: {
          billing_details: {
            address: {
              country: formData.address.country,
              line1: formData.address.address1,
              line2: formData.address.address2,
              state: formData.address.state,
              city: formData.address.city,
              postal_code: formData.address.postalCode,
            },
          },
        },
      },
      redirect: 'if_required',
    });

    // handling errors after submission during confirmation (valid card)
    if (confirmError) {
      console.error('Stripe confirmPayment error:', {
        message: confirmError.message,
        type: confirmError.type,
        code: confirmError.code,
        payment_intent: confirmError.payment_intent,
      });

      setErrorMessage(
        `${confirmError.message}` ||
          'There was an issue processing your payment. Please try again.'
      );
      setLoading(false);
      return;
    } else if (paymentIntent) {
      router.push(
        `/donate/payment-confirm?donorId=${storedData.donorId}&monthly=${formData.monthly}&payment_intent=${paymentIntent.id}&payment_intent_client_secret=${paymentIntent.client_secret}`
      );
      setLoading(false);
      return;
    }
  }
  nextStep();
}

export function useOutsideClick(
  ref: React.RefObject<HTMLDivElement | null>,
  onClickOutside: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, onClickOutside]);
}

export function useStopScroll(state: boolean) {
  useEffect(() => {
    if (state) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // reset overflow if unmounted before popup updates
    return () => {
      document.body.style.overflow = '';
    };
  }, [state]);
}

export function calcTransactionFee(
  formData: DonateFormData,
  setFormData: React.Dispatch<React.SetStateAction<DonateFormData>>,
  setCheckboxDisabled: React.Dispatch<React.SetStateAction<boolean>>
) {
  const { donationAmount, paymentMethod, feeCovered } = formData;
  const cardFee = (amount: number) => (0.029 * amount + 0.3).toFixed(2);
  const bankFee = (amount: number) => Math.min(amount * 0.008, 5).toFixed(2);

  if (donationAmount === '') return;

  const baseAmount = Number(donationAmount);
  let feeAmount = 0;

  if (paymentMethod === 'card' || paymentMethod === 'cashapp') {
    feeAmount = Number(cardFee(baseAmount));
  } else if (paymentMethod === 'us_bank_account') {
    feeAmount = Number(bankFee(baseAmount));
  }

  const newFeeCovered = !feeCovered;
  const newAmount = newFeeCovered ? baseAmount + feeAmount : baseAmount;

  setFormData(prev => ({
    ...prev,
    feeCovered: newFeeCovered,
    feeAmount: feeAmount.toFixed(2),
    totalCharged: String(newAmount),
  }));
  setCheckboxDisabled(false);
}

const createPaymentIntent = async (amount: string) => {
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

const storeData = async ({
  firstName,
  lastName,
  email,
  amount,
  clientSecret,
  paymentIntentId,
  paymentStatus,
}: DatabaseData) => {
  try {
    const response = await fetch('/api/store-data', {
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

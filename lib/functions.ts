import { FormInfo, ErrorMap, StripeCtx } from '@/declarations';
import { supabaseClient } from '@/lib/supabaseClient';
import crypto from 'crypto';
import React, { useEffect } from 'react';

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

export function validateForm(formData: FormInfo) {
  const errors: ErrorMap = {};

  if (!validateEmailFormat(formData.email)) {
    errors.email = true;
  }

  if (formData.orgDonate && formData.orgName.trim() === '') {
    errors.orgName = true;
  }

  if (formData.address1.trim() === '') {
    errors.address1 = true;
  }

  if (formData.state.trim() === '') {
    errors.state = true;
  }

  if (formData.country.trim() === '') {
    errors.country = true;
  }

  if (formData.postalCode.trim() === '') {
    errors.postalCode = true;
  }

  if (formData.city.trim() === '') {
    errors.city = true;
  }

  if (formData.firstName.trim() === '') {
    errors.firstName = true;
  }

  if (formData.lastName.trim() === '') {
    errors.lastName = true;
  }

  return errors;
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
}: {
  e: React.FormEvent<HTMLFormElement>;
  step: number;
  formData: FormInfo;
  stripeCtx: StripeCtx;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
  nextStep: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  e.preventDefault();
  const { stripe, elements } = stripeCtx;
  if (step === 1) {
    const donationAmount = parseFloat(formData.amount || '0');
    if (
      isNaN(donationAmount) ||
      donationAmount < 1 ||
      donationAmount > 999999.99
    ) {
      return;
    }
  } else if (step === 2) {
    const errors = validateForm(formData);
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

    // handling errors during submission (missing fields)
    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.error('Stripe elements.submit() error: ', submitError);
      setErrorMessage(
        `${submitError.message}` ||
          'There was an issue submitting your payment details. Please try again.'
      );
      setLoading(false);
      return;
    }

    // temporary token
    const tempToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    // token expiration after 15 minutes
    expiresAt.setHours(expiresAt.getMinutes() + 15);

    // insert token into supabase
    const { data, error } = await supabaseClient
      .from('temp_tokens')
      .insert([{ token: tempToken, expires_at: expiresAt.toISOString() }])
      .single();

    if (error) {
      throw new Error('Failed to store temporary token in Supabase.');
    }
    console.log('Inserted token data:', data);

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/donate/payment-success?amount=${formData.amount}&token=${tempToken}`,
        receipt_email: formData.email,
        payment_method_data: {
          billing_details: {
            address: {
              country: formData.country,
              line1: formData.address1,
              line2: formData.address2,
              state: formData.state,
              city: formData.city,
              postal_code: formData.postalCode,
            },
          },
        },
      },
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

import {
  DonateFormData,
  ErrorMap,
  StripeCtx,
  FormTypes,
  FormDataMap,
  VolunteerFormData,
  PartnerFormData,
  ContactFormData,
} from '@/declarations';
import { supabaseClient } from '@/lib/supabaseClient';
import crypto from 'crypto';
import React, { useEffect } from 'react';
import { ValidatorConfig } from '@/declarations';

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
        'DOB.month',
        'DOB.day',
        'DOB.year',
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
}: {
  e: React.FormEvent<HTMLFormElement>;
  step: number;
  formData: DonateFormData;
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
    const errors = validateForm(formData, {
      requiredFields: [
        'firstName',
        'lastName',
        'address.address1',
        'address.city',
        'address.state',
        'address.country',
        'address.postalCode',
      ],
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

'use client';

import React, { useRef } from 'react';
import { PaymentElement, PaymentElementProps } from '@stripe/react-stripe-js';
import { FormInfo } from './donationForm';

interface StepProps {
  errorMessage: string | undefined;
  clientSecret: string;
  formData: FormInfo;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function PaymentInfo({
  errorMessage,
  clientSecret,
  formData,
  setStep,
}: StepProps) {
  const errorRef = useRef<HTMLDivElement | null>(null);

  const paymentElementOptions: PaymentElementProps['options'] = {
    fields: {
      billingDetails: {
        address: 'never',
      },
    },
  };

  return (
    <div className="form-content-container">
      <div className="flex h-[22px] justify-center items-center gap-[10px] self-stretch">
        <h4>You are donating:</h4>
        <p className="custom-text-2">${formData.amount}</p>
        <button
          className="custom-text-3 !cursor-pointer"
          onClick={() => setStep(1)}
          type="button"
        >
          change
        </button>
      </div>

      <div className="form-sub-container">
        <h4>PAYMENT DETAILS</h4>
        {clientSecret && (
          <div className="w-full">
            <PaymentElement options={paymentElementOptions} />
          </div>
        )}
        {errorMessage && (
          <div ref={errorRef} className="error-text">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

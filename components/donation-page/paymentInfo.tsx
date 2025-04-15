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
    <form className="relative text-black w-full h-full">
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

      <h4 className="w-full text-left mb-4">PAYMEMT DETAILS</h4>
      {clientSecret && (
        <PaymentElement options={paymentElementOptions} className="mb-2" />
      )}
      {errorMessage && (
        <div ref={errorRef} className="text-red-600 p-2 rounded-md bg-red-100">
          {errorMessage}
        </div>
      )}
    </form>
  );
}

import React from 'react';
import { PaymentElement, PaymentElementProps } from '@stripe/react-stripe-js';
import { FormInfo } from '@/declarations';

interface StepProps {
  clientSecret: string;
  formData: FormInfo;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function PaymentInfo({
  clientSecret,
  formData,
  setStep,
}: StepProps) {
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
        <p className="custom-text-2 sec-coral">${formData.amount}</p>
        <button
          className="custom-text-3 p-neutral !cursor-pointer"
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
      </div>
    </div>
  );
}

import React from 'react';
import { PaymentElement, PaymentElementProps } from '@stripe/react-stripe-js';

interface StepProps {
  clientSecret: string;
}

export default function PaymentInfo({ clientSecret }: StepProps) {
  const paymentElementOptions: PaymentElementProps['options'] = {
    fields: {
      billingDetails: {
        address: 'never',
      },
    },
  };

  return (
    <div className="donate-form-content-container !w-full">
      <div className="form-sub-container !w-full">
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

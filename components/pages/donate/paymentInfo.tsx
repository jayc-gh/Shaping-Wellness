import React, { useEffect } from 'react';
import {
  PaymentElement,
  PaymentElementProps,
  useElements,
} from '@stripe/react-stripe-js';
import { DonateFormData } from '@/declarations';

interface StepProps {
  clientSecret: string;
  setFormData: React.Dispatch<React.SetStateAction<DonateFormData>>;
}

type PaymentElementChangeEvent = {
  empty: boolean;
  complete: boolean;
  value: {
    type: string;
  };
};

export default function PaymentInfo({ clientSecret, setFormData }: StepProps) {
  const elements = useElements();

  const paymentElementOptions: PaymentElementProps['options'] = {
    fields: {
      billingDetails: {
        address: 'never',
      },
    },
  };

  useEffect(() => {
    if (!elements) return;

    const paymentElement = elements.getElement('payment');
    if (!paymentElement) return;

    const handleChange = (event: PaymentElementChangeEvent) => {
      const selectedType = event.value?.type;
      if (selectedType) {
        setFormData(prev => ({
          ...prev,
          paymentMethod: selectedType,
        }));
      }
    };

    paymentElement.on('change', handleChange);
    return () => {
      paymentElement.off('change', handleChange);
    };
  }, [elements, setFormData]);

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

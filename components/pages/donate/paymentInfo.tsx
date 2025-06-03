import React, { useEffect } from 'react';
import {
  PaymentElement,
  PaymentElementProps,
  useElements,
} from '@stripe/react-stripe-js';
import { DonateFormData } from '@/declarations';
import convertToSubcurrency from '@/lib/convertToSubcurrency';

interface StepProps {
  formData: DonateFormData;
  setFormData: React.Dispatch<React.SetStateAction<DonateFormData>>;
}

type PaymentElementChangeEvent = {
  empty: boolean;
  complete: boolean;
  value: {
    type: string;
  };
};

export default function PaymentInfo({ formData, setFormData }: StepProps) {
  const elements = useElements();

  const paymentElementOptions: PaymentElementProps['options'] = {
    fields: {
      billingDetails: {
        address: 'never',
      },
    },
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
    },
  };

  useEffect(() => {
    if (!elements) return;
    elements.update({
      amount: convertToSubcurrency(Number(formData.totalCharged)),
    });

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
  }, [elements, setFormData, formData.totalCharged]);

  return (
    <div className="donate-form-content-container !w-full">
      <div className="form-sub-container !w-full">
        <h4>PAYMENT DETAILS</h4>
        <div className="w-full">
          <PaymentElement options={paymentElementOptions} />
        </div>
      </div>
    </div>
  );
}

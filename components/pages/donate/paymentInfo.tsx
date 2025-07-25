import React, { useEffect } from 'react';
import {
  PaymentElement,
  PaymentElementProps,
  useElements,
} from '@stripe/react-stripe-js';
import { DonateFormData } from '@/declarations';
import { convertToSubcurrency } from '@/lib/functions/currencyFunctions';

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
    if (
      !elements ||
      Number(formData.totalCharged) < 1 ||
      !formData.totalCharged
    )
      return;
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
          paymentReady: event.complete,
        }));
      }
    };

    paymentElement.on('change', handleChange);
    return () => {
      paymentElement.off('change', handleChange);
    };
  }, [elements, setFormData, formData.totalCharged]);

  return (
    <div className="flex flex-col items-start gap-[0.75rem] w-full">
      <div className="flex flex-col justify-center items-start gap-[0.5rem] w-full">
        <h4 className="text-base font-bold">PAYMENT DETAILS</h4>
        <div className="w-full">
          <PaymentElement options={paymentElementOptions} />
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import { convertToSubcurrency } from '@/lib/functions/currencyFunctions';
import { DonateFormData } from '@/declarations';

interface StepProps {
  step: number;
  formData: DonateFormData;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function PaymentIntentHandler({
  step,
  formData,
  setErrorMessage,
}: StepProps) {
  const lastAmountRef = useRef<number | null>(null);

  useEffect(() => {
    const amount = Number(formData.donationAmount);
    if (step !== 3 || !amount || lastAmountRef.current === amount) return;

    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'server-token': process.env.SERVER_KEY!,
          },
          body: JSON.stringify({
            amount: convertToSubcurrency(Number(formData.donationAmount)),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          const errorMsg = data?.message || 'Failed to create payment intent.';
          throw new Error(errorMsg);
        }
        lastAmountRef.current = amount;
      } catch (error) {
        // user facing error message
        setErrorMessage(
          `${
            error instanceof Error ? error.message : String(error)
          } Please contact us if this error persists.`
        );
      }
    };

    createPaymentIntent();
  }, [step, formData.donationAmount, setErrorMessage]);

  return null;
}

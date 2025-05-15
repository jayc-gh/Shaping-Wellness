import { useEffect, useRef } from 'react';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { DonateFormData } from '@/declarations';

interface StepProps {
  step: number;
  formData: DonateFormData;
  setClientSecret: React.Dispatch<React.SetStateAction<string>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function PaymentIntentHandler({
  step,
  formData,
  setClientSecret,
  setErrorMessage,
}: StepProps) {
  const lastAmountRef = useRef<number | null>(null);

  useEffect(() => {
    const amount = Number(formData.amount);
    if (step !== 3 || !amount || lastAmountRef.current === amount) return;

    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: convertToSubcurrency(Number(formData.amount)),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          const errorMsg = data?.message || 'Failed to create payment intent.';
          throw new Error(errorMsg);
        }

        setClientSecret(data.clientSecret);
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
  }, [step, formData.amount, setClientSecret, setErrorMessage]);

  return null;
}

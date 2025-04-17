import { useEffect, useRef } from 'react';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { FormInfo } from '@/declarations';

interface StepProps {
  step: number;
  formData: FormInfo;
  setClientSecret: React.Dispatch<React.SetStateAction<string>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
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
    console.log(lastAmountRef.current);
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

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
        lastAmountRef.current = amount;
      } catch (error) {
        console.log('Error creating payment intent:', error);
        setErrorMessage('There was an error creating the payment intent.');
      }
    };

    createPaymentIntent();
  }, [step, formData.amount, setClientSecret, setErrorMessage]);

  return null;
}

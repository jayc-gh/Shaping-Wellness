import { useEffect } from 'react';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { FormInfo } from '@/declarations';

interface StepProps {
  formData: FormInfo;
  setClientSecret: React.Dispatch<React.SetStateAction<string>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function PaymentIntentHandler({
  formData,
  setClientSecret,
  setErrorMessage,
}: StepProps) {
  useEffect(() => {
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
      } catch (error) {
        console.log('Error creating payment intent:', error);
        setErrorMessage('There was an error creating the payment intent.');
      }
    };

    createPaymentIntent();
  }, [formData.amount, setClientSecret, setErrorMessage]);

  return null;
}

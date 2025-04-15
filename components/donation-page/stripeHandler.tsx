import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect } from 'react';
import { StripeCtx } from './donationForm';

interface StepProps {
  setStripeCtx: React.Dispatch<React.SetStateAction<StripeCtx>>;
}

export default function StripeHandler({ setStripeCtx }: StepProps) {
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    setStripeCtx({ stripe, elements });
  }, [stripe, elements, setStripeCtx]);

  return null;
}

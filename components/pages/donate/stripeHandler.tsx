import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect } from 'react';
import { StripeCtx } from '@/declarations';
import { Appearance } from '@stripe/stripe-js';

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

export const appearance: Appearance = {
  theme: 'stripe',
  variables: {
    borderRadius: '0.375rem',
    fontFamily: 'Figtree',
    colorText: '#2f2f2f',
    fontLineHeight: '1.25rem',
    colorPrimary: '#4573D4',
    colorDanger: '#da1e28',
    fontSizeSm: '0.875rem',
  },
  rules: {
    '.Input': {
      border: '1px solid rgba(47, 47, 47, 0.3)',
      padding: '0.6875rem 0.75rem',
      height: '2.75rem',
      lineHeight: '1.25rem',
    },
    '.Input:focus': {
      border: '1px solid #66afe9',
      boxShadow: '0px 0px 6px 0px rgba(56, 167, 255, 0.80)',
    },
  },
};

export const fonts = [
  {
    cssSrc:
      'https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap',
  },
];

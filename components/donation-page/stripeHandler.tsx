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
    borderRadius: '6px',
    fontFamily: 'Figtree',
    colorText: '#2f2f2f',
    fontLineHeight: '20px',
    colorPrimary: '#4573d4',
    colorDanger: '#da1e28',
    fontSizeSm: '14px',
  },
  rules: {
    '.Input': {
      border: '1px solid rgba(47, 47, 47, 0.3)',
      padding: '11px 12px',
      height: '44px',
      lineHeight: '20px',
    },
  },
};

export const fonts = [
  {
    cssSrc:
      'https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap',
  },
];

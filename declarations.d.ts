import { useElements } from '@stripe/react-stripe-js';
import { Stripe } from '@stripe/stripe-js';

declare module '*.svg' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

export interface FormInfo {
  amount: string;
  monthly: boolean;
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  phone: string;
  anonymous: boolean;
  orgDonate: boolean;
  orgName: string;
}

export type ErrorMap = {
  [key: string]: boolean;
};

export type StripeCtx = {
  stripe: Stripe | null;
  elements: ReturnType<typeof useElements> | null;
};

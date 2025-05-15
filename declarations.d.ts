import { useElements } from '@stripe/react-stripe-js';
import { Stripe } from '@stripe/stripe-js';

declare module '*.svg' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

export interface DonateFormData {
  amount: string;
  monthly: boolean;
  firstName: string;
  lastName: string;
  email: string;
  address: {
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    postalCode: string;
  };
  phone: string;
  anonymous: boolean;
  orgDonate: boolean;
  orgName: string;
}

export interface VolunteerFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: {
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    postalCode: string;
  };
  phone: {
    number: string;
    type: string;
  };
  DOB: {
    month: string;
    date: string;
    year: string;
  };
  AoI: {
    programCoord: boolean;
    expertWorkshop: boolean;
    mentor: boolean;
  };
  volunteerHours: boolean;
}

export type ErrorMap = {
  [key: string]: boolean;
};

export type StripeCtx = {
  stripe: Stripe | null;
  elements: ReturnType<typeof useElements> | null;
};

export type ValidatorConfig<T> = {
  requiredFields?: (keyof T | string)[];
  customValidations?: ((data: T) => Partial<ErrorMap>)[];
};

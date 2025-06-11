import { useElements } from '@stripe/react-stripe-js';
import { Stripe } from '@stripe/stripe-js';

declare module '*.svg' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

export type Address = {
  address1: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
};

export type Phone = {
  number: string;
  type: string;
};

export type DOB = {
  month: string;
  day: string;
  year: string;
};

export type FormTypes = 'volunteer' | 'partner' | 'contact' | 'donate';

export interface FormDataMap {
  volunteer: VolunteerFormData;
  partner: PartnerFormData;
  contact: ContactFormData;
  donate: DonateFormData;
}

export interface DonateFormData {
  donationAmount: string;
  feeCovered: boolean;
  feeAmount: string;
  paymentMethod: string;
  totalCharged: string;
  monthly: boolean;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  phone: Phone;
  anonymous: boolean;
  orgDonate: boolean;
  orgName: string;
}

export interface VolunteerFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  phone: Phone;
  DOB: DOB;
  AoI: {
    programCoord: 'yes' | '';
    expertWorkshop: 'yes' | '';
    mentor: 'yes' | '';
  };
  volunteerHours: 'yes' | 'no' | '';
}

export interface PartnerFormData {
  orgName: string;
  school: 'yes' | 'no' | '';
  address: Address;
  firstName: string;
  lastName: string;
  phone: Phone;
  email: string;
  details: string;
}
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  details: string;
}

export interface ErrorMap {
  [key: string]: boolean;
}

export interface StripeCtx {
  stripe: Stripe | null;
  elements: ReturnType<typeof useElements> | null;
}

export interface ValidatorConfig<T> {
  requiredFields?: (keyof T | string)[];
  customValidations?: ((data: T) => Partial<ErrorMap>)[];
}

export type DatabaseData = {
  firstName: string;
  lastName: string;
  email: string;
  amount: number;
  clientSecret: string | null;
  paymentIntentId: string;
  paymentStatus: string;
};

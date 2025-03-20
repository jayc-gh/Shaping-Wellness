'use client';

import { useState } from 'react';
import DonationAmt from '@/components/donationAmt';
import DonorInfo from '@/components/donorInfo';
import PaymentInfo from '@/components/paymentInfo';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import convertToSubcurrency from '@/lib/convertToSubcurrency';

export interface FormInfo {
  amount: string;
  monthly: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  anonymous: boolean;
  orgDonate: boolean;
  orgName: string;
  comment: string;
}

const stripePublicKey: string = process.env
  .NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string;
if (!stripePublicKey) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(stripePublicKey);

const DonateForm = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormInfo>({
    amount: '75',
    monthly: false,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    anonymous: false,
    orgDonate: false,
    orgName: '',
    comment: '',
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="fixed flex items-center right-1/30 top-0 h-full w-5/12">
      <div className="fixed h-3/4 w-5/12 bg-white shadow-lg p-6 flex items-center justify-center max-h-3/4 overflow-y-auto">
        <div className="w-7/10 flex items-center justify-center">
          {step === 1 && (
            <DonationAmt
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
            />
          )}
          {step === 2 && (
            <DonorInfo
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 3 && (
            <Elements
              stripe={stripePromise}
              options={{
                mode: 'payment',
                amount: convertToSubcurrency(
                  Number(formData.amount) < 1 || formData.amount === ''
                    ? 1
                    : Number(formData.amount)
                ),
                currency: 'usd',
              }}
            >
              <PaymentInfo
                formData={formData}
                prevStep={prevStep}
                setFormData={setFormData}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonateForm;

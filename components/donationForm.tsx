'use client';

import React, { useState } from 'react';
import DonationAmt from '@/components/donationAmt';
import DonorInfo from '@/components/donorInfo';
import PaymentInfo from '@/components/paymentInfo';
import ProgressBar from './progressBar';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { validateEmailFormat } from '@/lib/functions';

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

const stripePublicKey: string = process.env
  .NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string;
if (!stripePublicKey) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(stripePublicKey);

export default function DonateForm() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormInfo>({
    amount: '75',
    monthly: false,
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    country: 'US',
    state: '',
    city: '',
    postalCode: '',
    phone: '',
    anonymous: false,
    orgDonate: false,
    orgName: '',
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === 1) {
      const donationAmount = parseFloat(formData.amount || '0');
      if (
        isNaN(donationAmount) ||
        donationAmount < 1 ||
        donationAmount > 999999.99
      ) {
        return;
      }
    } else if (step === 2) {
      if (!validateEmailFormat(formData.email)) {
        return;
      }
    }
    nextStep();
  };

  return (
    <main className="main-container !bg-cover !bg-center !bg-[url('/images/DonationForm.webp')]">
      <div className="content-container">
        <div className="summary-container">
          <div className="flag">
            <h4>DONATE</h4>
          </div>
          <h3 className="text-white">Every dollar makes a difference</h3>
          <p className="p3 !text-white">
            Millions of young girls lack access to resources that support their
            health and well-being. Your support helps provide fitness programs,
            educational workshops, and safe spaces where they can thrive.
          </p>
        </div>

        {/* turn form-box into form */}
        <form className="form-box" onSubmit={handleSubmit}>
          <div className="form-container">
            {/* Back button and Progress bar */}
            <ProgressBar step={step} prevStep={prevStep} />

            {step === 1 && (
              <DonationAmt formData={formData} setFormData={setFormData} />
            )}

            {step === 2 && (
              <DonorInfo
                formData={formData}
                setFormData={setFormData}
                setStep={setStep}
              />
            )}

            {/* step 3 has its own form/submission logic for payment */}
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
                <PaymentInfo formData={formData} />
              </Elements>
            )}
          </div>

          {step < 3 && (
            <div className="continue-container">
              <button className="continue-btn" type="submit">
                <p className="btn">Continue</p>
              </button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}

'use client';

import React, { useState } from 'react';
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
        <div className="form-box">
          <div className="form-container">
            {/* Back button and Progress bar */}
            <div className="back-and-progress-bar-container">
              <div
                className={`w-[24px] h-[24px] ${step > 1 && 'cursor-pointer'}`}
                onClick={step > 1 ? prevStep : undefined}
              >
                {step > 1 && (
                  <svg
                    width="12"
                    height="20"
                    viewBox="0 0 12 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.7227 19.2317C10.3322 19.6223 9.69904 19.6223 9.30852 19.2317L0.722731 10.6459C0.332207 10.2554 0.332208 9.62226 0.722732 9.23174L9.30852 0.645949C9.69904 0.255425 10.3322 0.255425 10.7227 0.645949L11.0835 1.00674C11.474 1.39726 11.474 2.03043 11.0835 2.42095L4.27273 9.23174C3.88221 9.62226 3.88221 10.2554 4.27273 10.6459L11.0835 17.4567C11.474 17.8473 11.474 18.4804 11.0835 18.871L10.7227 19.2317Z"
                      className="check"
                    />
                  </svg>
                )}
              </div>
              {/* Dots + lines */}
              <div className="progress-bar-container">
                {[1, 2, 3].map(dot => (
                  <React.Fragment key={dot}>
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      key={dot}
                    >
                      <circle
                        cx="8.5"
                        cy="8"
                        r="7.5"
                        className={`dot ${step >= dot ? 'filled' : ''}`}
                      />
                    </svg>
                    <div key={dot} className="line"></div>
                  </React.Fragment>
                ))}
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="8.5"
                    cy="8"
                    r="7.5"
                    className={`dot ${step >= 4 ? 'filled' : ''}`}
                  />
                  <path
                    d="M7.62526 10.946C7.3192 11.252 6.82298 11.252 6.51693 10.946L4.16172 8.59074C3.93218 8.3612 3.93218 7.98904 4.16172 7.75949C4.39126 7.52995 4.76343 7.52995 4.99297 7.75949L7.07109 9.83762L12.0076 4.90116C12.2371 4.67162 12.6093 4.67162 12.8388 4.90116C13.0683 5.1307 13.0683 5.50287 12.8388 5.73241L7.62526 10.946Z"
                    className={`check ${step >= 4 ? 'filled' : ''}`}
                  />
                </svg>
              </div>
              <div className="w-[24px] h-[24px]"></div>
            </div>
            {step === 1 && (
              <DonationAmt
                formData={formData}
                setFormData={setFormData}
                nextStep={nextStep}
              />
            )}
            <div className="continue-container">
              <button className="continue-btn">
                <p className="btn">Continue</p>
              </button>
            </div>

            {step === 2 && (
              <div className="flex flex-col items-center w-full h-full">
                <div className="flex">
                  <p className="pr-2">You are donating: ${formData.amount}</p>
                  <button
                    className="underline italic text-xs cursor-pointer"
                    onClick={() => setStep(1)}
                    type="button"
                  >
                    change
                  </button>
                </div>
                <DonorInfo
                  formData={formData}
                  setFormData={setFormData}
                  nextStep={nextStep}
                />
              </div>
            )}

            {/* step 3 has its own form/submission logic for payment */}
            {step === 3 && (
              <div className="flex flex-col items-center w-full h-full">
                <div className="flex mb-4">
                  <p className="pr-2">You are donating: ${formData.amount}</p>
                  <button
                    className="underline italic text-xs cursor-pointer"
                    onClick={() => setStep(1)}
                  >
                    change
                  </button>
                </div>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

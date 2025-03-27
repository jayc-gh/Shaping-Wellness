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
  address: string;
  country: string;
  zipcode: string;
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

const DonateForm = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormInfo>({
    amount: '75',
    monthly: false,
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    country: '',
    zipcode: '',
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
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!regex.test(formData.email)) {
        return;
      }
    }
    nextStep();
  };

  return (
    <main className="fixed h-full w-full flex items-center">
      <div className="fixed flex items-center justify-center h-5/6 w-1/2 right-0">
        <div className="fixed h-3/4 w-1/3 shadow-lg flex items-center bg-white text-black flex-col rounded-xl">
          {/* Back button and Progress bar */}
          <div className="absolute top-15 w-2/3 h-10 flex items-center justify-between">
            <div className="w-1/4">
              {step > 1 && (
                <button onClick={prevStep} className="cursor-pointer">
                  &lt;
                </button>
              )}
            </div>
            <div className="relative flex-1 flex items-center justify-center">
              {/* Line */}
              <div className="absolute inset-0 top-1/2 transform -translate-y-1/2 bg-gray-400 h-px w-full"></div>

              {/* Dots */}
              {[1, 2, 3, 4].map((dot, index) => (
                <div
                  key={dot}
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    step >= dot
                      ? 'bg-gray-400 border-gray-400'
                      : 'border-gray-400 bg-white'
                  } absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2`}
                  style={{ left: `${(index / 3) * 100}%` }}
                >
                  {dot === 4 && (
                    <span className="text-gray-400 font-thin text-xs">✔</span>
                  )}
                </div>
              ))}
            </div>
            <div className="w-1/4"></div>
          </div>

          <div className="w-2/3 absolute top-30 h-3/4">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="flex flex-col items-center justify-center w-full">
                  <h4 className="w-full text-left mb-4">SELECT AN AMOUNT</h4>
                  <DonationAmt formData={formData} setFormData={setFormData} />
                </div>
              )}
              {step === 2 && (
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="flex mb-4">
                    <p className="pr-2">You are donating: ${formData.amount}</p>
                    <button
                      className="underline italic text-xs cursor-pointer"
                      onClick={() => setStep(1)}
                      type="button"
                    >
                      change
                    </button>
                  </div>
                  <h4 className="w-full text-left mb-4">YOUR INFORMATION</h4>
                  <DonorInfo formData={formData} setFormData={setFormData} />
                </div>
              )}
              {step < 3 && (
                <div className="absolute flex justify-center w-full bottom-10">
                  <button
                    type="submit"
                    className="w-55 h-10 border rounded-full cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              )}
            </form>

            {/* step 3 has its own form/submission logic for payment */}
            {step === 3 && (
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex mb-4">
                  <p className="pr-2">You are donating: ${formData.amount}</p>
                  <button
                    className="underline italic text-xs cursor-pointer"
                    onClick={() => setStep(1)}
                  >
                    change
                  </button>
                </div>
                <h4 className="w-full text-left mb-4">PAYMEMT DETAILS</h4>
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
                  <PaymentInfo formData={formData} setFormData={setFormData} />
                </Elements>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DonateForm;

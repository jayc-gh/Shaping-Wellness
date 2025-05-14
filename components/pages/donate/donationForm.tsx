'use client';

import React, { useState } from 'react';
import DonationAmt from '@/components/pages/donate/donationAmt';
import DonorInfo from '@/components/pages/donate/donorInfo';
import PaymentInfo from '@/components/pages/donate/paymentInfo';
import ProgressBar from './progressBar';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeHandler, { appearance, fonts } from './stripeHandler';
import PaymentIntentHandler from './paymentIntentHandler';
import Spinner from '../../spinner';
import Unchecked from '../../../app/icons/checked=no.svg';
import Checked from '../../../app/icons/checked=yes.svg';
import { handleSubmit } from '@/lib/functions';
import { FormInfo, ErrorMap, StripeCtx } from '@/declarations';
import Summary from './summary';
import LoadingDots from '../../loadingDots';

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
  const [loading, setLoading] = useState<boolean>(false);
  const [coverFee, setCoverFee] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showErrors, setShowErrors] = useState<ErrorMap>({
    email: false,
    orgName: false,
    address1: false,
    state: false,
    country: false,
    postalCode: false,
    city: false,
    firstName: false,
    lastName: false,
  });
  const [stripeCtx, setStripeCtx] = useState<StripeCtx>({
    stripe: null,
    elements: null,
  });
  const { stripe, elements } = stripeCtx;

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => {
    setStep(prev => prev - 1);
    setErrorMessage('');
  };
  const multiplier: number = 1.03;

  const handleSubmitParams = {
    step,
    formData,
    stripeCtx,
    setShowErrors,
    nextStep,
    setLoading,
    setErrorMessage,
  };

  return (
    <main className="background">
      <div className="main-container">
        <div className="content-container">
          <Summary />
          <form
            className="form-box"
            onSubmit={e => handleSubmit({ e, ...handleSubmitParams })}
          >
            <PaymentIntentHandler
              step={step}
              formData={formData}
              setClientSecret={setClientSecret}
              setErrorMessage={setErrorMessage}
            />
            <div className="form-container">
              {/* Back button and Progress bar */}
              <ProgressBar step={step} prevStep={prevStep} />

              {step === 1 && (
                <>
                  <DonationAmt
                    formData={formData}
                    setFormData={setFormData}
                    setCoverFee={setCoverFee}
                    coverFee={coverFee}
                  />
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      id="cover-fee-checkbox"
                      className="checkbox"
                      checked={coverFee}
                      onChange={() => {
                        const newCoverFee = !coverFee;
                        setCoverFee(newCoverFee);

                        setFormData(prev => {
                          if (prev.amount === '') return prev;

                          const newAmount = !newCoverFee
                            ? Math.round(
                                (Number(prev.amount) / multiplier) * 100
                              ) / 100
                            : Math.round(
                                Number(prev.amount) * multiplier * 100
                              ) / 100;

                          return {
                            ...prev,
                            amount: String(Math.min(newAmount, 999999.99)),
                          };
                        });
                      }}
                    />

                    {!coverFee && <Unchecked />}
                    {coverFee && <Checked />}

                    <span className="custom-text-4 s-neutral">
                      I’d like to cover the 3% transaction fee for this donation
                    </span>
                  </label>
                </>
              )}
              {step === 2 && (
                <DonorInfo
                  formData={formData}
                  setFormData={setFormData}
                  setStep={setStep}
                  showErrors={showErrors}
                  setShowErrors={setShowErrors}
                />
              )}
              {step === 3 && (
                <>
                  {(!clientSecret || !stripe || !elements) && !errorMessage && (
                    <Spinner />
                  )}
                  {errorMessage && (
                    <div className="error-text text-center w-full">
                      {errorMessage}
                    </div>
                  )}
                  {clientSecret && !errorMessage && (
                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret: clientSecret,
                        appearance: appearance,
                        fonts: fonts,
                      }}
                    >
                      <StripeHandler setStripeCtx={setStripeCtx} />

                      <PaymentInfo
                        clientSecret={clientSecret}
                        formData={formData}
                        setStep={setStep}
                      />
                    </Elements>
                  )}
                </>
              )}
            </div>
            {step < 3 && (
              <div className="continue-container">
                <button className="continue-btn" type="submit">
                  <span className="btn">Continue</span>
                </button>
              </div>
            )}
            {step === 3 && !errorMessage && clientSecret && (
              <div className="terms-container">
                <div className="continue-container">
                  <button
                    disabled={
                      !stripe ||
                      loading ||
                      Number(formData.amount) < 1 ||
                      errorMessage !== ''
                    }
                    className="continue-btn"
                    type="submit"
                  >
                    <span className="btn flex items-center justify-center w-full gap-1">
                      {loading ? (
                        <>
                          Processing
                          <span className="translate-y-[8px]">
                            <LoadingDots />
                          </span>
                        </>
                      ) : (
                        `Donate $${formData.amount}`
                      )}
                    </span>
                  </button>
                </div>
                <p className="terms-text">
                  By clicking Donate, I agree to receive communications from
                  Shaping Wellness Foundation and their Privacy Policy.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}

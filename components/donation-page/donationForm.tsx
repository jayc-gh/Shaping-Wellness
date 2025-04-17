'use client';

import React, { useState } from 'react';
import DonationAmt from '@/components/donation-page/donationAmt';
import DonorInfo from '@/components/donation-page/donorInfo';
import PaymentInfo from '@/components/donation-page/paymentInfo';
import ProgressBar from './progressBar';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeHandler, { appearance, fonts } from './stripeHandler';
import PaymentIntentHandler from './paymentIntentHandler';
import Spinner from '../spinner';
import Unchecked from '../../app/icons/checked=no.svg';
import Checked from '../../app/icons/checked=yes.svg';
import { handleSubmit } from '@/lib/functions';
import { FormInfo, ErrorMap, StripeCtx } from '@/declarations';

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
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
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
    setErrorMessage(undefined);
  };

  const handleSubmitParams = {
    step,
    formData,
    stripeCtx,
    clientSecret,
    setShowErrors,
    nextStep,
    setLoading,
    setErrorMessage,
  };

  return (
    <main className="main-container">
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
              <DonationAmt formData={formData} setFormData={setFormData} />
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
                {(!clientSecret || !stripe || !elements) && <Spinner />}
                {clientSecret && (
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
                      errorMessage={errorMessage}
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
          {step === 3 && (
            <div className="terms-container">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  id="cover-fee-checkbox"
                  className="checkbox"
                  checked={coverFee}
                  onChange={() => setCoverFee(!coverFee)}
                />

                {!coverFee && <Unchecked />}
                {coverFee && <Checked />}

                <span className="custom-text-4 !text-[#6B6461]">
                  I&apos;d like to cover the 3% transaction fee for this
                  donation
                </span>
              </label>
              <div className="continue-container">
                <button
                  disabled={!stripe || loading || Number(formData.amount) < 1}
                  className="continue-btn"
                  type="submit"
                >
                  <span className="btn">
                    {!loading ? `Donate $${formData.amount}` : 'Processing....'}
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
    </main>
  );
}

'use client';

import React, { useState } from 'react';
import DonationAmt from '@/components/donation-page/donationAmt';
import DonorInfo from '@/components/donation-page/donorInfo';
import PaymentInfo from '@/components/donation-page/paymentInfo';
import ProgressBar from './progressBar';
import { Elements, useElements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe, Appearance } from '@stripe/stripe-js';
import { validateEmailFormat } from '@/lib/functions';
import StripeHandler from './stripeHandler';
import PaymentIntentHandler from './paymentIntentHandler';
import Spinner from '../spinner';
import Unchecked from '../../app/icons/check_box.svg';
import Checked from '../../app/icons/checked=yes.svg';

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

export type StripeCtx = {
  stripe: Stripe | null;
  elements: ReturnType<typeof useElements> | null;
};

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
  const [stripeCtx, setStripeCtx] = useState<StripeCtx>({
    stripe: null,
    elements: null,
  });
  const { stripe, elements } = stripeCtx;
  const appearance: Appearance = {
    theme: 'stripe',
    variables: {
      // borderRadius: '6px',
      fontFamily: 'Figtree',
    },
    rules: {
      '.Input--selected': {},
    },
  };
  const fonts = [
    {
      cssSrc:
        'https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap',
    },
  ];

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => {
    setStep(prev => prev - 1);
    setErrorMessage(undefined);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    } else if (step === 3) {
      setLoading(true);

      if (!stripe || !elements) {
        console.warn('Stripe not ready');
        return;
      }

      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        setLoading(false);
        return;
      }

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `http://localhost:3000/payment-success?amount=${formData.amount}`,
          receipt_email: formData.email,
          payment_method_data: {
            billing_details: {
              address: {
                country: formData.country,
                line1: formData.address1,
                line2: formData.address2,
                state: formData.state,
                city: formData.city,
                postal_code: formData.postalCode,
              },
            },
          },
        },
      });

      if (error) {
        setErrorMessage(error.message || 'Payment failed');
      }

      setLoading(false);
    }
    nextStep();
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
        <form className="form-box" onSubmit={handleSubmit}>
          <div className="form-container">
            {/* Back button and Progress bar */}
            <ProgressBar step={step} prevStep={prevStep} />

            {step === 1 ? (
              <DonationAmt formData={formData} setFormData={setFormData} />
            ) : step === 2 ? (
              <>
                <DonorInfo
                  formData={formData}
                  setFormData={setFormData}
                  setStep={setStep}
                />
                <PaymentIntentHandler
                  formData={formData}
                  setClientSecret={setClientSecret}
                  setErrorMessage={setErrorMessage}
                />
              </>
            ) : (
              step === 3 && (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret: clientSecret,
                    appearance: appearance,
                    fonts: fonts,
                  }}
                >
                  <StripeHandler setStripeCtx={setStripeCtx} />
                  {!clientSecret || !stripe || !elements ? (
                    <Spinner />
                  ) : (
                    <PaymentInfo
                      errorMessage={errorMessage}
                      clientSecret={clientSecret}
                      formData={formData}
                      setStep={setStep}
                    />
                  )}
                </Elements>
              )
            )}
          </div>

          {step < 3 ? (
            <div className="continue-container">
              <button className="continue-btn" type="submit">
                <p className="btn">Continue</p>
              </button>
            </div>
          ) : (
            step === 3 &&
            clientSecret && (
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

                  <label
                    htmlFor="cover-fee-checkbox"
                    className="custom-text-4 !text-[#6B6461]"
                  >
                    I&apos;d like to cover the 3% transaction fee for this
                    donation
                  </label>
                </label>
                <div className="continue-container">
                  <button
                    disabled={!stripe || loading || Number(formData.amount) < 1}
                    className="continue-btn"
                    type="submit"
                  >
                    <p className="btn">
                      {!loading
                        ? `Donate $${formData.amount}`
                        : 'Processing....'}
                    </p>
                  </button>
                </div>
                <p className="terms-text">
                  By clicking Donate, I agree to receive communications from
                  Shaping Wellness Foundation and their Privacy Policy.
                </p>
              </div>
            )
          )}
        </form>
      </div>
    </main>
  );
}

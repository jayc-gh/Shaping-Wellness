'use client';

import React, { useState, useRef } from 'react';
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
import Lock from '../../../app/icons/donate/lock.svg';
import { handleSubmit, useOutsideClick, useStopScroll } from '@/lib/functions';
import { DonateFormData, ErrorMap, StripeCtx } from '@/declarations';
import LoadingDots from '../../loadingDots';
import Link from 'next/link';
import '../../forms/forms.css';
import PrivacyPolicy from '@/components/footer/bottom-footer/privacy-policy';

const stripePublicKey: string = process.env
  .NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string;
if (!stripePublicKey) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(stripePublicKey);

export default function DonateForm() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<DonateFormData>({
    donationAmount: '50',
    feeCovered: false,
    feeAmount: '',
    totalCharged: '',
    monthly: false,
    firstName: '',
    lastName: '',
    email: '',
    address: {
      address1: '',
      address2: '',
      country: 'US',
      state: '',
      city: '',
      postalCode: '',
    },
    phone: {
      number: '',
      type: '',
    },
    anonymous: false,
    orgDonate: false,
    orgName: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showErrors, setShowErrors] = useState<ErrorMap>({});
  const [stripeCtx, setStripeCtx] = useState<StripeCtx>({
    stripe: null,
    elements: null,
  });
  const [popup, setPopup] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const { stripe, elements } = stripeCtx;

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => {
    setStep(prev => prev - 1);
    setErrorMessage('');
    setShowErrors({});
  };
  const cardFee = (amount: number) => 0.029 * amount + 0.3;
  const directDepositFee = (amount: number) => Math.min(amount * 0.008, 5);

  const handleSubmitParams = {
    step,
    formData,
    stripeCtx,
    setShowErrors,
    nextStep,
    setLoading,
    setErrorMessage,
  };

  useOutsideClick(popupRef, () => setPopup(false));
  useStopScroll(popup);

  return (
    <main
      className="background"
      style={
        {
          '--bg-image': 'url("/images/DonationForm.webp")',
        } as React.CSSProperties
      }
    >
      <div className="main-container">
        <div className="content-container">
          <div className="summary-container">
            <div className="flag">
              <h4>DONATE</h4>
            </div>
            <h3 className="text-white">
              Thank you for choosing to support Shaping Wellness Foundation.
            </h3>
            <p className="p4 !text-white">
              Your donation directly funds school-based fitness programs, health
              education workshops, and mentorship opportunities for girls in
              underserved communities. Together, we can build a future where
              every girl has the tools, support, and confidence to lead a
              healthy, empowered life. <br />
              <br />
              Curious about the difference you&apos;re making? Visit our{' '}
              <Link href="/get-involved/donor" className="cursor-pointer">
                <span className="underline">Become a Donor page</span>
              </Link>{' '}
              to see how your support changes lives.
            </p>
          </div>
          <form
            className="donate-form-box"
            onSubmit={e => handleSubmit({ e, ...handleSubmitParams })}
          >
            <PaymentIntentHandler
              step={step}
              formData={formData}
              setClientSecret={setClientSecret}
              setErrorMessage={setErrorMessage}
            />
            <div className="form-container w-full">
              {/* Back button and Progress bar */}
              <ProgressBar step={step} prevStep={prevStep} />
              {(step < 3 || (step === 3 && clientSecret && !errorMessage)) && (
                <div className="flex h-[22px] justify-center items-center gap-[10px] self-stretch">
                  <h4>You are donating:</h4>
                  <p className="custom-text-2 sec-coral">
                    ${formData.donationAmount}
                    {formData.monthly ? '/month' : ''}
                  </p>
                  {step > 1 ? (
                    <button
                      className="custom-text-3 p-neutral !cursor-pointer"
                      onClick={() => setStep(1)}
                      type="button"
                    >
                      change
                    </button>
                  ) : null}
                </div>
              )}

              {step === 1 && (
                <DonationAmt formData={formData} setFormData={setFormData} />
              )}
              {step === 2 && (
                <DonorInfo
                  formData={formData}
                  setFormData={setFormData}
                  showErrors={showErrors}
                  setShowErrors={setShowErrors}
                />
              )}
              {step === 3 && (
                <div className="w-full">
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

                      <PaymentInfo clientSecret={clientSecret} />
                    </Elements>
                  )}
                </div>
              )}
            </div>
            <div className="terms-container">
              {(step < 3 || (step === 3 && clientSecret && !errorMessage)) && (
                <>
                  {step === 3 && clientSecret && !errorMessage && (
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        id="cover-fee-checkbox"
                        className="checkbox"
                        checked={formData.feeCovered}
                        onChange={() => {
                          setFormData(prev => {
                            if (prev.donationAmount === '') return prev;
                            return {
                              ...prev,
                              feeCovered: !formData.feeCovered,
                              feeAmount: String(),
                            };
                          });
                        }}
                      />
                      {formData.feeCovered ? <Checked /> : <Unchecked />}
                      <span className="custom-text-4 s-neutral">
                        I&apos;d like to cover the 3% transaction fee for this
                        donation
                      </span>
                    </label>
                  )}

                  <div className="flex flex-col gap-[10px] justify-center items-center">
                    <div className="continue-container">
                      <button
                        className="continue-btn"
                        type="submit"
                        disabled={
                          step === 3 &&
                          (!stripe ||
                            loading ||
                            Number(formData.donationAmount) < 1 ||
                            errorMessage !== '')
                        }
                      >
                        <span className="btn flex items-center justify-center w-full gap-1">
                          {step === 3 && loading ? (
                            <span>
                              Processing
                              <div className="translate-y-[8px]">
                                <LoadingDots />
                              </div>
                            </span>
                          ) : step === 3 ? (
                            `Donate $${formData.donationAmount}`
                          ) : (
                            'Continue'
                          )}
                        </span>
                      </button>
                    </div>

                    <div className="flex justify-center items-center gap-[5px]">
                      <Lock />
                      <p className="custom-text-3 s-neutral !font-[500] !no-underline">
                        Your donation is secure and facilitated by Stripe.
                      </p>
                    </div>
                  </div>

                  {step === 3 && (
                    <p className="terms-text">
                      By clicking Donate, I agree to receive communications from
                      Shaping Wellness Foundation and their{' '}
                      <span
                        className="underline cursor-pointer"
                        onClick={() => setPopup(!popup)}
                      >
                        Privacy Policy.
                      </span>
                    </p>
                  )}
                </>
              )}
            </div>
          </form>
        </div>
      </div>
      {popup ? (
        <div className="popup-bg">
          <div ref={popupRef}>
            <PrivacyPolicy setPopup={setPopup} />
          </div>
        </div>
      ) : null}
    </main>
  );
}

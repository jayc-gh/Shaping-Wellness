'use client';

import React, { useState, useRef } from 'react';
import DonationAmt from '@/components/pages/donate/donationAmt';
import DonorInfo from '@/components/pages/donate/donorInfo';
import PaymentInfo from '@/components/pages/donate/paymentInfo';
import Summary from '@/components/pages/donate/summary';
import ProgressBar from './progressBar';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeHandler, { appearance, fonts } from './stripeHandler';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import Spinner from '../../spinner';
import SmallSpinner from '../../smallSpinner';
import Lock from '../../../app/icons/donate/lock.svg';
import {
  handleSubmit,
  useOutsideClick,
  useStopScroll,
  calcTransactionFee,
} from '@/lib/functions';
import { DonateFormData, ErrorMap, StripeCtx } from '@/declarations';
import LoadingDots from '../../loadingDots';
import '../../forms/forms.css';
import PrivacyPolicy from '@/components/footer/bottom-footer/privacy-policy';
import Checkbox from './donateCheckbox';

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
    paymentMethod: '',
    totalCharged: '50',
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
  const [checkboxDisabled, setCheckboxDisabled] = useState<boolean>(false);
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

  const handleCheckboxChange = () => {
    setCheckboxDisabled(true);
    calcTransactionFee(formData, setFormData, setCheckboxDisabled);
  };

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
          <Summary />
          <form
            className="donate-form-box"
            onSubmit={e => handleSubmit({ e, ...handleSubmitParams })}
          >
            <div className="form-container w-full">
              {/* Back button and Progress bar */}
              <ProgressBar step={step} prevStep={prevStep} />
              {(step < 3 || (step === 3 && !errorMessage)) && (
                <div className="flex h-[22px] justify-center items-center gap-[10px] self-stretch">
                  <h4>You are donating:</h4>
                  <p className="custom-text-2 sec-coral">
                    ${formData.totalCharged}
                    {formData.monthly ? '/month' : ''}
                  </p>
                  {step > 1 && checkboxDisabled ? (
                    <SmallSpinner />
                  ) : step > 1 ? (
                    <button
                      className="custom-text-3 p-neutral !cursor-pointer"
                      onClick={() => {
                        setStep(1);
                        if (formData.feeCovered) {
                          calcTransactionFee(
                            formData,
                            setFormData,
                            setCheckboxDisabled
                          );
                        }
                      }}
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
                  {(!stripe || !elements) && !errorMessage && <Spinner />}
                  {errorMessage && (
                    <div className="error-text text-center w-full">
                      {errorMessage}
                    </div>
                  )}
                  {!errorMessage && (
                    <Elements
                      stripe={stripePromise}
                      options={{
                        mode: 'payment',
                        amount: convertToSubcurrency(
                          Number(formData.totalCharged)
                        ),
                        currency: 'usd',
                        appearance: appearance,
                        fonts: fonts,
                      }}
                    >
                      <StripeHandler setStripeCtx={setStripeCtx} />

                      <PaymentInfo
                        formData={formData}
                        setFormData={setFormData}
                      />
                    </Elements>
                  )}
                </div>
              )}
            </div>
            <div className="terms-container">
              {(step < 3 || (step === 3 && !errorMessage)) && (
                <>
                  <div className="flex flex-col gap-[10px] justify-center items-center">
                    {step === 3 && !errorMessage && (
                      <Checkbox
                        id={'cover-fee-checkbox'}
                        checked={formData.feeCovered}
                        onChange={handleCheckboxChange}
                        label={
                          "I'd like to cover the transaction fee for this donation"
                        }
                        disabled={checkboxDisabled}
                      />
                    )}

                    <div className="continue-container">
                      <button
                        className="continue-btn"
                        type="submit"
                        title={
                          step === 1 && Number(formData.donationAmount) < 1
                            ? 'Minimum donation amount is $1.00'
                            : undefined
                        }
                        disabled={
                          (step === 3 &&
                            (!stripe || loading || checkboxDisabled)) ||
                          (step === 1 && Number(formData.donationAmount) < 1) ||
                          errorMessage !== ''
                        }
                      >
                        <span className="btn flex items-center justify-center w-full">
                          {step === 3 && loading ? (
                            <span className="btn flex items-center justify-center w-full">
                              Processing
                              <div className="translate-y-[8px] translate-x-[6px]">
                                <LoadingDots />
                              </div>
                            </span>
                          ) : step === 3 ? (
                            `Donate $${formData.totalCharged}`
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

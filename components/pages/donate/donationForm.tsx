'use client';

import React, { useState, useRef } from 'react';
import DonationAmt from '@/components/pages/donate/donationAmt';
import DonorInfo from '@/components/pages/donate/donorInfo';
import PaymentInfo from '@/components/pages/donate/paymentInfo';
import ConfirmDetails from './confirmDetails';
import ProgressBar from './progressBar';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeHandler, { appearance, fonts } from './stripeHandler';
import {
  convertToSubcurrency,
  calcTransactionFee,
} from '@/lib/functions/currencyFunctions';
import Spinner from '../../spinner';
import {
  handleSubmitStepOne,
  handleSubmitStepTwo,
  handleSubmitStepThree,
  handleSubmitStepFour,
} from '@/lib/functions/donateHandleSubmit';
import { useOutsideClick, useStopScroll } from '@/lib/functions/useFunctions';
import { DonateFormData, ErrorMap, StripeCtx } from '@/declarations';
import PrivacyPolicy from '@/components/footer/bottom-footer/privacy-policy';
import { useRouter } from 'next/navigation';
import TermsContainer from './termsContainer';
import { errorText } from '@/lib/classes/input-fields';

const stripePublicKey: string =
  process.env.VERCEL_ENV === 'production' ||
  process.env.VERCEL_ENV === 'preview'
    ? (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)
    : (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_LOCAL as string);

console.log(
  'NEXT_PUBLIC_STRIPE_PUBLIC_KEY:',
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
);
console.log('VERCEL_ENV:', process.env.VERCEL_ENV);

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
    paymentReady: false,
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
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [showErrors, setShowErrors] = useState<ErrorMap>({});
  const [stripeCtx, setStripeCtx] = useState<StripeCtx>({
    stripe: null,
    elements: null,
  });
  const [popup, setPopup] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const { stripe, elements } = stripeCtx;
  const router = useRouter();

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => {
    setStep(prev => prev - 1);
    setErrorMessage('');
    setShowErrors({});
  };

  const handleSubmitParams1 = {
    formData,
    nextStep,
  };

  const handleSubmitParams2 = {
    formData,
    setShowErrors,
    nextStep,
  };

  const handleSubmitParams3 = {
    formData,
    nextStep,
  };

  const handleSubmitParams4 = {
    formData,
    stripeCtx,
    setShowErrors,
    nextStep,
    setLoading,
    setErrorMessage,
    router,
  };

  useOutsideClick(popupRef, () => setPopup(false));
  useStopScroll(popup);

  const handleSubmit = (step: number) => {
    if (step === 1) {
      handleSubmitStepOne(handleSubmitParams1);
    } else if (step === 2) {
      handleSubmitStepTwo(handleSubmitParams2);
    } else if (step === 3) {
      handleSubmitStepThree(handleSubmitParams3);
    } else if (step === 4) {
      handleSubmitStepFour(handleSubmitParams4);
    }
  };

  return (
    <form
      className="flex flex-col lg:w-[37.5rem] lg:min-h-[49.25rem] justify-between items-start py-[2.5rem] bg-white rounded-[0.625rem] gap-[3.0625rem] w-full"
      style={{
        paddingLeft: 'clamp(1.5625rem, 5vw, 6.5rem)',
        paddingRight: 'clamp(1.5625rem, 5vw, 6.5rem)',
      }}
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(step);
      }}
    >
      <div className="flex flex-col items-center gap-[1.5rem] w-full">
        {/* Back button and Progress bar */}
        <ProgressBar
          step={step}
          prevStep={prevStep}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
        {(step < 3 || (step === 3 && !errorMessage)) && (
          <div className="flex h-[1.375rem] justify-center items-center gap-[0.625rem] self-stretch">
            <h4 className="text-base font-bold">You are donating:</h4>
            <p className="text-[1.125rem] font-bold text-[#b1574a]">
              ${Number(formData.totalCharged).toFixed(2)}
              {formData.monthly ? '/month' : ''}
            </p>
            {step > 1 ? (
              <button
                className="text-[0.75rem] cursor-pointer font-[400] underline italic"
                onClick={() => {
                  setStep(1);
                  if (formData.feeCovered) {
                    calcTransactionFee(
                      setFormData,
                      formData.donationAmount,
                      false,
                      formData.paymentMethod
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
        {Number(formData.totalCharged) >= 1 && (
          <Elements
            stripe={stripePromise}
            options={{
              mode: formData.monthly ? 'subscription' : 'payment',
              amount: convertToSubcurrency(Number(formData.totalCharged)),
              currency: 'usd',
              appearance,
              fonts,
            }}
          >
            <div
              style={{ display: step === 3 ? 'block' : 'none' }}
              className="w-full"
            >
              {(!stripe || !elements) && !errorMessage && <Spinner />}
              {!errorMessage && (
                <>
                  <StripeHandler setStripeCtx={setStripeCtx} />
                  <PaymentInfo formData={formData} setFormData={setFormData} />
                </>
              )}
            </div>

            {/* Confirm screen visible only at step 4 */}
            {step === 4 && !errorMessage && (
              <ConfirmDetails
                formData={formData}
                setFormData={setFormData}
                setStep={setStep}
              />
            )}
            {errorMessage && (
              <div className={`${errorText} text-center w-full`}>
                {errorMessage}
              </div>
            )}
          </Elements>
        )}
      </div>
      <TermsContainer
        formData={formData}
        setFormData={setFormData}
        step={step}
        errorMessage={errorMessage}
        loading={loading}
        popup={popup}
        setPopup={setPopup}
      />
      {popup ? (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[linear-gradient(0deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5))]">
          <div ref={popupRef}>
            <PrivacyPolicy setPopup={setPopup} />
          </div>
        </div>
      ) : null}
    </form>
  );
}

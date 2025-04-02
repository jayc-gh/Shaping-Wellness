'use client';

import convertToSubcurrency from '@/lib/convertToSubcurrency';
import React, { useState, useEffect, useRef } from 'react';
import { FormInfo } from './donationForm';
import {
  useStripe,
  useElements,
  PaymentElement,
  PaymentElementProps,
} from '@stripe/react-stripe-js';

interface StepProps {
  formData: FormInfo;
  setFormData: React.Dispatch<React.SetStateAction<FormInfo>>;
}

const PaymentInfo = ({ formData }: StepProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const errorRef = useRef<HTMLDivElement | null>(null);

  const paymentElementOptions: PaymentElementProps['options'] = {
    fields: {
      billingDetails: {
        address: 'never',
      },
    },
  };

  useEffect(() => {
    if (Number(formData.amount) < 1) {
      setClientSecret('');
      return;
    }

    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: convertToSubcurrency(Number(formData.amount)),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.log('Error creating payment intent:', error);
      }
    };

    createPaymentIntent();
  }, [formData.amount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

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
        return_url: 'http://localhost:3000/',
        receipt_email: formData.email,
      },
    });

    if (error) {
      setErrorMessage(error.message || 'Payment failed');
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black mt-30"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="text-black w-full">
      <h4 className="w-full text-left mb-4">PAYMEMT DETAILS</h4>
      {clientSecret && (
        <PaymentElement options={paymentElementOptions} className="mb-2" />
      )}
      {errorMessage && (
        <div
          ref={errorRef}
          className="text-red-600 font-semibold p-2 rounded-md bg-red-100"
        >
          {errorMessage}
        </div>
      )}
      <div className="flex justify-center w-full">
        <button
          disabled={!stripe || loading || Number(formData.amount) < 1}
          className="w-55 h-10 border rounded-full cursor-pointer"
        >
          {!loading ? `Donate $${formData.amount}` : 'Processing...'}
        </button>
      </div>
    </form>
  );
};

export default PaymentInfo;

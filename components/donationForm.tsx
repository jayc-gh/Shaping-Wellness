'use client';
import React, { useEffect, useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import convertToSubcurrency from '@/lib/convertToSubcurrency';

const DonationForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState('');
  // const [loading, setLoading] = useState(false);
  const [anonCheck, setAnonCheck] = useState<boolean>(false);
  const [orgDonate, setOrgDonate] = useState<boolean>(false);
  const [comment, setComment] = useState<string>();

  // personal info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
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
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: '',
        receipt_email: email,
      },
    });

    if (error) {
      setErrorMessage(error.message || 'Payment failed');
    }
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
        6,
        10
      )}`;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-4 w-full mb-2">
        <label className="flex flex-col gap-2 text-left flex-1">
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            className="border"
          />
        </label>

        <label className="flex flex-col gap-2 text-left flex-1">
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
            className="border"
          />
        </label>
      </div>

      <div className="flex flex-col gap-2 mb-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={anonCheck}
            onChange={() => setAnonCheck(!anonCheck)}
          />
          Donate anonymously
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={orgDonate}
            onChange={() => setOrgDonate(!orgDonate)}
          />
          Donate as an organization
        </label>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label className="flex flex-col gap-2 text-left">
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="border"
          />
        </label>

        <label className="flex flex-col gap-2 text-left">
          Phone Number:
          <input
            type="tel"
            value={phone}
            onChange={e => {
              const formattedPhone = formatPhoneNumber(e.target.value);
              setPhone(formattedPhone);
            }}
            placeholder="000-000-0000"
            className="border"
          />
        </label>
      </div>

      {clientSecret && <PaymentElement className="mb-2" />}
      {errorMessage && <div>{errorMessage}</div>}
      <label className="flex flex-col gap-2 text-left">
        Leave a comment
        <input
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="border mb-4"
        />
      </label>
      <button className="border">Donate</button>
    </form>
  );
};

export default DonationForm;

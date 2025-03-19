'use client';

import DonationForm from '@/components/donationForm';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';

const stripePublicKey: string = process.env
  .NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string;
if (!stripePublicKey) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLIC_KEY');
}

const stripePromise = loadStripe(stripePublicKey);

export default function Donate() {
  const [amount, setAmount] = useState<number>(1);
  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const toggleDonationType = (type: string) => {
    setIsMonthly(type === 'monthly');
  };

  const handleAmountSelection = (value: number | 'custom'): void => {
    if (value !== 'custom') {
      setIsCustom(false);
      setAmount(value);
    } else {
      setIsCustom(true);
      setAmount(1);
    }
  };

  const handleCustomAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    if (!isNaN(Number(value)) && value !== '') {
      setAmount(Number(value));
    } else if (value === '') {
      setAmount(1);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-10 text-black text-center m-15">
      <div className="flex justify-center mb-6">
        <div className="relative inline-block w-48 h-12 rounded-full bg-gray-300">
          <div
            className={`absolute top-0 left-0 w-1/2 h-full bg-blue-500 rounded-full transition-all duration-300 ${
              isMonthly ? 'translate-x-full' : ''
            }`}
          ></div>
          <div
            onClick={() => toggleDonationType('one-time')}
            className={`absolute top-0 left-0 w-1/2 h-full text-white flex justify-center items-center cursor-pointer rounded-full ${
              !isMonthly ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            One-time
          </div>
          <div
            onClick={() => toggleDonationType('monthly')}
            className={`absolute top-0 right-0 w-1/2 h-full text-white flex justify-center items-center cursor-pointer rounded-full ${
              isMonthly ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            Monthly
          </div>
        </div>
      </div>

      {/* Donation Amount Buttons */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[50, 100, 150, 250, 500].map(value => (
          <button
            key={value}
            onClick={() => handleAmountSelection(value)}
            className={`px-4 py-2 border rounded-lg cursor-pointer ${
              amount === value ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            ${value}
          </button>
        ))}
        <button
          onClick={() => handleAmountSelection('custom')}
          className={`px-4 py-2 border rounded-lg cursor-pointer ${
            isCustom ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Custom
        </button>
      </div>

      {/* Input field for custom amount */}
      {isCustom && (
        <div>
          <input
            type="number"
            value={amount}
            onChange={handleCustomAmountChange}
            placeholder="Enter custom amount"
            className="px-4 py-2 border rounded-lg w-full"
          />
        </div>
      )}

      <Elements
        stripe={stripePromise}
        options={{
          mode: 'payment',
          amount: convertToSubcurrency(amount),
          currency: 'usd',
        }}
      >
        <DonationForm amount={amount} />
      </Elements>
    </main>
  );
}

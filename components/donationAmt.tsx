'use client';
import React, { useState } from 'react';
import { FormInfo } from './donationForm';

interface StepProps {
  formData: FormInfo;
  setFormData: React.Dispatch<React.SetStateAction<FormInfo>>;
  nextStep: () => void;
}

const DonationAmt = ({ formData, setFormData, nextStep }: StepProps) => {
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const toggleDonationType = (type: string) => {
    setFormData({ ...formData, monthly: type === 'monthly' });
  };

  const handleAmountSelection = (value: string | 'custom'): void => {
    if (value !== 'custom') {
      setIsCustom(false);
      setFormData({ ...formData, amount: value });
    } else {
      setIsCustom(true);
      setFormData({ ...formData, amount: '' });
    }
  };

  const handleCustomAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    let value = e.target.value;
    if (value.startsWith('.')) {
      value = '0' + value;
    }

    if (value.startsWith('$')) {
      value = value.slice(1);
    }

    if (!/^\d*\.?\d{0,2}$/.test(value)) return;
    setFormData({ ...formData, amount: value });

    if (parseFloat(value) < 1) {
      setError('Minimum donation amount is $1.00.');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const donationAmount = parseFloat(formData.amount || '0');
    if (isNaN(donationAmount) || donationAmount < 1) {
      setError('Minimum donation amount is $1.00.');
      return;
    }
    nextStep();
  };

  return (
    <main className="max-w-2xl mx-auto p-10 text-black text-center m-15">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mb-6">
          <div className="relative inline-block w-85 h-12 rounded-full bg-gray-300">
            <div
              className={`absolute top-0 left-0 w-1/2 h-full bg-blue-500 rounded-full transition-all duration-300 ${
                formData.monthly ? 'translate-x-full' : ''
              }`}
            ></div>
            <div
              onClick={() => toggleDonationType('one-time')}
              className={`absolute top-0 left-0 w-1/2 h-full text-white flex justify-center items-center cursor-pointer rounded-full ${
                !formData.monthly ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              One-time
            </div>
            <div
              onClick={() => toggleDonationType('monthly')}
              className={`absolute top-0 right-0 w-1/2 h-full text-white flex justify-center items-center cursor-pointer rounded-full ${
                formData.monthly ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              Monthly
            </div>
          </div>
        </div>

        {/* Donation Amount Buttons */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {[75, 100, 250, 500].map(value => (
            <button
              type="button"
              key={value}
              onClick={() => {
                handleAmountSelection(String(value));
                setError('');
              }}
              className={`py-2 border rounded-lg cursor-pointer ${
                formData.amount === String(value)
                  ? 'bg-blue-500 text-white rounded-lg'
                  : 'bg-gray-200 rounded-lg'
              }`}
            >
              ${value}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleAmountSelection('custom')}
            className={`py-2 border rounded-lg cursor-pointer text-center ${
              isCustom
                ? 'bg-blue-500 text-white rounded-lg'
                : 'bg-gray-200 rounded-lg'
            }`}
          >
            Custom
          </button>
        </div>

        {/* Input field for custom amount */}
        {isCustom && (
          <div>
            <input
              type="text"
              value={formData.amount ? `$${formData.amount}` : ''}
              onChange={handleCustomAmountChange}
              placeholder="Minimum donation amount is $1.00."
              className="px-4 py-2 border rounded-lg w-full text-sm mb-2"
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          </div>
        )}
        <button
          type="submit"
          className="px-4 py-1 border rounded-lg cursor-pointer"
        >
          Next
        </button>
      </form>
    </main>
  );
};

export default DonationAmt;

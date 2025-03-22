'use client';
import React, { useState } from 'react';
import { FormInfo } from './donationForm';

interface StepProps {
  formData: FormInfo;
  setFormData: React.Dispatch<React.SetStateAction<FormInfo>>;
  nextStep: () => void;
}

const DonationAmt = ({ formData, setFormData, nextStep }: StepProps) => {
  // const [isCustom, setIsCustom] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const toggleDonationType = (type: string) => {
    setFormData({ ...formData, monthly: type === 'monthly' });
  };

  const handleAmountSelection = (value: string | 'custom'): void => {
    setFormData({ ...formData, amount: value });
    // if (value !== 'custom') {
    //   setIsCustom(false);
    //   setFormData({ ...formData, amount: value });
    // } else {
    //   setIsCustom(true);
    //   setFormData({ ...formData, amount: '' });
    // }
  };

  const handleCustomAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // auto add 0 if starting with .
    let value = e.target.value;
    if (value.startsWith('.')) {
      value = '0' + value;
    }

    // remove $ sign
    if (value.startsWith('$')) {
      value = value.slice(1);
    }

    // decimal check
    if (!/^\d*\.?\d{0,2}$/.test(value)) return;

    const numericValue = parseFloat(value);

    // Enforce max value of 999999.99
    if (numericValue > 999999.99) return;

    setFormData({ ...formData, amount: value });

    if (numericValue < 1) {
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
    } else if (isNaN(donationAmount) || donationAmount > 999999.99) {
      setError('Donation amount cannot exceed $999,999.99');
      return;
    }
    nextStep();
  };

  return (
    <main className="mx-auto w-full text-black">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-6">
          <div className="flex justify-center">
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
          <p>Choose your {formData.monthly ? 'monthly' : 'one-time'} gift: *</p>
        </div>

        {/* Donation Amount Buttons */}
        <div className="grid grid-cols-4 gap-x-2 gap-y-4 w-full mb-6">
          {[75, 100, 150, 250, 500, 1000, 1500, 2000].map(value => (
            <button
              type="button"
              key={value}
              onClick={() => {
                handleAmountSelection(String(value));
                setError('');
              }}
              className={`px-6 py-2 border rounded-lg cursor-pointer ${
                formData.amount === String(value)
                  ? 'bg-blue-500 text-white rounded-lg'
                  : 'bg-gray-200 rounded-lg'
              }`}
            >
              ${value}
            </button>
          ))}
          {/* <button
            type="button"
            onClick={() => handleAmountSelection('custom')}
            className={`py-2 border rounded-lg cursor-pointer text-center ${
              isCustom
              ? 'bg-blue-500 text-white rounded-lg'
              : 'bg-gray-200 rounded-lg'
              }`}
              >
              Custom
              </button> */}
        </div>

        {/* Input field for custom amount */}
        {/* {isCustom && (
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
          )} */}
        <div className="relative w-1/2 mb-4 mx-auto">
          <input
            type="text"
            value={formData.amount ? `$${formData.amount}` : ''}
            onChange={handleCustomAmountChange}
            placeholder="Minimum $1.00"
            className="px-4 py-2 pr-10 border rounded-lg w-full text-sm"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <span className="text-sm select-none">USD</span>
          </div>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        </div>
        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="w-55 h-10 border rounded-full cursor-pointer"
          >
            Continue
          </button>
        </div>
      </form>
    </main>
  );
};

export default DonationAmt;

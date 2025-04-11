'use client';
import React, { useState } from 'react';
import { FormInfo } from './donationForm';

interface StepProps {
  formData: FormInfo;
  setFormData: React.Dispatch<React.SetStateAction<FormInfo>>;
  nextStep: () => void;
}

export default function DonationAmt({
  formData,
  setFormData,
  nextStep,
}: StepProps) {
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
    if (
      isNaN(donationAmount) ||
      donationAmount < 1 ||
      donationAmount > 999999.99
    ) {
      return;
    }
    nextStep();
  };

  return (
<<<<<<< HEAD
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full text-black relative h-full"
    >
      <h4 className="w-full text-left mb-4">SELECT AN AMOUNT</h4>
      <div className="flex flex-col mb-4">
        <div className="flex justify-center mb-4">
          <div className="relative inline-block w-85 h-12 rounded-full bg-gray-300">
            <div
              className={`absolute top-0 left-0 w-1/2 h-full bg-blue-500 rounded-full ${
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
=======
    <form onSubmit={handleSubmit} className="form-content-container">
      <h4>SELECT AN AMOUNT</h4>
      <div className="toggle-container">
        <div className="toggle-btn-container">
          <div
            onClick={() => toggleDonationType('one-time')}
            className={`toggle-btn ${!formData.monthly && 'filled'} btn `}
          >
            One-time
          </div>
          <div
            onClick={() => toggleDonationType('monthly')}
            className={`toggle-btn ${formData.monthly && 'filled'} btn `}
          >
            Monthly
>>>>>>> donate
          </div>
        </div>
      </div>
      <div className="donation-amt-container">
        <p className="custom-text">
          Choose your {formData.monthly ? 'monthly' : 'one-time'} gift:{' '}
          <span className="required">*</span>
        </p>
        {/* Donation Amount Buttons */}
        <div className="donation-amt-btn-grid">
          {[75, 100, 150, 250, 500, 1000, 1500, 2000].map(value => (
            <button
              type="button"
              key={value}
              onClick={() => {
                handleAmountSelection(String(value));
                setError('');
              }}
              className={`donation-amt-btn !cursor-pointer ${
                formData.amount === String(value) && 'filled'
              }`}
            >
              ${value}
            </button>
          ))}
        </div>

        <div className="donation-amt-input-container">
          <span className="donation-input-text pr-[10px] !select-none">$</span>
          <input
            type="text"
            value={formData.amount ? `${formData.amount}` : ''}
            onChange={handleCustomAmountChange}
            placeholder="Minimum $1.00"
            className="donation-input-text"
          />
          <span className="donation-input-text !select-none">USD</span>
        </div>
      </div>

      <div className="flex justify-center">
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
<<<<<<< HEAD
      <div className="flex justify-center w-full absolute bottom-0">
=======
      {/* <div className="absolute flex justify-center w-full bottom-10">
>>>>>>> donate
        <button
          type="submit"
          className="w-55 h-10 border rounded-md cursor-pointer"
        >
          Continue
        </button>
      </div> */}
    </form>
  );
}

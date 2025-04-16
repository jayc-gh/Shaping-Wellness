'use client';
import React, { useState } from 'react';
import { FormInfo } from './donationForm';

interface StepProps {
  formData: FormInfo;
  setFormData: React.Dispatch<React.SetStateAction<FormInfo>>;
}

export default function DonationAmt({ formData, setFormData }: StepProps) {
  // const [isCustom, setIsCustom] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const toggleDonationType = (type: string) => {
    setFormData({ ...formData, monthly: type === 'monthly' });
  };

  const handleAmountSelection = (value: string | 'custom'): void => {
    setFormData({ ...formData, amount: value });
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

  return (
    <div className="form-content-container">
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
        <div className="flex flex-col gap-[4px] self-center items-center">
          <div className="donation-amt-input-container">
            <span className="donation-input-text pr-[10px] !select-none">
              $
            </span>
            <input
              type="text"
              value={formData.amount ? `${formData.amount}` : ''}
              onChange={handleCustomAmountChange}
              placeholder="Minimum $1.00"
              className="donation-input-text"
            />
            <span className="donation-input-text !select-none">USD</span>
          </div>
          <div className="flex justify-center self-center mt-[4px]">
            {error && <p className="error-text">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

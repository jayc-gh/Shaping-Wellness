import React, { useState } from 'react';
import { DonateFormData } from '@/declarations';

interface StepProps {
  formData: DonateFormData;
  setFormData: React.Dispatch<React.SetStateAction<DonateFormData>>;
}

export default function DonationAmt({ formData, setFormData }: StepProps) {
  const [customAmt, setCustomAmt] = useState<boolean>(false);
  const toggleDonationType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      monthly: type === 'monthly',
      feeCovered: false,
    }));
  };

  const handleAmountSelection = (value: string | 'custom'): void => {
    setFormData(prev => ({
      ...prev,
      donationAmount: value,
      feeCovered: false,
      totalCharged: value,
    }));
  };

  const handleCustomAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // auto add 0 if starting with .
    let value = e.target.value;
    if (value.startsWith('.')) {
      value = '0' + value;
    }

    // auto add . if starting with 0
    if (/^0\d{1,2}$/.test(value)) {
      value = `0.${value.slice(1)}`;
    }

    // remove $ sign
    if (value.startsWith('$')) {
      value = value.slice(1);
    }

    // decimal check
    if (!/^\d*\.?\d{0,2}$/.test(value)) return;

    const numericValue = parseFloat(value);

    // max value of 999999.99
    if (numericValue > 999999.99) return;

    setFormData(prev => ({
      ...prev,
      donationAmount: value,
      totalCharged: value,
      feeCovered: false,
    }));
  };

  return (
    <div className="donate-form-content-container">
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
          Choose your{' '}
          <span className="font-bold">
            {formData.monthly ? 'monthly' : 'one-time'}
          </span>{' '}
          gift: <span className="required">*</span>
        </p>
        {/* Donation Amount Buttons */}
        <div className="donation-amt-btn-grid">
          {[25, 50, 75, 100, 150, 200].map((value, i) => (
            <button
              type="button"
              key={value}
              onClick={() => {
                handleAmountSelection(String(value));
                setCustomAmt(false);
              }}
              className={`donation-amt-btn !cursor-pointer ${
                formData.donationAmount === String(value) && 'filled'
              }`}
              style={{ gridArea: `btn${i + 1}` }}
            >
              <span className="p4 !font-[600]">
                ${value}
                {formData.monthly ? '' : ''}
              </span>
            </button>
          ))}
          <button
            type="button"
            key="custom"
            onClick={() => {
              setCustomAmt(true);
              handleAmountSelection('');
            }}
            className={`donation-amt-btn !cursor-pointer ${
              customAmt ? 'filled' : ''
            }`}
            style={{ gridArea: 'customBtn' }}
          >
            <span className="p4 !font-[600]">Other</span>
          </button>
          {customAmt ? (
            <div
              className="donation-amt-input-container"
              style={{ gridArea: 'customInput' }}
            >
              <span className="donation-input-text pr-[10px] !select-none">
                $
              </span>
              <input
                type="text"
                value={
                  formData.donationAmount ? `${formData.donationAmount}` : ''
                }
                onChange={handleCustomAmountChange}
                placeholder="Enter amount"
                title="Minimum donation amount is $1.00"
                className="donation-input-text"
              />
              <div className="flex items-center justify-end gap-[10px]">
                <span className="field-line p4 !font-[300] select-none">|</span>
                <span className="donation-input-text select-none">USD</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

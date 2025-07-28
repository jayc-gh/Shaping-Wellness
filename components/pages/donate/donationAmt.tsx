import React, { useState } from 'react';
import { DonateFormData } from '@/declarations';
import {
  errorText,
  errorTextContainer,
  errorTextTransition,
  required,
} from '@/lib/classes/input-fields';

interface StepProps {
  formData: DonateFormData;
  setFormData: React.Dispatch<React.SetStateAction<DonateFormData>>;
}

export default function DonationAmt({ formData, setFormData }: StepProps) {
  const [customAmt, setCustomAmt] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
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
    let value = e.target.value;
    if (value.startsWith('.')) {
      value = '0' + value;
    }

    if (/^0\d{1,2}$/.test(value)) {
      value = `0.${value.slice(1)}`;
    }

    if (value.startsWith('$')) {
      value = value.slice(1);
    }

    // decimal check
    if (!/^\d*\.?\d{0,2}$/.test(value)) return;

    // Allow empty input (user clearing the field)
    if (value === '') {
      setFormData(prev => ({
        ...prev,
        donationAmount: '',
        totalCharged: '',
        feeCovered: false,
      }));
      return;
    }

    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return;
    if (numericValue > 999999.99) return;

    setFormData(prev => ({
      ...prev,
      donationAmount: value,
      totalCharged: value,
      feeCovered: false,
    }));
  };

  return (
    <div className="flex flex-col items-start gap-[0.75rem] w-full">
      <h4 className="text-[1rem] font-bold leading-normal">SELECT AN AMOUNT</h4>
      <div className="flex flex-col w-full justify-center items-center gap-[0.625rem]">
        <div className="flex h-[2.75rem] items-center justify-center rounded-full border border-[#dd6d5c] cursor-pointer w-full">
          <div
            onClick={() => toggleDonationType('one-time')}
            className={
              'flex text-base font-bold h-[2.75rem] w-full py-[1rem] justify-center items-center rounded-full hover:cursor-pointer ' +
              (!formData.monthly
                ? 'text-white bg-gradient-to-b from-[#d9764e] to-[#dd6d5c] shadow-[inset_0px_6px_7px_rgba(0,0,0,0.07)]'
                : 'bg-gradient-to-b from-[#d9764e] to-[#dd6d5c] bg-clip-text text-transparent')
            }
          >
            One-time
          </div>
          <div
            onClick={() => toggleDonationType('monthly')}
            className={
              'flex text-base font-bold h-[2.75rem] w-full py-[1rem] justify-center items-center rounded-full hover:cursor-pointer ' +
              (formData.monthly
                ? 'text-white bg-gradient-to-b from-[#d9764e] to-[#dd6d5c] shadow-[inset_0px_6px_7px_rgba(0,0,0,0.07)]'
                : 'bg-gradient-to-b from-[#d9764e] to-[#dd6d5c] bg-clip-text text-transparent')
            }
          >
            Monthly
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-start gap-[0.75rem] flex-1 w-full">
        <p className="text-[0.9375rem] lg:text-base font-normal leading-[1.25rem]">
          Choose your{' '}
          <span className="font-bold">
            {formData.monthly ? 'monthly' : 'one-time'}
          </span>{' '}
          gift: <span className={required}>*</span>
        </p>
        {/* Donation Amount Buttons */}
        <div
          className="grid w-full gap-x-[0.9375rem] lg:gap-x-[1.5rem] gap-y-[0.75rem]"
          style={{
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gridTemplateAreas:
              "'btn1 btn2 btn3' 'btn4 btn5 btn6' 'customBtn customInput customInput'",
          }}
        >
          {[25, 50, 75, 100, 150, 200].map((value, i) => (
            <button
              type="button"
              key={value}
              onClick={() => {
                handleAmountSelection(String(value));
                setCustomAmt(false);
                setError(false);
              }}
              className={
                'flex h-[2.75rem] px-[1.25rem] py-[1rem] justify-center items-center rounded-[0.625rem] font-semibold text-[1rem] transition-colors cursor-pointer ' +
                (formData.donationAmount === String(value)
                  ? 'bg-[#dd6d5c] text-white'
                  : 'bg-[#ffece4] text-[#2f2f2f]')
              }
              style={{ gridArea: `btn${i + 1}` }}
            >
              <span className="font-semibold text-[1rem]">${value}</span>
            </button>
          ))}
          <button
            type="button"
            key="custom"
            onClick={() => {
              setCustomAmt(true);
              handleAmountSelection('');
            }}
            className={
              'flex h-[2.75rem] px-[1.25rem] py-[1rem] justify-center items-center gap-[1.5rem] rounded-[0.625rem] font-semibold text-[1rem] transition-colors hover:cursor-pointer ' +
              (customAmt
                ? 'bg-[#dd6d5c] text-white'
                : 'bg-[#ffece4] text-[#2f2f2f]')
            }
            style={{ gridArea: 'customBtn' }}
          >
            <span className="font-semibold hover:cursor-pointer text-[1rem]">
              Other
            </span>
          </button>
          {customAmt ? (
            <div
              className="flex flex-col w-full"
              style={{ gridArea: 'customInput' }}
            >
              <div className="flex w-full h-[2.75rem] px-[1rem] py-[1rem] justify-between items-center rounded-[0.625rem] border border-[rgba(47,47,47,0.3)]">
                <span className="text-[#2f2f2f] text-[1rem] font-medium select-none mr-[0.625rem]">
                  $
                </span>

                <input
                  type="text"
                  value={
                    formData.donationAmount ? `${formData.donationAmount}` : ''
                  }
                  onChange={e => {
                    handleCustomAmountChange(e);
                    setError(false);
                  }}
                  onBlur={e => {
                    if (!e.target.value || Number(e.target.value) < 1) {
                      setError(true);
                    }
                  }}
                  placeholder="Enter amount"
                  className="flex-1 bg-transparent border-none outline-none text-[#2f2f2f] text-[1rem] font-medium min-w-0"
                />

                <div className="flex items-center justify-center gap-[0.625rem] shrink-0">
                  <span className="text-[rgba(47,47,47,0.3)] text-[1rem] font-light select-none">
                    |
                  </span>
                  <span className="text-[#2f2f2f] text-[1rem] font-medium select-none">
                    USD
                  </span>
                </div>
              </div>
              <div
                className={`${errorTextContainer} w-full text-left ${
                  error ? errorTextTransition : ''
                }`}
              >
                <p className={errorText}>Minimum donation amount is $1.00</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

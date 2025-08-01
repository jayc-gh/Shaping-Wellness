import React from 'react';
import Dot from '../../../app/icons/donate/dot.svg';
import DotFilled from '../../../app/icons/donate/dotfilled.svg';
import DotCheck from '../../../app/icons/donate/dotcheck.svg';
import Back from '../../../app/icons/donate/back.svg';
import DotCheckFilled from '../../../app/icons/donate/dot-check-filled.svg';

interface StepProps {
  step: number;
  prevStep?: () => void;
  errorMessage?: string;
  setErrorMessage?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function ProgressBar({
  step,
  prevStep,
  errorMessage,
  setErrorMessage,
}: StepProps) {
  const handleClick = () => {
    if (step === 4 && errorMessage && setErrorMessage) {
      setErrorMessage('');
    } else if (step > 1 && step < 5 && prevStep) {
      prevStep();
    }
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div
        className={`w-[1.5rem] h-[1.5rem] ${step > 1 && 'cursor-pointer'}`}
        onClick={handleClick}
      >
        {step > 1 && step < 5 && <Back />}
      </div>
      {/* Dots + lines */}
      <div className="flex items-center flex-wrap content-center">
        {[1, 2, 3, 4].map(dot => (
          <React.Fragment key={dot}>
            {step >= dot ? (
              <span className="py-[5px]">
                <DotFilled />
              </span>
            ) : (
              <span className="py-[5px]">
                <Dot />
              </span>
            )}
            <div
              className="flex-grow h-[1px] bg-[#dd6d5c]"
              style={{ minWidth: '40px', maxWidth: '50px' }}
            />
          </React.Fragment>
        ))}
        {step >= 5 ? (
          <span className="py-[5px]">
            <DotCheckFilled />
          </span>
        ) : (
          <span className="py-[5px]">
            <DotCheck />
          </span>
        )}
      </div>
      <div className="w-[1.5rem] h-[1.5rem]"></div>
    </div>
  );
}

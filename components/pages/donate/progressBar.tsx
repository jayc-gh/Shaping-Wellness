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
    if (step === 3 && errorMessage && setErrorMessage) {
      setErrorMessage('');
    } else if (step > 1 && step < 4 && prevStep) {
      prevStep();
    }
  };

  return (
    <div className="back-and-progress-bar-container">
      <div
        className={`w-[24px] h-[24px] ${step > 1 && 'cursor-pointer'}`}
        onClick={handleClick}
      >
        {step > 1 && step < 4 && <Back className="check" />}
      </div>
      {/* Dots + lines */}
      <div className="progress-bar-container">
        {[1, 2, 3].map(dot => (
          <React.Fragment key={dot}>
            {step >= dot ? <DotFilled /> : <Dot />}
            {/* <Dot className={`dot ${step >= dot ? 'filled' : ''}`} /> */}
            <div key={dot} className="line"></div>
          </React.Fragment>
        ))}
        {step >= 4 ? <DotCheckFilled /> : <DotCheck />}
        {/* <DotCheck className={`dot ${step >= 4 ? 'filled' : ''}`} /> */}
      </div>
      <div className="w-[24px] h-[24px]"></div>
    </div>
  );
}

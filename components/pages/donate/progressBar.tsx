import React from 'react';
import Dot from '../../../app/icons/dot.svg';
import DotFilled from '../../../app/icons/dotfilled.svg';
import DotCheck from '../../../app/icons/dotcheck.svg';
import Back from '../../../app/icons/back.svg';
import DotCheckFilled from '../../../app/icons/dot-check-filled.svg';

interface StepProps {
  step: number;
  prevStep: () => void;
}

export default function ProgressBar({ step, prevStep }: StepProps) {
  return (
    <div className="back-and-progress-bar-container">
      <div
        className={`w-[24px] h-[24px] ${step > 1 && 'cursor-pointer'}`}
        onClick={step > 1 && step < 4 ? prevStep : undefined}
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

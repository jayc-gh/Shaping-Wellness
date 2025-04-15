import React from 'react';
import Dot from '../../app/icons/dot.svg';
import DotCheck from '../../app/icons/dotcheck.svg';
import Back from '../../app/icons/back.svg';

interface StepProps {
  step: number;
  prevStep: () => void;
}

export default function ProgressBar({ step, prevStep }: StepProps) {
  return (
    <div className="back-and-progress-bar-container">
      <div
        className={`w-[24px] h-[24px] ${step > 1 && 'cursor-pointer'}`}
        onClick={step > 1 ? prevStep : undefined}
      >
        {step > 1 && <Back className="check" />}
      </div>
      {/* Dots + lines */}
      <div className="progress-bar-container">
        {[1, 2, 3].map(dot => (
          <React.Fragment key={dot}>
            <Dot className={`dot ${step >= dot ? 'filled' : ''}`} />
            <div key={dot} className="line"></div>
          </React.Fragment>
        ))}
        <DotCheck className={`dot ${step >= 4 ? 'filled' : ''}`} />
      </div>
      <div className="w-[24px] h-[24px]"></div>
    </div>
  );
}

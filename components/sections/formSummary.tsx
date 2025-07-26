import React from 'react';

type FormSummaryProps = {
  flagText: string;
  header: string;
  description: React.ReactNode;
};

export default function FormSummary({
  flagText,
  header,
  description,
}: FormSummaryProps) {
  return (
    <div className="flex w-[31rem] flex-col items-start gap-[1.5rem]">
      <div className="flex px-[1.25rem] py-[0.25rem] items-center justify-center bg-[#dd6d5c] rounded-tr-[0.625rem] rounded-bl-[0.625rem]">
        <p className="text-base font-bold text-white">{flagText}</p>
      </div>
      <p className="text-[1.5rem] text-white font-bold leading-[140%]">
        {header}
      </p>
      <p className="text-base font-[500] leading-[140%] text-white">
        {description}
      </p>
    </div>
  );
}

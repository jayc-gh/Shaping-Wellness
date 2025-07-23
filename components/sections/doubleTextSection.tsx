import React from 'react';

type DoubleTextSectionProps = {
  title: string;
  subTitle: string;
  description: React.ReactNode;
};

export default function DoubleTextSection({
  title,
  subTitle,
  description,
}: DoubleTextSectionProps) {
  return (
    <div className="flex flex-col justify-center items-center px-[1.5625rem] py-[2.5rem] gap-[0.625rem] w-full lg:px-[6.75rem] lg:gap-[2rem]">
      <div className="flex flex-col items-center justify-center gap-[1.5rem] lg:flex-row max-w-[1224px]">
        <div className="flex flex-col text-left gap-[0.5rem] lg:w-[50%] justify-start h-full">
          <h4 className="!text-base !font-bold">{title}</h4>
          <h3 className="text-[#b1574a] text-[1.25rem] leading-[140%] lg:text-[1.5rem]">
            {subTitle}
          </h3>
        </div>
        <div className="flex lg:w-[50%]">
          <p className="text-base font-[500] leading-[160%] lg:text-[1.125rem]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

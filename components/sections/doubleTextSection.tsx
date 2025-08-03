import React from 'react';
import HyperLink from '../buttons/hyperLink';

type Link = {
  href: string;
  label: string;
};

type DoubleTextSectionProps = {
  title: string;
  subTitle: string;
  description: React.ReactNode;
  link?: Link;
  pdf?: boolean;
};

export default function DoubleTextSection({
  title,
  subTitle,
  description,
  link,
  pdf,
}: DoubleTextSectionProps) {
  return (
    <div className="flex flex-col justify-center items-center px-[1.5625rem] py-[2.5rem] gap-[0.625rem] w-full lg:px-[6.75rem] lg:gap-[2rem]">
      <div className="flex flex-col items-center justify-center gap-[1.5rem] lg:flex-row lg:items-start max-w-[1224px]">
        <div className="flex w-full lg:w-[50%] justify-start h-full">
          <div className="flex flex-col w-full text-left gap-[0.5rem] lg:max-w-[31.25rem]">
            <h4 className="text-base font-bold">{title}</h4>
            <h3 className="text-[#b1574a] text-[1.25rem] leading-[140%] lg:text-[1.5rem] font-bold">
              {subTitle}
            </h3>
          </div>
        </div>
        <div className="flex lg:w-[50%] flex-col items-start gap-[2rem]">
          <div className="text-base font-[500] leading-[160%] lg:text-[1.125rem]">
            {description}
          </div>
          {link && (
            <div className="flex w-full items-center justify-center lg:justify-start">
              <HyperLink
                href={link.href}
                text={link.label}
                size="text-[0.8125rem] lg:text-[0.875rem]"
                pdf={pdf}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

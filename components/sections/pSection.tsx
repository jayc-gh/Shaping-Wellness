import React from 'react';
import Link from 'next/link';
import HyperLink from '../buttons/hyperLink';

type Link = {
  href: string;
  label: string;
  ariaLabel?: string;
};

type PSectionTypes = {
  header: string;
  text?: React.ReactNode;
  link?: Link;
};

export default function PSection({ header, text, link }: PSectionTypes) {
  return (
    <div className="flex w-full items-center justify-center py-[2.5rem] px-[1.5625rem] lg:px-[6.75rem]">
      <div className="flex gap-[1.5rem] flex-col justify-center items-center lg:max-w-[55.625rem]">
        <div className="flex flex-col justify-center items-center gap-[1.5rem] lg:text-center lg:max-w-[1224px]">
          <h4 className="text-[#b1574a] !text-base !font-bold">{header}</h4>
          {text && (
            <p className="text-[1rem] leading-[1.7rem] font-[500] lg:text-[1.125rem] lg:leading-[1.8rem]">
              {text}
            </p>
          )}
        </div>
        {link && (
          <HyperLink
            href={link.href}
            text={link.label}
            ariaLabel={link.ariaLabel}
            arrow={true}
            size="text-base"
          />
        )}
      </div>
    </div>
  );
}

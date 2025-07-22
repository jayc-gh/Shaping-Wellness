import React from 'react';
import Link from 'next/link';
import RightArrow from '../../app/icons/right-arrow.svg';

type Link = {
  href: string;
  label: string;
};

type PSectionTypes = {
  header: string;
  text: React.ReactNode;
  link?: Link;
};

export default function PSection({ header, text, link }: PSectionTypes) {
  return (
    <div className="flex py-[2.5rem] px-[1.5625rem] gap-[1.5rem] flex-col justify-center items-center lg:py-[2.5rem]">
      <div className="flex flex-col justify-center items-center gap-[1.5rem] lg:text-center lg:max-w-[1224px]">
        <h4 className="text-[#b1574a]">{header}</h4>
        <p className="text-[1rem]/[1.7rem] font-[500] lg:text-[1.125rem]/[1.8rem]">
          {text}
        </p>
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex h-[3.125rem] py-[1rem] px-[1.25rem] justify-center items-center gap-[0.625rem] cursor-pointer transition-transform duration-150 active:scale-96 lg:hover:scale-102 leading-none"
        >
          <p className="text-base lg:text-[1.125rem] text-[#b1574a] font-semibold pb-[2px] border-b-2 border-transparent group-hover:border-[#b1574a] transition duration-150 group-hover:scale-96 active:scale-96">
            {link.label}
          </p>
          <span className="pb-[0.3rem]">
            <RightArrow />
          </span>
        </Link>
      )}
    </div>
  );
}

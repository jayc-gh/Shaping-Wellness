import Link from 'next/link';
import React from 'react';
import HyperLink from '../buttons/hyperLink';

type Link = {
  href: string;
  label: string;
};

type PictureTextSectionProps = {
  title: string;
  subtitle: string;
  content: React.ReactNode;
  imageUrl: string;
  reverse?: boolean;
  link?: Link;
  setPopup?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PictureTextSection({
  title,
  subtitle,
  content,
  imageUrl,
  reverse,
  link,
  setPopup,
}: PictureTextSectionProps) {
  return (
    <div
      className={`flex flex-1 flex-col justify-center items-center gap-[1.5rem] ${
        reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } lg:w-full lg:max-w-[1224px]`}
    >
      <div
        className={`w-full min-w-[21.3125rem] max-w-[32rem] lg:max-w-[37.5rem] rounded-tl-[6.25rem] rounded-br-[6.25rem] aspect-[340/227] lg:rounded-tl-[9.375rem] lg:rounded-br-[9.375rem] lg:w-[50%]`}
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${imageUrl})`,
          backgroundSize: 'cover, cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 20%, center 20%',
          backgroundColor: 'lightgray',
        }}
      />
      <div className="w-full flex flex-col gap-[1rem] items-start justify-center lg:w-[50%]">
        <div className="flex flex-col items-start gap-[0.5rem] justify-center">
          <h4 className="text-[#2f2f2f] text-[1rem] font-bold">{title}</h4>
          <h3 className="text-[#b1574a] text-[1.25rem] lg:text-[1.5rem] leading-[140%] font-bold">
            {subtitle}
          </h3>
        </div>
        <div className="text-[#3c3c3c] text-base font-[500] leading-[160%] lg:text-[1.125rem]">
          {content}
        </div>
        {link && <HyperLink href={link.href} text={link.label} small={true} />}
        {setPopup && (
          <button
            className={`text-[0.875rem] text-[#b1574a] font-[600] pt-[1rem] pb-[2px] border-b-2 border-transparent active:border-[#b1574a] hover:border-[#b1574a] transition duration-150 hover:scale-96 active:scale-96 cursor-pointer`}
            onClick={() => setPopup(true)}
          >
            READ MORE
          </button>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import HyperLink from '../buttons/hyperLink';

type GrayBorderCardProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string;
};

export default function GrayBorderCard({
  icon,
  title,
  text,
  href,
}: GrayBorderCardProps) {
  return (
    <div className="flex flex-1 p-[1.5625rem] flex-col justify-center items-center shadow-[0_4px_9px_rgba(0,0,0,0.04)] rounded-[0.625rem] border-[1px] border-[#efefef] lg:py-[1.25rem] lg:px-[1.5rem]">
      <div className="flex flex-col flex-grow justify-between items-center gap-[0.75rem] lg:gap-[2rem]">
        {icon}
        <h3 className="text-[#b1574a] !text-[1.25rem] lg:!text-[1.5rem] !font-bold !leading-[140%]">
          {title}
        </h3>
        <p className="text-base lg:text-[1.125rem] font-[500] leading-[160%]">
          {text}
        </p>
        <HyperLink href={href} text="LEARN MORE" size="small" arrow={true} />
      </div>
    </div>
  );
}

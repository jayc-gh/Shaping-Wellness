import React from 'react';

type GradientBoxProps = {
  BoxSvg: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
  classString: string;
};

export default function GradientBox({
  BoxSvg,
  Icon,
  title,
  text,
  classString,
}: GradientBoxProps) {
  return (
    <div className="relative w-full max-w-[340px] lg:max-w-[392px] pb-[1.5rem] lg:p-0">
      <Icon className="absolute -top-6 left-1/2 -translate-x-1/2" />
      <div
        className={`${classString} px-[1.875rem] pt-[2.5rem] pb-[2rem] h-full`}
      >
        <BoxSvg className="absolute inset-0 w-full h-full z-0" />
        <div className="flex flex-col gap-[1rem] text-center relative z-10">
          <h3 className="!text-[1.25rem] !font-bold !leading-[140%] text-[#b1574a] lg:!text-[1.5rem]">
            {title}
          </h3>
          <p className="text-base font-[500] leading-[160%] lg:text-[1.125rem]">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

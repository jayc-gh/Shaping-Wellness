import React from 'react';
import MainButton from '../buttons/mainButton';

type MainSectionProps = {
  flagText?: string;
  heading: React.ReactNode;
  description: string | React.ReactNode;
  buttonText?: string;
  buttonHref?: string;
  buttonVariant?: 'orange' | 'white';
  bgImageUrl: string;
  aspectRatio?: string;
  contentMaxWidth?: string;
  backgroundPosition: string;
  backgroundSize?: string;
  transparent?: boolean;
  showBg?: boolean;
};

export default function MainSection({
  flagText,
  heading,
  description,
  buttonText,
  buttonHref,
  buttonVariant = 'white',
  bgImageUrl,
  aspectRatio,
  backgroundPosition,
  backgroundSize = 'cover, cover',
  contentMaxWidth = 'lg:max-w-[37.5rem]',
  transparent,
  showBg = true,
}: MainSectionProps) {
  return (
    <div
      className={`flex flex-col gap-[0.625rem] px-[1.5625rem] py-[3.125rem] ${aspectRatio} ${
        transparent
          ? 'justify-center items-start lg:px-0 lg:py-0 lg:justify-start'
          : 'justify-center items-center lg:px-[6.75rem] lg:py-[3.875rem]'
      } lg:flex-row
        lg:gap-0
        lg:self-auto
        `}
      style={{
        backgroundImage: showBg
          ? transparent
            ? `linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgImageUrl})`
            : `linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgImageUrl})`
          : undefined,
        backgroundSize: backgroundSize,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: backgroundPosition,
      }}
    >
      <div
        className={`flex items-start justify-start w-full
        lg:justify-start lg:max-w-[76.5rem]`}
      >
        <div
          className={`flex flex-col justify-center ${
            !flagText ? 'text-center items-center' : 'text-start items-start'
          } ${!flagText ? 'gap-[2rem]' : 'gap-[1.5rem]'} lg:text-left
        lg:items-start
        lg:gap-[1.5rem]`}
        >
          {flagText && (
            <div className="flex px-[1.25rem] py-[0.25rem] items-center justify-center bg-[#dd6d5c] rounded-tr-[0.625rem] rounded-bl-[0.625rem]">
              <p className="text-base font-bold text-white">{flagText}</p>
            </div>
          )}
          <h1
            className={`text-white font-bold ${contentMaxWidth} ${
              flagText
                ? transparent
                  ? 'text-[1.75rem] lg:text-[1.5rem]'
                  : 'text-[1.75rem] lg:text-[2.5rem]'
                : 'text-[2rem] lg:text-[3rem]'
            }`}
          >
            {heading}
          </h1>
          <p
            className={`text-white font-[500] text-base ${
              !transparent ? 'lg:text-[1.125rem]' : ''
            } lg:max-w-[37.5rem] leading-[140%]`}
          >
            {description}
          </p>

          {buttonText && buttonHref && (
            <MainButton
              color={buttonVariant}
              link={{ href: buttonHref, label: buttonText }}
              width="main"
            />
          )}
        </div>
      </div>
    </div>
  );
}

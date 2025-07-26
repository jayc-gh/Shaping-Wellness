'use client';

import { useState, useEffect } from 'react';

type HoverCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  backgroundPosition: string;
};

export default function HoverCard({
  imageUrl,
  title,
  description,
  backgroundPosition,
}: HoverCardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = () => {
    if (isMobile) setIsClicked(!isClicked);
  };

  return (
    <div
      className="flex-1 group relative flex flex-col justify-center items-center gap-[4.1875rem] rounded-[0.625rem] shadow-md transition-all duration-300 ease-in-out overflow-hidden aspect-[15/18] lg:aspect-[16/18] w-[21.25rem] max-w-[392px]"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${imageUrl})`,
        backgroundSize: 'cover, cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: backgroundPosition,
        backgroundColor: 'lightgray',
      }}
      onClick={handleClick}
    >
      {/* Overlay layer */}
      <div
        className={`absolute inset-0 rounded-[0.625rem] z-[1] transition-opacity duration-300 ease-in-out pointer-events-none ${
          isClicked ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'
        }`}
        style={{
          background: 'linear-gradient(180deg, #ffece4 0%, #ffd1be 100%)',
        }}
      />

      {/* Title */}
      <h3
        className={`z-[2] text-white !text-[1.25rem] text-center py-[3.125rem] px-[1.875rem] lg:px-3.125rem lg:!text-[1.5rem] !font-bold leading-[140%] transition-opacity duration-300 ease-in-out lg:group-hover:opacity-0 ${
          !isClicked ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {title}
      </h3>

      {/* Hover/Click Text */}
      <p
        className={`text-[#2c2c2c] text-base text-center font-[500] lg:text-[1.125rem] py-[3.125rem] px-[1.875rem] lg:px-3.125rem absolute z-[2] transition-opacity duration-300 ease-in-out lg:group-hover:opacity-100 ${
          isClicked ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {description}
      </p>
    </div>
  );
}

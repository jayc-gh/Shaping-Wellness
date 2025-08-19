'use client';

import React, { useState, useRef, useEffect } from 'react';
import ArrowDown from '../../../app/icons/Arrow-down.svg';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`flex flex-col p-[0.75rem] rounded-[0.375rem] items-start justify-center border-1 border-[rgba(0,0,0,0.1)] w-full ${
        isOpen ? 'gap-[0.5rem]' : 'gap-0'
      }`}
    >
      <div
        className="flex items-center cursor-pointer w-full gap-[0.25rem]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-grow text-start items-center">
          <p className="text-base font-[500] leading-[1.25rem]">{question}</p>
        </div>
        <div className="flex h-full items-start self-start">
          <ArrowDown
            className={`shrink-0 transform duration-100 ease-in-out ${
              isOpen ? '-rotate-180' : ''
            }`}
          />
        </div>
      </div>
      <div
        className="overflow-hidden transition-[height] duration-100 ease-in-out w-full text-start"
        style={{
          height: `${height / 16}rem`,
        }}
      >
        <div
          ref={contentRef}
          className="w-full"
          style={{ maxWidth: 'calc(100% - 1.75rem)' }}
        >
          <div className="text-base font-[400] leading-[1.25rem] text-[#6b6461]">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

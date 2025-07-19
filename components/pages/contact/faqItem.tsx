'use client';

import React, { useState, useRef, useEffect } from 'react';
import ArrowDown from '../../../app/icons/Arrow-down.svg';
import './contactForm.css';

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
    <div className="faq-dropdown">
      <div className="faq-text-container">
        <div className="faq-q-container" onClick={() => setIsOpen(!isOpen)}>
          <div className="faq-q-inner">
            <p className="faq-q">{question}</p>
          </div>
          <ArrowDown
            className={`transform duration-100 ease-in-out ${
              isOpen ? '-rotate-180' : ''
            }`}
          />
        </div>
        <div
          className="faq-a-container"
          style={{
            height: `${height / 16}rem`,
          }}
        >
          <div ref={contentRef} className="faq-a-inner">
            <p className="faq-a">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

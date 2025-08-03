'use client';

import { founderEmail } from '@/lib/constants';
import Close from '../../../app/icons/close-color.svg';
import Email from '../../../app/icons/meet-our-founder/email-nofill-black.svg';
import Image from 'next/image';
import React from 'react';

interface StepProps {
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MeetOurFounder({ setPopup }: StepProps) {
  return (
    <div className="flex overflow-y-auto bg-[#ffece4] w-[22.5rem] h-[35.875rem] px-[1.25rem] pt-[1.25rem] pb-[2.5rem] flex-col items-start gap-[0.625rem] rounded-[0.625rem] lg:px-[3rem] lg:pb-[3rem] lg:pt-[1.875rem] lg:gap-[0.75rem] lg:rounded-[0.75rem] lg:w-[1024px] lg:h-auto">
      <div className="flex justify-between items-center self-stretch">
        <h5 className="text-[#b1574a] text-[1.25rem] font-bold">
          Luciana N Gearing
        </h5>
        <button className="cursor-pointer" onClick={() => setPopup(false)}>
          <Close />
        </button>
      </div>
      <div className="flex flex-col items-start gap-[1.5rem] lg:flex-row text-base leading-[160%]">
        <div className="flex flex-col w-full items-start gap-[0.75rem] lg:justify-center lg:gap-[1.5rem]">
          <div className="relative rounded-tl-[2.5rem] rounded-br-[2.5rem] w-full aspect-[154/100.55] lg:aspect-[13/12] lg:rounded-tl-[6.25rem] lg:rounded-br-[6.25rem] overflow-hidden lg:w-[299px] lg:h-auto">
            <Image
              src="/images/WhoWeAreIMG2.jpg"
              alt="Picture of Founder"
              fill={true}
              className="object-cover"
            />
          </div>

          <div className="flex flex-col items-start gap-[0.5rem]">
            <div className="flex items-center gap-[0.625rem] text-base font-[500] leading-[170%]">
              <Email />
              <p>{founderEmail}</p>
            </div>
            <div className="flex items-center gap-[0.625rem] text-base font-[500] leading-[170%]"></div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-[0.75rem] text-base leading-[160%]">
          <p>
            <span className="font-[600]">Luciana N. Gearing</span> is the{' '}
            <span className="font-[600]">Founder and Executive Director</span>{' '}
            of Shaping Wellness Foundation, an organization dedicated to helping
            underserved girls develop healthy habits, gain access to wellness
            education, and build self-confidence through fitness programs,
            mentorship, and community support.
          </p>
          <p>
            Luciana graduated from Texas A&M University with a degree in
            Biomedical Science and has eight years of experience in healthcare.
            Throughout her career in clinical research and patient care, she has
            witnessed firsthand the health disparities affecting different
            communities, particularly in underserved populations.
          </p>
          <p>
            Recognizing that many chronic illnesses and health challenges stem
            from a lack of early education, access to resources, and preventive
            care, she founded Shaping Wellness Foundation to help bridge this
            gap and empower young girls with the tools to take control of their
            health from an early age.
          </p>
        </div>
      </div>
    </div>
  );
}

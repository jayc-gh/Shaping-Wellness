'use client';

import Close from '../../../app/icons/close-color.svg';
import Email from '../../../app/icons/meet-our-founder/email-nofill-black.svg';
import Phone from '../../../app/icons/meet-our-founder/phone-nofill-black.svg';
import Image from 'next/image';
import React from 'react';

interface StepProps {
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MeetOurFounder({ setPopup }: StepProps) {
  return (
    <div className="popup-container">
      <div className="popup-header-wrapper">
        <h5 className="!text-[#B1574A]">Luciana N Gearing</h5>
        <button className="cursor-pointer" onClick={() => setPopup(false)}>
          <Close />
        </button>
      </div>
      <div className="popup-content-wrapper">
        <div className="popup-image-wrapper">
          <Image
            src="/images/DonationForm.webp"
            width={299}
            height={276}
            alt="Picture of Founder"
            style={{ aspectRatio: '13/12', borderRadius: '100px 0px' }}
          />
          <div className="popup-contact-wrapper">
            <div className="popup-contact">
              <Email />
              <p className="p2">Email: email@domain.com</p>
            </div>
            <div className="popup-contact">
              <Phone />
              <p className="p2">Phone: 000-000-0000</p>
            </div>
          </div>
        </div>
        <div className="popup-text-wrapper">
          <p className="p3">
            <span className="!font-bold">Luciana N. Gearing</span> is the{' '}
            <span className="!font-bold">Founder and Executive Director</span>{' '}
            of Shaping Wellness Foundation, an organization dedicated to helping
            underserved girls develop healthy habits, gain access to wellness
            education, and build self-confidence through fitness programs,
            mentorship, and community support.
          </p>
          <p className="p3">
            Luciana graduated from Texas A&M University with a degree in
            Biomedical Science and has eight years of experience in healthcare.
            Throughout her career in clinical research and patient care, she has
            witnessed firsthand the health disparities affecting different
            communities, particularly in underserved populations.
          </p>
          <p className="p3">
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

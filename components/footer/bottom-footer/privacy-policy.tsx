'use client';

import Close from '../../../app/icons/close-color.svg';
import Email from '../../../app/icons/privacy-policy/email-nofill-black.svg';
import Phone from '../../../app/icons/privacy-policy/phone-nofill-black.svg';
import Mailbox from '../../../app/icons/privacy-policy/mailbox-nofill-black.svg';
import React from 'react';

interface StepProps {
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PrivacyPolicy({ setPopup }: StepProps) {
  return (
    <div className="flex overflow-y-auto bg-[#ffece4] w-[22.5rem] h-[35.875rem] px-[1.25rem] pt-[1.25rem] pb-[2.5rem] flex-col items-start gap-[0.625rem] rounded-[0.625rem] lg:px-[3rem] lg:pb-[3rem] lg:pt-[1.875rem] lg:gap-[0.75rem] lg:rounded-[0.75rem] lg:w-[800px] lg:h-auto">
      <div className="flex justify-between items-center self-stretch">
        <h5 className="text-[#b1574a] text-[1.25rem] font-bold">
          Privacy Policy
        </h5>
        <button className="cursor-pointer" onClick={() => setPopup(false)}>
          <Close />
        </button>
      </div>
      <div className="flex flex-col items-start gap-[0.75rem] flex-1">
        <p className="text-base leading-[140%] text-[#2f2f2f]">
          Shaping Wellness Foundation values the support of our donors,
          volunteers, and community members, and we are committed to protecting
          their privacy.{' '}
          <span className="font-[700]">
            We do not sell, trade, or share any personal or donor information
            with outside organizations.
          </span>
        </p>
        <p className="text-base leading-[140%] text-[#3c3c3c]">
          To safeguard your data, Shaping Wellness Foundation has implemented
          appropriate physical, electronic, and managerial procedures to prevent
          unauthorized access, maintain data accuracy, and ensure the proper use
          of the information we collect.
        </p>
        <p className="text-base leading-[140%] text-[#3c3c3c]">
          Any credit card or personal information provided through donations or
          form submissions is used solely to process contributions or respond to
          information requests.{' '}
          <span className="font-[700]">
            This information will not be disclosed, sold, rented, or shared with
            any third party without the donor&apos;s explicit consent.
          </span>
        </p>
        <p className="text-base leading-[140%] text-[#3c3c3c]">
          If you wish to stop receiving communications from Shaping Wellness
          Foundation, you may request to be removed from our mailing list at any
          time. For record-keeping purposes, your donor history will remain in
          our secure database, but you will no longer receive emails or physical
          mailings from our organization.
        </p>
        <p className="text-base leading-[140%] text-[#3c3c3c] font-[700]">
          To opt out of communications or to ask questions about our privacy
          practices, please contact us at:
        </p>
      </div>
      <div className="flex w-[300px] flex-col justify-center items-start gap-[1.5rem]">
        <div className="flex flex-col items-start gap-[0.5rem] text-[#2f2f2f]">
          <div className="flex items-center gap-[0.625rem]">
            <Email />
            <p className="text-base leading-[140%] #2f2f2f">
              Email: email@domain.com
            </p>
          </div>
          <div className="flex items-center gap-[0.625rem]">
            <Phone />
            <p className="text-base leading-[140%] #2f2f2f">
              Phone: 000-000-0000
            </p>
          </div>
          <div className="flex items-center gap-[0.625rem]">
            <Mailbox />
            <p className="text-base leading-[140%] #2f2f2f">
              P.O. Box: 123 Main St
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

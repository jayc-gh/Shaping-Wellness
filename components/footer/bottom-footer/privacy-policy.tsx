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
    <div className="popup-container !w-[800px]">
      <div className="popup-header-wrapper">
        <h5 className="!text-[#B1574A]">Privacy Policy</h5>
        <button className="cursor-pointer" onClick={() => setPopup(false)}>
          <Close />
        </button>
      </div>
      <div className="popup-text-wrapper">
        <p className="p4">
          Shaping Wellness Foundation values the support of our donors,
          volunteers, and community members, and we are committed to protecting
          their privacy.{' '}
          <span className="!font-bold">
            We do not sell, trade, or share any personal or donor information
            with outside organizations.
          </span>
        </p>
        <p className="p4">
          To safeguard your data, Shaping Wellness Foundation has implemented
          appropriate physical, electronic, and managerial procedures to prevent
          unauthorized access, maintain data accuracy, and ensure the proper use
          of the information we collect.
        </p>
        <p className="p4">
          Any credit card or personal information provided through donations or
          form submissions is used solely to process contributions or respond to
          information requests.{' '}
          <span className="!font-bold">
            This information will not be disclosed, sold, rented, or shared with
            any third party without the donor’s explicit consent.
          </span>
        </p>
        <p className="p4">
          If you wish to stop receiving communications from Shaping Wellness
          Foundation, you may request to be removed from our mailing list at any
          time. For record-keeping purposes, your donor history will remain in
          our secure database, but you will no longer receive emails or physical
          mailings from our organization.
        </p>
        <p className="p4 !font-bold">
          To opt out of communications or to ask questions about our privacy
          practices, please contact us at:
        </p>
      </div>
      <div className="popup-image-wrapper">
        <div className="popup-contact-wrapper">
          <div className="popup-contact">
            <Email />
            <p className="p4">Email: email@domain.com</p>
          </div>
          <div className="popup-contact">
            <Phone />
            <p className="p4">Phone: 000-000-0000</p>
          </div>
          <div className="popup-contact">
            <Mailbox />
            <p className="p4">P.O. Box: 123 Main St</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { DonateFormData } from '@/declarations';

interface StepProps {
  formData: DonateFormData;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function ConfirmDetails({ formData, setStep }: StepProps) {
  return (
    <div className="flex flex-col gap-[24px] w-full">
      <div className="flex items-center justify-center">
        <h4>Confirm Details</h4>
      </div>
      <div className="confirm-details-container">
        <div className="confirm-details-subsection">
          <div className="confirm-details-subsection-header">
            <h4>Donation details</h4>
            <button
              className="italic underline cursor-pointer custom-text-3"
              onClick={() => setStep(1)}
            >
              edit
            </button>
          </div>
          <div className="gray-line"></div>
          <div className="confirm-details-subsection-row">
            <div className="confirm-details-subsection-col">
              <div className="confirm-details-subsection-item">
                <p className="p5 !font-[600] s-neutral">Donation amount</p>
                <p className="p4">${formData.totalCharged} </p>
              </div>
              <div className="confirm-details-subsection-item">
                <p className="p5 !font-[600] s-neutral"> Frequency</p>
                <p className="p4">
                  {formData.monthly ? 'Monthly' : 'One-Time'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="confirm-details-subsection">
          <div className="confirm-details-subsection-header">
            <h4>Donor details</h4>
            <button
              className="italic underline cursor-pointer custom-text-3"
              onClick={() => setStep(2)}
            >
              edit
            </button>
          </div>
          <div className="gray-line"></div>
          <div className="confirm-details-subsection-row">
            {formData.orgDonate && (
              <div className="confirm-details-subsection-col">
                <div className="confirm-details-subsection-item">
                  <p className="p5 !font-[600] s-neutral">Organization name</p>
                  <p className="p4">{formData.orgName}</p>
                </div>
              </div>
            )}
            <div className="confirm-details-subsection-col">
              <div className="confirm-details-subsection-item">
                <p className="p5 !font-[600] s-neutral">
                  {formData.orgDonate ? 'Contact ' : ''}Name
                </p>
                <p className="p4">
                  {formData.firstName} {formData.lastName}
                </p>
              </div>
              <div className="confirm-details-subsection-item">
                <p className="p5 !font-[600] s-neutral">
                  {formData.orgDonate ? 'Contact ' : ''}Email
                </p>
                <p className="p4">{formData.email}</p>
              </div>
            </div>
            <div className="confirm-details-subsection-col">
              <div className="confirm-details-subsection-item">
                <p className="p5 !font-[600] s-neutral">
                  Phone {formData.phone.type ? `(${formData.phone.type})` : ''}
                </p>
                <p className="p4">{formData.phone.number ?? '-'}</p>
              </div>
              <div className="confirm-details-subsection-item">
                <p className="p5 !font-[600] s-neutral">Address</p>
                <p className="p4">
                  {formData.address.address1}
                  <br />
                  {formData.address.address2 && (
                    <>
                      {formData.address.address2}
                      <br />
                    </>
                  )}
                  {formData.address.city}, {formData.address.state}{' '}
                  {formData.address.postalCode}
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="confirm-details-subsection">
          <div className="confirm-details-subsection-header">
            <h4>Payment method</h4>
            <button
              className="italic underline cursor-pointer custom-text-3"
              onClick={() => setStep(3)}
            >
              edit
            </button>
          </div>
          <div className="gray-line"></div>
          <div className="confirm-details-subsection-row">
            <div className="confirm-details-subsection-col">
              <div className="confirm-details-subsection-item">
                <p className="p4">
                  {formData.paymentMethod === 'card'
                    ? 'Credit Card'
                    : 'US Bank Account'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

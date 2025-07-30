import React from 'react';
import { DonateFormData } from '@/declarations';
import { calcTransactionFee } from '@/lib/functions/currencyFunctions';

interface StepProps {
  formData: DonateFormData;
  setFormData: React.Dispatch<React.SetStateAction<DonateFormData>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function ConfirmDetails({
  formData,
  setFormData,
  setStep,
}: StepProps) {
  return (
    <div className="flex flex-col gap-[1.5rem] w-full">
      <div className="flex items-center justify-center">
        <h4 className="text-base font-bold">Confirm Details</h4>
      </div>
      <div className="flex flex-col items-start gap-[0.625rem] w-full">
        <div className="flex py-[0.625rem] flex-col items-start gap-[0.625rem] w-full">
          <div className="flex justify-between w-full">
            <h4 className="text-base font-bold">Donation details</h4>
            <button
              className="italic underline cursor-pointer text-[0.75rem] font-[400]"
              onClick={() => {
                setStep(1);
                if (formData.feeCovered) {
                  calcTransactionFee(
                    setFormData,
                    formData.donationAmount,
                    false,
                    formData.paymentMethod
                  );
                }
              }}
            >
              edit
            </button>
          </div>
          <div className="w-full h-[1px] bg-[#e0e0e0]"></div>
          <div className="flex flex-col items-start gap-[1.875rem] w-full">
            <div className="flex items-start w-full">
              <div className="flex flex-col items-start w-[50%] gap-[0.625rem]">
                <p className="text-[0.875rem] !font-[600] text-[#6b6461]">
                  Donation amount
                </p>
                <p className="text-base font-[500] text-[#2f2f2f]">
                  ${formData.totalCharged}{' '}
                </p>
              </div>
              <div className="flex flex-col items-start w-[50%] gap-[0.625rem]">
                <p className="text-[0.875rem] !font-[600] text-[#6b6461]">
                  {' '}
                  Frequency
                </p>
                <p className="text-base font-[500] text-[#2f2f2f]">
                  {formData.monthly ? 'Monthly' : 'One-time'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex py-[0.625rem] flex-col items-start gap-[0.625rem] w-full">
          <div className="flex justify-between w-full">
            <h4 className="text-base font-bold">Donor details</h4>
            <button
              className="italic underline cursor-pointer text-[0.75rem] font-[400]"
              onClick={() => {
                setStep(2);
                if (formData.feeCovered) {
                  calcTransactionFee(
                    setFormData,
                    formData.donationAmount,
                    false,
                    formData.paymentMethod
                  );
                }
              }}
            >
              edit
            </button>
          </div>
          <div className="w-full h-[0.0625rem] bg-[#e0e0e0]"></div>
          <div className="flex flex-col items-start gap-[1.875rem] w-full">
            {formData.orgDonate && (
              <div className="flex items-start w-full">
                <div className="flex flex-col items-start w-[50%] gap-[0.625rem]">
                  <p className="text-[0.875rem] !font-[600] text-[#6b6461]">
                    Organization name
                  </p>
                  <p className="text-base font-[500] text-[#2f2f2f]">
                    {formData.orgName}
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-start w-full">
              <div className="flex flex-col items-start w-[50%] gap-[0.625rem]">
                <p className="text-[0.875rem] !font-[600] text-[#6b6461]">
                  {formData.orgDonate ? 'Contact ' : ''}Name
                </p>
                <p className="text-base font-[500] text-[#2f2f2f]">
                  {formData.firstName} {formData.lastName}
                </p>
              </div>
              <div className="flex flex-col items-start w-[50%] gap-[0.625rem]">
                <p className="text-[0.875rem] !font-[600] text-[#6b6461]">
                  {formData.orgDonate ? 'Contact ' : ''}Email
                </p>
                <p className="text-base font-[500] text-[#2f2f2f]">
                  {formData.email}
                </p>
              </div>
            </div>
            <div className="flex items-start w-full">
              <div className="flex flex-col items-start w-[50%] gap-[0.625rem]">
                <p className="text-[0.875rem] !font-[600] text-[#6b6461]">
                  Phone {formData.phone.type ? `(${formData.phone.type})` : ''}
                </p>
                <p className="text-base font-[500] text-[#2f2f2f]">
                  {formData.phone.number ?? '-'}
                </p>
              </div>
              <div className="flex flex-col items-start w-[50%] gap-[0.625rem]">
                <p className="text-[0.875rem] !font-[600] text-[#6b6461]">
                  Address
                </p>
                <p className="text-base font-[500] text-[#2f2f2f]">
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
        <div className="flex py-[0.625rem] flex-col items-start gap-[0.625rem] w-full">
          <div className="flex justify-between w-full">
            <h4 className="text-base font-bold">Payment details</h4>
            <button
              className="italic underline cursor-pointer text-[0.75rem] font-[400]"
              onClick={() => {
                setStep(3);
                if (formData.feeCovered) {
                  calcTransactionFee(
                    setFormData,
                    formData.donationAmount,
                    false,
                    formData.paymentMethod
                  );
                }
              }}
            >
              edit
            </button>
          </div>
          <div className="w-full h-[0.0625rem] bg-[#e0e0e0]"></div>
          <div className="flex flex-col items-start gap-[1.875rem] w-full">
            <div className="flex items-start w-full">
              <div className="flex flex-col items-start w-[50%] gap-[0.625rem]">
                <p className="text-[0.875rem] !font-[600] text-[#6b6461]">
                  Payment method
                </p>
                <p className="text-base font-[500] text-[#2f2f2f]">
                  {{
                    card: 'Credit Card',
                    google_pay: 'Google Pay',
                    apple_pay: 'Apple Pay',
                    us_bank_account: 'US Bank Account',
                  }[formData.paymentMethod] || ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

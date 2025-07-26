import React from 'react';
import Name from '../../input-fields/name';
import OrgName from '../../input-fields/orgName';
import Address from '../../input-fields/address';
import Email from '../../input-fields/email';
import Phone from '../../input-fields/phone';
import { DonateFormData, ErrorMap } from '@/declarations';
import Checkbox from './donateCheckbox';

interface StepProps {
  formData: DonateFormData;
  setFormData: React.Dispatch<React.SetStateAction<DonateFormData>>;
  showErrors: ErrorMap;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
}

export default function DonorInfo({
  formData,
  setFormData,
  showErrors,
  setShowErrors,
}: StepProps) {
  return (
    <div className="flex flex-col items-start gap-[0.75rem] w-full">
      <div className="flex flex-col justify-center items-start gap-[0.5rem] w-full">
        <h4 className="text-base font-bold">YOUR INFORMATION</h4>
        {!formData.orgDonate && (
          <Name
            formData={formData}
            setFormData={setFormData}
            showErrors={showErrors}
            setShowErrors={setShowErrors}
            formType="donate"
          />
        )}

        {formData.orgDonate && (
          <OrgName
            formData={formData}
            setFormData={setFormData}
            showErrors={showErrors}
            setShowErrors={setShowErrors}
            formType="donate"
          />
        )}

        {/* checkboxes */}
        <div className="flex flex-col items-start gap-[0.25rem] flex-1">
          <Checkbox
            id={'anonymous-checkbox'}
            checked={formData.anonymous}
            onChange={() =>
              setFormData(prev => ({
                ...prev,
                anonymous: !formData.anonymous,
              }))
            }
            label={'Hide my name from the public.'}
            help={true}
          />
          <Checkbox
            id={'orgDonate-checkbox'}
            checked={formData.orgDonate}
            onChange={() =>
              setFormData(prev => ({
                ...prev,
                orgDonate: !formData.orgDonate,
                orgName: '',
              }))
            }
            label={'This is a business or organization organization.'}
            help={true}
          />
        </div>

        {/* address */}
        <Address
          formData={formData}
          setFormData={setFormData}
          showErrors={showErrors}
          setShowErrors={setShowErrors}
          formType="donate"
        />

        {/* contact first/last name if donate as an org is checked */}
        {formData.orgDonate && (
          <Name
            formData={formData}
            setFormData={setFormData}
            showErrors={showErrors}
            setShowErrors={setShowErrors}
            formType="donate"
          />
        )}

        {/* email */}
        <Email
          formData={formData}
          setFormData={setFormData}
          showErrors={showErrors}
          setShowErrors={setShowErrors}
          formType="donate"
        />

        {/* phone number */}
        <Phone
          formData={formData}
          setFormData={setFormData}
          showErrors={showErrors}
          setShowErrors={setShowErrors}
          formType={'donate'}
        />
      </div>
    </div>
  );
}

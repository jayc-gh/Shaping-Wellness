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
    <div className="donate-form-content-container">
      <div className="form-sub-container">
        <h4>YOUR INFORMATION</h4>
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
        <div className="flex flex-col items-start gap-[4px] flex-1">
          <Checkbox
            id={'anonymous-checkbox'}
            checked={formData.anonymous}
            onChange={() =>
              setFormData(prev => ({
                ...prev,
                anonymous: !formData.anonymous,
              }))
            }
            label={'Hide my name from the public'}
          />
          <Checkbox
            id={'orgDonate-checkbox'}
            checked={formData.orgDonate}
            onChange={() =>
              setFormData(prev => ({
                ...prev,
                orgDonate: !formData.orgDonate,
              }))
            }
            label={'Donate as an organization'}
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
          emailUsed={formData.emailUsed}
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

import React from 'react';
import Unchecked from '../../../app/icons/checked=no.svg';
import Checked from '../../../app/icons/checked=yes.svg';
import Help from '../../../app/icons/help.svg';
import Name from '../../input-fields/name';
import OrgName from '../../input-fields/orgName';
import Address from '../../input-fields/address';
import Email from '../../input-fields/email';
import Phone from '../../input-fields/phone';
import { FormInfo, ErrorMap } from '@/declarations';

interface StepProps {
  formData: FormInfo;
  setFormData: React.Dispatch<React.SetStateAction<FormInfo>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  showErrors: ErrorMap;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
}

export default function DonorInfo({
  formData,
  setFormData,
  setStep,
  showErrors,
  setShowErrors,
}: StepProps) {
  return (
    <div className="form-content-container">
      <div className="flex h-[22px] justify-center items-center gap-[10px] self-stretch">
        <h4>You are donating:</h4>
        <p className="custom-text-2">${formData.amount}</p>
        <button
          className="custom-text-3 !cursor-pointer"
          onClick={() => setStep(1)}
          type="button"
        >
          change
        </button>
      </div>

      <div className="form-sub-container">
        <h4>YOUR INFORMATION</h4>
        {!formData.orgDonate && (
          <Name
            formData={formData}
            setFormData={setFormData}
            showErrors={showErrors}
            setShowErrors={setShowErrors}
          />
        )}

        {formData.orgDonate && (
          <OrgName
            formData={formData}
            setFormData={setFormData}
            showErrors={showErrors}
            setShowErrors={setShowErrors}
          />
        )}

        {/* checkboxes */}
        <div className="flex flex-col items-start gap-[4px] flex-1">
          <div className="checkbox-container">
            <label className="checkbox-container !pr-0">
              <input
                type="checkbox"
                id="anonymous-checkbox"
                className="checkbox"
                checked={formData.anonymous}
                onChange={() =>
                  setFormData(prev => ({
                    ...prev,
                    anonymous: !formData.anonymous,
                  }))
                }
              />

              {!formData.anonymous && <Unchecked />}
              {formData.anonymous && <Checked />}

              <label htmlFor="anonymous-checkbox" className="custom-text-4">
                Hide my name from the public
              </label>
            </label>
            <Help className="flex cursor-pointer" />
          </div>

          <div className="checkbox-container">
            <label className="checkbox-container !pr-0">
              <input
                type="checkbox"
                id="orgDonate-checkbox"
                className="checkbox"
                checked={formData.orgDonate}
                onChange={() =>
                  setFormData(prev => ({
                    ...prev,
                    orgDonate: !formData.orgDonate,
                  }))
                }
              />

              {!formData.orgDonate && <Unchecked />}
              {formData.orgDonate && <Checked />}
              <label htmlFor="orgDonate-checkbox" className="custom-text-4">
                Donate as an organization
              </label>
            </label>
            <Help
              className="flex cursor-pointer"
              onClick={() => console.log('clicked')}
            />
          </div>
        </div>

        {/* address */}
        <Address
          formData={formData}
          setFormData={setFormData}
          showErrors={showErrors}
          setShowErrors={setShowErrors}
        />

        {/* contact first/last name if donate as an org is checked */}
        {formData.orgDonate && (
          <Name
            formData={formData}
            setFormData={setFormData}
            showErrors={showErrors}
            setShowErrors={setShowErrors}
          />
        )}

        {/* email */}
        <Email
          formData={formData}
          setFormData={setFormData}
          showErrors={showErrors}
          setShowErrors={setShowErrors}
        />

        {/* phone number */}
        <Phone formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
}

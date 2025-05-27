import React from 'react';
import Unchecked from '../../../app/icons/checked=no.svg';
import Checked from '../../../app/icons/checked=yes.svg';
import Help from '../../../app/icons/help.svg';
import Name from '../../input-fields/name';
import OrgName from '../../input-fields/orgName';
import Address from '../../input-fields/address';
import Email from '../../input-fields/email';
import Phone from '../../input-fields/phone';
import { DonateFormData, ErrorMap } from '@/declarations';

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
          <div className="flex items-center gap-[8px]">
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

              <span className="custom-text-4 p-neutral">
                Hide my name from the public
              </span>
            </label>
            <Help className="flex cursor-pointer" />
          </div>

          <div className="flex items-center gap-[8px]">
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
              <span className="custom-text-4 p-neutral">
                Donate as an organization
              </span>
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

'use client';

import { ErrorMap, PartnerFormData } from '@/declarations';
import { handleSubmitPartner } from '@/lib/functions/formHandleSubmit';
import '../forms/forms.css';
import { useState } from 'react';
import Name from '../input-fields/name';
import Phone from '../input-fields/phone';
import Email from '../input-fields/email';
import Address from '../input-fields/address';
import YesNo from '../input-fields/yes-no';
import OrgName from '../input-fields/orgName';
import LoadingDots from '../loadingDots';
import FormConfirm from './formConfirm';

export default function PartnerForm() {
  const [formData, setFormData] = useState<PartnerFormData>({
    firstName: '',
    lastName: '',
    orgName: '',
    email: '',
    address: {
      address1: '',
      address2: '',
      country: 'US',
      state: '',
      city: '',
      postalCode: '',
    },
    phone: {
      number: '',
      type: '',
    },
    school: '',
    details: '',
  });

  const [showErrors, setShowErrors] = useState<ErrorMap>({});
  const [confirm, setConfirm] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [loading, setLoading] = useState<boolean>(false);
  const yesNoQ = 'Is this organization a school?';
  const formType = 'partner';

  return (
    <form
      className="form-box"
      onSubmit={async e => {
        const partnerData = await handleSubmitPartner(
          e,
          formData,
          setShowErrors,
          setLoading
        );
        if (!partnerData) return;
        if (partnerData.error) {
          setErrorMessage(partnerData.error);
        } else if (partnerData.partnerFormId) {
          setConfirm(true);
        }
      }}
    >
      {!confirm && !errorMessage && (
        <div className="form-container">
          <div className="form-desc-wrapper">
            <h4>PARTNERSHIP INQUIRY</h4>
            <p className="p4 primary-2">
              Please tell us a bit more about your organization and the type of
              partnership(s) you are interested in through the form below.
            </p>
          </div>
          <div className="form-sub-container">
            <h4>ORGANIZATION INFORMATION</h4>
            <OrgName
              formData={formData}
              setFormData={setFormData}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
              formType={formType}
            />

            <div className="py-1">
              <YesNo
                formData={formData}
                setFormData={setFormData}
                showErrors={showErrors}
                setShowErrors={setShowErrors}
                title={yesNoQ}
                formType={formType}
              />
            </div>

            <Address
              formData={formData}
              setFormData={setFormData}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
              formType={formType}
            />
          </div>
          <div className="form-sub-container">
            <h4>PRIMARY CONTACT PERSON</h4>
            <Name
              formData={formData}
              setFormData={setFormData}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
              formType={formType}
            />

            <Phone
              formData={formData}
              setFormData={setFormData}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
              formType={formType}
            />

            <Email
              formData={formData}
              setFormData={setFormData}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
              formType={formType}
            />
          </div>
          <div className="form-sub-container">
            <h4>DETAILS</h4>
            <div className="input-container">
              <label className="input-sub-container">
                <p className="custom-text">
                  Tell us more <span className="required">*</span>
                </p>
                <div className="flex flex-col w-full">
                  <textarea
                    placeholder="Include details about your request."
                    value={formData.details}
                    rows={5}
                    onChange={e => {
                      setFormData(prev => ({
                        ...prev,
                        details: e.target.value,
                      }));
                      setShowErrors(prev => ({
                        ...prev,
                        details: false,
                      }));
                    }}
                    className={`input-field !h-[6.25rem] resize-none !whitespace-pre-wrap !overflow-y-auto ${
                      showErrors.details && !formData.details.trim()
                        ? 'show-invalid'
                        : ''
                    }`}
                  />
                  <div
                    className={`error-text-container ${
                      showErrors.details && !formData.details.trim()
                        ? 'transition'
                        : ''
                    }`}
                  >
                    <p className="error-text">This field is required</p>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div className="continue-container">
            <button className="continue-btn" type="submit" disabled={loading}>
              <span className="btn flex items-center justify-center w-full">
                {loading ? (
                  <span className="btn flex items-center justify-center w-full">
                    Processing
                    <div className="translate-y-[0.5rem] translate-x-[0.375rem]">
                      <LoadingDots />
                    </div>
                  </span>
                ) : (
                  'Submit'
                )}
              </span>{' '}
            </button>
          </div>
        </div>
      )}
      {confirm && <FormConfirm formType={formType} />}
      {errorMessage && (
        <div className="error-text text-center w-full">{errorMessage}</div>
      )}
    </form>
  );
}

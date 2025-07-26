'use client';

import { ErrorMap, PartnerFormData } from '@/declarations';
import { handleSubmitPartner } from '@/lib/functions/formHandleSubmit';
import { useState } from 'react';
import Name from '../input-fields/name';
import Phone from '../input-fields/phone';
import Email from '../input-fields/email';
import Address from '../input-fields/address';
import YesNo from '../input-fields/yes-no';
import OrgName from '../input-fields/orgName';
import MainButton from '../buttons/mainButton';
import FormConfirm from './formConfirm';
import CustomCheckbox from '../pages/donate/donateCheckbox';
import {
  errorText,
  errorTextContainer,
  errorTextTransition,
  inputContainer,
  inputFieldDefaultColors,
  inputFieldDefaults,
  inputFieldErrorColors,
  inputSubContainer,
  required,
} from '@/lib/classes/input-fields';
import DistrictName from '../input-fields/district';

export default function PartnerForm() {
  const [formData, setFormData] = useState<PartnerFormData>({
    firstName: '',
    lastName: '',
    orgName: '',
    districtName: '',
    gradesServed: {
      middleSchool: '',
      highSchool: '',
    },
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
      className="lg:max-w-[44rem] flex justify-center items-start gap-[1.5rem] py-[2.5rem] lg:py-[5rem] bg-white rounded-[0.625rem] lg:min-h-[48.3125rem]"
      style={{
        paddingLeft: 'clamp(1.5625rem, 5vw, 6.5rem)',
        paddingRight: 'clamp(1.5625rem, 5vw, 6.5rem)',
      }}
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
        <div className="flex flex-col items-start gap-[1.5rem]">
          <div className="flex flex-col justify-center items-start gap-[0.625rem]">
            <h4 className="text-base font-bold">PARTNERSHIP INQUIRY</h4>
            <p className="text-base font-[500] leading-[140%] text-[#3c3c3c]">
              Please tell us a bit more about your organization and the type of
              partnership(s) you are interested in through the form below.
            </p>
          </div>
          <div className="flex w-full flex-col justify-center items-start gap-[0.5rem]">
            <h4 className="text-base font-bold">ORGANIZATION INFORMATION</h4>
            <OrgName
              formData={formData}
              setFormData={setFormData}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
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

            {formData.school === 'yes' && (
              <>
                <DistrictName
                  formData={formData}
                  setFormData={setFormData}
                  showErrors={showErrors}
                  setShowErrors={setShowErrors}
                />

                <div className="flex flex-col items-start gap-[0.5rem] flex-1 justify-center w-full py-[0.5rem]">
                  <p className="text-[0.9375rem] leading-[1.25rem]">
                    Grade levels served <span className={required}>*</span>
                  </p>
                  <div className="flex flex-col">
                    <div className="flex flex-col items-start gap-[0.5rem] w-full lg:flex-row">
                      <CustomCheckbox
                        id="middle-school-checkbox"
                        checked={formData.gradesServed.middleSchool === 'yes'}
                        onChange={() => {
                          setShowErrors(prev => ({
                            ...prev,
                            gradesServed: false,
                          }));
                          setFormData(prev => ({
                            ...prev,
                            gradesServed: {
                              ...prev.gradesServed,
                              middleSchool:
                                formData.gradesServed.middleSchool === 'yes'
                                  ? ''
                                  : 'yes',
                            },
                          }));
                        }}
                        label="6 to 8"
                      />
                      <CustomCheckbox
                        id="high-school-checkbox"
                        checked={formData.gradesServed.highSchool === 'yes'}
                        onChange={() => {
                          setShowErrors(prev => ({
                            ...prev,
                            gradesServed: false,
                          }));
                          setFormData(prev => ({
                            ...prev,
                            gradesServed: {
                              ...prev.gradesServed,
                              highSchool:
                                formData.gradesServed.highSchool === 'yes'
                                  ? ''
                                  : 'yes',
                            },
                          }));
                        }}
                        label="9 to 12"
                      />
                    </div>
                    <div
                      className={`${errorTextContainer} ${
                        showErrors.gradesServed ? errorTextTransition : ''
                      }`}
                    >
                      <p className={errorText}>This field is required</p>
                    </div>
                  </div>
                  <div
                    className={`${errorTextContainer} mt-[-0.375rem] ${
                      showErrors.AoI ? { errorTextTransition } : ''
                    }`}
                  >
                    <p className={errorText}>
                      Please select grade levels served.
                    </p>
                  </div>
                </div>
              </>
            )}

            <Address
              formData={formData}
              setFormData={setFormData}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
              formType={formType}
            />
          </div>
          <div className="flex w-full flex-col justify-center items-start gap-[0.5rem]">
            <h4 className="text-base font-bold">PRIMARY CONTACT PERSON</h4>
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
          <div className="flex w-full flex-col justify-center items-start gap-[0.5rem]">
            <h4 className="text-base font-bold">DETAILS</h4>
            <div className={inputContainer}>
              <label className={inputSubContainer}>
                <p className="text-[0.9375rem] font-[400] leading-[1.25rem]">
                  Tell us more <span className={required}>*</span>
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
                    className={`${inputFieldDefaults} !h-[6.25rem] resize-none !whitespace-pre-wrap !overflow-y-auto ${
                      showErrors.details && !formData.details.trim()
                        ? inputFieldErrorColors
                        : inputFieldDefaultColors
                    }`}
                  />
                  <div
                    className={`${errorTextContainer} ${
                      showErrors.details && !formData.details.trim()
                        ? errorTextTransition
                        : ''
                    }`}
                  >
                    <p className={errorText}>This field is required</p>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <MainButton
            color="orange"
            width="fill"
            submit={{
              disabled: loading,
              label: 'Submit',
              loading: loading,
            }}
          />
        </div>
      )}
      {confirm && <FormConfirm formType={formType} />}
      {errorMessage && (
        <div className={`${errorText} error-text text-center w-full`}>
          {errorMessage}
        </div>
      )}
    </form>
  );
}

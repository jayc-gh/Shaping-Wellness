'use client';

import { ErrorMap, VolunteerFormData } from '@/declarations';
import { handleSubmitVolunteer } from '@/lib/functions/formHandleSubmit';
import { useState } from 'react';
import Name from '../input-fields/name';
import Phone from '../input-fields/phone';
import Email from '../input-fields/email';
import Address from '../input-fields/address';
import DOB from '../input-fields/DOB';
import Unchecked from '../../app/icons/checked=no.svg';
import Checked from '../../app/icons/checked=yes.svg';
import YesNo from '../input-fields/yes-no';
import FormConfirm from './formConfirm';
import MainButton from '../buttons/mainButton';
import {
  checkboxContainer,
  errorText,
  errorTextContainer,
  errorTextTransition,
  inputContainer,
  inputLabelText,
  inputSubContainer,
  required,
} from '@/lib/classes/input-fields';

export default function VolunteerForm() {
  const [formData, setFormData] = useState<VolunteerFormData>({
    firstName: '',
    lastName: '',
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
    DOB: {
      month: '',
      day: '',
      year: '',
    },
    AoI: {
      programCoord: '',
      expertWorkshop: '',
      mentor: '',
    },
    volunteerHours: '',
  });
  const [confirm, setConfirm] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [showErrors, setShowErrors] = useState<ErrorMap>({});
  const [loading, setLoading] = useState<boolean>(false);
  const yesNoQ = 'Do you need volunteer hours?';
  const formType = 'volunteer';
  return (
    <form
      className="lg:max-w-[44rem] flex justify-center items-start gap-[1.5rem] py-[2.5rem] lg:py-[5rem] bg-white rounded-[0.625rem]"
      style={{
        paddingLeft: 'clamp(1.5625rem, 5vw, 6.5rem)',
        paddingRight: 'clamp(1.5625rem, 5vw, 6.5rem)',
      }}
      onSubmit={async e => {
        const volunteerData = await handleSubmitVolunteer(
          e,
          formData,
          setShowErrors,
          setLoading
        );
        if (!volunteerData) return;
        if (volunteerData.error) {
          setErrorMessage(volunteerData.error);
        } else if (volunteerData.volunteerFormId) {
          setConfirm(true);
        }
      }}
    >
      {!confirm && !errorMessage && (
        <div className="flex flex-col items-start gap-[1.5rem]">
          <div className="flex flex-col py-[0.625rem] justify-center items-start gap-[0.625rem]">
            <h4 className="text-base font-bold">VOLUNTEER APPLICATION</h4>
            <p className="text-base font-[500] leading-[140%] text-[#3c3c3c]">
              Please complete the form below to tell us more about yourself and
              how you&apos;d like to get involved.
            </p>
          </div>
          <div className="flex flex-col w-full justify-center items-start gap-[0.5rem]">
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

            <DOB
              formData={formData}
              setFormData={setFormData}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
              formType={formType}
            />

            <Address
              formData={formData}
              setFormData={setFormData}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
              formType={formType}
            />
            {/* area of interest checkboxes */}
            <div className={inputSubContainer}>
              <p className={inputLabelText}>
                Area of Interest <span className={required}>*</span>
              </p>
              <div className="flex flex-col">
                <div className={inputContainer}>
                  <label
                    className={checkboxContainer}
                    htmlFor="program-coordination-checkbox"
                  >
                    <input
                      type="checkbox"
                      id="program-coordination-checkbox"
                      className="sr-only"
                      checked={formData.AoI.programCoord === 'yes'}
                      onChange={() => {
                        setShowErrors(prev => ({
                          ...prev,
                          AoI: false,
                        }));
                        setFormData(prev => ({
                          ...prev,
                          AoI: {
                            ...prev.AoI,
                            programCoord:
                              formData.AoI.programCoord === 'yes' ? '' : 'yes',
                          },
                        }));
                      }}
                    />
                    {!formData.AoI.programCoord ? <Unchecked /> : <Checked />}
                    <span className="text-[0.875rem] font-[500] leading-[1.25rem]">
                      Program Coordination
                    </span>
                  </label>
                  <label
                    className={checkboxContainer}
                    htmlFor="expert-workshop-checkbox"
                  >
                    <input
                      type="checkbox"
                      id="expert-workshop-checkbox"
                      className="sr-only"
                      checked={formData.AoI.expertWorkshop === 'yes'}
                      onChange={() => {
                        setShowErrors(prev => ({
                          ...prev,
                          AoI: false,
                        }));
                        setFormData(prev => ({
                          ...prev,
                          AoI: {
                            ...prev.AoI,
                            expertWorkshop:
                              formData.AoI.expertWorkshop === 'yes'
                                ? ''
                                : 'yes',
                          },
                        }));
                      }}
                    />
                    {!formData.AoI.expertWorkshop ? <Unchecked /> : <Checked />}
                    <span className="text-[0.875rem] font-[500] leading-[1.25rem]">
                      Expert Workshop
                    </span>
                  </label>
                  <label
                    className={checkboxContainer}
                    htmlFor="mentor-checkbox"
                  >
                    <input
                      type="checkbox"
                      id="mentor-checkbox"
                      className="sr-only"
                      checked={formData.AoI.mentor === 'yes'}
                      onChange={() => {
                        setShowErrors(prev => ({
                          ...prev,
                          AoI: false,
                        }));
                        setFormData(prev => ({
                          ...prev,
                          AoI: {
                            ...prev.AoI,
                            mentor: formData.AoI.mentor === 'yes' ? '' : 'yes',
                          },
                        }));
                      }}
                    />
                    {!formData.AoI.mentor ? <Unchecked /> : <Checked />}
                    <span className="text-[0.875rem] font-[500] leading-[1.25rem]">
                      Mentor
                    </span>
                  </label>
                </div>
                <div
                  className={`${errorTextContainer} mt-[-0.375rem] ${
                    showErrors.AoI ? { errorTextTransition } : ''
                  }`}
                >
                  <p className={errorText}>Please select an area of interest</p>
                </div>
              </div>
            </div>
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
        <div className={`${errorText} text-center w-full`}>{errorMessage}</div>
      )}
    </form>
  );
}

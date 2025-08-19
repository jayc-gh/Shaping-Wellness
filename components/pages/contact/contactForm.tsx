'use client';

import { useState } from 'react';
import { validateEmailFormat } from '@/lib/functions/validateFunctions';
import { handleSubmitContact } from '@/lib/functions/formHandleSubmit';
import { ContactFormData } from '@/declarations';
import FormConfirm from '@/components/forms/formConfirm';
import Name from '@/components/input-fields/name';
import { ErrorMap } from '@/declarations';
import Email from '@/components/input-fields/email';
import {
  errorText,
  inputContainer,
  inputFieldDefaultColors,
  inputFieldDefaults,
  inputLabelText,
  inputSubContainer,
  required,
} from '@/lib/classes/input-fields';
import MainButton from '@/components/buttons/mainButton';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    details: '',
  });
  const [showErrors, setShowErrors] = useState<ErrorMap>({});
  const [confirm, setConfirm] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [loading, setLoading] = useState<boolean>(false);
  const formType = 'contact';

  return (
    <form
      className="flex py-[2.5rem] px-[1.5rem] justify-center items-start bg-white gap-[1.5rem] rounded-[0.625rem] lg:max-w-[44rem] lg:py-[5rem] lg:px-[6.5rem]"
      onSubmit={async e => {
        const contactData = await handleSubmitContact(e, formData, setLoading);
        if (!contactData) return;
        if (contactData.error) {
          setErrorMessage(contactData.error);
        } else if (contactData.messageId) {
          setConfirm(true);
        }
      }}
    >
      {!confirm && !errorMessage && (
        <div className="flex flex-col justify-center items-start gap-[1.5rem]">
          <h4 className="text-base font-bold">CONTACT FORM</h4>
          <p className="text-base font-[500] leading-[170%] lg:leading-[140%]">
            Have a question or need more information? Fill out the form, and our
            team will get back to you as soon as possible.
          </p>
          <div className="flex flex-col justify-center items-start gap-[0.5rem] w-full">
            <Name
              formData={formData}
              setFormData={setFormData}
              formType="contact"
            />
            <Email
              formData={formData}
              setFormData={setFormData}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
              formType="contact"
            />

            <div className={inputContainer}>
              <label className={inputSubContainer}>
                <p className={inputLabelText}>
                  How can we help? <span className={required}>*</span>
                </p>
                <textarea
                  value={formData.details}
                  className={`${inputFieldDefaults} ${inputFieldDefaultColors} !h-[4.75rem] resize-none !whitespace-pre-wrap !overflow-y-auto`}
                  rows={3}
                  onChange={e => {
                    setFormData(prev => ({
                      ...prev,
                      details: e.target.value,
                    }));
                  }}
                />
              </label>
            </div>
          </div>
          <MainButton
            color="orange"
            width="fill"
            submit={{
              disabled:
                !formData.firstName ||
                !formData.lastName ||
                !formData.email ||
                !formData.details ||
                !validateEmailFormat(formData.email) ||
                loading,
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

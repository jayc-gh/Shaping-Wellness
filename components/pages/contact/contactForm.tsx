'use client';

import './contactForm.css';
import '../../forms/forms.css';
import { useState } from 'react';
import { validateEmailFormat } from '@/lib/functions/validateFunctions';
import { handleSubmitContact } from '@/lib/functions/formHandleSubmit';
import { ContactFormData } from '@/declarations';
import LoadingDots from '@/components/loadingDots';
import FormConfirm from '@/components/forms/formConfirm';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    details: '',
  });
  const [emailError, setEmailError] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [loading, setLoading] = useState<boolean>(false);
  const formType = 'contact';

  return (
    <form
      className="contact-form-box"
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
        <div className="contact-form-wrapper">
          <h4>CONTACT FORM</h4>
          <p className="p4">
            Have a question or need more information? Fill out the form, and our
            team will get back to you as soon as possible.
          </p>
          <div className="form-sub-container">
            <div className="input-container">
              <label className="input-sub-container">
                <p className="custom-text">
                  First name <span className="required">*</span>
                </p>
                <input
                  value={formData.firstName}
                  className="input-field"
                  onChange={e => {
                    setFormData(prev => ({
                      ...prev,
                      firstName: e.target.value,
                    }));
                  }}
                />
              </label>
              <label className="input-sub-container">
                <p className="custom-text">
                  Last name <span className="required">*</span>
                </p>
                <input
                  value={formData.lastName}
                  className="input-field"
                  onChange={e => {
                    setFormData(prev => ({
                      ...prev,
                      lastName: e.target.value,
                    }));
                  }}
                />
              </label>
            </div>
            <div className="input-container">
              <label className="input-sub-container">
                <p className="custom-text">
                  Email <span className="required">*</span>
                </p>
                <div className="flex flex-col w-full">
                  <input
                    value={formData.email}
                    className={`input-field ${
                      emailError &&
                      !validateEmailFormat(formData.email) &&
                      formData.email
                        ? 'show-invalid'
                        : ''
                    }`}
                    onChange={e => {
                      setFormData(prev => ({
                        ...prev,
                        email: e.target.value,
                      }));
                      setEmailError(false);
                    }}
                    onBlur={() => {
                      if (formData.email)
                        setEmailError(!validateEmailFormat(formData.email));
                    }}
                  />
                  <div
                    className={`error-text-container ${
                      emailError && !validateEmailFormat(formData.email)
                        ? 'transition'
                        : ''
                    }`}
                  >
                    {formData.email ? (
                      <p className="error-text">
                        Please enter in the format: email@domain.com
                      </p>
                    ) : null}
                  </div>
                </div>
              </label>
            </div>
            <div className="input-container">
              <label className="input-sub-container">
                <p className="custom-text">
                  How can we help? <span className="required">*</span>
                </p>
                <textarea
                  value={formData.details}
                  className="input-field !h-[76px] resize-none !whitespace-pre-wrap !overflow-y-auto"
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
          <div className="continue-container">
            <button
              className="continue-btn"
              type="submit"
              disabled={
                !formData.firstName ||
                !formData.lastName ||
                !formData.email ||
                !formData.details ||
                !validateEmailFormat(formData.email) ||
                loading
              }
            >
              <span className="btn flex items-center justify-center w-full">
                {loading ? (
                  <span className="btn flex items-center justify-center w-full">
                    Processing
                    <div className="translate-y-[8px] translate-x-[6px]">
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

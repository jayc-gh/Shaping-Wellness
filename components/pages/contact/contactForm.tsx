'use client';

import './contactForm.css';
import '../../forms/forms.css';
import { useState } from 'react';
import { validateEmailFormat } from '@/lib/functions/validateFunctions';

export default function ContactForm() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  return (
    <form className="contact-form-box">
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
                value={firstName}
                className="input-field"
                onChange={e => {
                  setFirstName(e.target.value);
                }}
              />
            </label>
            <label className="input-sub-container">
              <p className="custom-text">
                Last name <span className="required">*</span>
              </p>
              <input
                value={lastName}
                className="input-field"
                onChange={e => {
                  setLastName(e.target.value);
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
                  value={email}
                  className={`input-field ${
                    emailError && !validateEmailFormat(email) && email
                      ? 'show-invalid'
                      : ''
                  }`}
                  onChange={e => {
                    setEmail(e.target.value);
                    setEmailError(false);
                  }}
                  onBlur={() => {
                    if (email) setEmailError(!validateEmailFormat(email));
                  }}
                />
                <div
                  className={`error-text-container ${
                    emailError && !validateEmailFormat(email)
                      ? 'transition'
                      : ''
                  }`}
                >
                  {email ? (
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
                value={message}
                className="input-field !h-[76px] resize-none !whitespace-pre-wrap !overflow-y-auto"
                rows={3}
                onChange={e => {
                  setMessage(e.target.value);
                }}
              />
            </label>
          </div>
        </div>
        <button
          className="continue-btn"
          type="submit"
          disabled={
            !firstName ||
            !lastName ||
            !email ||
            !message ||
            !validateEmailFormat(email)
          }
        >
          <span className="btn">Send message</span>
        </button>
      </div>
    </form>
  );
}

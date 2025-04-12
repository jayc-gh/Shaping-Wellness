'use client';

import React, { useState } from 'react';
import { FormInfo } from './donationForm';
import { formatPhoneNumber, validateEmailFormat } from '@/lib/functions';
import { Country, State, IState } from 'country-state-city';
import Unchecked from '../app/icons/check_box.svg';
import Checked from '../app/icons/checked=yes.svg';
import QuestionMark from '../app/icons/questionmark.svg';

interface StepProps {
  formData: FormInfo;
  setFormData: React.Dispatch<React.SetStateAction<FormInfo>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function DonorInfo({
  formData,
  setFormData,
  setStep,
}: StepProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [states, setStates] = useState<IState[]>(
    State.getStatesOfCountry(formData.country)
  );
  const countries = Country.getAllCountries();
  const handleCountryChange = (country: string) => {
    setStates(State.getStatesOfCountry(country));
    setFormData({ ...formData, country: country, state: '' });
  };

  const handleBlur = () => {
    setIsFocused(!isFocused);
  };

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
        {/* First name last name / org name */}
        {!formData.orgDonate && (
          <div className="input-container">
            <label className="input-sub-container">
              <p className="custom-text">
                First Name <span className="required">*</span>
              </p>
              <input
                type="text"
                value={formData.firstName}
                onChange={e =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
                className="input-field"
              />
            </label>

            <label className="input-sub-container">
              <p className="custom-text">
                Last Name <span className="required">*</span>
              </p>
              <input
                type="text"
                value={formData.lastName}
                onChange={e =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
                className="input-field"
              />
            </label>
          </div>
        )}

        {formData.orgDonate && (
          <div className="input-container">
            <label className="input-sub-container">
              <p className="custom-text">
                Organization Name <span className="required">*</span>
              </p>
              <input
                type="text"
                value={formData.orgName}
                onChange={e =>
                  setFormData({ ...formData, orgName: e.target.value })
                }
                required
                className="input-field"
              />
            </label>
          </div>
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
                  setFormData({ ...formData, anonymous: !formData.anonymous })
                }
              />

              {!formData.anonymous && <Unchecked />}
              {formData.anonymous && <Checked />}

              <label htmlFor="anonymous-checkbox" className="custom-text-4">
                Hide my name from the public
              </label>
            </label>
            <QuestionMark
              className="flex pt-[11px] cursor-pointer"
              onClick={() => console.log('clicked')}
            />
          </div>

          <div className="checkbox-container">
            <label className="checkbox-container !pr-0">
              <input
                type="checkbox"
                id="orgDonate-checkbox"
                className="checkbox"
                checked={formData.orgDonate}
                onChange={() =>
                  setFormData({ ...formData, orgDonate: !formData.orgDonate })
                }
              />
              {!formData.orgDonate && <Unchecked />}
              {formData.orgDonate && <Checked />}
              <label htmlFor="orgDonate-checkbox" className="custom-text-4">
                Donate as an organization
              </label>
            </label>
            <QuestionMark
              className="flex pt-[11px] cursor-pointer"
              onClick={() => console.log('clicked')}
            />
          </div>
        </div>

        {/* address */}
        <label className="flex flex-col gap-2 text-left mb-2">
          {formData.orgDonate ? (
            <span>Organization Address 1 *</span>
          ) : (
            <span>Address *</span>
          )}
          <input
            type="address1"
            value={formData.address1}
            onChange={e => {
              setFormData({ ...formData, address1: e.target.value });
            }}
            required
            placeholder="Address 1"
            className="border"
          />

          <input
            type="address2"
            value={formData.address2}
            onChange={e => {
              setFormData({ ...formData, address2: e.target.value });
            }}
            placeholder="Address 2 (apt, suite, etc)"
            className="border"
          />
        </label>

        <div className="flex gap-4 mb-2">
          <label className="flex flex-col gap-2 text-left flex-1 min-w-0">
            <select
              className="border"
              value={formData.country}
              onChange={e => handleCountryChange(e.target.value)}
            >
              {countries.map(country => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name} ({country.isoCode})
                </option>
              ))}
            </select>
          </label>
          {formData.country === 'US' ? (
            <label className="flex flex-col gap-2 text-left flex-1 min-w-0">
              <select
                className="border"
                value={formData.state}
                required
                onChange={e =>
                  setFormData({ ...formData, state: e.target.value })
                }
              >
                <option value="" disabled={formData.state !== ''}>
                  State
                </option>{' '}
                {states.map(state => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name} ({state.isoCode})
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <label className="flex flex-col gap-2 text-left flex-1 min-w-0">
              <input
                type="text"
                value={formData.state}
                required
                onChange={e =>
                  setFormData({ ...formData, state: e.target.value })
                }
                placeholder="State/Province/Region"
                className="border"
              />
            </label>
          )}
        </div>

        <div className="flex gap-4 mb-2">
          <label className="flex flex-col gap-2 text-left flex-1 min-w-0">
            <input
              type="text"
              value={formData.postalCode}
              onChange={e =>
                setFormData({ ...formData, postalCode: e.target.value })
              }
              required
              placeholder="Zip/Postal Code"
              className="border"
            />
          </label>
          <label className="flex flex-col gap-2 text-left flex-1 min-w-0">
            <input
              type="text"
              value={formData.city}
              onChange={e => setFormData({ ...formData, city: e.target.value })}
              required
              placeholder="City"
              className="border"
            />
          </label>
        </div>
        {/* contact first/last name if donate as an org is checked */}
        {formData.orgDonate && (
          <div className="flex gap-4 mb-2">
            <label className="flex flex-col gap-2 text-left flex-1 min-w-0">
              Contact First Name *
              <input
                type="text"
                value={formData.firstName}
                onChange={e =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
                className="border"
              />
            </label>

            <label className="flex flex-col gap-2 text-left flex-1 min-w-0">
              Contact Last Name *
              <input
                type="text"
                value={formData.lastName}
                onChange={e =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
                className="border"
              />
            </label>
          </div>
        )}

        <div className="flex flex-col gap-2 mb-6">
          {/* email */}
          <label className="flex flex-col gap-2 text-left">
            {formData.orgDonate ? (
              <span>Contact Email *</span>
            ) : (
              <span>Email *</span>
            )}
            <input
              type="email"
              value={formData.email}
              onChange={e => {
                setFormData({ ...formData, email: e.target.value });
              }}
              onBlur={handleBlur}
              onFocus={handleBlur}
              required
              className="border"
            />
            {!isFocused &&
              !validateEmailFormat(formData.email) &&
              formData.email && (
                <span className="text-red-500 text-xs">
                  Please enter in the format: email@domain.com
                </span>
              )}
          </label>

          {/* phone number */}
          <label className="flex flex-col gap-2 text-left mb-6">
            {formData.orgDonate ? (
              <span>Contact Phone Number (optional)</span>
            ) : (
              <span>Phone Number (optional)</span>
            )}
            <input
              type="tel"
              value={formData.phone}
              onChange={e => {
                const formattedPhone = formatPhoneNumber(e.target.value);
                setFormData({ ...formData, phone: formattedPhone });
              }}
              placeholder="(000) 000-0000"
              className="border rounded-md p-2"
            />
          </label>
        </div>
        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="w-55 h-10 border cursor-pointer rounded-md"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

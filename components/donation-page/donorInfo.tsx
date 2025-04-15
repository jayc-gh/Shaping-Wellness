'use client';

import React, { useState } from 'react';
import { FormInfo } from './donationForm';
import { formatPhoneNumber, validateEmailFormat } from '@/lib/functions';
import { Country, State, IState } from 'country-state-city';
import Unchecked from '../../app/icons/check_box.svg';
import Checked from '../../app/icons/checked=yes.svg';
import Help from '../../app/icons/help.svg';

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
            <Help
              className="flex cursor-pointer"
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
            <Help
              className="flex cursor-pointer"
              onClick={() => console.log('clicked')}
            />
          </div>
        </div>

        {/* address */}
        <div className="form-sub-container">
          <div className="input-container">
            <label className="input-sub-container">
              {formData.orgDonate ? (
                <p className="custom-text">
                  Organization Address <span className="required">*</span>
                </p>
              ) : (
                <p className="custom-text">
                  Address <span className="required">*</span>
                </p>
              )}
              <input
                type="address1"
                value={formData.address1}
                onChange={e => {
                  setFormData({ ...formData, address1: e.target.value });
                }}
                required
                placeholder="Address 1"
                className="input-field"
              />

              <input
                type="address2"
                value={formData.address2}
                onChange={e => {
                  setFormData({ ...formData, address2: e.target.value });
                }}
                placeholder="Address 2 (apt, suite, etc)"
                className="input-field"
              />
            </label>
          </div>

          <div className="input-container">
            <label className="input-sub-container">
              <select
                className="input-field"
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
              <label className="input-sub-container">
                <select
                  className="input-field"
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
              <label className="input-sub-container">
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

          <div className="input-container">
            <label className="input-sub-container">
              <input
                type="text"
                value={formData.postalCode}
                onChange={e =>
                  setFormData({ ...formData, postalCode: e.target.value })
                }
                required
                placeholder="Zip/Postal Code"
                className="input-field"
              />
            </label>
            <label className="input-sub-container">
              <input
                type="text"
                value={formData.city}
                onChange={e =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
                placeholder="City"
                className="input-field"
              />
            </label>
          </div>
        </div>
        {/* contact first/last name if donate as an org is checked */}
        {formData.orgDonate && (
          <div className="input-container">
            <label className="input-sub-container">
              Contact First Name *
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
              Contact Last Name *
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

        <div className="input-container">
          {/* email */}
          <label className="input-sub-container">
            {formData.orgDonate ? (
              <p>
                Contact Email <span className="required">*</span>
              </p>
            ) : (
              <p>
                Email <span className="required">*</span>
              </p>
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
              className="input-field"
            />
            {!isFocused &&
              !validateEmailFormat(formData.email) &&
              formData.email && (
                <span className="text-red-500 text-xs">
                  Please enter in the format: email@domain.com
                </span>
              )}
          </label>
        </div>
        <div className="input-container">
          {/* phone number */}
          <label className="input-sub-container">
            {formData.orgDonate ? (
              <p>Contact Phone Number (optional)</p>
            ) : (
              <p>Phone Number (optional)</p>
            )}
            <input
              type="tel"
              value={formData.phone}
              onChange={e => {
                const formattedPhone = formatPhoneNumber(e.target.value);
                setFormData({ ...formData, phone: formattedPhone });
              }}
              placeholder="(000) 000-0000"
              className="input-field"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

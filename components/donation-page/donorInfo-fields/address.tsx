'use client';

import React, { useState } from 'react';
import { FormInfo, ErrorMap } from '../donationForm';
import { Country, State, IState } from 'country-state-city';
import ArrowDown from '../../../app/icons/Arrow-down.svg';

interface StepProps {
  formData: FormInfo;
  setFormData: React.Dispatch<React.SetStateAction<FormInfo>>;
  showErrors: ErrorMap;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
}

export default function Address({
  formData,
  setFormData,
  showErrors,
  setShowErrors,
}: StepProps) {
  const [states, setStates] = useState<IState[]>(
    State.getStatesOfCountry(formData.country)
  );
  const countries = Country.getAllCountries();
  const handleCountryChange = (country: string) => {
    setStates(State.getStatesOfCountry(country));
    setFormData(prev => ({
      ...prev,
      country: country,
      state: '',
    }));
  };
  return (
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
          <div className="flex flex-col w-full gap-[8px]">
            <div className="flex flex-col">
              <input
                type="address1"
                value={formData.address1}
                onChange={e => {
                  setFormData(prev => ({
                    ...prev,
                    address1: e.target.value,
                  }));
                  setShowErrors(prev => ({
                    ...prev,
                    address1: false,
                  }));
                }}
                placeholder="Address 1"
                className={`input-field ${
                  showErrors.address1 && !formData.address1.trim()
                    ? 'show-invalid'
                    : ''
                }`}
              />
              <div
                className={`error-text-container ${
                  showErrors.address1 && !formData.address1.trim()
                    ? 'transition'
                    : ''
                }`}
              >
                <p className="error-text">Street Address is required</p>
              </div>
            </div>

            <input
              type="address2"
              value={formData.address2}
              onChange={e => {
                setFormData(prev => ({
                  ...prev,
                  address2: e.target.value,
                }));
              }}
              placeholder="Address 2 (apt, suite, etc)"
              className="input-field"
            />
          </div>
        </label>
      </div>

      <div className="input-container">
        <label className="input-sub-container">
          <div className="flex flex-col">
            <div className="relative w-full">
              <select
                className={`input-field ${
                  showErrors.country && !formData.country.trim()
                    ? 'show-invalid'
                    : ''
                } !pr-8`}
                value={formData.country}
                onChange={e => {
                  handleCountryChange(e.target.value);
                  setShowErrors(prev => ({
                    ...prev,
                    country: false,
                  }));
                }}
              >
                {countries.map(country => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name} ({country.isoCode})
                  </option>
                ))}
              </select>
              <ArrowDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
            <div
              className={`error-text-container ${
                showErrors.country && !formData.country.trim()
                  ? 'transition'
                  : ''
              }`}
            >
              <p className="error-text">Country is required</p>
            </div>
          </div>
        </label>
        {formData.country === 'US' ? (
          <label className="input-sub-container">
            <div className="flex flex-col">
              <div className="relative w-full">
                <select
                  className={`input-field !pr-8 ${
                    showErrors.state && !formData.state.trim()
                      ? 'show-invalid'
                      : ''
                  }`}
                  value={formData.state}
                  onChange={e => {
                    setFormData(prev => ({
                      ...prev,
                      state: e.target.value,
                    }));
                    setShowErrors(prev => ({
                      ...prev,
                      state: false,
                    }));
                  }}
                >
                  <option value="" disabled selected hidden>
                    Select a State
                  </option>
                  {states.map(state => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name} ({state.isoCode})
                    </option>
                  ))}
                </select>
                <ArrowDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
              <div
                className={`error-text-container ${
                  showErrors.state && !formData.state.trim() ? 'transition' : ''
                }`}
              >
                <p className="error-text">State is required</p>
              </div>
            </div>
          </label>
        ) : (
          <label className="input-sub-container">
            <input
              type="text"
              value={formData.state}
              onChange={e => {
                setFormData(prev => ({
                  ...prev,
                  state: e.target.value,
                }));
                setShowErrors(prev => ({
                  ...prev,
                  state: false,
                }));
              }}
              placeholder="State/Province/Region"
              className={`input-field ${
                showErrors.state && !formData.state.trim() ? 'show-invalid' : ''
              }`}
            />
            <div
              className={`error-text-container ${
                showErrors.state && !formData.state.trim() ? 'transition' : ''
              }`}
            >
              <p className="error-text">State is required</p>
            </div>
          </label>
        )}
      </div>

      <div className="input-container">
        <label className="input-sub-container">
          <div className="flex flex-col">
            <input
              type="text"
              value={formData.postalCode}
              onChange={e => {
                setFormData(prev => ({
                  ...prev,
                  postalCode: e.target.value,
                }));
                setShowErrors(prev => ({
                  ...prev,
                  postalCode: false,
                }));
              }}
              placeholder="Zip/Postal Code"
              className={`input-field ${
                showErrors.postalCode && !formData.postalCode.trim()
                  ? 'show-invalid'
                  : ''
              }`}
            />
            <div
              className={`error-text-container ${
                showErrors.postalCode && !formData.postalCode.trim()
                  ? 'transition'
                  : ''
              }`}
            >
              <p className="error-text">Zip/Postal Code is required</p>
            </div>
          </div>
        </label>
        <label className="input-sub-container">
          <div className="flex flex-col">
            <input
              type="text"
              value={formData.city}
              onChange={e => {
                setFormData(prev => ({
                  ...prev,
                  city: e.target.value,
                }));
                setShowErrors(prev => ({
                  ...prev,
                  city: false,
                }));
              }}
              placeholder="City"
              className={`input-field ${
                showErrors.city && !formData.city.trim() ? 'show-invalid' : ''
              }`}
            />
            <div
              className={`error-text-container ${
                showErrors.city && !formData.city.trim() ? 'transition' : ''
              }`}
            >
              <p className="error-text">City is required</p>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import type { ErrorMap, Address } from '@/declarations';
import { Country, State, IState } from 'country-state-city';
import ArrowDown from '../../app/icons/Arrow-down.svg';

type AddressFields = {
  orgDonate?: boolean;
  address: Address;
};

interface StepProps<T extends AddressFields> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  showErrors: ErrorMap;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
  formType: string;
}

export default function Address<T extends AddressFields>({
  formData,
  setFormData,
  showErrors,
  setShowErrors,
  formType,
}: StepProps<T>) {
  const [states, setStates] = useState<IState[]>(
    State.getStatesOfCountry(formData.address.country)
  );
  const countries = Country.getAllCountries();
  const handleCountryChange = (country: string) => {
    setStates(State.getStatesOfCountry(country));
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        country: country,
        state: '',
      },
    }));
  };

  return (
    <div className="input-sub-container">
      {formData.orgDonate &&
      (formType === 'donate' || formType === 'partner') ? (
        <p className="custom-text">
          Organization Address <span className="required">*</span>
        </p>
      ) : (
        <p className="custom-text">
          Address <span className="required">*</span>
        </p>
      )}
      <div className="form-sub-container">
        <div className="input-container">
          <div className="flex flex-col w-full gap-[8px]">
            <div className="flex flex-col">
              <input
                type="address1"
                value={formData.address.address1}
                onChange={e => {
                  setFormData(prev => ({
                    ...prev,
                    address: { ...prev.address, address1: e.target.value },
                  }));
                  setShowErrors(prev => ({
                    ...prev,
                    address1: false,
                  }));
                }}
                placeholder="Address 1"
                className={`input-field ${
                  showErrors.address1 && !formData.address.address1.trim()
                    ? 'show-invalid'
                    : ''
                }`}
              />
              <div
                className={`error-text-container ${
                  showErrors.address1 && !formData.address.address1.trim()
                    ? 'transition'
                    : ''
                }`}
              >
                <p className="error-text">Street Address is required</p>
              </div>
            </div>

            <input
              type="address2"
              value={formData.address.address2}
              onChange={e => {
                setFormData(prev => ({
                  ...prev,
                  address: { ...prev.address, address2: e.target.value },
                }));
              }}
              placeholder="Address 2 (apt, suite, etc)"
              className="input-field"
            />
          </div>
        </div>

        <div className="input-container">
          <div className="flex flex-col w-full">
            <div className="relative">
              <select
                className={`input-field ${
                  showErrors.country && !formData.address.country.trim()
                    ? 'show-invalid'
                    : ''
                } !pr-8`}
                value={formData.address.country}
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
                showErrors.country && !formData.address.country.trim()
                  ? 'transition'
                  : ''
              }`}
            >
              <p className="error-text">Country is required</p>
            </div>
          </div>
          {formData.address.country === 'US' ? (
            <div className="flex flex-col w-full">
              <div className="relative">
                <select
                  className={`input-field !pr-8 ${
                    showErrors.state && !formData.address.state.trim()
                      ? 'show-invalid'
                      : ''
                  }`}
                  value={formData.address.state}
                  onChange={e => {
                    setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, state: e.target.value },
                    }));
                    setShowErrors(prev => ({
                      ...prev,
                      state: false,
                    }));
                  }}
                >
                  <option value="" disabled hidden>
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
                  showErrors.state && !formData.address.state.trim()
                    ? 'transition'
                    : ''
                }`}
              >
                <p className="error-text">State is required</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full">
              <div className="relative">
                <input
                  type="text"
                  value={formData.address.state}
                  onChange={e => {
                    setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, state: e.target.value },
                    }));
                    setShowErrors(prev => ({
                      ...prev,
                      state: false,
                    }));
                  }}
                  placeholder="State/Province/Region"
                  className={`input-field ${
                    showErrors.state && !formData.address.state.trim()
                      ? 'show-invalid'
                      : ''
                  }`}
                />
              </div>
              <div
                className={`error-text-container ${
                  showErrors.state && !formData.address.state.trim()
                    ? 'transition'
                    : ''
                }`}
              >
                <p className="error-text">State is required</p>
              </div>
            </div>
          )}
        </div>

        <div className="input-container">
          <div className="flex flex-col">
            <input
              type="text"
              value={formData.address.postalCode}
              onChange={e => {
                setFormData(prev => ({
                  ...prev,
                  address: { ...prev.address, postalCode: e.target.value },
                }));
                setShowErrors(prev => ({
                  ...prev,
                  postalCode: false,
                }));
              }}
              placeholder="Zip/Postal Code"
              className={`input-field ${
                showErrors.postalCode && !formData.address.postalCode.trim()
                  ? 'show-invalid'
                  : ''
              }`}
            />
            <div
              className={`error-text-container ${
                showErrors.postalCode && !formData.address.postalCode.trim()
                  ? 'transition'
                  : ''
              }`}
            >
              <p className="error-text">Zip/Postal Code is required</p>
            </div>
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              value={formData.address.city}
              onChange={e => {
                setFormData(prev => ({
                  ...prev,
                  address: { ...prev.address, city: e.target.value },
                }));
                setShowErrors(prev => ({
                  ...prev,
                  city: false,
                }));
              }}
              placeholder="City"
              className={`input-field ${
                showErrors.city && !formData.address.city.trim()
                  ? 'show-invalid'
                  : ''
              }`}
            />
            <div
              className={`error-text-container ${
                showErrors.city && !formData.address.city.trim()
                  ? 'transition'
                  : ''
              }`}
            >
              <p className="error-text">City is required</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import type { ErrorMap, Address } from '@/declarations';
import { Country, State } from 'country-state-city';
import Dropdown from './dropDown';

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

const countries = Country.getAllCountries();
const countriesData = countries.map(country => ({
  id: country.isoCode,
  name: country.name,
}));
const UStates = State.getStatesOfCountry('US');
const UStatesData = UStates.map(state => ({
  id: state.isoCode,
  name: state.name,
}));

export default function Address<T extends AddressFields>({
  formData,
  setFormData,
  showErrors,
  setShowErrors,
  formType,
}: StepProps<T>) {
  const handleCountryChange = (country: string) => {
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
    <div className="flex flex-col w-full">
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
            <Dropdown
              id="country"
              title="Country"
              data={countriesData}
              selectedId={formData.address.country}
              onSelect={item => {
                handleCountryChange(item);
                setShowErrors(prev => ({
                  ...prev,
                  country: false,
                }));
              }}
              showErrors={showErrors}
            />
            {/* <div className="relative w-full">
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
            </div> */}
            {formData.address.country === 'US' ? (
              <Dropdown
                id="state"
                title="State"
                data={UStatesData}
                onSelect={item => {
                  setFormData(prev => ({
                    ...prev,
                    address: { ...prev.address, state: item },
                  }));
                  setShowErrors(prev => ({
                    ...prev,
                    state: false,
                  }));
                }}
                showErrors={showErrors}
              />
            ) : (
              // <div className="relative w-full">
              //     <select
              //       className={`input-field !pr-8 ${
              //         showErrors.state && !formData.address.state.trim()
              //           ? 'show-invalid'
              //           : ''
              //       }`}
              //       value={formData.address.state}
              //       onChange={e => {
              //         setFormData(prev => ({
              //           ...prev,
              //           address: { ...prev.address, state: e.target.value },
              //         }));
              //         setShowErrors(prev => ({
              //           ...prev,
              //           state: false,
              //         }));
              //       }}
              //     >
              //       <option value="" disabled hidden>
              //         Select a State
              //       </option>
              //       {states.map(state => (
              //         <option key={state.isoCode} value={state.isoCode}>
              //           {state.name} ({state.isoCode})
              //         </option>
              //       ))}
              //     </select>
              //     <ArrowDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
              //   </div>
              <div className="relative w-full">
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
            )}
          </div>

          <div className="input-container">
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
          </div>
        </div>
      </div>
      <div
        className={`error-text-container ${
          (showErrors.address1 && !formData.address.address1.trim()) ||
          (showErrors.country && !formData.address.country.trim()) ||
          (showErrors.state && !formData.address.state.trim()) ||
          (showErrors.postalCode && !formData.address.postalCode.trim()) ||
          (showErrors.city && !formData.address.city.trim())
            ? 'transition'
            : ''
        }`}
      >
        <p className="error-text">Address is incomplete</p>
      </div>
    </div>
  );
}

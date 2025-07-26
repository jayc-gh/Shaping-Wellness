'use client';

import React from 'react';
import type { ErrorMap, Address } from '@/declarations';
import { Country, State } from 'country-state-city';
import Dropdown from './dropDown';
import {
  errorText,
  errorTextContainer,
  errorTextTransition,
  inputContainer,
  inputFieldDefaultColors,
  inputFieldDefaults,
  inputFieldErrorColors,
  inputLabelText,
  inputSubContainer,
  required,
} from '@/lib/classes/input-fields';

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
        country: country.trim(),
        state: '',
      },
    }));
  };

  return (
    <div className="flex flex-col w-full">
      <div className={inputSubContainer}>
        {formData.orgDonate &&
        (formType === 'donate' || formType === 'partner') ? (
          <p className={inputLabelText}>
            Organization Address <span className={required}>*</span>
          </p>
        ) : (
          <p className={inputLabelText}>
            Address <span className={required}>*</span>
          </p>
        )}
        <div className="flex flex-col w-full justify-center items-start gap-[0.5rem]">
          <div className={inputContainer}>
            <div className="flex flex-col w-full gap-[0.5rem]">
              <input
                type="address1"
                value={formData.address.address1}
                onChange={e => {
                  setFormData(prev => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      address1: e.target.value,
                    },
                  }));
                  setShowErrors(prev => ({
                    ...prev,
                    address1: false,
                  }));
                }}
                placeholder="Address 1"
                className={`${inputFieldDefaults} ${
                  showErrors.address1 && !formData.address.address1.trim()
                    ? inputFieldErrorColors
                    : inputFieldDefaultColors
                }`}
              />

              <input
                type="address2"
                value={formData.address.address2}
                onChange={e => {
                  setFormData(prev => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      address2: e.target.value,
                    },
                  }));
                }}
                placeholder="Address 2 (apt, suite, etc)"
                className={`${inputFieldDefaults} ${inputFieldDefaultColors}`}
              />
            </div>
          </div>

          <div className="flex items-start gap-[0.5rem] w-full">
            <Dropdown
              id="country"
              title="Country"
              data={countriesData}
              selectedId={formData.address.country}
              onSelect={item => {
                handleCountryChange(item.id);
                setShowErrors(prev => ({
                  ...prev,
                  country: false,
                }));
              }}
              showErrors={showErrors}
            />
            {formData.address.country === 'US' ? (
              <Dropdown
                id="state"
                title="State"
                data={UStatesData}
                selectedId={formData.address.state}
                onSelect={item => {
                  setFormData(prev => ({
                    ...prev,
                    address: { ...prev.address, state: item.id },
                  }));
                  setShowErrors(prev => ({
                    ...prev,
                    state: false,
                  }));
                }}
                showErrors={showErrors}
              />
            ) : (
              <div className="relative w-full">
                <input
                  type="text"
                  value={formData.address.state}
                  onChange={e => {
                    setFormData(prev => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        state: e.target.value,
                      },
                    }));
                    setShowErrors(prev => ({
                      ...prev,
                      state: false,
                    }));
                  }}
                  placeholder="State/Province/Region"
                  className={`${inputFieldDefaults} ${
                    showErrors.state &&
                    !formData.address.state.trim() &&
                    formData.address.country === 'CA'
                      ? inputFieldErrorColors
                      : inputFieldDefaultColors
                  }`}
                />
              </div>
            )}
          </div>

          <div className="flex items-start gap-[0.5rem] w-full">
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
              className={`${inputFieldDefaults} ${
                showErrors.city && !formData.address.city.trim()
                  ? inputFieldErrorColors
                  : inputFieldDefaultColors
              }`}
            />
            <input
              type="text"
              value={formData.address.postalCode}
              onChange={e => {
                setFormData(prev => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    postalCode: e.target.value,
                  },
                }));
                setShowErrors(prev => ({
                  ...prev,
                  postalCode: false,
                }));
              }}
              placeholder="Zip/Postal Code"
              className={`${inputFieldDefaults} ${
                showErrors.postalCode &&
                !formData.address.postalCode.trim() &&
                (formData.address.country === 'US' ||
                  formData.address.country === 'CA')
                  ? inputFieldErrorColors
                  : inputFieldDefaultColors
              }`}
            />
          </div>
        </div>
      </div>
      <div
        className={`${errorTextContainer} ${
          (showErrors.address1 && !formData.address.address1.trim()) ||
          (showErrors.country && !formData.address.country.trim()) ||
          (showErrors.state && !formData.address.state.trim()) ||
          (showErrors.postalCode && !formData.address.postalCode.trim()) ||
          (showErrors.city && !formData.address.city.trim())
            ? errorTextTransition
            : ''
        }`}
      >
        <p className={errorText}>Address is incomplete</p>
      </div>
    </div>
  );
}

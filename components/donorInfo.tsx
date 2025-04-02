'use client';

import React, { useState } from 'react';
import { FormInfo } from './donationForm';

interface StepProps {
  formData: FormInfo;
  setFormData: React.Dispatch<React.SetStateAction<FormInfo>>;
  nextStep: () => void;
}
const DonorInfo = ({ formData, setFormData, nextStep }: StepProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const validateEmailFormat = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
        6,
        10
      )}`;
    }
  };

  const handleBlur = () => {
    setIsFocused(!isFocused);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(formData.email)) {
      return;
    }

    nextStep();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-black w-full max-h-95 overflow-y-auto custom-scrollbar p-4"
    >
      <h4 className="w-full text-left mb-4">YOUR INFORMATION</h4>
      {/* First name last name / org name */}
      <div className="flex mb-2 gap-4">
        {!formData.orgDonate && (
          <>
            <label className="flex flex-col text-left flex-1 min-w-0 gap-2">
              <p>First Name *</p>
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

            <label className="flex flex-col text-left flex-1 min-w-0 gap-2">
              <p>Last Name *</p>
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
          </>
        )}
        {formData.orgDonate && (
          <>
            <label className="flex flex-col text-left flex-1 gap-2">
              Organization Name *
              <input
                type="text"
                value={formData.orgName}
                onChange={e =>
                  setFormData({ ...formData, orgName: e.target.value })
                }
                required
                className="border"
              />
            </label>
          </>
        )}
      </div>

      {/* checkboxes */}
      <div className="flex flex-col gap-2 mb-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            id="anonymous-checkbox"
            checked={formData.anonymous}
            onChange={() =>
              setFormData({ ...formData, anonymous: !formData.anonymous })
            }
          />
          <label htmlFor="anonymous-checkbox">
            Hide my name from the public
          </label>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            id="orgDonate-checkbox"
            checked={formData.orgDonate}
            onChange={() =>
              setFormData({ ...formData, orgDonate: !formData.orgDonate })
            }
          />
          <label htmlFor="orgDonate-checkbox">Donate as an organization</label>
        </label>
      </div>

      {/* address */}
      <label className="flex flex-col gap-2 text-left mb-2">
        {formData.orgDonate ? (
          <span>Organization Address 1 *</span>
        ) : (
          <span>Address 1 *</span>
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
          required
          placeholder="Address 2 (optional)"
          className="border"
        />
      </label>

      <div className="flex gap-4 mb-2">
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

        <label className="flex flex-col gap-2 text-left flex-1 min-w-0">
          <input
            type="text"
            value={formData.state}
            onChange={e => setFormData({ ...formData, state: e.target.value })}
            required
            placeholder="State / Province"
            className="border"
          />
        </label>
      </div>

      <div className="flex gap-4 mb-2">
        <label className="flex flex-col gap-2 text-left flex-1 min-w-0">
          <input
            type="text"
            value={formData.zipcode}
            onChange={e =>
              setFormData({ ...formData, zipcode: e.target.value })
            }
            required
            placeholder="Postal / Zip Code"
            className="border"
          />
        </label>

        <label className="flex flex-col gap-2 text-left flex-1 min-w-0">
          <input
            type="text"
            value={formData.country}
            onChange={e =>
              setFormData({ ...formData, country: e.target.value })
            }
            required
            placeholder="Country"
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

      {/* email */}
      <div className="flex flex-col gap-2">
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
    </form>
  );
};

export default DonorInfo;

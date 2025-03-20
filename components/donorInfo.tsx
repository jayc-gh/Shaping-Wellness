'use client';

import React from 'react';
import { FormInfo } from './donationForm';

interface StepProps {
  formData: FormInfo;
  setFormData: React.Dispatch<React.SetStateAction<FormInfo>>;
  nextStep: () => void;
  prevStep: () => void;
}
const DonorInfo = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
}: StepProps) => {
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
        6,
        10
      )}`;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <main className="text-black w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 mb-2">
          {!formData.anonymous && !formData.orgDonate && (
            <>
              <label className="flex flex-col gap-2 text-left flex-1">
                First Name *:
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

              <label className="flex flex-col gap-2 text-left flex-1">
                Last Name *:
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
            <label className="flex flex-col gap-2 text-left flex-1">
              Organization Name:
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
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.anonymous}
              onChange={() =>
                setFormData({ ...formData, anonymous: !formData.anonymous })
              }
            />
            Donate anonymously
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.orgDonate}
              onChange={() =>
                setFormData({ ...formData, orgDonate: !formData.orgDonate })
              }
            />
            Donate as an organization
          </label>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label className="flex flex-col gap-2 text-left">
            Email *:
            <input
              type="email"
              value={formData.email}
              onChange={e => {
                setFormData({ ...formData, email: e.target.value });
              }}
              required
              className="border"
            />
          </label>
          <label className="flex flex-col gap-2 text-left">
            Phone Number (optional):
            <input
              type="tel"
              value={formData.phone}
              onChange={e => {
                const formattedPhone = formatPhoneNumber(e.target.value);
                setFormData({ ...formData, phone: formattedPhone });
              }}
              placeholder="000-000-0000"
              className="border rounded-md p-2"
            />
          </label>
        </div>
        <div>
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-1 border rounded-lg cursor-pointer"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-1 border rounded-lg cursor-pointer"
          >
            Next
          </button>
        </div>
      </form>
    </main>
  );
};

export default DonorInfo;

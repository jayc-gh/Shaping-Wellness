'use client';

import React from 'react';
import { FormInfo } from './donationForm';

interface StepProps {
  formData: FormInfo;
  setFormData: React.Dispatch<React.SetStateAction<FormInfo>>;
}
const DonorInfo = ({ formData, setFormData }: StepProps) => {
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

  return (
    <main className="text-black w-full">
      <div className="flex gap-4 mb-2">
        {!formData.orgDonate && (
          <>
            <label className="flex flex-col gap-2 text-left flex-1">
              First Name *
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
              Last Name *
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
            <label className="flex flex-col gap-2 text-left flex-1">
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

      <div className="flex flex-col gap-2 mb-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.anonymous}
            onChange={() =>
              setFormData({ ...formData, anonymous: !formData.anonymous })
            }
          />
          Hide my name from the public
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
      {formData.orgDonate && (
        <div className="flex gap-4 mb-2">
          <label className="flex flex-col gap-2 text-left flex-1">
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

          <label className="flex flex-col gap-2 text-left flex-1">
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
            required
            className="border"
          />
        </label>
        <label className="flex flex-col gap-2 text-left">
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
    </main>
  );
};

export default DonorInfo;

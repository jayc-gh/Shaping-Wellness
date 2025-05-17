'use client';

import { ErrorMap, VolunteerFormData } from '@/declarations';
import { handleSubmitBasic } from '@/lib/functions';
import '../forms/forms.css';
import { useState } from 'react';
import Name from '../input-fields/name';
import Phone from '../input-fields/phone';
import Email from '../input-fields/email';
import Address from '../input-fields/address';
import DOB from '../input-fields/DOB';

export default function VolunteerForm() {
  const [formData, setFormData] = useState<VolunteerFormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: {
      address1: '',
      address2: '',
      country: 'US',
      state: '',
      city: '',
      postalCode: '',
    },
    phone: {
      number: '',
      type: '',
    },
    DOB: {
      month: '',
      day: '',
      year: '',
    },
    AoI: {
      programCoord: '',
      expertWorkshop: '',
      mentor: '',
    },
    volunteerHours: '',
  });

  const [showErrors, setShowErrors] = useState<ErrorMap>({});

  return (
    <form
      className="form-box"
      onSubmit={e => handleSubmitBasic(e, formData, 'volunteer', setShowErrors)}
    >
      <div className="form-container">
        <div className="form-desc-wrapper">
          <h4>VOLUNTEER APPLICATION</h4>
          <p className="p4 primary-2">
            Please complete the form below to tell us more about yourself and
            how you&apos;d like to get involved.
          </p>
        </div>
        <div className="form-sub-container">
          <Name
            formData={formData}
            setFormData={setFormData}
            showErrors={showErrors}
            setShowErrors={setShowErrors}
            formType="volunteer"
          />

          <Phone
            formData={formData}
            setFormData={setFormData}
            showErrors={showErrors}
            setShowErrors={setShowErrors}
            formType="volunteer"
          />

          <Email
            formData={formData}
            setFormData={setFormData}
            showErrors={showErrors}
            setShowErrors={setShowErrors}
            formType="volunteer"
          />

          <DOB
            formData={formData}
            setFormData={setFormData}
            showErrors={showErrors}
            setShowErrors={setShowErrors}
            formType="volunteer"
          />

          <Address
            formData={formData}
            setFormData={setFormData}
            showErrors={showErrors}
            setShowErrors={setShowErrors}
            formType="volunteer"
          />
        </div>
        <div className="continue-container">
          <button className="continue-btn" type="submit">
            <span className="btn">Submit</span>
          </button>
        </div>
      </div>
    </form>
  );
}

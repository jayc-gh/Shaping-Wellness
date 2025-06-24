'use client';

import { ErrorMap, VolunteerFormData } from '@/declarations';
import { handleSubmitVolunteer } from '@/lib/functions/formHandleSubmit';
import '../forms/forms.css';
import { useState } from 'react';
import Name from '../input-fields/name';
import Phone from '../input-fields/phone';
import Email from '../input-fields/email';
import Address from '../input-fields/address';
import DOB from '../input-fields/DOB';
import Unchecked from '../../app/icons/checked=no.svg';
import Checked from '../../app/icons/checked=yes.svg';
import YesNo from '../input-fields/yes-no';

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
  const yesNoQ = 'Do you need volunteer hours?';
  const formType = 'volunteer';
  return (
    <form
      className="form-box"
      onSubmit={e => handleSubmitVolunteer(e, formData, setShowErrors)}
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
            formType={formType}
          />

          <Phone
            formData={formData}
            setFormData={setFormData}
            showErrors={showErrors}
            setShowErrors={setShowErrors}
            formType={formType}
          />

          <Email
            formData={formData}
            setFormData={setFormData}
            showErrors={showErrors}
            setShowErrors={setShowErrors}
            formType={formType}
          />

          <DOB
            formData={formData}
            setFormData={setFormData}
            showErrors={showErrors}
            setShowErrors={setShowErrors}
            formType={formType}
          />

          <Address
            formData={formData}
            setFormData={setFormData}
            showErrors={showErrors}
            setShowErrors={setShowErrors}
            formType={formType}
          />
          {/* area of interest checkboxes */}
          <div className="input-sub-container">
            <p className="custom-text">
              Area of Interest <span className="required">*</span>
            </p>
            <div className="flex flex-col">
              <div className="input-container">
                <label
                  className="checkbox-container !pr-0"
                  htmlFor="program-coordination-checkbox"
                >
                  <input
                    type="checkbox"
                    id="program-coordination-checkbox"
                    className="checkbox"
                    checked={formData.AoI.programCoord === 'yes'}
                    onChange={() => {
                      setShowErrors(prev => ({
                        ...prev,
                        AoI: false,
                      }));
                      setFormData(prev => ({
                        ...prev,
                        AoI: {
                          ...prev.AoI,
                          programCoord:
                            formData.AoI.programCoord === 'yes' ? '' : 'yes',
                        },
                      }));
                    }}
                  />
                  {!formData.AoI.programCoord ? <Unchecked /> : <Checked />}
                  <span className="custom-text-4 p-neutral">
                    Program Coordination
                  </span>
                </label>
                <label
                  className="checkbox-container !pr-0"
                  htmlFor="expert-workshop-checkbox"
                >
                  <input
                    type="checkbox"
                    id="expert-workshop-checkbox"
                    className="checkbox"
                    checked={formData.AoI.expertWorkshop === 'yes'}
                    onChange={() => {
                      setShowErrors(prev => ({
                        ...prev,
                        AoI: false,
                      }));
                      setFormData(prev => ({
                        ...prev,
                        AoI: {
                          ...prev.AoI,
                          expertWorkshop:
                            formData.AoI.expertWorkshop === 'yes' ? '' : 'yes',
                        },
                      }));
                    }}
                  />
                  {!formData.AoI.expertWorkshop ? <Unchecked /> : <Checked />}
                  <span className="custom-text-4 p-neutral">
                    Expert Workshop
                  </span>
                </label>
                <label
                  className="checkbox-container !pr-0"
                  htmlFor="mentor-checkbox"
                >
                  <input
                    type="checkbox"
                    id="mentor-checkbox"
                    className="checkbox"
                    checked={formData.AoI.mentor === 'yes'}
                    onChange={() => {
                      setShowErrors(prev => ({
                        ...prev,
                        AoI: false,
                      }));
                      setFormData(prev => ({
                        ...prev,
                        AoI: {
                          ...prev.AoI,
                          mentor: formData.AoI.mentor === 'yes' ? '' : 'yes',
                        },
                      }));
                    }}
                  />
                  {!formData.AoI.mentor ? <Unchecked /> : <Checked />}
                  <span className="custom-text-4 p-neutral">Mentor</span>
                </label>
              </div>
              <div
                className={`error-text-container mt-[-6px] ${
                  showErrors.AoI ? 'transition' : ''
                }`}
              >
                <p className="error-text">Please select an area of interest</p>
              </div>
            </div>
          </div>
          <div className="py-1">
            <YesNo
              formData={formData}
              setFormData={setFormData}
              showErrors={showErrors}
              setShowErrors={setShowErrors}
              title={yesNoQ}
              formType={formType}
            />
          </div>
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

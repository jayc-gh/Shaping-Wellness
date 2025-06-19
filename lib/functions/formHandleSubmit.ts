import {
  ErrorMap,
  FormTypes,
  FormDataMap,
  VolunteerFormData,
  PartnerFormData,
  ContactFormData,
} from '@/declarations';
import React from 'react';

import {
  validateForm,
  validateDate,
  validateEmailFormat,
} from './validateFunctions';

export function handleSubmitVolunteer<T extends FormTypes>(
  e: React.FormEvent<HTMLFormElement>,
  formData: FormDataMap[T],
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>
) {
  e.preventDefault();
  const errors = validateForm(formData as VolunteerFormData, {
    requiredFields: [
      'firstName',
      'lastName',
      'address.address1',
      'address.city',
      'address.state',
      'address.country',
      'address.postalCode',
      'phone.number',
      'phone.type',
      'DOB.month',
      'DOB.day',
      'DOB.year',
      'AoI',
      'volunteerHours',
    ],
    customValidations: [
      data =>
        !validateDate(data.DOB.month, data.DOB.day, data.DOB.year)
          ? { DOB: true }
          : {},
      data => (!validateEmailFormat(data.email) ? { email: true } : {}),
      data =>
        data.AoI.programCoord.trim() === '' &&
        data.AoI.expertWorkshop.trim() === '' &&
        data.AoI.mentor.trim() === ''
          ? { AoI: true }
          : {},
    ],
  });

  // Update state with all the errors if errors exist
  if (Object.keys(errors).length > 0) {
    setShowErrors(prev => ({
      ...prev,
      ...errors,
    }));
    return;
  }

  // Clear previous show errors if none found
  setShowErrors({});
}

export function handleSubmitPartner<T extends FormTypes>(
  e: React.FormEvent<HTMLFormElement>,
  formData: FormDataMap[T],
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>
) {
  e.preventDefault();
  const errors = validateForm(formData as PartnerFormData, {
    requiredFields: [
      'orgName',
      'school',
      'firstName',
      'lastName',
      'address.address1',
      'address.city',
      'address.state',
      'address.country',
      'address.postalCode',
      'phone.number',
      'phone.type',
      'details',
    ],
    customValidations: [
      data => (!validateEmailFormat(data.email) ? { email: true } : {}),
    ],
  });

  // Update state with all the errors if errors exist
  if (Object.keys(errors).length > 0) {
    setShowErrors(prev => ({
      ...prev,
      ...errors,
    }));
    return;
  }

  // Clear previous show errors if none found
  setShowErrors({});
}

export function handleSubmitContact<T extends FormTypes>(
  e: React.FormEvent<HTMLFormElement>,
  formData: FormDataMap[T],
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>
) {
  e.preventDefault();
  const errors = validateForm(formData as ContactFormData, {
    requiredFields: ['firstName', 'lastName', 'details'],
    customValidations: [
      data => (!validateEmailFormat(data.email) ? { email: true } : {}),
    ],
  });

  // Update state with all the errors if errors exist
  if (Object.keys(errors).length > 0) {
    setShowErrors(prev => ({
      ...prev,
      ...errors,
    }));
    return;
  }

  // Clear previous show errors if none found
  setShowErrors({});
}

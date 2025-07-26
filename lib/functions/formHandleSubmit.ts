import {
  ErrorMap,
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

import {
  storeContactData,
  storePartnerData,
  storeVolunteerData,
} from './serverFunctions';

export async function handleSubmitVolunteer(
  e: React.FormEvent<HTMLFormElement>,
  formData: VolunteerFormData,
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
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

  const data = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    phone: formData.phone,
    email: formData.email,
    DOB: formData.DOB,
    address: formData.address,
    AoI: formData.AoI,
    volunteerHours: formData.volunteerHours,
  };

  // Clear previous show errors if none found
  setShowErrors({});
  setLoading(true);
  const volunteerData = await storeVolunteerData(data);
  return volunteerData; // either volunterFormId or error
}

export async function handleSubmitPartner(
  e: React.FormEvent<HTMLFormElement>,
  formData: PartnerFormData,
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
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

  const data = {
    orgName: formData.orgName,
    school: formData.school,
    address: formData.address,
    firstName: formData.firstName,
    lastName: formData.lastName,
    phone: formData.phone,
    email: formData.email,
    details: formData.details,
  };

  // Clear previous show errors if none found
  setShowErrors({});
  setLoading(true);
  const partnerData = await storePartnerData(data);
  return partnerData;
}

export async function handleSubmitContact(
  e: React.FormEvent<HTMLFormElement>,
  formData: ContactFormData,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  e.preventDefault();
  const errors = validateForm(formData as ContactFormData, {
    requiredFields: ['firstName', 'lastName', 'details'],
    customValidations: [
      data => (!validateEmailFormat(data.email) ? { email: true } : {}),
    ],
  });

  if (Object.keys(errors).length > 0) {
    return;
  }
  const data = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    details: formData.details,
  };
  setLoading(true);
  const contactData = await storeContactData(data);
  return contactData;
}

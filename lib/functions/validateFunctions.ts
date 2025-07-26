import { ValidatorConfig } from '@/declarations';
import { ErrorMap } from '@/declarations';

function getNestedValue<T>(obj: T, path: string): unknown {
  return path.split('.').reduce((acc: unknown, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

export const formatPhoneNumber = (value: string) => {
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

export const validateEmailFormat = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const validateDate = (month: string, day: string, year: string) => {
  const m = Number(month);
  const d = Number(day);
  const y = Number(year);

  if (
    m < 1 ||
    m > 12 ||
    d < 1 ||
    d > 31 ||
    y < 1900 ||
    y > new Date().getFullYear()
  )
    return false;

  const inputDate = new Date(y, m - 1, d);

  if (
    inputDate.getFullYear() !== y ||
    inputDate.getMonth() !== m - 1 ||
    inputDate.getDate() !== d
  ) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return inputDate < today;
};

export const formatDate = (type: 'day' | 'year', value: string) => {
  const digitsOnly = value.replace(/\D/g, '');
  const limits: Record<typeof type, number> = {
    day: 2,
    year: 4,
  };

  return digitsOnly.slice(0, limits[type]);
};

export function validateForm<T>(formData: T, config: ValidatorConfig<T>) {
  const errors: ErrorMap = {};

  if (config.requiredFields) {
    for (const key of config.requiredFields) {
      const value = getNestedValue(formData, key.toString());
      if (typeof value === 'string' && value.trim() === '') {
        const fieldKey = key.toString().split('.').pop();
        errors[fieldKey as keyof ErrorMap] = true;
      } else if (typeof value === 'boolean' && value === false) {
      }
    }
  }

  if (config.customValidations) {
    for (const validateFn of config.customValidations) {
      Object.assign(errors, validateFn(formData));
    }
  }

  return errors;
}

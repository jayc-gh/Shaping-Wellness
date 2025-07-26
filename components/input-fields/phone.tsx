import { formatPhoneNumber } from '@/lib/functions/validateFunctions';
import type { ErrorMap, Phone } from '@/declarations';
import Dropdown from '../input-fields/dropDown';
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

type PhoneFields = {
  orgDonate?: boolean;
  phone: Phone;
};

interface StepProps<T extends PhoneFields> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  showErrors: ErrorMap;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
  formType: string;
}

export default function Phone<T extends PhoneFields>({
  formData,
  setFormData,
  formType,
  showErrors,
  setShowErrors,
}: StepProps<T>) {
  const phoneType = [
    { id: 'mobile', name: 'Mobile' },
    { id: 'home', name: 'Home' },
  ];

  return (
    <div className={inputContainer}>
      <label className={inputSubContainer}>
        {
          <p className={inputLabelText}>
            Phone Number{' '}
            {formType === 'donate' ? (
              '(optional)'
            ) : (
              <span className={required}>*</span>
            )}
          </p>
        }
        <div className="flex flex-col w-full">
          <input
            type="tel"
            value={formData.phone.number}
            onChange={e => {
              const formattedPhone = formatPhoneNumber(e.target.value);
              setFormData(prev => ({
                ...prev,
                phone: { ...prev.phone, number: formattedPhone },
              }));
              setShowErrors(prev => ({
                ...prev,
                number: false,
              }));
            }}
            placeholder="(000) 000-0000"
            className={`${inputFieldDefaults} ${
              showErrors.number &&
              !formData.phone.number.trim() &&
              formType !== 'donate'
                ? inputFieldErrorColors
                : inputFieldDefaultColors
            }`}
          />
          <div
            className={`${errorTextContainer} ${
              showErrors.number &&
              !formData.phone.number.trim() &&
              formType !== 'donate'
                ? errorTextTransition
                : ''
            }`}
          >
            <p className={errorText}>Phone Number is required</p>
          </div>
        </div>
      </label>
      <label className={inputSubContainer}>
        {
          <p className={inputLabelText}>
            Phone Type{' '}
            {formType === 'donate' ? (
              '(optional)'
            ) : (
              <span className={required}>*</span>
            )}
          </p>
        }
        <div className="flex flex-col w-full">
          <Dropdown
            id="type"
            title="Select Phone Type"
            data={phoneType}
            selectedId={formData.phone.type}
            onSelect={item => {
              setShowErrors(prev => ({
                ...prev,
                type: false,
              }));
              setFormData(prev => ({
                ...prev,
                phone: { ...prev.phone, type: item.id },
              }));
            }}
            showErrors={showErrors}
          />
          <div
            className={`${errorTextContainer} ${
              showErrors.type &&
              !formData.phone.type.trim() &&
              formType !== 'donate'
                ? errorTextTransition
                : ''
            }`}
          >
            <p className={errorText}>Phone Type is required</p>
          </div>
        </div>
      </label>
    </div>
  );
}

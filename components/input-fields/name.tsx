import { ErrorMap } from '@/declarations';
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

type NameFields = {
  firstName: string;
  lastName: string;
  orgDonate?: boolean;
};

interface StepProps<T extends NameFields> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  showErrors?: ErrorMap;
  setShowErrors?: React.Dispatch<React.SetStateAction<ErrorMap>>;
  formType: string;
}

export default function Name<T extends NameFields>({
  formData,
  setFormData,
  showErrors,
  setShowErrors,
  formType,
}: StepProps<T>) {
  return (
    <div className={inputContainer}>
      <label className={inputSubContainer}>
        <p className={inputLabelText}>
          {formType === 'donate' && formData.orgDonate
            ? 'Contact First Name'
            : 'First Name'}
          <span className={required}>*</span>
        </p>
        <div className="flex flex-col w-full">
          <input
            type="text"
            value={formData.firstName}
            onChange={e => {
              setFormData(prev => ({
                ...prev,
                firstName: e.target.value,
              }));
              if (setShowErrors) {
                setShowErrors(prev => ({
                  ...prev,
                  firstName: false,
                }));
              }
            }}
            className={`${inputFieldDefaults} ${
              showErrors?.firstName && !formData.firstName.trim()
                ? inputFieldErrorColors
                : inputFieldDefaultColors
            }`}
          />
          <div
            className={`${errorTextContainer} ${
              showErrors?.firstName && !formData.firstName.trim()
                ? errorTextTransition
                : ''
            }`}
          >
            <p className={errorText}>First Name is required</p>
          </div>
        </div>
      </label>

      <label className={inputSubContainer}>
        <p className={inputLabelText}>
          {formType === 'donate' && formData.orgDonate
            ? 'Contact Last Name'
            : 'Last Name'}
          <span className={required}>*</span>
        </p>
        <div className="flex flex-col w-full">
          <input
            type="text"
            value={formData.lastName}
            onChange={e => {
              setFormData(prev => ({
                ...prev,
                lastName: e.target.value,
              }));
              if (setShowErrors) {
                setShowErrors(prev => ({
                  ...prev,
                  lastName: false,
                }));
              }
            }}
            className={`${inputFieldDefaults} ${
              showErrors?.lastName && !formData.lastName.trim()
                ? inputFieldErrorColors
                : inputFieldDefaultColors
            }`}
          />
          <div
            className={`${errorTextContainer} ${
              showErrors?.lastName && !formData.lastName.trim()
                ? errorTextTransition
                : ''
            }`}
          >
            <p className={errorText}>Last Name is required</p>
          </div>
        </div>
      </label>
    </div>
  );
}

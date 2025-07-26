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

type OrgNameFields = {
  orgName: string;
};

interface StepProps<T extends OrgNameFields> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  showErrors: ErrorMap;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
  formType: string;
}

export default function OrgName<T extends OrgNameFields>({
  formData,
  setFormData,
  showErrors,
  setShowErrors,
}: StepProps<T>) {
  return (
    <div className={inputContainer}>
      <label className={inputSubContainer}>
        <p className={inputLabelText}>
          Organization Name <span className={required}>*</span>
        </p>
        <div className="flex flex-col w-full">
          <input
            type="text"
            value={formData.orgName}
            onChange={e => {
              setFormData(prev => ({
                ...prev,
                orgName: e.target.value,
              }));
              setShowErrors(prev => ({
                ...prev,
                orgName: false,
              }));
            }}
            className={`${inputFieldDefaults} ${
              showErrors.orgName && !formData.orgName.trim()
                ? inputFieldErrorColors
                : inputFieldDefaultColors
            }`}
          />
          <div
            className={`${errorTextContainer} ${
              showErrors.orgName && !formData.orgName.trim()
                ? errorTextTransition
                : ''
            }`}
          >
            <p className={errorText}>Organization Name is required</p>
          </div>
        </div>
      </label>
    </div>
  );
}

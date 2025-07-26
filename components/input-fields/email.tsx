import { ErrorMap } from '@/declarations';
import {
  inputContainer,
  inputSubContainer,
  inputLabelText,
  required,
  inputFieldDefaults,
  inputFieldErrorColors,
  inputFieldDefaultColors,
  errorTextContainer,
  errorText,
  errorTextTransition,
} from '@/lib/classes/input-fields';
import { validateEmailFormat } from '@/lib/functions/validateFunctions';

type EmailFields = {
  orgDonate?: boolean;
  email: string;
};

interface StepProps<T extends EmailFields> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  formType: string;
  showErrors: ErrorMap;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
}

export default function Email<T extends EmailFields>({
  formData,
  setFormData,
  showErrors,
  setShowErrors,
  formType,
}: StepProps<T>) {
  return (
    <div className={inputContainer}>
      <label className={inputSubContainer}>
        {formData.orgDonate && formType === 'donate' ? (
          <p className={inputLabelText}>
            Contact Email <span className={required}>*</span>
          </p>
        ) : (
          <p className={inputLabelText}>
            Email <span className={required}>*</span>
          </p>
        )}
        <div className="flex flex-col w-full">
          <input
            type="text"
            value={formData.email}
            onChange={e => {
              setFormData(prev => ({
                ...prev,
                email: e.target.value,
              }));
              setShowErrors(prev => ({
                ...prev,
                email: false,
              }));
            }}
            onBlur={e => {
              if ((formType = 'contact') && e.target.value) {
                const valid = !validateEmailFormat(e.target.value);
                if (valid) setShowErrors({ email: true });
              }
            }}
            className={`${inputFieldDefaults} ${
              (showErrors.email || showErrors.emailCheckFailed) &&
              !validateEmailFormat(formData.email)
                ? inputFieldErrorColors
                : inputFieldDefaultColors
            }`}
          />
          {!showErrors.email && formType !== 'donate' ? (
            <p className="text-[0.75rem] text-[#6b6461] font-[400] self-start justify-center pt-[0.25rem]">
              We will use this email to contact you.
            </p>
          ) : null}
          <div
            className={`${errorTextContainer} ${
              (showErrors.email || showErrors.emailCheckFailed) &&
              !validateEmailFormat(formData.email)
                ? errorTextTransition
                : ''
            }`}
          >
            {formData.email ? (
              <p className={errorText}>
                Please enter in the format: email@domain.com
              </p>
            ) : !formData.email ? (
              <p className={errorText}>Email is required</p>
            ) : null}
          </div>
        </div>
      </label>
    </div>
  );
}

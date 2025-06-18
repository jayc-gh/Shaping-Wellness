import { ErrorMap } from '@/declarations';
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
    <div className="input-container">
      <label className="input-sub-container">
        {formData.orgDonate && formType === 'donate' ? (
          <p className="custom-text">
            Contact Email <span className="required">*</span>
          </p>
        ) : (
          <p className="custom-text">
            Email <span className="required">*</span>
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
            className={`input-field ${
              showErrors.email && !validateEmailFormat(formData.email)
                ? 'show-invalid'
                : ''
            }`}
          />
          {!showErrors.email && formType !== 'donate' ? (
            <p className="p6 s-neutral !font-[400] self-start justify-center pt-[4px]">
              We will use this email to contact you.
            </p>
          ) : null}
          <div
            className={`error-text-container ${
              showErrors.email && !validateEmailFormat(formData.email)
                ? 'transition'
                : ''
            }`}
          >
            {formData.email ? (
              <p className="error-text">
                Please enter in the format: email@domain.com
              </p>
            ) : (
              <p className="error-text">Email is required</p>
            )}
          </div>
        </div>
      </label>
    </div>
  );
}

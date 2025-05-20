import { ErrorMap } from '@/declarations';

type NameFields = {
  firstName: string;
  lastName: string;
  orgDonate?: boolean;
};

interface StepProps<T extends NameFields> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  showErrors: ErrorMap;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
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
    <div className="input-container">
      <label className="input-sub-container">
        <p className="custom-text">
          {formType === 'donate' && formData.orgDonate
            ? 'Contact First Name'
            : 'First Name'}
          <span className="required">*</span>
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
              setShowErrors(prev => ({
                ...prev,
                firstName: false,
              }));
            }}
            className={`input-field ${
              showErrors.firstName && !formData.firstName.trim()
                ? 'show-invalid'
                : ''
            }`}
          />
          <div
            className={`error-text-container ${
              showErrors.firstName && !formData.firstName.trim()
                ? 'transition'
                : ''
            }`}
          >
            <p className="error-text">First Name is required</p>
          </div>
        </div>
      </label>

      <label className="input-sub-container">
        <p className="custom-text">
          {formType === 'donate' && formData.orgDonate
            ? 'Contact Last Name'
            : 'Last Name'}
          <span className="required">*</span>
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
              setShowErrors(prev => ({
                ...prev,
                lastName: false,
              }));
            }}
            className={`input-field ${
              showErrors.lastName && !formData.lastName.trim()
                ? 'show-invalid'
                : ''
            }`}
          />
          <div
            className={`error-text-container ${
              showErrors.lastName && !formData.lastName.trim()
                ? 'transition'
                : ''
            }`}
          >
            <p className="error-text">Last Name is required</p>
          </div>
        </div>
      </label>
    </div>
  );
}

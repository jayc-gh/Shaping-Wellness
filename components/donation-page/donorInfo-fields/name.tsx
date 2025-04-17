import { FormInfo, ErrorMap } from '../donationForm';

interface StepProps {
  formData: FormInfo;
  setFormData: React.Dispatch<React.SetStateAction<FormInfo>>;
  showErrors: ErrorMap;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
}

export default function Name({
  formData,
  setFormData,
  showErrors,
  setShowErrors,
}: StepProps) {
  return (
    <div className="input-container">
      <label className="input-sub-container">
        <p className="custom-text">
          {!formData.orgDonate ? 'First Name' : 'Contact First Name'}
          <span className="required">*</span>
        </p>
        <div className="flex flex-col">
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
          {!formData.orgDonate ? 'Last Name' : 'Contact Last Name'}
          <span className="required">*</span>
        </p>
        <div className="flex flex-col">
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

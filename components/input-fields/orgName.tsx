import { ErrorMap } from '@/declarations';

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
    <div className="input-container">
      <label className="input-sub-container">
        <p className="custom-text">
          Organization Name <span className="required">*</span>
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
            className={`input-field ${
              showErrors.orgName && !formData.orgName.trim()
                ? 'show-invalid'
                : ''
            }`}
          />
          <div
            className={`error-text-container ${
              showErrors.orgName && !formData.orgName.trim() ? 'transition' : ''
            }`}
          >
            <p className="error-text">Organization Name is required</p>
          </div>
        </div>
      </label>
    </div>
  );
}

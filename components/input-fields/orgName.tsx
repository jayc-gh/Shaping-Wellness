import { DonateFormData, ErrorMap } from '@/declarations';

interface StepProps {
  formData: DonateFormData;
  setFormData: React.Dispatch<React.SetStateAction<DonateFormData>>;
  showErrors: ErrorMap;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
}

export default function OrgName({
  formData,
  setFormData,
  showErrors,
  setShowErrors,
}: StepProps) {
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

import type { ErrorMap, DOB } from '@/declarations';

type DOBFields = {
  DOB: DOB;
};

interface StepProps<T extends DOBFields> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  showErrors: ErrorMap;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
  formType: string;
}

export default function DOB<T extends DOBFields>({
  formData,
  setFormData,
  formType,
  showErrors,
  setShowErrors,
}: StepProps<T>) {
  return (
    <div className="flex flex-col">
      <div className="input-sub-container">
        <p className="custom-text">
          Date of Birth <span className="required">*</span>
        </p>
        <div className="input-container">
          <input
            type="text"
            value={formData.DOB.month}
            onChange={e => {
              setFormData(prev => ({
                ...prev,
                DOB: { ...prev.DOB, month: e.target.value },
              }));
              setShowErrors(prev => ({
                ...prev,
                month: false,
              }));
            }}
            placeholder="Month"
            className={`input-field ${
              showErrors.month &&
              !formData.DOB.month.trim() &&
              formType !== 'donate'
                ? 'show-invalid'
                : ''
            }`}
          />
          <input
            type="text"
            value={formData.DOB.day}
            onChange={e => {
              setFormData(prev => ({
                ...prev,
                DOB: { ...prev.DOB, day: e.target.value },
              }));
              setShowErrors(prev => ({
                ...prev,
                day: false,
              }));
            }}
            placeholder="DD"
            className={`input-field ${
              showErrors.day &&
              !formData.DOB.day.trim() &&
              formType !== 'donate'
                ? 'show-invalid'
                : ''
            }`}
          />
          <input
            type="text"
            value={formData.DOB.year}
            onChange={e => {
              setFormData(prev => ({
                ...prev,
                DOB: { ...prev.DOB, year: e.target.value },
              }));
              setShowErrors(prev => ({
                ...prev,
                year: false,
              }));
            }}
            placeholder="YYYY"
            className={`input-field ${
              showErrors.year &&
              !formData.DOB.year.trim() &&
              formType !== 'donate'
                ? 'show-invalid'
                : ''
            }`}
          />
        </div>
      </div>
      <div
        className={`error-text-container ${
          ((showErrors.month && !formData.DOB.month.trim()) ||
            (showErrors.day && !formData.DOB.day.trim()) ||
            (showErrors.year && !formData.DOB.year.trim())) &&
          formType !== 'donate'
            ? 'transition'
            : ''
        }`}
      >
        <p className="error-text">Date of birth is incomplete</p>
      </div>
    </div>
  );
}

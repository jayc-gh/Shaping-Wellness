import { ErrorMap, PartnerFormData } from '@/declarations';
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

interface StepProps {
  formData: PartnerFormData;
  setFormData: React.Dispatch<React.SetStateAction<PartnerFormData>>;
  showErrors: ErrorMap;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
}

export default function DistrictName({
  formData,
  setFormData,
  showErrors,
  setShowErrors,
}: StepProps) {
  return (
    <div className={inputContainer}>
      <label className={inputSubContainer}>
        <p className={inputLabelText}>
          District Name <span className={required}>*</span>
        </p>
        <div className="flex flex-col w-full">
          <input
            type="text"
            value={formData.districtName}
            onChange={e => {
              setFormData(prev => ({
                ...prev,
                districtName: e.target.value,
              }));
              setShowErrors(prev => ({
                ...prev,
                districtName: false,
              }));
            }}
            className={`${inputFieldDefaults} ${
              showErrors.districtName && !formData.districtName.trim()
                ? inputFieldErrorColors
                : inputFieldDefaultColors
            }`}
          />
          <div
            className={`${errorTextContainer} ${
              showErrors.districtName && !formData.districtName.trim()
                ? errorTextTransition
                : ''
            }`}
          >
            <p className={errorText}>District Name is required</p>
          </div>
        </div>
      </label>
    </div>
  );
}

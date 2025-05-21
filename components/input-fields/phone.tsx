import { formatPhoneNumber } from '@/lib/functions';
import type { ErrorMap, Phone } from '@/declarations';
import Dropdown from '../input-fields/dropDown';

type PhoneFields = {
  orgDonate?: boolean;
  phone: Phone;
};

interface StepProps<T extends PhoneFields> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  showErrors: ErrorMap;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
  formType: string;
}

export default function Phone<T extends PhoneFields>({
  formData,
  setFormData,
  formType,
  showErrors,
  setShowErrors,
}: StepProps<T>) {
  const phoneType = [
    { id: 'mobile', name: 'Mobile' },
    { id: 'home', name: 'Home' },
  ];

  return (
    <div className="input-container">
      <label className="input-sub-container">
        {
          <p className="custom-text">
            Phone Number{' '}
            {formType === 'donate' ? (
              '(optional)'
            ) : (
              <span className="required">*</span>
            )}
          </p>
        }
        <div className="flex flex-col w-full">
          <input
            type="tel"
            value={formData.phone.number}
            onChange={e => {
              const formattedPhone = formatPhoneNumber(e.target.value);
              setFormData(prev => ({
                ...prev,
                phone: { ...prev.phone, number: formattedPhone },
              }));
              setShowErrors(prev => ({
                ...prev,
                number: false,
              }));
            }}
            placeholder="(000) 000-0000"
            className={`input-field ${
              showErrors.number &&
              !formData.phone.number.trim() &&
              formType !== 'donate'
                ? 'show-invalid'
                : ''
            }`}
          />
          <div
            className={`error-text-container ${
              showErrors.number &&
              !formData.phone.number.trim() &&
              formType !== 'donate'
                ? 'transition'
                : ''
            }`}
          >
            <p className="error-text">Phone Number is required</p>
          </div>
        </div>
      </label>
      <label className="input-sub-container">
        {
          <p className="custom-text">
            Phone Type{' '}
            {formType === 'donate' ? (
              '(optional)'
            ) : (
              <span className="required">*</span>
            )}
          </p>
        }
        <div className="flex flex-col w-full">
          <Dropdown
            id="type"
            title="Select Phone Type"
            data={phoneType}
            onSelect={item => {
              setShowErrors(prev => ({
                ...prev,
                type: false,
              }));
              setFormData(prev => ({
                ...prev,
                phone: { ...prev.phone, type: item },
              }));
            }}
            showErrors={showErrors}
          />
          <div
            className={`error-text-container ${
              showErrors.type &&
              !formData.phone.type.trim() &&
              formType !== 'donate'
                ? 'transition'
                : ''
            }`}
          >
            <p className="error-text">Phone Type is required</p>
          </div>
        </div>
      </label>
    </div>
  );
}

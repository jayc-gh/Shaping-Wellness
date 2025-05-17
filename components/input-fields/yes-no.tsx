import { ErrorMap } from '@/declarations';
import CircleChecked from '../../app/icons/circle-checkbox=yes.svg';
import CircleUnchecked from '../../app/icons/circle-checkbox=no.svg';

type YesNoFields = {
  volunteerHours?: 'yes' | 'no' | '';
  school?: 'yes' | 'no' | '';
};

interface StepProps<T extends YesNoFields> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  showErrors: ErrorMap;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
  title: string;
  formType: string;
}

export default function YesNo<T extends YesNoFields>({
  formData,
  setFormData,
  showErrors,
  setShowErrors,
  title,
  formType,
}: StepProps<T>) {
  function handleSelectionChange(value: 'yes' | 'no') {
    if (formType === 'volunteer') {
      setFormData(prev => ({ ...prev, volunteerHours: value }));
      setShowErrors(prev => ({ ...prev, volunteerHours: false }));
    } else if (formType === 'partner') {
      setFormData(prev => ({ ...prev, school: value }));
      setShowErrors(prev => ({ ...prev, school: false }));
    }
  }

  const yesNo =
    (formType === 'volunteer' && formData.volunteerHours === 'yes') ||
    (formType === 'partner' && formData.school === 'yes')
      ? 'yes'
      : (formType === 'volunteer' && formData.volunteerHours === 'no') ||
        (formType === 'partner' && formData.school === 'no')
      ? 'no'
      : '';

  return (
    <div className="input-sub-container">
      <p className="custom-text">
        {title} <span className="required">*</span>
      </p>
      <div className="flex flex-col">
        <div className="input-container !gap-[13px]">
          <label htmlFor="yes" className="checkbox-container">
            <input
              type="radio"
              name="yes-no"
              id="yes"
              value="yes"
              className="checkbox"
              checked={yesNo === 'yes'}
              onChange={() => {
                handleSelectionChange('yes');
                console.log('hi');
              }}
            />
            {yesNo === 'yes' ? <CircleChecked /> : <CircleUnchecked />}
            <span className="custom-text-4 p-neutral">Yes</span>
          </label>
          <label htmlFor="no" className="checkbox-container">
            <input
              type="radio"
              name="yes-no"
              id="no"
              value="no"
              className="checkbox"
              checked={yesNo === 'no'}
              onChange={() => handleSelectionChange('no')}
            />
            {yesNo === 'no' ? <CircleChecked /> : <CircleUnchecked />}
            <span className="custom-text-4 p-neutral">No</span>
          </label>
        </div>
        <div
          className={`error-text-container mt-[-6px] ${
            showErrors.volunteerHours ? 'transition' : ''
          }`}
        >
          <p className="error-text">This field is required</p>
        </div>
      </div>
    </div>
  );
}

import { ErrorMap } from '@/declarations';
import CircleChecked from '../../app/icons/circle-checkbox=yes.svg';
import CircleUnchecked from '../../app/icons/circle-checkbox=no.svg';
import {
  checkboxContainer,
  errorText,
  errorTextContainer,
  errorTextTransition,
  inputLabelText,
  inputSubContainer,
  required,
} from '@/lib/classes/input-fields';

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
    <div className={inputSubContainer}>
      <p className={inputLabelText}>
        {title} <span className={required}>*</span>
      </p>
      <div className="flex flex-col">
        <div className={`flex w-full gap-[0.8125rem]`}>
          <label htmlFor="yes" className={checkboxContainer}>
            <input
              type="radio"
              name="yes-no"
              id="yes"
              value="yes"
              className="sr-only"
              checked={yesNo === 'yes'}
              onChange={() => {
                handleSelectionChange('yes');
                console.log('hi');
              }}
            />
            {yesNo === 'yes' ? <CircleChecked /> : <CircleUnchecked />}
            <span className="text-[0.875rem] font-[500] leading-[1.25rem]">
              Yes
            </span>
          </label>
          <label htmlFor="no" className={checkboxContainer}>
            <input
              type="radio"
              name="yes-no"
              id="no"
              value="no"
              className="sr-only"
              checked={yesNo === 'no'}
              onChange={() => handleSelectionChange('no')}
            />
            {yesNo === 'no' ? <CircleChecked /> : <CircleUnchecked />}
            <span className="text-[0.875rem] font-[500] leading-[1.25rem]">
              No
            </span>
          </label>
        </div>
        <div
          className={`${errorTextContainer} ${
            (formType === 'volunteer' && showErrors.volunteerHours) ||
            (formType === 'partner' && showErrors.school)
              ? errorTextTransition
              : ''
          }`}
        >
          <p className={errorText}>This field is required</p>
        </div>
      </div>
    </div>
  );
}

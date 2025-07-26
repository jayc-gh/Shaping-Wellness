import type { ErrorMap, DOB } from '@/declarations';
import Dropdown from './dropDown';
import {
  errorText,
  errorTextContainer,
  errorTextTransition,
  inputLabelText,
  inputSubContainer,
  required,
} from '@/lib/classes/input-fields';

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

const months = [
  { id: '1', name: 'January' },
  { id: '2', name: 'February' },
  { id: '3', name: 'March' },
  { id: '4', name: 'April' },
  { id: '5', name: 'May' },
  { id: '6', name: 'June' },
  { id: '7', name: 'July' },
  { id: '8', name: 'August' },
  { id: '9', name: 'September' },
  { id: '10', name: 'October' },
  { id: '11', name: 'November' },
  { id: '12', name: 'December' },
];

const days = Array.from({ length: 31 }, (_, i) => {
  const val = (i + 1).toString();
  return { id: val, name: val };
});

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => {
  const val = (1900 + i).toString();
  return { id: val, name: val };
});

export default function DOB<T extends DOBFields>({
  formData,
  setFormData,
  formType,
  showErrors,
  setShowErrors,
}: StepProps<T>) {
  return (
    <div className="flex flex-col">
      <div className={inputSubContainer}>
        <p className={inputLabelText}>
          Date of Birth <span className={required}>*</span>
        </p>
        <div className="flex w-full gap-[0.5rem]">
          <Dropdown
            id="month"
            title="Month"
            selectedId={formData.DOB.month}
            data={months}
            onSelect={item => {
              setFormData(prev => ({
                ...prev,
                DOB: { ...prev.DOB, month: item.id },
              }));
              setShowErrors(prev => ({
                ...prev,
                DOB: false,
                month: false,
              }));
            }}
            showErrors={showErrors}
          />
          <Dropdown
            id="day"
            title="Day"
            data={days}
            selectedId={formData.DOB.day}
            onSelect={item => {
              setFormData(prev => ({
                ...prev,
                DOB: { ...prev.DOB, day: item.id },
              }));
              setShowErrors(prev => ({
                ...prev,
                DOB: false,
                day: false,
              }));
            }}
            showErrors={showErrors}
          />
          <Dropdown
            id="year"
            title="Year"
            data={years}
            selectedId={formData.DOB.year}
            onSelect={item => {
              setFormData(prev => ({
                ...prev,
                DOB: { ...prev.DOB, year: item.id },
              }));
              setShowErrors(prev => ({
                ...prev,
                DOB: false,
                year: false,
              }));
            }}
            showErrors={showErrors}
          />
        </div>
      </div>
      <div
        className={`${errorTextContainer} ${
          formType !== 'donate' &&
          ((showErrors.month && !formData.DOB.month.trim()) ||
            (showErrors.day && !formData.DOB.day.trim()) ||
            (showErrors.year && !formData.DOB.year.trim()) ||
            showErrors.DOB)
            ? errorTextTransition
            : ''
        }`}
      >
        <p className={errorText}>
          {(showErrors.month && !formData.DOB.month.trim()) ||
          (showErrors.day && !formData.DOB.day.trim()) ||
          (showErrors.year && !formData.DOB.year.trim())
            ? 'Date of birth is incomplete'
            : showErrors.DOB
            ? 'Date of birth is invalid'
            : ''}
        </p>
      </div>
    </div>
  );
}

import React, { useState, useRef } from 'react';
import Unchecked from '../../../app/icons/checked=no.svg';
import Checked from '../../../app/icons/checked=yes.svg';
import Help from '../../../app/icons/help.svg';
import SvgTooltip from './toolTip';
import { useOutsideClick } from '@/lib/functions/useFunctions';

type InfoType =
  | 'anonymous-checkbox'
  | 'orgDonate-checkbox'
  | 'cover-fee-checkbox'
  | 'program-coordination-checkbox'
  | 'expert-workshop-checkbox'
  | 'mentor-checkbox';

type CustomCheckboxProps = {
  id: InfoType;
  checked: boolean;
  onChange: () => void;
  label: string;
  disabled?: boolean;
  help?: boolean;
};

const tooltipTextMap: Record<
  InfoType,
  string | { title: string; bullets: string[] }
> = {
  'anonymous-checkbox':
    'We will only use your name to send you a receipt with tax information.',
  'orgDonate-checkbox':
    "Select if you're donating on behalf of an organization. The donation receipt will be issued to that organization.",
  'cover-fee-checkbox': {
    title: 'Transaction fee breakdown:',
    bullets: [
      'Credit cards: 2.9% + $0.30 per donation',
      'Bank transfers: 0.8% (max $5)',
    ],
  },
  'expert-workshop-checkbox': '',
  'program-coordination-checkbox': '',
  'mentor-checkbox': '',
};

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
  disabled = false,
  help,
}) => {
  const [popup, setPopup] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(popupRef, () => setPopup(false));

  return (
    <div className="flex items-center gap-[0.5rem] self-start">
      <label
        htmlFor={id}
        className={`flex h-[28px] items-center gap-[8px] rounded-[4px] cursor-pointer !pr-0 ${
          disabled ? '!cursor-not-allowed' : ''
        }`}
      >
        <input
          type="checkbox"
          id={id}
          className="sr-only"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />

        {checked ? <Checked /> : <Unchecked />}

        <span
          className={`text-[0.875rem] font-[500] leading-[1.25rem] ${
            disabled ? 'text-[#6b6461]' : 'text-[#2f2f2f]'
          }`}
        >
          {label}
        </span>
      </label>
      {help && (
        <div className="relative" ref={popupRef}>
          <Help
            className="cursor-pointer"
            onClick={() => setPopup(prev => !prev)}
          />
          {popup && (
            <div
              className={`absolute ${
                id === 'anonymous-checkbox'
                  ? 'top-[-0.8125rem]'
                  : id === 'orgDonate-checkbox'
                  ? 'top-[-1.125rem]'
                  : id === 'cover-fee-checkbox'
                  ? 'top-[-1.25rem]'
                  : ''
              } left-4 z-50`}
            >
              <SvgTooltip text={tooltipTextMap[id]} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomCheckbox;

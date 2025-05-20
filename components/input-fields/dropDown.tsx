import { useRef, useState } from 'react';
import ArrowDown from '../../app/icons/Arrow-down.svg';
import { useOutsideClick } from '@/lib/functions';
import { ErrorMap } from '@/declarations';

interface DropdownItem {
  id: string;
  name: string;
}

interface DropdownProps {
  id: string;
  title?: string;
  data: DropdownItem[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  selectedId?: string;
  onSelect?: (id: string) => void;
  showErrors: ErrorMap;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
}

export default function Dropdown({
  id,
  title,
  data,
  position = 'bottom-left',
  selectedId,
  onSelect,
  showErrors,
  setShowErrors,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
    selectedId ? data?.find(item => item.id === selectedId) : undefined
  );

  const handleChange = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect?.(item.id);
    setShowErrors(prev => ({
      ...prev,
      [id]: false,
    }));
    setIsOpen(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id={id}
        aria-label="toggle-dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`input-field justify-between !pr-4 ${
          showErrors[id] ? 'show-invalid' : ''
        }`}
      >
        <span>{selectedItem ? selectedItem.name : title}</span>
        <ArrowDown
          className={`transform duration-200 ease-in-out ${
            isOpen ? '-rotate-180' : ''
          }`}
        />
      </button>
      {isOpen ? (
        <div
          aria-label="dropdown-menu"
          className={`absolute bg-gray-100 w-full max-h-52 overflow-y-auto py-3 rounded shadow-md z-10 ${
            position === 'bottom-right'
              ? 'top-full right-0 '
              : position === 'bottom-left'
              ? 'top-full left-0 '
              : position === 'top-right'
              ? 'bottom-full right-0'
              : position === 'top-left'
              ? 'bottom-full left-0'
              : ''
          }`}
        >
          <ul
            role="menu"
            aria-labelledby={id}
            aria-orientation="vertical"
            className="leading-10"
          >
            {data?.map(item => (
              <li
                key={item.id}
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleChange(item);
                }}
                className={`flex items-center cursor-pointer hover:bg-gray-200 px-3 ${
                  selectedItem?.id === item.id ? 'bg-gray-300' : ''
                }`}
              >
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

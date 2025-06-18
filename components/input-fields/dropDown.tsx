import React, { useRef, useState, useMemo, useEffect } from 'react';
import ArrowDown from '../../app/icons/Arrow-down.svg';
import { useOutsideClick } from '@/lib/functions/useFunctions';
import { formatDate } from '@/lib/functions/validateFunctions';
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
}

export default function Dropdown({
  id,
  title,
  data,
  position = 'bottom-left',
  selectedId,
  onSelect,
  showErrors,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
    selectedId ? data?.find(item => item.id === selectedId) : undefined
  );
  useEffect(() => {
    if (selectedItem) {
      setInputValue(selectedItem.name);
    }
  }, [selectedItem, id]);

  const handleChange = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect?.(item.id);
    setIsOpen(false);
  };

  const filteredData = useMemo(() => {
    const query = inputValue.toLowerCase();

    const isExactMatch =
      selectedItem?.name.toLowerCase() === query ||
      selectedItem?.id.toLowerCase() === query;

    if (isExactMatch) {
      return data;
    }

    return data.filter(
      item =>
        item.name.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query)
    );
  }, [inputValue, data, selectedItem]);

  const autocompleteInput = () => {
    const matched = data.find(
      item => item.name.toLowerCase() === inputValue.toLowerCase()
    );
    if (matched) {
      handleChange(matched);
    } else if (filteredData.length > 0 && inputValue.length > 0) {
      handleChange(filteredData[0]);
    } else if (inputValue.length === 0 || filteredData.length === 0) {
      handleChange({ id: '', name: '' });
    }
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        type="text"
        role="combo"
        value={inputValue}
        placeholder={title}
        onChange={e => {
          setIsOpen(true);
          if (id === 'day' || id === 'year') {
            const formattedDate = formatDate(id, e.target.value);
            setInputValue(formattedDate);
          } else {
            setInputValue(e.target.value);
          }
        }}
        onClick={() => setIsOpen(true)}
        onBlur={() => {
          setIsOpen(false);
          autocompleteInput();
        }}
        className={`input-field justify-between ${
          showErrors[id] ? 'show-invalid' : ''
        }`}
      />
      <ArrowDown
        className={`absolute right-3 top-1/2 -translate-y-1/2 transform duration-100 ease-in-out ${
          isOpen ? '-rotate-180' : ''
        }`}
        onClick={(e: React.MouseEvent) => {
          setIsOpen(prev => !prev);
          e.stopPropagation();
          e.preventDefault();
        }}
      />
      {isOpen ? (
        <div
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
          <ul role="listbox" aria-labelledby={id} className="leading-10">
            {filteredData.length ? (
              filteredData.map(item => (
                <li
                  key={item.id}
                  role="option"
                  aria-selected={selectedItem?.id === item.id}
                  onMouseDown={e => {
                    e.preventDefault();
                    handleChange(item);
                  }}
                  className={`flex items-center cursor-pointer hover:bg-gray-200 px-3 ${
                    selectedItem?.id === item.id ? 'bg-gray-300' : ''
                  }`}
                >
                  {id === 'state' ? `${item.name} (${item.id})` : item.name}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-gray-500">
                No results found
              </li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

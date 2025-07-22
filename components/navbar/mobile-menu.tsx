import Menu from '../../app/icons/menu.svg';
import Close from '../../app/icons/close-primary.svg';
import ArrowDown from '../../app/icons/arrow_down_lg.svg';
import React, { useEffect, useRef } from 'react';
import { useOutsideClick } from '@/lib/functions/useFunctions';
import Link from 'next/link';
import { useState } from 'react';
import MainButton from '../buttons/mainButton';

type MenuProps = {
  dropdown: string | null;
  setDropdown: React.Dispatch<React.SetStateAction<string | null>>;
};

const getInvolvedItems = [
  { href: '/get-involved/volunteer', text: 'Volunteer' },
  { href: '/get-involved/partner', text: 'Partner with us' },
  { href: '/get-involved/donor', text: 'Become a donor' },
];

const dropdownItems = [
  { href: '/who-we-are', text: 'Who We Are' },
  { href: '/programs', text: 'Programs' },
  { href: '/contact-us', text: 'Contact' },
];

export default function MobileMenu({ dropdown, setDropdown }: MenuProps) {
  const [innerDropdown, setInnerDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!dropdown) {
      setInnerDropdown(null);
    }
  }, [dropdown]);

  // Close menu when clicking outside
  useOutsideClick(menuRef, () => setDropdown(null));

  const handleClick = (id: string) => {
    setDropdown(dropdown === id ? null : id);
  };

  return (
    <>
      {dropdown === 'menu' ? (
        <Close
          className="lg:hidden cursor-pointer"
          onClick={() => {
            setDropdown(null);
          }}
        />
      ) : (
        <Menu
          alt="menu"
          id="menu"
          className="lg:hidden cursor-pointer"
          onClick={() => {
            handleClick('menu');
          }}
        />
      )}

      {/* Dropdown menu items */}
      <div
        className={`
          absolute top-full left-0
          pb-[1.1875rem]
          w-full py-[0.625rem]
          rounded-b-[0.625rem]
          bg-white shadow-[0px_4px_6px_rgba(243,1,1,0.1)]
          flex flex-col items-start
          transition-all duration-300 ease-in-out
          z-[999] text-[1.25rem] p-neutral
          ${
            dropdown === 'menu'
              ? 'opacity-100 visible pointer-events-auto translate-y-0'
              : 'opacity-0 invisible pointer-events-none -translate-y-2'
          }
        `}
        ref={menuRef}
      >
        <div
          id="get-involved"
          className="flex items-center justify-between
              px-[1.5625rem] py-[0.9375rem]
              w-full active:bg-[#f4a488]"
          onClick={() => {
            setInnerDropdown(!innerDropdown ? 'get-involved' : null);
          }}
        >
          <p>Get Involved</p>
          <ArrowDown
            className={`transform transition-transform duration-200 ease-in-out ${
              innerDropdown === 'get-involved' ? 'rotate-180' : null
            }`}
          />
        </div>
        <div
          className={`flex flex-col w-full transition-all duration-300 ease-in-out overflow-hidden
                  ${
                    innerDropdown === 'get-involved'
                      ? 'max-h-[12rem] opacity-100 visible pointer-events-auto translate-y-0'
                      : 'max-h-0 opacity-0 invisible pointer-events-none -translate-y-2'
                  }`}
        >
          {getInvolvedItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                setDropdown(null);
              }}
              className={`flex items-center bg-[#ffece4] px-[3.125rem] py-[1.25rem]`}
            >
              {item.text}
            </Link>
          ))}
        </div>
        {dropdownItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="
              flex items-center
              px-[1.5625rem] py-[1.56rem]
              w-full active:bg-[#f4a488]
            "
            onClick={() => {
              setDropdown(null);
            }}
          >
            {item.text}
          </Link>
        ))}
        <div className="flex w-full px-[1.5625rem] py-[0.625rem]">
          <MainButton
            color="orange"
            text="Donate"
            href="/donate"
            width="fill"
            onClick={() => setDropdown(null)}
          />
        </div>
      </div>
    </>
  );
}

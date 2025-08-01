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
            z-[999] text-[1.25rem] text-[#2f2f2f]
          ${
            dropdown === 'menu'
              ? 'opacity-100 visible pointer-events-auto translate-y-0'
              : 'opacity-0 invisible pointer-events-none -translate-y-2'
          }
        `}
        ref={menuRef}
      >
        <div className="w-full px-[1.5625rem] active:bg-[#f4a488]">
          <div
            id="get-involved"
            className="relative flex items-center justify-between
          py-[0.9375rem] w-full"
            onClick={() => {
              setInnerDropdown(!innerDropdown ? 'get-involved' : null);
            }}
          >
            <p>Get Involved</p>
            <ArrowDown
              className={`transform transition-transform duration-200 ease-in-out ${
                innerDropdown === 'get-involved' ? 'rotate-180' : ''
              }`}
            />
          </div>

          {!innerDropdown && <div className="h-[1px] bg-[#ffece4] w-full" />}
        </div>
        <div
          className={`flex flex-col w-full transition-all duration-300 ease-in-out overflow-hidden
                  ${
                    innerDropdown === 'get-involved'
                      ? 'max-h-[12rem] opacity-100 visible pointer-events-auto translate-y-0'
                      : 'max-h-0 opacity-0 invisible pointer-events-none -translate-y-2'
                  }`}
        >
          {getInvolvedItems.map((item, index) => (
            <div
              key={item.href}
              className="group w-full bg-[#ffece4] active:bg-[#f4a488]"
            >
              <Link
                href={item.href}
                onClick={() => {
                  setDropdown(null);
                }}
                className="relative flex items-center"
              >
                <span className="flex w-full py-[1.25rem] px-[3.125rem] items-center justify-start">
                  {item.text}
                </span>
              </Link>
              {index !== getInvolvedItems.length - 1 && (
                <div className="px-[1.5625rem]">
                  <div className="h-[1px] opacity-[0.1] bg-[#8e463b] w-full group-active:opacity-0" />
                </div>
              )}
            </div>
          ))}
        </div>
        {dropdownItems.map(item => (
          <div key={item.href} className="group w-full active:bg-[#f4a488]">
            <Link
              href={item.href}
              className="flex items-center w-full"
              onClick={() => {
                setDropdown(null);
              }}
            >
              <span className="flex w-full h-full px-[1.5625rem] py-[1.56rem] items-center justify-start">
                {item.text}
              </span>
            </Link>
            <div className="px-[1.5625rem]">
              <div className="h-[1px] bg-[#ffece4] w-full group-active:hidden" />
            </div>
          </div>
        ))}
        <div className="flex w-full px-[1.5625rem] py-[0.625rem]">
          <MainButton
            color="orange"
            link={{ href: '/donate', label: 'Donate' }}
            width="fill"
            onClick={() => setDropdown(null)}
          />
        </div>
      </div>
    </>
  );
}

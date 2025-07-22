'use client';

import { useState } from 'react';
import Link from 'next/link';
import LogoSvg from '../../app/icons/LogoSVG.svg';
import Logo from '../../app/icons/logo.svg';
import ArrowDown from '../../app/icons/Arrow-down.svg';
import ArrowDownColor from '../../app/icons/Arrow-down-color.svg';
import MobileMenu from './mobile-menu';

// dropdown items array for future if we need to add more dropdowns
const dropdownItems = [
  {
    id: 'get-involved',
    label: 'Get Involved',
    links: [
      { href: '/get-involved/volunteer', text: 'Volunteer' },
      { href: '/get-involved/partner', text: 'Partner with us' },
      { href: '/get-involved/donor', text: 'Become a donor' },
    ],
  },
];

export default function NavBar() {
  const [dropdown, setDropdown] = useState<string | null>(null);
  const hoverAnimation =
    'transition duration-150 hover:scale-96 active:scale-96 hover:text-[#b1574a] pb-[2px] border-b-1 border-transparent hover:border-[#b1574a]';

  return (
    <nav className="relative flex justify-center items-center w-full px-[1.5625rem] py-[1.125rem]">
      <div className="flex flex-1 justify-between items-center lg:max-w-[76.5rem]">
        {/* left/logo side of navbar */}
        <Link href="/">
          {/* Mobile logo */}
          <div className="block lg:hidden py-[0.1875em]">
            <Logo alt="Logo" />
          </div>

          {/* Desktop logo */}
          <div className="hidden lg:block">
            <LogoSvg alt="Logo" />
          </div>
        </Link>
        <div className="block lg:hidden">
          <MobileMenu dropdown={dropdown} setDropdown={setDropdown} />
        </div>

        {/* right/links side of navbar */}
        <div className="hidden lg:flex justify-end items-center gap-[1.5rem] h-[3.125rem]">
          {dropdownItems.map(({ id, label, links }) => (
            <div key={id} className="flex flex-col relative pb-8 mt-8 group">
              <div className="flex w-32 h-6 justify-center items-center gap-0.5 text-base leading-[1.4] cursor-default">
                <p className="transition duration-150 group-hover:scale-105 active:scale-95 group-hover:text-[#b1574a] pb-0.5 border-b border-transparent group-hover:border-[#b1574a]">
                  {label}
                </p>
                <div className="pb-0.5">
                  <ArrowDown className="block group-hover:hidden" />
                  <ArrowDownColor className="hidden group-hover:block" />
                </div>
              </div>
              <div className="absolute top-full left-0 -mt-1 z-10 bg-white shadow-lg rounded-b-lg w-[13.125rem] py-2 flex flex-col items-start opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                {links.map(({ href, text }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex px-[1.875rem] py-[0.625rem] w-full text-left font-normal whitespace-nowrap hover:bg-[#f4a488]"
                  >
                    {text}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link href="/who-we-are" className={hoverAnimation}>
            Who We Are
          </Link>
          <Link href="/programs" className={hoverAnimation}>
            Programs
          </Link>
          <Link href="/contact-us" className={hoverAnimation}>
            Contact
          </Link>
          <button
            className="flex h-[3.125rem] px-[1.25rem] py-[1rem] justify-center items-center rounded-[0.625rem] cursor-pointer border-[1px] border-[#d9764e] bg-gradient-to-b from-[#d9764e] to-[#dd6d5c] hover:bg-[linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1)),linear-gradient(to_bottom,#d9764e,#dd6d5c)] hover:border-transparent"
            onClick={() => {
              window.location.href = '/donate';
            }}
          >
            <span className="text-base font-bold text-white">Donate</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

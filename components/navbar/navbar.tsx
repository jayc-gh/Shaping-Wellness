'use client';

import { useState, useRef } from 'react';
import './navbar.css';
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
  const [hovered, setHovered] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  return (
    <nav className="relative flex justify-center items-center w-full px-[1.5625rem] py-[1.125rem]">
      <div className="flex flex-1 justify-between items-center min-w-[21.25rem] lg:max-w-[76.5rem]">
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
            <div
              key={id}
              className={`nav-dropdown-wrapper ${
                dropdown === id ? 'active' : ''
              }`}
              ref={dropdownRef}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="nav-dropdown-container p4 !font-[400] p-neutral">
                <p className="links">{label}</p>
                {hovered === id ? (
                  <ArrowDownColor
                    className={`transform duration-100 ease-in-out ${
                      dropdown === id ? '-rotate-180' : ''
                    }`}
                  />
                ) : (
                  <ArrowDown />
                )}
              </div>

              <div
                className={`nav-dropdown-items-container`}
                onClick={e => e.stopPropagation()}
              >
                {links.map(({ href, text }) => (
                  <Link
                    key={href}
                    href={href}
                    className="nav-dropdown-item p4 !font-[400]"
                    onClick={() => {
                      setDropdown(null);
                    }}
                  >
                    {text}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link href="/who-we-are" className="links">
            Who We Are
          </Link>
          <Link href="/programs" className="links">
            Programs
          </Link>
          <Link href="/contact-us" className="links">
            Contact
          </Link>
          <button
            className="filled-btn"
            onClick={() => {
              window.location.href = '/donate';
            }}
          >
            <span className="btn text-white">Donate</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

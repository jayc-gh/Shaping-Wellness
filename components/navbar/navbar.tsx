'use client';

import { useState, useRef, useEffect } from 'react';
import './navbar.css';
import Link from 'next/link';
import LogoSvg from '../../app/icons/LogoSVG.svg';
import ArrowDown from '../../app/icons/Arrow-down.svg';
import ArrowUp from '../../app/icons/Arrow-up.svg';

export default function NavBar() {
  const [dropdown, setDropDown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropDown(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // dropdown items array for future if we need to add more dropdowns
  const dropdownItems = [
    {
      id: 'get-involved',
      label: 'Get Involved',
      links: [
        { href: '/get-involved/partner', text: 'Partner' },
        { href: '/get-involved/volunteer', text: 'Volunteer' },
        { href: '/get-involved/donor', text: 'Donor' },
      ],
    },
  ];

  const handleClick = (id: string) => {
    if (dropdown === id) {
      setDropDown(null);
    } else {
      setDropDown(id);
    }
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-content-container">
        {/* left/logo side of navbar */}
        <Link href="/">
          <LogoSvg alt="Logo" />
        </Link>

        {/* right/links side of navbar */}
        <div className="links-container">
          {dropdownItems.map(({ id, label, links }) => (
            <div
              key={id}
              className={`dropdown-wrapper ${dropdown === id ? 'active' : ''}`}
              ref={dropdownRef}
              onClick={() => {
                if (isMobile) handleClick(id);
              }}
            >
              <div className="dropdown-container">
                {label}
                {!dropdown ? <ArrowDown /> : <ArrowUp />}
              </div>

              <div
                className={`dropdown-items-container ${
                  isMobile && dropdown === id ? 'mobile-visible' : ''
                }`}
                onClick={e => e.stopPropagation()}
              >
                {links.map(({ href, text }) => (
                  <Link
                    key={href}
                    href={href}
                    className="dropdown-item"
                    onClick={() => {
                      setDropDown(null);
                    }}
                  >
                    {text}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link href="/who-we-are">Who We Are</Link>
          <Link href="/programs">Programs</Link>
          <Link href="/contact-us">Contact</Link>
          <Link href="/donate">
            <button className="donate-btn">
              <span className="btn text-white">Donate</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

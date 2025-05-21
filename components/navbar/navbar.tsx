'use client';

import { useState, useRef, useEffect } from 'react';
import './navbar.css';
import Link from 'next/link';
import LogoSvg from '../../app/icons/LogoSVG.svg';
import ArrowDown from '../../app/icons/Arrow-down.svg';
import ArrowUpColor from '../../app/icons/Arrow-up-color.svg';
import ArrowDownColor from '../../app/icons/Arrow-down-color.svg';
import { useOutsideClick } from '@/lib/functions';

export default function NavBar() {
  const [dropdown, setDropDown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useOutsideClick(dropdownRef, () => setDropDown(null));

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
              className={`nav-dropdown-wrapper ${
                dropdown === id ? 'active' : ''
              }`}
              ref={dropdownRef}
              onClick={() => {
                if (isMobile) handleClick(id);
              }}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="nav-dropdown-container p4 normal p-neutral">
                <p className="links">{label}</p>
                {dropdown === id ? (
                  <ArrowUpColor />
                ) : hovered === id ? (
                  <ArrowDownColor />
                ) : (
                  <ArrowDown />
                )}
              </div>

              <div
                className={`nav-dropdown-items-container ${
                  isMobile && dropdown === id ? 'mobile-visible' : ''
                }`}
                onClick={e => e.stopPropagation()}
              >
                {links.map(({ href, text }) => (
                  <Link
                    key={href}
                    href={href}
                    className="nav-dropdown-item p4 normal"
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

          <Link href="/who-we-are" className="links">
            Who We Are
          </Link>
          <Link href="/programs" className="links">
            Programs
          </Link>
          <Link href="/contact-us" className="links">
            Contact
          </Link>
          <Link href="/donate">
            <button className="filled-btn">
              <span className="btn text-white">Donate</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

'use client';

import { useState } from 'react';
import './navbar.css';
import Link from 'next/link';
import LogoSvg from '../../app/icons/LogoSVG.svg';
import ArrowDown from '../../app/icons/Arrow-down.svg';
import ArrowUp from '../../app/icons/Arrow-up.svg';

export default function NavBar() {
  const [dropdown, setDropDown] = useState<string | null>(null);

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
              className="dropdown-wrapper"
              onMouseEnter={() => setDropDown(id)}
              onMouseLeave={() => setDropDown(null)}
            >
              <div className="dropdown-container">
                {label}
                <ArrowDown alt="Arrow Down" />
              </div>

              {dropdown === id && (
                <div className="dropdown-items-container">
                  {links.map(({ href, text }) => (
                    <Link key={href} href={href} className="dropdown-item">
                      {text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link href="/who-we-are">Who We Are</Link>
          <Link href="/programs">Programs</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/donate">Donate</Link>
        </div>
      </div>
    </nav>
  );
}

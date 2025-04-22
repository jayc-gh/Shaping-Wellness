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

  const dropdownStyles = 'absolute left-0 bg-white shadow-md rounded-md';
  const linkStyles = 'block px-4 py-2 hover:bg-gray-100 hover:rounded-md w-35';

  return (
    <nav className="navbar-container">
      <div className="navbar-content-container">
        {/* left/logo side of navbar */}
        <Link href="/">
          <LogoSvg alt="Logo" />
        </Link>

        {/* right/links side of navbar */}
        <div className="links-container">
          {/* map through dropdown items */}
          {dropdownItems.map(({ id, label, links }) => (
            <span
              key={id}
              className="relative"
              onMouseEnter={() => setDropDown(id)}
              onMouseLeave={() => setDropDown(null)}
            >
              <button className="">{label}</button>
              {dropdown === id && (
                <div className={dropdownStyles}>
                  {links.map(({ href, text }) => (
                    <Link key={href} href={href} className={linkStyles}>
                      {text}
                    </Link>
                  ))}
                </div>
              )}
            </span>
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

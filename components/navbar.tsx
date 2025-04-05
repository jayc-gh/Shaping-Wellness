'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    {
      id: 'about-us',
      label: 'About Us',
      links: [
        { href: '/about-us/who-we-are', text: 'Who We Are' },
        { href: '/about-us/research', text: 'Research' },
      ],
    },
  ];

  const dropdownStyles = 'absolute left-0 bg-white shadow-md rounded-md';
  const linkStyles = 'block px-4 py-2 hover:bg-gray-100 hover:rounded-md w-35';

  return (
    <nav className="flex justify-between items-center w-full bg-white shadow-sm z-999 text-black h-20">
      {/* left/logo side of navbar */}
      <div className="max-w-7xl px-4 py-3">
        <Link
          className="flex items-center text-xl font-bold text-emerald-700"
          href="/"
        >
          <Image src="/globe.svg" width={60} height={60} alt="Logo" />
          Logo
        </Link>
      </div>

      {/* right/links side of navbar */}
      <div className="flex px-4 py-3 space-x-12">
        {/* map through dropdown items */}
        {dropdownItems.map(({ id, label, links }) => (
          <div
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
          </div>
        ))}
        <Link href="/programs">Programs</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/donate">Donate</Link>
      </div>
    </nav>
  );
}

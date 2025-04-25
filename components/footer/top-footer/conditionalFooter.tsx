'use client';

import { usePathname } from 'next/navigation';
import FooterT from './footerT';

export default function ConditionalFooter() {
  const pathname = usePathname();

  if (
    pathname === '/donate' ||
    pathname === '/get-involved/volunteer/volunteer-form' ||
    pathname === '/get-involved/partner/partner-form'
  )
    return null;

  return (
    <div className="relative flex justify-center">
      <FooterT />
      <div className="footer-line"></div>
    </div>
  );
}

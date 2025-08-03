'use client';

import Link from 'next/link';
import PrivacyPolicy from '@/components/footer/bottom-footer/privacy-policy';
import { useOutsideClick, useStopScroll } from '@/lib/functions/useFunctions';
import { useState, useRef } from 'react';

export default function FooterB() {
  const [popup, setPopup] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(popupRef, () => setPopup(false));

  // page fixed (not scrollable) when popup is open
  useStopScroll(popup);

  return (
    <div className="flex justify-center text-white w-full lg:h-[4.375rem] lg:items-center lg:py-0">
      <div className="flex flex-col text-[0.75rem] text-base text-center items-center gap-[1.875rem] self-stretch lg:flex-row lg:max-w-[76.5rem] lg:justify-between lg:w-full">
        <p className="lg:font-[500]">
          <span className="block lg:hidden">
            © 2025 Shaping Wellness Foundation. All rights reserved. <br />
            Shaping Wellness Foundation is a 501(c)(3) tax-exempt nonprofit
            organization.
          </span>
          <span className="hidden lg:block">
            © 2025 Shaping Wellness Foundation. All rights reserved. Shaping
            Wellness Foundation is a 501(c)(3) tax-exempt nonprofit
            organization.
          </span>
        </p>

        <div className="flex items-center gap-[0.5rem]">
          <button onClick={() => setPopup(!popup)}>
            <span className="thin underline cursor-pointer">
              Privacy Policy
            </span>
          </button>
          <p className="">|</p>
          <p className="">
            Images by{' '}
            <Link href="https://www.freepik.com/" className="underline">
              Freepik
            </Link>
          </p>
          <p className="">|</p>
          <p className="">
            Design:{' '}
            <Link
              href="https://brendanarvaez.framer.website/"
              className="underline"
            >
              BN
            </Link>
          </p>
          <p className="">|</p>
          <p className="">
            Dev:{' '}
            <Link href="https://github.com/jayc-gh" className="underline">
              JC
            </Link>
          </p>
        </div>
      </div>
      {popup ? (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[linear-gradient(0deg,rgba(0,0,0,0.5),rgba(0,0,0,0.5))]">
          <div ref={popupRef}>
            <PrivacyPolicy setPopup={setPopup} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

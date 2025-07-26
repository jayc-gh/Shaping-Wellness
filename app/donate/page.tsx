'use client';

import DonateForm from '@/components/pages/donate/donationForm';
import MainSection from '@/components/sections/headerSection';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function DonatePage() {
  const [showBg, setShowBg] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    function updateShowBg() {
      setShowBg(window.innerWidth < 1024);
    }
    updateShowBg();
    setHasMounted(true);

    window.addEventListener('resize', updateShowBg);
    return () => window.removeEventListener('resize', updateShowBg);
  }, []);

  if (!hasMounted) return null;
  return (
    <main
      className="flex flex-col w-full items-center justify-center lg:flex-row
                 bg-no-repeat bg-cover lg:bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/images/DonateForm.jpg')]"
    >
      <div className="flex lg:py-[5rem] lg:px-[6.75rem] w-full justify-center">
        <div className="flex w-full flex-col lg:flex-row lg:justify-between lg:max-w-[1224px] gap-[1.5rem]">
          <div className="flex lg:w-[31rem]">
            <MainSection
              flagText="DONATE"
              heading="Thank you for choosing to support Shaping Wellness Foundation."
              description={
                <>
                  Your donation directly funds school-based fitness programs,
                  health education workshops, and mentorship opportunities for
                  girls in underserved communities. Together, we can build a
                  future where every girl has the tools, support, and confidence
                  to lead a healthy, empowered life. <br />
                  <br />
                  Curious about the difference you&apos;re making? Visit our{' '}
                  <Link href="/get-involved/donor" className="cursor-pointer">
                    <span className="underline">Become a Donor page</span>
                  </Link>{' '}
                  to see how your support changes lives.
                </>
              }
              bgImageUrl="/images/DonateForm.jpg"
              aspectRatio="21/10"
              backgroundPosition="10% 20%, 10% 20%"
              transparent={true}
              showBg={showBg}
            />
          </div>
          <DonateForm />
        </div>
      </div>
    </main>
  );
}

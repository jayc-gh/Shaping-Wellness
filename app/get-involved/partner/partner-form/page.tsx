'use client';

import PartnerForm from '@/components/forms/partnerForm';
import MainSection from '@/components/sections/headerSection';
import { useState, useEffect } from 'react';

export default function PartnerFormPage() {
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
             bg-no-repeat bg-cover bg-[center_10%] lg:bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/images/PartnerForm.jpg')]"
    >
      <div className="flex lg:py-[5rem] lg:px-[6.75rem] w-full justify-center">
        <div className="flex w-full flex-col lg:flex-row lg:gap-[1.5rem] lg:max-w-[1224px]">
          <MainSection
            flagText="PARTNER"
            heading="Build brighter futures with us"
            description={
              <>
                Thank you for your interest in partnering with Shaping Wellness
                Foundation.
                <br />
                <br /> We&apos;re excited to work together to expand access to
                wellness education, fitness opportunities, and mentorship for
                girls in your school, organization, or community center. Your
                partnership helps us create safe, supportive spaces where girls
                can grow stronger - physically, mentally, and emotionally.
              </>
            }
            bgImageUrl="/images/PartnerForm.jpg"
            backgroundPosition="10% 20%, 10% 20%"
            transparent={true}
            showBg={showBg}
          />
          <PartnerForm />
        </div>
      </div>
    </main>
  );
}

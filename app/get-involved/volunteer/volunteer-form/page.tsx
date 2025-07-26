'use client';

import VolunteerForm from '@/components/forms/volunterForm';
import MainSection from '@/components/sections/headerSection';
import { useState, useEffect } from 'react';

export default function VolunteerFormPage() {
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
             bg-no-repeat bg-cover bg-[center_10%] lg:bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/images/VolForm.jpg')]"
    >
      <div className="flex lg:py-[5rem] lg:px-[6.75rem] w-full justify-center">
        <div className="flex w-full flex-col lg:flex-row lg:gap-[1.5rem] lg:max-w-[1224px]">
          <MainSection
            flagText="VOLUNTEER"
            heading="Building futures through service"
            description={
              <>
                Thank you for your interest in volunteering with Shaping
                Wellness Foundation!
                <br />
                <br /> Your time and talents can make a meaningful impact in the
                lives of girls who need it most. Whether you&apos;re leading a
                workshop, mentoring a student, or helping run a program, your
                support helps build confidence, foster lifelong healthy habits,
                and create lasting change in our community.
              </>
            }
            bgImageUrl="/images/VolForm.jpg"
            backgroundPosition="10% 20%, 10% 20%"
            transparent={true}
            showBg={showBg}
          />
          <VolunteerForm />
        </div>
      </div>
    </main>
  );
}

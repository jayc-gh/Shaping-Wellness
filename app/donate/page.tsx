'use client';

import DonateForm from '@/components/pages/donate/donationForm';
import FormSummary from '@/components/sections/formSummary';
import MainSection from '@/components/sections/headerSection';
import Link from 'next/link';

export default function DonatePage() {
  return (
    <main
      className="flex flex-col w-full lg:flex-row bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/images/DonateForm.jpg)`,
        backgroundPosition: 'center 20%, center 20%',
      }}
    >
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <MainSection
          flagText="DONATE"
          heading="Thank you for choosing to support Shaping Wellness Foundation."
          description={
            <>
              Your donation directly funds school-based fitness programs, health
              education workshops, and mentorship opportunities for girls in
              underserved communities. Together, we can build a future where
              every girl has the tools, support, and confidence to lead a
              healthy, empowered life. <br />
              <br />
              Curious about the difference you&apos;re making? Visit our{' '}
              <Link href="/get-involved/donor" className="cursor-pointer">
                <span className="underline">Become a Donor page</span>
              </Link>{' '}
              to see how your support changes lives.
            </>
          }
          bgImageUrl="/images/DonateForm.jpg"
          aspectRatio="15/13"
          backgroundPosition="10% center, 10% center"
        />
        <div className="flex justify-center">
          <DonateForm />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex w-full px-[1.5625rem] py-[3.125rem] lg:py-[5rem] lg:px-[6.75rem] justify-center items-center">
        <div className="flex w-full max-w-[1224px] justify-between items-start gap-[1.5rem]">
          <FormSummary
            flagText="DONATE"
            header="Thank you for choosing to support Shaping Wellness Foundation."
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
          />
          <DonateForm />
        </div>
      </div>
    </main>
  );
}

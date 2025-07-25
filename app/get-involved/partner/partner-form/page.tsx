'use client';

import PartnerForm from '@/components/forms/partnerForm';
import MainSection from '@/components/sections/headerSection';
import FormSummary from '@/components/sections/formSummary';

export default function PartnerFormPage() {
  return (
    <main
      className="flex flex-col w-full lg:flex-row bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/images/PartnerForm.jpg)`,
        backgroundPosition: 'center center, center center',
      }}
    >
      {/* Mobile Layout */}
      <div className="block lg:hidden">
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
          aspectRatio="15/13"
          backgroundPosition="10% center, 10% center"
        />
        <div className="flex justify-center">
          <PartnerForm />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex w-full px-[1.5625rem] py-[3.125rem] lg:py-[5rem] lg:px-[6.75rem] justify-center items-center">
        <div className="flex w-full max-w-[1224px] justify-between items-start gap-[1.5rem]">
          <FormSummary
            flagText="PARTNER"
            header="Build brighter futures with us"
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
          />
          <PartnerForm />
        </div>
      </div>
    </main>
  );
}

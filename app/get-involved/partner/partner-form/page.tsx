'use client';

import PartnerForm from '@/components/forms/partnerForm';
import MainSection from '@/components/sections/headerSection';

export default function PartnerFormPage() {
  return (
    <main
      className="flex flex-col w-full items-center justify-center lg:flex-row
             bg-no-repeat bg-cover bg-[center_10%] lg:bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/images/PartnerForm.jpg')] lg:bg-[center_10%]"
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
            aspectRatio="21/10"
            backgroundPosition="10% 20%, 10% 20%"
            transparent={true}
          />
          <PartnerForm />
        </div>
      </div>
    </main>
  );
}

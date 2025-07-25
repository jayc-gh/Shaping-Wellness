'use client';

import VolunteerForm from '@/components/forms/volunterForm';
import FormSummary from '@/components/sections/formSummary';
import MainSection from '@/components/sections/headerSection';

export default function VolunteerFormPage() {
  return (
    <main
      className="flex flex-col w-full lg:flex-row bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage:
          'linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/images/VolForm.jpg)',
        backgroundPosition: 'center 10%, center 10%',
      }}
    >
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <MainSection
          flagText="VOLUNTEER"
          heading="Building futures through service"
          description={
            <>
              Thank you for your interest in volunteering with Shaping Wellness
              Foundation!
              <br />
              <br /> Your time and talents can make a meaningful impact in the
              lives of girls who need it most. Whether you&apos;re leading a
              workshop, mentoring a student, or helping run a program, your
              support helps build confidence, foster lifelong healthy habits,
              and create lasting change in our community.
            </>
          }
          bgImageUrl="/images/VolForm.jpg"
          aspectRatio="15/13"
          backgroundPosition="center 20%, center 20%"
        />
        <div className="flex justify-center">
          <VolunteerForm />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex w-full px-[1.5625rem] py-[3.125rem] lg:py-[5rem] lg:px-[6.75rem] justify-center items-center">
        <div className="flex w-full max-w-[1224px] justify-between items-start gap-[1.5rem]">
          <FormSummary
            flagText="VOLUNTEER"
            header="Building futures through service"
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
          />
          <VolunteerForm />
        </div>
      </div>
    </main>
  );
}

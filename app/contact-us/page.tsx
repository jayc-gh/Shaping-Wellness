'use client';

import TopCurveColor from '../../app/icons/top-curve-color.svg';
import BotCurveColor from '../../app/icons/bottom-curve-color.svg';
import Email from '../../app/icons/contact/mail.svg';
import Phone from '../../app/icons/contact/phone.svg';
import Globe from '../../app/icons/contact/globe.svg';
import Facebook from '../../app/icons/contact/facebook.svg';
import Instagram from '../../app/icons/contact/instagram-black.svg';
import Linkedin from '../../app/icons/contact/linkedin.svg';
import ContactForm from '@/components/pages/contact/contactForm';
import FAQSection from '@/components/pages/contact/faqSection';
import MainSection from '@/components/sections/headerSection';
import GradientBox from '@/components/sections/gradientBox';
import { fbLink, igLink, linkedinLink, orgPhone } from '@/lib/constants';

export default function Contact() {
  return (
    <main className="flex flex-col w-full">
      <MainSection
        flagText="CONTACT US"
        heading="Reach out, we're ready to help."
        description="Have a question or want to get involved? We're here to help. Check out our FAQs below or reach out directly."
        bgImageUrl="/images/ContactHeader.jpg"
        aspectRatio="aspect-[1/1] lg:aspect-[18/5]"
        contentMaxWidth="lg:max-w-[37.5rem]"
        backgroundPosition="center 60%, center 60%"
      />
      <div className="flex justify-center items-center pt-[2.5rem] pb-[1.5rem] px-[1.5625rem] lg:px-[6.75rem]">
        <h4 className="text-[#b1574a] !text-base !font-bold">GET IN TOUCH</h4>
      </div>
      <div className="flex justify-center items-center py-[2rem] px-[1.5625rem] lg:px-[6.75rem] w-full">
        <div className="flex flex-col justify-center items-center lg:items-stretch gap-[1.5rem] max-w-[1224px] w-full lg:flex-row">
          <GradientBox
            Icon={Email}
            title="Email"
            content={<>info@shapingwellness.com</>}
            classString="relative w-full"
          />
          <GradientBox
            Icon={Phone}
            title="Phone"
            content={<>{orgPhone}</>}
            classString="relative w-full"
          />
          <GradientBox
            Icon={Globe}
            title="Socials"
            content={
              <div className="flex items-center justify-center">
                <a
                  href={fbLink}
                  className="cursor-pointer z-10"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook />
                </a>
                <a
                  href={igLink}
                  className="cursor-pointer mr-3 ml-2 z-10"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram />
                </a>
                <a
                  href={linkedinLink}
                  className="cursor-pointer z-10"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin />
                </a>
              </div>
            }
            classString="relative w-full"
          />
        </div>
      </div>
      <div className="relative top-[0.0625rem]">
        <TopCurveColor />
      </div>
      <div className="flex flex-col justify-center items-center px-[1.5625rem] py-[2.5rem] w-full lg:px-[6.75rem] bg-[#ffece4]">
        <div className="flex flex-col justify-center items-center gap-[2rem] lg:flex-row lg:gap-[1.5rem] lg:max-w-[1224px] lg:w-full lg:items-start">
          <div className="lg:max-w-[31rem] lg:py-[5rem]">
            <p className="text-[1.25rem] lg:text-[2rem] font-bold leading-[140%] text-[#b1574a]">
              We are looking forward to hearing from you!
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
      <div className="relative bottom-[0.0625rem]">
        <BotCurveColor />
      </div>
      <FAQSection />
    </main>
  );
}

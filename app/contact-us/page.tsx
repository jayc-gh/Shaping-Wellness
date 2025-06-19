'use client';

import Link from 'next/link';
import TopCurveColor from '../../app/icons/top-curve-color.svg';
import BotCurveColor from '../../app/icons/bottom-curve-color.svg';
import Email from '../../app/icons/contact/mail.svg';
import Phone from '../../app/icons/contact/phone.svg';
import Globe from '../../app/icons/contact/globe.svg';
import Facebook from '../../app/icons/contact/facebook.svg';
import XLogo from '../../app/icons/contact/x-logo.svg';
import Linkedin from '../../app/icons/contact/linkedin.svg';
import GradientRectangle from '../../app/icons/gradient-rectangle.svg';
import ContactForm from '@/components/pages/contact/contactForm';
import FAQSection from '@/components/pages/contact/faqSection';

export default function Contact() {
  return (
    <main className="flex flex-col w-full">
      <div
        className="main-section"
        style={
          {
            '--bg-image': 'url("/images/DonationForm.webp")',
          } as React.CSSProperties
        }
      >
        <div className="main-section-wrapper">
          <div className="main-section-content">
            <div className="flag">
              <h4>CONTACT US</h4>
            </div>
            <h2>Reach out, we&apos;re ready to help.</h2>
            <p className="p3">
              Have a question or want to get involved? We&apos;re here to help.
              Check out our FAQs below or reach out directly.
            </p>
          </div>
        </div>
      </div>
      <div className="three-col-section" id="contact">
        <div className="three-col-section-p-container">
          <h4 className="sec-coral">GET IN TOUCH</h4>
        </div>
        <div className="three-col-section-content">
          <div className="three-col-section-boxes-container">
            <div className="three-col-section-box-wrapper">
              <Email className="absolute" />
              <div className="three-col-section-box">
                <GradientRectangle className="absolute" />
                <div className="three-col-section-box-content h-[91px]">
                  <h3 className="p-coral">Email</h3>
                  <p className="p3">info@shapingwellness.com</p>
                </div>
              </div>
            </div>
            <div className="three-col-section-box-wrapper">
              <Phone className="absolute" />
              <div className="three-col-section-box">
                <GradientRectangle className="absolute" />
                <div className="three-col-section-box-content h-[91px]">
                  <h3 className="p-coral">Phone</h3>
                  <p className="p3">555-555-5555</p>
                </div>
              </div>
            </div>
            <div className="three-col-section-box-wrapper">
              <Globe className="absolute" />
              <div className="three-col-section-box">
                <GradientRectangle className="absolute" />
                <div className="three-col-section-box-content h-[91px]">
                  <h3 className="p-coral">Socials</h3>
                  <div className="flex items-center">
                    <Link href="" className="cursor-pointer z-10">
                      <Facebook />
                    </Link>
                    <Link href="" className="cursor-pointer mr-3 ml-2 z-10">
                      <XLogo />
                    </Link>
                    <Link href="" className="cursor-pointer z-10">
                      <Linkedin />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative top-[1px]">
        <TopCurveColor />
      </div>
      <div className="two-col-section bg-soft-coral">
        <div className="two-col-section-content !items-start">
          <div className="two-col-section-text-container pt-[80px] pb-[80px] !w-[496px]">
            <p className="p0">We are looking forward to hearing from you!</p>
          </div>
          <ContactForm />
        </div>
      </div>
      <div className="relative bottom-[1px]">
        <BotCurveColor />
      </div>
      <FAQSection />
    </main>
  );
}

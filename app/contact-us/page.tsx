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
              Have a question or want to get involved? We’re here to help. Check
              out our FAQs below or reach out directly.
            </p>
          </div>
        </div>
      </div>
      <div className="three-col-section">
        <div className="three-col-section-p-container">
          <h4 className="text-[#B1574A]">GET IN TOUCH</h4>
        </div>
        <div className="three-col-section-content">
          <div className="three-col-section-boxes-container">
            <div className="three-col-section-box-wrapper">
              <Email className="absolute" />
              <div className="three-col-section-box">
                <GradientRectangle className="absolute" />
                <div className="three-col-section-box-content">
                  <h3 className="text-[#DD6D5C]">Email</h3>
                  <p className="p3">info@shapingwellness.com</p>
                </div>
              </div>
            </div>
            <div className="three-col-section-box-wrapper">
              <Phone className="absolute" />
              <div className="three-col-section-box">
                <GradientRectangle className="absolute" />
                <div className="three-col-section-box-content">
                  <h3 className="text-[#DD6D5C]">Phone</h3>
                  <p className="p3">555-555-5555</p>
                </div>
              </div>
            </div>
            <div className="three-col-section-box-wrapper">
              <Globe className="absolute" />
              <div className="three-col-section-box">
                <GradientRectangle className="absolute" />
                <div className="three-col-section-box-content">
                  <h3 className="text-[#DD6D5C]">Socials</h3>
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
      <div className="two-col-section !bg-[#ffece4]">
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
      <div className="last-section">
        <div className="last-section-content">
          <h4 className="text-[#A04E43]">CONTACT US</h4>
          <p className="p1 text-[#49241e]">
            Have questions or want to get involved? We’re here to help!
          </p>
          <Link href="/contact-us" className="filled-btn w-[184px]">
            <p className="btn text-[#fff]">Send a message</p>
          </Link>
        </div>
      </div>
    </main>
  );
}

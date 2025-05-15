'use client';

import Link from 'next/link';
import TopCurveColor from '../../../app/icons/top-curve-color.svg';
import BotCurveColor from '../../../app/icons/bottom-curve-color.svg';
import GradientRectangle from '../../../app/icons/partner/gradient-rectangle-partner.svg';
import Dumbbell from '../../../app/icons/partner/dumbbell.svg';
import Notebook from '../../../app/icons/partner/notebook-pen.svg';
import Mentorship from '../../../app/icons/partner/mentorships.svg';
import Check from '../../../app/icons/partner/check.svg';
import Divider from '../../../app/icons/divider-line.svg';
import RightArrow from '../../../app/icons/right-arrow.svg';

export default function Partner() {
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
              <h4>BECOME A PARTNER</h4>
            </div>
            <h2>Unite to make a difference</h2>
            <p className="p3">
              If your school or organization is interested in hosting one of our
              programs or collaborating on future wellness initiatives,
              we&apos;d love to connect.
            </p>
            <Link
              href="/get-involved/partner/partner-form"
              className="hollow-btn"
            >
              <span className="btn">Partnership Inquiry Form</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="two-col-section">
        <div className="two-col-section-content !items-start py-[40px]">
          <div className="two-col-section-subtitle-container w-1/2">
            <h4>WHY PARTNER WITH US?</h4>
            <h3 className="sec-coral w-[500px]">
              Help girls build confidence, develop healthy habits, and thrive.
            </h3>
          </div>
          <p className="p3 w-1/2">
            Girls in underserved communities often face real barriers to
            accessing consistent fitness opportunities, health education, and
            positive mentorship, all of which are critical to long-term
            wellness. By partnering with us, you&apos;re not only supporting
            these girls directly, but also investing in healthier, more
            resilient communities for the future.
          </p>
        </div>
      </div>
      <div className="divider-section">
        <Divider />
      </div>
      <div className="three-col-section">
        <div className="three-col-section-content">
          <div className="three-col-section-p-container">
            <h4 className="sec-coral">WHO CAN PARTNER WITH US?</h4>
            <p className="p3">
              <span className="coral-4 italic !font-[600]">
                We&apos;re currently accepting new partnership inquiries for
                Fall 2025.
              </span>{' '}
              Together, we can help girls build confidence, strengthen healthy
              habits, and thrive in every aspect of their lives. We&apos;re
              actively seeking partnerships with:
            </p>
          </div>
          <div className="three-col-section-hover-cards-container">
            <div
              className="three-col-section-hover-card"
              style={
                {
                  '--bg-image': 'url("/images/DonationForm.webp")',
                } as React.CSSProperties
              }
            >
              <h3 className="background-color">Middle and High School</h3>
              <p className="p3 hover-text">
                Schools looking to introduce or expand wellness initiatives.
              </p>
            </div>
            <div
              className="three-col-section-hover-card"
              style={
                {
                  '--bg-image': 'url("/images/DonationForm.webp")',
                } as React.CSSProperties
              }
            >
              <h3 className="background-color">Youth Organizations</h3>
              <p className="p3 hover-text">
                Youth Organizations committed to supporting girls&apos; health
                and development.
              </p>
            </div>
            <div
              className="three-col-section-hover-card"
              style={
                {
                  '--bg-image': 'url("/images/DonationForm.webp")',
                } as React.CSSProperties
              }
            >
              <h3 className="background-color">Community Centers</h3>
              <p className="p3 hover-text">
                Community Centers looking to create inclusive spaces for girls
                to connect and grow.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative top-[1px]">
        <TopCurveColor />
      </div>
      <div className="three-col-section bg-soft-coral">
        <div className="three-col-section-p-container">
          <h4 className="sec-coral">WHAT YOU&apos;LL GAIN</h4>
          <p className="p3">
            As a partner, your school or organization will receive access to our
            three pilot programs launching in 2025. All programs are
            intentionally designed to be inclusive and culturally relevant,
            accessible within school or community spaces, and led by trained
            professionals and volunteers.
          </p>
        </div>
        <div className="three-col-section-boxes-container">
          <div className="three-col-section-box-wrapper">
            <Dumbbell className="absolute" />
            <div className="three-col-section-box">
              <GradientRectangle className="absolute" />
              <div className="three-col-section-box-content">
                <h3 className="sec-coral">Fitness Sessions</h3>
                <p className="p3">
                  Group-based physical activities designed to encourage movement
                  and build confidence.
                </p>
              </div>
            </div>
          </div>
          <div className="three-col-section-box-wrapper">
            <Notebook className="absolute" />
            <div className="three-col-section-box">
              <GradientRectangle className="absolute" />
              <div className="three-col-section-box-content">
                <h3 className="sec-coral">Empowerment</h3>
                <p className="p3">
                  Interactive workshops covering nutrition basics, mental
                  health, body image, and self-care.
                </p>
              </div>
            </div>
          </div>
          <div className="three-col-section-box-wrapper">
            <Mentorship className="absolute" />
            <div className="three-col-section-box">
              <GradientRectangle className="absolute" />
              <div className="three-col-section-box-content">
                <h3 className="sec-coral">Empowerment</h3>
                <p className="p3">
                  Facilitated mentor connections that pair girls with trusted
                  female role models who offer guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Link href="/programs" className="link-btn mt-[27px]">
          <h4 className="p3 link-btn-text sec-coral !font-semibold">
            LEARN MORE ABOUT OUR PROGRAMS
          </h4>
          <RightArrow />
        </Link>
      </div>
      <div className="relative bottom-[1px]">
        <BotCurveColor />
      </div>
      <div className="three-col-section ">
        <div className="three-col-section-content">
          <div className="three-col-section-p-container">
            <h4 className="sec-coral">WHY IT MATTERS</h4>
            <p className="p3">
              By integrating these programs into your organization, you can
              create a meaningful, measurable impact in the lives of the girls
              you serve. Studies consistently show that early access to wellness
              education, fitness, and mentorship can:
            </p>
          </div>
          <div className="three-col-section-boxes-container">
            <div className="three-col-section-box-content-no-border">
              <Check />
              <p className="p3">
                Reduce risks of chronic illness and childhood obesity.
              </p>
            </div>
            <div className="three-col-section-box-content-no-border">
              <Check />
              <p className="p3">
                Boost academic performance, confidence, and emotional
                resilience.
              </p>
            </div>
            <div className="three-col-section-box-content-no-border">
              <Check />
              <p className="p3">
                Provide safe spaces where girls can connect, learn, and grow.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="last-section">
        <div className="last-section-content">
          <h4 className="coral-3">READY TO PARTNER?</h4>
          <p className="p1 c7">
            Ready to bring wellness programs to your school or community?
          </p>
          <Link
            href="/get-involved/partner/partner-form"
            className="filled-btn"
          >
            <p className="btn background-color">Partnership Inquiry Form</p>
          </Link>
        </div>
      </div>
    </main>
  );
}

'use client';

import Link from 'next/link';
import TopCurveColor from '../../../app/icons/top-curve-color.svg';
import BotCurveColor from '../../../app/icons/bottom-curve-color.svg';
import Mailbox from '../../../app/icons/donate/mailbox.svg';
import Phone from '../../../app/icons/donate/phone.svg';
import Building from '../../../app/icons/donate/building.svg';
import Calendar from '../../../app/icons/donate/calendar-heart.svg';
import Graphic from '../../../app/icons/donate/Graphicnoborder.svg';

export default function Donor() {
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
              <h4>BECOME A DONOR</h4>
            </div>
            <h2>Support. Inspire. Give.</h2>
            <p className="p3">
              Your support makes our mission possible. See the impact you
              create. Explore our budget and plans below.
            </p>
            <Link href="/donate" className="hollow-btn">
              <span className="btn">Donate Now</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="two-col-section">
        <div className="two-col-section-content !items-start py-[40px]">
          <div className="two-col-section-subtitle-container w-1/2">
            <h4>WHY DONATE?</h4>
            <h3 className="sec-coral w-[500px]">
              When you give, you&apos;re investing in brighter futures.
            </h3>
          </div>
          <p className="p3 w-1/2">
            Girls in underserved communities often lack access to the wellness
            resources they need to thrive. Your donation will{' '}
            <span className="coral-4">
              help us fund the first pilot of our school-based wellness
              programs.
            </span>{' '}
            Every donation helps us provide fitness programs, health education,
            and mentorship to underserved girls, giving them the tools to build
            healthy habits and lifelong well-being.
          </p>
        </div>
      </div>
      <div className="relative top-[1px]">
        <TopCurveColor />
      </div>
      <div className="three-col-section bg-soft-coral">
        <div className="three-col-section-content">
          <div className="three-col-section-p-container">
            <h4 className="sec-coral">YOUR IMPACT HELPS:</h4>
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
              <h3 className="background-color">
                Launch School-Based Wellness Programs
              </h3>
              <p className="p3 hover-text">
                Launch and fund our 2025 pilot programs focused on fitness,
                health education, and mentorship.
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
              <h3 className="background-color">Provide Critical Resources</h3>
              <p className="p3 hover-text">
                From fitness gear to health materials, your gift ensures girls
                have what they need to succeed.
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
              <h3 className="background-color">Offer Consistent Mentorship</h3>
              <p className="p3 hover-text">
                Support the recruitment and training of mentors who guide girls
                through their wellness journeys.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative bottom-[1px]">
        <BotCurveColor />
      </div>
      <div className="flex justify-center items-center py-[40px]">
        <Graphic />
      </div>
      <div className="two-col-section bg-soft-coral">
        <div className="two-col-section-content !items-start">
          <div className="two-col-section-subtitle-container w-[600px]">
            <h4 className="p-neutral">WANT A CLOSER LOOK?</h4>
            <h3 className="sec-coral w-[500px]">
              We believe transparency builds trust.
            </h3>
          </div>
          <div className="two-col-section-text-container">
            <p className="p3">
              Explore our plan for sustainable growth through a detailed
              breakdown of projected expenses and our long-term strategy. See
              how every dollar supports girls&apos; health, well-being, and
              future success.
            </p>
            <button className="link-btn !pl-0 !pt-0">
              <span className="p5 bolded link-btn-text sec-coral">
                VIEW OUR 2025 FINANCIAL PLAN (PDF)
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="four-col-section">
        <div className="four-col-section-content">
          <div className="four-col-section-desc !w-full">
            <h4 className="sec-coral">WAYS TO GIVE</h4>
            <p className="p3 text-center">
              We offer flexible giving options so you can support in the way
              that works best for you:
            </p>
          </div>
          <div className="four-col-section-icons-wrapper py-[40px]">
            <div className="four-col-section-icon !p-0">
              <Calendar />
              <h5 className="sec-coral">Monthly Donations</h5>
              <p className="p3 text-center">
                Become a sustaining donor and provide reliable, ongoing support
                for our year-round programs.
              </p>
            </div>
            <div className="four-col-section-icon !p-0">
              <Building />
              <h5 className="sec-coral">Corporate Contributions</h5>
              <p className="p3 text-center">
                Partner with us as a business or sponsor and support while
                making a meaningful social impact.
              </p>
            </div>
            <div className="four-col-section-icon !p-0">
              <Phone />
              <h5 className="sec-coral">Donate by Phone</h5>
              <p className="p3 text-center">
                Prefer a personal touch? Call us at 123-456-7890 to give
                directly.
              </p>
            </div>
            <div className="four-col-section-icon !p-0">
              <Mailbox />
              <h5 className="sec-coral">Donate by Mail</h5>
              <p className="p3 text-center">
                Checks can be made payable to: Shaping Wellness Foundation 12345
                Address, Houston, TX
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="last-section">
        <div className="last-section-content">
          <h4 className="coral-3">READY TO MAKE A DIFFERENCE?</h4>
          <p className="p1 c7">
            Help us launch programs that support girls across Houston.
          </p>
          <Link href="/donate" className="filled-btn">
            <p className="btn background-color">Donate Now</p>
          </Link>
        </div>
      </div>
    </main>
  );
}

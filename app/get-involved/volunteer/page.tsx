'use client';

import Link from 'next/link';
import TopCurveColor from '../../../app/icons/top-curve-color.svg';
import BotCurveColor from '../../../app/icons/bottom-curve-color.svg';
import Check from '../../../app/icons/partner/check.svg';

export default function Volunteer() {
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
              <h4>VOLUNTEER WITH US</h4>
            </div>
            <h2>Inspire and make a difference</h2>
            <p className="p3">
              Volunteer applications are now open for our Fall 2025 pilot
              programs in Houston.
            </p>
            <Link
              href="/get-involved/volunteer/volunteer-form"
              className="hollow-btn"
            >
              <span className="btn">Volunteer Application Form</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-section">
        <div className="p-section-content">
          <h4 className="sec-coral">WAYS TO GET INVOLVED</h4>
          <p className="p3">
            We&apos;re seeking dedicated, passionate volunteers to help bring
            our programs to life in Fall 2025. Whether you&apos;re a fitness
            enthusiast, health educator, or mentor at heart - there&apos;s a
            place for you here.{' '}
            <span className="coral-4">
              Explore specific roles below and see where you can make the
              biggest impact!
            </span>
          </p>
        </div>
      </div>
      <div className="p-section bg-soft-coral !py-[20px]">
        <div className="p-section-content">
          <h4 className="sec-coral">FALL 2025 VOLUNTEER ROLES</h4>
          <p className="p3">Applications Now Open · Ages 18+ · Houston, TX</p>
        </div>
      </div>
      <div className="two-col-section !py-[60px]">
        <div className="two-col-section-content">
          <div
            className="two-col-section-img !h-[350px]"
            style={
              {
                '--bg-image': 'url("/images/DonationForm.webp")',
              } as React.CSSProperties
            }
          ></div>{' '}
          <div className="two-col-section-text-container">
            <div className="two-col-section-subtitle-container">
              <h4 className="p-neutral">FITNESS PROGRAMS</h4>
              <h3 className="sec-coral">Program coordination</h3>
            </div>
            <p className="p3">
              Help run the show behind the scenes. From setting up fitness
              spaces to engaging with participants and ensuring smooth program
              delivery, you&apos;ll support logistics and participant engagement
              at weekly wellness events. <br />
              <br />
              Time Commitment: 2-3 hours/week | Sept - Nov 2025
            </p>
          </div>
        </div>
        <div className="two-col-section-content">
          <div className="two-col-section-text-container">
            <div className="two-col-section-subtitle-container">
              <h4 className="p-neutral">HEALTH AND WELLNESS EDUCATION</h4>
              <h3 className="sec-coral">Workshop leaders</h3>
            </div>
            <div className="p3">
              Lead interactive, age-appropriate workshops on essential topics
              like:
              <br />
              <ul className="list-disc pl-6">
                <li className="p3 pl-1">Nutrition and balanced eating </li>
                <li className="p3 pl-1">
                  Mental health and emotional resilience
                </li>
                <li className="p3 pl-1">Body image and self-care practices</li>
              </ul>
              Ideal for professionals or students in public health, psychology,
              nutrition, or health-related fields.
              <br />
              <br />
              Time Commitment: 3-4 hours/month | Sept - Nov 2025
            </div>
          </div>
          <div
            className="two-col-section-img !h-[350px]"
            style={
              {
                '--bg-image': 'url("/images/DonationForm.webp")',
              } as React.CSSProperties
            }
          ></div>
        </div>
        <div className="two-col-section-content">
          <div
            className="two-col-section-img !h-[350px]"
            style={
              {
                '--bg-image': 'url("/images/DonationForm.webp")',
              } as React.CSSProperties
            }
          ></div>{' '}
          <div className="two-col-section-text-container">
            <div className="two-col-section-subtitle-container">
              <h4 className="p-neutral">1:1 OR SMALL GROUP SUPPORT</h4>
              <h3 className="sec-coral">Mentors</h3>
            </div>
            <div className="p3">
              Provide consistent, one-on-one or small group support for girls,
              offering encouragement, listening, and life guidance in their
              health and wellness journey.
              <ul className="list-disc pl-6">
                <li className="p3 pl-1">
                  All volunteers will receive orientation, training, and support
                  before engaging with youth participants.
                </li>
              </ul>
              <br />
              <br />
              Time Commitment: 1 hour/week | 8-10 weeks | Flexible based on
              schedule
            </div>
          </div>
        </div>
      </div>
      <div className="relative top-[1px]">
        <TopCurveColor />
      </div>
      <div className="two-col-section bg-soft-coral">
        <div className="two-col-section-content !items-start">
          <div className="two-col-section-subtitle-container w-[600px]">
            <h4 className="p-neutral">WHY VOLUNTEER?</h4>
            <h3 className="sec-coral w-[500px]">
              Your time and skills can change lives.
            </h3>
          </div>
          <div className="two-col-section-text-container">
            <div className="p3">
              By volunteering, you&apos;re directly contributing to a healthier,
              more equitable future, helping girls in underserved communities
              gain access to wellness tools, trusted role models, and
              life-changing experiences. You&apos;ll be helping girls:
              <ul className="list-disc pl-6">
                <li className="p3 pl-1">Develop confidence and self-esteem </li>
                <li className="p3 pl-1">
                  Build healthy habits through fitness and education
                </li>
                <li className="p3 pl-1">
                  Feel supported and seen in a safe, encouraging environment
                </li>
              </ul>
              Whether you&apos;re passionate about wellness, mentorship,
              education, or giving back - your time and talents will have a
              lasting impact.
            </div>
          </div>
        </div>
      </div>
      <div className="relative bottom-[1px]">
        <BotCurveColor />
      </div>
      <div className="three-col-section ">
        <div className="three-col-section-content">
          <div className="three-col-section-p-container">
            <h4 className="sec-coral">YOUR IMPACT MATTERS</h4>
            <p className="p3">Your support helps girls:</p>
          </div>
          <div className="three-col-section-boxes-container">
            <div className="three-col-section-box-content-no-border">
              <Check />
              <p className="p3">
                Build confidence through positive role models.{' '}
              </p>
            </div>
            <div className="three-col-section-box-content-no-border">
              <Check />
              <p className="p3">
                Develop consistent, positive habits for lifelong wellness.
              </p>
            </div>
            <div className="three-col-section-box-content-no-border">
              <Check />
              <p className="p3">
                Gain knowledge and tools to care for their well-being.{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="last-section">
        <div className="last-section-content">
          <h4 className="coral-3">JOIN US TODAY</h4>
          <p className="p1 c7">
            Share your time, skills, and heart - become a mentor, leader, or
            wellness guide.
          </p>
          <Link
            href="/get-involved/volunteer/volunteer-form"
            className="filled-btn"
          >
            <p className="btn background-color">Volunteer Application Form</p>
          </Link>
        </div>
      </div>
    </main>
  );
}

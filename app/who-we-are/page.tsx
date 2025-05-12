'use client';

import Divider from '../../app/icons/divider-line.svg';
import Link from 'next/link';
import TopCurveColor from '../../app/icons/top-curve-color.svg';
import BotCurveColor from '../../app/icons/bottom-curve-color.svg';
import Thumb from '../../app/icons/who-we-are/thumb.svg';
import EarthHeart from '../../app/icons/who-we-are/earth-heart.svg';
import HeartShake from '../../app/icons/who-we-are/heart-shake.svg';
import Improvement from '../../app/icons/who-we-are/improvement.svg';
import MeetOurFounder from '@/components/pages/who-we-are/meet-our-founder';
import { useState, useRef } from 'react';
import { useOutsideClick, useStopScroll } from '@/lib/functions';

export default function WhoWeAre() {
  const [popup, setPopup] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(popupRef, () => setPopup(false));

  // page fixed (not scrollable) when popup is open
  useStopScroll(popup);

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
              <h4>WHO WE ARE</h4>
            </div>
            <h2>Transforming lives, one girl at a time.</h2>
            <p className="p3">
              We are dedicated to fostering the health, well-being, and
              empowerment of young girls in underserved communities.
            </p>
          </div>
        </div>
      </div>
      <div className="p-section">
        <div className="p-section-content">
          <h4 className="text-[#B1574A]">OUR MISSION</h4>
          <p className="p3">
            We strive to cultivate a generation of resilient and confident young
            women equipped with the tools and knowledge to prioritize their
            health and well-being, ultimately building stronger, healthier
            communities.
          </p>
        </div>
      </div>
      <div className="divider-section">
        <Divider />
      </div>
      <div className="two-col-section">
        <div className="two-col-section-content">
          <div
            className="two-col-section-img"
            style={
              {
                '--bg-image': 'url("/images/DonationForm.webp")',
              } as React.CSSProperties
            }
          ></div>
          <div className="two-col-section-text-container">
            <div className="two-col-section-subtitle-container">
              <h4 className="text-[#2F2F2F]">OUR VISION</h4>
              <h3 className="text-[#B1574A]">
                Empowering girls, shaping futures
              </h3>
            </div>
            <p className="p3">
              We envision a Houston where every girl has the knowledge,
              confidence, and opportunities to build a strong foundation for
              lifelong health.
            </p>
            <br />
            <br />
            <p className="p3">
              Our vision is grounded in long-term impact:
              <br />
              <ul className="list-disc pl-6">
                <li className="p3 pl-1">
                  Girls gaining the confidence to stay active and healthy
                </li>
                <li className="p3 pl-1">
                  Communities seeing improved health outcomes over time
                </li>
                <li className="p3 pl-1">
                  Future leaders emerging with the resilience and self-awareness
                  to uplift others
                </li>
              </ul>
            </p>

            <br />
            <p className="p3">
              Through evidence-informed programming, cross-sector collaboration,
              and inclusive design, we’re laying the groundwork for generational
              change in health equity, starting right here in Houston.
            </p>
          </div>
        </div>
      </div>
      <div className="relative top-[1px]">
        <TopCurveColor />
      </div>
      <div className="four-col-section">
        <div className="four-col-section-content">
          <div className="four-col-section-desc">
            <h4 className="text-[#B1574A]">OUR VALUES</h4>
            <p className="p3 text-center">
              Our values shape how we design our programs, engage with our
              community, and show up for the girls we serve:
            </p>
          </div>
          <div className="four-col-section-icons-wrapper">
            <div className="four-col-section-icon">
              <EarthHeart />
              <h5 className="text-[#B1574A]">Inclusivity</h5>
              <p className="p3 text-center">
                Creating affirming spaces where identity is seen as strength.
              </p>
            </div>
            <div className="four-col-section-icon">
              <Thumb />
              <h5 className="text-[#B1574A]">Encouragement</h5>
              <p className="p3 text-center">
                Offering tools, guidance, and accessible opportunities unique to
                every girl.
              </p>
            </div>
            <div className="four-col-section-icon">
              <HeartShake />
              <h5 className="text-[#B1574A]">Collaboration</h5>
              <p className="p3 text-center">
                Working together to build programs that reflect real needs and
                voices.
              </p>
            </div>
            <div className="four-col-section-icon">
              <Improvement />
              <h5 className="text-[#B1574A]">Improvement</h5>
              <p className="p3 text-center">
                We listen, learn, and improve - always evolving to better serve
                the community.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative bottom-[1px]">
        <BotCurveColor />
      </div>
      <div className="two-col-section">
        <div className="two-col-section-content !items-start">
          <div className="two-col-section-subtitle-container w-[600px]">
            <h4 className="text-[#2F2F2F]">OUR COMMITMENT</h4>
            <h3 className="text-[#B1574A]">
              We’re starting small, but we’re thinking big.
            </h3>
          </div>
          <div className="two-col-section-text-container">
            <p className="p3">
              As a new nonprofit, we know that trust is earned. That’s why we
              lead with transparency, research, and community input at every
              step. <br />
              <br />
              Our promise is to show up with purpose, measure what matters, and
              keep refining our approach so we can truly meet the needs of the
              girls we serve. Together, we can build a future where every girl
              grows up with the strength, support, and confidence to lead and
              inspire the next generation to do the same.
            </p>
          </div>
        </div>
      </div>
      <div className="divider-section">
        <Divider />
      </div>
      <div className="two-col-section">
        <div className="two-col-section-content">
          <div
            className="two-col-section-img !h-[350px]"
            style={
              {
                '--bg-image': 'url("/images/DonationForm.webp")',
              } as React.CSSProperties
            }
          ></div>
          <div className="two-col-section-text-container">
            <div className="two-col-section-subtitle-container">
              <h4 className="text-[#2F2F2F]">MEET OUR FOUNDER</h4>
              <h3 className="text-[#B1574A]">Luciana N Gearing</h3>
            </div>
            <p className="p3">
              Luciana N. Gearing is the Founder and Executive Director of
              Shaping Wellness Foundation, an organization dedicated to helping
              underserved girls develop healthy habits, gain access to wellness
              education, and build self-confidence through fitness programs,
              mentorship, and community support.
            </p>
            <button className="link-btn !pl-0" onClick={() => setPopup(!popup)}>
              <span className="p5 text-[#b1574a] font-[600]">READ MORE</span>
            </button>
          </div>
        </div>
      </div>
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
      {popup ? (
        <div className="popup-bg">
          <div ref={popupRef}>
            <MeetOurFounder setPopup={setPopup} />
          </div>
        </div>
      ) : null}
    </main>
  );
}

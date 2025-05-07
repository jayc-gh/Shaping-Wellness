'use client';

import Link from 'next/link';
import Divider from '../../app/icons/divider-line.svg';
import TopCurveColor from '../../app/icons/top-curve-color.svg';
import BotCurveColor from '../../app/icons/bottom-curve-color.svg';
import Empowerment from '../../app/icons/empowerment.svg';
import Knowledge from '../../app/icons/knowledge.svg';
import Support from '../../app/icons/support.svg';
import GradientRectangle from '../../app/icons/gradient-rectangle.svg';

export default function Programs() {
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
            <p className="p3">Our vision is grounded in long-term impact:</p>
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
            <br />
            <p className="p3">
              Through evidence-informed programming, cross-sector collaboration,
              and inclusive design, we’re laying the groundwork for generational
              change in health equity, starting right here in Houston.
            </p>
          </div>
        </div>
      </div>
      <div className="divider-section">
        <Divider />
      </div>
      <div className="three-col-section">
        <div className="three-col-section-p-container">
          <h4 className="text-[#B1574A]">OUR MISSION</h4>
          <p className="p3">
            We strive to cultivate a generation of resilient and confident young
            women equipped with the tools and knowledge to prioritize their
            health and well-being, ultimately building stronger, healthier
            communities.
          </p>
        </div>
        <div className="three-col-section-content">
          <div className="three-col-section-boxes-container">
            <div className="three-col-section-box-wrapper">
              <Empowerment className="absolute" />
              <div className="three-col-section-box">
                <GradientRectangle className="absolute" />
                <div className="three-col-section-box-content">
                  <h3 className="text-[#B1574A]">Partner with us</h3>
                  <p className="p3">
                    Help bring fitness, wellness, and mentorship to more girls.
                  </p>
                </div>
              </div>
            </div>
            <div className="three-col-section-box-wrapper">
              <Knowledge className="absolute" />
              <div className="three-col-section-box">
                <GradientRectangle className="absolute" />
                <div className="three-col-section-box-content">
                  <h3 className="text-[#B1574A]">Partner with us</h3>
                  <p className="p3">
                    Help bring fitness, wellness, and mentorship to more girls.
                  </p>
                </div>
              </div>
            </div>
            <div className="three-col-section-box-wrapper">
              <Support className="absolute" />
              <div className="three-col-section-box">
                <GradientRectangle className="absolute" />
                <div className="three-col-section-box-content">
                  <h3 className="text-[#B1574A]">Partner with us</h3>
                  <p className="p3">
                    Help bring fitness, wellness, and mentorship to more girls.
                  </p>
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
      <div className="relative bottom-[1px]">
        <BotCurveColor />
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
          ></div>{' '}
          <div className="two-col-section-text-container">
            <div className="two-col-section-subtitle-container">
              <h4 className="text-[#2F2F2F]">FITNESS PROGRAMS</h4>
              <h3 className="text-[#B1574A]">Staying active and strong</h3>
            </div>
            <p className="p3">
              We’re designing accessible and engaging fitness sessions tailored
              to middle and high school girls, with a focus on movement,
              strength-building, and positive body image. These sessions will be
              led by certified instructors and adapted to different skill
              levels.
            </p>
          </div>
        </div>
        <div className="two-col-section-content">
          <div className="two-col-section-text-container">
            <div className="two-col-section-subtitle-container">
              <h4 className="text-[#2F2F2F]">WORKSHOPS</h4>
              <h3 className="text-[#B1574A]">Inspiring healthy choices</h3>
            </div>
            <p className="p3">
              Our upcoming workshops will cover key health topics - including
              nutrition, mental wellness, and self-care - through interactive
              sessions led by professionals in youth health and education. Each
              module will be developed with input from community experts and
              aligned with age-appropriate wellness standards.
            </p>
          </div>
          <div
            className="two-col-section-img !h-[350px]"
            style={
              {
                '--bg-image': 'url("/images/DonationForm.webp")',
              } as React.CSSProperties
            }
          ></div>{' '}
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
              <h4 className="text-[#2F2F2F]">MENTORSHIPS</h4>
              <h3 className="text-[#B1574A]">Guiding girls to thrive</h3>
            </div>
            <p className="p3">
              We’re building a mentorship network that will pair girls with
              vetted female mentors from diverse backgrounds in health,
              education, and leadership. Mentors will offer consistent guidance
              through structured meetups, check-ins, and shared goal-setting
              around personal wellness and growth.
            </p>
          </div>
        </div>
      </div>
      <div className="divider-section">
        <Divider />
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

'use client';

import TopCurveColor from '../../app/icons/top-curve-color.svg';
import BotCurveColor from '../../app/icons/bottom-curve-color.svg';
import Thumb from '../../app/icons/who-we-are/thumb.svg';
import EarthHeart from '../../app/icons/who-we-are/earth-heart.svg';
import HeartShake from '../../app/icons/who-we-are/heart-shake.svg';
import Improvement from '../../app/icons/who-we-are/improvement.svg';
import MeetOurFounder from '@/components/pages/who-we-are/meet-our-founder';
import { useState, useRef } from 'react';
import { useOutsideClick, useStopScroll } from '@/lib/functions/useFunctions';
import MainSection from '@/components/sections/headerSection';
import PSection from '@/components/sections/pSection';
import DividerSection from '@/components/sections/dividerSection';
import PictureTextSection from '@/components/sections/pictureText';
import DoubleTextSection from '@/components/sections/doubleTextSection';
import ContactSection from '@/components/sections/contactSection';

export default function WhoWeAre() {
  const [popup, setPopup] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(popupRef, () => setPopup(false));

  // page fixed (not scrollable) when popup is open
  useStopScroll(popup);

  return (
    <main className="flex flex-col w-full">
      <MainSection
        flagText="WHO WE ARE"
        heading={<>Transforming lives, one girl at a time.</>}
        description="We are dedicated to fostering the health, well-being, and empowerment of young girls in underserved communities."
        bgImageUrl="/images/WhoWeAreHeader.jpg"
        aspectRatio="aspect-[1/1] lg:aspect-[18/5]"
        contentMaxWidth="max-w-[43.75rem]"
        backgroundPosition="center 50%, center 50%"
      />
      <PSection
        header="OUR MISSION"
        text={
          <>
            We strive to cultivate a generation of resilient and confident young
            women equipped with the tools and knowledge to prioritize their
            health and well-being, ultimately building stronger, healthier
            communities.
          </>
        }
      />
      <DividerSection />
      <div className="flex flex-col justify-center items-center gap-[2.5rem] px-[1.5625rem] py-[2.5rem] lg:px-[6.75rem] lg:gap-[3.75rem]">
        <PictureTextSection
          title="OUR VISION"
          subtitle="Empowering girls, shaping futures"
          content={
            <>
              <p>
                We envision a Houston where every girl has the knowledge,
                confidence, and opportunities to build a strong foundation for
                lifelong health.
              </p>
              <br />
              <div>
                Our vision is grounded in long-term impact:
                <br />
                <ul className="list-disc pl-6 leading-[160%]">
                  <li className="">
                    Girls gaining the confidence to stay active and healthy
                  </li>
                  <li className="">
                    Communities seeing improved health outcomes over time
                  </li>
                  <li className="">
                    Future leaders emerging with the resilience and
                    self-awareness to uplift others
                  </li>
                </ul>
              </div>
              <br />
              <p>
                Through evidence-informed programming, cross-sector
                collaboration, and inclusive design, we&apos;re laying the
                groundwork for generational change in health equity, starting
                right here in Houston.
              </p>
            </>
          }
          imageUrl="/images/WhoWeAreIMG1.jpg"
        />
      </div>
      <div className="relative top-[0.0625rem]">
        <TopCurveColor />
      </div>
      <div className="flex flex-col justify-center items-center px-[1.5625rem] py-[2.5rem] gap-[0.625rem] lg:px-[6.75rem] w-full bg-[#ffece4]">
        <div className="flex flex-col justify-center items-center gap-[2rem] lg:max-w-[1224px]">
          <div className="flex flex-col justify-center items-center gap-[1.5rem] lg:max-w-[600px]">
            <h4 className="text-[#b1574a] !text-base !font-bold">OUR VALUES</h4>
            <p className="text-center text-base font-[500] leading-[170%] lg:text-[1.125rem] lg:leading-[160%]">
              Our values shape how we design our programs, engage with our
              community, and show up for the girls we serve:
            </p>
          </div>
          <div className="flex flex-col justify-center items-center pt-[2.5rem] gap-[3.5rem] lg:flex-row lg:gap-[1.5rem] lg:pt-0">
            <div className="flex flex-col justify-center items-center gap-[1.5rem] px-[1.5rem]">
              <EarthHeart />
              <h5 className="text-[#b1574a] font-bold text-[1.25rem]">
                Inclusivity
              </h5>
              <p className="text-base font-[500] leading-[160%] text-center lg:text-[1.125rem]">
                Creating affirming spaces where identity is seen as strength.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-[1.5rem] px-[1.5rem]">
              <Thumb />
              <h5 className="text-[#b1574a] font-bold text-[1.25rem]">
                Encouragement
              </h5>
              <p className="text-base font-[500] leading-[160%] text-center lg:text-[1.125rem]">
                Offering tools, guidance, and accessible opportunities unique to
                every girl.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-[1.5rem] px-[1.5rem]">
              <HeartShake />
              <h5 className="text-[#b1574a] font-bold text-[1.25rem]">
                Collaboration
              </h5>
              <p className="text-base font-[500] leading-[160%] text-center lg:text-[1.125rem]">
                Working together to build programs that reflect real needs and
                voices.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-[1.5rem] px-[1.5rem]">
              <Improvement />
              <h5 className="text-[#b1574a] font-bold text-[1.25rem]">
                Improvement
              </h5>
              <p className="text-base font-[500] leading-[160%] text-center lg:text-[1.125rem]">
                We listen, learn, and improve - always evolving to better serve
                the community.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative bottom-[0.0625rem]">
        <BotCurveColor />
      </div>
      <DoubleTextSection
        title="OUR COMMITMENT"
        subTitle="We're starting small, but we're thinking big."
        description={
          <p className="p3">
            As a new nonprofit, we know that trust is earned. That&apos;s why we
            lead with transparency, research, and community input at every step.{' '}
            <br />
            <br />
            Our promise is to show up with purpose, measure what matters, and
            keep refining our approach so we can truly meet the needs of the
            girls we serve. Together, we can build a future where every girl
            grows up with the strength, support, and confidence to lead and
            inspire the next generation to do the same.
          </p>
        }
      />
      <DividerSection />
      <div className="flex w-full py-[2.5rem] px-[1.5625rem] lg:px-[6.75rem] items-center justify-center">
        <PictureTextSection
          title="MEET OUR FOUNDER"
          subtitle="Luciana N Gearing"
          content={
            <>
              Luciana N. Gearing is the Founder and Executive Director of
              Shaping Wellness Foundation, an organization dedicated to helping
              underserved girls develop healthy habits, gain access to wellness
              education, and build self-confidence through fitness programs,
              mentorship, and community support.
            </>
          }
          imageUrl="/images/WhoWeAreIMG2.jpg"
          setPopup={setPopup}
        />
      </div>
      <ContactSection
        header="CONTACT US"
        text="Have questions or want to get involved? We're here to help!"
        href="/contact-us"
        buttonLabel="Send a message"
        ariaLabel="Contact us"
      />
      {popup ? (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]">
          <div ref={popupRef}>
            <MeetOurFounder setPopup={setPopup} />
          </div>
        </div>
      ) : null}
    </main>
  );
}

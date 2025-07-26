'use client';

import TopCurveColor from '../../../app/icons/top-curve-color.svg';
import BotCurveColor from '../../../app/icons/bottom-curve-color.svg';
import Dumbbell from '../../../app/icons/partner/dumbbell.svg';
import Notebook from '../../../app/icons/partner/notebook-pen.svg';
import Mentorship from '../../../app/icons/partner/mentorships.svg';
import Check from '../../../app/icons/partner/check.svg';
import MainSection from '@/components/sections/headerSection';
import DoubleTextSection from '@/components/sections/doubleTextSection';
import DividerSection from '@/components/sections/dividerSection';
import PSection from '@/components/sections/pSection';
import HoverCard from '@/components/sections/hoverCard';
import GradientBox from '@/components/sections/gradientBox';
import HyperLink from '@/components/buttons/hyperLink';
import CardNoBorder from '@/components/sections/cardNoBorder';
import ContactSection from '@/components/sections/contactSection';

export default function Partner() {
  return (
    <main className="flex flex-col w-full">
      <MainSection
        flagText="BECOME A PARTNER"
        heading="Unite to make a difference"
        description="If your school or organization is interested in hosting one of our programs or collaborating on future wellness initiatives, we'd love to connect."
        bgImageUrl="/images/PartnerHeader.jpg"
        aspectRatio="aspect-[1/1] lg:aspect-[18/5]"
        contentMaxWidth="lg:max-w-[37.5rem]"
        backgroundPosition="center 40%, center 40%"
        buttonHref="/get-involved/partner/partner-form"
        buttonText="Partnership Inquiry Form"
        buttonVariant="white"
      />
      <DoubleTextSection
        title="WHY PARTNER WITH US?"
        subTitle="Help girls build confidence, develop healthy habits, and thrive."
        description={
          <>
            Girls in underserved communities often face real barriers to
            accessing consistent fitness opportunities, health education, and
            positive mentorship, all of which are critical to long-term
            wellness. By partnering with us, you&apos;re not only supporting
            these girls directly, but also investing in healthier, more
            resilient communities for the future.
          </>
        }
      />
      <DividerSection />
      <PSection
        header="WHO CAN PARTNER WITH US?"
        text={
          <>
            <span className="text-[#8e463b] italic !font-[600]">
              We&apos;re currently accepting new partnership inquiries for Fall
              2025.
            </span>{' '}
            Together, we can help girls build confidence, strengthen healthy
            habits, and thrive in every aspect of their lives. We&apos;re
            actively seeking partnerships with:
          </>
        }
      />
      <div className="flex flex-col justify-center items-center text-center pb-[2.5rem] px-[1.5625rem] lg:px-[6.75rem] w-full">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-[1.5rem] w-full lg:max-w-[1224px]">
          <HoverCard
            imageUrl="/images/PartnerIMG1.jpg"
            title="Middle and High School"
            description="Schools looking to introduce or expand wellness initiatives."
            backgroundPosition="center 20%, center 20%"
          />
          <HoverCard
            imageUrl="/images/PartnerIMG2.jpg"
            title="Youth Organizations"
            description="Youth Organizations committed to supporting girls' health and development."
            backgroundPosition="30% 20%, 30% 20%"
          />
          <HoverCard
            imageUrl="/images/PartnerIMG3.jpg"
            title="Community Centers"
            description="Community Centers looking to create inclusive spaces for girls to connect and grow."
            backgroundPosition="center 50%, center 50%"
          />
        </div>
      </div>
      <div className="relative top-[0.0625rem]">
        <TopCurveColor />
      </div>
      <div className="flex flex-col justify-center items-center lg:px-[6.75rem] w-full bg-[#ffece4] pb-[2.5rem] lg:gap-[1.5rem]">
        <PSection
          header="WHAT YOU'LL GAIN"
          text={
            <>
              As a partner, your school or organization will receive access to
              our three pilot programs launching in 2025.
              <br />
              All programs are intentionally designed to be inclusive and
              culturally relevant, accessible within school or community spaces,
              and led by trained professionals and volunteers.
            </>
          }
        />
        <div className="flex flex-col lg:flex-row justify-center items-center gap-[1.5rem] w-full lg:max-w-[1224px]">
          <GradientBox
            Icon={Dumbbell}
            title="Fitness Sessions"
            content={
              <>
                Group-based physical activities designed to encourage movement
                and build confidence.
              </>
            }
            classString="relative w-full"
          />
          <GradientBox
            Icon={Notebook}
            title="Workshops"
            content={
              <>
                Interactive workshops covering nutrition basics, mental health,
                body image, and self-care.
              </>
            }
            classString="relative w-full"
          />
          <GradientBox
            Icon={Mentorship}
            title="Mentorships"
            content={
              <>
                Facilitated mentor connections that pair girls with trusted
                female role models who offer guidance.
              </>
            }
            classString="relative w-full"
          />
        </div>
        <HyperLink
          href="/programs"
          text="LEARN MORE ABOUT OUR PROGRAMS"
          arrow={true}
        />
      </div>
      <div className="relative bottom-[0.0625rem]">
        <BotCurveColor />
      </div>

      <div className="flex flex-col justify-center items-center w-full">
        <PSection
          header="WHY IT MATTERS"
          text={
            <>
              By integrating these programs into your organization, you can
              create a meaningful, measurable impact in the lives of the girls
              you serve. Studies consistently show that early access to wellness
              education, fitness, and mentorship can:
            </>
          }
        />
        <div className="flex flex-col justify-center items-center lg:flex-row lg:max-w-[1224px] px-[1.5625rem] lg:px-[6.75rem]">
          <CardNoBorder
            Icon={Check}
            content="Reduce risks of chronic illness and childhood obesity.
          "
          />
          <CardNoBorder
            Icon={Check}
            content="Boost academic performance, confidence, and emotional resilience.
          "
          />
          <CardNoBorder
            Icon={Check}
            content="Provide safe spaces where girls can connect, learn, and grow.
          "
          />
        </div>
      </div>
      <ContactSection
        header="READY TO PARTNER?"
        text="Ready to bring wellness programs to your school or community?"
        href="/get-involved/partner/partner-form"
        buttonLabel="Partnership Inquiry Form"
      />
    </main>
  );
}

'use client';

import TopCurveColor from '../../../app/icons/top-curve-color.svg';
import BotCurveColor from '../../../app/icons/bottom-curve-color.svg';
import Check from '../../../app/icons/partner/check.svg';
import MainSection from '@/components/sections/headerSection';
import PSection from '@/components/sections/pSection';
import PictureTextSection from '@/components/sections/pictureText';
import HyperLink from '@/components/buttons/hyperLink';
import DoubleTextSection from '@/components/sections/doubleTextSection';
import CardNoBorder from '@/components/sections/cardNoBorder';
import ContactSection from '@/components/sections/contactSection';

export default function Volunteer() {
  return (
    <main className="flex flex-col w-full">
      <MainSection
        flagText="VOLUNTEER WITH US"
        heading="Inspire and make a difference"
        description="Volunteer applications are now open for our Fall 2025 pilot programs in Houston."
        bgImageUrl="/images/VolunteerHeader.jpg"
        aspectRatio="aspect-[1/1] lg:aspect-[18/5]"
        contentMaxWidth="max-w-[37.5rem]"
        backgroundPosition="center 40%, center 40%"
        buttonHref="/get-involved/volunteer/volunteer-form"
        buttonText="Volunteer Application Form"
        buttonVariant="white"
      />
      <PSection
        header="WAYS TO GET INVOLVED"
        text={
          <>
            We&apos;re seeking dedicated, passionate volunteers to help bring
            our programs to life in Fall 2025. Whether you&apos;re a fitness
            enthusiast, health educator, or mentor at heart - there&apos;s a
            place for you here.{' '}
            <span className="italic text-[#8e463b]">
              Explore specific roles below and see where you can make the
              biggest impact!
            </span>
          </>
        }
      />
      <div className="bg-[#ffece4] text-center">
        <PSection
          header="FALL 2025 VOLUNTEER ROLES"
          text={
            <>
              <span className="lg:hidden">
                Applications Now Open
                <br />
                Ages 18+ · Houston, TX
              </span>
              <span className="hidden lg:flex">
                Applications Now Open · Ages 18+ · Houston, TX
              </span>
            </>
          }
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-[2.5rem] px-[1.5625rem] py-[2.5rem] lg:px-[6.75rem] lg:gap-[3.75rem]">
        <PictureTextSection
          title="FITNESS PROGRAMS"
          subtitle="Program Coordination"
          content={
            <>
              Help run the show behind the scenes. From setting up fitness
              spaces to engaging with participants and ensuring smooth program
              delivery, you&apos;ll support logistics and participant engagement
              at weekly wellness events. <br />
              <br />
              <span className="lg:hidden">
                Time Commitment: <br />
                2-3 hours/week | Sept - Nov 2025
              </span>
              <span className="hidden lg:flex">
                Time Commitment: 2-3 hours/week | Sept - Nov 2025
              </span>
            </>
          }
          imageUrl="/images/VolunteerIMG1.jpg"
        />
        <PictureTextSection
          title="HEALTH AND WELLNESS EDUCATION"
          subtitle="Workshop leaders"
          content={
            <>
              Lead interactive, age-appropriate workshops on essential topics
              like:
              <br />
              <ul className="list-disc pl-6 leading-[160%]">
                <li>Nutrition and balanced eating </li>
                <li>Mental health and emotional resilience</li>
                <li>Body image and self-care practices</li>
              </ul>
              Ideal for professionals or students in public health, psychology,
              nutrition, or health-related fields.
              <br />
              <br />
              <span className="lg:hidden">
                Time Commitment: <br />
                3-4 hours/month | Sept - Nov 2025
              </span>
              <span className="hidden lg:flex">
                Time Commitment: 3-4 hours/month | Sept - Nov 2025
              </span>
            </>
          }
          imageUrl="/images/VolunteerIMG2.jpg"
          reverse={true}
        />
        <PictureTextSection
          title="1:1 OR SMALL GROUP SUPPORT"
          subtitle="Mentors"
          content={
            <>
              Provide consistent, one-on-one or small group support for girls,
              offering encouragement, listening, and life guidance in their
              health and wellness journey.
              <ul className="list-disc pl-6 leading-[160%]">
                <li>
                  All volunteers will receive orientation, training, and support
                  before engaging with youth participants.
                </li>
              </ul>
              <br />
              <span className="lg:hidden">
                Time Commitment: <br />1 hour/week | 8-10 weeks | Flexible based
                on schedule
              </span>
              <span className="hidden lg:flex">
                Time Commitment: 1 hour/week | 8-10 weeks | Flexible based on
                schedule
              </span>
            </>
          }
          imageUrl="/images/VolunteerIMG3.jpg"
        />
        <HyperLink
          href="/programs"
          text="LEARN MORE ABOUT OUR PROGRAMS"
          arrow={true}
          size="large"
        />
      </div>
      <div className="relative top-[0.0625rem]">
        <TopCurveColor />
      </div>
      <div className="bg-[#ffece4]">
        <DoubleTextSection
          title="WHY VOLUNTEER?"
          subTitle="Your time and skills can change lives."
          description={
            <>
              By volunteering, you&apos;re directly contributing to a healthier,
              more equitable future, helping girls in underserved communities
              gain access to wellness tools, trusted role models, and
              life-changing experiences. You&apos;ll be helping girls:
              <ul className="list-disc pl-6 leading-[160%]">
                <li>Develop confidence and self-esteem </li>
                <li>Build healthy habits through fitness and education</li>
                <li>
                  Feel supported and seen in a safe, encouraging environment
                </li>
              </ul>
              Whether you&apos;re passionate about wellness, mentorship,
              education, or giving back - your time and talents will have a
              lasting impact.
            </>
          }
        />
      </div>
      <div className="relative bottom-[0.0625rem]">
        <BotCurveColor />
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        <PSection
          header="YOUR IMPACT MATTERS"
          text={<>Your support helps girls:</>}
        />
        <div className="flex flex-col justify-center items-center lg:flex-row lg:max-w-[1224px] px-[1.5625rem] lg:px-[6.75rem]">
          <CardNoBorder
            Icon={Check}
            content="Build confidence through positive role models.
          "
          />
          <CardNoBorder
            Icon={Check}
            content="Develop consistent, positive habits for lifelong wellness.
          "
          />
          <CardNoBorder
            Icon={Check}
            content="Gain knowledge and tools to care for their well-being.
          "
          />
        </div>
      </div>
      <ContactSection
        header="JOIN US TODAY"
        text="Share your time, skills, and heart - become a mentor, leader, or wellness guide."
        href="/get-involved/volunteer/volunteer-form"
        buttonLabel="Volunteer Application Form"
      />
    </main>
  );
}

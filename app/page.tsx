'use client';

import HandHeart from '../app/icons/home/hand-heart.svg';
import Users from '../app/icons/home/users-heart.svg';
import Handshake from '../app/icons/home/handshake.svg';
import React from 'react';
import BottomCurveWhite from '../app/icons/bottom-curve-white.svg';
import TopCurveWhite from '../app/icons/top-curve-white.svg';
import MainSection from '@/components/sections/headerSection';
import PSection from '@/components/sections/pSection';
import PictureTextSection from '@/components/sections/pictureText';
import HyperLink from '@/components/buttons/hyperLink';
import GrayBorderCard from '@/components/sections/grayBorderCard';
import ContactSection from '@/components/sections/contactSection';
import DividerSection from '@/components/sections/dividerSection';

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <MainSection
        heading={
          <>
            Healthy Futures, <br />
            <span className="text-[#d9764e]">Stronger</span> Communities
          </>
        }
        description="Join us in creating opportunities for girls to grow stronger, more confident, and healthier. Partner today and be part of the change."
        buttonText="Become a partner"
        buttonHref="/get-involved/partner"
        buttonVariant="orange"
        bgImageUrl="/images/HomeHeader.jpg"
        aspectRatio="aspect-[1/1] lg:aspect-[16/5]"
        contentMaxWidth="lg:max-w-[34.375rem]"
        backgroundPosition="center 30%, center 30%"
      ></MainSection>
      <PSection
        header="WHO WE ARE"
        text={
          <>
            Shaping Wellness Foundation is a new nonprofit dedicated to
            supporting the{' '}
            <span className="text-[#8e463b]">
              health, well-being, and personal growth of young girls in
              underserved communities.
            </span>{' '}
            While our programs are still taking shape, our commitment is
            grounded in transparency, research, and community input. We&apos;re
            focused on building inclusive, thoughtful initiatives that help
            girls develop confidence, stay active, and make informed choices for
            lifelong wellness.
          </>
        }
        link={{ href: '/who-we-are', label: 'LEARN MORE ABOUT OUR MISSION' }}
      />
      <div
        className="relative z-0 aspect-[2416/900] lg:aspect-[2416/500] w-full flex flex-col items-center"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/images/HomeIMG2.jpg)`,
          backgroundSize: 'cover, cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 40%, center 50%',
        }}
      >
        <div className="flex-grow" />
        <div className="absolute bottom-[-1px] left-0 w-full">
          <BottomCurveWhite className="w-full h-auto" />
        </div>
      </div>
      <PSection
        header="PROGRAMS"
        text={
          <>
            We&apos;re developing a year-round wellness curriculum for 6th -
            12th grade girls in Houston, launching in Fall 2025. Our programming
            focuses on nutrition, self-confidence, and health education,
            equipping girls with practical tools, peer support, and guidance
            from trusted community educators to build lifelong healthy habits.
          </>
        }
      />
      <DividerSection />
      <div
        className="flex flex-col justify-center items-center gap-[2.5rem] px-[1.5625rem] py-[2.5rem] lg:px-[6.75rem] lg:gap-[3.75rem]"
        id="programs"
      >
        <PictureTextSection
          title="FITNESS PROGRAMS"
          subtitle="Staying active and strong"
          content={
            <>
              We&apos;re designing accessible and engaging fitness sessions
              tailored to middle and high school girls, with a focus on
              movement, strength-building, and positive body image. These
              sessions will be led by certified instructors and adapted to
              different skill levels.
            </>
          }
          imageUrl="/images/HomeIMG3.jpg"
        />
        <PictureTextSection
          title="WORKSHOPS"
          subtitle="Inspiring healthy choices"
          content={
            <>
              Our upcoming workshops will cover key health topics - including
              nutrition, mental wellness, and self-care - through interactive
              sessions led by professionals in youth health and education. Each
              module will be developed with input from community experts and
              aligned with age-appropriate wellness standards.
            </>
          }
          imageUrl="/images/HomeIMG4.jpg"
          reverse={true}
        />
        <PictureTextSection
          title="MENTORSHIPS"
          subtitle="Guiding girls to thrive"
          content={
            <>
              We&apos;re building a mentorship network that will pair girls with
              vetted female mentors from diverse backgrounds in health,
              education, and leadership. Mentors will offer consistent guidance
              through structured meetups, check-ins, and shared goal-setting
              around personal wellness and growth.
            </>
          }
          imageUrl="/images/HomeIMG5.jpg"
        />
      </div>
      <div className="flex justify-center items-center pb-[2.5rem]">
        <HyperLink
          href="/programs"
          text="LEARN MORE ABOUT OUR PROGRAMS"
          arrow={true}
        />
      </div>
      <div className="relative w-full">
        <div className="absolute top-[-1px] left-0 w-full z-10">
          <TopCurveWhite className="w-full h-auto" />
        </div>
        <div
          className="relative z-0 aspect-[2416/900] lg:aspect-[2416/500] w-full flex flex-col items-center"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/images/HomeIMG6.jpg)`,
            backgroundSize: 'cover, cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 35%, center 35%',
          }}
        />
      </div>
      <div
        id="getInvolved"
        className="flex flex-col py-[4.375rem] px-[1.5625rem] justify-center items-center gap-[0.625rem] text-center lg:py-[2.5rem] lg:px-[6.75rem]"
      >
        <div className="flex flex-col justify-center items-center gap-[2rem] lg:max-w-[1224px]">
          <h4 className="text-[#b1574a] !text-base !font-bold">GET INVOLVED</h4>
          <div className="grid gap-[1.5rem] grid-cols-1 lg:grid-cols-3 justify-center">
            <GrayBorderCard
              icon={<Handshake />}
              title={'Partner with us'}
              text="Help bring fitness, wellness, and mentorship to more girls."
              href={'/get-involved/partner'}
            />
            <GrayBorderCard
              icon={<HandHeart />}
              title={'Become a donor'}
              text="Your support helps girls build confidence and lifelong
                  well-being."
              href={'/get-involved/donor'}
            />
            <GrayBorderCard
              icon={<Users />}
              title={'Volunteer your time'}
              text="From mentoring to workshops, everyone can make a difference."
              href={'/get-involved/volunteer'}
            />
          </div>
        </div>
      </div>
      <ContactSection
        header="CONTACT US"
        text="Have questions or want to get involved? We're here to help!"
        href="/contact-us"
        buttonLabel="Send a message"
      />
    </main>
  );
}

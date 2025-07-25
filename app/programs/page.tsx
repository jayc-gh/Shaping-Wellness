'use client';

import TopCurveColor from '../../app/icons/top-curve-color.svg';
import BotCurveColor from '../../app/icons/bottom-curve-color.svg';
import Empowerment from '../../app/icons/programs/empowerment.svg';
import Knowledge from '../../app/icons/programs/knowledge.svg';
import Support from '../../app/icons/programs/support.svg';
import MainSection from '@/components/sections/headerSection';
import PictureTextSection from '@/components/sections/pictureText';
import DividerSection from '@/components/sections/dividerSection';
import PSection from '@/components/sections/pSection';
import GradientBox from '@/components/sections/gradientBox';
import DoubleTextSection from '@/components/sections/doubleTextSection';
import ContactSection from '@/components/sections/contactSection';

export default function Programs() {
  return (
    <main className="flex flex-col w-full">
      <MainSection
        flagText="PROGRAMS"
        heading="Inspiring girls to build healthy, confident futures."
        description="If your organization is dedicated to giving girls the tools to lead healthier, more confident lives, we're here to help."
        bgImageUrl="/images/ProgramsHeader.jpg"
        aspectRatio="2600/750"
        contentMaxWidth="lg:max-w-[37.5rem]"
        backgroundPosition="center 50%, center 50%"
      />
      <div className="flex flex-col justify-center items-center gap-[2.5rem] px-[1.5625rem] py-[2.5rem] lg:px-[6.75rem] lg:gap-[3.75rem]">
        <PictureTextSection
          title="WELLNESS STARTS HERE"
          subtitle="Giving girls the tools to succeed"
          content={
            <p>
              Girls from underserved communities are at a higher risk of
              obesity, chronic illness, and limited access to preventive
              healthcare, leading to long-term health disparities in adulthood.
              <br />
              <br />
              We help bridge this gap by empowering girls to build healthy
              habits, improve well-being, and create a foundation for lifelong
              wellness.
            </p>
          }
          imageUrl="/images/ProgramsIMG1.jpg"
        />
      </div>
      <DividerSection />
      <PSection
        header="GOALS"
        text="Lifelong wellness starts with access to knowledge, support, and
              opportunities for movement. Healthy habits lead to greater
              confidence, improved physical and mental well-being, and a
              stronger foundation for success. So how do we ensure girls develop
              these habits in the schools and communities that need them most?"
      />
      <div className="flex justify-center items-center py-[2rem] px-[1.5625rem] lg:px-[6.75rem] w-full">
        <div className="flex flex-col justify-center items-center lg:items-stretch gap-[1.5rem] max-w-[1224px] w-full lg:flex-row">
          <GradientBox
            Icon={Empowerment}
            title="Empowerment"
            content={
              <>
                Empowering girls to stay active and build lifelong fitness
                habits.
              </>
            }
            classString="relative w-full min-h-[11.125rem]"
          />
          <GradientBox
            Icon={Knowledge}
            title="Knowledge"
            content={
              <>Providing the knowledge to make informed health choices.</>
            }
            classString="relative w-full min-h-[11.125rem]"
          />
          <GradientBox
            Icon={Support}
            title="Support"
            content={
              <>Mentorship and guidance to inspire confidence and growth.</>
            }
            classString="relative w-full min-h-[11.125rem]"
          />
        </div>
      </div>
      <div className="relative top-[0.0625rem]">
        <TopCurveColor />
      </div>
      <div className="bg-[#ffece4]">
        <DoubleTextSection
          title="OUR PROGRAMS"
          subTitle="Building confidence, resilience, and lifelong wellness one girl at a time."
          description={
            <>
              We aim to reach 300 girls in our first year with evidence-informed
              health and wellness programming. Each pilot is designed with input
              from educators, youth development professionals, and community
              leaders to foster sustainable, measurable impact. We&apos;ll track
              outcomes such as self-reported confidence, nutrition literacy, and
              engagement in healthy routines.
            </>
          }
          link={{
            href: '/pdfs/SWF2025PilotProgramsOverview.pdf',
            label: 'VIEW OUR 2025 PROGRAMS OVERVIEW (PDF)',
          }}
        />
      </div>
      <div className="relative bottom-[0.0625rem]">
        <BotCurveColor />
      </div>
      <div className="flex flex-col justify-center items-center gap-[2.5rem] px-[1.5625rem] py-[2.5rem] lg:px-[6.75rem] lg:gap-[3.75rem]">
        <PictureTextSection
          title="FITNESS PROGRAMS"
          subtitle="Strength, confidence, healthy habits"
          content={
            <>
              Our fitness pilot introduces a variety of movement-based
              activities adapted to be welcoming, non-competitive, and fun,
              including strength circuits, yoga, dance, Pilates, and
              sports-inspired workouts. Sessions are designed to meet girls
              where they are, with low-barrier access and options that
              accommodate different skill levels and interests.{' '}
              <span className="font-bold">
                Led by certified instructors and local volunteers,
              </span>{' '}
              the goal is to spark confidence and joy in movement while creating
              space for girls to explore fitness in a supportive environment.
            </>
          }
          imageUrl="/images/ProgramsIMG2.jpg"
          link={{
            href: '/pdfs/2025FitnessProgramPlan.pdf',
            label: 'VIEW OUR 2025 FITNESS PROGRAM PLAN (PDF)',
          }}
        />
        <PictureTextSection
          title="HEALTH EDUCATION WORKSHOPS"
          subtitle="Supporting girls with knowledge"
          content={
            <div>
              Our health education workshops are grounded in{' '}
              <span className="font-bold">
                real-life application - teaching girls
              </span>{' '}
              how to nourish their bodies, support their mental health, and
              build self-care routines they can carry into adulthood. Workshop
              topics will include:
              <br />
              <ul className="list-disc pl-6 leading-[160%]">
                <li className="">
                  Nutrition basics and meal planning on a budget
                </li>
                <li className="">
                  Coping with stress and understanding mental health
                </li>
                <li className="">Sleep hygiene and energy balance</li>
                <li className="">Body image and media literacy </li>
              </ul>
              Each session will be{' '}
              <span className="font-bold">interactive, age-specific,</span> and
              co-facilitated by a mix of community health workers,
              nutritionists, and youth mentors.
            </div>
          }
          imageUrl="/images/ProgramsIMG3.jpg"
          reverse={true}
          link={{
            href: '/pdfs/2025WorkshopsPlan.pdf',
            label: 'VIEW OUR 2025 WORKSHOP PROGRAM PLAN (PDF)',
          }}
        />
        <PictureTextSection
          title="MENTORSHIP PROGRAM"
          subtitle="Guidance, encouragement, connection"
          content={
            <>
              Our mentorship pilot connects participants with{' '}
              <span className="font-bold">
                supportive, vetted women mentors
              </span>{' '}
              across fields like health, education, sports, and community
              leadership. The program blends one-on-one check-ins with group
              sessions focused on goal setting, identity development, and
              confidence-building activities. We aim to create consistent,
              trusted relationships where girls feel seen, heard, and encouraged
              in both their personal and wellness journeys.
            </>
          }
          imageUrl="/images/ProgramsIMG4.jpg"
          link={{
            href: '/pdfs/2025MentorshipPlan.pdf',
            label: 'VIEW OUR 2025 MENTOR PROGRAM PLAN (PDF)',
          }}
        />
      </div>
      <DividerSection />
      <PSection
        header="LONG TERM VISION"
        text="Our vision is to create a community where every girl, regardless of
            background, has access to the tools, support, and opportunities to
            live a healthy life. As we grow, we will expand programming into
            more schools, build deeper partnerships with local health providers,
            and launch community-wide wellness initiatives that center
            girls' voices and experiences."
      />
      <ContactSection
        header="CONTACT US"
        text="Have questions or want to get involved? We're here to help!"
        href="/contact-us"
        buttonLabel="Send a message"
      />
    </main>
  );
}

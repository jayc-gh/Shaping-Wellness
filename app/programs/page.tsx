'use client';

import Link from 'next/link';
import Divider from '../../app/icons/divider-line.svg';
import TopCurveColor from '../../app/icons/top-curve-color.svg';
import BotCurveColor from '../../app/icons/bottom-curve-color.svg';
import Empowerment from '../../app/icons/programs/empowerment.svg';
import Knowledge from '../../app/icons/programs/knowledge.svg';
import Support from '../../app/icons/programs/support.svg';
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
              <h4>PROGRAMS</h4>
            </div>
            <h2>Inspiring girls to build healthy, confident futures.</h2>
            <p className="p3">
              If your organization is dedicated to giving girls the tools to
              lead healthier, more confident lives, we’re here to help.
            </p>
          </div>
        </div>
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
              <h4 className="p-neutral">WELLNESS STARTS HERE</h4>
              <h3 className="sec-coral">Giving girls the tools to succeed</h3>
            </div>
            <p className="p3">
              Girls from underserved communities are at a higher risk of
              obesity, chronic illness, and limited access to preventive
              healthcare, leading to long-term health disparities in adulthood.
              <br />
              <br />
              We help bridge this gap by empowering girls to build healthy
              habits, improve well-being, and create a foundation for lifelong
              wellness.
            </p>
          </div>
        </div>
      </div>
      <div className="divider-section">
        <Divider />
      </div>
      <div className="three-col-section">
        <div className="three-col-section-content">
          <div className="three-col-section-p-container">
            <h4 className="sec-coral">GOALS</h4>
            <p className="p3">
              Lifelong wellness starts with access to knowledge, support, and
              opportunities for movement. Healthy habits lead to greater
              confidence, improved physical and mental well-being, and a
              stronger foundation for success. So how do we ensure girls develop
              these habits in the schools and communities that need them most?
            </p>
          </div>
          <div className="three-col-section-content">
            <div className="three-col-section-boxes-container">
              <div className="three-col-section-box-wrapper">
                <Empowerment className="absolute" />
                <div className="three-col-section-box">
                  <GradientRectangle className="absolute" />
                  <div className="three-col-section-box-content">
                    <h3 className="sec-coral">Empowerment</h3>
                    <p className="p3">
                      Empowering girls to stay active and build lifelong fitness
                      habits.
                    </p>
                  </div>
                </div>
              </div>
              <div className="three-col-section-box-wrapper">
                <Knowledge className="absolute" />
                <div className="three-col-section-box">
                  <GradientRectangle className="absolute" />
                  <div className="three-col-section-box-content">
                    <h3 className="sec-coral">Knowledge</h3>
                    <p className="p3">
                      Providing the knowledge to make informed health choices.
                    </p>
                  </div>
                </div>
              </div>
              <div className="three-col-section-box-wrapper">
                <Support className="absolute" />
                <div className="three-col-section-box">
                  <GradientRectangle className="absolute" />
                  <div className="three-col-section-box-content">
                    <h3 className="sec-coral">Support</h3>
                    <p className="p3">
                      Mentorship and guidance to inspire confidence and growth.
                    </p>
                  </div>
                </div>
              </div>
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
            <h4 className="p-neutral">OUR PROGRAMS</h4>
            <h3 className="sec-coral w-[500px]">
              Building confidence, resilience, and lifelong wellness one girl at
              a time.
            </h3>
          </div>
          <div className="two-col-section-text-container">
            <p className="p3">
              We aim to reach 300 girls in our first year with evidence-informed
              health and wellness programming. Each pilot is designed with input
              from educators, youth development professionals, and community
              leaders to foster sustainable, measurable impact. We’ll track
              outcomes such as self-reported confidence, nutrition literacy, and
              engagement in healthy routines.
            </p>
            <button className="link-btn !pl-0 !pt-0">
              <span className="p5 bolded link-btn-text">
                VIEW OUR 2025 PILOT PROGRAMS OVERVIEW (PDF)
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="relative bottom-[1px]">
        <BotCurveColor />
      </div>
      <div className="two-col-section !py-[60px]">
        <div className="two-col-section-content">
          <div
            className="two-col-section-img"
            style={
              {
                '--bg-image': 'url("/images/DonationForm.webp")',
              } as React.CSSProperties
            }
          ></div>{' '}
          <div className="two-col-section-text-container">
            <div className="two-col-section-subtitle-container">
              <h4 className="p-neutral">FITNESS PROGRAMS</h4>
              <h3 className="sec-coral">
                Strength, confidence, healthy habits
              </h3>
            </div>
            <p className="p3">
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
            </p>
            <button className="link-btn !pl-0">
              <p className="p5 bolded link-btn-text">
                VIEW OUR 2025 FITNESS PROGRAM PLAN (PDF)
              </p>
            </button>
          </div>
        </div>
        <div className="two-col-section-content">
          <div className="two-col-section-text-container">
            <div className="two-col-section-subtitle-container">
              <h4 className="p-neutral">HEALTH EDUCATION WORKSHOPS</h4>
              <h3 className="sec-coral">Supporting girls with knowledge</h3>
            </div>
            <p className="p3">
              Our health education workshops are grounded in{' '}
              <span className="font-bold">
                real-life application - teaching girls
              </span>{' '}
              how to nourish their bodies, support their mental health, and
              build self-care routines they can carry into adulthood. Workshop
              topics will include:
              <br />
              <ul className="list-disc pl-6">
                <li className="p3 pl-1">
                  Nutrition basics and meal planning on a budget
                </li>
                <li className="p3 pl-1">
                  Coping with stress and understanding mental health
                </li>
                <li className="p3 pl-1">Sleep hygiene and energy balance</li>
                <li className="p3 pl-1">Body image and media literacy </li>
              </ul>
              Each session will be{' '}
              <span className="font-bold">interactive, age-specific,</span> and
              co-facilitated by a mix of community health workers,
              nutritionists, and youth mentors.
            </p>
            <button className="link-btn !pl-0">
              <p className="p5 bolded link-btn-text">
                VIEW OUR 2025 WORKSHOP PROGRAM PLAN (PDF)
              </p>
            </button>
          </div>
          <div
            className="two-col-section-img"
            style={
              {
                '--bg-image': 'url("/images/DonationForm.webp")',
              } as React.CSSProperties
            }
          ></div>{' '}
        </div>
        <div className="two-col-section-content">
          <div
            className="two-col-section-img"
            style={
              {
                '--bg-image': 'url("/images/DonationForm.webp")',
              } as React.CSSProperties
            }
          ></div>{' '}
          <div className="two-col-section-text-container">
            <div className="two-col-section-subtitle-container">
              <h4 className="p-neutral">MENTORSHIP PROGRAM</h4>
              <h3 className="sec-coral">Guidance, encouragement, connection</h3>
            </div>
            <p className="p3">
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
            </p>
            <button className="link-btn !pl-0">
              <p className="p5 bolded link-btn-text">
                VIEW OUR 2025 MENTOR PROGRAM PLAN (PDF)
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="divider-section">
        <Divider />
      </div>
      <div className="p-section">
        <div className="p-section-content">
          <h4 className="sec-coral">LONG TERM VISION</h4>
          <p className="p3">
            Our vision is to create a community where every girl, regardless of
            background, has access to the tools, support, and opportunities to
            live a healthy life. As we grow, we will expand programming into
            more schools, build deeper partnerships with local health providers,
            and launch community-wide wellness initiatives that center girls’
            voices and experiences.
          </p>
        </div>
      </div>
      <div className="last-section">
        <div className="last-section-content">
          <h4 className="coral-3">CONTACT US</h4>
          <p className="p1 c7">
            Have questions or want to get involved? We’re here to help!
          </p>
          <Link href="/contact-us" className="filled-btn w-[184px]">
            <p className="btn background-color">Send a message</p>
          </Link>
        </div>
      </div>
    </main>
  );
}

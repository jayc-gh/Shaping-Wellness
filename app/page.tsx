'use client';

import RightArrow from '../app/icons/right-arrow.svg';
import Divider from '../app/icons/divider-line.svg';
import HandHeart from '../app/icons/home/hand-heart.svg';
import Users from '../app/icons/home/users-heart.svg';
import Handshake from '../app/icons/home/handshake.svg';
import Link from 'next/link';
import React from 'react';
import BottomCurveWhite from '../app/icons/bottom-curve-white.svg';
import TopCurveWhite from '../app/icons/top-curve-white.svg';

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <div
        className="main-section !h-[600px]"
        style={
          {
            '--bg-image': 'url("/images/DonationForm.webp")',
          } as React.CSSProperties
        }
      >
        <div className="main-section-wrapper">
          <div className="main-section-content !w-[550px]">
            <h1>
              Healthy Futures, <span className="p-color">Stronger </span>
              Communities
            </h1>
            <p className="p3">
              Join us in creating opportunities for girls to grow stronger, more
              confident, and healthier. Partner today and be part of the change.
            </p>
            <Link href="/get-involved/partner" className="filled-btn">
              <p className="btn">Become a partner</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-section">
        <div className="p-section-content">
          <h4 className="sec-coral">WHO WE ARE</h4>
          <p className="p3">
            Shaping Wellness Foundation is a new nonprofit dedicated to
            supporting the{' '}
            <span className="coral-4">
              health, well-being, and personal growth of young girls in
              underserved communities.
            </span>{' '}
            While our programs are still taking shape, our commitment is
            grounded in transparency, research, and community input. We’re
            focused on building inclusive, thoughtful initiatives that help
            girls develop confidence, stay active, and make informed choices for
            lifelong wellness.
          </p>
          <Link href="who-we-are" className="link-btn">
            <h4 className="p3 link-btn-text sec-coral !font-semibold">
              LEARN MORE ABOUT OUR MISSION
            </h4>
            <RightArrow />
          </Link>
        </div>
      </div>
      <div
        className="picture-section"
        style={
          {
            '--bg-image': 'url("/images/DonationForm.webp")',
          } as React.CSSProperties
        }
      >
        <div className="picture-section-blank"></div>
        <div className="picture-section-curve top-[1px]">
          <BottomCurveWhite />
        </div>
      </div>
      <div className="p-section">
        <div className="p-section-content">
          <h4 className="sec-coral">PROGRAMS</h4>
          <p className="p3">
            We’re developing a year-round wellness curriculum for 6th - 12th
            grade girls in Houston, launching in Fall 2025. Our programming
            focuses on nutrition, self-confidence, and health education,
            equipping girls with practical tools, peer support, and guidance
            from trusted community educators to build lifelong healthy habits.
          </p>
        </div>
      </div>
      <div className="divider-section">
        <Divider />
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
              <h3 className="sec-coral">Staying active and strong</h3>
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
              <h4 className="p-neutral">WORKSHOPS</h4>
              <h3 className="sec-coral">Inspiring healthy choices</h3>
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
              <h4 className="p-neutral">MENTORSHIPS</h4>
              <h3 className="sec-coral">Guiding girls to thrive</h3>
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
      <div className="link-button-section">
        <Link href="programs" className="link-btn">
          <p className="p3 link-btn-text sec-coral !font-semibold">
            LEARN MORE ABOUT OUR PROGRAMS
          </p>
          <RightArrow />
        </Link>
      </div>
      <div
        className="picture-section"
        style={
          {
            '--bg-image': 'url("/images/DonationForm.webp")',
          } as React.CSSProperties
        }
      >
        <div className="picture-section-curve bottom-[1px]">
          <TopCurveWhite />
        </div>
        <div className="picture-section-blank"></div>
      </div>
      <div id="get-involved" className="three-col-section">
        <div className="three-col-section-content">
          <div className="three-col-section-p-container">
            <h4 className="sec-coral">GET INVOLVED</h4>
          </div>
          <div className="three-col-section-boxes-container">
            <div className="three-col-section-link-box-wrapper">
              <div className="three-col-section-link-box-content">
                <Handshake />
                <h3 className="sec-coral">Partner with us</h3>
                <p className="p3">
                  Help bring fitness, wellness, and mentorship to more girls.
                </p>
                <div className="three-col-section-link-container">
                  <div className="three-col-section-link-wrapper">
                    <Link href="/get-involved/partner" className="link-btn">
                      <p className="p5 link-btn-text sec-coral">LEARN MORE</p>
                      <RightArrow />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="three-col-section-link-box-wrapper">
              <div className="three-col-section-link-box-content">
                <HandHeart />
                <h3 className="sec-coral">Become a donor</h3>
                <p className="p3">
                  Your support helps girls build confidence and lifelong
                  well-being.
                </p>
                <div className="three-col-section-link-container">
                  <div className="three-col-section-link-wrapper">
                    <Link href="/get-involved/donor" className="link-btn">
                      <p className="p5 link-btn-text sec-coral">LEARN MORE</p>
                      <RightArrow />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="three-col-section-link-box-wrapper">
              <div className="three-col-section-link-box-content">
                <Users />
                <h3 className="sec-coral">Volunteer your time</h3>
                <p className="p3">
                  From mentoring to workshops, everyone can make a difference.
                </p>
                <div className="three-col-section-link-container">
                  <div className="three-col-section-link-wrapper">
                    <Link href="/get-involved/volunteer" className="link-btn">
                      <p className="p5 link-btn-text sec-coral">LEARN MORE</p>
                      <RightArrow />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="last-section">
        <div className="last-section-content">
          <h4 className="coral-3">CONTACT US</h4>
          <p className="p1 c7">
            Have questions or want to get involved? We&apos;re here to help!
          </p>
          <Link href="/contact-us" className="filled-btn w-[184px]">
            <p className="btn background-color">Send a message</p>
          </Link>
        </div>
      </div>
    </main>
  );
}

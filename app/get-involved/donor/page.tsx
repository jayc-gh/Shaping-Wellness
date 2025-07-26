'use client';

import TopCurveColor from '../../../app/icons/top-curve-color.svg';
import BotCurveColor from '../../../app/icons/bottom-curve-color.svg';
import Mailbox from '../../../app/icons/donate/mailbox.svg';
import Phone from '../../../app/icons/donate/phone.svg';
import Building from '../../../app/icons/donate/building.svg';
import Calendar from '../../../app/icons/donate/calendar-heart.svg';
import Graphic from '../../../app/icons/donate/graphic.svg';
import MainSection from '@/components/sections/headerSection';
import DoubleTextSection from '@/components/sections/doubleTextSection';
import HoverCard from '@/components/sections/hoverCard';
import PSection from '@/components/sections/pSection';
import CardNoBorder from '@/components/sections/cardNoBorder';
import ContactSection from '@/components/sections/contactSection';

export default function Donor() {
  return (
    <main className="flex flex-col w-full">
      <MainSection
        flagText="BECOME A DONOR"
        heading="Support. Inspire. Give"
        description="Your support makes our mission possible. See the impact you create. Explore our budget and plans below."
        bgImageUrl="/images/DonateHeader.jpg"
        aspectRatio="2600/750"
        contentMaxWidth="lg:max-w-[37.5rem]"
        backgroundPosition="center 30%, center 30%"
        buttonHref="/donate"
        buttonText="Donate Now"
        buttonVariant="white"
      />
      <div className="lg:py-[2.5rem]">
        <DoubleTextSection
          title="WHY DONATE?"
          subTitle="When you give, you're investing in brighter futures."
          description={
            <>
              Girls in underserved communities often lack access to the wellness
              resources they need to thrive.{' '}
              <span className="text-[#8e463b]">
                Your donation will help us fund the first pilot of our
                school-based wellness programs.
              </span>{' '}
              Every donation helps us provide fitness programs, health
              education, and mentorship to underserved girls, giving them the
              tools to build healthy habits and lifelong well-being.
            </>
          }
        />
      </div>
      <div className="relative top-[0.0625rem]">
        <TopCurveColor />
      </div>
      <div className="flex flex-col justify-center items-center text-center pb-[2.5rem] px-[1.5625rem] lg:px-[6.75rem] w-full bg-[#ffece4]">
        <PSection header="YOUR IMPACT HELPS:" />
        <div className="flex flex-col lg:flex-row justify-center items-center gap-[1.5rem] w-full lg:max-w-[1224px]">
          <HoverCard
            imageUrl="/images/DonateIMG1.jpg"
            title="Launch School-Based Wellness Programs"
            description="Launch and fund our 2025 pilot programs focused on fitness health education, and mentorship."
            backgroundPosition="center 20%, center 20%"
          />
          <HoverCard
            imageUrl="/images/DonateIMG2.jpg"
            title="Provide Critical Resources"
            description="From fitness gear to health materials, your gift ensures girls have what they need to succeed."
            backgroundPosition="50% 100%, 50% 100%"
          />
          <HoverCard
            imageUrl="/images/DonateIMG3.jpg"
            title="Offer Consistent Mentorship"
            description="Support the recruitment and training of mentors who guide girls through their wellness journeys."
            backgroundPosition="center 50%, center 50%"
          />
        </div>
      </div>
      <div className="relative bottom-[0.0625rem]">
        <BotCurveColor />
      </div>
      <div className="flex justify-center w-full px-[1.5625rem] lg:px-[6.75rem] py-[2.5rem]">
        <div className="flex justify-center items-center lg:max-w-[1224px] w-full">
          <Graphic />
        </div>
      </div>

      <div className="relative top-[0.0625rem]">
        <TopCurveColor />
      </div>
      <div className="bg-[#ffece4]">
        <DoubleTextSection
          title="WANT A CLOSER LOOK?"
          subTitle="We believe transparency builds trust."
          description={
            <>
              Explore our plan for sustainable growth through a detailed
              breakdown of projected expenses and our long-term strategy. See
              how every dollar supports girls&apos; health, well-being, and
              future success.
            </>
          }
          link={{
            href: '/pdfs/2025FinancialsPlan.pdf',
            label: 'VIEW OUR 2025 FINANCIAL PLAN (PDF)',
          }}
        />
      </div>
      <div className="relative bottom-[0.0625rem]">
        <BotCurveColor />
      </div>
      <div className="flex flex-col justify-center items-center w-full px-[1.5625rem] lg:px-[6.75rem] ">
        <PSection
          header="WAYS TO GIVE"
          text={
            <>
              We offer flexible giving options so you can support in the way
              that works best for you:
            </>
          }
        />
        <div className="flex w-full flex-col items-center lg:flex-row lg:max-w-[1224px] lg:gap-[1.5rem]">
          <CardNoBorder
            Icon={Calendar}
            title="Monthly Donations"
            content="Become a sustaining donor and provide reliable, ongoing support for our year-round programs.
          "
          />
          <CardNoBorder
            Icon={Building}
            title="Corporate Contributions"
            content="Partner with us as a business or sponsor and support while making a meaningful social impact.
          "
          />
          <CardNoBorder
            Icon={Phone}
            title="Donate by Phone"
            content="Prefer a personal touch? Call us at 123-456-7890 to give directly.
          "
          />
          <CardNoBorder
            Icon={Mailbox}
            title="Donate by Mail"
            content="Checks can be made payable to: Shaping Wellness Foundation 12345 Address, Houston, TX
          "
          />
        </div>
      </div>
      <ContactSection
        header="READY TO MAKE A DIFFERENCE?"
        text="Help us launch programs that support girls across Houston."
        href="/donate"
        buttonLabel="Donate Now"
      />
    </main>
  );
}

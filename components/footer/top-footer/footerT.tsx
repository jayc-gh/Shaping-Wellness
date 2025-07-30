'use client';

import WhiteLogo from '../../../app/icons/LogoSVGWhite.svg';
import Facebook from '../../../app/icons/footer/Facebook-filled-white.svg';
import XLogo from '../../../app/icons/footer/X-logo-white.svg';
import Linkedin from '../../../app/icons/footer/LinkedIn-filled-white.svg';
import MobileFooterLogo from '../../../app/icons/footer/mobile-footer-logo.svg';
import Link from 'next/link';
import FooterDropdown from './footerDropdown';
import {
  EIN,
  fbLink,
  igLink,
  linkedinLink,
  orgEmail,
  orgPhone,
} from '@/lib/constants';

const getInvolved = {
  link1: {
    key: 'volunteer',
    label: 'Volunteer',
    href: '/get-involved/volunteer',
  },
  link2: {
    key: 'partner',
    label: 'Partner with us',
    href: '/get-involved/partner',
  },
  link3: {
    key: 'donor',
    label: 'Become a donor',
    href: '/get-involved/donor',
  },
};

const learnMore = {
  link1: {
    key: 'who-we-are',
    label: 'Who we are',
    href: '/who-we-are',
  },
  link2: {
    key: 'programs',
    label: 'Programs',
    href: '/programs',
  },
  link3: {
    key: 'contact',
    label: 'Contact us',
    href: '/contact-us',
  },
};

const connect = {
  link1: {
    key: 'facebook',
    label: 'Facebook',
    href: fbLink,
  },
  link2: {
    key: 'Instagram',
    label: 'Instagram',
    href: igLink,
  },
  link3: {
    key: 'linkedin',
    label: 'LinkedIn',
    href: linkedinLink,
  },
};

const contactInfo = [orgEmail, orgPhone, `EIN: ${EIN}`];

export default function FooterT() {
  return (
    <footer className="flex flex-col items-center w-full text-white pb-[1.875rem] lg:py-[4rem]">
      {/* Mobile */}
      <div className="flex flex-col w-full gap-[1.875rem] lg:hidden">
        <div className="w-full">
          <FooterDropdown
            header="GET INVOLVED"
            id="get-involved"
            link1={getInvolved.link1}
            link2={getInvolved.link2}
            link3={getInvolved.link3}
          />
          <FooterDropdown
            header="LEARN MORE"
            id="learn-more"
            link1={learnMore.link1}
            link2={learnMore.link2}
            link3={learnMore.link3}
          />
          <FooterDropdown
            header="CONNECT"
            id="connect"
            link1={connect.link1}
            link2={connect.link2}
            link3={connect.link3}
          />
        </div>
        <div className="flex flex-col items-center gap-[1.875rem]">
          <Link href="/">
            <MobileFooterLogo />
          </Link>
          <div className="text-[0.875rem] font-[500] flex flex-col gap-[0.5rem] items-center">
            {contactInfo.map(info => (
              <p key={info}>{info}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex w-full max-w-[1224px] justify-between">
        {/* Left: Logo + Contact */}
        <div className="flex flex-col gap-[1.875rem] items-start justify-between">
          <Link href="/">
            <WhiteLogo />
          </Link>
          <div className="text-[0.875rem] font-[500] flex flex-col gap-[0.5rem]">
            {contactInfo.map(info => (
              <p key={info}>{info}</p>
            ))}
          </div>
        </div>

        {/* Right: Sections */}
        <div className="flex gap-[1.5rem]">
          <FooterColumn
            title="GET INVOLVED"
            links={[getInvolved.link1, getInvolved.link2, getInvolved.link3]}
          />
          <FooterColumn
            title="LEARN MORE"
            links={[learnMore.link1, learnMore.link2, learnMore.link3]}
          />
          <div className="flex flex-col gap-[1rem] w-[5rem]">
            <p className="text-[0.875rem] font-bold">CONNECT</p>
            <div className="flex gap-[0.75rem]">
              <a href={fbLink} target="_blank" rel="noopener noreferrer">
                <Facebook />
              </a>
              <a href={igLink} target="_blank" rel="noopener noreferrer">
                <XLogo />
              </a>
              <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
                <Linkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { key: string; label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-[1rem] w-[11.5rem]">
      <p className="text-[0.875rem] font-bold">{title}</p>
      {links.map(link => (
        <a
          key={link.key}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-[0.875rem] font-[500]">{link.label}</p>
        </a>
      ))}
    </div>
  );
}

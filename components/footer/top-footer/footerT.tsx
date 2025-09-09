'use client';

import WhiteLogo from '../../../app/icons/LogoSVGWhite.svg';
import Facebook from '../../../app/icons/footer/Facebook-filled-white.svg';
import Linkedin from '../../../app/icons/footer/LinkedIn-filled-white.svg';
import MobileFooterLogo from '../../../app/icons/footer/mobile-footer-logo.svg';
import Instagram from '../../../app/icons/footer/ig.svg';
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
    ariaLabel: 'Volunteer',
  },
  link2: {
    key: 'partner',
    label: 'Partner with us',
    href: '/get-involved/partner',
    ariaLabel: 'Partner with us',
  },
  link3: {
    key: 'donor',
    label: 'Become a donor',
    href: '/get-involved/donor',
    ariaLabel: 'Become a donor',
  },
};

const learnMore = {
  link1: {
    key: 'who-we-are',
    label: 'Who we are',
    href: '/who-we-are',
    ariaLabel: 'Who we are',
  },
  link2: {
    key: 'programs',
    label: 'Programs',
    href: '/programs',
    ariaLabel: 'Programs',
  },
  link3: {
    key: 'contact',
    label: 'Contact us',
    href: '/contact-us',
    ariaLabel: 'Contact us',
  },
};

const connect = {
  link1: {
    key: 'facebook',
    label: 'Facebook',
    href: fbLink,
    ariaLabel: 'Facebook',
  },
  link2: {
    key: 'Instagram',
    label: 'Instagram',
    href: igLink,
    ariaLabel: 'Instagram',
  },
  link3: {
    key: 'linkedin',
    label: 'LinkedIn',
    href: linkedinLink,
    ariaLabel: 'LinkedIn',
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
          <Link href="/" aria-label="Home">
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
          <Link href="/" aria-label="Home">
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
              <a
                href={fbLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook />
              </a>
              <a
                href={igLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram />
              </a>
              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
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
  links: { key: string; label: string; href: string; ariaLabel: string }[];
}) {
  return (
    <div className="flex flex-col gap-[1rem] w-[11.5rem]">
      <p className="text-[0.875rem] font-bold">{title}</p>
      {links.map(link => (
        <a
          key={link.key}
          href={link.href}
          aria-label={link.ariaLabel}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-[0.875rem] font-[500]">{link.label}</p>
        </a>
      ))}
    </div>
  );
}

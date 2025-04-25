'use client';

import WhiteLogo from '../../../app/icons/LogoSVGWhite.svg';
import Facebook from '../../../app/icons/footer/Facebook-filled-white.svg';
import XLogo from '../../../app/icons/footer/X-logo-white.svg';
import Linkedin from '../../../app/icons/footer/LinkedIn-filled-white.svg';
import Link from 'next/link';

import '../footer.css';

export default function FooterT() {
  return (
    <div className="top-footer-container">
      <div className="top-footer-content-container">
        <div className="top-footer-left-container">
          <Link href="/">
            <WhiteLogo />
          </Link>
          <div className="top-footer-contacts">
            <p className="p5">info@shapingwellness.com</p>
            <p className="p5">123-456-7890</p>
          </div>
        </div>
        <div className="top-footer-right-container">
          <div className="top-footer-get-involved">
            <p className="p5 bolded">GET INVOLVED</p>
            <Link href="/get-involved/volunteer">
              <p className="p5">Volunteer</p>
            </Link>
            <Link href="/get-involved/partner">
              <p className="p5">Partner with us</p>
            </Link>
            <Link href="/get-involved/donor">
              <p className="p5">Become a donor</p>
            </Link>
          </div>
          <div className="top-footer-learn-more">
            <p className="p5 bolded">LEARN MORE</p>
            <Link href="/who-we-are">
              <p className="p5">Who we are</p>
            </Link>
            <Link href="/programs">
              <p className="p5">Programs</p>
            </Link>
            <Link href="/contact-us">
              <p className="p5">Contact us</p>
            </Link>
          </div>
          <div className="top-footer-connect">
            <p className="p5 bolded">CONNECT</p>
            <div className="top-footer-connect-logos">
              <Link href="/">
                <Facebook />
              </Link>
              <Link href="/">
                <XLogo />
              </Link>
              <Link href="/">
                <Linkedin />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

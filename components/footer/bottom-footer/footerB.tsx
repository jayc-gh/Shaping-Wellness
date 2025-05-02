import Link from 'next/link';
import PrivacyPolicy from '@/components/footer/bottom-footer/privacy-policy';

export default function FooterB() {
  return (
    <div className="bot-footer-container">
      <div className="bot-footer-content-container">
        <p className="p6">
          © 2025 Shaping Wellness Foundation. All rights reserved. Shaping
          Wellness Foundation is a 501(c)(3) tax-exempt nonprofit organization.
        </p>
        <div className="bot-footer-right-container">
          <p className="p6 thin underline cursor-pointer">Privacy Policy</p>
          <p className="p6 thin">|</p>
          <p className="p6 thin">
            Images by{' '}
            <Link href="https://www.freepik.com/" className="underline">
              Freepik
            </Link>
          </p>
          <p className="p6 thin">|</p>
          <p className="p6 thin">
            Design:{' '}
            <Link
              href="https://brendanarvaez.framer.website/"
              className="underline"
            >
              BN
            </Link>
          </p>
          <p className="p6 thin">|</p>
          <p className="p6 thin">
            Dev:{' '}
            <Link href="https://github.com/jayc-gh" className="underline">
              JC
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

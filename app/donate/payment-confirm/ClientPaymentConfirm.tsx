'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MainSection from '@/components/sections/headerSection';
import ConfirmationBox from '@/components/sections/confirmationBox';
import { DonationObject } from './page';
import {
  getOneTimeStatus,
  getSubscriptionStatus,
} from '@/lib/functions/statusFunctions';

const localHosts = ['localhost', '127.0.0.1'];
const isLocalhost =
  typeof window !== 'undefined' &&
  localHosts.includes(window.location.hostname);

const stripePublicKey: string = isLocalhost
  ? process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_LOCAL!
  : process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!;

if (!stripePublicKey) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLIC_KEY');
}

interface PaymentConfirmProps {
  donation: DonationObject;
  monthly: string;
}

export default function PaymentConfirm({
  donation,
  monthly,
}: PaymentConfirmProps) {
  const [showBg, setShowBg] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  let message;
  let errorMessage;
  useEffect(() => {
    function updateShowBg() {
      setShowBg(window.innerWidth < 1024);
    }
    updateShowBg();
    setHasMounted(true);

    window.addEventListener('resize', updateShowBg);
    return () => window.removeEventListener('resize', updateShowBg);
  }, []);

  if (!hasMounted) return null;

  if (donation.last_payment_error) {
    errorMessage =
      'Your payment was unsuccessful. Please try again with a different payment method.';
  } else if (monthly === 'true') {
    const status = getSubscriptionStatus(donation);
    message = status.message;
    errorMessage = status.errorMessage;
  } else {
    const status = getOneTimeStatus(donation);
    message = status.message;
    errorMessage = status.errorMessage;
  }

  return (
    <main
      className="flex flex-col w-full items-center justify-center lg:flex-row
                 bg-no-repeat bg-cover bg-[center_10%] lg:bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/images/DonateForm.jpg')]"
    >
      <div className="flex lg:py-[5rem] lg:px-[6.75rem] w-full justify-center">
        <div className="flex w-full flex-col lg:flex-row lg:justify-between lg:max-w-[1224px] gap-[1.5rem]">
          <div className="flex lg:w-[31rem]">
            <MainSection
              flagText="DONATE"
              heading="Thank you for choosing to support Shaping Wellness Foundation."
              description={
                <>
                  Your donation directly funds school-based fitness programs,
                  health education workshops, and mentorship opportunities for
                  girls in underserved communities. Together, we can build a
                  future where every girl has the tools, support, and confidence
                  to lead a healthy, empowered life. <br />
                  <br />
                  Curious about the difference you&apos;re making? Visit our{' '}
                  <Link
                    href="/get-involved/donor"
                    className="cursor-pointer"
                    aria-label="Become a donor page"
                  >
                    <span className="underline">Become a Donor page</span>
                  </Link>{' '}
                  to see how your support changes lives.
                </>
              }
              bgImageUrl="/images/DonateForm.jpg"
              backgroundPosition="10% 20%, 10% 20%"
              transparent={true}
              showBg={showBg}
            />
          </div>
          <ConfirmationBox message={message} errorMessage={errorMessage} />
        </div>
      </div>
    </main>
  );
}

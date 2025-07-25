'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  useOneTimePayment,
  useSubscription,
} from '@/lib/functions/useFunctions';
import MainSection from '@/components/sections/headerSection';
import FormSummary from '@/components/sections/formSummary';
import ConfirmationBox from '@/components/sections/confirmationBox';

const stripePublicKey: string = process.env
  .NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string;
if (!stripePublicKey) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLIC_KEY');
}

export default function PaymentConfirm() {
  const [valid, setValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [message, setMessage] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  const searchParams = useSearchParams();
  const monthlyUrl = searchParams.get('monthly');

  useSubscription(setValid, setMessage, setErrorMessage, monthlyUrl);
  useOneTimePayment(setValid, setMessage, setErrorMessage, monthlyUrl);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <main
      className="flex flex-col w-full lg:flex-row"
      style={{
        backgroundImage: isMobile
          ? undefined
          : `linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/images/DonateForm.jpg)`,
        backgroundRepeat: isMobile ? undefined : 'no-repeat',
        backgroundPosition: isMobile ? undefined : 'center 10%, center 10%',
        backgroundSize: isMobile ? undefined : 'cover, cover',
      }}
    >
      {isMobile && (
        <>
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
                <Link href="/get-involved/donor" className="cursor-pointer">
                  <span className="underline">Become a Donor page</span>
                </Link>{' '}
                to see how your support changes lives.
              </>
            }
            bgImageUrl="/images/DonateForm.jpg"
            aspectRatio="15/13"
            backgroundPosition="10% center, 10% center"
          />
          <ConfirmationBox
            valid={valid}
            message={message}
            errorMessage={errorMessage}
          />
        </>
      )}

      {!isMobile && (
        <div className="flex w-full px-[1.5625rem] py-[3.125rem] lg:py-[5rem] lg:px-[6.75rem] justify-center items-center">
          <div className="flex w-full max-w-[1224px] justify-between items-start gap-[1.5rem]">
            <FormSummary
              flagText="DONATE"
              header="Thank you for choosing to support Shaping Wellness Foundation."
              description={
                <>
                  Your donation directly funds school-based fitness programs,
                  health education workshops, and mentorship opportunities for
                  girls in underserved communities. Together, we can build a
                  future where every girl has the tools, support, and confidence
                  to lead a healthy, empowered life. <br />
                  <br />
                  Curious about the difference you&apos;re making? Visit our{' '}
                  <Link href="/get-involved/donor" className="cursor-pointer">
                    <span className="underline">Become a Donor page</span>
                  </Link>{' '}
                  to see how your support changes lives.
                </>
              }
            />
            <ConfirmationBox
              valid={valid}
              message={message}
              errorMessage={errorMessage}
            />
          </div>
        </div>
      )}
    </main>
  );
}

'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  useOneTimePayment,
  useSubscription,
} from '@/lib/functions/useFunctions';
import MainSection from '@/components/sections/headerSection';
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

  const searchParams = useSearchParams();
  const monthlyUrl = searchParams.get('monthly');

  useSubscription(setValid, setMessage, setErrorMessage, monthlyUrl);
  useOneTimePayment(setValid, setMessage, setErrorMessage, monthlyUrl);

  return (
    <main
      className="flex flex-col w-full items-center justify-center lg:flex-row
                 bg-no-repeat bg-cover bg-[center_10%] lg:bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/images/DonateForm.jpg')] lg:bg-[center_10%]"
    >
      <div className="flex lg:py-[5rem] lg:px-[6.75rem] w-full justify-center">
        <div className="flex w-full flex-col lg:flex-row lg:gap-[1.5rem] lg:max-w-[1224px]">
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
            aspectRatio="aspect-[1/1] lg:aspect-[18/5]"
            backgroundPosition="10% 20%, 10% 20%"
            transparent={true}
          />
          <ConfirmationBox
            valid={valid}
            message={message}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </main>
  );
}

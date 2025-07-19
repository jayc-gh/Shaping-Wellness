'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProgressBar from '@/components/pages/donate/progressBar';
import Summary from '@/components/pages/donate/summary';
import '../../donate/donate.css';
import '../../../components/forms/forms.css';
import Link from 'next/link';
import RightArrow from '../../icons/right-arrow.svg';
import {
  useOneTimePayment,
  useSubscription,
} from '@/lib/functions/useFunctions';

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
      className="background"
      style={
        {
          '--bg-image': 'url("/images/DonationForm.webp")',
        } as React.CSSProperties
      }
    >
      <div className="main-container">
        <div className="content-container">
          <Summary />
          <div className="donate-form-box">
            {valid && (
              <>
                <div className="!gap-[2rem] form-container">
                  {/* Back button and Progress bar */}
                  <ProgressBar step={5} prevStep={() => undefined} />
                  <h4 className="self-center">Thank you for your donation!</h4>
                  <div className="thank-you-container">
                    <div className="text-left p4 primary-2 gap-[1.5rem] flex flex-col">
                      <p>{message}</p>
                      <p>
                        Because of you, more girls will have access to the
                        resources they need to grow up strong, healthy, and
                        confident. You&apos;ve truly made a difference.
                      </p>
                    </div>
                  </div>
                </div>
                <Link
                  href="../get-involved/donor"
                  className="link-btn !px-[0.625rem]"
                >
                  <h4 className="link-btn-text sec-coral">
                    SEE HOW YOUR DONATION WILL BE USED
                  </h4>
                  <span className="icon-wrapper">
                    <RightArrow />
                  </span>
                </Link>
              </>
            )}

            {errorMessage && (
              <p className="error-text text-center">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

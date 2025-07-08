'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProgressBar from '@/components/pages/donate/progressBar';
import Summary from '@/components/pages/donate/summary';
import '../../donate/donate.css';
import '../../../components/forms/forms.css';
import { fetchPaymentWithRetry } from '@/lib/functions/serverFunctions';
import Link from 'next/link';
import RightArrow from '../../icons/right-arrow.svg';

const stripePublicKey: string = process.env
  .NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string;
if (!stripePublicKey) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLIC_KEY');
}

export default function PaymentConfirm() {
  const [valid, setValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [message, setMessage] = useState<string>('');
  const [monthly, setMonthly] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // run conditional useEffect based on monthly
  // set up check subscription endpoint
  // if monthly query above endpoint to get subscription info
  // else run the existing useEffect

  // prevent going to confirmation page without existing payment intent
  // also getting payment status and info
  useEffect(() => {
    const paymentId = searchParams.get('payment_intent');
    const monthlyUrl = searchParams.get('monthly');
    setMonthly(monthlyUrl === 'true' ? true : false);
    const fetchUrl = `/api/payment-status?payment_intent=${paymentId}`;
    if (!paymentId) {
      router.push('/donate');
      return;
    }

    const fetchData = async () => {
      const donation = await fetchPaymentWithRetry(fetchUrl);
      switch (donation.status) {
        case 'succeeded':
          setValid(true);
          setMessage(
            `We've received your gift of $${(donation.amount / 100).toFixed(
              2
            )}. Thank you for your generosity! You should receive an email receipt shortly.`
          );
          break;
        case 'processing':
          setValid(true);
          setMessage(
            `Your donation of $${(donation.amount / 100).toFixed(
              2
            )} is currently being processed. If you used bank transfer, please allow 3-5 business days for it to complete. Once it's done, we'll email you a receipt.`
          );
          break;
        // if payment intent is missing or not found redirect to donate page
        case '404':
        case '400':
          router.push('/donate');
          return;
        case 'canceled':
          setValid(false);
          setErrorMessage('Your payment was canceled or timed out.');
          break;
        default:
          setValid(false);
          setErrorMessage(
            "An unknown error occured while fetching your donation status. You should still receive a confirmation email (few minutes for card payments or 3-5 business days for bank payments). If you don't, please contact us. We apologize for the inconvenience."
          );
      }
    };

    fetchData();
  }, [router, searchParams]);

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
                <div className="!gap-[32px] form-container">
                  {/* Back button and Progress bar */}
                  <ProgressBar step={4} prevStep={() => undefined} />
                  <h4 className="self-center">Thank you for your donation!</h4>
                  <div className="thank-you-container">
                    <div className="text-center p4 primary-2 gap-[24px] flex flex-col">
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
                  className="link-btn !px-[10px]"
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

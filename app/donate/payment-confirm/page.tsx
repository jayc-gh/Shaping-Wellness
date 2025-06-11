'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProgressBar from '@/components/pages/donate/progressBar';
import Summary from '@/components/pages/donate/summary';
import '../../donate/donate.css';
import '../../../components/forms/forms.css';
import { fetchPaymentWithRetry } from '@/lib/functions';
import Link from 'next/link';
import RightArrow from '../../icons/right-arrow.svg';

const stripePublicKey: string = process.env
  .NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string;
if (!stripePublicKey) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLIC_KEY');
}

type DonationInfo = {
  donorId: string | null;
  status: string | null;
  amount: number | null;
  error?: string | null;
};

export default function PaymentConfirm() {
  const [valid, setValid] = useState<boolean>(false);
  const [donationInfo, setDonationInfo] = useState<DonationInfo>({
    donorId: null,
    status: null,
    amount: null,
    error: null,
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();

  // prevent going to confirmation page without existing payment intent
  // also getting payment status and info
  useEffect(() => {
    const paymentId = searchParams.get('payment_intent');
    const monthly = searchParams.get('monthly');
    const fetchUrl = `/api/payment-status?payment_intent=${paymentId}`;
    if (!paymentId) {
      router.push('/donate');
      return;
    }

    const fetchData = async () => {
      const donation = await fetchPaymentWithRetry(fetchUrl);
      setDonationInfo(donation);

      switch (donation.status) {
        case 'succeeded':
          setValid(true);
          setMessage(
            `We've received your gift of $${(donation.amount / 100).toFixed(
              2
            )}!`
          );
          break;
        case 'processing':
          setValid(true);
          setMessage(
            `Your gift of $${(donation.amount / 100).toFixed(2)} is on its way!`
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
                  <h4 className="self-center">{message}</h4>
                  <div className="thank-you-container">
                    <div className="text-center p4 primary-2 gap-[24px] flex flex-col">
                      <p>
                        Thank you for your generosity. A cofirmation receipt
                        will be sent to the email address you provided (bank
                        payments typically take 3-5 business days).
                      </p>
                      <p>
                        Because of you, more girls will have access to the
                        resources they need to grow up strong, healthy, and
                        confident. You&apos;ve truly made a difference.
                      </p>
                      <p>
                        Your donor ID is: {donationInfo.donorId} <br />
                        Please save this ID for future reference.
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

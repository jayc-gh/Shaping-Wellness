'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProgressBar from '@/components/pages/donate/progressBar';
import Summary from '@/components/pages/donate/summary';
import '../donate.css';

const stripePublicKey: string = process.env
  .NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string;
if (!stripePublicKey) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLIC_KEY');
}

export default function PaymentConfirm() {
  const [valid, setValid] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // prevent going to payment-success through url
  useEffect(() => {
    const paymentId = searchParams.get('payment_intent');

    const getPayment = async () => {
      const res = await fetch(
        `/api/payment-status?payment_intent=${paymentId}`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const data = await res.json();
      if (data) {
        setValid(true);
      } else {
        router.push('/');
      }
    };

    getPayment();
  }, [router, searchParams]);

  return (
    <main className="main-container">
      <div className="content-container">
        <Summary />
        <div className="form-box">
          {valid && (
            <div className="!gap-[48px] form-container">
              {/* Back button and Progress bar */}
              <ProgressBar step={4} prevStep={() => undefined} />
              <div className="thank-you-container">
                <h4>THANK YOU</h4>
                <p className="text-center p4 primary-2">
                  Thank you for your generous donation of ${amount}!
                </p>
                <p className="text-center p4 primary-2">
                  Your support is helping girls build confidence, develop
                  healthy habits, and create brighter futures. We&apos;re
                  incredibly grateful for your contribution.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

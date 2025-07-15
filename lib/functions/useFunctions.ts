import { useEffect } from 'react';
import {
  fetchPaymentWithRetry,
  fetchSubscriptionWithRetry,
} from './serverFunctions';
import { useRouter, useSearchParams } from 'next/navigation';

export function useOutsideClick(
  ref: React.RefObject<HTMLDivElement | null>,
  onClickOutside: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, onClickOutside]);
}

export function useStopScroll(state: boolean) {
  useEffect(() => {
    if (state) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // reset overflow if unmounted before popup updates
    return () => {
      document.body.style.overflow = '';
    };
  }, [state]);
}

export function useOneTimePayment(
  setValid: React.Dispatch<React.SetStateAction<boolean>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>,
  monthly: string | null
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const paymentId = searchParams.get('payment_intent');
    const fetchUrl = `/api/payment-status?payment_intent=${paymentId}`;
    if (monthly !== 'false') return;
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
  }, [router, searchParams, setErrorMessage, setMessage, setValid, monthly]);
}

export function useSubscription(
  setValid: React.Dispatch<React.SetStateAction<boolean>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>,
  monthly: string | null
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const subscriptionId = searchParams.get('subscriptionId');
    const fetchUrl = `/api/subscription-status?subscriptionId=${subscriptionId}`;
    if (monthly !== 'true') return;
    if (!subscriptionId) {
      router.push('/donate');
      return;
    }

    const fetchData = async () => {
      const subscription = await fetchSubscriptionWithRetry(fetchUrl);
      switch (subscription.status) {
        case 'active':
          setValid(true);
          setMessage(
            `Your recurring monthly donation of $${(
              subscription.amount / 100
            ).toFixed(
              2
            )} is now active. Thank you for your generosity! You should receive an email receipt shortly.`
          );
          break;
        case 'incomplete':
          setValid(true);
          setMessage(
            `Your recurring monthly donation of $${(
              subscription.amount / 100
            ).toFixed(
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
        case 'incomplete_expired':
          setValid(false);
          setErrorMessage('Your payment was canceled or timed out.');
          break;
        default:
          setValid(false);
          setErrorMessage(
            "An unknown error occured while fetching your subscription status. You should still receive a confirmation email (few minutes for card payments or 3-5 business days for bank payments). If you don't, please contact us. We apologize for the inconvenience."
          );
      }
    };

    fetchData();
  }, [router, searchParams, setErrorMessage, setMessage, setValid, monthly]);
}

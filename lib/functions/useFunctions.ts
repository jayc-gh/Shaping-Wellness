import { useEffect } from 'react';
import { fetchPayment, fetchSubscription } from './serverFunctions';
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
    if (!state) return;

    // Save scroll position
    const scrollY = window.scrollY;
    const body = document.body;

    // Lock scroll
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflowY = 'scroll';

    return () => {
      // Restore scroll
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.style.overflowY = '';

      // Restore scroll position
      window.scrollTo(0, scrollY);
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
      const donation = await fetchPayment(fetchUrl);
      // if payment intent is missing or not found redirect to donate page
      if (donation.error) {
        router.push('/donate');
        return;
      }
      switch (donation.status) {
        case 'requires_payment_method': {
          // If the payment intent requires a payment method, it means the payment failed or was canceled
          if (donation.last_payment_error) {
            setValid(false);
            setErrorMessage(
              'Your payment was unsuccessful. Please try again with a different payment method.'
            );
          }
          break;
        }
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
            )} is currently being processed. If you used bank transfer, please allow 3-5 business days for it to complete. If it's successful, we'll email you a receipt.`
          );
          break;
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
      const subscription = await fetchSubscription(fetchUrl);
      // if payment intent is missing or not found redirect to donate page
      if (subscription.error) {
        router.push('/donate');
        return;
      }
      const status = subscription.status;

      switch (status) {
        case 'requires_payment_method': {
          // If the payment intent requires a payment method, it means the payment failed or was canceled
          if (subscription.last_payment_error) {
            setValid(false);
            setErrorMessage(
              'Your payment was unsuccessful. Please try again with a different payment method.'
            );
          }
          break;
        }
        case 'succeeded':
          setValid(true);
          setMessage(
            `Your recurring monthly donation of $${(
              subscription.amount / 100
            ).toFixed(
              2
            )} is now active. Thank you for your generosity! You should receive an email receipt shortly.`
          );
          break;
        case 'processing':
          setValid(true);
          setMessage(
            `Your recurring monthly donation of $${(
              subscription.amount / 100
            ).toFixed(
              2
            )} is currently being processed. If you used bank transfer, please allow 3-5 business days for it to complete. If it's successful, we'll email you a receipt.`
          );
          break;
        case 'canceled':
          setValid(false);
          setErrorMessage('Your payment was canceled.');
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

import { DonationObject } from '@/app/donate/payment-confirm/page';

export function getOneTimeStatus(donation: DonationObject) {
  let message;
  let errorMessage;
  switch (donation.status) {
    case 'succeeded':
      message = `We've received your gift of $${(donation.amount / 100).toFixed(
        2
      )}. Thank you for your generosity! You'll receive an email receipt shortly.`;

      break;
    case 'processing':
      message = `Your $${(donation.amount / 100).toFixed(
        2
      )} donation is being processed. If you donated via bank transfer, please allow 3-5 business days for completion. A receipt will be emailed to you once the payment is confirmed. `;

      break;
    case 'canceled':
      errorMessage = 'Your payment was canceled or timed out.';
      break;
    default:
      errorMessage =
        "Something went wrong while fetching your donation status. You should still receive a confirmation email (few minutes for card payments or 3-5 business days for bank payments). If you don't, please contact us. We apologize for the inconvenience.";
  }

  return { message, errorMessage };
}

export function getSubscriptionStatus(subscription: DonationObject) {
  const status = subscription.status;
  let message;
  let errorMessage;
  switch (status) {
    case 'succeeded':
      message = `Your monthly donation of $${(
        subscription.amount / 100
      ).toFixed(
        2
      )} is now active. Thank you for your generosity! You should receive an email receipt shortly.`;
      break;
    case 'processing':
      message = `Your monthly donation of $${(
        subscription.amount / 100
      ).toFixed(
        2
      )} is being processed. If you donated via bank transfer, please allow 3-5 business days for completion. A receipt will be emailed to you once the payment is confirmed. `;

      break;
    case 'canceled':
      errorMessage = 'Your payment was canceled.';
      break;
    default:
      errorMessage =
        "An unknown error occured while fetching your subscription status. You should still receive a confirmation email (few minutes for card payments or 3-5 business days for bank payments). If you don't, please contact us. We apologize for the inconvenience.";
  }
  return { message, errorMessage };
}

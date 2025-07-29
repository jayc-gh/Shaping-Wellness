import { DonateFormData, StripeCtx, ErrorMap } from '@/declarations';
import { convertToSubcurrency } from './currencyFunctions';
import { useRouter } from 'next/navigation';
import {
  createPaymentIntent,
  createSubscription,
  storeDonationData,
} from './serverFunctions';
import { validateForm, validateEmailFormat } from './validateFunctions';

type Router = ReturnType<typeof useRouter>;

type StepOneSubmitParams = {
  formData: DonateFormData;
  nextStep: () => void;
};

type StepTwoSubmitParams = {
  formData: DonateFormData;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
  nextStep: () => void;
};

type StepThreeSubmitParams = {
  formData: DonateFormData;
  nextStep: () => void;
};

type StepFourSubmitParams = {
  formData: DonateFormData;
  stripeCtx: StripeCtx;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
  nextStep: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  router: Router;
};
export async function handleSubmitStepOne({
  formData,
  nextStep,
}: StepOneSubmitParams) {
  const donationAmount = parseFloat(formData.donationAmount || '0');
  if (
    isNaN(donationAmount) ||
    donationAmount < 1 ||
    donationAmount > 999999.99
  ) {
    return;
  }
  nextStep();
  return;
}

export async function handleSubmitStepTwo({
  formData,
  setShowErrors,
  nextStep,
}: StepTwoSubmitParams) {
  const requiredFields = [
    'firstName',
    'lastName',
    'address.address1',
    'address.city',
    'address.country',
    'address.postalCode',
  ];

  if (formData.address.country === 'US' || formData.address.country === 'CA') {
    requiredFields.push('address.state');
  }

  const errors = validateForm(formData, {
    requiredFields,
    customValidations: [
      data => (!validateEmailFormat(data.email) ? { email: true } : {}),
      data =>
        data.orgDonate && data.orgName.trim() === '' ? { orgName: true } : {},
    ],
  });

  // Update state with all the errors
  setShowErrors(prev => ({
    ...prev,
    ...errors,
  }));

  // If there are any errors, prevent submission
  if (Object.keys(errors).length > 0) {
    return;
  }

  // No errors - clear previous errors
  setShowErrors({});
  nextStep();
  return;
}

export function handleSubmitStepThree({
  formData,
  nextStep,
}: StepThreeSubmitParams) {
  if (!formData.paymentReady) {
    console.warn('Payment not ready');
    return;
  }
  nextStep();
  return;
}

export async function handleSubmitStepFour({
  formData,
  stripeCtx,
  nextStep,
  setLoading,
  setErrorMessage,
  router,
}: StepFourSubmitParams) {
  setLoading(true);
  const { stripe, elements } = stripeCtx;

  if (!stripe || !elements) {
    console.warn('Stripe not ready');
    return;
  }

  const { error: submitError } = await elements.submit();
  if (submitError) {
    setLoading(false);
    return;
  }

  let oneTimeIntent;
  let subscriptionIntent;
  if (!formData.monthly) {
    oneTimeIntent = await createPaymentIntent(formData);
  } else if (formData.monthly) {
    subscriptionIntent = await createSubscription(
      formData.totalCharged,
      formData.donationAmount,
      formData.email,
      formData.firstName,
      formData.lastName,
      formData.orgName,
      formData.phone.number,
      formData.phone.type,
      formData.address.address1,
      formData.address.address2,
      formData.address.country,
      formData.address.state,
      formData.address.city,
      formData.address.postalCode,
      formData.anonymous
    );
  }

  if (oneTimeIntent?.error || subscriptionIntent?.error) {
    setErrorMessage(oneTimeIntent?.error || subscriptionIntent?.error);
    setLoading(false);
    return;
  }

  const donationData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    orgName: formData.orgName,
    email: formData.email,
    phoneNum: formData.phone.number,
    phoneType: formData.phone.type,
    charged_amount: convertToSubcurrency(Number(formData.totalCharged)),
    donation_amount: convertToSubcurrency(Number(formData.donationAmount)),
    clientSecret: oneTimeIntent?.clientSecret,
    paymentIntentId: oneTimeIntent?.paymentIntentId,
    paymentStatus: oneTimeIntent?.status,
    receiptSent: false,
    subscriberId: formData.monthly ? subscriptionIntent?.subscriberId : '',
    invoiceId: formData.monthly ? subscriptionIntent?.invoiceId : '',
    address1: formData.address.address1,
    address2: formData.address.address2,
    country: formData.address.country,
    state: formData.address.state,
    city: formData.address.city,
    postalCode: formData.address.postalCode,
    anonymous: formData.anonymous,
  };

  let autoReturnUrl;
  if (!formData.monthly) {
    const storedData = await storeDonationData(donationData);
    autoReturnUrl = `${window.location.origin}/donate/payment-confirm?donorId=${storedData?.donorId}&monthly=${formData.monthly}`;
  } else if (formData.monthly) {
    autoReturnUrl = `${window.location.origin}/donate/payment-confirm?subscriptionId=${subscriptionIntent?.subscriptionId}&monthly=${formData.monthly}`;
  }
  const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
    elements,
    clientSecret: formData.monthly
      ? subscriptionIntent?.clientSecret
      : oneTimeIntent?.clientSecret,
    confirmParams: {
      return_url: autoReturnUrl,
      payment_method_data: {
        billing_details: {
          address: {
            country: formData.address.country,
            line1: formData.address.address1,
            line2: formData.address.address2,
            state: formData.address.state,
            city: formData.address.city,
            postal_code: formData.address.postalCode,
          },
        },
      },
    },
    redirect: 'if_required',
  });

  // handling errors after submission during confirmation (valid card)
  if (confirmError) {
    console.error('Stripe confirmPayment error:', {
      message: confirmError.message,
      type: confirmError.type,
      code: confirmError.code,
      payment_intent: confirmError.payment_intent,
    });

    setErrorMessage(
      `${confirmError.message}` ||
        'There was an issue processing your payment. Please try again.'
    );
    setLoading(false);
    return;
  } else if (paymentIntent) {
    router.push(
      `${autoReturnUrl}&payment_intent=${paymentIntent.id}&payment_intent_client_secret=${paymentIntent.client_secret}`
    );
    return;
  }
  nextStep();
  return;
}

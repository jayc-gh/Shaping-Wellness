import { DonateFormData, StripeCtx, ErrorMap } from '@/declarations';
import { convertToSubcurrency } from './currencyFunctions';
import { useRouter } from 'next/navigation';
import { createPaymentIntent, storeDonationData } from './serverFunctions';
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
  stripeCtx: StripeCtx;
  setShowErrors: React.Dispatch<React.SetStateAction<ErrorMap>>;
  nextStep: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
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

export async function handleSubmitStepThree({
  formData,
  stripeCtx,
  nextStep,
  setLoading,
  setErrorMessage,
  router,
}: StepThreeSubmitParams) {
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

  const intent = await createPaymentIntent(formData.totalCharged);
  if (intent.error) {
    setErrorMessage(intent.error);
    setLoading(false);
    return;
  }

  const data = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    amount: convertToSubcurrency(Number(formData.totalCharged)),
    clientSecret: intent.clientSecret,
    paymentIntentId: intent.paymentIntentId,
    paymentStatus: intent.paymentStaus,
  };

  const storedData = await storeDonationData(data);

  const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
    elements,
    clientSecret: intent.clientSecret,
    confirmParams: {
      return_url: `${window.location.origin}/donate/payment-confirm?donorId=${storedData.donorId}&monthly=${formData.monthly}`,
      receipt_email: formData.email,
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
      `/donate/payment-confirm?donorId=${storedData.donorId}&monthly=${formData.monthly}&payment_intent=${paymentIntent.id}&payment_intent_client_secret=${paymentIntent.client_secret}`
    );
    return;
  }
  nextStep();
  return;
}

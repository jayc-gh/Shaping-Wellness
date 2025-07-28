import { DonateFormData } from '@/declarations';
import Lock from '../../../app/icons/donate/lock.svg';
import Checkbox from './donateCheckbox';
import { calcTransactionFee } from '@/lib/functions/currencyFunctions';
import MainButton from '@/components/buttons/mainButton';

interface StepProps {
  formData: DonateFormData;
  setFormData: React.Dispatch<React.SetStateAction<DonateFormData>>;
  step: number;
  errorMessage: string | undefined;
  loading: boolean;
  popup: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TermsContainer({
  formData,
  setFormData,
  step,
  errorMessage,
  loading,
  setPopup,
  popup,
}: StepProps) {
  const handleCheckboxChange = () => {
    calcTransactionFee(
      setFormData,
      formData.donationAmount,
      !formData.feeCovered,
      formData.paymentMethod
    );
  };

  return (
    <div className="flex flex-col gap-[1.5rem] w-full">
      {(step < 4 || (step === 4 && !errorMessage)) && (
        <>
          <div className="flex flex-col gap-[1rem] justify-center items-center">
            {step === 3 && !errorMessage && (
              <Checkbox
                id={'cover-fee-checkbox'}
                checked={formData.feeCovered}
                onChange={handleCheckboxChange}
                label={
                  "I'd like to cover the transaction fee for this donation"
                }
                disabled={loading}
                help={true}
              />
            )}

            <MainButton
              color="orange"
              width="fill"
              submit={{
                disabled:
                  (step === 4 && loading) ||
                  (step === 1 && Number(formData.donationAmount) < 1) ||
                  errorMessage !== '' ||
                  (step === 3 && !formData.paymentReady) ||
                  (step === 4 && !formData.paymentReady),
                label:
                  step === 4 ? `Donate $${formData.totalCharged}` : 'Continue',
                loading: loading,
              }}
            />

            <div className="flex justify-center items-center gap-[0.3125rem]">
              <Lock />
              <p className="text-[0.75rem] italic text-[#6b6461] !font-[500]">
                Your donation is secure and facilitated by Stripe.
              </p>
            </div>
          </div>

          {step === 4 && (
            <p className="text-center text-[0.75rem] font-[500] leading-[140%] text-[#6b6461]">
              By clicking Donate, I agree to receive communications from Shaping
              Wellness Foundation and their{' '}
              <span
                className="underline cursor-pointer"
                onClick={() => setPopup(!popup)}
              >
                Privacy Policy.
              </span>
            </p>
          )}
        </>
      )}
    </div>
  );
}

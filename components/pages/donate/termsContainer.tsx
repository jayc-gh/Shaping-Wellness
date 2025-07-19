import { DonateFormData } from '@/declarations';
import Lock from '../../../app/icons/donate/lock.svg';
import LoadingDots from '../../loadingDots';
import Checkbox from './donateCheckbox';
import { calcTransactionFee } from '@/lib/functions/currencyFunctions';

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
    calcTransactionFee(formData, setFormData);
  };

  return (
    <div className="terms-container">
      {(step < 4 || (step === 4 && !errorMessage)) && (
        <>
          <div className="flex flex-col gap-[0.625rem] justify-center items-center">
            {step === 3 && !errorMessage && (
              <Checkbox
                id={'cover-fee-checkbox'}
                checked={formData.feeCovered}
                onChange={handleCheckboxChange}
                label={
                  "I'd like to cover the transaction fee for this donation"
                }
                disabled={loading}
              />
            )}

            <div className="continue-container">
              <button
                className="continue-btn"
                type="submit"
                title={
                  step === 1 && Number(formData.donationAmount) < 1
                    ? 'Minimum donation amount is $1.00'
                    : undefined
                }
                disabled={
                  (step === 4 && loading) ||
                  (step === 1 && Number(formData.donationAmount) < 1) ||
                  errorMessage !== '' ||
                  (step === 3 && !formData.paymentReady) ||
                  (step === 4 && !formData.paymentReady)
                }
              >
                <span className="btn flex items-center justify-center w-full">
                  {step === 4 && loading ? (
                    <span className="btn flex items-center justify-center w-full">
                      Processing
                      <div className="translate-y-[0.5rem] translate-x-[0.375rem]">
                        <LoadingDots />
                      </div>
                    </span>
                  ) : step === 4 ? (
                    `Donate $${formData.totalCharged}`
                  ) : (
                    'Continue'
                  )}
                </span>
              </button>
            </div>

            <div className="flex justify-center items-center gap-[0.3125rem]">
              <Lock />
              <p className="custom-text-3 s-neutral !font-[500] !no-underline">
                Your donation is secure and facilitated by Stripe.
              </p>
            </div>
          </div>

          {step === 4 && (
            <p className="terms-text">
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

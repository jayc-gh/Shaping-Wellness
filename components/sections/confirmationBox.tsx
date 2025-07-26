import { errorText } from '@/lib/classes/input-fields';
import HyperLink from '../buttons/hyperLink';
import ProgressBar from '../pages/donate/progressBar';

type ConfirmationBoxProps = {
  valid: boolean;
  message: string;
  errorMessage: string | undefined;
};

export default function ConfirmationBox({
  valid,
  message,
  errorMessage,
}: ConfirmationBoxProps) {
  return (
    <div className="flex flex-col lg:w-[37.5rem] lg:min-h-[49.25rem] justify-between items-center py-[2.5rem] px-[1.5625rem] lg:px-[6.5rem] bg-white rounded-[0.625rem] gap-[3.0625rem] w-full">
      {valid && (
        <>
          <div className="gap-[2rem] flex flex-col items-center w-full">
            {/* Back button and Progress bar */}
            <ProgressBar step={5} prevStep={() => undefined} />
            <h4 className="self-center text-base font-bold">
              Thank you for your donation!
            </h4>
            <div className="flex flex-col items-center gap-[1.5rem]">
              <div className="text-left text-base font-[500] leading-[140%] text-[#3c3c3c] gap-[1.5rem] flex flex-col">
                <p>{message}</p>
                <p>
                  Because of you, more girls will have access to the resources
                  they need to grow up strong, healthy, and confident.
                  You&apos;ve truly made a difference.
                </p>
              </div>
            </div>
          </div>
          <HyperLink
            href="/get-involved/donor"
            text="SEE HOW YOUR DONATION WILL BE USED"
            arrow={true}
            medium={true}
          />
        </>
      )}

      {errorMessage && (
        <p className={`${errorText} text-center`}>{errorMessage}</p>
      )}
    </div>
  );
}

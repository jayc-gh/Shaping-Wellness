import MainButton from '../buttons/mainButton';

type MainSectionProps = {
  heading: React.ReactNode;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  buttonVariant?: 'orange' | 'white';
  bgImageUrl?: string;
  minHeight?: string;
  contentMaxWidth?: string;
};

export default function MainSection({
  heading,
  description,
  buttonText,
  buttonHref,
  buttonVariant = 'white',
  bgImageUrl = '/images/DonationForm.webp',
  minHeight = 'lg:min-h-[500px]',
  contentMaxWidth = 'lg:max-w-[37.5rem]',
}: MainSectionProps) {
  return (
    <div
      className={`flex 
        flex-col justify-center items-center gap-[0.625rem] self-stretch
        py-[3.125rem] px-[1.5625rem]
        lg:flex-row
        ${minHeight}
        lg:py-[3.875rem]
        lg:px-[6.75rem]
        lg:gap-0
        lg:self-auto
        lg:justify-center lg:items-center
        between768and1224-px`}
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgImageUrl})`,
        backgroundSize: 'cover, cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top, center top',
      }}
    >
      <div
        className={`flex items-center justify-left w-full min-w-[21.25rem]
        lg:justify-start lg:max-w-[76.5rem]`}
      >
        <div
          className={`flex flex-col justify-center items-start gap-[2rem]
        ${contentMaxWidth}
        lg:items-start
        lg:gap-[1.5rem]`}
        >
          <h1 className="text-white font-bold text-[2rem] lg:text-[3rem]">
            {heading}
          </h1>
          <p className="text-white text-base lg:text-[1.125rem]">
            {description}
          </p>

          {buttonText && buttonHref && (
            <MainButton
              color={buttonVariant}
              text={buttonText}
              href={buttonHref}
              width="main"
            />
          )}
        </div>
      </div>
    </div>
  );
}

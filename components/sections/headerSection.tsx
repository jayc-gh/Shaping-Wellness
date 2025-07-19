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
  minHeight = 'md:min-h-[500px]',
  contentMaxWidth = 'md:max-w-[37.5rem]',
}: MainSectionProps) {
  return (
    <div
      className={`flex 
        flex-col justify-center items-center gap-[0.625rem] self-stretch
        py-[3.125rem] px-[1.5625rem]
        md:flex-row
        ${minHeight}
        md:py-[3.875rem]
        md:px-[6.75rem]
        md:gap-0
        md:self-auto
        md:justify-center md:items-center
        between768and1224-px`}
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgImageUrl})`,
        backgroundSize: 'cover, cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top, center top',
      }}
    >
      <div
        className={`flex items-center justify-center w-[21.25rem]
        md:justify-start md:w-[76.5rem]`}
      >
        <div
          className={`flex flex-col justify-center items-center gap-[2rem]
        ${contentMaxWidth}
        md:items-start
        md:gap-[1.5rem]`}
        >
          <h1 className="text-white text-[2rem] md:text-[3rem]">{heading}</h1>
          <p className="text-white text-base md:text-[1.125rem]">
            {description}
          </p>

          {buttonText && buttonHref && (
            <MainButton
              color={buttonVariant}
              text={buttonText}
              href={buttonHref}
              main={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}

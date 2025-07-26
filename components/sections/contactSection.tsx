import MainButton from '../buttons/mainButton';

type ContactSectionProps = {
  header: string;
  text: string;
  href: string;
  buttonLabel: string;
};

export default function ContactSection({
  header,
  text,
  href,
  buttonLabel,
}: ContactSectionProps) {
  return (
    <div
      className="flex px-[1.5625rem] py-[4.375rem] flex-col justify-center items-center lg:px-[6.75rem] lg:py-[2.5rem]"
      style={{
        background: 'linear-gradient(180deg, #ffece4 0%, #ffd1be 100%)',
      }}
    >
      <div className="flex flex-col justify-center items-center text-center gap-[2rem]">
        <h4 className="text-[#a04e43] !font-base !font-[700]">{header}</h4>
        <p className="text-[1.5rem] font-[600] text-[#49241e] leading-[140%]">
          {text}{' '}
        </p>
        <MainButton
          color="orange"
          link={{ href: href, label: buttonLabel }}
          width="main"
        />
      </div>
    </div>
  );
}

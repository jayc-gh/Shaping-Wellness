import MainButton from '../buttons/mainButton';

type ContactSectionProps = {
  header: string;
  text: string;
};

export default function ContactSection({ header, text }: ContactSectionProps) {
  return (
    <div
      className="flex px-[1.5625rem] py-[4.375rem] flex-col justify-center items-center lg:px-[6.75rem] lg:py-[2.5rem]"
      style={{
        background: 'linear-gradient(180deg, #ffece4 0%, #ffd1be 100%)',
      }}
    >
      <div className="flex flex-col justify-center items-center text-center gap-[2rem]">
        <h4 className="coral-3 !font-base !font-[700]">{header}</h4>
        <p className="text-[1.5rem] font-[600] text-[#49241e] leading-[140%]">
          {text}{' '}
        </p>
        <MainButton
          color="orange"
          text="Send a message"
          href="/contact-us"
          width="main"
        />
      </div>
    </div>
  );
}

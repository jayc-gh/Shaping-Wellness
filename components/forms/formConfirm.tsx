interface StepProps {
  formType: string;
}

export default function FormConfirm({ formType }: StepProps) {
  const contactHeader = 'We got your message!';
  const volunteerHeader = "We've received your application!";
  const partnerHeader = "We've received your inquiry!";
  const contactP1 =
    "Thank you for reaching out! We've received your message and will get back to you as soon as possible.";
  const volunteerP1 =
    'Thank you for applying to volunteer with Shaping Wellness Foundation.';
  const volunteerP2 =
    "We're grateful for your willingness to support our mission. Our team will review your application and reach out with next steps.";
  const partnerP1 =
    'Thank you for your interest in partnering with Shaping Wellness Foundation.';
  const partnerP2 =
    "We're excited to connect with you and explore how we can work together to support girls and promote lifelong wellness. Our team will follow up shortly to explore next steps and opportunities to collaborate.";

  const content = {
    header:
      formType === 'contact'
        ? contactHeader
        : formType === 'volunteer'
        ? volunteerHeader
        : formType === 'partner'
        ? partnerHeader
        : '',
    p1:
      formType === 'contact'
        ? contactP1
        : formType === 'volunteer'
        ? volunteerP1
        : formType === 'partner'
        ? partnerP1
        : '',
    p2:
      formType === 'volunteer'
        ? volunteerP2
        : formType === 'partner'
        ? partnerP2
        : '',
  };

  return (
    <div className="flex py-[0.625rem] flex-col justify-between items-center text-center gap-[1.5rem]">
      <h4 className="text-base font-bold">{content.header}</h4>
      <p className="text-base font-[500] leading-[140%] text-[#3c3c3c]">
        {content.p1}
      </p>
      {formType !== 'contact' && (
        <p className="text-base font-[500] leading-[140%] text-[#3c3c3c]">
          {content.p2}
        </p>
      )}
    </div>
  );
}

import PartnerForm from '@/components/forms/partnerForm';

export default function PartnerFormPage() {
  return (
    <main
      className="background"
      style={
        {
          '--bg-image': 'url("/images/DonationForm.webp")',
        } as React.CSSProperties
      }
    >
      <div className="main-container">
        <div className="content-container">
          <div className="summary-container">
            <div className="flag">
              <h4>PARTNER</h4>
            </div>
            <h3 className="background-color">Build brighter futures with us</h3>
            <p className="p4 background-color">
              Thank you for your interest in partnering with Shaping Wellness
              Foundation. <br /> <br />
              We&apos;re excited to work together to expand access to wellness
              education, fitness opportunities, and mentorship for girls in your
              school, organization, or community center. Your partnership helps
              us create safe, supportive spaces where girls can grow stronger -
              physically, mentally, and emotionally.
            </p>
          </div>
          <PartnerForm />
        </div>
      </div>
    </main>
  );
}

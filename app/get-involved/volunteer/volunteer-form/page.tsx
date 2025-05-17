'use client';
import VolunteerForm from '@/components/forms/volunterForm';

export default function VolunteerFormPage() {
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
              <h4>VOLUNTEER</h4>
            </div>
            <h3 className="background-color">
              Building futures through service
            </h3>
            <p className="p4 background-color">
              Thank you for your interest in volunteering with Shaping Wellness
              Foundation! <br /> <br />
              Your time and talents can make a meaningful impact in the lives of
              girls who need it most. Whether you&apos;re leading a workshop,
              mentoring a student, or helping run a program, your support helps
              build confidence, foster lifelong healthy habits, and create
              lasting change in our community.
            </p>
          </div>
          <VolunteerForm />
        </div>
      </div>
    </main>
  );
}

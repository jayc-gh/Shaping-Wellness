import Link from 'next/link';

export default function Summary() {
  return (
    <div className="summary-container">
      <div className="flag">
        <h4>DONATE</h4>
      </div>
      <h3 className="text-white">
        Thank you for choosing to support Shaping Wellness Foundation.
      </h3>
      <p className="p4 !text-white">
        Your donation directly funds school-based fitness programs, health
        education workshops, and mentorship opportunities for girls in
        underserved communities. Together, we can build a future where every
        girl has the tools, support, and confidence to lead a healthy, empowered
        life. <br />
        <br />
        Curious about the difference you&apos;re making? Visit our{' '}
        <Link href="/get-involved/donor" className="cursor-pointer">
          <span className="underline">Become a Donor page</span>
        </Link>{' '}
        to see how your support changes lives.
      </p>
    </div>
  );
}

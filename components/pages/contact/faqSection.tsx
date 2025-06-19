import FAQItem from './faqItem';
import Link from 'next/link';

export default function FAQSection() {
  return (
    <div className="faq-section">
      <h4 className="sec-coral">FREQUENTLY ASKED QUESTIONS (FAQs)</h4>
      <div className="faq-section-content-container">
        <div className="faq-column">
          <FAQItem
            question="You are a new nonprofit. How can I trust this will make an impact?"
            answer={
              <>
                While we don&apos;t have launched programs yet, we&apos;ve spent
                the past 6 months developing research-backed proposals, forming
                partnerships, and building our foundation transparently. You can
                view all our plans and budget breakdowns on our site.
              </>
            }
          />
          <FAQItem
            question="How can I get involved?"
            answer={
              <>
                You can volunteer, donate, or partner with us! Explore ways to
                support us in the{' '}
                <Link href="/#get-involved">
                  <span className="font-bold underline">Get Involved</span>
                </Link>{' '}
                section on our homepage.
              </>
            }
          />
          <FAQItem
            question="Are your programs free for schools or participants?"
            answer={
              <>
                Yes, our programs are offered at no cost to schools or
                participants. We&apos;re here to serve the community and ensure
                that access isn&apos;t a barrier. Visit our{' '}
                <Link href="/get-involved/partner">
                  <span className="font-bold underline">Partner</span>
                </Link>{' '}
                page to learn more.
              </>
            }
          />
          <FAQItem
            question="How can my organization request a speaker or workshop?"
            answer={
              <>
                You can reach out by filling out a{' '}
                <Link href="/get-involved/partner/partner-form">
                  <span className="font-bold underline">
                    Partnership Inquiry
                  </span>
                </Link>{' '}
                to tell us more about your needs. We&apos;ll follow up to learn
                more and explore how we can support your students or community.
              </>
            }
          />
        </div>
        <div className="faq-column">
          <FAQItem
            question="How can I donate?"
            answer={
              <>
                You can donate online through our{' '}
                <Link href="/donate">
                  <span className="font-bold underline">Donation Form</span>
                </Link>{' '}
                or mail a check to our PO Box. For more information on how your
                donation helps and the benefits of giving, visit our{' '}
                <Link href="/get-involved/donor">
                  <span className="font-bold underline">Donor</span>
                </Link>{' '}
                page.
              </>
            }
          />
          <FAQItem
            question="Where does my donation go?"
            answer={
              <>
                Your donation helps fund our programs, community outreach, and
                day-to-day operations. We&apos;re committed to using every
                contribution responsibly and transparently.
              </>
            }
          />
          <FAQItem
            question="Is my donation tax-deductible?"
            answer={
              <>
                Is this donation tax deductible? Yes. Shaping Wellness
                Foundation is a 501(c)3 tax-exempt organization and your
                donation is tax-deductible within the guidelines of U.S. law. To
                claim a donation as a deduction on your U.S. taxes, please keep
                your email donation receipt as your official record. We&apos;ll
                send it to you upon successful completion of your donation.
              </>
            }
          />
          <FAQItem
            question="How do I cancel my recurring donation?"
            answer={
              <>
                We&apos;re so grateful for your support. If you&apos;d like to
                stop your monthly donations, you can do so at any time by
                visiting our{' '}
                <Link href="/">
                  <span className="font-bold underline">
                    Cancel Recurring Donation page.
                  </span>
                </Link>{' '}
                You&apos;ll have the option to pause or adjust your gift if that
                works better for you, or to cancel it entirely. If you need
                help, feel free to{' '}
                <Link href="/contact-us#contact">
                  <span className="font-bold underline">contact us</span>
                </Link>{' '}
                and we&apos;ll be happy to assist.
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}

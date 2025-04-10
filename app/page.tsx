import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* big section with 1 column */}
      <section className="big-section !justify-start">
        <div className="flex flex-col items-start pl-60 w-222">
          <h1 className="space-y-5 mb-8">
            <span>Healthy Futures,</span>
            <br />
            <span>
              <span className="text-orange-400">Stronger</span> Communities
            </span>
          </h1>
          <h4 className="mb-5">
            Join us in creating opportunities for girls to grow stronger, more
            confident, and healthier. Partner today and be part of the change.
          </h4>
          <button className="border rounded-xl px-5 py-2 cursor-pointer">
            <h5 className="font-bold">Become a partner</h5>
          </button>
        </div>
      </section>

      {/* small section with just text */}
      <section className="sm-section">
        <div className="center-all flex-col w-220">
          <h6 className="mb-6">OUR MISSION</h6>
          <h4 className="text-center text-black">
            At Shaping Wellness, our mission is to cultivate a generation of
            resilient and confident young women equipped with the tools and
            knowledge to prioritize their health and well-being, ultimately
            building stronger, healthier communities.
          </h4>
        </div>
      </section>

      {/* big section no content */}
      <section className="big-section"></section>

      {/* small section with just text */}
      <section className="sm-section">
        <div className="center-all flex-col w-215">
          <h6 className="mb-6">PROGRAMS</h6>
          <h4 className="text-center text-black mb-6">
            We offer dynamic programs that promote physical activity, mental
            wellness, and self-care, equipping girls with the knowledge and
            support they need to lead healthy lives.
          </h4>
          <button className="border rounded-xl px-5 py-2 cursor-pointer">
            <h5 className="font-bold">Learn more</h5>
          </button>
        </div>
      </section>

      {/* big section 2 columns - text right side */}
      <section className="big-section">
        <div className="w-140 h-140 bg-gray-200 border-2 border-dashed border-gray-400 rounded-tl-[6rem] rounded-br-[6rem] flex items-center justify-center text-gray-500"></div>
        <div className="flex flex-col justify-start w-120 gap-4">
          <h6 className="text-black">FITNESS PROGRAMS</h6>
          <h3>Staying active and strong</h3>
          <h4 className="text-black">
            We provide accessible and engaging fitness opportunities that
            encourage movement, build strength, and promote overall well-being.
          </h4>
        </div>
      </section>

      {/* big section 2 columns - text right side */}
      <section className="big-section">
        <div className="flex flex-col justify-start w-120 gap-4">
          <h6 className="text-black">WORKSHOPS</h6>
          <h3>Inspiring healthy choices</h3>
          <h4 className="text-black">
            Our health education workshops equip girls with essential knowledge
            on nutrition, mental wellness, self-care, and overall well-being.
          </h4>
        </div>
        <div className="w-140 h-140 bg-gray-200 border-2 border-dashed border-gray-400 rounded-tl-[6rem] rounded-br-[6rem] flex items-center justify-center text-gray-500"></div>
      </section>

      {/* big section 2 columns - text left side */}
      <section className="big-section">
        <div className="w-140 h-140 bg-gray-200 border-2 border-dashed border-gray-400 rounded-tl-[6rem] rounded-br-[6rem] flex items-center justify-center text-gray-500"></div>
        <div className="flex flex-col justify-start w-120 gap-4">
          <h6 className="text-black">MENTORSHIPS</h6>
          <h3>Guiding girls to thrive</h3>
          <h4 className="text-black">
            Our mentorship program connects girls with positive female role
            models who provide guidance, support, and encouragement in their
            health and wellness journey.
          </h4>
        </div>
      </section>

      {/* big section no content */}
      <section className="big-section"></section>

      {/* big section 3 columns */}
      <section className="big-section !flex-col !bg-white">
        <h6 className="mb-5">GET INVOLVED</h6>
        <div className="center-all gap-10">
          <div className="group group-card">
            <div className="w-40 h-40 bg-gray-200 border-2 border-dashed border-gray-400 flex center-all text-gray-500"></div>
            <h3 className="group-hover:text-black">Partner</h3>
            <h4 className="text-center">
              Help bring fitness, wellness, and mentorship programs to your
              school.
            </h4>
          </div>
          <div className="group group-card">
            <div className="w-40 h-40 bg-gray-200 border-2 border-dashed border-gray-400 flex center-all text-gray-500"></div>
            <h3 className="group-hover:text-black">Donate</h3>
            <h4 className="text-center">
              Your support gives girls the tools to build confidence and
              lifelong well-being.
            </h4>
          </div>
          <div className="group group-card">
            <div className="w-40 h-40 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500"></div>
            <h3 className="group-hover:text-black">Volunteer</h3>
            <h4 className="text-center">
              From mentoring to leading workshops, there’s a role for everyone
              to make a difference.
            </h4>
          </div>
        </div>
      </section>

      {/* big section no content */}
      <section className="big-section"></section>

      {/* small section with just text */}
      <section className="sm-section">
        <div className="flex flex-col items-center justify-center w-180">
          <h6 className="mb-8">CONTACT US</h6>
          <h4 className="text-center text-black mb-8">
            Have questions or want to get involved? We're here to help!
          </h4>
          <button className="border rounded-xl px-5 py-2 cursor-pointer">
            <h5 className="font-bold">Send a message</h5>
          </button>
        </div>
      </section>
    </main>
  );
}

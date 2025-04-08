import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* big section with 1 column */}
      <section className="flex big-section-h items-center bg-amber-200">
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
          <button className="border rounded-xl py-3 px-5">
            <h4 className="font-bold">Become a partner</h4>
          </button>
        </div>
      </section>

      {/* small section with just text */}
      <section className="flex items-center justify-center sm-section-h">
        <div className="flex flex-col items-center justify-center w-180">
          <h4 className="mb-8">OUR MISSION</h4>
          <h4 className="text-center text-black">
            At Shaping Wellness, our mission is to cultivate a generation of
            resilient and confident young women equipped with the tools and
            knowledge to prioritize their health and well-being, ultimately
            building stronger, healthier communities.
          </h4>
        </div>
      </section>

      {/* big section no content */}
      <section className="flex big-section-h items-center bg-amber-200"></section>

      {/* small section with just text */}
      <section className="flex items-center justify-center sm-section-h">
        <div className="flex flex-col items-center justify-center w-180">
          <h4 className="mb-8">PROGRAMS</h4>
          <h4 className="text-center text-black mb-8">
            We offer dynamic programs that promote physical activity, mental
            wellness, and self-care, equipping girls with the knowledge and
            support they need to lead healthy lives.
          </h4>
          <button className="border rounded-xl px-5 py-3">
            <h4 className="font-bold">Learn more</h4>
          </button>
        </div>
      </section>
    </main>
  );
}

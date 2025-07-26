import React from 'react';

type SvgTooltipProps = {
  text: string | { title: string; bullets: string[] };
};

const SvgTooltipMobile: React.FC<SvgTooltipProps> = ({ text }) => {
  const isBulletBlock = typeof text === 'object' && 'title' in text;

  return (
    <div className={`inline-block min-w-[270px] relative`}>
      {/* Background SVG */}
      <svg
        viewBox="0 0 250 67"
        preserveAspectRatio="none"
        className="w-full h-full absolute"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.4749 59.0377C5.13759 59.0377 0.000168465 55.5598 0.000168465 51.2696V48.7897L0 42.9188L0.000168465 36.3607V7.76812C0.000168465 3.4779 5.13759 0 11.4749 0H238.525C244.863 0 250 3.47791 250 7.76812V51.2696C250 55.5598 244.863 59.0377 238.525 59.0377H232.537L224.3 67L215.571 59.0377L11.4749 59.0377Z"
          fill="#FFECE4"
        />
      </svg>

      {/* Text content */}
      <div className="flex relative pl-5 pr-3 pt-2 pb-4 text-[0.75rem] font-[400] text-[#2f2f2f] whitespace-pre-wrap text-start items-center">
        {isBulletBlock ? (
          <div>
            <p className="mb-[0.125rem]">{text.title}</p>
            <ul className="list-disc pl-4 space-y-[0.125rem]">
              {text.bullets.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>{text}</p>
        )}
      </div>
    </div>
  );
};

export default SvgTooltipMobile;

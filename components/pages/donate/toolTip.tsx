import React from 'react';

type SvgTooltipProps = {
  text: string | { title: string; bullets: string[] };
};

const SvgTooltip: React.FC<SvgTooltipProps> = ({ text }) => {
  const isBulletBlock = typeof text === 'object' && 'title' in text;

  return (
    <div className={`inline-block min-w-[270px] relative`}>
      {/* Background SVG */}
      <svg
        viewBox="0 0 229 56"
        preserveAspectRatio="none"
        className="w-full h-full absolute"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.3261 0C14.243 0 9.3116 4.47715 9.3116 10V13.1924L0.5 21.1924L9.3116 29.1924V46C9.3116 51.5229 14.243 56 20.3261 56H217.486C223.569 56 228.5 51.5228 228.5 46V10C228.5 4.47715 223.569 0 217.486 0H20.3261Z"
          fill="#FFECE4"
        />
      </svg>
      {/* positioning text content inside tooltip bubble */}
      <div className="flex relative pl-6 pr-3 py-3 text-[0.75rem] font-[400] text-[#2f2f2f] leading-[20px] whitespace-pre-wrap text-start items-center">
        {isBulletBlock ? (
          <div>
            <p className="mb-[0.125rem]">{text.title}</p>
            <ul className="list-disc pl-5 space-y-[0.125rem]">
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

export default SvgTooltip;

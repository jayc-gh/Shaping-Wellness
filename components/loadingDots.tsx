import React from 'react';

export default function LoadingDots() {
  return (
    <div className="flex items-center gap-[0.125rem] text-lg font-semibold">
      <span className="animate-bounce [animation-delay:0s]">•</span>
      <span className="animate-bounce [animation-delay:0.2s]">•</span>
      <span className="animate-bounce [animation-delay:0.4s]">•</span>
    </div>
  );
}

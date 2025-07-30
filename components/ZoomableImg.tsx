'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useStopScroll } from '@/lib/functions/useFunctions';

type ZoomableImageProps = {
  path: string;
};

export default function ZoomableImage({ path }: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  useStopScroll(isZoomed);

  return (
    <>
      {/* Clickable image container */}
      <div
        className="relative w-full max-w-[1440px] aspect-[2/1] mx-auto cursor-zoom-in"
        onClick={() => setIsZoomed(true)}
      >
        <Image
          src={path}
          alt="Zoomable"
          fill
          className="object-contain rounded-lg transition-transform duration-300"
          sizes="(max-width: 1024px) 100vw, 80vw"
        />
      </div>

      {/* Zoomed modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative w-[100vw] h-[80vh]">
            <Image
              src={path}
              alt="Zoomed"
              fill
              quality={100}
              className="object-contain rounded-lg shadow-xl transition-transform duration-300 scale-105"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </div>
        </div>
      )}
    </>
  );
}

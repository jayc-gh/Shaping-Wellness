import { useEffect, useState } from 'react';

export function useOutsideClick(
  ref: React.RefObject<HTMLDivElement | null>,
  onClickOutside: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, onClickOutside]);
}

export function useStopScroll(state: boolean) {
  useEffect(() => {
    if (!state) return;

    // Save scroll position
    const scrollY = window.scrollY;
    const body = document.body;

    // Lock scroll
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflowY = 'scroll';

    return () => {
      // Restore scroll
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.style.overflowY = '';

      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, [state]);
}

export function useIsMobile(breakpoint = 660): boolean {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

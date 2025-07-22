import { useOutsideClick } from '@/lib/functions/useFunctions';
import { useRef, useState } from 'react';
import WhiteArrow from '../../../app/icons/arrow-white.svg';
import Link from 'next/link';
import Facebook from '../../../app/icons/footer/fb-mobile-footer.svg';
import X from '../../../app/icons/footer/x-mobile-footer.svg';
import Linkedin from '../../../app/icons/footer/linkedin-mobile-footer.svg';

type Link = {
  key: string;
  label: string;
  href: string;
};

type FooterDropdownProps = {
  header: string;
  id: string;
  link1: Link;
  link2: Link;
  link3: Link;
};

const logos = [
  <Facebook key="facebook" />,
  <X key="x" />,
  <Linkedin key="linkedin" />,
];

export default function FooterDropdown({
  header,
  id,
  link1,
  link2,
  link3,
}: FooterDropdownProps) {
  const [isOpen, setIsOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const dropdownItems = [link1, link2, link3];

  useOutsideClick(dropdownRef, () => setIsOpen(null));

  return (
    <>
      <div
        id={id}
        className="relative flex items-center justify-between py-[0.75rem] w-full font-bold text-[0.875rem]"
        onClick={() => {
          setIsOpen(!isOpen ? id : null);
        }}
      >
        <p>{header}</p>
        <WhiteArrow
          className={`transform transition-transform duration-200 ease-in-out ${
            isOpen === id ? 'rotate-180' : null
          }`}
        />
        {!isOpen && (
          <div className="absolute bottom-0 left-[0rem] right-[0rem] h-[1px] opacity-[0.2] bg-[#ffece4] z-[999]"></div>
        )}
      </div>
      <div
        className={`flex flex-col w-full transition-all duration-300 ease-in-out overflow-hidden
                  ${
                    isOpen === id
                      ? 'max-h-[12rem] opacity-100 visible pointer-events-auto translate-y-0'
                      : 'max-h-0 opacity-0 invisible pointer-events-none -translate-y-2'
                  }`}
      >
        {dropdownItems.map((item, index) => (
          <div
            key={item.key}
            className="relative flex justify-center font-[500] bg-black/4 px-[1.25rem]"
          >
            <Link
              href={item.href}
              onClick={() => {
                setIsOpen(null);
              }}
              className="relative w-full flex items-center py-[0.75rem]"
            >
              {id === 'connect' ? (
                <div className="flex gap-[0.625rem]">
                  {logos[index]}
                  {item.label}
                </div>
              ) : (
                item.label
              )}
            </Link>
            {index !== dropdownItems.length - 1 && (
              <div className="absolute bottom-0 left-[1.25rem] right-[1.25rem] h-[1px] opacity-[0.1] bg-[#ffece4] z-[999]" />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

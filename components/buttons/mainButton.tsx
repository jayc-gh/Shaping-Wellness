import Link from 'next/link';
import clsx from 'clsx';

type MainButtonProps = {
  color: 'orange' | 'white';
  text: string;
  href: string;
  width: 'auto' | 'fill' | 'main' | 'responsive';
  onClick?: () => void;
};

export default function MainButton({
  color,
  text,
  href,
  width,
  onClick,
}: MainButtonProps) {
  const baseClasses =
    'flex h-[3.125rem] px-5 py-4 justify-center items-center gap-[0.625rem] rounded-[0.625rem] border text-sm font-medium';

  const orangeClasses = clsx(
    'border border-[#d9764e] text-white',
    'bg-gradient-to-b from-[#d9764e] to-[#dd6d5c]',
    'hover:border-transparent',
    'hover:bg-[linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1)),linear-gradient(to_bottom,#d9764e,#dd6d5c)]'
  );

  const whiteClasses = clsx(
    'border-white text-white bg-transparent hover:border-[#d9764e] hover:bg-gradient-to-b hover:from-[#d9764e] hover:to-[#dd6d5c]'
  );

  const className = clsx(
    baseClasses,
    color === 'orange' ? orangeClasses : whiteClasses,
    'cursor-pointer',
    { 'w-[21.25rem] lg:w-auto': width === 'main' },
    { 'w-full': width === 'fill' },
    { 'w-auto': width === 'auto' }
  );

  return (
    <Link href={href} className={className} onClick={onClick}>
      <span className="font-bold text-base">{text}</span>
    </Link>
  );
}

import Link from 'next/link';
import clsx from 'clsx';
import LoadingDots from '../loadingDots';

type LinkProps = {
  href: string;
  label: string;
};

type SubmitProps = {
  disabled: boolean;
  label: string;
  loading: boolean;
};

type MainButtonProps = {
  color: 'orange' | 'white';
  link?: LinkProps;
  width: 'auto' | 'fill' | 'main' | 'responsive';
  onClick?: () => void;
  submit?: SubmitProps;
};

export default function MainButton({
  color,
  link,
  width,
  onClick,
  submit,
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

  return link && !submit ? (
    <Link href={link.href} className={className} onClick={onClick}>
      <span className="font-bold text-base">{link.label}</span>
    </Link>
  ) : submit && !link ? (
    <button
      className={`${className} disabled:opacity-70 disabled:bg-[linear-gradient(0deg,_rgba(255,255,255,0.2)_0%,_rgba(255,255,255,0.2)_100%),linear-gradient(180deg,_#d9764e_0%,_#dd6d5c_100%)] disabled:cursor-not-allowed`}
      type="submit"
      disabled={submit.disabled}
    >
      <span className="text-base font-bold flex items-center justify-center w-full">
        {submit.loading === true ? 'Processing' : submit.label}
        {submit.loading === true && (
          <div className="translate-y-[0.5rem] translate-x-[0.375rem]">
            <LoadingDots />
          </div>
        )}
      </span>
    </button>
  ) : null;
}

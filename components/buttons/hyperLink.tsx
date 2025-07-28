import Link from 'next/link';
import RightArrow from '../../app/icons/right-arrow.svg';

type HyperLinkProps = {
  href: string;
  text: string;
  size: 'small' | 'medium' | 'large' | 'custom';
  arrow?: boolean;
  pdf?: boolean;
};

export default function HyperLink({
  href,
  text,
  size,
  arrow,
  pdf,
}: HyperLinkProps) {
  const textClasses = `${
    size === 'small'
      ? 'text-[0.8125rem] lg:text-[0.875rem]'
      : size === 'medium'
      ? 'text-[0.9375rem] lg:text-base'
      : size === 'large'
      ? 'text-base lg:text-[1.125rem]'
      : ''
  } text-[#b1574a] font-[700] pb-[2px] border-b-2 border-transparent group-hover:border-[#b1574a] transition duration-150 group-hover:scale-96 active:scale-96`;

  const containerClasses =
    'group inline-flex h-[3.125rem] py-[1rem] justify-center items-center gap-[0.5rem] cursor-pointer transition-transform duration-150 active:scale-96 lg:hover:scale-102 leading-none';

  const content = (
    <>
      <p className={textClasses}>{text}</p>
      {arrow && (
        <span className="pb-[0.3rem]">
          <RightArrow />
        </span>
      )}
    </>
  );

  return pdf ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={containerClasses}
    >
      {content}
    </a>
  ) : (
    <Link href={href} className={containerClasses}>
      {content}
    </Link>
  );
}

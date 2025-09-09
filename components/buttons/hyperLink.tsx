import Link from 'next/link';
import RightArrow from '../../app/icons/right-arrow.svg';

type HyperLinkProps = {
  href: string;
  text: string;
  size: string;
  arrow?: boolean;
  pdf?: boolean;
  ariaLabel?: string;
};

export default function HyperLink({
  href,
  text,
  size,
  arrow,
  pdf,
  ariaLabel,
}: HyperLinkProps) {
  const textClasses = `${size} text-[#b1574a] font-[600] pb-[2px] border-b-2 border-transparent group-hover:border-[#b1574a] transition duration-150 group-hover:scale-102 group-active:scale-102 group-active:border-[#b1574a]`;

  const containerClasses =
    'group inline-flex h-[3.125rem] py-[1rem] justify-center items-center gap-[0.5rem] cursor-pointer transition-transform duration-150 active:scale-102 lg:hover:scale-102 leading-none';

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
      aria-label={ariaLabel}
    >
      {content}
    </a>
  ) : (
    <Link href={href} className={containerClasses} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}

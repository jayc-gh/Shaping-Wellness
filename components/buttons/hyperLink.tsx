import Link from 'next/link';
import RightArrow from '../../app/icons/right-arrow.svg';

type HyperLinkProps = {
  href: string;
  text: string;
  small?: boolean;
  arrow?: boolean;
};

export default function HyperLink({
  href,
  text,
  small,
  arrow,
}: HyperLinkProps) {
  return (
    <Link
      href={href}
      className="group inline-flex h-[3.125rem] py-[1rem] justify-center items-center gap-[0.625rem] cursor-pointer transition-transform duration-150 active:scale-96 lg:hover:scale-102 leading-none"
    >
      <p
        className={`${
          small ? 'text-[0.875rem]' : 'text-base lg:text-[1.125rem]'
        } text-[#b1574a] font-semibold pb-[2px] border-b-2 border-transparent group-hover:border-[#b1574a] transition duration-150 group-hover:scale-96 active:scale-96`}
      >
        {text}
      </p>
      {arrow && (
        <span className="pb-[0.3rem]">
          <RightArrow />
        </span>
      )}
    </Link>
  );
}

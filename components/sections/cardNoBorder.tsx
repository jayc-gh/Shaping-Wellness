type CardNoBorderProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title?: string;
  content: string;
};

export default function CardNoBorder({
  Icon,
  title,
  content,
}: CardNoBorderProps) {
  return (
    <div
      className={`max-w-[25rem] flex-1 flex flex-col items-center pb-[3.125rem] ${
        title ? 'gap-[1.5rem]' : 'gap-[2rem]'
      }`}
    >
      <Icon />
      {title && (
        <h5 className="text-[#b1574a] !text-[1.25rem] !font-bold !leading-[140%] text-center">
          {title}
        </h5>
      )}
      <p className="text-base font-[500] leading-[160%] lg:text-[1.125rem] text-center">
        {content}
      </p>
    </div>
  );
}

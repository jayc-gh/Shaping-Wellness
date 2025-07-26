export default function Spinner() {
  return (
    <div className="flex min-h-[1.25rem] max-w-[1.25rem] w-full justify-center items-center">
      <div
        className="inline-block h-[1.125rem] w-[1.125rem] animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-[#2f2f2f]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}

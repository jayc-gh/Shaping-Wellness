export default function Spinner() {
  return (
    <div className="flex min-h-[20px] max-w-[20px] w-full justify-center items-center">
      <div
        className="inline-block h-[18px] w-[18px] animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:p-neutral"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}

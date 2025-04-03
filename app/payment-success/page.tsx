export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams: { amount: string };
}) {
  const { amount } = await searchParams;
  return (
    <main className="fixed h-full w-full flex items-center">
      <div className="fixed flex items-center justify-center h-5/6 w-1/2 right-0">
        <div className="fixed h-3/4 w-1/3 shadow-lg flex items-center bg-white text-black flex-col rounded-xl">
          {/* Progress bar */}
          <div className="absolute top-15 w-2/3 h-10 flex items-center justify-between">
            <div className="w-1/4"></div>
            <div className="relative flex-1 flex items-center justify-center">
              {/* Line */}
              <div className="absolute inset-0 top-1/2 transform -translate-y-1/2 bg-gray-400 h-px w-full"></div>

              {/* Dots */}
              {[1, 2, 3, 4].map((dot, index) => (
                <div
                  key={dot}
                  className={`w-4 h-4 rounded-full border flex items-center justify-center bg-gray-400 border-gray-400 absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2`}
                  style={{ left: `${(index / 3) * 100}%` }}
                >
                  {dot === 4 && (
                    <span className="text-white font-thin text-xs">✔</span>
                  )}
                </div>
              ))}
            </div>
            <div className="w-1/4"></div>
          </div>
        </div>
      </div>
    </main>
  );
}

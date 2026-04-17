export default function Loading() {
  return (
    <main className="flex-1 flex flex-col bg-slate-50 animate-pulse">
      {/* Header Skeleton */}
      <section className="bg-brand-dark pt-32 pb-20 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="h-14 w-64 bg-white/10 rounded-lg mb-6"></div>
          <div className="h-6 w-full max-w-2xl bg-white/5 rounded-full"></div>
        </div>
      </section>

      {/* Featured Post Skeleton */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 -mt-10 relative z-10 w-full mb-20">
        <div className="rounded-3xl shadow-xl bg-white flex flex-col lg:flex-row h-full overflow-hidden">
          <div className="w-full lg:w-3/5 h-80 lg:h-[400px] bg-gray-200"></div>
          <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
            <div className="h-4 w-24 bg-gray-200 rounded-full mb-6"></div>
            <div className="h-10 w-full bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-10 w-4/5 bg-gray-200 rounded-lg mb-8"></div>
            <div className="space-y-3 mb-8">
              <div className="h-4 w-full bg-gray-100 rounded-full"></div>
              <div className="h-4 w-full bg-gray-100 rounded-full"></div>
              <div className="h-4 w-3/4 bg-gray-100 rounded-full"></div>
            </div>
            <div className="flex justify-between mt-auto pt-6 border-t border-gray-100">
              <div className="h-4 w-24 bg-gray-100 rounded-full"></div>
              <div className="h-4 w-32 bg-gray-100 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Skeleton */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-24 w-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              <div className="h-56 bg-gray-200 w-full"></div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="h-6 w-full bg-gray-200 rounded-lg mb-3"></div>
                <div className="h-6 w-3/4 bg-gray-200 rounded-lg mb-6"></div>
                <div className="space-y-2 mb-6">
                  <div className="h-3 w-full bg-gray-100 rounded-full"></div>
                  <div className="h-3 w-full bg-gray-100 rounded-full"></div>
                </div>
                <div className="flex justify-between mt-auto pt-4 border-t border-gray-50">
                  <div className="h-4 w-20 bg-gray-100 rounded-full"></div>
                  <div className="h-4 w-16 bg-gray-100 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

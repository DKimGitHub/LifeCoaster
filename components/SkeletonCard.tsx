export const SkeletonCard = () => (
  <div className="mx-auto w-full rounded-md bg-white shadow-xl">
    <div className="p-2">
      <div className="h-52 animate-pulse bg-gray-100"></div>      
    </div>
    <div className="flex items-center justify-between p-2">
      <div className="flex flex-1">
        <div className="h-12 w-12 animate-pulse rounded-md bg-gray-100"></div>
        <div className="flex flex-col pl-2 gap-2">
          <div className="h-5 w-56 animate-pulse rounded bg-gray-100"></div>
          <div className="h-5 w-56 animate-pulse rounded bg-gray-100"></div>
        </div>
      </div>
      <div className="flex flex-none items-center">
      <div className="h-12 w-24 animate-pulse rounded bg-gray-100"></div>
        </div>
    </div>
  </div>
);

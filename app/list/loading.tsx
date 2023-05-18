import ListPageSorter from "../../components/listPage/ListPageSorter";
import { SkeletonCard } from "../../components/SkeletonCard";
import { SkeletonCardSmall } from "../../components/SkeletonCardSmall";

export default function Loading() {
  return (
    <>
      <div className="my-5 mt-8 flex w-full justify-center">
      <SkeletonCardSmall />
      </div>
      <div className="mb-10 grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-12">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </>
  );
}

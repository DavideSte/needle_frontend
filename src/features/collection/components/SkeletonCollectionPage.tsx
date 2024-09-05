import SkeletonItem from "@/components/custom/SkeletonItem";
import randomIntFromInterval from "@/core/utils/randomIntFromInterval";

export default function SkeletonCollectionPage() {
  return (
    <div className="m-4 flex flex-col gap-6 lg:mt-8">
      {/* Filters */}
      <div className="flex gap-2 h-10 items-center ">
        <SkeletonItem className="flex-1 rounded-full max-w-80" />
        <SkeletonItem className="w-9 h-9 rounded-full flex-shrink-0" />
        <SkeletonItem className="w-9 h-9 rounded-full flex-shrink-0" />
        <SkeletonItem className="w-9 h-9 rounded-full flex-shrink-0" />
      </div>
      {/* Artists & Albums */}
      <div className="flex flex-col gap-4">
        {[...Array(randomIntFromInterval(2, 5))].map((_, index) => {
          return (
            <div key={"artist-" + index}>
              <SkeletonItem className="h-6 w-40 mb-4" />
              <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
                {[...Array(randomIntFromInterval(2, 6))].map((_, index) => {
                  return <SkeletonItem key={"album-" + index} className="h-32" />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

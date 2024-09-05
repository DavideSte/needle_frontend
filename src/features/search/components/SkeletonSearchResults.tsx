import SkeletonItem from "@/components/custom/SkeletonItem";
import randomIntFromInterval from "@/core/utils/randomIntFromInterval";

export default function SkeletonSearchResults() {
  return (
    <div className="flex flex-col px-4">
      {/* Artists */}
      <div className="h-24 lg:h-[130px] lg:items-center flex gap-2 overflow-hidden">
        {[...Array(randomIntFromInterval(5, 8))].map((_, index) => {
          return (
            <div key={"artist-" + index} className="flex flex-col gap-1">
              <SkeletonItem className="h-[80px] w-[80px] rounded-full" />
              <SkeletonItem className="h-3 w-16 mx-2" />
            </div>
          );
        })}
      </div>
      {/* Albums */}
      <div className="flex flex-col">
        <div className="py-4 flex gap-2">
          <SkeletonItem className="w-40 h-[35px]" />
          <SkeletonItem className="w-40 h-[35px]" />
        </div>
        <div className="flex flex-col gap-4">
          {[...Array(randomIntFromInterval(3, 8))].map((_, index) => {
            return <SkeletonItem key={"album-" + index} className="h-32"></SkeletonItem>;
          })}
        </div>
      </div>
    </div>
  );
}

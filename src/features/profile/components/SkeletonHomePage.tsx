import SkeletonItem from "@/components/custom/SkeletonItem";

export default function SkeletonHomePage() {
  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      {[...Array(3)].map((_, index) => (
        <SkeletonItem key={index} className="h-[295px] lg:h-[375px]" />
      ))}
    </div>
  );
}

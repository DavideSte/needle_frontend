import { twMerge } from "tailwind-merge";

interface SkeletonItemProps extends React.HTMLAttributes<HTMLDivElement> {
  variants?: "light" | "medium" | "dark";
}

export default function SkeletonItem({
  variants = "medium",
  className,
  ...rest
}: SkeletonItemProps) {
  const baseClasses = "w-full h-full animate-pulse rounded-md";
  let classes = twMerge(baseClasses, className);

  if (variants === "light") {
    classes = twMerge(classes, "bg-darkred/30");
  } else if (variants === "medium") {
    classes = twMerge(classes, "bg-darkred/60");
  } else if (variants === "dark") {
    classes = twMerge(classes, "bg-darkred/90");
  }

  return (
    <div {...rest} className={classes}>
      {rest.children}
    </div>
  );
}

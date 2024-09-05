import { LoaderCircle } from "lucide-react";
import { Typography } from "../ui/typography";
import { twMerge } from "tailwind-merge";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
}

export default function Loader({ message, className, ...rest }: LoaderProps) {
  const baseClasses = "flex justify-center items-center mt-8";
  const classes = twMerge(baseClasses, className);
  return (
    <div className={classes} {...rest}>
      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      <Typography variant="small">{message || "Loading..."}</Typography>
    </div>
  );
}

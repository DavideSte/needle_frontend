import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const TextInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    const classes = twMerge(
      "bg-red-100/30 w-full rounded-full px-6 h-full outline-none border border-transparent text-cream placeholder-cream/80 focus:border-cream/20 text-sm",
      className
    );

    return <input ref={ref} className={classes} {...props} />;
  }
);

export default TextInput;

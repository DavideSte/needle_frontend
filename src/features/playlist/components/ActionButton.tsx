import { twMerge } from "tailwind-merge";

export default function ActionButton({
  children,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseClasses =
    "rounded-full p-4 text-cream fixed bottom-[4.25rem] right-4 bg-yellow-400 text-black shadow-md z-20";
  const classDisabled = rest.disabled ? "opacity-60" : "opacity-100";
  const classes = twMerge(baseClasses, className, classDisabled);
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

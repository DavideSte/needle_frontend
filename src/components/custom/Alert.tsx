import { twMerge } from "tailwind-merge";
import React from "react";
import { Ban, CircleAlert, CircleCheck } from "lucide-react";
import { Typography } from "../ui/typography";

interface AlertProps {
  className?: string;
  variant: keyof typeof alertVariants;
  children: React.ReactNode;
}

const alertVariants = {
  destructive: "bg-cream/30 border-cream text-cream",
  success: "bg-[#90EE90]/30 border-[#90EE90] !text-[#90EE90]",
  warning: "bg-[#FFFF00]/30 border-[#FFFF00] !text-[#FFFF00]",
};

export default function Alert({ className, variant = "success", children }: AlertProps) {
  const classnames = twMerge(
    alertVariants[variant],
    "flex p-2 px-4 rounded-md border gap-3 lg:max-w-96 lg:mx-auto",
    className
  );
  return (
    <div role="alert" className={classnames}>
      <div className="pt-2">
        {variant === "success" && <CircleCheck size={18} strokeWidth={2.25} />}
        {variant === "warning" && <CircleAlert size={18} strokeWidth={2.25} />}
        {variant === "destructive" && <Ban size={18} strokeWidth={2.25} />}
      </div>

      <div className="flex flex-col">{children}</div>
    </div>
  );
}

interface TitleProps {
  children: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return (
    <Typography variant="p" className="font-bold text-inherit">
      {children}
    </Typography>
  );
};

interface DescriptionProps {
  children: React.ReactNode;
}

const Description = ({ children }: DescriptionProps) => {
  return (
    <Typography variant="small" className="text-inherit">
      {children}
    </Typography>
  );
};

Alert.Title = Title;
Alert.Description = Description;

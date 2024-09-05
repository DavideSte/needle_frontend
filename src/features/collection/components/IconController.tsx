import { FiltersFormData } from "@/core/types/FiltersTypes";
import { LucideProps } from "lucide-react";
import { Control, Controller } from "react-hook-form";

interface IconControllerProps {
  name: "liked" | "owned";
  control: Control<FiltersFormData, unknown>;
  IconComponent: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export default function IconController({ name, control, IconComponent }: IconControllerProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <IconComponent
          className={`bg-darkred/80  p-2 rounded-full cursor-pointer text-cream ${
            field.value ? "opacity-100" : "opacity-50"
          }`}
          size={36}
          onClick={() => {
            field.onChange(!field.value);
          }}
          fill={field.value ? "currentColor" : "none"}
        />
      )}
    />
  );
}

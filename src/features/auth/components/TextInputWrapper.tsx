import { FieldErrors, FieldValues, UseFormRegister, ValidationRule } from "react-hook-form";
import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import styled from "styled-components";
import { LoginFormData } from "../types/authTypes";

interface TextInputWrapperProps<T extends FieldValues> {
  label: string;
  name: keyof T;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  required?: string | ValidationRule<boolean> | undefined;
  type?: React.HTMLInputTypeAttribute;
}

export default function TextInputWrapper({
  label,
  name,
  register,
  errors,
  type = "text",
  required = false,
}: TextInputWrapperProps<LoginFormData>) {
  const config = { required: required ? "*field is required." : false };
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="flex gap-2 ml-[3px]">
        <Typography variant="small">{label}</Typography>
        {errors[name] && (
          <Typography className="font-semibold text-destructive-foreground" variant="small">
            {errors[name].message}
          </Typography>
        )}
      </label>
      <StyledInput {...register(name, config)} type={type} />
    </div>
  );
}

const StyledInput = styled(Input).attrs({
  className:
    "outline-none bg-cream/25 text-cream border border border-transparent focus-visible:border-cream/25 focus-visible:ring-offset-0",
})``;

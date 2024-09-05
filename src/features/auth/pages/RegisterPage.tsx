import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Circle, CircleCheckBig, LoaderCircle } from "lucide-react";
import SignUpCard from "../components/SignUpCard";
import TextInputWrapper from "../components/TextInputWrapper";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../store/api/store";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Alert from "@/components/custom/Alert";
import { RegisterFormData } from "../types/authTypes";
import { isErrorWithMessage } from "../utils/helpers";

const defaultValues: RegisterFormData = {
  email: "",
  password: "",
};

export default function RegisterPage() {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({ defaultValues });

  const onSubmit = handleSubmit(async (data) => {
    setMessage("");
    setError("");
    console.log(data);

    if (hasNumber && hasValidChars && hasValidLength) {
      try {
        const { message } = await registerUser(data).unwrap();
        setMessage(message);
      } catch (error) {
        if (isErrorWithMessage(error)) {
          setError(error.data.message);
        } else {
          setError("An error occurred");
        }
      }
    }
  });

  const password = watch("password");
  const { hasNumber, hasValidChars, hasValidLength } = passwordCheck(password);

  return (
    <SignUpCard>
      {message && (
        <Alert variant="success">
          <Alert.Title>Registration successful.</Alert.Title>
          <Alert.Description>{message}</Alert.Description>
        </Alert>
      )}
      {error && (
        <Alert variant="destructive">
          <Alert.Title>Authentication failed</Alert.Title>
          <Alert.Description>{error}</Alert.Description>
        </Alert>
      )}
      <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-8">
        <TextInputWrapper
          required
          label="Email"
          name="email"
          register={register}
          errors={errors}
          type="email"
        />
        <TextInputWrapper
          required
          type="password"
          label="Password"
          name="password"
          register={register}
          errors={errors}
        />
        <div className="flex flex-col gap-2 px-3 pb-2 mt-[-4px]">
          <PasswordConstraints isValid={hasValidLength} text="at least 8 characters." />
          <PasswordConstraints isValid={hasValidChars} text="at least one special character." />
          <PasswordConstraints isValid={hasNumber} text="at least one number." />
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className="bg-primary hover:!bg-primary hover:!opacity-90"
        >
          {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          <Typography variant="small" className="!font-bold">
            Register
          </Typography>
        </Button>
      </form>
      <div className="mt-4 flex w-full justify-center">
        <Typography variant="small" className="flex whitespace-nowrap gap-2">
          Already have an account?
          <NavLink to="/login">
            <button
              type="button"
              className="text-[#BDC9F1] font-medium underline underline-offset-2"
            >
              Login
            </button>
          </NavLink>
        </Typography>
      </div>
    </SignUpCard>
  );
}

const PasswordConstraints = ({ isValid, text }: { isValid: boolean; text: string }) => {
  return (
    <div
      className={`flex flex-row items-center text-cream gap-2 ${
        isValid ? "opacity-100" : "opacity-70"
      }`}
    >
      <div className="flex-shrink-0">
        {isValid ? (
          <CircleCheckBig size={14} strokeWidth={3} stroke="currentColor" />
        ) : (
          <Circle size={14} strokeWidth={3} stroke="currentColor" />
        )}
      </div>
      <Typography className="flex-1" variant="small">
        {text}
      </Typography>
    </div>
  );
};

function passwordCheck(password: string) {
  const hasNumber = /\d/.test(password);
  const hasValidChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasValidLength = password.length >= 8;
  return { hasNumber, hasValidChars, hasValidLength };
}

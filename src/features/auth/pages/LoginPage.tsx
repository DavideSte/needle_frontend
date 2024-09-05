import { useForm } from "react-hook-form";
import TextInputWrapper from "../components/TextInputWrapper";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "../store/api/store";
import { LoaderCircle } from "lucide-react";
import SignUpCard from "../components/SignUpCard";
import { Typography } from "@/components/ui/typography";
import { NavLink } from "react-router-dom";
import { LoginFormData } from "../types/authTypes";
import { useState } from "react";
import { isErrorWithMessage } from "../utils/helpers";
import Alert from "@/components/custom/Alert";

const defaultValues: LoginFormData = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ defaultValues });

  const onSubmit = handleSubmit(async (data) => {
    setError("");
    try {
      await login(data).unwrap();
    } catch (error) {
      if (isErrorWithMessage(error)) {
        setError(error.data.message);
      } else {
        setError("An error occurred");
      }
    }
  });

  return (
    <SignUpCard>
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
        <Button
          disabled={isLoading}
          type="submit"
          className="mt-2 bg-primary hover:!bg-primary hover:!opacity-90"
        >
          {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          <Typography variant="small" className="!font-bold">
            Login
          </Typography>
        </Button>
      </form>
      <div className="mt-4 sm:mt-2 flex w-full justify-center">
        <Typography variant="small" className="flex whitespace-nowrap gap-2">
          Don't have an account?
          <NavLink to="/register">
            <button
              type="button"
              className="text-blue-300 font-medium underline underline-offset-2"
            >
              Registrati
            </button>
          </NavLink>
        </Typography>
      </div>
    </SignUpCard>
  );
}

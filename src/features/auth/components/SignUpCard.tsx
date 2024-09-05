import Logo from "@/components/custom/Logo";
import styled from "styled-components";
import GoogleLoginButton from "./GoogleLoginButton";
import { Typography } from "@/components/ui/typography";

export default function SignUpCard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WrapperDiv>
        <div className="w-full flex justify-center item">
          <div className="w-56 mr-2 mt-12">
            <Logo />
          </div>
        </div>
        <div className="mt-12 m-8">{children}</div>
        <div className="flex items-center justify-center mt-12 mb-4">
          <span className="border-b border-cream/40 w-full mx-4"></span>
          <Typography variant="small">or</Typography>
          <span className="border-b border-cream/40 w-full mx-4"></span>
        </div>
        <GoogleLoginButton />
      </WrapperDiv>
      <div className="fixed top-0 left-0 w-full h-[100dvh] bg-blue-200 z-[-1] hidden lg:block">
        <div className="w-full h-full bg-black  opacity-40 absolute top-0 left-0"></div>

        <img
          className="object-cover min-h-full"
          src="https://images.unsplash.com/photo-1582730147924-d92f4da00252?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
    </>
  );
}

const WrapperDiv = styled.div.attrs({
  className:
    "mx-auto p-4 min-h-[100dvh] sm:w-[400px] h-fit bg-gradient sm:mt-16 sm:rounded-md sm:min-h-[unset] lg:pb-16 lg:w-96 lg:rounded-lg",
})``;

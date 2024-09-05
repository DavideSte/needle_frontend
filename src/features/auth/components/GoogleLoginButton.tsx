import { useState } from "react";
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useGoogleLoginMutation } from "../store/api/store";
import Loader from "@/components/custom/Loader";
import { env } from "@/config/env";

export default function GoogleLoginButton() {
  const [runGoogleLogin, { isLoading }] = useGoogleLoginMutation();
  const [googleError, setGoogleError] = useState("");

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential as string;
    runGoogleLogin({ token });
  };

  const handleLoginError = () => {
    setGoogleError("Google Login failed.");
  };

  if (isLoading) {
    return <Loader message="Logging in" />;
  }

  return (
    <GoogleOAuthProvider clientId={env.GOOGLE_CLIENT_ID}>
      <div className="flex w-full justify-center">
        <div className="w-[200px]">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            text="signin_with"
            logo_alignment="left"
            width="200"
          />
        </div>
      </div>
      {googleError && <>{googleError}</>}
    </GoogleOAuthProvider>
  );
}

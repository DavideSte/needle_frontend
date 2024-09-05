/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthSelector } from "../store/slice/authSelector";
import { useVerifyTokenMutation } from "../store/api/store";
import Loader from "@/components/custom/Loader";

interface AuthRedirectProps {
  children: React.ReactNode;
}

export default function AuthRedirect({ children }: AuthRedirectProps) {
  const navigate = useNavigate();
  const { isLogged, hasLoggedOut } = useAuthSelector();
  const [verifyToken, { isLoading }] = useVerifyTokenMutation();
  const hasCheckedRef = useRef(false);

  // verify if user already logged in
  useEffect(() => {
    // if user arrive from logout dont check token
    if (hasLoggedOut) return;
    if (!isLogged && !hasCheckedRef.current) {
      hasCheckedRef.current = true; // Prevent duplicate calls
      verifyToken();
    }
  }, []);

  useEffect(() => {
    if (isLogged) {
      navigate("/"); // Redirect to home if already logged in
    }
  }, [isLogged]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLogged) {
    return <>{children}</>;
  }

  return null; // Redirecting or loading, so no children should be displayed
}

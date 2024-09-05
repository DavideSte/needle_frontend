import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useVerifyRegistrationTokenMutation } from "../store/api/store";
import Loader from "@/components/custom/Loader";
import Alert from "@/components/custom/Alert";
import { useAuthSelector } from "../store/slice/authSelector";
import { isErrorWithMessage } from "../utils/helpers";

export default function VerifyPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [runUserVerification, { isUninitialized, isLoading }] =
    useVerifyRegistrationTokenMutation();
  const hasCheckedRef = useRef(false);
  const navigate = useNavigate();
  const { isLogged } = useAuthSelector();
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLogged) {
      navigate("/"); // Redirect to home if already logged in
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  useEffect(() => {
    const performVerification = async (token: string) => {
      setError("");
      hasCheckedRef.current = true;
      try {
        await runUserVerification({ token }).unwrap();
      } catch (error) {
        if (isErrorWithMessage(error)) {
          setError(error.data.message);
        }
      }
    };
    if (!hasCheckedRef.current && token) {
      performVerification(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!token) {
    return <div>no token provided</div>;
  }

  if (isUninitialized || isLoading) {
    return <Loader message="We're verifying your account. Please wait a moment." />;
  }
  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <Alert.Title>Verification failed</Alert.Title>
        <Alert.Description>
          {error}. Try again{" "}
          <NavLink to="/login" className="underline">
            login
          </NavLink>
          .
        </Alert.Description>
      </Alert>
    );
  }

  return <div className="">...</div>;
}

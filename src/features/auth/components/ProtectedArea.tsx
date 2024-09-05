import { Outlet, useNavigate } from "react-router-dom";
import { useVerifyTokenMutation } from "../store/api/store";
import { useAuthSelector } from "../store/slice/authSelector";
import { useEffect, useRef } from "react";
import Header from "@/components/custom/Header";
import Loader from "@/components/custom/Loader";
import styled from "styled-components";

export default function ProtectedArea() {
  const [verifyToken, { isLoading, isError }] = useVerifyTokenMutation();
  const { isLogged, status } = useAuthSelector();
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    if (!isLogged && !hasCheckedRef.current) {
      console.log("ProtectedArea.tsx: verifyToken()");
      verifyToken();
      hasCheckedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  if (isLoading || status === "loading") {
    return <Loader message="Checking if user is logged..." />;
  }

  if (isError) {
    navigate("/login");
    return null;
  }

  return (
    <>
      <Header />
      <PageWrapper>{isLogged && <Outlet />}</PageWrapper>
    </>
  );
}

const PageWrapper = styled.div.attrs({
  className:
    "mb-20 lg:mb-10 mx-auto sm:px-8 sm:max-w-screen-sm lg:max-w-screen-lg lg:px-16 xl:max-w-screen-xl",
})``;

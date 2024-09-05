import { useRef, useEffect } from "react";
import { useLogoutMutation } from "../store/api/store";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/custom/Loader";

export default function LogoutPage() {
  const [logout, { isError }] = useLogoutMutation();
  const hasCheckedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      hasCheckedRef.current = true;
      await logout();
      navigate("/login");
    };

    if (!hasCheckedRef.current) {
      performLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isError) {
    return <div>Error...</div>;
  }

  return <Loader message="Logging out" />;
}

import { Outlet } from "react-router-dom";
import { useRefreshSpotifyTokenMutation, useVerifySpotifyTokenMutation } from "../store/api/store";
import { useEffect, useRef } from "react";
import Loader from "@/components/custom/Loader";
import SpotifyLoginButton from "./SpotifyLoginButton";
import { useSpotifyAuthSelector } from "../store/slice/spotifyAuthSelector";

export default function SpotifyAuthCheck() {
  const hasChecked = useRef(false);
  const { isLogged } = useSpotifyAuthSelector();
  const [runCheckSpotifyLogged, { isLoading, isUninitialized }] = useVerifySpotifyTokenMutation();
  const [refreshSpotifyToken, { isLoading: isLoadingRefresh, isError }] =
    useRefreshSpotifyTokenMutation();

  // check if the user has already logged in with Spotify
  useEffect(() => {
    const performCheck = async () => {
      hasChecked.current = true;
      try {
        await runCheckSpotifyLogged().unwrap();
      } catch (error) {
        console.error("Initial verification failed, attempting to refresh token:", error);
        try {
          // Attempt to refresh the Spotify token
          await refreshSpotifyToken().unwrap();
        } catch (refreshErr) {
          console.error("Error during refresh or retry:", refreshErr);
        }
      }
    };
    if (hasChecked.current) return;
    performCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isUninitialized || isLoading || isLoadingRefresh) {
    return <Loader message="Checkin if already checked in with Spotify..." />;
  }

  // means that refresh token failed
  if (isError) {
    return <SpotifyLoginButton />;
  }

  return isLogged ? <Outlet /> : null;
}

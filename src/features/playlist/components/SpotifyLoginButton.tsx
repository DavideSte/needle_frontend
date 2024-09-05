import Loader from "@/components/custom/Loader";
import { Typography } from "@/components/ui/typography";
import { env } from "@/config/env";
import { useVerifyTokenMutation } from "@/features/auth/store/api/store";
import { FaSpotify } from "react-icons/fa";

export default function SpotifyLoginButton() {
  const [verifyAccessToken, { isLoading, isError }] = useVerifyTokenMutation();
  const spotifyUri = env.NEEDLE_API_URL + "/api/auth/spotify";

  const handleClick = async () => {
    const response = await verifyAccessToken();
    if (response.data) {
      // redirect to href
      window.location.href = spotifyUri;
    }
  };

  if (isLoading) {
    return <Loader message="checking if user is logged..." />;
  } else if (isError) {
    return <div>user is not logged, try refreshing the page</div>;
  }

  return (
    <div
      className="mx-auto my-8 cursor-pointer flex gap-2 w-fit bg-yellow-400 text-darkred  rounded-full px-4 py-3 items-center"
      onClick={handleClick}
    >
      <FaSpotify className="text-2xl" />
      <Typography variant="small" className="text-darkred">
        Accedi a Spotify
      </Typography>
    </div>
  );
}

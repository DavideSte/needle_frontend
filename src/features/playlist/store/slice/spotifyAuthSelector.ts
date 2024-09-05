import { RootState, useAppSelector } from "@/store/store";

export const useSpotifyAuthSelector = () => {
  return useAppSelector(({ spotifyAuth }: RootState) => spotifyAuth);
};

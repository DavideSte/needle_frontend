import { needleApi } from "@/store/api/needleApi";
import { SavePlaylistArgs, SavePlaylistResponse } from "../../types/createPlaylistTypes";

const needleApiPlaylist = needleApi.injectEndpoints({
  endpoints: (builder) => ({
    savePlaylist: builder.mutation<SavePlaylistResponse, SavePlaylistArgs>({
      query: (body) => ({
        url: `/playlist/create2`,
        method: "POST",
        body: body,
      }),
    }),
    refreshSpotifyToken: builder.mutation<unknown, void>({
      query: () => ({
        url: `/auth/spotify/refresh-token`,
        method: "POST",
      }),
    }),
    verifySpotifyToken: builder.mutation<unknown, void>({
      query: () => ({
        url: `/auth/spotify/verify-token`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSavePlaylistMutation,
  useVerifySpotifyTokenMutation,
  useRefreshSpotifyTokenMutation,
} = needleApiPlaylist;
export const { verifySpotifyToken, refreshSpotifyToken } = needleApiPlaylist.endpoints;

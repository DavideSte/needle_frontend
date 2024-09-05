import { needleApi } from "@/store/api/needleApi";
import {
  addLikedAlbumId,
  addOwedAlbumId,
  removeLikedAlbumId,
  removeOwnedAlbumId,
  setLikedAlbumsId,
  setOwnedAlbumsId,
} from "../slice/userSlice";
import { AlbumsTracksResponse, UserAlbumsResponse } from "@/store/api/needleApi/types";

const needleApiCore = needleApi.injectEndpoints({
  endpoints: (builder) => ({
    addFavourite: builder.mutation<boolean, string>({
      query: (albumId) => ({
        url: `/albums/${albumId}/favourite`,
        method: "POST",
        responseHandler: async (response) => response.ok,
      }),
      onQueryStarted: async (arg, api) => {
        const { dispatch, queryFulfilled } = api;
        dispatch(addLikedAlbumId(arg));
        try {
          const response = await queryFulfilled;
          if (!response.data) {
            throw new Error("Error adding album to favourites");
          }
        } catch (error) {
          console.error(error);
          dispatch(removeLikedAlbumId(arg));
        }
      },
    }),
    removeFavourite: builder.mutation<boolean, string>({
      query: (albumId) => ({
        url: `/albums/${albumId}/favourite`,
        method: "DELETE",
        responseHandler: async (response) => response.ok,
      }),
      onQueryStarted: async (arg, api) => {
        const { dispatch, queryFulfilled } = api;
        dispatch(removeLikedAlbumId(arg));
        try {
          const response = await queryFulfilled;
          if (!response.data) {
            throw new Error("Error removing album from favourites");
          }
        } catch (error) {
          console.error(error);
          dispatch(addLikedAlbumId(arg));
        }
      },
    }),
    addAlbum: builder.mutation<boolean, string>({
      query: (albumId) => ({
        url: `/albums/${albumId}/collection`,
        method: "POST",
        responseHandler: async (response) => response.ok,
      }),
      onQueryStarted: async (arg, api) => {
        const { dispatch, queryFulfilled } = api;
        dispatch(addOwedAlbumId(arg));
        dispatch(addLikedAlbumId(arg));
        try {
          const response = await queryFulfilled;
          if (!response.data) {
            throw new Error("Error adding album to collection");
          }
        } catch (error) {
          console.error(error);
          dispatch(removeOwnedAlbumId(arg));
          dispatch(removeLikedAlbumId(arg));
        }
      },
    }),
    removeAlbum: builder.mutation<boolean, string>({
      query: (albumId) => ({
        url: `/albums/${albumId}/collection`,
        method: "DELETE",
        responseHandler: async (response) => response.ok,
      }),
      onQueryStarted: async (arg, api) => {
        const { dispatch, queryFulfilled } = api;
        dispatch(removeOwnedAlbumId(arg));
        try {
          const response = await queryFulfilled;
          if (!response.data) {
            throw new Error("Error removing album from collection");
          }
        } catch (error) {
          console.error(error);
          dispatch(addOwedAlbumId(arg));
        }
      },
    }),
    getAllAlbums: builder.query<UserAlbumsResponse, void>({
      query: () => `/albums/usersAlbums`,
      forceRefetch: () => true,
      // update the liked and owned albums, so i'm sync with the server
      onQueryStarted: async (_arg, api) => {
        const { dispatch, queryFulfilled } = api;
        const { data } = await queryFulfilled;
        dispatch(setLikedAlbumsId(data.likedAlbums));
        dispatch(setOwnedAlbumsId(data.ownedAlbums));
      },
    }),
    getAlbumsTracks: builder.query<AlbumsTracksResponse, string[]>({
      query: (albumsId) => `/albums/tracks?ids=${albumsId.join(",")}`,
    }),
  }),
});

export const {
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
  useGetAllAlbumsQuery,
  useLazyGetAllAlbumsQuery,
  useLazyGetAlbumsTracksQuery,
} = needleApiCore;

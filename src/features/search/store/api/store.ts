import { needleApi } from "@/store/api/needleApi";
import {
  AlbumByArtistResponseWithLastPage,
  getAlbumsByArtistArgs,
  SearchArgs,
  SearchResponseWithLastPage,
} from "../../types";
import {
  mergeGetAlbumsByArtistDataResponse,
  mergeSearchResponse,
  transformGetAlbumsByArtistResponse,
  transformSearchResponse,
} from "../../utils/apiUtils";
import { setLikedAlbumsId, setOwnedAlbumsId } from "@/core/store/slice/userSlice";

export const PAGE_LIMIT = 5;

const needleApiSearch = needleApi.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query<SearchResponseWithLastPage, SearchArgs>({
      query: ({ query, page }) => `/albums/search?q=${query}&page=${page}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      transformResponse: transformSearchResponse,
      merge: mergeSearchResponse,
      // after the search update the liked and owned albums, so i'm sync with the server
      onQueryStarted: async (_arg, api) => {
        const { dispatch, queryFulfilled } = api;
        const { data } = await queryFulfilled;
        dispatch(setLikedAlbumsId(data.likedAlbums));
        dispatch(setOwnedAlbumsId(data.ownedAlbums));
      },
    }),
    getAlbumsByArtist: builder.query<AlbumByArtistResponseWithLastPage, getAlbumsByArtistArgs>({
      query: ({ artistId, page }) => `/artists/${artistId}/albums?&page=${page}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      transformResponse: transformGetAlbumsByArtistResponse,
      merge: mergeGetAlbumsByArtistDataResponse,
    }),
  }),
});

export const { useLazySearchQuery, useLazyGetAlbumsByArtistQuery } = needleApiSearch;

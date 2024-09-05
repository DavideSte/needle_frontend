import { PAGE_LIMIT } from "../store/api/store";
import {
  AlbumByArtistResponseWithLastPage,
  getAlbumsByArtistArgs,
  SearchArgs,
  SearchResponse,
  SearchResponseWithLastPage,
} from "../types";

// #region search enpoints util functions
const transformSearchResponse = (baseQueryReturnValue: SearchResponse) => {
  // if the number of results(artists, tracks, and albums) is less than the page limit, it's the last page
  const lastPage = [
    baseQueryReturnValue.albums,
    baseQueryReturnValue.tracks,
    baseQueryReturnValue.artists,
  ].every((results) => results.length < PAGE_LIMIT);
  return {
    ...baseQueryReturnValue,
    lastPage: lastPage,
  };
};

const mergeSearchResponse = (
  currentCacheData: SearchResponseWithLastPage,
  responseData: SearchResponseWithLastPage,
  { arg }: { arg: SearchArgs }
) => {
  if (arg.page === 1) {
    return responseData;
  }
  return {
    albums: [...currentCacheData.albums, ...responseData.albums],
    tracks: [...currentCacheData.tracks, ...responseData.tracks],
    artists: [...currentCacheData.artists, ...responseData.artists],
    likedAlbums: [...currentCacheData.likedAlbums, ...responseData.likedAlbums],
    ownedAlbums: [...currentCacheData.ownedAlbums, ...responseData.ownedAlbums],
    lastPage: responseData.lastPage,
  };
};
// #endregion

// #region getAlbumsByArtist enpoints util functions
const transformGetAlbumsByArtistResponse = (
  baseQueryReturnValue: AlbumByArtistResponseWithLastPage
) => {
  const lastPage = baseQueryReturnValue.albums.length < PAGE_LIMIT;
  return {
    ...baseQueryReturnValue,
    lastPage: lastPage,
  };
};

const mergeGetAlbumsByArtistDataResponse = (
  currentCacheData: AlbumByArtistResponseWithLastPage,
  responseData: AlbumByArtistResponseWithLastPage,
  { arg }: { arg: getAlbumsByArtistArgs }
) => {
  if (arg.page === 1) {
    return responseData;
  }
  return {
    albums: [...currentCacheData.albums, ...responseData.albums],
    likedAlbums: [...currentCacheData.likedAlbums, ...responseData.likedAlbums],
    ownedAlbums: [...currentCacheData.ownedAlbums, ...responseData.ownedAlbums],
    lastPage: responseData.lastPage,
  };
};
// #endregion

export {
  transformSearchResponse,
  mergeSearchResponse,
  transformGetAlbumsByArtistResponse,
  mergeGetAlbumsByArtistDataResponse,
};

import { AlbumByArtistResponse } from "@/store/api/needleApi/types";

export interface AlbumData {
  id: string;
  name: string;
  release_date: string;
  total_tracks: number;
  artists: SimplifiedArtistData[];
  image: string;
}

export interface SimplifiedTrackData {
  id: string;
  track_number: number;
  disc_number: number;
  duration_ms: number;
  name: string;
  artists: SimplifiedArtistData[];
}

export interface SimplifiedArtistData {
  id: string;
  name: string;
}

export interface NeedleLikeOwnResponse {
  likedAlbums: string[];
  ownedAlbums: string[];
}

export interface SearchResponse extends NeedleLikeOwnResponse {
  albums: AlbumData[];
  tracks: TrackData[];
  artists: ArtistData[];
  lastPage: boolean;
}

export interface TrackData extends SimplifiedTrackData {
  album: Omit<AlbumData, "artists">;
}

export interface ArtistData {
  id: string;
  name: string;
  image: string;
  popularity: number;
}

export interface SearchResponseWithLastPage extends SearchResponse {
  lastPage: boolean;
}

export interface SearchArgs {
  query: string;
  page: number;
}

export interface getAlbumsByArtistArgs {
  artistId: string;
  page: number;
}

export interface AlbumByArtistResponseWithLastPage extends AlbumByArtistResponse {
  lastPage: boolean;
}

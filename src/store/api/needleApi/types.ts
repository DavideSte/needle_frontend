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

export interface TrackData extends SimplifiedTrackData {
  album: Omit<AlbumData, "artists">;
}

export interface ArtistData {
  id: string;
  name: string;
  image: string;
  popularity: number;
}

export interface SimplifiedArtistData {
  id: string;
  name: string;
}

export interface VinylApiLikeOwnResponse {
  likedAlbums: string[];
  ownedAlbums: string[];
}

export interface SearchResponse extends VinylApiLikeOwnResponse {
  albums: AlbumData[];
  tracks: TrackData[];
  artists: ArtistData[];
  lastPage: boolean;
}

export interface AlbumByArtistResponse extends VinylApiLikeOwnResponse {
  albums: AlbumData[];
  lastPage: boolean;
}

export interface UserAlbumsResponse extends VinylApiLikeOwnResponse {
  albums: AlbumData[];
}

export type AlbumsTracksResponse = Record<string, SimplifiedTrackData[]>;

export type AlbumInfo = AlbumData & {
  year: number;
  isLiked: boolean;
  isOwned: boolean;
};

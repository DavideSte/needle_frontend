export interface LocationState {
  selectedIds?: string[];
}

export interface SavePlaylistArgs {
  albumIds: string[];
  excludedTrackIds?: string[];
}

export interface SavePlaylistResponse {
  message: string;
  playlistId: string;
}

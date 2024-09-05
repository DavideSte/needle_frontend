import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string | null;
  likedAlbumsId: string[];
  ownedAlbumsId: string[];
}

const initialState: UserState = {
  email: null,
  likedAlbumsId: [],
  ownedAlbumsId: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<UserState["email"]>) => {
      state.email = action.payload;
    },
    setLikedAlbumsId: (state, action) => {
      state.likedAlbumsId = action.payload;
    },
    setOwnedAlbumsId: (state, action) => {
      state.ownedAlbumsId = action.payload;
    },
    addLikedAlbumId: (state, action) => {
      const albumId = action.payload;
      if (!state.likedAlbumsId.includes(albumId)) {
        state.likedAlbumsId.push(albumId);
      }
    },
    removeLikedAlbumId: (state, action) => {
      const albumId = action.payload;
      state.likedAlbumsId = state.likedAlbumsId.filter((id) => id !== albumId);
    },
    addOwedAlbumId: (state, action) => {
      const albumId = action.payload;
      if (!state.ownedAlbumsId.includes(albumId)) {
        state.ownedAlbumsId.push(albumId);
      }
    },
    removeOwnedAlbumId: (state, action) => {
      const albumId = action.payload;
      state.ownedAlbumsId = state.ownedAlbumsId.filter((id) => id !== albumId);
    },
  },
});

export const {
  setEmail,
  setLikedAlbumsId,
  setOwnedAlbumsId,
  addLikedAlbumId,
  addOwedAlbumId,
  removeLikedAlbumId,
  removeOwnedAlbumId,
} = userSlice.actions;

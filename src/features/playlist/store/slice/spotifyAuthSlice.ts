import { createSlice } from "@reduxjs/toolkit";
import { refreshSpotifyToken, verifySpotifyToken } from "../api/store";

interface SpotifyAuthState {
  isLogged: boolean;
}

const inistalState: SpotifyAuthState = {
  isLogged: false,
};

export const spotifyAuthSlice = createSlice({
  name: "spotifyAuth",
  initialState: inistalState,
  reducers: {
    spotifyLoginSuccess: (state) => {
      state.isLogged = true;
    },
    spotifyLoginFailed: (state) => {
      state.isLogged = false;
    },
  },
  extraReducers(builder) {
    // access token verification
    builder.addMatcher(verifySpotifyToken.matchFulfilled, (state) => {
      spotifyAuthSlice.caseReducers.spotifyLoginSuccess(state);
    });
    builder.addMatcher(verifySpotifyToken.matchRejected, (state) => {
      spotifyAuthSlice.caseReducers.spotifyLoginFailed(state);
    });
    // refresh token
    builder.addMatcher(refreshSpotifyToken.matchFulfilled, (state) => {
      spotifyAuthSlice.caseReducers.spotifyLoginSuccess(state);
    });
    builder.addMatcher(refreshSpotifyToken.matchRejected, (state) => {
      spotifyAuthSlice.caseReducers.spotifyLoginFailed(state);
    });
  },
});

export const { spotifyLoginSuccess, spotifyLoginFailed } = spotifyAuthSlice.actions;

import { combineReducers, PayloadAction } from "@reduxjs/toolkit";
import { needleApi } from "./api/needleApi";
import { searchSlice } from "@/features/search/store/slice/searchSlice";
import { authSlice } from "@/features/auth/store/slice/authSlice";
import { userSlice } from "@/core/store/slice/userSlice";
import { spotifyAuthSlice } from "@/features/playlist/store/slice/spotifyAuthSlice";

const combinedReducers = combineReducers({
  user: userSlice.reducer,
  auth: authSlice.reducer,
  search: searchSlice.reducer,
  spotifyAuth: spotifyAuthSlice.reducer,
  [needleApi.reducerPath]: needleApi.reducer,
});

export const rootReducer = (
  state: ReturnType<typeof combinedReducers> | undefined,
  action: PayloadAction
) => {
  return combinedReducers(state, action);
};

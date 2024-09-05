import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  query: string;
  page: number;
  selectedArtistId: string | null;
}

const initialState: SearchState = {
  query: "",
  page: 1,
  selectedArtistId: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<SearchState>) => {
      state.query = action.payload.query || "";
      state.page = action.payload.page || 1;
      state.selectedArtistId = action.payload.selectedArtistId || null;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSelectedArtistId: (state, action: PayloadAction<string | null>) => {
      state.selectedArtistId = action.payload;
    },
  },
});

export const { setQuery, setPage, setSelectedArtistId, setSearch } = searchSlice.actions;

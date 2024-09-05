import { createContext } from "react";

interface TrackSelectionContextType {
  excludedTracks: string[];
  setExcludedTracks: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TrackSelectionContext = createContext<TrackSelectionContextType | undefined>(
  undefined
);

import { Typography } from "@/components/ui/typography";
import { AlbumsTracksResponse } from "@/store/api/needleApi/types";
import { useContext } from "react";
import { TrackSelectionContext } from "../context/TrackSelectionContext";
import { Square, SquareCheck } from "lucide-react";

interface TrackListProps {
  tracks: AlbumsTracksResponse;
}

export default function TrackList({ tracks }: TrackListProps) {
  const context = useContext(TrackSelectionContext);

  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }

  const { excludedTracks, setExcludedTracks } = context;

  if (tracks === undefined) {
    return <div>No tracks to show</div>;
  }

  const toggleExcluded = (id: string) => {
    if (excludedTracks.includes(id)) {
      setExcludedTracks(excludedTracks.filter((trackId) => trackId !== id));
    } else {
      setExcludedTracks([...excludedTracks, id]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(tracks).map(([key, value]) => {
        return (
          <div key={key}>
            <div className="px-4 flex flex-col">
              {value.map(({ track_number, name, duration_ms, id }) => {
                const isExcluded = excludedTracks.includes(id);
                const time = convertMillisecondsToMinutesAndSeconds(duration_ms);
                return (
                  <div
                    key={id}
                    onClick={() => toggleExcluded(id)}
                    className={`px-2  flex gap-2 items-center border-b border-cream/20 py-2 cursor-pointer rounded-sm hover:bg-white/20 ${
                      isExcluded ? "opacity-50" : "opacity-100"
                    }`}
                  >
                    <Typography variant="small">{track_number}.</Typography>
                    <Typography variant="small" className="flex-1 truncate">
                      {name}
                    </Typography>
                    <Typography variant="small">{time}'</Typography>
                    <div className="flex items-center ml-2 text-cream">
                      {isExcluded ? (
                        <Square size={18} />
                      ) : (
                        <SquareCheck stroke="currentColor" size={18} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function convertMillisecondsToMinutesAndSeconds(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const paddedSeconds = seconds.toString().padStart(2, "0");
  return `${minutes.toString()}:${paddedSeconds}`;
}

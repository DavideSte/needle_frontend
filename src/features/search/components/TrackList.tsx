import { TrackData } from "@/store/api/needleApi/types";
import TrackListItem from "./TrackListItem";
import { useUserSelector } from "@/core/store/slice/userSelector";

interface TrackListProps {
  tracks: TrackData[] | undefined;
}

export default function TrackList({ tracks }: TrackListProps) {
  const { likedAlbumsId, ownedAlbumsId } = useUserSelector();

  if (tracks === undefined) {
    return <div>No tracks to show</div>;
  }

  return (
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
      {tracks.map((track) => (
        <TrackListItem
          key={track.id}
          track={track}
          isLiked={likedAlbumsId.includes(track.album.id)}
          isOwned={ownedAlbumsId.includes(track.album.id)}
        />
      ))}
    </div>
  );
}

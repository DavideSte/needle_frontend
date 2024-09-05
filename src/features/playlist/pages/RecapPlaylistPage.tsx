import { useLocation, useNavigate } from "react-router-dom";
import { LocationState } from "../types/createPlaylistTypes";
import { AlbumStored } from "../hooks/use-load-user-albums";
import AlbumCollapsibleItem from "../components/AlbumCollapsibleItem";
import { Save, Undo2 } from "lucide-react";
import { useEffect, useState } from "react";
import { TrackSelectionContext } from "../context/TrackSelectionContext";
import ActionButton from "../components/ActionButton";
import { useSavePlaylistMutation } from "../store/api/store";

export default function RecapPlaylistPage() {
  const location = useLocation();
  const { selectedIds }: LocationState = location.state || {};
  // get the stored albums from the local storage
  const storedAlbums = localStorage.getItem("storedAlbums");
  const albums: AlbumStored = JSON.parse(storedAlbums || "{}");
  const navigate = useNavigate();
  const [excludedTracks, setExcludedTracks] = useState<string[]>([]);
  const [runSavePlaylist, { data, isLoading, isSuccess }] = useSavePlaylistMutation();

  useEffect(() => {
    if (isSuccess && data) {
      navigate("/playlist/" + data.playlistId);
    }
  }, [isSuccess, data, navigate]);

  if (!selectedIds) {
    return <div>No selected albums</div>;
  }

  const selectedAlbums = selectedIds.map((id) => {
    return albums[id];
  });

  const goBack = () => {
    navigate(-1);
  };

  const savePlaylist = () => {
    runSavePlaylist({ albumIds: selectedIds, excludedTrackIds: excludedTracks });
  };

  if (isLoading) {
    return <div>Saving Playlist</div>;
  }

  return (
    <TrackSelectionContext.Provider value={{ excludedTracks, setExcludedTracks }}>
      <div className="pb-14 lg:pb-0">
        <button onClick={goBack} className="bg-cream/80 py-2 px-4 rounded-full m-4 shadow-md">
          <Undo2 size={18} strokeWidth={2.5} stroke="black" className="" />
        </button>
        <div className="flex flex-col gap-4 px-4">
          {selectedAlbums.map((album) => (
            <AlbumCollapsibleItem key={album.id} album={album} />
          ))}
        </div>
      </div>
      <ActionButton onClick={savePlaylist}>
        <Save size={20} strokeWidth={2.2} />
      </ActionButton>
    </TrackSelectionContext.Provider>
  );
}

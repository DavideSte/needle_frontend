import Alert from "@/components/custom/Alert";
import { Typography } from "@/components/ui/typography";
import AlbumFilters from "@/core/components/AlbumFilters";
import { useUserSelector } from "@/core/store/slice/userSelector";
import { FiltersFormData } from "@/core/types/FiltersTypes";
import { filterAlbums } from "@/core/utils/filterAlbums";
import { useForm } from "react-hook-form";
import AlbumCheckboxItem from "../components/AlbumCheckboxItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../components/ActionButton";
import { ChevronRight } from "lucide-react";
import { LocationState } from "../types/createPlaylistTypes";
import useLoadUserAlbums from "../hooks/use-load-user-albums";
import SkeletonPlaylistPage from "../components/SkeletonPlaylistPage";

const defaultValues: FiltersFormData = {
  query: "",
  liked: true,
  owned: true,
};

export default function CreatePlaylistPage() {
  const { data, isFetching, isSuccess, isError } = useLoadUserAlbums();
  const { likedAlbumsId, ownedAlbumsId } = useUserSelector();
  const form = useForm<FiltersFormData>({ defaultValues });
  const { query, liked, owned } = form.watch();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const navigate = useNavigate();

  const nextPage = () => {
    const state: LocationState = { selectedIds };
    navigate("./recap", { state });
  };

  if (isFetching) {
    return <SkeletonPlaylistPage />;
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="m-4">
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>Error loading search.</Alert.Description>
      </Alert>
    );
  }
  if (!isSuccess || !data) {
    return (
      <Alert variant="warning" className="m-4">
        <Alert.Title>Something went wrong.</Alert.Title>
        <Alert.Description>Please try again later.</Alert.Description>
      </Alert>
    );
  }

  const { albums } = data;
  const albumsFiltered = filterAlbums(albums, likedAlbumsId, ownedAlbumsId, query, liked, owned);

  return (
    <div className="pb-14 lg:pb-0">
      <AlbumFilters form={form} />
      <div className="flex flex-col gap-4 mt-2 lg:mt-4">
        {Object.keys(albumsFiltered).length === 0 && (
          <Typography className="m-4" variant="small">
            No albums found.
          </Typography>
        )}
        {Object.entries(albumsFiltered).map(([key, value]) => {
          return (
            <div key={key} className="mb-2">
              <Typography
                variant="h2"
                className="pb-2 sticky top-[70px] bg-gradient z-10 px-4 lg:top-[139px]"
              >
                {key}
              </Typography>
              <div className="flex flex-col gap-4 px-4 lg:grid lg:grid-cols-2">
                {value.map((album) => (
                  <AlbumCheckboxItem
                    key={album.id}
                    album={album}
                    isLiked={likedAlbumsId.includes(album.id)}
                    isOwned={ownedAlbumsId.includes(album.id)}
                    isSelected={selectedIds.includes(album.id)}
                    setSelected={setSelectedIds}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <ActionButton onClick={nextPage} disabled={selectedIds.length === 0}>
        <ChevronRight size={20} strokeWidth={3} />
        {selectedIds.length > 0 && (
          <span className="absolute top-0 right-0 bg-darkred rounded-full text-cream flex items-center justify-center  w-5 h-5 text-xs">
            {selectedIds.length}
          </span>
        )}
      </ActionButton>
    </div>
  );
}

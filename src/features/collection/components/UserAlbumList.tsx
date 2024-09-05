import { AlbumData } from "@/store/api/needleApi/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Typography } from "@/components/ui/typography";
import AlbumFilters from "@/core/components/AlbumFilters";
import AlbumList from "@/core/components/AlbumList";
import { useUserSelector } from "@/core/store/slice/userSelector";
import { FiltersFormData } from "@/core/types/FiltersTypes";
import { filterAlbums } from "@/core/utils/filterAlbums";

interface UserAlbumListProps {
  albums: AlbumData[];
}

const defaultValues: FiltersFormData = {
  query: "",
  liked: true,
  owned: true,
};

export default function UserAlbumList({ albums }: UserAlbumListProps) {
  const { likedAlbumsId, ownedAlbumsId } = useUserSelector();
  const form = useForm<FiltersFormData>({ defaultValues });
  const { query, liked, owned } = form.watch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const albumsFiltered = filterAlbums(albums, likedAlbumsId, ownedAlbumsId, query, liked, owned);

  return (
    <>
      <AlbumFilters form={form} />
      <div className="flex flex-col gap-4 mt-2 lg:mt-4">
        {Object.keys(albumsFiltered).length === 0 && (
          <Typography className="m-4" variant="small">
            No albums found.
          </Typography>
        )}
        {Object.entries(albumsFiltered).map(([key, value]) => {
          return (
            <div key={key}>
              <Typography
                variant="h2"
                className="pb-2 sticky top-[70px] bg-gradient z-10 px-4 lg:top-[139px]"
              >
                {key}
              </Typography>

              <div className="px-4">
                <AlbumList albums={value} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

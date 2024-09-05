import { Typography } from "@/components/ui/typography";
import { setSelectedArtistId } from "../store/slice/searchSlice";
import { useAppDispatch } from "@/store/store";
import { Disc3, Undo2 } from "lucide-react";
import { useLazyGetAlbumsByArtistQuery } from "../store/api/store";
import { useEffect, useRef, useState } from "react";
import AlbumList from "../../../core/components/AlbumList";
import Alert from "@/components/custom/Alert";
import useElementObserver from "@/hooks/use-element-observer";
import Loader from "@/components/custom/Loader";

interface ArtistAlbumProps {
  artistId: string;
}

export default function ArtistAlbum({ artistId }: ArtistAlbumProps) {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [searchAlbumByArtist, { data, isFetching, isSuccess, isError }] =
    useLazyGetAlbumsByArtistQuery();
  const divRef = useRef<HTMLDivElement>(null);
  const { isNearScreen } = useElementObserver(divRef);

  useEffect(() => {
    if (isNearScreen) {
      setPage(page + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNearScreen]);

  useEffect(() => {
    setPage(1);
    searchAlbumByArtist({ artistId, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artistId]);

  useEffect(() => {
    if (page === 1) return;
    searchAlbumByArtist({ artistId, page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const resetSelectedArtist = () => {
    dispatch(setSelectedArtistId(null));
  };

  if (isFetching && page === 1) {
    return <Loader message="Loading..." />;
  }
  if (isError) {
    return (
      <Alert variant="destructive" className="m-4">
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>Error loading search.</Alert.Description>
      </Alert>
    );
  }
  if (!isSuccess) {
    return (
      <Alert variant="warning" className="m-4">
        <Alert.Title>Something went wrong.</Alert.Title>
        <Alert.Description>Please try again later.</Alert.Description>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex truncate gap-3 items-center mx-4 mt-4 mb-4 ">
        <div
          onClick={resetSelectedArtist}
          className="cursor-pointer bg-cream/80 py-1 px-2 rounded-full shadow-md"
        >
          <Undo2 size={16} strokeWidth={3} stroke="black" />
        </div>
        <Typography variant="h2" className="truncate">
          {data.albums[0].artists[0].name}
        </Typography>
      </div>
      <div className="px-4">
        <AlbumList albums={data?.albums} extraKey="artists-" />
        {!data.lastPage && isSuccess && (
          <div ref={divRef} className="flex justify-center w-full my-6">
            <Disc3 size={30} className="animate-spin z-50" />
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { useLazySearchQuery } from "../store/api/store";
import AlbumList from "../../../core/components/AlbumList";
import ArtistList from "./ArtistList";
import TrackList from "./TrackList";
import { useSearchSelector } from "../store/slice/searchSelector";
import ArtistAlbum from "./ArtistAlbum";
import LabelSelection from "./LabelSelection";
import { Disc3 } from "lucide-react";
import useElementObserver from "@/hooks/use-element-observer";
import { useAppDispatch } from "@/store/store";
import { setPage } from "../store/slice/searchSlice";
import Alert from "@/components/custom/Alert";
import { Typography } from "@/components/ui/typography";
import SkeletonSearchResults from "./SkeletonSearchResults";

export default function SearchResults() {
  const [runSearchQuery, { data, isFetching, isSuccess, isError, isUninitialized }] =
    useLazySearchQuery();
  const { query, page, selectedArtistId } = useSearchSelector();
  const [showAlbum, setShowAlbum] = useState(true);
  const divRef = useRef<HTMLDivElement>(null);
  const { isNearScreen } = useElementObserver(divRef);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isNearScreen) {
      dispatch(setPage(page + 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNearScreen]);

  useEffect(() => {
    if (!query || query.length === 0) return;
    runSearchQuery({ query, page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  if (isUninitialized) {
    return (
      <Typography className="m-4" variant="small">
        Search for an artist, album or track...
      </Typography>
    );
  }

  if (isFetching && page === 1) {
    return <SkeletonSearchResults />;
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
    <>
      <ArtistList artists={data?.artists} />
      {selectedArtistId ? (
        <ArtistAlbum artistId={selectedArtistId} />
      ) : (
        <>
          <div className="flex gap-2 mx-4 mt-4 mb-4">
            <LabelSelection onClick={() => setShowAlbum(true)} isSelected={showAlbum}>
              Albums
            </LabelSelection>
            <LabelSelection onClick={() => setShowAlbum(false)} isSelected={!showAlbum}>
              Tracks
            </LabelSelection>
          </div>
          <div className="px-4">
            {showAlbum ? <AlbumList albums={data?.albums} /> : <TrackList tracks={data?.tracks} />}
          </div>
          {!data.lastPage && isSuccess && (
            <div ref={divRef} className="flex justify-center w-full my-6">
              <Disc3 size={30} className="animate-spin z-50" />
            </div>
          )}
        </>
      )}
    </>
  );
}

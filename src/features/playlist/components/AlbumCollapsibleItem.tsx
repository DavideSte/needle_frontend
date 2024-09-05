import { Typography } from "@/components/ui/typography";
import { AlbumData } from "@/store/api/needleApi/types";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import TrackList from "./TrackList";
import { useLazyGetAlbumsTracksQuery } from "@/core/store/api/store";
import Loader from "@/components/custom/Loader";
import Alert from "@/components/custom/Alert";

interface AlbumCollapsibleItemProps {
  album: AlbumData;
}

export default function AlbumCollapsibleItem({ album }: AlbumCollapsibleItemProps) {
  const { artists, name, image, release_date, id } = album;
  const [isOpen, setIsOpen] = useState(false);
  const [searchTracks, { data, isError, isFetching, isSuccess, isUninitialized }] =
    useLazyGetAlbumsTracksQuery();

  useEffect(() => {
    // if data already featched
    if (!isUninitialized) return;
    if (!isOpen) return;
    searchTracks([id]);
  }, [id, isOpen, isUninitialized, searchTracks]);

  const albumArtists = artists
    .map(({ name }) => {
      return name;
    })
    .join(", ");

  let year;
  const splittedDate = release_date.split("-");
  if (splittedDate.length > 0) {
    year = `${splittedDate[0]}`;
  } else {
    year = "unknown";
  }

  let renderedTracks;
  if (isFetching) {
    renderedTracks = <Loader message="Loading Tracks..." className="mt-1" />;
  } else if (isError) {
    renderedTracks = (
      <Alert variant="destructive" className="mx-4">
        <Alert.Title>Error </Alert.Title>
        <Alert.Description>Error Fetching tracks</Alert.Description>
      </Alert>
    );
  } else if (isSuccess) {
    renderedTracks = <TrackList tracks={data}></TrackList>;
  }

  return (
    <div className="flex flex-col">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-20 w-full truncate flex-shrink-0 bg-darkred rounded-md shadow-md opacity-100 cursor-pointer`}
      >
        {image ? (
          <LazyLoadImage
            className="h-full aspect-square object-cover "
            effect="blur"
            src={image}
            alt={name}
          />
        ) : (
          <div className="w-full aspect-square object-cover bg-darkred rounded-full flex items-center justify-center">
            <Typography variant="h4">{name[0]}</Typography>
          </div>
        )}
        <div className="flex-1 p-3 truncate text-cream flex flex-col justify-end z-10">
          <div>
            <Typography variant="p" className="truncate font-bold">
              {name}
            </Typography>
            <Typography variant="small" className="truncate leading-5">
              {albumArtists} &bull; {year}
            </Typography>
          </div>
        </div>
        <div className="flex items-center p-4">{isOpen ? <ChevronDown /> : <ChevronLeft />}</div>
      </div>
      {isOpen && (
        <div className="bg-darkred mt-[-2rem] pt-12 pb-4 rounded-md">{renderedTracks}</div>
      )}
    </div>
  );
}

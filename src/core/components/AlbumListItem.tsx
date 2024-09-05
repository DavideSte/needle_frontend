import { Typography } from "@/components/ui/typography";
import { AlbumData } from "@/store/api/needleApi/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LikeIcon from "./LikeIcon";
import OwnedIcon from "./OwnedIcon";

interface AlbumListItemProps {
  album: AlbumData;
  isLiked: boolean;
  isOwned: boolean;
}

export default function AlbumListItem({ album, isLiked, isOwned }: AlbumListItemProps) {
  const { artists, name, image, release_date, total_tracks, id } = album;
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

  return (
    <div className="flex w-full truncate flex-shrink-0 bg-darkred rounded-md shadow-md">
      {image ? (
        <LazyLoadImage
          className="w-32 aspect-square object-cover "
          effect="blur"
          src={image}
          alt={name}
        />
      ) : (
        <div className="w-full aspect-square object-cover bg-darkred  rounded-full flex items-center justify-center">
          <Typography variant="h4">{name[0]}</Typography>
        </div>
      )}

      <div className="flex-1 p-3 truncate text-cream flex flex-col justify-between">
        <div className="flex gap-2 justify-end">
          <LikeIcon isLiked={isLiked} id={id} />
          <OwnedIcon isOwned={isOwned} id={id} />
        </div>
        <div>
          <Typography variant={"p"} className="truncate font-bold">
            {name}
          </Typography>
          <Typography variant={"small"} className="truncate leading-5">
            {albumArtists} &bull; {year}
          </Typography>
          <Typography variant={"small"} className="truncate leading-5">
            {total_tracks} tracks
          </Typography>
        </div>
      </div>
    </div>
  );
}

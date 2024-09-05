import { Typography } from "@/components/ui/typography";
import { TrackData } from "@/store/api/needleApi/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LikeIcon from "../../../core/components/LikeIcon";
import OwnedIcon from "../../../core/components/OwnedIcon";

interface TrackListItemProps {
  track: TrackData;
  isLiked: boolean;
  isOwned: boolean;
}

export default function TrackListItem({ track, isLiked, isOwned }: TrackListItemProps) {
  const {
    artists,
    name,
    album: { image, release_date, name: albumName, id },
  } = track;
  const trackArtists = artists.map(({ name }) => {
    return name;
  });

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
          <LikeIcon id={id} isLiked={isLiked} />
          <OwnedIcon id={id} isOwned={isOwned} />
        </div>
        <div>
          <Typography variant="p" className="truncate font-bold">
            {name}
          </Typography>
          <Typography variant="small" className="truncate leading-5">
            {trackArtists} &bull; {year}
          </Typography>
          <Typography variant="small" className="truncate leading-5">
            from &quot;{albumName}&quot;
          </Typography>
        </div>
      </div>
    </div>
  );
}

import { Typography } from "@/components/ui/typography";
import useIsDesktop from "@/hooks/use-is-desktop";
import { AlbumInfo } from "@/store/api/needleApi/types";
import { Bookmark, Heart, Square, SquareCheck } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface AlbumCheckboxItemProps {
  album: AlbumInfo;
  isLiked: boolean;
  isOwned: boolean;
  isSelected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function AlbumCheckboxItem({
  album,
  isLiked,
  isOwned,
  isSelected,
  setSelected,
}: AlbumCheckboxItemProps) {
  const isDesktop = useIsDesktop();
  const { artists, name, image, release_date, id } = album;
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

  const toggleSelected = () => {
    if (isSelected) {
      setSelected((prev) => prev.filter((item) => item !== id));
    } else {
      setSelected((prev) => [...prev, id]);
    }
  };

  return (
    <div
      onClick={toggleSelected}
      className={`flex h-20 w-full cursor-pointer truncate flex-shrink-0 bg-darkred rounded-md shadow-md lg:h-24 ${
        isSelected ? "opacity-100" : "opacity-60"
      }`}
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

      <div className="flex-1 p-3 truncate text-cream flex flex-col justify-end">
        <div>
          <div className="flex items-center gap-2 justify-between">
            <Typography variant={isDesktop ? "h4" : "p"} className="truncate font-bold">
              {name}
            </Typography>
            <div className="flex gap-1 justify-end text-cream">
              <Heart fill={isLiked ? "currentColor" : "none"} size={17} strokeWidth={1.5} />
              <Bookmark fill={isOwned ? "currentColor" : "none"} size={17} strokeWidth={1.5} />
            </div>
          </div>
          <Typography variant="small" className="truncate leading-5">
            {albumArtists} &bull; {year}
          </Typography>
        </div>
      </div>
      <div className="flex items-center p-3 bg-orange-500 text-cream">
        {isSelected ? (
          <SquareCheck size={20} stroke="currentColor" strokeWidth={2.5} />
        ) : (
          <Square size={20} stroke="currentColor" strokeWidth={2.5} />
        )}
      </div>
    </div>
  );
}

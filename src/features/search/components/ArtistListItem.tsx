import { LazyLoadImage } from "react-lazy-load-image-component";
import { ArtistData } from "../types";
import { Typography } from "@/components/ui/typography";
import { useAppDispatch } from "@/store/store";
import { setSelectedArtistId } from "../store/slice/searchSlice";
import { X } from "lucide-react";

interface ArtistListItemProps {
  artist: ArtistData;
  isSelected: boolean;
}

export default function ArtistListItem({ artist, isSelected }: ArtistListItemProps) {
  const { id, name, image } = artist;
  const dispatch = useAppDispatch();

  const toggleArtist = () => {
    if (isSelected) {
      dispatch(setSelectedArtistId(null));
    } else {
      dispatch(setSelectedArtistId(id));
    }
  };

  return (
    <div
      onClick={toggleArtist}
      className="flex flex-col flex-shrink-0 relative h-auto w-20 cursor-pointer"
    >
      {isSelected && (
        <div className="absolute right-0 top-0 z-10 rounded-full text-cream">
          <X
            className="cursor-pointer bg-darkred rounded-full p-1"
            size={22}
            color="currentColor"
            fill="red"
            strokeWidth={3}
          />
        </div>
      )}
      {image ? (
        <LazyLoadImage
          className="aspect-square object-cover bg-darkred p-1 rounded-full shrink-0 w-20 h-20"
          effect="blur"
          src={image}
          alt={name}
          width="80px"
          height="80px"
        />
      ) : (
        <div className="w-20 h-20 aspect-square object-cover bg-darkred  rounded-full flex items-center justify-center">
          <Typography variant="h4">{name[0]}</Typography>
        </div>
      )}
      <Typography variant="small" className="truncate px-2 mt-1">
        {name}
      </Typography>
    </div>
  );
}

import { Bookmark } from "lucide-react";
import { useAddAlbumMutation, useRemoveAlbumMutation } from "../store/api/store";

interface OwnedIconProps {
  isOwned: boolean;
  id: string;
}

export default function OwnedIcon({ isOwned, id }: OwnedIconProps) {
  const [addOwned] = useAddAlbumMutation();
  const [removeOwned] = useRemoveAlbumMutation();

  const toggleOwned = () => {
    if (isOwned) {
      removeOwned(id);
    } else {
      addOwned(id);
    }
  };

  return (
    <Bookmark
      className="cursor-pointer text-cream"
      onClick={toggleOwned}
      fill={isOwned ? "currentColor" : "none"}
      size={24}
      strokeWidth={1.5}
    />
  );
}

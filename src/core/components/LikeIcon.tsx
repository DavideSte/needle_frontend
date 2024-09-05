import { Heart } from "lucide-react";
import { useAddFavouriteMutation, useRemoveFavouriteMutation } from "../store/api/store";

interface LikeIconProps {
  isLiked: boolean;
  id: string;
}

export default function LikeIcon({ isLiked, id }: LikeIconProps) {
  const [addFavourite] = useAddFavouriteMutation();
  const [removeFavourite] = useRemoveFavouriteMutation();

  const toggleLike = () => {
    if (isLiked) {
      removeFavourite(id);
    } else {
      addFavourite(id);
    }
  };

  return (
    <Heart
      className="cursor-pointer text-cream"
      onClick={toggleLike}
      fill={isLiked ? "currentColor" : "none"}
      size={24}
      strokeWidth={1.5}
    />
  );
}

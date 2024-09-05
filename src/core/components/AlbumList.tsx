import { AlbumData } from "@/store/api/needleApi/types";
import { useUserSelector } from "@/core/store/slice/userSelector";
import AlbumListItem from "./AlbumListItem";

interface AlbumListItemProps {
  albums: AlbumData[] | undefined;
  extraKey?: string;
}

export default function AlbumList({ albums, extraKey }: AlbumListItemProps) {
  const { likedAlbumsId, ownedAlbumsId } = useUserSelector();

  if (albums === undefined) {
    return <div>No albums to show</div>;
  }

  return (
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
      {albums.map((album) => (
        <AlbumListItem
          key={extraKey + album.id}
          album={album}
          isLiked={likedAlbumsId.includes(album.id)}
          isOwned={ownedAlbumsId.includes(album.id)}
        />
      ))}
    </div>
  );
}

import { useGetAllAlbumsQuery } from "@/core/store/api/store";
import { AlbumData } from "@/features/search/types";
import { useEffect } from "react";

export interface AlbumStored {
  [key: string]: AlbumData;
}

export default function useLoadUserAlbums() {
  const { data, isFetching, isSuccess, isError } = useGetAllAlbumsQuery();

  useEffect(() => {
    // save the user's albums in the local storage
    if (!isSuccess || !data) return;

    // create dict with album id from list of albums
    const dictId: AlbumStored = data.albums.reduce((acc, album) => {
      acc[album.id] = album;
      return acc;
    }, {} as AlbumStored);

    localStorage.setItem("storedAlbums", JSON.stringify(dictId));
  }, [data, isSuccess]);

  return { data, isFetching, isSuccess, isError };
}

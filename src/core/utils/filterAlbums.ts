import { AlbumData, AlbumInfo } from "@/store/api/needleApi/types";

export function filterAlbums(
  // returns a dict with key:artist value=albums[]
  albums: AlbumData[],
  likedAlbums: string[],
  ownedAlbums: string[],
  searchFilter: string,
  showLiked: boolean,
  showOwned: boolean
) {
  const dictAlbumByArtist: { [key: string]: AlbumInfo[] } = {};

  albums.forEach((album) => {
    const { id, artists, name, release_date } = album;
    const artistsName = artists
      .map(({ name }) => {
        return name;
      })
      .join(", ");
    // filter by input search
    if (
      !name.toLocaleLowerCase().includes(searchFilter.toLocaleLowerCase()) &&
      !artistsName.toLocaleLowerCase().includes(searchFilter.toLocaleLowerCase())
    ) {
      return;
    }

    const isLiked = likedAlbums.includes(id);
    const isOwned = ownedAlbums.includes(id);

    if (!isLiked && !isOwned) {
      return;
    }

    // filter by like and owned icons
    if (!showLiked && showOwned) {
      if (isLiked && !isOwned) {
        return;
      }
    } else if (showLiked && !showOwned) {
      if (isOwned && !isLiked) {
        return;
      }
    } else if (!showLiked && !showOwned) {
      return;
    }

    const year = getYearFromDate(release_date);

    const albumTemp: AlbumInfo = {
      ...album,
      year,
      isOwned,
      isLiked,
    };

    if (artistsName in dictAlbumByArtist) {
      dictAlbumByArtist[artistsName].push(albumTemp);
    } else {
      dictAlbumByArtist[artistsName] = [albumTemp];
    }
  });

  // sort dict by year of release
  Object.keys(dictAlbumByArtist).forEach((key) => {
    dictAlbumByArtist[key] = dictAlbumByArtist[key].sort((a, b) => {
      return a.year - b.year;
    });
  });

  return dictAlbumByArtist;
}

export function getYearFromDate(date: string) {
  let convertedDate;
  const splittedDate = date.split("-");
  if (splittedDate.length > 0) {
    convertedDate = parseInt(`${splittedDate[0]}`);
  } else {
    convertedDate = 0;
  }
  return convertedDate;
}

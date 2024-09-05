import Alert from "@/components/custom/Alert";
import { useGetAllAlbumsQuery } from "@/core/store/api/store";
import AlbumByYearChart from "../components/charts/AlbumByYearChart";
import ArtistsTreeMap from "../components/charts/ArtistsTreeMap";
import TrackOwnedAlbums from "../components/charts/TrackOwnedAlbumsChart";
import SkeletonHomePage from "../components/SkeletonHomePage";

export default function HomePage() {
  const { data, isFetching, isSuccess, isError } = useGetAllAlbumsQuery();

  if (isFetching) {
    return <SkeletonHomePage />;
  }
  if (isError) {
    return (
      <Alert variant="destructive" className="m-4">
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>Error loading search.</Alert.Description>
      </Alert>
    );
  }
  if (!isSuccess) {
    return (
      <Alert variant="warning" className="m-4">
        <Alert.Title>Something went wrong.</Alert.Title>
        <Alert.Description>Please try again later.</Alert.Description>
      </Alert>
    );
  }

  const albums = data.albums;

  return (
    <div className="flex flex-col gap-4 p-4">
      <TrackOwnedAlbums albums={albums} />
      <AlbumByYearChart albums={albums} />
      <ArtistsTreeMap albums={albums} />
    </div>
  );
}

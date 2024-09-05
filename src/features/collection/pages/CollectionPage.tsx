import Alert from "@/components/custom/Alert";
import UserAlbumList from "../components/UserAlbumList";
import { useGetAllAlbumsQuery } from "@/core/store/api/store";
import SkeletonCollectionPage from "../components/SkeletonCollectionPage";

export default function CollectionPage() {
  // load all the users albums and sync the liked and owned albums
  const { data, isFetching, isSuccess, isError } = useGetAllAlbumsQuery();

  if (isFetching) {
    return <SkeletonCollectionPage />;
  }
  if (isError) {
    return (
      <Alert variant="destructive" className="m-4 lg:mt-8">
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>Error loading search.</Alert.Description>
      </Alert>
    );
  }
  if (!isSuccess) {
    return (
      <Alert variant="warning" className="m-4 lg:mt-8">
        <Alert.Title>Something went wrong.</Alert.Title>
        <Alert.Description>Please try again later.</Alert.Description>
      </Alert>
    );
  }

  return <UserAlbumList albums={data.albums} />;
}

import { useParams } from "react-router-dom";

export default function PlaylistPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-4">
      Open the{" "}
      <a className="underline" target="_blank" href={`https://open.spotify.com/playlist/${id}`}>
        Playist
      </a>{" "}
      on Spotify.
    </div>
  );
}

import { AlbumData } from "@/store/api/needleApi/types";
import ChartWrapper from "./ChartWrapper";
import { ResponsiveContainer, Tooltip, Treemap } from "recharts";

interface ArtistsTreeMapProps {
  albums: AlbumData[];
}

export default function ArtistsTreeMap({ albums }: ArtistsTreeMapProps) {
  const artistCounter = albums.reduce((acc, album) => {
    album.artists.forEach((artist) => {
      if (!acc[artist.name]) {
        acc[artist.name] = 1;
      }
      acc[artist.name]++;
    });
    return acc;
  }, {} as Record<string, number>);

  const data = Object.keys(artistCounter).map((artist) => ({
    name: artist,
    size: artistCounter[artist],
  }));

  return (
    <ChartWrapper title="Artists in your collection">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap data={data} dataKey="size" aspectRatio={4 / 3} stroke="#fff" fill="#8884d8">
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="treemap-custom-tooltip bg-cream text-black p-2 rounded-md">
                    <p>{`${payload[0].payload.name} `}</p>
                    <p>Album: {payload[0].value}</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </Treemap>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

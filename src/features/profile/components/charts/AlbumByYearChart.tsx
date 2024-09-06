import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import ChartWrapper from "./ChartWrapper";
import { AlbumData } from "@/store/api/needleApi/types";

interface AlbumByYearChartProps {
  albums: AlbumData[];
}

export default function AlbumByYearChart({ albums }: AlbumByYearChartProps) {
  const albumsByYear = albums.reduce((acc, album) => {
    const year = new Date(album.release_date).getFullYear();
    if (!acc[year]) {
      acc[year] = 0;
    }
    acc[year]++;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.keys(albumsByYear).map((year) => ({
    year,
    owned: albumsByYear[year],
  }));

  return (
    <ChartWrapper title="Albums by year">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: -10,
            bottom: 5,
          }}
        >
          <Bar dataKey="owned" fill="#8884d8" />
          <XAxis dataKey="year" stroke="#fdf0d5" opacity={0.8} />
          <YAxis dataKey="owned" stroke="#fdf0d5" opacity={0.8} />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" stroke="#fdf0d5" opacity={0.3} />
          {/* <Brush dataKey="name" height={30} stroke="#8884d8" /> */}
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

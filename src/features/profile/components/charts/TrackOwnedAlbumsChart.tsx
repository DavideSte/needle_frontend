import { AlbumData } from "@/store/api/needleApi/types";
import { PieChart, Pie, Cell } from "recharts";
import ChartWrapper from "./ChartWrapper";

interface TrackOwnedAlbumsProps {
  albums: AlbumData[];
}

const RADIAN = Math.PI / 180;
const data = [
  { name: "Beginner", value: 70, color: "#ff0000" },
  { name: "Intermediate", value: 20, color: "#00ff00" },
  { name: "Pro", value: 10, color: "#0000ff" },
];
const cx = 100;
const cy = 100;
const iR = 40;
const oR = 100;

const needle = (
  value: number,
  data: { value: number }[],
  cx: number,
  cy: number,
  iR: number,
  oR: number,
  color: string
) => {
  let total = 0;
  data.forEach((v) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return (
    <>
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke="#none"
        fill={color}
      />
    </>
  );
};

export default function TrackOwnedAlbums({ albums }: TrackOwnedAlbumsProps) {
  const value = albums.length;

  const trackNumber = albums.reduce((acc, album) => {
    acc += album.total_tracks;
    return acc;
  }, 0);

  const artistCounter = albums.reduce((acc, album) => {
    album.artists.forEach((artist) => {
      if (!acc[artist.name]) {
        acc[artist.name] = 1;
      }
      acc[artist.name]++;
    });
    return acc;
  }, {} as Record<string, number>);

  return (
    <ChartWrapper title="Album nella collezione">
      <div className="w-full h-full flex flex-col justify-center gap-2">
        <div className="flex flex-col justify-center items-center gap-2  h-full">
          <PieChart width={210} height={110}>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx={cx}
              cy={cy}
              innerRadius={iR}
              outerRadius={oR}
              fill="#8884d8"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {needle(value, data, cx, cy, iR, oR, "#d0d000")}
          </PieChart>
        </div>
        <div className="justify-center items-center h-full flex flex-col ">
          <p>Album: {value}</p>
          <p>Artisti: {Object.keys(artistCounter).length} </p>
          <p>Tracce: {trackNumber}</p>
        </div>
      </div>
    </ChartWrapper>
  );
}

import { Typography } from "@/components/ui/typography";

export default function ChartWrapper({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="h-auto bg-darkred rounded-md p-4 ">
      <Typography variant="h4" className="mb-8 font-bold">
        {title}
      </Typography>
      <div className="h-52 lg:h-72">{children}</div>
    </div>
  );
}

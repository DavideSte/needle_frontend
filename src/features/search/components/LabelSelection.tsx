import { Typography } from "@/components/ui/typography";

interface LabelSelectionProps {
  onClick: () => void;
  isSelected: boolean;
  children?: React.ReactNode;
}

export default function LabelSelection({ onClick, isSelected, children }: LabelSelectionProps) {
  return (
    <Typography
      variant="h2"
      className={` cursor-pointer  ${isSelected ? "opacity-100" : "opacity-70"}`}
      onClick={onClick}
    >
      {children}
    </Typography>
  );
}

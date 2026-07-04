import type { LucideIcon } from "lucide-react";

const HubIconBox = ({
  icon: Icon,
  size = "md",
}: {
  icon: LucideIcon;
  size?: "sm" | "md";
}) => {
  const boxSize = size === "sm" ? "w-11 h-11" : "w-12 h-12";
  const iconSize = size === "sm" ? "w-5 h-5" : "w-6 h-6";

  return (
    <div
      className={`${boxSize} rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-[hsl(215,28%,12%)]`}
      style={{ backgroundColor: "hsl(215,28%,12%,0.06)" }}
    >
      <Icon className={`${iconSize} transition-colors duration-300 group-hover:text-white`} style={{ color: "hsl(160,84%,39%)" }} />
    </div>
  );
};

export default HubIconBox;

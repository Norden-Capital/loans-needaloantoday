import { Shield, Clock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const badges = [
  { icon: Shield, label: "Encrypted Application" },
  { icon: Clock, label: "Same-Day Funding Available" },
  { icon: CheckCircle2, label: "Bad Credit Considered" },
];

const TrustBadges = ({ dark = false }: { dark?: boolean }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 font-dm-sans">
      {badges.map(({ icon: Icon, label }) => (
        <Badge
          key={label}
          variant="outline"
          className="h-7 gap-1.5 px-3 text-sm font-normal"
          style={
            dark
              ? { borderColor: "rgba(255,255,255,0.15)", color: "#FFFFFF", backgroundColor: "rgba(255,255,255,0.05)" }
              : { borderColor: "hsl(214,20%,90%)", color: "hsl(215,28%,12%)" }
          }
        >
          <Icon className="w-3.5 h-3.5" style={{ color: "hsl(160,84%,39%)" }} />
          {label}
        </Badge>
      ))}
    </div>
  );
};

export default TrustBadges;

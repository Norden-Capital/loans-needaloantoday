import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const DetailSidebarCta = ({
  applyUrl,
  label = "Apply Now",
  onApplyClick,
}: {
  applyUrl: string;
  label?: string;
  onApplyClick?: () => void;
}) => {
  return (
    <div
      className="rounded-2xl border p-5 text-center font-dm-sans"
      style={{ borderColor: "hsl(214,20%,90%)", backgroundColor: "hsl(215,28%,12%,0.04)" }}
    >
      <p className="text-sm font-semibold font-space-grotesk mb-1" style={{ color: "hsl(215,28%,12%)" }}>
        Ready when you are
      </p>
      <p className="text-xs mb-4" style={{ color: "hsl(215,14%,46%)" }}>
        Soft credit check only — checking your rate never impacts your score.
      </p>
      <Button
        asChild
        className="w-full rounded-xl ring-2 ring-[hsl(160,84%,39%)] ring-offset-2 ring-offset-white hover:scale-[1.02] active:scale-95"
        style={{ backgroundColor: "hsl(160,84%,39%)", color: "#FFFFFF" }}
      >
        <a href={applyUrl} target="_blank" rel="sponsored noopener noreferrer" onClick={onApplyClick}>
          {label}
          <ArrowRight />
        </a>
      </Button>
    </div>
  );
};

export default DetailSidebarCta;

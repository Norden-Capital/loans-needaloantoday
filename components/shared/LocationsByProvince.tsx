'use client';

import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { provinceLocations, LOCATION_PREVIEW_COUNT } from "@/lib/locations";

const LocationsByProvince = ({ heading }: { heading: string }) => {
  return (
    <div className="mt-16">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
        {heading}
      </h2>
      <p className="text-sm text-center mb-8 max-w-xl mx-auto font-dm-sans" style={{ color: "hsl(215,14%,46%)" }}>
        Find lenders in your province or city. We connect you with lenders across Canada.
      </p>

      <div className="space-y-3">
        {provinceLocations.map((province) => {
          const preview = province.cities.slice(0, LOCATION_PREVIEW_COUNT);
          return (
            <div key={province.name} className="rounded-2xl border p-5" style={{ borderColor: "hsl(214,20%,90%)" }}>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4" style={{ color: "hsl(160,84%,39%)" }} />
                <h3 className="font-bold text-sm font-space-grotesk" style={{ color: "hsl(215,28%,12%)" }}>
                  {province.name}
                </h3>
                <span className="text-xs font-dm-sans" style={{ color: "hsl(215,14%,60%)" }}>
                  ({province.cities.length} {province.cities.length === 1 ? "city" : "cities"})
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {preview.map((city) => (
                  <Link
                    key={city}
                    href="/loans/by-location"
                    className="rounded-full border px-3 py-1 text-xs font-dm-sans transition-colors hover:border-[hsl(160,84%,39%)]"
                    style={{ borderColor: "hsl(214,20%,90%)", color: "hsl(215,14%,46%)" }}
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-6">
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/loans/by-location">View All Locations</Link>
        </Button>
      </div>
    </div>
  );
};

export default LocationsByProvince;

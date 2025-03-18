// interface OverviewGridProps {

import GridInfoCard from "@/features/OverviewGrid/GridInfoCard";
import GridStatsCard from "@/features/OverviewGrid/GridStatsCard";
import MindShareCard from "@/features/OverviewGrid/MindShareCard";

// }
export default function OverviewGrid() {
  return (
    <section className="w-full mt-4 flex lg:flex-row flex-col justify-center items-center gap-[2px] h-auto lg:items-stretch min-h-[320px]">
      <div className="lg:w-2/5 w-full flex flex-col justify-between items-center lg:h-auto h-min gap-[2px]">
        <GridInfoCard />
        <GridStatsCard
          title="Solana AI Market Cap"
          infoHeading="$1.97B"
          change="-10"
          timePeriod="24h"
        />
        <GridStatsCard
          title="Trading Volume (24h)"
          infoHeading="$27.57M"
          change="-8"
          timePeriod="24h"
        />
      </div>
      <div className="lg:w-3/5 w-full flex flex-col justify-between items-center lg:h-auto h-min gap-[2px]">
        <MindShareCard />
      </div>
    </section>
  );
}

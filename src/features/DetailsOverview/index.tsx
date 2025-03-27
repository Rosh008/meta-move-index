import DetailsInfoCard from "@/features/DetailsOverview/DetailsInfoCard";
import GridStatsCard from "@/features/OverviewGrid/GridStatsCard";
import { formatDecimalWithSubscript, formatPrice } from "@/lib/helper";
import { ProjectData } from "@/types/projects";

interface DetailsOverviewProps {
  details: ProjectData;
  followers: String;
}

export default function DetailsOverview({
  details,
  followers,
}: DetailsOverviewProps) {
  return (
    <section className="w-full mt-4 flex lg:flex-row flex-col justify-center items-center gap-[2px] h-auto lg:items-stretch min-h-[320px]">
      <div className="lg:w-2/5 w-full flex flex-col justify-between items-center lg:h-auto h-min gap-[2px]">
        <GridStatsCard
          title="Price"
          infoHeading={formatDecimalWithSubscript(details.priceUsd)}
          change={details.priceChange.h24.toString()}
          timePeriod="24h"
          showChart={false}
          chartData={[]}
        />
        <div className="flex w-full gap-[2px]">
          <DetailsInfoCard
            title="Market cap"
            primaryValue={`$${formatPrice(details.marketCap)}`}
          />
          <DetailsInfoCard
            title="Trading volume"
            primaryValue={`$${formatPrice(details.volume.h24)}`}
            secondaryValue="24h"
          />
        </div>
        <div className="flex w-full gap-[2px]">
          <DetailsInfoCard
            title="Liquidity"
            primaryValue={`$${formatPrice(details.liquidity.usd)}`}
          />
        </div>
        {/* <div className="flex w-full gap-[2px]">
          <DetailsInfoCard
            title="Average impressions"
            primaryValue="26K"
            secondaryValue="+149.20%"
          />
          <DetailsInfoCard
            title="Average engagement"
            primaryValue="1K"
            secondaryValue="+155.81%"
          />
        </div> */}
      </div>
      <div className="lg:w-3/5 w-full flex flex-col justify-between items-center lg:h-auto h-min gap-[2px]">
        <div className="flex w-full gap-[2px]">
          <DetailsInfoCard
            title="Mindshare"
            primaryValue={details.mindShare.toFixed(2)}
          />
          <DetailsInfoCard title="Followers" primaryValue={followers} />
        </div>
        {/* // Gauge chart */}
      </div>
    </section>
  );
}

import DetailsInfoCard from "@/features/DetailsOverview/DetailsInfoCard";
import GridStatsCard from "@/features/OverviewGrid/GridStatsCard";
import { formatDecimalWithSubscript, formatPrice } from "@/lib/helper";
import { ProjectData } from "@/types/projects";

interface DetailsOverviewProps {
  details: ProjectData;
}

export default function DetailsOverview({ details }: DetailsOverviewProps) {
  return (
    <section className="w-full mt-4 flex lg:flex-row flex-col justify-center items-center gap-[2px] h-auto lg:items-stretch min-h-[320px]">
      <div className="lg:w-2/5 w-full flex flex-col justify-between items-center lg:h-auto h-min gap-[2px]">
        <GridStatsCard
          title="Price"
          infoHeading={formatDecimalWithSubscript(details.priceUsd)}
          change={details.priceChange.h24.toString()}
          timePeriod="24h"
        />
        <div className="flex w-full gap-[2px]">
          <DetailsInfoCard
            title="Market cap"
            primaryValue={`$${formatPrice(details.marketCap)}`}
            //TODO
            secondaryValue="+10.2%"
          />
          <DetailsInfoCard
            title="Trading volume"
            primaryValue={`$${formatPrice(details.volume.h24)}`}
            //TODO
            secondaryValue="-2%"
          />
        </div>
        <div className="flex w-full gap-[2px]">
          <DetailsInfoCard
            title="Liquidity"
            primaryValue={`$${formatPrice(details.liquidity.usd)}`}
            //TODO
            secondaryValue="+0.03%"
          />
          <DetailsInfoCard
            title="Holders"
            primaryValue="7.325K"
            secondaryValue="+12%"
          />
        </div>
        <div className="flex w-full gap-[2px]">
          <DetailsInfoCard
            title="Average impressions"
            primaryValue="26K"
            secondaryValue="+149.20%"
          />
          <DetailsInfoCard
            title="Average impressions"
            primaryValue="1K"
            secondaryValue="+155.81%"
          />
        </div>
      </div>
      <div className="lg:w-3/5 w-full flex flex-col justify-between items-center lg:h-auto h-min gap-[2px]">
        <div className="flex w-full gap-[2px]">
          <DetailsInfoCard
            title="Mindshare"
            primaryValue={details.mindShare}
            secondaryValue="-0.08%"
          />
          <DetailsInfoCard
            title="Followers"
            primaryValue="2.663M"
            secondaryValue="-0.03%"
          />
        </div>
        {/* // Mindshare chart */}
      </div>
    </section>
  );
}

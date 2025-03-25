import DetailsInfoCard from "@/features/DetailsOverview/DetailsInfoCard";
import GridStatsCard from "@/features/OverviewGrid/GridStatsCard";

export default function DetailsOverview() {
  return (
    <section className="w-full mt-4 flex lg:flex-row flex-col justify-center items-center gap-[2px] h-auto lg:items-stretch min-h-[320px]">
      <div className="lg:w-2/5 w-full flex flex-col justify-between items-center lg:h-auto h-min gap-[2px]">
        <GridStatsCard
          title="Price"
          infoHeading="$0.0₃7067"
          change="-10"
          timePeriod="24h"
        />
        <div className="flex w-full gap-[2px]">
          <DetailsInfoCard
            title="Market cap"
            primaryValue="$1.97M"
            secondaryValue="+10.2%"
          />
          <DetailsInfoCard
            title="Trading volume"
            primaryValue="93.303K"
            secondaryValue="-2%"
          />
        </div>
        <div className="flex w-full gap-[2px]">
          <DetailsInfoCard
            title="Liquidity"
            primaryValue="675.699K"
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
            primaryValue="0.142"
            secondaryValue="-0.08%"
          />
          <DetailsInfoCard
            title="Followers"
            primaryValue="2.663M"
            secondaryValue="-0.03%"
          />
        </div>
      </div>
    </section>
  );
}

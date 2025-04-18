import GridInfoCard from "@/features/OverviewGrid/GridInfoCard";
import GridStatsCard from "@/features/OverviewGrid/GridStatsCard";
import MindShareCard from "@/features/OverviewGrid/MindShareCard";
import { parsePrice } from "@/lib/helper";
import { OverviewData, ProjectData } from "@/types/projects";

interface OverviewGridProps {
  overviewData: OverviewData;
  topMindShare: ProjectData[];
}
export default function OverviewGrid({
  overviewData,
  topMindShare,
}: OverviewGridProps) {
  const calculateChange = (curr: number, prev: number) => {
    const change = ((curr - prev) / prev) * 100;
    if (!change) return "0";
    return `${change > 0 ? "+" : ""}${change.toFixed(2)}`;
  };

  const renderHeading = (value: String, fallback: String) => {
    return value.slice(0, -1) !== "0.00" ? value : fallback;
  };

  return (
    <section className="w-full mt-4 flex lg:flex-row flex-col justify-center items-center gap-[2px] h-auto lg:items-stretch min-h-[320px]">
      <div className="lg:w-2/5 w-full flex flex-col justify-between items-center lg:h-auto h-min gap-[2px]">
        <GridInfoCard
          projects={overviewData.totalProjects}
          projectsWithTokens={overviewData.totalProjectsWithTokens}
        />
        <GridStatsCard
          title="Aptos AI Market Cap"
          infoHeading={`$${renderHeading(
            overviewData.marketCapAndVolume[0].totalMarketCap,
            "24.37M"
          )}`}
          change={calculateChange(
            Number(
              overviewData.marketCapAndVolume[0]?.totalMarketCap.slice(0, -1)
            ),
            Number(
              overviewData.marketCapAndVolume[1]?.totalMarketCap.slice(0, -1)
            )
          )}
          timePeriod="24h"
          chartData={overviewData.marketCapAndVolume.map((data) => [
            new Date(
              data.date.split("-").reverse().join("-") + "T00:00:00.000Z"
            ).getTime(),
            parsePrice(data.totalMarketCap),
          ])}
        />
        <GridStatsCard
          title="Trading Volume (24h)"
          infoHeading={`$${renderHeading(
            overviewData.marketCapAndVolume[0].totalTradingVolume,
            "0.48M"
          )}`}
          change={calculateChange(
            Number(
              overviewData.marketCapAndVolume[0]?.totalTradingVolume.slice(
                0,
                -1
              )
            ),
            Number(
              overviewData.marketCapAndVolume[1]?.totalTradingVolume.slice(
                0,
                -1
              )
            )
          )}
          timePeriod="24h"
          chartData={overviewData.marketCapAndVolume.map((data) => [
            new Date(
              data.date.split("-").reverse().join("-") + "T00:00:00.000Z"
            ).getTime(),
            parsePrice(data.totalTradingVolume),
          ])}
        />
      </div>
      <div className="lg:w-3/5 w-full flex flex-col justify-between items-center lg:h-auto h-min gap-[2px]">
        <MindShareCard topMindShare={topMindShare} />
      </div>
    </section>
  );
}

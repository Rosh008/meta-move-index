import SimpleLineChart from "@/components/charts/SimpleLineChart";

interface GridStatsCardProps {
  title: String;
  infoHeading: String | number | React.ReactNode;
  change: String;
  timePeriod: String;
  chartData: Array<[date: number, value: number]>;
  showChart?: boolean;
}

export default function GridStatsCard({
  title,
  infoHeading,
  change,
  timePeriod,
  chartData,
  showChart = true,
}: GridStatsCardProps) {
  return (
    <div className="bg-[#171717] w-full h-full p-4">
      <div className="w-full h-full flex flex-col font-medium gap-3">
        <div className="w-full text-[#A2A2A2] text-[14px] h-1/4 flex items-center">
          {title}
        </div>
        <div className="w-full flex justify-between items-center h-3/4">
          <div className="text-xl leading-none">{infoHeading}</div>
          {!showChart && (
            <div className="max-w-[50%]">
              <SimpleLineChart data={chartData} />
            </div>
          )}

          <div className="flex flex-col text-[#D54F34] justify-end items-end flex-shrink-0">
            <p className="text-sm leading-none gap-1">{`${change}%`}</p>
            <p className="text-xs leading-none mt-1">{timePeriod}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

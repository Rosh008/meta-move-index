import SimpleLineChart from "@/components/charts/SimpleLineChart";

interface GridStatsCardProps {
  title: string;
  infoHeading: string;
  change: string;
  timePeriod: string;
}

export default function GridStatsCard({
  title,
  infoHeading,
  change,
  timePeriod,
}: GridStatsCardProps) {
  return (
    <div className="bg-[#171717] w-full h-full p-4">
      <div className="w-full h-full flex flex-col font-medium gap-3">
        <div className="w-full text-[#A2A2A2] text-[14px] h-1/4 flex items-center">
          {title}
        </div>
        <div className="w-full flex justify-between items-center h-3/4">
          <div className="text-xl leading-none">{infoHeading}</div>
          <div className="max-w-[50%]">
            <SimpleLineChart />
          </div>
          <div className="flex flex-col text-[#D54F34] justify-end items-end flex-shrink-0">
            <p className="text-sm leading-none gap-1">{`${change}%`}</p>
            <p className="text-xs leading-none">{timePeriod}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

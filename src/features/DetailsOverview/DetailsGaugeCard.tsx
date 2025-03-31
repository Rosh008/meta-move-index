import GaugeChart from "@/components/charts/GaugeChart";

interface DetailsGaugeCardInterface {
  value: number;
}
export default function DetailsGaugeCard({ value }: DetailsGaugeCardInterface) {
  return (
    <div className="bg-[#171717] w-full h-full p-4 flex items-stretch">
      <div className="flex flex-col gap-4 font-medium font-inter w-full justify-between">
        <div className="text-[14px] text-[#A2A2A2]">Buying Sentiment</div>
        <GaugeChart value={value} />
      </div>
    </div>
  );
}

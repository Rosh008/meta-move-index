import TreeMapChart from "@/components/charts/TreeMapChart";

export default function MindShareCard() {
  return (
    <div className="bg-[#171717] w-full h-full p-4 flex items-stretch">
      <div className="flex flex-col gap-4 font-medium font-inter w-full justify-between">
        <div className="text-[#A2A2A2]">Mindshare by Projects</div>
        {/* treemap */}
        <TreeMapChart />
      </div>
    </div>
  );
}

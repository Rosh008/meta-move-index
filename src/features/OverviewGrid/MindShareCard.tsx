import TreeMapChart from "@/components/charts/TreeMapChart";
import { ProjectData } from "@/types/projects";

interface MindShareCardProps {
  topMindShare: ProjectData[];
}

export default function MindShareCard({ topMindShare }: MindShareCardProps) {
  return (
    <div className="bg-[#171717] w-full h-full p-4 flex items-stretch">
      <div className="flex flex-col gap-4 font-medium font-inter w-full justify-between">
        <div className="text-[#A2A2A2]">Mindshare by Projects</div>
        {/* treemap */}
        <TreeMapChart topMindShare={topMindShare} />
      </div>
    </div>
  );
}

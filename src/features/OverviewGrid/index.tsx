// interface OverviewGridProps {

import GridInfoCard from "@/features/OverviewGrid/GridInfoCard";

// }
export default function OverviewGrid() {
  return (
    <section className="w-full mt-4 flex lg:flex-row flex-col justify-center items-center gap-[2px] h-auto lg:items-stretch min-h-[320px]">
      <div className="lg:w-3/6 w-full flex flex-col justify-between items-center lg:h-auto h-min gap-[2px]">
        <GridInfoCard />
        <GridInfoCard />
        <GridInfoCard />
      </div>
      <div className="lg:w-3/6 w-full flex flex-col justify-between items-center lg:h-auto h-min gap-[2px]">
        <GridInfoCard />
        <GridInfoCard />
      </div>
    </section>
  );
}

import IndexTable from "@/features/IndexTable";
import OverviewGrid from "@/features/OverviewGrid";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <h1 className="font-serif text-xl">META MOVE AI INDEX</h1>
      <h2 className="mt-6 text-lg">Overview</h2>
      <OverviewGrid />
      <h2 className="my-6 text-lg">Index</h2>
      <IndexTable />
    </div>
  );
}

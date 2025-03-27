import {
  fetchProjectsCount,
  fetchProjectsSumMarketCapAndVolumeForAllContracts,
  fetchProjectsWithTokenCount,
} from "@/api/projectsListing";
import Loader from "@/components/loader";
import IndexTable from "@/features/IndexTable";
import OverviewGrid from "@/features/OverviewGrid";
import { OverviewData } from "@/types/projects";
import { useEffect, useState } from "react";

export default function Home() {
  const [overviewData, setOverviewData] = useState<OverviewData>({
    totalProjects: 0,
    totalProjectsWithTokens: 0,
    marketCapAndVolume: [
      {
        date: "",
        totalMarketCap: "",
        totalTradingVolume: "",
      },
    ],
  });
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const totalProjects = await fetchProjectsCount()
        .then((res) => res.data)
        .catch(() => {
          setIsError(true);
        });
      const totalTokens = await fetchProjectsWithTokenCount()
        .then((res) => res.data)
        .catch(() => {
          setIsError(true);
        });
      const marketCapAndVolume =
        await fetchProjectsSumMarketCapAndVolumeForAllContracts()
          .then((res) => res.data)
          .catch(() => {
            setIsError(true);
          });
      setOverviewData({
        totalProjects: totalProjects.count,
        totalProjectsWithTokens: totalTokens.count,
        marketCapAndVolume: marketCapAndVolume.marketCapAndVolumeData,
      });
    };
    fetchData().then(() => setLoading(false));
  }, []);

  if (isError) {
    return (
      <div className="flex flex-col flex-1">
        <h2 className="my-6 text-center text-xl">Something went wrong!</h2>
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col flex-1">
      <h1 className="font-serif text-xl">AptIndex</h1>
      <h2 className="mt-6 text-lg">Overview</h2>
      <OverviewGrid overviewData={overviewData} />
      <h2 className="my-6 text-lg">Index</h2>
      <IndexTable />
    </div>
  );
}

import { fetchMindshareData } from "@/api/mindShare";
import { fetchProjectData, fetchProjectDetails } from "@/api/projectsListing";
import Loader from "@/components/loader";
import { DetailsCard } from "@/features/DetailsCard";
import DetailsOverview from "@/features/DetailsOverview";
import { ProjectData } from "@/types/projects";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Details() {
  const navigate = useNavigate();
  const params = useParams();
  const [details, setDetails] = useState<ProjectData>();
  const [loading, setLoading] = useState(true);
  const [followers] = useState("NAN");
  const tokenId = params.tokenId;

  useEffect(() => {
    if (!tokenId) {
      return;
    }
    const fetchData = async () => {
      const projectData: ProjectData = await fetchProjectDetails(tokenId).then(
        (res) => res.data.data
      );
      const tokenData = await fetchProjectData(tokenId as string);
      const mindShareData = await fetchMindshareData(tokenId)
        .then((res) => res.data.data)
        .catch(() => null);
      // const twitterFollowers = await fetchTwitterFollowerCount(
      //   projectData.twitterHandle
      // ).then((res) => res.data.data);

      // setFollowers(twitterFollowers);

      if (!tokenData.data.length) {
        return;
      }
      setDetails({
        ...projectData,
        ...tokenData.data[0],
        mindShare: (mindShareData?.mindshareValue || 0) * 100,
        sentiment: mindShareData?.sentiment,
      });
    };
    fetchData();
    setLoading(false);
  }, [tokenId]);

  const onBackClick = () => {
    navigate("/");
  };

  if (loading || !details) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col flex-1">
      <div onClick={onBackClick} className="text-[#2E47E0] mb-3 cursor-pointer">
        Back
      </div>
      <DetailsCard details={details as ProjectData} />
      <h2 className="mt-6 text-lg">Overview</h2>
      <DetailsOverview details={details as ProjectData} followers={followers} />
    </div>
  );
}

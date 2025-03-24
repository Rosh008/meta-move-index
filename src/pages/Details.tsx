import { fetchProjectData, fetchProjectDetails } from "@/api/projectsListing";
import { ProjectData } from "@/types/projects";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Details() {
  const navigate = useNavigate();
  const params = useParams();
  const [details, setDetails] = useState<ProjectData>();
  const tokenId = params.tokenId;

  useEffect(() => {
    if (!tokenId) return;
    const fetchData = async () => {
      const projectData = await fetchProjectDetails("");
      const tokenData = await fetchProjectData(tokenId);
      setDetails({ ...projectData, ...tokenData.data[0] });
    };
    fetchData();
  }, []);

  const onBackClick = () => {
    navigate("/");
  };

  if (!tokenId || !details) {
    return <div className="h3">Something went wrong !</div>;
  }
  return (
    <div className="flex flex-col flex-1">
      <div onClick={onBackClick} className="text-[#2E47E0] mb-3 cursor-pointer">
        Back
      </div>
      <div className="flex flex-col lg:flex-row w-full bg-[#171717] lg:justify-between p-4">
        <div className="flex gap-2">
          <img
            className="h-16 w-16"
            alt="project-image"
            src={details.info.imageUrl}
          />
          <div className="flex flex-col gap-2">
            <span>{details.projectName}</span>
            <div>
              <div className="p-2 px-3 text-truncate border rounded-lg">
                {details.contractAddress}
              </div>
              <a>Copy button</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div>About</div>
          <div>Links</div>
        </div>
      </div>
    </div>
  );
}

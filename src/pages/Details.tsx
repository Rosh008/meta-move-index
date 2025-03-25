import { fetchProjectData, fetchProjectDetails } from "@/api/projectsListing";
import Loader from "@/components/loader";
import { ProjectData } from "@/types/projects";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Details() {
  const navigate = useNavigate();
  const params = useParams();
  const [details, setDetails] = useState<ProjectData>();
  const [loading, setLoading] = useState(false);
  const tokenId = params.tokenId;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const projectData = await fetchProjectDetails();
      const tokenData = await fetchProjectData(tokenId as string);
      if (!tokenData.data.length) return;
      setDetails({ ...projectData, ...tokenData.data[0] });
    };
    if (tokenId) {
      fetchData();
    }
    setLoading(false);
  }, []);

  const onBackClick = () => {
    navigate("/");
  };

  if (loading) {
    return <Loader />;
  }

  if (!tokenId || !details) {
    return <div className="h3 text-center">Something went wrong !</div>;
  }
  return (
    <div className="flex flex-col flex-1">
      <div onClick={onBackClick} className="text-[#2E47E0] mb-3 cursor-pointer">
        Back
      </div>
      <div className="flex flex-col items-center lg:flex-row w-full bg-[#171717] lg:justify-between p-4">
        <div className="flex gap-2">
          <img
            className="h-16 w-16"
            alt="project-image"
            src={details.info.imageUrl}
          />
          <div className="flex flex-col gap-2">
            <span className="text-lg">{details.projectName}</span>
            <div className="flex items-center gap-3 border border-[#383838] border-0.5">
              <div className="p-2 px-3 text-[14px] text-[#A2A2A2]">
                {`${details.contractAddress.slice(
                  0,
                  6
                )}...${details.contractAddress.slice(
                  details.contractAddress.length - 4
                )}`}
              </div>
              <div
                className="mr-4"
                onClick={() => {
                  navigator.clipboard
                    .writeText(details.contractAddress)
                    .then(() => alert("Address copied"));
                }}
              >
                <img
                  alt="copy"
                  width="14"
                  height="14"
                  className="cursor-pointer brightness-0 invert opacity-60 hover:opacity-100"
                  src="https://www.goatindex.ai/images/icons/copy.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4 lg:mt-0">
          <div className="text-sm text-[#A2A2A2]">About</div>
          <span className="max-w-md truncate whitespace-normal text-sm text-[#A2A2A2]">
            {details.description}
          </span>
        </div>
        <div className="flex mr-3 gap-2 mt-4 lg:mt-0">
          <p className="text-sm">Links</p>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex gap-2 items-center"
          >
            <a
              target="_blank"
              href={`https://twitter.com/${details.twitterHandle}`}
            >
              <img
                alt="twitter"
                className="w-6 h-6 bg-grey-50"
                src="https://www.goatindex.ai/images/icons/twitter.svg"
              />
            </a>
            <a target="_blank" href={`${details.telegramLink}`}>
              <img
                alt="telegram"
                className="w-6 h-6 bg-grey-50"
                src="	https://www.goatindex.ai/images/icons/telegram.svg"
              />
            </a>
            <a target="_blank" href={`${details.websiteLink}`}>
              <img
                alt="website"
                className="w-6 h-6 bg-grey-50"
                src="	https://www.goatindex.ai/images/icons/website.svg"
              />
            </a>
            <a target="_blank" href={`${details.url}`}>
              <img
                alt="dex screener"
                className="w-6 h-6 bg-grey-50"
                src="https://www.goatindex.ai/images/icons/dexscreener.svg"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ProjectData } from "@/types/projects";

interface DetailsCardProps {
  details: ProjectData;
}

export function DetailsCard({ details }: DetailsCardProps) {
  return (
    <div className="flex flex-col items-center lg:flex-row w-full bg-[#171717] lg:justify-between p-4">
      <div className="flex gap-2">
        <img
          className="h-16 w-16"
          alt="project-image"
          src={details.info?.imageUrl}
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
      <div className="flex items-center mr-3 gap-2 mt-4 lg:mt-0">
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
  );
}

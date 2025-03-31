import OverflowTooltip from "@/components/overflowTooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDecimalWithSubscript, formatPrice } from "@/lib/helper";
import { ProjectData } from "@/types/projects";
import { useNavigate } from "react-router-dom";

interface IndexTableProps {
  projectsListing: ProjectData[];
}
export default function IndexTable({ projectsListing }: IndexTableProps) {
  const navigate = useNavigate();

  const headerItems = [
    "Project",
    "Label",
    "Mindshare",
    "Market Cap",
    "24h Volume",
    "Liquidity",
    "Price",
  ];

  const onRowClick = (tokenID: string, e: any) => {
    e.preventDefault();
    navigate(`/details/${tokenID}`);
  };

  return (
    <>
      <div className="bg-[#171717] w-full h-full p-4 flex items-stretch">
        <Table>
          <TableHeader>
            <TableRow>
              {headerItems.map((item) => (
                <TableHead key={item}>{item}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectsListing.map((project, index) => (
              <TableRow
                className="cursor-pointer"
                onClick={(e) => onRowClick(project.contractAddress, e)}
                key={index}
              >
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <img
                        className="h-6 w-6 mr-1"
                        src={project.info?.imageUrl}
                        alt=""
                      />
                      <OverflowTooltip
                        text={project.projectName}
                        contentWrapperClassname="text-md max-w-60"
                      />
                      <div
                        className="ml-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard
                            .writeText(project.contractAddress)
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
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="flex gap-2 mt-2"
                    >
                      <a
                        target="_blank"
                        href={`https://twitter.com/${project.twitterHandle}`}
                      >
                        <img
                          alt="twitter"
                          className="w-4 h-4 bg-grey-50"
                          src="https://www.goatindex.ai/images/icons/twitter.svg"
                        />
                      </a>
                      <a target="_blank" href={`${project.telegramLink}`}>
                        <img
                          alt="telegram"
                          className="w-4 h-4 bg-grey-50"
                          src="	https://www.goatindex.ai/images/icons/telegram.svg"
                        />
                      </a>
                      <a target="_blank" href={`${project.websiteLink}`}>
                        <img
                          alt="website"
                          className="w-4 h-4 bg-grey-50"
                          src="	https://www.goatindex.ai/images/icons/website.svg"
                        />
                      </a>
                      <a target="_blank" href={`${project.url}`}>
                        <img
                          alt="dex screener"
                          className="w-4 h-4 bg-grey-50"
                          src="	https://www.goatindex.ai/images/icons/dexscreener.svg"
                        />
                      </a>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="p-0">
                  <div className="flex gap-1">
                    {/* {project.category.map((label) => ( */}
                    <div className="p-1 px-2 text-xs border border-[#D54F34] rounded-lg">
                      {project.category}
                    </div>
                    {/* ))} */}
                  </div>
                </TableCell>
                <TableCell>{project.mindShare.toFixed(2)}</TableCell>
                <TableCell>{formatPrice(project.marketCap)}</TableCell>
                <TableCell>{formatPrice(project.volume.h24)}</TableCell>
                <TableCell>{formatPrice(project.liquidity.usd)}</TableCell>
                <TableCell>
                  {formatDecimalWithSubscript(project.priceUsd)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

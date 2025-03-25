interface DetailsInfoCardProps {
  title: String;
  primaryValue: String;
  secondaryValue: String;
}

export default function DetailsInfoCard({
  title,
  primaryValue,
  secondaryValue,
}: DetailsInfoCardProps) {
  return (
    <div className="bg-[#171717] w-full h-full p-4 flex items-stretch">
      <div className="flex flex-col gap-4 font-medium font-inter w-full justify-between">
        <div className="text-[14px] text-[#A2A2A2]">{title}</div>
        <div className="flex flex-col gap-0.5">
          <div className="flex justify-between items-center">
            <div className="text-xl">{primaryValue}</div>
            <div
              className={`text-sm leading-none ${
                secondaryValue.startsWith("+")
                  ? "text-[#A2A2A2]"
                  : "text-[#D54F34]"
              }`}
            >
              {secondaryValue}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

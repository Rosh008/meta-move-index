export default function GridInfoCard() {
  return (
    <div className="bg-[#171717] w-full h-full p-4 flex items-stretch">
      <div className="flex flex-col gap-4 font-medium font-inter w-full justify-between">
        <div className="flex justify-between items-center">
          <div className="text-[#A2A2A2]">Total Projects</div>
          <div className="text-2xl leading-none">605</div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex justify-between items-center">
            <div className="text-[#A2A2A2]">Projects with tokens</div>
            <div className="text-2xl leading-none">374</div>
          </div>
          <div className="flex flex-col text-[#D54F34] text-sm ml-auto">
            <span>-1 in 6h</span>
          </div>
        </div>
      </div>
    </div>
  );
}

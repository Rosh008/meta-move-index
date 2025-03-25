import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export default function OverflowTooltip({
  text,
  contentWrapperClassname,
}: {
  text: string;
  contentWrapperClassname?: string;
}) {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        setIsOverflowing(
          textRef.current.scrollWidth > textRef.current.clientWidth
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            ref={textRef}
            className={cn("truncate max-w-40", contentWrapperClassname)} // Adjust width as needed
          >
            {text}
          </div>
        </TooltipTrigger>
        {isOverflowing && <TooltipContent>{text}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}

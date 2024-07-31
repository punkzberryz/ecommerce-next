import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
export const FieldTip = ({ children }: { children?: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <InfoIcon className="text-edit size-3" />
        </TooltipTrigger>
        <TooltipContent align="start">
          <div className="text-sm">{children}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

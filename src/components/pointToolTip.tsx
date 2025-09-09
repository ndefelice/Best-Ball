"use client";

import React from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PointTooltipProps {
  message: string | React.ReactNode; // allow plain text or JSX
  className?: string;
}

const PointTooltip: React.FC<PointTooltipProps> = ({ message, className }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Info
          className={`w-6 h-6 text-gray-600 cursor-pointer ${className ?? ""}`}
        />
      </PopoverTrigger>
      <PopoverContent className="max-w-xs text-sm">
        {message}
      </PopoverContent>
    </Popover>
  );
};

export default PointTooltip;
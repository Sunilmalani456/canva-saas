"use client";

import { ChevronLeft } from "lucide-react";
import React from "react";

interface ToolSidebarCloseProps {
  onClose: () => void;
}

const ToolSidebarClose = ({ onClose }: ToolSidebarCloseProps) => {
  return (
    <button
      onClick={onClose}
      className="absolute -right-[1.80rem] h-[70px] bg-white top-1/2 transform -translate-y-1/2 flex items-center justify-center rounded-r-xl px-1 pr-2 border-r border-y group"
    >
      <ChevronLeft className="size-4 text-black group-hover:opacity-75 transition" />
    </button>
  );
};

export default ToolSidebarClose;

import React from "react";
import { ActiveTool } from "../types";
import { cn } from "@/lib/utils";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShapeTool from "./shapeTool";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";

interface ShapeSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const ShapeSidebar = ({
  activeTool,
  onChangeActiveTool,
}: ShapeSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "shapes" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Shapes"
        description="Add shapes to your canvas"
      />

      <ScrollArea />
      <div className="grid grid-cols-3 gap-4 p-4">
        <ShapeTool onClick={() => {}} icon={FaCircle} iconClassName="" />
        <ShapeTool onClick={() => {}} icon={FaSquare} iconClassName="" />
        <ShapeTool onClick={() => {}} icon={FaSquareFull} iconClassName="" />
        <ShapeTool onClick={() => {}} icon={IoTriangle} iconClassName="" />
        <ShapeTool
          onClick={() => {}}
          icon={IoTriangle}
          iconClassName="rotate-180"
        />
        <ShapeTool onClick={() => {}} icon={FaDiamond} iconClassName="" />
      </div>
      <ToolSidebarClose onClose={onClose} />
    </aside>
  );
};

export default ShapeSidebar;

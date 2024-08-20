import { useState } from "react";
import { ActiveTool, Editor } from "../types";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Toolbar = ({ editor, activeTool, onChangeActiveTool }: ToolbarProps) => {
  const fillColor = editor?.fillColor;

  if (editor?.selectedObject.length === 0) {
    return (
      <div className="shrink-0 h-[56px] bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    );
  }

  return (
    <div className="shrink-0 h-[56px] bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      <div className="flex items-center justify-center h-full">
        <Hint label="Color" side="bottom" sideOffset={5}>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => onChangeActiveTool("fill")}
            className={cn(activeTool === "fill" && "bg-gray-100")}
          >
            <div
              className="rounded-sm border size-4"
              style={{ backgroundColor: fillColor }}
            />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default Toolbar;

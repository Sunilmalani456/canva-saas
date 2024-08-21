import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Toolbar = ({ editor, activeTool, onChangeActiveTool }: ToolbarProps) => {
  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();

  if (editor?.selectedObject.length === 0) {
    return (
      <div className="shrink-0 h-[56px] bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    );
  }

  return (
    <div className="shrink-0 h-[56px] bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      {/* Bg-color */}
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

      {/* Stroke-color */}
      <div className="flex items-center justify-center h-full">
        <Hint label="Border Color" side="bottom" sideOffset={5}>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => onChangeActiveTool("stroke-color")}
            className={cn(activeTool === "stroke-color" && "bg-gray-100")}
          >
            <div
              className="rounded-sm size-4 border-2 bg-white"
              style={{ borderColor: strokeColor }}
            />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default Toolbar;

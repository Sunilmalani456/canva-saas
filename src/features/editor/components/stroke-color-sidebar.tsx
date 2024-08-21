import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ActiveTool, Editor, STROKE_COLOR } from "../types";
import ColorPcker from "./color-picker";
import ToolSidebarClose from "./tool-sidebar-close";
import ToolSidebarHeader from "./tool-sidebar-header";

interface StrokeColorSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const StrokeColorSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: StrokeColorSidebarProps) => {
  const value = editor?.getActiveStrokeColor() || STROKE_COLOR;

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "stroke-color" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Stroke Color"
        description="Add stroke color to your element"
      />

      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPcker value={value} onChange={onChange} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClose={onClose} />
    </aside>
  );
};

export default StrokeColorSidebar;

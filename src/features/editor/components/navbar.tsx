"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  Download,
  MousePointerClick,
  Redo2,
  Undo2,
} from "lucide-react";
import { BsCloudCheck } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import Logo from "./logo";
import { ActiveTool } from "../types";
import { cn } from "@/lib/utils";

interface NavbarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Navbar = ({ activeTool, onChangeActiveTool }: NavbarProps) => {
  return (
    <div className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
      <Logo />
      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              File
              <ChevronDown className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem
              onClick={() => {}}
              className="flex items-center gap-x-2"
            >
              <CiFileOn className="size-8" />
              <div>
                <p>Open</p>
                <p className="text-muted-foreground text-xs">
                  Open a JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator className="mx-2" orientation="vertical" />

        <Hint label="Select" side="bottom" sideOffset={10}>
          <Button
            variant="ghost"
            size={"icon"}
            onClick={() => onChangeActiveTool("select")}
            className={cn(activeTool === "select" && "bg-gray-100")}
          >
            <MousePointerClick className="size-4" />
          </Button>
        </Hint>

        <Hint label="Undo" side="bottom" sideOffset={10}>
          <Button variant="ghost" size="icon" onClick={() => {}}>
            <Undo2 className="size-4" />
          </Button>
        </Hint>

        <Hint label="Redo" side="bottom" sideOffset={10}>
          <Button variant="ghost" size="icon" onClick={() => {}}>
            <Redo2 className="size-4" />
          </Button>
        </Hint>

        <Separator orientation="vertical" className="mx-2" />

        {/* STATUS LIKE AUTO-SAVING */}
        <div className="flex items-center gap-x-2">
          <BsCloudCheck className="size-[20px] text-muted-foreground" />
          <div className="text-muted-foreground text-xs">Saved</div>
        </div>

        {/* Export File as JSON, PNG */}
        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                Export
                <Download className="size-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="min-w-60">
              <DropdownMenuItem
                onClick={() => {}}
                className="flex items-center gap-x-2"
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>JSON</p>
                  <p className="text-muted-foreground text-xs">
                    Save for later editing
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {}}
                className="flex items-center gap-x-2"
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>PNG</p>
                  <p className="text-muted-foreground text-xs">
                    Best for sharing on the web
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {}}
                className="flex items-center gap-x-2"
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>JPG</p>
                  <p className="text-muted-foreground text-xs">
                    Best for printing...
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {}}
                className="flex items-center gap-x-2"
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>SVG</p>
                  <p className="text-muted-foreground text-xs">
                    Best for editing in vector software
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* TODO: Add user button */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

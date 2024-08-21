"use client";

import { fabric } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";
import useEditor from "../hooks/use-editor";
import { ActiveTool, selectDependentTool } from "../types";
import FillColorSidebar from "./fill-color-sidebar";
import Footer from "./footer";
import Navbar from "./navbar";
import ShapeSidebar from "./shapeSidebar";
import Sidebar from "./sidebar";
import StrokeColorSidebar from "./stroke-color-sidebar";
import Toolbar from "./toolbar";
import StrokeWidthSidebar from "./stroke-width-sidebar";

const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) {
        return setActiveTool("select");
      }

      if (tool === "draw") {
        // TODO: enable draw mode
      }
      if (activeTool === "draw") {
        // TODO: disable draw mode
      }

      setActiveTool(tool);
    },

    [activeTool]
  );

  const onClearSelection = useCallback(() => {
    if (selectDependentTool.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool]);

  const { init, editor } = useEditor({
    cleareSelectionCallback: onClearSelection,
  });

  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });

    return () => {
      canvas.dispose();
    };
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
      <div className="absolute h-[calc(100%-68px)] w-full flex top-[68px]">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        {/* ADDITIONAL SIDEBAR */}
        <ShapeSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        {/* Fill color SIDEBAR */}
        <FillColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        {/* Stroke color SIDEBAR */}
        <StrokeColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        {/* Stroke width SIDEBAR */}
        <StrokeWidthSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
            key={JSON.stringify(editor?.canvas.getActiveObject())}
          />
          <div
            className="flex-1 h-[calc(100%-128px)] bg-muted"
            ref={containerRef}
          >
            <canvas ref={canvasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Editor;

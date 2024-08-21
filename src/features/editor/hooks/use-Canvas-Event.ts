import { fabric } from "fabric";
import { useEffect } from "react";

interface useCanvasEventProps {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
  setSelectedObject: (objects: fabric.Object[]) => void;
  cleareSelectionCallback?: () => void;
}

const useCanvasEvent = ({
  canvas,
  container,
  setSelectedObject,
  cleareSelectionCallback,
}: useCanvasEventProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        setSelectedObject(e.selected || []);
      });
      canvas.on("selection:updated", (e) => {
        setSelectedObject(e.selected || []);
      });
      canvas.on("selection:cleared", (e) => {
        setSelectedObject([]);
        cleareSelectionCallback?.();
      });
    }

    return () => {
      if (canvas) {
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      }
    };
  }, [
    canvas,
    cleareSelectionCallback,
    setSelectedObject, // no need for this, this from useState()
  ]);
};

export default useCanvasEvent;

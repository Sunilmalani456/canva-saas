import { fabric } from "fabric";
import { useEffect } from "react";

interface useCanvasEventProps {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
  setSelectedObject: (objects: fabric.Object[]) => void;
}

const useCanvasEvent = ({
  canvas,
  container,
  setSelectedObject,
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
    setSelectedObject, // no need for this, this from useState()
  ]);
};

export default useCanvasEvent;

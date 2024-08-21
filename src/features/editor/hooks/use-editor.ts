import { isTextType } from "@/lib/utils";
import { fabric } from "fabric";
import { useCallback, useMemo, useState } from "react";
import {
  BuildEditorProps,
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  Editor,
  FILL_COLOR,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_DAHSED_ARRAY,
  STROKE_WIDTH,
  TRIANGLE_OPTIONS,
  useEditorHookProps,
} from "../types";
import { useAutoResize } from "./use-auto-resize";
import useCanvasEvent from "./use-Canvas-Event";

const buildEditor = ({
  canvas,
  fillColor,
  setFillColor,
  strokeColor,
  setStrokeColor,
  strokeWidth,
  setStrokeWidth,
  strokeDashedArray,
  setStrokeDashedArray,
  selectedObject,
}: BuildEditorProps): Editor => {
  const workSpace = () => {
    return canvas.getObjects().find((obj) => obj.name === "clip");
  };

  const center = (object: fabric.Object) => {
    const workspace = workSpace();
    const center = workspace?.getCenterPoint();

    // @ts-ignore
    canvas._centerObject(object, center);
  };

  const addToCanvas = (object: fabric.Object) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  return {
    // ---------Shapes Method----------
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashedArray,
      });

      addToCanvas(object);
      // center(object);
      // canvas.add(object);
      // canvas.setActiveObject(object);
    },
    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 25,
        ry: 25,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashedArray,
      });

      addToCanvas(object);
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 10,
        ry: 10,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashedArray,
      });
      addToCanvas(object);
    },
    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashedArray,
      });
      addToCanvas(object);
    },
    addInverseTriangle: () => {
      const HEIGHT = TRIANGLE_OPTIONS.height;
      const WIDTH = TRIANGLE_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          { x: 0, y: 0 },
          { x: WIDTH, y: 0 },
          { x: WIDTH / 2, y: HEIGHT },
        ],
        {
          ...TRIANGLE_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashedArray,
        }
      );

      addToCanvas(object);
    },
    addDiamond: () => {
      const HEIGHT = DIAMOND_OPTIONS.height;
      const WIDTH = DIAMOND_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        {
          ...DIAMOND_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashedArray,
        }
      );

      addToCanvas(object);
    },

    // -----Chnage_Stroke_Color, Chnage_Fill_Color, Chnage_Stroke_Width------
    changeFillColor: (value: string) => {
      setFillColor(value);

      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: value });
      });
      canvas.renderAll();
    },
    changeStrokeColor: (value: string) => {
      setStrokeColor(value);

      canvas.getActiveObjects().forEach((object) => {
        // Text type don't have stroke
        if (isTextType(object.type)) {
          object.set({ fill: value });
          return;
        }

        object.set({ stroke: value });
      });
      canvas.renderAll();
    },
    changeStrokeDahsedArray: (value: number[]) => {
      setStrokeDashedArray(value);

      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: value });
      });
      canvas.renderAll();
    },
    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);

      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: value });
      });
      canvas.renderAll();
    },

    // ----Complete Canvas, fillColor, strokeColor, strokeWidth-------
    canvas,
    getActiveFillColor: () => {
      const selectedFirstObject = selectedObject[0];

      if (!selectedFirstObject) {
        return fillColor;
      }

      const value = selectedFirstObject.get("fill") || fillColor;

      // Currently pattern and gradiant are not support
      return value as string;
    },
    getActiveStrokeColor: () => {
      const selectedFirstObject = selectedObject[0];

      if (!selectedFirstObject) {
        return strokeColor;
      }

      const value = selectedFirstObject.get("stroke") || strokeColor;

      return value;
    },
    getActiveStrokeDashedArray: () => {
      const selectedFirstObject = selectedObject[0];

      if (!selectedFirstObject) {
        return strokeDashedArray;
      }

      const value =
        selectedFirstObject.get("strokeDashArray") || strokeDashedArray;

      return value;
    },
    getActiveStrokeWidth: () => {
      const selectedFirstObject = selectedObject[0];

      if (!selectedFirstObject) {
        return strokeWidth;
      }

      const value = selectedFirstObject.get("strokeWidth") || strokeWidth;

      return value;
    },
    selectedObject,
  };
};

const useEditor = ({ cleareSelectionCallback }: useEditorHookProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObject, setSelectedObject] = useState<fabric.Object[]>([]);
  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
  const [strokeDashedArray, setStrokeDashedArray] =
    useState<number[]>(STROKE_DAHSED_ARRAY);

  // -------AUTO RESIZING HOOK-------
  useAutoResize({
    canvas,
    container,
  });

  // ----FOR CANVAS EVENTS -----
  useCanvasEvent({
    canvas,
    container,
    setSelectedObject,
    cleareSelectionCallback,
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        fillColor,
        setFillColor,
        strokeColor,
        setStrokeColor,
        strokeWidth,
        setStrokeWidth,
        strokeDashedArray,
        setStrokeDashedArray,
        selectedObject,
      });
    }

    return undefined;
  }, [
    canvas,
    fillColor,
    strokeColor,
    strokeWidth,
    selectedObject,
    strokeDashedArray,
  ]);

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      fabric.Object.prototype.set({
        cornerColor: "#FFF",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      });

      const initialWorkspace = new fabric.Rect({
        width: 900,
        height: 1200,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,0.8)",
          blur: 5,
        }),
      });

      initialCanvas.setWidth(initialContainer.offsetWidth);

      initialCanvas.setHeight(initialContainer.offsetHeight);

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);
    },

    []
  );

  return {
    init,
    editor,
  };
};

export default useEditor;

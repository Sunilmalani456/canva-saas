import React from "react";
import { ChromePicker, CirclePicker } from "react-color";
import { colors } from "../types";
import { rgbaObjectToString } from "@/lib/utils";

interface ColorPckerProps {
  value: string;
  onChange: (value: string) => void;
}

const ColorPcker = ({ value, onChange }: ColorPckerProps) => {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={(color) => {
          const formatedValur = rgbaObjectToString(color.rgb);
          onChange(formatedValur);
        }}
        className="border rounded-lg"
      />

      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={(color) => {
          const formatedValur = rgbaObjectToString(color.rgb);
          onChange(formatedValur);
        }}
      />
    </div>
  );
};

export default ColorPcker;

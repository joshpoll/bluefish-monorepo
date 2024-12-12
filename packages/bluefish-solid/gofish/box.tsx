import { Rect, withBluefish } from "../src";
import { createEffect, JSX, splitProps } from "solid-js";
import { createLinSysBBox, DIMS } from "./util/bbox";

export type BoxProps = Omit<JSX.RectSVGAttributes<SVGRectElement>, "x" | "y" | "width" | "height"> & {
  x?: number;
  cx?: number;
  x2?: number;
  dx?: number;
  y?: number;
  cy?: number;
  y2?: number;
  dy?: number;
  w?: number;
  s?: number;
  h?: number;
};

export const Box = withBluefish((props: BoxProps) => {
  const [_, rest] = splitProps(props, DIMS);

  const bbox = createLinSysBBox();

  createEffect(() => {
    for (const dim of DIMS) {
      bbox[dim] = props[dim];
    }
  });

  return <Rect {...rest} x={bbox.x} y={bbox.y} width={bbox.w} height={bbox.h} />;
});

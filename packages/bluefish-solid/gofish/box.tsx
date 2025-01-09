import { Rect, withBluefish } from "../src";
import { createEffect, JSX, splitProps } from "solid-js";
import { createLinSysBBox, DIMS } from "./util/bbox";
import { useSpace } from "./space";

// type Dimension = "x" | "y";
// type Suffix = "start" | "center" | "end" | "range";
// export type Dimensions = `${Dimension}-${Suffix}` | `${Dimension}-range/${Dimension}-range`;
// // "x-start"
// // "x-range/y-range"
// // "y-end"

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

  const space = useSpace();

  const center = () =>
    bbox.cx !== undefined && bbox.cy !== undefined ? space.transform([bbox.cx!, bbox.cy!]) : [undefined, undefined];

  return (
    <Rect
      {...rest}
      /* x={bbox.x}
      y={bbox.y} */ x={center()[0] !== undefined ? center()[0]! - bbox.w! / 2 : undefined}
      y={center()[1] !== undefined ? center()[1]! - bbox.h! / 2 : undefined}
      width={bbox.w}
      height={bbox.h}
    />
  );
});

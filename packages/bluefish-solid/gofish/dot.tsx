import { Circle, withBluefish } from "../src";
import { createEffect, JSX, splitProps } from "solid-js";
import { createLinSysBBox, DIMS } from "./util/bbox";

export type DotProps = Omit<JSX.CircleSVGAttributes<SVGCircleElement>, "cx" | "cy" | "r"> & {
  x?: number;
  cx?: number;
  x2?: number;
  y?: number;
  cy?: number;
  y2?: number;
  w?: number;
  s?: number;
  h?: number;
};

export const Dot = withBluefish((props: DotProps) => {
  const [_, rest] = splitProps(props, DIMS);

  const bbox = createLinSysBBox();

  createEffect(() => {
    for (const dim of DIMS) {
      bbox[dim] = props[dim];
    }
  });

  return <Circle {...rest} cx={bbox.x} cy={bbox.y} r={bbox.s! / 2} />;
});

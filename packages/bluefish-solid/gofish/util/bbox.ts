import { createMemo, untrack } from "solid-js";
import { maybeAdd, maybeDiv, maybeMax, maybeMin, maybeSub } from "./maybe";
import { createStore, produce } from "solid-js/store";

/* TODO: support aspect ratio */

export const HORIZONTAL_DIMS = ["x", "cx", "x2", "w"] as const;
export const VERTICAL_DIMS = ["y", "cy", "y2", "h"] as const;

export const DIMS = [...HORIZONTAL_DIMS, ...VERTICAL_DIMS] as const;
export type Dim = (typeof DIMS)[number];

export type Axis = "vertical" | "horizontal";

export type AxisSystem = { [key in Dim]?: [readonly [number, number], number] };

export const axisMap: { [key in Dim]: Axis } = {
  x: "horizontal",
  cx: "horizontal",
  x2: "horizontal",
  y: "vertical",
  cy: "vertical",
  y2: "vertical",
  w: "horizontal",
  h: "vertical",
};

export type BBox<T = number> = { [key in Dim]?: T };

export const from = (bboxes: BBox[]): BBox => {
  if (bboxes.length === 0)
    return {
      cx: 0,
      cy: 0,
      w: 0,
      h: 0,
    };

  const bboxesStructOfArray = {
    x: bboxes.map((bbox) => bbox.x),
    y: bboxes.map((bbox) => bbox.y),
    w: bboxes.map((bbox) => bbox.w),
    h: bboxes.map((bbox) => bbox.h),
  };

  const x = maybeMin(bboxesStructOfArray.x);

  const x2 = maybeMax(bboxesStructOfArray.x.map((x, i) => maybeAdd(x, bboxesStructOfArray.w[i])));

  const y = maybeMin(bboxesStructOfArray.y);

  const y2 = maybeMax(bboxesStructOfArray.y.map((y, i) => maybeAdd(y, bboxesStructOfArray.h[i])));

  const w = maybeSub(x2, x);
  const h = maybeSub(y2, y);

  const cx = maybeAdd(x, maybeDiv(w, 2));
  const cy = maybeAdd(y, maybeDiv(h, 2));

  return { cx, cy, w, h };
};

// The coefficients for the linear equations that define the bounding box dimensions in terms of
// center and size.
// For example, left = 1 * centerX - 0.5 * width, so its entry is [1, -0.5].
export const dimVecs = {
  horizontal: {
    x: [1, -0.5],
    x2: [1, 0.5],
    cx: [1, 0],
    w: [0, 1],
  },
  vertical: {
    y: [1, -0.5],
    y2: [1, 0.5],
    cy: [1, 0],
    h: [0, 1],
  },
} as const satisfies { [key in Axis]: { [key in Dim]?: [number, number] } };

// solve 2x2 system given two equations e1 and e2
export const solveSystem = (
  e1: [readonly [number, number], number],
  e2: [readonly [number, number], number]
): [number, number] => {
  const a = e1[0][0];
  const b = e1[0][1];
  const c = e1[1];
  const d = e2[0][0];
  const e = e2[0][1];
  const f = e2[1];

  const det = a * e - b * d;

  if (det === 0) {
    throw new Error("system is not solvable");
  }

  const center = (e * c - b * f) / det;
  const size = (a * f - c * d) / det;

  return [center, size];
};

// If eq = [a, b] and vec = [x, y], then this function computes: a * x + b * y
export const dot = (eq: readonly [number, number], vec: readonly [number, number]) => eq[0] * vec[0] + eq[1] * vec[1];

// If eq = [[a, b], c] and vec = [x, y], then this function checks: a * x + b * y = c
export const checkLinearEq = (
  eq: [readonly [number, number], number],
  vec: readonly [number, number],
  tolerance = 1e-6
): boolean => {
  const c = eq[1];
  return Math.abs(dot(eq[0], vec) - c) < tolerance;
};

// Solve a linear system of equations for some axis assuming it's isolated from the other axis
const solveAxisSystem = (equations: AxisSystem) => {
  const eqs = Object.values(equations);
  if (eqs.length < 2) return undefined;

  const [center, size] = solveSystem(eqs[0], eqs[1]);

  // Check additional equations
  for (const eq of eqs.slice(2)) {
    if (!checkLinearEq(eq, [center, size])) {
      throw new Error(`System is not solvable. Equations: ${JSON.stringify(eqs)}`);
    }
  }
  return [center, size] as [number, number];
};

/* 
Creates a linear system of equations representing the bounding box dimensions.

Dimensions along the x- and y-axes are defined using a 2x2 linear system for each axis. Two linear
equations are sufficient to define all the dimensions along a single axis. For example, once left
and right are specified, width and centerX can be inferred. The bounding box dimensions have three
behaviors depending on the number of equations specified:
- (<2): When fewer than two equations are specified, only the property set directly for that axis can be
        read.
- (=2): Once there are at least two equations, all the properties can be read. Properties that were
  not set directly are marked as "inferred," because they are not directly owned.
- (>2): If a user adds more equations, the system checks that the new equations are consistent with the
        existing ones.
*/
export const createLinSysBBox = (): BBox => {
  const [equations, setEquations] = createStore<{
    [key in Axis]: AxisSystem;
  }>({
    horizontal: {},
    vertical: {},
  });

  const centerXAndWidth = createMemo(() => solveAxisSystem(equations.horizontal));
  const centerYAndHeight = createMemo(() => solveAxisSystem(equations.vertical));

  const bbox = {};

  for (const dim of DIMS) {
    const axis = axisMap[dim];
    const centerAndSize = axis === "horizontal" ? () => centerXAndWidth() : () => centerYAndHeight();

    Object.defineProperty(bbox, dim, {
      get: function () {
        if (dim in equations[axis]) {
          return equations[axis][dim]![1];
        }
        // @ts-expect-error dimVecs type needs refinement
        return centerAndSize() ? dot(centerAndSize(), dimVecs[axis][dim]) : undefined;
      },
      set: function (value: number | undefined) {
        if (value === undefined) {
          setEquations(
            axis,
            produce((dims) => {
              delete dims[dim];
            })
          );
        } else {
          // @ts-expect-error dimVecs type needs refinement
          setEquations(axis, dim, [dimVecs[axis][dim], value]);
        }
      },
      enumerable: true,
      configurable: true,
    });
  }

  return bbox;
};

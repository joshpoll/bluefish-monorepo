import { For, JSX, ParentProps, Show } from "solid-js";
import { Id, Layout, withBluefish } from "../src";
import { BBox, ChildNode, Transform } from "../src/scenegraph";
import { from } from "../src/util/bbox";

// Add these new types
type Point = [number, number];
type LineSegment = {
  type: "line";
  points: [Point, Point];
};
type BezierCurve = {
  type: "bezier";
  start: Point;
  control1: Point;
  control2: Point;
  end: Point;
};
type PathSegment = LineSegment | BezierCurve;

export type LinkProps = ParentProps<{
  name: Id;
  direction: "horizontal" | "vertical";
  interpolation?: "linear" | "bezier";
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
}>;

// Connects a list of boxes with intervals between them
// If interpolation is not specified, it will default to linear
export const Link = withBluefish(
  (props: LinkProps) => {
    const layout = (childIds: ChildNode[]) => {
      childIds = Array.from(childIds);

      // Create an array of bbox pairs [[b0, b1], [b1, b2], ...]
      const bboxPairs = childIds.reduce(
        (acc, id, index) => {
          if (index < childIds.length - 1) {
            acc.push([id, childIds[index + 1]]);
          }
          return acc;
        },
        [] as [ChildNode, ChildNode][]
      );

      // Update the intervals type
      const segments: PathSegment[][] = [];

      if (props.direction === "horizontal") {
        if (props.interpolation === "linear" || props.interpolation === undefined) {
          for (const [b0, b1] of bboxPairs) {
            segments.push([
              {
                type: "line",
                points: [
                  [b0.bbox.right!, b0.bbox.top!],
                  [b1.bbox.left!, b1.bbox.top!],
                ],
              },
              {
                type: "line",
                points: [
                  [b1.bbox.left!, b1.bbox.top!],
                  [b1.bbox.left!, b1.bbox.bottom!],
                ],
              },
              {
                type: "line",
                points: [
                  [b0.bbox.left!, b0.bbox.bottom!],
                  [b0.bbox.right!, b0.bbox.bottom!],
                ],
              },
            ]);
          }
        } else if (props.interpolation === "bezier") {
          for (const [b0, b1] of bboxPairs) {
            const midX = (b0.bbox.right! + b1.bbox.left!) / 2;
            segments.push([
              {
                type: "bezier",
                start: [b0.bbox.right!, b0.bbox.top!],
                control1: [midX, b0.bbox.top!],
                control2: [midX, b1.bbox.top!],
                end: [b1.bbox.left!, b1.bbox.top!],
              },
              {
                type: "line",
                points: [
                  [b1.bbox.left!, b1.bbox.top!],
                  [b1.bbox.left!, b1.bbox.bottom!],
                ],
              },
              {
                type: "bezier",
                start: [b1.bbox.left!, b1.bbox.bottom!],
                control1: [midX, b1.bbox.bottom!],
                control2: [midX, b0.bbox.bottom!],
                end: [b0.bbox.right!, b0.bbox.bottom!],
              },
              {
                type: "line",
                points: [
                  [b0.bbox.right!, b0.bbox.bottom!],
                  [b0.bbox.right!, b0.bbox.top!],
                ],
              },
            ]);
          }
        }
      } else {
        if (props.interpolation === "linear" || props.interpolation === undefined) {
          for (const [b0, b1] of bboxPairs) {
            segments.push([
              {
                type: "line",
                points: [
                  [b0.bbox.left!, b0.bbox.bottom!],
                  [b1.bbox.left!, b1.bbox.top!],
                ],
              },
              {
                type: "line",
                points: [
                  [b1.bbox.left!, b1.bbox.top!],
                  [b1.bbox.right!, b1.bbox.top!],
                ],
              },
              {
                type: "line",
                points: [
                  [b1.bbox.right!, b1.bbox.top!],
                  [b0.bbox.right!, b0.bbox.bottom!],
                ],
              },
            ]);
          }
        } else if (props.interpolation === "bezier") {
          for (const [b0, b1] of bboxPairs) {
            const midY = (b0.bbox.bottom! + b1.bbox.top!) / 2;
            segments.push([
              {
                type: "bezier",
                start: [b0.bbox.left!, b0.bbox.bottom!],
                control1: [b0.bbox.left!, midY],
                control2: [b1.bbox.left!, midY],
                end: [b1.bbox.left!, b1.bbox.top!],
              },
              {
                type: "line",
                points: [
                  [b1.bbox.left!, b1.bbox.top!],
                  [b1.bbox.right!, b1.bbox.top!],
                ],
              },
              {
                type: "bezier",
                start: [b1.bbox.right!, b1.bbox.top!],
                control1: [b1.bbox.right!, midY],
                control2: [b0.bbox.right!, midY],
                end: [b0.bbox.right!, b0.bbox.bottom!],
              },
              {
                type: "line",
                points: [
                  [b0.bbox.right!, b0.bbox.bottom!],
                  [b0.bbox.left!, b0.bbox.bottom!],
                ],
              },
            ]);
          }
        }
      }

      return {
        transform: { translate: { x: undefined, y: undefined } },
        bbox: from(childIds.map((id) => id.bbox)),
        customData: { segments },
      };
    };

    const paint = (paintProps: { bbox: BBox; transform: Transform; children: JSX.Element; customData?: any }) => {
      const segmentToPath = (segment: PathSegment) => {
        if (segment.type === "line") {
          const [[x1, y1], [x2, y2]] = segment.points;
          return `L${x2},${y2}`;
        } else {
          const { control1, control2, end } = segment;
          return `C${control1[0]},${control1[1]} ${control2[0]},${control2[1]} ${end[0]},${end[1]}`;
        }
      };

      return (
        <Show when={paintProps.customData} fallback={<g>{paintProps.children}</g>}>
          <g
            transform={`translate(${paintProps.transform.translate.x ?? 0}, ${paintProps.transform.translate.y ?? 0})`}
          >
            <For each={paintProps.customData.segments}>
              {(pathSegments) => {
                const firstSegment = pathSegments[0];
                const startPoint = firstSegment.type === "line" ? firstSegment.points[0] : firstSegment.start;
                const d = `M${startPoint[0]},${startPoint[1]} ${pathSegments.map(segmentToPath).join(" ")} Z`;
                return (
                  <path
                    d={d}
                    fill={props.fill ?? "none"}
                    stroke={props.stroke ?? "black"}
                    stroke-width={props.strokeWidth ?? 0}
                    opacity={props.opacity ?? 1}
                  />
                );
              }}
            </For>
          </g>
        </Show>
      );
    };

    return (
      <Layout name={props.name} layout={layout} paint={paint}>
        {props.children}
      </Layout>
    );
  },
  { displayName: "Link" }
);

/* A coordinate chart a la topology and a convenient overloading of terms. (Though statistical
charts and topological charts share an etymology from cartography so it all works out in the end...) */
export type Space<
  Domain /*  extends Record<string, unknown> | number[] */ = [number, number],
  Range /* extends Record<string, unknown> | number[] */ = [number, number],
> = {
  transform: (domain: Domain) => Range;
  // ensures that the bounds are an array of tuples with the same length as the domain
  bounds: { [K in keyof Domain]: [number, number] };
};

export type Space1D = Space<[number], [number]>;
export type Space2D = Space<[number, number], [number, number]>;
export type SpaceColor = Space<[number, number, number], [number, number, number]>;

export const IdentitySpace: Space = {
  transform: (domain) => domain,
  /* TODO: maybe the bounds should be undefined? */
  bounds: [
    [0, 1],
    [0, 1],
  ],
};

/* linear transform of domain into range */
export const LinearSpace = (props: {
  domain: [number, number];
  range: [number, number];
}): Space<[number], [number]> => {
  return {
    transform: ([x]): [number] => {
      const [domainStart, domainEnd] = props.domain;
      const [rangeStart, rangeEnd] = props.range;
      return [rangeStart + ((x - domainStart) * (rangeEnd - rangeStart)) / (domainEnd - domainStart)];
    },
    bounds: [props.domain],
  };
};

export const LinearSpace2D = (props: {
  domain: [[number, number], [number, number]];
  range: [[number, number], [number, number]];
}): Space<[number, number], [number, number]> => {
  return {
    transform: ([x, y]): [number, number] => {
      const [xDomainStart, xDomainEnd] = props.domain[0];
      const [yDomainStart, yDomainEnd] = props.domain[1];
      const [xRangeStart, xRangeEnd] = props.range[0];
      const [yRangeStart, yRangeEnd] = props.range[1];

      return [
        xRangeStart + ((x - xDomainStart) * (xRangeEnd - xRangeStart)) / (xDomainEnd - xDomainStart),
        yRangeStart + ((y - yDomainStart) * (yRangeEnd - yRangeStart)) / (yDomainEnd - yDomainStart),
      ];
    },
    bounds: props.domain,
  };
};

export const PolarSpace = (props: {
  domain: [[number, number], [number, number]];
  range: [[number, number], [number, number]];
}): Space<[number, number], [number, number]> => {
  return {
    transform: ([r, theta]): [number, number] => [r * Math.cos(theta), r * Math.sin(theta)],
    bounds: props.domain,
  };
};

import { ParentProps, createContext, useContext } from "solid-js";

export type SpaceContextValue = {
  space: Space;
};

export const SpaceContext = createContext<SpaceContextValue>();

export function SpaceProvider(props: ParentProps<{ space: Space }>) {
  return <SpaceContext.Provider value={{ space: props.space }}>{props.children}</SpaceContext.Provider>;
}

export function useSpace() {
  const context = useContext(SpaceContext);
  if (!context) {
    // throw new Error("useChart must be used within a ChartProvider");
    return IdentitySpace;
  }
  return context.space;
}

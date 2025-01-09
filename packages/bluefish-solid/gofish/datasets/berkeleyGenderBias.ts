/* An illustration of Simpson's paradox. */

export type DepartmentData = {
  [key: string]: { [key in "all" | "men" | "women"]: { applicants: number; admittedPct: number } };
};

export const departmentData: DepartmentData = {
  A: {
    all: { applicants: 933, admittedPct: 64 },
    men: { applicants: 825, admittedPct: 62 },
    women: { applicants: 108, admittedPct: 82 },
  },
  B: {
    all: { applicants: 585, admittedPct: 63 },
    men: { applicants: 560, admittedPct: 63 },
    women: { applicants: 25, admittedPct: 68 },
  },
  C: {
    all: { applicants: 918, admittedPct: 35 },
    men: { applicants: 325, admittedPct: 37 },
    women: { applicants: 593, admittedPct: 34 },
  },
  D: {
    all: { applicants: 792, admittedPct: 34 },
    men: { applicants: 417, admittedPct: 33 },
    women: { applicants: 375, admittedPct: 35 },
  },
  E: {
    all: { applicants: 584, admittedPct: 25 },
    men: { applicants: 191, admittedPct: 28 },
    women: { applicants: 393, admittedPct: 24 },
  },
  F: {
    all: { applicants: 714, admittedPct: 6 },
    men: { applicants: 373, admittedPct: 36 },
    women: { applicants: 341, admittedPct: 17 },
  },
  Total: {
    all: { applicants: 4526, admittedPct: 39 },
    men: { applicants: 2691, admittedPct: 45 },
    women: { applicants: 1835, admittedPct: 30 },
  },
};

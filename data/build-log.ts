export type BuildLogEntry = {
  date: string;
  project: "Agreement Platform" | "Aariya" | "Portfolio";
  change: string;
  type: "feature" | "improvement" | "experiment" | "fix";
};

export const buildLog: BuildLogEntry[] = [
  {
    date: "2026-10-10",
    project: "Portfolio",
    change: "Improved mobile responsiveness across components",
    type: "improvement",
  },
  {
    date: "2026-10-09",
    project: "Portfolio",
    change: "Built interactive architecture explorer for case studies",
    type: "feature",
  },
  {
    date: "2026-10-08",
    project: "Portfolio",
    change: "Added project case-study pages with deep sections",
    type: "feature",
  },
  {
    date: "2026-10-07",
    project: "Agreement Platform",
    change: "Exploring agreement lifecycle and lawyer approval workflow",
    type: "experiment",
  },
  {
    date: "2026-10-06",
    project: "Aariya",
    change: "Iterating on voice pipeline state modelling",
    type: "experiment",
  },
  {
    date: "2026-10-05",
    project: "Aariya",
    change: "Designing real-time streaming boundaries between components",
    type: "experiment",
  },
  {
    date: "2026-10-04",
    project: "Agreement Platform",
    change: "Refining data model for versioned agreements",
    type: "improvement",
  },
];

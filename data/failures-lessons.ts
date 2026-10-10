export const failuresLessons = [
  {
    experiment: "Over-coupling voice and reasoning",
    problem: "Tight coupling caused latency to bleed into conversation flow.",
    change: "Separated into independent pipelines with clear contracts.",
    lesson: "Boundaries are more important than cleverness for real-time systems.",
  },
  {
    experiment: "Premature optimization",
    problem: "Optimizing too early obscured the actual data flow.",
    change: "Built a simple working model first, then measured and refined.",
    lesson: "Measure after making it work, not before.",
  },
  {
    experiment: "Feature creep in UI",
    problem: "Adding too many effects made interactions confusing on mobile.",
    change: "Prioritized clarity and touch-friendly interactions.",
    lesson: "Simplicity scales better across devices.",
  },
];

export type TimelineEntry = {
  year: string;
  title: string;
  items: string[];
};

export const journey: TimelineEntry[] = [
  {
    year: "2024",
    title: "Started exploring software development",
    items: [
      "Fundamentals: Java, C#, PHP, MySQL",
      "Networking coursework (Cisco)",
      "First steps with version control",
    ],
  },
  {
    year: "2025",
    title: "Full-stack development",
    items: [
      "Backend systems and REST APIs",
      "React frontends and database design",
      "First AI experiments — LLM applications",
    ],
  },
  {
    year: "2026",
    title: "Building real systems",
    items: [
      "Agreement Platform — contract lifecycle SaaS",
      "Aariya — real-time AI companion",
      "Voice systems and streaming architecture",
      "System architecture as a discipline",
    ],
  },
];

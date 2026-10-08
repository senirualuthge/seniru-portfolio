export type SkillGroup = {
  category: string;
  items: { name: string; usedFor: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "FRONTEND",
    items: [
      { name: "React", usedFor: "Frontend architecture, interactive interfaces, project development" },
      { name: "Three.js", usedFor: "3D interfaces — the Aariya web client" },
      { name: "Flutter", usedFor: "Cross-platform mobile client for Aariya" },
      { name: "JavaScript", usedFor: "Every web surface I ship" },
    ],
  },
  {
    category: "BACKEND",
    items: [
      { name: "Node.js", usedFor: "Agreement Platform backend and business logic" },
      { name: "FastAPI", usedFor: "Python backend for the Aariya AI system" },
      { name: "REST APIs", usedFor: "Service boundaries and integration" },
      { name: "WebSockets", usedFor: "Real-time streaming to web and mobile clients" },
      { name: "Authentication", usedFor: "Sessions, identity and protected routes" },
      { name: "RBAC", usedFor: "Party-specific, role-based access control" },
    ],
  },
  {
    category: "DATABASE",
    items: [
      { name: "PostgreSQL", usedFor: "Relational data — agreements, versions, users" },
      { name: "MySQL", usedFor: "Coursework and relational modelling practice" },
      { name: "Redis", usedFor: "Caching and conversational context for Aariya" },
    ],
  },
  {
    category: "AI",
    items: [
      { name: "LLM Systems", usedFor: "Conversational AI applications" },
      { name: "Agent Architecture", usedFor: "Designing agents with state and tools" },
      { name: "Speech Recognition", usedFor: "Voice input in Aariya" },
      { name: "Text-to-Speech", usedFor: "Natural voice output with performance planning" },
      { name: "Streaming", usedFor: "Token- and audio-streamed responses" },
    ],
  },
  {
    category: "LANGUAGES",
    items: [
      { name: "Python", usedFor: "AI systems and backends" },
      { name: "Java", usedFor: "Coursework and OOP fundamentals" },
      { name: "JavaScript", usedFor: "Full-stack web development" },
      { name: "C#", usedFor: "Programming fundamentals" },
      { name: "PHP", usedFor: "Server-side coursework" },
      { name: "Dart", usedFor: "Flutter mobile development" },
      { name: "SQL", usedFor: "Querying and database design" },
    ],
  },
  {
    category: "TOOLS",
    items: [
      { name: "Git", usedFor: "Version control on every project" },
      { name: "GitHub", usedFor: "Hosting, collaboration and history" },
      { name: "Docker", usedFor: "Packaging services consistently" },
      { name: "Linux", usedFor: "Development environment" },
    ],
  },
];

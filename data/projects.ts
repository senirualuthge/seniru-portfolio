export type TabId = "overview" | "architecture" | "workflow" | "security" | "stack";

export const agreementLifecycle = [
  "CREATE",
  "REVIEW",
  "NEGOTIATE",
  "APPROVE",
  "SIGN",
  "MANAGE",
] as const;

export const agreementTabs: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "workflow", label: "Workflow" },
  { id: "security", label: "Security" },
  { id: "stack", label: "Tech Stack" },
];

export const agreementOverview = {
  description:
    "A full-stack agreement management platform covering the complete business agreement lifecycle — from creation to renewal and termination.",
  points: [
    "Seven-stage agreement lifecycle: creation, negotiation, approval, signing, activation, renewal, termination",
    "Clause-level change tracking, versioning and comparison so negotiation stays traceable",
    "Approval and digital signing workflows backed by a complete agreement history",
    "Notifications and reminders so renewals and deadlines are never missed",
  ],
};

export type ArchNode = {
  id: string;
  label: string;
  col: number;
  row: number;
  accent?: boolean;
};

/** Columns: 0 = left branch, 1 = center spine, 2 = right branch */
export const agreementArchitecture: ArchNode[] = [
  { id: "frontend", label: "Frontend", col: 1, row: 0 },
  { id: "api", label: "API Layer", col: 1, row: 1, accent: true },
  { id: "engine", label: "Agreement Engine", col: 0, row: 2 },
  { id: "auth", label: "Auth System", col: 2, row: 2 },
  { id: "db", label: "Database", col: 0, row: 3 },
  { id: "audit", label: "Audit History", col: 2, row: 3 },
];

export const agreementWorkflow = [
  { step: "CREATE", detail: "Draft the agreement, attach clauses and counterparties." },
  { step: "REVIEW", detail: "Internal review before anything leaves the organisation." },
  { step: "LAWYER EDIT", detail: "Clause-level edits with tracked changes and versions." },
  { step: "PARTY APPROVAL", detail: "Role-based approval inside the originating party." },
  { step: "COUNTERPARTY REVIEW", detail: "The other party reviews, redlines and responds." },
  { step: "SIGN", detail: "Digital signing with a permanent, ordered history." },
  { step: "ACTIVE", detail: "Live agreement with renewals, deadlines and reminders." },
];

export const agreementSecurity = [
  { title: "Party-specific access control", detail: "Each party in a multi-party agreement only sees its own data." },
  { title: "Role-based permissions", detail: "Different roles inside a party see different actions and views." },
  { title: "Traceable negotiation", detail: "Every clause change is versioned, comparable and attributable." },
  { title: "Complete agreement history", detail: "Approvals and signatures are recorded as an ordered audit trail." },
];

export const agreementStack = [
  "Node.js",
  "JavaScript",
  "REST APIs",
  "Authentication",
  "Role-Based Access Control",
  "Database Design",
  "Agreement Lifecycle Modeling",
];

export const aariyaBranches = [
  {
    id: "voice",
    label: "VOICE",
    sub: "Real-time interaction",
    pipeline: [
      "Speech Recognition",
      "Conversation Understanding",
      "Internal State",
      "Voice Director",
      "Performance Plan",
      "TTS",
      "Streaming Audio",
    ],
  },
  {
    id: "memory",
    label: "MEMORY",
    sub: "Context & continuity",
    pipeline: [
      "Conversational Context",
      "Session Store",
      "Cross-device Sync",
      "Redis Cache",
      "Long-term Memory",
    ],
  },
  {
    id: "ai",
    label: "AI",
    sub: "Reasoning",
    pipeline: [
      "Prompt Assembly",
      "Context Window",
      "LLM Reasoning",
      "Streaming Response",
      "Client Render",
    ],
  },
] as const;

export const aariyaStack = [
  "Python",
  "FastAPI",
  "React",
  "Three.js",
  "Flutter",
  "WebSockets",
  "Redis",
  "PostgreSQL",
];

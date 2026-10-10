export const thinkingProcess = [
  { id: "problem", label: "PROBLEM", detail: "Identify the core problem, not just the symptom. Clarify constraints, users, and success criteria." },
  { id: "understand", label: "UNDERSTAND", detail: "Dig into context. Map existing systems, edge cases, and what needs to be preserved." },
  { id: "research", label: "RESEARCH", detail: "Find patterns, trade-offs, and prior art. Evaluate proven approaches before inventing." },
  { id: "design", label: "DESIGN", detail: "Model data, flows, and boundaries. Design for clarity, testability, and evolution." },
  { id: "build", label: "BUILD", detail: "Implement incrementally in small vertical slices. Keep changes focused and verifiable." },
  { id: "test", label: "TEST", detail: "Validate behavior, edge cases, and regressions. Prefer automated checks where practical." },
  { id: "iterate", label: "ITERATE", detail: "Learn from feedback, refine, and simplify. Remove complexity that doesn't earn its keep." },
];

export const thinkingExamples = [
  {
    project: "Agreement Platform",
    title: "Designing the lawyer approval workflow",
    problem: "Need controlled legal review without breaking collaboration between parties.",
    approach: "Modelled approvals as versioned events with explicit roles, immutable audit trail, and clear state transitions.",
    outcome: "Separation of concerns between drafting, review, approval and signing with deterministic state machine.",
  },
  {
    project: "Aariya",
    title: "Separating reasoning from voice performance",
    problem: "Real-time voice shouldn't block reasoning or leak latency into conversation feel.",
    approach: "Split into independent pipelines (understanding, state, voice director, TTS) with streaming boundaries.",
    outcome: "Latency-aware design where voice direction reacts to internal state without coupling to generation.",
  },
  {
    project: "Portfolio",
    title: "Proof over claims",
    problem: "Show engineering thinking without inventing experience or metrics.",
    approach: "Make architecture explorable, case studies data-driven, and status honest.",
    outcome: "Interactive documentation-like experience backed by concrete implementation.",
  },
];

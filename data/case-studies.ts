/**
 * Structured case-study content model.
 *
 * Every section on /projects/[slug] is generated from this data — the pages
 * are views over this model, not hand-written markup. Only claim what is
 * actually true of the projects: statuses are honest, no invented metrics.
 */

export type FlowStep = { title: string; detail: string };
export type InfoCard = { title: string; detail: string };

export type Decision = {
  id: string;
  question: string;
  context: string;
  options: { name: string; note: string }[];
  chosen: string;
  reasoning: string;
  tradeoffs: string;
  status: "Current" | "Revisited";
};

export type ArchNodeDef = {
  id: string;
  label: string;
  /** 0-based grid position — columns spread evenly across the canvas */
  col: number;
  row: number;
  accent?: boolean;
  summary: string;
  responsibilities: string[];
  tech: string[];
  /** ids of nodes this node connects to (drawn as connectors) */
  connectsTo: string[];
};

type SectionBase = { id: string; title: string; intro?: string };

export type Section =
  | (SectionBase & { kind: "prose"; paragraphs: string[]; bullets?: string[] })
  | (SectionBase & { kind: "cards"; cards: InfoCard[] })
  | (SectionBase & { kind: "flow"; steps: FlowStep[] })
  | (SectionBase & { kind: "architecture"; nodes: ArchNodeDef[] })
  | (SectionBase & { kind: "decisions"; decisions: Decision[] });

export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  intro: string;
  /** short, factual — used for page metadata */
  summary: string;
  statusChips: { label: string; tone: "neutral" | "accent" | "success" }[];
  stack: string[];
  accent: "violet" | "cyan";
  sections: Section[];
  next: { slug: string; title: string };
};

export const caseStudies: Record<string, CaseStudy> = {
  "agreement-platform": {
    slug: "agreement-platform",
    index: "01",
    title: "Agreement Platform",
    subtitle: "Business agreement lifecycle platform",
    intro:
      "A full-stack platform that takes a business agreement from first draft through legal review, negotiation, signing, activation and renewal — with every change versioned and attributable.",
    summary:
      "Case study: a full-stack agreement lifecycle platform covering drafting, lawyer review, negotiation, signing, activation and renewal with clause-level versioning and party-scoped access control.",
    statusChips: [
      { label: "ONGOING", tone: "neutral" },
      { label: "IN DEVELOPMENT", tone: "success" },
    ],
    stack: ["Node.js", "JavaScript", "REST APIs", "RBAC", "Database Design"],
    accent: "violet",
    next: { slug: "aariya", title: "Aariya" },
    sections: [
      {
        id: "overview",
        title: "Overview",
        kind: "prose",
        paragraphs: [
          "Business agreements are usually managed across email threads, disconnected documents and manual signing. Nobody has a single reliable answer to questions like: which version is current, who approved what, and when does this agreement renew?",
          "This platform replaces that with one system: a structured agreement that moves through a defined lifecycle, where every clause edit creates a version, every approval is recorded, and every party only sees what they are entitled to see.",
        ],
        bullets: [
          "Create → review → negotiate → approve → sign → manage, as one traceable lifecycle",
          "Clause-level change tracking so negotiation history is never lost",
          "Party-scoped access: each organisation only sees its own data",
          "Approvals, signatures and renewals recorded as an ordered audit history",
        ],
      },
      {
        id: "problem",
        title: "The Problem",
        kind: "cards",
        intro:
          "What agreement handling looks like without a system built for it:",
        cards: [
          {
            title: "Version confusion",
            detail:
              "Edits live in separate document copies. Nobody is sure which copy is the current one, and comparing versions is manual.",
          },
          {
            title: "Invisible negotiation",
            detail:
              "Clause changes are discussed over email, detached from the document itself. The reasoning behind a change disappears.",
          },
          {
            title: "Broken access boundaries",
            detail:
              "Shared folders leak data. In multi-party agreements, one party can often see more of the other side's material than it should.",
          },
          {
            title: "Missed renewals & deadlines",
            detail:
              "Agreements expire quietly. Renewal windows, obligations and review dates depend on someone remembering.",
          },
        ],
      },
      {
        id: "goals",
        title: "Goals",
        kind: "cards",
        cards: [
          {
            title: "One source of truth",
            detail:
              "A single structured record per agreement — current state, history, parties and obligations.",
          },
          {
            title: "Traceable changes",
            detail:
              "Every clause edit produces a version that can be compared against what came before.",
          },
          {
            title: "Enforced boundaries",
            detail:
              "Access is scoped by party and role at the API layer, not just hidden in the interface.",
          },
          {
            title: "Lifecycle, not document",
            detail:
              "Model the whole path — negotiation, approval, signing, activation, renewal, termination — not just storage.",
          },
        ],
      },
      {
        id: "roles",
        title: "User Roles",
        kind: "cards",
        intro:
          "Roles determine what actions are even possible — the model is party-scoped first, role-scoped second.",
        cards: [
          {
            title: "Agreement Owner",
            detail:
              "Creates and manages the agreement inside their own organisation, sends it into review and negotiation.",
          },
          {
            title: "Internal Reviewer / Approver",
            detail:
              "Reviews the agreement before it leaves the party. Approves or rejects at defined points in the lifecycle.",
          },
          {
            title: "Lawyer (Legal Reviewer)",
            detail:
              "Makes clause-level edits with tracked changes. Legal edits become new versions that the representing party must confirm.",
          },
          {
            title: "Counterparty",
            detail:
              "Reviews, redlines and responds from the other side. Sees only their own party's view of the agreement.",
          },
          {
            title: "Signatory",
            detail:
              "Signs the finalised agreement. The signature is written into the permanent, ordered history.",
          },
        ],
      },
      {
        id: "lifecycle",
        title: "Agreement Lifecycle",
        kind: "flow",
        intro: "The full path an agreement travels:",
        steps: [
          {
            title: "Create",
            detail:
              "Draft the agreement with its clauses and counterparties.",
          },
          {
            title: "Review",
            detail: "Internal review before anything leaves the party.",
          },
          {
            title: "Lawyer Edit",
            detail:
              "Clause-level legal edits, each producing a new version with a visible diff.",
          },
          {
            title: "Party Confirmation",
            detail:
              "The representing party confirms or rejects each legal change.",
          },
          {
            title: "Counterparty Review",
            detail:
              "The other side reviews, redlines and responds.",
          },
          {
            title: "Approve",
            detail:
              "Required approvals are recorded per party and per role.",
          },
          {
            title: "Sign",
            detail:
              "Digital signing writes an immutable, ordered entry into history.",
          },
          {
            title: "Active",
            detail:
              "The agreement is live — with renewals, modifications and termination handled as further lifecycle transitions.",
          },
        ],
      },
      {
        id: "lawyer-workflow",
        title: "Lawyer Workflow",
        kind: "flow",
        intro:
          "The trickiest part of the lifecycle: legal edits must be traceable, confirmable by the right people, and only then visible to the other side.",
        steps: [
          {
            title: "Original clause",
            detail: "A clause exists in a known version of the agreement.",
          },
          {
            title: "Lawyer modification",
            detail:
              "The lawyer edits the clause — e.g. “payment due within 30 days” → “within 15 days”.",
          },
          {
            title: "New version created",
            detail:
              "The edit never overwrites. It produces a new version of the agreement.",
          },
          {
            title: "Diff generated",
            detail:
              "The change between versions is computed at clause level so it can be reviewed precisely.",
          },
          {
            title: "Representing party reviews",
            detail:
              "The party the lawyer acts for confirms or rejects the change — legal edits don't apply silently.",
          },
          {
            title: "Other side notified",
            detail:
              "Only after internal confirmation does the counterparty see and respond to the updated clause.",
          },
        ],
      },
      {
        id: "architecture",
        title: "Architecture",
        kind: "architecture",
        intro: "Click a component to inspect its responsibilities and connections.",
        nodes: [
          {
            id: "frontend",
            label: "Frontend",
            col: 1,
            row: 0,
            summary:
              "The interface where agreements are drafted, reviewed, compared and signed.",
            responsibilities: [
              "Drafting and editing agreements",
              "Rendering clause-level diffs",
              "Role-aware actions and views",
            ],
            tech: ["JavaScript", "SPA UI"],
            connectsTo: ["api"],
          },
          {
            id: "api",
            label: "API Layer",
            col: 1,
            row: 1,
            accent: true,
            summary:
              "The single entry point for all agreement operations — where authorisation is actually enforced.",
            responsibilities: [
              "Validating every request",
              "Enforcing party + role permissions",
              "Orchestrating lifecycle transitions",
            ],
            tech: ["Node.js", "REST"],
            connectsTo: ["engine", "auth"],
          },
          {
            id: "engine",
            label: "Agreement Engine",
            col: 0,
            row: 2,
            summary:
              "The domain core: lifecycle state, clause versioning and diff generation.",
            responsibilities: [
              "Lifecycle state machine",
              "Version creation on every change",
              "Clause-level comparison",
            ],
            tech: ["Node.js", "Domain logic"],
            connectsTo: ["db", "audit"],
          },
          {
            id: "auth",
            label: "Auth System",
            col: 2,
            row: 2,
            summary:
              "Identity, roles and party membership — the inputs to every access decision.",
            responsibilities: [
              "Authentication",
              "Role assignment per party",
              "Party membership boundaries",
            ],
            tech: ["Sessions / tokens", "RBAC"],
            connectsTo: ["db"],
          },
          {
            id: "db",
            label: "Database",
            col: 0,
            row: 3,
            summary:
              "Structured storage for agreements, versions, parties and users.",
            responsibilities: [
              "Agreements and clause versions",
              "Users, parties, roles",
              "Lifecycle and approval records",
            ],
            tech: ["Relational schema"],
            connectsTo: [],
          },
          {
            id: "audit",
            label: "Audit History",
            col: 2,
            row: 3,
            summary:
              "The permanent, ordered record of approvals, signatures and significant transitions.",
            responsibilities: [
              "Append-only event history",
              "Signature and approval records",
              "Full agreement timeline",
            ],
            tech: ["Append-only records"],
            connectsTo: [],
          },
        ],
      },
      {
        id: "database",
        title: "Database Design",
        kind: "cards",
        intro: "The core entities and what each one owns:",
        cards: [
          {
            title: "agreements",
            detail:
              "id · title · status · current_version · parties · created_by · timestamps",
          },
          {
            title: "versions",
            detail:
              "id · agreement_id · version_number · created_by · created_at — immutable once written",
          },
          {
            title: "clauses",
            detail:
              "id · version_id · clause_ref · content — clause-level rows make diffs precise",
          },
          {
            title: "parties & users",
            detail:
              "party membership and per-party roles — the basis of every access check",
          },
          {
            title: "approvals & signatures",
            detail:
              "who approved or signed what, in which version, in which order",
          },
          {
            title: "events (audit)",
            detail:
              "append-only lifecycle events powering history, notifications and reminders",
          },
        ],
      },
      {
        id: "security",
        title: "Access Control",
        kind: "cards",
        intro:
          "Authorisation is enforced at the API layer — the UI hiding a button is not a permission model.",
        cards: [
          {
            title: "Party-scoped access",
            detail:
              "In a multi-party agreement, each party sees only its own data. Not filtered in the UI — filtered at the query.",
          },
          {
            title: "Role-based permissions",
            detail:
              "Within a party, roles decide who can edit, approve, sign or only read.",
          },
          {
            title: "Traceable negotiation",
            detail:
              "Every clause change is versioned, comparable and attributable to a person.",
          },
          {
            title: "Complete history",
            detail:
              "Approvals and signatures are append-only — history cannot be quietly rewritten.",
          },
        ],
      },
      {
        id: "decisions",
        title: "Technical Decisions",
        kind: "decisions",
        intro:
          "A running log of the questions that shaped the system — with the trade-offs kept visible.",
        decisions: [
          {
            id: "001",
            question: "How should clause changes be stored?",
            context:
              "Negotiation means the same clause changes repeatedly. The system needs to answer “what changed, when, by whom, and what did it replace?”",
            options: [
              { name: "Overwrite in place", note: "Simplest schema, no history" },
              { name: "Full document copies", note: "Whole-agreement snapshots per edit" },
              { name: "Versioned clause rows", note: "Immutable versions, clauses attached per version" },
            ],
            chosen: "Versioned clause rows",
            reasoning:
              "Clause-level version rows make diffs precise and cheap, keep history immutable by construction, and avoid duplicating the entire document on every small edit.",
            tradeoffs:
              "More rows and joins than an overwrite model — reads that build the current agreement must resolve the latest version explicitly.",
            status: "Current",
          },
          {
            id: "002",
            question: "REST or GraphQL for the API?",
            context:
              "The frontend needs agreement overviews, detail views and lifecycle actions with different shapes.",
            options: [
              { name: "REST", note: "Resource endpoints, cache-friendly" },
              { name: "GraphQL", note: "Flexible queries, more infrastructure" },
              { name: "tRPC", note: "Typed end-to-end, couples front and back" },
            ],
            chosen: "REST",
            reasoning:
              "Agreement operations map cleanly to resources and state transitions. REST keeps every permission check on an explicit endpoint and stays simple to reason about and test.",
            tradeoffs:
              "The frontend may request more data than a view needs, or compose several endpoints for one screen.",
            status: "Current",
          },
          {
            id: "003",
            question: "Where is authorisation enforced?",
            context:
              "Party-scoped data means a leaked or guessed ID must never return another party's agreement.",
            options: [
              { name: "Client-side checks", note: "Hide actions in the UI" },
              { name: "Endpoint-level role checks", note: "Server checks role, not party" },
              { name: "Party + role at the API layer", note: "Every query scoped by membership" },
            ],
            chosen: "Party + role at the API layer",
            reasoning:
              "Access decisions belong where the data leaves. Scoping every query by party membership means an unauthorised ID simply resolves to nothing.",
            tradeoffs:
              "Every endpoint must remember the rule — it's a discipline the whole codebase has to follow, not a one-time switch.",
            status: "Current",
          },
          {
            id: "004",
            question: "How are legal edits applied?",
            context:
              "A lawyer's edit affects two organisations. Applying it directly would let one side silently change the deal.",
            options: [
              { name: "Apply immediately", note: "Fast, but one-sided" },
              { name: "Apply on both-side confirm", note: "Blocks internal review step" },
              { name: "Version + representing-party confirmation", note: "Edit becomes a proposal first" },
            ],
            chosen: "Version + representing-party confirmation",
            reasoning:
              "A legal edit creates a new version that the representing party confirms before the other side is notified — matching how negotiation actually works.",
            tradeoffs:
              "More lifecycle states to model and render than a direct-edit flow.",
            status: "Current",
          },
        ],
      },
      {
        id: "challenges",
        title: "Challenges",
        kind: "cards",
        cards: [
          {
            title: "Two-sided change semantics",
            detail:
              "A clause edit must be visible to its own party, hidden from the other side until confirmed, and then diffable for everyone. That ordering is the hard part.",
          },
          {
            title: "Version resolution",
            detail:
              "Every read has to answer “current version” correctly while writes keep producing new ones — without ever mutating history.",
          },
          {
            title: "Authorisation everywhere",
            detail:
              "Party scoping is a rule that every query must honour. Missing it in even one endpoint breaks the whole model.",
          },
          {
            title: "Lifecycle as a state machine",
            detail:
              "Renewal, modification and termination aren't special cases — they're transitions that must respect the same approval rules.",
          },
        ],
      },
      {
        id: "learned",
        title: "What I'm Learning",
        kind: "prose",
        paragraphs: [
          "This project is where domain modelling stopped being abstract. Modelling an agreement lifecycle forced me to make states explicit, decide what is immutable, and encode business rules as transitions instead of loose CRUD operations.",
          "It's also taught me that authorisation is a design decision, not a feature you add later — the party-scoped model shapes the schema, the API and the interface together.",
        ],
        bullets: [
          "Designing state machines for real business processes",
          "Schema design where history must be immutable",
          "Treating access control as a data-model concern",
          "Writing diffs that are precise enough to negotiate over",
        ],
      },
      {
        id: "status",
        title: "Current Status",
        kind: "prose",
        paragraphs: [
          "In active development. The core lifecycle, versioning and access-control model are defined and being implemented; the lawyer workflow and audit history are the current focus.",
          "Next up: renewal and modification flows, notification events driven from the audit log, and hardening the API against cross-party access edge cases.",
        ],
      },
    ],
  },

  aariya: {
    slug: "aariya",
    index: "02",
    title: "Aariya",
    subtitle: "Multi-surface AI companion",
    intro:
      "A conversational AI system built around natural interaction: a reasoning core, persistent context, a dedicated voice pipeline, and real-time communication across web and mobile.",
    summary:
      "Case study: a multi-surface AI companion — system architecture, AI core, conversation and context systems, a real-time voice pipeline, and mobile/real-time communication design.",
    statusChips: [
      { label: "ONGOING", tone: "neutral" },
      { label: "IN DEVELOPMENT", tone: "success" },
    ],
    stack: [
      "Python",
      "FastAPI",
      "React",
      "Three.js",
      "Flutter",
      "WebSockets",
      "Redis",
      "PostgreSQL",
    ],
    accent: "cyan",
    next: {
      slug: "agreement-platform",
      title: "Agreement Platform",
    },
    sections: [
      {
        id: "overview",
        title: "Overview",
        kind: "prose",
        paragraphs: [
          "Most chat interfaces feel like typing into a form. Aariya is an attempt at the opposite: a system where conversation, context and voice are first-class parts of the architecture rather than features bolted onto a text box.",
          "The project spans a reasoning core, a context and memory system, a voice pipeline that directs how things are spoken, and real-time transport that keeps web and mobile surfaces in sync.",
        ],
        bullets: [
          "Conversation and voice handled as separate, cooperating pipelines",
          "Persistent context and memory across sessions and devices",
          "Real-time communication over WebSockets",
          "Multi-surface: web client and mobile app over one backend",
        ],
      },
      {
        id: "concept",
        title: "Concept",
        kind: "cards",
        cards: [
          {
            title: "Companion, not command line",
            detail:
              "Interaction should feel conversational — the system maintains context instead of treating every message as isolated.",
          },
          {
            title: "Voice as a system",
            detail:
              "How something is said is produced by a pipeline (state → direction → prosody → synthesis), not selected from preset emotions.",
          },
          {
            title: "One core, many surfaces",
            detail:
              "Web and mobile are clients of the same backend — conversation state doesn't live inside one app.",
          },
        ],
      },
      {
        id: "architecture",
        title: "System Architecture",
        kind: "architecture",
        intro: "Click a component to inspect its responsibilities and connections.",
        nodes: [
          {
            id: "core",
            label: "Aariya Core",
            col: 1,
            row: 0,
            accent: true,
            summary:
              "The coordination layer: routes client sessions to conversation, voice and memory subsystems.",
            responsibilities: [
              "Session orchestration",
              "Routing between subsystems",
              "Surface-agnostic API",
            ],
            tech: ["Python", "FastAPI"],
            connectsTo: ["mobile", "realtime", "ai"],
          },
          {
            id: "mobile",
            label: "Mobile / Web",
            col: 0,
            row: 1,
            summary:
              "Client surfaces — a Flutter mobile app and a React web client over the same backend contract.",
            responsibilities: [
              "Conversation UI",
              "Audio capture and playback",
              "Live transport to the backend",
            ],
            tech: ["Flutter", "React", "Three.js"],
            connectsTo: ["realtime"],
          },
          {
            id: "realtime",
            label: "Real-Time Layer",
            col: 1,
            row: 1,
            summary:
              "WebSocket transport carrying conversation turns, streaming responses and voice events with low latency.",
            responsibilities: [
              "Streaming conversation turns",
              "Bidirectional audio events",
              "Cross-device session sync",
            ],
            tech: ["WebSockets", "FastAPI"],
            connectsTo: ["voice"],
          },
          {
            id: "ai",
            label: "AI Core",
            col: 2,
            row: 1,
            summary:
              "Prompt assembly, reasoning and streaming responses — the decision-maker of the system.",
            responsibilities: [
              "Context window assembly",
              "LLM reasoning",
              "Streaming responses",
            ],
            tech: ["LLM API", "Python"],
            connectsTo: ["voice", "memory"],
          },
          {
            id: "voice",
            label: "Voice Pipeline",
            col: 1,
            row: 2,
            summary:
              "Speech in, speech out: recognition → understanding → internal state → voice direction → synthesis.",
            responsibilities: [
              "Speech recognition",
              "State-driven voice direction",
              "Streaming TTS output",
            ],
            tech: ["STT", "TTS", "Prosody control"],
            connectsTo: [],
          },
          {
            id: "memory",
            label: "Memory / Context",
            col: 2,
            row: 2,
            summary:
              "Session context, cache and longer-term memory so conversation continues coherently.",
            responsibilities: [
              "Conversational context window",
              "Session store and cache",
              "Cross-device continuity",
            ],
            tech: ["Redis", "PostgreSQL"],
            connectsTo: [],
          },
        ],
      },
      {
        id: "ai-core",
        title: "AI Core",
        kind: "flow",
        intro: "How one turn of conversation flows through the reasoning side:",
        steps: [
          {
            title: "Prompt Assembly",
            detail:
              "System instructions, relevant context and recent conversation are composed into the request.",
          },
          {
            title: "Context Window",
            detail:
              "What the model sees is deliberately shaped — recency, relevance and standing context.",
          },
          {
            title: "LLM Reasoning",
            detail: "The model produces the response.",
          },
          {
            title: "Streaming Response",
            detail:
              "Tokens stream out as they're generated — the interface never waits for the full reply.",
          },
          {
            title: "Client Render",
            detail:
              "The stream is rendered live on whichever surface the conversation is happening on.",
          },
        ],
      },
      {
        id: "conversation",
        title: "Conversation System",
        kind: "cards",
        cards: [
          {
            title: "Turn-based, but continuous",
            detail:
              "Each turn is a request/response under the hood, while context makes the exchange feel continuous.",
          },
          {
            title: "Context is assembled, not dumped",
            detail:
              "The conversation system decides what enters the context window each turn instead of replaying everything.",
          },
          {
            title: "State influences behaviour",
            detail:
              "A computed internal state feeds both response behaviour and voice direction — conversation isn't stateless.",
          },
          {
            title: "Streaming end to end",
            detail:
              "From model to interface, responses arrive incrementally so latency stays perceived as conversation, not loading.",
          },
        ],
      },
      {
        id: "voice",
        title: "Voice System",
        kind: "flow",
        intro:
          "The pipeline that turns speech into understanding, and understanding back into speech that matches the moment:",
        steps: [
          {
            title: "Speech Recognition",
            detail: "Audio in → text.",
          },
          {
            title: "Conversation Understanding",
            detail: "The utterance enters the conversation system as a turn.",
          },
          {
            title: "Internal State",
            detail:
              "The system's computed state (energy, warmth, confidence…) updates from the exchange.",
          },
          {
            title: "Voice Director",
            detail:
              "State plus intent become delivery instructions — pace, pitch direction, emphasis.",
          },
          {
            title: "Performance Plan",
            detail:
              "Instructions become concrete synthesis parameters for this specific line.",
          },
          {
            title: "TTS",
            detail: "Text synthesised to speech under those parameters.",
          },
          {
            title: "Streaming Audio",
            detail:
              "Audio streams to the client while it's being produced — no waiting for the full clip.",
          },
        ],
      },
      {
        id: "realtime",
        title: "Real-Time Communication",
        kind: "cards",
        cards: [
          {
            title: "WebSocket transport",
            detail:
              "Conversation turns, streaming deltas and voice events flow over a persistent connection.",
          },
          {
            title: "Streaming in both directions",
            detail:
              "Responses stream to the client; audio events stream back — neither waits for the other to finish.",
          },
          {
            title: "Cross-device session sync",
            detail:
              "Context is shared through the backend, so a session isn't trapped inside one device's app.",
          },
          {
            title: "Stateless clients",
            detail:
              "Clients render and capture; the conversation itself lives server-side where all surfaces can reach it.",
          },
        ],
      },
      {
        id: "mobile",
        title: "Mobile Architecture",
        kind: "cards",
        cards: [
          {
            title: "Flutter client",
            detail:
              "One mobile codebase for both platforms, sharing the same backend contract as the web client.",
          },
          {
            title: "Audio-first interaction",
            detail:
              "Capture, playback and streaming audio are core paths, not add-ons to a chat screen.",
          },
          {
            title: "Thin client",
            detail:
              "The app renders state and streams input — conversation logic stays in the backend.",
          },
          {
            title: "Same core, same state",
            detail:
              "Mobile connects to the identical conversation and memory systems as web.",
          },
        ],
      },
      {
        id: "memory",
        title: "Memory / Context",
        kind: "flow",
        intro: "From the current moment to long-term continuity:",
        steps: [
          {
            title: "Conversational Context",
            detail: "The live window of the current conversation.",
          },
          {
            title: "Session Store",
            detail: "Session state kept server-side, reachable from any surface.",
          },
          {
            title: "Cross-device Sync",
            detail:
              "The same session state is served to web and mobile clients.",
          },
          {
            title: "Redis Cache",
            detail:
              "Hot context served from cache to keep turns fast.",
          },
          {
            title: "Long-term Memory",
            detail:
              "Durable facts and history persisted in PostgreSQL for continuity across sessions.",
          },
        ],
      },
      {
        id: "challenges",
        title: "Challenges",
        kind: "cards",
        cards: [
          {
            title: "Latency budget",
            detail:
              "Voice interaction punishes delay. Recognition, reasoning, direction and synthesis each eat into one budget.",
          },
          {
            title: "State that drives two things",
            detail:
              "The same internal state shapes text behaviour and voice delivery — and both must stay coherent turn to turn.",
          },
          {
            title: "Context selection",
            detail:
              "Deciding what enters the context window each turn is a system design problem, not a parameter.",
          },
          {
            title: "Streaming across subsystems",
            detail:
              "Model tokens, transport and audio chunks stream at different rates — keeping them aligned without buffering everything.",
          },
        ],
      },
      {
        id: "experiments",
        title: "Experiments",
        kind: "cards",
        intro:
          "Small, testable explorations feeding the main system — several live in the System Lab on the home page:",
        cards: [
          {
            title: "AI state simulator",
            detail:
              "Interactive sliders over conceptual state variables to see how state changes should surface.",
          },
          {
            title: "Voice visualizer",
            detail:
              "Canvas rendering of the voice pipeline as a moving signal — a model of the real data flow.",
          },
          {
            title: "Prosody direction",
            detail:
              "Exploring continuous delivery instructions from state, instead of discrete preset emotions.",
          },
        ],
      },
      {
        id: "learned",
        title: "What I'm Learning",
        kind: "prose",
        paragraphs: [
          "Aariya is teaching me to think in pipelines: separate systems with clear contracts that stream into each other, instead of one program doing everything at once.",
          "It's also a practical education in real-time design — where the interesting question is never “does it work?” but “how long until it feels alive?”",
        ],
        bullets: [
          "Designing streaming systems across process boundaries",
          "State modelling for behaviour, not just data",
          "Separating reasoning from presentation (voice as output layer)",
          "Keeping latency visible as a first-class constraint",
        ],
      },
      {
        id: "status",
        title: "Current Status",
        kind: "prose",
        paragraphs: [
          "In active development and exploration. The system architecture and pipelines above describe the design direction; components are being built and tested incrementally, with the voice and conversation systems as the current focus.",
          "Next up: tightening the real-time loop between state and voice, deepening context handling, and bringing the mobile surface onto the shared session model.",
        ],
      },
    ],
  },
};

export const caseStudyList: CaseStudy[] = Object.values(caseStudies);

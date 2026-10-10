import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume — Seniru Aluthge",
  description: "Resume of Seniru Aluthge, undergraduate developer exploring full-stack development and AI systems.",
};

export default function ResumePage() {
  return (
    <main className="relative mx-auto w-full max-w-4xl px-5 pb-24 pt-28 sm:pt-32">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-mono text-2xl tracking-[0.2em] text-primary sm:text-3xl">SENIRU ALUTHGE</h1>
          <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-secondary">Undergraduate Developer</p>
          <p className="mt-1 font-mono text-[11px] tracking-[0.15em] text-accent">Building Software + AI Systems</p>
        </div>
        <div className="flex flex-wrap gap-3 font-mono text-[11px] tracking-widest text-secondary">
          <a href="https://github.com/senirualuthge" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-accent hover:underline" data-cursor="link">
            GITHUB ↗
          </a>
          <a href="https://www.linkedin.com/in/seniru-aluthge-30bb33188" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-accent hover:underline" data-cursor="link">
            LINKEDIN ↗
          </a>
          <a href="mailto:seniru2004@gmail.com" className="underline-offset-4 hover:text-accent hover:underline" data-cursor="link">
            EMAIL
          </a>
        </div>
      </div>

      <section className="mb-10 rounded-xl border border-line bg-panel p-6 sm:p-8">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-secondary">
          <span className="text-accent">01</span>
          <span className="h-px w-8 bg-line" />
          <span>PROFILE</span>
        </div>
        <p className="mt-4 leading-relaxed text-secondary">
          Undergraduate developer interested in Full-Stack Development and AI Systems. I learn by building real things — an
          agreement management SaaS platform and Aariya, a multi-surface AI companion with real-time voice interaction.
        </p>
      </section>

      <section className="mb-10 rounded-xl border border-line bg-panel p-6 sm:p-8">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-secondary">
          <span className="text-accent">02</span>
          <span className="h-px w-8 bg-line" />
          <span>EDUCATION</span>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-primary">ICET, Sri Lanka</p>
            <p className="text-sm text-secondary">Software Development (Undergraduate)</p>
          </div>
          <p className="font-mono text-[11px] text-secondary">Ongoing</p>
        </div>
      </section>

      <section className="mb-10 rounded-xl border border-line bg-panel p-6 sm:p-8">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-secondary">
          <span className="text-accent">03</span>
          <span className="h-px w-8 bg-line" />
          <span>PROJECTS</span>
        </div>
        <div className="mt-6 space-y-6">
          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-sm tracking-[0.15em] text-primary">AGREEMENT PLATFORM</p>
              <p className="font-mono text-[11px] text-secondary">In Development</p>
            </div>
            <p className="mt-2 text-sm text-secondary">
              Full-stack agreement management platform covering lifecycle, versioning, roles, approvals and audit trail.
            </p>
            <p className="mt-2 font-mono text-[10px] tracking-widest text-secondary/70">
              Node.js · TypeScript · Database Design · Access Control · Audit
            </p>
          </div>
          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-sm tracking-[0.15em] text-primary">AARIYA</p>
              <p className="font-mono text-[11px] text-secondary">In Development</p>
            </div>
            <p className="mt-2 text-sm text-secondary">
              Multi-surface AI companion with real-time interaction, conversation pipeline, voice direction and context/memory.
            </p>
            <p className="mt-2 font-mono text-[10px] tracking-widest text-secondary/70">
              Python · FastAPI · React · Flutter · Real-time Systems · Voice
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10 rounded-xl border border-line bg-panel p-6 sm:p-8">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-secondary">
          <span className="text-accent">04</span>
          <span className="h-px w-8 bg-line" />
          <span>TECHNICAL FOCUS</span>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-primary">FULL-STACK</p>
            <p className="mt-2 text-sm text-secondary">
              Frontend, Backend, APIs, Databases, Auth, System Architecture
            </p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-primary">AI SYSTEMS</p>
            <p className="mt-2 text-sm text-secondary">
              Conversation systems, Real-time interaction, Voice, Context & Memory, Agent architecture
            </p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-primary">SYSTEM DESIGN</p>
            <p className="mt-2 text-sm text-secondary">
              Data modeling, Streaming, Real-time protocols, Workflows, Security & access control
            </p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-primary">CURRENTLY LEARNING</p>
            <p className="mt-2 text-sm text-secondary">
              Advanced AI systems, Full-stack architecture, Real-time systems, Voice interaction, System design, Cloud/deployment
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-line bg-panel p-6 sm:p-8">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-secondary">
          <span className="text-accent">05</span>
          <span className="h-px w-8 bg-line" />
          <span>LINKS</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 font-mono text-[11px] tracking-widest text-secondary">
          <Link href="/" className="underline-offset-4 hover:text-accent hover:underline" data-cursor="link">PORTFOLIO</Link>
          <a href="https://github.com/senirualuthge" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-accent hover:underline" data-cursor="link">GITHUB</a>
          <a href="https://www.linkedin.com/in/seniru-aluthge-30bb33188" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-accent hover:underline" data-cursor="link">LINKEDIN</a>
          <a href="mailto:seniru2004@gmail.com" className="underline-offset-4 hover:text-accent hover:underline" data-cursor="link">EMAIL</a>
        </div>
      </section>
    </main>
  );
}

# seniru-portfolio

Portfolio of **Seniru Aluthge** — undergraduate developer building software + AI systems.
The portfolio itself is treated as a project: dark technical UI, interactive system demos,
and a live GitHub integration.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

## Structure

```
app/                    page + layout (single scrolling page)
components/
  navigation/           fixed nav + full-screen menu
  hero/                 hero with mouse-reactive system map
  about/                interactive About with expandable aspects
  build/                "What I Build" tilt cards
  projects/             Agreement Platform (tabbed case study) + Aariya (node graph)
  lab/                  System Lab wrapper
  interactive/          Cursor, CommandPalette, SystemSimulator,
                        VoiceVisualizer, WorkflowSimulator
  skills/ timeline/ github/ building/ contact/
  ui/                   shared Section wrapper
data/                   projects, skills, timeline content
lib/                    github API client, utils
hooks/                  command palette + mouse position
```

## Features

- **⌘K command palette** — search and jump to any section
- **Custom cursor** — expands on links, shows "VIEW" on project cards
- **Agreement Platform case study** — Overview / Architecture / Workflow / Security / Tech Stack tabs
- **Aariya subsystem explorer** — click Voice / Memory / AI to inspect each pipeline
- **System Lab** — Aariya state simulator (sliders), canvas voice waveform,
  agreement workflow stepper
- **Live GitHub data** — profile stats and recent repos fetched client-side from
  `api.github.com` (no fabricated numbers; graceful fallback on rate limits)

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion

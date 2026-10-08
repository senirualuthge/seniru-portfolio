"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { fetchProfile, fetchRepos, type GhRepo, type GhUser } from "@/lib/github";

const USERNAME = "senirualuthge";

function Skeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded-lg border border-line bg-panel"
        />
      ))}
    </div>
  );
}

export default function GitHubSection() {
  const [user, setUser] = useState<GhUser | null>(null);
  const [repos, setRepos] = useState<GhRepo[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchProfile(USERNAME), fetchRepos(USERNAME, 4)])
      .then(([u, r]) => {
        if (cancelled) return;
        setUser(u);
        setRepos(r);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = [
    { label: "PUBLIC REPOS", value: user ? String(user.public_repos) : "—" },
    { label: "FOLLOWERS", value: user ? String(user.followers) : "—" },
    { label: "STARS EARNED", value: repos.length
        ? String(repos.reduce((sum, r) => sum + r.stargazers_count, 0))
        : "—" },
  ];

  return (
    <Section id="github" index="09" eyebrow="OPEN SOURCE" title="GitHub">
      <div className="rounded-xl border border-line bg-panel p-6 sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="view"
              className="font-mono text-2xl tracking-[0.15em] text-primary transition-colors hover:text-accent sm:text-3xl"
            >
              {USERNAME} ↗
            </a>
            <p className="mt-2 text-sm text-secondary">
              I learn by building — the proof lives here.
            </p>
          </div>
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="rounded border border-line px-5 py-3 text-center font-mono text-xs tracking-widest text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            VIEW GITHUB ↗
          </a>
        </div>

        <div className="mt-8">
          {status === "loading" && <Skeleton />}

          {status === "error" && (
            <div className="rounded-lg border border-line bg-ink p-6 text-sm text-secondary">
              Live GitHub data couldn&apos;t be loaded right now (rate limit or
              offline).{" "}
              <a
                href={`https://github.com/${USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4"
              >
                Open the profile directly →
              </a>
            </div>
          )}

          {status === "ready" && (
            <>
              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((s) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-lg border border-line bg-ink p-5"
                  >
                    <p className="font-mono text-3xl font-bold text-primary">
                      {s.value}
                    </p>
                    <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-secondary">
                      {s.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-ink px-5 py-3">
                <p className="font-mono text-[11px] text-secondary">
                  Live data · fetched from the GitHub API
                </p>
                <a
                  href={`https://github.com/${USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] text-cyan underline underline-offset-4"
                >
                  See contribution graph →
                </a>
              </div>

              <p className="mt-8 font-mono text-[11px] tracking-[0.25em] text-accent">
                SELECTED REPOSITORIES
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {repos.map((repo, i) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="view"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="group rounded-lg border border-line bg-ink p-5 transition-colors hover:border-accent"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-sm text-primary transition-colors group-hover:text-accent">
                        {repo.name}
                      </p>
                      <span className="font-mono text-[10px] text-secondary">
                        ★ {repo.stargazers_count}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-xs text-secondary">
                      {repo.description ?? "No description provided."}
                    </p>
                    <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-secondary/70">
                      <span className="flex items-center gap-1.5">
                        {repo.language && (
                          <>
                            <span className="h-2 w-2 rounded-full bg-cyan" />
                            {repo.language}
                          </>
                        )}
                      </span>
                      <span>
                        updated{" "}
                        {new Date(repo.updated_at).toLocaleDateString("en-GB", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}

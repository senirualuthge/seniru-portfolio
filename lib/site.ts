/**
 * Canonical site URL.
 *
 * Override with NEXT_PUBLIC_SITE_URL when a custom domain is attached
 * (e.g. https://senirualuthge.com). NEXT_PUBLIC_BASE_PATH is appended for
 * project-page deployments (GitHub Pages project sites), so the default here
 * is the bare origin only.
 */
const base =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://senirualuthge.github.io";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE_URL = `${base.replace(/\/$/, "")}${basePath}`;

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

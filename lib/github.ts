export type GhUser = {
  login: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

export type GhRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
};

const API = "https://api.github.com";
const headers = { Accept: "application/vnd.github+json" };

export async function fetchProfile(username: string): Promise<GhUser> {
  const res = await fetch(`${API}/users/${username}`, { headers });
  if (!res.ok) throw new Error(`GitHub profile request failed: ${res.status}`);
  return res.json();
}

export async function fetchRepos(username: string, limit = 6): Promise<GhRepo[]> {
  const res = await fetch(
    `${API}/users/${username}/repos?per_page=100&sort=updated`,
    { headers }
  );
  if (!res.ok) throw new Error(`GitHub repos request failed: ${res.status}`);
  const repos: GhRepo[] = await res.json();
  return repos
    // Skip forks and the profile-README meta repo (<user>/<user>): any push to
    // that repo bumps its updated_at, which would otherwise reshuffle the
    // SELECTED REPOSITORIES list on every profile README edit.
    .filter((r) => !r.fork && r.name !== username)
    .sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at))
    .slice(0, limit);
}

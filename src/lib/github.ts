import type {
  GitHubActivityDay,
  GitHubLanguage,
  GitHubRepository,
  GitHubUser,
} from "@/types/github";

const GITHUB_API = "https://api.github.com";

async function githubFetch<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("GitHub user not found");
    }

    if (response.status === 403) {
      throw new Error(
        "GitHub API rate limit reached. Please try again later."
      );
    }

    throw new Error("Unable to fetch data from GitHub");
  }

  return response.json();
}

export async function getGitHubUser(
  username: string
): Promise<GitHubUser> {
  return githubFetch<GitHubUser>(
    `${GITHUB_API}/users/${encodeURIComponent(username)}`
  );
}

export async function getGitHubRepositories(
  username: string
): Promise<GitHubRepository[]> {
  return githubFetch<GitHubRepository[]>(
    `${GITHUB_API}/users/${encodeURIComponent(
      username
    )}/repos?per_page=100&sort=updated`
  );
}

export async function getRepositoryLanguages(
  owner: string,
  repository: string
): Promise<Record<string, number>> {
  return githubFetch<Record<string, number>>(
    `${GITHUB_API}/repos/${encodeURIComponent(
      owner
    )}/${encodeURIComponent(repository)}/languages`
  );
}

export async function getGitHubLanguages(
  username: string,
  repositories: GitHubRepository[]
): Promise<GitHubLanguage[]> {
  const nonForkRepositories = repositories.filter(
    (repository) => !repository.fork
  );

  const languageResults = await Promise.all(
    nonForkRepositories.map((repository) =>
      getRepositoryLanguages(username, repository.name)
    )
  );

  const totals: Record<string, number> = {};

  for (const languages of languageResults) {
    for (const [language, bytes] of Object.entries(languages)) {
      totals[language] = (totals[language] || 0) + bytes;
    }
  }

  const totalBytes = Object.values(totals).reduce(
    (sum, bytes) => sum + bytes,
    0
  );

  if (totalBytes === 0) {
    return [];
  }

  return Object.entries(totals)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Math.round((bytes / totalBytes) * 100),
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 6);
}

interface GitHubEvent {
  type: string;
  created_at: string;
}

export async function getGitHubActivity(
  username: string
): Promise<GitHubActivityDay[]> {
  const events = await githubFetch<GitHubEvent[]>(
    `${GITHUB_API}/users/${encodeURIComponent(
      username
    )}/events/public?per_page=100`
  );

  const activityMap: Record<string, number> = {};

  for (const event of events) {
    const date = event.created_at.split("T")[0];

    if (!date) continue;

    activityMap[date] = (activityMap[date] || 0) + 1;
  }

  return Object.entries(activityMap)
    .map(([date, count]) => ({
      date,
      count,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
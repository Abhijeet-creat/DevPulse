import {
  getGitHubActivity,
  getGitHubLanguages,
  getGitHubRepositories,
  getGitHubUser,
} from "@/lib/github";

interface RouteContext {
  params: Promise<{
    username: string;
  }>;
}

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const { username } = await context.params;

    if (!username) {
      return Response.json(
        {
          error: "GitHub username is required",
        },
        { status: 400 }
      );
    }

    const user = await getGitHubUser(username);

    const repositories = await getGitHubRepositories(username);

    const languages = await getGitHubLanguages(
      username,
      repositories
    );

    const activity = await getGitHubActivity(username);

    const totalStars = repositories
      .filter((repository) => !repository.fork)
      .reduce(
        (total, repository) =>
          total + repository.stargazers_count,
        0
      );

    return Response.json({
      user,
      repositories,
      languages,
      totalStars,
      activity,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong";

    const status =
      message === "GitHub user not found"
        ? 404
        : message.includes("rate limit")
          ? 429
          : 500;

    return Response.json(
      {
        error: message,
      },
      { status }
    );
  }
}
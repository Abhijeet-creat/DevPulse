"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  GitFork,
  Star,
  ArrowUpRight,
} from "lucide-react";

import type { GitHubRepository } from "@/types/github";

interface RepositorySectionProps {
  repositories: GitHubRepository[];
}

const languageColors: Record<string, string> = {
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-blue-400",
  Python: "bg-emerald-400",
  Java: "bg-orange-400",
  C: "bg-gray-400",
  "C++": "bg-pink-400",
  CSS: "bg-violet-400",
  HTML: "bg-red-400",
  SQL: "bg-cyan-400",
  PHP: "bg-indigo-400",
  Go: "bg-cyan-300",
  Rust: "bg-orange-500",
};

function getLanguageColor(language: string) {
  return languageColors[language] || "bg-cyan-400";
}

export default function RepositorySection({
  repositories,
}: RepositorySectionProps) {
  const recentRepositories = repositories
    .filter((repo) => !repo.fork)
    .slice(0, 6);

  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
              Repositories
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Recent work.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Explore the latest public repositories from this
              developer.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-500">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            {recentRepositories.length} repositories
          </div>
        </div>

        {/* Repository grid */}
        {recentRepositories.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {recentRepositories.map((repo, index) => (
              <motion.article
                key={repo.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-cyan-950/20"
              >
                {/* Glow */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-cyan-400/[0.04] blur-3xl transition-all duration-500 group-hover:bg-cyan-400/[0.09]" />

                <div className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/60 to-cyan-400/0 transition-all duration-500 group-hover:w-full" />

                {/* Top */}
                <div className="relative flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />

                      <h3 className="truncate text-lg font-semibold text-white transition-colors duration-200 group-hover:text-cyan-200">
                        {repo.name}
                      </h3>
                    </div>

                    <p className="mt-3 line-clamp-2 min-h-[48px] text-sm leading-6 text-gray-500">
                      {repo.description ||
                        "No description provided for this repository."}
                    </p>
                  </div>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${repo.name} on GitHub`}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-500 transition-all duration-200 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>

                {/* Metadata */}
                <div className="relative mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/[0.06] pt-5 text-xs text-gray-500">
                  {repo.language && (
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${getLanguageColor(
                          repo.language
                        )}`}
                      />

                      <span>{repo.language}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5" />
                    <span>{repo.stargazers_count}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <GitFork className="h-3.5 w-3.5" />
                    <span>{repo.forks_count}</span>
                  </div>

                  <span className="text-gray-600 sm:ml-auto">
                    Updated{" "}
                    {new Date(
                      repo.updated_at
                    ).toLocaleDateString()}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-10 text-center">
            <p className="text-sm text-gray-500">
              No public repositories found.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
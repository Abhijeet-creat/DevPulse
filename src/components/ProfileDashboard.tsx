"use client";

import {
  Code2,
  GitFork,
  Star,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

import StatsCard from "./StatsCard";

import type { GitHubUser } from "@/types/github";

interface ProfileDashboardProps {
  user: GitHubUser;
  totalStars: number;
}

export default function ProfileDashboard({
  user,
  totalStars,
}: ProfileDashboardProps) {
  return (
    <section className="relative border-t border-white/10 px-6 py-24">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
              Developer Overview
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {user.name || user.login} at a glance.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
              A quick overview of this developer's public GitHub
              profile and repositories.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Public profile
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-5">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="h-20 w-20 shrink-0 rounded-2xl border border-white/10 object-cover"
              />

              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {user.name || user.login}
                </h3>

                <p className="mt-1 text-sm text-cyan-300">
                  @{user.login}
                </p>

                <p className="mt-2 max-w-lg text-sm text-gray-500">
                  {user.bio ||
                    "No bio provided on this GitHub profile."}
                </p>
              </div>
            </div>

            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-gray-300 transition-all hover:border-cyan-400/20 hover:bg-cyan-400/10 hover:text-white"
            >
              <Code2 className="h-4 w-4" />
              View GitHub
            </a>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatsCard
            label="Repositories"
            value={user.public_repos}
            icon={Code2}
            description="Public repositories"
          />

          <StatsCard
            label="Total Stars"
            value={totalStars}
            icon={Star}
            description="Stars across public repositories"
          />

          <StatsCard
            label="Followers"
            value={user.followers}
            icon={Users}
            description="People following this developer"
          />

          <StatsCard
            label="Following"
            value={user.following}
            icon={GitFork}
            description="Developers this user follows"
          />

        </div>
      </div>
    </section>
  );
}
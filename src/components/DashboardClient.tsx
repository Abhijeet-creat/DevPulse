"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import Hero from "./Hero";
import ProfileDashboard from "./ProfileDashboard";
import RepositorySection from "./RepositorySection";
import LanguageSection from "./LanguageSection";
import ActivitySection from "./ActivitySection";
import LoadingDashboard from "./LoadingDashboard";

import type {
  GitHubActivityDay,
  GitHubLanguage,
  GitHubRepository,
  GitHubUser,
} from "@/types/github";

interface GitHubResponse {
  user: GitHubUser;
  repositories: GitHubRepository[];
  languages: GitHubLanguage[];
  totalStars: number;
  activity: GitHubActivityDay[];
}

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function DashboardClient() {
  const [data, setData] =
    useState<GitHubResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(username: string) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/github/${encodeURIComponent(username)}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Unable to fetch GitHub profile"
        );
      }

      setData(result);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Hero
        onSearch={handleSearch}
        loading={loading}
      />

      {loading && <LoadingDashboard />}

      {!loading && error && (
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-red-400/20 bg-red-400/[0.05] px-5 py-4"
            >
              <p className="text-sm font-medium text-red-300">
                Unable to analyze this profile
              </p>

              <p className="mt-1 text-xs text-red-300/60">
                {error}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {!loading && data && (
        <div>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ProfileDashboard
              user={data.user}
              totalStars={data.totalStars}
            />
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.55,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <LanguageSection
              languages={data.languages}
            />
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.55,
              delay: 0.16,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <RepositorySection
              repositories={data.repositories}
            />
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.55,
              delay: 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ActivitySection
              activity={data.activity}
            />
          </motion.div>
        </div>
      )}
    </>
  );
}
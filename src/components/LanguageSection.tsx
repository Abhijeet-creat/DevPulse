"use client";

import { motion } from "framer-motion";

import type { GitHubLanguage } from "@/types/github";

interface LanguageSectionProps {
  languages: GitHubLanguage[];
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

export default function LanguageSection({
  languages,
}: LanguageSectionProps) {
  if (languages.length === 0) {
    return (
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center backdrop-blur-xl">
            <p className="text-sm text-gray-500">
              No language data available.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">

          {/* Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8"
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
              Languages
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              What you build with.
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              A breakdown of the programming languages used across
              this developer's public repositories.
            </p>

            {/* Distribution bar */}
            <div className="mt-8">
              <div className="mb-3 flex h-3 overflow-hidden rounded-full bg-white/5">
                {languages.map((language) => (
                  <motion.div
                    key={language.name}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${language.percentage}%`,
                    }}
                    transition={{
                      duration: 0.8,
                    }}
                    className={`${getLanguageColor(
                      language.name
                    )} h-full`}
                  />
                ))}
              </div>

              <p className="text-xs text-gray-600">
                Based on actual repository language statistics
              </p>
            </div>

            {/* Mini legend */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {languages.slice(0, 6).map((language) => (
                <div
                  key={language.name}
                  className="flex items-center gap-2 text-xs text-gray-500"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${getLanguageColor(
                      language.name
                    )}`}
                  />

                  <span>{language.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Language List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">
                  Top languages
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Repository distribution
                </p>
              </div>

              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-500">
                {languages.length} languages
              </span>
            </div>

            <div className="mt-7 space-y-6">
              {languages.map((language, index) => (
                <div key={language.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${getLanguageColor(
                          language.name
                        )}`}
                      />

                      <span className="text-sm text-gray-300">
                        {language.name}
                      </span>
                    </div>

                    <span className="text-xs text-gray-500">
                      {language.percentage}%
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${language.percentage}%`,
                      }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.08,
                      }}
                      className={`h-full rounded-full ${getLanguageColor(
                        language.name
                      )}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
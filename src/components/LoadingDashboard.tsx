"use client";

import { motion } from "framer-motion";

function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-white/[0.06] ${className}`}
    />
  );
}

export default function LoadingDashboard() {
  return (
    <section className="border-t border-white/10 px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* Header skeleton */}
        <div className="mb-10">
          <Skeleton className="h-3 w-32" />

          <Skeleton className="mt-4 h-10 w-72 max-w-full" />

          <Skeleton className="mt-4 h-4 w-[420px] max-w-full" />
        </div>

        {/* Profile skeleton */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-5 rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Skeleton className="h-20 w-20 shrink-0 rounded-2xl" />

            <div className="flex-1">
              <Skeleton className="h-7 w-48 max-w-full" />

              <Skeleton className="mt-3 h-4 w-32" />

              <Skeleton className="mt-3 h-4 w-96 max-w-full" />
            </div>

            <Skeleton className="h-10 w-32 rounded-xl" />
          </div>
        </motion.div>

        {/* Stats skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"
            >
              <div className="flex justify-between">
                <div>
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="mt-3 h-9 w-16" />
                </div>

                <Skeleton className="h-10 w-10 rounded-xl" />
              </div>

              <Skeleton className="mt-5 h-3 w-28" />
            </motion.div>
          ))}
        </div>

        {/* Loading message */}
        <div className="mt-10 flex items-center justify-center gap-3 text-sm text-gray-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
          Analyzing GitHub profile...
        </div>

      </div>
    </section>
  );
}
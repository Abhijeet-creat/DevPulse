"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  Flame,
  Zap,
} from "lucide-react";

import type { GitHubActivityDay } from "@/types/github";

interface ActivitySectionProps {
  activity: GitHubActivityDay[];
}

function getActivityLevel(count: number) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 7) return 3;
  return 4;
}

function getBarOpacity(level: number) {
  switch (level) {
    case 1:
      return "opacity-30";
    case 2:
      return "opacity-50";
    case 3:
      return "opacity-75";
    case 4:
      return "opacity-100";
    default:
      return "opacity-10";
  }
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  );
}

export default function ActivitySection({
  activity,
}: ActivitySectionProps) {
  const totalActivity = activity.reduce(
    (sum, day) => sum + day.count,
    0
  );

  const activeDays = activity.filter(
    (day) => day.count > 0
  ).length;

  const peakDay = activity.reduce(
    (highest, current) =>
      current.count > highest.count ? current : highest,
    {
      date: "",
      count: 0,
    }
  );

  const averageActivity =
    activeDays > 0
      ? (totalActivity / activeDays).toFixed(1)
      : "0";

  const recentActivity = activity.slice(-14);

  const maxRecentActivity = Math.max(
    1,
    ...recentActivity.map((day) => day.count)
  );

  return (
    <section className="px-6 pb-28">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

              <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
                Developer Activity
              </p>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Your coding rhythm.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
              See how consistently you've been active across your
              public GitHub projects.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Activity className="h-3.5 w-3.5" />
            Public GitHub events
          </div>
        </div>

        {/* Main Activity Layout */}
        <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">

          {/* Activity Score */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8"
          >
            {/* Background glow */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/[0.07] blur-[80px]" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                  <Zap className="h-5 w-5 text-cyan-300" />
                </div>

                <span className="rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-3 py-1 text-[11px] text-emerald-300">
                  Active
                </span>
              </div>

              <p className="mt-8 text-sm text-gray-500">
                Public activity
              </p>

              <div className="mt-2 flex items-end gap-2">
                <span className="text-5xl font-semibold tracking-tight text-white">
                  {totalActivity}
                </span>

                <span className="mb-2 text-sm text-gray-600">
                  events
                </span>
              </div>

              <p className="mt-3 max-w-xs text-xs leading-5 text-gray-600">
                Public GitHub events returned from your recent
                activity.
              </p>

              {/* Mini metrics */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarDays className="h-3.5 w-3.5" />

                    <span className="text-[11px]">
                      Active days
                    </span>
                  </div>

                  <p className="mt-3 text-xl font-semibold text-white">
                    {activeDays}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Flame className="h-3.5 w-3.5" />

                    <span className="text-[11px]">
                      Daily avg.
                    </span>
                  </div>

                  <p className="mt-3 text-xl font-semibold text-white">
                    {averageActivity}
                  </p>
                </div>
              </div>

              {/* Peak day */}
              {peakDay.date && (
                <div className="mt-3 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <div>
                    <p className="text-[11px] text-gray-600">
                      Peak activity
                    </p>

                    <p className="mt-1 text-sm text-gray-300">
                      {formatDate(peakDay.date)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-semibold text-white">
                      {peakDay.count}
                    </span>

                    <ArrowUpRight className="h-4 w-4 text-cyan-300" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Activity Graph */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8"
          >
            <div className="relative">

              {/* Graph heading */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-white">
                    Activity pulse
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    Recent public activity
                  </p>
                </div>

                <div className="hidden items-center gap-2 text-xs text-gray-600 sm:flex">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  Events
                </div>
              </div>

              {/* Bars */}
              <div className="mt-10 flex h-56 items-end gap-2 sm:gap-3">
                {recentActivity.map((day, index) => {
                  const level = getActivityLevel(
                    day.count
                  );

                  const height =
                    day.count === 0
                      ? 8
                      : Math.max(
                          12,
                          (day.count /
                            maxRecentActivity) *
                            100
                        );

                  return (
                    <div
                      key={day.date}
                      className="group flex h-full flex-1 flex-col justify-end"
                    >
                      <div className="relative flex h-full items-end justify-center">

                        {/* Tooltip */}
                        <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#0c1017] px-2.5 py-1.5 text-[10px] text-gray-300 opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                          {day.count}{" "}
                          {day.count === 1
                            ? "event"
                            : "events"}
                        </div>

                        <motion.div
                          initial={{
                            height: 0,
                          }}
                          whileInView={{
                            height: `${height}%`,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 0.7,
                            delay: index * 0.04,
                            ease: "easeOut",
                          }}
                          className={`w-full max-w-7 rounded-t-lg bg-cyan-400 ${getBarOpacity(
                            level
                          )} transition-all duration-300 group-hover:opacity-100`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Graph baseline */}
              <div className="mt-3 h-px bg-white/10" />

              {/* Dates */}
              <div className="mt-3 flex justify-between text-[10px] text-gray-700">
                {recentActivity.length > 0 && (
                  <>
                    <span>
                      {formatDate(
                        recentActivity[0].date
                      )}
                    </span>

                    <span>
                      {formatDate(
                        recentActivity[
                          recentActivity.length - 1
                        ].date
                      )}
                    </span>
                  </>
                )}
              </div>

              {/* Bottom insight */}
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
                  <Activity className="h-4 w-4 text-cyan-300" />
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-300">
                    Keep the momentum going.
                  </p>

                  <p className="mt-1 text-[11px] text-gray-600">
                    Your activity pulse is based on public GitHub
                    events.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
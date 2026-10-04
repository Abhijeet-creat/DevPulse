import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  description: string;
}

export default function StatsCard({
  label,
  value,
  icon: Icon,
  description,
}: StatsCardProps) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {label}
          </p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors group-hover:border-cyan-400/20 group-hover:bg-cyan-400/10">
          <Icon className="h-5 w-5 text-gray-400 transition-colors group-hover:text-cyan-300" />
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-600">
        {description}
      </p>
    </div>
  );
}
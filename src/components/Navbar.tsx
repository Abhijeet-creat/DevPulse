import { Code2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#07090d]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
            <Code2 className="h-5 w-5 text-cyan-300" />
          </div>

          <span className="text-lg font-semibold tracking-tight text-white">
            Dev<span className="text-cyan-300">Pulse</span>
          </span>
        </div>

        <div className="hidden items-center gap-6 text-sm text-gray-400 sm:flex">
          <span>GitHub Analytics</span>

          <div className="h-4 w-px bg-white/10" />

          <span className="text-gray-500">Developer Dashboard</span>
        </div>
      </div>
    </header>
  );
}
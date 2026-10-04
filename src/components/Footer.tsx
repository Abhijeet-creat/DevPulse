import { Code2, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05070a]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10">
              <Code2 className="h-4 w-4 text-cyan-300" />
            </div>

            <span className="text-sm font-semibold text-white">
              Dev<span className="text-cyan-300">Pulse</span>
            </span>
          </div>

          <p className="mt-3 text-xs text-gray-600">
            GitHub analytics for developers who build.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs text-gray-600">
          <span>Built with Next.js</span>

          <span className="hidden h-3 w-px bg-white/10 sm:block" />

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-cyan-300"
          >
            GitHub
            <ExternalLink className="h-3 w-3" />
          </a>

          <span className="hidden h-3 w-px bg-white/10 sm:block" />

          <span>© {new Date().getFullYear()} DevPulse</span>
        </div>
      </div>
    </footer>
  );
}
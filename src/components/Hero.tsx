import SearchBar from "./SearchBar";

interface HeroProps {
  onSearch: (username: string) => void;
  loading?: boolean;
}

export default function Hero({
  onSearch,
  loading = false,
}: HeroProps) {
  return (
    <section className="relative flex min-h-[720px] items-center justify-center overflow-hidden px-4 pt-24 sm:px-6">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.08] blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[130px]" />

      <div className="pointer-events-none absolute left-[12%] top-[28%] h-40 w-40 rounded-full bg-violet-500/[0.035] blur-3xl sm:h-64 sm:w-64" />

      <div className="pointer-events-none absolute bottom-[15%] right-[10%] h-32 w-32 rounded-full bg-blue-500/[0.03] blur-3xl sm:h-56 sm:w-56" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-5 inline-flex max-w-full items-center rounded-full border border-cyan-400/10 bg-white/[0.025] px-3 py-2 text-xs text-gray-400 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.03] sm:mb-6 sm:px-4 sm:text-sm">
          <span className="mr-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] sm:h-2 sm:w-2" />

          <span>GitHub Developer Analytics</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
          Understand your
          <br />
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            GitHub profile.
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-2xl px-2 text-sm leading-6 text-gray-400 sm:mt-6 sm:px-0 sm:text-lg sm:leading-7">
          Turn your GitHub activity into a clean, visual developer
          profile. Explore repositories, languages, stars, followers
          and more.
        </p>

        {/* Search */}
        <div className="mx-auto mt-8 w-full max-w-xl sm:mt-10">
          <SearchBar
            onSearch={onSearch}
            loading={loading}
          />
        </div>

        {/* Helper text */}
        <p className="mt-3 text-[11px] text-gray-600 sm:mt-4 sm:text-xs">
          Enter any public GitHub username
        </p>

        {/* Bottom accent */}
        <div className="mx-auto mt-12 flex items-center justify-center gap-3 opacity-40">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400" />

          <div className="h-1 w-1 rounded-full bg-cyan-400" />

          <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400" />
        </div>
      </div>
    </section>
  );
}
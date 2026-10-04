"use client";

import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (username: string) => void;
  loading?: boolean;
}

export default function SearchBar({
  onSearch,
  loading = false,
}: SearchBarProps) {
  const [username, setUsername] = useState("");

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername || loading) return;

    onSearch(trimmedUsername);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="group flex w-full min-w-0 items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 focus-within:border-cyan-400/30 focus-within:bg-white/[0.06] sm:gap-2 sm:p-2"
    >
      <Search className="ml-2 h-4 w-4 shrink-0 text-gray-500 transition-colors group-focus-within:text-cyan-300 sm:ml-3 sm:h-5 sm:w-5" />

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username..."
        disabled={loading}
        autoComplete="off"
        spellCheck={false}
        className="min-w-0 flex-1 bg-transparent px-1.5 py-3 text-sm text-white outline-none placeholder:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 sm:px-2 sm:text-base"
      />

      <button
        type="submit"
        disabled={loading || !username.trim()}
        className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-3.5 py-3 text-sm font-medium text-black transition-all duration-200 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />

            <span className="hidden sm:inline">
              Loading
            </span>
          </>
        ) : (
          <>
            <span className="hidden sm:inline">
              Analyze
            </span>

            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
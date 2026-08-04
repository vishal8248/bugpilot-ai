"use client";

import { Bug, CircleUserRound, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6">

      {/* Logo */}

      <div className="flex items-center gap-3">

        <Bug
          size={24}
          className="text-violet-500"
        />

        <h1 className="text-2xl font-bold text-white">
          BugPilot AI
        </h1>

      </div>

      {/* User */}

      <button className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-zinc-900">

        <CircleUserRound
          size={34}
          className="text-zinc-300"
        />

        <span className="font-medium text-white">
          User Profile
        </span>

        <ChevronDown
          size={16}
          className="text-zinc-400"
        />

      </button>

    </header>
  );
}
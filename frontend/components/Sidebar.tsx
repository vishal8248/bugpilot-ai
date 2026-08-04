"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  ClipboardList,
  History,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Analyze Bug",
    href: "/analyze",
    icon: Search,
  },
  {
    name: "Open Tickets",
    href: "/tickets",
    icon: ClipboardList,
  },
  {
    name: "History",
    href: "/history",
    icon: History,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-[calc(100vh-73px)] w-54 flex-col justify-between border-r border-zinc-800 bg-gradient-to-b from-zinc-950 via-zinc-950 to-black px-4 py-5">

      {/* Menu */}

      <nav className="space-y-3">

        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-4 rounded-xl px-4 py-4 transition-all duration-200
                ${
                  active
                    ? "bg-violet-600/15 text-violet-400 shadow-inner ring-1 ring-violet-500/20"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
            >
              <Icon
                size={22}
                className={`transition ${
                  active
                    ? "text-violet-400"
                    : "text-zinc-500 group-hover:text-white"
                }`}
              />

              <span
                className={`text-lg ${
                  active ? "font-semibold" : "font-medium"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* Bottom Avatar */}

      <div className="flex items-center justify-center">

        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-violet-500/40 bg-zinc-900 text-xl font-semibold text-white shadow-lg shadow-violet-500/10">

          v

        </div>

      </div>

    </aside>
  );
}
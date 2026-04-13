"use client";

import { Home, Library, Search } from "lucide-react";
import { motion } from "framer-motion";

const menu = [
  { label: "Home", icon: Home },
  { label: "Search", icon: Search },
  { label: "Your Library", icon: Library },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-72 shrink-0 flex-col gap-4">
      <div className="rounded-2xl bg-neutral-900 p-4">
        {menu.map((item, idx) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.06 }}
            className="mb-2 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-neutral-200 transition hover:bg-neutral-800 hover:text-white"
          >
            <item.icon size={18} />
            <span className="text-sm font-medium">{item.label}</span>
          </motion.button>
        ))}
      </div>
      <div className="rounded-2xl bg-neutral-900 p-4 text-xs text-neutral-400">
        <p className="font-semibold text-neutral-200">ReMusic</p>
        <p className="mt-1">Музыкальный MVP в стиле Spotify.</p>
      </div>
    </aside>
  );
}

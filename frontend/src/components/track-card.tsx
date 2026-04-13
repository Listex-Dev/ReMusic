"use client";

import { ExternalLink, Music2 } from "lucide-react";
import { motion } from "framer-motion";

import type { Track } from "@/types/music";

type TrackCardProps = {
  track: Track;
  index: number;
  onPlay: (track: Track) => void;
};

export function TrackCard({ track, index, onPlay }: TrackCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group rounded-2xl bg-neutral-900/80 p-3 transition hover:bg-neutral-800"
    >
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 overflow-hidden rounded-lg bg-neutral-800">
          {track.cover_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={track.cover_url}
              alt={track.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-neutral-500">
              <Music2 size={18} />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{track.title}</p>
          <p className="truncate text-xs text-neutral-400">
            {track.artist}
            {track.album ? ` • ${track.album}` : ""}
          </p>
          <p className="text-[11px] text-neutral-500">{track.duration ?? "—"} • {track.source}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPlay(track)}
            className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-black transition hover:bg-emerald-400"
          >
            Play
          </button>
          {track.stream_url ? (
            <a
              href={track.stream_url}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-neutral-700 p-2 text-neutral-300 transition hover:border-neutral-500 hover:text-white"
              aria-label="Открыть источник трека"
            >
              <ExternalLink size={14} />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

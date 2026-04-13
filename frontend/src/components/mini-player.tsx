"use client";

import { Pause, Play } from "lucide-react";

import type { Track } from "@/types/music";

type MiniPlayerProps = {
  currentTrack: Track | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
};

export function MiniPlayer({ currentTrack, isPlaying, onTogglePlay }: MiniPlayerProps) {
  return (
    <footer className="sticky bottom-0 mt-4 rounded-2xl border border-neutral-800 bg-neutral-950/95 p-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-md bg-neutral-800">
          {currentTrack?.cover_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={currentTrack.cover_url}
              alt={currentTrack.title}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            {currentTrack?.title ?? "Выберите трек"}
          </p>
          <p className="truncate text-xs text-neutral-400">
            {currentTrack?.artist ?? "Исполнитель появится здесь"}
          </p>
        </div>
        <button
          onClick={onTogglePlay}
          disabled={!currentTrack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-400"
          aria-label={isPlaying ? "Пауза" : "Играть"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>
    </footer>
  );
}

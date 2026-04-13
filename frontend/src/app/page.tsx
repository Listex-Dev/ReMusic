"use client";

import { useEffect, useState } from "react";
import { Music, Sparkles } from "lucide-react";

import { searchTracks } from "@/lib/api";
import type { Track } from "@/types/music";
import { MiniPlayer } from "@/components/mini-player";
import { SearchBar } from "@/components/search-bar";
import { Sidebar } from "@/components/sidebar";
import { TrackCard } from "@/components/track-card";

export default function Home() {
  const [query, setQuery] = useState("the weeknd");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const runSearch = async (value = query) => {
    const normalizedQuery = value.trim();
    if (!normalizedQuery) return;

    setLoading(true);
    setError(null);
    try {
      const data = await searchTracks(normalizedQuery, 20);
      setTracks(data.items);
    } catch {
      setError("Не удалось получить треки. Проверьте backend API.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  useEffect(() => {
    void runSearch(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto flex max-w-[1440px] gap-4 p-4 lg:p-6">
        <Sidebar />
        <main className="flex min-h-[calc(100vh-3rem)] flex-1 flex-col gap-4 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 p-4 lg:p-6">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-400">ReMusic</p>
              <h1 className="mt-1 flex items-center gap-2 text-2xl font-bold text-white">
                <Music size={22} className="text-emerald-400" />
                Spotify-style Music Service
              </h1>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-300">
              <Sparkles size={14} className="text-emerald-400" />
              Next.js + FastAPI + YT Music
            </div>
          </header>

          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={runSearch}
            isLoading={loading}
          />

          <section className="flex-1 rounded-2xl bg-black/20 p-3">
            {error ? (
              <p className="rounded-xl border border-red-700/50 bg-red-950/40 p-3 text-sm text-red-300">
                {error}
              </p>
            ) : null}

            {!error && tracks.length === 0 && !loading ? (
              <div className="flex h-full min-h-60 items-center justify-center rounded-xl border border-dashed border-neutral-700 text-neutral-400">
                Введите запрос и нажмите «Найти».
              </div>
            ) : null}

            <div className="grid gap-2">
              {tracks.map((track, index) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  index={index}
                  onPlay={handlePlay}
                />
              ))}
            </div>
          </section>

          <MiniPlayer
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying((prev) => !prev)}
          />
        </main>
      </div>
    </div>
  );
}

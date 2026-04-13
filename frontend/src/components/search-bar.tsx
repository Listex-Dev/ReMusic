"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
};

export function SearchBar({ value, onChange, onSubmit, isLoading }: SearchBarProps) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-2xl bg-neutral-900 p-4 md:flex-row">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onSubmit();
          }
        }}
        placeholder="Искать треки, артистов, альбомы..."
        className="h-11 flex-1 rounded-xl border border-neutral-700 bg-neutral-950 px-4 text-sm text-neutral-100 outline-none ring-0 placeholder:text-neutral-500 focus:border-emerald-500"
      />
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="h-11 rounded-xl bg-emerald-500 px-6 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-emerald-700"
      >
        {isLoading ? "Ищем..." : "Найти"}
      </button>
    </div>
  );
}

import { SearchResponse } from "@/types/music";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:8000";

export async function searchTracks(
  query: string,
  limit = 20,
): Promise<SearchResponse> {
  const params = new URLSearchParams({
    q: query,
    limit: String(limit),
  });

  const response = await fetch(`${API_BASE_URL}/api/search?${params.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Search request failed with status ${response.status}`);
  }

  return (await response.json()) as SearchResponse;
}

export type Track = {
  id: string;
  title: string;
  artist: string;
  album?: string | null;
  duration?: string | null;
  cover_url?: string | null;
  source: string;
  stream_url?: string | null;
};

export type SearchResponse = {
  query: string;
  total: number;
  items: Track[];
};

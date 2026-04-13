from app.providers.base import MusicProvider
from app.schemas.tracks import Track


class FallbackProvider(MusicProvider):
    name = "fallback"

    def __init__(self) -> None:
        self._items = [
            Track(
                id="fallback:1",
                title="Blinding Lights",
                artist="The Weeknd",
                album="After Hours",
                duration="3:22",
                cover_url="https://images.unsplash.com/photo-1511379938547-c1f69419868d",
                source=self.name,
                stream_url="https://music.youtube.com/watch?v=4NRXx6U8ABQ",
            ),
            Track(
                id="fallback:2",
                title="As It Was",
                artist="Harry Styles",
                album="Harry's House",
                duration="2:47",
                cover_url="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
                source=self.name,
                stream_url="https://music.youtube.com/watch?v=H5v3kku4y6Q",
            ),
            Track(
                id="fallback:3",
                title="Levitating",
                artist="Dua Lipa",
                album="Future Nostalgia",
                duration="3:24",
                cover_url="https://images.unsplash.com/photo-1516280440614-37939bbacd81",
                source=self.name,
                stream_url="https://music.youtube.com/watch?v=TUVcZfQe-Kw",
            ),
            Track(
                id="fallback:4",
                title="Bad Habit",
                artist="Steve Lacy",
                album="Gemini Rights",
                duration="3:52",
                cover_url="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
                source=self.name,
                stream_url="https://music.youtube.com/watch?v=VF-FGf_ZZiI",
            ),
            Track(
                id="fallback:5",
                title="Midnight City",
                artist="M83",
                album="Hurry Up, We're Dreaming",
                duration="4:03",
                cover_url="https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
                source=self.name,
                stream_url="https://music.youtube.com/watch?v=dX3k_QDnzHE",
            ),
        ]

    async def search(self, query: str, limit: int = 20) -> list[Track]:
        query_lower = query.strip().lower()
        if not query_lower:
            return self._items[:limit]

        matched = [
            item
            for item in self._items
            if query_lower in item.title.lower()
            or query_lower in item.artist.lower()
            or (item.album and query_lower in item.album.lower())
        ]
        return matched[:limit]

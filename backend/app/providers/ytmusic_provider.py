from __future__ import annotations

import asyncio
from typing import Any

from ytmusicapi import YTMusic

from app.providers.base import MusicProvider
from app.schemas.tracks import Track


class YTMusicProvider(MusicProvider):
    name = "ytmusic"

    def __init__(self) -> None:
        self._client = YTMusic()

    async def search(self, query: str, limit: int = 20) -> list[Track]:
        raw_items = await asyncio.to_thread(
            self._client.search,
            query,
            "songs",
            limit=limit,
        )

        results: list[Track] = []
        for item in raw_items:
            track = self._normalize_item(item)
            if track:
                results.append(track)
        return results

    def _normalize_item(self, item: dict[str, Any]) -> Track | None:
        video_id = item.get("videoId")
        title = item.get("title")
        artists = item.get("artists") or []
        if not video_id or not title:
            return None

        artist = artists[0]["name"] if artists else "Unknown Artist"
        album_raw = item.get("album") or {}
        album = album_raw.get("name")

        thumbnails = item.get("thumbnails") or []
        cover_url = thumbnails[-1]["url"] if thumbnails else None

        return Track(
            id=f"ytm:{video_id}",
            title=title,
            artist=artist,
            album=album,
            duration=item.get("duration"),
            cover_url=cover_url,
            source=self.name,
            stream_url=f"https://music.youtube.com/watch?v={video_id}",
        )

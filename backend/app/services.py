from __future__ import annotations

import asyncio
import logging

from app.providers.base import MusicProvider
from app.providers.fallback_provider import FallbackProvider
from app.providers.ytmusic_provider import YTMusicProvider
from app.schemas.tracks import Track

logger = logging.getLogger(__name__)


class SearchService:
    def __init__(self) -> None:
        self.providers: list[MusicProvider] = []
        self._fallback = FallbackProvider()
        self._initialize_providers()

    def _initialize_providers(self) -> None:
        try:
            self.providers.append(YTMusicProvider())
        except Exception as exc:  # pragma: no cover
            logger.warning("YTMusic provider initialization failed: %s", exc)

    async def search(self, query: str, limit: int) -> list[Track]:
        if not self.providers:
            return await self._fallback.search(query, limit)

        tasks = [provider.search(query, limit) for provider in self.providers]
        provider_results = await asyncio.gather(*tasks, return_exceptions=True)

        merged: list[Track] = []
        seen: set[str] = set()
        for result in provider_results:
            if isinstance(result, Exception):
                logger.warning("Provider search failed: %s", result)
                continue
            for item in result:
                key = f"{item.title.lower()}::{item.artist.lower()}"
                if key not in seen:
                    seen.add(key)
                    merged.append(item)
                if len(merged) >= limit:
                    return merged

        if merged:
            return merged
        return await self._fallback.search(query, limit)

from abc import ABC, abstractmethod

from app.schemas.tracks import Track


class MusicProvider(ABC):
    name: str = "base"

    @abstractmethod
    async def search(self, query: str, limit: int = 20) -> list[Track]:
        raise NotImplementedError

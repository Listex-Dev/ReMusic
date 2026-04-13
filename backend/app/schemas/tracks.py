from pydantic import BaseModel, HttpUrl


class Track(BaseModel):
    id: str
    title: str
    artist: str
    album: str | None = None
    duration: str | None = None
    cover_url: HttpUrl | None = None
    source: str
    stream_url: HttpUrl | None = None


class SearchResponse(BaseModel):
    query: str
    total: int
    items: list[Track]

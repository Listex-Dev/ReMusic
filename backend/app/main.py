from __future__ import annotations

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.schemas.tracks import SearchResponse
from app.services import SearchService

app = FastAPI(title=settings.app_name, version=settings.app_version)
search_service = SearchService()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get(f"{settings.api_prefix}/search", response_model=SearchResponse)
async def search_tracks(
    q: str = Query(..., min_length=1, description="Search query"),
    limit: int = Query(20, ge=1, le=50),
) -> SearchResponse:
    items = await search_service.search(q, limit)
    return SearchResponse(query=q, total=len(items), items=items)

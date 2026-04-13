# Backend (FastAPI)

## Запуск локально

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

## Эндпоинты

- `GET /health`
- `GET /api/search?q=weeknd&limit=20`

## Источники музыки

Сейчас подключён провайдер `ytmusicapi` (YouTube Music) и fallback-провайдер с демо-треками, чтобы UI всегда работал даже при ошибках внешнего источника.

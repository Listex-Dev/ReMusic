# ReMusic

Spotify-style музыкальный сервис (MVP): фронт на **Next.js + TypeScript + Tailwind + Framer Motion + Lucide**, бэк на **FastAPI** с поиском треков через **YouTube Music** (`ytmusicapi`) и fallback-данными.

## Структура

- `frontend` — клиентское приложение (Next.js App Router)
- `backend` — API-сервис (FastAPI)

## Быстрый старт

### 1) Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

API:
- `GET /health`
- `GET /api/search?q=the%20weeknd&limit=20`

### 2) Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Откройте: `http://localhost:3000`

## Что реализовано

- Поиск треков через backend API
- Провайдер YouTube Music (`ytmusicapi`)
- Fallback-провайдер (если внешний источник недоступен)
- UI в стиле Spotify: sidebar, строка поиска, список треков, мини-плеер
- Анимации карточек через Framer Motion
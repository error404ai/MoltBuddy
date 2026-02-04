# MoltBuddy

Full-stack TypeScript app with a Hono backend and a Vite + React frontend.

## Project Structure

```
MoltBuddy/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── src/                      # Hono backend
│   ├── index.ts
│   ├── database.ts
│   ├── entities/
│   └── migrations/
├── public/                   # Built frontend (generated)
├── Dockerfile
├── Dockerfile.prod
├── docker-compose.yml
├── docker-compose.prod.yml
└── package.json
```

## Getting Started

### Prerequisites

- Node.js >= 20
- MySQL

### Install

```bash
pnpm run install:all
```

### Environment

```bash
cp .env.example .env
cp frontend/.env.example frontend/.env
```

### Development

```bash
pnpm run dev
```

- Backend: http://localhost:3000/api
- Frontend: http://localhost:5173

### Production Build

```bash
pnpm run build:all
pnpm start
```

## Docker

### Development

```bash
pnpm run docker:dev
```

### Production

```bash
pnpm run docker:prod
```

# 🔥 MoltBuddy App

A modern, full-stack application built with **Hono**, **tRPC**, **TypeORM**, **MySQL**, **React**, **TanStack Router**, and **Docker**.

## 🚀 Tech Stack

### Backend

- **Hono**: Ultra-fast web framework for Node.js
- **tRPC**: Type-safe APIs with end-to-end type safety
- **TypeORM**: Object-Relational Mapping for TypeScript
- **MySQL**: Robust relational database
- **Zod**: Schema validation

### Frontend

- **React 19**: Modern React with latest features
- **TanStack Router**: File-based routing with type safety
- **TanStack Query**: Powerful data synchronization
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool

### DevOps

- **Docker**: Containerized application
- **Docker Compose**: Multi-container orchestration
- **phpMyAdmin**: Database management interface

## 📦 Prerequisites

- **Node.js** (v20 or higher)
- **pnpm** (v8 or higher)
- **Docker** and **Docker Compose**

## 🛠️ Development Setup

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd moltbuddy-app
pnpm install
```

### 2. Environment Configuration

```bash
cp .env.example .env
```

### 3. Start All Services with Docker

```bash
pnpm run docker:up
```

This starts:

- **MySQL** on `localhost:3306`
- **phpMyAdmin** on `http://localhost:8080`
- **Backend API** on `http://localhost:3001` (containerized)
- **Frontend App** on `http://localhost:5173` (containerized)

### 4. Alternative: Local Development (without containers)

If you prefer to run frontend/backend locally:

```bash
pnpm run dev
```

This starts:

- **Backend API** on `http://localhost:3001`
- **Frontend App** on `http://localhost:5173`

## 🐳 Docker Commands

```bash
pnpm run docker:up            # Start all services (database + frontend + backend)
pnpm run docker:down          # Stop all services
pnpm run docker:logs          # View all container logs
pnpm run docker:logs:backend  # View backend logs only
pnpm run docker:logs:frontend # View frontend logs only
pnpm run docker:restart       # Restart all services
pnpm run docker:build         # Rebuild containers
```

## 🔌 Services

| Service    | URL                     | Description         |
| ---------- | ----------------------- | ------------------- |
| Frontend   | `http://localhost:5173` | React application   |
| API        | `http://localhost:3001` | Hono + tRPC server  |
| Database   | `localhost:3306`        | MySQL database      |
| phpMyAdmin | `http://localhost:8080` | Database management |

## 🗄️ Database Access

### Development Connection

- **Host**: `localhost`
- **Port**: `3306`
- **Database**: `moltbuddy_db`
- **Username**: `moltbuddy`
- **Password**: `password`

### phpMyAdmin

- **URL**: `http://localhost:8080`
- **Username**: `root`
- **Password**: `rootpassword`

## 📁 Project Structure

```
moltbuddy-app/
├── src/                    # Frontend source code
│   ├── routes/            # TanStack Router pages
│   ├── components/        # React components
│   └── utils/            # Utilities
├── server/                # Backend source code
│   ├── entities/         # TypeORM entities
│   ├── database.ts       # Database configuration
│   ├── router.ts         # tRPC router
│   └── index.ts         # Server entry point
├── docker-compose.yml    # Docker setup for development
├── Dockerfile           # Docker image build (for future production)
└── .env                 # Environment variables
```

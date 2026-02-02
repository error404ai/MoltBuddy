# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
# Development - run all apps
pnpm dev

# Build all packages and apps
pnpm build

# Type checking
pnpm check-types

# Linting and formatting
pnpm lint
pnpm format
```

### App-Specific Commands

```bash
# API
pnpm --filter @moltbuddy/api dev
pnpm --filter @moltbuddy/api build

# Dashboard (Vite on port 3000)
pnpm --filter @moltbuddy/dashboard dev

# Website (Next.js on port 3000)
pnpm --filter @moltbuddy/website dev
```

### Database Commands (API)

```bash
pnpm --filter @moltbuddy/api db:migrate              # Run pending migrations
pnpm --filter @moltbuddy/api db:migrate:generate     # Generate migration from entity changes
pnpm --filter @moltbuddy/api db:fresh:seed           # Reset DB and seed (destructive)
pnpm --filter @moltbuddy/api db:drop                 # Drop all tables
pnpm --filter @moltbuddy/api db:sync                 # Sync schema directly
```

### Local Database Setup

```bash
docker compose up    # Starts MySQL on localhost:3306, phpMyAdmin on localhost:8080
```

## Architecture Overview

This is a **Turborepo monorepo** with pnpm workspaces containing a full-stack application for project management, invoicing, and client management.

### Structure

```
apps/
├── api/          # Hono + tRPC + TypeORM backend
├── dashboard/    # React + Vite admin UI
└── website/      # Next.js public marketing site

packages/
├── permissions/  # Shared RBAC library (UserRole, Permission enums, hasPermission)
├── ui/           # Shared React components
├── eslint-config/
└── typescript-config/
```

### Tech Stack

- **API**: Hono server, tRPC 11 for type-safe RPC, TypeORM with MySQL, tsyringe for DI
- **Dashboard**: React 19, TanStack Router (file-based), Redux Toolkit, tRPC client
- **Website**: Next.js 16 with App Router, Tailwind CSS, Framer Motion

## Key Patterns

### API Router Pattern

Routers are in `apps/api/src/routers/`. Each router uses tRPC procedures:

```typescript
export const exampleRouter = createTRPCRouter({
  getItems: privateProcedure
    .input(zodSchema)
    .query(({ input, ctx }) => { ... }),

  createItem: privateProcedure
    .input(zodSchema)
    .mutation(({ input, ctx }) => { ... }),
});
```

- `publicProcedure` - No auth required (login/signup)
- `privateProcedure` - Requires JWT, provides `ctx.role` and `ctx.user_id`

### Permission System

The `@moltbuddy/permissions` package defines all access control:

```typescript
import { hasPermission, Permission, UserRole } from "@moltbuddy/permissions";

if (!hasPermission(user.role, Permission.VIEW_ALL_PROJECTS)) {
  throw new TRPCError({ code: "FORBIDDEN" });
}
```

Roles: `CLIENT`, `ADMIN`. Permissions are granular (45+ types) covering users, projects, credentials, orders, invoices, etc.

### Dependency Injection

Services use tsyringe:

```typescript
@injectable()
export class OrderService { ... }

// In router
const service = container.resolve(OrderService);
```

### Dashboard Routing

TanStack Router with file-based routing in `apps/dashboard/src/routes/`. Route files export components that become routes based on their file path.

### Database Entities

Located in `apps/api/src/entities/`. Key relationships:

- User → Client (1:1)
- Client → Projects (1:N)
- Project → Orders, Downloads, ProjectUpdates, Invoices, Credentials (1:N)

### Validation

All tRPC inputs validated with Zod schemas in `apps/api/src/validations/`.

## Environment Variables

**API** (`apps/api/.env`):

- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`
- `JWT_SECRET`
- `VITE_APP_URL` (CORS origin)

**Dashboard** (`apps/dashboard/.env`):

- `VITE_API_URL` (API endpoint)
- `VITE_APP_URL`

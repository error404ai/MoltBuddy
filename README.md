# MoltBuddy

A full-stack TypeScript starter template with Express.js backend and React + Vite frontend.

## Features

### Backend
- **Express.js** - Fast, minimalist web framework
- **TypeScript** - Full TypeScript support with path aliases
- **TypeORM** - Powerful ORM for database operations
- **TypeDI** - Dependency injection container
- **routing-controllers** - Decorator-based routing
- **class-validator** - Request validation with decorators
- **MySQL** - MySQL database support (easily changeable)
- **Winston** - Production-grade logging

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **TypeScript** - Type-safe frontend development

## Project Structure

```
MoltBuddy/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── src/                      # Express.js backend
│   ├── app.ts               # Application entry point
│   ├── controllers/         # Route controllers
│   ├── entities/            # TypeORM entities
│   ├── helpers/             # Utility helpers
│   ├── loaders/             # App initialization loaders
│   ├── logger/              # Logging setup
│   ├── middleware/          # Express middlewares
│   └── migrations/          # Database migrations
├── public/                  # Built frontend (generated)
├── scripts/                 # Utility scripts
├── Dockerfile               # Development Dockerfile
├── Dockerfile.prod          # Production Dockerfile
├── docker-compose.yml       # Development compose
├── docker-compose.prod.yml  # Production compose
└── package.json             # Root package.json
```

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- MySQL database
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install all dependencies (backend + frontend):

   ```bash
   pnpm run install:all
   ```

   Or install separately:

   ```bash
   # Backend only
   pnpm install

   # Frontend only
   pnpm run install:frontend
   ```

3. Configure environment variables:

   ```bash
   cp .env.example .env
   cp frontend/.env.example frontend/.env
   # Edit .env files with your configuration
   ```

4. Run database migrations:

   ```bash
   pnpm run migrate:run
   ```

### Development

Run both backend and frontend:

```bash
pnpm run dev
```

This starts:
- Backend on `http://localhost:3000`
- Frontend on `http://localhost:5173` (with API proxy)

Run separately:

```bash
# Backend only
pnpm run dev:backend

# Frontend only
pnpm run dev:frontend
```

### Production Build

Build the entire application:

```bash
pnpm run build:all
```

This will:
1. Build backend TypeScript to `dist/`
2. Build frontend React app to `public/`

Start production server:

```bash
pnpm start
```

The server serves:
- API endpoints at `/api/*`
- Frontend static files for all other routes

## Docker

### Development

```bash
pnpm run docker:dev
```

### Production

```bash
pnpm run docker:prod
```

## Available Scripts

| Script                   | Description                                |
| ------------------------ | ------------------------------------------ |
| `pnpm run dev`           | Start both backend & frontend dev servers  |
| `pnpm run dev:backend`   | Start backend development server only      |
| `pnpm run dev:frontend`  | Start frontend development server only     |
| `pnpm run build`         | Build backend for production               |
| `pnpm run build:frontend`| Build frontend for production              |
| `pnpm run build:all`     | Build both backend and frontend            |
| `pnpm start`             | Start production server                    |
| `pnpm run install:all`   | Install all dependencies                   |
| `pnpm run migrate:generate` | Generate migration from entity changes  |
| `pnpm run migrate:create`| Create new migration file                  |
| `pnpm run migrate:run`   | Run pending migrations                     |
| `pnpm run migrate:revert`| Revert last migration                      |
| `pnpm run db:sync`       | Sync database schema                       |
| `pnpm run db:drop`       | Drop all tables                            |
| `pnpm run lint`          | Run ESLint                                 |
| `pnpm run format`        | Format code with Prettier                  |

## API Endpoints

### Health Check
- `GET /api/health` - Server health status
- `GET /api/health/ready` - Readiness check

### Users (Example)
- `GET /api/users` - List all users

## Adding New Features

### 1. Create an Entity

```typescript
// src/entities/Product.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;
}
```

### 2. Create a Controller

```typescript
// src/controllers/ProductController.ts
import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { AppDataSource } from '../loaders/database';
import Product from '../entities/Product';

@JsonController('/products')
@Service()
export class ProductController {
  @Get('/')
  async getProducts() {
    const productRepo = AppDataSource.getRepository(Product);
    const products = await productRepo.find();
    return { status: 'success', data: products };
  }
}
```

### 3. Register Controller

Add your controller to `src/app.ts`:

```typescript
import { ProductController } from './controllers/ProductController';

// In useExpressServer config
controllers: [HealthController, UserController, ProductController]
```

## License

MIT

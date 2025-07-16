# Video Demo Project

This demo leverages my personal starter stack, which provided the foundational boilerplate—mainly the folder structure—from the outset. This allowed me to focus on delivering an MVP that covers the core requirements: enabling users to list and create videos, while ensuring the project remains a solid and flexible foundation for future enhancements. As a result, I intentionally deprioritized the optional features (search by title, video details) for later development, since they are not part of the essential user journey requested in the challenge.

Given the time constraints, there are some technichal aspects that I did not include in as much depth as a full project would require during this rapid prototyping phase, such a complete test coverage - I introduced just a couple to show the general pattern - and introduction of Storybook for components.

On the frontend, considering the scope of the project, I decided not to use any external state management libraries. Instead, I used **useState** in combination with **React Query**, which is more than enough to maintain a clear and solid state management given the simplicity of the app. When we eventually need authentication, user session-related data, or share state between components, transitioning to something like **Zustand** will be encouraged.

Next steps on the frontend:

- Optional features for discovering videos (search by title) and video details view.
- Authentication & authorization.
- Priority performance optimizations: Lazy loading and backend query optimizations.
- Comprehensive testing, specially integration and E2E

For the backend, I would normally use **PostgreSQL**, but the project requirements indicated that simplicity was a priority. Considering the nature of the data and to avoid overloading the infrastructure (e.g., adding a dockerized database instance on top of the existing services), I opted to use **SQLite**.
The project is also intended to work without requiring Docker. While PostgreSQL does not depend on Docker and can be installed locally, adding it to this setup would have introduced extra configuration complexity and gone against the goal of keeping the environment as lightweight and easy to run as possible. In contrast, SQLite, allowed for a zero-setup backend that fits well with the rapid prototyping phase. This choice does come with some caveats, such as the issue with tags, since SQLite doesn’t support arrays, and some transformation work was needed.

Overall, the structure is basic yet ready to scale with minor changes:

- Introduction of Swagger would be a priority
- Proper error handling middleware
- API versioning (v1) and its own dedicated folder, separate from the database logic.
- Clear separation and organization of the database in its own folder hierarchy.

## Project Structure

```
demo-videos/
├── backend/   # Fastify + TypeScript backend
│   ├── src/
│   │   ├── controllers/   # Route handlers (business logic)
│   │   ├── database/      # DB connection and repository
│   │   ├── models/        # Zod schemas and types
│   │   ├── routes/        # API route definitions
│   │   ├── services/      # Service layer (business logic)
│   │   └── utils/         # Utility functions
│   └── ... (config, Docker, etc.)
├── frontend/  # React + Vite frontend
│   ├── public/            # Static assets
│   └── src/
│       ├── assets/        # Images and static files
│       ├── components/    # React UI components
│       ├── config/        # API config and constants
│       ├── hooks/         # Custom React hooks
│       ├── layouts/       # Layout components
│       ├── lib/           # Utility functions
│       ├── pages/         # Page components
│       ├── routes/        # App route definitions
│       ├── types/         # TypeScript types
│       └── ... (main entry, setup, etc.)
└── ... (root config, Docker, README, etc.)
```

## Tech Stack

**Frontend**

- React 19
- TypeScript
- Vite
- React Query
- React Hook Form
- Tailwind CSS
- Shadcn

**Backend**

- Fastify
- TypeScript
- Zod validation
- SQLite

## Quick Start

### With Docker

```bash
docker compose up

# Frontend: http://localhost:4173
# Backend: http://localhost:3000
```

### Without Docker

#### Prerequisites

- Node.js 18+
- npm or yarn

#### Backend Setup

```bash
cd backend
npm install
npm run dev     # Development server on :3000
npm run build   # Production build
npm start       # Run production build
```

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev     # Development server on :5173
npm run build   # Production build
npm run preview # Preview production build
```

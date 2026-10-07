# InboxPilot

AI-powered support inbox + live chat widget.

Built with **Next.js** (web + widget) and **NestJS** (API), with subscriptions, realtime chat, and RAG-based AI reply suggestions.

## Status

Phase 0 foundation is on `phase-0-foundation` ([#1](https://github.com/AimonSajid/inbox-pilot/issues/1)). Feature work lands on `dev` via phase pull requests.

## Branching

- `main` — stable / release
- `dev` — integration branch
- `phase-*` — one branch per phase; PR into `dev`

## Local setup

Requirements: Node.js 22.12+ (see `.nvmrc`), pnpm 10, Docker.

```bash
corepack pnpm install
cp .env.example apps/api/.env
docker compose up -d
corepack pnpm db:migrate
corepack pnpm dev
```

- Web: http://localhost:3000
- Inbox shell: http://localhost:3000/inbox
- API health: http://localhost:3001/health
- Widget preview: http://localhost:3002

Compose publishes Postgres on host port **5433** and Redis on **6380**, so it can run beside a Postgres or Redis already installed on the machine. `db:migrate` applies the Prisma scaffold, including the `vector` extension. Redis is for later background jobs. The API does not connect to it yet.

## Repo layout

- `apps/web` — Next.js marketing page and inbox shell
- `apps/api` — NestJS API and Prisma schema
- `apps/widget` — embeddable chat script
- `packages/types` — shared TypeScript contracts

## License

MIT

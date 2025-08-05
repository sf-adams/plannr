# Plannr

## Challenge Details

Build a mini “Collaborative Task Board” (a simplified Trello-like app) that lets authenticated users create boards, add lists and cards, and see updates in real time when another user makes a change.

### Getting Started

- Git clone

2. Run docker services:

```sh
pnpm docker:up
```

3. Run the following command:

```sh
pnpm install
```

### Tech Stack

- [ ] Front-end: React (with Hooks) + TypeScript
- [ ] Back-end: Node.js + NestJS + TypeScript
- [ ] Database: MongoDB
- [ ] Real-time: WebSockets (e.g. Socket.IO)
- [ ] Auth: JWT-based signup/login
- [ ] Testing: Jest (unit + integration)

_Feel free to substitute equivalent frameworks (e.g. Next.js, Fastify, Prisma) as long as you can justify your choices._

## Project Links

### Infrastructure

- [Turborepo](https://turborepo.com/docs) - Build system for codebases, designed for scaling monorepos
- [GitHub CLI](https://cli.github.com/manual/) - Command-line interface to GitHub for use in your terminal or your scripts
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) - Specification for adding human and machine readable meaning to commit messages

### Frontend

- [Vite](https://vite.dev/guide/) - Build tool that aims to provide a faster and leaner development experience for modern web projects
- [Lucide React](https://lucide.dev/guide/packages/lucide-react) - Open-source icon library that provides 1000+ vector files for displaying icons and symbols

### Backend

- [NestJS](https://docs.nestjs.com/) - Framework for building efficient, scalable Node.js server-side applications
- [Zod](https://zod.dev/) - TypeScript-frst schema validation with static type inference
- [Bruno](https://docs.usebruno.com/) - Git-friendly and offline-first open-source API client

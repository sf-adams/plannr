# Plannr

## Challenge Details

Build a mini “Collaborative Task Board” (a simplified Trello-like app) that lets authenticated users create boards, add lists and cards, and see updates in real time when another user makes a change.

### Getting Started

1. Clone the repo

```sh
git clone https://github.com/sf-adams/plannr.git
cd plannr
```

2. Install depencies across all apps (web + api):

```sh
pnpm install
```

3. Start Docker (MongoDB):

```sh
pnpm docker:up
```

4. Create .env files (Can leave )

```sh
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

```

5. Seed the database (creates demo users, boards, lists and cards):

```sh
pnpm seed
```

6. Start the dev servers (API + Web)

```sh
pnpm dev
```

7. Log in to User 1

```sh
Email: sam@example.com
Password: Test9876
```

8. Log in to User 2 (In a separate private browser)

```sh
Email: adams@example.com
Password: Test9876
```

### Tech Stack

- [x] Front-end: React (with Hooks) + TypeScript
- [x] Back-end: Node.js + NestJS + TypeScript
- [x] Database: MongoDB
- [ ] Real-time: WebSockets (e.g. Socket.IO)
- [x] Auth: JWT-based signup/login
- [x] Testing: Jest (unit + integration)

## Project Links

### Infrastructure

- [Turborepo](https://turborepo.com/docs) - Build system for codebases, designed for scaling monorepos
- [GitHub CLI](https://cli.github.com/manual/) - Command-line interface to GitHub for use in your terminal or your scripts
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) - Specification for adding human and machine readable meaning to commit messages

### Frontend

- [Vite](https://vite.dev/guide/) - Build tool that aims to provide a faster and leaner development experience for modern web projects
- [React](https://react.dev/) – Build user interfaces out of individual pieces called components
- [TypeScript](https://www.typescriptlang.org/) – Static typing for JavaScript
- [Lucide React](https://lucide.dev/guide/packages/lucide-react) - Open-source icon library that provides 1000+ vector files for displaying icons and symbols
- [Axios](https://axios-http.com/docs/intro) - Promise-based HTTP Client for node.js and the browser
- [React Router](https://reactrouter.com/home) - Multi-strategy router for React bridging the gap from React 18 to React 19
- [React Hook Form](https://www.react-hook-form.com/api/useform/) - Performant, flexible and extensible forms with easy-to-use validation

### Backend

- [NestJS](https://docs.nestjs.com/) - Framework for building efficient, scalable Node.js server-side applications
- [Zod](https://zod.dev/) - TypeScript-frst schema validation with static type inference
- [Bruno](https://docs.usebruno.com/) - Git-friendly and offline-first open-source API client

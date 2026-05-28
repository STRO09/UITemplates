# Next.js Starter Template

> A minimal, production-ready Next.js starter using the App Router and JavaScript — lightweight, scalable, and ready for customization.

## Features

- Next.js with the App Router (`app/`) and `page.js`-based routing
- Clean JavaScript architecture without TypeScript overhead
- Example API layer split into `client/` and `server/` helpers
- Centralized endpoint management
- Reusable layouts and UI components
- Custom hooks and shared utilities
- Role/context-based structure support
- Global styling with PostCSS support

## Prerequisites

- Node.js 18+ (recommended)
- npm or yarn

## Quick Start

1. Install dependencies

```powershell
npm install
```

2. Run development server

```powershell
npm run dev
```

3. Build for production

```powershell
npm run build
npm run start
```

## Folder Overview

- `app/` — Next.js App Router pages, layouts, and global styles
- `components/` — Shared UI components, layouts, dialogs, and sidebars
- `hooks/` — Reusable React hooks
- `api/` — API helpers separated into:
  - `client/`
  - `server/`
  - `endpoints/`
- `lib/` — Shared utilities, contexts, and helper functions
- `public/` — Static assets

## API Architecture

The template includes a separated API structure for cleaner frontend architecture.

### Client-side APIs

Used for:
- forms
- button actions
- browser interactions
- mutations

Example:

```js
userClientApi.getAll();
userClientApi.create(payload);
```

### Server-side APIs

Used for:
- Server Components
- SSR data fetching
- protected layouts
- Server Actions

Example:

```js
await userServerApi.getAll();
```

### Middleware Layer

Includes:
- `clientMiddleware.js`
- `serverMiddleware.js`

Features:
- centralized fetch handling
- cookie forwarding
- standardized error responses
- SSR-safe authentication
- caching and deduplication support

## Styling

Global styles live in:

```txt
app/globals.css
```

The template also includes PostCSS configuration for Tailwind CSS or additional plugins.

## Customization Tips

- Replace the placeholder dashboard layouts with your own app structure
- Extend the API layer with domain-specific services
- Add authentication providers or protected route handling
- Create reusable UI patterns inside `components/ui`
- Add `.env.local` for runtime configuration

## Goals

This template focuses on:
- scalable frontend structure
- reusable architecture patterns
- clean separation of concerns
- rapid project bootstrapping
- maintainable code organization

## License

MIT

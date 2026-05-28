# Next.js + TypeScript Starter Template

> A minimal, production-ready Next.js starter using the App Router and TypeScript—opinionated but lightweight, ready for customization.

## Features

- Next.js with the App Router (`app/`) and `page.tsx`-based routing
- Fully typed with TypeScript
- Example API layer split into `client/` and `server/` helpers
- Simple, opinionated layout and component structure in `components/`
- Handy hooks in `hooks/` (mobile detection, toast helper)
- Global styling in `app/globals.css` and PostCSS configuration

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

If your `package.json` uses different script names, replace the commands above accordingly.

## Folder Overview

- `app/` — Next.js App Router pages and layouts; contains `globals.css`, `layout.tsx`, and top-level routes
- `components/` — Shared UI components and layout pieces (header, sidebars, dialogs)
- `hooks/` — Reusable React hooks (mobile detection, toasts)
- `api/` — API-layer helpers and endpoint definitions separated into `client/`, `server/`, and `endpoints/`
- `lib/` — Utilities, types, and context providers (e.g., `role-context.tsx`)
- `public/` — Static assets

## API & Middleware

- Example middleware files: `clientMiddleware.ts` and `serverMiddleware.ts` for request handling
- API endpoints and client/server API wrappers live under `api/` to make it easy to call from either runtime

## Styling

Global styles live in `app/globals.css`. The project includes `postcss.config.mjs` so you can enable Tailwind or other PostCSS plugins if desired.

## Customization Tips

- Replace the placeholder layouts in `components/layout/` to match your app's navigation and access patterns.
- Use the typed helpers in `api/` and `lib/` to centralize fetch logic and error handling.
- Add `.env.local` for secrets and runtime configuration; load them via `process.env` in server code.

## Contributing

Feel free to open issues or PRs with improvements or questions. This template is intended to be small and hackable.

## License

MIT

---
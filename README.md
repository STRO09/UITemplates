# UITemplates

A collection of my reusable UI templates and frontend architecture setups built with modern web stacks.

This repository serves as a reusable starter system for quickly bootstrapping projects with scalable structured folder structures, centralized API handling, reusable components, clean client/server separation, and maintainable frontend architecture patterns.

## Includes

- Centralized API collections
- Client-side and server-side fetch layers
- Reusable UI components
- Custom hooks
- Shared utilities
- Typed API patterns
- Authentication-ready foundations
- Scalable folder architecture

## Goals

- Reduce repetitive setup work
- Maintain consistent project architecture
- Experiment with reusable frontend patterns
- Improve development speed without sacrificing structure

## Branch Structure

The `main` branch does not contain any active template.

Each template/setup exists in its own dedicated branch.

Example:

```txt
nextTs-no-protected-routes
```
```txt
nextJs-no-protected-routes
```

## Using a Template

Clone a specific template branch directly into a new project using degit:

```npx degit STRO09/UITemplates#branch-name my-app```

Example:

```npx degit STRO09/UITemplates#nextTs-no-protected-routes my-app```

Then start the project:

```
cd my-app
npm install
npm run dev
```

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

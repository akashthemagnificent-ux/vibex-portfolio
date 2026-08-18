# Vibex Portfolio

The personal portfolio and self-introduction website for **Ash / Vibex**. It is a React, TypeScript, and Vite site with a nocturnal editorial visual system, interactive particle typography, a hero-only Molten Metal WebGL surface, atmospheric motion, and fully responsive layouts.

## Requirements

- Node.js 20 or newer
- pnpm 10 or newer

## Run locally

```bash
pnpm install
pnpm dev
```

The development server will print the local URL. The app is configured to bind to the host so it can also be previewed on a local network when appropriate.

## Validate the project

```bash
pnpm test
pnpm check
pnpm build
```

The production bundle is written to `dist/`. To run the built production server locally:

```bash
pnpm start
```

## Project structure

| Path | Purpose |
| --- | --- |
| `client/src/pages/Home.tsx` | Main single-page portfolio composition and content |
| `client/src/index.css` | Editorial design system, responsive layout, typography, and motion styling |
| `client/src/components/` | Interactive visual components, including ParticleText, MoltenMetal, StoryFlight, Aurora, and FloatingLines |
| `client/src/**/*.test.ts` | Regression tests for content, typography, and visual integration contracts |
| `server/index.ts` | Production server entry point |

## Font assets and notes

The exact webfont files used by the interface are bundled in [`client/public/fonts`](./client/public/fonts) and served through local `/fonts/...` application paths, so a clone of this repository does not depend on Manus storage or another asset host. Retain the applicable font licenses when redistributing or modifying the project.

The repository intentionally excludes dependency folders, build output, logs, local configuration, and environment files. See `.gitignore` for the complete list.

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

## Notes

The original self-hosted font URLs target the existing Manus storage paths used by this project. Replace those URLs with your own hosted font files before deploying outside that environment if you do not intend to retain the same asset host.

The repository intentionally excludes dependency folders, build output, logs, local configuration, and environment files. See `.gitignore` for the complete list.

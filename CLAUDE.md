# CLAUDE.md

This file configures Claude Code for the drautage.laundry.db repository.

## Project overview

React 19 + TypeScript 5 SPA for browsing and comparing laundry products
(detergents, boosters, pretreaters). Bundled with rsbuild/rspack, linted with
oxlint/oxfmt, tested with Jest + React Testing Library. Deployed to Azure
Static Web Apps via GitHub Actions.

## Tech stack

- Node.js >=24, npm >=11
- React 19, TypeScript 5, React Router 7
- rsbuild (rspack bundler)
- oxlint + oxfmt (lint + format)
- Jest + React Testing Library

## Development commands

| Task | Command |
|------|---------|
| All checks (lint + type-check + test + format) | `npm run checks` |
| Lint (check) | `npm run lint` |
| Lint (auto-fix) | `npm run lint:fix` |
| Format (check) | `npm run format` |
| Format (auto-fix) | `npm run format:fix` |
| Type check | `npm run type-check` |
| Tests | `npm test` |
| Tests (coverage) | `npm run test:coverage` |
| Dev server | `npm start` |
| Production build | `npm run build:prod` |

## Domain instructions

Read and follow these — do not duplicate content from them:

- [AGENTS.md](AGENTS.md) — Quick start and PR checklist for all agent work
- [src/components/Detergent/AGENTS.md](src/components/Detergent/AGENTS.md) — Detergent profile creation rules
- [src/components/common/types/AGENTS.md](src/components/common/types/AGENTS.md) — Ingredient enum and category management

## Rules

- **Never modify `package-lock.json`** when adding detergent profiles. If it appears in your diff, stop and investigate.
- **All PRs must be draft PRs.** Use `gh pr create --draft`.
- Use `Closes #<issue_number>` in the PR body to auto-link the issue.
- Run `npm run checks` before opening a PR and fix all failures.
- Do not open ready-for-review PRs, merge PRs, or push to `main` directly.
- SmartLabel pages (`smartlabel.pg.com`) are JavaScript-rendered and inaccessible via fetch. Fall back to the ingredient list in the issue.

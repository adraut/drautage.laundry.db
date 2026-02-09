# Copilot Instructions for drautage.laundry.db

This is a React TypeScript single-page application for browsing and comparing laundry products including detergents, boosters, and pretreaters. Please follow these guidelines when contributing:

## Code Standards

### Required Before Each Commit
- Run `npm run lint:fix` before committing to ensure proper code formatting and style
- Run `npm run type-check` to verify TypeScript types are correct
- Run `npm test` to ensure all tests pass

### Development Flow
- **Build**: `npm run build` (development) or `npm run build:prod` (production with minification)
- **Test**: `npm test` (run all tests), `npm run test:watch` (watch mode), `npm run test:coverage` (with coverage)
- **Lint**: `npm run lint` (check) or `npm run lint:fix` (auto-fix)
- **Type check**: `npm run type-check`
- **Dev server**: `npm start` (runs on http://localhost:3000)

## Repository Structure

- `src/components/`: Reusable React components
  - `src/components/Detergent/`: Detergent-specific components and data
  - `src/components/common/types/`: TypeScript type definitions and enums
- `src/pages/`: Page-level components
- `public/`: Static assets and HTML template
- `.github/`: GitHub Actions workflows and templates
- `dist/`: Production build output (auto-generated, not committed)

## Key Guidelines

1. **TypeScript**: All code must be properly typed. Use TypeScript best practices and avoid `any` types.
2. **React**: Follow React best practices and hooks patterns. Use functional components.
3. **Code Style**: Follow the ESLint configuration. Prefer descriptive variable names.
4. **Testing**: Write tests using Jest and React Testing Library for new functionality.
5. **Minimal Changes**: Make the smallest possible changes to achieve the goal.
6. **Build Validation**: All pull requests must pass ESLint, TypeScript type checking, and production build.

## Adding New Detergent Products

For detailed instructions on adding new detergent products, see:
- [AGENTS.md](../AGENTS.md) - Quick start and PR checklist
- [src/components/Detergent/AGENTS.md](../src/components/Detergent/AGENTS.md) - Detergent profile creation
- [src/components/common/types/AGENTS.md](../src/components/common/types/AGENTS.md) - Ingredient enum and category management

### Quick Summary
1. Create profile file in `src/components/Detergent/data/profiles/` with naming format: `brand-product-variant.ts` (lowercase, hyphenated)
2. Export profile in `src/components/Detergent/data/profiles/index.ts`
3. Add new ingredients to `src/components/common/types/Ingredient.ts` enum and categorize in appropriate sets
4. Open a **draft PR** with source links, date accessed, region, and list any unknowns
5. Use `Closes #<issue_number>` in PR description to auto-link and close the issue

## Technology Stack

- **React 19** - UI library
- **TypeScript 5** - Type-safe development
- **React Router 7** - Client-side routing with BrowserRouter
- **Webpack 5** - Module bundler with production minification
- **ESLint** - Code linting and quality checks
- **Jest** - Testing framework
- **React Testing Library** - Component testing

## Node.js Version
- Requires Node.js 24.x or higher
- Requires npm 11.x or higher

## CI/CD

All pull requests are automatically validated for:
- ESLint validation
- TypeScript type checking
- Successful production build
- Passing tests

## Code Conventions

- Use functional React components with hooks
- Keep components focused and single-purpose
- Prefer composition over inheritance
- Use TypeScript enums for fixed sets of values
- Follow existing file naming conventions (lowercase-hyphenated)
- Keep ingredient categorization accurate and source-verified
- Do not invent or infer ingredients without authoritative sources

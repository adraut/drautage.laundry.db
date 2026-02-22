# drautage.laundry.db

A database of laundry products

## Overview

A React TypeScript single-page application for browsing and comparing laundry products including detergents, boosters, and pretreaters.

## Features

- Browse products by category (Detergents, Boosters, Pretreaters)
- Side-by-side product comparisons
- Glossary of laundry terms
- Responsive design
- Production-ready build with minification

## Tech Stack

- **React** - UI library
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing with BrowserRouter
- **rspack** - Module bundler with production minification
- **oxlint** - Code linting and quality checks

## Development

### Prerequisites

- Node.js 24 or higher
- npm 11 or higher

### Installation

```bash
npm install
```

### Available Scripts

- `npm install` - Install dependencies
- `npm start` - Start development server on http://localhost:3000
- `npm run build` - Build development bundle
- `npm run build:prod` - Build production bundle (minified)
- `npm run lint` - Run lint checks
- `npm run lint:fix` - Run lint and auto-fix issues
- `npm run format` - Check code formatting
- `npm run format:fix` - Auto-fix code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## CI/CD

### Pull Request Checks

All pull requests must pass the following checks:

- Lint validation
- TypeScript type checking
- Successful production build
- Passing tests

### Deployment

The application includes a GitHub Actions workflow for deploying to Azure Static Web Apps (Free tier).

## Project Structure

```
├── .github/
│   └── workflows/         # GitHub Actions CI/CD workflows
├── public/
│   └── index.html        # HTML template
├── src/
│   ├── components/       # Reusable components
│   │   ├── Detergent/    # Detergent components, data, and types
│   │   ├── common/       # Shared components and types
│   │   ├── Booster/      # Booster components
│   │   ├── Pretreater/   # Pretreater components
│   │   ├── Glossary/     # Glossary component
│   │   └── Navigation/   # Navigation component
│   ├── pages/           # Page components
│   ├── App.tsx          # Main app component with routes
│   ├── App.css          # Global styles
│   └── index.tsx        # Application entry point
├── dist/                # Production build output (generated)
├── rsbuild.config.ts    # Rsbuild configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies and scripts
```

## License

AGPL-3.0

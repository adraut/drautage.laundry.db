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
- `npm start` - Start development server on http://localhost:3000
- `npm run build` - Build production bundle (minified)
- `npm run build:dev` - Build development bundle
- `npm run lint` - Run lint
- `npm run lint:fix` - Run lint and auto-fix issues
- `npm run type-check` - Run TypeScript type checking

## CI/CD

### Pull Request Checks
All pull requests must pass the following checks:
- Lint validation
- TypeScript type checking
- Successful production build

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
│   │   └── Navigation.tsx
│   ├── pages/           # Page components
│   │   ├── Home.tsx
│   │   ├── Detergents.tsx
│   │   ├── Boosters.tsx
│   │   ├── Pretreaters.tsx
│   │   ├── Glossary.tsx
│   │   ├── CompareDetergents.tsx
│   │   ├── CompareBoosters.tsx
│   │   └── ComparePretreaters.tsx
│   ├── App.tsx          # Main app component with routes
│   ├── App.css          # Global styles
│   └── index.tsx        # Application entry point
├── dist/                # Production build output (generated)
├── eslint.config.js     # ESLint configuration
├── tsconfig.json        # TypeScript configuration
├── webpack.config.js    # Webpack configuration
└── package.json         # Project dependencies and scripts
```

## License
ISC


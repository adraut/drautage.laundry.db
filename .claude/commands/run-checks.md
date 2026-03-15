# Run All Quality Checks

Runs the full suite of quality checks for this repository.

## Usage

/run-checks

## Steps

```bash
npm run checks
```

This runs lint, type-check, tests, and format check in sequence.

If any check fails:

- **Lint**: run `npm run lint:fix`, then re-run `npm run lint`
- **Format**: run `npm run format:fix`, then re-run `npm run format`
- **Type errors**: fix manually — no auto-fix available
- **Test failures**: investigate and fix the underlying code issue

Report the result of each check.

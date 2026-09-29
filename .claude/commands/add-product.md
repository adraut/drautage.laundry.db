---
description: Add or update a product profile from a GitHub issue
argument-hint: <issue-number> [detergent|booster]
allowed-tools: Read, Write, Edit, Glob, Grep, WebFetch, Bash(gh:*), Bash(git:*), Bash(npm run:*)
---

<!--
Usage:   /add-product <issue-number> [type]
Example: /add-product 812
         /add-product 815 booster
The product type is normally read from the issue's label; pass it only to override.
-->

Add or update a laundry product profile from GitHub issue #$1.

If no issue number was given, stop and show the usage:
`/add-product <issue-number> [detergent|booster]`.

## 1. Read the issue and resolve the product type

Run `gh issue view $1 --json title,body,labels`. Extract brand, product
name, variant, product form (Liquid / Powder / Pod / …), data source
(Package / SDS), source URL(s), region, date accessed, and the ingredient
list.

Note whether the title starts with **"Add"** or **"Update"** — this decides
the rest of the workflow.

If the issue has the `invalid` label (bad OCR, or a generic ingredient list
with no SDS), stop: tell the user the issue is marked invalid and don't build
a profile unless they explicitly say to.

Resolve the product type using the order in
@.claude/skills/product-label-ocr/references/product-types.md
(the explicit argument `$2` if given, otherwise the issue's `Detergent` /
`Booster` label). From that table's row, take the **component dir**,
**profile class**, **profiles dir**, and **PR template** for every step
below. If the type is not supported, stop as that file instructs.

In the steps below, `<Type>` means the table's label (e.g. `Booster`) and
`<type>` its lowercase key (e.g. `booster`).

**Run steps 2, 3, and 4 in parallel.**

## 2. Read the instructions

- `AGENTS.md` (root)
- `<component dir>/AGENTS.md`, plus any AGENTS.md it defers to (the booster
  one defers to `src/components/Detergent/AGENTS.md` for ingredient rules)
- `src/components/common/types/AGENTS.md`

## 3. Check for an existing profile

Build the expected filename from brand, product name, and variant —
lowercase, hyphenated, with `+` spelled `plus` and `&` spelled `and`
(e.g. `tide-plus-power-pods-sport`):
`<profiles dir>/<brand>-<product>-<variant>.ts`

- **Add + file exists:** stop; say the profile exists and ask whether to
  treat this as an Update.
- **Add + no file:** proceed.
- **Update + file exists:** proceed.
- **Update + no file:** stop; say the profile is missing and ask how to
  proceed.

## 4. Fetch ingredient sources

Fetch the URL(s) in the issue. If a source is inaccessible (SmartLabel,
network restrictions), treat the issue's ingredient list as authoritative.

## 5. Normalize the ingredient list

Apply the extraction rules in section 4 of
`.claude/skills/product-label-ocr/SKILL.md` (order, "may contain",
P&G "MADE WITH", OR alternatives, colorants, alketh vs. pareth, enzymes).
In addition, when writing the profile:

- **Missing or unreadable ingredients:** use only what the issue or source
  states. Never fill gaps from similar products unless the issue says to;
  list every gap in the PR body.
- **"May contain" items:** add a `// may contain` inline comment on that
  line and list each as conditional in the PR body.
- **OR alternatives:** if a combined enum entry covers the exact pair (e.g.
  `SodiumMEALaurethSulfate` for "Sodium and/or MEA laureth sulfate"), use it.
- **Plural vs. singular:** "Fragrances" → `Ingredient.Fragrance`.
- **SmartLabel "Enzyme" suffix:** strip it (`Amylase Enzyme` → `Amylase`).

## 6. Create a branch

`git checkout -b <add|update>/<brand>-<product>` (lowercase, hyphenated).

## 7. Add new ingredients

Add any missing entries to `src/components/common/types/Ingredient.ts`
following `src/components/common/types/AGENTS.md`.

## 8. Create or update the profile

File: `<profiles dir>/<brand>-<product>-<variant>.ts`, following the
component AGENTS.md.

- **Add:** create the file with the table's **profile class**. Import
  `DataSource` from `'../../../common/product/types/DataSource'` and
  `ProductType` from `'../../../common/product/types/ProductType'`, and pass
  `DataSource.Package` or `DataSource.SDS` (from the issue's **Data source**)
  as the 4th constructor argument (between `type` and `ingredients`).
- **Update:** update `ingredients`, set `lastUpdated` to the issue's
  photographed/accessed date, and update `dataSource` if the issue differs.
  Change no other constructor arguments or optional fields unless the issue
  asks.

## 9. Export the profile (Add only)

Add the export to `<profiles dir>/index.ts` in alphabetical order. If the
file contains only the placeholder `export {};`, replace it.

## 10. Run checks

Run `npm run checks` and fix all failures.

## 11. Guard `package-lock.json`

If `package-lock.json` appears in `git status` or `git diff`, stop and
investigate — do not commit.

## 12. Commit

`git commit -m "feat: <add|update> <Brand> <Product Name> <type> profile (#$1)"`

If the product name already ends with the type word (e.g. "… Detergent",
"… Booster"), drop it so the message doesn't repeat it.

## 13. Open a draft PR

Follow the table's **PR template**. The title is the commit message without
the issue number (Conventional Commits prefix is required by
`lint-pr-title`).

```
gh pr create --draft \
  --title "feat: <add|update> <Brand> <Product Name> <type> profile" \
  --body "<body>"
```

Body for **Add**:

```
## Description

Closes #$1

Add <type> product: **<Brand> <Product Name>**

## Unknowns / Ambiguities

<uncertain ingredients, ambiguous terms, enzymes TBD — or 'None'>

## Source(s)

- **Primary source:** <URL>
- **Date accessed:** <date>
- **Region:** <region or 'not specified'>
```

Body for **Update**: same, but the description line is
`Update ingredient list for: **<Brand> <Product Name>**`, followed by:

```
## Changes

- **Added:** <ingredients, or 'None'>
- **Removed:** <ingredients, or 'None'>
```

## Rules

- Never modify `package-lock.json`.
- List every unknown in the PR — never invent placeholder ingredients.
- The PR must be a draft. If asked to mark it ready, first confirm every
  check passed (`gh pr checks <pr>`); do not chain `gh pr ready` onto
  `gh pr checks --watch`.

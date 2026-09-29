# Product types

Single source of truth for everything that differs between product
categories. Every product command (`/add-product`, `/create-product-issue`,
`/import-products`) resolves its category-specific paths, classes, labels,
and templates from this table — never hard-code them in a command.

| Key          | Label (GitHub) | Component dir               | Profile class      | Profiles dir                             | Issue templates                           | PR template                                  | Status        |
| ------------ | -------------- | --------------------------- | ------------------ | ---------------------------------------- | ----------------------------------------- | -------------------------------------------- | ------------- |
| `detergent`  | `Detergent`    | `src/components/Detergent`  | `DetergentProfile` | `src/components/Detergent/data/profiles` | `add-detergent.md`, `update-detergent.md` | `.github/PULL_REQUEST_TEMPLATE/detergent.md` | supported     |
| `booster`    | `Booster`      | `src/components/Booster`    | `BoosterProfile`   | `src/components/Booster/data/profiles`   | `add-booster.md`, `update-booster.md`     | `.github/PULL_REQUEST_TEMPLATE/booster.md`   | supported     |
| `pretreater` | —              | `src/components/Pretreater` | —                  | —                                        | —                                         | —                                            | not supported |

Issue templates live in `.github/ISSUE_TEMPLATE/`.

## Resolving the product type

1. **Explicit argument** (`detergent`, `booster`, `pretreater`, case-insensitive)
   wins.
2. **GitHub issue label** — `Detergent` or `Booster`.
3. **Packaging** — read the front image. Detergents say "detergent" and are
   the main wash product; boosters are sold as an add-in ("booster", "in-wash",
   "oxi", "scent booster", "odor remover", "laundry sanitizer" used alongside
   detergent); pretreaters are applied to stains before washing ("stain
   remover" sprays/sticks/gels, "pre-treat").
4. Still unsure → ask the user. Never guess between categories.

If the resolved type's status is **not supported**, stop and tell the user
that the category has no profile class, data directory, or templates yet, and
that those must be added (plus a row update here) before products can be
added. Do not improvise paths.

## Category-specific notes

- **Detergent** — the P&G "MADE WITH:" functional-category format is
  common (see SKILL.md section 4). Most profiles are `ProductType.Liquid`,
  `Pod`, or `Powder`.
- **Booster** — follows the detergent ingredient rules unchanged
  (`src/components/Booster/AGENTS.md`). Most profiles are
  `ProductType.Powder` or `Liquid`. While `data/profiles/index.ts` still
  contains the placeholder `export {};`, replace it when adding the first
  profile.

## Adding a new product type

1. Build the profile class, `data/profiles/` directory, `AGENTS.md`, issue
   templates, PR template, and GitHub label in the repo.
2. Update this table and set status to `supported`.
3. No command changes should be needed.

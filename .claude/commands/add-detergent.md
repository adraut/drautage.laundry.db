# Add Detergent from GitHub Issue

Adds a new detergent profile to the repository based on a GitHub issue.

## Usage

/add-detergent <issue_number>

## Steps

1. **Read the issue** to extract brand, product name, variant, detergent type,
   data source (Package / SDS), source URL(s), region, and ingredient list:

   ```
   gh issue view <issue_number>
   ```

   Note whether the issue title starts with **"Add"** or **"Update"** — this
   determines the rest of the workflow.

2. **Read the AGENTS.md files** before doing any work:
   - `AGENTS.md` (root)
   - `src/components/Detergent/AGENTS.md`
   - `src/components/common/types/AGENTS.md`

3. **Fetch ingredient sources** from the URL(s) in the issue. If sources are
   inaccessible (SmartLabel, network restrictions), use the ingredient list
   from the issue body as authoritative.

4. **Normalize the ingredient list** before mapping to enum values:

   **Order:** Preserve the exact printed sequence. Do not sort or reorder —
   ingredient order is significant.

   **"May contain" / conditional ingredients:** Include in the `ingredients`
   array. Add a `// may contain` inline comment on that line. Note each one
   in the PR body as conditional.

   **OR alternatives** (`"A or B"`, `"A and/or B"`):

   - If either option is already in the existing profile (Update issues), treat
     the OR pair as satisfied — do not add or remove anything for that pair.
   - If neither option is in the profile, use the **first-listed** option and
     discard the rest.
   - If a combined enum entry already exists that covers the exact OR pair (e.g.
     `SodiumMEALaurethSulfate` for "Sodium and/or MEA laureth sulfate"), map to
     that entry instead.

   **Functional-category labels (P&G "MADE WITH:" format):** Gain liquids,
   Tide Simply, and some other P&G products list ingredients by function group:
   `"Cleaning Agents: (A; B). Stabilizers: (C). Enzymes: (D). ... Colorants. Fragrances. Water."`

   - Water appears last in this format but is always first by concentration.
     **List Water first.**
   - Follow the printed category sequence for all other ingredients
     (Cleaning Agents → Stabilizers/Process Aids → Water Softener → Enzymes →
     Cleaning Aids → Odor Removers → Solvents → Preservative → Colorants →
     Fragrances).
   - Conditional phrases embedded in a category apply the "may contain" rule.

   **Colorants:**

   - Specific colorant named (e.g. `CI 42090`, `Pigment Blue 15`) → use that
     specific `Ingredient` enum entry.
   - Generic term only (`Colorants`, `Dyes`) → use `Ingredient.Colorants`.

   **Enzymes:** Name specific enzymes when named in the source. If the source
   lists "enzymes" generically, do not guess specific enzymes — note
   "enzymes TBD" in the PR body.

   **Plural vs. singular:** Source may list "Fragrances" (plural); map to
   `Ingredient.Fragrance` (singular).

   **SmartLabel "Enzyme" suffix:** Ingredients listed as "&lt;Name&gt; Enzyme"
   (e.g. `Amylase Enzyme`) should have the suffix stripped; treat the base
   name as the ingredient (e.g. `Amylase`).

5. **Create a new git branch**:
   - For **Add** issues: `git checkout -b add/<brand>-<product>`
   - For **Update** issues: `git checkout -b update/<brand>-<product>`

   Use lowercase, hyphenated names.

6. **Add new ingredients** to `src/components/common/types/Ingredient.ts`
   following the rules in `src/components/common/types/AGENTS.md`.

7. **Create or update the detergent profile file** at
   `src/components/Detergent/data/profiles/<brand>-<product>-<variant>.ts`
   following the rules in `src/components/Detergent/AGENTS.md`.
   - **Add issue:** create a new file. Import `DataSource` from
     `'../../types/DataSource'` and pass `DataSource.Package` or
     `DataSource.SDS` (from the issue's **Data source** field) as the 4th
     argument to the `DetergentProfile` constructor (between `type` and
     `ingredients`).
   - **Update issue:** the file already exists — update only the `ingredients`
     array and `dataSource` if the issue's **Data source** field differs from
     the current value. Do not change other `DetergentProfile` constructor
     arguments or optional fields unless the issue explicitly requests it.

8. **Export the new profile** in `src/components/Detergent/data/profiles/index.ts`
   in alphabetical order. (Skip this step for Update issues — the export already
   exists.)

9. **Run quality checks** and fix any failures:

   ```
   npm run checks
   ```

10. **Verify `package-lock.json` is not modified**. If it appears in `git status`
    or `git diff`, stop and investigate — do not commit or proceed.

11. **Commit the changes**:
    - For **Add** issues:
      ```
      git commit -m "feat: add <Brand> <Product Name> detergent profile (#<issue_number>)"
      ```
    - For **Update** issues:
      ```
      git commit -m "feat: update <Brand> <Product Name> detergent profile (#<issue_number>)"
      ```

12. **Open a draft PR** using the structure from `.github/PULL_REQUEST_TEMPLATE/detergent.md`:

    For **Add** issues:

    ```
    gh pr create \
      --draft \
      --title "Add <Brand> <Product Name>" \
      --body "## Description

    Closes #<issue_number>

    Add detergent product: **<Brand> <Product Name>**

    ## Unknowns / Ambiguities

    <list any uncertain ingredients, ambiguous terms, or enzymes TBD>

    ## Source(s)

    - **Primary source:** <URL>
    - **Date accessed:** <date>
    - **Region:** <region or 'not specified'>
    "
    ```

    For **Update** issues:

    ```
    gh pr create \
      --draft \
      --title "Update <Brand> <Product Name>" \
      --body "## Description

    Closes #<issue_number>

    Update ingredient list for: **<Brand> <Product Name>**

    ## Changes

    - **Added:** <list added ingredients, or 'None'>
    - **Removed:** <list removed ingredients, or 'None'>

    ## Unknowns / Ambiguities

    <list any uncertain ingredients, ambiguous terms, or enzymes TBD>

    ## Source(s)

    - **Primary source:** <URL>
    - **Date accessed:** <date>
    - **Region:** <region or 'not specified'>
    "
    ```

## Notes

- Do not modify `package-lock.json` under any circumstances.
- List all unknowns in the PR — do not invent placeholder ingredients.
- The PR must be a draft. Never open a ready-for-review PR.

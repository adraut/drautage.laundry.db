# Add Detergent from GitHub Issue

Adds a new detergent profile to the repository based on a GitHub issue.

## Usage

/add-detergent <issue_number>

## Steps

1. **Read the issue** to extract brand, product name, variant, detergent type,
   source URL(s), region, and ingredient list:

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

4. **Create a new git branch**:
   - For **Add** issues: `git checkout -b add/<brand>-<product>`
   - For **Update** issues: `git checkout -b update/<brand>-<product>`

   Use lowercase, hyphenated names.

5. **Add new ingredients** to `src/components/common/types/Ingredient.ts`
   following the rules in `src/components/common/types/AGENTS.md`.

6. **Create or update the detergent profile file** at
   `src/components/Detergent/data/profiles/<brand>-<product>-<variant>.ts`
   following the rules in `src/components/Detergent/AGENTS.md`.
   - **Add issue:** create a new file.
   - **Update issue:** the file already exists — update only the `ingredients`
     array. Do not change the `DetergentProfile` constructor arguments or any
     optional fields unless the issue explicitly requests it.

7. **Export the new profile** in `src/components/Detergent/data/profiles/index.ts`
   in alphabetical order. (Skip this step for Update issues — the export already
   exists.)

8. **Run quality checks** and fix any failures:

   ```
   npm run checks
   ```

9. **Verify `package-lock.json` is not modified**. If it appears in `git status`
   or `git diff`, stop and investigate — do not commit or proceed.

10. **Commit the changes**:
    - For **Add** issues:
      ```
      git commit -m "feat: add <Brand> <Product Name> detergent profile (#<issue_number>)"
      ```
    - For **Update** issues:
      ```
      git commit -m "feat: update <Brand> <Product Name> detergent profile (#<issue_number>)"
      ```

11. **Open a draft PR** using the structure from `.github/PULL_REQUEST_TEMPLATE/detergent.md`:

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
- If enzymes are listed generically, note "enzymes TBD" in the PR body.
- List all unknowns in the PR — do not invent placeholder ingredients.
- The PR must be a draft. Never open a ready-for-review PR.

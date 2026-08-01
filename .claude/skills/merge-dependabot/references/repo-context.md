# Repo context for merge-dependabot

Facts gathered from the live repo. Re-verify with
`gh api repos/{owner}/{repo}/rulesets/12323881` if behavior stops matching this document.

## The `main` ruleset (id `12323881`)

| Rule / setting                                   | Value              | Consequence                                                        |
| ------------------------------------------------ | ------------------ | ------------------------------------------------------------------ |
| `required_approving_review_count`                | `1`                | The sole blocker on healthy Dependabot PRs. No bot can satisfy it. |
| `dismiss_stale_reviews_on_push`                  | `true`             | A rebase **erases** a prior approval.                              |
| `require_last_push_approval`                     | `true`             | The approval must come after the final push.                       |
| `required_review_thread_resolution`              | `true`             | An unresolved thread blocks the merge **after** a green approval.  |
| `required_status_checks`                         | strict             | Branch must be up to date; every merge stales the rest.            |
| `code_quality`                                   | `severity: errors` | Can block independently of the two named checks.                   |
| `allowed_merge_methods`                          | `["squash"]`       | Matches the workflow's `--squash`.                                 |
| `required_linear_history`, `required_signatures` | `true`             | Dependabot's own commits satisfy both.                             |
| `require_code_owner_review`                      | `true`             | Currently a **no-op** — no CODEOWNERS file exists.                 |

`required_review_thread_resolution` produces the confusing state "approved, auto-merge on,
never merges." Run the GraphQL `reviewThreads` query in SKILL.md step 2 before assuming a
stall is Dependabot's fault — the field is not available on `gh pr view`.

## Required checks

- `lint-and-build`
- `CodeQL`

**Gotcha:** `CodeQL` reports `conclusion: NEUTRAL`, and **NEUTRAL counts as passing.**
Treating it as a failure would make the skill refuse every PR. Only `FAILURE`,
`TIMED_OUT`, `CANCELLED`, and `ACTION_REQUIRED` are failures.

Non-required checks may be red without blocking the merge. The two above are the entire
`required_status_checks` list — do not assume every entry in `statusCheckRollup` gates.

## Auto-merge and its path filter

`.github/workflows/dependabot-auto-merge.yml` runs `gh pr merge --auto --squash "$PR_URL"`,
guarded by `if: github.actor == 'dependabot[bot]'` plus a sender-type verification step.
When it runs, `autoMergeRequest` is set and the merge fires the moment `reviewDecision`
becomes `APPROVED` and checks are green. **Never merge manually.**

**But it is path-filtered** to `**/package.json`, `**/package-lock.json`, and `.github/**`.
A Dependabot PR touching nothing in those paths never gets auto-merge enabled, so approving
it accomplishes nothing and the skill would wait on a merge that cannot happen. **Always
check `autoMergeRequest` for null** before approving; report `BLOCKED:no-auto-merge` if it
is. Every npm and Actions PR qualifies; a new ecosystem (Docker, submodules) would not.

## Dependabot comment commands

Supported: `@dependabot rebase`, `@dependabot recreate`.

**Removed 2026-01-27** — never emit these, they are silently ignored:
`merge`, `cancel merge`, `squash and merge`, `close`, `reopen`.

### Acknowledgement protocol

Dependabot acknowledges a command with a 👍 reaction and by rewriting the PR body to
contain `Dependabot is rebasing this PR`, then rewrites it again when finished.
Acknowledgement can take several minutes when it is busy. Treat the marker as
**"working"**, not "finished" — only a changed `headRefOid` means the rebase landed.

### Anti-spam (critical for `/loop`)

Before posting `@dependabot rebase`:

```bash
gh pr view <N> --json comments,headRefOid
```

Skip the comment if a rebase comment already exists that is **newer than the current head
commit**. Cap at **two nudges per head commit** — a new `headRefOid` resets the count, so
a PR that legitimately rebases twice still gets help, while a dead one stops accumulating
comments across `/loop` iterations.

### 30-day staleness

Dependabot stops auto-rebasing PRs untouched for 30 days. Flag those for a manual
`@dependabot recreate` rather than waiting on the normal rebase path.

## Cadence

Dependabot opens roughly five grouped PRs every Friday. Newer grouped PRs frequently
supersede older ones, which is why the queue is processed newest → oldest: an older PR
often closes itself once a newer one merges.

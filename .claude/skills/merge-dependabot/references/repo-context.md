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

The cap is a **count**, not a "does one already exist" check: at most **two** nudge
comments (`@dependabot rebase` or `@dependabot recreate`, combined) are allowed per head
commit. A push resets `headRefOid`, which resets the count to zero — that's what lets a PR
that legitimately needs rebasing twice still get help, while a dead one stops accumulating
comments across `/loop` iterations.

```bash
.claude/skills/merge-dependabot/scripts/count-nudges.sh <N>
```

This counts comments matching `@dependabot rebase`/`@dependabot recreate` whose `createdAt`
is after `.commits[-1].committedDate` (i.e., posted since the PR was last actually pushed to
— comments from before that push targeted a now-superseded head and don't count). Post the
nudge only if that count is **0 or 1**; skip once it reaches 2 and record
`BLOCKED:no-rebase-response` instead.

Run this check before **every** nudge, including the first one for a `BEHIND` PR — never
assume the count based on where you are in the skill's own flow. A prior `/loop` invocation
may have already posted one or both nudges for this exact head commit (it never changed, so
the count carries over); the skill's two-nudge escalation (an immediate nudge on first
seeing `BEHIND`, then one retry after 5 minutes of silence — see `SKILL.md` step 3) is
_designed_ to fit this budget, but only an actual count check confirms it hasn't already
been spent by an earlier run.

### 30-day staleness

Dependabot stops auto-rebasing PRs untouched for 30 days. Flag those for a manual
`@dependabot recreate` rather than waiting on the normal rebase path. Measure "untouched"
from the PR's **last commit** (`.commits[-1].committedDate`), not `updatedAt` — posting a
nudge comment or any other activity bumps `updatedAt` without Dependabot having touched
the branch, which would make an old PR look fresh again on the very next `/loop` pass and
flip it back to the `rebase` path it will never respond to.

## Cadence

Dependabot opens roughly five grouped PRs every Friday. Newer grouped PRs frequently
supersede older ones, which is why the queue is processed newest → oldest: an older PR
often closes itself once a newer one merges.

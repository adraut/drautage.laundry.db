---
name: merge-dependabot
description: This skill should be used when the user asks to "merge dependabot PRs", "clear the dependabot queue", "handle dependency updates", "approve dependabot", or runs /merge-dependabot. Approves Dependabot PRs whose required checks are green so the existing auto-merge workflow completes them, triggers @dependabot rebase on stale ones, and reports PRs needing manual intervention.
allowed-tools: Bash, Agent, TodoWrite, Read
---

# Merge Dependabot PRs

Drain the open Dependabot pull request queue by approving PRs whose required checks
are green, letting `.github/workflows/dependabot-auto-merge.yml` complete the merge.

The only blocker on a healthy Dependabot PR here is `REVIEW_REQUIRED` — the `main`
ruleset demands one approving review and no bot can supply it. Auto-merge is already
enabled by the workflow, so **an approval is the action; a merge is not.**

Read `references/repo-context.md` before the first decision of a run.

## Constraints that dictate the algorithm

- `dismiss_stale_reviews_on_push` + `require_last_push_approval` mean a rebase **erases**
  a prior approval. The order is forced: **update → checks green → approve.** Never
  approve a PR that is `BEHIND`.
- `required_status_checks` is **strict** — every merge makes the remaining PRs stale.
  Process PRs **strictly one at a time**, never in parallel.

Run inventory, decisions, approvals, and waiting inline in this session. Delegate to a
subagent for exactly one case: a red required check (step 5).

## Workflow

### 1. Inventory

```bash
gh pr list --author "app/dependabot" --state open --limit 50 \
  --json number,title,createdAt,mergeStateStatus,mergeable,reviewDecision,autoMergeRequest,statusCheckRollup
```

Sort **newest → oldest**; newer grouped PRs frequently supersede older ones. Seed
`TodoWrite` with one item per PR.

If the user passed `--dry-run`, print the decision table (PR, title, state, intended
action) and stop. Perform zero writes.

### 2. Process one PR at a time

Substitute the PR number for `<N>` throughout. Re-fetch state per PR rather than
trusting the inventory snapshot — an earlier merge in this run may have invalidated it:

```bash
gh pr view <N> --json number,title,state,mergeStateStatus,mergeable,reviewDecision,autoMergeRequest,statusCheckRollup,headRefOid
```

Required checks are exactly `lint-and-build` and `CodeQL`; `NEUTRAL` counts as passing
(see `references/repo-context.md`):

```bash
gh pr view <N> --json statusCheckRollup \
  -q '.statusCheckRollup[] | select(.name=="lint-and-build" or .name=="CodeQL") | "\(.name) \(.conclusion // .status)"'
```

Unresolved review threads are **not** a `gh pr view` field — they need GraphQL:

```bash
gh api graphql -f query='query($o:String!,$r:String!,$n:Int!){repository(owner:$o,name:$r){pullRequest(number:$n){reviewThreads(first:100){nodes{isResolved}}}}}' \
  -F o='{owner}' -F r='{repo}' -F n=<N> \
  --jq '[.data.repository.pullRequest.reviewThreads.nodes[]|select(.isResolved==false)]|length'
```

Decide. Evaluate rows top-down and take the first match:

| Observed state                                          | Action                                                         |
| ------------------------------------------------------- | -------------------------------------------------------------- |
| `state` is `MERGED` / `CLOSED`                          | Drop — superseded by a newer group PR                          |
| `mergeStateStatus` **or** `mergeable` is `UNKNOWN`      | **Unsettled** — settle first, below, then re-decide            |
| `reviewDecision: APPROVED`, auto-merge on, checks green | Nothing — re-entrancy guard                                    |
| `autoMergeRequest` is null                              | Record `BLOCKED:no-auto-merge` (workflow path filter)          |
| unresolved threads > 0                                  | Record `BLOCKED:unresolved-threads` — a human must resolve     |
| `mergeStateStatus: BEHIND`                              | Arm the waiter (step 3)                                        |
| `mergeable: CONFLICTING` / `DIRTY`                      | Post `@dependabot recreate` once, then arm the waiter          |
| required checks `PENDING`                               | Wait for checks, below → else `BLOCKED:checks-pending`         |
| any required check failed                               | Delegate triage (step 5); record `BLOCKED:check-failed:<name>` |
| `BLOCKED` + `MERGEABLE` + checks green                  | Approve, below                                                 |

#### Settle an `UNKNOWN` state before classifying

GitHub recomputes mergeability after every merge to `main`, and reports `UNKNOWN` on one
or both fields while it does — observed lasting over a minute on this repo. **Never
approve an unsettled PR.** `BEHIND` frequently hides under `UNKNOWN`, and approving a
`BEHIND` PR gets the approval silently discarded by `require_last_push_approval`.

```bash
PR=<N>; DEADLINE=$((SECONDS+180))
while [ $SECONDS -lt $DEADLINE ]; do
  read -r MSS MRG < <(gh pr view "$PR" --json mergeStateStatus,mergeable \
    -q '"\(.mergeStateStatus) \(.mergeable)"')
  [ "$MSS" != "UNKNOWN" ] && [ "$MRG" != "UNKNOWN" ] && { echo "SETTLED $PR $MSS $MRG"; exit 0; }
  sleep 20
done
echo "UNSETTLED $PR — still UNKNOWN after 180s"
```

On `SETTLED`, re-run the decision table with the new values. On `UNSETTLED`, record
`BLOCKED:mergeable-unknown`.

#### Wait for pending required checks

```bash
PR=<N>; DEADLINE=$((SECONDS+600))
while [ $SECONDS -lt $DEADLINE ]; do
  PENDING=$(gh pr view "$PR" --json statusCheckRollup \
    -q '[.statusCheckRollup[] | select(.name=="lint-and-build" or .name=="CodeQL")
         | select((.conclusion // "") == "")] | length')
  [ "$PENDING" = "0" ] && { echo "CHECKS_DONE $PR"; exit 0; }
  sleep 30
done
echo "CHECKS_PENDING $PR — still running after 600s"
```

#### Approve

```bash
gh pr review <N> --approve --body "Required checks green; approving to release auto-merge."
gh pr view <N> --json reviewDecision -q .reviewDecision    # expect APPROVED
```

Confirm the merge, bounded:

```bash
DEADLINE=$((SECONDS+300))
while [ $SECONDS -lt $DEADLINE ]; do
  STATE=$(gh pr view <N> --json state -q .state)
  [ "$STATE" != "OPEN" ] && { echo "MERGE_STATE=$STATE"; break; }
  sleep 20
done
```

On `MERGED`, re-inventory and advance to the next PR. The rest of the queue will have
flipped to `BEHIND`; leave it alone. Act on **only that one PR** — never arm a waiter for,
comment on, or rebase the others. Each subsequent merge re-stales everything behind it, so
rebasing the queue in bulk costs a redundant `lint-and-build` + `CodeQL` run per PR per
merge (~21 runs to drain six PRs, against six done sequentially) and ends in the same place.

### 3. Wait with an escalating nudge

**Exactly one waiter runs at a time**, for the PR currently being processed. Other
`BEHIND` PRs are not monitored and not nudged — their turn comes after this one merges.

Dependabot often rebases stale PRs unprompted, but not reliably. Never assume it picked
up the work: `mergeStateStatus` reads `BEHIND` for both an idle PR and one mid-rebase,
so watch two independent signals instead.

| Signal                                         | Meaning                                        |
| ---------------------------------------------- | ---------------------------------------------- |
| `headRefOid` changed from baseline             | Rebase **landed** — terminal success           |
| Body contains `Dependabot is rebasing this PR` | **Acknowledged**, still working — keep waiting |
| Neither, past threshold                        | **Stalled** — needs a nudge                    |

Run the waiter with `Bash(run_in_background: true)` so it emits one notification and exits:

```bash
PR=<N>
BASE_OID=$(gh pr view "$PR" --json headRefOid -q .headRefOid)
DEADLINE=$((SECONDS+240)); ACKED=0
while [ $SECONDS -lt $DEADLINE ]; do
  sleep 30
  OID=$(gh pr view "$PR" --json headRefOid -q .headRefOid) || continue
  [ -n "$OID" ] && [ "$OID" != "$BASE_OID" ] && { echo "REBASED $PR"; exit 0; }
  # Test positively: GitHub returns UNKNOWN while recomputing mergeability.
  MSS=$(gh pr view "$PR" --json mergeStateStatus -q .mergeStateStatus)
  case "$MSS" in
    BLOCKED|CLEAN|HAS_HOOKS) echo "READY $PR"; exit 0 ;;
  esac
  if [ $ACKED -eq 0 ] && gh pr view "$PR" --json body -q .body | grep -q "Dependabot is rebasing this PR"; then
    ACKED=1; DEADLINE=$((SECONDS+600)); echo "ACK $PR — dependabot working"
  fi
done
echo "NUDGE $PR — no rebase activity"
```

Escalation:

- **0–4 min** — poll every 30s for a `headRefOid` change or the rebasing marker.
- **`NUDGE` at 4 min** — post `@dependabot rebase` (subject to the anti-spam check in
  `references/repo-context.md`), then re-arm the waiter with a 10-minute window.
- **Second timeout** — record `BLOCKED:no-rebase-response`. Do not nudge a third time.

Every exit path prints a line, so a `/loop` run never hangs on a job that never started.

### 4. Terminate and report

Stop when the queue is empty or only blocked items remain. Emit a final table:
PR, title, outcome, reason.

### 5. Triage a failed check (subagent)

Only when a required check is red. Dispatch with
`Agent(subagent_type: "general-purpose", model: "sonnet", run_in_background: false)`
using the prompt in `references/triage-prompt.md`. It returns a short summary; the CI
log itself never enters this session.

## Re-entrancy

Safe under `/loop 30m /merge-dependabot`. A PR already `APPROVED` with auto-merge on and
green checks is skipped — no duplicate review. Rebase comments are capped at two per head
commit, so repeated runs never accumulate comments on a dead PR.

## Notes

- **No code changes.** Never edit files, never `git push`, never hand-edit
  `package-lock.json`. A PR needing a code fix is reported, not fixed.
- **Never `gh pr merge --admin`.** Admin rights exist and the ruleset has a bypass, but
  using it skips required checks. Approve and let the workflow merge.
- **Never `gh pr close`.** Let Dependabot supersede its own PRs.
- Only `@dependabot rebase` and `recreate` still work. Never emit `merge`, `cancel merge`,
  `squash and merge`, `close`, or `reopen`.

## Additional Resources

- **`references/repo-context.md`** — ruleset settings, check-name gotchas, the auto-merge
  path filter, anti-spam rules.
- **`references/triage-prompt.md`** — verbatim prompt for the failed-check subagent.

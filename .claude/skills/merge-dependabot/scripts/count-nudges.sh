#!/usr/bin/env bash
# Count @dependabot rebase/recreate nudge comments posted since the PR's
# last actual push (per the anti-spam cap in references/repo-context.md).
# A push resets headRefOid and this count back to zero, since only comments
# newer than the current head commit's committedDate are counted — earlier
# comments targeted a now-superseded head and don't carry over.
# Usage: count-nudges.sh <PR_NUMBER>
set -euo pipefail
PR="$1"
gh pr view "$PR" --json comments,commits -q '
  (.commits[-1].committedDate) as $since |
  [.comments[] | select(.createdAt > $since) | select(.body | test("@dependabot (rebase|recreate)"))]
  | length
'

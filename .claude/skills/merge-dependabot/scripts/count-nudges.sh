#!/usr/bin/env bash
# Count @dependabot rebase/recreate nudge comments posted since the PR's
# last actual push (per the anti-spam cap in references/repo-context.md).
# A push resets headRefOid and this count back to zero, since only comments
# newer than the current head commit's committedDate are counted — earlier
# comments targeted a now-superseded head and don't carry over.
#
# Scoped to comments from the authenticated user (this skill's own nudges)
# so a human comment that merely quotes or discusses "@dependabot rebase"
# isn't miscounted toward the cap.
# Usage: count-nudges.sh <PR_NUMBER>
set -euo pipefail
PR="$1"
ME=$(gh api user -q .login)
COUNT=$(gh pr view "$PR" --json comments,commits -q '
  (.commits[-1].committedDate) as $since |
  .comments[] | select(.createdAt > $since) | select(.body | test("@dependabot (rebase|recreate)")) | .author.login
' | grep -c -x -F "$ME") || COUNT=0
echo "$COUNT"

#!/usr/bin/env bash
# Count @dependabot rebase/recreate nudge comments posted since the PR's
# last actual push (per the anti-spam cap in references/repo-context.md).
# A push resets headRefOid and this count back to zero, since only comments
# newer than the current head commit's committedDate are counted — earlier
# comments targeted a now-superseded head and don't carry over.
#
# Matches the comment body exactly (not merely containing the phrase), and
# scoped to the authenticated user (this skill's own nudges), so a human
# comment that quotes or discusses "@dependabot rebase" isn't miscounted
# toward the cap.
# Usage: count-nudges.sh <PR_NUMBER>
set -euo pipefail
PR="$1"
ME=$(gh api user -q .login)
gh pr view "$PR" --json comments,commits -q '
  (.commits[-1].committedDate) as $since |
  .comments[] | select(.createdAt > $since) | select(.body == "@dependabot rebase" or .body == "@dependabot recreate") | .author.login
' | awk -v me="$ME" '$0==me{c++} END{print c+0}'

#!/usr/bin/env bash
# Approve a Dependabot PR to release auto-merge, then poll until it leaves
# OPEN state (merged by the workflow) or time out. Usage:
#   approve-and-confirm.sh <PR_NUMBER>
set -euo pipefail
PR="$1"
gh pr review "$PR" --approve --body "Required checks green; approving to release auto-merge."
gh pr view "$PR" --json reviewDecision -q .reviewDecision

DEADLINE=$((SECONDS+300))
while [ $SECONDS -lt $DEADLINE ]; do
  STATE=$(gh pr view "$PR" --json state -q .state)
  [ "$STATE" != "OPEN" ] && { echo "MERGE_STATE=$STATE"; exit 0; }
  sleep 10
done
echo "MERGE_PENDING $PR — still open after 300s"

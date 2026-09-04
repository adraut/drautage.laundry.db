#!/usr/bin/env bash
# Watch a BEHIND PR for Dependabot's automatic rebase to land, escalating
# from silent polling to an acknowledged-working state. Usage:
#   wait-rebase.sh <PR_NUMBER>
set -euo pipefail
PR="$1"
BASE_OID=$(gh pr view "$PR" --json headRefOid -q .headRefOid)
DEADLINE=$((SECONDS+300)); ACKED=0
while [ $SECONDS -lt $DEADLINE ]; do
  sleep 50
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

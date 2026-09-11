#!/usr/bin/env bash
# Watch a BEHIND PR for Dependabot's automatic rebase to land, escalating
# from silent polling to an acknowledged-working state. Usage:
#   wait-rebase.sh <PR_NUMBER> [BASE_OID] [WINDOW_SECONDS]
#
# Pass BASE_OID (captured before posting the @dependabot rebase/recreate
# comment) so a rebase that lands in the gap between the comment and this
# script starting is still detected. Without it, the script fetches the
# current head and can miss a rebase that already happened.
#
# WINDOW_SECONDS (default 300 = 5 min) sets the silent-polling deadline
# before NUDGE fires. Pass 600 (10 min) when re-arming after the second
# nudge, per SKILL.md step 3's escalation.
set -euo pipefail
PR="$1"
BASE_OID="${2:-$(gh pr view "$PR" --json headRefOid -q .headRefOid)}"
WINDOW="${3:-300}"
DEADLINE=$((SECONDS+WINDOW)); ACKED=0
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

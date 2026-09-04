#!/usr/bin/env bash
# Poll a PR until mergeStateStatus/mergeable leave UNKNOWN, or time out.
# Usage: settle-unknown.sh <PR_NUMBER>
set -euo pipefail
PR="$1"
DEADLINE=$((SECONDS+180))
while [ $SECONDS -lt $DEADLINE ]; do
  read -r MSS MRG < <(gh pr view "$PR" --json mergeStateStatus,mergeable \
    -q '"\(.mergeStateStatus) \(.mergeable)"')
  [ "$MSS" != "UNKNOWN" ] && [ "$MRG" != "UNKNOWN" ] && { echo "SETTLED $PR $MSS $MRG"; exit 0; }
  sleep 30
done
echo "UNSETTLED $PR — still UNKNOWN after 180s"

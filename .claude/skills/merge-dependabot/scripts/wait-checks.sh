#!/usr/bin/env bash
# Poll a PR until required checks (lint-and-build, CodeQL) finish, or time out.
# Usage: wait-checks.sh <PR_NUMBER>
set -euo pipefail
PR="$1"
DEADLINE=$((SECONDS+600))
while [ $SECONDS -lt $DEADLINE ]; do
  PENDING=$(gh pr view "$PR" --json statusCheckRollup \
    -q '[.statusCheckRollup[] | select(.name=="lint-and-build" or .name=="CodeQL")
         | select((.conclusion // "") == "")] | length')
  [ "$PENDING" = "0" ] && { echo "CHECKS_DONE $PR"; exit 0; }
  sleep 30
done
echo "CHECKS_PENDING $PR — still running after 600s"

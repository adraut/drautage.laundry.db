#!/usr/bin/env bash
# Print the count of unresolved review threads on a PR (GraphQL; not a gh pr view field).
# Usage: unresolved-threads.sh <OWNER> <REPO> <PR_NUMBER>
# reviewThreads(first:100) is unpaginated — a dependency-bump PR won't have
# 100+ threads in practice, but a PR that did would undercount here.
set -euo pipefail
OWNER="$1"; REPO="$2"; PR="$3"
gh api graphql -f query='query($o:String!,$r:String!,$n:Int!){repository(owner:$o,name:$r){pullRequest(number:$n){reviewThreads(first:100){nodes{isResolved}}}}}' \
  -F o="$OWNER" -F r="$REPO" -F n="$PR" \
  --jq '[.data.repository.pullRequest.reviewThreads.nodes[]|select(.isResolved==false)]|length'

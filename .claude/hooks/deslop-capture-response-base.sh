#!/usr/bin/env bash
# UserPromptSubmit hook: snapshot the tree so the paired Stop hook can diff
# against it and see only what THIS response changed, not the branch delta.
#
# git stash create records HEAD + index + working tree as a commit object
# without touching the working tree. Empty on a clean tree -> use HEAD.
set -euo pipefail

command -v python3 >/dev/null 2>&1 || exit 0 # fail open; hook is best-effort

SESSION_ID=$(python3 -c 'import json,sys; print(json.load(sys.stdin).get("session_id",""))' 2>/dev/null || echo "")
[ -z "$SESSION_ID" ] && exit 0

git rev-parse --git-dir >/dev/null 2>&1 || exit 0

SNAPSHOT_SHA=$(git stash create 2>/dev/null || true)
if [ -z "$SNAPSHOT_SHA" ]; then
  SNAPSHOT_SHA=$(git rev-parse HEAD 2>/dev/null || echo "")
fi
[ -z "$SNAPSHOT_SHA" ] && exit 0

echo "$SNAPSHOT_SHA" > "/tmp/claude-response-base-${SESSION_ID}"

# Reset the Stop-hook loop guard: this response gets one nudge.
rm -f "/tmp/claude-deslop-ran-${SESSION_ID}"

exit 0

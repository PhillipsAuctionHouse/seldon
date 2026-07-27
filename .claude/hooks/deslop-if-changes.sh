#!/bin/bash
# Stop hook: nudge Claude to run the deslop skill before stopping, but only
# when this response changed src/ code — diffed against the snapshot taken by
# the paired UserPromptSubmit hook.
set -euo pipefail

command -v python3 >/dev/null 2>&1 || exit 0 # fail open; hook is best-effort

SESSION_ID=$(python3 -c 'import json,sys; print(json.load(sys.stdin).get("session_id",""))' 2>/dev/null || echo "")
[ -z "$SESSION_ID" ] && exit 0

MARKER="/tmp/claude-deslop-ran-${SESSION_ID}"
BASE_FILE="/tmp/claude-response-base-${SESSION_ID}"

# Guards Stop -> block -> deslop -> Stop looping; reset on UserPromptSubmit.
[ -f "$MARKER" ] && exit 0

# No snapshot: session started with -p, or resumed from before hook install.
[ -f "$BASE_FILE" ] || exit 0

git rev-parse --git-dir >/dev/null 2>&1 || exit 0

BASE=$(cat "$BASE_FILE")

# Extensions are filtered with grep, not a pathspec: git treats 'src/**/*.ts'
# as needing an intermediate directory, so it misses top-level src/index.ts.
# `|| true` is load-bearing — grep exits 1 on no match, which under pipefail
# would abort with exit 1 (a hook error) on every response that skips src/.
CHANGED=$(git diff --name-only "$BASE" -- src 2>/dev/null \
  | grep -E '\.(ts|tsx|scss)$' | head -1 || true)

[ -z "$CHANGED" ] && exit 0

touch "$MARKER"

cat <<'EOF' >&2
Before stopping: invoke the `deslop` skill via the Skill tool on the current diff.
Focus on src/ files changed during THIS response (diffed against the snapshot
captured when the user's prompt landed). Keep behavior unchanged; keep edits
minimal and focused.
EOF
exit 2

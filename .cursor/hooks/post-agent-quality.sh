#!/usr/bin/env bash
# Cursor `stop` hook for post-agent quality checks.
# Behavior:
# 1) Foreground agent completion -> schedule one background follow-up agent run.
# 2) Background follow-up completion -> run quality checks (format, lint, test).
#
# Hook I/O:
# - reads JSON input on stdin
# - writes JSON output on stdout

set -uo pipefail

INPUT="$(cat || true)"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
cd "${ROOT}" || {
  echo '{}'
  exit 0
}

if [[ ! -f package.json ]]; then
  echo '{}'
  exit 0
fi

IS_BACKGROUND=0
IS_COMPLETED=0
LOOP_ZERO=0

if echo "${INPUT}" | rg -q '"is_background_agent"\s*:\s*true'; then
  IS_BACKGROUND=1
fi
if echo "${INPUT}" | rg -q '"status"\s*:\s*"completed"'; then
  IS_COMPLETED=1
fi
if echo "${INPUT}" | rg -q '"loop_count"\s*:\s*0'; then
  LOOP_ZERO=1
fi

# Only react to successful completions.
if [[ "${IS_COMPLETED}" -ne 1 ]]; then
  echo '{}'
  exit 0
fi

# Foreground pass: request one background-only follow-up run.
if [[ "${IS_BACKGROUND}" -ne 1 ]]; then
  if [[ "${LOOP_ZERO}" -eq 1 ]]; then
    cat <<'JSON'
{"followup_message":"Run this as a background agent only: execute project quality checks from docs/agents/QUALITY.md (npm run format && npm run lint && npm run test). Report concise pass/fail and the first failing command output if anything fails. Do not make code edits in this pass."}
JSON
    exit 0
  fi

  echo '{}'
  exit 0
fi

# Background pass: perform the checks.
FAILED=0

echo "" >&2
echo "=== Seldon background quality hook (format -> lint -> test) ===" >&2

if ! npm run format >&2; then
  FAILED=1
  echo "post-agent-quality: npm run format failed" >&2
fi

if ! npm run lint >&2; then
  FAILED=1
  echo "post-agent-quality: npm run lint failed" >&2
fi

if ! npm run test >&2; then
  FAILED=1
  echo "post-agent-quality: npm run test failed" >&2
fi

if [[ "${FAILED}" -ne 0 ]]; then
  echo "post-agent-quality: finished with failures (see logs)." >&2
else
  echo "post-agent-quality: format, lint, and test completed successfully." >&2
fi

echo '{}'
exit 0

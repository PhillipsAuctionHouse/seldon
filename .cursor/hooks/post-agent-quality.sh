#!/usr/bin/env bash
# Cursor `stop` hook for post-agent quality checks.
#
# Behavior:
# - On a successful foreground agent completion (loop_count 0), run
#   format → lint → test quietly.
# - On success: emit no chat follow-up (`{}`).
# - On failure: emit a short `followup_message` with the failing step and
#   a truncated log so the failure is visible in chat.
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

# Only foreground completions on the first stop loop — no chat noise from
# background agents or follow-up turns.
if [[ "${IS_COMPLETED}" -ne 1 || "${IS_BACKGROUND}" -eq 1 || "${LOOP_ZERO}" -ne 1 ]]; then
  echo '{}'
  exit 0
fi

LOG="$(mktemp -t seldon-post-agent-quality.XXXXXX)"
trap 'rm -f "${LOG}"' EXIT

FAILED_STEP=""

run_step() {
  local name="$1"
  shift
  if [[ -n "${FAILED_STEP}" ]]; then
    return 0
  fi
  {
    echo ""
    echo "=== ${name} ==="
  } >>"${LOG}"
  if ! "$@" >>"${LOG}" 2>&1; then
    FAILED_STEP="${name}"
  fi
}

run_step "npm run format" npm run format
run_step "npm run lint" npm run lint
run_step "npm run test" npm run test

if [[ -z "${FAILED_STEP}" ]]; then
  echo '{}'
  exit 0
fi

# Truncate log for chat; keep the tail where command failures usually land.
LOG_TAIL="$(tail -n 40 "${LOG}" | sed 's/[[:space:]]*$//')"

FOLLOWUP="$(
  cat <<EOF
post-agent-quality failed on \`${FAILED_STEP}\`. Do not re-run the full skill audit. Briefly report this failure to the user (no code edits unless they ask).

\`\`\`
${LOG_TAIL}
\`\`\`
EOF
)"

# Safe JSON for Cursor followup_message.
if ! command -v python3 >/dev/null 2>&1; then
  printf '{"followup_message":"post-agent-quality failed on %s (python3 unavailable to format log)."}\n' "${FAILED_STEP}"
  exit 0
fi

printf '%s' "${FOLLOWUP}" | python3 -c 'import json, sys; print(json.dumps({"followup_message": sys.stdin.read()}))'

exit 0

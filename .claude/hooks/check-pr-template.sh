#!/usr/bin/env bash
# PreToolUse hook: blocks `gh pr create` / `gh pr edit` when passed an inline
# `--body` that omits any bold section header from .github/PULL_REQUEST_TEMPLATE.MD.
# Mirrors the extraction logic in .github/workflows/pr-template-and-prefix.yaml
# so the local check and CI stay in lock-step when the template changes.
#
# Bypasses the check when `--body-file` is used (content lives in a file we
# can't reliably parse from the command line — CI will still enforce).

set -u

cmd=$(jq -r '.tool_input.command // empty')

case "$cmd" in
  *"gh pr create"*|*"gh pr edit"*) ;;
  *) exit 0 ;;
esac

case "$cmd" in
  *"--body-file"*) exit 0 ;;
esac

case "$cmd" in
  *"--body"*) ;;
  *) exit 0 ;;
esac

template="${CLAUDE_PROJECT_DIR:-.}/.github/PULL_REQUEST_TEMPLATE.MD"
if [ ! -f "$template" ]; then
  exit 0
fi

# Extract every bold section header (**Section name**) — same regex as the
# GitHub Actions workflow at .github/workflows/pr-template-and-prefix.yaml.
# Using a while-read loop instead of `mapfile` for macOS bash 3.2 compat.
required_sections=()
while IFS= read -r line; do
  required_sections+=("$line")
done < <(grep -E '^\*\*[^*]+\*\*[[:space:]]*$' "$template" | sed 's/[[:space:]]*$//')

if [ "${#required_sections[@]}" -eq 0 ]; then
  exit 0
fi

missing=""
for section in "${required_sections[@]}"; do
  if ! printf '%s' "$cmd" | grep -qF "$section"; then
    missing="${missing}
  - ${section}"
  fi
done

if [ -n "$missing" ]; then
  jq -n --arg m "$missing" '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: ("PR body is missing required PULL_REQUEST_TEMPLATE.MD sections:" + $m + "\n\nRepopulate the body using .github/PULL_REQUEST_TEMPLATE.MD as the structure (see AGENTS.md → Pull requests). CI will also reject the PR at .github/workflows/pr-template-and-prefix.yaml if these are missing.")
    }
  }'
fi

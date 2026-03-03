#!/usr/bin/env bash
# Wrapper for `git worktree add` that copies ignored files (e.g. .env) into the new worktree.
# Usage: scripts/new-worktree.sh <worktree-path> [git worktree add args...] [-- extra args]
# Example: scripts/new-worktree.sh ../my-feature
# Example: scripts/new-worktree.sh ../my-feature feature-branch
# Example: scripts/new-worktree.sh ../my-feature -b new-branch main
# Optional: COPY_NODE_MODULES=1 to copy node_modules into the new worktree (default: skip).

set -e

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <worktree-path> [branch or -b <branch> [start-point] ...] [-- extra args]" >&2
  echo "  worktree-path: path where the new worktree will be created" >&2
  echo "  Remaining args (before --) are passed to \`git worktree add\`." >&2
  echo "  Set COPY_NODE_MODULES=1 to copy node_modules (default: skip; run npm install in new worktree)." >&2
  exit 1
fi

WORKTREE_PATH="$1"
shift
GIT_WORKTREE_ARGS=()
while [[ $# -gt 0 ]]; do
  if [[ "$1" == "--" ]]; then
    shift
    break
  fi
  GIT_WORKTREE_ARGS+=("$1")
  shift
done

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

# Resolve worktree path to absolute so we can copy into it
if [[ "$WORKTREE_PATH" != /* ]]; then
  WORKTREE_ABS="$(cd "$(dirname "$WORKTREE_PATH")" && pwd)/$(basename "$WORKTREE_PATH")"
else
  WORKTREE_ABS="$WORKTREE_PATH"
fi

# ---- Collect ignored paths that exist (and are not in the new worktree) ----
# We want paths that are ignored by .gitignore and exist in the current worktree.
# Skip node_modules so the new worktree can run npm install; optional copy via COPY_NODE_MODULES=1.
# Skip build/coverage/test and other artifacts (rebuilt in each worktree).

skip_copy() {
  local p="$1"
  # OS artifacts
  [[ "$p" == .DS_Store || "$p" == *'/.DS_Store' ]] && return 0
  # Build artifacts
  [[ "$p" == build || "$p" == build/* ]] && return 0
  [[ "$p" == storybook-static || "$p" == storybook-static/* ]] && return 0
  [[ "$p" == dist || "$p" == dist/* ]] && return 0
  [[ "$p" == dist-ssr || "$p" == dist-ssr/* ]] && return 0
  [[ "$p" == vite.config.ts.timestamp-* || "$p" == *"/vite.config.ts.timestamp-"* ]] && return 0
  # Test / coverage
  [[ "$p" == coverage || "$p" == coverage/* ]] && return 0
  return 1
}

copy_list=()

# 1) All .env and .env.* at repo root (copy regardless of .gitignore)
for name in .env .env.dev .env.local .env.prod; do
  [[ -f "$REPO_ROOT/$name" ]] && copy_list+=("$name")
done
for f in "$REPO_ROOT"/.env*; do
  [[ -f "$f" ]] || continue
  copy_list+=("$(basename "$f")")
done

# 2) All other ignored files/dirs that exist (batch check via git check-ignore --stdin)
while IFS= read -r p; do
  [[ -z "$p" ]] && continue
  if [[ "$p" == node_modules || "$p" == node_modules/* ]]; then
    [[ -n "${COPY_NODE_MODULES:-}" ]] || continue
  fi
  [[ "$p" == .git || "$p" == .git/* ]] && continue
  skip_copy "$p" && continue
  copy_list+=("$p")
done < <(
  find . -path './.git' -prune -o \
    -path './node_modules' -prune -o \
    \( -type f -o -type d \) -print 2>/dev/null |
  sed 's|^\./||' |
  grep -v '^$' |
  git check-ignore --stdin 2>/dev/null || true
)

# If COPY_NODE_MODULES=1, add node_modules as a single top-level dir
if [[ -n "${COPY_NODE_MODULES:-}" && -d "$REPO_ROOT/node_modules" ]]; then
  copy_list+=("node_modules")
fi

# Dedupe: keep a unique set so we don't copy the same path twice
unique_list=()
for p in "${copy_list[@]}"; do
  found=0
  for u in "${unique_list[@]}"; do
    if [[ "$u" == "$p" ]]; then found=1; break; fi
  done
  [[ $found -eq 0 ]] && unique_list+=("$p")
done
copy_list=("${unique_list[@]}")

# Reduce to minimal set: remove any path that is under another in the list
minimal=()
for p in "${copy_list[@]}"; do
  is_covered=0
  for m in "${minimal[@]}"; do
    if [[ "$m" != "$p" && "$p" == "$m"/* ]]; then
      is_covered=1
      break
    fi
  done
  if [[ $is_covered -eq 0 ]]; then
    new_minimal=()
    for m in "${minimal[@]}"; do
      [[ "$m" == "$p"/* ]] && continue
      new_minimal+=("$m")
    done
    minimal=("${new_minimal[@]}" "$p")
  fi
done

# ---- Create worktree ----
git worktree add "$WORKTREE_PATH" "${GIT_WORKTREE_ARGS[@]}"

# ---- Copy ignored paths into new worktree ----
for rel in "${minimal[@]}"; do
  src="$REPO_ROOT/$rel"
  dest="$WORKTREE_ABS/$rel"
  if [[ ! -e "$src" ]]; then
    continue
  fi
  mkdir -p "$(dirname "$dest")"
  if [[ -d "$src" ]]; then
    cp -R "$src" "$dest"
    echo "Copied directory: $rel"
  else
    cp "$src" "$dest"
    echo "Copied file: $rel"
  fi
done

# ---- Install dependencies in new worktree ----
(cd "$WORKTREE_ABS" && npm install)
echo "Worktree ready at $WORKTREE_ABS"

# ---- Open Cursor or VS Code in the new worktree ----
if command -v cursor &>/dev/null; then
  cursor "$WORKTREE_ABS"
elif command -v code &>/dev/null; then
  code "$WORKTREE_ABS"
else
  echo "Neither 'cursor' nor 'code' in PATH; open manually: cursor $WORKTREE_ABS"
fi

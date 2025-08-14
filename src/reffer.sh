#!/bin/bash

find . -type f \( -name "*.js" -o -name "*.ts" -o -name "*.tsx" \) \
  ! -path "*/node_modules/*" \
  ! -path "*/build/*" \
  ! -path "*/dist/*" | while read -r file; do
  if grep -q 'forwardRef' "$file" && ! grep -q 'ref' "$file"; then
    echo "$file"
  fi
done

#!/usr/bin/env bash
set -euo pipefail

# Rebrand HugoBlox -> CkritBuilder across the repository
# Run from repo root: bash scripts/rebrand.sh

echo "Rebranding HugoBlox -> CkritBuilder (dry-run: false)"

# patterns and replacements
declare -a REPL=(
  "HugoBlox|Hugo Blox|hugo-blox|hugo_blox|HugoBLOX=>CkritBuilder"
)

# Perform replacements using perl for word boundaries and case-sensitive cases
# - Replace 'HugoBlox' -> 'CkritBuilder'
# - Replace 'Hugo Blox' -> 'CkritBuilder'
# - Replace 'hugoblox.com' -> 'ckritbuilder.com'
# - Replace 'hugoblox' -> 'ckritbuilder' (lowercase)

# list files to modify (text files only)
FILES=$(git ls-files)

for f in $FILES; do
  # skip binary files
  if file "$f" | grep -qE 'text|empty'; then
    perl -i -pe 's/HugoBlox/CkritBuilder/g; s/Hugo Blox/CkritBuilder/g; s/hugoblox\.com/ckritbuilder.com/g; s/\bhugoblox\b/ckritbuilder/g; s/Hugo Blox Builder/CkritBuilder/g;' "$f" || true
  fi
done

echo "Rebranding completed. Run 'git status' to review changes." 

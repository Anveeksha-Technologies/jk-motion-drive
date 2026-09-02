#!/usr/bin/env bash
#
# One-time setup for a fresh clone.
#
#   ./scripts/setup.sh
#
# Installs dependencies, creates .env.local from the template if it is missing,
# and runs the content checks so you know the tree is sound before you start.
# Safe to re-run: it never overwrites an existing .env.local.

set -euo pipefail

cd "$(dirname "$0")/.."

bold() { printf '\033[1m%s\033[0m\n' "$1"; }
ok()   { printf '  \033[32m✓\033[0m %s\n' "$1"; }
warn() { printf '  \033[33m!\033[0m %s\n' "$1"; }
die()  { printf '  \033[31m✗\033[0m %s\n' "$1" >&2; exit 1; }

bold "JK Motion Drive — setup"

# ---------------------------------------------------------------- toolchain
command -v node >/dev/null 2>&1 || die "node is not installed (need 18.17 or newer)"

NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
if [ "$NODE_MAJOR" -lt 18 ]; then
  die "node $(node -v) is too old — Next.js 14 needs 18.17 or newer"
fi
ok "node $(node -v)"

command -v npm >/dev/null 2>&1 || die "npm is not installed"
ok "npm $(npm -v)"

# ------------------------------------------------------------- dependencies
bold "Installing dependencies"
if [ -f package-lock.json ]; then
  # `npm ci` is the reproducible install: it obeys the lockfile exactly and
  # fails if package.json and the lockfile disagree.
  npm ci
else
  warn "no package-lock.json — falling back to npm install"
  npm install
fi
ok "dependencies installed"

# ------------------------------------------------------------------- env
bold "Environment"
if [ -f .env.local ]; then
  ok ".env.local already exists — leaving it alone"
else
  cp .env.example .env.local
  ok "created .env.local from .env.example"
  warn "it has no values yet — see the notes in that file:"
  warn "  NEXT_PUBLIC_SITE_URL            canonical origin"
  warn "  NEXT_PUBLIC_GA_ID               GA4 id (leave empty locally)"
  warn "  NEXT_PUBLIC_FORMSUBMIT_ENDPOINT enquiry form target"
fi

# ----------------------------------------------------------------- checks
bold "Checks"
npm run check:content
ok "content valid and generated docs current"

# ------------------------------------------------------------------- done
bold "Ready"
cat <<'EOF'

  Start the dev server:

      npm run dev                       # http://localhost:3000

  On macOS, if every route 404s and the log fills with
  "Watchpack Error ... EMFILE", the file watcher has died. Use polling:

      WATCHPACK_POLLING=1000 npm run dev

  Deploy:

      ./scripts/deploy.sh preview       # preview URL
      ./scripts/deploy.sh production    # live

EOF

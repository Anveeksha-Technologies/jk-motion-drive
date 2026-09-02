#!/usr/bin/env bash
#
# Deploy to Vercel.
#
#   ./scripts/deploy.sh              # preview (default)
#   ./scripts/deploy.sh preview
#   ./scripts/deploy.sh production
#   ./scripts/deploy.sh production --yes    # skip the confirmation prompt (CI)
#
# Runs the same gates locally that would otherwise fail slowly in Vercel's
# build: content validation, generated-doc drift, and a full production build
# that type-checks and prerenders every route. Deploying is the last step, not
# the first, so a broken tree never reaches a URL.

set -euo pipefail

cd "$(dirname "$0")/.."

TARGET="${1:-preview}"
ASSUME_YES="${2:-}"

bold() { printf '\033[1m%s\033[0m\n' "$1"; }
ok()   { printf '  \033[32m✓\033[0m %s\n' "$1"; }
warn() { printf '  \033[33m!\033[0m %s\n' "$1"; }
die()  { printf '  \033[31m✗\033[0m %s\n' "$1" >&2; exit 1; }

case "$TARGET" in
  preview|production) ;;
  *) die "unknown target '$TARGET' — use 'preview' or 'production'" ;;
esac

bold "JK Motion Drive — deploy ($TARGET)"

# ------------------------------------------------------------------ vercel
if ! command -v vercel >/dev/null 2>&1; then
  warn "vercel CLI not found — using npx (slower; 'npm i -g vercel' to install)"
  VERCEL="npx --yes vercel@latest"
else
  VERCEL="vercel"
fi

# `vercel whoami` fails when not logged in. Do this before spending time on a
# build that would then have nowhere to go.
$VERCEL whoami >/dev/null 2>&1 || die "not logged in — run: vercel login"
ok "vercel authenticated as $($VERCEL whoami 2>/dev/null)"

[ -d .vercel ] || warn "no .vercel link yet — the CLI will ask which project to use"

# ------------------------------------------------------------- git hygiene
if git rev-parse --git-dir >/dev/null 2>&1; then
  BRANCH="$(git rev-parse --abbrev-ref HEAD)"
  ok "branch $BRANCH"
  if [ -n "$(git status --porcelain)" ]; then
    warn "working tree has uncommitted changes — they WILL be included in this deploy"
  fi
  if [ "$TARGET" = "production" ] && [ "$BRANCH" != "main" ]; then
    warn "deploying to production from '$BRANCH', not main"
  fi
fi

# ----------------------------------------------------------------- gates
bold "Pre-flight"

npm run check:content
ok "content valid, generated docs current"

# --no-install so a missing dependency is an error here rather than a silent
# download; the tree should already be installed by setup.sh.
npx --no-install next build
ok "production build passed — type-checked and prerendered"

# ---------------------------------------------------------------- confirm
if [ "$TARGET" = "production" ] && [ "$ASSUME_YES" != "--yes" ]; then
  printf '\n  This publishes to the live site. Continue? [y/N] '
  read -r reply
  case "$reply" in
    [yY]|[yY][eE][sS]) ;;
    *) die "cancelled" ;;
  esac
fi

# ----------------------------------------------------------------- deploy
bold "Deploying"

# Vercel builds again on its own infrastructure; the local build above is a
# gate, not the artefact. Environment variables come from the Vercel project
# settings, never from .env.local, which is machine-local and gitignored.
if [ "$TARGET" = "production" ]; then
  $VERCEL deploy --prod
else
  $VERCEL deploy
fi

bold "Done"
cat <<'EOF'

  After a production deploy, check:

    /                 loads and the stats count up
    /catalogue        table and grid both render
    /contact?product=UNICASE%20Helical%20Gear%20Units
                      form is prefilled in the HTML (this route is SSR)
    /robots.txt       AI crawlers listed, sitemap URL correct
    /sitemap.xml      absolute URLs on the real domain
    /llms.txt         serves as text/plain

  Environment variables live in the Vercel project settings:
    NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_FORMSUBMIT_ENDPOINT

EOF

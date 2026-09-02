// Cookie consent state, shared between the banner and the analytics loader.
//
// Deliberately a tiny module rather than a React context: `Analytics` and
// `CookieConsent` are siblings under the root layout, and a context provider
// wrapping the whole tree would turn every page into a client component.
// Instead both subscribe to one custom event on `window`.

export type ConsentState = "granted" | "denied" | "unset";

const STORAGE_KEY = "jkmd-cookie-consent";

/** Fired on the window whenever the choice changes, so listeners can react. */
export const CONSENT_EVENT = "jkmd-consent-change";

/**
 * Whether a visitor who has not chosen yet is tracked.
 *
 * `false` matches the banner's wording — "by continuing you agree" — which is
 * the implied-consent model the client asked for.
 *
 * IMPORTANT: implied consent is **not** sufficient under GDPR/ePrivacy for
 * analytics cookies served to visitors in the EU or UK; those require a
 * positive opt-in before any non-essential cookie is set. This site's audience
 * is Indian industry, where the DPDP Act does not impose the same prior-consent
 * rule on analytics. If that changes — an EU customer base, or a stricter
 * legal review — flip this to `true`. Nothing else needs to change: the banner
 * copy switches, and analytics then waits for an explicit "Okay, understood".
 */
export const REQUIRE_OPT_IN = false;

export function readConsent(): ConsentState {
  if (typeof window === "undefined") return "unset";
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : "unset";
  } catch {
    // Safari private mode and hardened browsers throw on localStorage access.
    // Treat that as "no choice recorded" rather than crashing the page.
    return "unset";
  }
}

export function writeConsent(value: "granted" | "denied") {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* Choice cannot be persisted; it still applies for this page view. */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

/** Should analytics run, given the recorded choice? */
export function analyticsAllowed(state: ConsentState): boolean {
  if (state === "granted") return true;
  if (state === "denied") return false;
  return !REQUIRE_OPT_IN;
}

/**
 * Remove the cookies Google Analytics has already set.
 *
 * Turning the tag off stops new hits, but a visitor who accepted and later
 * declined would otherwise keep carrying `_ga` around. Cookies are cleared on
 * the current host and on the registrable parent domain, because GA sets them
 * on the latter (`.jkmotiondrive.com`), and expiring a cookie requires the same
 * domain and path it was written with.
 */
export function clearAnalyticsCookies() {
  if (typeof document === "undefined") return;

  const parts = window.location.hostname.split(".");
  const domains = [
    undefined, // host-only
    window.location.hostname,
    parts.length > 2 ? `.${parts.slice(-2).join(".")}` : `.${window.location.hostname}`,
  ];

  for (const raw of document.cookie.split(";")) {
    const name = raw.split("=")[0]?.trim();
    if (!name) continue;
    if (!/^(_ga|_gid|_gat)/.test(name)) continue;

    for (const domain of domains) {
      document.cookie =
        `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/` +
        (domain ? `; domain=${domain}` : "");
    }
  }
}

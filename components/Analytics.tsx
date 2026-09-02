"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  CONSENT_EVENT,
  analyticsAllowed,
  clearAnalyticsCookies,
  readConsent,
  type ConsentState,
} from "@/lib/consent";

// Google Analytics 4, gated on NEXT_PUBLIC_GA_ID *and* on cookie consent.
//
// Renders nothing at all when the variable is unset, so local development and
// preview deployments do not pollute the property — set the ID in Vercel's
// production environment only. See .env.example.
//
// WHY THIS IS A CLIENT COMPONENT
//
// It used to be a server component: next/script handled the injection and
// nothing needed to react. Consent changes at runtime, so the tag now has to be
// mounted and unmounted in response to a choice the visitor makes on the page.
//
// TURNING IT OFF PROPERLY
//
// Unmounting the <Script> tags does not unload code the browser has already
// executed. Declining therefore does three things: sets Google's own
// `window['ga-disable-<ID>']` kill switch, which gtag.js checks before every
// hit; sends a Consent Mode v2 update so any queued or later call is treated as
// denied; and deletes the _ga cookies already written. Any one of those alone
// would leave something behind.
//
// `afterInteractive` loads the tag once the page is usable rather than blocking
// first paint. Analytics is never worth a slower LCP on a marketing site.

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

export default function Analytics() {
  const [consent, setConsent] = useState<ConsentState>("unset");
  // Nothing analytics-related renders until after mount: the server has no idea
  // what this visitor chose, so rendering the tag during SSR would flash it in
  // for someone who declined.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setConsent(readConsent());

    const onChange = () => setConsent(readConsent());
    window.addEventListener(CONSENT_EVENT, onChange);
    // Another tab may have changed the choice.
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const allowed = analyticsAllowed(consent);

  useEffect(() => {
    if (!GA_ID || !mounted) return;

    // Google's documented opt-out flag. gtag.js reads it before sending, so it
    // works even though the script is already in memory.
    window[`ga-disable-${GA_ID}`] = !allowed;

    if (!allowed) {
      type Gtag = (...args: unknown[]) => void;
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      gtag?.("consent", "update", { analytics_storage: "denied" });
      clearAnalyticsCookies();
    }
  }, [allowed, mounted]);

  if (!GA_ID || !mounted || !allowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', { analytics_storage: 'granted' });
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}

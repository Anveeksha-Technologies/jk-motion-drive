"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, REQUIRE_OPT_IN, readConsent, writeConsent } from "@/lib/consent";

// The cookie notice.
//
// Sits bottom-left rather than as a full-width bar so it does not cover the
// floating WhatsApp and call buttons in the bottom-right corner — those are the
// site's primary contact actions and burying them behind a banner would cost
// more than the banner gains.
//
// "Okay, understood" records consent; "Decline" genuinely switches Google
// Analytics off (see components/Analytics.tsx — kill switch, Consent Mode
// update, and existing _ga cookies deleted), rather than only hiding the
// banner. Either choice is remembered, so the notice appears once.

// No analytics configured means no cookies are set, and a notice claiming
// otherwise would be untrue — so the banner stays away in development and on
// previews, and appears only where the tag actually runs.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    // Only after mount: the server cannot know what this visitor chose, and
    // rendering the banner during SSR would flash it at people who already
    // dismissed it.
    if (readConsent() === "unset") setVisible(true);

    const onChange = () => setVisible(readConsent() === "unset");
    window.addEventListener(CONSENT_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  if (!GA_ID || !visible) return null;

  const choose = (value: "granted" | "denied") => {
    writeConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed bottom-4 left-4 z-[60] w-[calc(100%-2rem)] max-w-md rounded-xl border border-neutral-200 bg-white p-5 shadow-card-hover md:bottom-6 md:left-6"
    >
      <div className="flex items-start gap-3">
        <span className="chip-icon h-9 w-9 shrink-0">
          <Cookie className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-brand-black">Cookies on this site</p>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
            {REQUIRE_OPT_IN ? (
              <>
                We&apos;d like to set Google Analytics cookies to understand how the site is used.
                Nothing is set unless you agree.
              </>
            ) : (
              <>
                We use Google Analytics cookies to understand how the site is used. By continuing to
                browse, you agree to them. You can decline and we&apos;ll switch tracking off.
              </>
            )}{" "}
            <Link
              href="/contact"
              className="font-medium text-brand-orange underline underline-offset-2 hover:text-brand-orange-hover"
            >
              Questions?
            </Link>
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => choose("granted")} className="btn-primary btn-sm">
              Okay, understood
            </button>
            <button
              type="button"
              onClick={() => choose("denied")}
              className="btn-outline-dark btn-sm"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

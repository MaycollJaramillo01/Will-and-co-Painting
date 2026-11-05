"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// What a visitor did on the site before sending a quote request. It lives in
// their browser until Jobber confirms the request, then it is added to that
// request as a note (see /api/jobber/journey).
export type JourneyEvent = {
  t: number;
  e: "view" | "call" | "whatsapp" | "form-new-tab";
  p: string;
};
export type Journey = {
  source?: { t: number; landing: string; referrer: string };
  events: JourneyEvent[];
};

const storageKey = "wilco-journey";
const maxEvents = 60;
const maxAgeMs = 30 * 24 * 60 * 60 * 1000;
const trackedParams = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "fbclid",
];

export function readJourney(): Journey {
  try {
    const journey = JSON.parse(localStorage.getItem(storageKey) ?? "null");
    const last = journey?.events?.at(-1)?.t ?? journey?.source?.t ?? 0;
    if (Array.isArray(journey?.events) && Date.now() - last < maxAgeMs) {
      return journey;
    }
  } catch {}
  return { events: [] };
}

function saveJourney(journey: Journey) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(journey));
  } catch {}
}

export function clearJourney() {
  try {
    localStorage.removeItem(storageKey);
  } catch {}
}

function record(e: JourneyEvent["e"]) {
  const journey = readJourney();
  const event = { t: Date.now(), e, p: location.pathname.slice(0, 200) };
  journey.events = [...journey.events, event].slice(-maxEvents);
  saveJourney(journey);
}

export function VisitJourney() {
  const pathname = usePathname();

  useEffect(() => {
    const journey = readJourney();
    const params = new URLSearchParams(location.search);
    const kept = new URLSearchParams();
    for (const name of trackedParams) {
      const value = params.get(name);
      if (value) kept.set(name, value.slice(0, 150));
    }
    // ponytail: the latest ad or campaign click wins, otherwise the first visit.
    if (!journey.source || kept.size > 0) {
      let referrer = "";
      try {
        const host = document.referrer && new URL(document.referrer).host;
        if (host && host !== location.host) referrer = host;
      } catch {}
      const query = kept.size > 0 ? `?${kept}` : "";
      journey.source = {
        t: Date.now(),
        landing: `${location.pathname}${query}`.slice(0, 300),
        referrer,
      };
      saveJourney(journey);
    }
  }, []);

  useEffect(() => {
    record("view");
  }, [pathname]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a");
      const href = link?.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) record("call");
      else if (href.includes("wa.me/")) record("whatsapp");
      else if (href.includes("getjobber.com")) record("form-new-tab");
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

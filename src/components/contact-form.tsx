"use client";

import { useEffect, useRef } from "react";
import { quoteFormConversion } from "@/components/google-ads-tag";
import { clearJourney, readJourney } from "@/components/visit-journey";

const clientHubId = "eca14779-9bf0-4b31-9f9a-2aee1e8ee0e5-4265761";
const formUrl =
  "https://clienthub.getjobber.com/client_hubs/eca14779-9bf0-4b31-9f9a-2aee1e8ee0e5/public/work_request/embedded_work_request_form?form_id=4265761";

export function ContactForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Run the official embed on each mount, including Next.js client navigation.
    const script = document.createElement("script");
    script.src =
      "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js";
    script.async = true;
    script.setAttribute("clienthub_id", clientHubId);
    script.setAttribute("form_url", formUrl);

    const observer = new MutationObserver(() => {
      const frame = container.querySelector("iframe");
      if (frame) {
        frame.title = "Request a quote from Wil & Co. Painting";
        observer.disconnect();
      }
    });
    observer.observe(container, { childList: true });
    container.appendChild(script);

    // The Jobber form runs in a cross-origin iframe, so the page cannot see a
    // submit. Instead it asks the server whether a request reached Jobber
    // during this visit: a few seconds after the form changes, and when the
    // visitor leaves. The server attaches the journey once and returns the
    // request ID, which also dedupes the Google Ads conversion.
    const openedAt = Date.now();
    let done = false;
    let busy = false;
    let lastCheck = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function check(leaving: boolean) {
      if (done || busy) return;
      if (!leaving && Date.now() - lastCheck < 15_000) return;
      busy = true;
      lastCheck = Date.now();
      try {
        const response = await fetch("/api/jobber/journey", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ since: openedAt, journey: readJourney() }),
          keepalive: true,
        });
        const { requestId } = await response.json();
        if (typeof requestId !== "string" || done) return;
        done = true;
        clearJourney();
        (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.(
          "event",
          "conversion",
          { send_to: quoteFormConversion, transaction_id: requestId },
        );
      } catch {
      } finally {
        busy = false;
      }
    }
    function onMessage(event: MessageEvent) {
      if (event.origin !== "https://clienthub.getjobber.com") return;
      clearTimeout(timer);
      timer = setTimeout(() => check(false), 5_000);
    }
    function onHide() {
      if (document.visibilityState === "hidden") check(true);
    }
    window.addEventListener("message", onMessage);
    document.addEventListener("visibilitychange", onHide);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("message", onMessage);
      document.removeEventListener("visibilitychange", onHide);
      observer.disconnect();
      container.replaceChildren();
      container.classList.remove(
        "jobber-inline-work-request",
        "jobber-spinner",
      );
      container.style.removeProperty("height");
    };
  }, []);

  return (
    <div className="min-w-0">
      <link
        rel="stylesheet"
        href="https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css"
        media="screen"
        precedence="default"
      />
      <div className="relative min-h-96">
        <div id={clientHubId} ref={containerRef} />
      </div>
      <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
        Having trouble loading the form?{" "}
        <a
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-[color:var(--accent)] underline"
        >
          Open the form in a new tab
        </a>
        .
      </p>
    </div>
  );
}

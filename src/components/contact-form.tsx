"use client";

import { useEffect, useRef } from "react";

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

    return () => {
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

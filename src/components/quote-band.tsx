import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { business, hasPublicPhone } from "@/config/business";

export function QuoteBand() {
  return (
    <section className="brand-section">
      <div className="site-container grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="display-title max-w-3xl text-4xl sm:text-5xl">
            Tell us what needs a fresh finish.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Share the property type, service, and project details. We will take
            it from there.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <Link className="button-light" href="/contact">
            Request a Quote
            <ArrowRight aria-hidden="true" size={17} strokeWidth={2} />
          </Link>
          {hasPublicPhone && (
            <a
              className="button-secondary border-white/40 text-white"
              href={`tel:${business.phone}`}
            >
              <Phone aria-hidden="true" size={17} strokeWidth={2} />
              {business.displayPhone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

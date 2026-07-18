import type { Metadata } from "next";
import { BusinessDetails } from "@/components/business-details";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Request a Painting Quote in Madison, WI",
  description:
    "Request a quote for residential painting, commercial painting, drywall, staining, pressure washing, or wallpaper installation in Madison, WI.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageIntro
        label="Contact"
        title="Tell us about the property."
        description="Share the service you need and a few project details to start a conversation with Wil & Co. Painting."
      />

      <section className="section-space">
        <div className="site-container grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-4xl font-semibold">
              Business details
            </h2>
            <div className="mt-8">
              <BusinessDetails />
            </div>
          </aside>
          <div className="rounded-xl bg-[color:var(--surface)] p-6 shadow-[var(--shadow)] sm:p-8 lg:p-10">
            <h2 className="font-display text-4xl font-semibold">
              Request a Quote
            </h2>
            <p className="mt-3 mb-8 max-w-xl text-sm leading-7 text-[color:var(--muted)]">
              Fields marked by the browser as required must be completed before
              the request can be sent.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

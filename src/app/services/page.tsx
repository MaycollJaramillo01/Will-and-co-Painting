import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { QuoteBand } from "@/components/quote-band";
import { siteUrl } from "@/config/business";
import { getServiceBySlug, serviceGroups, services } from "@/content/en";

export const metadata: Metadata = {
  title: "Painting and Property Services in Madison, WI",
  description:
    "Explore residential painting, commercial painting, drywall, pressure washing, deck staining, cabinet staining, and wallpaper installation in Madison, WI.",
  alternates: { canonical: "/services" },
};

const groupImages = [
  "/images/projects/residential-exterior.jpg",
  "/images/projects/commercial-interior.jpg",
  "/images/projects/drywall-repair.jpg",
  "/images/projects/deck-staining.jpg",
] as const;

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Wil & Co. Painting services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      url: `${siteUrl}/services/${service.slug}`,
    })),
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageIntro
        label="Services"
        title="Work that starts with the surface."
        description="From a single room to a commercial exterior, every service is shaped around the property and the finish it needs."
      />

      <div className="site-container section-space grid gap-20">
        {serviceGroups.map((group, index) => (
          <section
            key={group.name}
            className="grid items-start gap-8 md:grid-cols-[0.82fr_1.18fr] md:gap-14"
            aria-labelledby={`group-${index}`}
          >
            <div className="md:sticky md:top-28">
              <div className="relative h-72 overflow-hidden rounded-xl sm:h-96">
                <Image
                  src={groupImages[index]}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              <h2
                id={`group-${index}`}
                className="font-display mt-6 text-4xl font-semibold"
              >
                {group.name}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-[color:var(--muted)]">
                {group.description}
              </p>
            </div>

            <div className="hairline border-t">
              {group.slugs.map((slug) => {
                const service = getServiceBySlug(slug);
                if (!service) return null;
                return (
                  <article
                    key={service.slug}
                    className="hairline border-b py-7"
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      className="group grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start"
                    >
                      <div>
                        <h3 className="font-display text-3xl font-semibold group-hover:text-[color:var(--accent)]">
                          {service.name}
                        </h3>
                        <p className="mt-3 max-w-xl text-sm leading-7 text-[color:var(--muted)]">
                          {service.shortDescription}
                        </p>
                      </div>
                      <ArrowRight
                        aria-hidden="true"
                        className="mt-2 text-[color:var(--accent)] transition-transform group-hover:translate-x-1"
                        size={20}
                        strokeWidth={2}
                      />
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <QuoteBand />
    </main>
  );
}

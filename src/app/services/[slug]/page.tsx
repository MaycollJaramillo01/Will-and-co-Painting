import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check, ChevronRight, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuoteBand } from "@/components/quote-band";
import { business, hasPublicPhone, siteUrl } from "@/config/business";
import { getServiceBySlug, services } from "@/content/en";
import { getServiceSeo } from "@/content/service-seo";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return {};

  const seo = getServiceSeo(service.slug);

  return {
    title: seo.title,
    description: seo.description,
    keywords: [
      service.name,
      `${service.name} Madison WI`,
      `${service.name} near Madison`,
      "Wil & Co. Painting",
    ],
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      type: "website",
      title: seo.title,
      description: seo.description,
      url: `${siteUrl}/services/${service.slug}`,
      images: [{ url: service.image, alt: service.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [service.image],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const seo = getServiceSeo(service.slug);
  const pageUrl = `${siteUrl}/services/${service.slug}`;

  const related = services
    .filter(
      (candidate) =>
        candidate.slug !== service.slug &&
        (candidate.category === service.category ||
          relatedFallback(service, candidate)),
    )
    .slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.name,
        serviceType: service.name,
        description: seo.description,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        image: `${siteUrl}${service.image}`,
        provider: {
          "@type": "HousePainter",
          "@id": `${siteUrl}/#business`,
          name: business.businessName,
          url: siteUrl,
        },
        areaServed: business.serviceAreas.map((area) => ({
          "@type": "City",
          name: area,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${siteUrl}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.name,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: seo.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="surface-section">
        <div className="site-container py-8 sm:py-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm font-bold text-[color:var(--muted)]">
              <li>
                <Link href="/" className="hover:text-[color:var(--accent)]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={15} strokeWidth={2} />
              </li>
              <li>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 hover:text-[color:var(--accent)]"
                >
                  <ArrowLeft aria-hidden="true" size={15} strokeWidth={2} />
                  Services
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={15} strokeWidth={2} />
              </li>
              <li className="text-[color:var(--ink)]" aria-current="page">
                {service.name}
              </li>
            </ol>
          </nav>
        </div>
        <div className="site-container grid items-center gap-10 pb-14 md:grid-cols-[0.92fr_1.08fr] md:pb-20">
          <div className="hero-enter">
            <p className="eyebrow">{service.category}</p>
            <h1 className="display-title text-6xl sm:text-7xl lg:text-8xl">
              {service.name}
            </h1>
            <p className="body-copy mt-7">{service.shortDescription}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="button-primary" href="/contact">
                Request a Quote
                <ArrowRight aria-hidden="true" size={17} strokeWidth={2} />
              </Link>
              {hasPublicPhone && (
                <a className="button-secondary" href={`tel:${business.phone}`}>
                  <Phone aria-hidden="true" size={17} strokeWidth={2} />
                  {business.displayPhone}
                </a>
              )}
            </div>
          </div>
          <div className="hero-image-enter relative h-[29rem] overflow-hidden rounded-xl md:h-[38rem]">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-space" aria-labelledby="service-details">
        <div className="site-container grid gap-12 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <div>
            <h2 id="service-details" className="display-title text-5xl">
              The service scope
            </h2>
            <p className="body-copy mt-6">{service.description}</p>
          </div>
          <div className="hairline border-t">
            {service.scope.map((item) => (
              <div
                key={item}
                className="hairline flex items-center gap-4 border-b py-6"
              >
                <Check
                  aria-hidden="true"
                  className="text-[color:var(--accent)]"
                  size={20}
                  strokeWidth={2.2}
                />
                <p className="font-display text-2xl font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="surface-section section-space"
        aria-labelledby="local-service-heading"
      >
        <div className="site-container grid gap-10 md:grid-cols-[0.82fr_1.18fr] md:gap-20">
          <div>
            <p className="eyebrow">Madison, Wisconsin</p>
            <h2
              id="local-service-heading"
              className="display-title mt-4 text-5xl sm:text-6xl"
            >
              {seo.localHeading}
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="body-copy">{seo.localDescription}</p>
            <p className="body-copy mt-5">{seo.planningNote}</p>
            <p className="mt-7 text-sm font-bold text-[color:var(--ink)]">
              Serving Madison, WI and surrounding areas.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space" aria-labelledby="service-faqs">
        <div className="site-container grid gap-10 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
          <div>
            <p className="eyebrow">Common questions</p>
            <h2 id="service-faqs" className="display-title mt-4 text-5xl">
              {service.name} FAQs
            </h2>
          </div>
          <div className="hairline border-t">
            {seo.faqs.map((faq) => (
              <details key={faq.question} className="group hairline border-b">
                <summary className="font-display flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-2xl font-semibold marker:hidden">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="text-[color:var(--accent)] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 text-sm leading-7 text-[color:var(--muted)]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        className="surface-section section-space"
        aria-labelledby="related-services"
      >
        <div className="site-container">
          <h2 id="related-services" className="display-title text-5xl">
            Related services
          </h2>
          <div className="hairline mt-10 grid border-t md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group hairline border-b py-6 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <h3 className="font-display text-2xl font-semibold group-hover:text-[color:var(--accent)]">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {item.shortDescription}
                </p>
                <ArrowRight
                  aria-hidden="true"
                  className="mt-5 text-[color:var(--accent)] transition-transform group-hover:translate-x-1"
                  size={18}
                  strokeWidth={2}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand />
    </main>
  );
}

function relatedFallback(
  service: NonNullable<ReturnType<typeof getServiceBySlug>>,
  candidate: (typeof services)[number],
) {
  return (
    service.category === "Specialty" && candidate.category === "Residential"
  );
}

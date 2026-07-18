import type { Metadata } from "next";
import { ArrowRight, Building2, Home, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { QuoteBand } from "@/components/quote-band";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: "About Wil & Co. Painting",
  description:
    "Learn about Wil & Co. Painting, a locally owned residential and commercial painting company led by Wil Barahona in Madison, Wisconsin.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageIntro
        label="About"
        title="A local company with a clear focus."
        description="Wil & Co. Painting serves residential and commercial properties in Madison, Wisconsin and surrounding areas."
      />

      <section className="section-space" aria-labelledby="owner-title">
        <div className="site-container grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
          <div className="grid grid-cols-5 gap-4">
            <div className="relative col-span-5 h-[28rem] overflow-hidden rounded-xl sm:col-span-4 sm:h-[36rem]">
              <Image
                src="/images/projects/exterior-painting.jpg"
                alt="Exterior painting project completed by Wil & Co. Painting"
                fill
                priority
                sizes="(max-width: 767px) 100vw, 52vw"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-3 col-start-3 -mt-20 hidden h-56 overflow-hidden rounded-xl border-8 border-[color:var(--background)] sm:block">
              <Image
                src="/images/brand/wil-barahona.jpg"
                alt="Finished deck and home exterior in the Madison area"
                fill
                sizes="28vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <h2 id="owner-title" className="display-title text-5xl sm:text-6xl">
              Led by {business.ownerName}.
            </h2>
            <p className="body-copy mt-6">
              Wil & Co. Painting is a locally owned residential and commercial
              painting company based in Madison. The service mix covers
              painting, drywall, pressure washing, staining, and wallpaper
              installation.
            </p>
            <p className="body-copy mt-4">
              The company works directly with homeowners and commercial property
              decision-makers across the Madison area.
            </p>
            <Link className="button-primary mt-8" href="/contact">
              Request a Quote
              <ArrowRight aria-hidden="true" size={17} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      <section
        className="surface-section section-space"
        aria-labelledby="company-facts"
      >
        <div className="site-container">
          <h2 id="company-facts" className="display-title max-w-2xl text-5xl">
            What defines the company today.
          </h2>
          <div className="hairline mt-10 grid border-y md:grid-cols-3">
            <Fact
              icon={<MapPin aria-hidden="true" size={24} strokeWidth={1.8} />}
              title="Madison based"
            >
              Serving Madison, Wisconsin and surrounding areas.
            </Fact>
            <Fact
              icon={<Home aria-hidden="true" size={24} strokeWidth={1.8} />}
              title="Residential work"
            >
              Interior, exterior, drywall, staining, washing, and wallpaper.
            </Fact>
            <Fact
              icon={
                <Building2 aria-hidden="true" size={24} strokeWidth={1.8} />
              }
              title="Commercial work"
            >
              Painting and related surface services for commercial properties.
            </Fact>
          </div>
        </div>
      </section>

      <QuoteBand />
    </main>
  );
}

function Fact({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="hairline border-b py-8 md:border-r md:border-b-0 md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
      <div className="text-[color:var(--accent)]">{icon}</div>
      <h3 className="font-display mt-5 text-3xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
        {children}
      </p>
    </article>
  );
}

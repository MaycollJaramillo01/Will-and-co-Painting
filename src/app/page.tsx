import type { Metadata } from "next";
import {
  ArrowRight,
  Building2,
  Clock3,
  Droplets,
  Home as HomeIcon,
  MapPin,
  PaintRoller,
  PanelsTopLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeroVideo } from "@/components/hero-video";
import { ProjectGrid } from "@/components/project-grid";
import { QuoteBand } from "@/components/quote-band";
import { business } from "@/config/business";
import { getServiceBySlug, serviceGroups } from "@/content/en";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const groupIcons = [HomeIcon, Building2, PanelsTopLeft, Droplets] as const;

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="relative isolate min-h-[calc(100dvh-72px)] overflow-hidden bg-[#071d35] text-white">
        <HeroVideo />
        <div className="site-container relative z-10 flex min-h-[calc(100dvh-72px)] items-end pt-28 pb-[clamp(4rem,10vh,7.5rem)] sm:pt-32">
          <div className="hero-enter max-w-[55rem]">
            <div className="border-l-2 border-[color:var(--accent)] pl-5 sm:pl-7">
              <p className="text-xs font-extrabold tracking-[0.15em] text-[#ef6c2c] uppercase sm:text-sm">
                Residential + Commercial Painting
              </p>
              <h1 className="display-title mt-4 max-w-[54rem] text-[clamp(2.75rem,7vw,7.15rem)] leading-[0.88] text-[#f7fafc]">
                <span className="block">Madison painting.</span>
                <span className="block">Finished with care.</span>
              </h1>
            </div>

            <p className="mt-6 max-w-[39rem] text-base leading-7 text-white/82 sm:text-lg sm:leading-8">
              Interior and exterior painting for homes and businesses across
              Madison and surrounding areas.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="button-primary" href="/contact">
                Request a Quote
                <ArrowRight aria-hidden="true" size={17} strokeWidth={2} />
              </Link>
              <Link
                className="button-secondary !border-white/45 !text-white hover:!border-white"
                href="/projects"
              >
                View Projects
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold tracking-[0.02em] text-white/65 sm:text-sm">
              <span>Locally owned</span>
              <span aria-hidden="true" className="text-[#ef6c2c]">
                •
              </span>
              <span>Residential + commercial</span>
              <span aria-hidden="true" className="text-[#ef6c2c]">
                •
              </span>
              <span>Mon-Fri, 7 AM-6 PM</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Business highlights" className="hairline border-y">
        <div className="site-container grid sm:grid-cols-2 lg:grid-cols-4">
          <Highlight
            icon={<PaintRoller aria-hidden="true" size={20} strokeWidth={2} />}
            title="Locally owned"
            text={`Led by ${business.ownerName}`}
          />
          <Highlight
            icon={<Building2 aria-hidden="true" size={20} strokeWidth={2} />}
            title="Property types"
            text="Residential and commercial"
          />
          <Highlight
            icon={<MapPin aria-hidden="true" size={20} strokeWidth={2} />}
            title="Service area"
            text="Madison and surrounding areas"
          />
          <Highlight
            icon={<Clock3 aria-hidden="true" size={20} strokeWidth={2} />}
            title="Business hours"
            text="Monday-Friday, 7 AM-6 PM"
          />
        </div>
      </section>

      <section className="section-space" aria-labelledby="services-title">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="eyebrow">Services</p>
            <h2
              id="services-title"
              className="display-title text-5xl sm:text-6xl"
            >
              One company for the surfaces that shape your space.
            </h2>
            <p className="body-copy mt-6">
              Painting is the core. Drywall, staining, pressure washing, and
              wallpaper installation complete the scope.
            </p>
          </div>

          <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {serviceGroups.map((group, index) => {
              const Icon = groupIcons[index];
              return (
                <article
                  key={group.name}
                  className="hairline border-t pt-6 md:min-h-72"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 text-[color:var(--accent)]">
                      <Icon aria-hidden="true" size={24} strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="font-display text-3xl font-semibold">
                        {group.name}
                      </h3>
                      <p className="mt-3 max-w-lg text-sm leading-7 text-[color:var(--muted)]">
                        {group.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-7 grid gap-2 pl-10">
                    {group.slugs.map((slug) => {
                      const service = getServiceBySlug(slug);
                      if (!service) return null;
                      return (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="group flex items-center justify-between gap-4 rounded-lg px-3 py-2 font-bold hover:bg-[color:var(--surface-raised)]"
                        >
                          {service.name}
                          <ArrowRight
                            aria-hidden="true"
                            className="shrink-0 text-[color:var(--accent)] transition-transform group-hover:translate-x-1"
                            size={16}
                            strokeWidth={2}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="surface-section section-space"
        aria-labelledby="projects-title"
      >
        <div className="site-container">
          <div className="mb-12 max-w-3xl">
            <h2
              id="projects-title"
              className="display-title text-5xl sm:text-6xl"
            >
              Real projects. Visible results.
            </h2>
            <p className="body-copy mt-5">
              A selection of residential and commercial work completed by Wil &
              Co. Painting.
            </p>
          </div>
          <ProjectGrid limit={5} />
        </div>
      </section>

      <section className="section-space" aria-labelledby="about-title">
        <div className="site-container grid items-center gap-12 md:grid-cols-[1.08fr_0.92fr] md:gap-16">
          <div className="relative h-[32rem] overflow-hidden rounded-xl md:h-[42rem]">
            <Image
              src="/images/brand/wil-barahona.jpg"
              alt="Completed wood deck and Madison area home exterior"
              fill
              sizes="(max-width: 767px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 id="about-title" className="display-title text-5xl sm:text-6xl">
              Local work. Personal responsibility.
            </h2>
            <p className="body-copy mt-6">
              Wil & Co. Painting is a locally owned residential and commercial
              painting company led by Wil Barahona in Madison, Wisconsin.
            </p>
            <p className="body-copy mt-4">
              The work spans painting, drywall, exterior surface care, wood
              staining, and wallpaper installation for homes and businesses.
            </p>
            <Link className="button-secondary mt-8" href="/about">
              About the Company
              <ArrowRight aria-hidden="true" size={17} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      <section
        className="surface-section section-space"
        aria-labelledby="approach-title"
      >
        <div className="site-container">
          <h2
            id="approach-title"
            className="display-title max-w-3xl text-5xl sm:text-6xl"
          >
            A straightforward way to start.
          </h2>
          <div className="hairline mt-12 grid gap-0 border-y md:grid-cols-4">
            <Approach title="Describe the project">
              Tell us about the property, surfaces, and service you need.
            </Approach>
            <Approach title="Confirm the scope">
              We review the project details and what the space requires.
            </Approach>
            <Approach title="Plan the work">
              Timing and project expectations are aligned before work begins.
            </Approach>
            <Approach title="Complete the finish">
              The focus stays on the surfaces and the final appearance.
            </Approach>
          </div>
        </div>
      </section>

      <QuoteBand />
    </main>
  );
}

function Highlight({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="hairline flex gap-3 border-b py-5 sm:px-5 sm:first:pl-0 lg:border-r lg:border-b-0 lg:last:border-r-0 lg:last:pr-0">
      <div className="mt-0.5 text-[color:var(--accent)]">{icon}</div>
      <div>
        <h2 className="text-sm font-extrabold">{title}</h2>
        <p className="mt-1 text-xs leading-5 text-[color:var(--muted)]">
          {text}
        </p>
      </div>
    </div>
  );
}

function Approach({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="hairline border-b py-7 md:border-r md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
      <h3 className="font-display text-2xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
        {children}
      </p>
    </article>
  );
}

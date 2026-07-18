"use client";

import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { business, hasPublicPhone } from "@/config/business";
import { getServiceBySlug, navigation, serviceGroups } from "@/content/en";
import { Logo } from "./logo";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  const closeNavigation = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  return (
    <header
      className={`hairline z-40 border-b bg-[color:var(--surface)]/95 backdrop-blur-md ${
        mobileOpen ? "relative lg:sticky lg:top-0" : "sticky top-0"
      }`}
      onMouseLeave={() => setServicesOpen(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setServicesOpen(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setServicesOpen(false);
        }
      }}
    >
      <div className="site-container flex h-[72px] items-center justify-between gap-5">
        <Logo compact />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            if (item.href === "/services") {
              return (
                <button
                  key={item.href}
                  type="button"
                  className={`inline-flex items-center gap-1.5 bg-transparent text-sm font-bold transition-colors hover:text-[color:var(--accent)] ${
                    active
                      ? "text-[color:var(--accent)]"
                      : "text-[color:var(--ink)]"
                  }`}
                  aria-expanded={servicesOpen}
                  aria-controls="desktop-services-menu"
                  onClick={() => setServicesOpen(true)}
                  onMouseEnter={() => setServicesOpen(true)}
                  onFocus={() => setServicesOpen(true)}
                >
                  Services
                  <ChevronDown
                    aria-hidden="true"
                    size={15}
                    strokeWidth={2.2}
                    className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-bold transition-colors hover:text-[color:var(--accent)] ${
                  active
                    ? "text-[color:var(--accent)]"
                    : "text-[color:var(--ink)]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {hasPublicPhone && (
            <a className="button-secondary" href={`tel:${business.phone}`}>
              <Phone aria-hidden="true" size={17} strokeWidth={2} />
              {business.displayPhone}
            </a>
          )}
          <Link className="button-primary" href="/contact">
            Request a Quote
          </Link>
        </div>

        <button
          type="button"
          className="hairline inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border bg-transparent lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMobileOpen((current) => !current)}
        >
          {mobileOpen ? (
            <X aria-hidden="true" size={22} strokeWidth={2} />
          ) : (
            <Menu aria-hidden="true" size={22} strokeWidth={2} />
          )}
        </button>
      </div>

      {servicesOpen && (
        <div
          id="desktop-services-menu"
          className="hairline absolute inset-x-0 top-full hidden border-b bg-[color:var(--surface)]/98 text-[color:var(--ink)] shadow-[0_24px_55px_rgb(2_12_24/0.2)] backdrop-blur-xl lg:block"
          onMouseEnter={() => setServicesOpen(true)}
        >
          <div className="site-container py-6">
            <div className="hairline flex items-center justify-between gap-6 border-b pb-4">
              <div>
                <p className="text-[0.68rem] font-extrabold tracking-[0.14em] text-[color:var(--accent)] uppercase">
                  Services
                </p>
                <p className="font-display mt-1 text-2xl font-semibold">
                  Painting and property care
                </p>
              </div>
              <Link
                href="/services"
                onClick={() => setServicesOpen(false)}
                className="inline-flex items-center gap-2 text-sm font-extrabold text-[color:var(--accent)] hover:text-[color:var(--accent-hover)]"
              >
                View all services
                <ArrowRight aria-hidden="true" size={16} strokeWidth={2.2} />
              </Link>
            </div>

            <div className="mt-5 grid grid-cols-4 gap-5 xl:gap-7">
              {serviceGroups.map((group, groupIndex) => (
                <section
                  key={group.name}
                  className={
                    groupIndex > 0
                      ? "hairline border-l pl-4 xl:pl-6"
                      : undefined
                  }
                >
                  <p className="mb-2 text-[0.68rem] font-extrabold tracking-[0.12em] text-[color:var(--accent)] uppercase">
                    {group.name}
                  </p>
                  <div className="grid gap-0.5">
                    {group.slugs.map((slug) => {
                      const service = getServiceBySlug(slug);
                      if (!service) return null;

                      return (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          onClick={() => setServicesOpen(false)}
                          className="group -mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm font-bold transition-colors hover:bg-[color:var(--surface-raised)] hover:text-[color:var(--accent)]"
                        >
                          {service.name}
                          <ArrowRight
                            aria-hidden="true"
                            size={14}
                            strokeWidth={2}
                            className="shrink-0 text-[color:var(--accent)] opacity-0 transition-[opacity,transform] group-hover:translate-x-1 group-hover:opacity-100"
                          />
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="hairline border-t bg-[color:var(--surface)] lg:hidden"
        >
          <nav
            className="site-container grid gap-1 py-5"
            aria-label="Mobile primary"
          >
            {navigation.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (item.href === "/services") {
                return (
                  <div key={item.href}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-bold hover:bg-[color:var(--surface-raised)]"
                      aria-expanded={servicesOpen}
                      aria-controls="mobile-services-menu"
                      onClick={() => setServicesOpen((current) => !current)}
                    >
                      Services
                      <ChevronDown
                        aria-hidden="true"
                        size={18}
                        strokeWidth={2.2}
                        className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {servicesOpen && (
                      <div
                        id="mobile-services-menu"
                        className="mx-3 mb-5 border-l-2 border-[color:var(--accent)] pl-3"
                      >
                        <Link
                          href="/services"
                          onClick={closeNavigation}
                          className="hairline mb-4 flex items-center justify-between border-b px-3 py-3 text-sm font-extrabold text-[color:var(--accent)]"
                        >
                          All Services
                          <ArrowRight aria-hidden="true" size={15} />
                        </Link>
                        {serviceGroups.map((group) => (
                          <div
                            key={group.name}
                            className="hairline mb-4 border-b pb-3 last:mb-0 last:border-b-0 last:pb-0"
                          >
                            <p className="px-3 pb-1 text-[0.65rem] font-extrabold tracking-[0.12em] text-[color:var(--accent)] uppercase">
                              {group.name}
                            </p>
                            {group.slugs.map((slug) => {
                              const service = getServiceBySlug(slug);
                              if (!service) return null;

                              return (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  onClick={closeNavigation}
                                  className="block rounded-md px-3 py-2.5 text-sm font-bold hover:bg-[color:var(--surface-raised)]"
                                >
                                  {service.name}
                                </Link>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeNavigation}
                  className="rounded-lg px-3 py-3 text-base font-bold hover:bg-[color:var(--surface-raised)]"
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            {hasPublicPhone && (
              <a
                className="button-secondary mt-3 w-full"
                href={`tel:${business.phone}`}
              >
                <Phone aria-hidden="true" size={17} strokeWidth={2} />
                {business.displayPhone}
              </a>
            )}
            <Link
              className="button-primary mt-2 w-full"
              href="/contact"
              onClick={closeNavigation}
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

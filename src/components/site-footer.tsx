import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { business, hasPublicEmail, hasPublicPhone } from "@/config/business";
import { navigation } from "@/content/en";
import { Logo } from "./logo";

export function SiteFooter() {
  const socialLinks = [
    ["Facebook", business.facebookUrl],
    ["Instagram", business.instagramUrl],
    ["YouTube", business.youtubeUrl],
  ].filter((link): link is [string, string] => Boolean(link[1]));

  return (
    <footer className="brand-section border-t border-white/10">
      <div className="site-container grid gap-12 py-14 md:grid-cols-[1.25fr_0.75fr_1fr]">
        <div>
          <Logo compact />
          <p className="mt-6 max-w-sm text-sm leading-7 text-slate-300">
            Locally owned residential and commercial painting services for
            Madison, Wisconsin and surrounding areas.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Explore
          </h2>
          <nav className="mt-5 grid gap-3" aria-label="Footer">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-fit text-sm text-slate-300 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Business Information
          </h2>
          <div className="mt-5 grid gap-4 text-sm text-slate-300">
            <p className="flex items-start gap-3">
              <MapPin
                className="mt-0.5 shrink-0 text-orange-300"
                aria-hidden="true"
                size={18}
                strokeWidth={2}
              />
              Madison, WI and surrounding areas
            </p>
            <p className="flex items-start gap-3">
              <Clock3
                className="mt-0.5 shrink-0 text-orange-300"
                aria-hidden="true"
                size={18}
                strokeWidth={2}
              />
              {business.openingHours[0].display}
            </p>
            {hasPublicPhone && (
              <a
                className="flex items-center gap-3 hover:text-white"
                href={`tel:${business.phone}`}
              >
                <Phone
                  className="shrink-0 text-orange-300"
                  aria-hidden="true"
                  size={18}
                  strokeWidth={2}
                />
                {business.displayPhone}
              </a>
            )}
            {hasPublicEmail && (
              <a
                className="flex items-center gap-3 hover:text-white"
                href={`mailto:${business.email}`}
              >
                <Mail
                  className="shrink-0 text-orange-300"
                  aria-hidden="true"
                  size={18}
                  strokeWidth={2}
                />
                {business.email}
              </a>
            )}
          </div>
          {socialLinks.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-4">
              {socialLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-bold text-slate-200 hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="site-container flex flex-col gap-3 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.businessName}. All rights
            reserved.
          </p>
          <p>Service Area Business based in Madison, Wisconsin.</p>
        </div>
      </div>
    </footer>
  );
}

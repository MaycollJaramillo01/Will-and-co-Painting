import Link from "next/link";
import { business, hasPublicEmail } from "@/config/business";
import { PageIntro } from "./page-intro";

export const companyName = business.legalName || business.businessName;

// Shared shell for /privacy-policy and /terms, so both end with the same
// contact details.
export function LegalPage({
  title,
  description,
  updated,
  children,
}: {
  title: string;
  description: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main id="main-content">
      <PageIntro label="Legal" title={title} description={description} />

      <section className="section-space">
        <div className="site-container">
          <div className="[&_h2]:font-display max-w-3xl leading-7 text-[color:var(--muted)] [&_a]:font-bold [&_a]:text-[color:var(--accent)] [&_a]:underline [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-[color:var(--ink)] [&_li]:mt-2 [&_p]:mt-4 [&_strong]:text-[color:var(--ink)] [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
            <p className="text-sm">Last updated: {updated}</p>
            {children}

            <h2>Contact us</h2>
            <p>
              Questions or requests about these policies can go to {companyName}{" "}
              by phone at{" "}
              <a href={`tel:${business.phone}`}>{business.displayPhone}</a>
              {hasPublicEmail && (
                <>
                  , by email at{" "}
                  <a href={`mailto:${business.email}`}>{business.email}</a>
                </>
              )}
              , or through our <Link href="/contact">contact form</Link>. We are
              based in {business.city}, Wisconsin.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { ProjectGrid } from "@/components/project-grid";
import { QuoteBand } from "@/components/quote-band";

export const metadata: Metadata = {
  title: "Painting Projects in Madison, WI",
  description:
    "View real residential and commercial painting, staining, drywall, and wallcovering projects by Wil & Co. Painting.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main id="main-content">
      <PageIntro
        label="Projects"
        title="The work speaks in surfaces."
        description="Real project photography from residential and commercial work completed by Wil & Co. Painting."
      />
      <section
        className="site-container section-space"
        aria-label="Project gallery"
      >
        <ProjectGrid />
      </section>
      <QuoteBand />
    </main>
  );
}

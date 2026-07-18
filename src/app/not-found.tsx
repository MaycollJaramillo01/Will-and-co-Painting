import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="surface-section">
      <div className="site-container flex min-h-[70dvh] flex-col items-start justify-center py-20">
        <p className="eyebrow">Page not found</p>
        <h1 className="display-title max-w-3xl text-6xl sm:text-7xl">
          This surface is not on the schedule.
        </h1>
        <p className="body-copy mt-6">
          The page may have moved, or the address may be incomplete.
        </p>
        <Link className="button-primary mt-8" href="/">
          <ArrowLeft aria-hidden="true" size={17} strokeWidth={2} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}

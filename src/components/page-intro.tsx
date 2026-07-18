export function PageIntro({
  label,
  title,
  description,
}: {
  label?: string;
  title: string;
  description: string;
}) {
  return (
    <section className="surface-section hairline border-b">
      <div className="site-container py-16 sm:py-20 lg:py-24">
        {label && <p className="eyebrow">{label}</p>}
        <h1 className="display-title max-w-5xl text-6xl sm:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="body-copy mt-7">{description}</p>
      </div>
    </section>
  );
}

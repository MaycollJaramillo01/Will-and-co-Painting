import { business, siteUrl } from "@/config/business";
import { services } from "@/content/en";

export function LocalBusinessSchema() {
  const sameAs = [
    business.googleBusinessProfileUrl,
    business.facebookUrl,
    business.instagramUrl,
    business.youtubeUrl,
  ].filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "HousePainter",
    "@id": `${siteUrl}/#business`,
    name: business.businessName,
    url: siteUrl,
    description:
      "Locally owned residential and commercial painting company serving Madison, Wisconsin and surrounding areas.",
    image: `${siteUrl}/images/projects/residential-exterior.jpg`,
    founder: {
      "@type": "Person",
      name: business.ownerName,
    },
    areaServed: business.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    openingHoursSpecification: business.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.days,
      opens: hours.opens,
      closes: hours.closes,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Painting and property services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          url: `${siteUrl}/services/${service.slug}`,
        },
      })),
    },
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(business.email ? { email: business.email } : {}),
    ...(business.licenseNumber ? { identifier: business.licenseNumber } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

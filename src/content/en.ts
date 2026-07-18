export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  imageAlt: string;
  category: "Residential" | "Commercial" | "Specialty";
  scope: readonly string[];
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const services = [
  {
    slug: "residential-interior-painting",
    name: "Residential Interior Painting",
    shortDescription:
      "Fresh, carefully finished walls, ceilings, trim, and doors for the rooms you live in every day.",
    description:
      "Interior painting can change how a room feels without changing how it functions. Wil & Co. Painting handles the painting scope with close attention to edges, surfaces, and the details that frame the finished space.",
    image: "/images/projects/cabinet-staining.jpg",
    imageAlt:
      "Finished wood cabinets and painted walls in a Madison area kitchen",
    category: "Residential",
    scope: ["Walls and ceilings", "Trim and doors", "Room refreshes"],
  },
  {
    slug: "residential-exterior-painting",
    name: "Residential Exterior Painting",
    shortDescription:
      "Exterior painting for siding, trim, and architectural details that shape your home's first impression.",
    description:
      "A well-planned exterior paint project starts with the condition of the surface and ends with consistent coverage. We help Madison area homeowners refresh exterior surfaces with a clean, cohesive finish.",
    image: "/images/projects/residential-exterior.jpg",
    imageAlt: "Blue painted home exterior with white trim and front porch",
    category: "Residential",
    scope: ["Siding", "Trim and accents", "Exterior refreshes"],
  },
  {
    slug: "commercial-interior-painting",
    name: "Commercial Interior Painting",
    shortDescription:
      "Professional interior painting for workplaces, hospitality spaces, and other commercial properties.",
    description:
      "Commercial interiors need a finish that supports the space and the people using it. Wil & Co. Painting works with property owners and managers to define a clear painting scope for interior commercial surfaces.",
    image: "/images/projects/commercial-interior.jpg",
    imageAlt:
      "Completed commercial lobby interior with painted architectural features",
    category: "Commercial",
    scope: ["Walls and ceilings", "Common areas", "Commercial refreshes"],
  },
  {
    slug: "commercial-exterior-painting",
    name: "Commercial Exterior Painting",
    shortDescription:
      "Exterior painting that gives commercial buildings a clean, consistent, business-ready appearance.",
    description:
      "The exterior of a commercial property sets expectations before anyone enters. We provide exterior painting for commercial buildings in the Madison area, with the project scope shaped around the property and its surfaces.",
    image: "/images/projects/commercial-siding.jpg",
    imageAlt: "Commercial building exterior with freshly painted siding",
    category: "Commercial",
    scope: ["Building exteriors", "Siding and trim", "Exterior updates"],
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    shortDescription:
      "Surface cleaning for siding, decks, driveways, and other exterior areas around your property.",
    description:
      "Exterior surfaces collect dirt and buildup over time. Pressure washing helps clean appropriate surfaces and can be part of preparing a property for additional exterior work.",
    image: "/images/projects/deck-staining.jpg",
    imageAlt: "Clean exterior deck and siding after surface work",
    category: "Specialty",
    scope: ["Siding", "Decks", "Driveways and exterior surfaces"],
  },
  {
    slug: "deck-staining",
    name: "Deck Staining",
    shortDescription:
      "Deck staining that refreshes the look of wood and brings the outdoor space back into focus.",
    description:
      "Decks face sun, moisture, and daily use. Wil & Co. Painting provides deck staining for Madison area properties, with attention to the wood surface and the appearance of the completed space.",
    image: "/images/projects/deck-staining.jpg",
    imageAlt: "Finished backyard deck with stained wood railings",
    category: "Specialty",
    scope: ["Deck boards", "Railings", "Wood details"],
  },
  {
    slug: "cabinet-staining",
    name: "Cabinet Staining",
    shortDescription:
      "Cabinet staining that renews the wood tone while keeping the character of the cabinetry visible.",
    description:
      "Staining can refresh wood cabinets while preserving the grain that gives them character. We evaluate the existing cabinet surfaces and define the staining scope around the desired result.",
    image: "/images/projects/cabinet-staining.jpg",
    imageAlt: "Kitchen with professionally stained wood cabinets",
    category: "Specialty",
    scope: ["Kitchen cabinets", "Wood surfaces", "Color refreshes"],
  },
  {
    slug: "drywall-installation",
    name: "Drywall Installation",
    shortDescription:
      "New drywall installation for rooms, repairs, and property improvement projects.",
    description:
      "Drywall creates the surface that every finished room depends on. Wil & Co. Painting installs drywall for residential and commercial project scopes in the Madison area.",
    image: "/images/projects/drywall-repair.jpg",
    imageAlt: "Open ceiling area prepared for drywall installation",
    category: "Specialty",
    scope: ["Walls", "Ceilings", "New and replacement sections"],
  },
  {
    slug: "drywall-finishing",
    name: "Drywall Finishing",
    shortDescription:
      "Drywall finishing that prepares new surfaces for the next stage of the room.",
    description:
      "The finish work determines how a drywall surface reads once paint and light reach it. We provide drywall finishing as part of a complete wall and ceiling project scope.",
    image: "/images/projects/drywall-repair.jpg",
    imageAlt: "Ceiling opening ready for drywall finishing work",
    category: "Specialty",
    scope: ["Seams", "Corners", "Paint-ready surfaces"],
  },
  {
    slug: "drywall-repair",
    name: "Drywall Repair",
    shortDescription:
      "Targeted drywall repair for holes, cracks, damaged sections, and ceiling areas.",
    description:
      "Damage does not always require replacing an entire wall or ceiling. We repair affected drywall areas and prepare the surface for a cleaner, more complete finish.",
    image: "/images/projects/drywall-repair.jpg",
    imageAlt: "Damaged ceiling section opened for drywall repair",
    category: "Specialty",
    scope: ["Holes and cracks", "Damaged sections", "Ceiling repairs"],
  },
  {
    slug: "wallpaper-installation",
    name: "Wallpaper Installation",
    shortDescription:
      "Precise wallpaper installation for feature walls, rooms, and commercial interiors.",
    description:
      "Wallpaper adds pattern and texture that paint alone cannot create. Wil & Co. Painting installs wallpaper for residential and commercial spaces with careful attention to alignment and the visible finish.",
    image: "/images/projects/wallpaper-installation.jpg",
    imageAlt: "Commercial interior with a finished wallpaper feature wall",
    category: "Specialty",
    scope: ["Feature walls", "Full rooms", "Commercial wallcoverings"],
  },
] as const satisfies readonly Service[];

export type ServiceSlug = (typeof services)[number]["slug"];

export const serviceGroups = [
  {
    name: "Residential Painting",
    description: "Interior and exterior painting for the place you call home.",
    slugs: ["residential-interior-painting", "residential-exterior-painting"],
  },
  {
    name: "Commercial Painting",
    description:
      "Interior and exterior painting for commercial properties and shared spaces.",
    slugs: ["commercial-interior-painting", "commercial-exterior-painting"],
  },
  {
    name: "Drywall",
    description: "Installation, finishing, and repair for walls and ceilings.",
    slugs: ["drywall-installation", "drywall-finishing", "drywall-repair"],
  },
  {
    name: "Surface Care and Finishes",
    description:
      "Focused services for exterior cleaning, wood, cabinets, and wallcoverings.",
    slugs: [
      "pressure-washing",
      "deck-staining",
      "cabinet-staining",
      "wallpaper-installation",
    ],
  },
] as const;

export type Project = {
  title: string;
  category: string;
  image: string;
  alt: string;
  aspect: "landscape" | "portrait" | "square";
};

export const projects: readonly Project[] = [
  {
    title: "Residential Exterior",
    category: "Exterior Painting",
    image: "/images/projects/residential-exterior.jpg",
    alt: "Blue residential exterior with crisp white trim",
    aspect: "landscape",
  },
  {
    title: "Commercial Lobby",
    category: "Interior Painting",
    image: "/images/projects/commercial-interior.jpg",
    alt: "Commercial lobby with painted walls and architectural ceiling",
    aspect: "landscape",
  },
  {
    title: "Backyard Deck",
    category: "Deck Staining",
    image: "/images/projects/deck-staining.jpg",
    alt: "Backyard deck with stained railings and refreshed deck surface",
    aspect: "landscape",
  },
  {
    title: "Commercial Exterior",
    category: "Exterior Painting",
    image: "/images/projects/commercial-exterior.webp",
    alt: "Completed commercial building exterior painting project",
    aspect: "portrait",
  },
  {
    title: "Wood Cabinet Refresh",
    category: "Cabinet Staining",
    image: "/images/projects/cabinet-staining.jpg",
    alt: "Kitchen cabinetry with a refreshed wood stain finish",
    aspect: "landscape",
  },
  {
    title: "Commercial Siding",
    category: "Exterior Painting",
    image: "/images/projects/commercial-siding.jpg",
    alt: "Freshly painted siding on a commercial property",
    aspect: "landscape",
  },
  {
    title: "Wallcovering Installation",
    category: "Wallpaper Installation",
    image: "/images/projects/wallpaper-installation.jpg",
    alt: "Patterned wallcovering installed in a commercial lobby",
    aspect: "landscape",
  },
  {
    title: "Drywall Repair Scope",
    category: "Drywall Repair",
    image: "/images/projects/drywall-repair.jpg",
    alt: "Ceiling section opened for drywall repair work",
    aspect: "portrait",
  },
] as const;

export const content = {
  locale: "en-US",
  home: {
    eyebrow: "Madison, Wisconsin",
    title: "Fresh paint. Clear results.",
    intro:
      "Residential and commercial painting, drywall, staining, and washing for Madison properties.",
  },
  about: {
    title: "Local work. Personal responsibility.",
    body: "Wil & Co. Painting is a locally owned residential and commercial painting company led by Wil Barahona in Madison, Wisconsin. Every project starts with the property, the surfaces, and the result the customer wants to see.",
  },
} as const;

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

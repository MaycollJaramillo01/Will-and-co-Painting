/**
 * =========================================================
 * WIL & CO. PAINTING — text.js
 * Contenido convertido desde la estructura PHP suministrada.
 *
 * Fuentes principales consultadas:
 * - https://www.wilandcopainting.com/
 * - https://www.wilandcopainting.com/solutions
 * - https://www.wilandcopainting.com/company
 * - https://www.wilandcopainting.com/contact
 * - BBB Business Profile de Wil & Co. Painting
 *
 * IMPORTANTE:
 * Los campos que el sitio no permite confirmar están marcados
 * con comentarios "TODO CONFIRMAR". No se copiaron los datos
 * ficticios de San Francisco presentes en la plantilla Wix.
 * =========================================================
 */

/* =========================
   HELPERS
   ========================= */
export const slugify = (text = "") =>
  String(text)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "service";

export const telRef = (phone = "") => {
  const clean = String(phone).replace(/[^\d+]/g, "");
  return clean ? `tel:${clean}` : "";
};

export const createWhatsAppUrl = (phone = "", message = "") => {
  const clean = String(phone).replace(/\D+/g, "");
  if (!clean) return "";
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
};

export const getPageName = (pathname = "/") => {
  const page = pathname.split("/").filter(Boolean).pop() || "home";
  const pageMap = {
    home: "Home",
    index: "Home",
    services: "Services",
    solutions: "Services",
    portfolio: "Portfolio",
    projects: "Portfolio",
    company: "About",
    about: "About",
    contact: "Contact",
    reviews: "Reviews",
    testimonials: "Reviews",
    "thank-you": "Thank You",
    404: "Not Found",
  };

  return (
    pageMap[page] ||
    page
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  );
};

/* =========================
   INFO GENERAL
   ========================= */
export const Company = "Wil & Co. Painting";
export const LegalCompany = "Wil and Co Painting LLC";
export const CustomerName = "Wil";
export const OwnerName = "Wilmer A. Barahona Castro";

export const BaseURL = "https://www.wilandcopainting.com/";
export const Domain = BaseURL;

/**
 * El sitio únicamente afirma que la empresa está basada en Madison
 * y atiende Madison y sus alrededores. BBB publica una dirección en
 * Fitchburg, pero no se utiliza aquí como dirección de atención pública.
 */
export const Address = "Madison, WI";
export const PublicBusinessAddress = "Madison and Fitchburg, Wisconsin";

export const PhoneName = "Call or Text";
export const Phone2Name = "Secondary Phone";
export const Phone = "+1 (608) 332-6263";
export const Phone2 = ""; // TODO CONFIRMAR: línea secundaria.
export const PhoneRef = telRef(Phone);
export const PhoneRef2 = telRef(Phone2);

export const WhatsAppMessage =
  "Hello Wil & Co. Painting! I would like an estimate for my painting or surface project.";
export const whatsapp = createWhatsAppUrl(Phone, WhatsAppMessage);

/** TODO CONFIRMAR: el sitio no publica un correo comercial real. */
export const Mail = "";
export const MailRef = Mail ? `mailto:${Mail}` : "";

/* =========================
   GENERAL MESSAGES
   ========================= */
export const Services =
  "Residential and commercial interior and exterior painting, pressure washing, deck staining, cabinet staining, drywall installation and finishing, drywall repair, and wallpaper installation";

export const Estimates = "Request an Estimate";
export const Payment = "Not specified"; // TODO CONFIRMAR métodos de pago.
export const Experience = "3+ Years in Business";
export const Schedule =
  "Monday-Friday 7:00 AM-6:00 PM. Closed Saturday and Sunday.";
export const Coverage =
  "Serving Madison, Fitchburg, Dane County, and surrounding communities in Wisconsin.";
export const LicenseNote = "BBB Accredited Business";
export const LicenseNumber = "BBB A+ Rating";
export const BilingualNote =
  "English service. Spanish-language availability should be confirmed.";
export const TypeOfService =
  "Residential and Commercial Painting, Drywall, Staining, Pressure Washing, and Wallpaper Installation";

/* =========================
   VERIFICATION NOTES
   ========================= */
export const VerificationNotes = {
  verifiedFromOfficialSite: [
    "Locally owned painting company based in Madison, Wisconsin",
    "Residential and commercial services",
    "Monday-Friday hours from 7:00 AM to 6:00 PM",
    "Seven core painting and surface services",
    "Owner/founder identified as Wil Barahona/Wilmer",
    "Commitment to quality, sustainability, craftsmanship, integrity, and community",
  ],
  verifiedFromPublicBusinessProfiles: [
    "Phone: +1 (608) 332-6263",
    "Business started May 31, 2023",
    "BBB Accredited since February 10, 2026",
    "BBB A+ rating",
    "Public service area includes Dane County, Wisconsin",
  ],
  todoConfirm: [
    "Business email address",
    "Exact customer-facing street address",
    "Secondary phone number",
    "Payment methods",
    "Insurance and license claims",
    "Official Facebook, Instagram, TikTok, and Google Business URLs",
    "Whether Spanish-language service is currently available",
  ],
};

/* =========================
   BRAND COLORS
   =========================
   TODO CONFIRMAR: paleta aproximada basada en la presentación visual
   del sitio y el logo; reemplazar con valores oficiales de marca.
   ========================= */
export const BrandColors = {
  primary: "#26332F",
  primary_rgb: "38, 51, 47",
  secondary: "#111715",
  secondary_rgb: "17, 23, 21",
  accent: "#C8A46B",
  accent_rgb: "200, 164, 107",
  neutral: "#F3F0E9",
  white: "#FFFFFF",
};

/* =========================
   SERVICE AREAS
   ========================= */
export const Areas = [
  "Madison, WI",
  "Fitchburg, WI",
  "Dane County, WI",
  "Surrounding Wisconsin communities",
];

/* =========================
   MAP AND SOCIAL LINKS
   ========================= */
export const GoogleMap =
  '<iframe src="https://maps.google.com/maps?q=Madison%2C%20Wisconsin&t=&z=11&ie=UTF8&iwloc=&output=embed" width="100%" height="450" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';

export const facebook = ""; // TODO CONFIRMAR.
export const instagram = ""; // TODO CONFIRMAR.
export const google = ""; // TODO CONFIRMAR Google Business Profile.
export const tiktok = ""; // TODO CONFIRMAR.
export const messenger = ""; // TODO CONFIRMAR.
export const yelp = ""; // TODO CONFIRMAR URL directa del perfil.
export const bbb =
  "https://www.bbb.org/us/wi/fitchburg/profile/residential-painter/wil-co-painting-0694-1000067884";
export const mapquest =
  "https://www.mapquest.com/us/wisconsin/wilco-painting-776283079";

export const DirectoryLinks = {
  bbb,
  yelp: yelp || mapquest,
  google: google || "reviews",
  mapquest,
};

export const GoogleReviews = google || mapquest;

/* =========================
   REVIEWS
   Review text is paraphrased from publicly indexed review snippets.
   ========================= */
export const DirectoryReviewItems = [
  {
    name: "Nanping W.",
    city: "Madison Area, WI",
    stars: 5,
    text: "Wil and his crew delivered quality work at a fair, competitive price. The customer would recommend the team and hire them again.",
    source: "Yelp review indexed by MapQuest",
    url: mapquest,
  },
  {
    name: "Trish",
    city: "Madison Area, WI",
    stars: 5,
    text: "The team was responsive, easy to work with, flexible with scheduling, and accommodating when the project scope changed.",
    source: "Yelp review indexed by MapQuest",
    url: mapquest,
  },
  {
    name: "Anna Z.",
    city: "Madison Area, WI",
    stars: 5,
    text: "Wil was professional, detail-oriented, clear about expectations, and visibly committed to high-quality workmanship.",
    source: "Yelp review indexed by MapQuest",
    url: mapquest,
  },
  {
    name: "Tom",
    city: "Madison Area, WI",
    stars: 5,
    text: "Wil & Co. repaired a bathroom wall efficiently and completed the plaster and texture work with strong results.",
    source: "Yelp review indexed by MapQuest",
    url: mapquest,
  },
  {
    name: "Maribeth W.",
    city: "Madison Area, WI",
    stars: 5,
    text: "The crew handled wall painting, deck staining, trim, doors, and porch columns with careful attention to detail and good communication.",
    source: "Yelp review indexed by MapQuest",
    url: mapquest,
  },
];

export const GoogleReviewItems = DirectoryReviewItems;

export const ReviewSourceSummaries = [
  {
    source: "Public Review Profile",
    rating: "5.0/5",
    count: 7,
    label: "Publicly indexed customer reviews",
    url: mapquest,
  },
  {
    source: "Better Business Bureau",
    rating: "A+",
    count: 0,
    label: "BBB Accredited Business",
    url: bbb,
  },
];

export const DetailedReviewItems = DirectoryReviewItems.map(
  (review, index) => ({
    ...review,
    date: [
      "October 2025",
      "October 2025",
      "October 2025",
      "April 2025",
      "May 2025",
    ][index],
  }),
);

/* =========================
   SEO AND BRANDING SLOGANS
   ========================= */
export const Phrase = [
  "Professional Painting & Surface Services in Madison, WI",
  "Residential & Commercial Painting Done with Care",
  "Interior, Exterior, Drywall, Staining & Pressure Washing",
  "Quality Craftsmanship and Clear Communication",
  "Transforming Spaces with Care",
];

/* =========================
   HOME / ABOUT
   ========================= */
export const Home = [
  "Wil & Co. Painting provides residential and commercial painting, drywall, staining, pressure washing, and wallpaper installation throughout Madison, Fitchburg, and surrounding Wisconsin communities.",
  "Led by Wilmer, the locally owned company brings precision, professionalism, reliable communication, and careful craftsmanship to every home and business project.",
];

export const About = [
  "Wil & Co. Painting is a locally owned Madison-area company serving residential and commercial clients with professional painting and surface services.",
  "Founded by Wilmer Barahona, the company is built around quality work, honest service, sustainability, community connection, and treating every project with the same care as the team's own home.",
];

export const Mission =
  "To transform homes and businesses through dependable service, careful preparation, skilled craftsmanship, and finishes built to last.";

export const Vision =
  "To be a trusted Madison-area painting and surface-services company known for quality, integrity, sustainability, and lasting customer relationships.";

/* =========================
   SERVICES SECTION
   ========================= */
export const SN = {
  1: "Interior & Exterior Painting",
  2: "Pressure Washing",
  3: "Deck Staining",
  4: "Cabinet Staining",
  5: "Drywall Installation & Finishing",
  6: "Drywall Repair",
  7: "Wallpaper Installation",
};

export const SD = {
  1: "Professional residential and commercial painting with clean, even finishes that improve appearance, protect surfaces, and provide long-lasting results.",
  2: "High-pressure cleaning that removes dirt, mold, and grime from siding, driveways, decks, and other exterior surfaces.",
  3: "Professional deck staining that enhances the natural wood grain, protects against weathering, and extends the life of the deck.",
  4: "Durable cabinet staining for kitchens and bathrooms that restores wood surfaces and creates a refreshed, modern appearance.",
  5: "Drywall installation and finishing for new construction, remodels, additions, and repairs, completed to a smooth paint-ready surface.",
  6: "Precise repair of cracks, dents, holes, and damaged drywall, including texture matching and seamless blending.",
  7: "Professional wallpaper installation with careful pattern alignment, clean seams, smooth application, and a polished final finish.",
};

export const ExSD = Object.fromEntries(
  Object.entries(SD).map(([key, value]) => [
    key,
    value.length > 120 ? `${value.slice(0, 120)}...` : value,
  ]),
);

export const OtherServices = [
  "Residential Painting",
  "Commercial Painting",
  "Surface Preparation",
  "Wallpaper Installation",
];

export const ServicesByCategory = [
  {
    label: "Painting",
    summary_slug: "interior-exterior-painting",
    service_slugs: ["interior-exterior-painting"],
  },
  {
    label: "Cleaning & Staining",
    summary_slug: "pressure-washing",
    service_slugs: ["pressure-washing", "deck-staining", "cabinet-staining"],
  },
  {
    label: "Drywall & Wall Finishes",
    summary_slug: "drywall-installation-finishing",
    service_slugs: [
      "drywall-installation-finishing",
      "drywall-repair",
      "wallpaper-installation",
    ],
  },
];

export const Badges = [
  Estimates,
  Experience,
  "Residential & Commercial",
  LicenseNumber,
  LicenseNote,
  "Madison Area Service",
];

export const ExAbout = `${About[0].slice(0, 145)}...`;
export const ExHome = `${Home[0].slice(0, 155)}...`;

const serviceCategoryMap = ServicesByCategory.reduce((map, category) => {
  category.service_slugs.forEach((serviceSlug) => {
    map[serviceSlug] = {
      category_slug: category.summary_slug,
      category_label: category.label,
    };
  });
  return map;
}, {});

export const ServicesList = Object.fromEntries(
  Object.entries(SN).map(([id, name]) => {
    const slug = slugify(name);
    const category = serviceCategoryMap[slug] || {
      category_slug: "general",
      category_label: "General",
    };

    return [
      slug,
      {
        id: Number(id),
        name,
        description: SD[id] || "",
        excerpt: ExSD[id] || "",
        slug,
        file: "/services",
        url: `/services#${slug}`,
        ...category,
      },
    ];
  }),
);

export const OtherServicesLandingSlugs = [
  "pressure-washing",
  "deck-staining",
  "cabinet-staining",
  "wallpaper-installation",
];

export const PrimaryServiceSlugs = [
  "interior-exterior-painting",
  "drywall-installation-finishing",
  "drywall-repair",
];

export const AllowedServiceSlugs = [
  ...PrimaryServiceSlugs,
  ...OtherServicesLandingSlugs,
];

export const ServicesDisplayList = Object.values(ServicesList).sort(
  (a, b) => a.id - b.id,
);

export const ServiceDetails = {
  "interior-exterior-painting": {
    kicker: "Residential & Commercial Painting",
    headline: "Clean, even finishes for interiors and exteriors",
    paragraphs: [
      "Wil & Co. Painting transforms homes and commercial spaces with professional interior and exterior painting tailored to each surface and project goal.",
      "The process emphasizes careful preparation, quality materials, clean application, and a durable finish that improves appearance and protects the property.",
    ],
    bullets: [
      "Residential and commercial projects",
      "Interior and exterior surfaces",
      "Detailed preparation and clean application",
      "Durable, long-lasting finishes",
    ],
  },
  "pressure-washing": {
    kicker: "Exterior Cleaning",
    headline: "Remove buildup and restore exterior surfaces",
    paragraphs: [
      "Pressure washing removes dirt, mold, mildew, and grime that can make siding, concrete, decks, and exterior surfaces look worn.",
      "It can be scheduled as a standalone cleaning service or used to prepare surfaces before painting or staining.",
    ],
    bullets: [
      "Siding and exterior walls",
      "Driveways and concrete",
      "Decks and outdoor surfaces",
      "Preparation before finishing",
    ],
  },
  "deck-staining": {
    kicker: "Deck Protection",
    headline: "Refresh the wood and protect it from weather",
    paragraphs: [
      "Professional deck staining revives outdoor wood while helping protect it against sun, moisture, and seasonal Wisconsin weather.",
      "Wil & Co. applies clean, even stain that enhances the natural grain and extends the usable life of the deck.",
    ],
    bullets: [
      "Wood cleaning and preparation",
      "Even stain application",
      "Weather-resistant protection",
      "Natural wood appearance",
    ],
  },
  "cabinet-staining": {
    kicker: "Cabinet Refinishing",
    headline: "Renew cabinets without replacing them",
    paragraphs: [
      "Cabinet staining restores kitchen and bathroom wood surfaces with rich color and a durable finish.",
      "The service highlights the natural character of the wood while protecting cabinets against regular household wear.",
    ],
    bullets: [
      "Kitchen and bathroom cabinets",
      "Surface preparation",
      "Rich, durable stain finishes",
      "Refreshed modern appearance",
    ],
  },
  "drywall-installation-finishing": {
    kicker: "Drywall Installation",
    headline: "Smooth, paint-ready walls for new and remodeled spaces",
    paragraphs: [
      "Wil & Co. provides drywall installation and finishing for new construction, remodeling, additions, and damaged areas.",
      "The team handles the process through finishing so walls and ceilings integrate cleanly with the surrounding space and are ready for paint.",
    ],
    bullets: [
      "New construction and remodels",
      "Drywall hanging and installation",
      "Taping, mudding, and sanding",
      "Smooth paint-ready finish",
    ],
  },
  "drywall-repair": {
    kicker: "Wall Repair",
    headline: "Cracks, holes, dents, and damaged drywall repaired cleanly",
    paragraphs: [
      "Drywall damage can interrupt an otherwise clean room finish. Wil & Co. repairs damaged areas with careful patching and finishing.",
      "Textures and surrounding surfaces are blended as closely as possible so the repair is ready for paint or wallpaper.",
    ],
    bullets: [
      "Cracks, holes, and dents",
      "Water or impact damage repair",
      "Texture matching",
      "Paint-ready finish",
    ],
  },
  "wallpaper-installation": {
    kicker: "Wallpaper",
    headline: "Precise pattern alignment and smooth professional installation",
    paragraphs: [
      "Wallpaper can add color, texture, and personality to a room when it is installed correctly.",
      "Wil & Co. handles layout, pattern alignment, seam placement, and smooth application for a polished final result.",
    ],
    bullets: [
      "Pattern alignment",
      "Clean seam placement",
      "Smooth application",
      "Residential and commercial spaces",
    ],
  },
};

/* =========================
   COPY / UI TEXT
   ========================= */
export const WhyChoose = {
  eyebrow: "Madison Painting Professionals",
  title_pre: "Why Choose",
  intro:
    "Wil & Co. Painting combines dependable communication, careful preparation, skilled craftsmanship, and respect for every home or business.",
  cards: [
    {
      title: "Detailed Craftsmanship",
      text: "Every project receives careful preparation, clean application, and attention to the final details.",
    },
    {
      title: "Clear Communication",
      text: "The team values honesty, transparency, reliability, and following through on project commitments.",
    },
    {
      title: "Ready to Start?",
      text: "Call Wil & Co. Painting to discuss your painting, drywall, staining, pressure washing, or wallpaper project.",
      btn: { href: PhoneRef, text: "Call Now" },
    },
  ],
};

export const PaymentMethods =
  Payment === "Not specified"
    ? []
    : Payment.split(",").map((item) => item.trim());

export const ExperienceYears = 3;

export const NavCopy = {
  home: "Home",
  about: "About",
  services: "Services",
  projects: "Portfolio",
  reviews: "Reviews",
  contact: "Contact",
  other_services: "Surface Services",
  cta: "Call Now",
  cta_mobile: "Call Now",
  explore_service: "Explore Service",
  view_services: "View Services",
  contact_today: "Request an Estimate",
  leave_review: "Leave a Review",
  read_reviews: "Read Reviews",
};

export const LanguageCopy = {
  label: "Language",
  english: "English",
  spanish: "Español",
};

export const HeaderCopy = {
  menu_close: "Close Menu",
  menu_toggle: "Toggle Menu",
  social_titles: {
    facebook: "Facebook",
    messenger: "Messenger",
    google: "Google Reviews",
    instagram: "Instagram",
    tiktok: "TikTok",
    whatsapp: "WhatsApp",
  },
};

export const FooterCopy = {
  desc: "Residential and commercial painting, drywall, staining, pressure washing, and wallpaper installation in Madison, Fitchburg, and surrounding Wisconsin communities.",
  titles: {
    company: "Company",
    services: "Services",
    contact: "Contact Us",
  },
  labels: {
    location: "Service Area",
    phone: "Phone",
    hours: "Hours",
  },
  copyright_suffix: "All Rights Reserved.",
};

export const PageHeroCopy = {
  default: {
    title: "Painting & Surface Services",
    desc: "Professional painting, drywall, staining, pressure washing, and wallpaper installation for Madison-area homes and businesses.",
    bg: "assets/img/hero/painting-hero-1.jpg",
  },
  projects: {
    title: "Project Portfolio",
    desc: "Explore residential and commercial painting, exterior work, deck staining, siding, drywall, and surface transformations.",
    bg: "assets/img/hero/painting-hero-2.jpg",
  },
  about: {
    title: `About ${Company}`,
    desc: "A locally owned Madison-area company focused on quality, integrity, sustainability, and craftsmanship.",
    bg: "assets/img/hero/painting-hero-3.jpg",
  },
  contact: {
    title: "Request an Estimate",
    desc: "Tell us about your painting or surface project and our team will follow up as soon as possible.",
    bg: "assets/img/hero/painting-hero-1.jpg",
  },
  reviews: {
    title: "Customer Reviews",
    desc: "Read public feedback from customers who hired Wil & Co. Painting for painting, repairs, and staining.",
    bg: "assets/img/hero/painting-hero-2.jpg",
  },
  other: {
    title: "Drywall, Staining & Surface Services",
    desc: "Professional preparation, repair, cleaning, staining, and wall finishing for homes and businesses.",
    bg: "assets/img/hero/painting-hero-3.jpg",
  },
};

export const HomeHeroCopy = {
  headline: "Transforming Spaces with Care",
  sub: "Professional residential and commercial painting, drywall, staining, pressure washing, and wallpaper installation in Madison, Wisconsin.",
  cta_primary: "Call for an Estimate",
  cta_secondary: "View Services",
  cta_primary_href: PhoneRef,
  cta_secondary_href: "/services",
  prev_label: "Previous slide",
  next_label: "Next slide",
  slide_alt_prefix: "Wil & Co. Painting Project",
  thumb_alt_prefix: "Painting Project Thumbnail",
};

export const HomeAboutCopy = {
  eyebrow: "Locally Owned in Madison, Wisconsin",
  title: "Quality Work,",
  title_strong: "Handled with Care.",
  description:
    "Wil & Co. Painting helps homeowners and businesses improve their spaces through professional painting, drywall, staining, pressure washing, and wallpaper installation.",
  badge_label: "Years in Business",
  images: {
    back: {
      src: "assets/img/about/wil-and-co-project.jpg",
      alt: "Wil & Co. Painting project in the Madison area",
    },
    front: {
      src: "assets/img/about/wil-and-co-team.jpg",
      alt: "Wil & Co. Painting team working on a project",
    },
  },
  video: {
    src: "assets/video/wil-and-co-project.mp4",
    poster: "assets/img/about/wil-and-co-project.jpg",
    label: "Wil & Co. Painting project video",
  },
  features: [
    {
      icon: "fa-paint-roller",
      title: "Painting",
      text: "Residential and commercial interior and exterior painting.",
    },
    {
      icon: "fa-border-all",
      title: "Drywall",
      text: "Installation, finishing, and precise repairs.",
    },
    {
      icon: "fa-brush",
      title: "Staining",
      text: "Deck and cabinet staining with durable finishes.",
    },
    {
      icon: "fa-water",
      title: "Surface Care",
      text: "Pressure washing and wallpaper installation.",
    },
  ],
  cta: "Learn About Us",
};

export const AboutHeroCopy = {
  eyebrow: `About ${Company}`,
  title: "Madison-area craftsmanship built on quality and integrity",
  desc: About[0],
  cta_primary: "Our Story",
  cta_primary_href: "#story",
  cta_secondary_prefix: "Call",
  meta: [
    Experience,
    "Locally Owned",
    LicenseNumber,
    "Residential & Commercial",
  ],
  list: [
    { label: "Service area", value: Coverage },
    { label: "Schedule", value: Schedule },
    { label: "Core services", value: TypeOfService },
    { label: "Based in", value: Address },
  ],
};

export const AboutStoryCopy = {
  eyebrow: "Our Story",
  title: "A local company committed to doing the work right",
  points: [
    {
      title: "Honest service",
      text: "Clear communication, transparent expectations, and reliable follow-through from start to finish.",
    },
    {
      title: "Careful craftsmanship",
      text: "Detailed preparation, professional application, and final touch-ups without cutting corners.",
    },
    {
      title: "Community connection",
      text: "A Madison-area business focused on lasting relationships and serving local homes and businesses.",
    },
  ],
  actions: {
    primary_text: "Request an estimate",
    primary_href: PhoneRef,
    secondary_prefix: "Call",
  },
  stats: {
    years_label: "Years in Business",
    services_label: "Core services",
    areas_label: "Service areas",
    areas_separator: ", ",
    areas_preview_count: 4,
  },
};

export const AboutCredentialsCopy = {
  eyebrow: "Why Work With Us",
  title: "Professional care for every surface",
  intro:
    "Every project is approached with respect for the property, attention to preparation, clear communication, and a commitment to lasting results.",
  list: [
    { label: "Contact", value: Phone },
    { label: "Hours", value: Schedule },
    { label: "Core services", value: TypeOfService },
    { label: "Coverage", value: Coverage },
    { text: `${LicenseNote} | ${LicenseNumber}` },
  ],
  cta: {
    title: "Ready to improve your space?",
    desc: "Call for residential or commercial painting, drywall, staining, pressure washing, and wallpaper installation.",
    primary_text: "Call Now",
    primary_href: PhoneRef,
    secondary_prefix: "Call",
  },
};

export const AboutServicesSummaryCopy = {
  eyebrow: "Services",
  title: "How We Help",
  desc: `${TypeOfService} throughout the Madison area.`,
  link_label: "Learn More",
};

export const ServicesListCopy = {
  eyebrow: "Complete Service Range",
  title: "Painting and surface services we provide",
  desc: Services,
  link_label: "Learn More",
};

export const BrandsCopy = {
  tagline: "Serving Madison-Area Homeowners and Businesses",
};

export const HomeServicesCopy = {
  eyebrow: "Painting & Surface Solutions",
  title: "Built Around Your",
  title_strong: "Home or Business",
  desc: "Interior and exterior painting, drywall, staining, pressure washing, and wallpaper installation completed with precision and care.",
  link_label: "Contact",
  more_title: "Not Sure Which Service You Need?",
  more_desc:
    "Call and describe the property, surface, and result you want. The team can help identify the right next step.",
  more_button: "Call for an Estimate",
  more_href: PhoneRef,
};

export const HomeMaintenanceCopy = {
  tagline: "Professional Painting & Surface Care",
  title: "Prepare, Transform,",
  title_strong: "Protect",
  desc: "Wil & Co. Painting combines surface preparation, repair, painting, staining, and finishing to deliver clean, lasting results.",
  cards: [
    {
      icon: "fa-paint-roller",
      title: "Interior & Exterior Painting",
      text: "Clean, even finishes for residential and commercial spaces.",
      action: "See Details",
    },
    {
      icon: "fa-water",
      title: "Pressure Washing",
      text: "Remove dirt, grime, and buildup from exterior surfaces.",
      action: "See Details",
    },
    {
      icon: "fa-brush",
      title: "Deck & Cabinet Staining",
      text: "Protect wood and restore its natural appearance.",
      action: "See Details",
    },
    {
      icon: "fa-border-all",
      title: "Drywall & Wallpaper",
      text: "Installation, repair, finishing, and professional wall covering.",
      action: "See Details",
    },
  ],
  foundation: [
    {
      icon: "fa-award",
      title: LicenseNumber,
      subtitle: LicenseNote,
    },
    {
      icon: "fa-house",
      title: "Locally Owned",
      subtitle: "Madison, Wisconsin",
    },
    {
      icon: "fa-star",
      title: `${ExperienceYears}+ Years`,
      subtitle: "In business",
    },
  ],
};

export const WhyCopy = {
  badge: "Madison-Area Painting Company",
  title_prefix: "Why Customers Choose",
  description:
    "The company is built around quality, integrity, transparency, teamwork, sustainability, community, and careful craftsmanship.",
  stats: [
    { value: `${ExperienceYears}+`, label: "Years in Business" },
    { value: `${ServicesDisplayList.length}`, label: "Core Services" },
    { value: "A+", label: "BBB Rating" },
  ],
  service_area_label: "Coverage and Hours",
  features: [
    {
      icon: "fa-comments",
      title: "Clear Communication",
      text: "Honest expectations, reliable updates, and follow-through throughout the project.",
    },
    {
      icon: "fa-shield-alt",
      title: "Respect for Your Property",
      text: "Careful protection, clean work areas, and professional job-site practices.",
    },
    {
      icon: "fa-paint-brush",
      title: "Quality Craftsmanship",
      text: "Detailed preparation and finishing with attention to every visible surface.",
    },
    {
      icon: "fa-clock",
      title: "Dependable Hours",
      text: Schedule,
    },
  ],
  cta_label: "Call Now",
};

export const MissionCopy = {
  mission_title: "Our Mission",
  vision_title: "Our Vision",
};

export const ProcessCopy = {
  title: "How We Work",
  title_strong: "From Estimate to Final Touch-Up",
  desc: "A straightforward process designed to keep the project clear, organized, and focused on a quality final result.",
  steps: [
    {
      icon: "fa-phone",
      title: "Contact Us",
      text: "Tell us about the property, service, surfaces, and desired outcome.",
    },
    {
      icon: "fa-clipboard-list",
      title: "Project Review",
      text: "The team reviews the scope, preparation needs, materials, and scheduling.",
    },
    {
      icon: "fa-calendar-check",
      title: "Schedule",
      text: "Set a project date and confirm expectations before work begins.",
    },
    {
      icon: "fa-check-circle",
      title: "Final Walkthrough",
      text: "Review the completed work and address final details or touch-ups.",
    },
  ],
};

export const FaqCopy = {
  title: "Frequently Asked Questions",
  items: [
    {
      q: "Do you work on residential and commercial properties?",
      a: "Yes. Wil & Co. Painting provides services for both residential and commercial projects.",
    },
    {
      q: "What services do you provide?",
      a: "Services include interior and exterior painting, pressure washing, deck staining, cabinet staining, drywall installation and finishing, drywall repair, and wallpaper installation.",
    },
    {
      q: "What areas do you serve?",
      a: Coverage,
    },
    {
      q: "What are your business hours?",
      a: Schedule,
    },
    {
      q: "How can I request an estimate?",
      a: `Call or text ${Phone}, or use the contact form on the website.`,
    },
  ],
};

export const AreasCopy = {
  title: "Serving",
  title_strong: "Madison & Surrounding Areas",
  subtitle:
    "Professional painting and surface services for homes and businesses throughout Madison, Fitchburg, Dane County, and nearby communities.",
  cta_label: "Request Service in Your Area",
  map_overlay: "Madison-Area Service Coverage",
  license_pills: [
    LicenseNumber,
    LicenseNote,
    "Residential & Commercial",
    "Locally Owned",
  ],
};

export const CtaCopy = {
  badge: `${ExperienceYears}+ Years in Business`,
  title: "Ready to Transform",
  title_strong: "Your Space?",
  paragraph: `${Company} provides painting, drywall, staining, pressure washing, and wallpaper installation for Madison-area homes and businesses.`,
  features: ["Detailed Craftsmanship", "Clear Communication", "Local Service"],
  button: "Call for an Estimate",
  card_title: `Speak With ${Company}`,
  card_subtitle: "Discuss your project with the local team",
  row_call_label: "Call or text",
  row_license_label: "Based in",
  row_license_title: Address,
  row_service_label: "Coverage Area",
  whatsapp_button: "Message Us",
  book_button: "Start Request",
};

export const ContactFormCopy = {
  eyebrow: "Request an Estimate",
  title: "Let's Improve",
  title_strong: "Your Space.",
  desc: "Send your project location, property type, requested service, and a brief description. For faster contact, call or text directly.",
  method_labels: {
    call: "Call or Text",
    hours: "Business Hours",
  },
  form_labels: {
    first_name: "First Name",
    last_name: "Last Name",
    name: "Name",
    phone: "Phone",
    email: "Email",
    service: "Service Needed",
    timing: "When Do You Require This Service?",
    referral: "How Did You Hear About Us?",
    message: "Project Details",
  },
  placeholders: {
    service: "Choose a service",
    service_other: "Other / Custom Request",
    timing: "Select your preferred timeframe",
    referral: "Choose an option",
    message:
      "Describe the property, surfaces, project scope, location, and desired result...",
  },
  submit: "Submit Request",
  honeypot_label: "Leave this field empty",
};

export const MapCopy = {
  title: "Serving",
  title_strong: "The Madison Area",
  labels: {
    location: "Service Area",
    call: "Phone",
    hours: "Hours",
  },
};

export const TestimonialsCopy = {
  title: "Customer Feedback",
  title_strong: "From Real Projects",
  desc: "Read public feedback from customers who hired Wil & Co. Painting for painting, repairs, staining, and related services.",
  button_label: "Read More Reviews",
  button_href: mapquest,
  fallback_name: "Verified Customer",
};

export const TrustedDirectoriesCopy = {
  eyebrow: "Business Profiles & Feedback",
  title: "Verified Company Information",
  desc: "Explore public business information, accreditation, and indexed customer feedback for Wil & Co. Painting.",
  cards: [
    {
      icon: "fa-award",
      subtitle: "BBB",
      title: "BBB Accredited Business",
      text: "Wil & Co. Painting is listed as BBB Accredited with an A+ rating.",
      url: bbb,
      tags: ["A+ Rating", "Accredited"],
    },
    {
      icon: "fa-star",
      subtitle: "Customer Feedback",
      title: "Public Reviews",
      text: "View publicly indexed customer feedback and project experiences.",
      url: mapquest,
      tags: ["5.0 Rating", "7 Reviews"],
    },
    {
      icon: "fa-camera",
      subtitle: "Portfolio",
      title: "Project Photos",
      text: "Explore residential and commercial painting, siding, deck, and exterior projects on the official website.",
      url: `${BaseURL}portfolio`,
      tags: ["Recent Work", "Project Gallery"],
    },
    {
      icon: "fa-globe",
      subtitle: "Official Website",
      title: "Service Information",
      text: "Review current service descriptions and contact the company through its official website.",
      url: BaseURL,
      tags: ["Official Site", "Madison WI"],
    },
  ],
};

export const ReviewsPageCopy = {
  hero_title: "Customer Reviews",
  hero_subtitle:
    "See publicly indexed feedback from Madison-area customers who worked with Wil & Co. Painting.",
  hero_image: "assets/img/hero/painting-hero-2.jpg",
  list_eyebrow: "Reviews",
  list_title: "What Customers Say",
  list_desc:
    "Feedback related to painting, drywall repair, deck staining, detail, communication, pricing, and scheduling.",
  list_cta: "Leave a Review",
};

export const ReviewFormCopy = {
  title: "Share Your Experience",
  subtitle:
    "Tell Wil & Co. Painting about the service, communication, workmanship, and final result.",
  success_title: "Thank You!",
  success_message: "Your review has been submitted successfully.",
  error_title: "Error!",
  captcha_error: "Incorrect security code. Please try again.",
  labels: {
    name: "Your Name",
    city: "City / Location",
    rating: "Rating",
    rating_hint: "(Select stars)",
    review: "Your Review",
    security: "Security Check",
    refresh: "Refresh",
    captcha: "Enter the code shown above",
  },
  captcha_alt: "Captcha image",
  placeholders: {
    name: "",
    city: "e.g. Madison, WI",
    review: "Tell us about your project and experience...",
  },
  submit: "Submit Review",
};

export const GalleryHeroCopy = {
  eyebrow: "Our Portfolio",
  title: "Wil & Co. Painting Projects",
  desc: `Explore residential and commercial painting, siding, deck staining, drywall, and exterior work completed by ${Company}.`,
  cta_text: "Call Now",
  cta_href: PhoneRef,
};

export const ProjectsIntroCopy = {
  label: "Our Work",
  title_line1: "Spaces",
  title_line2: "Transformed with Care.",
  outline_line1: "Prepared and",
  outline_line2: "Finished to Last.",
  desc: `At ${Company}, every project is approached with careful preparation, skilled application, respect for the property, and attention to the final details.`,
  stats: [
    { value: `${ExperienceYears}+`, label: "Years in Business" },
    { value: `${ServicesDisplayList.length}`, label: "Core Services" },
    { value: `${Areas.length}`, label: "Coverage Groups" },
  ],
};

export const ProjectsBeforeAfterCopy = {
  eyebrow: "Transformation",
  title: "Before & After",
  desc: "See how preparation, repair, paint, and stain can renew and protect a surface.",
  before_label: "Before",
  after_label: "After",
};

export const ProjectsStatsCopy = {
  items: [
    {
      icon: "fa-hourglass-half",
      value: `${ExperienceYears}+`,
      label: "Years in Business",
    },
    {
      icon: "fa-paint-roller",
      value: `${ServicesDisplayList.length}`,
      label: "Core Services",
    },
    {
      icon: "fa-map-location-dot",
      value: `${Areas.length}`,
      label: "Coverage Groups",
    },
    {
      icon: "fa-award",
      value: "A+",
      label: "BBB Rating",
    },
  ],
};

export const ProjectsGalleryCopy = {
  eyebrow: "Project Gallery",
  title: "Selected Work &",
  title_strong: "Recent Transformations",
  videos_label: "Videos",
  empty: "Projects coming soon.",
  image_title: "Project Photo",
  video_title: "Project Video",
};

export const ServiceHeroCopy = {
  badge: "Professional Painting & Surface Service",
  cta_primary: "Call Now",
  cta_secondary: "Explore Service",
};

export const ServiceIntroCopy = {
  eyebrow: "Our Method",
  title: "How We Deliver",
  title_strong: "Professional Results",
  desc: "The process keeps the scope clear and puts preparation, communication, workmanship, and final detail at the center of the project.",
  steps: [
    {
      icon: "fa-comments",
      title: "Discuss",
      text: "Confirm the property, requested service, surfaces, goals, and timeline.",
    },
    {
      icon: "fa-clipboard-list",
      title: "Plan",
      text: "Review preparation, materials, access, scheduling, and the complete scope.",
    },
    {
      icon: "fa-tools",
      title: "Complete",
      text: "Perform the service carefully and review final details with the customer.",
    },
  ],
};

export const ServiceDetailsCopy = {
  badge_title: "Wil & Co. Standard",
  badge_subtitle: "Quality, Integrity, and Craftsmanship",
  title_prefix: "Professional",
  button: "Call Now",
};

export const ServiceFaqCopy = {
  eyebrow: "Common Questions",
  title: "Information About Our",
  title_strong: "Painting & Surface Services",
  items: [
    {
      icon: "fa-hourglass-half",
      question: "How soon can the project start?",
      answer:
        "Scheduling depends on the service, project size, preparation needs, location, and current availability. Call with your details for a current timeframe.",
    },
    {
      icon: "fa-house",
      question: "Do you work on homes and businesses?",
      answer:
        "Yes. Wil & Co. Painting provides residential and commercial services.",
    },
    {
      icon: "fa-paint-roller",
      question: "Do you provide services beyond painting?",
      answer:
        "Yes. The company also provides pressure washing, deck and cabinet staining, drywall installation and repair, and wallpaper installation.",
    },
    {
      icon: "fa-map",
      question: "What areas do you serve?",
      answer: Coverage,
    },
  ],
  footer: "Have a different question? Contact the team directly.",
};

export const ServiceCtaCopy = {
  tag: "Ready to Start?",
  title: "Let's Transform",
  title_strong: "Your Space",
  paragraph:
    "Call for %s in Madison, Fitchburg, Dane County, and surrounding Wisconsin communities.",
  subject_fallback: "painting or surface service",
  features: ["Residential & Commercial", "Local Team", LicenseNumber],
  primary: "Call Now",
  secondary_prefix: "Call",
};

export const OtherServicesCopy = {
  label: "Complete Surface Care",
  title: "More Ways We Can Help",
  title_strong: "Improve Your Property",
  item_note:
    "Professional painting and surface solutions for homes and businesses.",
  cta_title: "Have a specific project?",
  cta_text:
    "From painting and drywall to staining, cleaning, and wallpaper, call and describe what the property needs.",
  cta_button: Estimates,
  page_desc:
    "Professional painting, drywall, staining, pressure washing, and wallpaper services tailored to residential and commercial properties.",
};

export const FounderCopy = {
  title: "A Note from",
  title_strong: "The Owner",
  quote: `At ${Company}, we believe every project should be handled with honest communication, careful preparation, skilled craftsmanship, and respect for the customer's space. Our goal is to make each home or business feel renewed through work people can trust.`,
  role: "Owner & Founder",
  name: OwnerName,
  image_alt: "Wil Barahona, owner of Wil & Co. Painting",
};

export const AriaCopy = {
  call: "Click to call",
  primary_nav: "Primary navigation",
  whatsapp: "WhatsApp",
  messenger: "Messenger",
  facebook: "Facebook",
  instagram: "Instagram",
  google: "Google Maps",
  tiktok: "TikTok",
  email: "Email",
};

export const TestimonialsPageCopy = {
  eyebrow: NavCopy.reviews,
  title: "What Customers Say",
  desc: "Publicly indexed feedback from painting, drywall, staining, and home-improvement projects in the Madison area.",
  card_title: "Read Public Reviews",
  card_desc: "See customer feedback indexed from public review platforms.",
  card_button: NavCopy.read_reviews,
  card_link: mapquest,
};

export const ThankYouCopy = {
  title: "Thank You",
  description: `Thank you for contacting ${Company}. The team will be in touch as soon as possible.`,
  eyebrow: "Thank You",
  headline: "We Received Your Request",
  body: `Thank you for contacting ${Company}. The team will review your painting or surface-service request and follow up using the contact information you provided.`,
  cta_call: "Click to Call",
  cta_home: "Back to Home",
};

export const LabelsCopy = {
  service_areas: "Service Areas",
  call: "Call",
  email: "Email",
};

/* =========================
   BRAND CSS VARIABLES
   ========================= */
export const BrandCSSVars = `
:root {
  --brand-primary: ${BrandColors.primary};
  --brand-secondary: ${BrandColors.secondary};
  --brand-white: ${BrandColors.white};
  --brand-accent: ${BrandColors.accent};
  --brand-neutral: ${BrandColors.neutral};
  --brand-primary-rgb: ${BrandColors.primary_rgb};
  --brand-secondary-rgb: ${BrandColors.secondary_rgb};
  --brand-accent-rgb: ${BrandColors.accent_rgb};

  --site-surface: #ffffff;
  --site-surface-soft: color-mix(in srgb, var(--brand-neutral) 82%, #fff 18%);
  --site-ink: var(--brand-secondary);
  --site-ink-soft: rgba(var(--brand-secondary-rgb), 0.76);
  --site-panel: #ffffff;
  --site-panel-soft: rgba(255, 255, 255, 0.78);
  --site-line: rgba(var(--brand-secondary-rgb), 0.14);
  --site-dark: #0d1210;
  --site-dark-2: #17201d;
  --site-dark-3: #24302c;
  --site-dark-line: rgba(var(--brand-accent-rgb), 0.28);
  --site-dark-text: #ffffff;
  --site-dark-muted: rgba(255, 255, 255, 0.72);
  --site-accent-soft: rgba(var(--brand-accent-rgb), 0.16);
}

body {
  background:
    radial-gradient(circle at 10% 8%, rgba(var(--brand-accent-rgb), 0.12), transparent 28%),
    linear-gradient(180deg, var(--brand-neutral) 0%, #ffffff 100%);
}

#hero-4.hero4 {
  background: linear-gradient(130deg, #090d0b 0%, var(--brand-secondary) 58%, var(--brand-primary) 100%) !important;
}

#hero-4 .hero4__slides::after {
  background: linear-gradient(to bottom, rgba(9, 13, 11, 0.76) 0%, rgba(9, 13, 11, 0.46) 42%, rgba(9, 13, 11, 0.9) 100%) !important;
}

#hero-4 .hero4__content {
  background: linear-gradient(145deg, rgba(9, 13, 11, 0.92), rgba(var(--brand-secondary-rgb), 0.8)) !important;
  border: 1px solid rgba(var(--brand-accent-rgb), 0.52) !important;
}

#hero-4 .hero4__content::before {
  background: radial-gradient(120% 140% at 0% 0%, rgba(var(--brand-accent-rgb), 0.2), transparent 62%) !important;
}

#hero-4 .hero4__btn--primary,
.section-about-arch .btn-arch,
.section-remodel-why .btn-gold,
.cta-premium-section .btn-cta-primary,
.section-contact-premium .btn-submit-arch {
  background: var(--brand-accent) !important;
  color: #17120b !important;
  border-color: var(--brand-accent) !important;
}

#hero-4 .hero4__btn--ghost,
#hero-4 .hero4__thumb.active,
#hero-4 .hero4__arrow:hover {
  border-color: var(--brand-accent) !important;
}

.section-about-arch,
.section-services-premium,
.section-maint-pro,
.mission-vision-section,
.faq-section {
  background: linear-gradient(180deg, #ffffff 0%, var(--brand-neutral) 100%) !important;
}

.section-remodel-why,
.section-process,
.section-areas,
.cta-premium-section,
.section-contact-premium,
.section-map-contact {
  background: linear-gradient(135deg, #0b100e 0%, var(--brand-secondary) 100%) !important;
}

.section-about-arch .arch-eyebrow,
.section-services-premium .sv-eyebrow,
.section-maint-pro .tagline,
.section-remodel-why .sub-badge,
.section-process .step-icon,
.section-areas .license-pill,
.section-areas .city-icon,
.cta-premium-section .cta-badge,
.section-contact-premium .ct-eyebrow,
.section-map-contact .info-icon,
.section-remodel-why .why-header h2 strong,
.section-process .process-header h2 span,
.section-areas .areas-content h2 strong,
.cta-premium-section .cta-content h2 strong,
.section-map-contact .contact-card h3 span {
  color: var(--brand-accent) !important;
  border-color: rgba(var(--brand-accent-rgb), 0.6) !important;
}

.section-about-arch .arch-eyebrow::before,
.section-services-premium .sv-eyebrow::before,
.section-services-premium .sv-eyebrow::after,
.section-contact-premium .ct-eyebrow::before {
  background: var(--brand-accent) !important;
}

.section-about-arch .content-arch h2 strong,
.section-services-premium .sv-header h2 strong,
.section-maint-pro .pro-header h2 strong {
  color: var(--brand-primary) !important;
}

.section-services-premium .sv-card,
.section-maint-pro .maint-card-dark,
.section-remodel-why .feature-card,
.section-process .process-step,
.section-areas .map-frame-wrapper,
.section-contact-premium .ct-form-wrapper,
.cta-premium-section .contact-glass-card,
.section-map-contact .contact-card {
  border-radius: 18px !important;
}

.section-services-premium .sv-card:hover,
.section-maint-pro .maint-card-dark:hover,
.section-remodel-why .feature-card:hover,
.section-process .process-step:hover {
  box-shadow: 0 22px 48px rgba(9, 13, 11, 0.28) !important;
}

.section-about-arch .btn-arch,
.section-remodel-why .btn-gold,
.section-areas .btn-area,
.cta-premium-section .btn-cta-primary,
.section-contact-premium .btn-submit-arch,
.section-services-premium .btn-sv-accent {
  border-radius: 999px !important;
}

.section-about-arch .btn-arch:hover,
.section-remodel-why .btn-gold:hover,
.cta-premium-section .btn-cta-primary:hover,
.section-contact-premium .btn-submit-arch:hover {
  background: color-mix(in srgb, var(--brand-accent) 84%, #fff 16%) !important;
  color: #17120b !important;
}

.section-areas .btn-area {
  border-color: var(--brand-accent) !important;
  color: var(--brand-accent) !important;
}

.section-areas .btn-area:hover {
  background: var(--brand-accent) !important;
  color: #17120b !important;
}

.section-contact-premium .form-control-arch:focus {
  border-bottom-color: var(--brand-accent) !important;
}

.section-map-contact .map-background iframe {
  filter: grayscale(55%) contrast(0.92) !important;
}

.language-switcher {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px;
  border-radius: 999px;
  background: var(--brand-secondary);
  border: 1px solid rgba(var(--brand-accent-rgb), 0.45);
}

.language-switcher button {
  border: 0;
  border-radius: 999px;
  padding: 8px 10px;
  background: transparent;
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.04em;
  cursor: pointer;
}

.language-switcher button.active,
.language-switcher button:hover {
  background: var(--brand-accent);
  color: #17120b;
}

.goog-te-banner-frame,
.skiptranslate iframe {
  display: none !important;
}

body {
  top: 0 !important;
}

#google_translate_element {
  width: 0;
  height: 0;
  overflow: hidden;
  position: absolute;
  pointer-events: none;
}
`;

/* =========================
   DEFAULT EXPORT
   ========================= */
const siteText = {
  Company,
  LegalCompany,
  CustomerName,
  OwnerName,
  BaseURL,
  Domain,
  MAVEN,
  Address,
  PublicBusinessAddress,
  PhoneName,
  Phone2Name,
  Phone,
  Phone2,
  PhoneRef,
  PhoneRef2,
  whatsapp,
  Mail,
  MailRef,
  Services,
  Estimates,
  Payment,
  Experience,
  Schedule,
  Coverage,
  LicenseNote,
  LicenseNumber,
  BilingualNote,
  TypeOfService,
  VerificationNotes,
  BrandColors,
  Areas,
  GoogleMap,
  facebook,
  instagram,
  google,
  tiktok,
  messenger,
  yelp,
  bbb,
  mapquest,
  DirectoryLinks,
  GoogleReviews,
  DirectoryReviewItems,
  GoogleReviewItems,
  ReviewSourceSummaries,
  DetailedReviewItems,
  Phrase,
  Home,
  About,
  Mission,
  Vision,
  SN,
  SD,
  ExSD,
  OtherServices,
  ServicesByCategory,
  Badges,
  ExAbout,
  ExHome,
  ServicesList,
  OtherServicesLandingSlugs,
  PrimaryServiceSlugs,
  AllowedServiceSlugs,
  ServicesDisplayList,
  ServiceDetails,
  WhyChoose,
  PaymentMethods,
  ExperienceYears,
  NavCopy,
  LanguageCopy,
  HeaderCopy,
  FooterCopy,
  PageHeroCopy,
  HomeHeroCopy,
  HomeAboutCopy,
  AboutHeroCopy,
  AboutStoryCopy,
  AboutCredentialsCopy,
  AboutServicesSummaryCopy,
  ServicesListCopy,
  BrandsCopy,
  HomeServicesCopy,
  HomeMaintenanceCopy,
  WhyCopy,
  MissionCopy,
  ProcessCopy,
  FaqCopy,
  AreasCopy,
  CtaCopy,
  ContactFormCopy,
  MapCopy,
  TestimonialsCopy,
  TrustedDirectoriesCopy,
  ReviewsPageCopy,
  ReviewFormCopy,
  GalleryHeroCopy,
  ProjectsIntroCopy,
  ProjectsBeforeAfterCopy,
  ProjectsStatsCopy,
  ProjectsGalleryCopy,
  ServiceHeroCopy,
  ServiceIntroCopy,
  ServiceDetailsCopy,
  ServiceFaqCopy,
  ServiceCtaCopy,
  OtherServicesCopy,
  FounderCopy,
  AriaCopy,
  TestimonialsPageCopy,
  ThankYouCopy,
  LabelsCopy,
  BrandCSSVars,
};

export default siteText;

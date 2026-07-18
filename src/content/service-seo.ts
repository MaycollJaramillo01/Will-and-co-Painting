import type { ServiceSlug } from "@/content/en";

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceSeoContent = {
  title: string;
  description: string;
  localHeading: string;
  localDescription: string;
  planningNote: string;
  faqs: readonly ServiceFaq[];
};

export const serviceSeo: Record<ServiceSlug, ServiceSeoContent> = {
  "residential-interior-painting": {
    title: "Residential Interior Painting in Madison, WI",
    description:
      "Residential interior painting for walls, ceilings, trim, and doors in Madison, WI. Request a project-specific quote from Wil & Co. Painting.",
    localHeading: "Interior painting shaped around your Madison home",
    localDescription:
      "Every interior has its own light, layout, and lived-in details. We define the work around the rooms and surfaces you want to update, from walls and ceilings to the trim and doors that complete the space.",
    planningNote:
      "Tell us which rooms are involved, which surfaces need attention, and what you would like to change. Those details give the estimate request a clear starting point.",
    faqs: [
      {
        question: "Which interior surfaces can be included?",
        answer:
          "A residential interior painting scope can include walls, ceilings, trim, and doors. The exact surfaces are confirmed for each property before work is scheduled.",
      },
      {
        question: "Do I need to select colors before requesting a quote?",
        answer:
          "No. You can begin by sharing the rooms, current condition, and the kind of change you want, even if final colors have not been selected.",
      },
      {
        question: "Is interior painting available in the Madison area?",
        answer:
          "Wil & Co. Painting serves Madison, Wisconsin and surrounding areas. Submit the property location with your request so service availability can be confirmed.",
      },
    ],
  },
  "residential-exterior-painting": {
    title: "Residential Exterior Painting in Madison, WI",
    description:
      "Residential exterior painting for siding, trim, and home details in Madison, WI. Ask Wil & Co. Painting for a quote tailored to your property.",
    localHeading: "Exterior painting for Madison-area homes",
    localDescription:
      "An exterior project starts with the building, its materials, and the condition of the surfaces in view. We shape the painting scope around siding, trim, and architectural details for a cohesive finished appearance.",
    planningNote:
      "When requesting an estimate, include the property type, exterior surfaces, and any visible areas of concern. An on-site review may be needed to define the scope accurately.",
    faqs: [
      {
        question: "What parts of a home exterior can be painted?",
        answer:
          "Typical project scopes can include siding, trim, and exterior accents. The materials and condition of each surface determine what should be included.",
      },
      {
        question: "Why does surface condition matter for exterior painting?",
        answer:
          "Coverage and preparation needs vary with the existing surface. Reviewing that condition helps create a more accurate, property-specific scope.",
      },
      {
        question: "Where is residential exterior painting available?",
        answer:
          "Service is available in Madison, WI and surrounding areas. Include the project location when you request a quote so availability can be confirmed.",
      },
    ],
  },
  "commercial-interior-painting": {
    title: "Commercial Interior Painting in Madison, WI",
    description:
      "Commercial interior painting for workplaces, common areas, and business spaces in Madison, WI. Request a clear, property-specific quote.",
    localHeading: "Interior painting for Madison commercial spaces",
    localDescription:
      "Commercial interiors have to support customers, teams, and day-to-day operations. We define the scope around the property, the surfaces involved, and the kind of environment the completed space needs to present.",
    planningNote:
      "Share the property type, approximate areas involved, and any access or scheduling considerations. This helps frame the conversation around the way the space is actually used.",
    faqs: [
      {
        question: "What commercial interiors can be considered?",
        answer:
          "Project requests may involve workplaces, hospitality spaces, common areas, and other commercial interiors. Each scope is reviewed individually.",
      },
      {
        question: "Can common areas be included in the painting scope?",
        answer:
          "Yes. Walls, ceilings, and common areas can be discussed as part of a commercial interior request, depending on the property and its needs.",
      },
      {
        question: "How do I request a commercial interior estimate?",
        answer:
          "Send the Madison-area property location, the spaces involved, and the best way to follow up. Wil & Co. Painting will use those details to discuss the next step.",
      },
    ],
  },
  "commercial-exterior-painting": {
    title: "Commercial Exterior Painting in Madison, WI",
    description:
      "Commercial exterior painting for buildings, siding, and trim in Madison, WI. Contact Wil & Co. Painting for a site-specific project quote.",
    localHeading: "Commercial exteriors that present a consistent finish",
    localDescription:
      "A commercial building exterior is part of how the property presents itself every day. We build the scope around the building, its exterior materials, and the surfaces that need a cleaner, more consistent appearance.",
    planningNote:
      "Provide the property location, building type, exterior surfaces, and any known access considerations. These details help determine what the project review needs to cover.",
    faqs: [
      {
        question: "Which commercial exterior surfaces can be included?",
        answer:
          "A project may include building exteriors, siding, trim, and other exterior details. The final scope depends on the property's materials and condition.",
      },
      {
        question: "Is an exterior site review necessary?",
        answer:
          "A site review may be needed to understand access, surface condition, and the size of the painting scope before an estimate is finalized.",
      },
      {
        question: "Do you serve commercial properties in Madison?",
        answer:
          "Wil & Co. Painting accepts commercial exterior requests in Madison, Wisconsin and surrounding areas, subject to project and location review.",
      },
    ],
  },
  "pressure-washing": {
    title: "Pressure Washing in Madison, WI",
    description:
      "Pressure washing for appropriate siding, decks, driveways, and exterior surfaces in Madison, WI. Request an estimate for your property.",
    localHeading: "Exterior surface cleaning for Madison properties",
    localDescription:
      "Outdoor surfaces collect visible dirt and buildup through regular exposure. Pressure washing can clean appropriate siding, decks, driveways, and other exterior areas, either as a stand-alone request or before additional exterior work.",
    planningNote:
      "The surface material and its present condition matter. Include photos and a short description with your request so the areas can be reviewed before the cleaning approach is discussed.",
    faqs: [
      {
        question: "Which surfaces may be pressure washed?",
        answer:
          "Appropriate siding, decks, driveways, and other exterior surfaces may be considered. Surface material and condition must be reviewed first.",
      },
      {
        question: "Can pressure washing be part of paint preparation?",
        answer:
          "It can be one part of preparing appropriate exterior surfaces for additional work. The overall preparation scope depends on the property.",
      },
      {
        question: "How can I request pressure washing in Madison?",
        answer:
          "Send the property location, surfaces involved, and photos if available. Wil & Co. Painting will confirm whether the request is within the service area and scope.",
      },
    ],
  },
  "deck-staining": {
    title: "Deck Staining in Madison, WI",
    description:
      "Deck staining for boards, railings, and wood details in Madison, WI. Request a property-specific estimate from Wil & Co. Painting.",
    localHeading: "Deck staining for Madison-area outdoor spaces",
    localDescription:
      "A deck is both a working surface and a visible part of the home. We define staining projects around the boards, railings, wood details, and present condition of the outdoor space.",
    planningNote:
      "Share the approximate deck size, the areas you want stained, and photos of the current wood if possible. Existing coatings and surface condition help shape the project scope.",
    faqs: [
      {
        question: "What parts of a deck can be included?",
        answer:
          "Deck boards, railings, and other wood details can be considered. The final scope is based on the deck design and current condition.",
      },
      {
        question: "Does the existing finish affect the project?",
        answer:
          "Yes. Existing coatings and the condition of the wood can affect the preparation and staining scope, so they should be reviewed before quoting.",
      },
      {
        question: "Is deck staining available around Madison?",
        answer:
          "Wil & Co. Painting serves Madison, WI and surrounding areas. Include the property location and deck details in your estimate request.",
      },
    ],
  },
  "cabinet-staining": {
    title: "Cabinet Staining in Madison, WI",
    description:
      "Cabinet staining for wood cabinetry and visible grain in Madison, WI. Contact Wil & Co. Painting for a project-specific estimate.",
    localHeading: "Cabinet staining that keeps the wood character visible",
    localDescription:
      "Stain changes the tone of cabinetry while allowing the grain to remain part of the finished look. We review the existing wood surfaces and the desired direction before defining the cabinet staining scope.",
    planningNote:
      "Photos of the cabinets, their current finish, and the tone you want are useful starting points. The existing material must be evaluated before the project can be scoped.",
    faqs: [
      {
        question: "What cabinetry can be considered for staining?",
        answer:
          "Kitchen cabinets and other suitable wood cabinetry may be considered. The material and existing finish need to be evaluated first.",
      },
      {
        question: "Will the wood grain remain visible?",
        answer:
          "Staining is intended to work with visible wood character, but the result depends on the wood species, current finish, and selected stain direction.",
      },
      {
        question: "What should I include with a cabinet staining request?",
        answer:
          "Include the Madison-area property location, cabinet photos, current condition, and the look you want to achieve so the request can be reviewed.",
      },
    ],
  },
  "drywall-installation": {
    title: "Drywall Installation in Madison, WI",
    description:
      "Drywall installation for walls, ceilings, and replacement sections in Madison, WI. Request a residential or commercial project quote.",
    localHeading: "Drywall installation for Madison-area projects",
    localDescription:
      "New and replacement drywall creates the base for a finished room. Installation requests can involve walls, ceilings, and defined sections within residential or commercial improvement projects.",
    planningNote:
      "Describe whether the project involves a new area or replacement section, and include dimensions or photos when available. The surrounding conditions help determine the installation scope.",
    faqs: [
      {
        question: "Can drywall be installed on walls and ceilings?",
        answer:
          "Yes. Project scopes may include walls, ceilings, and new or replacement sections, depending on the room and surrounding structure.",
      },
      {
        question: "Is drywall installation available for commercial projects?",
        answer:
          "Wil & Co. Painting considers both residential and commercial drywall installation requests in the Madison service area.",
      },
      {
        question: "What details help with a drywall installation estimate?",
        answer:
          "Share the property location, the areas involved, approximate dimensions, and photos when possible. Those details help identify the next review step.",
      },
    ],
  },
  "drywall-finishing": {
    title: "Drywall Finishing in Madison, WI",
    description:
      "Drywall finishing for seams, corners, walls, and ceilings in Madison, WI. Request a quote for a paint-ready surface scope.",
    localHeading: "Drywall finishing that prepares the complete surface",
    localDescription:
      "Finishing brings separate drywall panels together into a continuous surface. The scope can include seams, corners, and related finish work on walls or ceilings before the next stage of the room.",
    planningNote:
      "Let us know whether the drywall is newly installed, partially finished, or connected to a larger repair. Photos help clarify the current stage and visible areas involved.",
    faqs: [
      {
        question: "What is included in drywall finishing?",
        answer:
          "A drywall finishing scope may address seams, corners, and the surface preparation needed before painting. Exact needs depend on the installed drywall.",
      },
      {
        question: "Can finishing be requested for ceilings?",
        answer:
          "Yes. Both wall and ceiling areas can be considered as part of a drywall finishing request.",
      },
      {
        question: "How do I request drywall finishing in Madison?",
        answer:
          "Submit the property location, a description of the current drywall stage, and photos if available. Wil & Co. Painting will review the request and follow up.",
      },
    ],
  },
  "drywall-repair": {
    title: "Drywall Repair in Madison, WI",
    description:
      "Drywall repair for holes, cracks, damaged wall sections, and ceilings in Madison, WI. Request an estimate for the affected area.",
    localHeading: "Targeted drywall repair for Madison properties",
    localDescription:
      "A damaged area does not always require replacing the entire wall or ceiling. We define repair work around the affected section and the surface that needs to be restored for a more complete finish.",
    planningNote:
      "Photos, approximate dimensions, and the location of the damage help identify the likely repair scope. Any active source of moisture or ongoing damage should be addressed separately before cosmetic repair.",
    faqs: [
      {
        question: "What drywall damage can be reviewed?",
        answer:
          "Holes, cracks, damaged sections, and ceiling areas can be reviewed. The cause and extent of the damage determine the appropriate scope.",
      },
      {
        question: "Does the entire wall need to be replaced?",
        answer:
          "Not in every case. Some damage can be handled as a targeted repair, but the affected area must be assessed before that decision is made.",
      },
      {
        question: "What should I send with a repair request?",
        answer:
          "Include the Madison-area property location, clear photos, approximate damage size, and any known context about what caused it.",
      },
    ],
  },
  "wallpaper-installation": {
    title: "Wallpaper Installation in Madison, WI",
    description:
      "Wallpaper installation for feature walls, full rooms, and commercial interiors in Madison, WI. Request a project-specific quote.",
    localHeading: "Wallpaper installation with attention to alignment",
    localDescription:
      "Wallpaper introduces pattern, scale, and texture that changes how a room reads. We define installation projects around the wall surfaces, the selected covering, and the visible alignment required by the design.",
    planningNote:
      "Share wall dimensions, photos, and product details for the wallpaper if already selected. Pattern repeat, surface condition, and the number of walls help frame the installation request.",
    faqs: [
      {
        question: "Can wallpaper be installed on a feature wall?",
        answer:
          "Yes. Feature walls, full rooms, and commercial wallcovering requests can be considered, depending on the surface and selected material.",
      },
      {
        question:
          "Do I need to choose the wallpaper before requesting a quote?",
        answer:
          "You may begin the conversation earlier, but product details, dimensions, and pattern information are helpful for defining an accurate installation scope.",
      },
      {
        question: "Is wallpaper installation available in Madison?",
        answer:
          "Wil & Co. Painting serves Madison, Wisconsin and surrounding areas. Include the location, wall photos, and project details with your request.",
      },
    ],
  },
};

export function getServiceSeo(slug: ServiceSlug) {
  return serviceSeo[slug];
}

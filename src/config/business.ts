export type OpeningHoursEntry = {
  days: readonly string[];
  opens: string;
  closes: string;
  display: string;
};

export const business = {
  businessName: "Wil & Co. Painting",
  legalName: "", // TODO: Confirm the registered legal business name.
  ownerName: "Wil Barahona",
  phone: "", // TODO: Confirm the public business phone number.
  displayPhone: "", // TODO: Confirm the formatted public phone number.
  email: "", // TODO: Confirm the public business email address.
  streetAddress: "", // Service Area Business: do not add a private home address.
  city: "Madison",
  state: "WI",
  postalCode: "", // TODO: Add only if a public business ZIP code is confirmed.
  country: "US",
  latitude: "", // TODO: Confirm coordinates before adding LocalBusiness geo data.
  longitude: "", // TODO: Confirm coordinates before adding LocalBusiness geo data.
  serviceAreas: ["Madison, WI"] as const,
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
      display: "Monday-Friday, 7:00 AM-6:00 PM",
    },
  ] as const satisfies readonly OpeningHoursEntry[],
  googleBusinessProfileUrl: "", // TODO: Confirm the Google Business Profile URL.
  googleMapsUrl: "", // TODO: Confirm the Google Maps URL.
  googleReviewUrl: "", // TODO: Confirm the direct Google review URL.
  facebookUrl: "", // TODO: Confirm the official Facebook URL.
  instagramUrl: "", // TODO: Confirm the official Instagram URL.
  youtubeUrl: "", // TODO: Confirm the official YouTube URL.
  whatsappNumber: "16083326263", // Business phone listed by BBB; confirm it remains WhatsApp-enabled.
  whatsappMessage:
    "Hi Wil & Co. Painting, I would like to request a painting estimate.",
  licenseNumber: "", // TODO: Add only if a relevant license is confirmed.
  insuranceText: "", // TODO: Add only after insurance language is confirmed.
  yearsOfExperience: "", // TODO: Confirm before publishing any experience claim.
} as const;

export const siteUrl = "https://www.wilandcopainting.com";

export const hasPublicPhone = Boolean(business.phone && business.displayPhone);
export const hasPublicEmail = Boolean(business.email);

import { z } from "zod";
import { contactConsentVersion } from "./contact-consent.ts";

export const contactSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Enter your name.")
      .max(80, "Keep your name under 80 characters."),
    email: z.string().trim().email("Enter a valid email address."),
    phone: z
      .string()
      .trim()
      .max(30, "Keep the phone number under 30 characters."),
    service: z.string().trim().min(1, "Choose a service."),
    propertyType: z.enum(["Residential", "Commercial", "Not sure"]),
    message: z
      .string()
      .trim()
      .min(10, "Tell us a little more about the project.")
      .max(2000, "Keep the project details under 2,000 characters."),
    consent: z.boolean().refine((value) => value, {
      message:
        "Accept the Terms & Conditions and acknowledge the Privacy Policy to submit your request.",
    }),
    smsConsent: z.boolean().optional(),
    aiCallConsent: z.boolean().optional(),
    consentVersion: z.literal(contactConsentVersion).optional(),
    // Honeypot. Not rejected here: a validation error on a hidden field would
    // leave the button dead with no visible message. The server checks it instead.
    website: z.string().optional(),
  })
  .superRefine((data, context) => {
    if ((data.smsConsent || data.aiCallConsent) && !data.consentVersion) {
      context.addIssue({
        code: "custom",
        path: ["consent"],
        message:
          "Reload the form to review the current communication consent options.",
      });
    }
    if (
      (data.smsConsent || data.aiCallConsent) &&
      !/^1?\d{10}$/.test(data.phone.replace(/\D/g, ""))
    ) {
      context.addIssue({
        code: "custom",
        path: ["phone"],
        message:
          "Enter a valid US phone number for the communications you selected.",
      });
    }
  });

export type ContactFormData = z.infer<typeof contactSchema>;

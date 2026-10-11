import { z } from "zod";

export const contactSchema = z.object({
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
    message: "Confirm that we may contact you about this request.",
  }),
  // Honeypot. Not rejected here: a validation error on a hidden field would
  // leave the button dead with no visible message. The form checks it instead.
  website: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

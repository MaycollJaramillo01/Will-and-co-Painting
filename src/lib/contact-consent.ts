import { business } from "../config/business.ts";

export const contactConsentVersion = "2026-11-04";

export const smsConsentText = `I agree to receive automated SMS/text messages from ${business.businessName} at the number I provide about my quote request, scheduling, appointment reminders, and related service updates. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is optional and is not a condition of requesting a quote or purchasing services.`;

export const aiCallConsentText = `I agree to receive calls from ${business.businessName} at the number I provide about my quote request, scheduling, and related services, including calls made using an automatic telephone dialing system or an artificial, prerecorded, or AI-generated voice. Consent is optional and is not a condition of requesting a quote or purchasing services. I may withdraw consent at any time by asking the caller or contacting the business.`;

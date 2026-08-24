import { Phone } from "lucide-react";
import { business, hasPublicPhone } from "@/config/business";

export function CallBubble() {
  if (!hasPublicPhone) return null;

  // Sits stacked above the WhatsApp bubble. The tel: href is what the Google
  // Ads tag listens for, so every tap here also fires a call conversion.
  return (
    <a
      href={`tel:${business.phone}`}
      className="group fixed right-4 bottom-[5.25rem] z-50 flex items-center gap-2 sm:right-6 sm:bottom-[5.75rem]"
      aria-label={`Call Wil & Co. Painting at ${business.displayPhone}`}
    >
      <span className="hidden rounded-full bg-white px-4 py-2 text-sm font-bold text-[#10263d] shadow-lg transition-transform group-hover:-translate-x-1 sm:block">
        Call now
      </span>
      <span className="flex size-14 items-center justify-center rounded-full bg-[#b84d14] text-white shadow-[0_12px_35px_rgb(0_0_0/0.24)] transition-transform group-hover:scale-105">
        <Phone aria-hidden="true" size={26} strokeWidth={2.2} />
      </span>
    </a>
  );
}

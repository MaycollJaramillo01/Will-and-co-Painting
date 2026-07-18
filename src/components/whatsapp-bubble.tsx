import { MessageCircleMore } from "lucide-react";
import { business } from "@/config/business";

export function WhatsAppBubble() {
  if (!business.whatsappNumber) return null;

  const href = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(business.whatsappMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group fixed right-4 bottom-4 z-50 flex items-center gap-2 sm:right-6 sm:bottom-6"
      aria-label="Chat with Wil & Co. Painting on WhatsApp"
    >
      <span className="hidden rounded-full bg-white px-4 py-2 text-sm font-bold text-[#10263d] shadow-lg transition-transform group-hover:-translate-x-1 sm:block">
        Chat with us
      </span>
      <span className="flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_12px_35px_rgb(0_0_0/0.24)] transition-transform group-hover:scale-105">
        <MessageCircleMore aria-hidden="true" size={27} strokeWidth={2.2} />
      </span>
    </a>
  );
}

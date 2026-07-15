import { FaWhatsapp } from "react-icons/fa";

import { contactItems } from "@/data/contact";

const whatsappContact = contactItems.find((item) => item.label === "Phone");
const whatsappNumber = whatsappContact?.value.replace(/\D/g, "") ?? "33123456789";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Reactif on WhatsApp"
      data-print-hidden="true"
      className="fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full bg-[#5fd34c] px-4 py-3 text-sm font-bold text-black shadow-[0_12px_32px_rgba(95,211,76,0.35)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#6ee35d] focus-visible:ring-2 focus-visible:ring-[#5fd34c] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none sm:right-6 sm:bottom-6 sm:px-5 sm:text-base"
    >
      <FaWhatsapp className="size-6" aria-hidden="true" />
      <span>Chat on WhatsApp</span>
    </a>
  );
}

import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";

export default function FloatingWidgets() {
  return (
    <div className="fixed right-4 md:right-6 bottom-4 md:bottom-6 z-50 flex flex-col gap-3">
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full bg-whatsapp text-white flex items-center justify-center shadow-card-hover hover:brightness-95 transition"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      <a
        href={site.phoneHref}
        aria-label="Call us"
        className="w-14 h-14 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-card-hover hover:bg-brand-orange-hover transition"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}

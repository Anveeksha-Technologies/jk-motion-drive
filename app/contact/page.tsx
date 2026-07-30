import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        badge="Contact"
        title="Let's Talk Drives"
        subtitle="Send us your application and our engineers will size the right drive for you."
      />

      <section className="section bg-white">
        <div className="container-x grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 items-start">
          <ContactForm />

          <div className="flex flex-col gap-6">
            <div className="rounded-xl bg-brand-black text-white p-6 md:p-8">
              <h3 className="heading-3 text-white">Get in Touch</h3>
              <p className="text-sm text-neutral-400 mt-1">
                Talk directly to our drive specialists.
              </p>

              <ul className="mt-6 space-y-5">
                <li className="flex items-start gap-4">
                  <span className="chip-icon shrink-0">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-neutral-400">Address</div>
                    <div className="mt-1 text-sm text-white">{site.address}</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="chip-icon shrink-0">
                    <Phone className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-neutral-400">Phone</div>
                    <a href={site.phoneHref} className="mt-1 block text-sm text-white hover:text-brand-orange">
                      {site.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="chip-icon shrink-0">
                    <Mail className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-neutral-400">Email</div>
                    <a
                      href={site.emailHref}
                      className="mt-1 block text-sm text-white hover:text-brand-orange break-all"
                    >
                      {site.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="chip-icon shrink-0">
                    <Clock className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-neutral-400">Working Hours</div>
                    <div className="mt-1 text-sm text-white">{site.hoursLong}</div>
                  </div>
                </li>
              </ul>

              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full mt-8"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
            </div>

            {/* Map placeholder */}
            <div className="relative rounded-xl overflow-hidden">
              <ImagePlaceholder
                alt="Warehouse / facility location — map will embed here"
                aspect="4/3"
                rounded="rounded-xl"
                label="Map — client to embed"
              />
              <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-brand-black shadow-card">
                <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                Map — client to embed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* No CTA banner on Contact — form is the CTA */}
    </>
  );
}

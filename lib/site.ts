// Contact details as supplied by the client (company profile, Aug 2026).
//
// Deliberately NOT stored here, and not to be added: banking details, PAN and
// proprietor's personal identifiers. Those appear on the client's profile
// document because it is handed to buyers directly; publishing them would let
// anyone impersonate the company on invoices.
export const site = {
  name: "JK Motion Drive",
  tagline: "Powering Precision",
  /** Exact wording supplied by the client — do not paraphrase. */
  partner: "Authorised Channel Partner of NORD DRIVESYSTEMS",
  /** Corporate / works address — where customers actually visit. */
  address:
    "24, Gajanan Industrial Estate, Sardar Patel Ring Road, Near Hathijan Circle Road, Ahmedabad – 382445, Gujarat, India",
  /** Registered (billing) address. Shown on Contact beneath the works address. */
  registeredAddress:
    "3, Krishna Bungalows Part – 1, B/H Anand Party Plot, B/H Tirupati Society, Opposite Punchwati Bungalows, New Ranip, Ahmedabad – 382470, Gujarat, India",
  /**
   * The works address split into fields, for LocalBusiness structured data.
   *
   * Kept alongside the display string rather than parsed out of it — the
   * display string is punctuated for humans and would need a fragile regex,
   * and search engines are unforgiving about a malformed PostalAddress.
   *
   * TODO: latitude/longitude are deliberately absent. Wrong coordinates in
   * LocalBusiness schema send people to the wrong place, so they should be
   * read off the client's own Google Business Profile before being added here.
   */
  addressParts: {
    street: "24, Gajanan Industrial Estate, Sardar Patel Ring Road, Near Hathijan Circle Road",
    locality: "Ahmedabad",
    region: "Gujarat",
    postalCode: "382445",
    country: "IN",
  },
  phone: "+91 9898 464 465",
  phoneHref: "tel:+919898464465",
  email: "sales@jkmotiondrive.com",
  emailHref: "mailto:sales@jkmotiondrive.com",
  whatsapp: "https://wa.me/919898464465",
  hours: "Mon–Sat, 9:30 – 18:30",
  hoursLong: "Mon–Sat, 9:30 AM – 6:30 PM",
};

export const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products", hasDropdown: true },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/industries", label: "Industries" },
  // Gallery is hidden for now at the client's request. The route still builds
  // and works if visited directly, but it is out of the nav, out of the sitemap
  // and out of llms.txt, and the page sets noindex. Restore by uncommenting
  // this line and reversing the same four places.
  // { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export const stats = [
  { value: 100, suffix: "+", label: "Industries Served" },
  { value: 500, suffix: "+", label: "Drive Configurations" },
  { value: 24, suffix: "/7", label: "Support & Service" },
  { value: 10, suffix: "+", label: "Years of Expertise" },
];

export const whyChooseUs = [
  {
    icon: "badge-check",
    title: "Genuine Products",
    body: "Sourced through authorised channels with full warranty and traceability.",
  },
  {
    icon: "pencil-ruler",
    title: "Application Engineering",
    body: "The right drive selected for your load, ratio and duty — not a part off the shelf.",
  },
  {
    icon: "truck",
    title: "Ready Stock & Fast Delivery",
    body: "Local availability of core ranges to minimise downtime and keep lines moving.",
  },
  {
    icon: "life-buoy",
    title: "Lifetime Support",
    body: "Installation, commissioning, spares and service for the full life of your drive.",
  },
];

export const coreValues = [
  {
    icon: "gem",
    title: "Quality",
    body: "Only genuine, warrantied products — no compromises on what we supply.",
  },
  {
    icon: "shield-check",
    title: "Reliability",
    body: "Drives engineered to keep running, shift after shift, year after year.",
  },
  {
    icon: "drafting-compass",
    title: "Engineering Support",
    body: "Real selection help from people who know drives — before, during and after the sale.",
  },
  {
    icon: "handshake",
    title: "Customer-First",
    body: "Your uptime and long-term outcomes matter more than any single transaction.",
  },
];

import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

// Standard terms for an informational distributor website — no accounts, no
// online ordering, no payments. The load-bearing clauses are the ones about
// published specifications not being a warranty, and an enquiry not forming a
// contract, because this site publishes manufacturer figures transcribed from a
// dated flyer.
//
// NOT LEGAL ADVICE. Drafted to the shape these documents normally take and to
// what this site actually does. It should be read by the client's own advisor
// before it is relied on — particularly the liability and governing-law
// clauses, which are the ones a dispute would turn on.

export const metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "The terms on which JK Motion Drive makes this website and the product information published on it available.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro="The terms on which we make this website and the product information on it available to you."
      lastUpdated="3 September 2026"
    >
      <h2>Agreement</h2>
      <p>
        This website is operated by <strong>{site.name}</strong>, {site.partner}, of{" "}
        {site.address}. By using the site you accept these terms. If you do not accept them, please
        do not use the site.
      </p>

      <h2>What this website is</h2>
      <p>
        The site is published for information. It describes the drive technology we supply and
        invites you to contact us about it. Nothing on the site is an offer capable of acceptance, a
        quotation, or a commitment to supply any product at any price or within any period.
      </p>

      <h2>Product information</h2>
      <p>
        Sizes, power, torque, ratio and voltage figures published here are transcribed from the
        manufacturer&apos;s own literature — principally NORD flyer{" "}
        <strong>F1300 (Mat.-Nr. 6021602 / 1118)</strong> — and each product carries the NORD
        catalogue reference it was drawn from so that any figure can be checked against its source.
      </p>
      <p>
        That literature is dated, and manufacturers revise their ranges. Published figures are
        indicative of the range as a whole and are <strong>not a specification for any particular
        unit, nor a warranty of performance</strong>. Selecting a drive depends on load, ratio, duty
        cycle, mounting and environment, and must be confirmed for your application before you order.
        Where a figure is shown as &ldquo;On request&rdquo;, the manufacturer&apos;s literature does
        not publish it and you should ask us.
      </p>
      <p>
        Product images are illustrative. Where the same artwork is used for more than one product in
        a range, it shows the family rather than the exact unit.
      </p>
      <p>
        We correct errors when we find them, but we do not warrant that everything on the site is
        accurate, complete or current at any given moment.
      </p>

      <h2>Enquiries and orders</h2>
      <p>
        Submitting the enquiry form starts a conversation; it does not place an order and does not
        form a contract. Any supply is governed by the quotation, order acknowledgement and terms of
        sale agreed between us in writing, which take precedence over anything on this site.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The layout, text and design of this site belong to {site.name} or are used with permission.
        You may view and print pages for your own business use, and quote from them with attribution.
        You may not republish the site, or a substantial part of it, as your own.
      </p>
      <p>
        <strong>NORD</strong>, <strong>NORDBLOC.1</strong>, <strong>UNICASE</strong>,{" "}
        <strong>MAXXDRIVE</strong>, <strong>NORDAC</strong> and <strong>nsd tupH</strong> are
        trademarks of Getriebebau NORD GmbH &amp; Co. KG. They are used here to identify the products
        we are authorised to supply. We claim no rights in them, and this site is not published by
        NORD.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>use the site unlawfully, or to send unsolicited commercial messages through the form;</li>
        <li>attempt to gain unauthorised access to the site or the systems behind it;</li>
        <li>
          scrape or copy the site in a way that places an unreasonable load on it, or republish its
          content as your own.
        </li>
      </ul>
      <p>
        Automated indexing by search engines and AI assistants is welcome; see{" "}
        <a href="/robots.txt">robots.txt</a> and <a href="/llms.txt">llms.txt</a>.
      </p>

      <h2>Other websites</h2>
      <p>
        Where we link to a manufacturer or third-party site, we do so for convenience. We do not
        control those sites and are not responsible for their content or their handling of your
        information.
      </p>

      <h2>Availability</h2>
      <p>
        We aim to keep the site available but do not guarantee uninterrupted access. We may change,
        suspend or withdraw any part of it without notice.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent permitted by law, we are not liable for loss of profit, loss of business,
        business interruption, or loss of an anticipated saving arising from your use of this site or
        from reliance on information published on it. Nothing in these terms limits our liability for
        death or personal injury caused by negligence, for fraud, or for anything else that cannot
        lawfully be limited.
      </p>
      <p>
        Our obligations in respect of goods we actually supply are set out in the terms of sale
        agreed for that supply, not here.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India, and the courts at Ahmedabad, Gujarat have
        exclusive jurisdiction over any dispute arising from them or from your use of this site.
      </p>

      <h2>Changes</h2>
      <p>
        We may revise these terms. The date at the top shows when they were last changed, and the
        version published when you use the site is the one that applies.
      </p>

      <h2>Contact</h2>
      <p>
        {site.name}
        <br />
        {site.address}
        <br />
        <a href={site.emailHref}>{site.email}</a> · <a href={site.phoneHref}>{site.phone}</a>
      </p>
      <p>
        See also our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}

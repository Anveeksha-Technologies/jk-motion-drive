import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

// Standard privacy notice for a B2B brochure site: an enquiry form, analytics,
// and no accounts, payments or user-generated content.
//
// NOT LEGAL ADVICE. This is drafted to the shape such notices normally take and
// to what this site actually does — every processor named here is one the site
// genuinely uses, and nothing is claimed that the code does not do. It should
// still be read by the client's own advisor before it is relied on, and revised
// whenever a new third-party service is added.

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How JK Motion Drive collects, uses and protects personal information submitted through this website, including enquiry form data and analytics cookies.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="What we collect when you use this website, why we collect it, and what you can ask us to do about it."
      lastUpdated="3 September 2026"
    >
      <h2>Who we are</h2>
      <p>
        This website is operated by <strong>{site.name}</strong>, {site.partner}, of{" "}
        {site.address}. We are the party responsible for the personal information described in this
        notice.
      </p>
      <p>
        For any question about this policy, or to make a request about your information, contact us
        at <a href={site.emailHref}>{site.email}</a> or {site.phone}.
      </p>

      <h2>What we collect</h2>
      <h3>Information you give us</h3>
      <p>
        When you submit the enquiry form we collect the name, company, email address, telephone
        number and message you enter, together with the product category you select and — if you
        reached the form from a product listing — the name of that product, so we know what your
        enquiry is about.
      </p>
      <p>
        We also receive whatever you choose to tell us if you contact us directly by email, phone or
        WhatsApp.
      </p>

      <h3>Information collected automatically</h3>
      <p>
        If you consent to analytics cookies, Google Analytics records standard usage information:
        the pages you view, approximate location derived from your IP address, device and browser
        type, and how you arrived at the site. We use this in aggregate to understand which parts of
        the site are useful. We do not use it to identify you personally, and IP addresses are
        anonymised.
      </p>
      <p>
        If you decline, no analytics cookies are set and any already stored are deleted. See{" "}
        <Link href="#cookies">Cookies</Link> below.
      </p>

      <h2>Why we use it</h2>
      <ul>
        <li>
          To answer your enquiry, prepare a quotation, and provide technical and after-sales
          support.
        </li>
        <li>To keep a record of what was quoted or supplied, and to fulfil an order.</li>
        <li>To understand how the website is used and improve it.</li>
        <li>To comply with our legal and tax obligations.</li>
      </ul>
      <p>
        We process enquiry information because you have asked us to respond to you and because it is
        necessary to take steps at your request before entering into a contract. Analytics is
        processed only with your consent, which you may withdraw at any time.
      </p>
      <p>
        <strong>We do not sell your personal information</strong>, and we do not use it to send
        marketing you have not asked for.
      </p>

      <h2>Who else handles it</h2>
      <p>
        We keep the list of third parties short and name all of them:
      </p>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>What it does</th>
            <th>What it receives</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>FormSubmit</td>
            <td>Delivers the enquiry form to our inbox</td>
            <td>The contents of the form you submit</td>
          </tr>
          <tr>
            <td>Google Analytics</td>
            <td>Website usage statistics</td>
            <td>Anonymised usage data, only if you consent</td>
          </tr>
          <tr>
            <td>Vercel</td>
            <td>Hosts and serves this website</td>
            <td>Standard server request logs</td>
          </tr>
        </tbody>
      </table>
      <p>
        These providers process information on servers that may be outside India. We share
        information with them only so far as they need it to perform the function described, and not
        for their own purposes.
      </p>
      <p>
        We may also disclose information where we are required to by law, or to establish or defend
        a legal claim.
      </p>

      <h2 id="cookies">Cookies</h2>
      <p>
        This site sets no cookies of its own. The only cookies are those Google Analytics sets
        (<strong>_ga</strong> and related), and only after you agree to them through the notice shown
        on your first visit.
      </p>
      <p>
        Choosing <strong>Decline</strong> switches analytics off, deletes any analytics cookies
        already stored, and prevents the tag from loading on later visits. Your choice is remembered
        in your browser&apos;s local storage; clearing your browser data will bring the notice back.
        You can also block cookies through your browser settings.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Enquiry correspondence is kept for as long as we are dealing with you and for a reasonable
        period afterwards, so that we can honour warranties, supply spares and answer questions about
        equipment we have supplied — and for as long as tax and company law requires us to keep
        records of a transaction. Analytics data is retained by Google under its own published
        retention settings.
      </p>

      <h2>Your rights</h2>
      <p>You can ask us to:</p>
      <ul>
        <li>tell you what personal information we hold about you;</li>
        <li>correct anything that is inaccurate or incomplete;</li>
        <li>delete information we no longer have a reason to keep;</li>
        <li>stop using your information for a particular purpose;</li>
        <li>withdraw your consent to analytics, at any time.</li>
      </ul>
      <p>
        Write to <a href={site.emailHref}>{site.email}</a> and we will respond. If you are not
        satisfied with how we have handled a request, you may raise it with the relevant data
        protection authority.
      </p>

      <h2>Security</h2>
      <p>
        The site is served over HTTPS and enquiry submissions are encrypted in transit. We limit
        access to enquiry correspondence to the people who need it to respond to you. No method of
        transmission over the internet is completely secure, so please do not send us confidential
        commercial or financial details through the enquiry form.
      </p>

      <h2>Children</h2>
      <p>
        This is a business-to-business industrial supply website. It is not directed at children and
        we do not knowingly collect information from them.
      </p>

      <h2>Changes</h2>
      <p>
        We will update this notice when what we do changes, and the date at the top will tell you
        when it was last revised.
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
        See also our <Link href="/terms">Terms of Use</Link>.
      </p>
    </LegalPage>
  );
}

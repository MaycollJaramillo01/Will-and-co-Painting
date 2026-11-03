import type { Metadata } from "next";
import Link from "next/link";
import { companyName, LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that apply when you use the Wil & Co. Painting website and request a painting quote.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="The terms that apply when you use this website and request a quote."
      updated="November 3, 2026"
    >
      <p>
        These Terms &amp; Conditions apply to your use of wilandcopainting.com,
        operated by {companyName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) in
        Madison, Wisconsin. By using this website or submitting a quote request,
        you agree to these terms. If you do not agree, please do not use the
        website.
      </p>

      <h2>Use of this website</h2>
      <p>
        You may use this website to learn about our services and contact us. You
        agree not to misuse it, including by submitting false information or
        someone else&rsquo;s details, sending spam or harmful code, or trying to
        interfere with how the website works.
      </p>

      <h2>Quote requests and estimates</h2>
      <p>
        Submitting a quote request does not create a contract or guarantee that
        we will take on your project. The information and photos on this website
        are general and may not reflect the price, materials, or schedule of
        your project. Any estimate is based on the information available at the
        time and may change after we see the property. Work begins only after
        you and {companyName} agree on the scope and price, and any written
        agreement for the work takes priority over these terms.
      </p>

      <h2>Communications</h2>
      <p>
        When you submit a quote request, you confirm that the information you
        provide is yours and accurate, and you agree that we may contact you
        about that request using the contact details you gave us. How we handle
        your information is explained in our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>Content and ownership</h2>
      <p>
        The text, photos, logo, and other content on this website belong to{" "}
        {companyName} or are used with permission. You may not copy or reuse
        them for commercial purposes without our written permission.
      </p>

      <h2>Third-party links and services</h2>
      <p>
        This website links to services we do not control, such as WhatsApp and
        Google. Their own terms and privacy policies apply when you use them,
        and we are not responsible for their content or practices.
      </p>

      <h2>Disclaimer</h2>
      <p>
        This website is provided &ldquo;as is&rdquo;. We work to keep it
        accurate and available, but we do not guarantee that it will always be
        complete, current, or free of errors or interruptions.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {companyName} is not liable for
        indirect, incidental, or consequential damages arising from your use of
        this website. This section does not limit any rights you have under a
        written agreement for painting work or under laws that cannot be waived.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Wisconsin. Any
        dispute about this website will be handled in the state or federal
        courts located in Dane County, Wisconsin.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The date at the top of this
        page shows when they last changed, and continuing to use the website
        after a change means you accept the updated terms.
      </p>
    </LegalPage>
  );
}

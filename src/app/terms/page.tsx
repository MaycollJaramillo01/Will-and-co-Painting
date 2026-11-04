import type { Metadata } from "next";
import Link from "next/link";
import { companyName, LegalPage } from "@/components/legal-page";
import { business } from "@/config/business";

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
      updated="November 4, 2026"
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
        provide is accurate and that you are authorized to use the contact
        details you give us. We may respond by email or a manually placed phone
        call about your request. Providing a phone number, using this website,
        or accepting these terms does not by itself authorize automated text
        messages or automated, artificial-voice, prerecorded, or AI-generated
        voice calls. Those communications require your separate consent. How we
        handle your information is explained in our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2 id="sms-communications" className="scroll-mt-28">
        SMS/text messaging
      </h2>
      <p>
        If you select the optional SMS consent checkbox on our quote form or
        otherwise expressly opt in, {companyName} may send SMS/text messages to
        the number you authorize about your quote request, scheduling,
        appointment reminders, and related service updates. Messages may be sent
        using automated systems, including Jobber where enabled. Your consent
        applies to communications from {companyName} for these purposes and does
        not enroll you in unrelated promotional campaigns or authorize other
        businesses to market to you.
      </p>
      <p>
        Message frequency varies with your request and project. Message and data
        rates may apply under your mobile plan. Consent is optional and is not a
        condition of requesting a quote or purchasing services. You may leave
        the SMS checkbox unchecked and submit your request.
      </p>
      <p>
        Reply STOP to opt out of text messages or HELP for help. You may also
        ask us to stop by calling{" "}
        <a href={`tel:${business.phone}`}>{business.displayPhone}</a> or using
        our <Link href="/contact">contact form</Link>. We honor clear withdrawal
        requests made by any reasonable method. After an opt-out, we may send
        one non-promotional confirmation message. We will not resume messages
        covered by that withdrawal unless you provide valid consent again.
        Delivery may be delayed or unavailable; mobile carriers are not liable
        for delayed or undelivered messages.
      </p>

      <h2 id="ai-communications" className="scroll-mt-28">
        Automated calls and AI-assisted communications
      </h2>
      <p>
        We may use Jobber and AI-assisted tools to help answer inquiries,
        communicate about requested services, and arrange appointments. An AI
        assistant may respond to incoming calls or messages, and AI may help
        generate text responses. When you separately opt in to automated or AI
        voice calls, you authorize {companyName} to call the number you provide
        about your quote request, scheduling, and related services using an
        automatic telephone dialing system or an artificial, prerecorded, or
        AI-generated voice, to the extent permitted by law. Selecting SMS
        consent does not grant consent to these calls.
      </p>
      <p>
        Automated and AI voice call consent is optional and is not a condition
        of requesting a quote or purchasing services. You may withdraw it at any
        time by asking the caller, calling {business.displayPhone}, or using our
        contact form. Any recording or transcription is subject to applicable
        notice and consent requirements. AI responses can contain mistakes; ask
        to speak with our team to confirm pricing, availability, or project
        commitments.
      </p>

      <h2>Marketing and consent records</h2>
      <p>
        The quote form does not enroll you in general marketing campaigns. We
        obtain any separate consent required before sending promotional
        communications beyond the services you requested. We retain records of
        your communication choices, the authorized phone number, the date and
        time of submission, and the consent wording and version. Accepting these
        terms does not replace a separate opt-in where one is required.
      </p>

      <h2>Content and ownership</h2>
      <p>
        The text, photos, logo, and other content on this website belong to{" "}
        {companyName} or are used with permission. You may not copy or reuse
        them for commercial purposes without our written permission.
      </p>

      <h2>Third-party links and services</h2>
      <p>
        We use service providers, including Jobber for client and project
        management and communications where enabled, and Resend for delivering
        website quote requests. These providers may process information on our
        behalf as described in our Privacy Policy. Using an integration does not
        expand your communication consent. This website also links to services
        we do not control, such as WhatsApp and Google. Their own terms and
        privacy policies apply when you use them, and we are not responsible for
        their content or practices.
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
        after a change means you accept the updated website terms. Changes do
        not expand previously granted communication consent. We obtain new
        consent when required for a new purpose or communication method.
      </p>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { companyName, LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Wil & Co. Painting collects, uses, shares, and protects the information you provide through this website.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="What information we collect when you visit this website or request a quote, and how we use it."
      updated="November 5, 2026"
    >
      <p>
        {companyName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your
        privacy. This policy explains what information we collect through
        wilandcopainting.com, how we use and share it, and the choices you have.
      </p>

      <h2>Information we collect</h2>
      <p>
        <strong>Information you give us.</strong> When you request a quote, we
        collect your name, email address, phone number (optional), property
        type, the service you need, and the project details you write. When you
        call us or message us on WhatsApp, we receive your phone number and
        whatever you choose to tell us.
      </p>
      <p>
        <strong>Communication preferences and consent records.</strong> We also
        collect your separate choices about automated SMS/text messages and
        automated or AI voice calls, the phone number those choices apply to,
        the date and time of submission, and the consent wording and version.
        Leaving an optional consent checkbox unchecked does not prevent you from
        requesting a quote.
      </p>
      <p>
        <strong>Information collected automatically.</strong> This website uses
        Google Ads tags, which rely on cookies and similar technologies to
        record details such as your IP address, browser and device type, the
        pages you visit, and whether you clicked one of our ads, called us,
        opened WhatsApp, or submitted a quote request. Visitors who arrive from
        one of our ads may see a Google forwarding phone number; Google then
        reports call details such as the start time, duration, and the
        caller&rsquo;s area code so we can measure our advertising.
      </p>
      <p>
        This website also keeps a short record in your browser of how you
        arrived (for example, the ad or campaign you clicked), the pages you
        view, and whether you tap to call, open WhatsApp, or open our request
        form. If you send a quote request, that record is added to your request
        in Jobber so we know how you found us. Otherwise it stays in your
        browser and expires after 30 days of inactivity.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>
          To respond to your request, prepare estimates, schedule work, and
          communicate with you about your project.
        </li>
        <li>To measure and improve our advertising.</li>
        <li>To keep this website secure and filter out spam.</li>
        <li>To meet our legal and record-keeping obligations.</li>
      </ul>
      <p>
        We contact you about the request you made. We do not send you marketing
        messages unless you agree to receive them.
      </p>

      <h2>Jobber, automated messaging, and AI</h2>
      <p>
        We use Jobber to help manage client information, quote requests,
        scheduling, and project communications. Where enabled, Jobber and
        AI-assisted tools may help answer calls or messages, generate replies,
        and arrange appointments. Information processed for these purposes may
        include your contact details, project information, message content,
        communication preferences, and conversation summaries. Any recording or
        transcription is subject to applicable notice and consent requirements.
      </p>
      <p>
        We use your separate opt-in choices to determine whether we may send
        automated texts or initiate automated or AI voice calls. Accepting this
        Privacy Policy or providing a phone number does not by itself grant
        those permissions. See our{" "}
        <Link href="/terms#sms-communications">SMS terms</Link> and{" "}
        <Link href="/terms#ai-communications">automated and AI call terms</Link>
        . You can ask to speak with our team instead of an AI assistant.
      </p>

      <h2>How we share your information</h2>
      <p>
        We do not sell or rent your personal information. We share it only with
        providers that help us run our business, and only as needed for the
        purposes above:
      </p>
      <ul>
        <li>
          Jobber, which helps us manage clients, requests, scheduling, and
          communications, including automation and AI features where enabled.
        </li>
        <li>
          Resend, which delivers quote requests from this website to our inbox.
        </li>
        <li>Our website hosting and email providers.</li>
        <li>
          Contractors who help us manage this website and our advertising.
        </li>
        <li>
          Google, which provides our advertising, conversion measurement, and
          call tracking. Learn{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noreferrer"
          >
            how Google uses information from sites that use its services
          </a>
          .
        </li>
        <li>
          WhatsApp (Meta), only when you choose to contact us through WhatsApp.
        </li>
      </ul>
      <p>
        We do not share mobile phone numbers or text messaging consent with
        third parties or affiliates for their own marketing or promotional
        purposes. Providers may process this information only as needed to
        support our communications and business operations. We may disclose
        information when the law requires it or to protect our rights, our
        customers, or others.
      </p>

      <h2>Cookies and advertising choices</h2>
      <p>
        You can block or delete cookies in your browser settings, and you can
        manage personalized Google ads in{" "}
        <a
          href="https://myadcenter.google.com/"
          target="_blank"
          rel="noreferrer"
        >
          My Ad Center
        </a>
        . Blocking cookies does not stop you from browsing this website or
        requesting a quote.
      </p>

      <h2>How long we keep information</h2>
      <p>
        We keep quote requests and project communications only as long as we
        need them to respond to you, complete the work, keep business records,
        and meet legal obligations, and then delete them.
      </p>

      <h2>How we protect information</h2>
      <p>
        We use reasonable safeguards, including encrypted (HTTPS) connections.
        No website or email system is completely secure, so please do not send
        payment card numbers or other sensitive information through the form.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us what personal information we have about you, ask us to
        correct or delete it, and ask us to stop contacting you at any time. We
        may need to confirm your identity first, and we may keep information
        that the law requires us to keep.
      </p>
      <p>
        To stop text messages, reply STOP. For messaging help, reply HELP or
        contact us using the details below. You may withdraw automated or AI
        voice call consent by asking the caller or contacting us. We also honor
        clear opt-out requests made by other reasonable methods and keep the
        records needed to respect your preferences.
      </p>

      <h2>Children&rsquo;s privacy</h2>
      <p>
        This website is meant for adults arranging painting services. We do not
        knowingly collect personal information from children under 13.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top of this
        page shows when it last changed.
      </p>
    </LegalPage>
  );
}

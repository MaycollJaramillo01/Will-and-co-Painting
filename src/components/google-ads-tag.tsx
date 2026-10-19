import { business } from "@/config/business";

const googleAdsId = "AW-17537368439";
// Google Ads "Clic de llamada" conversion label. Not a secret — gtag exposes it
// in client HTML anyway. Env var overrides it if the action ever changes.
const callConversionLabel =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL?.trim() ||
  "gZOeCM2KlOccEPeCvKpB";
// "Llamadas desde el sitio web": ad visitors see a Google forwarding number,
// so their real calls (20 s or more) count as conversions.
const websiteCallConversion = `${googleAdsId}/8_N8CIeL0KIdEPeCvKpB`;
// "Clic de WhatsApp".
const whatsappConversion = `${googleAdsId}/vE8zCI2L0KIdEPeCvKpB`;
// "Formulario de cotizacion", fired by the contact form once the request is emailed.
export const quoteFormConversion = `${googleAdsId}/YUpWCIqL0KIdEPeCvKpB`;

export function GoogleAdsTag() {
  const callConversionDestination = callConversionLabel
    ? `${googleAdsId}/${callConversionLabel}`
    : "";

  // ponytail: plain <script> instead of next/script so the tag ships in the
  // server-rendered HTML — Google Ads' landing page crawler flags pages as
  // "not tagged" when gtag is only injected client-side after hydration.
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);};
          window.gtag('js', new Date());
          window.gtag('config', '${googleAdsId}');
          window.gtag('config', '${websiteCallConversion}', {
            phone_conversion_number: ${JSON.stringify(business.displayPhone)},
            phone_conversion_callback: function (formatted, plain) {
              window.googleForwardingNumber = String(plain).replace(/^\\+/, '');
              // ponytail: one pass once the page has loaded. Text rendered by a later
              // client-side navigation keeps the real number, but taps still dial the
              // forwarding one (see the click handler below).
              function swap() {
                var shown = ${JSON.stringify(business.displayPhone)};
                var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
                while (walker.nextNode()) {
                  var node = walker.currentNode;
                  if (node.nodeValue.indexOf(shown) !== -1) {
                    node.nodeValue = node.nodeValue.split(shown).join(formatted);
                  }
                }
              }
              if (document.readyState === 'complete') swap();
              else window.addEventListener('load', swap);
            }
          });
        `,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.addEventListener('click', function (event) {
            var target = event.target;
            if (!(target instanceof Element)) return;

            if (target.closest('a[href*="wa.me/"]')) {
              if (typeof window.gtag === 'function') {
                window.gtag('event', 'conversion', {
                  send_to: ${JSON.stringify(whatsappConversion)},
                  transport_type: 'beacon'
                });
              }
              return;
            }

            var phoneLink = target.closest('a[href^="tel:"]');
            if (!phoneLink) return;
            // Ad visitors dial the Google forwarding number so the call is counted.
            if (window.googleForwardingNumber) {
              phoneLink.setAttribute('href', 'tel:+' + window.googleForwardingNumber);
            }
            if (typeof window.gtag !== 'function') return;

            var phoneNumber = phoneLink.getAttribute('href') || '';
            var conversionDestination = ${JSON.stringify(callConversionDestination)};

            if (conversionDestination) {
              window.gtag('event', 'conversion', {
                send_to: conversionDestination,
                value: 1.0,
                currency: 'USD',
                phone_number: phoneNumber.replace(/^tel:/, ''),
                transport_type: 'beacon'
              });
              return;
            }

            window.gtag('event', 'phone_call_click', {
              send_to: '${googleAdsId}',
              phone_number: phoneNumber.replace(/^tel:/, ''),
              transport_type: 'beacon'
            });
          });
        `,
        }}
      />
    </>
  );
}

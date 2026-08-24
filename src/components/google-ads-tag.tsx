const googleAdsId = "AW-17537368439";
// Google Ads "Clic de llamada" conversion label. Not a secret — gtag exposes it
// in client HTML anyway. Env var overrides it if the action ever changes.
const callConversionLabel =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL?.trim() ||
  "gZOeCM2KlOccEPeCvKpB";

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
        `,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.addEventListener('click', function (event) {
            var target = event.target;
            if (!(target instanceof Element)) return;

            var phoneLink = target.closest('a[href^="tel:"]');
            if (!phoneLink || typeof window.gtag !== 'function') return;

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

import Script from "next/script";

const googleAdsId = "AW-17537368439";
const callConversionLabel =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL?.trim() ?? "";

export function GoogleAdsTag() {
  const callConversionDestination = callConversionLabel
    ? `${googleAdsId}/${callConversionLabel}`
    : "";

  return (
    <>
      <Script
        id="google-ads-library"
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);};
          window.gtag('js', new Date());
          window.gtag('config', '${googleAdsId}');
        `}
      </Script>
      <Script id="google-ads-call-tracking" strategy="afterInteractive">
        {`
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
        `}
      </Script>
    </>
  );
}

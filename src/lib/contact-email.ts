import type { ContactFormData } from "./contact-schema.ts";
import { siteUrl } from "../config/business.ts";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export function renderContactEmail(
  data: ContactFormData,
  receivedAt = new Date(),
) {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const service = escapeHtml(data.service);
  const phone = escapeHtml(data.phone || "Not provided by the client");
  const phoneDigits = data.phone.replace(/\D/g, "");
  const phoneLink = `${data.phone.trim().startsWith("+") ? "+" : ""}${phoneDigits}`;
  const replyLink = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(`Re: Your ${data.service} request`)}`;
  const date = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Chicago",
  }).format(receivedAt);
  const received = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Chicago",
    timeZoneName: "short",
  }).format(receivedAt);
  const consent = data.consent
    ? "Yes — permission to contact the client."
    : "Not given.";
  const message = escapeHtml(data.message).replace(/\r?\n/g, "<br />");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>New quote request · Wil &amp; Co. Painting</title>
  <style>
    @font-face { font-family:'Manrope';font-style:normal;font-weight:400;src:url('https://fonts.gstatic.com/s/manrope/v20/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FO_F.ttf') format('truetype'); }
    @font-face { font-family:'Manrope';font-style:normal;font-weight:600;src:url('https://fonts.gstatic.com/s/manrope/v20/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4jE-_F.ttf') format('truetype'); }
    @font-face { font-family:'Manrope';font-style:normal;font-weight:700;src:url('https://fonts.gstatic.com/s/manrope/v20/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4aE-_F.ttf') format('truetype'); }
    @font-face { font-family:'Manrope';font-style:normal;font-weight:800;src:url('https://fonts.gstatic.com/s/manrope/v20/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk59E-_F.ttf') format('truetype'); }
    @font-face { font-family:'Barlow Condensed';font-style:normal;font-weight:600;src:url('https://fonts.gstatic.com/s/barlowcondensed/v13/HTxwL3I-JCGChYJ8VI-L6OO_au7B4873_3E.ttf') format('truetype'); }
    @font-face { font-family:'Barlow Condensed';font-style:normal;font-weight:700;src:url('https://fonts.gstatic.com/s/barlowcondensed/v13/HTxwL3I-JCGChYJ8VI-L6OO_au7B46r2_3E.ttf') format('truetype'); }
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    table { border-collapse: collapse; }
    img { border: 0; outline: none; text-decoration: none; }
    @media only screen and (max-width: 600px) {
      .outer-pad { padding: 16px 8px !important; }
      .inset { padding-left: 24px !important; padding-right: 24px !important; }
      .service-title { font-size: 28px !important; line-height: 32px !important; }
      .detail-label { width: 90px !important; padding-right: 12px !important; }
      .action-cell { display: block !important; width: auto !important; padding: 0 0 12px !important; }
      .action { display: block !important; text-align: center !important; }
      .header-note { font-size: 10px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f5f7f9;font-family:'Manrope',Verdana,sans-serif;color:#10263d;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${name} · ${service} · A new quote request from your website.</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#f5f7f9" style="font-family:'Manrope',Verdana,sans-serif;">
    <tr><td class="outer-pad" align="center" style="padding:40px 16px;">
      <!--[if mso]><table role="presentation" width="600"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#ffffff;">
        <tr><td class="inset" style="padding:28px 36px;">
          <table role="presentation" width="100%"><tr>
            <td width="160"><a href="${siteUrl}" style="text-decoration:none;"><img src="cid:logo-white.png" width="128" alt="Wil &amp; Co. Painting" style="display:block;width:128px;max-width:100%;height:auto;" /></a></td>
            <td class="header-note" align="right" style="font-size:11px;line-height:20px;color:#536577;letter-spacing:1px;"><strong style="font-family:'Barlow Condensed','Arial Narrow',Verdana,sans-serif;font-size:18px;font-weight:700;color:#0d2a4a;">MADISON, WISCONSIN</strong><br /><span style="letter-spacing:0;color:#536577;">${date}</span></td>
          </tr></table>
        </td></tr>
        <tr><td class="inset" style="padding:0 36px 24px;">
          <h1 style="margin:0 0 8px;font-family:'Barlow Condensed','Arial Narrow',Verdana,sans-serif;font-size:28px;line-height:32px;font-weight:700;color:#0d2a4a;">New quote request</h1>
          <p style="margin:0;color:#536577;font-size:14px;line-height:24px;"><strong style="color:#10263d;">${name}</strong> submitted the details below.</p>
        </td></tr>
        <tr><td height="4" bgcolor="#b84d14" style="height:4px;background-color:#b84d14;font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td class="inset" bgcolor="#eef2f5" style="padding:26px 36px;background-color:#eef2f5;">
          <p style="margin:0 0 9px;color:#b84d14;font-size:11px;font-weight:800;letter-spacing:1.8px;line-height:18px;">REQUESTED SERVICE</p>
          <h2 class="service-title" style="margin:0 0 12px;font-family:'Barlow Condensed','Arial Narrow',Verdana,sans-serif;font-size:34px;line-height:38px;letter-spacing:-.4px;font-weight:700;color:#0d2a4a;overflow-wrap:anywhere;">${service}</h2>
          <p style="margin:0;color:#536577;font-size:14px;line-height:22px;"><strong>Property type:</strong> ${escapeHtml(data.propertyType)}</p>
        </td></tr>
        <tr><td class="inset" style="padding:30px 36px 8px;">
          <h2 style="margin:0 0 16px;color:#0d2a4a;font-family:'Barlow Condensed','Arial Narrow',Verdana,sans-serif;font-size:26px;font-weight:700;line-height:30px;">Client contact details.</h2>
          <table role="presentation" width="100%" style="table-layout:fixed;">
            <tr>
              <td class="detail-label" width="120" valign="top" style="padding:12px 20px 14px 0;font-size:13px;line-height:24px;color:#536577;">Full name</td>
              <td valign="top" style="padding:12px 0 14px;font-size:18px;line-height:26px;font-weight:bold;color:#10263d;overflow-wrap:anywhere;word-break:break-word;">${name}</td>
            </tr>
            <tr>
              <td class="detail-label" width="120" valign="top" style="padding:12px 20px 14px 0;font-size:13px;line-height:24px;color:#536577;border-top:1px solid #e5ebef;">Phone number</td>
              <td valign="top" style="padding:12px 0 14px;border-top:1px solid #cdd6df;overflow-wrap:anywhere;word-break:break-word;">${phoneDigits ? `<a href="tel:${phoneLink}" style="font-family:'Barlow Condensed','Arial Narrow',Verdana,sans-serif;font-size:26px;line-height:30px;font-weight:700;color:#b84d14;text-decoration:underline;">${phone}</a>` : `<span style="font-size:15px;line-height:24px;color:#536577;">${phone}</span>`}</td>
            </tr>
            <tr>
              <td class="detail-label" width="120" valign="top" style="padding:12px 20px 22px 0;font-size:13px;line-height:24px;color:#536577;border-top:1px solid #e5ebef;">Email address</td>
              <td valign="top" style="padding:12px 0 22px;border-top:1px solid #e5ebef;"><a href="mailto:${encodeURIComponent(data.email)}" style="font-size:15px;line-height:24px;color:#0d2a4a;text-decoration:underline;word-break:break-all;">${email}</a></td>
            </tr>
          </table>
        </td></tr>
        <tr><td class="inset" style="padding:0 36px 28px;">
          <table role="presentation" width="100%"><tr><td bgcolor="#f5f7f9" style="padding:24px;background-color:#f5f7f9;border-left:3px solid #b84d14;">
            <p style="margin:0 0 14px;font-family:'Barlow Condensed','Arial Narrow',Verdana,sans-serif;font-size:22px;line-height:26px;font-weight:700;color:#0d2a4a;">PROJECT DETAILS / CLIENT MESSAGE</p>
            <p style="margin:0;font-family:'Manrope',Verdana,sans-serif;font-size:15px;line-height:27px;color:#10263d;overflow-wrap:anywhere;word-break:break-word;">${message}</p>
          </td></tr></table>
        </td></tr>
        <tr><td class="inset" style="padding:0 36px 32px;">
          <table role="presentation" width="100%"><tr>
            <td class="action-cell" ${phoneDigits ? 'width="60%"' : ""} style="padding-right:${phoneDigits ? "12" : "0"}px;">
              <table role="presentation" width="100%"><tr><td align="center" bgcolor="#b84d14" style="background-color:#b84d14;border-radius:10px;">
                <a class="action" href="${replyLink}" style="display:block;padding:16px 12px;color:#ffffff;font-family:'Manrope',Verdana,sans-serif;font-size:13px;line-height:18px;font-weight:800;text-decoration:none;border-radius:10px;">Reply to client &nbsp;&#8594;</a>
              </td></tr></table>
            </td>
            ${phoneDigits ? `<td class="action-cell" width="40%"><table role="presentation" width="100%"><tr><td align="center" bgcolor="#ffffff" style="background-color:#ffffff;border:1px solid #cdd6df;border-radius:10px;"><a class="action" href="tel:${phoneLink}" style="display:block;padding:15px 12px;font-family:'Manrope',Verdana,sans-serif;font-size:13px;line-height:18px;font-weight:800;color:#10263d;text-decoration:none;border-radius:10px;">Call client &nbsp;&#8599;</a></td></tr></table></td>` : ""}
          </tr></table>
          <p style="margin:14px 0 0;font-size:11px;line-height:19px;color:#758291;">You can also reply directly to this email to reach the client.</p>
        </td></tr>
        <tr><td class="inset" style="padding:23px 36px;background-color:#f5f7f9;border-top:1px solid #cdd6df;">
          <p style="margin:0 0 6px;font-size:12px;line-height:20px;color:#536577;"><strong>Received:</strong> ${received} (Madison time)</p>
          <p style="margin:0 0 6px;font-size:12px;line-height:20px;color:#536577;"><strong>Contact consent:</strong> ${escapeHtml(consent)}</p>
          <p style="margin:0 0 20px;font-size:12px;line-height:20px;color:#536577;"><strong>Source:</strong> Website quote form — wilandcopainting.com</p>
        </td></tr>
        <tr><td class="inset" bgcolor="#071d35" style="padding:25px 36px;background-color:#071d35;">
          <table role="presentation" width="100%"><tr>
            <td style="color:#f8fafc;font-family:'Barlow Condensed','Arial Narrow',Verdana,sans-serif;font-size:24px;line-height:28px;font-weight:700;">Wil &amp; Co. Painting<br /><span style="font-family:'Manrope',Verdana,sans-serif;font-size:10px;line-height:20px;font-weight:400;color:#c6d3df;">Madison painting. Finished with care.</span></td>
            <td align="right" valign="top"><a href="${siteUrl}" style="font-size:11px;line-height:28px;color:#f8fafc;text-decoration:underline;">Visit website &#8599;</a></td>
          </tr></table>
        </td></tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
      <p style="margin:20px 0 0;font-size:10px;line-height:18px;color:#7d8995;">Quote request notification · Wil &amp; Co. Painting</p>
    </td></tr>
  </table>
</body>
</html>`;

  return {
    html,
    text: [
      "New quote request for Wil & Co. Painting",
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "Not provided by the client"}`,
      `Service: ${data.service}`,
      `Property type: ${data.propertyType}`,
      `Received: ${received} (Madison time)`,
      `Contact consent: ${consent}`,
      "Source: Website quote form — wilandcopainting.com",
      "",
      "Project details:",
      data.message,
      "",
      "Reply directly to this email to reach the client.",
    ].join("\n"),
  };
}
